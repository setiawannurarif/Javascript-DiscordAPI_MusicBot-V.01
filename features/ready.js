module.exports = (client, instance) => {
  console.log(`[API] Logged in as ${client.user.username}`);

  let statuses = [
    `PREFIX: ${process.env.PREFIX} | ${process.env.PREFIX}help`,
    `Design by: sNTINELs | invite me: ${process.env.PREFIX}invite`,
    `${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} User | ${
      client.guilds.cache.size
    } Server\'s`,
  ];

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(`${status}`, {
      type: "PLAYING",
    });
  }, 1000 * 10);
};

module.exports.config = {
  displayName: "Ready-Event", // Can be changed any time
  dbName: "readyBot", // Should be unique and NEVER be changed once set
  loadDBFirst: false, // Wait for the database connection to be present
};
