const Discord = require('discord.js');
const CLOXY = new Discord.Client();
const fs = require("fs");
const prefix = process.env.PREFIX;
const ms = new require('ms');
const SuperAgent = new require('superagent');
const antispam = require("discord-anti-spam");
const string = new require('string');
CLOXY.commands = new Discord.Collection();
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



CLOXY.on("ready", async () => {
      console.log(`${CLOXY.user.username} is online on ${CLOXY.guilds.size} servers!`);
});
    antispam(CLOXY, {
    warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
    maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
    interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
    warningMessage: "Hello, don't spam. CLOXY Bot has anti spam features. You'll be banned if you continue.", // Warning message send to the user indicating they are going to fast.
    banMessage: " was banned for spamming. Don't test CLOXY Bot anti spam. Would anyone else like a try?", // Ban message, always tags the banned user in front of it.
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
    CLOXY.commands.set(props.help.name, props);
  });

});
  

  //GuideLines.user.setGame("on Atom");
CLOXY.afk = new Map();
CLOXY.on("message", async message => {
  if(message.author.bot) return;
    if(message.channel.type === "dm") return;
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
  CLOXY.afk.forEach(key => {
    if (key.id == message.mentions.users.first().id) {
    message.guild.fetchMember(key.id).then(member => {
      let user_tag = member.user.tag;
      return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
    });
   }
  });
}

CLOXY.afk.forEach(key => {
  if (message.author.id == key.id) {
    CLOXY.afk.delete(message.author.id)
    return message.reply(`is no longer AFK.`).then(msg => msg.delete(5000));
  }
});



if(!message.content.startsWith(prefix)) {
let activities = [{text: `Prefix is ${prefix}`,type:"playing"},{text:`${message.guild.memberCount} members including you`,type:"watching"}]
setInterval(()=>{
    let random = Math.floor(Math.random()*activities.length)
    CLOXY.user.setActivity(activities[random].text, {type: activities[random].type})
},10000);
}
  
if (message.content.startsWith("/BOTONLINE")) {
await CLOXY.user.setStatus('online');
}

if (message.content.startsWith("/BOTDND")) {
  await CLOXY.user.setStatus('dnd');
  }
  
  if (message.content.startsWith("/BOTIDLE")) {
  await CLOXY.user.setStatus('idle');
  }
  
    if (message.content.startsWith("/BOTINVISIBLE")) {
  await CLOXY.user.setStatus('offline');
  }

       let Tbot = CLOXY.user;
      if(message.content.startsWith(`${Tbot}`)) {
        let replies = ["No!", "Yes!", "I don't know"];

        let result = Math.floor((Math.random() * replies.length));

        message.channel.send(replies[result]);
      }


 

 


  let commandfile = CLOXY.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(CLOXY,message,args);
    if (message.content.startsWith(prefix + "kick")) {
      


     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) message.channel.sendMessage("Can't find user!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("KICK_MEMBERS")) message.channel.sendMessage("No can do pal!");
     if(kUser.hasPermission("KICK_MEMBERS")) message.channel.sendMessage("That person can't be kicked!");

     let kickEmbed = new Discord.RichEmbed()
     .setDescription("~Kick~")
     .setColor("#e56b00")
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", kReason);

     message.guild.member(kUser).kick(kReason);
     message.channel.send(kickEmbed).then(msg => {msg.delete(5000)});

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


  if(message.content.toLowerCase().startsWith(prefix + "stuffs")) {
          message.delete();
        let user = message.author;
        user.send("**PREFIX = /** \n **✅Default Commands✅** \n **1. 8ball - ** It is a command that will reply you random answers from a question. \n **2. Avatar -** It is a command that shows an users Avatar/Icon. \n **3. Botinfo -** It will show the status and informations of the bot \n **4. AFK -** This command will set your status to afk. \n **5. Coins -** This command will show how much coins you or the one that you mentioned gained already. \n **6. Invite -** This will automatically send you a permanent link of this server. \n **7. Mail -** This command will DM the user that is tagged/mentioned and the message the one you sent.")
        user.send("** 8. Meme -** This command will post/send random funny or awkward memes. \n **9. Online - ** This command will show how many players are online, idle, do not disturb or invisible. \n **10. Pay -** This command will allow you to pay someone of your coins. \n **11. Ping -** This command will show the ping of the Bot, If it is lagging or not. \n **12. ServerInfo -** This command will show the information of this server. \n **13. Smoke -** This command will tell everyone that you are smoking \n **14. XP -** This command will show you what is your current level and how much more xp is needed to level up.") 
        user.send("**✅MOD COMMANDS✅**\n **1. Lockdown -** This command will lockdown the channel where this message is sent for sometime. \n **2. Purge -** This will delete/bulk the past messages that is not older than 2 Weeks. \n **3. Setchannelname -** This will change the channels name on where this command is executed at. \n **4. Settopic -** This command will change the channels topic on where this command is executed at. \n **5. Warn -** This will warn the player that the staff mentions, when the player got warned for 3 times will get 30min Mute \n **6. Mute -** This command will mute the player that the staff mentioned for a certain time \n **7. Kick -** This command will kick the player that the staff has tagged/mentioned from the server \n **8. Ban -** This command will ban the player that the staff has mentioned/tagged from the server.")
        user.send("***Make Sure That When The Command Is UpperCased Or LowerCased You Must Follow It So It Will Work***")
        .catch(console.error);
  }


  const ownerID = '314640655282339841';

if (message.content.startsWith(prefix + "servers")) {
    if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");
    let string = '';

    CLOXY.guilds.forEach(guild => {
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

         CLOXY.guilds.get(args[0]).leave();
         message.channel.send(`**Bot was been removed from server id [${args[0]}]**`)
     }
  







let Test = '3s';
if(message.content.startsWith("hi")) {
   message.channel.startTyping(Test);

   setTimeout(function() { (message.reply("Hi"));
                         }, ms(Test));
   message.channel.stopTyping(true);
              } 
  
      if (message.content.startsWith(prefix + "Mute")) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Sorry, but you do not have valid permissions! If you beleive this is a error, contact an owner.");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Couldn't find user.");
    if (tomute.hasPermission("MUTE_MEMBERS")) return message.reply("The user you are trying to mute is either the same, or higher role than you.");
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

  
  
      if (message.content.toLowerCase().startsWith(prefix + "Unmute")) {
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
    
    if (message.content.toLowerCase().startsWith(prefix + "ban")) {
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) message.channel.sendMessage("Can't find user!");
    let bReason = args.join(" ").slice(22) || "None"
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
      if (message.content.toLowerCase().startsWith(prefix + "addrole")) {
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
    if (message.content.toLowerCase().startsWith(prefix + "removerole")) {  
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






  
    if(message.content.toLowerCase().startsWith(prefix + "warn")) {
  let warns = JSON.parse(fs.readFileSync("warnings.json", "utf8"));
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("No you can not do that pal");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.channel.sendMessage("Must Mention A Player");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You can not warn this player");
  let reason = args.join(" ").slice(22) || "None"

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

message.channel.sendMessage(`${wUser} **has been warned** :x:`)

  message.channel.send(warnEmbed);

  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("You should create muted role")


  }
}

  


  
             
});

CLOXY.login(process.env.TOKEN);