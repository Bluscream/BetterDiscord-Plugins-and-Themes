//META{"name":"colourCord"}*//
function colourCord() {}
colourCord.prototype.load = function() {
    //Called when plugin is loaded(eg. Discord load/reload)
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + "(" + this.getVersion() + ") loaded", "color: purple; font-weight: bold;", "");
};
colourCord.prototype.unload = function() {
    //Called when plugin is unloaded
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + "(" + this.getVersion() + ") unloaded", "color: purple; font-weight: bold;", "");
};
colourCord.prototype.start = function() {
    //Called when user starts plugin
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + "(" + this.getVersion() + ") started", "color: purple; font-weight: bold;", "");
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "//raw.githubusercontent.com/DavidDurman/FlexiColorPicker/master/colorpicker.min.js";
    $("head").append(s);
    var cpCSS = "<style>.picker-wrapper, .slide-wrapper {position: relative; float: left;} .cp-default .picker {width:200px; height:200px;} .picker, .slide{cursor: crosshair; float: left;} .picker-indicator{left:111.5px; right:0px; top: 57.5px;} .cp-default .picker-indicator{width:5px; height:5px; border:2px solid darkblue; border-radius:4px; opacity:.5; background-color: white;} .picker-indicator, .slide-indicator{position: absolute; left: 0; top: 0; pointer-events: none;} .cp-default .slide-wrapper{margin-left:10px;} .cp-default .slide{width:30px; height: 200px;} .slide-indicator//{top:102.864px;} .cp-default .slide-indicator{width:100%; height:10px; left:-4px; opacity:.6; border:4px solid lightblue; border-radius:4px; background-color: white;} .main-hex{margin-top:10px; margin-bottom: 10px;} #picker{width: 100%; height:270px;}</style>";
    $("head").append(cpCSS);
    colourCord.applyColour();
};
colourCord.prototype.stop = function() {
    //Called when user stops plugin
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + "(" + this.getVersion() + ") stopped", "color: purple; font-weight: bold;", "");
};
colourCord.prototype.getSettingsPanel = function() {
	var maccent = localStorage.mainAccent == undefined ? "#FFFFFF" : localStorage.mainAccent;
	var seccent = localStorage.secondaryAccent == undefined ? "#FFFFFF" : localStorage.secondaryAccent;
	return "<div id='picker'><label>ColourCord - Main Accent</label><div class='main-hex'><span class='main-color'>" + maccent + "</span></div><div id='mycolorpicker' class='cp-default'></div><script>var cpMain = ColorPicker(document.getElementById('mycolorpicker'), function(hex, hsv, rgb) { $('.main-color').text(hex); localStorage.mainAccent = hex; colourCord.applyColour(); }); cpMain.setHex('"+ maccent +"'); </script></div></div> <div id='picker'><label>ColourCord - Secondary Accent</label><div class='main-hex'><span class='secondary-color'>" + seccent + "</span></div><div id='mycolorpicker2' class='cp-default'></div><script>var cpSecondary = ColorPicker(document.getElementById('mycolorpicker2'), function(hex, hsv, rgb) { $('.secondary-color').text(hex); localStorage.secondaryAccent = hex; colourCord.applyColour() ;}); cpSecondary.setHex('"+ seccent +"');  </script></div></div>";
};
colourCord.prototype.getName = function() {
    return "ColourCord";
};
colourCord.prototype.getDescription = function() {
    return "Lets you style affecnts to your liking";
};
colourCord.prototype.getVersion = function() {
    return "1.0";
};
colourCord.prototype.getAuthor = function() {
    return "Soulweaver";
};
colourCord.applyColour = function() {
    var finalCSS = "<style id='colourcord'>form[data-reactid='.0.1.1.0.2.1.0.1'],form[data-reactid='.0.1.1.0.2.1.0.1']{margin:0!important}.channel-textarea{margin:20px 20px 30px!important}#twitchcord-button-container{right:20px!important}.tooltip{background-color:" + localStorage.mainAccent + "!important}.tooltip-top:after{border-top-color:" + localStorage.mainAccent + "!important}.tooltip-right:after{border-right-color:" + localStorage.mainAccent + "!important}.divider.divider-red span{color:" + localStorage.mainAccent + "!important;background:0 0!important}.chat>.content .messages .divider.divider-red>div,.form .btn-primary,.guilds li.active .guild-inner,.guilds li:hover .guild-inner,.radio .radio-inner span:after,.slider-bar-fill{background:" + localStorage.mainAccent + "!important}.guild-channels ul .channel-text.selected:before{border-left:4px solid " + localStorage.mainAccent + "!important}.chat .title-wrap .topic a{color:" + localStorage.secondaryAccent + "!important}.member-roles .member-role,.user-settings-modal a{color:" + localStorage.mainAccent + "!important}.checkbox .checkbox-inner input[type=checkbox]:checked+span{background-color:" + localStorage.mainAccent + "!important;border-color:" + localStorage.mainAccent + "!important}.form .control-group input[type=email]:focus,.form .control-group input[type=password]:focus,.form .control-group input[type=text]:focus,.form .control-group textarea:focus,.tab-bar.TOP .tab-bar-item.selected{border-bottom:2px solid " + localStorage.mainAccent + "!important}.tab-bar.SIDE .tab-bar-item:before{border-left:4px solid " + localStorage.mainAccent + "!important}.chat .new-messages-bar,.popout header{background-color:" + localStorage.mainAccent + "!important}.user-popout .user-popout-options .btn{background-color:" + localStorage.mainAccent + "!important;border:1px solid " + localStorage.mainAccent + "!important}.user-popout .user-popout-options .btn:hover{background-color:" + localStorage.secondaryAccent + "!important}.user-popout .user-popout-options .btn.btn-server{background-color:transparent!important}.highlight{color:" + localStorage.secondaryAccent + "!important}.message-group .mentioned .message-text:after{border-left:4px solid " + localStorage.mainAccent + "!important}.chat>.content .messages .mentioned .message-text{background:rgba(" + colourCord.toRgb(localStorage.mainAccent).r + "," + colourCord.toRgb(localStorage.mainAccent).g + "," + colourCord.toRgb(localStorage.mainAccent).b + ",.1)!important}.chat>.content .messages .message-group .comment .markup .highlight:hover{background:rgba(100,65,165,.7)!important}.scroller-wrap .scroller::-webkit-scrollbar-thumb{background-color:" + localStorage.mainAccent + "!important}</style>";
    $("#colourcord").remove();
    $("head").append(finalCSS);
};
colourCord.toRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}