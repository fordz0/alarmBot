const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    const parsedArgs = args;
    parsedArgs.shift();
    let command;
    let description;
    let howToUse;
    let example;

    if (args.length == 0) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Commands:")
            .setDescription("`help`, `link`, `matches`, `profile`, `rank`, `updates`, `skins`")
            .addFields(
                { name: 'How To Use', value: '`*help {command}`'},
                { name: 'Example', value: '`*help matches`'}
                )

        msg.reply({ embeds: [embed] })

    } else if (args.length == 1) {
        switch (String(parsedArgs).toLowerCase()) {
            case "help":
                command = "Help";
                howToUse = "`*help` or `*help {command}`";
                example = "`*help matches`";
                description = "Shows information about commands.";
                break;
            case "link":
                command = "Link";
                howToUse = "`*link {riotID}`";
                example = "`*link benjf#1708`";
                description = "Links your unique valorant ID to discord.";
                break;
            case "matches":
                command = "Matches";
                howToUse = "`*matches` or `*matches {riotID}`";
                example = "`*matches benjf#1708`";
                description = "Shows match history for you or another person.";
                break;
            case "profile":
                command = "Profile";
                howToUse = "`*profile` or `*profile {riotID}`";
                example = "`*profile benjf#1708`";
                description = "Shows profile for you or another person.";
                break;
            case "rank":
                command = "Rank";
                howToUse = "`*rank` or `*rank {riotID}`";
                example = "`*rank benjf#1708`";
                description = "Shows competitive rank for you or another person.";
                break;
            case "updates":
                command = "Updates";
                howToUse = "`*updates`"
                example = "just do `*updates` lol"
                description = "Adds 'AlarmBot Updates' role to use.";
                break;
            case "skins":
                command = "Skins";
                howToUse = "`*skins {valid skin type}`";
                example = "`*skins glitchpop`";
                description = "Shows all weapons that can have the specified skin.";
                break;
            default:
                msg.reply("Not an existing command.")
        }
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(command)
            .setDescription(description)
            .addFields(
                { name: 'How To Use', value: howToUse},
                { name: 'Example', value: example}
            )
        msg.reply({ embeds: [embed] })
    }
}

module.exports.help = {
    name: "help"
}