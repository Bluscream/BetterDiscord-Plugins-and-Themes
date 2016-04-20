//META{"name":"ehln"}*//
function ehln() {
	this.getName = function() { return "Highlight Name"; };
	this.getDescription = function() { return "Highlights Lines containing Name"; };
	this.getVersion = function() { return "0.0.1"; };
	this.getAuthor = function() { return "Pohky"; };
}

ehln.prototype.highlight = function () {
	var stufftohighlight = [$('span.username').text(), "bluscream", "betterdiscord+", "bd+"];
	var color = localStorage.getItem('ehln_color') || '#009933';
	$('.message-text').each(function(i, el) {
		var e = $(el);var txt = $(el).text().toLowerCase();
		for (i = 0; i < stufftohighlight; ++i) {
			if(txt.indexOf(stufftohighlight[i]) != -1){
				e.css('backgroundColor', color);
				e.addClass('highlighted');
			}
		}
	});
};

ehln.prototype.setColor = function (e) {
	var color = e.value;
	localStorage.setItem('ehln_color', color);
};
ehln.prototype.resetConfig = function () {
	localStorage.removeItem('ehln_color');
	
	var cp = document.querySelector('#colorpick');
	if(cp !== null){
		cp.value = '#009933';
	}
};
ehln.prototype.onMessage = function () {
	this.highlight();
};

ehln.prototype.onSwitch = function () {
	this.highlight();
};

ehln.prototype.start = function () {
	this.highlight();
};

ehln.prototype.load = function () {};
ehln.prototype.unload = function () {};
ehln.prototype.stop = function () {};
ehln.prototype.getSettingsPanel = function () {
	var html = [];
	html.push('</br>');
	html.push('<label for="colorpick">Click to select Highlight-Color</label>');
	var color = localStorage.getItem('ehln_color') || '#009933';
	html.push('<input type="color" id="colorpick" onchange="ehln.prototype.setColor(this)" value="' + color + '" style="width:100px;">');
	html.push('</br><input type="button" id="resetConfig" onclick="ehln.prototype.resetConfig()" value="Reset Config">');
	return html.join('\n');
};

try{exports.ehln = ehln;}catch(e){console.warn('Using old version, not exporting functions.');}

