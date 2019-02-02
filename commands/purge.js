const Discord = require("discord.js");
const Unique = new Discord.Client();

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, but you do not have the **Manage Messages** permissions! If you think this is an error, contact an owner.')


    if (!args[0]) return message.channel.send('You must specify a number of messages.');
    if (args[0] < 1) return message.channel.send('Please provide a number greater than 1.');
    if (args[0] > 100) return message.channel.send('Please provide a number less than 100.');
    if (isNaN(args[0])) return message.channel.send('Please provide a correct number.');

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`🗑 I delete **${args[0]}** messages.`).then(message => message.delete(3000));
    }).catch().catch((e) => message.channel.send('You can not delete messages older than 14 days.'));

}

module.exports.help = {
    name: "purge"
};
