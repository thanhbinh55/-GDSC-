const mongoose = require('mongoose');
const slugify = require('slugify'); // Thư viện hỗ trợ tạo slug

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    tags: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    slug: { type: String, unique: true }, // Lưu slug
}, { timestamps: true });

// Middleware tự động tạo slug trước khi lưu
postSchema.pre('save', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Post', postSchema);
