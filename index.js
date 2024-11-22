const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const translateCommand = require('./bot/translate');

// Initialize Discord client with the required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ],
});

// Import and run the 'ready' event handler
const readyEvent = require('./bot/ready');
readyEvent(client);

const TOKEN = process.env.DISCORD_TOKEN;

// Import command handlers
const pingCommand = require('./commands/ping');
const infoguildCommand = require('./commands/infoguild');
const infousersCommand = require('./commands/infousers');
const pfpCommand = require('./commands/pfp');
const bothelpCommand = require('./commands/bothelp');

// Event listener for messages created
client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Get user's language
    const userLang = translateCommand.getUserLanguage(message.author.id);

    // Command untuk mengubah bahasa
    if (message.content === '!language') {
        translateCommand.execute(message);
    }

    // Modify existing commands to use translations
    if (message.content === '!ping') {
        const ping = Date.now() - message.createdTimestamp;
        message.reply(translateCommand.getTranslation(message.author.id, 'ping', { ping }));
    }

    // Bot mention response with translation
    const botMention = `halo <@${client.user.id}>`;
    if (message.content.toLowerCase() === botMention.toLowerCase()) {
        message.reply(translateCommand.getTranslation(message.author.id, 'welcome', { 
            user: message.author 
        }));
    }

    // Check for commands
    if (message.content === '!infoguild') {
        infoguildCommand.execute(message);
    }

    if (message.content.startsWith('!infousers')) {
        infousersCommand.execute(message);
    }

    if (message.content.startsWith('!pfp')) {
        pfpCommand.execute(message);
    }

    if (message.content === '!bothelp') {
        bothelpCommand.execute(message);
    }
});

// Handle language selection
client.on('interactionCreate', async interaction => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'select_language') {
        const selectedLanguage = interaction.values[0];
        translateCommand.setUserLanguage(interaction.user.id, selectedLanguage);
        
        await interaction.reply(translateCommand.getTranslation(
            interaction.user.id, 
            'languageSet'
        ));
    }
});

// Login to Discord with the token
client.login(TOKEN);
