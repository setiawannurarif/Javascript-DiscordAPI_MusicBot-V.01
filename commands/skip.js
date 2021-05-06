const embedBuilder = require('../function');

module.exports = {
  name: 'Skip a song', // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ['skip', ''], // Optional
  category: 'Command Music',
  description: 'Command to skip a song!',
  callback: ({ message, client }) => {
    let queue = client.distube.getQueue(message);

    if (!queue) return;
    embedBuilder(client, message, `BLUE`, ``, `${message.author.tag} has skip the song.`, message.author).then((msg) => {
      msg.delete({ timeout: 3 * 1000 });
    });
    client.distube.skip(message);
  },
};
