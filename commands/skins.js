const Discord = require("discord.js");
const request = require('request');

module.exports.run = async (client, msg, args) => {
    const url1 = "https://valorant-api.com/v1/themes";
    const url2 = "https://valorant-api.com/v1/weapons/skins";
    const options = {json: true};
    const parsedArgs = args;
    parsedArgs.shift();
    const skin = parsedArgs.join(' ');
    let skinTheme = [];
    let weaponSkins = [];
    let weapons = [];
    let count = 0;
    
    function fetchSkins(url1, url2, options, skin) {
        request(url1, options, (error, res, body) => {
            if(error) {
                return console.log(error);
            };
            if (res.statusCode == 200) {
                body.data.forEach(element => {
                    if (element.displayName.toLowerCase() == skin.toLowerCase()) {
                        skinTheme.push(element)
                    }
                })
            } else {
                msg.reply("API IS DOWN.");
            }

        })
        request(url2, options, (error, res, body) => {
            if(error) {
                return console.log(error);
            };
            if (res.statusCode == 200) {
                skinTheme.forEach(element2 => {
                    body.data.forEach(element1 => {
                        if (element1.themeUuid == skinTheme[count].uuid) {
                            weaponSkins.push(element1)
                        }
                    })
                    count += 1
                })
                weaponSkins.forEach(element => {
                    weapons.push('`' + element.displayName + '`');
                })
                if (!(skinTheme.length == 0)) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(0x3498DB)
                        .setTitle(skinTheme[0].displayName)
                        .addField("Available Skins", weapons.join(', '))

                    msg.reply({ embeds: [embed] })
                } else {
                    msg.reply("There was an error finding this skin.")
                }
            } else {
                msg.reply("API IS DOWN.");
            }
        })
    }
    fetchSkins(url1, url2, options, skin);
}

module.exports.help = {
    name: "skins"
}