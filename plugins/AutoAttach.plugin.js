//META{"name":"AutoAttach"}*//
 
function AutoAttach() {
    return;
}
 
AutoAttach.prototype.pluginName = "AutoAttach";
 
AutoAttach.prototype.load = function() {};
 
AutoAttach.prototype.unload = function() {};
 
AutoAttach.prototype.start = function() {
	console.log('AutoAttach: start');
	$(".channelTextArea-1HTP3C textarea").each((index, elem) => {
		console.log('AutoAttach: neues element');
		$(elem).on("keypress.AutoAttach", (e) => {this.format(e)});
	});
};

AutoAttach.prototype.stop = function() {
	$(document).add("*").off(appNameShort);
};

AutoAttach.prototype.format = function(e) {
	console.log('AutoAttach: neues format');
	if (e.shiftKey || e.which != 13) return;
	var textarea = $(e.currentTarget);
	var text = textarea.val();
	var fd = new FormData();
	fd.append('content',text);
	$.ajax({
	  type: "POST",
	  url: "https://discordapp.com/api/channels/" + window.location.pathname.split('/').pop() + "/messages",
	  headers: {
		  "authorization": "mfa.SLCbOcB6l8fvqVvRTU0OcCdX8I1xh3SAHHZlcb_VumfeZInpPWLk9FCKEqCp97u1qkI-1qOLMB-bK-GVBoWC"
	  },
	  data: fd,
	  processData: false,
	  contentType: 'multipart/form-data',
	});
	$(this).val("");
	e.preventDefault();
	e.stopPropagation();
}

AutoAttach.prototype.sendTextMessage = function(text) {

};
 
AutoAttach.prototype.onSwitch = function() {};
 
AutoAttach.prototype.getName = function() {
    return "AutoAttach";
};
 
AutoAttach.prototype.getDescription = function() {
    return "Enables the experiments tab on the Discord client. May require closing and reopening user settings to take effect. Open settings panel for more information."
};
 
AutoAttach.prototype.getVersion = function() {
    return "1";
};
 
AutoAttach.prototype.getAuthor = function() {
    return "Pointy";
};
 
AutoAttach.prototype.getSettingsPanel = function() {
    return `Currently tested working on Discord Canary 0.0.157 Build 2121.
            Can't guarentee functionality.
            Disable the plugin and restart the client to remove.`;
};