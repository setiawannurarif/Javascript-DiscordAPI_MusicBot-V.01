const embedBuilder = require('../function');

module.exports = {
  name: 'Seek Music', // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ['rewind', ''], // Optional
  category: 'Command Music',
  description: 'Command to Rewind the music!',
  minArgs: 1,
  maxArgs: 1,
  callback: ({ message, client }) => {
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = queue.currentTime - args.slice(1) * 1000;

    let queue = client.distube.getQueue(message);

    if (!queue) return;
    embedBuilder(client, message, `BLUE`, ``, `Rewind the song for \`${Number(command)} seconds\``, message.author).then((msg) => {
      msg.delete({ timeout: 5 * 1000 });
    });
    client.distube.seek(message, Number(command));
  },
};
