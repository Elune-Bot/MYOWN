const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let fEmbed = new Discord.RichEmbed()
    .setTitle("Format")
    .setColor("#1C384D")
    .addField("FORMAT", "Example: /mail @player [Message]");

    if(!mUser) message.channel.sendMessage(fEmbed);

    let aMessage = args.join(" ").slice(22);

    let mailEmbed = new Discord.RichEmbed()
    .setTitle("💰 Mail 💰")
    .setColor("#1C384D")
    .addField("Name", mUser)
    .addField("Message", aMessage)
    .addField("Author", `${message.author}`)


    message.delete().catch(O_o=>{});
    mUser.send(mailEmbed); return
    }



module.exports.help = {
    name: "mail"
  };
