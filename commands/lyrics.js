const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "Lyrics", // Optional
  //   commands: ["runbotinvite"], // Optional
  aliases: ["lyrics", "ly"], // Optional
  category: "Command Music",
  description: "Command to search lyrics a song!",
  minArgs: 1,
  expectedArgs: "<Artist>",
  callback: async ({ client, message }) => {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.slice(1).join(" ");

    let artist = command;
    let songName = "";
    let pages = [];
    let currentPage = 0;

    const messageFilter = (m) => m.author.id === message.author.id;
    const reactionFilter = (reaction, user) =>
      ["⬅️", "➡️"].includes(reaction.emoji.name) &&
      message.author.id === user.id;

    message.channel.send("Please enter the song name: ");
    await message.channel
      .awaitMessages(messageFilter, { max: 1, time: 60000 })
      .then(async (collected) => {
        songName = collected.first().content;

        await finder(artist, songName, message, pages);
      });

    const lyricsEmbed = await message.channel.send(
      `Lyrics page: ${currentPage + 1}/${pages.length}`,
      pages[currentPage]
    );
    await lyricsEmbed.react("⬅️");
    await lyricsEmbed.react("➡️");

    const collector = lyricsEmbed.createReactionCollector(reactionFilter);

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === "➡️") {
        reaction.users.remove(user).catch(console.error);
        if (currentPage < pages.length - 1) {
          currentPage += 1;
          lyricsEmbed.edit(
            `Lyrics page: ${currentPage + 1}/${pages.length}`,
            pages[currentPage]
          );
        }
      } else if (reaction.emoji.name === "⬅️") {
        reaction.users.remove(user).catch(console.error);
        if (currentPage !== 0) {
          currentPage -= 1;
          lyricsEmbed.edit(
            `Lyrics page: ${currentPage + 1}/${pages.length}`,
            pages[currentPage]
          );
        }
      }
    });
  },
};

async function finder(artist, songName, message, pages) {
  let fullLyrics = (await lyricsFinder(artist, songName)) || "Not Found!";

  for (let i = 0; i < fullLyrics.length; i += 2048) {
    const lyric = fullLyrics.substring(
      i,
      Math.min(fullLyrics.length, i + 2048)
    );
    const msg = new MessageEmbed().setDescription(lyric);
    pages.push(msg);
  }
}
