// เซิร์ฟเวอร์แบ็กเอนด์ (Node.js กับ Express)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// การเชื่อมต่อฐานข้อมูลตัวอย่าง
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // ให้ใช้รายละเอียดการเชื่อมต่อฐานข้อมูลจริงของคุณ

// Middleware
app.use(bodyParser.json());

// พาทของการล็อกอิน
app.post('/index', (req, res) => {
  const { username, password } = req.body;

  // คิวรีฐานข้อมูลเพื่อตรวจสอบชื่อผู้ใช้และรหัสผ่าน
  db.get('SELECT * FROM databd WHERE ชื่อนักเรียน = ? AND รหัสนักเรียน = ?', [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (row) {
      // ล็อกอินสำเร็จ
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // ล็อกอินไม่สำเร็จ
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// script2


