const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const config = require("./settings/config");
// ATZNE DEV
const client = new Client({
  intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ],
  partials: [ Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember ],
  failIfNotExists: false,
  allowedMentions: { parse: ["everyone", "roles", "users"], users: [], roles: [], repliedUser: false }
});
// ATZNE DEV
client.events = new Collection();
client.slashCommands = new Collection();
// ATZNE DEV
module.exports = client;
// ATZNE DEV
['Events', 'Commands'].forEach((handler) => {
  require(`./Handlers/${handler}`)(client)
});
// ATZNE DEV
process.on("unhandledRejection", (reason, p) => {
  // console.log(" [AntiCrash] :: Unhandled Rejection/Catch");
  // console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  // console.log(" [AntiCrash] :: Uncaught Exception/Catch");
  // console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  // console.log(" [AntiCrash] :: Uncaught Exception/Catch (MONITOR)");
  // console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  // console.log(" [AntiCrash] :: Multiple Resolves");
  // console.log(type, promise, reason);
});
// ATZNE DEV
client.login(config.app.token);