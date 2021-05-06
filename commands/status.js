const embedBuilder = require('../function');

module.exports = {
  name: 'Status', // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ['status', ''], // Optional
  category: 'Command Music',
  description: 'Command to view the status the bot!',
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    const status = `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || 'OFF'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

    if (!queue) return;
    embedBuilder(client, message, `BLUE`, `Status BOT: `, status, message.author).then((msg) => {
      msg.delete({ timeout: 5 * 1000 });
    });
  },
};
