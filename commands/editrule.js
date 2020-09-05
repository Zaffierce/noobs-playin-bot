const Discord = require("discord.js");
const generalRules = require('../data/generalRules.json');
const eventRules = require('../data/eventRules.json');
const promotionRules = require('../data/promotionRules.json');
const pvmRules = require('../data/pvmRules.json');
// const update = require("../update.json");
const config = require("../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  let ruleType = args[0];
  let ruleNumber = args[1];
  let ruleText = message.content.split(' ').splice(3).join(' ');
  let modRole = message.member.hasPermission('KICK_MEMBERS');
  let rules = bot.channels.cache.get(config.rules_channel_ID);
  let announcements = bot.channels.cache.get(config.announcements_channel_ID);

  if(!modRole) return message.delete();

  let embed = new Discord.MessageEmbed()
  if (ruleType === "help") {
      embed.setColor('RED')
      embed.setTitle('Help: Adding & Editing a Rule')
      embed.setThumbnail('https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/91_Discord-512.png')
      embed.setDescription(`This command will allow you to add and/or edit rules.  If you add a new rule, then you must run \`${config.prefix}postrules\` to update the list.`)
      embed.addFields(
        {name:"Examples", value:`${config.prefix}editrule [type] [number] [description]\n${config.prefix}editrule general 3 PM gold star ranks in-game or on Discord for rank promotions`},
        {name:"Notes:", value:`● [type] is either \`general\`, \`event\`, \`promotion\`, or \`pvm\`\n● Type, number and description must be included on all rules or the command will fail.\n● For Ranks, the [number] is the rank name, i.e. \`${config.prefix}editrule recruit Participate in 5 events to not be a friggin noob.\``}
      );
    return message.channel.send(embed);
  }
  if (!ruleType || !ruleNumber || !ruleText) {
    embed.setColor('RED')
    embed.setTitle('Error:')
    embed.setDescription(`An error has occured while trying to run your command.  Please check \`${config.prefix}editrule help\` for more information.`)
  return message.channel.send(embed);
  }

  let fileName, section, filepath, color;

  //color = '#76FF33';

  switch (ruleType) {
    case 'general':
      fileName = generalRules;
      section = 'General';
      filepath = 'data/generalRules.json';
      color = '#0099ff';
    break;

    case 'event':
      fileName = eventRules;
      section = 'Event';
      filepath = 'data/eventRules.json';
      color = '#76FF33';
    break;

    case 'promotion':
      fileName = promotionRules;
      section = 'Promotion';
      filepath = 'data/promotionRules.json';
      color = '#e2f004';
    break;

    case 'pvm':
      fileName = pvmRules;
      section = 'PvM';
      filepath = 'data/pvmRules.json';
      color = '#e3801b';
    break;
  }

  let oldRuleText;

  if (fileName != promotionRules) {
    if (!fileName[ruleNumber]) fileName[ruleNumber] = {
      ruleText: ruleText,
      ruleNum: ruleNumber,
      messageID: "none"
    };

    oldRuleText = fileName[ruleNumber].ruleText;

    fileName[ruleNumber] = {
      ruleText: ruleText,
      ruleNum: ruleNumber,
      messageID: fileName[ruleNumber].messageID
    };
  } 

  if (fileName == promotionRules) {
    if (!fileName[ruleNumber]) fileName[ruleNumber] = {
      ruleText: ruleText,
      ruleNum: fileName[ruleNumber].ruleNum,
      messageID: "none"
    };

    oldRuleText = fileName[ruleNumber].ruleText;

    fileName[ruleNumber] = {
      ruleText: ruleText,
      ruleNum: fileName[ruleNumber].ruleNum,
      messageID: fileName[ruleNumber].messageID
    };
  }


  if (fileName[ruleNumber].messageID === "none") {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .addField(`${section} Rule #${ruleNumber}`, `${ruleText}`);

    message.channel.send(`Adding a new rule.  This will not appear until \`${config.prefix}postrules\` has been ran.`);
    message.channel.send(embed);

    fs.writeFile(filepath, JSON.stringify(fileName), (err) => {
      if (err) console.log(err);
    });
  } else {
    if (ruleType != "promotion") {
      const oldEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .addField(`${section} Rule #${ruleNumber}`, `${oldRuleText}`);

      announcements.send("A change has been made to the rules");
      announcements.send("***OLD RULE***");
      announcements.send(oldEmbed).then(() => {
          const embed = new Discord.MessageEmbed()
            .setColor(color)
            .addField(`${section} Rule #${ruleNumber}`,`${ruleText}`);
  
          let embedObjectID = Object.assign({}, embed.fields['0']);
          embedObjectID.value = ruleText;
          const newEmbed = new Discord.MessageEmbed({
            color: embed.color,
            fields: [embedObjectID],
          });
          let ruleID = fileName[ruleNumber].messageID;
          rules.messages.fetch(ruleID).then(message => message.edit(newEmbed)).catch(e => console.log(e));
          announcements.send("**NEW RULE**");
          announcements.send(newEmbed);
      });
    } else {
      const oldEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .addField(promotionRules[ruleNumber].ruleNum, oldRuleText)
      announcements.send("A change has been made to the rules")
      announcements.send("***OLD RULE***");
      announcements.send(oldEmbed).then(() => {
        const embed = new Discord.MessageEmbed()
          .setColor(color)
          .addField(promotionRules[ruleNumber].ruleNum, ruleText);
        
        let embedObjectID = Object.assign({}, embed.fields['0']);
        embedObjectID.value = ruleText;
        const newEmbed = new Discord.MessageEmbed({
          color: embed.color,
          fields: [embedObjectID]
        });
        let ruleID = fileName[ruleNumber].messageID;
        rules.messages.fetch(ruleID).then(message => message.edit(newEmbed)).catch(e => console.log(e));
        announcements.send("***NEW RULE***");
        announcements.send(newEmbed);
      });
    }

    fs.writeFile(filepath, JSON.stringify(fileName), (err) => {
      if (err) console.log(err);
    });
  }          
};