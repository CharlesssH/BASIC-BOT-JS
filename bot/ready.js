module.exports = (client) => {
    client.once('ready', () => {
        console.log(`The bot has been active as ${client.user.tag}`);
    });
};
