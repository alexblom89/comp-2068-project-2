const Author = require('../models/author');

exports.index = async (req, resp, next) => {
    try {
        const authors = await Author.find().populate('book');

        resp.status(200).json(authors);

    } catch (error) {
        next(error);
    }
};

exports.show = async (req, resp, next) => {
    try {
        const { id } = req.params;

        const author = await Author.findById(id);
        const books = await author.getBooks();

        resp.status(200)
            .json({ ...author._doc, books });

    } catch (error) {
        next(error);
    }
};

exports.create = async (req, resp, next) => {
    try {
        const {
            firstName,
            lastName
        } = req.body;

        const author = await Author.create({
            firstName,
            lastName
        });

        resp.status(200).json({
            message: "Author was created successfully",
            status: "success",
            author
        });

    } catch (error) {
        next(error);
    }
};

exports.update = async (req, resp, next) => {
    try {
        const {
            id,
            firstName,
            lastName
        } = req.body;

        await Author.findOneAndUpdate({ _id: id}, {
            id,
            firstName,
            lastName
        });

        const author = await Author.findById(id);

        resp.status(200).json({
            message: "Author was updated successfully",
            status: "success",
            author
        });

    } catch (error) {
        next(error);
    }
};

exports.destroy = async (req, resp, next) => {
    try {
        const { id } = req.body;

        await Author.findOneAndDelete({ _id: id });

        resp.status(200).json({
            message: "Movie was deleted successfully",
            status: "success"
        });

    } catch (error) {
        next(error);
    }
};