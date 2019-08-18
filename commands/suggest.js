const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Suggest extends Command {
  constructor (client) {
    super(client, {
      name: "suggest",
      description: "Make a suggestion to improve the server.",
      category: "Tools",
      usage: "<suggestion>",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const suggestion = args.join(" ");
    if (!suggestion) return reply("You have to specify a suggestion.");
    const id = Math.floor(Math.random() * 999);
    const m = await this.client.channels.get("612550365145071617").send(`**Suggestion:**\`\`\`${suggestion}\`\`\`\nSuggested by ${message.author.tag} (ID: ${message.author.id}).\nID: #${id}`);
    message.delete();
    message.author.send(`Suggestion with id **#${id}** has been sent to our team. Thank you for your suggestion and helping us making the bot better.`);
  }
}

module.exports = Suggest;
