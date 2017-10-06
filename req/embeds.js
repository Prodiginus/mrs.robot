const Discord = require('discord.js')
const embeds = require('./embeds.json')
module.exports = class Embed {
  constructor(type) {
    this.type = type
    switch(this.type) {
      case "help":
        return embeds.help
      break
      case "welcome":
        return embeds.welcome
      break
    }
  }
}