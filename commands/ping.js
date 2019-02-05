const Discord = require("discord.js");


module.exports.run = async (CLOXY, message, args) => {

 var embed = new Discord.RichEmbed()
    .setDescription(`**${message.author.tag}** | :ping_pong: Ping : ${CLOXY.ping}ms`)
    .setColor("RANDOM")
message.channel.send(embed)
    .catch(console.error);    

}

module.exports.help = {
    name: "Ping"
  };
