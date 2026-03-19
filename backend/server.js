const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Khai báo Routes
const sceneRoutes = require('./routes/sceneRoutes');
app.use('/api/scenes', sceneRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Đã kết nối thành công với MongoDB'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// Route test cơ bản
app.get('/', (req, res) => {
  res.send('VJU Virtual Tour API đang chạy!');
});

// Khởi chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});