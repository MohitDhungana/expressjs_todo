const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'mohit',
  password: '123456789',
  host: 'localhost',
  port: 5432,
  database: 'todo',
});

module.exports = pool;
