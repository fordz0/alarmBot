require('dotenv').config();
const Discord = require('discord.js');
const mongo = require('./mongo')
const linkSchema = require('./schemas/link-schema')
const fs = require('fs');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const ValorantAPI = require('unofficial-valorant-api')
client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if(jsFile.length <= 0){
        console.log("Couldn't find commands.")
    }

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`)
    client.commands.set(props.help.name, props)
    })

})

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(() => {
        let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
        client.user.setActivity(`${membersCount} gamers`, {type: "PLAYING"});
    }, 1000 * 60);

    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo!')
        } finally {
            mongoose.connection.close()
        }
    })
});

const prefix = '*';

client.on('messageCreate', async(msg)  => {
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0];

    if(args.length == 1 && cmd != "*link" && cmd != "*help") {
        await mongo().then(async (mongoose) => {
            try{
                const result = await linkSchema.find({
                    _id: String(msg.author.id),
                })
                
                const mmr = await ValorantAPI.getMMRByPUUID("v1", "na", result[0].puuid)
                
                const riotID = String(mmr.data.name + "#" + mmr.data.tag)

                args.push(riotID)
            } finally {
                mongoose.connection.close()
            }
        })
    }
    
    
    let commandFile = client.commands.get(cmd.slice(prefix.length).toLowerCase());
    if (commandFile) commandFile.run(client, msg, args);

});

client.login(process.env.CLIENT_TOKEN);