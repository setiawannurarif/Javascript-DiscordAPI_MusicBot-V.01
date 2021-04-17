const embedBuilder = require("../function");

module.exports = {
  name: "Volume BOT", // Optional
  aliases: ["volume", "vol"], // Optional
  category: "Command Music",
  description: "Command to increase/decrease volume the bot!",
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "10 - 200",

  callback: ({ message, client }) => {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.slice(1);

    let queue = client.distube.getQueue(message);

    if (queue) {
      if (parseInt(command)) {
        client.distube.setVolume(message, parseInt(command));
      } else {
        return embedBuilder(
          client,
          message,
          `RED`,
          `Error: Volume ${command}`,
          `Use volume between 0-200`
        );
      }

      const status = `Volume: \`${queue.volume}\` | Filter: \`${
        queue.filter || "OFF"
      }\` | Loop: \`${
        queue.repeatMode
          ? queue.repeatMode === 2
            ? "All Queue"
            : "This Song"
          : "Off"
      }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

      embedBuilder(
        client,
        message,
        `BLUE`,
        `Volume: `,
        `${message.author.tag} has changed the volume to: \`${command} %\`\n\n${status}`
      ).then((msg) => {
        msg.delete({ timeout: 5 * 1000 });
      });
    } else {
      return;
    }
  },
};
