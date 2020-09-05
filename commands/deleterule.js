const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");
const generalRules = require('../data/generalRules.json');
const eventRules = require('../data/eventRules.json');
const promotionRules = require('../data/promotionRules.json');
const pvmRules = require('../data/pvmRules.json');

module.exports.run = async (bot, message, args) => {

  let modRole = message.member.hasPermission('KICK_MEMBERS');    
  if(!modRole) return message.delete();

  let ruleType = args[0];
  let ruleNum = args[1];
  let embed = new Discord.MessageEmbed();
  let rules = bot.channels.cache.get(config.rules_channel_ID);

  if (ruleType === "help") {
    embed.setColor('RED')
    embed.setTitle('Help:  Deleting a Rule')
    embed.setDescription(`This command will allow you to delete an existing rule.`)
    embed.addFields(
      {name: "Example:", value: `${config.prefix}deleterule [type] [number]\n${config.prefix}deleterule pvm 14`},
      {name: "Notes:", value: `● [type] is either \`general\`, \`event\`, \`promotion\`, or \`pvm\``}
    )
  }

  if (!ruleType || !ruleNum) {
    embed.setColor('RED')
    embed.setTitle('Error:')
    embed.setDescription(`An error has occured while trying to run your command.  Please check \`${config.prefix}deleterule help\` for more information.`)
    return message.channel.send(embed);
  }
    
  let fileName, filepath;

  switch(ruleType) {
    case 'general':
      fileName = generalRules;
      filepath = 'data/generalRules.json';
    break;

    case 'event':
      fileName = eventRules;
      filepath = 'data/eventRules.json';
    break;

    case 'promotion':
      fileName = promotionRules;
      filepath = 'data/promotionRules.json';
    break;

    case 'pvm':
      fileName = pvmRules;
      filepath = 'data/pvmRules.json';
    break;
  }

  if (!fileName[ruleNum]) {
    embed.setColor('RED')
    embed.setTitle('Error:')
    embed.setDescription(`The rule was not found, please try again.`)
  return message.channel.send(embed);
  } else {
    let del_msgID = fileName[ruleNum].messageID;
    delete fileName[ruleNum]
    fs.writeFile(filepath, JSON.stringify(fileName), (err) => {
      if (err) console.log(err);
    });
    embed.setColor('RED')
    embed.setTitle('Rule Deleted')
    embed.setDescription(`${ruleType} ${ruleNum} was successfully removed.`)
    rules.messages.fetch(del_msgID).then(m => m.delete()).catch(e => console.log(e));
  return message.channel.send(embed);
  }
};