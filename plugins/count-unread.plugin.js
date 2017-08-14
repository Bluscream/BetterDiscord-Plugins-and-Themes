//META{"name":"CountUnread"}*//

var CountUnread = function () {};

CountUnread.prototype.getName = function() {
    return "CountUnread";
};
CountUnread.prototype.getDescription = function() {
    return "Button for counting unread messages";
};
CountUnread.prototype.getVersion = function() {
    return "1.2";
};
CountUnread.prototype.getAuthor = function() {
    return "Samogot";
};
CountUnread.prototype.start = function() {
	var cancelTO;

	var localeStr;
	switch(navigator.language) {
		case 'ru':
		case 'ru_RU':
			localeStr = {
				load: 'Посчитать непрочитанные',
				cancel: 'Отмена',
			};
			break;
		case 'uk':
		case 'uk_UA':
			localeStr = {
				load: 'Підрахувати непрочитані',
				cancel: 'Відміна',
			};
			break;
		case 'nl':
		case 'nl_BE':
			localeStr = {
				load: 'Tel ongelezen berichten',
				cancel: 'Annuleer',
			};
			break;
		default:
			localeStr = {
				load: 'Count unread messages',
				cancel: 'Cancel',
			};
			break;
	}

	function loadDownRecurcive() {
		cancelTO = undefined;
		if ($('.jump-to-present-bar').length) {
			$('.has-more:last-child button').click();
			cancelTO = setTimeout(loadDownRecurcive, 50)
		}
	}

	function setUpLoadButton(){
		$('.jump-to-present-bar button:eq(1)').text(localeStr.load).click(onLoadButtonClick);
	}

	function setUpCancelButton(){
		$('.jump-to-present-bar button:eq(1)').text(localeStr.cancel).click(onCancelButtonClick);
	}

	function onLoadButtonClick(){
		loadDownRecurcive();
		setUpCancelButton();
		return false;
	}

	function onCancelButtonClick(){
		if(cancelTO) clearTimeout(cancelTO);
		cancelTO = undefined;
		$('.new-messages-bar button:eq(0)').click();
		return false;
	}
	
	$(document).on('click.lau', '.new-messages-bar button:first-child', function(e){
		setTimeout(function() {
			if($('.new-messages-bar button:eq(0)').text().indexOf('+') >= 0) 
				setUpLoadButton();
		}, 500);
	});
};
CountUnread.prototype.load = function() {};
CountUnread.prototype.unload = function() {
	$(document).off("click.lau");
};
CountUnread.prototype.stop = function() {
	$(document).off("click.lau");
};
CountUnread.prototype.getSettingsPanel = function() {
	return null;
};
CountUnread.prototype.onMessage = function() {
};
CountUnread.prototype.onSwitch = function() {
};