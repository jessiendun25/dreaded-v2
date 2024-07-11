const fs = require("fs");

module.exports = async (context) => {

const { client, m, mime, exec, getRandom } = context;

if (!m.quoted) return m.reply('Tag a static video with the command!'); 
    if (!/webp/.test(mime)) return m.reply(`Tag a sticker with the command`); 

    let media = await client.downloadAndSaveMediaMessage(m.quoted); 
    let mokaya = await getRandom('.png'); 
    exec(`ffmpeg -i ${media} ${mokaya}`, (err) => { 
   fs.unlinkSync(media); 
   if (err) m.reply(err)
   let buffer = fs.readFileSync(mokaya); 
   client.sendMessage(m.chat, { image: buffer, caption: `Converted by Dreaded! 🦄`}, { quoted: m}) 
   fs.unlinkSync(mokaya); 
    }); 
    } 