module.exports = function(sequelize, DataTypes) {
  const Genre = sequelize.define('Genre', {
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
    }
  );

  Genre.associate = function() {

  };

  return Genre;
};

