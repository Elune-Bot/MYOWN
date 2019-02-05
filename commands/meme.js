const Discord = require("discord.js");
const superagent = require("superagent");

const run = module.exports.run = async (CLOXY, message, args) => {
  let{body} = await superagent
  .get(`https://api-to.get-a.life/meme`);

  const lol = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle("lmao!")
  .setImage(body.url);

  message.channel.sendMessage(lol);
    }



module.exports.help = {
    name: "Meme"
  };
