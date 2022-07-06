const Discord = require("discord.js");
const client = global.client;
const config = require("../config.json");

exports.execute = async() => {

    const guild = client.guilds.cache.get(config.guildID);
    const role = guild.roles.cache.get(config.Roles.Tagged);
    setInterval(() => {
        checkTag();
    }, 5 * 1000);
    
function checkTag() {
    guild.members.cache.filter((x) => !x.roles.cache.has(role.id) && config.Other.Tag.some((tag) => x.user.tag.includes(tag))).forEach((member, index) => {
          member.roles.add(role.id);
      });
}

};
exports.conf = {
  event: "ready"
};
