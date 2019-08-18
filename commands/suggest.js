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
    const m = await this.client.channels.get("597685582298218534").send(`**Vote on suggestion:**\`\`\`${suggestion}\`\`\`\nSuggested by ${message.author}.`);
    await m.react("✅");
    await m.react("❎");
    reply("You suggestion has been sent and awaits voting.");
  
  }
}

module.exports = Suggest;
