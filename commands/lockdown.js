const Discord = require("discord.js");
const ms = require('ms');
module.exports.run = async (Unique, message, args) => {

if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Sorry, you don\'t have permission to lockdown or unlock!')
    .then(msg => msg.delete({
        timeout: 10000
    }));
if (!Unique.lockit) Unique.lockit = [];
let time = args.join(' ');
let validUnlocks = ['release', 'unlock'];
if (!time) return message.channel.send('You must set a duration for the lockdown in either hour(s), minute(s) or second(s)');

if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        })
        .then(() => {
            message.channel.send('Lockdown lifted.');
            clearTimeout(Unique.lockit[message.channel.id]);
            delete Unique.lockit[message.channel.id];
        })
        .catch(error => {
            console.log(error);
        });
} else {
    message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        })
        .then(() => {
            message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`)
                .then(() => {

                    Unique.lockit[message.channel.id] = setTimeout(() => {
                        message.channel.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: null
                            })
                            .then(message.channel.send('Lockdown lifted.'))
                            .catch(console.error);
                        delete Unique.lockit[message.channel.id];
                    }, ms(time));
                })
                .catch(error => {
                    console.log(error);
                });
        });
  }
}
module.exports.help = {
  name: 'lockdown',
}
