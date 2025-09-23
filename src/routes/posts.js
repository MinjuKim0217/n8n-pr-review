const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 게시글 목록 조회
router.get('/', postController.getAllPosts);

// 게시글 생성
router.post('/', postController.createPost);

// 특정 게시글 조회
router.get('/:id', postController.getPostById);

// 게시글 업데이트
router.put('/:id', postController.updatePost);

// 게시글 삭제
router.delete('/:id', postController.deletePost);

module.exports = router;
