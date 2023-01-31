const Discord = require("discord.js");
const xml = require("xmlhttprequest");
const fs = require("fs");
const ess = require("./essentials.js");
const mainDate = new Date();

//const botIntent = new Discord.Intents();
//prolly old api i forgor why remove

var botIntent = [];
//botIntent.add(Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING);
//javascript sex broke or something

botIntent.push(Discord.IntentsBitField.Flags.GuildBans, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.GuildMembers, Discord.IntentsBitField.Flags.GuildPresences, Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessageTyping, Discord.IntentsBitField.Flags.GuildIntegrations, Discord.IntentsBitField.Flags.Guilds);
const client = new Discord.Client({ intents: botIntent });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(
        "Sex in 4K HD 108p live on PornHub", 
        {
            type : Discord.ActivityType.Watching,
        }
    );
});

const gls = client.guilds.cache.map(gd => gd);

client.on("messageCreate", (msg) => {
    try {
        if (msg.content.startsWith("~vote ")) {
            const splt = msg.content.split(" ");
            if ((splt[1]) == "kick") {
                if (msg.mentions.everyone == false && msg.mentions.users.first()) {
                    var resp = msg.channel.send("<@everyone>\n__**Kick Member Vote**__\n \n<@${msg.author.id}> has called a vote to kick <@msg.mentions.users.first().id>\n \nTo vote `Yes`, react with :white_check_mark:\nOtherwise, do not vote. If 2/3 of the server chooses `Yes`, the user will be kicked.\nIf that number is not reached within 12 hours, the vote will be cancelled.");
                    msg.react("✅");
                }
            }
        }
        if (msg.content.startsWith("~flash")) {
            return;
            //patched sex not loading due to shitty scripting
            if (msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                ess.timeAndUInfoLog(ess, msg, console);
                fs.appendFile("logs.txt", initLogData, (err) => { if (err) throw err; console.log("Logged Data"); });
                if (msg.mentions.users.first()) {
                    if (!msg.mentions.users.has(client.user) && msg.mentions.everyone == false && msg.mentions.repliedUser == null && ess.isBot(msg.mentions.users) == false) {
                        ess.locateFlashable(msg.mentions.users, msg.mentions.members, ess.sets);
                    }
                }
            }
        }
        if (msg.content.startsWith("~logfile")) {
            //set to only work for administrators, but ig that shit isn't gonna work lmfao
            if (msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                msg.channel.send({files: [{ attachment: "logs.txt" }]});
                ess.timeAndUInfoLog(ess, msg, console);
            }
        }
    } catch(err) {
        if (err.toString().match("ReferenceError: ess") || err.toString().match("ReferenceError: initLogData")) { return; }
        console.log(err);
        //this shit's supposed to run when the bot crashes or whatever: did I remember all failsafes?
        ess.crash(client);
    }
});

client.login(ess.sets.token);