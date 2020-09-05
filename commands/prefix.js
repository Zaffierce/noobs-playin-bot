const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  let modRole = message.member.hasPermission('KICK_MEMBERS');    
  if(!modRole) return message.delete();

  let prefix = args[0];
  if (!prefix) return message.channel.send(`The current prefix is \`${config.prefix}\``);
  config.prefix = prefix;
  fs.writeFile("config.json", JSON.stringify(config), (err) => {
    if (err) console.log(err);
  });
  return message.channel.send("Command prefix has been set to " +prefix);
};