const Discord = require("discord.js");

exports.run = async (anko, message, args, color) => {
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
    let sicon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()
    .setThumbnail(sicon)
    .setColor(color)
    .setDescription(`**Permanent Invite Link:** \n${invite}`)
    .addField("Members:", `${message.guild.memberCount}`)
    // .addField("Bot Developer:", `PhoneticMystic01`);
    
    message.channel.send(embed);
  });
}

exports.help = {
  name: 'Invite',
}
