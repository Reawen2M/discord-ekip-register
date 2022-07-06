const Discord = require("discord.js");
const client = global.client;

exports.execute = async() => {
console.log(".");
client.user.setPresence({ activities: [{ name: "reawen 💗", type: "PLAYING" }], status: "online" });
};
exports.conf = {
  event: "ready"
};
