const chalk = require('chalk')
const config = require('../req/config.json')

module.exports = client => {
    console.log(chalk.green(`Mrs. Robot is up and online at:\n${new Date()}`))
    console.log(chalk.cyan(`Here is my invite link:\n${config.links.invLink}`))
    console.log(chalk.magenta(`I am currently in ${client.guilds.size} guilds`))

    const allGuilds = client.guilds.array()
    let botCount = [];
    for (const i in allGuilds) {
        const allBots = allGuilds[i].members.array().filter(r => r.user.bot)
        botCount.push(allBots.length)
    }
    const sum = (num1, num2) => {
        return num1 + num2
    }
    const totalBots = botCount.reduce(sum)
    client.user.setActivity(`${totalBots} bots`, {type: 'WATCHING'})
}
