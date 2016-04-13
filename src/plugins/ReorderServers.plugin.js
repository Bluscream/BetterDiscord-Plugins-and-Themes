//META{"name":"ReorderServers"}*//

function ReorderServers() {}
ReorderServers.prototype.load = function() {
	BdApi.injectCSS("DragulaPluginCSS", '.gu-mirror{list-style:none;position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";filter:alpha(opacity=80)}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";filter:alpha(opacity=20)}');
};
ReorderServers.prototype.start = function() {
	var self = this;
	var data = window.localStorage["ReorderServersDB"];
	if (data !== undefined) {
		var serverOrder = JSON.parse(atob(data));
		setTimeout(function() {
			self.moveServers(serverOrder);
		}, 1000);
	}

	var guilds = $('.guilds')[0];
	var guildAdd = $('button.guilds-add').parent()[0];
	this.dragula = dragula([guilds], {
		moves: function (el) {
			try{return el.getAttribute('data-reactid').length > 20;
			}catch(e){return false;}
		},
		accepts: function (el, t, s, sibling) {
			if (sibling === null) return false;
			if (sibling === guildAdd) return true;
			return self.getGID(sibling) !== undefined;
		}
	}).on('dragend', function(el) {
		var serverOrder = [];
		$('.guilds > li').each(function(i, el) {
			var id = self.getGID(el);
			if (id === undefined) return;
			serverOrder.push(id);
		});
		var saveData = btoa(JSON.stringify(serverOrder));
		window.localStorage["ReorderServersDB"] = saveData;
	})
};

ReorderServers.prototype.stop = function() {
	$('#DragulaPluginJS').remove();
	$('#DragulaPluginCSS').remove();
	this.dragula.destroy();
};

ReorderServers.prototype.unload = function() {
};

ReorderServers.prototype.getName = function() {
	return "Reorder Servers";
};

ReorderServers.prototype.getDescription = function() {
	return "Reorder servers in sidebar by dragging them";
};

ReorderServers.prototype.getVersion = function() {
	return "1.0";
};

ReorderServers.prototype.getAuthor = function() {
	return "EhsanKia";
};

ReorderServers.prototype.getGID = function(el) {
	if (!el || !el.getAttribute('data-reactid')) return;
	return el.getAttribute('data-reactid').split('$')[1];
};

ReorderServers.prototype.moveServers = function(order) {
	var self = this;
	var serverMapping = {};
	$('.guilds > li').each(function(i, el) {
		var id = self.getGID(el);
		if (id === undefined) return;
		serverMapping[id] = el;
	});

	var guildTop = $('.guilds-separator');
	var reverseOrder = order.reverse();
	for (var i = 0; i < reverseOrder.length; i++) {
		var id = reverseOrder[i];
		if (!serverMapping.hasOwnProperty(id)) continue;
		var el = serverMapping[id];
		guildTop.after(el);
	}
};
