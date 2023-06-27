const { ActivityType } = require("discord.js");
const client = require("../../index");
const config = require('./../../settings/config.js');
// ATZNE DEV
client.on("ready", async () => {
    console.log(`[-] Bot: ${client.user.tag}\n[-] Stat: ${client.guilds.cache.size}servs / ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`);
    const activities = [
        { name: `@AutoInsult`, type: ActivityType.Listening },
        { name: `by @atzne`, type: ActivityType.Listening }
    ];
// ATZNE DEV
    let i = 0;
    setInterval(() => {
        if (i >= activities.length) i = 0
        client.user.setActivity(activities[i])
        i++;
    }, 5000);
// ATZNE DEV
    const member = await client.users.fetch(config.victime);
    member.send({ content: "Sale sdf" })
});