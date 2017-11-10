const chalk = require('chalk')
const regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

module.exports = e => {
    console.log(chalk.blue(e.replace(regToken, `that was redacted`)))    
}