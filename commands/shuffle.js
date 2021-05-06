const embedBuilder = require('../function');

module.exports = {
  name: 'Shuffle', // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ['shuffle', ''], // Optional
  category: 'Command Music',
  description: 'Command to shuffle the music!',
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    if (!queue) return;
    embedBuilder(client, message, `BLUE`, ``, `Shuffle the music!`, message.author).then((msg) => {
      msg.delete({ timeout: 5 * 1000 });
    });
    client.distube.shuffle(message);
  },
};
