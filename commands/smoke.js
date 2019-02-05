const Discord = require("discord.js");


module.exports.run = async (CLOXY, message, args) => {

    message.delete();
    message.channel.send(`**BISSSSHES ${message.author} IS SMOKING**`).then(async msg => {
        setTimeout(() => {
            msg.edit('🚬');
        }, 500);
        setTimeout(() => {
            msg.edit('🚬 ☁ ');
        }, 1000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁ ');
        }, 2000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁ ');
        }, 3000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁☁ ');
        }, 4000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁☁☁');
        }, 5000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁☁☁☁');
        }, 6000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁☁☁');
        }, 7000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁☁');
        }, 8000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁');
        }, 9000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁');
        }, 10000);
        setTimeout(() => {
            msg.edit('🚬 ☁');
        }, 11000);
        setTimeout(() => {
            msg.edit('🚬 ');
        }, 12000);
        setTimeout(() => {
            msg.edit(`**Finished smoking** `).then(msg => msg.delete(5000));
        }, 13000);
    });
};



module.exports.help = {
    name: "Smoke"
  };
