//META{"name":"blockUser"}*//
function blockUser() {}
blockUser.prototype.getName = function() {
	return "Block User Plugin";
};
blockUser.prototype.getDescription = function() {
	return "Adds functionality to block a user";
};
blockUser.prototype.getVersion = function() {
	return "1.0";
};
blockUser.prototype.getAuthor = function() {
	return "Bluscream, Pohky";
};
blockUser.prototype.load = function() {};
blockUser.prototype.unload = function() {};
blockUser.prototype.start = function() {
    blockUser.blockList = JSON.parse(localStorage.getItem('blockUserBlockList')) || {};
    blockUser.forceUpdate = false;
    blockUser.selectedUID = null;
    var getUID = function (e) {
        if (e.target.classList.contains('user-name')) {
            return $(e.target).parents('.message-group').children('.avatar-large').css('backgroundImage').match(/\/(\d{1,})\//)[1];
        } else {
            return $(e.target).attr('data-reactid').match(/\$(\d*)/)[1];
        }
        return null;
    };
	BlockUser = function(username, id) {
			blockUser.blockList[username] = id;
			localStorage.setItem('blockUserBlockList', JSON.stringify(blockUser.blockList));
			updateChat();
			alertify.error('\"'+username+'\" has been blocked.');
			// successAlert(blockUser.prototype.getName() + ' - Success', 'User \"'+username+'\" ('+id+') has been blocked and his/her messages were removed.');
	};
	UnblockUser = function(username) {
		delete blockUser.blockList[username];
		localStorage.setItem('blockUserBlockList', JSON.stringify(blockUser.blockList));
		blockUser.forceUpdate = true;
		updateChat();
		alertify.success('\"'+username+'\" has been unblocked.');
		// successAlert(blockUser.prototype.getName() + " - Success", "User \""+username+"\" ("+id+") has been unblocked and his/her messages were restored.");
	};
    showBlockList = function () {
		var locStore = localStorage.getItem('blockUserBlockList');
		var data = JSON.parse(locStore) || {};
		if (locStore == '{}') {
			infoAlert('Blocklist', 'No users blocked.');
		} else {
			var jsonHtmlTable = ConvertJsonToTable(''+data, 'jsonTable', null, 'Download');
			Core.prototype.alert("<b>Blocked Users</b>", locStore);
			// blackAlert('Blocklist', localStorage.getItem('blockUserBlockList'));
		};		
    };
    clearBlocklist = function () {
        blockUser.blockList = {};
        localStorage.setItem('blockUserBlockList', JSON.stringify(blockUser.blockList));
        $('#blockUser').remove();
        $('#unblockUser').remove();
        $('#clearblocklistdiv').remove();
        $('#showblocklistdiv').remove();
        blockButtonFunc();
        blockUser.forceUpdate = true;
        updateChat();
    };
    var updateChat = function () {
        if (Object.keys(blockUser.blockList).length > 0 || blockUser.forceUpdate) {
            $.each(blockUser.blockList, function (name, id) {
                [].slice.call($('.message-group')).forEach(function (message) {
                    if ($(message).children(".avatar-large").first()[0].outerHTML.indexOf(id) > -1) {
                        $(message).css('display', 'none');
                    }
                });
            });
        }
        if (Object.keys(blockUser.blockList).length <= 0 && blockUser.forceUpdate) {
            $('.message-group').removeAttr('style');
            $(".scroller.messages").scrollTop(999999);
        }
        blockUser.forceUpdate = false;
    };
    var blockButtonFunc = function () {
        //noinspection JSJQueryEfficiency
        if (!$('#blockUser').length && !$('#unblockUser').length) {
            var username = ''+$(".user-popout").find(".username").text();
            if (!blockUser.blockList.hasOwnProperty(username)) {
                $('.user-popout-options').append('<button class="btn btn-server" id="blockUser">Block</button>');
                $('#blockUser').on("click", function () {
                    var id = ''+blockUser.selectedUID;
                    if (id === null) {
                        return;
                    }
                    BlockUser(username,id);
                    $('#blockUser').remove();
                    $('#clearblocklistdiv').remove();
					$('#showblocklistdiv').remove();
                    blockButtonFunc();
                });
                BetterAPI.addUserLink("showblocklistdiv", "showblocklist", "#", "Show Blocklist", "clearblocklist", "#", "Clear Blocklist")
				$('#clearblocklist').on('click', function () {
                    clearBlocklist();
                });
                $('#showblocklist').on('click', function () {
                    showBlockList();
                });
            } else {
                $('.user-popout-options').append('<button class="btn btn-server" id="unblockUser">Unblock</button>');
                $('#unblockUser').on("click", function () {
                    UnblockUser(username);
                    $('#unblockUser').remove();
                    $('#clearblocklistdiv').remove();
					$('#showblocklistdiv').remove();
                    blockButtonFunc();
                    $('.message-group').removeAttr('style');
                    blockUser.forceUpdate = true;
                });
                BetterAPI.addUserLink("showblocklistdiv", "showblocklist", "#", "Show Blocklist", "clearblocklist", "#", "Clear Blocklist")
                $('#clearblocklist').on('click', function () {
                    clearBlocklist();
                });
                $('#showblocklist').on('click', function () {
                    showBlockList();
                });
            }
        }
    };
    $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function () {
        blockButtonFunc();
    });
    $('body').on('DOMSubtreeModified', function () {
        updateChat();
        $('.user-name').off('click').on('click', function (e) {
            blockUser.selectedUID = getUID(e);
        });
        $('.member').off('click').on('click', function (e) {
            blockUser.selectedUID = getUID(e);
        });
    });
};
blockUser.prototype.getSettingsPanel = function() {
	return '<h3>Blocked Users</h3><br><br>'+localStorage.getItem('blockUserBlockList');
};
blockUser.prototype.stop = function() {
    $('span[data-reactid=".0.4"]').off('DOMNodeInserted');
    $('body').off('DOMSubtreeModified');
    $('.user-name').off('click');
    $('.member').off('click');
};
blockUser.prototype.update = function() {
};