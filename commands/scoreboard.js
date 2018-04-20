const config = require('../req/config.json')
// require RichEmbed from the discord.js namespace
const { RichEmbed } = require('discord.js')

module.exports.run = (client, message, args) => {
    const allGuilds = client.guilds.array()
    let botCount = []

    for (const i in allGuilds) {
        botCount.push(allGuilds[i])
    }
    botCount.sort(
        (a,b) => {
            let aBots = a.members.array().filter(r => r.user.bot)
            let bBots = b.members.array().filter(r => r.user.bot)
            return aBots.length - bBots.length
        })
    botCount.reverse()
    botCount.splice(10,botCount.length - 10)

    // set up the embed
    let botServersEmbed = new RichEmbed()
        .setAuthor("Mrs. Robot", config.links.avatarURL)
        .setTitle(`Top Bot Server`)
        .setDescription(`A list of the top 10 servers that I watch`)
        .addField(`1. ${botCount[0].name}`, `Total bots: ${botCount[0].members.array().filter(r => r.user.bot).length}`)
        .addField(`2. ${botCount[1].name}`, `Total bots: ${botCount[1].members.array().filter(r => r.user.bot).length}`)
        .addField(`3. ${botCount[2].name}`, `Total bots: ${botCount[2].members.array().filter(r => r.user.bot).length}`)
        .addField(`4. ${botCount[3].name}`, `Total bots: ${botCount[3].members.array().filter(r => r.user.bot).length}`)
        .addField(`5. ${botCount[4].name}`, `Total bots: ${botCount[4].members.array().filter(r => r.user.bot).length}`)
        .addField(`6. ${botCount[5].name}`, `Total bots: ${botCount[5].members.array().filter(r => r.user.bot).length}`)
        .addField(`7. ${botCount[6].name}`, `Total bots: ${botCount[6].members.array().filter(r => r.user.bot).length}`)
        .addField(`8. ${botCount[7].name}`, `Total bots: ${botCount[7].members.array().filter(r => r.user.bot).length}`)
        .addField(`9. ${botCount[8].name}`, `Total bots: ${botCount[8].members.array().filter(r => r.user.bot).length}`)
        .addField(`10. ${botCount[9].name}`, `Total bots: ${botCount[9].members.array().filter(r => r.user.bot).length}`)
        .setFooter(`Kept up to date every time this command is run`)
        .setColor(config.colors.purple)

    // send it off
    message.channel.send(botServersEmbed)
}
  module.exports.info = {
    name: "scoreboard",
    info: "Will display the top 10 servers with the most bots"
}
