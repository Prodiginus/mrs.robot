const chalk = require('chalk')

module.exports = closeEvent => {
    console.log(chalk.red(`Mrs.Robot was disconnected at:\n${new Date()}`))
    console.log(chalk.red(`Event:\n${closeEvent}`))
}