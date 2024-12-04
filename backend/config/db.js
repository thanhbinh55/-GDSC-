const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // Kết nối MongoDB mà không cần các tuỳ chọn deprecated
    await mongoose.connect(mongoURI);

    console.log('Kết nối đến MongoDB thành công!');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error);
    process.exit(1);  // Thoát khi gặp lỗi kết nối
  }
};

module.exports = connectDB;
