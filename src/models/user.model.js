import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  telegram_id: { type: Number, required: true },
  first_name: String,
  last_name: String,
  phone_number: { type: String, required: true, unique: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
