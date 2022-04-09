require('dotenv').config();
const Discord = require('discord.js');
const ValorantAPI = require("unofficial-valorant-api")
const request = require('request')

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
        let url = "https://valorant-api.com/v1/competitivetiers";
        let options = {json: true};
        const parsedArgs = args
        parsedArgs.shift()
        const userName = parsedArgs.join(' ').split('#')[0]
        const userTag = parsedArgs.join(' ').split('#')[1]

            async function fetchMMR(version, region, name, tag) {
                    const mmr = await ValorantAPI.getMMR(version, region, name, tag);
                    console.log(mmr.data.currenttierpatched)
                    if (mmr.status == 200) {
                        request(url, options, (error, res, body) => {
                            if (error) {
                                return  console.log(error)
                            };
                        
                            if (!error && res.statusCode == 200) {
                                const embed = new Discord.MessageEmbed()
                                    .setColor(0x3498DB)
                                    .setTitle(name, "'s Rank")
                                    .setDescription(mmr.data.currenttierpatched)
                                    .setImage(body.data[3].tiers[mmr.data.currenttier].largeIcon)

                                msg.reply({ embeds: [embed] })
                            };
                        });
                        
                    msg.reply(mmr.data.currenttierpatched); // Replies to discord user with the accounts competitive rank.
                    } else {
                        msg.reply(`There was an error finding that player.`);
                    }
            }
                fetchMMR("v1", "na", userName, userTag) 
    }
});

client.login(process.env.CLIENT_TOKEN);