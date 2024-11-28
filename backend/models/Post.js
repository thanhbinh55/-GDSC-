//model cho bài viết (mô hình MVC)
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: { type: String, require: true},
    image: {type: String},
    tags: [String],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},{timestamps: true});

module.exports = mongoose.model('Post', postSchema);