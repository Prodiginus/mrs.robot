//required libraries---------------------------------------------------------------------
    const dotenv = require('dotenv').config()
    const Discord = require('discord.js')
//constants------------------------------------------------------------------------------
    const discordToken = process.env.DISCORD_TOKEN
    const client = new Discord.Client()
//initialization
    client.login(discordToken)
    require('./req/eventLoader.js')(client)