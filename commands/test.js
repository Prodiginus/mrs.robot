const Embed = require('../classes/embeds.js')

module.exports.run =  (client, message, args) => {
  message.channel.send(new Embed(`welcome`))
}

module.exports.info = {
  name: "test",
  info: "for testing commands"
}