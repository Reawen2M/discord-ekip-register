const cezalar = require("../schemas/cezalı")
const ceza = require("../schemas/cezalar")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
const data = require("../schemas/cezalar")
const Discord  = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
module.exports = {
    "code": "eval",

    
    async run (client, message, args) {

        const embed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }) )
        .setColor('#010000')
        .setFooter("reawen 💗")

        if (["913098051537760327"].some((x) => message.author.id !== x)) return message.reply("x");
        try {
            var evaled = clean(await eval(args.join(" ")));
            message.channel.send(
              `${evaled.replace(
                new RegExp(this.client.token, "g"),
                "x"
              )}`,
              { code: "js", split: true }
            );
          } catch (err) {
            message.channel.send(err, { code: "js", split: true });
          }
          function clean(text) {
            if (typeof text !== "string")
              text = require("util").inspect(text, { depth: 0 });
            text = text
              .replace(/`/g, "`" + String.fromCharCode(8203))
              .replace(/@/g, "@" + String.fromCharCode(8203));
            return text;
          }
        

}};
  