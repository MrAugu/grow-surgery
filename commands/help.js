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
    const emb = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor("#2A7AAF")
      .addField("=surgery <skill> [train]", "Start a surgery.\nExample: `=surgery 100 train`, this would start a surgery with skill 100 and train-e enabled.\nExample: `=surgery 10`, this would start a surgery with skill 10 and train-e disabled.")
      .addField("=suggest <suggestion>", "Suggest an idea to be implemented into the bot.")
      .addField("=feedback <feedback>", "Give us a feedback on how we did.")
      .addField("=ping", "Pong!")
      .addField("=help", "See this list of commands.")
      .addField("=stats", "See stats about the bot.")
      .addField("=invite", "See bot invite link.")
      .addField("=support", "See support server invite link.");
    reply(emb);
  }
}

module.exports = Help;
