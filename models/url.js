const { default: mongoose } = require('mongoose');

console.mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {type: String, default: Date.now}
});

module.exports = mongoose.model('url', urlSchema);