const chalk = require('chalk')

module.exports = client => {
    console.log(chalk.yellow(`Mrs. Robot was reconnecting at:\n${new Date()}`))
}