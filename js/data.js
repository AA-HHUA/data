const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// 创建与 MySQL 数据库的连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'sql_data'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// 创建表格用于存储用户信息
const createTableQuery = `CREATE TABLE IF NOT EXISTS data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255),
  datetime date,
  place VARCHAR(255),
  photo TEXT
)`;

connection.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table: ' + err.stack);
    return;
  }
  console.log('Table created successfully');
});

app.use(express.json());

app.post('/submit', (req, res) => {
  const { message, datetime , place,} = req.body;

  const insertQuery = `INSERT INTO data (message, datatime, place) VALUES ('${message}', '${datetime}', '${place}')`;

  connection.query(insertQuery, (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully');
    res.status(201).send('Data inserted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});