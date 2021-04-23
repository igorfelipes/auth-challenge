require('dotenv').config()

module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database":  process.env.DB_DATABASE,
  "host":  process.env.DB_HOST,
  // "port": 8889, //excluir
  "dialect": "mysql",
  "define": {
    "timestamps": false,
    "underscored": true,
    "underscoredAll": true,
  }
};

module.exports = {
  database: 'auth_challenge_db',
  username: '',
  password: '',
  dialect: 'sqlite',
  storage:'auth_challenge_db.sqlite',
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  }
}