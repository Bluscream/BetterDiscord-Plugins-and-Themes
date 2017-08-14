//META{"name":"Last"}*// 
var Last = function() {
	this.getName = function() { return "Last"; };
	this.getDescription = function() { return ""; };
	this.getVersion = function() { return "1"; };
	this.getAuthor = function() { return "Bluscream"; };
}
Last.prototype.load = function() {};
Last.prototype.unload = function() { console.clear() };
Last.prototype.onSwitch = function() { console.clear() };
Last.prototype.start = function() {  console.clear() };
try{exports.Last = Last;}catch(e){console.warn('Using old version, not exporting functions.');}