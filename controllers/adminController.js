import Review from "../models/review.js"; 
import User from "../models/user.js";
import Book from "../models/book.js"
import Comment from "../models/comment.js";
import Report from "../models/report.js"
import getBookAverageRating from '../utils/getBookAverageRating.js';

// 관리자 대시보드 페이지 렌더링
export const getAdminDashboard = async (req, res) => {

    const PAGE_SIZE = 10; // 한 페이지에 표시할 데이터 개수

    try {
        if (!req.user || !req.user.isAdmin) {
            req.flash("error", "Access denied.");
            return res.redirect("/");
        }

        let { search, type, sort, page } = req.query; // 검색어 & 검색 타입
        page = parseInt(page) || 1;
        let reviews = [];
        let users = [];
        let reports = [];
        let totalreviews = 0;
        let totalUsers = 0;
        let totalReports = 0;

        if (type === "reviews" || !type) {
            const reviewQuery = search
                ? { body: { $regex: search, $options: "i" } }
                : {};

            totalreviews = await Review.countDocuments(reviewQuery);
            reviews = await Review.find(reviewQuery)
                .populate("author", "username email")
                .populate("book", "title")
                .sort(sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 })
                .skip((page - 1) * PAGE_SIZE)
                .limit(PAGE_SIZE);
        }

        if (type === "users" || !type) {
            const userQuery = search
                ? {
                    $or: [
                        { username: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                    ],
                }
                : {};

            totalUsers = await User.countDocuments(userQuery);
            users = await User.find(userQuery, "username email isAdmin")
                .sort(sort === "a-z" ? { username: 1 } : { username: -1 })
                .skip((page - 1) * PAGE_SIZE)
                .limit(PAGE_SIZE);
        }

        if (type === "reports" || !type) {
            const reportQuery = search
                ? { reason: { $regex: search, $options: "i" } }
                : {};

            totalReports = await Report.countDocuments(reportQuery);
            reports = await Report.find(reportQuery)
                .populate("reportedBy", "username email")
                .populate({
                    path: "review",
                    populate: { path: "author", select: "username email" } // 리뷰 작성자 정보 포함
                })
                .sort(sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 })
                .skip((page - 1) * PAGE_SIZE)
                .limit(PAGE_SIZE);
        }
        console.log("📌 Admin Dashboard Type:", type);
        console.log("📌 Fetched Reports:", reports);

        const totalPages = type === "users" 
                ? Math.ceil(totalUsers / PAGE_SIZE) 
                : type === "reports"
                ? Math.ceil(totalReports / PAGE_SIZE)
                : Math.ceil(totalreviews / PAGE_SIZE);

        // `search`와 `type` 변수를 EJS에 전달
        res.render("admin/dashboard", { 
            reviews, 
            users,
            reports, 
            search, 
            type,
            sort,
            page,
            totalreviews,
            totalUsers,
            totalReports,
            totalPages,
        });
    } catch(error) {
        console.error("❌ Error fetching admin dashboard data:", error);
        res.status(500).send("Server Error");
    }
};

// 리뷰 삭제 (관리자만 가능)
export const deleteReviewByAdmin = async (req, res) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            req.flash("error", "Access denied.");
            return res.redirect("/admin/dashboard?type=reviews");
        }

        const reviewId = req.params.reviewId;

        // 1. 리뷰 문서 찾기 (작성자와 책 정보를 얻기 위함)
        const review = await Review.findById(reviewId);
        if (!review) {
            req.flash("error", "Review not found.");
            return res.redirect("/admin/dashboard?type=reviews");
        }

        // 2. 댓글(Comment) 컬렉션에서 해당 리뷰 관련 댓글들 삭제
        await Comment.deleteMany({ review: reviewId });

        // 3. Book에서 리뷰 _id 제거
        await Book.findByIdAndUpdate(review.book, { $pull: { reviews: reviewId } });

        // 4. User에서 리뷰 _id 제거 (리뷰 작성자 기준)
        await User.findByIdAndUpdate(review.author, { $pull: { reviews: reviewId } });

        // 5. 리뷰 자체 삭제
        await Review.findByIdAndDelete(reviewId);

        // 6. 리뷰와 관련된 신고 삭제
        await Report.deleteMany({ review: reviewId});

        // 책의 평균 평점, 리뷰 개수 재계산
        await getBookAverageRating(review.book, true);

        req.flash("error", "Review deleted successfully.");
        res.redirect("/admin/dashboard?type=reviews");
    } catch(error) {
        console.error("❌ Error deleting review:", error);
        req.flash("error", "Failed to delete review.");
        res.redirect("/admin/dashboard?type=reviews");
    }
};

// 리포트 삭제 (관리자만 가능)
export const deleteReportByAdmin = async (req, res) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            req.flash("error", "Access denied.");
            return res.redirect("/admin/dashboard?type=reports");
        }
        
        const reportId = req.params.reportId;
        const report = await Report.findById(reportId);

        if (!report) {
            req.flash("error", "Report not found.");
            return res.redirect("/admin/dashboard?type=reports");
        }

        // 신고 데이터 삭제
        await Report.findByIdAndDelete(reportId);

        req.flash("success", "Report deleted successfully.");
        res.redirect("/admin/dashboard?type=reports"); // 신고 관리 페이지로 리디렉트
    } catch (error) {
        console.error("❌ Error deleting report:", error);
        req.flash("error", "Failed to delete report.");
        res.redirect("/admin/dashboard?type=reports");
    }
};

// 유저 삭제 (관리자만 가능)
export const deleteUserByAdmin = async (req, res) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            req.flash("error", "Access denied.");
            return res.redirect("/admin/dashboard?type=users");
        }

        const userId = req.params.userId;

        // 1. 삭제할 유저 찾기
        const user = await User.findById(userId);
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/admin/dashboard?type=users");
        }

        // 2. 유저가 작성한 리뷰 삭제 (해당 유저가 작성한 리뷰들)
        const userReviews = await Review.find({ author: userId });
        for (const review of userReviews) {
            // 해당 리뷰의 댓글도 삭제
            await Comment.deleteMany({ reviews: review._id });

            // 해당 리뷰가 포함된 책에서 리뷰 ID 제거
            await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });

            // 리뷰 삭제
            await Review.findByIdAndDelete(review._id);
        }

        // 3. 유저가 작성한 댓글 삭제
        await Comment.deleteMany({ author: userId });

        // 4. 유저가 신고한 리뷰 신고 삭제
        await Report.deleteMany({ reportedBy: userId });

        // 5. 유저 계정 삭제
        await User.findByIdAndDelete(userId);

        req.flash("success", "User deleted successfully.");
        res.redirect("/admin/dashboard?type=users");
    } catch (error) {
        console.error("❌ Error deleting user:", error);
        req.flash("error", "Failed to delete user.");
        res.redirect("/admin/dashboard?type=users");
    }
};