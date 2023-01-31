const Discord = require("discord.js");
const { fchmod } = require("fs");

exports.sets = {
    untouchable: ["1009101322680795268", "919666443988119563"],
    token: ""
}

exports.crash = function(client) {
    client.user.setStatus("dnd");
    const tm = setTimeout(function() { client.user.setStatus("online"); }, 500);
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

exports.timeAndUInfoLog = function(ess, msg, console) {
    const ttm = ess.haveTime();
    const initLogData = "[DATE: "+ttm.date+" "+ttm.time+"] ("+msg.author.username+"#"+msg.author.discriminator+" & "+msg.author.id+")"+"\n"+msg.content+"\n";
    console.log(initLogData);
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