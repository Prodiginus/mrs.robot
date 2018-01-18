const config = require('../req/config.json')
module.exports.run =  (client, message, args) => {
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
    message.channel.send({
        embed: {
            title: "Top Bot Servers",
            description: "A list of the top 10 servers that I watch",
            color: config.colors.purple,
            author: {
                name: "Mrs. Robot",
                icon_url: config.links.avatarURL
            },
            fields: [
                {
                    name: `1. ${botCount[0].name}`,
                    value: `Total bots: ${botCount[0].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `2. ${botCount[1].name}`,
                    value: `Total bots: ${botCount[1].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `3. ${botCount[2].name}`,
                    value: `Total bots: ${botCount[2].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `4. ${botCount[3].name}`,
                    value: `Total bots: ${botCount[3].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `5. ${botCount[4].name}`,
                    value: `Total bots: ${botCount[4].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `6. ${botCount[5].name}`,
                    value: `Total bots: ${botCount[5].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `7. ${botCount[6].name}`,
                    value: `Total bots: ${botCount[6].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `8. ${botCount[7].name}`,
                    value: `Total bots: ${botCount[7].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `9. ${botCount[8].name}`,
                    value: `Total bots: ${botCount[8].members.array().filter(r => r.user.bot).length}`
                },
                {
                    name: `10. ${botCount[9].name}`,
                    value: `Total bots: ${botCount[9].members.array().filter(r => r.user.bot).length}`
                }
            ],
            footer: {
                icon_url: config.links.avatarURL,
                text: "Kept up to date every time this command is run"
            }
        }
    })
}
  module.exports.info = {
    name: "scoreboard",
    info: "Will display the top 10 servers with the most bots"
}