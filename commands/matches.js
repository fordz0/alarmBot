const Discord = require('discord.js');
const ValorantAPI = require('unofficial-valorant-api');
const request = require('request');

module.exports.run = async (client, msg, args) => {
    let url = "https://valorant-api.com/v1/competitivetiers";
    let options = {json: true};
    const parsedArgs = args
    parsedArgs.shift()
    const userName = parsedArgs.join(' ').split('#')[0]
    const userTag = parsedArgs.join(' ').split('#')[1]

    async function fetchMatches(name, tag) {
        const matches = await ValorantAPI.getMatches("v3", "na", name, tag);
        console.log(matches);
        if (matches.status == 200) {
            request(url, options, (error, res, body) => {
                if (error) {
                    return console.log(error)
                };

                if (!error && res.statusCode == 200) {
                    console.log(matches);
                }
            })
        } else {
            msg.reply(`There was an error finding that player.`);
        }
    }
    fetchMatches(userName, userTag);
}

module.exports.help = {
    name: "matches"
}