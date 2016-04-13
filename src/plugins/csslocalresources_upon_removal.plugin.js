//META{"name":"CSSLocalResources"}*//

var _fs = require("fs");

var CSSLocalResources = function() {
	this.load = function() {};
	this.unload = function() {};

	this.start = function() {
		this.init();
	};

	this.stop = function() {};
	this.onSwitch = function() {};
	this.onMessage = function() {};

	this.getSettingsPanel = function() { return ""; };

	this.getName = function() {
		return "CSS Background";
	};

	this.getDescription = function() {
		return "Transform image to base64";
	};

	this.getAuthor = function() {
		return "noVaLue";
	};

	this.getVersion = function() {
		return "Version 0.0.1";
	};
};


CSSLocalResources.prototype.init = function() {
	var that = this;
	
	var bdPath = this.getBDLocal();
	var bdImagesPath = bdPath + "/images"
	var bdThemesPath = bdPath + "/themes"

	if (!_fs.existsSync(bdImagesPath)) {
        console.log('CSSLocalResources: Creating Images Dir');
        _fs.mkdirSync(bdImagesPath);
    }

	_fs.readdir(bdThemesPath, function(err, files) {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(function(fileName) {
            var theme = _fs.readFileSync(bdThemesPath +'/' + fileName, 'utf8');
            var split = theme.split('\n');

            if(split.length > 1) {
	            var meta = split[0];
	            if (meta.indexOf('TEAM') < 0) {
	                return;
	            }
	            var themeVar = meta.substring(meta.lastIndexOf('/*TEAM') + 6, meta.lastIndexOf('*/'));
	            var parse = JSON.parse(themeVar);
	            var themeName = parse['name'];

	            console.log('CSSLocalResources: ' + themeName);
	   
	      		split.splice(0, 1);
	            theme = split.join('');
	            theme = theme.replace(/(\r\n|\n|\r)/gm, '');

	            var myRegExp = /url\s*\((.*?)\)/gi;
	            var matches = theme.match(myRegExp);
	            
	            for(var id in matches) {
	            	var entry = matches[id];
	            	var myRegXP = /url\s*\((.*?)\)/gi;
	            	var groups = myRegXP.exec(entry);
	            	
	            	if(groups != null) {
		            	var stripmatch = groups[1].replace(/[\"\']/g, '');
		            	if(stripmatch.indexOf('local://') == 0) {
		            		var filename = stripmatch.replace('local://', '');
		            		var filePath = bdImagesPath + '/' + filename;
		            		if(_fs.existsSync(filePath)) {
			            		var baseData = that.loadFile(filePath);

			            		var extPos = filePath.lastIndexOf(".");
			            		var data = "image/jpeg";
			            		if(extPos > 0 && extPos < filePath.length-1) {
			            			var ext = filePath.substring(extPos + 1);

			            			if(ext == "gif")
			            				data = "image/gif";
			            			else if(ext == "png")
			            				data = "image/png";
			            		}

			            		theme = theme.replace(entry, "url(data:"+data+";base64,"+baseData+ ")");
			            	}else {
			            		console.log("CSSLocalResources: resource "+ filename + " not found!")
			            	}
		            	}
		            }
	            }

	            jQuery.globalEval('$(document).ready(function() { bdthemes["' + themeName + '"] = { "enabled": false, "name": "' + themeName + '", "css": "' + escape(theme) + '", "description": "", "author":"", "version":""}; });');
	        }
        });

        jQuery.globalEval('themeModule.loadThemes();');
    });
}

CSSLocalResources.prototype.loadFile = function(filePath) {
	try { 
		var fileData = _fs.readFileSync(filePath); 
		var base64Data = new Buffer(fileData).toString('base64');
		return base64Data;
	}catch(ex) { return ""; }
};

CSSLocalResources.prototype.getBDLocal = function() {
	var _os = process.platform;
	var _dataPath = _os == "win32" ? process.env.APPDATA : _os == 'darwin' ? process.env.HOME + '/Library/Preferences' : '/var/local';
    _dataPath += "/BetterDiscord";
    return _dataPath;
};