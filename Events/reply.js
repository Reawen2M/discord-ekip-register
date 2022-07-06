const Discord = require("discord.js");
const client = global.client;
const config = require("../config.json");
exports.execute = async (message) => {
if ([".tag", "!tag", "/tag", "tag"].some((x) => message.content.startsWith(x))) {
message.channel.send(config.Other.Tag.map((x) => "`" + x + "`").join(", "))
} else if ([".link", "!link", "/link", "link"].some((x) => message.content.startsWith(x))) {
message.channel.send(config.Other.VanityURL ? config.Other.VanityURL : config.Other.URL);
} 
};
exports.conf = {
  event: "messageCreate"
};
