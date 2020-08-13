var mp = require("minecraft-protocol");
var translations = require("./translations.json");
var bot = mp.createClient({
  host: "server.jucelo.de",
  port: 22001,
  username: "yeetBot",
  version: "1.15.2"
});

bot.on("login", () => {
  console.log("logged in");
});

bot.on("chat", (msgData, packetInfo) => {
//   console.log(JSON.parse(msgData.message));
//   console.log("");
//   try {
    // console.log(JSON.parse(msgData.message).with[1].extra[0].extra);
//   } catch (e) {}
//   console.log("");
  console.log(processMsg(JSON.parse(msgData.message)));
});

function processMsg(data) {
    if (
      typeof data.text == "undefined" &&
      typeof data.translate !== "undefined" && 
      !(typeof data == 'string')
    ) {
      var msg = "";
  
      var translate = translations[data.translate] || data.translate;
  
      var withdata = [];
  
      if (typeof data.with !== "undefined")
        data.with.forEach(data => {
          //   console.log(data)
          withdata.push(processMsg(data));
        });
  
  
      if (typeof data.text == "undefined") data.text = "";
      if (typeof data.color == "undefined") data.color = "";
      if (typeof data.bold == "undefined") data.bold = false;
      if (typeof data.obfuscated == "undefined") data.obfuscated = false;
      if (typeof data.underlined == "undefined") data.underlined = false;
      if (typeof data.italic == "undefined") data.italic = false;
      if (typeof data.strikethrough == "undefined") data.strikethrough = false;
  
      var color = getColor(data.color);
      var bold = data.bold == true ? "§l" : "";
      var obfuscated = data.obfuscated == true ? "§k" : "";
      var underlined = data.underlined == true ? "§n" : "";
      var italic = data.italic == true ? "§o" : "";
      var strikethrough = data.strikethrough == true ? "§m" : "";
  

      for(var i = 0;i<(translate.match(/%s/g) || []).length+1;i++){
        var replace = typeof withdata[i] !== 'undefined'?withdata[i]:"";
        translate = translate.replace('%s',replace+color +
        bold +
        obfuscated +
        underlined +
        italic +
        strikethrough)    
    }

  
      var msg =
        color +
        bold +
        obfuscated +
        underlined +
        italic +
        strikethrough + translate
  
       if (typeof data.extra !== "undefined")
        data.extra.forEach(data => {
          msg = msg + processMsg(data);
        });
      //   console.log(msg)
        return msg;
  
        
    } else if (typeof data == 'string') {
  
        return data;
    } else {
      if (typeof data.text == "undefined") data.text = "";
      if (typeof data.color == "undefined") data.color = "";
      if (typeof data.bold == "undefined") data.bold = false;
      if (typeof data.obfuscated == "undefined") data.obfuscated = false;
      if (typeof data.underlined == "undefined") data.underlined = false;
      if (typeof data.italic == "undefined") data.italic = false;
      if (typeof data.strikethrough == "undefined") data.strikethrough = false;
  
      var color = getColor(data.color);
      var bold = data.bold == true ? "§l" : "";
      var obfuscated = data.obfuscated == true ? "§k" : "";
      var underlined = data.underlined == true ? "§n" : "";
      var italic = data.italic == true ? "§o" : "";
      var strikethrough = data.strikethrough == true ? "§m" : "";
  

      var msg =
        color +
        bold +
        obfuscated +
        underlined +
        italic +
        strikethrough +
        data.text;
  
      if (typeof data.extra !== "undefined")
        data.extra.forEach(data => {
          msg = msg + processMsg(data);
        });
  
      return msg;
    }
  }
const colors = {
  "reset": "§r",
  "white": "§f",
  "black": "§0",
  "red": "§c",
  "dark_red": "§4",
  "green": "§a",
  "dark_green": "§2",
  "light_purple": "§d",
  "dark_purple": "§5",
  "blue": "§9",
  "dark_blue": "§1",
  "aqua": "§b",
  "dark_aqua": "§3",
  "gold": "§6",
  "yellow": "§e",
  "gray": "§7",
  "dark_gray": "§8"
}
function getColor(color) {
  return colors[clr] == undefined ? "" : colors[clr];
}
