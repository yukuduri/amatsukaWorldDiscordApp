'use strict';

// Response for Uptime Robot
const http = require('http');
const fs = require('fs');

const server = http.createServer();
const doRequest = (req, res) => {
  fs.readFile('./index.html', 'UTF-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}
server.on('request', doRequest);
server.listen(3000);
console.log('Server running!');

// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();

// require json
const replyJson = require('./reply.json');
const res = replyJson.responses;

//require module
const RandomNumber = require('./RandomNumber.js');
const RandNum = new RandomNumber;
const moment = require('moment-timezone');

//define function
const getGuildEmoji = (name, guild) =>{
  try{
    return `<:${name}:${guild.emojis.cache.find(emoji => emoji.name === name).id}>`
  }catch(e){
    console.log(e);
    return `<err: UnknownEmoji \`${name}\`>`
  }

}
const dateFormat = (strDate, type) => {
  let str = '';
  let ary = [0,0,0];
  if(type === 'date'){
    str = strDate.match(/[0-9]+-[0-9]+-[0-9]+/g).toString();
    ary = str.split('-');
  }else if(type === 'time'){
    str = strDate.match(/[0-9]+:[0-9]+:[0-9]+/g).toString();
    ary = str.split(':');
  }
  return ary;
}
const searchIndex = (txt) => {
  let i=0;
  for(let i=1; i < res.length; i++){
    const resWords = res[i]['words'];
    for(let j=0; j < resWords.length; j++){
      if(txt.match(RegExp(resWords[j],'g'))){
        return i;
      }
    }
  }
  return i;
}
const createMessage = (txt, name,guild) => {
  const now = moment.tz("Asia/Tokyo").format();
  const currentDate = dateFormat(now, 'date');
  const strCorrDate = currentDate[0]+'年'+currentDate[1]+'月'+currentDate[2]+'日';
  const currentTime = dateFormat(now, 'time');
  const strCorrTime = currentTime[0]+'時'+currentTime[1]+'分'+currentTime[2]+'秒';
  let index = searchIndex(txt);
  
  
  const num = res[index]['msg'].length;
  let msg = res[index]['msg'][RandNum.getRandomInt(0, num)];
  
  msg = msg.replace(/%%name%%/g,name);
  msg = msg.replace(/%%date%%/g,strCorrDate);
  msg = msg.replace(/%%time%%/g,strCorrDate+strCorrTime);
  
  return msg;
}

const decodestr=decodeURI('%E3%81%9B%E3%81%86%E3%81%A1%E3%82%83%E3%82%93%E3%81%AF%E3%83%BC%EF%BC%9F');
const decodestr2=unescape('%u5C11%u3057%u6B62%u307E%u3063%u3066%u5C11%u3057%u307E%u305F%u6B69%u3044%u3066');

client.on('ready', () =>
{
  //テスト用コード。サーバー起動時、メッセージを送信できます
  const testChName = 'test_bot';
  const testCh = client.channels.cache.find(ch => ch.name === testChName);
  if (testCh) {
    testCh.send('I am ready!');
  }else{
    console.log(`「${testChName}」のチャンネル取得に失敗しました。`);
  }
  client.user.setActivity('BOT with discord.js');
	console.log('bot is ready!');
});

client.on('message', message =>
{
  const adminCh = message.guild.channels.cache.find(ch => ch.name === process.env.ADMIN_CH_NAME);
  if (!adminCh) return;
  if(message.author.bot){
    return;
  }
  try{
    //console.log(message.content);
    //console.log(message.mentions.members.find(user => user.id == process.env.CLIENT_ID));
    const serverBot = message.guild.roles.cache.find(role => role.name === process.env.BOT_ROLE_NAME);
    if(!serverBot){
      throw new Error(`「${process.env.BOT_ROLE_NAME}」のロール取得に失敗しました。\nロール名に変更がなかったか確認して下さい！`);
    }
    let isServerBot = false;
    if (message.mentions.members.find(user => user.id == process.env.CLIENT_ID)){
      //console.log('ユーザーメンション検知');
      isServerBot = true;
    }else if(message.mentions.roles.find(role => role.id == serverBot.id)){
      //console.log('ロールメンション検知');
      isServerBot = true;
    }
    
    if(isServerBot){
      let existReply,isGreetMorning,isGreetHello,isGreetEve,isGreetNight = false;
      let i = 0;
      
      if(message.content.match(/test/)){
        message.channel.send( `${message.author}さん、私は元気です${getGuildEmoji('hart_white',message.guild)}`);
      }else if(message.content.match(/せうちゃまだいすきあいしてる/)){
        message.channel.send( `${getGuildEmoji('wing_left',message.guild)} ฅ^ ${getGuildEmoji('hart_yellow',message.guild)} ω ${getGuildEmoji('hart_pink',message.guild)} ^ฅ ${getGuildEmoji('wing_right',message.guild)}`);
      }else if(message.content.match(decodestr)){
        message.channel.send( `${decodeURI('%E3%81%8D%E3%82%87%E3%81%86%E3%82%82%E3%81%8B%E3%82%8F%E3%81%84%E3%81%84%EF%BC%81')} ${getGuildEmoji('favicon',message.guild)}`);
      }else if(message.content.match(decodestr2)){
        message.channel.send( `${unescape('%u305D%u308C%u3067%u3082%u9032%u3080%u304B%u3089%u611B%u3057%u3066%u306D')} ${getGuildEmoji('hart_seu',message.guild)}`);
      }else{
      　//const requestCh = message.guild.channels.cache.find(ch => ch.name === process.env.REQUEST_CH_NAME);
        message.channel.send( `${message.author}さん、${createMessage(message.content,message.author.username,message.guild)}`);
    　}
  　}
  }catch(e){
    adminCh.send(`Bot Error:\n${e.message}`);
  }
});

if(!process.env.DISCORD_BOT_TOKEN){
  console.log('please set ENV: DISCORD_BOT_TOKEN');
  process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );