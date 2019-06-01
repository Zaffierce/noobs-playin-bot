    const update = require("../update.json");
    const fs = require("fs");
    
    module.exports.run = async (bot, message, args) => {
        
    let modRole = message.member.hasPermission('KICK_MEMBERS');
    if(!modRole) {     
        message.delete();
    console.log(message.author.username + " attempted to run a command that they don't have access to!");
        } else {
            let type = args[0];
            if (type === "help") {
                message.channel.send("**Explanation of config:**\n!noobsconfig [type] [data]\n[type] can be `roles`, `norank`, `rules`, `announcements`\n[data] is the information requested\n\n**EXAMPLES:**\n*!noobsconfig roles [channelID]*\n*!noobsconfig roles 583788262771130372*\n*!noobsconfig norank [role name]*\n*!noobsconfig norank nobody*\n\n**NOTES:**\n- Roles [channelID] is the ID of the channel you want to post the roles command in.\n- Norank [role name] is plain text, don't @ the role.  If it's @nobody, just type nobody.\n")
            } else {
                let data = args[1];
                if (!args[0] || !args[1]) return message.channel.send("Error with the syntax.  Check !noobsconfig help for more information!");
    
    
                if (type === "roles") {
                    if (!update[type]) update[type] = {
                        channelID: ""
                    }
                    var newID = update[type].channelID = data;
                    newID;
                    message.channel.send(`Roles channel ID has been updated to ${newID}`);
                    console.log(`${message.author.username} just edited the config file.`);
                    fs.writeFile("update.json", JSON.stringify(update), (err) => {
                    if (err) console.log(err);
                    });
                }
                if (type === "norank") {
                    if (!update[type]) update[type] = {
                        roleName: ""
                    }
                    var newroleName = update[type].roleName = data;
                    newroleName;
                    message.channel.send(`No rank ID has been updated to ${newroleName}`);
                    fs.writeFile("update.json", JSON.stringify(update), (err) => {
                    if (err) console.log(err);
                    });
                }
                if (type === "rules") {
                    if (!update[type]) update[type] = {
                        channelID: ""
                    }
                    var newID = update[type].channelID = data;
                    newID;
                    message.channel.send(`Rules channel ID has been updated to ${newID}`);
                    console.log(`${message.author.username} just edited the config file.`);
                    fs.writeFile("update.json", JSON.stringify(update), (err) => {
                    if (err) console.log(err);
                    });
                }
                if (type === "announcements") {
                    if (!update[type]) update[type] = {
                        channelID: ""
                    }
                    var newID = update[type].channelID = data;
                    newID;
                    message.channel.send(`Rules channel ID has been updated to ${newID}`);
                    console.log(`${message.author.username} just edited the config file.`);
                    fs.writeFile("update.json", JSON.stringify(update), (err) => {
                    if (err) console.log(err);
                    });
                }
            }


        }

    };