//required libraries---------------------------------------------------------------------
    const Discord = require('discord.js')
    const dotenv = require('dotenv').config()
//constants------------------------------------------------------------------------------
    const client = new Discord.Client()    
    const discordToken = process.env.DISCORD_TOKEN
//initialization
    client.login(discordToken)
    require('./req/eventLoader.js')(client)
