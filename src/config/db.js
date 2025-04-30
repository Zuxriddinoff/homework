import { connect } from "mongoose";

export const monngoDB = () => {
  try {
    connect(process.env.MONGO_URI);
    console.log(`Mongo connected`);
  } catch (error) {
    console.error(`Error in connecting mongo`);
  }
};
