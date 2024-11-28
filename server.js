const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./backend/config/db');
const route = require('./backend/routes');
const { engine } = require('express-handlebars'); // Import Handlebars adapter
const path = require('path'); // Import để xử lý đường dẫn
const port = 3000;

dotenv.config();

const app = express();
connectDB();
app.use(express.json());

// Cấu hình Handlebars
app.engine(
  'handlebars',
  engine({
    extname: '.handlebars', // Định dạng file template
    defaultLayout: 'main', // Layout mặc định
    layoutsDir: path.join(__dirname, '/backend/views/layouts'), // Thư mục layout
    partialsDir: path.join(__dirname, '/backend/views/partials'), // Thư mục chứa partials
  })
);

app.set('view engine', 'handlebars'); // Thiết lập view engine là Handlebars
app.set('views', path.join(__dirname, '/backend/views')); // Đường dẫn thư mục views

// Route trang chủ
app.get('/', (req, res) => {
  res.render('home', { title: 'Trang chủ', message: 'Chào mừng đến với Handlebars!' });
});

// Routes init
route(app);

// Start server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
