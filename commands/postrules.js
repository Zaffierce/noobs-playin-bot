const Discord = require("discord.js");
const generalRules = require('../data/generalRules.json');
const eventRules = require('../data/eventRules.json');
const promotionRules = require('../data/promotionRules.json');
const pvmRules = require('../data/pvmRules.json');
const update = require("../update.json");


    module.exports.run = async (bot, message, args) => {
        let modRole = message.member.hasPermission('KICK_MEMBERS');
        let channel = bot.channels.get(update.rules.channelID);

        if(!modRole) {     
            message.delete();
            console.log(message.author.username + " attempted to run a command that they don't have access to!");
        } else {
            message.delete();
            if (update.rules.channelID === "0") {return message.channel.send("Please run the config command first.")}
                let count = 0;
                channel.fetchMessages({limit: 100})
                 .then(messages => {
                  let messagesArr = messages.array();
                  let messageCount = messagesArr.length;
            
                  for(let i = 0; i < messageCount; i++) {
                     messagesArr[i].delete()
                      .then(function() {
                        count = count + 1;
                        if(count >= 100) {
                          deleteStuff();
                        }
                      })
                      .catch(function() {
                        count = count + 1;
                        if(count >= 100) {
                          deleteStuff();
                        }
                      });
                  }
                 }).then(function() {
                    const lineBreakEmbed = new Discord.RichEmbed()
                        .setColor('#000000')
                        .addBlankField();
                    const generalRulesEmbedHeader = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setAuthor('Noobs Playin')
                        .setDescription(`Welcome to Noobs Playin!  Please set your Discord name to your in-game name and please review the rules below.  If you agree, please click on the green check mark.`)
                        .setThumbnail('https://cdn.discordapp.com/attachments/481526541063290890/544732202089447435/NP_Logo_TShirt.png');
                    channel.send(generalRulesEmbedHeader);
                    const generalRulesEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                    for (i in generalRules) {
                        let myArray = generalRules[i];
                        let title = myArray.ruleNum;
                        let desc = myArray.ruleText;
                        generalRulesEmbed.addField("General Rule #"+title, desc)
                    }
                    channel.send(generalRulesEmbed);
                    const eventRulesEmbed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                    for (i in eventRules) {
                        let myArray = eventRules[i];
                        let title = myArray.ruleNum;
                        let desc = myArray.ruleText;
                        eventRulesEmbed.addField("Event Rule #"+title, desc)
                    }
                    channel.send(eventRulesEmbed);
                    const promotionRulesEmbed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                for (i in promotionRules) {
                    let myArray = promotionRules[i];
                    let icon = myArray.rankIcon;
                    let title = myArray.rankName;
                    let desc = myArray.ruleText;
                    promotionRulesEmbed.addField(icon+" - "+title, desc)
                }
                channel.send(promotionRulesEmbed);
                const pvmRulesEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
            for (i in pvmRules) {
                let myArray = pvmRules[i];
                let title = myArray.ruleNum;
                let desc = myArray.ruleText;
                pvmRulesEmbed.addField("PvM Rule #"+title, desc)
            }
            channel.send(pvmRulesEmbed);
                    const confirmEmbed = new Discord.RichEmbed()
                    .setColor('#FF0000')
                    .setDescription('If you agree to these rules, please click on the checkmark below');
                channel.send(confirmEmbed).then(function(message) {
                    message.react('✅');
                })
                    });//end posting rules
                }
    };
