const { MessageEmbed } = require('discord.js');
const lyricsFinder = require('lyrics-finder');

var status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode == 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

module.exports = (client, message) => {
  client.distube.on('playList', async (message, queue, playlist, song) => {
    var songQueue = playlist.songs.length;
    var bitrateChannel = queue.connection.channel.bitrate / 1000;
    var embedMusicPlaylist = await embedBuilder(
      client,
      message,
      'BLUE',
      'Playlist: ',
      `🎶 Started playing a Playlist: \`${playlist.name}\` \nplaylist (${playlist.songs.length} songs).\n\nNow playing [${song.name}](${song.url}) - Song Duration: \`${song.formattedDuration}\``,
      playlist.thumbnail.url,
      playlist.user,
      [
        { name: '\u200B', value: '\u200B' },
        {
          name: `Volume: `,
          value: `\`${queue.volume}%\``,
          inline: true,
        },
        {
          name: `Filter: `,
          value: `\`${queue.filter || 'Off'}\``,
          inline: true,
        },
        {
          name: `Loop: `,
          value: `\`${queue.repeatMode ? (queue.repeatMode == 2 ? 'All Queue' : 'This Song') : 'Off'}\``,
          inline: true,
        },
        {
          name: `Autoplay: `,
          value: `\`${queue.autoplay ? 'On' : 'Off'}\``,
          inline: true,
        },
        {
          name: `Total Queue: `,
          value: `\`${songQueue} songs\``,
          inline: true,
        },
        {
          name: `Bitrate: `,
          value: `\`${bitrateChannel} kbps\``,
          inline: true,
        },
        {
          name: `Command Channel:`,
          value: `<#${message.channel.id}>`,
          inline: true,
        },
        {
          name: `Server:`,
          value: `\`${message.guild.name}\`\n*Server Owner:*\n<@${message.guild.ownerID}>`,
          inline: true,
        },
        {
          name: `Invite me: `,
          value: `[klik here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot)`,
          inline: true,
        },
        { name: 'Version: ', value: `\`1.2.1\``, inline: false },
        {
          name: 'Design by: ',
          value: `[sNTINELs](https://twitter.com/setiawannurarif) - [Touch me](https://sociabuzz.com/sntinels/tribe)`,
          inline: false,
        },
      ]
    );
    try {
      await embedMusicPlaylist.react('⏭');
      await embedMusicPlaylist.react('⏯');
      await embedMusicPlaylist.react('🔇');
      await embedMusicPlaylist.react('🔉');
      await embedMusicPlaylist.react('🔊');
      await embedMusicPlaylist.react('🔁');
      await embedMusicPlaylist.react('♾️');
      await embedMusicPlaylist.react('📘');
      await embedMusicPlaylist.react('⏹');
      await embedMusicPlaylist.react('⚠️');
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = embedMusicPlaylist.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000,
    });

    collector.on('collect', async (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);

      switch (reaction.emoji.name) {
        case '⏭':
          reaction.users.remove(user).catch(console.error);
          client.distube.skip(message);
          message.channel
            .send(` ⏩ skipped the song`)
            .then((msg) => {
              msg.delete({ timeout: 2 * 1000 });
            })
            .catch(console.error);
          collector.stop();
          break;

        case '⏯':
          reaction.users.remove(user).catch(console.error);
          if (!queue) return;
          if (queue.pause === true) {
            client.distube.resume(message);
            message.channel
              .send(` ▶ resumed the music!`)
              .then((msg) => {
                msg.delete({ timeout: 2 * 1000 });
              })
              .catch(console.error);
          } else {
            client.distube.pause(message);
            message.channel
              .send(` ⏸ paused the music.`)
              .then((msg) => {
                msg.delete({ timeout: 2 * 1000 });
              })
              .catch(console.error);
          }
          break;

        case '🔇':
          reaction.users.remove(user).catch(console.error);
          if (!queue) return;
          if (queue.volume !== 0) {
            client.distube.setVolume(message, 0);

            embedBuilderEdit(client, message, 'BLUE', 'Playing a song!', `🎶 Started playing: [${song.name}](${song.url}) - Song Duration: \`${song.formattedDuration}\``, song.thumbnail, song.user, [
              { name: '\u200B', value: '\u200B' },
              {
                name: `Volume: `,
                value: `\`${queue.volume}%\``,
                inline: true,
              },
              {
                name: `Filter: `,
                value: `\`${queue.filter || 'Off'}\``,
                inline: true,
              },
              {
                name: `Loop: `,
                value: `\`${queue.repeatMode ? (queue.repeatMode == 2 ? 'All Queue' : 'This Song') : 'Off'}\``,
                inline: true,
              },
              {
                name: `Autoplay: `,
                value: `\`${queue.autoplay ? 'On' : 'Off'}\``,
                inline: true,
              },
              {
                name: `Total Queue: `,
                value: `\`${songQueue} songs\``,
                inline: true,
              },
              {
                name: `Bitrate: `,
                value: `\`${bitrateChannel} kbps\``,
                inline: true,
              },
              {
                name: `Command Channel:`,
                value: `<#${message.channel.id}>`,
                inline: true,
              },
              {
                name: `Server:`,
                value: `\`${message.guild.name}\`\n*Server Owner:*\n<@${message.guild.ownerID}>`,
                inline: true,
              },
              {
                name: `Invite me: `,
                value: `[klik here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot)`,
                inline: true,
              },
              { name: 'Version: ', value: `\`1.2.1\``, inline: false },
              {
                name: 'Design by: ',
                value: `[sNTINELs](https://twitter.com/setiawannurarif) - [Touch me](https://sociabuzz.com/sntinels/tribe)`,
                inline: false,
              },
            ]);
          } else {
            client.distube.setVolume(message, 100);

            embedBuilderEdit(client, message, 'BLUE', 'Playing a song!', `🎶 Started playing: [${song.name}](${song.url}) - Song Duration: \`${song.formattedDuration}\``, song.thumbnail, song.user, [
              { name: '\u200B', value: '\u200B' },
              {
                name: `Volume: `,
                value: `\`${queue.volume}%\``,
                inline: true,
              },
              {
                name: `Filter: `,
                value: `\`${queue.filter || 'Off'}\``,
                inline: true,
              },
              {
                name: `Loop: `,
                value: `\`${queue.repeatMode ? (queue.repeatMode == 2 ? 'All Queue' : 'This Song') : 'Off'}\``,
                inline: true,
              },
              {
                name: `Autoplay: `,
                value: `\`${queue.autoplay ? 'On' : 'Off'}\``,
                inline: true,
              },
              {
                name: `Total Queue: `,
                value: `\`${songQueue} songs\``,
                inline: true,
              },
              {
                name: `Bitrate: `,
                value: `\`${bitrateChannel} kbps\``,
                inline: true,
              },
              {
                name: `Command Channel:`,
                value: `<#${message.channel.id}>`,
                inline: true,
              },
              {
                name: `Server:`,
                value: `\`${message.guild.name}\`\n*Server Owner:*\n<@${message.guild.ownerID}>`,
                inline: true,
              },
              {
                name: `Invite me: `,
                value: `[klik here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot)`,
                inline: true,
              },
              { name: 'Version: ', value: `\`1.2.1\``, inline: false },
              {
                name: 'Design by: ',
                value: `[sNTINELs](https://twitter.com/setiawannurarif) - [Touch me](https://sociabuzz.com/sntinels/tribe)`,
                inline: false,
              },
            ]);
          }

          break;

        case '🔉':
          reaction.users.remove(user).catch(console.error);
          if (!queue || queue.volume === 0) return;
          if (queue.volume - 10 <= 0) queue.volume = 10;
          else queue.volume = queue.volume - 10;
          client.distube.setVolume(message, queue.volume);

          embedBuilderEdit(client, message, 'BLUE', 'Playing a song!', `🎶 Started playing: [${song.name}](${song.url}) - Song Duration: \`${song.formattedDuration}\``, song.thumbnail, song.user, [
            { name: '\u200B', value: '\u200B' },
            {
              name: `Volume: `,
              value: `\`${queue.volume}%\``,
              inline: true,
            },
            {
              name: `Filter: `,
              value: `\`${queue.filter || 'Off'}\``,
              inline: true,
            },
            {
              name: `Loop: `,
              value: `\`${queue.repeatMode ? (queue.repeatMode == 2 ? 'All Queue' : 'This Song') : 'Off'}\``,
              inline: true,
            },
            {
              name: `Autoplay: `,
              value: `\`${queue.autoplay ? 'On' : 'Off'}\``,
              inline: true,
            },
            {
              name: `Total Queue: `,
              value: `\`${songQueue} songs\``,
              inline: true,
            },
            {
              name: `Bitrate: `,
              value: `\`${bitrateChannel} kbps\``,
              inline: true,
            },
            {
              name: `Command Channel:`,
              value: `<#${message.channel.id}>`,
              inline: true,
            },
            {
              name: `Server:`,
              value: `\`${message.guild.name}\`\n*Server Owner:*\n<@${message.guild.ownerID}>`,
              inline: true,
            },
            {
              name: `Invite me: `,
              value: `[klik here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot)`,
              inline: true,
            },
            { name: 'Version: ', value: `\`1.2.1\``, inline: false },
            {
              name: 'Design by: ',
              value: `[sNTINELs](https://twitter.com/setiawannurarif) - [Touch me](https://sociabuzz.com/sntinels/tribe)`,
              inline: false,
            },
          ]);

          break;

        case '🔊':
          reaction.users.remove(user).catch(console.error);
          if (!queue || queue.volume === 0) return;
          if (queue.volume + 10 <= 0) queue.volume = 0 <= 200;
          else queue.volume = queue.volume + 10;
          client.distube.setVolume(message, queue.volume);

          embedBuilderEdit(client, message, 'BLUE', 'Playing a song!', `🎶 Started playing: [${song.name}](${song.url}) - Song Duration: \`${song.formattedDuration}\``, song.thumbnail, song.user, [
            { name: '\u200B', value: '\u200B' },
            {
              name: `Volume: `,
              value: `\`${queue.volume}%\``,
              inline: true,
            },
            {
              name: `Filter: `,
              value: `\`${queue.filter || 'Off'}\``,
              inline: true,
            },
            {
              name: `Loop: `,
              value: `\`${queue.repeatMode ? (queue.repeatMode == 2 ? 'All Queue' : 'This Song') : 'Off'}\``,
              inline: true,
            },
            {
              name: `Autoplay: `,
              value: `\`${queue.autoplay ? 'On' : 'Off'}\``,
              inline: true,
            },
            {
              name: `Total Queue: `,
              value: `\`${songQueue} songs\``,
              inline: true,
            },
            {
              name: `Bitrate: `,
              value: `\`${bitrateChannel} kbps\``,
              inline: true,
            },
            {
              name: `Command Channel:`,
              value: `<#${message.channel.id}>`,
              inline: true,
            },
            {
              name: `Server:`,
              value: `\`${message.guild.name}\`\n*Server Owner:*\n<@${message.guild.ownerID}>`,
              inline: true,
            },
            {
              name: `Invite me: `,
              value: `[klik here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot)`,
              inline: true,
            },
            { name: 'Version: ', value: `\`1.2.1\``, inline: false },
            {
              name: 'Design by: ',
              value: `[sNTINELs](https://twitter.com/setiawannurarif) - [Touch me](https://sociabuzz.com/sntinels/tribe)`,
              inline: false,
            },
          ]);
          break;

        case '♾️':
          reaction.users.remove(user).catch(console.error);
          client.distube.toggleAutoplay(message);
          embedBuilderEdit(client, message, 'BLUE', 'Playing a song!', `🎶 Started playing: [${song.name}](${song.url}) - Song Duration: \`${song.formattedDuration}\``, song.thumbnail, song.user, [
            { name: '\u200B', value: '\u200B' },
            {
              name: `Volume: `,
              value: `\`${queue.volume}%\``,
              inline: true,
            },
            {
              name: `Filter: `,
              value: `\`${queue.filter || 'Off'}\``,
              inline: true,
            },
            {
              name: `Loop: `,
              value: `\`${queue.repeatMode ? (queue.repeatMode == 2 ? 'All Queue' : 'This Song') : 'Off'}\``,
              inline: true,
            },
            {
              name: `Autoplay: `,
              value: `\`${queue.autoplay ? 'On' : 'Off'}\``,
              inline: true,
            },
            {
              name: `Total Queue: `,
              value: `\`${songQueue} songs\``,
              inline: true,
            },
            {
              name: `Bitrate: `,
              value: `\`${bitrateChannel} kbps\``,
              inline: true,
            },
            {
              name: `Command Channel:`,
              value: `<#${message.channel.id}>`,
              inline: true,
            },
            {
              name: `Server:`,
              value: `\`${message.guild.name}\`\n*Server Owner:*\n<@${message.guild.ownerID}>`,
              inline: true,
            },
            {
              name: `Invite me: `,
              value: `[klik here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot)`,
              inline: true,
            },
            { name: 'Version: ', value: `\`1.2.1\``, inline: false },
            {
              name: 'Design by: ',
              value: `[sNTINELs](https://twitter.com/setiawannurarif) - [Touch me](https://sociabuzz.com/sntinels/tribe)`,
              inline: false,
            },
          ]);
          break;

        case '🔁':
          reaction.users.remove(user).catch(console.error);
          if (queue.repeatMode === 0) {
            var math = '1';
          } else if (queue.repeatMode === 1) {
            var math = '2';
          } else if (queue.repeatMode === 2) {
            var math = '0';
          }
          await client.distube.setRepeatMode(message, math);
          embedBuilderEdit(client, message, 'BLUE', 'Playing a song!', `🎶 Started playing: [${song.name}](${song.url}) - Song Duration: \`${song.formattedDuration}\``, song.thumbnail, song.user, [
            { name: '\u200B', value: '\u200B' },
            {
              name: `Volume: `,
              value: `\`${queue.volume}%\``,
              inline: true,
            },
            {
              name: `Filter: `,
              value: `\`${queue.filter || 'Off'}\``,
              inline: true,
            },
            {
              name: `Loop: `,
              value: `\`${queue.repeatMode ? (queue.repeatMode == 2 ? 'All Queue' : 'This Song') : 'Off'}\``,
              inline: true,
            },
            {
              name: `Autoplay: `,
              value: `\`${queue.autoplay ? 'On' : 'Off'}\``,
              inline: true,
            },
            {
              name: `Total Queue: `,
              value: `\`${songQueue} songs\``,
              inline: true,
            },
            {
              name: `Bitrate: `,
              value: `\`${bitrateChannel} kbps\``,
              inline: true,
            },
            {
              name: `Command Channel:`,
              value: `<#${message.channel.id}>`,
              inline: true,
            },
            {
              name: `Server:`,
              value: `\`${message.guild.name}\`\n*Server Owner:*\n<@${message.guild.ownerID}>`,
              inline: true,
            },
            {
              name: `Invite me: `,
              value: `[klik here](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot)`,
              inline: true,
            },
            { name: 'Version: ', value: `\`1.2.1\``, inline: false },
            {
              name: 'Design by: ',
              value: `[sNTINELs](https://twitter.com/setiawannurarif) - [Touch me](https://sociabuzz.com/sntinels/tribe)`,
              inline: false,
            },
          ]);
          break;

        case '⏹':
          reaction.users.remove(user).catch(console.error);
          client.distube.stop(message);
          message.channel
            .send(`User ⏹ stopped the music!`)
            .then((msg) => {
              msg.delete({ timeout: 2 * 1000 });
            })

            .catch(console.error);

          collector.stop();
          break;

        case '⚠️':
          reaction.users.remove(user).catch(console.error);
          let embedHelp = new MessageEmbed()
            .setTitle('Reactions Song Help!')
            .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
              { name: 'Skip Song: ', value: '⏭', inline: false },
              { name: 'Rewind Song: ', value: '⏪', inline: false },
              { name: 'Seek Song: ', value: '⏩', inline: false },
              { name: 'Pause/Resume: ', value: '⏯', inline: false },
              { name: 'Mute Bot: ', value: '🔇', inline: false },
              { name: 'Volume Down: ', value: '🔉', inline: false },
              { name: 'Volume Up: ', value: '🔊', inline: false },
              {
                name: 'Loop Song/Loop Queue/Off Loop: ',
                value: '🔁',
                inline: false,
              },
              {
                name: 'Autoplay (Play Random Song): ',
                value: '♾️',
                inline: false,
              },
              { name: 'Lyrics: ', value: '📘', inline: false },
              { name: 'Filter Audio: ', value: '🎵', inline: false }
            );
          message.channel.send(embedHelp).then((msg) => {
            msg.delete({ timeout: 1000 * 60 });
          });
          break;

        case '📘':
          reaction.users.remove(user).catch(console.error);
          try {
            var pages = [];
            var currentPage = 0;

            var reactionFilter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && message.author.id === user.id;

            let command = song.name;
            let commandSong = command.split(' - ');
            let commandSongName = commandSong[0].split(/[([|\])]/g).join(' ');
            let commandArtist = commandSong[1].split(/[([|\])]/g).join(' ');
            let songName = commandSongName;
            let artist = commandArtist;

            let checkLyrics = await lyricsFinder(artist, songName);
            if (checkLyrics) {
              await finder(artist, songName, message, pages, command, message.author);
              var lyricsEmbed = await message.channel.send(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
              await lyricsEmbed.react('⬅️');
              await lyricsEmbed.react('➡️');
              const collectorLyrics = lyricsEmbed.createReactionCollector(reactionFilter);
              collectorLyrics.on('collect', (reaction, user) => {
                if (reaction.emoji.name === '➡️') {
                  reaction.users.remove(user).catch(console.error);
                  if (currentPage < pages.length - 1) {
                    currentPage += 1;
                    lyricsEmbed.edit(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
                  }
                } else if (reaction.emoji.name === '⬅️') {
                  reaction.users.remove(user).catch(console.error);
                  if (currentPage !== 0) {
                    currentPage -= 1;
                    lyricsEmbed.edit(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
                  }
                }
              });
            } else {
              message.channel.send(`Lyrics ${command} Not Found! \nlemme help you...\n\n**Please enter the artist name: **`);
              var messageFilter = (m) => m.author.id === message.author.id;
              await message.channel.awaitMessages(messageFilter, { max: 1, time: 60000 }).then(async (collected) => {
                artist = collected.first().content;
                message.channel.send('**Please enter the song name: **');
                await message.channel.awaitMessages(messageFilter, { max: 1, time: 60000 }).then(async (collected) => {
                  songName = collected.first().content;
                });
              });
              await finder(artist, songName, message, pages, command, message.author);
              var lyricsEmbed = await message.channel.send(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
              await lyricsEmbed.react('⬅️');
              await lyricsEmbed.react('➡️');
              const collectorLyrics = lyricsEmbed.createReactionCollector(reactionFilter);
              collectorLyrics.on('collect', (reaction, user) => {
                if (reaction.emoji.name === '➡️') {
                  reaction.users.remove(user).catch(console.error);
                  if (currentPage < pages.length - 1) {
                    currentPage += 1;
                    lyricsEmbed.edit(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
                  }
                } else if (reaction.emoji.name === '⬅️') {
                  reaction.users.remove(user).catch(console.error);
                  if (currentPage !== 0) {
                    currentPage -= 1;
                    lyricsEmbed.edit(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
                  }
                }
              });
            }
          } catch (e) {
            console.log(e);
          }

          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
      collector.on('end', async () => {
        if (!lyricsEmbed) return;
        try {
          await lyricsEmbed.delete({
            timeout: Number(client.ws.ping),
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
    collector.on('end', async () => {
      try {
        await embedMusicPlaylist.delete({ timeout: Number(client.ws.ping) });
      } catch (e) {
        console.log(e);
      }
    });

    function embedBuilderEdit(client, message, color, title, description, thumbnail, footer, field) {
      var embed = new MessageEmbed().setColor(color);
      if (footer) embed.setFooter('Requested by: ' + footer.username, footer.displayAvatarURL());
      if (title) embed.setTitle(title);
      if (description) embed.setDescription(description);
      if (thumbnail) embed.setThumbnail(thumbnail);
      if (field) embed.addFields(field);
      return embedMusicPlaylist.edit(embed).catch((e) => {
        console.error;
      });
    }
  });
};

module.exports.config = {
  displayName: 'Play-Event', // Can be changed any time
  dbName: 'play_musicBot', // Should be unique and NEVER be changed once set
  loadDBFirst: false, // Wait for the database connection to be present
};

function embedBuilder(client, message, color, title, description, thumbnail, footer, field) {
  var embed = new MessageEmbed().setColor(color);
  if (footer) embed.setFooter('Requested by: ' + footer.username, footer.displayAvatarURL());
  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (field) embed.addFields(field);
  return message.channel.send(embed).catch((e) => {
    console.error;
  });
}

async function finder(artist, songName, message, pages, judul, footer) {
  let fullLyrics = (await lyricsFinder(artist, songName)) || 'Not Found!';

  for (let i = 0; i < fullLyrics.length; i += 2048) {
    const lyric = fullLyrics.substring(i, Math.min(fullLyrics.length, i + 2048));
    const msg = new MessageEmbed().setDescription(lyric);
    if (judul) msg.setTitle(judul);
    if (footer) msg.setFooter(footer);
    msg.setFooter('Requested by: ' + footer.username, footer.displayAvatarURL());
    pages.push(msg);
  }
}

//* {
//*   name: "Touch me: ",
//*   value: `[klik here](https://sociabuzz.com/sntinels/tribe)`,
//*   inline: false,
//* }
