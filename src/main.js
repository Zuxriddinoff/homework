import { bot } from "./app.js";  // app.js dan botni import qilish

// Botni ishga tushirish
bot.launch();
console.log("🤖 Bot ishga tushdi...");

// Graceful stop (CTRL+C bosilganda)
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
