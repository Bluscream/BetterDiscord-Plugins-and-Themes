//META{"name":"animatedGamePlugin"}*//

function animatedGamePlugin() {}

animatedGamePlugin.prototype.load = function() {
};

animatedGamePlugin.prototype.unload = function() {
};

animatedGamePlugin.prototype.start = function() {
    var self = this;
    this.enabled = true;
    this.duration = 60000;
    this.minDuration = 250;

    this.interval = setInterval(function() {
        self.setPlaying();
    }, this.duration);

    this.setPlaying();
};

animatedGamePlugin.prototype.stop = function() {
    var gp = this.game;
    this.game = [""];
    this.modulo = 0;
    this.setPlaying();
    this.game = gp;
    clearInterval(this.interval);
    this.enabled = false;
};

animatedGamePlugin.prototype.getName = function() {
    return "Animated Game";
};

animatedGamePlugin.prototype.getDescription = function() {
    return "Animate your playing status";
};

animatedGamePlugin.prototype.getVersion = function() {
    return "1.1";
};

animatedGamePlugin.prototype.getAuthor = function() {
    return "Jiiks (arr. Bloom)";
};

animatedGamePlugin.prototype.getSettingsPanel = function() {
    if(this.game == null) this.game = [""];
    if(this.modulo == null) this.modulo = 0;
    return '<h1>Usage</h1>'+
           '<p>Enter each frame to animate on a new line.  Enter the duration (in milliseconds) to stay on each frame ('+this.minDuration+' millisecond lower limit).</p>' +
           '<p> Press the \'Set game\' button to activate.</p>' +
           '<label for="agPluginGame">Frames: </label> ' + 
           '<br />' +
           '<textarea placeholder="First frame\nSecond frame\netc" name="agPluginGame" id="agPluginGame" cols="40" rows="10">'+this.game.join("\n")+'</textarea>' + 
           '<br />' +
           '<label for="agPluginDuration">Duration (ms): </label> ' +
           '<br />' +
           '<input type="number" placeholder="60000" name="agPluginDuration" id="agPluginDuration" value="'+this.duration+'" />' +
           '<br />' +
           '<button onclick="BdApi.getPlugin(\'Animated Game\').setGame()"><b>Set game</b></button>';
};

animatedGamePlugin.prototype.setGame = function() {
    var gameVal;
    var durationVal;

    gameVal = document.getElementById("agPluginGame").value;
    durationVal = document.getElementById("agPluginDuration").value;

    this.game = gameVal.split(/\n/);
    this.duration = Math.max(parseInt(durationVal), this.minDuration);

    clearInterval(this.interval);
    var self = this;
    this.interval = setInterval(function() {
        self.setPlaying();
    }, this.duration);

    this.modulo = 0;
};

animatedGamePlugin.prototype.setPlaying = function() {
    if(!this.enabled) return;
    if(this.uid == null) {
        if($(".account .avatar-small").css("background-image") == undefined)return;
        this.uid = $(".account .avatar-small").css("background-image").match(/\d+/);
    }

    if(this.game == null) this.game = [""];
    if(this.modulo == null) this.modulo = 0;
    
    var minner = $('.channel-members .member[data-reactid*="'+this.uid+'"]').find(".member-inner")
    var mgame = minner.find(".member-game");
    if(this.game[this.modulo] != "") {
        if(mgame.length) {
            mgame.find("strong").text(this.game[this.modulo]);
        } else {
            minner.append('<div class="member-game"><span>Playing: </span><strong>'+this.game[this.modulo]+'</strong></div>');
        }
    } else {
        if(mgame.length) {
            mgame.remove();
        }
    }
	
    localStorage.setItem('Playing', this.game[this.modulo]);
    BdApi.setPlaying(this.game[this.modulo]);

    this.modulo++;
    this.modulo %= this.game.length;
};