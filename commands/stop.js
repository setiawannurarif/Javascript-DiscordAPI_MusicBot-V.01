const embedBuilder = require("../function");

module.exports = {
  name: "Stop", // Optional
  aliases: ["s", "stop"], // Optional
  category: "Command Music",
  description: "Command to stop a song!",
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    if (queue) {
      client.distube.stop(message);
      embedBuilder(
        client,
        message,
        `BLUE`,
        ``,
        `${message.author.tag} has stopped the music!`
      ).then((msg) => {
        msg.delete({ timeout: 3 * 1000 });
      });
    } else {
      return;
    }
  },
};
