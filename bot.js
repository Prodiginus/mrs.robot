//required libraries---------------------------------------------------------------------
  const Discord = require('discord.js')
  const chalk = require('chalk')
  require('dotenv').config()
//required dependancy files--------------------------------------------------------------
  const config = require('./req/config.json')  
  const Embed = require('./req/embeds.js')
//constants------------------------------------------------------------------------------
  const client = new Discord.Client()
  const regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g
  const discordToken = process.env.DISCORD_TOKEN
client //connections---------------------------------------------------------------------
  .on('ready', () => {
    console.log(chalk.green(`Mrs.Robot is up and online at ${new Date()}`))
    console.log(chalk.green(`Here is my invite link: ${config.invLink}`))
    console.log(chalk.green(`I am in ${client.guilds.size} current guilds: ${client.guilds.map(m => m.name)}`))

    client.user.setPresence({
      status: "online",
      activity: {
        name: "myself",
        type: "STREAMING",
        url: "https://www.twitch.tv/monstercat"
      }
    })
  })
  .on('disconnect', () => {
    console.log(chalk.red.bold(`Mrs.Robot was disconnected at ${new Date()}`))
  })
  .on('reconnecting', () => {
    console.log(chalk.yellow.bold(`Mrs. Robot is reconnecting at ${new Date()}`))
  })
  .login(discordToken)
client //console logging-----------------------------------------------------------------
  .on('debug', e => {
    console.log(chalk.bold.blue(e.replace(regToken, `that was redacted`)))
  })
  .on('warn', e => {
    console.log(chalk.yellow(e.replace(regToken, `that was redacted`)))
  })
  .on('error', e => {
    console.log(chalk.red(e.replace(regToken, `that was redacted`)))
  });
client //automatic guild events----------------------------------------------------------
  .on('guildCreate', guild => {
    console.log(chalk.magenta(`Joined ${guild.name} at ${new Date()}`))
    let welcomeChannel = guild.channels.find('name', 'general') || guild.channels.find('name', 'social')
    welcomeChannel.send(new Embed(`welcome`))
  })
  .on('guildMemberAdd', member => {
    let guild = member.guild
    let botRole = guild.roles.find('name', 'Bots')
    let selfRole = guild.member(client.user).highestRole
    let defChannel = guild.channels.find(c => c.name.includes('bot')) || guild.channels.find(c => c.name.includes('log')) || guild.channels.find(c => ['safe-playgroud', 'general', 'social'].includes(c.name))
    if ((member.user.bot) && (botRole)) {
      if ((botRole) && (selfRole.position > botRole.position)) {
        member.addRole(botRole.id)
        defChannel.send(`New bot ${member.user.username} has been added to the server and has also been added to the bot role`)
      } else
        if (selfRole.position <= botRole.position) {
          defChannel.send(`${member.user.username} has just joined but I have to have a higher role than the \`Bots\` role to add them to the \`Bots\` role`)
        }
    } else
      if (!botRole) {
        defChannel.send(`${member.user.username} has just joined but you don\'t have a role with the name of \`Bots\` that I can add them to`)
      }
  })
  .on('guildDelete', guild => {
    console.log(chalk.magenta(`Left ${guild.name} at ${new Date()}`))
  })
  .on('guildMemberRemove', member => {
    let guild = member.guild
    let defChannel = guild.channels.find(c => c.name.includes('bot')) || guild.channels.find(c => c.name.includes('log')) || guild.channels.find(c => ['safe-playgroud', 'general', 'social'].includes(c.name))
    if (member.user.bot) {
      defChannel.send(`The bot ${member.user.username} has just left this server`)
    }
  })
client //text commands-------------------------------------------------------------------
  .on('message', message => {
    if ((message.author == client.user) || (!message.content.startsWith(config.prefix))) return
    let guild = message.guild
    let allMembers = guild.members.array()
    let allBots = allMembers.filter(b => b.user.bot)
    let botsNoRole = allBots.filter(t => !guild.member(t.user).roles.find('name', 'Bots'))
    let botRole = guild.roles.find('name', 'Bots')
    let selfRole = guild.member(client.user).highestRole
    let rolesByBots = guild.roles.filter(r => r.managed).filter(r => !['Mrs. Robot'].includes(r.name)).sort(function (m, i) { return m.position - i.position })
    let highBotRole = rolesByBots.last()

    if (message.content == config.prefix + 'invite') {
      message.channel.send(`Here\'s my invite link\n${config.links.invLink}`)
    }
    if (message.content == config.prefix + 'bots') {
      message.channel.send(`This server currently contains ${allBots.length} bots including myself`)
    }
    if (message.content == config.prefix + 'help') {
      message.channel.send(new Embed(`help`))
    }
    if (message.content == config.prefix + 'sortbots') {
      if ((botRole) && (selfRole.position > botRole.position)) {
        if (botsNoRole.length > 0) {
          botsNoRole.forEach(b => b.addRole(botRole.id))
          if (botsNoRole.length == 1) {
            message.channel.send(`Added ${botsNoRole.length} bot to the bot role`)
          } else
            if (botsNoRole.length > 1) {
              message.channel.send(`Added ${botsNoRole.length} bots to the bot role`)
            }
        } else
          if (botsNoRole.length < 1) {
            message.channel.send('All the bots already have the role')
          }
      } else
        if (!botRole) {
          message.channel.send("You don't have a role with the name of `Bots`")
        } else
          if (selfRole.position <= botRole.position) {
            message.channel.send(`I have to have a higher role than the \`Bots\` role or I can't add the role to the bots`)
          }
    }
    if (message.content == config.prefix + 'cleanroles') {
      if (rolesByBots.size >= 1) {
        if (selfRole.position > highBotRole.position) {
          rolesByBots.forEach(b => b.delete())
          if (rolesByBots.size == 1) {
            message.channel.send(`Deleted ${rolesByBots.size} auto-generated bot role`)
          } else
            if (rolesByBots.size > 1) {
              message.channel.send(`Deleted ${rolesByBots.size} auto-generated bot roles`)
            }
        } else
          if (selfRole.position <= highBotRole.position) {
            message.channel.send(`I have to have a higher role than all the other bot roles or I can't delete them`)
          }
      } else
        if (rolesByBots.size < 1) {
          message.channel.send('The only auto-generated bot role is mine')
        }
    }
    if (message.content == config.prefix + 'test') {
      message.channel.send(new Embed(`welcome`))
    }
  })
// new stuff
