const Discord = require('discord.js');
const Unique = new Discord.Client();
const fs = require("fs");
const prefix = "/";
const ms = new require('ms');
const bot = new Discord.Client({disableEveryone: true});
const SuperAgent = new require('superagent');
Unique.commands = new Discord.Collection();



Unique.on("ready", async () => {
      console.log(`${Unique.user.username} is online on ${Unique.guilds.size} servers!`);
});


 fs.readdir("./commands", (err, file) => {

  if (err) console.log(err);

  let jsfile = file.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands");
    return;
  }

  jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
    Unique.commands.set(props.help.name, props);
  });

});
  

  //GuideLines.user.setGame("on Atom");
bot.afk = new Map();
Unique.on("message", async message => {
  if(message.author.bot) return;
  let messageArray = message.content.split(" ").slice(0);
let cmd = messageArray[0];
let args = messageArray.slice(1);
if(message.channel.type === "dm") message.reply("NO NO");

  
  
  
  
//   if (message.content.startsWith(prefix)) return message.channel.send(":x: Please use commands in real server! :x:") //if the message is a command
//   if (!message.content.startsWith(prefix)) message.channel.send("This message has been send to the staff! :incoming_envelope:");
//   if (args.length > 256) return message.reply("Your message content too many characters :/") //if the message contnt more than 256 character, what fields do not allow

//   var embed = new Discord.RichEmbed()
//       .setColor('RANDOM')
//       .setTitle("New request in DM!")
//       .addField(args, "Send by: " + message.author.username + " with the ID: " + message.author.id)
//   Unique.guilds.get("511865295791718400");
//   Unique.channels.get("540813043890913290").send(embed); //send the embed in a specific channel
// }


// if (message.content.startsWith(prefix + "reply")) {
//     if (message.author.id !== "314640655282339841") return message.reply('You cannot use that!')
//     var Rargs = message.content.split(" ").slice(2).join(" ")
//     var userID = args[1]
//     if (isNaN(userID)) return message.reply("This is not an ID!") //if args is Not A Number!
//     var embed = new Discord.RichEmbed()
//         .setColor('RANDOM')
//         .setTitle("the staff answered you!")
//         .setDescription(Rargs)
//         .setFooter("this message was sent to you by: " + message.author.username + " !")
//     Unique.users.get(userID).send(embed)
//     message.channel.send("Send!").catch(console.error) //send the message
//     //it may be that if the user has blocked your bot that it does not work
// }





  if (message.content.includes(message.mentions.users.first())) {
  bot.afk.forEach(key => {
    if (key.id == message.mentions.users.first().id) {
    message.guild.fetchMember(key.id).then(member => {
      let user_tag = member.user.tag;
      return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
    });
   }
  });
}

bot.afk.forEach(key => {
  if (message.author.id == key.id) {
    bot.afk.delete(message.author.id)
    return message.reply(`is no longer AFK.`).then(msg => msg.delete(5000));
  }
});





let number = message.guild.memberCount - 1;
let result = number;
let activities = [{text: `Prefix is ${prefix}`,type:"playing"},{text:`with you and ${result} members`,type:"watching"}]
setInterval(()=>{
    let random = Math.floor(Math.random()*activities.length)
    Unique.user.setActivity(activities[random].text, {type: activities[random].type});
},10000)

if (message.content.startsWith("/BOTONLINE")) {
await Unique.user.setStatus('online');
}

if (message.content.startsWith("/BOTDND")) {
  await Unique.user.setStatus('dnd');
  }
  
  if (message.content.startsWith("/BOTIDLE")) {
  await Unique.user.setStatus('idle');
  }
  
    if (message.content.startsWith("/BOTINVISIBLE")) {
  await Unique.user.setStatus('offline');
  }

       let Tbot = Unique.user;
      if(message.content.startsWith(`${Tbot}`)) {
        let replies = ["No!", "Yes!", "I don't know"];

        let result = Math.floor((Math.random() * replies.length));

        message.channel.send(replies[result]);
      }



 

    let commandfile = Unique.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot,message,args);
    if (message.content.startsWith(prefix + "kick")) {

     //!kick @daeshan askin for it

     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) message.channel.sendMessage("Can't find user!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MESSAGES")) message.channel.sendMessage("No can do pal!");
     if(kUser.hasPermission("MANAGE_MESSAGES")) message.channel.sendMessage("That person can't be kicked!");

     let kickEmbed = new Discord.RichEmbed()
     .setDescription("~Kick~")
     .setColor("#e56b00")
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", kReason);

     let punishedChannel = message.guild.channels.find(`name`, "punished");
     if(!punishedChannel) message.channel.sendMessage("Can't find punished channel.");

    
     message.guild.member(kUser).kick(kReason);
     punishedChannel.send(kickEmbed);

   }

   if (message.content.includes("fuck", "suck", "cunt", "shit", "fuc*", "ass", "dick", "d1ck", "pussy")) {
       message.delete()
       message.author.send(`Hey ${message.author}! That word is been banned from the server, please don't use it again!`)

 }


  




    // if (message.content.startsWith(prefix + "warn" )) {
    //
    //   ///report @PhoneticMytic01 this is the reason
    //   let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //   if (!wUser) message.channel.sendMessage("a"); return
    //   let reason = args.join(" ").slice(22);
    //
    //
    //   let warnEmbed = new Discord.RichEmbed()
    //   .setDescription("Warn")
    //   .setColor("#15f153")
    //   .addField("Warned User", `${wUser} with ID: ${wUser.id}`)
    //   .addField("Warned By", `${message.author} with ID: ${message.author.id}`)
    //   .addField("Channel", message.channel)
    //   .addField("Time", message.createdAt)
    //   .addField("Reason", reason);
    //
    //   let warnschannel = message.guild.channels.find(`name`, "reports");
    //   if (!warnschannel) message.channel.sendMessage("Couldn't Find The Channel")
    //
    //
    //   message.delete().catch(O_o=>{});
    //   warnschannel.send(warnEmbed)
    //
    // }




//       if (message.content.startsWith(prefix + "active")) {
//   let rMember = message.author;
//   let role = message.guild.roles.find(`name`, "Active");

//   await
//   message.member.addRole(role.id);
//   try{
//     await rMember.send(`Congrats, you have been given the role ${role.name}`)
//   }catch(e){
//     message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${role.name}. We tried to DM them, but their DMs are locked.`)
//   }
// }
  
  


if (message.channel.id === "508615555213819904") {
  // if(message.member.hasPermission("ADMINISTRATOR")); return
	if (!message.content.startsWith(prefix))
  if (!message.content.startsWith(";"))
  if (!message.content.startsWith("+"))
  if (!message.content.startsWith("!"))
  if (!message.content.startsWith("-"))  {
		message.delete()
	}
}
//   if(message.channel.id === "491600517819138069") {
//   // if (message.member.hasPermission("ADMINISTRATOR")); return
//   if (!message.content.startsWith("/active"))
//     message.delete()
//   }
//   if (message.channel.id === "489360396633899009") {
//   if(message.member.hasPermission("ADMINISTRATOR")); return
// 	if (!message.content.startsWith("suggestion:")) {
// 		message.delete()
// 	}
//  }
//   if (message.channel.id === "487223698172936192") {
//   if(message.member.hasPermission("ADMINISTRATOR")); return
// 	if (message.content.startsWith("/"))  {
// 		message.delete()
// 	}
// }
//     if (message.channel.id === "487223698172936192") {
//   // if(message.member.hasPermission("ADMINISTRATOR")); return
// 	if (message.content.startsWith("*"))  {
// 		message.delete()
// 	}
// }
//     if (message.channel.id === "487223698172936192") {
//   if(message.member.hasPermission("ADMINISTRATOR")); return
// 	if (message.content.startsWith(","))  {
// 		message.delete()
// 	}
// }
//   if (message.channel.id === "487223698172936192") {
//   if(message.member.hasPermission("ADMINISTRATOR")); return
// 	if (message.content.startsWith("-"))  {
// 		message.delete()
// 	}
// }
//     if (message.channel.id === "491900345086115840") {
//   //if(message.member.hasPermission("ADMINISTRATOR")); return
// 	if (!message.content.startsWith(prefix))  {
// 		message.delete()
// 	}
// }

let Test = '3s';
if(message.content.startsWith("hi")) {
   message.channel.startTyping(Test);

   setTimeout(function() { (message.reply("Hi"));
                         }, ms(Test));
   message.channel.stopTyping(true);
              } 
  
      if (message.content.startsWith(prefix + "mute")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, but you do not have valid permissions! If you beleive this is a error, contact an owner.");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Couldn't find user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("The user you are trying to mute is either the same, or higher role than you.");
    let muterole = message.guild.roles.find(`name`, "Muted");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }



if(tomute.roles.has(muterole.id)) return message.channel.sendMessage("This user is already muted");

await (tomute.addRole(muterole));
message.channel.sendMessage("I have muted the player");
  return;
}

  
  
      if (message.content.startsWith(prefix + "unmute")) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You Don't Have Permission To Execute This Command");


  let toUnmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!toUnmute) return message.channel.sendMessage("Mention A Player");

  if(toUnmute.id === message.author.id) return message.channel.sendMessage("You cannot mute yourself");
  if(toUnmute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("You cannot mute those players that has a higher or same role");

  let role = message.guild.roles.find(r => r.name === "Muted")


if(!toUnmute.roles.has(role.id)) return message.channel.sendMessage("This user is already unmuted");

await (toUnmute.removeRole(role));
message.channel.sendMessage("I have unmuted the player");
  return;

}
    
    if (message.content.startsWith(prefix + "ban")) {
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) message.channel.sendMessage("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) message.channel.sendMessage("No can do pal!");
    if(bUser.hasPermission("ADMINISTRATOR")) message.channel.sendMessage("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    message.guild.member(bUser).ban(bReason);
    message.channel.send(banEmbed);


    return;
  }
      if (message.content.startsWith(prefix + "addrole")) {
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
}
    if (message.content.startsWith(prefix + "removerole")) {  
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`RIP, you lost the ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
  }
}






  
    if(message.content.startsWith(prefix + "warn")) {
  let warns = JSON.parse(fs.readFileSync("warnings.json", "utf8"));
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("No you can not do that pal");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.channel.sendMessage("Must Mention A Player");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You can not warn this player");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", wUser)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "logs");
  if(!warnchannel) return message.reply("Couldn't Find Channel");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("You should create muted role")


  }
}

    if (message.content.startsWith(prefix + 'hug')) {
    let hug = [
        "https://data.whicdn.com/images/221692186/original.gif",
        "http://mrwgifs.com/wp-content/uploads/2013/04/Ouran-High-School-Host-Club-Love-Hug-Gif.gif",
        "http://images6.fanpop.com/image/photos/33100000/Kyoya-and-Tamaki-ouran-high-school-host-club-33132917-500-375.gif",
        "http://31.media.tumblr.com/4d6525e7b5e546cde555bf2453563335/tumblr_mskyp8XJcb1r40gm7o1_1280.gif",
        "https://i.pinimg.com/originals/34/dc/98/34dc98f17fd5cf558611f14ff9a0c1c9.gif",
        "https://78.media.tumblr.com/6bef64140dfefe6fe86089c6eb11fb9b/tumblr_ohhnjyDJll1vm2xpgo1_500.gif",
        "https://78.media.tumblr.com/806c23dbcf9bde033e708c8679c63975/tumblr_inline_ohhtig3BpF1rz9r19_540.gif",
        "https://i.pinimg.com/originals/0f/48/1b/0f481bfc59229ce8127f2aba52bb8f4a.gif",
        "https://pa1.narvii.com/6276/4461c2a865973bddcc5f4e591a165e09275c7a2c_hq.gif",
        "https://78.media.tumblr.com/7e29c1e560c527de00a9f57bb7d941c3/tumblr_inline_ohi8745BbI1u9qbij_540.gif",
        "https://data.whicdn.com/images/271163043/original.gif",
        "https://78.media.tumblr.com/d00aba2e25ac11a11d9c5a770275dfc8/tumblr_orpdyc83FN1rtwid9o1_500.gif",
        "http://0.media.dorkly.cvcdn.com/33/43/cac85de1cfd2bc4e7bec36631b260156.gif",
        "https://i.pinimg.com/originals/22/8a/c9/228ac960b7c24ffb87374857fa6a0920.gif",
        "https://pa1.narvii.com/6333/8c254b88d099c03be84769075ecac875c5dbb4bb_hq.gif",
        "https://pa1.narvii.com/6449/c5383d0a548987d69aac06e8dc9b270219159b3f_hq.gif",
        "https://media1.tenor.com/images/100c453c2f411189b40e6931ff65a88b/tenor.gif?itemid=7210521",
        "https://i.pinimg.com/originals/e5/0e/c8/e50ec889ef64432e5d4648370014d272.gif",
        "https://78.media.tumblr.com/94f62f2fbca608f70a48e6c04c2dc27c/tumblr_orotkrEC4t1vbbkedo2_540.gif",
        "http://i0.kym-cdn.com/photos/images/original/001/266/481/075.gif",
        "https://data.whicdn.com/images/310192271/original.gif",
        "https://78.media.tumblr.com/064596e2fb0101675b89d79ac41141e0/tumblr_p8g2jmxCLD1qc9mvbo1_540.gif",
    ]
    let hugresult = Math.floor((Math.random() * hug.length));
    if (!args[0]) {
        const ghembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} hugged themself...! (weirdo)`)
            .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
        message.channel.send({
            embed: ghembed
        })
        return;
    }
    if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
        const hembed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} gave ${message.mentions.members.first().user.username} a hug! How sweet!`)
            .setImage(hug[hugresult])
        message.channel.send({
            embed: hembed
        })
        return;
    }
    const ghembed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setTitle(`${message.author.username} hugged themself...! (weirdo)`)
        .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
    message.channel.send({
        embed: ghembed
    })
}
 if (message.content.startsWith(prefix + "quiz")) { 
  const quiz = [
  { q: "What color is the sky?", a: ["no color", "invisible"] },
  { q: "Name a soft drink brand.", a: ["pepsi", "coke", "rc", "7up", "sprite", "mountain dew"] },
  { q: "Name a programming language.", a: ["actionscript", "coffeescript", "c", "c++", "basic", "python", "perl", "javascript", "dotnet", "lua", "crystal", "go", "d", "php", "ruby", "rust", "dart", "java", "javascript"] },
  { q: "Who's a good boy?", a: ["you are", "whirl"] },
  { q: "Who created me?", a: ["Tea Cup", "Tea Cup#3343"] },
  { q: "What programming language am I made in?", a: ["javascript",] },
  { q: "Name the seventh planet from the Sun.", a: ["uranus"] },
  { q: "Name the World's biggest island.", a: ["greenland",] },
  { q: "What's the World's longest river?", a: ["amazon", "amazon river"] },
  { q: "Name the World's largest ocean.", a: ["pacific", "pacific ocean"] },
  { q: "Name one of the three primary colors.", a: ["blue", "red", "yellow"] },
  { q: "How many colors are there in a rainbow?", a: ["7", "seven"] },
  { q: "What do you call a time span of one thousand years?", a: ["millennium"] },
  { q: "How many squares are there on a chess board?", a: ["64", "sixty four"] },
  { q: "How many degrees are found in a circle?", a: ["360", "360 degrees", "three hundred sixty"] },
  { q: "The Dewey Decimal system is used to categorize what?", a: ["books"] },
  { q: "How many points does a compass have?", a: ["32", "thirty two"] },
  { q: "How many strings does a cello have?", a: ["4", "four"] },
  { q: "How many symphonies did Beethoven compose?", a: ["9", "nine"] },
  { q: "How many lines should a limerick have?", a: ["5", "five"] },
  { q: "What is the most basic language Microsoft made?", a: ["visual basic"] },
  { q: "What is the most complicated language?", a: ["binary"] },
  { q: "'OS' computer abbreviation usually means?", a: ["operating system"] }
];
const options = {
  max: 1,
  time: 30050,
  errors: ["time"],
};

  
  const item = quiz[Math.floor(Math.random() * quiz.length)];
  await message.channel.send(item.q);
  try {
    const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
    const winnerMessage = collected.first();
    return message.channel.send({embed: new Discord.RichEmbed()
                                 .setAuthor(`Winner: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
                                 .setTitle(`Correct Answer: \`${winnerMessage.content}\``)
                                 .setFooter(`Question: ${item.q}`)
                                 .setColor(message.guild.me.displayHexColor)
                                })
  } catch (_) {
    return message.channel.send({embed: new Discord.RichEmbed()
                                 .setAuthor('No one got the answer in time!')
                                 .setTitle(`Correct Answer(s): \`${item.a}\``)
                                 .setFooter(`Question: ${item.q}`)
                                })
  }
}
 
  
             
});

Unique.login(process.env.TOKEN);
