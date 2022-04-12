const Discord = require("discord.js");
const ValorantAPI = require("unofficial-valorant-api");
const request = require('request');

module.exports.run = async (client, msg, args) => {
    let url = "https://valorant-api.com/v1/competitivetiers";
    let options = {json: true};
    const parsedArgs = args
    parsedArgs.shift()
    const userName = parsedArgs.join(' ').split('#')[0]
    const userTag = parsedArgs.join(' ').split('#')[1]

    async function fetchAccount(region, name, tag) {
        const matches = await ValorantAPI.getMatches(region, name, tag);
        const account = await ValorantAPI.getAccount(name, tag);
        const mmr = await ValorantAPI.getMMR("v1", region, name, tag)

        let matchAccount1
        let matchAccount2
        let matchAccount3
        let matchAccount4
        let matchAccount5

        let totalKills = 0;
        let totalDeaths = 0;
        let kd = 0.00;

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
                    matchAccount4 = element
                }
            })

            matches.data[4].players.all_players.forEach(element => {
                if (element.name.toLowerCase() == name.toLowerCase() && element.tag.toLowerCase() == tag.toLowerCase()) {
                    matchAccount5 = element
                }
            })

            totalKills = parseFloat(matchAccount1.stats.kills) + parseFloat(matchAccount2.stats.kills) + parseFloat(matchAccount3.stats.kills) + parseFloat(matchAccount4.stats.kills) + parseFloat(matchAccount5.stats.kills);
            totalDeaths = parseFloat(matchAccount1.stats.deaths) + parseFloat(matchAccount2.stats.deaths) + parseFloat(matchAccount3.stats.deaths) + parseFloat(matchAccount4.stats.deaths) + parseFloat(matchAccount5.stats.deaths);
            console.log(totalKills + " " + totalDeaths)
            kd = (totalKills/totalDeaths).toFixed(2);
            console.log(kd)
        } catch (err) {
            console.log(err)
        }

        if (matches.status == 200 && account.status == 200 && mmr.status == 200) {
            const embed = new Discord.MessageEmbed()
                .setColor(0x3498DB)
                .setTitle(name + "#" + tag + "'s Profile")
                .addFields(
                    { name: 'Level', value: String(account.data.account_level), inline: true },
                    { name: 'K/D Rate (Last 5 Matches)', value: String(kd), inline: true },
                    { name: 'Ranked', value: String(mmr.data.currenttierpatched), inline: true }
                )
                .setImage(account.data.card.wide)
                .setThumbnail(body.data[3].tiers[mmr.data.currenttier].smallIcon)
            msg.reply({ embeds: [embed] })
        }

    }
    fetchAccount("na", userName, userTag);
}

module.exports.help = {
    name: "profile"
}