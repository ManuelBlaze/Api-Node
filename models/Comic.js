const mongoose = require('mongoose');

const ComicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    read: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
});

module.exports = mongoose.model('Comic', ComicSchema);