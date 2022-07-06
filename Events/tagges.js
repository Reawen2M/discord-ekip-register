const Discord = require("discord.js");
const client = global.client;
const config = require("../config.json");
exports.execute = async(oldUser, newUser) => {

const guild = client.guilds.cache.get(config.guildID)
const channel = guild.channels.cache.get(config.Channels.TagLog);
const tag = config.Other.Tag;
const member = guild.members.cache.get(newUser.id);
if (tag.some((x) => oldUser.tag.includes(x)) && !tag.some((x) => newUser.tag.includes(x))) {
member.roles.remove(config.Roles.Tagged);
channel.send(`${member} isimli kullanıcı tagı bıraktı. (${tag.filter((tags) => oldUser.tag.includes(tags)).join(", ")})`);
} else if (!tag.some((x) => oldUser.tag.includes(x)) && tag.some((x) => newUser.tag.includes(x))) {
member.roles.add(config.Roles.Tagged);
channel.send(`${member} isimli kullanıcı tagı aldı. (${tag.filter((tags) => newUser.tag.includes(tags)).join(", ")})`);
}
};
exports.conf = {
  event: "userUpdate"
};
