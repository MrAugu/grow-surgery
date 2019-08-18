class Patient {
  constructor(options) {
    this.sounded = false;
    this.labworked = false;
    this.fixed = false;
    this.fixable = false;
    this.flu = false;
    this.pulse = 40;
    this.site = 0;
    this.sleep = 0;
    this.dirt = 0;
    this.broken = 0;
    this.shattered = 0;
    this.incisions = 0;
    this.bleeding = 0;
    this.incisionsNeeded = 0;
    this.heart = 0;
    this.temperature = 98.6;
    this.fever = 0.0;
    this.diagnostic = "";
    this.fixText = "";
    this.afterFixText = "";
    this.scanText = "";
    this.toolText = "Patient is prepped for surgery.";
    this.endText = "";
    this.antibiotics = false;
    this.s = true;
    this.skill = options;
    this.surgeryEnded = false;
    this.condition = "";
    this.extra = 0;

    this.extraMeanings = {
      1: "**The patient exhibits very tough skin. Possibly a superhero.**\n",
      2: "**The patient has an antibiotic-resistant infection.**\n",
      4: "**The patient is hyperactive.**\n",
      5: "**The patient is hemophiliac.**\n",
      0: ""
    };
    this.usedTools = {
        "sponges": 0,
        "scalpels": 0,
        "stitches": 0,
        "antibiotics": 0,
        "antiseptics": 0,
        "ultrasounds": 0,
        "labkits": 0,
        "anesthetics": 0,
        "defibrilators": 0,
        "splints": 0,
        "pins": 0,
        "clamps": 0,
        "transfusions": 0
    };

    this.isAvailable = (toolName) => {
      switch (toolName) {
        case "Sponge":
          return true;
          break;
        case "Antibiotics":
          return this.labworked;
          break;
        case "Fix It":
          return this.fixable && !this.fixed;
          break;
        case "Utrasound":
          return !this.sounded;
        case "Defibrilator":
          return this.heart > 0;
          break;
        case "Splint":
          return this.broken > 0;
          break;
        case "Pins":
          return this.shattered > 0 && this.incisions > 0;
          break;
        case "Clamps":
          return this.incisions > 0 && this.bleeding > 0;
        default:
          return true;
      }
    };

    this.getPulseText = () => {
      if (this.pulse < 11) {
        return "**__Extremly Weak__**";
      } else if (this.pulse < 21) {
        return "**Weak**";
      } else if (this.pulse < 31) {
        return "Steady";
      } else {
        return "Strong"
      }
    };

    this.getStatusText = () => {
      if (this.heart > 0) {
        return "**__Heart Stopped!__**";
      } else if (this.sleep === 0) {
        return "Awake";
      } else if (this.sleep < 3) {
        return "Coming to";
      } else {
        return "Unconscious"
      }
    };

    this.getOperationSiteText = () => {
      if (this.site < -3) {
        return "Unsanitary";
      } else if (this.site < -1) {
        return "Unclean";
      } else if (this.site < 1) {
        return "Not sanitized";
      } else {
        return "Clean";
      }
    };

    this.getSee = () => {
      if (this.dirt === 10) {
        return "You can't see what you are doing!\n";
      } else if (this.dirt > 4) {
        return "It's becoming hard to see your work.\n"
      } else {
        return "";
      }
    };

    this.getBones = () => {
      if (this.sounded) {
        return `Bones: ${this.broken} Broken, ${this.shattered} Shattered\n`;
      } else {
        return "";
      }
    };

    this.getText = () => {
      var text = "";

      if (this.bleeding > 0) {
        if (this.bleeding == 1) {
          text += "*Patient is losing blood slowly.*\n";
        } else if (this.bleeding == 4) {
          text += "__**Patient is losing blood quickly!**__\n";
        } else {
          text += "**Patient is losing blood**.\n";
        }
      }

      if (this.fever > 0 && this.temperature > 100) {
        if (this.fever < 0.5) {
          text += "*Patient's fever is slowly rising.*\n";
        } else if (this.fever > 2) {
          text += "__**Patient's fever is climbing quickly!**__\n";
        } else {
          text += "**Patient's fever is climbing.**\n";
        }
      }

      if (this.heart === 1) {
        text += "__**Patient's heart has stopped!**__\n";
      } else if (this.incisions > 0 && this.sleep === 0) {
        text += "**Patient screams and flails!**\n";
      }

      if (this.s) {
        text += `${this.toolText}`;
      } else {
        text += `[Skill Fail (${Math.round(30 - this.skill / 4)}%)] ${this.toolText}`;
      }

      return text;
    };

    this.setDisease = (nr) => {
      switch (nr) {
        case 0:
          this.fixed = true;
          this.bleeding = 1;
          this.broken = 1;
          this.diagnostic = "Patient broke his arm.";
          this.scanText = "a broken arm! You found 1 broken bone.";
          break;
        case 1:
          this.fixed = true;
          this.bleeding = 1;
          this.broken = 1;
          this.shattered = 1;
          this.diagnostic = "Patient broke his leg.";
          this.scanText = "a broken leg! You found 1 broken bone and 1 shattered bone.";
          break;
        case 2:
          this.fixed = true;
          this.flu = true;
          this.temperature = 104.6;
          this.fever = 2.5;
          this.dirt = 6;
          this.diagnostic = "Patient is showing signs of the bird flu.";
          this.scanText = "bird flu!";
          break;
        case 3:
          this.fixed = true;
          this.flu = true;
          this.temperature = 101.6;
          this.fever = 3.6;
          this.dirt = 6;
          this.diagnostic = "Patient is showing signs of the turtle flu.";
          this.scanText = "turtle flu!";
          break;
        case 4:
          this.fixed = true;
          this.flu = true;
          this.temperature = 107.6;
          this.fever = 2.4;
          this.diagnostic = "Patient is showing signs of the monkey flu.";
          this.scanText = "monkey flu!";
          break;
        case 5:
          this.sounded = true;
          this.incisionsNeeded = 1;
          this.scanText = "a nose job!"
          this.diagnostic = "Patient wants a nose job.";
          this.fixText = "You have cut into nasal area.";
          this.afterFixText = "You rearranged their face!";
          break;
        case 6:
          this.incisionsNeeded = 1;
          this.scanText = "a lung tumor!";
          this.diagnostic = "Patient has a tumor in their lung.";
          this.fixText = "The lungs are now exposed.";
          this.afterFixText = "You excised the tumor!";
          break;
        case 7:
          this.incisionsNeeded = 2;
          this.scanText = "a heart attack!";
          this.diagnostic = "Patient had a heart attack.";
          this.fixText = "The heart is now exposed for operating.";
          this.afterFixText = "You grafted in some nice new arteries!";
          break;
        case 8:
          this.incisionsNeeded = 5;
          this.scanText = "a brain tumor!";
          this.diagnostic = "Patient has a brain tumor, deep inside.";
          this.fixText = "You've finally found the tumor!";
          this.afterFixText = "You excised the tumor!";
          break;
        case 9:
          this.incisionsNeeded = 2;
          this.temperature = 104.6;
          this.fever = 0.6;
          this.pulse = 30;
          this.scanText = "a liver infection!";
          this.diagnostic = "Patient has a liver infection.";
          this.fixText = "You've accessed the liver.";
          this.afterFixText = "You treated the source of the infection!";
          break;
        case 10:
          this.incisionsNeeded = 2;
          this.temperature = 101.6;
          this.fever = 1.2;
          this.scanText = "kidney failure!";
          this.diagnostic = "Patient suffers from kidney failure.";
          this.fixText = "You now have access to the bad kidney.";
          this.afterFixText = "You popped in a fresh new kidney!";
          break;
        case 11:
          this.incisionsNeeded = 3;
          this.temperature = 104.6;
          this.fever = 1.2;
          this.pulse = 30;
          this.scanText = "appendicitis!";
          this.diagnostic = "Patient suffers from appendicitis.";
          this.fixText = "You now have access to the appendix.";
          this.afterFixText = "You yanked out the appendix!";
          break;
        case 12:
          this.incisionsNeeded = 2;
          this.temperature = 101.6;
          this.bleeding = 1;
          this.dirt = 6;
          this.scanText = "swallowed World Lock!";
          this.diagnostic = "Patient has swallowed a world lock.";
          this.fixText = "You've opened the stomach.";
          this.afterFixText = "You got the lock out! (But you don't get to keep it!)";
          break;
        case 13:
          this.incisionsNeeded = 3;
          this.temperature = 100.4;
          this.scanText = "a herniated disc!";
          this.diagnostic = "Patient's spine is damaged.";
          this.fixText = "You've opened up the vertebrae.";
          this.afterFixText = "You repaired the disc!";
          break;
        case 14:
          this.incisionsNeeded = 2;
          this.temperature = 100.58;
          this.dirt = 6;
          this.bleeding = 1;
          this.shattered = 4;
          this.scanText = "broken everything! You found 4 shattered bones.";
          this.diagnostic = "Patient was run over by a truck.";
          this.fixText = "You've found gravel in the knees.";
          this.afterFixText = "You removed the gravel!";
          break;
        case 15:
          this.incisionsNeeded = 1;
          this.pulse = 20;
          this.dirt = 6;
          this.bleeding = 4;
          this.scanText = "a serious head injury!";
          this.diagnostic = "Patient has a serious head injury.";
          this.fixText = "You've opened the skull.";
          this.afterFixText = "You reduced the swelling!";
          break;
        case 16:
          this.incisionsNeeded = 2;
          this.pulse = 30;
          this.dirt = 10;
          this.bleeding = 3;
          this.broken = 2;
          this.shattered = 1;
          this.scanText = "serious trauma! You found 2 broken bones and 1 shattered bone.";
          this.diagnostic = "Patient suffered serious trauma with a punctured lung.";
          this.fixText = "You found the lung puncture.";
          this.afterFixText = "You repaired it.";
          break;
        case 17:
          this.incisionsNeeded = 3;
          this.pulse = 30;
          this.dirt = 10;
          this.bleeding = 4;
          this.broken = 2;
          this.shattered = 2;
          this.scanText = "massive trauma! You found 2 broken bones and 2 shattered bones.";
          this.diagnostic = "Patient suffered massive trauma with internal bleeding.";
          this.fixText = "You found the internal bleed.";
          this.afterFixText = "You cauterized it.";
          break;
        case 18:
          this.incisionsNeeded = 2;
          this.pulse = 30;
          this.temperature = 100.58;
          this.fever = 3;
          this.bleeding = 3;
          this.shattered = 1;
          this.scanText = "Brainworms! You found 1 shattered bone.";
          this.diagnostic = "Patient suffers from Brainworms.";
          this.fixText = "You've exposed the brain.";
          this.afterFixText = "You've shut down the worm party in the patient's brain and cleared away their trash.";
          break;
        case 19:
          this.pulse = 30;
          this.temperature = 107.6;
          this.dirt = 10;
          this.bleeding = 2;
          this.scanText = "Chaos Infection! You found 2 broken bones.";
          this.diagnostic = "Patient suffers from a Chaos Infection.";
          this.broken = 2;
          this.fixText = "You exposed a central artery.";
          this.afterFixText = "You drawn the corrupted blood out of the patient and severed their connection to chaos.";
          this.incisionsNeeded = 3;
          break;
        case 20:
          this.fever = 3;
          this.dirt = 10;
          this.shattered = 2;
          this.scanText = "chicken feet! You found 2 shattered bones.";
          this.diagnostic = "Patient's feet has turned into chicken toes.";
          this.incisionsNeeded = 2;
          this.fixText = "You've investigated the feet.";
          this.afterFixText = "You fixed the patient's feet. They look like normal blocky toes again!";
          break;
        case 21:
          this.pulse = 30;
          this.dirt = 6;
          this.incisionsNeeded = 0;
          this.scanText = "Ecto-Bones! You found 6 broken bones and 2 shattered bones."
          this.fixText = "You've exposed the ribs.";
          this.afterFixText = "You pinned down all the patient's major bones and dyed them back to their normal color.";
          this.broken = 6;
          this.shattered = 2;
          break;
        case 22:
          this.scanText = "torn punching muscle!";
          this.diagnostic = "Patient has a torn punching muscle";
          this.fixText = "You've accessed the arm muscles.";
          this.afterFixText = "You patched the torn punching muscles. They should be back to punching in no time.";
          this.incisionsNeeded = 1;
      }
      const otherConditionChances = Math.floor(Math.random() * 100);
      if (otherConditionChances > 90) {
        var condition = Math.floor(Math.random() * 4) + 1;
        if (condition === 3) condition = 0;
        this.extra = condition;
        if (this.extra === 1 && this.incisionsNeeded < 1) this.extra = 0;
        if (this.extra === 2 && this.flu) this.extra = 0;
        if (this.extra === 1) this.incisionsNeeded += 1;
      }
    };

    this.useTool = (toolName) => {
      this.s = Math.random() * 100 > (30 - this.skill / 4);

      switch (toolName) {
        case "sponge":
          this.usedTools.sponges += 1;
          if (this.s) {
            this.dirt = 0;
            this.toolText = "You mopped up the operation site.";
          } else {
            this.toolText = "You somehow managed to eat the sponge."
          }
          break;
        case "scalpel":
          this.usedTools.scalpels += 1;
          if (this.sleep === 0) {
            this.endText = "You have cut the awake patient!";
          }
          if (this.incisions === this.incisionsNeeded && this.shattered === 0) {
            this.toolText = "You stabbed the patient in a vital organ!";
            this.bleeding += 1;
            if (this.extra === 5) this.bleeding  += 1;
            this.s = true;
          } else {
            this.incisions += 1;
            if (this.s) {
              this.toolText = "You've made a neat incision.";
            } else {
              this.toolText = "This will leave a nasty scar, but you managed to cut the right place.";
            }
          }
          break;
        case "stitches":
          this.usedTools.stitches += 1;
          if (this.s) {
            if (this.incisions > 0) {
              this.toolText = "You stitched up an incision.";
            } else if (this.bleeding > 0) {
              this.toolText = "You badaged some injuries.";
            } else {
              this.toolText = "You tried to stitch your patient's mouth shut!.";
            }
            if (this.bleeding > 0) {
              this.bleeding -= 1;
            }
            if (this.incisions > 0) {
              this.incisions -= 1;
            }
          } else {
            this.toolText = "You somehow tied yourself up in stitches!";
          }
          break;
        case "antiseptic":
          this.usedTools.antiseptics += 1;
          if (this.s) {
            this.site = Math.min(this.site + 20, 20);
            this.toolText = "You disinfected the operating site.";
          } else {
            this.toolText = "You spilled antiseptic on your shoes. They are very clean now.";
          }
          break;
        case "antibiotics":
          this.usedTools.antibiotics += 1;
          if (this.s) {
            if (this.extra === 2) {
              this.fever -= 1.5;
            } else {
              this.fever -= 3;
            }
            this.toolText = "You used antibiotics to reduce patient's infection.";
            if (this.fever > -3) {
              this.antibs = true;
            }
          } else {
            this.fever += 1;
            this.toolText = "This is the wrong medication! The bacteria like it.";
          }
          break;
        case "anesthetic":
          this.usedTools.anesthetics += 1;

          if (this.s) {
            if (this.extra === 4) {
              this.sleep += 6;
            } else {
              this.sleep += 10;
            }
            this.toolText = "The patient falls into a deep sleep.";
          } else {
            this.toolText = "You ended up inhaling all the anesthetic yourself. You feel woozy.";
          }
          break;
        case "labkit":
          this.usedTools.labkits += 1;
          if (this.s) {
            this.labworked = true;
            if (this.flu) {
              this.toolText = "You performed lab work on the patient, and discovered they are suffering from " + this.scanText;
            } else {
              this.toolText = "You performed lab work on the patient, and have antibiotics at the ready.";
            }
          } else {
            this.toolText = "You contaminated the sample.";
          }
          break;
        case "ultrasound":
          this.usedTools.ultrasounds += 1;

          if (this.s) {
            this.sounded = true;
            if (this.flu) {
              this.toolText = "You scanned the patient , but didn't find any abnormal masses.";
            } else {
              this.toolText = "You scanned the patient with ultrasound, discovering they are suffering from " + this.scanText;
            }
          } else {
            this.toolText = "You scanned the nurse with your ultrasound!";
          }
          break;
        case "pins":
          this.usedTools.pins += 1;
          if (this.s) {
            if (this.shattered < 1) {
              this.toolText = "You dropped the pins on the floor, how nice.";
              this.s = false;
            } else {
              this.shattered -= 1;
              this.broken += 1;
              this.toolText = "You pinned a shattered bone together. Don't forget to splint it!";
            }
          } else {
            this.bleeding += 1;
            if (this.extra === 5) this.bleeding  += 1;
            this.toolText = "You jabbed the pin through the artery!";
          }
          break;
        case "defibrilator":
          this.usedTools.defibrilators += 1;
          if (this.s) {
            this.heart = 0;
            this.toolText = "You shocked the patient back to life!";
          } else {
            this.toolText = "You electrocuted yourself!";
          }
          break;
        case "transfusion":
          this.usedTools.transfusions += 1;
          if (this.s) {
            this.pulse = Math.min(this.pulse + 15, 40);
            this.toolText = "You transfused several pints of blood into your patient.";
          } else {
            this.toolText = "You spilled all of it! Kind of gross.";
          }
          break;
        case "clamp":
          this.usedTools.clamps += 1;
          if (this.s) {
            this.bleeding = this.bleeding - 2;
            this.toolText = "You clamped up some blood vessels.";
          } else {
            this.toolText = "The clamp fell out of your hand, oh well.";
          }
          break;
        case "fixit":
          if (this.s) {
            this.fixed = true;
            this.toolText = this.afterFixText;
          } else {
            this.toolTthis.dirt = 10;ext = "You screw it up! Try again."
          }
          break;
        case "splint":
          if (this.s) {
            if (this.broken < 1) {
              this.toolText = "You slapped your patient in face with a splint.";
              this.s = false;
            } else {
              this.broken -= 1;
              this.toolText = "You splinted a broken bone.";
            }
          } else {
            this.toolText = "You ate a splint, good job!";
          }
      }

      if (!this.fixable && (this.incisions == this.incisionsNeeded) && this.sounded) {
        this.fixable = true;
        this.toolText += "\n" + this.fixText;
      }

      this.dirt += this.bleeding + this.incisions;
      if (this.dirt > 20) {
        this.dirt = 20;
      }

      this.site -= Math.floor(this.dirt / 3);

      if (this.site < -25) {
        this.site = -25;
      }

      if (this.sleep == 0 && this.incisions > 0) {
        this.bleeding += 1;
        if (this.extra === 5) this.bleeding  += 1;
      }

      if (this.bleeding > 4) {
        this.bleeding = 4;
      }

      if (this.fever < 0) {
        if (this.fever > -0.06) {
          this.fever = 0
        } else if (!this.antibs) {
          this.fever = (this.fever - 3) / 2;
        }
      } else if ((this.site <= 2) && (this.bleeding > 0) || (this.site <= 4) && (this.incisions > 0)) {
        this.fever += 0.06;
      }

      this.temperature += this.fever;
      this.temperature = Math.round(this.temperature * 100) / 100;

      if (this.temperature < 98.6) {
        this.temperature = 98.6;
      }

      this.antibs = false;

      if (((this.sleep > 0) && (Math.random() < 0.2)) || (this.heart > 0)) {
        this.heart += 1
      } else {
        this.sleep = Math.max(this.sleep - 1, 0);
      }

      this.pulse -= this.bleeding + Math.min(this.incisions, 1);

      if (this.pulse < 1 && this.endText.length == 0) {
        this.endText = "Your patient bled out!";
        this.surgeryEnded = true;
      } else if (this.temperature >= 111) {
        this.endText = "Your patient succumbed to infection!";
        this.surgeryEnded = true;
      } else if (this.heart > 2) {
        this.endText = "You failed to resucicate your patient in time!";
        this.surgeryEnded = true;
      } else if (this.sleep > 15) {
        this.endText = "You put your patient to sleep. Permanently!";
        this.surgeryEnded = true;
      } else if (this.incisions === 0 && this.broken === 0 && this.shattered === 0 && this.fixed && this.bleeding === 0 && this.temperature < 101 && this.heart === 0) {
        this.endText = "success";
        this.surgeryEnded = true;
      }
    };
  }
}

module.exports = Patient;
