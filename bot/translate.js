const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const userLanguages = new Map();


const translations = {
    indonesia: {
        ping: "Ping kamu adalah {ping}ms.",
        welcome: "Halo {user}! Saya adalah CharLabs, partner intelligent Anda!",
        selectLanguage: "Pilih bahasa yang Anda inginkan:",
        languageSet: "Bahasa telah diubah ke Bahasa Indonesia",
        helpTitle: "Daftar Perintah CharLabs",
        helpDesc: "Berikut adalah daftar perintah yang tersedia:",
        basicCommands: "Perintah Dasar",
        infoCommands: "Perintah Informasi",
        botAuthor: "Dibuat oleh",
        pfpTitle: "Foto Profil {username}",
        downloadAvatar: "Unduh Avatar",
        requestedBy: "Diminta oleh {username}",
        userInfo: "Informasi {username}",
        username: "Nama Pengguna",
        userId: "ID Pengguna",
        status: "Status",
        accountCreated: "Akun Dibuat",
        joinedServer: "Bergabung Server",
        activity: "Aktivitas",
        currentRole: "Role Saat Ini",
        guildInfo: "Informasi Server {guildname}",
        totalMembers: "Total Anggota",
        users: "Pengguna",
        bots: "Bot",
        online: "Online",
        offline: "Offline",
        serverCreated: "Server Dibuat",
        serverId: "ID Server"
    },
    english: {
        ping: "Your ping is {ping}ms.",
        welcome: "Hello {user}! I am CharLabs, your intelligent partner!",
        selectLanguage: "Select your preferred language:",
        languageSet: "Language has been set to English",
        helpTitle: "CharLabs Command List",
        helpDesc: "Here are the available commands:",
        basicCommands: "Basic Commands",
        infoCommands: "Information Commands",
        botAuthor: "Created by",
        pfpTitle: "{username}'s Profile Picture",
        downloadAvatar: "Download Avatar",
        requestedBy: "Requested by {username}",
        userInfo: "{username}'s Information",
        username: "Username",
        userId: "User ID",
        status: "Status",
        accountCreated: "Account Created",
        joinedServer: "Joined Server",
        activity: "Activity",
        currentRole: "Current Role",
        guildInfo: "{guildname} Server Information",
        totalMembers: "Total Members",
        users: "Users",
        bots: "Bots",
        online: "Online",
        offline: "Offline",
        serverCreated: "Server Created",
        serverId: "Server ID"
    },
    chinese: {
        ping: "您的延迟是 {ping}ms。",
        welcome: "你好 {user}！我是 CharLabs，您的智能伙伴！",
        selectLanguage: "选择您喜欢的语言：",
        languageSet: "语言已设置为中文",
        helpTitle: "CharLabs 命令列表",
        helpDesc: "以下是可用的命令：",
        basicCommands: "基本命令",
        infoCommands: "信息命令",
        botAuthor: "创建者",
        pfpTitle: "{username}的头像",
        downloadAvatar: "下载头像",
        requestedBy: "由 {username} 请求",
        userInfo: "{username}的信息",
        username: "用户名",
        userId: "用户ID",
        status: "状态",
        accountCreated: "账号创建时间",
        joinedServer: "加入服务器时间",
        activity: "活动",
        currentRole: "当前身份组",
        guildInfo: "{guildname} 服务器信息",
        totalMembers: "总成员数",
        users: "用户",
        bots: "机器人",
        online: "在线",
        offline: "离线",
        serverCreated: "服务器创建时间",
        serverId: "服务器ID"
    },
    dutch: {
        ping: "Uw ping is {ping}ms.",
        welcome: "Hallo {user}! Ik ben CharLabs, uw intelligente partner!",
        selectLanguage: "Selecteer uw voorkeurstaal:",
        languageSet: "Taal is ingesteld op Nederlands",
        helpTitle: "CharLabs Opdrachtlijst",
        helpDesc: "Hier zijn de beschikbare opdrachten:",
        basicCommands: "Basis Opdrachten",
        infoCommands: "Informatie Opdrachten",
        botAuthor: "Gemaakt door",
        pfpTitle: "Profielfoto van {username}",
        downloadAvatar: "Download Avatar",
        requestedBy: "Aangevraagd door {username}",
        userInfo: "Informatie over {username}",
        username: "Gebruikersnaam",
        userId: "Gebruikers-ID",
        status: "Status",
        accountCreated: "Account Aangemaakt",
        joinedServer: "Server Toegetreden",
        activity: "Activiteit",
        currentRole: "Huidige Rol",
        guildInfo: "{guildname} Server Informatie",
        totalMembers: "Totaal Aantal Leden",
        users: "Gebruikers",
        bots: "Bots",
        online: "Online",
        offline: "Offline",
        serverCreated: "Server Aangemaakt",
        serverId: "Server-ID"
    }
};

module.exports = {
    name: 'language',
    description: 'Mengubah bahasa bot',
    execute(message) {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select_language')
                    .setPlaceholder('Pilih Bahasa / Select Language')
                    .addOptions([
                        {
                            label: 'Indonesia',
                            description: 'Gunakan Bahasa Indonesia',
                            value: 'indonesia',
                            emoji: '🇮🇩'
                        },
                        {
                            label: 'English',
                            description: 'Use English Language',
                            value: 'english',
                            emoji: '🇬🇧'
                        },
                        {
                            label: '中文',
                            description: '使用中文',
                            value: 'chinese',
                            emoji: '🇨🇳'
                        },
                        {
                            label: 'Nederlands',
                            description: 'Gebruik Nederlandse taal',
                            value: 'dutch',
                            emoji: '🇳🇱'
                        },
                    ]),
            );

        message.reply({
            content: 'Select your language / Pilih bahasa:',
            components: [row]
        });
    },


    getTranslation(userId, key, replacements = {}) {
        const userLang = userLanguages.get(userId) || 'indonesia';
        let text = translations[userLang][key] || translations['indonesia'][key];
        
        // Ganti placeholder dengan nilai yang sesuai
        Object.keys(replacements).forEach(key => {
            text = text.replace(`{${key}}`, replacements[key]);
        });
        
        return text;
    },

    setUserLanguage(userId, language) {
        userLanguages.set(userId, language);
    },

    getUserLanguage(userId) {
        return userLanguages.get(userId) || 'indonesia';
    }
};
