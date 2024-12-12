const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
username : {type: String, required: true,unique: true, minlenght: 5, maxlenght:20},
email : {type: String, required: true,unique: true, minlenght: 5, maxlenght:50},
password: {type: String, required: true, minlenght: 1, maxlenght: 50},
refreshTokens: { type: [String], default: [] },
},
{timestamps: true}
);

module.exports = mongoose.model('User', userSchema);