const embedBuilder = require("../function");

module.exports = {
  name: "Seek Music", // Optional
  aliases: ["seek", ""], // Optional
  category: "Command Music",
  description: "Command to seek the music!",
  minArgs: 1,
  maxArgs: 1,
  callback: ({ message, client }) => {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.slice(1);

    let queue = client.distube.getQueue(message);

    if (queue) {
      embedBuilder(
        client,
        message,
        `BLUE`,
        ``,
        `Seeked the song for \`${Number(command * 1000)} seconds\``,
        message.author
      ).then((msg) => {
        msg.delete({ timeout: 5 * 1000 });
      });
      client.distube.seek(message, Number(command * 1000));
    } else {
      return;
    }
  },
};
