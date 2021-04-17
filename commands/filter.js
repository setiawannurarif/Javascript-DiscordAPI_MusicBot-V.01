const embedBuilder = require("../function");

module.exports = {
  name: "filter", // Optional
  aliases: ["filter", "fl"], // Optional
  category: "Command Music",
  description: "Command to select filter music!",
  minArgs: 1,
  maxArgs: 1,
  expectedArgs:
    "[`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`,]",
  callback: ({ client, message }) => {
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.slice(1).join(" ");

    let queue = client.distube.getQueue(message);

    if (queue) {
      //? check mode!
      if (command === `3d`) {
      } else if (command === `bassboost`) {
      } else if (command === `echo`) {
      } else if (command === `karaoke`) {
      } else if (command === `nightcore`) {
      } else if (command === `vaporwave`) {
      } else if (command === `flanger`) {
      } else if (command === `gate`) {
      } else if (command === `haas`) {
      } else if (command === `reverse`) {
      } else if (command === `mcompand`) {
      } else if (command === `phaser`) {
      } else if (command === `tremolo`) {
      } else if (command === `earwax`) {
      } else if (command === `surround`) {
      } else {
        embedBuilder(
          client,
          message,
          `PURPLE`,
          `Filter Music Failed!`,
          `Use only: \n**1. \`3d\`\n2. \`bassboost\`\n3. \`echo\`\n4. \`karaoke\`\n5. \`nightcore\`\n6. \`vaporwave\`\n7. \`flanger\`\n8. \`gate\`\n9. \`haas\`\n10. \`reverse\`\n11. \`mcompand\`\n12. \`phaser\`\n13. \`tremolo\`\n14. \`earwax\`\n15. \`surround\`**`
        ).then((msg) => {
          msg.delete({ timeout: 10 * 1000 });
        });
        return;
      }
      try {
        client.distube.setFilter(message, command);

        let queue = client.distube.getQueue(message);
        const status = `Volume: \`${queue.volume}\` | Filter: \`${
          queue.filter || "OFF"
        }\` | Loop: \`${
          queue.repeatMode
            ? queue.repeatMode === 2
              ? "All Queue"
              : "This Song"
            : "Off"
        }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

        embedBuilder(
          client,
          message,
          `PURPLE`,
          `Filter Music: `,
          `Current queue filter: ${command}\n\n${status}`,
          message.author
        ).then((msg) => {
          msg.delete({ timeout: 10 * 1000 });
        });
      } catch (e) {
        console.error;
      }
    } else {
      return;
    }
  },
};
