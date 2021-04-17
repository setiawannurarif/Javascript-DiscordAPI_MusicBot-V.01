const DiscordJS = require("discord.js");
const WOKCommands = require("wokcommands");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();

const client = new DiscordJS.Client({
  partials: ["MESSAGE", "REACTION"],
});

//? Package=
//TODO Distube:
DisTube = require("distube");
// Create a new DisTube
client.distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
  highWaterMark: 1 << 25,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  youtubeCookie: true,
  updateYouTubeDL: true,
});

client.on("ready", () => {
  // See the "Language Support" section of this documentation
  // An empty string = ignored
  const messagesPath = "";

  // Used to configure the database connection.
  // These are the default options but you can overwrite them
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  // Initialize WOKCommands with specific folders and MongoDB
  const wok = new WOKCommands(client, {
    commandsDir: "commands",
    featureDir: "features",
    messagesPath,
    showWarns: true, // Show start up warnings
    dbOptions,
  })
    // Set your MongoDB connection path
    //TODO: Untuk fitur ganti prefix otomatis, harus di uncomment
    // .setMongoPath(process.env.MONGO_URI)
    //TODO: mongodb connection

    // Set the default prefix for your bot, it is ! by default
    .setDefaultPrefix(process.env.PREFIX)
    // Set the embed color for your bot. The default help menu will use this. This hex value can be a string too
    .setColor(0xff0000)
    // Set the category emoji by using it's settings:
    .setCategorySettings([
      {
        name: "Command Music",
        emoji: "🎵",
      },
      {
        name: "Features",
        emoji: "💻",
      },
      {
        // You can change the default emojis as well
        name: "Configuration",
        emoji: "🛠️",
        // You can also hide a category from the help menu
        // Admins bypass this
        hidden: true,
      },
    ]);
  // Ran whenever a supported database connection is connected
  wok.on("databaseConnected", (connection, state) => {
    console.log("The state is", state);
  });
});

client.login(process.env.TOKEN);
