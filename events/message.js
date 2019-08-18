const Discord = require("discord.js");
const cooldowns = new Discord.Collection();
const fs = require("fs");

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (message) {
    if (message.author.bot) return;

    function getDmLvl (message, client) { if (message.author.id === client.appInfo.owner.id) { return 10; } else if (client.config.admins.includes(message.author.id)) { return 9; } else { return 0; } }
    const reply = (c) => message.channel.send(c);
    if (message.guild && !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

    const level = message.channel.type === "text" ? await this.client.permlevel(message) : getDmLvl(message, this.client);

    if (message.content.indexOf("=") !== 0) return;

    const args = message.content.slice("=".length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (message.guild && !message.member) await message.guild.fetchMember(message.author);
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    const usrs = fs.readFileSync("botbans.json", "utf8");
    if (cmd && usrs.includes(message.author.id)) return reply("Seems like you can't acces this. You've been banned by one of bot admins for more details regarding your case and appeal info.");

    if (!cmd) return;
    if (level < 9 && this.client.cmdMaintenance === true) return reply("We are currently undergoing a maintenance we'll be back soon.");
    if (cmd.conf.enabled === false) return reply("This command is currently globally disabled.");
    if (cmd && !message.guild && cmd.conf.guildOnly) return message.channel.send("This command is unavailable via private message. Please run this command in a server.");

    if (cmd.conf.args === true && !args.length) {
      return reply(`You haven't provided any argument.\nCorrect Usage: \`+${cmd.help.name} ${cmd.help.usage}\``);
    }

    if (!cooldowns.has(cmd.help.name)) {
      cooldowns.set(cmd.help.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(cmd.help.name);
    const cooldownAmount = cmd.conf.cooldown * 1000;

    if (message.author.id !== "414764511489294347") {
      if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      } else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return reply(`Slow it down dude. You have to wait ${timeLeft.toFixed(1)} seconds before using \`${cmd.help.name}\` again.`);
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
    }

    const noPermEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setTitle("FORBIDDEN!")
      .setColor("#36393e")
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`
Forbidden! You do not have the required permissions to use \`${cmd.help.name}\`.

▫ Required Permission Level: ${this.client.levelCache[cmd.conf.permLevel]} - ${cmd.conf.permLevel}
▫ Your Permission Level: ${level} - ${this.client.config.permLevels.find(l => l.level === level).name}
          `)
      .setTimestamp();

    if (level < this.client.levelCache[cmd.conf.permLevel]) return reply(noPermEmbed);

    message.author.permLevel = level;

    try {
      await cmd.run(message, args, level, reply);
    } catch (e) {
      reply(`Internal error occured!\nError Code: \`${e}\`\nPlease report this to the developers.`);
    }
  }
};
