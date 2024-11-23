const { REST, Routes } = require('discord.js');
require('dotenv').config();
const channelCommand = require('./commands/channelcommand');
const translateCommand = require('./bot/translate');

const commands = [];

// Gunakan deskripsi default (bahasa Inggris)
channelCommand.data.forEach(command => {
    commands.push(command.toJSON());
});

// Atau gunakan bahasa Indonesia sebagai default
// const localizedCommands = channelCommand.getLocalizedCommands('default');
// localizedCommands.forEach(command => {
//     commands.push(command.toJSON());
// });

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        console.log(`Found ${commands.length} commands to register`);

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('Error during deployment:', error);
    }
})();