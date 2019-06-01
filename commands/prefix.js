const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    let modRole = message.member.hasPermission('KICK_MEMBERS');    
    if(!modRole) {     
        message.delete();
        console.log(message.author.username + " attempted to run a command that they don't have access to!");
    } else {
        let prefix = args[0];
        if (!prefix) { return message.channel.send("Please include a prefix!")
    }
        message.channel.send("Command prefix has been set to " +prefix);
        config.prefix = prefix;
        fs.writeFile("config.json", JSON.stringify(config), (err) => {
            if (err) console.log(err);
            });

    }

};