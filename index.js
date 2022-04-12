require('dotenv').config();
const Discord = require('discord.js');
// const ValorantAPI = require("unofficial-valorant-api");
// const request = require('request');
const fs = require('fs');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if(jsFile.length <= 0){
        console.log("Couldn't find commands.")
    }

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`)
    client.commands.set(props.help.name, props)
    })

})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(() => {
        let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
        client.user.setActivity(`${membersCount} gamers`, {type: "PLAYING"});
    }, 1000 * 60);
});

const prefix = '*';

client.on('messageCreate', msg => {
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0];

    let commandFile = client.commands.get(cmd.slice(prefix.length).toLowerCase());
    if (commandFile) commandFile.run(client, msg, args);

});

client.login(process.env.CLIENT_TOKEN);