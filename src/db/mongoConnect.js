import { connect } from "mongoose";
import { config } from "../config/index.js";

export async function mongoConnect() {
  try {
    await connect(config.db.url);
    console.log(`Mongo connected successfully`);
  } catch (error) {
    console.error(`Mongo connection failed`);
    process.exit(1);
  }
}
