const embedBuilder = require("../function");

module.exports = {
  name: "Invite BOT", // Optional
  aliases: ["invite", ""], // Optional
  category: " Configuration",
  description: "Command to invite the bot!",
  callback: ({ client, message }) => {
    embedBuilder(
      client,
      message,
      `RED`,
      `Invite this bot`,
      `[klik here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot)`,
      message.author
    );
  },
};
