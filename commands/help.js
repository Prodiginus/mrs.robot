const Embed = require('../req/embeds.js')

module.exports.run =  (client, message, args) => {
  message.channel.send(new Embed(`help`))
}

module.exports.info = {
  name: "help",
  info: "sends help message"
}