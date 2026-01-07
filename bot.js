const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 🔹 ملي البوت يولي Online
client.once("ready", () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);

  client.user.setPresence({
    activities: [{
      name: "NeGANoX Emulator",
      type: ActivityType.Playing
    }],
    status: "online"
  });
});

// 🔹 مثال: أمر !ping
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("🏓 Pong!");
  }
});

// 🔹 حط التوكن ديالك هنا
client.login("MTQ0ODgzMjU3MDkxMjQxMTg1MA.Gti2Pw.b86Fxh5DFND7q9m38JrnTq6-bJcxf7Ei-imgaM");
