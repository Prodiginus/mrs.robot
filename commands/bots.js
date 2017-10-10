module.exports.run =  (client, message, args) => {
  let guild = message.guild
  let allMembers = guild.members.array()
  let allBots = allMembers.filter(b => b.user.bot)
  
  message.channel.send(`This server currently contains ${allBots.length} bots including myself`)
}

module.exports.info = {
  name: "bots",
  info: "displays amount of bots in server"
}