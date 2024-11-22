const { EmbedBuilder } = require('discord.js');
const translateCommand = require('../bot/translate');

module.exports = {
    name: 'infoguild',
    description: 'Menampilkan informasi server',
    execute(message) {
        const guild = message.guild;
        
        const totalMembers = guild.memberCount;
        const botCount = guild.members.cache.filter(member => member.user.bot).size;
        const userCount = totalMembers - botCount;
        const onlineUsers = guild.members.cache.filter(member => 
            member.presence?.status === 'online' || 
            member.presence?.status === 'dnd' || 
            member.presence?.status === 'idle'
        ).size;
        const offlineUsers = totalMembers - onlineUsers;

        const serverEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(translateCommand.getTranslation(message.author.id, 'guildInfo', { guildname: guild.name }))
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { 
                    name: `📊 ${translateCommand.getTranslation(message.author.id, 'totalMembers')}`, 
                    value: `${totalMembers}`, 
                    inline: true 
                },
                { 
                    name: `👥 ${translateCommand.getTranslation(message.author.id, 'users')}`, 
                    value: `${userCount}`, 
                    inline: true 
                },
                { 
                    name: `🤖 ${translateCommand.getTranslation(message.author.id, 'bots')}`, 
                    value: `${botCount}`, 
                    inline: true 
                },
                { 
                    name: `🟢 ${translateCommand.getTranslation(message.author.id, 'online')}`, 
                    value: `${onlineUsers}`, 
                    inline: true 
                },
                { 
                    name: `⚫ ${translateCommand.getTranslation(message.author.id, 'offline')}`, 
                    value: `${offlineUsers}`, 
                    inline: true 
                },
                { 
                    name: `📅 ${translateCommand.getTranslation(message.author.id, 'serverCreated')}`, 
                    value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, 
                    inline: true 
                }
            )
            .setFooter({ 
                text: `${translateCommand.getTranslation(message.author.id, 'serverId')}: ${guild.id}` 
            })
            .setTimestamp();

        message.reply({ embeds: [serverEmbed] });
    },
};