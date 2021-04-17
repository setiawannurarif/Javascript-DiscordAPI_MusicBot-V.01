const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "Ping", // Optional
  aliases: ["ping", ""], // Optional
  category: "Features",
  description: "Command to test ping a bot!",
  callback: ({ client, message }) => {
    return embedBuilder(
      client,
      message,
      `YELLOW`,
      `Ping!`,
      `The bot ping is: \`${client.ws.ping} ms!\``,
      message.author
    ).then((msg) => {
      msg.delete({ timeout: 5 * 1000 });
    });
  },
};
