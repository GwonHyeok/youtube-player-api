const express = require('express');
const router = express.Router();
const { Genre } = require('../models');
const asyncHandler = require('../helpers/asyncHandler');

// Uploader
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const upload = multer({
  storage: multerS3({
    s3: new aws.S3({}),
    bucket: 'storage.youtube-player.com',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    },
    acl: 'public-read-write'
  })
});


// 장르 생성
router.post('/', upload.single('thumbnail'), asyncHandler(async function(req, res) {
  if (req.file) req.body.thumbnailUri = req.file.location;

  const genre = await Genre.create(req.body);
  res.json({ data: genre })
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

// 장르 수정
router.put('/:id', upload.single('thumbnail'), asyncHandler(async function(req, res) {
  if (req.file) req.body.thumbnailUri = req.file.location;

  const genre = await Genre.findOne({ where: { id: req.params.id } });
  await genre.update(req.body);
  res.json({ data: genre })
}));

module.exports = router;
