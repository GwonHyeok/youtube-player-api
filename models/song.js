module.exports = function(sequelize, DataTypes) {
  const Song = sequelize.define('Song', {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING
      },
      videoId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      duration: {
        type: DataTypes.STRING
      },
      thumbnailUri: {
        type: DataTypes.STRING
      },
      states: {
        type: DataTypes.ENUM,
        values: ['Draft', 'Published', 'Archived', 'Deleted'],
        defaultValue: 'Published'
      }
    }
  );

  Song.associate = function({ Genre }) {
    Song.belongsTo(Genre, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  };

  return Song;
};

