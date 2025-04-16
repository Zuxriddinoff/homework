import User from "../models/user.model.js";

export const findUserByPhone = async (phone) => {
  return await User.findOne({ phone_number: phone });
};

export const createUser = async ({ telegram_id, first_name, last_name, phone_number }) => {
  const newUser = new User({
    telegram_id,
    first_name,
    last_name: last_name || "",
    phone_number
  });
  return await newUser.save();
};
