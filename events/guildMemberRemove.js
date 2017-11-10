const chalk = require('chalk')

module.exports = member => {
    let guild = member.guild
    let client = guild.client
    let defChannel = guild.channels.find(c => c.name.includes('bot')) || guild.channels.find(c => c.name.includes('log')) || guild.channels.find(c => ['safe-playgroud', 'general', 'social'].includes(c.name))
    if (member.user.bot) {
        defChannel.send(`The bot ${member.user.username} has just left this server`)
    }
}