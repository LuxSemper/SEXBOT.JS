const { table } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const ess = exports;

exports.sets = {
    untouchable: ["1009101322680795268", "919666443988119563"],
    token: "MTA2OTc5MDcxMDIwODkzMzkzOQ.GzvOBZ.YyLUjsECMKcWiJD-TAT7J9FW9Op3LPanz8WECU"
}

exports.crash = function(client) {
    client.user.setStatus("dnd");
    const tm = setTimeout(function() { client.user.setStatus("online"); }, 500);
}

exports.items = {
    pistol:{name:"Pistol",price:250,usable:true,description:"A thing used to make threats and shoot shit."},
    amongplush:{name:"Among Us Plushie",price:50,usable:false,description:"The SUSSY imposter at 3 AM???"},
    nword:{name:"N-Word Pass",price:5000,usable:true,description:"The sole artifact sought by many."},
    arrow:{name:"Strange Arrow",price:1000,usable:true,description:"HOLY FUCKING SHIT IS THAT A MOTHERFUCKING JOJO REFERENCE?!"},
    rope:{name:"Rope",price:25,usable:true,description:"Uses include: hanging yourself, hanging your friends, and tying up femboys to prevent their escape attempts."},
    armband:{name:"MMR Armband",price:750,usable:true,description:"Contains a needle meant to inject a strange liquid mixture into one's blood."},
    flask:{name:"Flask",price:10,usable:true,description:"Used to contain... \"liquids\"."},
    guysex:{name:"Guyshit Sextape",price:5,usable:false,description:"Full sextape featuring Guyshit and his friends."},
    trophy:{name:"Best Sex Trophy",price:10000,usable:false,description:"The sexiest living being award."},
    cyanide:{name:"Cyanide Pill",price:100,usable:true,description:"Poison yourself or your dumbass friends within seconds."},
    gamephone:{name:"Gaming Cellphone",price:4200,usable:true,description:"Cellphone made specifically for Subway Surfers."},
    plug:{name:"Buttplug",price:69,usable:true,description:"Prevents impregnation if male."},
    totem:{name:"Totem Of Undying",price:6400,usable:false,description:"Prevents death, consumed on activation."},
    cross:{name:"Holy Cross",price:440,usable:true,description:"Protection from some forms of heresey. Decreases taken damage. Must be used. Cannot be consumed."},
    mummy:{name:"Mummified Body",price:250000,usable:false,description:"Some dead fucker who walked all the way from Africa to America lmfao."}
};

exports.jobs = {
    femboy:{name:"Femboy",wage:45,difficulty:3,consec_fails_allowed:2,exp_req:750,exp_get:10},
    cashier:{name:"Cashier", wage:20,difficulty:2,consec_fails_allowed:3,exp_req:250,exp_get:5},
    crewmate:{name:"Crewmate", wage:17,difficulty:4,consec_fails_allowed:1,exp_req:25,exp_get:7},
    janitor:{name:"Janitor", wage:12,difficulty:1,consec_fails_allowed:4,exp_req:50,exp_get:2},
    journalist:{name:"Author", wage:1,difficulty:5,consec_fails_allowed:0,exp_req:0,exp_get:1},
    nftseller:{name:"NFT Seller", wage:50,difficulty:4,consec_fails_allowed:1,exp_req:1000,exp_get:15},
    minecrafter:{name:"Minecrafter", wage:40,difficulty:3,consec_fails_allowed:2,exp_req:100,exp_get:8},
    imposter:{name:"Imposter", wage:32,difficulty:4,consec_fails_allowed:1,exp_req:500,exp_get:11},
    federalagent:{name:"Federal Agent", wage:10,difficulty:2,consec_fails_allowed:3,exp_req:10,exp_get:3},
};

exports.lsts = [
    [
        ess.items.pistol,
        ess.items.amongplush,
        ess.items.nword,
        ess.items.arrow,
        ess.items.rope,
        ess.items.armband,
    ],
    [
        ess.items.flask,
        ess.items.guysex,
        ess.items.trophy,
        ess.items.cyanide,
        ess.items.gamephone,
        ess.items.plug
    ],
    [
        ess.items.totem,
        ess.items.cross,
        ess.items.mummy
    ]
];

exports.jlsts = [
    [
        ess.jobs.cashier,
        ess.jobs.crewmate,
        ess.jobs.federalagent,
        ess.jobs.femboy,
        ess.jobs.imposter,
        ess.jobs.janitor
    ],
    [
        ess.jobs.journalist,
        ess.jobs.minecrafter,
        ess.jobs.nftseller
    ]
];

exports.shopItemsString = function(ess, pagenum, msg) {
    const lst = ess.lsts[pagenum];
    var str = "";
    for (const i in lst) {
        str = str.concat("\n`"+lst[i].name+"` - $"+lst[i].price.toString());
    }
    return str;
}

exports.dataTemplate = {
    uid:"",
    inv:[
        {item:{},count:0}
    ],
    money:0,
    job:{},
    scores: {
        highestSex:0,
        exp:0
    }
}

exports.getUdata = function(id) {
    const dat = fs.readFileSync("./udata/data.txt", "utf-8");
    var udat = JSON.parse(dat);
        var data;
        for (const i in udat[0].userData) {
            console.log("ran");
            if (udat[0].userData[i]) {
                if (udat[0].userData[i].uid == id) {
                    console.log("Data found for "+id);
                    data = udat[0].userData[i];
                    break;
                }
            } else {
                console.log("No data in file");
                var obj = exports.dataTemplate;
                obj.uid = id;
                obj.inv = [];
                udat[0].userData.push(obj);
                fs.writeFile("./udata/data.txt", JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
                data = obj;
                break;
            }
        }
        if (!data) {
            console.log("No data for "+id);
            var obj = exports.dataTemplate;
            obj.uid = id;
            obj.inv = [];
            udat[0].userData.push(obj);
            fs.writeFile("./udata/data.txt", JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
            data = obj;
        }
        console.log("Data collected from "+id);
        return data;
}

exports.setUdata = function(id, newData) {
    const dat = fs.readFileSync("./udata/data.txt", "utf-8");
    var udat = JSON.parse(dat);
    var data;
    var int;
    for (const i in udat[0].userData) {
        console.log("ran");
        if (udat[0].userData[i]) {
            if (udat[0].userData[i].uid == id) {
                console.log("Data found for "+id);
                data = udat[0].userData[i];
                int = i;
                break;
            }
        } else {
            console.log("No data in file");
            var obj = exports.dataTemplate;
            obj.uid = id;
            obj.inv = [];
            udat[0].userData.push(obj);
            fs.writeFile("./udata/data.txt", JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
            data = obj;
            break;
        }
    }
    if (!data) {
        console.log("No data for "+id);
        var obj = exports.dataTemplate;
        obj.uid = id;
        obj.inv = [];
        udat[0].userData.push(obj);
        fs.writeFile("./udata/data.txt", JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
        data = obj;
    }
    newData.uid = id;
    udat[0].userData[int] = newData;
    fs.writeFile("./udata/data.txt", JSON.stringify(udat), (err, data) => { if (err) throw err; console.log(data); });
}

exports.findItem = function(inv, itm) {
    for (const i in inv) {
        if (inv) {
            if (inv[i].item.name == itm.name) {
                return i;
            }
        }
    }
}

exports.buyItem = function(ess, id, page, obj, msg) {
    const lst = ess.lsts[parseInt(page)-1];
    if (lst) {
        const itm = lst[parseInt(obj)-1];
        if (itm) {
            var udat = ess.getUdata(id);
            if (udat.money >= itm.price) {
                udat.money = udat.money - itm.price;
                const iter = ess.findItem(udat.inv, itm);
                if (iter == (0 || 1 || 2)) {
                    udat.inv[iter].count = udat.inv[iter].count + 1;
                    ess.setUdata(id, udat);
                    msg.reply("Purchased one ".concat(itm.name+"."));
                    return;
                } else {
                    udat.inv.push({item:itm,count:1});
                    ess.setUdata(id, udat);
                    msg.reply("Purchased one ".concat(itm.name+"."));
                    return;
                }
            } else {
                msg.reply("Item too costly: > "+udat.money);
                return;
            }
        }
    }
    msg.reply("Purchasing items: `~buy [page:int] [item:int]`.");
}

exports.getBal = function(id, msg) {
    console.log(id);
    var udat = ess.getUdata(id);
    if (udat.money) {
        return udat.money;
    }
    msg.reply("Balance: `~balance [@user:optional]`.");
}

exports.getItemInfo = function(ess, page, itid, msg) {
    const lst = ess.lsts[page];
    if (lst) {
        const itm = lst[itid];
        if (itm) {
            return ("**Name:** "+itm.name+"\n**Price:** $"+itm.price+"\n**Description:** "+itm.description+"\n**Usable:** "+itm.usable);
        }
    }
    msg.reply("Getting item information: `~info item [page:int] [item:int]`.");
}

exports.getJobInfo = function(ess, page, itid, msg) {
    const lst = ess.jlsts[page];
    if (lst) {
        const job = lst[itid];
        if (job) {
            return ("**Name:** "+job.name+"\n**Wage:** $"+job.wage+"\n**Difficulty:** "+job.difficulty+"\n**Consecutive Allowed Fails:** "+job.consec_fails_allowed+"\n**XP Gain:** "+job.exp_get+"\n**XP Requirement:** "+job.exp_req);
        }
    }
    msg.reply("Getting job information: `~info job [page:int] [job:int]`.");
}

exports.addMoney = function(id, amt) {
    var udat = ess.getUdata(id);
    udat.money = udat.money + amt;
    ess.setUdata(id, udat);
}

exports.workJob = function(id, page, job, msg) {
    const lst = ess.jlsts[page];
    if (lst) {
        const res = lst[job];
        if (res) {
            return ((Math.floor(Math.random()*res.difficulty)+1)<res.difficulty);
        }
    }
}

exports.jobsString = function(ess, pagenum) {
    const lst = ess.jlsts[pagenum];
    var str = "";
    for (const i in lst) {
        str = str.concat("\n`"+lst[i].name+"` - Required "+lst[i].exp_req.toString()+" XP");
    }
    return str;
}

exports.isBot = function(users) {
    for (const i in users) {
        if (users[i].bot) {
            return true;
        }
    }
    return false;
}

exports.haveTime = function() {
    const dt = new Date();
    var dat = (dt.getMonth().toString()+"."+dt.getDate().toString()+"."+dt.getFullYear().toString());
    var tme = (dt.getHours().toString()+":"+dt.getMinutes().toString()+":"+dt.getSeconds().toString()+":"+dt.getMilliseconds().toString());
    return { date: dat, time: tme};
}

exports.logon = function(client) {
    let guilds = client.guilds.cache.map(gud => gud.id+" - "+gud.name+" [OWNER: "+gud.ownerId+"]");
    let channels = client.channels.cache.map(chn => chn.id+" - "+chn.name+" [GUILD: "+chn.guildId+"]");
    var finStr = "\nGUILDS:\n--------------------------------------\n";
    var finStr1 = "\nCHANNELS:\n--------------------------------------\n";
    if (guilds) {
        for (const i in guilds) {
            if (guilds[i]) {
                finStr = finStr.concat(guilds[i]+"\n");
            }
        }
    }
    if (channels) {
        for (const i in channels) {
            if (channels[i]) {
                finStr1 = finStr1.concat(channels[i]+"\n");
            }
        }
    }
    finStr = finStr.concat("--------------------------------------\n");
    finStr1 = finStr1.concat("--------------------------------------\n");
    fs.writeFile("./botInfo.txt", ("\nLOGON DATE: "+ess.haveTime().date+" @ "+ess.haveTime().time+"\n").concat(finStr.concat("\n"+finStr1+"\n")), (err, data) => { if (err) throw err; console.log(data); });
    console.log(finStr);
}

exports.timeAndUInfoLog = function(ess, msg, console) {
    const ttm = ess.haveTime();
    const initLogData = "[DATE: "+ttm.date+" "+ttm.time+"] ("+msg.author.username+"#"+msg.author.discriminator+" & "+msg.author.id+")"+"\n"+msg.content+"\n";
    console.log(initLogData);
    return initLogData;
}

exports.guildFlash = function(gid) {
}

exports.locateFlashable = function(users, members, sets) {
    for (const i in users) {
        if (!sets.untouchable.find(users[i].id) && !members[i].permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            for (const x in client.guilds.fetch()) {
                
            }
        }
    }
}