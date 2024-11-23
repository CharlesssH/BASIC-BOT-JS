const { EmbedBuilder } = require('discord.js');
const translateCommand = require('../bot/translate');

module.exports = {
    name: 'infousers',
    description: 'Menampilkan informasi detail pengguna',
    async execute(message) {
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply(translateCommand.getTranslation(message.author.id, 'mentionUser'));
        }

        const member = message.guild.members.cache.get(user.id);
        const status = member.presence ? member.presence.status : 'offline';
        const activity = member.presence?.activities[0];

        const userEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(translateCommand.getTranslation(message.author.id, 'userInfo', { username: user.username }))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        userEmbed.addFields([
            { 
                name: `👤 ${translateCommand.getTranslation(message.author.id, 'username')}`, 
                value: user.tag, 
                inline: true 
            },
            { 
                name: `🆔 ${translateCommand.getTranslation(message.author.id, 'userId')}`, 
                value: user.id, 
                inline: true 
            },
            { 
                name: `📊 ${translateCommand.getTranslation(message.author.id, 'status')}`, 
                value: translateCommand.getTranslation(message.author.id, status), 
                inline: true 
            },
            { 
                name: `📅 ${translateCommand.getTranslation(message.author.id, 'accountCreated')}`, 
                value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, 
                inline: true 
            },
            { 
                name: `📥 ${translateCommand.getTranslation(message.author.id, 'joinedServer')}`, 
                value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, 
                inline: true 
            }
        ]);

        if (activity) {
            let activityInfo = translateCommand.getTranslation(message.author.id, 'activity') + ': ';
            switch (activity.type) {
                case 0:
                    activityInfo += `🎮 ${activity.name}`;
                    break;
                case 1:
                    activityInfo += `🎭 ${activity.name}`;
                    break;
                case 2:
                    activityInfo += `🎵 ${activity.name}`;
                    break;
                case 3:
                    activityInfo += `📺 ${activity.name}`;
                    break;
                case 4:
                    activityInfo += `${activity.emoji || ''} ${activity.state || activity.name}`;
                    break;
                case 5:
                    activityInfo += `🏆 ${activity.name}`;
                    break;
            }
            userEmbed.addFields([
                { 
                    name: '🎯 Activity', 
                    value: activityInfo, 
                    inline: false 
                }
            ]);
        }

        const currentRole = member.roles.hoist;
        if (currentRole && currentRole.name !== '@everyone') {
            userEmbed.addFields([
                { 
                    name: `👑 ${translateCommand.getTranslation(message.author.id, 'currentRole')}`, 
                    value: `${currentRole.toString()} (${currentRole.name})`, 
                    inline: false 
                }
            ]);
        }

        userEmbed.setFooter({ 
            text: translateCommand.getTranslation(message.author.id, 'requestedBy', { 
                username: message.author.tag 
            })
        })
        .setTimestamp();

        message.reply({ embeds: [userEmbed] });
    },
};
