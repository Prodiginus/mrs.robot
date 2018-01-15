const config = require('../req/config.json')

module.exports.run = (client, message, args) => {
    let guild = message.guild
    let allMembers = guild.members.array()
    let allBots = allMembers.filter(b => b.user.bot)
	let onlineBots = allBots.filter(ob => ob.presence.status != "offline")

    message.channel.send({
        "embed": {
        "color": `${config.colors.purple}`,
        "author": {
          "name": "Mrs. Robot",
          "icon_url": `${config.links.avatarURL}`
        },
        "fields": [
          {
            "name": "Server bot statistics",
            "value": `This server currently contains ${allBots.length} bots including myself; ${onlineBots.length} are online and ${allBots.length - onlineBots.length} are offline.\n\nThis means that about ${Math.round((allBots.length / allMembers.length) * 100)}% of this server's members are bots`
          }
        ]
      }
    })
}