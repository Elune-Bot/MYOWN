const Discord = require('discord.js');
const Unique = new Discord.Client();
const fs = require("fs");
const prefix = process.env.PREFIX;
const ms = new require('ms');
const SuperAgent = new require('superagent');
const antispam = require("discord-anti-spam");
const string = new require('string');
Unique.commands = new Discord.Collection();
const http = require('http');//install this
const express = require('express');//install this
const app = express();
let coins = require("./coins.json");
let xp = require("./xp.json");
let cooldown = new Set();
let cdseconds = 5;
let cdsecond = 2;
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
    let cooldown5 = 8.64e+7,
    amount = 250



Unique.on("ready", async () => {
      console.log(`${Unique.user.username} is online on ${Unique.guilds.size} servers!`);
});

antispam(Unique, {
    warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
    maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
    interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
    warningMessage: "Hello, don't spam. Unique Bot has anti spam features. You'll be banned if you continue.", // Warning message send to the user indicating they are going to fast.
    banMessage: " was banned for spamming. Don't test Unique Bot anti spam. Would anyone else like a try?", // Ban message, always tags the banned user in front of it.
    maxDuplicatesWarning: 7, // Maximum amount of duplicate messages a user can send in a timespan before getting warned
    maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
    deleteMessagesAfterBanForPastDays: 7 // Delete the spammed messages after banning for the past x days.
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
Unique.afk = new Map();
Unique.on("message", async message => {
  if(message.author.bot) return;
    if(message.channel.type === "dm") {
    if(message.author.id === "314640655282339841") return;
    let embed = new Discord.RichEmbed()
    .setTimestamp()
    .setTitle("Direct Message To The Bot")
    .addField(`Sent By:`, message.author.id)
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL)
    .addField(`Message: `,message.content)
    .setFooter(`DM Bot Messages | DM Logs`)
   
    Unique.users.get("314640655282339841").send(embed)
  };
  let messageArray = message.content.split(" ").slice(0);
let cmd = messageArray[0];
let args = messageArray.slice(1);


  if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}
// if(message.content.startsWith("!")) return; {
let coinAmt = Math.floor(Math.random() * 35) + 1;
let baseAmt = Math.floor(Math.random() * 35) + 1;
console.log(`${coinAmt} ; ${baseAmt}`);

if(coinAmt === baseAmt) {
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + 5
  };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .addField("💸COINS💸", `:five: coins added to your :moneybag: money!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(50000)});
  }
  
 
  let xpAdd = Math.floor(Math.random() * 7) + 8;
console.log(xpAdd);

if (!xp[message.author.id]) {
    xp[message.author.id] = {
        xp: 0,
        level: 1
    };
}


let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 300;
xp[message.author.id].xp = curxp + xpAdd;
if (nxtLvl <= xp[message.author.id].xp) {
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
        .setTitle("Level Up!")
        .addField("Congrats to", `${message.author}`)
        .setColor("#08ff00")
        .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {
        msg.delete(5000)
    });
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
            if (err) console.log(err)
});
  
  





  if (message.content.includes(message.mentions.users.first())) {
  Unique.afk.forEach(key => {
    if (key.id == message.mentions.users.first().id) {
    message.guild.fetchMember(key.id).then(member => {
      let user_tag = member.user.tag;
      return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
    });
   }
  });
}

Unique.afk.forEach(key => {
  if (message.author.id == key.id) {
    Unique.afk.delete(message.author.id)
    return message.reply(`is no longer AFK.`).then(msg => msg.delete(5000));
  }
});



if(!message.content.startsWith(prefix)) {
let activities = [{text: `Prefix is ${prefix}`,type:"playing"},{text:`${message.guild.memberCount} members including you`,type:"watching"}]
setInterval(()=>{
    let random = Math.floor(Math.random()*activities.length)
    Unique.user.setActivity(activities[random].text, {type: activities[random].type})
},10000);
}
  
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
    if (commandfile) commandfile.run(Unique,message,args);
    if (message.content.startsWith(prefix + "kick")) {

     //!kick @daeshan askin for it

     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) message.channel.sendMessage("Can't find user!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("KICK_MEMBERS")) message.channel.sendMessage("No can do pal!");
     if(kUser.hasPermission("ADMINISTRATOR")) message.channel.sendMessage("That person can't be kicked!");

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
   let filterWords = [
    "anal",
    "anus",
    "arse",
    "nigger",
    "nigga",
    "ballsack",
    "balls",
    "bastard",
    "bitch",
    "biatch",
    "blowjob",
    "blow job",
    "bollock",
    "bollok",
    "boner",
    "boob",
    "bugger",
    "bum",
    "buttplug",
    "clitoris",
    "cock",
    "coon",
    "cunt",
    "dick",
    "dildo",
    "dyke",
    "fag",
    "feck",
    "fellate",
    "fellatio",
    "felching",
    "fucker",
    "fucking",
    "fuck",
    "f u c k",
    "fudgepacker",
    "fudge packer",
    "flang",
    "homo",
    "jizz",
    "knobend",
    "knob end",
    "labia",
    "muff",
    "penis",
    "prick",
    "pube",
    "pussy",
    "queer",
    "scrotum",
    "sex",
    "shit",
    "s hit",
    "sh1t",
    "slut",
    "smegma",
    "fucken",
    "spunk",
    "tit",
    "tosser",
    "turd",
    "twat",
    "vagina",
    "wank",
    "whore",
    "mofucker",
    "niger"
];
   if (message.content.includes(filterWords)) {
       message.delete()
       message.author.send(`Hey ${message.author}! That word is been banned from the server, please don't use it again!`)

 }


  if(message.content.toLowerCase().startsWith(prefix + "help")) {
          message.delete();
        let user = message.author;
        user.sendMessage("**PREFIX = /** \n**Commands:** \n **1. 8ball - ** It is a command that will reply you random answers from a question. \n **2. Avatar -** It is a command that shows an users Avatar/Icon. \n **3. Botinfo** ");
 
  }


  const ownerID = '314640655282339841';

if (message.content.startsWith(prefix + "servers")) {
    if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");
    let string = '';

    Unique.guilds.forEach(guild => {
        string += '***Server Name:*** ' + guild.name + '\n' + '***Server ID:***` ' + guild.id + ' ` ' + '\n\n';

    })

    let botembed = new Discord.RichEmbed()
        .setColor("#000FF")
        .addField("Bot is On ", string)
        .setTimestamp()
        .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);
    message.channel.send(botembed);
}


     if (message.content.startsWith(prefix + "removebot")) {
         if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");

         let error17 = new Discord.RichEmbed().setColor("990033")
             .setDescription('**Please enter a valid server ID.**')
             .setColor(0xff0000)

         let error18 = new Discord.RichEmbed().setColor("990033")
             .setDescription('**You cannot kick the bot from this server!**')
             .setColor(0xff0000)


         if (isNaN(args[0])) return message.channel.send(error17).then(msg => {
             msg.delete(9000)
         });

         //If tried kick bot from a main server (like for emote provider) will return error18
         if (args[0] == 511865295791718400) return message.channel.send(error18).then(msg => {
             msg.delete(9000)
         });

         Unique.guilds.get(args[0]).leave();
         message.channel.send(`**Bot was been removed from server id [${args[0]}]**`)
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
    if(!message.member.hasPermission("BAN_MEMBERS")) message.channel.sendMessage("No can do pal!");
    if(message.member.hasPermission("BAN_MEMBERS")) message.channel.sendMessage("That person can't be kicked!");

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

  


  
             
});

Unique.login(process.env.TOKEN);
