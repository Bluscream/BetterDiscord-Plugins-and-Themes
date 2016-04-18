var QuickDelete = function() {}

QuickDelete.prototype.convert = function() {
	$('div.message-text').each(function(i,el) {
		var current_msg = $(el);
		if (current_msg.find('div.btn-option').length == 1 && current_msg.find('div.remove_msg').length == 0) {
			current_msg.find('div.btn-option').after('<div class="remove_msg" style="visibility: hidden;padding-right: 10px; background: url(\'https://puu.sh/ocvtl/fd550eab78.png\') 50% no-repeat; width: 16px; height: 16px; background-size: 16px 16px; cursor: pointer; float: right;"></div>');
		}
	});
};

QuickDelete.prototype.deleteMessage = function() {
	var backdrop = $('span[data-reactid=".0.5"]');
	backdrop.css('visibility', 'hidden');
	var parent = $(this).parents('div.message');
	parent.find('div.btn-option').trigger("click");
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
	if (e.removedNodes.length > 0) {
		if (e.removedNodes[0].className == "callout-backdrop") {
			var backdrop = $('span[data-reactid=".0.5"]');
			if (backdrop.css('visibility') == "hidden") {
				backdrop.css('visibility', 'visible');
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
	$(document).on("click", "div.remove_msg", this.deleteMessage);
	$(document).on("mouseover", "div.message", function() {
		$(this).find('div.remove_msg').css('visibility', 'visible');
	});
	$(document).on("mouseleave", "div.message", function() {
		$(this).find('div.remove_msg').css('visibility', 'hidden');
	});
};

QuickDelete.prototype.stop = function() {
	$(document).off("click", "div.remove_msg");
	$(document).off("mouseover", "div.message");
	$(document).off("mouseleave", "div.message");
	$('div.remove_msg').eq(i).remove();
};

QuickDelete.prototype.update = function() {};
QuickDelete.prototype.getName = function() {
    return "QuickDelete";
};

QuickDelete.prototype.getDescription = function() {
    return "Adds a button next to the options button to quick delete a message.";
};

QuickDelete.prototype.getVersion = function() {
    return "1.1";
};

QuickDelete.prototype.getAuthor = function() {
    return "confuseh";
};

try{exports.QuickDelete = QuickDelete;}catch(e){console.warn('Using old version, not exporting functions.');}