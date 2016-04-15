var QuickDelete = function() {}

QuickDelete.prototype.convert = function() {
	$('div.message-text').each(function(i,el) {
		var current_msg = $(el);
		if (current_msg.find('div.btn-option').length == 1) {
			current_msg.find('div.btn-option').after('<div class="btn-option remove_msg" style="padding-right: 10px; background: url(\'https://puu.sh/ocvtl/fd550eab78.png\') 50% no-repeat;"></div>');
		}
	});
};

QuickDelete.prototype.deleteMessage = function() {
	var parent = $(this).parents('div.message');
	parent.find('div.btn-option:not(.remove_msg)').trigger("click");
	var popout = $(".option-popout");
	popout.children().last().trigger("click");
	popout.hide();
	var form = $("form.delete-message-modal");
	form.find(".btn-primary").trigger("click");
	form.hide();
}

QuickDelete.prototype.observer = function(e) {
	if (e.target.getAttribute('class') != null) {
		if (e.target.getAttribute('class').indexOf('comment') != -1) {
			if (e.addedNodes.length > 0) {
				if (e.addedNodes[0].className.indexOf('message') != 1) {
	        		this.convert();
				}
			}
		}
	}
}

QuickDelete.prototype.load = function() {};
QuickDelete.prototype.unload = function() {};

QuickDelete.prototype.onSwitch = function() {
	this.convert();
};

QuickDelete.prototype.onMessage = function() {
	this.convert();
}

QuickDelete.prototype.start = function() {
	this.convert();
	$(document).on("click", "div.btn-option.remove_msg", this.deleteMessage);
};

QuickDelete.prototype.stop = function() {
	$(document).off("click", "div.btn-option.remove_msg")
	for (var i = $('div.btn-option.remove_msg').length - 1; i >= 0; i--) {
		$('div.btn-option.remove_msg').eq(i).remove();
	}
};

QuickDelete.prototype.update = function() {};
QuickDelete.prototype.getName = function() {
    return "QuickDelete";
};

QuickDelete.prototype.getDescription = function() {
    return "Adds a button next to the options button to quick delete a message.";
};

QuickDelete.prototype.getVersion = function() {
    return "1.0";
};

QuickDelete.prototype.getAuthor = function() {
    return "confuseh";
};

exports.QuickDelete = QuickDelete;