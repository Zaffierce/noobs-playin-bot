const Discord = require("discord.js");
const config = require("../config.json");
    
module.exports.run = async (bot, message, args) => {

    let prefix = config.prefix;

const embed = new Discord.RichEmbed()
    .setColor('#33EFFF')
    .setAuthor('Commands list for Noobs Playin Bot')
    .addField(`${prefix}addrole`,`Type ${prefix}addrole help for more information.`)
    .addField(`${prefix}config`,`Type ${prefix}config for more information.  This must be configured first or else the bot will not work.`)
    .addField(`${prefix}deleterole`,`Deletes roles, type ${prefix}roles to get the full list.`)
    .addField(`${prefix}editrule`,`Type ${prefix}editrule help for more information.`)
    .addField(`${prefix}help`,`Displays this menu.`)
    .addField(`${prefix}postroles`,`Posts the #roles information.  Run this in the #roles channel.`)
    .addField(`${prefix}postrules`,`Posts the #rule information.  Run this in the #rule channel.`)
    .addField(`${prefix}prefix`,`Sets the prefix for this bot.`)
    .addField(`${prefix}roles`,`Displays the current list of roles.`)
    // .addField(`${prefix}`,`${prefix}`)
    .addField(`${prefix}prefix`,`Sets the command prefix, recommend setting it to something unique.`)

    .setFooter(`Created by Zaff#6073 - https://github.com/Zaffierce/ - if there are any issues please DM me.`)

    message.channel.send(embed);
};