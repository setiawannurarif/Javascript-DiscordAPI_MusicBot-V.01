const embedBuilder = require("../function");

module.exports = {
  name: "play and skip", // Optional
  aliases: ["ps", "playskip"], // Optional
  category: "Command Music",
  description: "Command to play and skip a song.",
  minArgs: 1,
  callback: ({ client, message }) => {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.slice(1).join(" ");

    let queue = client.distube.getQueue(message);

    if (queue) {
      embedBuilder(
        client,
        message,
        `BLUE`,
        ``,
        `Play ${command} and skipping previous song!`,
        message.author
      ).then((msg) => {
        msg.delete({ timeout: 5 * 1000 });
      });
      client.distube.playSkip(message, command);
    } else {
      return;
    }
  },
};
