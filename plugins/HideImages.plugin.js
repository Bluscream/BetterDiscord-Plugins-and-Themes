//META{"name":"HideImages"}*//

var HideImages = function() {};

HideImages.prototype.customStyles = document.createElement("style");
HideImages.prototype.customStyles.id = "hide-images-style";
HideImages.prototype.customStyles.appendChild(document.createTextNode(
    ".embed-image, .embed-thumbnail, .attachment-image { display:none!important;}"));

HideImages.prototype.data = {};
HideImages.prototype.dataVersion = "2";
HideImages.prototype.defaultData = function() {
    return {
        version: "2",
        from: "00:00",
        until: "23:59"
    };
}
HideImages.prototype.loadData = function() {
    this.data = (localStorage.HideImages) ? JSON.parse(localStorage.HideImages) : {
        version: "0"
    }
    if (this.data.version != this.dataVersion) {
        // wew lad we're using a new way to save our data
        this.data = this.defaultData();
        this.saveData();
    };
};

HideImages.prototype.saveData = function() {
    localStorage.HideImages = JSON.stringify(this.data);
};

HideImages.prototype.extractChannelID = function(str) {
    var res = str.match(/#([a-z\-]+)/);
    if (!res) return;
    res = res[1];
    return $(".channel a:contains('" + res + "')").attr("href").match(/[0-9]+\/([0-9]+)/)[1];
};
HideImages.prototype.getServerID = function() {
    var serverLink = $(".guild.selected a").attr("href");
    return serverLink ? serverLink.match(/([0-9]+)\/[0-9]+/)[1] : undefined;
};
HideImages.prototype.getChannelID = function() {
    var channelLink = $(".guild.selected a").attr("href");
    return channelLink ? channelLink.match(/[0-9]+\/([0-9]+)/)[1] : undefined;
};

HideImages.prototype.hideImages = function() {
    if (!document.contains(document.getElementById("hide-images-style")))
        document.documentElement.insertBefore(this.customStyles, null);
}
HideImages.prototype.showImages = function() {
    if (document.contains(document.getElementById("hide-images-style")))
        document.documentElement.removeChild(this.customStyles);
}
HideImages.prototype.act = function() {
    var now = /\d{2}:\d{2}/.exec((new Date()).toTimeString())[0];
    if (now < this.data.from || now > this.data.until) {
        this.showImages();
        return;
    }
    var serverID = this.getServerID();
    var channelID = this.getChannelID();
    if (this.data[serverID] == undefined) {
        this.data[serverID] = {};
    }
    if (this.data[serverID][channelID]) {
        this.hideImages();
    } else {
        this.showImages();
    }
};

// unused
HideImages.prototype.load = function() {};
HideImages.prototype.unload = function() {};
// unused

HideImages.prototype.start = function() {
    this.loadData();
    this.act();
};

HideImages.prototype.stop = function() {
    this.showImages();
};

HideImages.prototype.onMessage = function() {
    //this.act();
};

HideImages.prototype.onSwitch = function() {
    this.act();
};

HideImages.prototype.observer = function(e) {
    // add button to the context menu
    if (e.addedNodes.length > 0 && e.addedNodes[0].classList && e.addedNodes[0].classList.contains('context-menu')) {
        var elem = document.getElementsByClassName('context-menu')[0];
        if (!elem) return;
        elem = elem.children[0]; // context menu
        if (elem.children[0].innerHTML.indexOf("Mute") != -1) { // channel
            if (elem.innerHTML.indexOf("Hide Images") != -1 || elem.innerHTML.indexOf("Show Images") != -1) return;
            var serverID = this.getServerID();
            var channelID = this.extractChannelID(e.addedNodes[0].children[0].innerHTML);
            var button = document.createElement('div');
            button.className = "item";
            if (this.data[serverID] == undefined) {
                this.data[serverID] = {};
            }
            if (this.data[serverID][channelID])
                button.innerHTML = '<div class="label">Show Images</div>';
            else
                button.innerHTML = '<div class="label">Hide Images</div>';
            var self = this;
            button.onclick = function() {
                if (self.data[serverID] == undefined) {
                    self.data[serverID] = {};
                }
                self.data[serverID][channelID] = self.data[serverID][channelID] ? false : true;
                self.saveData();
                self.act();
                $(".context-menu").css("display", "none");
            };
            this.saveData();
            elem.insertBefore(button, elem.children[1]);
        } else if (elem.children[0].innerHTML.indexOf("Mark As Read") != -1) { // server
            if (elem.innerHTML.indexOf("Hide Images") != -1 || elem.innerHTML.indexOf("Show Images") != -1) return;
            var serverID = this.getServerID();
            var channelID = this.getChannelID();
            var button = document.createElement('div');
            button.className = "item";
            if (this.data[serverID] == undefined) {
                this.data[serverID] = {};
            }
            if (this.data[serverID][channelID])
                button.innerHTML = '<div class="label">Show Images</div>';
            else
                button.innerHTML = '<div class="label">Hide Images</div>';
            var self = this;
            button.onclick = function() {
                if (self.data[serverID] == undefined) {
                    self.data[serverID] = {};
                }
                var hideImage = self.data[self.getServerID()][self.getChannelID()] ? false : true;
                $(".channel-name").each(function(index) {
                    var chan = self.extractChannelID("#" + this.innerHTML);
                    if (chan == undefined) return true;
                    self.data[self.getServerID()][chan] = hideImage;
                });
                self.saveData();
                self.act();
                $(".context-menu").css("display", "none");
            };
            this.saveData();
            elem.insertBefore(button, elem.children[2]);
        }
    }
};
HideImages.prototype.saveSettings = function() {
    this.data.from = document.getElementById("hide-images-from").value;
    this.data.until = document.getElementById("hide-images-until").value;
    document.getElementById("hide-images-msg").innerHTML="Settings saved!";
    setTimeout(function(){
      document.getElementById("hide-images-msg").innerHTML="";
    }, 2000);
    this.saveData();
};

HideImages.prototype.getSettingsPanel = function() {
    var settings = "<h3><b>Settings Panel</b></h3><br/>";
    settings += "Scheduler - <i>Format: \"hh:mm\" (24h)</i><br/><br/>";

    settings +="<form class='form' style='margin-top:10px'>"
    settings += "Hide images on selected channels-<br/>";
    settings += "<div class='control-group'>";
    settings += "<label>From</label><br/>";
    settings += "<input type='text' id='hide-images-from' value='" + this.data.from + "'/><br/>";
    settings += "</div>";
    settings += "<div class='control-group'>";
    settings += "<label>Until</label><br/>";
    settings += "<input type='text' id='hide-images-until' value='" + this.data.until + "'/><br/>";
    settings += "</div>";

    settings += "<div style='margin-top:10px'>"
    settings += "<button type='button' class='btn btn-primary' onclick='BdApi.getPlugin(\"Hide Images\").saveSettings()'>Save</button><br/>";
    settings += "</div>"
    settings +="</form>"

    settings += "<div id='hide-images-msg' style='margin-top:10px'><div><br/>";

    return settings;

};

HideImages.prototype.getName = function() {
    return "Hide Images";
};

HideImages.prototype.getDescription = function() {
    return "Adds a button to the right-click menu to hide images on certain servers and channels.";
};

HideImages.prototype.getVersion = function() {
    return "0.3.1";
};

HideImages.prototype.getAuthor = function() {
    return "Anxeal";
};
