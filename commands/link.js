const Discord = require("discord.js");
const mongo = require('../mongo');
const linkSchema = require("../schemas/link-schema");
const ValorantAPI = require('unofficial-valorant-api')

module.exports.run = async (client, msg, args) => {
    const parsedArgs = args
    parsedArgs.shift()
    const userName = parsedArgs.join(' ').split('#')[0]
    const userTag = parsedArgs.join(' ').split('#')[1]
    const authorID = String(msg.author.id)
    const account = await ValorantAPI.getAccount(userName, userTag)
    const accountPUUID = account.data.puuid

    if (account.status == 200) {
        await mongo().then(async (mongoose) => {
            try{
                await linkSchema.findOneAndUpdate({
                    _id: authorID
                }, {
                    puuid: accountPUUID
                }, {
                    upsert: true
                }
                )
                .exec()
                msg.reply('RiotID linked to DiscordID!')
            } finally {
                mongoose.connection.close()
            }
        })
    } else {
        msg.reply("Account doesn't exist.")
    }
}

module.exports.help = {
    name: "link"
}