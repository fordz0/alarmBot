const mongoose = require('mongoose')

const linkSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    puuid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('link', linkSchema)