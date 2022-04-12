const Discord = require('discord.js');
const ValorantAPI = require('unofficial-valorant-api');
const request = require('request');

module.exports.run = async (client, msg, args) => {
    const parsedArgs = args
    parsedArgs.shift()
    const userName = parsedArgs.join(' ').split('#')[0]
    const userTag = parsedArgs.join(' ').split('#')[1]

    async function fetchMatches(region, name, tag) {
        const matches = await ValorantAPI.getMatches(region, name, tag);
        const account = await ValorantAPI.getAccount(name, tag)

        let matchAccount1
        let matchAccount2
        let matchAccount3

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
        } catch (err) {
            console.log(err)
        }

        if (matches.status == 200) {
            const embed = new Discord.MessageEmbed()
                .setColor(0x3498DB)
                .setTitle(name + "'s Match History")
                .setDescription("Previous Matches")
                .addField(matches.data[0].metadata.map + " " + matches.data[0].metadata.game_start_patched, "``` K/D/A " + matchAccount1.stats.kills + "/" + matchAccount1.stats.deaths + "/" + matchAccount1.stats.assists + "```") //matches.data[0])
                .addField(matches.data[1].metadata.map + " " + matches.data[1].metadata.game_start_patched, "``` K/D/A " + matchAccount2.stats.kills + "/" + matchAccount2.stats.deaths + "/" + matchAccount2.stats.assists + "```") //matches.data[1])
                .addField(matches.data[2].metadata.map + " " + matches.data[2].metadata.game_start_patched, "``` K/D/A " + matchAccount3.stats.kills + "/" + matchAccount3.stats.deaths + "/" + matchAccount3.stats.assists + "```") //matches.data[2])
                .setThumbnail(account.data.card.small)
                    
            msg.reply({ embeds: [embed] })
                
        } else {
            msg.reply(`There was an error finding that player.`);
        }
    }
    fetchMatches("na", userName, userTag);
}

module.exports.help = {
    name: "matches"
}