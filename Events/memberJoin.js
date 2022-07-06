const Discord = require("discord.js");
const client = global.client;
const config = require("../config.json");
exports.execute = async(member) => {

const channel = client.guilds.cache.get(member.guild.id).channels.cache.get(config.Channels.Register);

channel.send(`
:tada: Sunucumuza hoş geldin, ${member}! Seninle birlikte sunucumuz **${member.guild.memberCount}** üyeye ulaştı.

"V. Confirmed" isimli odalarda teyit olduktan sonra isim yaş vererek sunucumuzda kayıt olabilirsin. Sunucumuzun kuralları ${config.Channels.Rules ? `<#${config.Channels.Rules}>` : "#kurallar"} isimli kanalda belirtilmiştir.

${config.Roles.Register.map((x) => `<@&${x}>`).join(", ")} rollerindeki yetkililer seninle ilgilenecektir. İyi eğlenceler! :tada::tada::tada:
`)
member.roles.add(config.Roles.Unregistered).catch((x) => {   })
member.setNickname(`${config.Other.NamePrefix ? config.Other.NamePrefix : ""} İsim ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} Yaş`)

const tag = config.Other.Tag;
if (tag.some((x) => member.user.tag.includes(x))) {
    member.roles.add(config.Roles.Unregistered).catch((x) => {   })
    member.roles.add(config.Roles.Tagged);
    member.setNickname(`${config.Other.NamePrefix ? config.Other.NamePrefix : ""} İsim ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} Yaş`)
    channel.send(`${member} kullanıcısı taglı olarak katıldığı için rolü verildi!`);
}
};
exports.conf = {
  event: "guildMemberAdd"
};
