module.exports.run = (client, message, args) => {
  let guild = message.guild
  let selfRole = guild.member(client.user).highestRole
  let rolesByBots = guild.roles.filter(r => r.managed).filter(r => !['Mrs. Robot'].includes(r.name)).sort(function (m, i) { return m.position - i.position })
  let highBotRole = rolesByBots.last()

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

module.exports.info = {
  name: "cleanroles",
  info: "deletes all the auto generated roles"
}