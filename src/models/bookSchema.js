import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  author: {
    type: String,
    required: true,
    maxLength: 50,
  },
  release_date: {
    type: Date,
    required: true,
  },
});

export const book = mongoose.model(
  "book",
  bookSchema
);