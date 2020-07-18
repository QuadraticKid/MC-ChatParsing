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

    // console.log(translate);

    var withdata = [];

    if (typeof data.with !== "undefined")
      data.with.forEach(data => {
        //   console.log(data)
        withdata.push(processMsg(data));
      });

    // withdata.forEach(element => {
        // console.log(element)
    // });
    // console.log(withdata)

   

    // msg = translate


    for(var i = 0;i<(translate.match(/%s/g) || []).length+1;i++){
        var replace = typeof withdata[i] !== 'undefined'?withdata[i]:"";
        translate = translate.replace('%s',replace)    
    }



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

    //strikethrough
    // /obfuscated

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

    //strikethrough
    // /obfuscated

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

function getColor(color) {
  if (color == "reset") {
    return "§r";
  }
  if (color == "white") {
    return "§f";
  }
  if (color == "black") {
    return "§0";
  }
  if (color == "red") {
    return "§c";
  }
  if (color == "dark_red") {
    return "§4";
  }
  if (color == "green") {
    return "§a";
  }
  if (color == "dark_green") {
    return "§2";
  }
  if (color == "light_purple") {
    return "§d";
  }
  if (color == "dark_purple") {
    return "§5";
  }
  if (color == "blue") {
    return "§9";
  }
  if (color == "dark_blue") {
    return "§1";
  }
  if (color == "aqua") {
    return "§b";
  }
  if (color == "dark_aqua") {
    return "§3";
  }

  if (color == "gold") {
    return "§6";
  }

  if (color == "yellow") {
    return "§e";
  }
  if (color == "gray") {
    return "§7";
  }
  if (color == "dark_gray") {
    return "§8";
  }
  return "";
}
