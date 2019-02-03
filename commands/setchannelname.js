const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.sendMessage("No you can not do that pal");
let topic = args.join(' ');
if(message.content.includes("@")) return message.reply("**NO NO NO, You can't do that PAL**");

if(!topic) return message.channel.sendMessage("**Dummy, You must say what should be the new name of this channel**");
message.channel.setName(topic);
message.channel.sendMessage("***DONE***").then(msg => msg.delete(5000)).then(msg => message.delete(1000));
        

}

module.exports.help = {
  name: "setchannelname"
};
