const client = require('../../src/index');

client.on('ready', () => {
    console.log(`${client.user.tag} est connecté sur ${client.guilds.cache.size} serveurs`);
})