const Discord = require("discord.js"); // eslint-disable-line no-unused-vars

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run () {
    this.client.appInfo = await this.client.fetchApplication();
    setInterval( async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    await this.client.user.setStatus("online");

    const statusArray = [
      (client) => client.user.setActivity("=help", { type: "WATCHING" }),
      (client) => client.user.setActivity(`=help | ${this.client.guilds.size} Servers`, { type: "WATCHING" }),
      (client) => client.user.setActivity(`=help | ${this.client.channels.get.toLocaleString()} Channels`, { type: "WATCHING" }),
      (client) => client.user.setActivity(`=help | ${this.client.users.get.toLocaleString()} Users`, { type: "WATCHING" })
    ];

    var pick = 0;
    setInterval(() => {
      statusArray[pick](this.client);
    }, 20000);

    let users = 0;
    this.client.guilds.map(g => users += g.memberCount);

    this.client.logger.log(`Logged in as ${this.client.user.tag}! Serving ${this.client.guilds.size} Servers and ${users} Users.`, "ready");
  }
};
