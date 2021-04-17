const embedBuilder = require("../function");

module.exports = {
  name: "Queue Song", // Optional
  aliases: ["queue", ""], // Optional
  category: "Command Music",
  description: "Command to see queue a music!",
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    if (queue) {
      let curQueue = queue.songs
        .map(
          (song, id) =>
            `**${id + 1}**. [${song.name}](${song.url}) - \`${
              song.formattedDuration
            }\``
        )
        .join("\n");

      embedBuilder(
        client,
        message,
        `BLUE`,
        `Queue: `,
        curQueue,
        message.author
      ).then((msg) => {
        msg.delete({ timeout: 20 * 1000 });
      });
    } else {
      return;
    }
  },
};
