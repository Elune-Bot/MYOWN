const Discord = require("discord.js");

module.exports.run = async (Unique, message, args) => {




        let bicon = Unique.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", Unique.user.username)
        .addField("Created On", Unique.user.createdAt);
  
        message.channel.sendMessage(botembed);
    
    
      

}

module.exports.help = {
  name: "botinfo"
};
