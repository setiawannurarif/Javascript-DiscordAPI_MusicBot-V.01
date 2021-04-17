const { MessageEmbed } = require("discord.js");

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filter || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode == 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

module.exports = (client) => {
  client.distube
    .on("addSong", async (message, queue, song) => {
      const embedAddSong = await embedBuilder(
        client,
        message,
        "BLUE",
        "Added a new song!",
        `Added [${song.name}](${song.url}) - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        song.thumbnail,
        song.user
      );
      embedAddSong.delete({ timeout: 60 * 1000 });
    })
    .on("addList", (message, queue, playlist) =>
      embedBuilder(
        client,
        message,
        "BLUE",
        "Addlist: ",
        `Added \`${playlist.name}\` playlist (${
          playlist.songs.length
        } songs) to queue\n${status(queue)}`,
        playlist.thumbnail,
        playlist.user
      )
    )
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
      let i = 0;
      embedBuilder(
        client,
        message,
        "BLUE",
        "Search Song: ",
        `**Choose an option from below**\n${result
          .map(
            (song) =>
              `**${++i}**. [${song.name}](${song.url}) - \`${
                song.formattedDuration
              }\``
          )
          .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`,
        ``,
        message.author
      );
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => {
      embedBuilder(client, message, `BLUE`, `Search Canceled!`);
    })
    .on("finish", (message) => {
      embedBuilder(client, message, "RED", "", "There are no more songs left");
    })
    .on("empty", (message) => {
      embedBuilder(
        client,
        message,
        "RED",
        "",
        "Left the channel cause it got empty!"
      );
    })
    .on("noRelated", (message) => {
      embedBuilder(
        client,
        message,
        "RED",
        "",
        "Can't find related video to play. Stop playing music."
      );
    })
    .on("initQueue", (queue) => {
      queue.autoplay = false;
      queue.volume = 100;
    })

    .on("error", (message, e) => {
      console.error(e);
      embedBuilder(
        client,
        message,
        `RED`,
        `Something went wrong!`,
        `An error encountered: \n${e}`
      );
    });
};

module.exports.config = {
  displayName: "Music-Event", // Can be changed any time
  dbName: "musicBot", // Should be unique and NEVER be changed once set
  loadDBFirst: false, // Wait for the database connection to be present
};

function embedBuilder(
  client,
  message,
  color,
  title,
  description,
  thumbnail,
  footer
) {
  var embed = new MessageEmbed().setColor(color);
  if (footer)
    embed.setFooter(
      "Requested by: " + footer.username,
      footer.displayAvatarURL()
    );
  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);
  if (thumbnail) embed.setThumbnail(thumbnail);
  return message.channel.send(embed).catch((e) => {
    console.error;
  });
}
