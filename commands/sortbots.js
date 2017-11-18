module.exports.run =  (client, message, args) => {
  let guild = message.guild
  let allMembers = guild.members.array()
  let allBots = allMembers.filter(b => b.user.bot)
  let botsNoRole = allBots.filter(t => !guild.member(t.user).roles.find('name', 'Bots'))
  let botRole = guild.roles.find('name', 'Bots')
  let selfRole = guild.member(client.user).highestRole

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

module.exports.info = {
  name: "sortbots",
  info: "sorts the bots into the input bot role"
}