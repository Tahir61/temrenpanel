const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const replaceOnce = require("replace-once");
require("./util/eventLoader.js")(client);
const db = require("quick.db");
const queue = new Map();
const { Canvas } = require("canvas-constructor");
const YouTube = require("simple-youtube-api");
const superagent = require("superagent");
const ytdl = require("ytdl-core");

var prefix = process.env.prefix;

//-----------------------------------------------\\
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " PİNGLENDİ ");
  response.sendStatus(200);
});
app.listen(8000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === process.env.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.TOKEN);

////-----------------------------\\\\\\\\\

//Tarih

 var tarih = ''
      if(moment().format('MM') === '01') {
                var tarih = `${moment().format('DD')}/01/${moment().format('YYYY')} `
            }
            if(moment().format('MM') === '02') {
                var tarih = `${moment().format('DD')}/02/${moment().format('YYYY')} `
            }
      if(moment().format('MM') === '03') {
                var tarih = `${moment().format('DD')}/03/${moment().format('YYYY')} `
            }
            if(moment().format('MM') === '04') {
                var tarih = `${moment().format('DD')}/04/${moment().format('YYYY')} `
            }
            if(moment().format('MM') === '05') {
                var tarih = `${moment().format('DD')}/05/${moment().format('YYYY')} `
            }
      if(moment().format('MM') === '06') {
                var tarih = `${moment().format('DD')}/06/${moment().format('YYYY')} `
            }
      if(moment().format('MM') === '07') {
                var tarih = `${moment().format('DD')}/07/${moment().format('YYYY')} `
            }
            if(moment().format('MM') === '08') {
                var tarih = `${moment().format('DD')}/08/${moment().format('YYYY')} `
            }
            if(moment().format('MM') === '09') {
                var tarih = `${moment().format('DD')}/09/${moment().format('YYYY')} `
            }
            if(moment().format('MM') === '10') {
                var tarih = `${moment().format('DD')}/10/${moment().format('YYYY')} `
            }
            if(moment().format('MM') === '11') {
                var tarih = `${moment().format('DD')}/11/${moment().format('YYYY')} `
            }
            if(moment().format('MM') === '12') {
                var tarih = `${moment().format('DD')}/12/${moment().format('YYYY')} `
            }

//MC İstatistik

let mcip = "play.shadowrise.com"

const request = require("request");
client.on("ready", () => {
  console.log(" [ShadowRise Network] Minecraft Panel Hazır.");

  var interval = setInterval(function() {
    var channel = client.channels.cache.find(
      c => c.id === "835143085901873182"
    );
    request(
      `https://mcapi.xdefcon.com/server/${mcip}/full/json`,
      function(error, response, body) {
        body = JSON.parse(body);
        if (body.serverStatus === "online") {
          channel.setName(
            `👥 Çevrimiçi ► ${body.players} / ${body.maxplayers}`
          );
        } else {
          channel.setName("❌ ► Sunucu Yok!");
        }
      }
    );
  }, 2 * 1500);
});

client.on("ready", () => {
  var interval = setInterval(function() {
    var channel = client.channels.cache.find(
      c => c.id === "835143117648035860"
    );
    request(
      `https://mcapi.xdefcon.com/server/${mcip}/full/json`,
      function(error, response, body) {
        body = JSON.parse(body);
        if (body.serverStatus === "online") {
          channel.setName(`🌍 Durum ► Aktif`);
        } else {
          channel.setName("❌ ► Aktif Değil!");
        }
      }
    );
  }, 2 * 1500);
});

client.on("ready", () => {
  var interval = setInterval(function() {
    var channel = client.channels.cache.find(
      c => c.id === "835143177715318854"
    );
    request(
      `https://mcapi.xdefcon.com/server/${mcip}/full/json`,
      function(error, response, body) {
        body = JSON.parse(body);
        if (body.serverStatus === "online") {
          channel.setName(`🔍 Sürüm ► ${body.version}`);
        } else {
          channel.setName("❌ ► Aktif Değil!");
        }
      }
    );
  }, 2 * 1500);
});

//Mc İstatistik

//Sunucu Panel

client.on(
  "ready",
  () => {
    console.log(" [ShadowRise Panel] Panel Aktiftir");

    var interval = setInterval(function() {
      var channel = client.channels.cache.find(
        c => c.id === "835142408341028874"
      );
      channel.setName(
        `👥 Toplam Üye ・ ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}`
      );
    });
  },
  2 * 1500
);

client.on(
  "ready",
  () => {
    var interval = setInterval(function() {
      var channel = client.channels.cache.find(
        c => c.id === "835142477757415494"
      );
      channel.setName(
        `🔰 Tarih ・ ${tarih}`
      );
    });
  },
  2 * 1500
);



//Sunucu Panel

module.exports = client => {
  client.user.setStatus("invisible"); 
}

