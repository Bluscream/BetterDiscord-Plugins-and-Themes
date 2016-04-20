//META{"name":"CustomHighlight"}*//
function CustomHighlight() {
	this.getName = function() { return "Custom Highlight"; };
	this.getDescription = function() { return "Highlights lines containing specified words."; };
	this.getVersion = function() { return "1.0"; };
	this.getAuthor = function() { return "EhsanKia"; };
}

CustomHighlight.prototype.highlight = function () {
	var lines = document.querySelectorAll('div.message-text');
	for (i = 0; i < lines.length; ++i) {
		var content = lines[i].innerText.toLowerCase();
		if (!this.containsName(content)) continue;
		var message = lines[i].parentElement.parentElement;
		message.classList.add('mentioned');
	}
};

CustomHighlight.prototype.containsName = function(line) {
	line = line.toLowerCase();
	for (var i = 0; i < this.words.length; i++) {
		if (line.indexOf(this.words[i].toLowerCase()) >= 0)
			return true;
	}
	return false;
};

CustomHighlight.prototype.load = function () {};
CustomHighlight.prototype.start = function () {
	this.loadDatabase();
	this.highlight();
};

CustomHighlight.prototype.onMessage = function () {
	this.highlight();
};

CustomHighlight.prototype.onSwitch = function () {
	this.highlight();
};

CustomHighlight.prototype.stop = function () {};
CustomHighlight.prototype.unload = function () {};

CustomHighlight.prototype.getSettingsPanel = function() {
	var self = this;
	var settings = $('<div class="form"></div>');
	settings.append('<h1 style="font-weight: bold">Custom Highlights:</h1>');

	var rowHtml = "";
	rowHtml += '<div class="control-group EncryptedText-inputgroup">';
	rowHtml += '	<input style="width: 40%;" type="text" name="name" placeholder="Name">';
	rowHtml += '	<input style="width: 40%;" type="text" name="data" placeholder="Color">';
	rowHtml += '</div><br>';

	for (var key in customHighlights) {
		if (!customHighlights.hasOwnProperty(key)) continue;
		var row = $(rowHtml);
		row.find('input[name="name"]').val(key);
		row.find('input[name="data"]').val(customHighlights[key]);
		settings.append(row);
	}

	settings.append(rowHtml);

	var addButton = $('<button type="button" class="btn btn-primary">Add Row</div>')
		.click(function() {
			$(this).before(rowHtml);
		});

	var saveButton = $('<button type="button" class="btn btn-primary">Save</div>')
		.click(function() {
			customHighlights = {};
			settings.find('.EncryptedText-inputgroup').each(function(i, el) {
				var $e = $(el);
				var key = $e.find('input[name="name"]').val();
				var data = $e.find('input[name="data"]').val();
				if (key.trim() === "" || data.trim() === "") return;
				customHighlights[key] = data;
			});

			self.saveDatabase();
			self.highlight();

			var $b = $(this).text('Saved!');
			setTimeout(function() {$b.text('Save');}, 1000);
		});

	settings.append(addButton);
	settings.append(saveButton);
	return settings;
};

CustomHighlight.prototype.saveDatabase = function() {
	window.localStorage["CustomHighlightDB"] = btoa(JSON.stringify(this.words));
}

CustomHighlight.prototype.loadDatabase = function() {
	if (window.localStorage.hasOwnProperty("CustomHighlightDB")) {
		var data = window.localStorage["CustomHighlightDB"];
		this.words = JSON.parse(atob(data));
	} else {
		this.words = [];
	}
}
try{exports.CustomHighlight = CustomHighlight;}catch(e){console.warn('Using old version, not exporting functions.')}
