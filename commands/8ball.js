const Discord = require("discord.js");


module.exports.run = async (CLOXY, message, args) => {

 if(!args[2]) return message.reply("Please ask a full question");
    let replies = ["**Yes**", "**No**", "**Probably**", "**Just Go To Bed**", "**I don't have any answers with that question**", "**maybe not**", "**idk**"];

    let result = Math.floor((Math.random() * replies.length));


    message.channel.send(replies[result]);
    }



module.exports.help = {
    name: "8ball"
  };
