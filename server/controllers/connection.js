// Database functionality for MariaDB (MySQL)

const mysql = require('mysql2/promise');
const dbConfig = require('./db-config.json');

const pool = mysql.createPool(dbConfig);

module.exports = pool;