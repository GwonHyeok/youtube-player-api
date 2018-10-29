const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler');
const httpRequest = require('request-promise-native');

const { Song, Genre, Sequelize } = require('../models');
const { Op } = Sequelize;
const ApiError = require('../helpers/error/apiError');

// 음악 셍성
router.post('/', asyncHandler(async function(req, res) {
  let youtubeResponse;

  try {
    youtubeResponse = await httpRequest({
      uri: `https://www.googleapis.com/youtube/v3/videos`,
      qs: {
        part: 'id,snippet,contentDetails',
        key: process.env.YOUTUBE_API_KEY,
        id: req.body.videoId,
        type: 'video'
      },
      json: true
    });
  } catch (e) {
    throw e;
  }

  // 유투브 아이디의 영상이 없을때
  if (youtubeResponse.items.length === 0) throw new ApiError('해당 유투브아이디의 영상이 없습니다', 403);

  // 유투브에서 받아온 영상 정보
  const youtubeItem = youtubeResponse.items.pop();
  const { snippet, contentDetails } = youtubeItem;
  const { title, thumbnails } = snippet;
  const { duration } = contentDetails;

  const standardThumbnails = thumbnails[Object.keys(thumbnails).reverse().pop()];
  const song = await Song.create({
    title,
    thumbnailUri: standardThumbnails.url,
    videoId: req.body.videoId,
    GenreId: req.body.GenreId,
    duration
  });

  res.json({ data: song });
}));

// 음악 리스트
router.get('/', asyncHandler(async function(req, res) {
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 15));
  const page = Math.max(1, parseInt(req.query.page) || 1);

  const where = {};

  // 키워드
  if (req.query.keyword) {
    Object.assign(where, { title: { [Op.like]: `%${req.query.keyword}%` } })
  }

  // 음악 조건절 추가
  if (req.user && req.user.isAdmin()) {
    where.states = { [Op.notIn]: ['Deleted'] };
  } else {
    where.states = 'Published';
  }

  // Filter
  if (req.query.genreId) Object.assign(where, { genreId: req.query.genreId });

  const songs = await Song.findAndCountAll({
    where,
    include: [
      { model: Genre }
    ],
    order: [['id', 'DESC']],
    limit: limit,
    offset: limit * (page - 1)
  });
  res.json({
    meta: {
      pagination: {
        limit: limit,
        max: Math.ceil(songs.count / limit),
        current: page,
        counts: songs.count
      }
    }, data: songs.rows
  })
}));

module.exports = router;
