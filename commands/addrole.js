    //Requires member to have KICK_MEMBERS permission or else it won't do anything.
    const Discord = require("discord.js");
    const fs = require("fs");
    const roles = require('../data/roles.json');
    
    module.exports.run = async (bot, message, args) => {
        
    let modRole = message.member.hasPermission('KICK_MEMBERS');
    if(!modRole) {     
        //message.delete();
    console.log(message.author.username + " attempted to run a command that they don't have access to!");
        } else {
            var roleName = args[0];
            if (roleName === "help") {
                return message.channel.send("**Explanation of addrole**\n!addrole [role] [emoji] [desc]\n[role] is exactly the same as what's listed in Roles\n[emoji] is just the Discord emoji\n[desc] is a description of the role\n\n**EXAMPLES:**\n*!addrole us :flag_us: This role is for North American players*\n*!addrole tob_learner :three: This role is for ToB learners*\n\n**NOTES:**\n- Commands are deleted when ran, but cannot be ran by those who do not have `KICK_MEMBERS` perimssions\n- [role] must be one word, it cannot have spaces but _ are okay.")
            }
            var roleEmoji = args[1];//.toString();
            var roleDesc = message.content.split(' ').splice(3).join(' ');
            if (!args[0] || !roleDesc) {
                return message.channel.send("Please check the syntax and try again.\nExample: `!newrole cox :cox: This role is for those advanced at Chambers of Xeric.`");
            }
            if (!roles[roleName]) roles[roleName] = {
                roleEmoji: "",
                roleDesc: "",
                roleReact: ""
            };
            var newroleName = roles[roleName].roleName = roleName;
            var newroleEmoji = roles[roleName].roleEmoji = roleEmoji;
            var newroleDesc = roles[roleName].roleDesc = roleDesc;
            var newroleReact = roles[roleName].roleReact = roleEmoji;
            newroleName;
            newroleEmoji;
            newroleDesc;
            newroleReact;
            message.delete();
            const embed = new Discord.RichEmbed()
                .setColor(`#76FF33`)
                .setDescription(`New role has been added.\nRole Name: ${roleName}\nRole Emoji: ${roleEmoji}\nRole Description: ${roleDesc}`)
            message.channel.send(embed);
            console.log(`${message.author.username} just added a Role!  Role name ${roleName}.`);
            fs.writeFile("data/roles.json", JSON.stringify(roles), (err) => {
            if (err) console.log(err);
            });
        }

    };