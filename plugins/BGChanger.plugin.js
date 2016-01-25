//META{"name":"BGChanger"}*//
function BGChanger() {}
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
	$('#bgchange').livequery(function(){
		$('#bgchange').click(function(){
			BGChanger.changeBG();
		});
	});
    return '<b>'+BGChanger.prototype.getName()+'</b><br><br>\
	<button id="bgchange">Next Background</button>';
};
BGChanger.prototype.load = function() {
	BG_original = $('.app').css('background-image');
	BGchange = true;
	BGrand = false;
};
BGChanger.prototype.unload = function() {
};
BGChanger.prototype.start = function() {
	BGChanger.changeBG();
};
BGChanger.prototype.stop = function() {
	BGchange = false;
	$('.app').css('background-image', BG_original);
};
BGChanger.prototype.onSwitch = function() {
	// BGChanger.changeBG();
};
BGChanger.changeBG = function() {
	if (BGchange == true) {
		if (BGrand == true){
			bgarray = [ // Remember that the images need to be HTTPS encrypted!
				'https://i.imgur.com/emSvYMy.gif',
				'https://i.imgur.com/RktuAes.gif',
				'https://i.imgur.com/AFWa9a4.gif',
				'https://i.imgur.com/9mv2XGt.gif',
				'https://i.imgur.com/cHDC1Nu.gif',
				'https://i.imgur.com/upaf5C3.gif',
				'https://i.imgur.com/MlfDS2G.gif',
				'https://i.imgur.com/Sk8uISa.gif',
				'https://i.imgur.com/mJBEies.gif',
				'https://i.imgur.com/W2OFM8r.gif',
				'https://i.imgur.com/ENhKvZD.gif',
				'https://i.imgur.com/NJa2qMN.gif',
				'https://i.imgur.com/HTyT6I7.gif',
				'https://i.imgur.com/UMGJwOh.gif',
				'https://i.imgur.com/EAS8sXK.gif',
				'https://i.imgur.com/LFSjvzJ.gif',
				'https://i.imgur.com/gmuhE5e.gif',
				'https://i.imgur.com/HufwA6q.gif',
				'https://i.imgur.com/BEwkp5Q.gif',
				'https://i.imgur.com/d0EfsaT.gif',
				'https://i.imgur.com/Yy2qNQe.gif',
				'https://i.imgur.com/PteVvRN.gif',
				'https://i.imgur.com/Nv6afLv.gif',
				'https://i.imgur.com/PPg7DIn.gif',
				'https://i.imgur.com/1QYu9wS.gif',
				'https://i.imgur.com/Hd1kXIa.gif'
			];
			result = bgarray[Math.floor(Math.random() * bgarray.length)];
		} else {
			result = 'https://i.imgur.com/cHDC1Nu.gif';
		}
		$('.platform-win').append('<div id="bgimage"></div>')
		$('#bgimage').css('background-image', 'url('+result+')');
		result = null;
	}
};