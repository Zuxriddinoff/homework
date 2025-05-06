import { connect } from 'mongoose';

export const connectDB = async () => {
  try {
    await connect(process.env.DB_MONGO);
    console.log('Database connected');
  } catch (error) {
    console.log(`Error on connecting to database: ${error}`);
  }
};
