const embedBuilder = require("../function");

module.exports = {
  name: "Shuffle", // Optional
  aliases: ["shuffle", ""], // Optional
  category: "Command Music",
  description: "Command to shuffle the music!",
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    if (queue) {
      embedBuilder(
        client,
        message,
        `BLUE`,
        ``,
        `Shuffle the music!`,
        message.author
      ).then((msg) => {
        msg.delete({ timeout: 5 * 1000 });
      });
      client.distube.shuffle(message);
    } else {
      return;
    }
  },
};
