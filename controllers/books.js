const { response } = require('express');
const Book = require('../models/book');

exports.index = async (req, resp, next) => {
    try {
        const books = await Book.find().populate('author');
        resp.status(200)
        .json(books);

    } catch (error) {
        next(error);
    }
};

exports.show = async (req, resp, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id).populate('author');

        resp.status(200).json(book);

    } catch (error) {
        next(error);
    }
};

exports.create = async (req, resp, next) => {
    try {
        const {
            title,
            year,
            author
        } = req.body;

        const book = await Book.create({
            title,
            year,
            author
        });

        resp.status(200).json({
            message: "Book was created successfully",
            status: "success",
            book
        });

    } catch (error) {
        next(error);
    }
};

exports.update = async (req, resp, next) => {
    try {
        const {
            id,
            title,
            year,
            author
        } = req.body;

        await Book.findOneAndUpdate({ _id: id }, {
            id,
            title,
            year,
            author
        });

        const book = await Book.findById(id);

        resp.status(200).json({
            message: "Book was updated successfully",
            status: "success",
            book
        });

    } catch (error) {
        next(error);
    }
};

exports.destroy = async (req, resp, next) => {
    try {
        const { id } = req.body;

        await Book.findOneAndDelete({ _id: id });

        resp.status(200).json({
            message: "Book was deleted successfully",
            status: "success"
        });

    } catch (error) {
        next(error);
    }
};