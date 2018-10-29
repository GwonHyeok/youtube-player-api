'use strict';
const bCrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'admin')
  });

  User.associate = function() {

  };

  // 유저 생성시 비밀번호 해시
  User.beforeCreate((user, options) => new Promise((resolve, reject) => {
      bCrypt.hash(user.password, 10)
        .then(hashedPassword => {
          user.password = hashedPassword;
          resolve(user);
        })
        .catch(error => reject(error))
    }
  ));

  // 유저 비밀번호 검증
  User.prototype.verifyPassword = async function(password) {
    return await bCrypt.compare(password, this.password)
  };

  // 이 유저가 관리자 입니까
  User.prototype.isAdmin = function() {
    return this.role === 'admin';
  };


  return User;
};
