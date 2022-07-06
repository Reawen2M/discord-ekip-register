const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
module.exports = {
  "code": "sil",

  
  async run (client, message, args) {

    const embed = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }) )
    .setColor('#010000')
    .setFooter("reawen 💗")


   if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error));
   let x = args[0];
   if (!x) return message.reply({ embeds: [embed.setDescription("Geçerli bir sayı belirtmelisiniz.\n\n\> .sil 99")] }).catch((error) => console.log(error));
   if (Number(x) < 1 || Number(x) > 100 || x && isNaN(x)) return message.reply({ embeds: [embed.setDescription("Geçerli bir sayı belirtmelisiniz.\n\n\>.sil 99")] }).catch((error) => console.log(error));
  message.channel.bulkDelete(x).then((messages) => message.reply({ embeds: [embed.setDescription("**" + messages.size + "** mesaj silindi!")] }).catch((error) => console.log(error)));
}};
