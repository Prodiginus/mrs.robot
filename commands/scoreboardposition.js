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
    message.channel.send(`This guild is positioned at #${botCount.findIndex(c => c.id == message.guild.id) + 1} out of ${botCount.length} on the scoreboard, with a total of ${message.guild.members.array().filter(r => r.user.bot).length} bots`)
}
  module.exports.info = {
    name: "scoreboard",
    info: "Will display the top 10 servers with the most bots"
}