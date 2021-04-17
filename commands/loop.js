const embedBuilder = require("../function");

module.exports = {
  name: "Loop", // Optional
  aliases: ["loop", "repeat"], // Optional
  category: "Command Music",
  description: "Command to loop the music!",
  maxArgs: 1,
  expectedArgs: "[0]/[1]/[2]",
  callback: ({ client, message }) => {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);

    let queue = client.distube.getQueue(message);

    const status = `Volume: \`${queue.volume}\` | Filter: \`${
      queue.filter || "OFF"
    }\` | Loop: \`${
      queue.repeatMode
        ? queue.repeatMode === 2
          ? "All Queue"
          : "This Song"
        : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

    if (queue) {
      if (0 <= Number(args[1]) && Number(args[1]) <= 2) {
        client.distube.setRepeatMode(message, parseInt(args[1]));
        embedBuilder(
          client,
          message,
          `BLUE`,
          `Repeat mode set to: `,
          `${args[1]
            .replace("0", "OFF")
            .replace("1", "Repeat song")
            .replace("2", "Repeat Queue")}\n\n${status}`
        );
      } else {
        embedBuilder(
          client,
          message,
          `RED`,
          `Repeat mode error: `,
          `Please use a number: **\n1. \`0\`: set to OFF\n2. \`1\`: set to repeat a song\n3. \`2\`: set to repeat a queue**`
        ).then((msg) => {
          msg.delete({ timeout: 5 * 1000 });
        });
      }
    } else {
      return;
    }
  },
};
