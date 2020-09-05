const Discord = require("discord.js");
const fs = require("fs");
const roles = require("../data/roles.json");
const config = require("../config.json");
    
module.exports.run = async (bot, message, args) => {
    
  let modRole = message.member.hasPermission('KICK_MEMBERS');
  if(!modRole) return message.delete();

  if (Object.keys(roles).length < 1) {
    let embed = new Discord.MessageEmbed()
    embed.setColor('RED')
    embed.setTitle('Error:')
    embed.setDescription('There are no roles currently defined.  Please add roles first then re-run this command.')
  return message.channel.send(embed);
  }
  const roles_channel = bot.channels.cache.get(config.roles_channel_ID);
  if (!roles_channel) return message.channel.send(`The roles channel is not defined.  Please run \`${config.prefix}config\` first.`);

  roles_channel.messages.fetch().then(messages => {
    let messagesArr = messages.array();
    for (let i = 0; i < messagesArr.length; i++) {
      messagesArr[i].delete();
    }
  }).then(() => {
    const rolesHeaderEmbed = new Discord.MessageEmbed()
    .setColor("#33EFFF")
    .setAuthor("Noobs Playin")
    .setDescription("Welcome to Noobs Playin. Please react to the Emoji's below to be assigned to the group you want. If you no longer wish to be a part of that group, all you have to do is remove your reaction. Please note that if you give yourself the CoX or ToB roles, you should have at least 50kc in either one, otherwise give yourself the respective learner role so we can take you on learner raids.")
    .setThumbnail("https://cdn.discordapp.com/attachments/583788262771130372/751898867624312932/Animated_NP_Logo2.gif")
    roles_channel.send(rolesHeaderEmbed);
    let rolesEmbed = new Discord.MessageEmbed()
    .setColor('#33EFFF')
    for (i in roles) {
      rolesEmbed.addField(`${roles[i].roleEmoji} - ${roles[i].roleName}`, `${roles[i].roleDesc}`);
    }
    roles_channel.send(rolesEmbed).then((message) => {
      for (i in roles) {
      message.react(roles[i].roleReact.replace('>', ''));
      }
    });    
  }).catch(err => {
    console.log(err);
  });
};