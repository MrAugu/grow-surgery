const Discord = require("discord.js"); // eslint-disable-line no-unused-vars

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Joined Server")
      .setDescription(`Name: ${guild.name}\nID: ${guild.id}\nOwner: ${guild.owner.user.tag} (ID: ${guild.owner.user.id})\nMember Count: ${guild.memberCount}\nBot Count: ${guild.members.filter(m => m.user.bot).size}`)
      .setColor("GREEN")
      .setThumbnail(guild.iconURL())
      .setTimestamp();
    this.client.channels.get("612550574327726094").send(embed);
  }
};
