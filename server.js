const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database('your_database.db');

app.post('/index', (req, res) => {
  const { username, password } = req.body;

  // Query the database to check for matching username and password
  const query = `SELECT * FROM databd WHERE ชื่อนักเรียน = ? AND รหัสนักเรียน = ?`;
  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (row) {
      // Successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Invalid username or password
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
