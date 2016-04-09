//META{"name":"RoleExport"}*//

function RoleExport() {}

RoleExport.prototype.start = function () {
    /*this.RoleExportMt = new MutationObserver(function(mutations) {
        if($(".roles").length > 0) {
            if($("#rolexport").length < 1) {
            }
        }
    });
    this.RoleExportMt.observe(document, {childList:true, subtree:true})*/
};
RoleExport.prototype.stop = function () {
	this.RoleExportMt.disconnect();
};

RoleExport.prototype.load = function () {
    //Called when plugin is loaded
};

RoleExport.prototype.unload = function () {
    //Called when plugin is unloaded
};

RoleExport.prototype.getName = function () {
    return "Custom Role Colours";
};

RoleExport.prototype.getDescription = function () {
    return "Set custom role colours";
};

RoleExport.prototype.getVersion = function () {
    return "1.0";
};

RoleExport.prototype.getAuthor = function () {
    return "Jiiks, Pohky";
};

RoleExport.prototype.getSettingsPanel = function () {
    return '';
};