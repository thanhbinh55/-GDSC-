const mongoose = require('mongoose');

const connectDB = async () => {//Sử dụng async/await để xử lý các tác vụ bất đồng bộ (asynchronous). Kết nối MongoDB là một thao tác bất đồng bộ vì nó cần thời gian để thiết lập
    try {
        await mongoose.connect('mongodb://localhost:27017/code-sharing');
        console.log('MongoBD connected');
    } catch (error){
        console.error(`Error: ${error.message}`);//Thông báo lỗi
        process.exit(1);//Dừng chương trình
    }
};

module.exports = connectDB; //Xuất hàm để sử dụng trong file khác
