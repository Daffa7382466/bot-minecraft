const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mineflayer = require('mineflayer');
const createBot = require('./bot');

let bot = null;
let interval = null;

app.get('/', (req, res) => {
  res.send('Bot controller aktif!');
});

app.listen(PORT, () => {
  console.log(`✅ Web server aktif di port ${PORT}`);
});

function checkPlayers() {
  const tempBot = mineflayer.createBot({
    host: '144.76.58.217',
    port: 29350,
    username: 'BotChecker'
  });

  tempBot.once('spawn', () => {
    const players = Object.keys(tempBot.players).filter(name => name !== 'BotChecker');

    console.log('[Checker] Jumlah player:', players.length);

    if (players.length > 0) {
      if (bot) {
        console.log('[Checker] Ada player! Kick bot...');
        bot.quit();
        bot = null;
      }
    } else {
      if (!bot) {
        console.log('[Checker] Server kosong, nyalain bot...');
        bot = createBot();
      }
    }

    setTimeout(() => tempBot.quit(), 1000); // keluar setelah cek
  });

  tempBot.on('error', (err) => {
    console.log('[Checker] Gagal konek:', err.message);
  });
}

interval = setInterval(checkPlayers, 15_000); // cek tiap 15 detik
