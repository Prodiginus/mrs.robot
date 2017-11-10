const reqEvent = (event) => require(`../events/${event}`)

module.exports = client => {
    client
        //connection events
        .on('ready', () => reqEvent('ready')(client))
        .on('reconnecting', () => reqEvent('reconnecting')(client))
        .on('disconnect', () => reqEvent('disconnect')(client))
        //console logging
        .on('debug', reqEvent('debug'))
        .on('warn', reqEvent('warn'))
        .on('error', reqEvent('error'))
        //client events
        .on('message', reqEvent('message'))
        //guild events
        .on('guildCreate', reqEvent('guildCreate'))
        .on('guildMemberAdd', reqEvent('guildMemberAdd'))
        .on('guildDelete', reqEvent('guildDelete'))
        .on('guildMemberRemove', reqEvent('guildMemberRemove'))

}