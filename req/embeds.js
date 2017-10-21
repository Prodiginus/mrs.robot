const config = require('./config.json')

module.exports = class Embed {
  constructor(type) {
    this.type = type
    switch(this.type) {
      case "help":
        return {
          "embed": {
            "title": "Help",
            "description": "You asked for help, here I am",
            "color": `${config.colors.purple}`,
            "author": {
              "name": "Mrs. Robot",
              "icon_url": `${config.links.avatarURL}`
            },
            "fields": [
              {
                "name": "Available Commmands",
                "value": "```md\nCommands\n===================================================\n<`help>       : < Resends this message >\n<`invite>     : < Sends invite link >\n<`bots>       : < Returns number of bots in the server >\n<`sortbots>   : < Sorts all the bots into a `Bots` role >\n<`cleanroles> : < Deletes all auto-generated bot roles >```"
              }
            ],
          }
        }
      break
      case "welcome":
        return {
          "embed": {
            "title": "This is the welcome message",
            "description": "This message is sent once every time I join a new server",
            "color": `${config.colors.purple}`,
            "author": {
              "name": "Mrs. Robot",
              "icon_url": `${config.links.avatarURL}`
            },
            "fields": [
              {
                "name": "Some info",
                "value": "I was created as a bot for bots. This means that I don't play music, I don't have fun/wacky commands, I just have utilities for bot servers and the like"
              },
              {
                "name": "Bot Broke, Why Broke",
                "value": "9/10 Chance this is just me updating it, but if you think it's actually really broken then join the suppport server and @me\nhttps://discord.gg/n5wygZy"
              },
              {
                "name": "Now tell me, what do you do?",
                "value": "Do ``help` and I will tell you"
              }
            ],
            "footer": {
              "icon_url": `${config.links.avatarURL}`,
              "text": "Created by Dingus#6977 | Join the support server if any issues occur"
            }
          }
        }
      break
      case "invite":
        return {
          "embed": {
            "color": `${config.colors.purple}`,
            "author": {
              "name": "Mrs. Robot",
              "icon_url": `${config.links.avatarURL}`
            },
            "fields": [
              {
                "name": "Here is my invite link",
                "value": `${config.links.invLink}`
              }
            ]
          }
        }
      break
    }
  }
}