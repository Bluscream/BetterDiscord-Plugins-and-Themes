//META{"name":"hideServersChannels"}*//

var mode = 0;
var hideServersChannels = function () {};

hideServersChannels.prototype.start = function () {
	$(".header-toolbar").prepend('<button type="button" class="hideServersChannels"><span style="background-image: url(/assets/89576a4bb71f927eb20e8aef987b499b.svg);"></span></button>'); //Figure out where to put that svg...
	$(".hideServersChannels").on('click', function(){
		if(mode == 0){
			$(".channels-wrap").css('display', 'none');//blend out channels
			mode=1;
		}else{
			if(mode==1){
				$(".guilds-wrapper").css('display', 'none');//blend out servers
				mode=2
			}else{
				if(mode==2){
					$(".channels-wrap").css('display', 'flex');//show channels
					mode=3;
				}else{
					if(mode == 3){
						$(".guilds-wrapper").css('display', 'flex');//show servers
						mode=0;
					}
				}
			}
		}
	});
};
//$(".guilds-wrapper").css('display', 'flex');
//$(".channels-wrap").css('display', 'flex');

hideServersChannels.prototype.load = function () {};

hideServersChannels.prototype.unload = function () {};

hideServersChannels.prototype.stop = function () {
	$(".hideServersChannels").remove();
};

hideServersChannels.prototype.onMessage = function () {
    //called when a message is received
};

hideServersChannels.prototype.onSwitch = function () {
    //called when a server or channel is switched
};

hideServersChannels.prototype.observer = function (e) {
    //raw MutationObserver event for each mutation
};


hideServersChannels.prototype.getSettingsPanel = function () {};

hideServersChannels.prototype.getName = function () {
    return "Hide Server/channel List";
};

hideServersChannels.prototype.getDescription = function () {
    return "Adds a button to hide the server/channel lists on the left of the discord client.";
};

hideServersChannels.prototype.getVersion = function () {
    return "4.2.0";
};

hideServersChannels.prototype.getAuthor = function () {
    return "Wastedwizard";
};
