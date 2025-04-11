import { mongoose } from "mongoose";
import { book } from "../models/index.js";

export const bookController = {
  findOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      const oneBook = await book.findById(id);

      if (!oneBook) return res.status(404).json(`Book not found`);

      res.json(oneBook);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const allBooks = await book.find();
      if(allBooks.length === 0) return res.status(400).send(`Books not found`)
      res.json(allBooks);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { title, author, release_date } = req.body;

      if (!title || !author || !release_date) {
        return res.status(400).send(`All data is required`);
      }

      const newBook = new book({
        title,
        author,
        release_date,
      });

      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const { title, author, release_date } = req.body;

    try {
      if (!title && !author && !release_date) {
        return res.status(400).send(`At least one data is required `);
      }

      const updatedBook = await book.findByIdAndUpdate(
        id,
        { title, author, release_date },

        {
          new: true,
        }
      );

      if (!updatedBook)
        return res.status(404).json(`Book not found`);

      res.json(updatedBook);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(404).json(`ID is required`);
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json("Invalid ID format");
      }

      const deletedBook = await book.deleteOne({ _id: id });

      if (!deletedBook)
        return res.status(404).json(`Book not found`);

      res.json(`Book successfully deleted`);
    } catch (error) {
      next(error);
    }
  },
};
