const express = require('express');
const router = express.Router();
const { Genre } = require('../models');
const asyncHandler = require('../helpers/asyncHandler');

// 장르 생성
router.post('/', asyncHandler(async function(req, res) {
  res.json({ data: {} })
}));

// 장르 리스트
router.get('/', asyncHandler(async function(req, res) {
  const genres = await Genre.findAll({ where: { states: 'Published' } });
  res.json({ data: genres })
}));

// 장르 상세보기
router.get('/:id', asyncHandler(async function(req, res) {
  const genre = await Genre.findOne({ where: { id: req.params.id } });
  res.json({ data: genre })
}));

module.exports = router;
