#Plugins

All plugins go to ``` %appdata%\BetterDiscord\plugins\ ```

##API functions provided by BetterDiscord, BetterAPI and webSock
This should help you if you want to write a plugin yourself :)
You should also check out the [testPlugin.js](https://github.com/Bluscream/BetterDiscord/blob/master/plugins/testPlugin.js).

Currently available [BdApi](https://github.com/Jiiks/BetterDiscordApp/blob/master/js/bdapi.js) functions:
```js
BdApi.joinServer("code");
BdApi.injectCSS("id", "css");
BdApi.clearCSS("id");
BdApi.getPlugin("name");
BdApi.getIpc();
BdApi.getCore();
BdApi.getUserIdByName("name");
BdApi.getUserNameById("id");
BdApi.setPlaying("game");
BdApi.setStatus(idle_since, "game");
Core.prototype.alert("title", "text")
```

Currently available [BetterAPI](https://github.com/Bluscream/BetterDiscord/blob/master/plugins/0_BetterAPI.js) functions:
```js
BetterAPI.log(dbg, "type", "pluginName", "msg");
BetterAPI.appendTo("link", "Element");
BetterAPI.enableTextSelection();
BetterAPI.enableAutoComplete();
BetterAPI.enableButtons();
BetterAPI.isNumber("string");
BetterAPI.isUID("string");
BetterAPI.makeFile("name", "content");
BetterAPI.getBackup();
BetterAPI.visit("href");
BetterAPI.getOwnID();
BetterAPI.getOwnName();
BetterAPI.getOwnAvatarID();
BetterAPI.getOwnAvatarURL();
BetterAPI.serverCount();
BetterAPI.userCount();
BetterAPI.onlineUserCount();
BetterAPI.offlineUserCount();
BetterAPI.getUserIdByName("name");
BetterAPI.getUserNameById(id);
BetterAPI.getUserAvatarID(id);
BetterAPI.getUserAvatarIDbyName("name");
BetterAPI.getUserAvatarURL(id);
BetterAPI.getUserAvatarURLbyName("name");
BetterAPI.getCurrentChannelName();
BetterAPI.getCurrentChannelID();
BetterAPI.getCurrentServerName();
BetterAPI.getCurrentServerID();
BetterAPI.getClientList();
BetterAPI.getClientNameList();
BetterAPI.getClientUIDList();
BetterAPI.addUserLabel("divID", "label", "<html>");
BetterAPI.addUserLink(divID, id1, href1, text1, [id2, href2, text2]);
BetterAPI.addUserButton("btn", "divID", "text");
BetterAPI.addLink("divID", "text", "href");
BetterAPI.addServerButton("divID", "text", "before/after");
BetterAPI.changeUserInfo("nickname", ["avatar" BetterAPI.getUserAvatarID(id)]);
https://github.com/VersatilityWerks/jAlert#quick-use-requires-jalert-functionsjs
https://github.com/fabien-d/alertify.js/wiki/How-to-Use#usage
https://github.com/craigmccoy/jquery-charcount#quick-documentation
https://github.com/afshinm/Json-to-HTML-Table#how-to-use
https://github.com/brandonaaron/livequery/blob/1.1.1/README.markdown#live-query
```

Currently available [webSock](https://github.com/Bluscream/BetterDiscord/blob/master/plugins/0_websock.js) functions:
```js
webSock.sendData(opcode,data);
webSock.sendMessage(); //useless atm.
webSock.sendHeartbeat();
webSock.setStatus(game, idle);
```
