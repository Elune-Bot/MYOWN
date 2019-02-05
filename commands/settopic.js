const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (CLOXY, message, args) => {
if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.sendMessage("No you can not do that pal");
let topic = args.join(' ');
if(!topic) return message.channel.sendMessage("**Dummy, You must say what should be the topic of this channel**");
message.channel.setTopic(topic);
message.channel.sendMessage("DONE").then(msg => msg.delete(5000)).then(msg => message.delete(1000));
        

}

module.exports.help = {
  name: "Settopic"
};
