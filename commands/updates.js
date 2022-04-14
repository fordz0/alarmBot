const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    if(!(args.length > 1))  return;

    let role = msg.guild.roles.cache.find(role => role.name === 'AlarmBot Updates')
    msg.member.roles.add(role)

    msg.reply("Added AlarmBot Updates Role.")
}

module.exports.help = {
    name: "updates"
}