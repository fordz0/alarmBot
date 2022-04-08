require('dotenv').config();
const Discord = require('discord.js');
const ValorantAPI = require("unofficial-valorant-api")


async function fetchMatches(region, name, tag, size, mode, map) {
    const matches = await ValorantAPI.getMatches(region, name, tag, size, mode, map)
    //Do something with the data, for an example send it as a Discord Embed into your Discord
}


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = '*';

client.on('messageCreate', msg => {
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    if (cmd === 'rank') {
        const parsedArgs = args
        parsedArgs.shift()
        const userName = parsedArgs.join(' ').split('#')[0]
        const userTag = parsedArgs.join(' ').split('#')[1]

            async function fetchMMR(version, region, name, tag) {
                    const mmr = await ValorantAPI.getMMR(version, region, name, tag);
                    console.log(mmr.data.currenttierpatched)
                    if (mmr.status == 200) {
                    msg.reply(mmr.data.currenttierpatched); // Replies to discord user with the accounts competitive rank.
                    } else {
                        msg.reply(`There was an error finding that player.`);
                    }
            }
                fetchMMR("v1", "na", userName, userTag) 
    }
});

client.login(process.env.CLIENT_TOKEN);