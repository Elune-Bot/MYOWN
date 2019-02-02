const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

let reason = args.join(' ') ? args.join(' ') : 'I will be back soon!';
  //  if(reason) message.content.includes("@"); message.reply("No No No");
  if(reason.includes("@")) return message.channel.sendMessage("No you can not do that pal");
  let afklist = bot.afk.get(message.author.id);
  message.delete();
  
  if (!afklist) {
    let construct = {
      id: message.author.id,
      reason: reason
    };
 
    bot.afk.set(message.author.id, construct);
    return message.reply(`is now AFK Reason: ${reason}`).then(msg => msg.delete(5000));
  } 
    bot.afk.delete(message.author.id);
    return message.reply(`You are no longer afk`).then(msg => msg.delete(5000));
    
  
    }



module.exports.help = {
    name: "afk"
  };
