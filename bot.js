const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();

// Read token from environment for safety. Do NOT commit your token to the repo.
const TOKEN = process.env.BOT_TOKEN || process.env.TOKEN;
if (!TOKEN) {
    console.error('❌ No bot token found. Set BOT_TOKEN in environment or create a .env file.');
    process.exit(1);
}

// Configuration dial l-bot (Intents darouriyin bach i9ra l-messages)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Fach l-bot kiyatla3 Online
client.once(Events.ClientReady, (c) => {
    console.log(`✅ Safi! Bot khdam ssmytou: ${c.user.tag}`);
    console.log(`🚀 Bot daba Online f Discord!`);
});

// Fach chi wa7d kiysefet message
client.on(Events.MessageCreate, async (message) => {
    // Ila l-bot hua li sifet message, maydir walou
    if (message.author.bot) return;

    // Command sghira bach t-testi
    try {
        if (message.content === '!ping') {
            await message.reply('🏓 Pong! Bot dialk khdam 100% bla errors!');
        }
    } catch (err) {
        console.error('Error handling message:', err);
    }
});

// Global error handlers to keep the process alive and log issues
client.on('error', console.error);
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});

// Login
client.login(TOKEN).catch(err => {
    console.error('❌ Login failed. Check your token and network.');
    console.error(err);
});