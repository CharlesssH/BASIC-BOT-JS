const { SlashCommandBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const translateCommand = require('../bot/translate');
require('dotenv').config();

module.exports = {
    data: [
        new SlashCommandBuilder()
            .setName('createch')
            .setDescription('Create a new channel')
            .addStringOption(option =>
                option.setName('name')
                    .setDescription('The name of the channel')
                    .setRequired(true)
            ),
        new SlashCommandBuilder()
            .setName('deletech')
            .setDescription('Delete a channel')
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('The channel to delete')
                    .setRequired(true)
            )
    ],
    
    getLocalizedCommands(userId) {
        return [
            new SlashCommandBuilder()
                .setName('createch')
                .setDescription(translateCommand.getTranslation(userId, 'createChannelDesc'))
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription(translateCommand.getTranslation(userId, 'channelNameDesc'))
                        .setRequired(true)
                ),
            new SlashCommandBuilder()
                .setName('deletech')
                .setDescription(translateCommand.getTranslation(userId, 'deleteChannelDesc'))
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription(translateCommand.getTranslation(userId, 'channelToDeleteDesc'))
                        .setRequired(true)
                )
        ];
    },
    
    async createChannel(interaction) {
        // Check if user is owner
        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({
                content: translateCommand.getTranslation(interaction.user.id, 'noPermission'),
                ephemeral: true
            });
        }

        const channelName = interaction.options.getString('name');
        
        // Get all categories
        const categories = interaction.guild.channels.cache.filter(c => c.type === 4);
        
        // Create select menu for categories
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`create_channel_${channelName}`)
                    .setPlaceholder(translateCommand.getTranslation(interaction.user.id, 'selectCategory'))
                    .addOptions(
                        categories.map(category => ({
                            label: category.name,
                            value: category.id
                        }))
                    )
            );

        await interaction.reply({
            content: translateCommand.getTranslation(interaction.user.id, 'selectCategory'),
            components: [row],
            ephemeral: true
        });
    },

    async deleteChannel(interaction) {
        // Check if user is owner
        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({
                content: translateCommand.getTranslation(interaction.user.id, 'noPermission'),
                ephemeral: true
            });
        }

        const channel = interaction.options.getChannel('channel');
        
        try {
            await channel.delete();
            interaction.reply({
                content: translateCommand.getTranslation(interaction.user.id, 'deleteChannelSuccess', {
                    channelName: channel.name
                }),
                ephemeral: true
            });
        } catch (error) {
            interaction.reply({
                content: translateCommand.getTranslation(interaction.user.id, 'channelError', {
                    error: error.message
                }),
                ephemeral: true
            });
        }
    },

    async handleCategorySelect(interaction) {
        // Check if user is owner
        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({
                content: translateCommand.getTranslation(interaction.user.id, 'noPermission'),
                ephemeral: true
            });
        }

        const [, channelName] = interaction.customId.split('create_channel_');
        const categoryId = interaction.values[0];
        const category = interaction.guild.channels.cache.get(categoryId);

        if (!category) {
            return interaction.reply({
                content: translateCommand.getTranslation(interaction.user.id, 'invalidCategory'),
                ephemeral: true
            });
        }

        try {
            const newChannel = await interaction.guild.channels.create({
                name: channelName,
                type: 0,
                parent: categoryId
            });

            interaction.reply({
                content: translateCommand.getTranslation(interaction.user.id, 'createChannelSuccess', {
                    channelName: newChannel.name,
                    categoryName: category.name
                }),
                ephemeral: true
            });
        } catch (error) {
            interaction.reply({
                content: translateCommand.getTranslation(interaction.user.id, 'channelError', {
                    error: error.message
                }),
                ephemeral: true
            });
        }
    }
};
