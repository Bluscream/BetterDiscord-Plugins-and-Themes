//META{"name":"sidehide"}*//

function sidehide() {};(function(){

var timeout;
var settings;
var settingHandler = {};
function save(){	localStorage.sidehide = JSON.stringify(settings)}

sidehide.prototype.load = function() {
	settings = {showOnIn:true,hideOnOut:true,delayOnOut:50,delayOnLoad:500,hidden:true}
	if(localStorage.sidehide){
		settings = JSON.parse(localStorage.sidehide);
	}
	save();
};
sidehide.prototype.unload = function() {};

sidehide.prototype.start = function() {
	$('head').append("<style id='sidehide_p' class='sidehide'>.guilds-wrapper{transition:margin-left 0.5s;} #sidehide{background-color:rgba(0,0,0,0.5);width:10px;cursor:pointer;position:relative;} #sidehide:after{content:'•••';width:100%;position:absolute;top:50%;color:white;word-wrap:break-word;text-align:center;}</style>")
	$('.channels-wrap').after($("<div id='sidehide' class='sidehide'></div>").click(function(){sidehide.prototype.setHidden(settings.hidden);}))
	sidehide.prototype.inject();
	timeout = setTimeout(function(){
			console.log("out-in");
				sidehide.prototype.setHidden('true')
			},settings.delayOnLoad)
};	
sidehide.prototype.stop = function() {
	$(".sidehide").remove();
	$("#sidehide").prevAll().add("#sidehide").off(".sidehide");
};
sidehide.prototype.inject = function(){
	$("#sidehide").prevAll().add("#sidehide").on("mouseenter.sidehide",
		function(){
			clearTimeout(timeout)
			if(settings.showOnIn){
				if($("#sidehide_hider").length>0)
				sidehide.prototype.setHidden('false')
			}
		}
	).on("mouseleave.sidehide",
		function(){
			if(settings.hideOnOut){
				timeout = setTimeout(function(){
					sidehide.prototype.setHidden('true')
				},settings.delayOnOut)
			}
		}
	)
}
sidehide.prototype.getName = function() {return         "Hide ServerList";};
sidehide.prototype.getDescription = function() {return "Does what id says on the tin";};
sidehide.prototype.getVersion = function() {return      "1.0";};
sidehide.prototype.getAuthor = function() {return       "Megamit/Mitchell";};

sidehide.prototype.setHidden = function(enable){
	$("#sidehide_hider").remove()
	if (enable=="true"){
		$('head').append('<style id="sidehide_hider" class="sidehide" > .guilds-wrapper{margin-left:-'+( $(".guilds-wrapper").width()+$(".channels-wrap").width())+"px;}</style>");
	}
	sidehide.prototype.updateSetting('hidden',!settings.hidden);
}

sidehide.prototype.getSettingsPanel = function() {
	return 	`<form class="form" style = "width:auto;">
					<div class="control-group">
					<label> Auto-Hiding Behavior </label>
					<ul class="checkbox-group">
					<li>
						<div class="checkbox" onclick="var s = this.getElementsByTagName('input')[0]; s.checked=sidehide.prototype.updateSetting('showOnIn',!s.checked);">
						<div class="checkbox-inner">
							<input name="style" type="checkbox" ${settings.showOnIn?"checked":""} >
							<span></span>
						</div>
						<span> On mouseover</span
						</div>
					</li>
					<li>
						<div class="checkbox" onclick="var s = this.getElementsByTagName('input')[0]; console.log(s.checked); s.checked=sidehide.prototype.updateSetting('hideOnOut',!s.checked);">
						<div class="checkbox-inner">
							<input name="style" type="checkbox" ${settings.hideOnOut?"checked":""} >
							<span></span>
						</div>
						<span> On mouseexit</span>
						</div>
					</li>
					</ul>
					</div>
					</form>`;
};

sidehide.prototype.updateSetting = function(setting,value){
	var cb;
	console.log(value,settings[setting],setting);
	if(settingHandler[setting]!=undefined){ cb= settingHandler[setting](value); save(); }
	else if(settings[setting]!=undefined){ cb = value; settings[setting] = value; save();}
	return cb;
}

})();

