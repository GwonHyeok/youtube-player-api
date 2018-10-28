module.exports = function(sequelize, DataTypes) {
  const Songs = sequelize.define('Songs', {
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
      genreId: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          key: 'id',
          model: 'Genres'
        }
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
    },
    {
      tableName: 'songs'
    }
  );

  Songs.associate = function({ Genres }) {
    Songs.belongsTo(Genres, { as: 'genre' })
  };

  return Songs;
};

