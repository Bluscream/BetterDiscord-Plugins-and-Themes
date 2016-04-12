//META{"name":"MarkRead"}*//
function MarkRead() {
	server = function(){
		/*$('.channel.channel-text.unread').each(function(i,el){
			$(el).find('.channel-name').click();
				$('button[data-reactid^=".0.1.1.0.2.1.0.$"][data-reactid$=".0.1"]').click();
		});*/
	};
}
MarkRead.prototype.getName = function() {
    return "Mark Read";
};
MarkRead.prototype.getDescription = function() {
    return "Adds a button to mark a whole server as read.";
};
MarkRead.prototype.getVersion = function() {
    return "1.0";
};
MarkRead.prototype.getAuthor = function() {
    return "Bluscream";
};
MarkRead.prototype.load = function() {};
MarkRead.prototype.start = function() {
	$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').livequery(function(){
		BetterAPI.addServerButton("markserverread", "Mark Read", "after");
	});
	$("#serverinfobutton").livequery(function(){
		$("#serverinfobutton").click(function(){
			MarkRead.server();
		});
	});
};
MarkRead.prototype.stop = function() {
	$('#markserverread').off('click');
	$('#markserverread').remove();
};
MarkRead.prototype.onSwitch = function() {
};

// var unreadChannels = $('.channel.channel-text.unread');
// withDelay(1000).endingWith( function(){console.info("done")} )
    // .for(unreadChannels,1,unreadChannels.length)
		// .do(function(){ 
			// $(unreadChannels[i]).find('.channel-name').click();
        // });             