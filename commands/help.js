const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Help extends Command {
  constructor (client) {
    super(client, {
      name: "help",
      description: "Learn how to commands.",
      category: "General",
      usage: "[category/alias]",
      enabled: true,
      guildOnly: false,
      aliases: ["halp"],
      permLevel: "User",
      cooldown: 5,
      args: false
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
      if (!args[0]) {
        const emb = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor("#2A7AAF")
          .addField("General - `+help general`", `Commands any bot have.`)
          .addField("Tools - `+help tools`", `Usefull tools that you will most liekly use at some point.`)
          .addField("Leveling - `+help leveling`", `Commands to show off the levels earned by chatting.`)
          .addField("Economy - `+help economy`", `Earn money and but cool stuff.`);
        reply(emb);
     } else if (args[0].toLowerCase() === "general") {
       var cmds = this.client.commands.filter(c => c.help.category === "General" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`+${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}`);
        reply(emb);
     } else if (args[0].toLowerCase() === "leveling") {
       var cmds = this.client.commands.filter(c => c.help.category === "Leveling" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`+${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}`);
        reply(emb);
     } else if (args[0].toLowerCase() === "tools") {
       var cmds = this.client.commands.filter(c => c.help.category === "Tools" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`+${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}`);
        reply(emb);
     } else if (args[0].toLowerCase() === "economy") {
       var cmds = this.client.commands.filter(c => c.help.category === "Economy" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`+${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${cmds.join("\n")}`);
        reply(emb);
     } else {
       const command = this.client.commands.get(args[0].toLowerCase());
       if (!command) return reply(`Command/Category/Alias not found.`);
       var enab = command.conf.enabled ? "Yes" : "No";
       var cperm = command.conf.permLevel;
       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("#2A7AAF")
         .setDescription(`${command.help.name.toProperCase()} - Info\n**Name**: ${command.help.name}\n**Description**: ${command.help.description}\n**Category**: ${command.help.category}\n**Usage**: \`+${command.help.name} ${command.help.usage}\`\n**Cooldown**: ${command.conf.cooldown} Seconds\n**Minimum Rank**: ${command.conf.rank}\n**Enabled**: ${enab}\n**Permission Level**: ${cperm}`);
       reply(emb);
     }

  }
}

module.exports = Help;
