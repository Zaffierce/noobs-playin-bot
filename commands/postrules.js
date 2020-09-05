const Discord = require("discord.js");
const generalRules = require("../data/generalRules.json");
const eventRules = require("../data/eventRules.json");
const promotionRules = require("../data/promotionRules.json");
const pvmRules = require("../data/pvmRules.json");
const config = require("../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  let modRole = message.member.hasPermission('KICK_MEMBERS');
  if (!modRole) return message.delete();
  
  const rules_channel = bot.channels.cache.get(config.rules_channel_ID);
  if (!rules_channel) return message.channel.send(`The rules channel is not defined.  Please run \`${config.prefix}config\` first.`);

  rules_channel.messages.fetch().then(messages => {
    let messagesArr = messages.array();
    for (let i = 0; i < messagesArr.length; i++) {
      messagesArr[i].delete();
    }
  }).then(() => {
    const blankEmbed = new Discord.MessageEmbed()
      .setColor('#000000')
      .addField('\u200b', '\u200b');
    const rulesHeaderEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Noobs Playin Rules')
      .setDescription('Welcome to Noobs Playin!  Please set your Discord name to your in-game name and review the rules below.  If you agree, click on the green check mark.  Please be aware that these rules may change at any time and there is no excuses for being unaware of these rules.')
      .setThumbnail('https://cdn.discordapp.com/attachments/583788262771130372/723251875188572160/NP_Logo_BW.png')
    rules_channel.send(rulesHeaderEmbed);
    for (i in generalRules) {
      let general = generalRules[i]
      const generalRulesEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .addField(`General Rule #${generalRules[i].ruleNum}`, generalRules[i].ruleText);
      rules_channel.send(generalRulesEmbed).then(m => {
        general.messageID = m.id;
        fs.writeFile("data/generalRules.json", JSON.stringify(generalRules), (err) => { 
          if (err) console.log(err); 
        });
      });
    }
    rules_channel.send(blankEmbed);
    for (i in eventRules) {
      let event = eventRules[i]
      const eventRulesEmbed = new Discord.MessageEmbed()
        .setColor('#76FF33')
        .addField(`Event Rule #${eventRules[i].ruleNum}`, eventRules[i].ruleText);
      rules_channel.send(eventRulesEmbed).then(m => {
        event.messageID = m.id;
        fs.writeFile("data/eventRules.json", JSON.stringify(eventRules), (err) => { 
          if (err) console.log(err); 
        });
      });
    }
    rules_channel.send(blankEmbed);
    for (i in promotionRules) {
      let promotion = promotionRules[i];
      const ranksEmbed = new Discord.MessageEmbed()
        .setColor('#e2f004')
        .addField(`${promotionRules[i].ruleNum}`, promotionRules[i].ruleText);
      rules_channel.send(ranksEmbed).then(m => {
        promotion.messageID = m.id;
        fs.writeFile("data/promotionRules.json", JSON.stringify(promotionRules), (err) => { 
          if (err) console.log(err); 
        });
      });
    }
    rules_channel.send(blankEmbed);
    for (i in pvmRules) {
      let pvm = pvmRules[i];
      const pvmRulesEmbed = new Discord.MessageEmbed()
        .setColor('#e3801b')
        .addField(`PvM Rule #${pvmRules[i].ruleNum}`, pvmRules[i].ruleText);
      rules_channel.send(pvmRulesEmbed).then(m => {
        pvm.messageID = m.id;
        fs.writeFile("data/pvmRules.json", JSON.stringify(pvmRules), (err) => { 
          if (err) console.log(err); 
        });
      });
    }
    const agreeEmbed = new Discord.MessageEmbed()
      .setColor('#df1c1c')
      .setDescription('If you agree to these rules, please click the checkmark below.');
    rules_channel.send(agreeEmbed).then(m => {
      m.react('✅');
    })
  });
};
