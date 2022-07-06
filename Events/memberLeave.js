const Discord = require("discord.js");
const client = global.client;
const config = require("../config.json");
const names = require("../schemas/isimler");

exports.execute = async(member) => {
await names.findOneAndUpdate({ guildID: config.guildID, userID: member.user.id }, { $push: { isimler: { name: member.displayName, rol: "Sunucudan Ayrılma", date: Date.now() } } }, { upsert: true });

};
exports.conf = {
  event: "guildMemberRemove"
};
