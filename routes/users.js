const express = require('express');
const router = express.Router();
const asyncHandler = require('../helpers/asyncHandler');

const { User } = require('../models');
const { ApiError } = require("../helpers/error");

/**
 * 계정 생성
 */
router.post('/', asyncHandler(async function(request, response) {

  // 값 확인
  if (!request.body.username) throw new ApiError('아이디를 적어주세요', 403);
  if (!request.body.password) throw new ApiError('비밀번호를 적어주세요', 403);

  // 중복 계정 확인
  const isDuplicateEmail = await User.findOne({ where: { username: request.body.username } });
  if (isDuplicateEmail) throw new ApiError('중복된 아이디 입니다', 403);

  // 회원 생성 및 저장
  const user = new User(request.body);
  await user.save();

  response.status(200).json({ data: user });
}));

module.exports = router;
