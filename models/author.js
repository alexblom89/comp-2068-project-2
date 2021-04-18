const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

AuthorSchema.methods.getBooks = async function () {
    return await mongoose.model('Book').find({ author: this._id });
}

module.exports = mongoose.model('Author', AuthorSchema);