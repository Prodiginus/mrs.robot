const chalk = require('chalk')
const config = require('../req/config.json')

module.exports = message => {
    const client = message.client
    const prefix = config.prefix
    const args = message.content.split(' ')
    const command = args.shift().slice(prefix.length)
    if ((message.author == client.user) || (!message.content.startsWith(config.prefix)) || (message.author.bot) || (message.channel.type == 'dm') || (message.content.startsWith(config.prefix + '`'))) return

    try {
        let cmdFile = require(`../commands/${command}`)
        cmdFile.run(client, message, args)
        console.log(chalk.cyan(`The command, \`${command}, was successfully executed in ${message.guild} by ${message.author.username}`))
    } catch (error) {
        console.log(chalk.red(`Command ${command} failed\n${error}`))
    }
}