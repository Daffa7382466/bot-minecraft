const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: '144.76.58.217', // ganti dengan IP server kamu
    port: 29350,           // port server kamu
    username: 'BotAFK'
  });

  bot.on('error', (err) => {
    console.log('Bot error:', err);
  });

  return bot;
}

module.exports = createBot;
