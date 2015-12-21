//META{"name":"SkypeEmos"}*//
function SkypeEmos() {}

SkypeEmos.settings_Button = null;
SkypeEmos.settings_Panel = null;
SkypeEmos.settings_lastTab = "";

SkypeEmos.prototype.settings_changeTab = function(tab) {
	var self = this;
	SkypeEmos.settings_lastTab = tab;
	var controlGroups = $("#se-control-groups");
	$(".se-tab").removeClass("selected");
	$(".se-pane").hide();
	$("#" + tab).addClass("selected");   
	$("#" + tab.replace("tab", "pane")).show();
	switch(tab) {
		case "se-settings-tab":
		break;
	}
};

SkypeEmos.prototype.settings_updateSetting = function(checkbox) {    
		var cb = $(checkbox).children().find('input[type="checkbox"]');
		var enabled = !cb.is(":checked");
		var id = cb.attr("id");
		cb.prop("checked", enabled);
		settingsCookie[id] = enabled;
		if (settingsCookie["se-option1"]) {
			console.log("Option1: Checked");
		} else {
			console.log("Option1: Unchecked");
		}
		if (settingsCookie["se-option2"]) {
			console.log("Option2: Checked");
		} else {
			console.log("Option2: Unchecked");
		}
//		if (settingsCookie["se-option2"]) {
//			//Pretty emote titles
//			emoteNamePopup = $("<div class='tipsy tipsy-se' style='display: block; top: 82px; left: 1630.5px; visibility: visible; opacity: 0.8;'><div class='tipsy-inner'></div></div>");
//			$(document).on("mouseover", ".emote", function() { var x = $(this).offset(); var title = $(this).attr("alt"); $(emoteNamePopup).find(".tipsy-inner").text(title); $(emoteNamePopup).css('left', x.left - 25); $(emoteNamePopup).css('top', x.top - 32); $("div[data-reactid='.0.1.1']").append($(emoteNamePopup));});
//			$(document).on("mouseleave", ".emote", function(){$(".tipsy").remove()});
//		} else {
//			$(document).off('mouseover', '.emote');
//		}
//		mainCore.saveSettings();
}

SkypeEmos.settings_construct = function() {
	var self = this;
	SkypeEmos.settings_Panel = $("<div/>", {
		id: "se-pane",
		class: "se-se-settings-inner",
		css: {
			"display": "none"
		}
	});
	var settingsInner = '' +
	'<div class="scroller-wrap">' +
	'   <div class="scroller settings-wrapper settings-SkypeEmos.settings_Panel">' +
	'       <div class="tab-bar TOP">' +
	'           <div class="tab-bar-item se-tab" id="se-settings-tab" onclick="SkypeEmos.prototype.settings_changeTab(\'se-settings-tab\');">Settings</div>' +
	'       </div>' +
	'       <div class="se-settings">' +
	'' +
	'               <div class="se-pane control-group" id="se-settings-pane" style="display:none;">' + 
	'                   <ul class="checkbox-group">';
	
	for(var setting in settings) {
		var sett = settings[setting];
		var id = sett["id"];
		if(sett["implemented"]) {
			settingsInner += '' +
			'<li>' +
				'<div class="checkbox" onclick="SkypeEmos.settings_Panel.updateSetting(this);" >' +
					'<div class="checkbox-inner">' +
						'<input type="checkbox" id="'+id+ '" ' + (settingsCookie[id] ? "checked" : "") + '>' +
						'<span></span>' +
					'</div>' +
					'<span>' + setting + " - " + sett["info"] +
					'</span>' +
				'</div>' +
			'</li>';
		}
	}
	
	function show_Settings() {
		$(".tab-bar-item").removeClass("selected");
		SkypeEmos.settings_Button.addClass("selected");
		$(".form .se-settings-right .se-settings-inner").first().hide();
		SkypeEmos.settings_Panel.show();
//		if(SkypeEmos.settings_lastTab == "") {
//			SkypeEmos.prototype.settings_changeTab("se-settings-tab");
//		} else {
//			SkypeEmos.prototype.settings_changeTab(SkypeEmos.settings_lastTab);
//		}
	}
	
	SkypeEmos.settings_Button = $("<div/>", {
		class: "tab-bar-item",
		text: "Skype-Emos",
		id: "se-settings-new",
		click: show_Settings
	});

	SkypeEmos.settings_Panel.html(settingsInner);

	function defer() {
		if($(".btn.btn-settings").length < 1) {
			setTimeout(defer, 100);
		}else {
			$(".btn.btn-settings").first().on("click", function() {
			function innerDefer() {
					if($(".modal-inner").first().is(":visible")) {
						SkypeEmos.settings_Panel.hide();
						var tabBar = $(".tab-bar.SIDE").first();
						$(".tab-bar.SIDE .tab-bar-item").click(function() {
							$(".form .se-settings-right .se-settings-inner").first().show();
							$("#se-settings-new").removeClass("selected");
							SkypeEmos.settings_Panel.hide();
						});
						tabBar.append(SkypeEmos.settings_Button);
						SkypeEmos.settings_Panel.insertAfter(".form .se-settings-right .se-settings-inner");
						$("#se-settings-new").removeClass("selected");
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

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

var settings = {
    "Show Skype Emo list": { "id": "", "info": "Shows the Skype Emo list", "implemented": true },
    "Show Emo Names": { "id": "", "info": "Shows the Emo Names", "implemented": true }
}

SkypeEmos.emotelist = {":cat_cleaning:":{"url":"https://i.gyazo.com/da52bad9d25dcf64f1e9cec667f22e26.gif","type":"gif"}};
SkypeEmos.isReady = false;

SkypeEmos.prototype.load = function() {
	$.getJSON("https://megamit.github.io/repository/skype-emotes/skypeemotedata.json", function(list){
		SkypeEmos.emotelist = list;
		SkypeEmos.isReady=true;
		console.log("Skype-Emos: Ready");
		SkypeEmos.process();
	}).fail(function(xhr,status,error){
		console.log("[Skype-Emos] Error Loading emotelist '"+status+":"+error+"'. Using fallback");
		SkypeEmos.isReady=true;
		SkypeEmos.process();
	});
	$('head').append(
		'<style>'+
		'.s_emo_sprite{animation: play 1s steps(1) infinite;}'+
		'.s_emo_sprite40 { width: 40px;  height: 40px;}'+
		'.s_emo_sprite20 { width: 20px;  height: 20px;}'+
		'@keyframes play {  from { background-position:  0 0; }  to { background-position:  0 100%; }}'+
		'</style>"'
	);
	console.log("Skype-Emos: Loaded.");
};

SkypeEmos.prototype.unload = function() {
	console.log("Skype-Emos: Unloaded.");
};

SkypeEmos.prototype.start = function() {
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var observer = new MutationObserver(function(mutations, observer) {
	if(SkypeEmos.isReady)SkypeEmos.process();
		// ...
	});
	$(".chat").each ( function () {
		observer.observe (this, { childList: true, characterData: true, attributes: false, subtree: true });
	} );
	SkypeEmos.settings_construct();
	console.log("Skype-Emos: Started.")
};
SkypeEmos.process = function() {
	$(".chat .comment .markup>span:not(.s_emos_scanned)").html(function(i,html){
		$.each(SkypeEmos.emotelist,function(key,emote){
			if(emote.type == "gif"){
				html = html.replaceAll(key, "<img src='" + emote.url+"'alt='"+key+"'><\/img>");
			}else if (emote.type == "sprite20"){
				var css_size = emote.steps-1;
				 html = html.replaceAll(key,"<div class='s_emo_sprite s_emo_sprite20' style='animation-timing-function: steps("+css_size+"); background-image: url(\""+emote.url+"\") '></div>")
			}else if (emote.type == "sprite40"){
				var css_size = emote.steps-1;
				 html = html.replaceAll(key,"<div class='s_emo_sprite s_emo_sprite40' style='animation-timing-function: steps("+css_size+") ;background-image: url(\""+emote.url+"\") '></div>")
			}
		});
		return html
	}).addClass("s_emos_scanned");
/*	$(".topic:not(.s_emos_scanned)").html(function(i,html){
 		$.each(SkypeEmos.emotelist,function(emote,url){
			console.log(url,emote);
			html = html.replaceAll(emote, "<img src='" + url+"'><\/img>");
		});
		return html;
	}).addClass("s_emos_scanned"); */
}
SkypeEmos.prototype.stop = function() {
	$(".s_emos_scanned>img").replaceWith("<span>"+$(this).attr("alt")+"</span>").removeClass(".s_emos_scanned")
	console.log("Skype-Emos: Stopped.");
};

SkypeEmos.prototype.update = function() {
	console.log("Skype-Emos: Updated");
};

SkypeEmos.prototype.getName = function() {
	return "Skype-Emos";
};

SkypeEmos.prototype.getDescription = function() {
	return "A plugin for BetterDiscord that brings some of the Skype Emos to Discord.";
};

SkypeEmos.prototype.getVersion = function() {
	return "1.0 Beta";
};

SkypeEmos.prototype.getAuthor = function() {
	return "megamit & Decorater";
};
