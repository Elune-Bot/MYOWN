const Discord = require("discord.js");

module.exports.run = async (CLOXY, message, args) => {




        let bicon = CLOXY.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", CLOXY.user.username)
        .addField("Created On", CLOXY.user.createdAt);
  
        message.channel.sendMessage(botembed);
    
    
      

}

module.exports.help = {
  name: "Botinfo"
};
