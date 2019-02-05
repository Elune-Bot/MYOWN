const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (CLOXY, message, args) => {

  let you = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!you) return message.reply("**You must mention someone. \n FORMAT: /coins [User]**")
 if(!coins[you.id]){
     coins[you.id] = {
         coins: 0
     }
 }    

 let uCoins = coins[you.id].coins;

 let coinEmbed = new Discord.RichEmbed()
 .setAuthor(you.user.username)
 .setColor("RANDOM")
 .addField("💸COINS💸", `Current Amount: ${uCoins}`);

 message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}


module.exports.help = {
    name: "Coins"
}
