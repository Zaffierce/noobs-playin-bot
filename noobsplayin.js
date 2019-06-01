const Discord = require("discord.js");
const bot = new Discord.Client()
const config = require("./config.json");
const fs = require("fs");
const update = require("./update.json");
const roles = require("./data/roles.json");

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    bot.commands.set(commandName, props);
  });
});


bot.on("ready", () => {
    console.log("I am ready!");
    bot.user.setActivity("");
  });


const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

bot.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = bot.users.get(data.user_id);
  const channel = bot.channels.get(data.channel_id) || await user.createDM();
  const message = await channel.fetchMessage(data.message_id);  
  const member = message.guild.members.get(user.id);
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	let reaction = message.reactions.get(emojiKey);

	if (!reaction) {
		const emoji = new Discord.Emoji(bot.guilds.get(data.guild_id), data.emoji);
		reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
  }
    if (member.id !== bot.user.id && message.channel.id == update.roles.channelID) {
      if (event.t === "MESSAGE_REACTION_ADD") {
        let role = message.guild.roles.find(role => role.name === roles[reaction.emoji.name].roleName);
        console.log(`MESSAGE_REACT_ADD by ${user.username}.  ${user.username} has been added to ${roles[reaction.emoji.name].roleName}`);
        member.addRole(role);
      }
      if (event.t === "MESSAGE_REACTION_REMOVE") {
        let role = message.guild.roles.find(role => role.name === roles[reaction.emoji.name].roleName);
        console.log(`MESSAGE_REACTION_REMOVE by ${user.username}.  ${user.username} has been removed from ${roles[reaction.emoji.name].roleName}.`)
        member.removeRole(role)
      }
    }
    if (member.id !== bot.user.id && message.channel.id == update.rules.channelID) {
      let noRank = update.norank.roleName;
      if (event.t === "MESSAGE_REACTION_ADD"){
        let role_noob = message.guild.roles.find(role => role.name === "Noob");
        let role_norank = message.guild.roles.find(role => role.name === noRank)
        console.log(`${user.username} has just accepted the rules and has been added to the Noob group.`);
        member.addRole(role_noob);
        member.removeRole(role_norank)
      }
      if (event.t === "MESSAGE_REACTION_REMOVE"){
        let role = message.guild.roles.find(role => role.name === "Noob");
        let role_norank = message.guild.roles.find(role => role.name === noRank)
        console.log(`${user.username} has just removed their reaction and has been removed from the Noob group`);
        member.removeRole(role);
        member.addRole(role_norank);
      }
    }
	bot.emit(events[event.t], reaction, user);
});

bot.on("message", message => {
  if (message.content.startsWith(config.prefix)) {
    if (message.channel.type === "dm") return;
    var cont = message.content.toLowerCase().slice(config.prefix.length).split(" ");
    var args = cont.slice(1);
    var cmd = bot.commands.get(cont[0]);
    if (cmd) cmd.run(bot, message, args); 
  }
});

bot.on('guildMemberAdd', (guildMember) => {
  let noRank = update.norank.roleName;
  guildMember.addRole(guildMember.guild.roles.find(role => role.name === noRank));
  console.log(`Someone has just joined the discord and has been assigned to the ${noRank} role until they accept the rules.`);
});

bot.on('error', console.error);

bot.login(config.token);