import { handleStart, handleContact } from "../controller/auth.controller.js";

export default function authRouter(bot) {
  // '/start' komandasi uchun handler
  bot.command("start", handleStart);

  // Kontaktni qabul qilish va ro‘yxatdan o‘tkazish
  bot.on("message", (ctx) => {
    if (ctx.message.contact) {
      handleContact(ctx);
    }
  });
}