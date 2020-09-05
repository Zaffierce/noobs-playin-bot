//Requires member to have KICK_MEMBERS permission or else it won't do anything.
const Discord = require("discord.js");
const fs = require("fs");
const roles = require('../data/roles.json');
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
  let modRole = message.member.hasPermission('KICK_MEMBERS');
  if(!modRole) return message.delete();

  let role = args[0];
  let embed = new Discord.MessageEmbed();

  if (role === "help") {
    embed.setColor('RED')
    embed.setTitle('Help:  Deleting a Role')
    embed.setThumbnail('https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/91_Discord-512.png')
    embed.setDescription(`This command will allow you to delete existing roles.`)
    embed.addField('Example:', `${config.prefix}deleterole tob`)
    embed.addField('Here is a list of current roles:', '\u200b')
    for (i in roles) {
      embed.addField(`Role name: ${roles[i].roleName}`, `Role Desc: ${roles[i].roleDesc}`)
    }
    return message.channel.send(embed);
  }

  if (!role) {
    embed.setColor('RED')
    embed.setTitle('Error:')
    embed.setDescription(`An error has occured while trying to run your command.  Please run \`${config.prefix}deleterole help\` for more information.`)
  return message.channel.send(embed);
  }

  if (!roles[role]) {
    embed.setColor('RED')
    embed.setTitle('Error:  Role not found')
    embed.setDescription(`The role \`${role}\` was not found, please try again.  You can obtain a full list of roles by typing \`${config.prefix}roles\`.  If you believe this is still an error, please contact <@143840467312836609>`)
  return message.channel.send(embed);
  }

  delete roles[role]
  fs.writeFile("data/roles.json", JSON.stringify(roles), (err) => {
    if (err) console.log(err);
  });
    embed.setColor('RED')
    embed.setTitle('Role Deleted')
    embed.setDescription(`\`${role}\` was successfully removed.`)
    embed.addField('Note:', `Please re-run \`${config.prefix}postroles\` to update the role listing`)
  return message.channel.send(embed);
};