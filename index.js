const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();
const translateCommand = require('./bot/translate');
const channelCommand = require('./commands/channelcommand');
const { Collection } = require('discord.js');

// Initialize Discord client with the required intents
// [Inisialisasi klien Discord dengan intents yang diperlukan]
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ],
});

client.commands = new Collection();

// Tambahkan ini sebelum commandFiles
// [Add this before commandFiles]
const commands = [];

// Daftarkan commands ke collection dan array commands
// [Register commands to collection and commands array]
const commandFiles = [channelCommand, translateCommand];
commandFiles.forEach(command => {
    if (Array.isArray(command.data)) {
        // Handle array of commands (for channelCommand)
        // [Menangani array perintah (untuk channelCommand)]
        command.data.forEach(cmd => {
            client.commands.set(cmd.name, command);
            commands.push(cmd.toJSON());
        });
    } else if (command.data) {
        // Handle single command (for translateCommand)
        // [Menangani perintah tunggal (untuk translateCommand)]
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }
});

// Tambahkan fungsi untuk mendaftarkan slash commands
// [Add function to register slash commands]
async function deployCommands() {
    try {
        const rest = new REST({ version: '10' }).setToken(TOKEN);
        console.log('Mulai mendaftarkan application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('Berhasil mendaftarkan application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

// Panggil fungsi deployCommands setelah client ready
// [Call deployCommands function after client is ready]
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    deployCommands();
});

const TOKEN = process.env.DISCORD_TOKEN;

// Import command handlers
// [Impor penangan perintah]
const pingCommand = require('./commands/ping');
const infoguildCommand = require('./commands/infoguild');
const infousersCommand = require('./commands/infousers');
const pfpCommand = require('./commands/pfp');
const bothelpCommand = require('./commands/bothelp');

// Event listener for messages created
// [Pendengar event untuk pesan yang dibuat]
client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    // [Abaikan pesan dari bot]
    if (message.author.bot) return;

    // Get user's language
    // [Dapatkan bahasa pengguna]
    const userLang = translateCommand.getUserLanguage(message.author.id);

    // Command untuk mengubah bahasa
    // [Command to change language]
    if (message.content === '/language') {
        translateCommand.execute(message);
    }

    // Command lain tetap menggunakan prefix !
    // [Other commands still use prefix !]
    if (message.content === '!ping') {
        const ping = Date.now() - message.createdTimestamp;
        message.reply(translateCommand.getTranslation(message.author.id, 'ping', { ping }));
    }

    // Bot mention response with translation
    // [Respons mention bot dengan terjemahan]
    const botMention = `halo <@${client.user.id}>`;
    if (message.content.toLowerCase() === botMention.toLowerCase()) {
        message.reply(translateCommand.getTranslation(message.author.id, 'welcome', { 
            user: message.author 
        }));
    }

    // Check for other commands
    // [Periksa perintah lainnya]
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

// Handle slash commands
// [Menangani perintah slash]
client.on('interactionCreate', async interaction => {
    // Handle menu selection
    // [Menangani pemilihan menu]
    if (interaction.isStringSelectMenu()) {
        // Handle language selection
        // [Menangani pemilihan bahasa]
        if (interaction.customId === 'select_language') {
            const selectedLanguage = interaction.values[0];
            translateCommand.setUserLanguage(interaction.user.id, selectedLanguage);
            
            await interaction.reply({
                content: translateCommand.getTranslation(
                    interaction.user.id, 
                    'languageSet'
                ),
                ephemeral: true 
            });
            return;
        }

        // Handle channel creation
        // [Menangani pembuatan channel]
        if (interaction.customId.startsWith('create_channel_')) {
            const command = client.commands.get('createch');
            await command.handleCategorySelect(interaction);
            return;
        }
    }

    // Handle slash commands
    // [Menangani perintah slash]
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        if (interaction.commandName === 'createch') {
            await command.createChannel(interaction);
        } else if (interaction.commandName === 'deletech') {
            await command.deleteChannel(interaction);
        } else if (interaction.commandName === 'language') {
            await command.execute(interaction);
        }
    } catch (error) {
        console.error(error);
        await interaction.reply({ 
            content: translateCommand.getTranslation(interaction.user.id, 'channelError', {
                error: error.message
            }),
            ephemeral: true 
        });
    }
});

// Login to Discord with the token
// [Login ke Discord dengan token]
client.login(TOKEN);
