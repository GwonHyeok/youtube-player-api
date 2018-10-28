module.exports = function(sequelize, DataTypes) {
  const Genres = sequelize.define('Genres', {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      thumbnailUri: {
        type: DataTypes.STRING,
        allowNull: true
      },
      states: {
        type: DataTypes.ENUM,
        values: ['Draft', 'Published', 'Archived', 'Deleted'],
        defaultValue: 'Published'
      }
    },
    {
      tableName: 'genres'
    }
  );

  return Genres;
};

