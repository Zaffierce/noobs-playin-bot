    /*
    Requires USER to have KICK_MEMBERS permission or else it won't do anything.
    Requires BOT to have message delete permissions, to keep it clean unless you manually delete the command after running.
    */
    const Discord = require("discord.js");
    const fs = require("fs");
    const roles = require('../data/roles.json');
    const update = require("../update.json");
    
    module.exports.run = async (bot, message, args) => {
    
    let channel = bot.channels.get(update.roles.channelID);
    let modRole = message.member.hasPermission('KICK_MEMBERS');
    if(!modRole) {     
        message.delete();
    console.log(message.author.username + " attempted to run a command that they don't have access to!");
        } else {
            message.delete();
            if (update.roles.channelID === "0") {return message.channel.send("Please run the config command first.")}
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
            const rolesHeaderEmbed = new Discord.RichEmbed()
                .setColor('#33EFFF')
                .setAuthor('Noobs Playin')
                .setDescription(`Welcome to Noobs Playin.  Please react to the Emoji's below to be assigned to the groups you want.  If you no longer wish to be a part of that group, all you have to do is remove your reaction.`)
                .setThumbnail('https://cdn.discordapp.com/attachments/583788262771130372/583811756271468594/osrs.jpg');
            channel.send(rolesHeaderEmbed);
            let rolesEmbed = new Discord.RichEmbed()
                .setColor('#33EFFF')
            for (i in roles) {
                let myArray = roles[i]
                let title = myArray.roleName;
                let emoji = myArray.roleEmoji;
                let desc = myArray.roleDesc;
                rolesEmbed.addField(emoji+" - "+title, desc)
            }
                channel.send(rolesEmbed).then(function(message) {
                    for (var i in roles) {
                        let myArray =  roles[i];
                        message.react(myArray.roleReact)
                    }
                });
            });
        }
    };