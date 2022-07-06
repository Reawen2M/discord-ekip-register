const names = require("../schemas/isimler");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
module.exports = {
    "code": "rol",

    

    
    async run (client, message, args) {

        const embed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }) )
        .setColor('#010000')
        .setFooter("reawen 💗")


        if (!message.member.permissions.has("ADMINISTRATOR") && !config.Roles.Register.some((x) => message.member.roles.cache.has(x))) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error));

     let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
     if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir üye belirtmelisiniz.\n\n\> .rol @Reawen/ID")] }).catch((error) => console.log(error));

     const buttons = new MessageActionRow()
     .addComponents(
         new MessageButton()
             .setCustomId('vip')
             .setLabel("VIP")
             .setStyle('PRIMARY'))
     .addComponents(
         new MessageButton()
             .setCustomId('register')
             .setLabel("Register")
             .setStyle('PRIMARY'))
     .addComponents(
         new MessageButton()
             .setCustomId('unregister')
             .setLabel("Kayıtsız")
             .setStyle('PRIMARY'))
     .addComponents(
         new MessageButton()
             .setCustomId('iptal')
             .setEmoji(`🚫`)
             .setStyle('DANGER'))



message.channel.send({ embeds: [embed.setDescription(`
${member} isimli kullanıcı için bir menü açıldı! Bu menüde bu kullanıcıyı **kayıtsız**a atabilir, **kayıt yetkilisi** yapabilir, **VIP** yapabilirsiniz.

:no_entry_sign: Bu eylemlerden sadece yetkinizin yettiğini yapabileceksiniz.
`)], components: [buttons] }).catch((error) => console.log(error));

const filter = (i => i.user.id === message.member.id);
const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
collector.on('collect', async (button) => {
    if (button.isButton()) {
        if (button.customId === "vip") {
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error));
if (member.roles.cache.has(config.Roles.Vip)) {
member.roles.remove(config.Roles.Vip).catch((x) => {   })
message.reply({ embeds: [embed.setDescription(`${member} adlı kullanıcıdan <@&${config.Roles.Vip}> rolü alındı!`)] }).catch((error) => console.log(error));
} else if (!member.roles.cache.has(config.Roles.Vip)) {
member.roles.add(config.Roles.Vip).catch((x) => {   })
message.reply({ embeds: [embed.setDescription(`${member} adlı kullanıcıya <@&${config.Roles.Vip}> rolü verildi!`)] }).catch((error) => console.log(error));
}
 } else  if (button.customId === "register") {
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error));
if (member.roles.cache.has(config.Roles.Register[0])) {
member.roles.remove(config.Roles.Register[0]).catch((x) => {   })
message.reply({ embeds: [embed.setDescription(`${member} adlı kullanıcıdan <@&${config.Roles.Register}> rolü alındı!`)] }).catch((error) => console.log(error));
} else if (!member.roles.cache.has(config.Roles.Register[0])) {
member.roles.add(config.Roles.Register[0]).catch((x) => {   })
message.reply({ embeds: [embed.setDescription(`${member} adlı kullanıcıya <@&${config.Roles.Register}> rolü verildi!`)] }).catch((error) => console.log(error));
}
} else  if (button.customId === "unregister") {
if (!message.member.permissions.has("ADMINISTRATOR") && !config.Roles.Register.some((x) => message.member.roles.cache.has(x))) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error));
member.roles.set([config.Roles.Unregistered]).catch((x) => {    });
member.setNickname(`${config.Other.NamePrefix ? config.Other.NamePrefix : ""} İsim ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} Yaş`)
message.reply({ embeds: [embed.setDescription(`${member} adlı kullanıcı kayıtsıza atıldı!`)] }).catch((error) => console.log(error));


}  else  if (button.customId === "iptal") {
            message.reply({ embeds: [embed.setDescription(`İşlem iptal edildi!`)] }).catch((error) => console.log(error));
            collector.stop()
            button.message.delete().catch(e => { console.error(e) })        
}
    collector.stop()
    button.message.delete().catch(e => { console.error(e) })
    }})

}};
  