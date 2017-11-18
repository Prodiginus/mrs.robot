const config = require('../req/config.json')

module.exports.run = (client, message, args) => {
        let guild = message.guild
        let allMembers = guild.members.array()
        let allBots = allMembers.filter(b => b.user.bot)
        let allBotsVC = allBots.filter(vc => vc.voiceChannel != undefined || vc.voiceChannel != null)

        guild.createChannel('temp', 'voice')

        let tempC = guild.channels.find(c => c.type == 'voice' && c.name == 'temp')

        allBotsVC.forEach(c => c.setVoiceChannel(tempC))

        tempC.delete()
}