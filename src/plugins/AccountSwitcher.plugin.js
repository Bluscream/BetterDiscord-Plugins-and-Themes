//META{"name":"AccountSwitcher"}*//
var AccountSwitcher = function () {
	this.getName = function(){ return "Account Switcher"; }
	this.getDescription = function(){ return "Lets you switch between multiple Discord accounts."; }
	this.getVersion = function(){ return "0.0.1"; }
	this.getAuthor = function(){ return "Bluscream"; }
};
AccountSwitcher.prototype.load = function () {};
AccountSwitcher.prototype.start = function () {};

AccountSwitcher.prototype.onMessage = function () {};
AccountSwitcher.prototype.onSwitch = function () {};
AccountSwitcher.prototype.observer = function (e) {};

AccountSwitcher.prototype.stop = function () {};
AccountSwitcher.prototype.unload = function () {};

AccountSwitcher.prototype.getSettingsPanel = function () {};
console.warn(AccountSwitcher.getName+': Using old BetterDiscord version, not exporting functions.')
try{exports.AccountSwitcher = AccountSwitcher;}catch(e){console.warn(AccountSwitcher.getName+': Using old BetterDiscord version, not exporting functions.')}