const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Surgery extends Command {
  constructor (client) {
    super(client, {
      name: "surgery",
      description: "Perform surgery on your patient..",
      category: "Economy",
      usage: "<user> [train]",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    var skill = args[0];
    if (isNaN(parseInt(args[0]))) return reply("Invalid skill. Syntax: `=surgery <skill> [train]`");
    skill = parseInt(args[0]);
    if (skill < 1) return reply("Skill can't be smaller than 1.");
    if (skill > 100) return reply("Skill can't be bigger than 100.");
    const Patient = require("../modules/patient.js");

    const victim = new Patient(1);
    victim.setDisease(Math.floor(Math.random() * 22));
    const msg = await reply("Preparing the operation site.");
    const moves = [];
    var isTrainE = false;

    if (args[1] && args[1] === "train") {
      isTrainE = true;
    }

    while (victim.surgeryEnded !== true) {
      var availableTools = [];
      availableTools.push("sponge");
      availableTools.push("scalpel");
      availableTools.push("stitches");
      if (victim.isAvailable("Antibiotics")) availableTools.push("antibiotics");
      availableTools.push("antiseptic");
      if (victim.isAvailable("Fix It")) availableTools.push("fixit");
      if (victim.isAvailable("Utrasound")) availableTools.push("ultrasound");
      if (!victim.labworked) availableTools.push("labkit");
      availableTools.push("anesthetic");
      if (victim.isAvailable("Defibrilator")) availableTools.push("defibrilator");
      if (victim.isAvailable("Splint")) availableTools.push("splint");
      if (victim.isAvailable("Pins")) availableTools.push("pins");
      if (victim.isAvailable("Clamps")) availableTools.push("clamps");
      availableTools.push("transfusion");

      var trainE = "";

      if (victim.pulse < 31) trainE += "\n- You can use `transfusion` to strengthen the patient pulse.";
      if (victim.heart > 0) trainE += "\n-You can use `defibrilator` to shock patient back to life.";
      if (victim.fever > 0) trainE += "\n- Make sure you have antibiotics at the ready, fever increases.";
      if (victim.temperature > 98.6) trainE += "\n- You can use `antibiotics` to lower the temperature of the patient.";
      if (victim.bleeding > 0 && victim.incisions < 1) trainE += "\n- You can use `stitches` to reduce patient's bleeding.";
      if (victim.bleeding > 0 && victim.incisions > 0) trainE += "\n- You can use `clamps` to reduce patient's bleeding.";
      if (!victim.sounded && !victim.sounded) trainE += "\n- You can use `ultrasound` to discover patient's abnormal masses.";
      if (!victim.fixed && victim.sleep < 1) trainE += "\n- You can use `anesthetic` to put the patient to sleep. You need to do so in order to make incisions.";
      if (victim.shattered > 0 && victim.incisions < 1) trainE += "\n- You need at least 1 incision in order to see the `pins`.";
      if (victim.shattered > 0) trainE += "\n- You can use `pins`to fix shattered bones.";
      if (victim.broken > 0) trainE += "\n- You can use `splint` to fix the broken bones.";
      if (victim.sleep < 3 && victim.incisions > 0) trainE += "\n- Don't let the patient wake up with open incisions. You can use `anesthetic` to prolong their sleep, but too much will kill them.";
      if (availableTools.includes("fixit")) trainE += "\n- You can use `fixit` to fix patien't problem. After you do so, you can start to stitch their incisions.";
      if (victim.sleep > 0 && !this.fixed) trainE += "\n- You can use `scalpel` until you discover the problem and `fixit` button appears.";
      if (victim.fixed) trainE += "\n- Use `stitches` to stitch your patient's incisions.";
      if (victim.dirt === 10) {
        availableTools = ["sponge"];
        trainE = "\n- Use `sponge` to clear your view of the operation site.";
      }
      const embed = new Discord.MessageEmbed()
        .setTitle("Growtopia Discord Surgery Simulator")
        .setDescription(`${victim.extraMeanings[victim.extra]}${victim.sounded && !victim.flu || victim.labworked && victim.flu ? victim.diagnostic : "Patient has not been diagnosed."}

Pulse: ${victim.getPulseText()}
Status: ${victim.getStatusText()}
Temp: ${victim.temperature}
Operation site: ${victim.getOperationSiteText()}
Incisions: ${victim.incisions}\n${victim.getBones()}
${victim.getSee()}${victim.getText()}

Available Tools: \`${availableTools.join("\`, \`")}\`\n\n${isTrainE ? `Train-E:${trainE}` : ""}`)
        .setColor("BLUE");
      var toolAboutToUse = await this.client.awaitSurgeryReply(msg, embed, 60000, message.author.id, `${moves.length < 1 ? "" : `Last Tool Used: **${moves[moves.length - 1]}**`}`);
      if (toolAboutToUse === false) {
        msg.edit("Timed out. Surgery has been aborted.");
        break;
      }
      var toolToUse = toolAboutToUse.content.toLowerCase();
      if (!toolToUse.startsWith("-")) await toolAboutToUse.delete();
      if (toolToUse === "abort") {
        msg.edit("Surgery aborted.");
        break;
      }
      if (availableTools.includes(toolToUse) && !toolToUse.startsWith("-")) {
        victim.useTool(toolToUse);
        moves.push(toolToUse);
      } else {
        msg.edit("Invalid tool name or tool is not available.");
      }
      if (victim.surgeryEnded) {
        break;
      }
    }

    if (victim.endText !== "success" && victim.endText.length > 1) {
      const embed1 = new Discord.MessageEmbed()
        .setTitle("You failed to save your patient.")
        .setDescription(`**${victim.endText}**\n\n- Skill Level: ${victim.skill}\n- Surgical Sponges: ${victim.usedTools.sponges}\n- Surgical Scalpels: ${victim.usedTools.scalpels}\n- Surgical Stitches: ${victim.usedTools.stitches}\n- Surgical Antibiotics: ${victim.usedTools.antibiotics}\n- Surgical Antiseptics: ${victim.usedTools.antiseptics}\n- Surgical Ultrasounds: ${victim.usedTools.ultrasounds}\n- Surgical Lab Kits: ${victim.usedTools.labkits}\n- Surgical Anesthetics: ${victim.usedTools.anesthetics}\n- Surgical Defibrilators: ${victim.usedTools.defibrilators}\n- Surgical Splints: ${victim.usedTools.splints}\n- Surgical Clamps: ${victim.usedTools.clamps}\n- Surgical Transfusions: ${victim.usedTools.transfusions}`)
        .setThumbnail("https://vignette.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/256/y-offset/192/window-width/32/window-height/32?fill=a")
        .setColor("GREY");
      msg.edit("", embed1);
      reply(`${message.author}, you failed to cure your patient of ${victim.scanText.split("!")[0]}. ${victim.endText}`);
    } else if (victim.endText === "success") {
      const embed2 = new Discord.MessageEmbed()
        .setTitle(`You cured your patient of ${victim.scanText.split("!")[0]}.`)
        .setDescription(`Your patient managed to survive somehow.\n\n- Skill Level: ${victim.skill}\n- Surgical Sponges: ${victim.usedTools.sponges}\n- Surgical Scalpels: ${victim.usedTools.scalpels}\n- Surgical Stitches: ${victim.usedTools.stitches}\n- Surgical Antibiotics: ${victim.usedTools.antibiotics}\n- Surgical Antiseptics: ${victim.usedTools.antiseptics}\n- Surgical Ultrasounds: ${victim.usedTools.ultrasounds}\n- Surgical Lab Kits: ${victim.usedTools.labkits}\n- Surgical Anesthetics: ${victim.usedTools.anesthetics}\n- Surgical Defibrilators: ${victim.usedTools.defibrilators}\n- Surgical Splints: ${victim.usedTools.splints}\n- Surgical Clamps: ${victim.usedTools.clamps}\n- Surgical Transfusions: ${victim.usedTools.transfusions}`)
        .setThumbnail("https://vignette.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/1184/y-offset/1056/window-width/32/window-height/32?fill=a")
        .setColor("GREEN");
      msg.edit("", embed2);
      reply(`${message.author}, you cured your patient of ${victim.scanText.split("!")[0]}.`);
    } else {
      const embed = new Discord.MessageEmbed().setDescription("Surgery aborted.").setColor("RED");
      msg.edit("Weird stuff, surgery may have been aborted?!", embed);
    }
  }
}

module.exports = Surgery;
