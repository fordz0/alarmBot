const Discord = require("discord.js");
const mongo = require('../mongo');
const linkSchema = require("../schemas/link-schema");

module.exports.run = async (client, msg, args) => {
    const parsedArgs = args
    parsedArgs.shift()
    const userName = parsedArgs.join(' ').split('#')[0]
    const userTag = parsedArgs.join(' ').split('#')[1]
    const authorID = String(msg.author.id)
    const valorantID = String(userName) + "#" + String(userTag);

    await mongo().then(async (mongoose) => {
        try{
            await linkSchema.findOneAndUpdate({
                _id: authorID
            }, {
                riotID: valorantID
            },
            {
                upsert: true
            }
            )
            .exec()
            msg.reply('RiotID linked to DiscordID!')
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.help = {
    name: "link"
}