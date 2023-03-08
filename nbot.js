const Discord = require('discord.js');
const { Client, EmbedBuilder, Events, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');
const fs = require("fs");
const ess = require("./essentials.js");
const voice = require('@discordjs/voice');
const { messageLink } = require("discord.js");
const { join } = require("node:path");
const { allowedNodeEnvironmentFlags } = require("process");
const { request } = require('http');
const xml = require("xmlhttprequest");
//for the play command
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
  } = require('@discordjs/voice');

let dispatcher;
let queue = [];
const { exec } = require('child_process');
const DEFAULT_SAMPLE_RATE = 8000;
const DEFAULT_DURATION = 30;
const mainDate = new Date();

//const botIntent = new Discord.Intents();
//prolly old api i forgor why remove

botIntent.push(Discord.IntentsBitField.Flags.GuildBans, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.GuildMembers, Discord.IntentsBitField.Flags.GuildPresences, Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessageTyping, Discord.IntentsBitField.Flags.GuildIntegrations, Discord.IntentsBitField.Flags.Guilds);
const client = new Discord.Client({ intents: botIntent });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(
        "~help~sex~shibe", 
        {
            type : Discord.ActivityType.Playing,
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

        if (msg.content.toLowerCase().startsWith('~help')) {
            msg.reply("__**All Commands**__\n \n`~balance [@user:optional]` - Returns balance of user or mention.\n`~buy [page:int] [item:int]` - Purchases the item with the position on the given page.\n`~info [(job/item)] [page:int] [obj:int]` - Gets information about the object on the given page of the given category.\n`~job [(work/apply/quit/current)] (apply){[page:int] [job:int]}` - Applies for, leaves, or works at a job. Work provides money and XP. Current displays job name.\n`~jobs [page:int]` - Shows the given page in the job listing.\n`~sex [target:any]` - Sexes the target.\n`~shop [page:int]` - Shows the given page in the shop.\n`~vote [(kick/ban)]` - Initiates vote for option. Only available in servers where the bot is the owner.\n`~logfile` - Uploads the logs file. Only available in servers where the bot is the owner.\n`~valentine [(ask/get/del)] (ask){[target:@user]}` - Asks, gets, or removes a valentine.\n`~xp [target:@user]` - Gets the XP of the user or mention.\n`~ping` - Developer Command to see how much latency there is\n`~whopper` - shitpost whopper meme\n `~kidnap`- kidnaps you cutely (SATIRE) \n `~shibe`  - gets you shibe pics \n `~cat` - gets you kitty cat pics \n `~bird` - gets you birdie pictures \n `~eval [code]` - evaluate math expression \n `~trace [height] [width] [code] `- Render image from code\n `~animate [height] [width] [frames] [code]` - animate render from code \n `~bytebeat [samplerate] [duration] [code]` - Render audio from code \n `~gpt [query]` - queries ChatGPT");
        }

        if (msg.content.toLocaleLowerCase().startsWith(`~ping`)) {
            msg.reply(`Pong! **(${Date.now() - msg.createdTimestamp}ms)**`)
            return;
        }

        if (msg.content.startsWith('~vote')) {
            if (msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) != client.user.id) {
                msg.reply(">///< Nagasaki just happened where I live. Bot is not the owner of the server therefore the command doesnt work");
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
            }}
            
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

        if (msg.content.toLowerCase().startsWith('~valentine')) {
        const cmd = msg.content.toLowerCase().substring(11).trim();
        const usr = msg.mentions.users.first() || msg.author;
        
        switch (cmd) {
          case "get":
            msg.reply(ess.getValentine(usr.id).txt);
            break;
          case "ask":
            if (user.id !== msg.author.id) {
              ess.askVal(msg.author.id, usr.id, msg);
            }
            break;
          case "del":
            ess.delVal(msg.author.id, msg);
            break;
          default:
            msg.reply("Mentions are required for asks, optional for gets, and not necessary in dels.");
            break;
            }  
            return;
        }

        if (msg.content.toLowerCase().startsWith('~sex')) {
            const tm = setTimeout(function() { 
                msg.reply({content: "Sexing - Please Wait..."}); 
                }, 10
            );
            const tm2 = setTimeout(function() { 
                if (!msg) { 
                    return; 
                } 
                msg.reply({content: "Sex Complete - Average Sexiness Level: `".concat((Math.floor(Math.random() * 102)-1).toString().concat("%`\n(Ejaculation Within `".concat((Math.floor(Math.random() * 25)).toString().concat(".".concat((Math.floor(Math.random() * 99)).toString().concat("` Seconds )"))))))}); 
            }, 3000
            );
        }
        if (msg.content.toLowerCase().startsWith('~shop')) {
            const splt = msg.content.split(" ");
            const pages = [ess.shopItemsString(ess, 0, msg), ess.shopItemsString(ess, 1, msg), ess.shopItemsString(ess, 2, msg)];
            const pageNumber = parseInt(splt[1]);
            if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 3) {
              msg.reply("Knonnichiwa! Please use an integer (1-3) to select a shop page.");
            } else {
              msg.reply(`__**Shop**__\n${pages[pageNumber - 1]}`);
            }
          }

          if (msg.content.toLowerCase().startsWith('~jobs')) {
            //used a single if statement with a range check to avoid repeating the same if structure multiple times
            //string interpolation to simplify the construction of the reply
            //parseInt() to convert the page number string to an integer, and combined it with the range check
            const splt = msg.content.split(" ");
            const pages = [ess.jobsString(ess, 0, msg), ess.jobsString(ess, 1, msg)];
            const pageNumber = parseInt(splt[1]);
            if (pageNumber >= 1 && pageNumber <= 2) {
              msg.reply(`__**Jobs**__\n${pages[pageNumber - 1]}`);
            } else {
              msg.reply("Konnichiwa! Please use an integer (1-2) to select a job page.");
            }
            return;
          }

          if (msg.content.toLowerCase().startsWith('~buy ')) {
            const splt = msg.content.split(" ");
            ess.buyItem(ess, msg.author.id, splt[1], splt[2], msg);
        }

        if (msg.content.toLowerCase().startsWith('~info ')) {
            const splt = msg.content.split(" ");
            const type = splt[1];
            const page = parseInt(splt[2]) - 1;
            const obj = parseInt(splt[3]) - 1;
          
            let ssm = null;
            if (type === 'item') {
              ssm = ess.getItemInfo(ess, page, obj, msg);
            } else if (type === 'job') {
              ssm = ess.getJobInfo(ess, page, obj, msg);
            }
          
            if (ssm) {
              msg.reply(ssm);
            }
          }

          if (msg.content.toLowerCase().startsWith('~job ')) {
            const splt = msg.content.split(" ");
            if (splt[1] == "apply") {
                ess.jobApply(msg.author.id, parseInt(splt[2]), parseInt(splt[3]), msg);
            }
            if (splt[1] == "quit") {
                ess.jobQuit(msg.author.id, msg);
            }
            if (splt[1] == "work") {
                ess.workJob(msg.author.id, msg);
            }
            if (splt[1] == "current") {
                var jb = ess.getUdata(msg.author.id).job;
                if (jb) {
                    jb = jb.name;
                } else {
                    jb = "None";
                }
                msg.reply("Current job: "+jb);
            }
        }

        if (msg.content.toLowerCase().startsWith('~balance')) {
            const usr = msg.mentions.users.first();
            if (usr) {
                const mon = ess.getBal(usr.id, msg);
                if (!mon) {
                    return;
                }
                msg.reply("User <@"+usr.id+"> has $"+mon);
                console.log("Balance got "+usr.id);
            } else {
                const mon = ess.getBal(msg.author.id, msg);
                if (!mon) {
                    return;
                }
                msg.reply("User <@"+msg.author.id+"> has $"+mon);
                console.log("Balance got "+msg.author.id);
            }
        }
        if (msg.content.toLowerCase().startsWith('~xp')) {
            const usr = msg.mentions.users.first();
            if (usr) {
                const mon = ess.getXP(usr.id, msg);
                if (!mon) {
                    return;
                }
                msg.reply("User <@"+usr.id+"> has "+mon+" XP");
                console.log("XP got "+usr.id);
            } else {
                const mon = ess.getXP(msg.author.id, msg);
                if (!mon) {
                    return;
                }
                msg.reply("User <@"+msg.author.id+"> has "+mon+" XP");
                console.log("XP got "+msg.author.id);
            }
        }

        if (msg.content.toLocaleLowerCase().startsWith(`~whopper`)) {
            msg.reply("https://cdn.discordapp.com/attachments/669796626784714756/1074666197611716699/TWD.mp4");
            return;
        }
        if (msg.content.toLowerCase().startsWith('~kidnap')) {
            msg.reply('https://cdn.discordapp.com/attachments/723599467172986962/1074336826464145589/trim.90D66A28-3AA2-4D37-A744-A6FD591DA6F0.mov');
            return;
        }
        if (msg.content.toLowerCase().startsWith('~coinflip')) {
            msg.reply(`:moneybag: It landed on **${Math.random() >= 0.5 ? 'heads' : 'tails'}**!`);
            return;
        }    

        if (msg.content.toLocaleLowerCase().startsWith('~ship')) {
            msg.reply("<333 <@"+msg.author.id+"> x <@"+msg.mentions.users.first().id+"> : "+(Math.floor(Math.random()*102)-1)+"% match.");
         }
        
            if (msg.content.toLocaleLowerCase().startsWith('~rps')) {
                const choices = ['rock', 'paper', 'scissors'];
                  // Get the user's choice (either 'rock', 'paper', or 'scissors')
                const userChoice = args[0];
                  
                  // If the user did not provide a valid choice, return an error message
                if (!choices.includes(userChoice)) {
                    msg.reply('Please choose either rock, paper, or scissors!');
                    return;
                }
                  
                  // Randomly select the bot's choice
                const botChoice = choices[Math.floor(Math.random() * choices.length)];
                  
                  // Determine the winner based on the user's choice and the bot's choice
                let result;
                    if (userChoice === botChoice) {
                result = 'It\'s a tie!';
                } else if (
                    (userChoice === 'rock' && botChoice === 'scissors') ||
                    (userChoice === 'paper' && botChoice === 'rock') ||
                    (userChoice === 'scissors' && botChoice === 'paper')
                  ) {
                    result = 'You win!';
                  } else {
                    result = 'You lose!';
                  }
                  
                  // Return the result in a message
                  msg.reply(`You chose **${userChoice}**, and I chose **${botChoice}**. ${result}`);
                };

        if (msg.content.toLowerCase().startsWith(`~shibe`)) {
            msg.reply('getting your shibe :3');
          
            try {
              const response = await fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false');
              const shibeResult = await response.json();
              msg.reply({ files: [shibeResult[0]] });
            } catch (error) {
              console.error(error);
              msg.reply('>///< Oops! Something went wrong while getting your shibu');
            }
          }

          if (msg.content.toLowerCase().startsWith(`~cat`)) {
            msg.reply('snuggling w/ a cat :3');
          
            try {
              const response = await fetch('http://shibe.online/api/cats?count=1&urls=true&httpsUrls=false');
              const catResult = await response.json();
              msg.reply({ files: [catResult[0]] });
            } catch (error) {
              console.error(error);
              msg.reply('>///< Oops! Something went wrong while getting your cate');
            }
          }

          if (msg.content.toLowerCase().startsWith(`~bird`)) {
            msg.reply('snatching your birdie :3');
          
            try {
              const response = await fetch('http://shibe.online/api/birds?count=1&urls=true&httpsUrls=false');
              const catResult = await response.json();
              msg.reply({ files: [catResult[0]] });
            } catch (error) {
              console.error(error);
              msg.reply('>///< Oops! Something went wrong while getting your birb');
            }
          }       

    } catch (err) { //failsafe and log
        if (err.toString().match("ReferenceError: ess") || err.toString().match("ReferenceError: initLogData")) { return; }
        console.log(err);
        ess.log(client);
    }
});

client.login(ess.sets.token);
