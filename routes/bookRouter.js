import express from 'express';
import { handleSearchResults, saveBook, getBookDetails } from '../controllers/bookController.js'

const router = express.Router();

// 검색 결과 처리
router.get('/results', handleSearchResults)

// 책 상세 페이지 책 정보 저장 및 조회
router.post('/save', saveBook)

// 책 상세 페이지
router.get('/:id', getBookDetails)

export default router;