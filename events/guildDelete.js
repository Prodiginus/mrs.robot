const chalk = require('chalk')

module.exports = guild => {
    console.log(chalk.magenta(`Left ${guild.name} at ${new Date()}`))
}