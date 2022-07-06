
const names = require("../schemas/isimler");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
module.exports = {
    "code": "isim",

    
    async run (client, message, args) {

        const embed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#010000')
        .setFooter("reawen 💗")
     if (!message.member.permissions.has("ADMINISTRATOR") && !config.Roles.Register.some((x) => message.member.roles.cache.get(x))) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error));

     let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
     if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir üye belirtmelisiniz.\n\n\> .isim @Reawen/ID Kuzey 18")] }).catch((error) => console.log(error));

    const isim = args[1].charAt(0).replace("i", "İ").toLocaleUpperCase() + args[1].slice(1).toLocaleLowerCase();
    const age = args[2];
    var name;
    if (!args[1]) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisiniz.\n\n\> .isim @Reawen/ID Kuzey 18")] }).catch((error) => console.log(error));
    if (config.Modes.Name == true) {
    if (!isim) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisiniz.\n\n\> .isim @Reawen/ID Kuzey 18")] }).catch((error) => console.log(error));
    if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisiniz.\n\n\> .isim @Reawen/ID Kuzey 18")] }).catch((error) => console.log(error));
    name = `${config.Other.NamePrefix ? config.Other.NamePrefix : ""} ${isim} ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} ${age}`;
} else {
    let isim = args.slice(1).join(" ")
    if (!isim) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisiniz.\n\n\> .isim @Reawen/ID Kuzey")] }).catch((error) => console.log(error));
    name = isim;
}
const data = await names.findOne({ guildID: message.guild.id, userID: member.user.id });


member.setNickname(name).catch((x) => console.error(x));
await names.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { isimler: { name: name, yetkili: message.author.id,  rol: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });
message.reply({ embeds: [embed.setDescription(`${member} isimli üyenin ismi \`${name}\` olarak değiştirildi.\n\n${data ? `Kullanıcının ${data.isimler.length} tane kayıt geçmişi bulundu.` : ""}\n${data ? `${data.isimler.splice(0, 5).map((x, i) => `\`${x.name}\` (${x.rol == "Sunucudan Ayrılma" ? "Sunucudan Ayrılma" : x.rol == "İsim Değiştirme" ? "İsim Değiştirme" : `<@&${x.rol}>`}) (<@${x.yetkili}>)`).join("\n")}` : ""}`)] }).catch((error) => console.log(error));

}};
  