    //Requires member to have KICK_MEMBERS permission or else it won't do anything.
    const Discord = require("discord.js");
    const fs = require("fs");
    const roles = require('../data/roles.json');
    const config = require('../config.json');
    

    module.exports.run = async (bot, message, args) => {
        
    let modRole = message.member.hasPermission('KICK_MEMBERS');
    if(!modRole) {     
        message.delete();
    console.log(message.author.username + " attempted to run a command that they don't have access to!");
        } else {
            let role = args[0];
            let prefix = config.prefix;
                if (!args[0]) { return message.channel.send(`Please include a role.  Type ${prefix}roles to get a full list`)}
            if (!roles[role]) { message.channel.send("Role `"+role+"` not found")
        } else {
                message.delete();
                message.channel.send("Role `"+role+"` has been deleted.");
                delete roles[role]
                fs.writeFile("data/roles.json", JSON.stringify(roles), (err) => {
                    if (err) console.log(err);
                });
        }
    }
    };