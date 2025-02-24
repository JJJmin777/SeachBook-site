# 📚 Book Review App

🚀 한 줄 소개 (Book Review App은 사용자가 책 리뷰를 남기고 공유할 수 있는 웹 애플리케이션입니다.)

## 📌 Features (기능)
### 🔹 사용자 기능
-  #### 📚 도서 검색: 원하는 책을 검색하여 리뷰를 확인할 수 있습니다.

     ![책 검색](https://github.com/user-attachments/assets/d937cb76-e578-46f6-9f53-923e7b0b4020)


- #### ⭐ 리뷰 작성: 책에 대한 리뷰를 남기고, 별점을 부여할 수 있습니다.(수정, 삭제)
   
     ![리뷰 쓰기](https://github.com/user-attachments/assets/9e10f3b5-6453-49a2-8814-33a1b5803f91)

  
- #### ❤️ 리뷰 좋아요: 다른 사용자의 리뷰에 좋아요를 누를 수 있습니다.

     ![하트 클릭](https://github.com/user-attachments/assets/d357580d-e846-46de-96bd-0654796518b1)

- #### 💬 댓글 기능: 리뷰에 대한 댓글을 남길 수 있습니다.

     ![코멘트 작성](https://github.com/user-attachments/assets/66b22590-ccd0-4417-9204-1e33bc4ca6cb)

  
- #### 🚨 리뷰 신고: 부적절한 리뷰를 신고할 수 있습니다.

     ![리뷰 신고](https://github.com/user-attachments/assets/247d4da4-da81-4078-91f8-d3fd8e2d37da)
  
- #### 🔍 🔄 리뷰 검색 및 정렬 기능: 리뷰를 최신순과 하트순으로 정렬하고 정렬 기준에 따라 검색할 수 있습니다. 

     ![리뷰 정렬 검색 1](https://github.com/user-attachments/assets/635a710a-0553-4b8d-b6cd-d5f1d08b6776)

     ![리뷰 정렬 검색 2](https://github.com/user-attachments/assets/ac49175a-ac1a-4e22-a2fc-bfeff7b87913)



       
- #### 🔐 로그인/회원가입 (Passport.js 사용, **Google reCAPTCHA 적용**: 로그인 및 회원가입 시 reCAPTCHA로 **스팸 방지**)
     ##### 🔑 **회원가입시 인증 **
        ✅ 📩 이메일 인증**: 회원가입 시 Nodemailer를 사용해 **Gmail SMTP**로 인증 메일 전송
        ✅ 📬 인증 링크 포함**: 사용자가 이메일의 링크를 클릭하면 계정이 활성화됨

     ![회원가입](https://github.com/user-attachments/assets/45ae8bfd-be55-45fe-ae71-a72a8b897b1e)

     ![회원가입 이메일](https://github.com/user-attachments/assets/004c8ec5-93a5-4613-b0f8-fa9ae423a0ba)

     ##### 🔑 비밀번호 찾기
        ✅ 📩 이메일 인증**: 비밀번호 찾기시 Nodemailer를 사용해 **Gmail SMTP**로 비밀번호 재설정 메일 전송
        ✅ 📬 인증 링크 포함**: 사용자가 이메일의 링크를 클릭하고 새로운 비밀번호 설정

     ![비밀번호 찾기 1](https://github.com/user-attachments/assets/9af9d4ff-f5fa-4cc7-be30-7ad75c4393e3)
  
     ![비밀번호 찾기 2](https://github.com/user-attachments/assets/c9b0ca74-402c-43a7-9254-3da52bb12ba9)

### 🔹프로필 관리 시스템
   #### 사용자는 자신의 프로필을 관리하고, 프로필 사진을 업로드할 수 있습니다.

   - ##### 프로필 정보 관리: 사용자 이름, 자기소개 수정할 수 있습니다.

     ![정보 수정](https://github.com/user-attachments/assets/6e926b9b-a09f-4f6d-9a51-8f33c2a213e0)

   - ##### 프로필 사진 업로드: Multer 및 Cloudinary를 활용한 이미지 저장

     ![프로파일 사진 변경](https://github.com/user-attachments/assets/f6dd827d-f8b9-46a9-8a72-d36dc6c0741f)

   - ##### 비밀번호 변경: 현재 비밀번호 확인 후 새 비밀번호 설정

     ![비밀번호 수정](https://github.com/user-attachments/assets/6c5acec5-8008-4e93-8432-04d51cdaf425)

   - ##### 사용자 리뷰 목록 확인: 자신이 작성한 리뷰를 한눈에 조회 및 검색 가능

     ![사용자 리뷰 목록 확인](https://github.com/user-attachments/assets/c70b4c84-8365-414c-bab9-b1ffb05e2e39)

     ![사용자 리뷰 목록 검색](https://github.com/user-attachments/assets/206dd165-2582-4426-b7fd-fa38f49ec44b)

     
🔹 관리자 기능
- 📊 관리자 대시보드 (유저 & 리뷰 & 리포트 관리)
  1. 🛠 리뷰 관리: 모든 리뷰를 조회하고, 부적절한 리뷰를 삭제할 수 있습니다.
  2. 👤 사용자 관리: 사용자 목록을 확인하고, 유저 정보를 관리할 수 있습니다.
  3. 🚨 신고 리뷰 관리: 신고된 리뷰를 확인하고 조치를 취할 수 있습니다.
 
     ![관리자 페이지](https://github.com/user-attachments/assets/57935669-1ae3-47b7-8c82-37748c96dfd1)


## 🛠️ Tech Stack (기술 스택)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap, Custom CSS
- **Authentication:** Passport.js (Local Strategy)
- **Deployment:** Render

## 📥 Installation (설치 방법)
1. 프로젝트 클론
   ```sh
   git clone https://github.com/your-username/book-review-app.git
   cd book-review-app
