module.exports = {
  development: {
    sequelize: {
      dialect: "sqlite",
      storage: "./db.development.sqlite"
    }
  },
  production: {
    sequelize: {
      dialect: 'mysql',
      database: 'youtube-player',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST
    }
  }
};
