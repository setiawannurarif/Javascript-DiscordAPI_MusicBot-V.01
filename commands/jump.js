const embedBuilder = require('../function');

module.exports = {
  name: 'Jump', // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ['jump', ''], // Optional
  category: 'Command Music',
  description: 'Command to jump to anther song!',
  minArgs: 1,
  maxArgs: 1,
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);

    if (!queue) return;
    if (0 <= Number(args[1]) && Number(args[1]) <= queue.songs.length) {
      embedBuilder(client, message, `BLUE`, `Jump!`, `Jumped ${parseInt(args[1])} songs!`).then((msg) => {
        msg.delete({ timeout: 10 * 1000 });
      });
      return client.distube.jump(message, parseInt(args[1]));
    } else {
      embedBuilder(client, message, `RED`, `Jump error!`, `Please use a number between: **0** and **${queue.songs.length}**`).then((msg) => {
        msg.delete({ timeout: 5 * 1000 });
      });
    }
  },
};
