//Requires member to have KICK_MEMBERS permission or else it won't do anything.
const Discord = require("discord.js");
const fs = require("fs");
const roles = require("../data/roles.json");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    
  let modRole = message.member.hasPermission('KICK_MEMBERS');
  if(!modRole) return message.delete();

  let embed = new Discord.MessageEmbed();
  let roleName = args[0];
      
  if (roleName === "help") {

    embed.setColor('RED')
    embed.setTitle('Help:  Adding a Role')
    embed.setThumbnail('https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/91_Discord-512.png')
    embed.setDescription(`This command will allow you to add a new role to your list.  If you add a new role, then you must run \`${config.prefix}postroles\` to update things.`)
    embed.addFields(
      {name:"Examples", value:`${config.prefix}addrole [role] [emoji] [description]\n${config.prefix}addrole us :flag_us: This role is for North American players\n${config.prefix}addrole tob :three: This role is for ToB learners`},
      {name:"Notes:", value:"● Commands are deleted when ran, but cannot be ran by anyone who does not have the `KICK_MEMBERS` permission\n● The role must be one word can cannot contain spaces.  _ or - is fine though.\n● A description must be included with the role."}
    );
  return message.channel.send(embed);
  }

  let roleEmoji = args[1];
  let roleDesc = message.content.split(' ').splice(3).join(' ');

  if (!args[0] || !roleDesc) {
    embed.setColor('RED')
    embed.setTitle('Error:')
    embed.setDescription(`An error has occured while trying to run your command.  Please run \`${config.prefix}addrole help\` for more information.`)
  return message.channel.send(embed);
  } else {
    if (roles[roleName]) {
      embed.setColor('RED')
      embed.setTitle('Error:  A role already exists')
      embed.setDescription(`An error has occured.  A role already exists with this name.`)
    return message.channel.send(embed);
    }

    if (!message.guild.roles.cache.find(r => r.name == roleName)) { 
      embed.setColor('RED')
      embed.setTitle('Error:  Discord Role not found')
      embed.setDescription(`An error has occured.  No roles found within this Discord server that match the role you've entered.  Please try again.`)
      return message.channel.send(embed);
    }

    (!roles[roleName])
      roles[roleName] = {
      roleName: roleName,
      roleEmoji: roleEmoji,
      roleDesc: roleDesc,
      roleReact: roleEmoji
    }

    embed.setColor(`#76FF33`)
    embed.setTitle('Role successfully added')
    embed.setDescription(`A new role has been added.\n\nRole Name: ${roleName}\nRole Emoji: ${roleEmoji}\nRole Description: ${roleDesc}\n\nRun \`${config.prefix}postroles\` in the roles channel to update things.`);

    
    fs.writeFile("data/roles.json", JSON.stringify(roles), (err) => {
      if (err) console.log(err);
    });
    return message.channel.send(embed);
  }
};