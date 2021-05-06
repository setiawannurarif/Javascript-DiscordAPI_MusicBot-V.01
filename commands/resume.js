const embedBuilder = require('../function');

module.exports = {
  name: 'Resume', // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ['resume', ''], // Optional
  category: 'Command Music',
  description: 'Command to resume the music!',
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    if (!queue) return;
    client.distube.resume(message);
    embedBuilder(client, message, `BLUE`, ``, `${message.author.tag} has resume the music!`).then((msg) => {
      msg.delete({ timeout: 3 * 1000 });
    });
  },
};
