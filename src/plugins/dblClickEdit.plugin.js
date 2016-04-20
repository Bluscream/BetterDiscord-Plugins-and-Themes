//META{"name":"dblClickEdit"}*//
dblClickEdit = function () {
	this.getName = function() { return "Double click edit"; };
	this.getDescription = function() { return "Double click messages to edit them."; };
	this.getVersion = function() { return "0.1.0"; };
	this.getAuthor = function() { return "Jiiks"; };
};

dblClickEdit.prototype.load = function () {};
dblClickEdit.prototype.start = function () {
    $(document).on("dblclick.dce", function(e) {
        var target = $(e.target);
        if(target.parents(".message").length > 0) {
			var m = document.getElementsByClassName("messages")[0];
			var preH = m.scrollHeight;
            var msg = target.parents(".message").first();
            var opt = msg.find(".btn-option");
            opt.click();
            var popout = $(".option-popout");
            if(popout.children().length == 2) {
                popout.children().first().click();
				setTimeout(function(){ m.scrollTop=preH; }, 300);
            } else {
                popout.hide();
            }
        }
    });
};
dblClickEdit.prototype.stop = function () {
    $(document).off("dblclick.dce");
};
dblClickEdit.prototype.unload = function () {
};

dblClickEdit.prototype.getSettingsPanel = function () {
    return "";
};
dblClickEdit.prototype.onMessage = function () {};
try{exports.dblClickEdit = dblClickEdit;}catch(e){console.warn('Using old version, not exporting functions.');}