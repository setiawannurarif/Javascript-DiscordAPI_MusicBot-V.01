const embedBuilder = require('../function');

module.exports = {
  name: 'Search', // Optional
  //   commands: ["runplay"], // Optional
  aliases: ['search', ''], // Optional
  category: 'Command Music',
  description: 'Command to search and play a song.',
  minArgs: '1',
  expectedArgs: '<Artist> - <Song Name>',
  callback: async ({ client, message }) => {
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.slice(1).join(' ');

    embedBuilder(client, message, 'BLUE', `Searching \`${command}\``).then((msg) => {
      msg.delete({ timeout: 3 * 1000 });
    });

    let result = await client.distube.search(command);

    let searchresult = '';

    for (let i = 0; i <= result.length; i++) {
      try {
        searchresult += await `**${i + 1}**. [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`;
      } catch {
        searchresult += await ' ';
      }
    }
    let searchembed = await embedBuilder(client, message, 'BLUE', 'Result Search: ', `Choose number 1 between 15, and type the number correctly: \n${searchresult}`, message.author);

    let userinput;

    await searchembed.channel
      .awaitMessages((m) => m.author.id == message.author.id, {
        max: 1,
        time: 60000,
        errors: ['time'],
      })
      .then((collected) => {
        userinput = collected.first().content;
        if (isNaN(userinput)) {
          embedBuilder(client, message, 'RED', 'Not a right number!', 'Choose between 0 - 15, Autoplay number 1!').then((msg) => {
            msg.delete({ timeout: 10000 });
          });
          userinput = 1;
        }
        searchembed.delete({ timeout: Number(client.ws.ping) });
      })
      .catch(() => {
        console.log(console.error);
        userinput = 404;
      });
    if (userinput === 404) {
      return embedBuilder(client, message, 'RED', 'Something went wrong!');
    }
    embedBuilder(client, message, 'BLUE', 'Playing a song!', `🎶 Started playing: [${result[userinput - 1].name}](${result[userinput - 1].url})`, message.author, result[userinput - 1].thumbnail).then((msg) => {
      msg.delete({ timeout: 3000 });
    });
    return client.distube.play(message, result[userinput - 1].url);
  },
};
