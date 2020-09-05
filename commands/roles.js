const Discord = require("discord.js");
const roles = require("../data/roles.json");

module.exports.run = async (bot, message, args) => {
  let modRole = message.member.hasPermission('KICK_MEMBERS');
  if (!modRole) return message.delete();
  
  if (Object.keys(roles).length < 1) {
    let embed = new Discord.MessageEmbed()
    embed.setColor('RED')
    embed.setTitle('Error:')
    embed.setDescription('There are no roles currently defined.  Please add roles first then re-run this command.')
  return message.channel.send(embed) 
  } else {
    let embed = new Discord.MessageEmbed()
      .setColor('#33EFFF')
      .setDescription("Current list of roles:");
    for (i in roles) {
      embed.addField(roles[i].roleName, roles[i].roleEmoji)
    }
    return message.channel.send(embed)
  }  
};