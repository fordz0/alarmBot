const Discord = require("discord.js");
const ValorantAPI = require("unofficial-valorant-api");
const request = require('request');

module.exports.run = async (client, msg, args) => {
    const parsedArgs = args
    parsedArgs.shift()
    const userName = parsedArgs.join(' ').split('#')[0]
    const userTag = parsedArgs.join(' ').split('#')[1]

    async function fetchAccount(region, name, tag) {
        const matches = await ValorantAPI.getMatches(region, name, tag, "10");
        const account = await ValorantAPI.getAccount(name, tag);

        let matchAccount1
        let matchAccount2
        let matchAccount3
        let matchAccount4
        let matchAccount5
        let matchAccount6
        let matchAccount7
        let matchAccount8
        let matchAccount9
        let matchAccount10

        let totalKills
        let totalDeaths
        let kd

        try {
            matches.data[0].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount1 = element
                }
            })

            matches.data[1].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount2 = element
                }
            })

            matches.data[2].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount3 = element
                }
            })

            matches.data[3].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccoun4 = element
                }
            })

            matches.data[4].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount5 = element
                }
            })

            matches.data[5].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount6 = element
                }
            })

            matches.data[6].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount7 = element
                }
            })

            matches.data[7].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount8 = element
                }
            })

            matches.data[8].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount9 = element
                }
            })

            matches.data[9].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount10 = element
                }
            })

            totalKills = matchAccount1.stats.kills + matchAccount2.stats.kills + matchAccount3.stats.kills + matchAccount4.stats.kills + matchAccount5.stats.kills + matchAccount6.stats.kills + matchAccount7.stats.kills + matchAccount8.stats.kills + matchAccount9.stats.kills + matchAccount10.stats.kills;
            totalDeaths = matchAccount1.stats.deaths + matchAccount2.stats.deaths + matchAccount3.stats.deaths + matchAccount4.stats.deaths + matchAccount5.stats.deaths + matchAccount6.stats.deaths + matchAccount7.stats.deaths + matchAccount8.stats.deaths + matchAccount9.stats.deaths + matchAccount10.stats.deaths;

            kd = (totalKills/totalDeaths).toFixed(2);
            console.log(kd);
        } catch (err) {
            console.log(err)
        }
    }
    fetchAccount("na", userName, userTag);
}

module.exports.help = {
    name: "profile"
}