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
        serverId: "ID Server",
        createChannelSuccess: "✅ Channel {channelName} berhasil dibuat di kategori {categoryName}!",
        deleteChannelSuccess: "✅ Channel {channelName} berhasil dihapus!",
        channelError: "❌ Terjadi kesalahan: {error}",
        noPermission: "❌ Anda tidak memiliki izin untuk melakukan ini!",
        invalidCategory: "❌ Kategori tidak ditemukan!",
        invalidChannel: "❌ Channel tidak ditemukan!",
        channelExists: "❌ Channel dengan nama tersebut sudah ada!",
        selectCategory: "Pilih kategori untuk channel baru:",
        provideName: "❌ Mohon berikan nama channel! Contoh: /createch general",
        provideChannel: "❌ Mohon mention channel yang ingin dihapus! Contoh: /deletech #general",
        createChannelDesc: 'Membuat channel baru',
        deleteChannelDesc: 'Menghapus channel',
        channelNameDesc: 'Nama channel yang akan dibuat',
        channelToDeleteDesc: 'Channel yang akan dihapus'
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
        serverId: "Server ID",
        createChannelSuccess: "✅ Channel {channelName} has been created in {categoryName} category!",
        deleteChannelSuccess: "✅ Channel {channelName} has been deleted!",
        channelError: "❌ An error occurred: {error}",
        noPermission: "❌ You don't have permission to do this!",
        invalidCategory: "❌ Category not found!",
        invalidChannel: "❌ Channel not found!",
        channelExists: "❌ A channel with that name already exists!",
        selectCategory: "Select a category for the new channel:",
        provideName: "❌ Please provide a channel name! Example: /createch general",
        provideChannel: "❌ Please mention the channel to delete! Example: /deletech #general",
        createChannelDesc: 'Create a new channel',
        deleteChannelDesc: 'Delete a channel',
        channelNameDesc: 'The name of the channel',
        channelToDeleteDesc: 'The channel to delete'
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
        serverId: "服务器ID",
        createChannelSuccess: "✅ 频道 {channelName} 已在 {categoryName} 类别中创建！",
        deleteChannelSuccess: "✅ 频道 {channelName} 已被删除！",
        channelError: "❌ 发生错误：{error}",
        noPermission: "❌ 您没有权限执行此操作！",
        invalidCategory: "❌ 未找到类别！",
        invalidChannel: "❌ 未找到频道！",
        channelExists: "❌ 该名称的频道已存在！",
        selectCategory: "选择新频道的类别：",
        provideName: "❌ 请提供频道名称！示例：/createch general",
        provideChannel: "❌ 请提及要删除的频道！示例：/deletech #general",
        createChannelDesc: '创建新频道',
        deleteChannelDesc: '删除频道',
        channelNameDesc: '要创建的频道名称',
        channelToDeleteDesc: '要删除的频道'
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
        serverId: "Server-ID",
        createChannelSuccess: "✅ Kanaal {channelName} is aangemaakt in categorie {categoryName}!",
        deleteChannelSuccess: "✅ Kanaal {channelName} is verwijderd!",
        channelError: "❌ Er is een fout opgetreden: {error}",
        noPermission: "❌ Je hebt geen toestemming om dit te doen!",
        invalidCategory: "❌ Categorie niet gevonden!",
        invalidChannel: "❌ Kanaal niet gevonden!",
        channelExists: "❌ Er bestaat al een kanaal met die naam!",
        selectCategory: "Selecteer een categorie voor het nieuwe kanaal:",
        provideName: "❌ Geef een kanaalnaam op! Voorbeeld: /createch general",
        provideChannel: "❌ Vermeld het te verwijderen kanaal! Voorbeeld: /deletech #general",
        createChannelDesc: 'Maak een nieuw kanaal',
        deleteChannelDesc: 'Verwijder een kanaal',
        channelNameDesc: 'De naam van het kanaal',
        channelToDeleteDesc: 'Het kanaal om te verwijderen'
    }
};

module.exports = {
    data: {
        name: 'language',
        description: 'Mengubah bahasa bot',
        toJSON() {
            return {
                name: this.name,
                description: this.description,
                description_localizations: {
                    'id': 'Mengubah bahasa bot',
                    'en-US': 'Change bot language',
                    'zh-CN': '更改机器人语言',
                    'nl': 'Verander bot taal'
                }
            };
        }
    },
    
    async execute(interaction) {
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

        await interaction.reply({
            content: 'Select your language / Pilih bahasa:',
            components: [row],
            ephemeral: true
        });
    },


    getTranslation(userId, key, replacements = {}, forceLang = null) {
        const userLang = forceLang || userLanguages.get(userId) || 'indonesia';
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
