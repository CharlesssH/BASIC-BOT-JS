const { EmbedBuilder } = require('discord.js');
const translateCommand = require('../bot/translate');

module.exports = {
    name: 'pfp',
    description: 'Menampilkan foto profil user',
    execute(message) {
        const user = message.mentions.users.first() || message.author;
        const userLang = translateCommand.getUserLanguage(message.author.id);
        
        const avatarEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(translateCommand.getTranslation(message.author.id, 'pfpTitle', { username: user.username }))
            .setDescription(translateCommand.getTranslation(message.author.id, 'downloadAvatar'))
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setFooter({ 
                text: translateCommand.getTranslation(message.author.id, 'requestedBy', { 
                    username: message.author.tag 
                })
            })
            .setTimestamp();

        message.reply({ embeds: [avatarEmbed] });
    },
};
