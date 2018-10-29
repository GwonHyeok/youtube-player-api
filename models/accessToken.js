'use strict';
module.exports = function(sequelize, DataTypes) {
  const AccessToken = sequelize.define('AccessToken', {
    token: DataTypes.STRING
  });

  AccessToken.associate = function({ User }) {
    AccessToken.belongsTo(User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  };

  return AccessToken;
};
