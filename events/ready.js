const chalk = require('chalk')
const snekfetch = require('snekfetch')
const config = require('../req/config.json')
const discordBotsToken = process.env.DISCORD_BOTS_TOKEN

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
    
    snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
        .set('Authorization', `${discordBotsToken}`)
        .send({server_count: client.guilds.size})
        .then(console.log(chalk.green(`Updated server count for https://discordbots.org`)))
        .catch(e => console.log(chalk.red(`Something went wrong: ${e}`)))
}
