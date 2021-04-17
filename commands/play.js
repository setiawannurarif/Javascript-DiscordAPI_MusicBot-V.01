const embedBuilder = require("../function");

module.exports = {
  name: "play", // Optional
  aliases: ["p", "play"], // Optional
  category: "Command Music",
  description: "Command to play a song.",
  minArgs: 1,

  callback: ({ client, message }) => {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.slice(1).join(" ");

    embedBuilder(
      client,
      message,
      `BLUE`,
      ``,
      `**Searching: ** ${command}!`,
      message.author
    ).then((msg) => {
      msg.delete({ timeout: 5 * 1000 });
    });

    client.distube.play(message, command);
  },
};
