const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    let user = message.author;
      
      let embed = new Discord.RichEmbed()
      .setDescription("Commands")
      .setThumbnail(user.displayAvatarURL)
      .addField(":exclamation: Prefix = **/**", "The Prefix is **/**")
      .addField(":one: - /avatar ", "It will show the avatar of the user that you will tag")
      .addField(":two: - /8ball", "It is a randomize answers from your question")
      .addField(":three: - /playerinfo", "It will show the infos about you")
      .addField(":four: - /serverinfo", "It will show the info about the server")
      .addField(":five: - /botinfo", "It will show the info about the bot")
      .addField(":six: - /mail", "It will DM the player that you will tag + your message")
      .addField(":seven: - /online", "It will show the players online/idle/do not disturb/invinsible")
      .addField(":eight: - /hug", "It will a random gif of hugging a person ")
      .setColor("RANDOM")
      
      message.delete()
      message.author.send(embed);
      
    
    }



module.exports.help = {
    name: "help"
  };
