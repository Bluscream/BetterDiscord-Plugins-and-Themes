//META{"name":"blockUser"}*//

var blockUser = function () {};

blockUser.prototype.getName = function () {
    return "blockUser Plugin";
};

blockUser.prototype.getDescription = function () {
    return "Adds block functionality to the user menu";
};

blockUser.prototype.getVersion = function () {
    return "0.0.1";
};

blockUser.prototype.getAuthor = function () {
    return "Pohky";
};

blockUser.prototype.start = function () {

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

    var clearBlocklist = function () {
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

    var showBlockList = function () {
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
            var username = $(".user-popout").find(".username").text();
            if (!blockUser.blockList.hasOwnProperty(username)) {

                $('.user-popout-options').append('<button class="btn btn-server" id="blockUser">Block</button>');
                $('#blockUser').on("click", function () {
                    var id = blockUser.selectedUID;
                    if (id === null) {
                        console.log("Can't get userID for: " + username);
                        return;
                    }
                    blockUser.blockList[username] = id;
                    localStorage.setItem('blockUserBlockList', JSON.stringify(blockUser.blockList));
                    $('#blockUser').remove();
                    $('#clearblocklistdiv').remove();
					$('#showblocklistdiv').remove();
                    blockButtonFunc();
                    updateChat();
                });
				js
                $('.user-popout-options').append(''+
					'<div id="showblocklistdiv" style="font-size:x-small;padding-top:5px;">'+
					'<a href="#" id="showblocklist">Show Blocklist</a>'+
					'<a href="#" id="clearblocklist" style="float:right">Clear Blocklist</a></div>');
                
				$('#clearblocklist').on('click', function () {
                    clearBlocklist();
                });
                $('#showblocklist').on('click', function () {
                    showBlockList();
                });
            } else {
                $('.user-popout-options').append('<button class="btn btn-server" id="unblockUser">Unblock</button>');
                $('#unblockUser').on("click", function () {
                    delete blockUser.blockList[username];
                    localStorage.setItem('blockUserBlockList', JSON.stringify(blockUser.blockList));
                    $('#unblockUser').remove();
                    $('#clearblocklistdiv').remove();
					$('#showblocklistdiv').remove();
                    blockButtonFunc();
                    $('.message-group').removeAttr('style');
                    blockUser.forceUpdate = true;
                    updateChat();
                });
                $('.user-popout-options').append(''+
					'<div id="showblocklistdiv" style="font-size:x-small;padding-top:5px;">'+
					'<a href="#" id="showblocklist">Show Blocklist</a>'+
					'<a href="#" id="clearblocklist" style="float:right">Clear Blocklist</a></div>');
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

blockUser.prototype.stop = function () {
    $('span[data-reactid=".0.4"]').off('DOMNodeInserted');
    $('body').off('DOMSubtreeModified');
    $('.user-name').off('click');
    $('.member').off('click');
};

blockUser.prototype.load = function () {};

blockUser.prototype.unload = function () {};

blockUser.prototype.getSettingsPanel = function() {
	return '<h3>Blocked Users</h3>';
};
