//META{"name":"RemoveChars"}*//
function RemoveChars() {
	this.parseChat = function(){
		var replace_text = '&lt;REDACTED&gt;';
		var to_remove = [ '์', 'ธ'];
		var font_color = 'white';
		var m = document.getElementsByClassName("messages")[0];
		var preH = m.scrollHeight;
		$(".message-text:not(.RemoveChars_parsed").each(function(i,el){
			var e = $(el);var index;var text = e.text();
			for (index = 0; index < to_remove.length; ++index) {
				console.warn(to_remove[index]);console.info(text.indexOf(to_remove[index]));
				if (text.indexOf(to_remove[index]) != '-1'){
					var re = new RegExp('\\'+to_remove[index], 'g');
					replace = text.replace(re, replace_text);
					e.html('<font color="'+font_color+'">'+replace+'</font>');
				}
			}
					
			m.scrollTop+=m.scrollHeight-preH;
		}).addClass("RemoveChars_parsed");
	}
}
RemoveChars.prototype.getName = function() {
    return "Remove Chars";
};
RemoveChars.prototype.getDescription = function() {
    return "Replaces unwanted chars by the text you define.";
};
RemoveChars.prototype.getVersion = function() {
    return "1.0";
};
RemoveChars.prototype.getAuthor = function() {
    return "Bluscream";
};
RemoveChars.prototype.getSettingsPanel = function() {
    $('.embed').hide();
	return null;
};

RemoveChars.prototype.load = function() {};
RemoveChars.prototype.unload = function() {};
RemoveChars.prototype.start = function() {
    this.parseChat()
};
RemoveChars.prototype.stop = function() {
    $(".RemoveChars").remove();
};
RemoveChars.prototype.onMessage = function() {
    this.parseChat();
};
RemoveChars.prototype.onSwitch = function() {
	this.parseChat();
};