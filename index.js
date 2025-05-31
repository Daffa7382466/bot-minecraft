const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Web server biar Railway ngasih link .up.railway.app
app.get('/', (req, res) => {
  res.send('Bot is online!');
});
app.listen(PORT, () => {
  console.log(`Server aktif di port ${PORT}`);
});

function startBot() {
  const bot = mineflayer.createBot({
    host: '144.76.58.217',
    port: 29350,
    username: 'BotAFK'
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat(`Halo ${username}`);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', err => console.log('Error:', err));

  setInterval(() => {
    if (bot.chat) bot.chat('Anti AFK!');
  }, 180000);
}

startBot();

