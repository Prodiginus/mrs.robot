const chalk = require('chalk')
const Embed = require('../classes/embeds.js')

module.exports = guild => {
    console.log(chalk.magenta(`Joined ${guild.name} at ${new Date()}`))
    let defChannel = guild.channels.find(c => c.name.includes('bot')) || guild.channels.find(c => c.name.includes('log')) || guild.channels.find(c => ['safe-playgroud', 'general', 'social'].includes(c.name)) || guild.channels.find(c => c.name.includes('-'))        
    defChannel.send(new Embed(`welcome`))
}