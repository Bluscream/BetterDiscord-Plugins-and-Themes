//META{"name":"ColoredTyping"}*//

var ColoredTyping = function() {};
ColoredTyping.prototype.data = {};
ColoredTyping.prototype.dataVersion = "1";
ColoredTyping.prototype.defaultData = function() {
    return {
        version: "1"
    };
}
ColoredTyping.prototype.loadData = function() {
    this.data = (localStorage.ColoredTyping) ? JSON.parse(localStorage.ColoredTyping) : {
        version: "0"
    };
    if (this.data.version != this.dataVersion) {
        // wew lad we're using a new way to save our data
        this.data = this.defaultData();
        this.saveData();
    };
};

ColoredTyping.prototype.saveData = function() {
    localStorage.ColoredTyping = JSON.stringify(this.data);
};

ColoredTyping.prototype.colorize = function() {
    var self = this;
    $(".typing strong").each(function(index) {
        var username = $(this).text();
        $(this).css("color", self.data[username]);
    });
};

ColoredTyping.prototype.decolorize = function() {
    $(".typing strong").each(function(index) {
        $(this).css("color", "");
    });
};

// unused
ColoredTyping.prototype.load = function() {};
ColoredTyping.prototype.unload = function() {};
// unused

ColoredTyping.prototype.onMessage = function() {
    var username = $(".message .user-name").last().text();
    var color = $(".message .user-name").last().css("color");
    this.data[username] = color;
    this.saveData();
};

ColoredTyping.prototype.start = function() {
    this.loadData();
    this.colorize();
};

ColoredTyping.prototype.stop = function() {
    this.decolorize();
};

ColoredTyping.prototype.onSwitch = function() {
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

ColoredTyping.prototype.observer = function(e) {
    if (e.addedNodes.length && e.addedNodes[0].classList && e.addedNodes[0].classList.contains("typing")) {
        this.decolorize();
        this.colorize();
    }
    if ((e.addedNodes.length && e.addedNodes[0].localName === "strong") ||
        (e.addedNodes.length && e.addedNodes[0].classList && e.addedNodes[0].classList.contains("spinner"))) {
        this.decolorize();
        this.colorize();
    }
    if ((e.removedNodes.length && e.removedNodes[0].localName === "strong") ||
        (e.removedNodes.length && e.removedNodes[0].classList && e.removedNodes[0].classList.contains("spinner"))) {
        this.decolorize();
        this.colorize();
    }
};

ColoredTyping.prototype.getSettingsPanel = function() {
    return "";
};

ColoredTyping.prototype.getName = function() {
    return "Colored Typing";
};

ColoredTyping.prototype.getDescription = function() {
    return "Make the text color of the \"typing...\" text same as role color";
};

ColoredTyping.prototype.getVersion = function() {
    return "0.1.6";
};

ColoredTyping.prototype.getAuthor = function() {
    return "Anxeal, Bolli";
};
