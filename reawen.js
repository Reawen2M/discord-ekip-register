const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const client = global.client = new Client({	allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
 
});

const mongoose = require("mongoose");
const settings = require("./settings.json");
const config = require("./config.json");

mongoose.connect(settings.mongoURL, {
   //useCreatendex: true, 
   //useFindAndModify: false, 
   useNewUrlParser: true, 
   useUnifiedTopology: true 
});

mongoose.connection.on("connected", () => {
  console.log("Database'ye bağlanıldı.");
});
mongoose.connection.on("error", () => {
  console.error("Database'ye bağlanılamadı.");
});

client.login(settings.token).catch((err) => {
  console.error("Bota bağlanılamadı.");
});

client.commands = new Collection();
const { readdirSync } = require("fs");   
const { join } = require("path");

const commandFiles = readdirSync(join(__dirname, "Commands")).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "Commands", `${file}`));
    client.commands.set(command.code, command)
    console.log('[COMMAND] '+command.code+' adlı komut başarıyla çalışıyor.');
}

readdirSync("./Events").filter((file) => file.endsWith(".js")).forEach(file => {
    let event = require(`./Events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[EVENT] ${file.replace(".js", "") } adlı event başarıyla çalışıyor.`);
});

client.once("ready", async() => {
  console.log("Bota giriş yapıldı.")
});


client.on("messageCreate", async (message) => {
if(message.author.bot) return;
  const embed = new MessageEmbed();
  if(message.content.startsWith(settings.prefix)) {
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    var cmd = client.commands.get(command);    
    if(!cmd) return;
    try { cmd.run(client, message, args, settings); } catch (error){ console.error(error); }
  }
  });   



