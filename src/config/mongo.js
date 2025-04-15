import mongoose from "mongoose";

export const mongoConnection = () => {
  mongoose
    .connect(process.env.URL)
    .then(() => console.log(`Mongo Connected successfully`))
    .catch((err) => console.error(err.message));
};
