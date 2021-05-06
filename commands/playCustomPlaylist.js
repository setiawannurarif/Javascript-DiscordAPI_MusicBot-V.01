const embedBuilder = require("../function");

module.exports = {
  name: "Play Custom Playlist", // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ["playcustom", "pc"], // Optional
  category: "Command Music",
  description: "Command to play custom playlist!",
  callback: async ({ message, client }) => {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const plName = args.slice(1).join(" ");

    try {
      embedBuilder(
        client,
        message,
        `BLUE`,
        ``,
        `**You must put all URL: **\n\nMax: 15 URL Youtube\nURL1<space>URL2<space>etc..`,
        message.author
      ).then((msg) => {
        msg.delete({ timeout: 20 * 1000 });
      });

      var messageFilter = (m) => m.author.id === message.author.id;

      await message.channel
        .awaitMessages(messageFilter, { max: 1, time: 60000 })
        .then(async (collected) => {
          let result = [collected.first().content];
          let songs = result[0].split(" ");

          client.distube.playCustomPlaylist(message, songs, { name: plName });
          embedBuilder(
            client,
            message,
            `RED`,
            ``,
            `**Play Custom Playlist: **\nName: ${plName}`,
            message.author
          ).then((msg) => {
            msg.delete({ timeout: 10 * 1000 });
          });
        });
    } catch (e) {
      console.log(e);
    }
  },
};
