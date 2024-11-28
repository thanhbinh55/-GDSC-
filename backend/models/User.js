const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type:String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
},{timestamps: true});

// Hàm mã hóa mật khẩu - có thể thay đổi sau này
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

module.exports = mongoose.model('User', userSchema);