const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
        let user = message.mentions.users.first() || message.author;
        let playerembed = new Discord.RichEmbed()
        .setDescription("Your Information")
        .setColor("#15f153")
        .setThumbnail(user.displayAvatarURL)
        .addField("You Joined", message.member.joinedAt);

        message.channel.sendMessage(playerembed);

    }



module.exports.help = {
    name: "playerinfo"
  };
