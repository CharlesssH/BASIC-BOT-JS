const { EmbedBuilder } = require('discord.js');
const translateCommand = require('../bot/translate');

module.exports = {
    name: 'bothelp',
    description: 'Menampilkan daftar command bot',
    execute(message) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(translateCommand.getTranslation(message.author.id, 'helpTitle'))
            .setDescription(translateCommand.getTranslation(message.author.id, 'helpDesc'))
            .addFields(
                { 
                    name: `🤖 ${translateCommand.getTranslation(message.author.id, 'basicCommands')}`, 
                    value: 
                    '`!ping` - Ping Bot\n' +
                    '`!bothelp` - Help Command\n' +
                    'halo @CharLabs - Greeting Bot',
                    inline: false 
                },
                { 
                    name: `📊 ${translateCommand.getTranslation(message.author.id, 'infoCommands')}`, 
                    value: 
                    '`!infoguild` - Server Info\n' +
                    '`!infousers @user` - User Info\n' +
                    '`!pfp @user` - Profile Picture',
                    inline: false 
                }
            )
            .addFields({
                name: `👨‍💻 ${translateCommand.getTranslation(message.author.id, 'botAuthor')}`,
                value: '`Charles Lienhart`\nGithub: (https://github.com/CharlesssH)',
                inline: false
            })
            .setThumbnail(message.client.user.displayAvatarURL())
            .setFooter({ 
                text: 'CharLabs - Your Partner Intelligent', 
                iconURL: message.client.user.displayAvatarURL() 
            })
            .setTimestamp();

        message.reply({ embeds: [helpEmbed] });
    },
};
