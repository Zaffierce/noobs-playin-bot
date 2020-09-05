const Discord = require("discord.js");
const config = require("../config.json");
    
module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setColor('#33EFFF')
    .setAuthor('Command list for the Noobs Playin Bot')
    .addFields(
      {name: `${config.prefix}addrole`, value: `This command allows you to add custom roles.  Type \`${config.prefix}addrole help\` for more information.`},
      {name: `${config.prefix}config`, value: `This command allows you to configure various settings related to your Discord.  Type \`${config.prefix}config help\` for more information.`},
      {name: `${config.prefix}deleterole`, value: `This command allows you to delete custom roles.  Type \`${config.prefix}deleterole help\` for more information.`},
      {name: `${config.prefix}deleterule`, value: `This command allows you to delete rules.  Type \`${config.prefix}deleterule help\` for more information.`},
      {name: `${config.prefix}editrule`, value: `This command allows you to create or edit new rules.  Type \`${config.prefix}editrule help\` for more information.`},
      {name: `${config.prefix}help`, value: `This command displays what you are reading currently.`},
      {name: `${config.prefix}postroles`, value: `This command will post your custom roles to the roles channel.  The roles channel can be configured via \`${config.prefix}config\``},
      {name: `${config.prefix}postrules`, value: `This command will post your rules to the rules channel.  The rules channel can be configured via \`${config.prefix}config\``},
      {name: `${config.prefix}prefix`, value: `This command will set the prefix of the bot.  Currently the prefix is \`${config.prefix}\``},
      {name: `${config.prefix}roles`, value: `This command will output all existing roles making it easy to delete them.`}
      )
    .setFooter(`Created by Zaff#6073 - https://github.com/zaffierce/noobs-playin-bot - If there are any issues, please shoot me a DM.`)
    return message.channel.send(embed);
};