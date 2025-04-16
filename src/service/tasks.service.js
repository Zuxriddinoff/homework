import { Markup } from "telegraf";
import { findUserByPhone, createUser } from "../services/auth.service.js";

export const handleStart = (ctx) => {
  ctx.reply(
    "Iltimos telefon raqamingizni kiriting👇",
    Markup.keyboard([
      Markup.button.contactRequest("📱 Telefon raqamimni ulashish")
    ])
    .oneTime()
    .resize()
  );
};

export const handleContact = async (ctx) => {
  const contact = ctx.message.contact;

  try {
    const exists = await findUserByPhone(contact.phone_number);

    if (exists) {
      ctx.reply(`Salom yana, ${contact.first_name}! Siz allaqachon ro'yxatdan o'tgansiz.`);
    } else {
      await createUser({
        telegram_id: ctx.from.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        phone_number: contact.phone_number
      });

      ctx.reply(`Raxmat, ${contact.first_name}! Siz muvaffaqiyatli ro'yxatdan o'tdingiz ✅`, 
        Markup.keyboard([
          ["📝 Create Task", "📋 Find All Tasks"]
        ]).resize()
      );
    }
  } catch (err) {
    console.error("❌ User saqlashda xatolik:", err);
    ctx.reply("Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.");
  }
};
