//META{"name":"switcher"}*//
var switcher = function () {}
var guildList = [];

switcher.prototype.getGuildList = function(){
	return guildList;
};

switcher.prototype.fetchGuildList = function(){
	var token = localStorage["token"].replace(/"/g, "");
	$.ajax({
		type: 'GET',
		url: 'https://discordapp.com/api/users/@me/guilds?token='+token,
		success: function(data) {
			guildList = data.map(function(server){
				var imageUrl = null;

				if (server.icon)
					imageUrl = "url(https://cdn.discordapp.com/icons/" + server.id + "/" + server.icon + ".jpg)";

				return {
					type: "guild",
					id: server.id,
					imageUrl: imageUrl,
					title: server.name,
				};
			});
		}
	});
};

switcher.prototype.getAuthor = function(){
	return "Ciarán Walsh";
}
switcher.prototype.getName = function(){
	return "Switcher";
};
switcher.prototype.getDescription = function(){
	return "Use Control+K to show quick channel switcher dialog, or Control-Alt-K to switch servers (Use the Command key instead of Control in OS X).";
};
switcher.prototype.getVersion = function(){
	return "0.3";
};

switcher.prototype.goToItem = function(item){
	var link;

	if (item.type == 'guild') {
		link = $('.guild a[href^="/channels/' + item.id + '"]')[0];
	} else {
		link = $('.channel a[href="' + item.id + '"]')[0];
	}

	if(link)
		link.click();
};

switcher.prototype.currentGuildChannelList = function(){
	return $('.guild-channels .channel-text a, .private-channels .private a').toArray().map(function(link){
		var type = $(link.parentNode).hasClass("private") ? "private" : "channel"
		var name = $(link).text();
		var imageUrl = null;
		var status = null;

		var activity = $(link).find(".channel-activity").text();
		if (activity.length > 0)
			name = name.slice(0, -activity.length);

		var avatar = $(link).find(".avatar-small");
		if (avatar.length > 0)
			imageUrl = avatar.css("background-image");

		var statusEl = $(link).find(".status");
		if (statusEl.length > 0)
			status = statusEl.attr('class').split(" ").find(function(cl) { return cl.startsWith("status-"); })

		return {
			title: name,
			id: link.pathname,
			type: type,
			imageUrl: imageUrl,
			status: status,
		};
	});
};

switcher.prototype.showServerSwitcher = function(){
	var channels = this.getGuildList();

	new SwitcherDialog(channels, this);
}

switcher.prototype.showSwitcher = function(){
	var channels = this.currentGuildChannelList();

	new SwitcherDialog(channels, this);
}

switcher.prototype.load = function(){
	this.addStyles();

	document.addEventListener('keydown', function(event){
		var modifier = (process.platform == "darwin" ? event.metaKey : event.ctrlKey);
		if (modifier && event.keyCode == Keys.K) {
			if (event.altKey) {
				this.showServerSwitcher();
			} else {
				this.showSwitcher();
			}
			event.preventDefault();
		}
	}.bind(this));

	setTimeout(this.fetchGuildList, 2000);
};

switcher.prototype.addStyles = function(){
	var html = ' \
		<style> \
		#switcher-header { margin: 0 auto; padding-bottom: 0; } \
		#switcher-filter { width: 100%; font-weight: bold; xheight: 40px; font-size: 30px; padding: 4px; box-sizing: border-box; border: 0; } \
		#switcher-list-container > div { align-items: center; font-size: 14px; line-height: 1.25em; display: flex; padding: 5px 5px; margin: 5px 0; border-radius: 5px; width: 100%; } \
		#switcher-list-container > div.badge { font-weight: normal; } \
		#switcher-list-container .channel .channel-title:before { content: "#"; } \
		#switcher-list-container .status { border: 2px solid #2e3136; } \
		</style> \
	';
	$("head").append(html);
};

var Keys = {
	K: 75,

	ENTER: 13,
	ESCAPE: 27,
	UP: 38,
	DOWN: 40,
};

var CHANNEL_FILTER_LIST_QUERY = "#switcher-list-container > div";
var SELECTED_CLASS = "badge";

var SwitcherDialog = function(channels, switcher) {
	this.alertIdentifier = "switcher";
	this.channels = channels;
	this.switcher = switcher;
	this.dialog = this.createDialog();
	this.filterField = $("#switcher-filter");

	this.filterField.focus();

	this.filterField.on('input', function(e){
		this.updateFilter();
	}.bind(this));

	this.filterField.on('keydown', function(e){
		if (e.keyCode == Keys.ENTER) {
			this.confirm();
			return e.preventDefault();
		} else if (e.keyCode == Keys.ESCAPE) {
			this.dismiss();
			return e.preventDefault();
		} else if (e.keyCode == Keys.DOWN) {
			this.moveSelection(1);
			return e.preventDefault();
		} else if (e.keyCode == Keys.UP) {
			this.moveSelection(-1);
			return e.preventDefault();
		}
	}.bind(this));

	this.updateFilter();
}

SwitcherDialog.prototype.setSelectionIndex = function(index){
	this.selectionIndex = index;
	$(CHANNEL_FILTER_LIST_QUERY + "." + SELECTED_CLASS).removeClass(SELECTED_CLASS);
	$(CHANNEL_FILTER_LIST_QUERY + ":nth-child("+(this.selectionIndex+1)+")").addClass(SELECTED_CLASS);
};

SwitcherDialog.prototype.moveSelection = function(change){
	var displayedChannelCount = $(CHANNEL_FILTER_LIST_QUERY).length;
	var index = this.selectionIndex + change;
	if (index == displayedChannelCount)
		index = 0;
	else if (index == -1)
		index = displayedChannelCount-1;
	this.setSelectionIndex(index);
};

SwitcherDialog.prototype.itemWithId = function(itemId){
	return this.channels.find(function(item){ return item.id == itemId; });
};

SwitcherDialog.prototype.selectedItem = function(){
	var selection = $(CHANNEL_FILTER_LIST_QUERY + "." + SELECTED_CLASS);
	var selectedItemId = selection.attr('data-channel-id');
	return this.itemWithId(selectedItemId);
};

SwitcherDialog.prototype.confirm = function(){
	var selection = $(CHANNEL_FILTER_LIST_QUERY + "." + SELECTED_CLASS);
	this.switcher.goToItem(this.selectedItem());
	this.dismiss();
};

SwitcherDialog.prototype.updateFilter = function(){
	var query = this.filterField.val().toLowerCase();
	var list = this.channels;
	if (query != '') {
		list = list.filter(function(channel){
			return channel.title.toLowerCase().includes(query);
		});
	}
	this.showChannels(list);
};

SwitcherDialog.prototype.createItem = function(item){
	var link = $('<div />', {
		"data-channel-id": item.id,
		class: item.type
	});

	if (item.imageUrl) {
		var image = $("<div />", {class: "avatar-small stop-animation"});

		if (item.status)
			image.append($("<div />", { class: "status " + item.status }))

		if (item.imageUrl)
			image.css("background-image", item.imageUrl);

		link.append(image);
	}

	link.append($("<div />", { text: item.title, class: "channel-title" }))

	return link;
};

SwitcherDialog.prototype.showChannels = function(channels){
	var dialog = this;
	var switcher = this.switcher;

	$("#switcher-list-container").empty();
	$(channels).each(function(){
		var link = dialog.createItem(this);
		link.on('click', function(){
			var channelId = $(this).attr('data-channel-id');
			switcher.goToItem(dialog.itemWithId(channelId));
		})
		$("#switcher-list-container").append(link);
	});

	this.setSelectionIndex(0);
};

SwitcherDialog.prototype.dismiss = function(){
	Utils.prototype.removeBackdrop(this.alertIdentifier);
	$("#bda-alert-" + this.alertIdentifier).remove();
};

SwitcherDialog.prototype.createDialog = function(){
	var title = "Switcher";
	var html = '\
	<div id="bda-alert-'+this.alertIdentifier+'" class="modal bda-alert" style="opacity:1" data-bdalert="'+this.alertIdentifier+'">\
		<div class="modal-inner" style="box-shadow:0 0 8px -2px #000;">\
			<div class="markdown-modal">\
				<div class="markdown-modal-header" id="switcher-header">\
					<input type="text" id="switcher-filter" /> \
				</div>\
				<div class="scroller-wrap fade">\
					<div style="font-weight:700; padding-top: 0" class="scroller"> \
						<div id="switcher-list-container"></div> \
					</div>\
				</div>\
				<div class="markdown-modal-footer">\
					<span style="float: right"> \
						Use arrow keys to move the selection, and enter to confirm. \
					</span> \
				</div>\
			</div>\
		</div>\
	</div>\
	';
	$("body").append(html);
	Utils.prototype.addBackdrop(this.alertIdentifier);
};
