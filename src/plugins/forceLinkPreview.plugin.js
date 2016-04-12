//META{"name":"forceLinkPreview"}*//
function forceLinkPreview() {
	this.parseChat = function(){
		var force_links = true;
		var force_image = true;
		var m = document.getElementsByClassName("messages")[0];
		var image = "\
			a[href $='.jpg'],a[href $='.JPG'],\
			a[href $='.png'],a[href $='.PNG'],\
			a[href $='.gif'],a[href $='.GIF'],\
			a[href $='.bmp'],a[href $='.BMP']\
		";
		if (force_links == true) {
			if (force_image == true) {
				$(".message .markup>a:not(.forceLinkPreview_parsed").filter(image).each(function(i,el){
					var e = $(el)
					if ($(e.parents(".message")).find('.embed-image')){
					} else {
						var url = e.attr("href").replace(/http:\/\//gi,"https://")
						var img = $('<div class="embed embed-image">\
										<a class="embed-thumbnail embed-thumbnail-image" href="'+url+'" target="_blank">\
											<img class="image" src="'+url+'" href="'+url+'" border="5">\
										</a>\
									</div>')
						var preH = m.scrollHeight
						e.parents(".message .body").siblings(".accessory").append(img)
						m.scrollTop+=m.scrollHeight-preH
						e.addClass("forceLinkPreview_parsed");
					}
				});
			}
		}
	}
}
forceLinkPreview.prototype.getName = function() {
	return "Force Link Preview";
};
forceLinkPreview.prototype.getDescription = function() {
	return "Forces image previews to showup even when the channel has it disabled.";
};
forceLinkPreview.prototype.getVersion = function() {
    return "1.0";
};
forceLinkPreview.prototype.getAuthor = function() {
    return "Mitchell, Bluscream";
};
forceLinkPreview.prototype.getSettingsPanel = function() {
    $('.embed').hide();
};
forceLinkPreview.prototype.load = function() {};
forceLinkPreview.prototype.unload = function() {};
forceLinkPreview.prototype.start = function() {
    this.parseChat()
};
forceLinkPreview.prototype.stop = function() {
    $(".forceLinkPreview").remove();
};
forceLinkPreview.prototype.onMessage = function() {
    this.parseChat();
};
forceLinkPreview.prototype.onSwitch = function() {
	this.parseChat();
};