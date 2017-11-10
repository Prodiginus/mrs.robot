const chalk = require('chalk')

module.exports = member => {        
    let guild = member.guild
    let client = guild.client
    let botRole = guild.roles.find('name', 'Bots')
    let selfRole = guild.member(client.user).highestRole
    let defChannel = guild.channels.find(c => c.name.includes('bot')) || guild.channels.find(c => c.name.includes('log')) || guild.channels.find(c => ['safe-playgroud', 'general', 'social'].includes(c.name))
    if ((member.user.bot) && (botRole)) {
        if ((botRole) && (selfRole.position > botRole.position)) {
            member.addRole(botRole.id)
            defChannel.send(`New bot ${member.user.username} has been added to the server and has also been added to the bot role`)
        } else
        if (selfRole.position <= botRole.position) {
            defChannel.send(`${member.user.username} has just joined but I have to have a higher role than the \`Bots\` role to add them to the \`Bots\` role`)
        }
    } else
    if (!botRole) {
        defChannel.send(`${member.user.username} has just joined but you don\'t have a role with the name of \`Bots\` that I can add them to`)
    }
}