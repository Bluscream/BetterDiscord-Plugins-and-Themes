//META{"name":"ColoredVoice"}*//

var ColoredVoice = function() {};
ColoredVoice.prototype.data = {};
ColoredVoice.prototype.dataVersion = "1";
ColoredVoice.prototype.defaultData = function() {
    return {
        version: "1"
    };
}
ColoredVoice.prototype.loadData = function() {
    // using the same data as ColoredTyping
    this.data = (localStorage.ColoredTyping) ? JSON.parse(localStorage.ColoredTyping) : {
        version: "0"
    };
    if (this.data.version != this.dataVersion) {
        // wew lad we're using a new way to save our data
        this.data = this.defaultData();
        this.saveData();
    };
};

ColoredVoice.prototype.saveData = function() {
    localStorage.ColoredTyping = JSON.stringify(this.data);
};

ColoredVoice.prototype.colorize = function() {
    var self = this;
    $(".channel-voice div span").each(function(index) {
        var username = $(this).text();
        $(this).css("color", self.data[username]);
    });
};

ColoredVoice.prototype.decolorize = function() {
    $(".channel-voice div span").each(function(index) {
        $(this).css("color", "");
    });
};

// unused
ColoredVoice.prototype.load = function() {};
ColoredVoice.prototype.unload = function() {};
// unused

ColoredVoice.prototype.onMessage = function() {
    var username = $(".message .user-name").last().text();
    var color = $(".message .user-name").last().css("color");
    this.data[username] = color;
    this.saveData();
};

ColoredVoice.prototype.start = function() {
    this.loadData();
    this.colorize();
};

ColoredVoice.prototype.stop = function() {
    this.decolorize();
};


ColoredVoice.prototype.onSwitch = function() {
    var self = this;
    $('.member-username').each(function(index) {
        var username = $(this).children().html();
        var color = $(this).css('color');
        self.data[username] = color;
    });
    this.saveData();
    this.decolorize();
    this.colorize();
};

ColoredVoice.prototype.observer = function(e) {
    //console.log(e);
    if (e.addedNodes.length && e.addedNodes[0].classList && e.addedNodes[0].classList.contains("channel-voice")) {
        this.decolorize();
        this.colorize();
    }
    if ((e.addedNodes.length && e.addedNodes[0].localName === "ul") ||
        (e.removedNodes.length && e.removedNodes[0].classList && e.removedNodes[0].classList.contains("channel-voice-states"))) {
        this.decolorize();
        this.colorize();
    }
    if (e.addedNodes.length && e.addedNodes[0].localName === "li" &&
        e.addedNodes[0].parentNode.className === "channel-voice-states") {
        this.decolorize();
        this.colorize();
    }
};

ColoredVoice.prototype.getSettingsPanel = function() {
    return "";
};

ColoredVoice.prototype.getName = function() {
    return "Colored Voice";
};

ColoredVoice.prototype.getDescription = function() {
    return "Make the text color of the names in the voice channel same as role color";
};

ColoredVoice.prototype.getVersion = function() {
    return "0.1.2";
};

ColoredVoice.prototype.getAuthor = function() {
    return "Anxeal";
};
