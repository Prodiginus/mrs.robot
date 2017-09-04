//required libraries---------------------------------------------------------------------
const Discord = require('discord.js');
const chalk = require('chalk');
const config = require('./config.json');
require('dotenv').config();
//constants------------------------------------------------------------------------------
const client = new Discord.Client();
const regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
const discordToken = process.env.DISCORD_TOKEN;
client //connections---------------------------------------------------------------------
    .on('ready', () => {
        console.log(chalk.green.bold(`Mrs.Robot is up and online at ${new Date()}`));
        console.log(chalk.green.bold(`${config.invLink}`));
        client.user.setPresence({status: "online", game: {name: "with herself", type: 0}})
    })
    .on('disconnect', () => {
        console.log(chalk.red.bold(`Mrs.Robot was disconnected at ${new Date()}`));
    })
    .on('reconnecting', () => {
        console.log(chalk.yellow.bold(`Mrs. Robot is reconnecting at ${new Date()}`));
    })
    .login(discordToken);
client //console logging-----------------------------------------------------------------
    .on('debug', e => {
        console.log(chalk.bold.blue(e.replace(regToken, `that was redacted`)));
    })
    .on('warn', e => {
        console.log(chalk.yellow(e.replace(regToken, `that was redacted`)));
    })
    .on('error', e => {
        console.log(chalk.red(e.replace(regToken, `that was redacted`)));
    });
client //automatic guild events----------------------------------------------------------
    .on('guildCreate', guild => {
      console.log(chalk.magenta(`Joined ${guild.name} at ${new Date()}`));
      let defChannel = guild.channels.find('name', 'mod-logs') || guild.channels.find('name', 'general');
      if(guild.available) {
        defChannel.send("Type `%sortbots` to add the `Bots` role to every bot that is in this server\n\nAny new bots that join will be automatically added to the bot role\n\nIf you want the invite link just type `%invite`\n\nAnd type `%bots` and I'll tell you how many bots this server has\n\nType `%help` to see this message again");
      };
    })
    .on('guildMemberAdd', member => {
      let guild = member.guild;
      let botRole = guild.roles.find('name', 'Bots');
      let selfRole = guild.member(client.user).highestRole;
      let defChannel = guild.channels.find('name', 'mod-logs') || guild.channels.find('name', 'general');
      if ((member.user.bot) && (botRole)) {
        if ((botRole) && (selfRole.position > botRole.position))  {
          member.addRole(botRole.id);
          console.log(chalk.yellow(`Added ${member.user.username} to the Bot\'s role`));
          defChannel.send(`New bot ${member.user.username} has been added to the bot role`);
        } else 
        if (selfRole.position <= botRole.position) {
          defChannel.send(`${member.user.username} has just joined but I have to have a higher role than the \`Bots\` role to add them to the \`Bots\` role`)
        }
      } else
      if (!botRole) {
        defChannel.send(`${member.user.username} has just joined but you don\'t have a role with the name of \`Bots\` that I can add them to`)
      }
    });
client //text commands-------------------------------------------------------------------
    .on('message', message => {
      if ((message.author == client.user) || (!message.content.startsWith(config.prefix))) return;
      let guild = message.guild;
      let allMembers = guild.members.array();
      let allBots = allMembers.filter(b => b.user.bot);
      let botsNoRole = allBots.filter(t => !guild.member(t.user).roles.find('name', 'Bots') )
      let botRole = guild.roles.find('name', 'Bots');
      let selfRole = guild.member(client.user).highestRole;

      if (message.content == config.prefix + 'invite') {
        message.channel.send(`Here\'s my invite link\n${config.invLink}`)
      };
      if (message.content == config.prefix + 'bots') {
        message.channel.send(`This server currently contains ${allBots.length} bots including myself`)
      };
      if (message.content == config.prefix + 'help') {
        message.channel.send("Type `%sortbots` to add the `Bots` role to every bot that is in this server\n\nAny new bots that join will be automatically added to the bot role\n\nIf you want the invite link just type `%invite`\n\nAnd type `%bots` and I'll tell you how many bots this server has\n\nType `%help` to see this message again");        
      };
      if (message.content == config.prefix + 'sortbots') {
        if ((botRole) && (selfRole.position > botRole.position)) {
          if(botsNoRole.length > 0) {
            botsNoRole.forEach(bo => bo.addRole(botRole.id))
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
        };
    };
});
