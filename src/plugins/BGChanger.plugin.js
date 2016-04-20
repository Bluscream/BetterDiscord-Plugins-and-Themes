//META{"name":"BGChanger"}*//
function BGChanger() {}
var BetterAPI = BetterAPI || bdplugins.BetterAPI.plugin.constructor
BGChanger.prototype.getName = function() {
    return "Background Changer";
};
BGChanger.prototype.getDescription = function() {
    return "Changes your background from a array.";
};
BGChanger.prototype.getVersion = function() {
    return "1.0";
};
BGChanger.prototype.getAuthor = function() {
    return "Bluscream";
};
BGChanger.prototype.getSettingsPanel = function() {
	// $('#bgchange').livequery(function(){
		// $('#bgchange').click(function(){
			// BGChanger.changeBG();
		// });
	// });
    // return '<b>'+BGChanger.prototype.getName()+'</b><br><br>\
	// <button id="bgchange">Next Background</button>';
	$('.settings-right,.settings-inner,.settings-actions,#bd-pane').css('background','transparent');
	BGChanger.changeBG();
	$('.bd-psm').livequery(function(){
			$('.bd-psm').remove();
	});
};
BGChanger.prototype.load = function() {
	BG_original = $('.app').css('background-image');
	BGchange = true;
	BGrand = true;	BGimg = 'https://i.imgur.com/MlfDS2G.gif';
	BGblur = false;
};
BGChanger.prototype.unload = function() {
};
BGChanger.prototype.start = function() {
	BGChanger.changeBG();
};
BGChanger.prototype.stop = function() {
	BGchange = false;
	if (BGblur == true){
		$('#bgimage').css('background-image', BG_original);
	}else{
		$('.app').css('background-image', BG_original);
	}
};
BGChanger.prototype.onSwitch = function() {
	// BGChanger.changeBG();
};
BGChanger.changeBG = function() {
	if (BGchange == true) {
		if (BGrand == true){
			bgarray = [ // Remember that the images need to be HTTPS encrypted!
				// 'https://i.imgur.com/emSvYMy.gif',
				'https://i.imgur.com/RktuAes.gif',
				'https://i.imgur.com/AFWa9a4.gif',
				'https://i.imgur.com/9mv2XGt.gif',
				'https://i.imgur.com/cHDC1Nu.gif',
				'https://i.imgur.com/upaf5C3.gif',
				'https://i.imgur.com/MlfDS2G.gif',
				'https://i.imgur.com/Sk8uISa.gif',
				'https://i.imgur.com/mJBEies.gif',
				// 'https://i.imgur.com/W2OFM8r.gif',
				// 'https://i.imgur.com/ENhKvZD.gif',
				'https://i.imgur.com/NJa2qMN.gif',
				// 'https://i.imgur.com/HTyT6I7.gif',
				// 'https://i.imgur.com/UMGJwOh.gif',
				// 'https://i.imgur.com/EAS8sXK.gif',
				// 'https://i.imgur.com/LFSjvzJ.gif',
				// 'https://i.imgur.com/gmuhE5e.gif',
				// 'https://i.imgur.com/HufwA6q.gif',
				// 'https://i.imgur.com/BEwkp5Q.gif',
				// 'https://i.imgur.com/d0EfsaT.gif',
				'https://i.imgur.com/Yy2qNQe.gif',
				// 'https://i.imgur.com/PteVvRN.gif',
				'https://i.imgur.com/Nv6afLv.gif',
				'https://i.imgur.com/PPg7DIn.gif'
				// 'https://i.imgur.com/1QYu9wS.gif',
				// 'https://i.imgur.com/Hd1kXIa.gif'
			];
			result = bgarray[Math.floor(Math.random() * bgarray.length)];
		} else {
			result = BGimg;
		}
		if (BGblur == true){
			$('.platform-win').append('<div id="bgimage"></div>')
			$('#bgimage').attr('style', '');
			$('#bgimage').css('background-image', 'url('+result+') !important');
			$('#bgimage').css('position', 'fixed !important');
			$('#bgimage').css('left', '0 !important');
			$('#bgimage').css('right', '0 !important');
			$('#bgimage').css('z-index', '1 !important');
			$('#bgimage').css('display', 'block !important');
			$('#bgimage').css('width', '100% !important');
			$('#bgimage').css('height', '100% !important');
			$('#bgimage').css('background-size', 'cover !important');
			$('#bgimage').css('-webkit-filter', 'blur(3px) !important');
			
			$('.app').attr('style', "test");
			$('.app').css('position', 'fixed !important');
			$('.app').css('left', '0 !important');
			$('.app').css('right', '0 !important');
			$('.app').css('z-index', '1 !important');
			$('.app').css('margin-left', '20px !important');
			$('.app').css('margin-right', '20px !important');
		}else{
			$('.app').attr('style', 'background:transparent !important;background-size:cover !important;background-image:url('+result+') !important');
			setTimeout(function () { BdApi.injectCSS('transbd', '.callout-backdrop{background-image:none !important;}'); }, 1000);
		}
		console.log('Changed background to '+result);
		result = null;
	}
};
try{exports.BGChanger = BGChanger;}catch(e){console.warn('Using old version, not exporting functions.')}