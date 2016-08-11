//META{"name": "betaPlugin"}*//

var betaPlugin = function() {}

betaPlugin.prototype.load = function() {
	this.enabled = false;
	var self = this;
	this.emoteAc = {
		'attach': () => {
			$(".channel-textarea").append('<div class="channel-textarea-autocomplete" id="bd-ac"><div class="channel-textarea-autocomplete-inner"><header><div>Emotes matching <strong class="bd-ac-se"></strong></div></header><ul class="bd-ac-ul"></ul></div></div>');
		},
		'start': () => {
			$('body').delegate(".channel-textarea-inner textarea:first", 'keypress.eac keydown.eac', self.emoteAc.eh);
			$('body').delegate(".channel-textarea-inner textarea:first", 'keyup.eac', self.emoteAc.ac);
		},
		'eh': (e) => {
			if($("#bd-ac").length < 1) self.emoteAc.attach();
			if(!$("#bd-ac").is(":visible")) return;
			if(e.which === 9) { 
				var ta = $(".channel-textarea-inner textarea:first");
				var text = ta.val();
				ta.val(text.substring(0, text.lastIndexOf(" ")) + " " + $(".bd-ac-e.active").find(".username").text());
				$("#bd-ac").hide();
				e.preventDefault();
				return;
			}
		},
		'ac': (e) => {
			if($("#bd-ac").length < 1) self.emoteAc.attach();
			var which = e.which;
			if(which === 9) return;
			if($("#bd-ac").is(":visible")) { 
				var index = $(".bd-ac-e.active").index();
				var length = $(".bd-ac-e").length;
				if(which === 38) {
					index--;
					if(index < 0) index = length - 1;
					$(".bd-ac-e").removeClass("active");
					$($(".bd-ac-e")[index]).addClass("active");
					return;
				}
				if(which === 40) {
					index++;
					if(index >= length) index = 0;
					$(".bd-ac-e").removeClass("active");
					$($(".bd-ac-e")[index]).addClass("active");
					return;
				}
			}

			var bdac = $("#bd-ac");
			var header = bdac.find(".bd-ac-se");
			var list = bdac.find(".bd-ac-ul");
			bdac.hide();
			
			list.empty();

			var text = $(".channel-textarea-inner textarea:first").val();
    		if (text == undefined) return;

    		var lastWord = text.split(" ").pop().toLowerCase();
    		if(lastWord.length < 3) return;

    		var ac = {};
			for(var emote in emotesTwitch.emotes) { 
				var et = emote.toLowerCase();
				if(et.indexOf(lastWord) > -1) {
					ac[emote] = "https://static-cdn.jtvnw.net/emoticons/v1/" + emotesTwitch.emotes[emote].image_id + "/1.0";
				}
			}
			var favs = Object.keys(quickEmoteMenu.favoriteEmotes);
			favs.forEach(function(emote) { 
				var et = emote.toLowerCase();
				if(et.indexOf(lastWord) > -1) {
					ac[emote] = quickEmoteMenu.favoriteEmotes[emote];
				}
			});

			if(Object.keys(ac).length <= 0) return;

    		header.text(text.split(" ").pop());
			
    		for(var emote in ac) {
			
    			var li = $("<li/>", {
    				class: "bd-ac-e"
    			});
    			var block = $("<span/>", {
    				class: "user"
    			});
    			var img = $("<div/>", {
    				class: "avatar-small animate",
    				style: `background-image:url("${ac[emote]}")`
    			});
    			block.append(img);
    			var tag = $("<div/>", {
    				class: "discord-tag"
    			});
    			var name = $("<span/>", {
    				class: "username",
    				text: emote
    			});
    			tag.append(name);
    			block.append(tag);
    			li.append(block);
    			list.append(li);
    		}
    		$(".bd-ac-e").first().addClass("active");
    		bdac.show();
    		self.emoteAc.hookAc();
		},
		'hookAc': () => {
			$(".bd-ac-e").on("mouseover", function(e) {
				$(".bd-ac-e").removeClass("active");
				$(this).addClass("active");
			});
			$(".bd-ac-e").on("click", function(e) {
				var ta = $(".channel-textarea-inner textarea:first");
				var text = ta.val();
				ta.val(text.substring(0, text.lastIndexOf(" ")) + " " + $(".bd-ac-e.active").find(".username").text());
				$("#bd-ac").hide();
			});
		},
		'stop': () => {
			$("#bd-ac").remove();
			$('body').undelegate(".channel-textarea-inner textarea:first", 'keyup.eac', self.emoteAc.ac);
			$('body').undelegate(".channel-textarea-inner textarea:first", 'keypress.eac keydown.eac', self.emoteAc.eh);
		}
	};

	this.hln = {
		highlight: () => {
			$(".markup:not(bdhl").each(function(e) {
				var t = $(this);
				if(t.text().toLowerCase().indexOf(self.hln.name()) > -1) {
					t.addClass("bdhl");
					t.closest(".message").addClass("mentioned");
				}
			});
		},
		name: () => {
			return $(".account-details .username").text().toLowerCase();
		}
	}
};


betaPlugin.prototype.start = function() {
	this.enabled = true;
	this.emoteAc.start();	
};

betaPlugin.prototype.stop = function() {
	this.enabled = false;
	this.emoteAc.stop();
};


betaPlugin.prototype.getName = () => { return "BetterDiscord beta test"; };
betaPlugin.prototype.getDescription = () => { return "Enables certain beta features before they're implemented to BetterDiscord"; };
betaPlugin.prototype.getVersion = () => { return "1.0.0"; };
betaPlugin.prototype.getAuthor = () => { return "Jiiks"; };

betaPlugin.prototype.unload = () => {};
betaPlugin.prototype.onMessage = function() {
	if(!this.enabled) return;
	this.hln.highlight();
};
betaPlugin.prototype.onSwitch = function() {
	if(!this.enabled) return;
	this.hln.highlight();
};
betaPlugin.prototype.observer = (e) => {};
betaPlugin.prototype.getSettingsPanel = () => { return ""; };