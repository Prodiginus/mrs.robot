const config = require('../req/config.json')
// require RichEmbed from the discord.js namespace
const { RichEmbed } = require('discord.js')

module.exports.run = (client, message, args) => {
    let allMembers = message.guild.members.array()
    let allBots = allMembers.filter(b => b.user.bot)
  	let onlineBots = allBots.filter(ob => ob.presence.status != "offline")

    // set up the embed
    let botEmbed = new RichEmbed()
      .setAuthor("Mrs. Robot", config.links.avatarURL)
      .setColor(config.colors.purple)
      .addField(`Server bot statistics`, `This server currently contains ${allBots.length} bots including myself; ${onlineBots.length} are online and ${allBots.length - onlineBots.length} are offline.
        \nThis means that about ${Math.round((allBots.length / allMembers.array().length) * 100)}% of this server's members are bots`)

    // send it off
    message.channel.send(botEmbed);
}
