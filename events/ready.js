const chalk = require('chalk')
const snekfetch = require('snekfetch')
const config = require('../req/config.json')
const discordBotsToken = process.env.DISCORD_BOTS_TOKEN

module.exports = client => {
    console.log(chalk.green(`Mrs. Robot is up and online at:\n${new Date()}`))
    console.log(chalk.cyan(`Here is my invite link:\n${config.links.invLink}`))
    console.log(chalk.magenta(`I am currently in ${client.guilds.size} guilds`))
    client.user.setPresence({
        status: "online",
        game: {
            name: "MonsterCat",
            streaming: true,
            type: 1,
            url: "https://www.twitch.tv/monstercat"
        }
    })
    snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
        .set('Authorization', `${discordBotsToken}`)
        .send({server_count: client.guilds.size})
        .then(console.log(chalk.green(`Updated server count for https://discordbots.org`)))
        .catch(e => console.log(chalk.red(`Something went wrong: ${e}`)))
}