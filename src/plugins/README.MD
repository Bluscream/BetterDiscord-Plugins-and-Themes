//META{"name":"README"}*//
#Plugins

All plugins go to ``` %appdata%\BetterDiscord\plugins\ ```

##API functions provided by BetterDiscord, BetterAPI and webSock
This should help you if you want to write a plugin yourself :)
You should also check out the [testPlugin.plugin.js](https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/src/plugins/testPlugin.plugin.js) and [SettingsTab.plugin.js](https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/src/plugins/SettingsTab.plugin.js).

Currently available [BdApi](https://github.com/Jiiks/BetterDiscordApp/blob/master/js/main.js#L1959) functions:
```js
BdApi.joinServer("code");
BdApi.injectCSS("id", "css code");
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

Currently available [BetterAPI](https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/src/plugins/0_BetterAPI.plugin.js) functions:
```js
BetterAPI.listJSFunctions();
BetterAPI.isEmpty(s);
BetterAPI.isNumber("string");
BetterAPI.isUID("string");
BetterAPI.isDebug();
BetterAPI.toggleDebug();
BetterAPI.openURL("href"); //Opens URL in default webbrowser
BetterAPI.visit("href"); //Navigates to URL in the internal browser
BetterAPI.update(); //WiP
BetterAPI.clearDir("path");
BetterAPI.fileExists(path);
BetterAPI.getFileHash(path);
BetterAPI.makeFile("name", "content");
BetterAPI.DisableLogging();
BetterAPI.EnableLogging();
BetterAPI.enableAutoComplete();
BetterAPI.enableButtons();
BetterAPI.enableTextSelection();
BetterAPI.log(dbg, "type", "pluginName", "msg");
BetterAPI.elemExists(elem, times);
BetterAPI.appendTo("link", "Element");
BetterAPI.requireCSS(uri, elemID);
BetterAPI.requireJS(href, elemID, function);
BetterAPI.addLocationBar();
BetterAPI.updateLocationBar();
BetterAPI.createCharCounter();
BetterAPI.openSettings();
BetterAPI.openStatusPopup();
BetterAPI.getBackup();
BetterAPI.loadSettings(name, default);
BetterAPI.saveSettings("name", settings.object);
BetterAPI.bulkUpload();
BetterAPI.sendImage("imgName", "data:imgData", "channelID");
BetterAPI.changeUserInfo("nickname", ["avatar" BetterAPI.getUserAvatarID(id)]);
BetterAPI.npm(name, callback); // Installs a node moldule and runs callback afterwards
BetterAPI.getAvatarURL(id);
BetterAPI.getAvatarURLbyName("name");
BetterAPI.getClientList();
BetterAPI.getClientNameList();
BetterAPI.getClientUIDList();
BetterAPI.getCurrentServerID();
BetterAPI.getCurrentServerName();
BetterAPI.getCurrentTextChannelID();
BetterAPI.getCurrentTextChannelName();
BetterAPI.getCurrentVoiceChannelName();
BetterAPI.getOwnAvatarID();
BetterAPI.getOwnAvatarURL();
BetterAPI.getOwnDiscriminator();
BetterAPI.getOwnID();
BetterAPI.getOwnName();
BetterAPI.getUserAvatarID(id);
BetterAPI.getUserAvatarIDbyName("name");
BetterAPI.getUserGameByID("id");
BetterAPI.getUserIdByName("name");
BetterAPI.getUserNameById(id);
BetterAPI.offlineUserCount();
BetterAPI.onlineFriendsCount();
BetterAPI.onlineUserCount();
BetterAPI.serverCount();
BetterAPI.userCount();
BetterAPI.addLink("divID", "text", "href");
BetterAPI.addServerButton("divID", "text", "before/after");
BetterAPI.addUserButton("btn", "divID", "text");
BetterAPI.addUserLabel("divID", "label", "<html>");
BetterAPI.addUserLink(divID, id1, href1, text1, [id2, href2, text2]);
```

Currently available [webSock](https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/src/plugins/0_websock.plugin.js) functions:
```js
webSock.sendData(opcode,data);
webSock.sendMessage(); //useless atm.
webSock.sendHeartbeat();
webSock.setStatus(game, idle);
```

If you are using the BetterAPI you can also use the functions and events of the following libraries:

https://github.com/VersatilityWerks/jAlert#quick-use-requires-jalert-functionsjs
http://alertifyjs.com/
https://github.com/craigmccoy/jquery-charcount#quick-documentation
https://github.com/jberryman/dilly.js#toc1
http://momentjs.com/docs/#/use-it/