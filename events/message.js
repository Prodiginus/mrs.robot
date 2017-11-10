const config = require('../req/config.json')

module.exports = message => {
    const client = message.client
    if ((message.author == client.user) || (!message.content.startsWith(config.prefix)) || (message.author.bot) || (message.channel.type == 'dm')) return    
    const prefix = config.prefix
    const args = message.content.split(' ')
    const command = args.shift().slice(prefix.length)

    try {
        let cmdFile = require(`../commands/${command}`)
        cmdFile.run(client, message, args)
    } catch (error) {
        console.log(`Command ${command} failed\n${error}`)
    }
}