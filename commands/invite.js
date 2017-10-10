const Embed = require('../req/embeds.js')

module.exports.run =  (client, message, args) => {
  message.channel.send(new Embed(`invite`))
}

module.exports.info = {
  name: "invite",
  info: "sends invite link"
}