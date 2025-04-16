import { findUserByPhone, createUser } from "../service/auth.service.js";  // Import qilish controllerda

export const handleStart = async (ctx) => {
  const exists = await findUserByPhone(ctx.from.id); // Bu yerda service funksiyalaridan foydalanamiz
  if (exists) {
    return ctx.reply("Siz allaqachon ro'yxatdan o'tgansiz.");
  }
  ctx.reply("Iltimos telefon raqamingizni kiriting👇");
};

export const handleContact = async (ctx) => {
  const contact = ctx.message.contact;
  try {
    const exists = await findUserByPhone(contact.phone_number);  // Bu yerda ham
    if (exists) {
      ctx.reply(`Siz allaqachon ro'yxatdan o'tgansiz.`);
    } else {
      await createUser(contact);  // Yangi foydalanuvchi yaratish
      ctx.reply(`Siz muvaffaqiyatli ro'yxatdan o'tdingiz!`);
    }
  } catch (err) {
    console.error(err);
    ctx.reply("Xatolik yuz berdi.");
  }
};
