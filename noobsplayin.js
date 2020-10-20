const Discord = require("discord.js");
const bot = new Discord.Client()
const config = require("./config.json");
const fs = require("fs");
const roles = require("./data/roles.json");
const { builtinModules } = require("module");

require('dotenv').config();
const TOKEN = process.env.TOKEN;

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

bot.on("raw", async (event) => {

  if (!events.hasOwnProperty(event.t)) return;

  const { d : data } = event;
  const user = bot.users.cache.get(data.user_id);
  const channel = bot.channels.cache.get(data.channel_id) || await user.createDM();
  const message = await channel.messages.fetch(data.message_id);
  const member = message.guild.members.cache.get(user.id);
  const emojiKey = data.emoji.id ? `${data.emoji.id}` : data.emoji.name;
  let reaction = message.reactions.cache.get(emojiKey);
  
	if (!reaction) {
    const emoji = new Discord.Emoji(bot.guilds.cache.get(data.guild_id), data.emoji);
    try {
      reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
    } catch(e) {
      console.log(e);
    }
  }
  if (member.id !== bot.user.id) {
    if (message.channel.id == config.roles_channel_ID) {
      try {
        let role = message.guild.roles.cache.find(r => r.name === roles[reaction.emoji.name].roleName);
        if (event.t === "MESSAGE_REACTION_ADD") return member.roles.add(role);
        if (event.t === "MESSAGE_REACTION_REMOVE") return member.roles.remove(role);
      } catch {
        let roleCatch = message.guild.roles.cache.find(r => r.name === reaction.emoji.name);
        if (event.t === "MESSAGE_REACTION_ADD") return member.roles.add(roleCatch);
        if (event.t === "MESSAGE_REACTION_REMOVE") return member.roles.remove(roleCatch);
      }
    }
    if (message.channel.id == config.rules_channel_ID) {
      let noobRank = message.guild.roles.cache.find(r => r.id  === config.member_rank);
      let noRank = message.guild.roles.cache.find(r => r.id === config.guest_rank)
      if (event.t === "MESSAGE_REACTION_ADD" && emojiKey == '✅') {
        member.roles.add(noobRank);
        member.roles.remove(noRank)
        setTimeout(function() {
          bot.channels.cache.get(config.nickname_channel_ID).send(`<@${member.id}>, please send your RSN to this channel to update your Discord nickname.`).then(d_msg => d_msg.delete({timeout: 60000}));
        }, 2000);
      }
      if (event.t === "MESSAGE_REACTION_REMOVE") {
        member.roles.remove(noobRank);
        member.roles.add(noRank);
      }
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
  if (message.channel.id == config.nickname_channel_ID && message.author.id != bot.user.id) {
    const user = message.guild.members.cache.get(message.author.id);
    const previousName = user.nickname;
    const embed = new Discord.MessageEmbed()
    embed.setColor('#76FF33')
    embed.setTitle('Nickname Update:')
    embed.setDescription(`<@${message.author.id}> has updated their nickname`)
    embed.addFields(
      {name: "OLD", value: previousName ? previousName : "-", inline: true},
      {name: "NEW", value: message.content, inline: true},
    )
    bot.channels.cache.get(config.nickname_history_channel_ID).send(embed);
    message.guild.members.cache.get(message.author.id).setNickname(message.content);
    message.channel.send(`You've successfully set your RSN to: <@${message.author.id}>`).then(d_msg => d_msg.delete({timeout: 60000}));
  }  
});

bot.on('guildMemberAdd', (guildMember) => {
  if (guildMember.guild.id === bot.guilds.cache.get(config.guild_ID).id) {
    let role = guildMember.guild.roles.cache.find(r => r.id === config.guest_rank);
    guildMember.roles.add(role);
    let greeting = config.greeting;
    let modified_greeting = greeting.replace("${user}", `<@${guildMember.id}>`).replace("${server}", `**${guildMember.guild.name}**`)
    setTimeout(() => {
      bot.channels.cache.get(config.welcome_channel_ID).send(modified_greeting);
    }, 2000);
  }
});

bot.on('guildMemberRemove', (guildMember) => {
  if (guildMember.guild.id === bot.guilds.cache.get(config.guild_ID).id) {
    const embed = new Discord.MessageEmbed()
    embed.setColor('RED')
    embed.setTitle('Discord Update')
    embed.setDescription(`<@${guildMember.user.id}> has left this Discord.`)
    embed.addFields(
      {name: "Discord ID:", value: `${guildMember.user.username}#${guildMember.user.discriminator}`, inline: true},
      {name: "Nickname:", value: guildMember.nickname ? guildMember.nickname : "-", inline: true}
    )
    bot.channels.cache.get(config.leave_channel_ID).send(embed);    
  }
});

bot.on('error', console.error);

bot.login(TOKEN);