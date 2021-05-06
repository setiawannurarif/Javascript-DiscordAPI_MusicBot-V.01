const embedBuilder = require('../function');

module.exports = {
  name: 'Now Playing', // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ['nowplaying', 'np'], // Optional
  category: 'Command Music',
  description: 'Command to view the currently song!',
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    if (!queue) return;
    let cursong = queue.songs[0];

    const status = `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || 'OFF'}\` \nLoop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

    embedBuilder(client, message, `BLUE`, `Now Playing: `, `[${cursong.name}](${cursong.url})\n\nDuration: \`${cursong.formattedDuration}\`\n\n${status}`, message.author, cursong.thumbnail).then((msg) => {
      msg.delete({ timeout: 20 * 1000 });
    });
  },
};
