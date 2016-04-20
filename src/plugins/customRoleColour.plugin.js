//META{"name":"crr"}*//
function crr() {
	this.getName = function() { return "Custom Role Colours"; };
	this.getDescription = function() { return "Set custom role colours."; };
	this.getVersion = function() { return "1.0"; };
	this.getAuthor = function() { return "Jiiks, Pohky"; }
}

crr.prototype.load = function () {};

crr.prototype.start = function () {
    this.crrMt = new MutationObserver(function(mutations) {
        if($(".roles").length > 0) {
            if($("#ccpicker").length < 1) {
                
                var selectedRole = $(".roles").find("li.selected");
                var roleId = selectedRole.data("reactid").split("$").slice(-1)[0];
                var serverId = $(".guilds .active").data("reactid").split("$").slice(-1)[0];
                var rgb = selectedRole.css("color").match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
                
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                var curColour = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                
                var picker = $("<input/>", {
                    type: "color",
                    class: "swatch default",
                    id: "ccpicker"
                });
                
                $(".color-picker .swatches").append(picker);
                picker.prop("value", curColour);
                
                picker.on("change", function() {		
                
                    var token = localStorage["token"].replace(/"/g, "");
                    var newColour = parseInt($(this).prop("value").slice(1), 16);
                    $.ajax({
                        type: 'GET',
                        url: 'https://discordapp.com/api/guilds/'+serverId+'/roles?token='+token,
                        success: function(data) { 
                            for(var i = 0 ; i < data.length ; i++) { 
                                if(data[i]["id"] == roleId) {
                                    var request = new XMLHttpRequest();
                                    request.open('PATCH', 'https://discordapp.com/api/guilds/'+serverId+'/roles/'+roleId+'?token='+localStorage["token"].replace(/"/g, ""), false);
                                    request.setRequestHeader("Content-type","application/json");
                                    request.send('{"color": '+newColour+', "hoist": '+data[i]["hoist"]+', "name": "'+data[i]["name"]+'", "permissions": '+data[i]["permissions"]+'}');
                                    break;
                                }
                            }
                        }
                    });
                });
            }
        }
    });
    this.crrMt.observe(document, {childList:true, subtree:true})
};
crr.prototype.stop = function () {
	this.crrMt.disconnect();
};

crr.prototype.unload = function () {};
crr.prototype.onMessage = function () {};
crr.prototype.onSwitch = function () {};

crr.prototype.getSettingsPanel = function () {
    return '';
};
try{exports.crr = crr;}catch(e){console.warn('Using old version, not exporting functions.')}