const Discord = require("discord.js");
const generalRules = require('../data/generalRules.json');
const eventRules = require('../data/eventRules.json');
const promotionRules = require('../data/promotionRules.json');
const pvmRules = require('../data/pvmRules.json');
const update = require("../update.json");
const fs = require("fs");

    module.exports.run = async (bot, message, args) => {
        
    let ruleType = args[0];
    let ruleNumber = args[1];
    let ruleText = message.content.split(' ').splice(3).join(' ');
    let modRole = message.member.hasPermission('KICK_MEMBERS');
    if(!modRole) {     
        message.delete();
        console.log(message.author.username + " attempted to run a command that they don't have access to!");
        } else {
            let channel = bot.channels.get(update.rules);
            let announcements = bot.channels.get(update.announcements);
            if (ruleType === 'help') {
                return message.channel.send('**Explanation of editrule**\nnb!editrule [type] [rule#] [ruletext]\n[type] can be `general`, `event`, `promotion`, `pvm`\n[rule#] is the number in order, starting at 1\n[ruletext] is whatever you want the rule to say\n\n**EXAMPLES:**\n*nb!editrule general 1 DO be a dick.*\n*nb!editrule pvm 11 BANDOS - Just alch bandos boots*\n*nb!editrule promotion 1 Smiley faces are super noobs*\n\n**NOTES:**\n- Commands are deleted when ran, but cannot be ran by those who do not have `KICK_MEMBERS` permissions\n- You can add additional rules, but after doing so you must run `!postrules` in the #rules channel.')
            }

            if(!args[0] || !args[1] || !ruleText) { return message.channel.send("Please check your command and try again.\nType !editrule help for more information") }
            
            if (ruleType === 'general') {
                message.delete();
                if (!generalRules[ruleNumber]) generalRules[ruleNumber] = {
                    ruleText: "",
                    ruleNum: "",
                    messageID: "none"
                };
                let wRuleText = generalRules[ruleNumber].ruleText;
                var newText = generalRules[ruleNumber].ruleText = ruleText;
                var newNum = generalRules[ruleNumber].ruleNum = ruleNumber;
                newText;
                newNum;

                if (generalRules[ruleNumber].messageID === "none") {
                    const embed = new Discord.RichEmbed()
                        .setColor(`#76FF33`)
                        .addField(`General Rule #${ruleNumber}`, `${ruleText}`);
                    message.channel.send("Adding a new rule.  This will not appear until !postrules has been ran.");
                    message.channel.send(embed);
                    console.log(`${message.author.username} just edited General Rule #${ruleNumber}.`);
                    fs.writeFile("data/generalRules.json", JSON.stringify(generalRules), (err) => {
                    if (err) console.log(err);
                    });
                } else {
                const oldEmbed = new Discord.RichEmbed()
                    .setColor(`#76FF33`)
                    .addField(`General Rule #${ruleNumber}`,`${wRuleText}`);                    
                announcements.send("A change has been made to the rules!");
                announcements.send("**OLD RULE**");
                announcements.send(oldEmbed).then(function() {
                    var newText = generalRules[ruleNumber].ruleText = ruleText;
                    var newNum = generalRules[ruleNumber].ruleNum = ruleNumber;
                    newText;
                    newNum;
                    const embed = new Discord.RichEmbed()
                    .setColor(`#76FF33`)
                    .addField(`General Rule #${ruleNumber}`,`${ruleText}`);
                    let embedObjectID = Object.assign({}, embed.fields['0']);
                    embedObjectID.value = ruleText;
                    const newEmbed = new Discord.RichEmbed({
                        color: embed.color,
                        fields: [embedObjectID],
                    });
                    let generalRulesID = generalRules[ruleNumber].messageID;
                    channel.fetchMessage(generalRulesID).then(message => message.edit(newEmbed));
                    announcements.send("**NEW RULE**");
                    announcements.send(newEmbed);
                });
                console.log(`${message.author.username} just edited General Rule #${ruleNumber}.`);
                fs.writeFile("data/generalRules.json", JSON.stringify(generalRules), (err) => {
                    if (err) console.log(err);
                });
                }
            }
            if (ruleType === 'event') {
                message.delete();
                if (!eventRules[ruleNumber]) eventRules[ruleNumber] = {
                    ruleText: "",
                    ruleNum: "",
                    messageID: "none"
                };
                let wRuleText = eventRules[ruleNumber].ruleText;
                var newText = eventRules[ruleNumber].ruleText = ruleText;
                var newNum = eventRules[ruleNumber].ruleNum = ruleNumber;
                newText;
                newNum;

                if (eventRules[ruleNumber].messageID === "none") {
                    const embed = new Discord.RichEmbed()
                        .setColor(`#76FF33`)
                        .addField(`Event Rule #${ruleNumber}`, `${ruleText}`);
                    message.channel.send("Adding a new rule.  This will not appear until !postrules has been ran.");
                    message.channel.send(embed);
                    console.log(`${message.author.username} just edited Event Rule #${ruleNumber}.`);
                    fs.writeFile("data/eventRules.json", JSON.stringify(eventRules), (err) => {
                    if (err) console.log(err);
                    });
                } else {
                const oldEmbed = new Discord.RichEmbed()
                    .setColor(`#76FF33`)
                    .addField(`Event Rule #${ruleNumber}`,`${wRuleText}`);                    
                announcements.send("A change has been made to the rules!");
                announcements.send("**OLD RULE**");
                announcements.send(oldEmbed).then(function() {
                    var newText = eventRules[ruleNumber].ruleText = ruleText;
                    var newNum = eventRules[ruleNumber].ruleNum = ruleNumber;
                    newText;
                    newNum;
                    const embed = new Discord.RichEmbed()
                    .setColor(`#76FF33`)
                    .addField(`Event Rule #${ruleNumber}`,`${ruleText}`);
                    let embedObjectID = Object.assign({}, embed.fields['0']);
                    embedObjectID.value = ruleText;
                    const newEmbed = new Discord.RichEmbed({
                        color: embed.color,
                        fields: [embedObjectID],
                    });
                    let eventRulesID = eventRules[ruleNumber].messageID;
                    channel.fetchMessage(eventRulesID).then(message => message.edit(newEmbed));
                    announcements.send("**NEW RULE**");
                    announcements.send(newEmbed);
                });
                console.log(`${message.author.username} just edited Event Rule #${ruleNumber}.`);
                fs.writeFile("data/eventRules.json", JSON.stringify(eventRules), (err) => {
                    if (err) console.log(err);
                });
                }
            }
            if (ruleType === 'promotion') {
                message.delete();
                if (!promotionRules[ruleNumber]) promotionRules[ruleNumber] = {
                    ruleText: "",
                    ruleNum: "",
                    rankIcon: "",
                    rankName: "",
                    messageID: "none"
                };
                let wRuleText = promotionRules[ruleNumber].ruleText;
                var newText = promotionRules[ruleNumber].ruleText = ruleText;
                var newNum = promotionRules[ruleNumber].ruleNum = ruleNumber;
                newText;
                newNum;

                if (promotionRules[ruleNumber].messageID === "none") {
                    const embed = new Discord.RichEmbed()
                        .setColor(`#76FF33`)
                        .addField(`${ruleNumber}`, `${ruleText}`);
                    message.channel.send("Adding a new rule.  This will not appear until !postrules has been ran.");
                    message.channel.send(embed);
                    console.log(`${message.author.username} just edited Promotion Rule #${ruleNumber}.`);
                    fs.writeFile("data/promotionRules.json", JSON.stringify(promotionRules), (err) => {
                    if (err) console.log(err);
                    });
                } else {
                const oldEmbed = new Discord.RichEmbed()
                    .setColor(`#76FF33`)
                    .addField(`${ruleNumber}`,`${wRuleText}`);                    
                announcements.send("A change has been made to the rules!");
                announcements.send("**OLD RULE**");
                announcements.send(oldEmbed).then(function() {
                    var newText = promotionRules[ruleNumber].ruleText = ruleText;
                    var newNum = promotionRules[ruleNumber].ruleNum = ruleNumber;
                    newText;
                    newNum;
                    const embed = new Discord.RichEmbed()
                    .setColor(`#76FF33`)
                    .addField(`${ruleNumber}`,`${ruleText}`);
                    let embedObjectID = Object.assign({}, embed.fields['0']);
                    embedObjectID.value = ruleText;
                    const newEmbed = new Discord.RichEmbed({
                        color: embed.color,
                        fields: [embedObjectID],
                    });
                    let promotionRulesID = promotionRules[ruleNumber].messageID;
                    channel.fetchMessage(promotionRulesID).then(message => message.edit(newEmbed));
                    announcements.send("**NEW RULE**");
                    announcements.send(newEmbed);
                });
                console.log(`${message.author.username} just edited Promotion Rule #${ruleNumber}.`);
                fs.writeFile("data/promotionRules.json", JSON.stringify(promotionRules), (err) => {
                    if (err) console.log(err);
                });
                }
            }
            if (ruleType === 'pvm') {
                message.delete();
                if (!pvmRules[ruleNumber]) pvmRules[ruleNumber] = {
                    ruleText: "",
                    ruleNum: "",
                    messageID: "none"
                };
                let wRuleText = pvmRules[ruleNumber].ruleText;
                var newText = pvmRules[ruleNumber].ruleText = ruleText;
                var newNum = pvmRules[ruleNumber].ruleNum = ruleNumber;
                newText;
                newNum;

                if (pvmRules[ruleNumber].messageID === "none") {
                    const embed = new Discord.RichEmbed()
                        .setColor(`#76FF33`)
                        .addField(`PVM Rule #${ruleNumber}`, `${ruleText}`);
                    message.channel.send("Adding a new rule.  This will not appear until !postrules has been ran.");
                    message.channel.send(embed);
                    console.log(`${message.author.username} just edited PVM Rule #${ruleNumber}.`);
                    fs.writeFile("data/pvmRules.json", JSON.stringify(pvmRules), (err) => {
                    if (err) console.log(err);
                    });
                } else {
                const oldEmbed = new Discord.RichEmbed()
                    .setColor(`#76FF33`)
                    .addField(`PVM Rule #${ruleNumber}`,`${wRuleText}`);                    
                announcements.send("A change has been made to the rules!");
                announcements.send("**OLD RULE**");
                announcements.send(oldEmbed).then(function() {
                    var newText = pvmRules[ruleNumber].ruleText = ruleText;
                    var newNum = pvmRules[ruleNumber].ruleNum = ruleNumber;
                    newText;
                    newNum;
                    const embed = new Discord.RichEmbed()
                    .setColor(`#76FF33`)
                    .addField(`PVM Rule #${ruleNumber}`,`${ruleText}`);
                    let embedObjectID = Object.assign({}, embed.fields['0']);
                    embedObjectID.value = ruleText;
                    const newEmbed = new Discord.RichEmbed({
                        color: embed.color,
                        fields: [embedObjectID],
                    });
                    let pvmRulesID = pvmRules[ruleNumber].messageID;
                    channel.fetchMessage(pvmRulesID).then(message => message.edit(newEmbed));
                    announcements.send("**NEW RULE**");
                    announcements.send(newEmbed);
                });
                console.log(`${message.author.username} just edited PVM Rule #${ruleNumber}.`);
                fs.writeFile("data/pvmRules.json", JSON.stringify(pvmRules), (err) => {
                    if (err) console.log(err);
                });
                }
            }
        }            

    };