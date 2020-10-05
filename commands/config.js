//Requires member to have KICK_MEMBERS permission or else it won't do anything.
const Discord = require("discord.js")
const config = require("../config.json");
const fs = require("fs");
    
module.exports.run = async (bot, message, args) => {
  let modRole = message.member.hasPermission('KICK_MEMBERS');
  if(!modRole) return message.delete();

  let type = args[0];
  let data = args[1];
  let embed = new Discord.MessageEmbed()
  embed.setColor('#76FF33')
  embed.setTitle('Configuration successfully updated')
  switch(type) {
    case 'help':
      embed.setColor('RED')
      embed.setTitle('Help:  Updating the configuration')
      embed.setDescription('This command explains how to update the configurations for the bot.')
      embed.addFields(
        {name:"Example", value:`${config.prefix}config [type] [data]\n${config.prefix}config roles #roles\n${config.prefix}config guestrank @guest\n${config.prefix}config list`},
        {name:"Notes:", value:"● [type] is either `roles`, `announcements`, `rules`, `nickname`, `nickname_history`, `welcome`, `leave` ,`guest`, or `member`\n● If the guest rank and/or member rank is not @-able, you'll have to fetch the group's ID instead by doing `\\@guest` and then enter that instead."}
      );
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;

    case 'roles':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.roles_channel_ID === data) message.channel.send('An error has occured while trying to run your command.  The existing channel ID matches the inputted ID.');
      else (!config.roles_channel_ID) 
        config.roles_channel_ID = data.replace(/\D/g,'');
      embed.setDescription(`Role Channel: ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;

    
    case 'announcements':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.announcements_channel_ID === data) message.channel.send('An error has occured while trying to run your command.  The existing channel ID matches the inputted ID.');
      else (!config.announcements_channel_ID)
        config.announcements_channel_ID = data.replace(/\D/g,'')
      embed.setDescription(`Announcement Channel:  ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;

    case 'welcome':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.welcome_channel_ID === data) message.channel.send('An error has occured while trying to run your command.  The existing channel ID matches the inputted ID.');
      else (!config.welcome_channel_ID)
        config.welcome_channel_ID = data.replace(/\D/g,'')
      embed.setDescription(`Welcome Channel:  ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;
      
    case 'rules':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.rules_channel_ID === data) message.channel.send('An error has occured while trying to run your command.  The existing channel ID matches the inputted ID.');
      else (!config.rules_channel_ID)
        config.rules_channel_ID = data.replace(/\D/g,'')
      embed.setDescription(`Rules Channel: ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;

    case 'nickname':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.nickname_channel_ID === data) message.channel.send('An error has occured while trying to run your command.  TThe existing channel ID matches the inputted ID.');
      else (!config.nickname_channel_ID)
        config.nickname_channel_ID = data.replace(/\D/g,'')
      embed.setDescription(`Nickname Channel: ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;

    case 'nickname_history':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.nickname_history_channel_ID === data) message.channel.send('An error has occured while trying to run your command.  TThe existing channel ID matches the inputted ID.');
      else (!config.nickname_history_channel_ID)
        config.nickname_history_channel_ID = data.replace(/\D/g,'')
      embed.setDescription(`Nickname History Channel: ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;

    case 'leave':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.leave_channel_ID === data) message.channel.send('An error has occured while trying to run your command.  TThe existing channel ID matches the inputted ID.');
      else (!config.leave_channel_ID)
        config.leave_channel_ID = data.replace(/\D/g,'')
      embed.setDescription(`Leave Channel: ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;
        
    case 'guest':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.guest_rank === data) message.channel.send('An error has occured while trying to run your command.  This role is already matches the inputted ID.');
      else (!config.guest_rank)
        config.guest_rank = data.replace(/\D/g,'');
      embed.setDescription(`Guest rank role set to: ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;

    case 'member':
      if (!data) return message.channel.send('An error has occured while trying to run your command.  Please check that you are including the [data] object.');
      if (config.member_rank === data) message.channel.send('An error has occured while trying to run your command.  This role already matches the inputted ID.');
      else (!config.member_rank)
        config.member_rank = data.replace(/\D/g,'');
      embed.setDescription(`Member rank role set to: ${data}`);
      fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) console.log(err);
      });
    break;

    case 'list':
      embed.setTitle(`Current configuration settings`)
      embed.addFields(
        {name:"Roles Channel", value:`<#${config.roles_channel_ID}>`},
        {name:"Announcements Channel", value:`<#${config.announcements_channel_ID}>`},
        {name:"Rules Channel", value:`<#${config.rules_channel_ID}>`},
        {name:"Nickname Channel", value:`<#${config.nickname_channel_ID}>`},
        {name:"Nickname History Channel", value:`<#${config.nickname_history_channel_ID}>`},
        {name:"Welcome Channel", value:`<#${config.welcome_channel_ID}>`},
        {name:"Leave Channel", value:`<#${config.leave_channel_ID}>`},
        {name:"Guest rank name", value:`<@&${config.guest_rank}>`},
        {name:"Member rank name", value:`<@&${config.member_rank}>`}
      );
    break;

    default:
      embed.setColor('RED')
      embed.setTitle(`Configuration Error:`)
      embed.setDescription(`An error has occured while trying to run your command.  Please run \`${config.prefix}config help\` for more information.`)
  }
  return message.channel.send(embed);
};