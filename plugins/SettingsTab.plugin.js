//META{"name":"SettingsTab"}*//
function SettingsTab() {}
SettingsTab.settingsButton = null;
SettingsTab.settingsPanel = null;
SettingsTab.settings_lastTab = "";
SettingsTab.speedMultiplier = 0.04;
SettingsTab.prototype.settings_changeTab = function(tab) {
    SettingsTab.settings_lastTab = tab;
    var controlGroups = $("#st-control-groups");
    $(".st-tab").removeClass("selected");
    $(".st-pane").hide();
    $("#" + tab).addClass("selected");   
    $("#" + tab.replace("tab", "pane")).show();
     
    switch(tab) {
        case "st-settings-tab":
        break;
    }
};

SettingsTab.settings_updateSetting = function(checkbox) {    
		var cb = $(checkbox).children().find('input[type="checkbox"]');
		var enabled = !cb.is(":checked");
		var id = cb.attr("id");
		cb.prop("checked", enabled);
		SettingsTab.settings[id] = enabled;
		SettingsTab.prototype.saveSettings()
		console.log(id,enabled)
}

SettingsTab.settings_construct = function() {

	SettingsTab.settingsPanel = $("<div/>", {
		id: "st-pane",
		class: "settings-inner",
		css: {
			"display": "none"
		}
	});
		
	var settingsInner = '' +
	'<div class="scroller-wrap">' +
	'   <div class="scroller settings-wrapper settings-panel">' +
	'       <div class="tab-bar TOP">' +
	'           <div class="tab-bar-item st-tab" id="st-settings-tab" onclick="SettingsTab.prototype.settings_changeTab(\'st-settings-tab\');">Settings</div>' +
	'       </div>' +
	'       <div class="st-settings">' +
	'' +
	'               <div class="st-pane control-group" id="st-settings-pane" style="display:none;">' + 
	'                   <ul class="checkbox-group">';
	
	for(var setting in  SettingsTab.settingsArray) {
		var sett =  SettingsTab.settingsArray[setting];
		var id = sett["id"];
		if(sett["implemented"]) {
			settingsInner += '' +
			'<li>' +
				'<div class="checkbox" onclick="SettingsTab.settings_updateSetting(this);" >' +
					'<div class="checkbox-inner">' +
						'<input type="checkbox" id="'+id+ '" ' + (SettingsTab.settings[id] ? "checked" : "") + '>' +
						'<span></span>' +
					'</div>' +
					'<span title="'+sett["info"]+'">'+setting+'</span>' +
				'</div>' +
			'</li>';
		}
	}
	settingsInner += '</ul>' +
		'               </div>' +
		'		</div>'+
		'	</div>'+
		'</div>'
	
	function show_Settings() {
		$(".tab-bar-item").removeClass("selected");
		SettingsTab.settingsButton.addClass("selected");
		$(".form .settings-right .settings-inner").hide();
		
		SettingsTab.settingsPanel.show();
		if(SettingsTab.settings_lastTab == "") {
			SettingsTab.prototype.settings_changeTab("st-settings-tab");
		} else {
			SettingsTab.prototype.settings_changeTab(SettingsTab.settings_lastTab);
		}
	}
	
	SettingsTab.settingsButton = $("<div/>", {
		class: "tab-bar-item",
		text: "Test Tab",
		id: "st-settings-new",
		click: function(event){event.stopImmediatePropagation();show_Settings()}
	});

	SettingsTab.settingsPanel.html(settingsInner);

	function defer() {
		if($(".btn.btn-settings").length < 1) {
			setTimeout(defer, 100);
		}else {
			$(".btn.btn-settings").first().on("click", function() {

			function innerDefer() {
					if($(".modal-inner").first().is(":visible")) {

						SettingsTab.settingsPanel.hide();
						var tabBar = $(".tab-bar.SIDE").first();
						
						$(".tab-bar.SIDE .tab-bar-item:not(#bd-settings-new)").click(function() {
							$(".form .settings-right .settings-inner").first().show();
							$("#st-settings-new").removeClass("selected");
							SettingsTab.settingsPanel.hide();
						});
						var tabBarAttempts = 0;
						var tabBarSet = setInterval(function(){
							var bdtab = $("#bd-settings-new")
							tabBarAttempts++
							if( bdtab.length>0){
								clearInterval(tabBarSet);
								tabBar.append(SettingsTab.settingsButton);
								$("#st-settings-new").removeClass("selected");
								bdtab.click(function() {
									$("#st-settings-new").removeClass("selected");
									SettingsTab.settingsPanel.hide();
								});
								console.log("[SettingsTab] Settings tab attached after "+tabBarAttempts+" tries")
								}
							},50);
						
						$(".form .settings-right .settings-inner").last().after(SettingsTab.settingsPanel)
						$("#st-settings-new").removeClass("selected");
					} else {
						setTimeout(innerDefer, 100);
					}
				}
				innerDefer();
			});
		}
	}
	defer();
	
};
SettingsTab.settingsArray = {
	"Default enabled Setting": { "id": "default-enabled", "info": "Default enabled Setting info","default":true, "implemented": true },
    "Default disabled Setting":          { "id": "default-disabled", "info": "Default disabled Setting info","default":false,"implemented": true },
    "Default unimplemented Setting":             { "id": "default-unimplemented", "info": "Default unimplemented Setting info","default":true, "implemented": false  },
}
SettingsTab.isReady = false;

SettingsTab.prototype.load = function() {};
SettingsTab.prototype.saveSettings = function(){
	localStorage.setItem("settingstab_settings",JSON.stringify(SettingsTab.settings));
}
SettingsTab.prototype.getDefaultSettings = function(){
	var new_settings = {}
	for(var setting in  SettingsTab.settingsArray) {
		new_settings[SettingsTab.settingsArray[setting]["id"]]=SettingsTab.settingsArray[setting]["default"];
	}
	return new_settings;
}
SettingsTab.prototype.unload = function() {
};

SettingsTab.prototype.start = function() {
	SettingsTab.settings=JSON.parse(localStorage.getItem("settingstab_settings"))||SettingsTab.prototype.getDefaultSettings();
	SettingsTab.prototype.saveSettings();
	SettingsTab.settings_construct();
};
SettingsTab.spliceReplaceNode = function(node,index,length){
	
}
SettingsTab.prototype.stop = function() {
	SettingsTab.settingsButton.hide();
	console.log("[Settings-Tab] Stopped.");
};

SettingsTab.prototype.update = function() {
	console.log("[Settings-Tab] Updated");
};

SettingsTab.prototype.getName = function() {
	return "Test Settings Tab";
};

SettingsTab.prototype.getDescription = function() {
	return "Test plugin for a settings tab.";
};

SettingsTab.prototype.getVersion = function() {
	return "1";
};

SettingsTab.prototype.getAuthor = function() {
	return "megamit & Decorater & Bluscream";
};
