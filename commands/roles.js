const Discord = require("discord.js");
const roles = require("../data/roles.json");

module.exports.run = async (bot, message, args) => {
    
    let rolesEmbed = new Discord.RichEmbed()
    .setColor('#33EFFF')
    .setDescription("Current list of roles:");
for (i in roles) {
    let myArray = roles[i]
    let title = myArray.roleName;
    let emoji = myArray.roleEmoji;
    rolesEmbed.addField(title, emoji, true)
}
    message.channel.send(rolesEmbed)

};