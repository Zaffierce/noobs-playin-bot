const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  let modRole = message.member.hasPermission('KICK_MEMBERS');    
  if(!modRole) return message.delete();

  let embed = new Discord.MessageEmbed()

  let greeting_msg = message.content.split(' ').splice(1).join(' ')

  // message.content.split(' ').splice(3).join(' ');
  // console.log(message.content.split(' ').splice(1).join(' '))

  if (!greeting_msg) {
    embed.setColor('RED')
    embed.setTitle('Error:')
    embed.setDescription('Please include a new greeting message!')
    return message.channel.send(embed);
  }
  
  config.greeting = greeting_msg;
  fs.writeFile('config.json', JSON.stringify(config), (err) => {
    if (err) console.log(err);
  });

  embed.setColor('#76FF33')
  embed.setTitle('Greeting Updated')
  embed.setDescription(greeting_msg);

  return message.channel.send(embed);
};