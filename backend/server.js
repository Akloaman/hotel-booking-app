
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');



const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your XAMPP MySQL password (default is empty)
  database: 'database hotel_booking',
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL DB');
});

// POST route to handle bookings
app.post('/api/book', (req, res) => {
  const { hotel, guestName, email, checkIn, checkOut } = req.body;

  // First, get hotel ID
  const getHotelQuery = 'SELECT id FROM hotels WHERE name = ? LIMIT 1';
  db.query(getHotelQuery, [hotel], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) return res.status(404).json({ message: 'Hotel not found' });

    const hotel_id = results[0].id;

    const insertQuery = 'INSERT INTO bookings (hotel_id, guest_name, email, check_in, check_out) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [hotel_id, guestName, email, checkIn, checkOut], (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ success: true, message: 'Booking successful' });

    });
  });
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
