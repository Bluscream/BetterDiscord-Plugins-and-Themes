//META{"name":"EmbedVideoGif"}*//

/*
 ====== Installation ======
 1. Save file as EmbedVideoGif.js
 2. place file in %appdata%/BetterDiscord/plugins
 3. Refresh Discord (ctrl+R)
 4. Go to User Settings > BetterDiscord > Plugins
 5. Enable EmbedVideoGif


========== Usage ==========
Hover over gfycat/gifv to play the video
like you would with normal gifs


 ======== Changelog ========
 1.0: Initial release
 1.1: Scroll chat after embedding

**/

function EmbedVideoGif() {}

EmbedVideoGif.prototype.parseChat = function() {
	var messages = document.getElementsByClassName("messages")[0];
	$(".message .markup > a:not(.VidGif_parsed)").each(function(i, el) {
		var e = $(el)
		var url = e.attr("href");
		var tag1 = /.*gfycat\.com\/(\w+).*/.exec(url)
		var tag2 = /.*imgur\.com\/(\w+)\.gifv/.exec(url)
		if (tag1 === null && tag2 === null) return;

		var accessory = e.parents(".message .body").siblings(".accessory");

		function replaceImage(src) {
			var vid = $("<video width='300px' loop><source src='" + src + "'></video>");
			vid.mouseenter(function() {
				this.play();
			}).mouseleave(function() {
				this.currentTime = 0;
				this.pause();
			});

			var i = setInterval(function() {
				if (accessory.find('.embed-thumbnail').length === 0) return;
				var preH = messages.scrollHeight;
				accessory.find('.embed-thumbnail').html(vid);
				messages.scrollTop += messages.scrollHeight - preH;
				clearInterval(i);
			}, 100);
		}

		if (tag1 !== null) {
			$.getJSON('https://gfycat.com/cajax/get/' + tag1[1], function(data) {
				replaceImage(data.gfyItem.webmUrl);
			});
		} else {
			replaceImage('https://i.imgur.com/' + tag2[1] + '.webm');
		}

	}).addClass("VidGif_parsed");
}

EmbedVideoGif.prototype.load = function() {};

EmbedVideoGif.prototype.unload = function() {};

EmbedVideoGif.prototype.start = function() {
	var self = this;
	this.mutationObs = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			var newNodes = mutation.addedNodes;
			if (newNodes.length === 0 || newNodes[0].classList === undefined) return;
			if (newNodes[0].classList.contains('message-sending')) return;
			if (!mutation.target.classList.contains('comment')) return;
			self.parseChat();
		});
	});

	this.mutationObs.observe(document, {
		childList: true,
		subtree: true
	});

	this.parseChat();
};

EmbedVideoGif.prototype.onSwitch = function() {
	this.parseChat();
};

EmbedVideoGif.prototype.onMessage = function() {};

EmbedVideoGif.prototype.stop = function() {
	this.mutationObs.disconnect();
};

EmbedVideoGif.prototype.getName = function() {
	return "Embed Video Gif";
};

EmbedVideoGif.prototype.getDescription = function() {
	return "Allows you to see gfycat/gifv videos in chat";
};

EmbedVideoGif.prototype.getVersion = function() {
	return "1.1";
};

EmbedVideoGif.prototype.getAuthor = function() {
	return "EhsanKia";
};