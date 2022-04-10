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

    async function fetchMMR(version, region, name, tag) {
        if (name == "rosebud" && tag == "fart") {
            const embed = new Discord.MessageEmbed()
                .setColor(0x3498DB)
                .setTitle("rosebud's Rank")
                .setDescription("FART")
                .setImage("https://thumbs.gfycat.com/UnhealthyHighlevelAmericanratsnake-max-1mb.gif")

            msg.reply({ embeds: [embed] })
        } else {
            const mmr = await ValorantAPI.getMMR(version, region, name, tag);
            console.log(mmr)
            if (mmr.status == 200) {
                request(url, options, (error, res, body) => {
                    if (error) {
                        return  console.log(error)
                    };
                        
                    if (!error && res.statusCode == 200) {
                        const embed = new Discord.MessageEmbed()
                            .setColor(0x3498DB)
                            .setTitle(name + "'s Rank")
                            .setDescription(mmr.data.currenttierpatched)
                            .setImage(body.data[3].tiers[mmr.data.currenttier].largeIcon)

                        msg.reply({ embeds: [embed] })
                    };
                });
                        
            } else {
                msg.reply(`There was an error finding that player.`);
            }
        }
    }
    fetchMMR("v1", "na", userName, userTag) 
}

module.exports.help = {
    name: "rank"
}