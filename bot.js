//required libraries---------------------------------------------------------------------
    const Discord = require('discord.js')
    const chalk = require('chalk')
    const fs = require('fs')
    const dotenv = require('dotenv')
    const snekfetch = require('snekfetch')
//constants------------------------------------------------------------------------------
    dotenv.config()
    const discordToken = process.env.DISCORD_TOKEN
    const discordBotsToken = process.env.DISCORD_BOTS_TOKEN
    const client = new Discord.Client()
    const commands = new Discord.Collection()
    const config = require('./req/config.json')
    const Embed = require('./req/embeds.js')
    const regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g
//commands loader------------------------------------------------------------------------
    fs.readdir('./commands/', (error, files) => {
        if (error) {
            console.log(chalk.red(error))
        }
        let jsFiles = files.filter(f => f.split('.').pop() === 'js');
        if (jsFiles.length <= 0) {
            console.log(chalk.yellow('No commands to load'))
        } else {
            console.log(chalk.blue(`Loading ${jsFiles.length} commands`))
            jsFiles.forEach((f, i) => {
                let props = require(`./commands/${f}`)
                console.log(chalk.green(`→ ${f} has been loaded`))
                commands.set(props.info.name, props)
            })
        }
    })
client //connections---------------------------------------------------------------------
    .on('ready', () => {
        console.log(chalk.green(`Mrs. Robot is up and online at ${new Date()}`))
        console.log(chalk.cyan(`Here is my invite link: ${config.links.invLink}`))
        console.log(chalk.magenta(`I am currently in ${client.guilds.size} guilds: ${client.guilds.map(m => m.name)}`))

        client.user.setPresence({
            status: "online",
            activity: {
                name: "myself",
                type: "STREAMING",
                url: "https://www.twitch.tv/monstercat"
            }
        })
        snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
            .set('Authorization', `${discordBotsToken}`)
            .send({ server_count: client.guilds.size })
            .then(console.log(chalk.green('Updated server count')))
            .catch(e => console.log(chalk.red(`Something went wrong: ${e}`)))
    })
    .on('disconnect', () => {
        console.log(chalk.red(`Mrs.Robot was disconnected at ${new Date()}`))
    })
    .on('reconnecting', () => {
        console.log(chalk.yellow(`Mrs. Robot is reconnecting at ${new Date()}`))
    })
    .login(discordToken)
client //console logging-----------------------------------------------------------------
    .on('debug', e => {
        console.log(chalk.blue(e.replace(regToken, `that was redacted`)))
    })
    .on('warn', e => {
        console.log(chalk.yellow(e.replace(regToken, `that was redacted`)))
    })
    .on('error', e => {
        console.log(chalk.red(e.replace(regToken, `that was redacted`)))
    })
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
        if ((message.author == client.user) || (!message.content.startsWith(config.prefix)) || (message.author.bot) || (message.channel.type == 'dm')) return
        let guild = message.guild
        let selfRole = guild.member(client.user).highestRole
        let rolesByBots = guild.roles.filter(r => r.managed).filter(r => !['Mrs. Robot'].includes(r.name)).sort(function(m, i) { return m.position - i.position })
        let highBotRole = rolesByBots.last()
        let allMembers = guild.members.array()
        let allBots = allMembers.filter(b => b.user.bot)
        let botsNoRole = allBots.filter(t => !guild.member(t.user).roles.find('name', 'Bots'))
        let botRole = guild.roles.find('name', 'Bots')

        let messageArray = message.content.split(/\s+/g)
        let command = messageArray[0]
        let args = messageArray.slice(1)
        let cmd = commands.get(command.slice(config.prefix.length))

        if (cmd) {
            cmd.run(client, message, args)
        }
})