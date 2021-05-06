const embedBuilder = require('../function');

module.exports = {
  name: 'Autoplay', // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ['toggleautoplay', 'autoplay', 'tgauto'], // Optional
  category: 'Command Music',
  description: 'Command to activated/deactivated Autoplay!',
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);
    if (!queue) return;
    client.distube.toggleAutoplay(message);

    const status = `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || 'OFF'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

    embedBuilder(client, message, `BLUE`, `Status: `, status, message.author).then((msg) => {
      msg.delete({ timeout: 5 * 1000 });
    });
  },
};
