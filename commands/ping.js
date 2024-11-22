module.exports = {
    name: 'ping',
    description: 'Replies with the user\'s ping.',
    execute(message) {
        const ping = Date.now() - message.createdTimestamp;
        message.reply(`Your ping is ${ping}ms.`);
    },
};