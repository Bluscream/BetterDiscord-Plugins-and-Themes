//META{"name":"hideStuffThingy"}*//


var hideStuffThingyHideFunction = function(event){
	
  if (event.altKey && event.keyCode === 84) { //
    var channelWrap = $('.flex-vertical.channels-wrap')[0];
    var guildsWrap = $('.guilds-wrapper')[0];
    if (channelWrap.getAttribute('style') === 'display: none') {
      channelWrap.setAttribute('style', '');
      guildsWrap.setAttribute('style', '');
    } else {
      channelWrap.setAttribute('style', 'display: none');
      guildsWrap.setAttribute('style', 'display: none');
    }
  }
};


function hideStuffThingy() {}
hideStuffThingy.prototype.load = function() {
};
hideStuffThingy.prototype.unload = function() {
};
hideStuffThingy.prototype.start = function() {
	window.addEventListener('keydown', 	hideStuffThingyHideFunction);
};
hideStuffThingy.prototype.stop = function() {
    window.removeEventListener('keydown', hideStuffThingyHideFunction);
};
hideStuffThingy.prototype.update = function() {
};
hideStuffThingy.prototype.getName = function() {
    return "hideStuffThingy plugin name here";
};
hideStuffThingy.prototype.getDescription = function() {
    return "does something probably";
};
hideStuffThingy.prototype.getVersion = function() {
    return "0.0.1";
};
hideStuffThingy.prototype.getAuthor = function() {
    return "Top Bunk";
};