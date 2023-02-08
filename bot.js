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
    ess.logon(client);
});

client.on("messageCreate", async (msg) => {
    try {
        if (msg.content.toLocaleLowerCase().startsWith('~say ')) {
            if (ess.sets.untouchable.includes(msg.author.id) && msg.author.id == ess.sets.untouchable[0]) {
                const splt = msg.content.split(" ");
                let chan = client.channels.cache.get(splt[1]);
                if (chan) {
                    var initLogData = ess.timeAndUInfoLog(ess, msg, console);
                    fs.appendFile("logs.txt", initLogData, (err) => { if (err) throw err; console.log("Logged Data"); });
                    chan.send(msg.content.slice((6+(splt[1].length))));
                }
            }
        }
        if (msg.content.toLowerCase().startsWith('~sex')) {
            const tm = setTimeout(function() { msg.reply({content: "Sexing - Please Wait..."}); }, 10);
            if (msg.mentions.members.first()) {
                if (msg.mentions.members.at(1)) {
                    if (msg.mentions.members.at(1).id.toString() === "422438661993529364") {
                        const tm3 = setTimeout(function() { if (!msg) { return; } msg.reply({content: "Sex Complete - Average Sexiness Level: `".concat(((Math.floor(Math.random() * 52)-1)+55).toString().concat("%`\n(Ejaculation Within `".concat(((Math.floor(Math.random() * 25))+30).toString().concat(".".concat((Math.floor(Math.random() * 99)).toString().concat("` Seconds )"))))))}); }, 3000);
                    } else {
                        const tm2 = setTimeout(function() { if (!msg) { return; } msg.reply({content: "Sex Complete - Average Sexiness Level: `".concat((Math.floor(Math.random() * 102)-1).toString().concat("%`\n(Ejaculation Within `".concat((Math.floor(Math.random() * 25)).toString().concat(".".concat((Math.floor(Math.random() * 99)).toString().concat("` Seconds )"))))))}); }, 3000);
                    }
                } else {
                    console.log("Sorta Legit Version");
                    const tm2 = setTimeout(function() { if (!msg) { return; } msg.reply({content: "Sex Complete - Average Sexiness Level: `".concat((Math.floor(Math.random() * 102)-1).toString().concat("%`\n(Ejaculation Within `".concat((Math.floor(Math.random() * 25)).toString().concat(".".concat((Math.floor(Math.random() * 99)).toString().concat("` Seconds )"))))))}); }, 3000);
                }
            } else {
                const tm2 = setTimeout(function() { if (!msg) { return; } msg.reply({content: "Sex Complete - Average Sexiness Level: `".concat((Math.floor(Math.random() * 102)-1).toString().concat("%`\n(Ejaculation Within `".concat((Math.floor(Math.random() * 25)).toString().concat(".".concat((Math.floor(Math.random() * 99)).toString().concat("` Seconds )"))))))}); }, 3000);
            }
        }
        if (msg.content.toLowerCase().startsWith('~rape ')) {
            const tm = setTimeout(function() { msg.reply("Raping - Please Wait..."); }, 10);
            const txtRt = msg.content.slice(6);
            var txtRtr = txtRt;
            if (msg.content.match("@everyone")) { txtRtr = txtRt.replace("@everyone", "everyone"); }
            if (msg.content.match("@here")) { txtRtr = txtRt.replace("@here", "here"); }
            const txtS = txtRtr;
            //const txtS = txtRtr.replace("@", "");
            const arr = Math.floor(Math.random() * 3);
            if (arr === 2) {
                const tm = setTimeout(function() { if (!msg) { return; } msg.channel.send({ content: "<@"+msg.author.id+">, you raped ".concat(txtS.concat(". You were arrested and charged.")), allowedMentions: { parse: [] }}); }, 3000);
            } else {
                const tm = setTimeout(function() { if (!msg) { return; } msg.channel.send({ content: "<@"+msg.author.id+">, you raped ".concat(txtS.concat(". You got off scott free!")), allowedMentions: { parse: [] }}); }, 3000);
            }
        }
        if (msg.content.toLowerCase().startsWith('~shop')) {
            const splt = msg.content.split(" ");
            const pages = [ess.shopItemsString(ess, 0, msg), ess.shopItemsString(ess, 1, msg), ess.shopItemsString(ess, 2, msg)];
            if (splt[1] == "1") {
                msg.reply("__**Shop**__\n".concat(pages[0]));
                return;
            }
            if (splt[1] == "2") {
                msg.reply("__**Shop**__\n".concat(pages[1]));
                return;
            }
            if (splt[1] == "3") {
                msg.reply("__**Shop**__\n".concat(pages[2]));
                return;
            }
            msg.reply("Wilkommen! Use in integer `(1-3)` to select the shop page.");
        }
        if (msg.content.toLowerCase().startsWith('~buy')) {
            const splt = msg.content.split(" ");
            ess.buyItem(ess, msg.author.id, splt[1], splt[2], msg);
        }
        if (msg.content.toLowerCase().startsWith('~info')) {
            const splt = msg.content.split(" ");
            const ssm = ess.getItemInfo(ess, (parseInt(splt[1])-1), (parseInt(splt[2])-1), msg);
            if (ssm) {
                msg.reply(ssm);
            }
        }
        if (msg.content.toLowerCase().startsWith('~balance')) {
            const usr = msg.mentions.users.first();
            if (usr) {
                const mon = ess.getBal(usr.id);
                if (!mon) {
                    return;
                }
                msg.reply("User <@"+usr.id+"> has $"+mon);
                console.log("Balance got "+usr.id);
            } else {
                const mon = ess.getBal(msg.author.id);
                if (!mon) {
                    return;
                }
                msg.reply("User <@"+msg.author.id+"> has $"+mon);
                console.log("Balance got "+msg.author.id);
            }
        }
        if (msg.content.toLowerCase().startsWith('~help')) {
            msg.reply("__**Commands**__\n \n`~balance [@user:optional]` - Returns balance of user or mention.\n`~buy [page:int] [item:int]` - Purchases the item with the position on the gvien page.\n`~rape [target:@user]` - Rapes the mentioned user.\n`~sex [target:any]` - Sexes the target.\n`~shop [page:int]` - Shows the given page in the shop.\n`~vote [(kick/ban)]` - Initiates vote for option. Only available in servers where the bot is the owner.\n`~logfile` - Uploads the logs file. Only available in servers where the bot is the owner.");
        }
        if (msg.content.startsWith("~vote ")) {
            if (msg.guild.ownerId != client.user.id) {
                msg.reply("N-nya? Master, it appears I'm less dominant in these circumstances... o///o");
                return;
            }
            const splt = msg.content.split(" ");
            if ((splt[1]) == "kick") {
                var initLogData = ess.timeAndUInfoLog(ess, msg, console);
                fs.appendFile("logs.txt", initLogData, (err) => { if (err) throw err; console.log("Logged Data"); });
                if (msg.mentions.everyone == false && msg.mentions.users.first()) {
                    const candite = msg.mentions.users.first();
                    var resp = await msg.channel.send({content:"@everyone\n__**Kick Member Vote**__\n \n<@"+msg.author.id+"> has called a vote to kick <@"+msg.mentions.users.first().id+">\n \nTo vote `Yes`, react with :white_check_mark:\nOtherwise, do not vote. If 2/3 of the server chooses `Yes`, the user will be kicked.\nIf that number is not reached within 6 hours, the vote will be cancelled.",fetchReply:true});
                    resp.react("✅");
                    const tm = setTimeout(
                        function() {
                            if (!resp) { return; }
                            if (Math.floor(msg.guild.memberCount*(2/3)) <= msg.reactions.cache.size-1) {
                                msg.guild.members.kick(candite);
                            }
                        }, 21600000
                    );
                }
            }
            if ((splt[1]) == "ban") {
                var initLogData = ess.timeAndUInfoLog(ess, msg, console);
                fs.appendFile("logs.txt", initLogData, (err) => { if (err) throw err; console.log("Logged Data"); });
                if (msg.mentions.everyone == false && msg.mentions.users.first()) {
                    const candite = msg.mentions.users.first();
                    var resp = await msg.channel.send({content:"@everyone\n__**Ban Member Vote**__\n \n<@"+msg.author.id+"> has called a vote to ban <@"+msg.mentions.users.first().id+">\n \nTo vote `Yes`, react with :white_check_mark:\nOtherwise, do not vote. If 2/3 of the server chooses `Yes`, the user will be banned.\nIf that number is not reached within 6 hours, the vote will be cancelled.",fetchReply:true});
                    resp.react("✅");
                    const tm = setTimeout(
                        function() {
                            if (!resp) { return; }
                            if (Math.floor(msg.guild.memberCount*(2/3)) <= msg.reactions.cache.size-1) {
                                msg.guild.members.ban(candite);
                            }
                        }, 21600000
                    );
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
            if (msg.guild.ownerId != client.user.id) {
                msg.reply("N-nya? Master, it appears I'm less dominant in these circumstances... o///o");
                return;
            }
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