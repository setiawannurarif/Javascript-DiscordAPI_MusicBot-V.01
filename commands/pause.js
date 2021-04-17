const embedBuilder = require("../function");

module.exports = {
  name: "Pause", // Optional
  aliases: ["pause", ""], // Optional
  category: "Command Music",
  description: "Command to pause the music!",
  callback: ({ client, message }) => {
    let queue = client.distube.getQueue(message);

    if (queue) {
      client.distube.pause(message);
      embedBuilder(
        client,
        message,
        `BLUE`,
        ``,
        `${message.author.tag} has paused the music!`
      ).then((msg) => {
        msg.delete({ timeout: 3 * 1000 });
      });
    } else {
      return;
    }
  },
};
