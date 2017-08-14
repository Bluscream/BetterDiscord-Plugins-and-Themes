//META{"name":"EmbedAV"}*//
/*
 Check for Updates: https://gist.github.com/shtrih/8a72a36d513ec704c7a9

 How to install:
 1. If you don't have it, get Discord from https://discordapp.com/apps
 2. Download BetterDiscord for your platform on https://betterdiscord.net/home
 3. Push the button «Raw» then Ctrl + S.
 3. Place the plugin in %appdata%\BetterDiscord\plugins\.
 4. Refresh Discord with Ctrl + Shift + R or just restart Discord completely.
 5. Go to the BetterDiscord settings → plugins tab and check plugin.
 */
/*@cc_on
	@if (@_jscript)
	    // Offer to self-install for clueless users that try to run this directly.
	    var shell = WScript.CreateObject("WScript.Shell");
	    var fs = new ActiveXObject("Scripting.FileSystemObject");
	    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	    var pathSelf = WScript.ScriptFullName;
	    // Put the user at ease by addressing them in the first person
	    shell.Popup("It looks like you mistakenly tried to run me directly. (don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
	        shell.Popup("I'm in the correct folder already.\nJust reload Discord with Ctrl+R.", 0, "I'm already installed", 0x40);
	    } else if (!fs.FolderExists(pathPlugins)) {
	        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
	        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
	        // Show the user where to put plugins in the future
	        shell.Exec("explorer " + pathPlugins);
	        shell.Popup("I'm installed!\nJust reload Discord with Ctrl+R.", 0, "Successfully installed", 0x40);
	    }
	    WScript.Quit();
	@else @*/
function EmbedAV() {
    this.initiated = false;
    this.optionsDefault = {
        embedAudio: true,
        embedVideo: true,
        embedImage: true,
        embedCode: true,
        embedLoop: false,
        embedAutoPlay: false,
        volume: 0.5
    };

    var options = this.optionsDefault,
        filterAudio = '\
			      a[href$=".ogg"],a[href$=".OGG"],\
            a[href$=".oga"],a[href$=".OGA"],\
            a[href$=".mp3"],a[href$=".MP3"],\
            a[href$=".wav"],a[href$=".WAV"],\
            a[href$=".wma"],a[href$=".WMA"],\
            a[href$=".m4a"],a[href$=".M4A"],\
            a[href$=".aac"],a[href$=".AAC"]',
        filterVideo = '\
			      a[href $=".ogm"],a[href $=".OGM"],\
            a[href$=".ogv"],a[href$=".OGV"],\
            a[href$=".m4v"],a[href$=".M4V"],\
            a[href$=".mp4"],a[href$=".MP4"],\
            a[href$=".webm"],a[href$=".WEBM"]',
        filterImage = '\
		        a[href $=".jpg"],a[href $=".JPG"],\
            a[href$=".png"],a[href$=".PNG"],\
            a[href$=".gif"],a[href$=".GIF"],\
            a[href$=".webp"],a[href$=".webp"]',
        filterSpotify =  'a[href ^="https://open.spotify.com/track/"]',
        filterSpotifyP =  'a[href ^="https://open.spotify.com/user/"][href *="/playlist/"]',
	      filterPastebin = 'a[href ^="https://pastebin.com/"]',
	      filterGist =     'a[href ^="https://gist.github.com/"]',
        tagWrapper =        '<div class="embed-wrapper embed EmbedAV"><div class="embed-color-pill"></div>',
        tagAudio =    '<audio controls preload="metadata" src="%src%" %loop% %autoplay%></audio>',
        tagVideo =    '<video controls preload="metadata" src="%src%" %loop% %autoplay%></video>',
        tagSpotify =  '<iframe class="embedaviframe" src="https://open.spotify.com/embed?uri=spotify:track:%spotify%" width="300px" height="80px" frameborder="0" allowtransparency="true"/>',
        tagSpotifyP = '<iframe class="embedaviframe" src="https://open.spotify.com/embed/album/%last%" width="300px" height="380px" frameborder="0" allowtransparency="true"/>',
        tagPastebin = '<iframe class="embedaviframe" src="https://pastebin.com/embed_iframe/%pastebin%" width="80%" frameborder="0" allowtransparency="true"/>',
        tagGist =     '<iframe class="embedaviframe" src="%src%.pibb?scroll=true" width="80%" frameborder="0" allowtransparency="true"/>',
        tagImage =    '<img src="%src%"/>',
        parseMediaTag = function (tag, url) {
            return tag
                .replace(/%loop%/, (options.embedLoop ? 'loop' : ''))
                .replace(/%autoplay%/, (options.embedAutoPlay ? 'autoplay' : ''))
                .replace(/%src%/, url)
        				.replace(/%last%/, url.substring(url.lastIndexOf("/") + 1))
        				.replace(/%spotify%/, url.replace("https://open.spotify.com/track/", ""))
        				.replace(/%pastebin%/, url.replace("https://pastebin.com/", ""))
        				//.replace(/%gist%/, url.substring(url.lastIndexOf("/") + 1))
            ;
        },
        tagStyles = '<style>\
          .embed.EmbedAV video, \
          .embed.EmbedAV audio {\
            max-width: 100%;\
          }\
          .embedaviframe iframe {\
            width: "100%"\
            height: "100%"\
          }\
        </style>',
        tagSettingsAudio = '<div><label><input type="checkbox" name="embedav-audio" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedAudio\', $(this).is(\':checked\'))" />Embed Audio</label></div>',
        tagSettingsVideo = '<div><label><input type="checkbox" name="embedav-video" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedVideo\', $(this).is(\':checked\'))"/>Embed Video</label></div>',
        tagSettingsImage = '<div><label><input type="checkbox" name="embedav-image" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedImage\', $(this).is(\':checked\'))"/>Embed Unembedded Images</label></div>',
        tagSettingsCode = '<div><label><input type="checkbox" name="embedav-code" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedPastebin\', $(this).is(\':checked\'))"/>Embed Pastebin/Gist</label></div>',
        tagSettingsVolume = '<div>Volume: <input type="range" min="0" max="1" step="0.1" name="embedav-audio" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'volume\', this.value)"/></div>',
        tagLoop = '<div><label><input type="checkbox" name="embedav-loop" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedLoop\', $(this).is(\':checked\'))" />Loop</label></div>',
        tagAutoPlay = '<div><label><input type="checkbox" name="embedav-loop" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedAutoPlay\', $(this).is(\':checked\'))" />Auto play</label></div>',
        saveOptions = function () {
            localStorage.setItem('EmbedAVOptions', JSON.stringify(options));
        }
    ;

    this.init = function () {
		    //BetterAPI.requireJS("https://cdnjs.cloudflare.com/ajax/libs/gist-embed/2.4/gist-embed.min.js", "gist-embed", "$.fn.gist");
        $('head').append(tagStyles);
        options = $.extend({}, this.optionsDefault, JSON.parse(localStorage.getItem('EmbedAVOptionsEmbedAVOptionsEmbedAVOptions')));
    };

    this.destroy = function () {
        $('.embed.EmbedAV').remove();
    };

    this.process = function ($links, tagName) {
        var filter,
            tag,
            messages = $('.messages').get(0)
        ;

        if (!messages)
            return;

        var mHeight = messages.scrollHeight;

        switch (tagName) {
            case 'audio':
                filter = filterAudio;
                tag = tagAudio;
                break;

            case 'video':
                filter = filterVideo;
                tag = tagVideo;
                break;

            case 'image':
                filter = filterImage;
                tag = tagImage;
                break;

            case 'spotify':
                filter = filterSpotify;
                tag = tagSpotify;
                break;

            case 'spotifyp':
                filter = filterSpotifyP;
                tag = tagSpotifyP;
                break;

            case 'pastebin':
                filter = filterPastebin;
                tag = tagPastebin;
                break;

            case 'gist':
                filter = filterGist;
                tag = tagGist;
                break;
        }

        $links.filter(filter).each(function () {
            var link = $(this),
                url = link.attr('href').replace(/^http:/, 'https:'),
                accessory = link.closest('.message').find('.accessory')
            ;
            url = encodeURI(decodeURI(url)); // Prevent xss
            link.addClass('EmbedAV-processed');
            wrapper = accessory.find('.embed-wrapper');
            if (wrapper.length > 0){
              // if (url.startsWith("https://open.spotify.com/track/")) {
      	      //   wrapper.replaceWith($(tagWrapperSpotify).append(parseMediaTag(tag, url)));
      			  if (url.startsWith("https://pastebin.com/")||url.startsWith("https://gist.github.com/")){
                wrapper.replaceWith(parseMediaTag(tag, url));
              } else {
                wrapper.replaceWith($(tagWrapper).append(parseMediaTag(tag, url)));
              }
      			} else {
      				accessory.append( $(tagWrapper).append(parseMediaTag(tag, url)) );
      			}
            try { accessory.find(tagName).get(0).volume = options.volume; } catch (e) { }
        });

        // Metadata loading takes some time, so that these calculations are inaccurate
        messages.scrollTop += messages.scrollHeight - mHeight;
    };

    /**
     * @param preventAutoPlay Override global auto play settings
     * @param seeLastMessage Work with last message only
     * @param log Log actions to console
     */
    this.apply = function (preventAutoPlay, seeLastMessage, log = true){
        var links, embedAutoPlay;

        if (seeLastMessage) {
            links = $('.message:eq(-1) .markup a:not(.EmbedAV-processed),.message:eq(-1) .attachment a:not(.EmbedAV-processed)');
        }
        else {
            links = $('.message .markup a:not(.EmbedAV-processed),.message .attachment a:not(.EmbedAV-processed)');
        }

        if (!this.initiated) {
            this.init();
            this.initiated = true;
        }

        embedAutoPlay = options.embedAutoPlay;
        if (preventAutoPlay) {
			      console.log("[BetterDiscord] EmbedAV: Preventing Autoplay");
            options.embedAutoPlay = false;
        }

        if (options.embedAudio) {
			      //console.log("[BetterDiscord] EmbedAV: embedAudio enabled, embedding audio and spotify");
            this.process(links, 'audio');
            this.process(links, 'spotify');
            this.process(links, 'spotifyp');
        }
        if (options.embedVideo) {
			      //console.log("[BetterDiscord] EmbedAV: embedVideo enabled, embedding videos");
            this.process(links, 'video');
        }
		if (options.embedImage) {
		    //console.log("[BetterDiscord] EmbedAV: embedImage enabled, embedding unembedded images");
		}
		if (options.embedCode) {
		    //console.log("[BetterDiscord] EmbedAV: embedCode enabled, embedding pastebin and gist");
  			this.process(links, 'pastebin');
  			this.process(links, 'gist');
		}

        options.embedAutoPlay = embedAutoPlay;
    };

    this.getSettingsPanel = function () {
        var $tagSettingsAudio = $(tagSettingsAudio),
            $tagSettingsVideo = $(tagSettingsVideo),
            $tagSettingsImage = $(tagSettingsImage),
            $tagSettingsCode = $(tagSettingsCode),
            $tagSettingsVolume = $(tagSettingsVolume),
            $tagSettingsLoop = $(tagLoop),
            $tagSettingsAutoPlay = $(tagAutoPlay)
        ;
        if (options.embedAudio)
            $tagSettingsAudio.find(':checkbox').attr('checked', 'checked');

        if (options.embedVideo)
            $tagSettingsVideo.find(':checkbox').attr('checked', 'checked');

        if (options.embedImage)
            $tagSettingsImage.find(':checkbox').attr('checked', 'checked');

        if (options.embedCode)
            $tagSettingsCode.find(':checkbox').attr('checked', 'checked');

        if (options.embedLoop)
            $tagSettingsLoop.find(':checkbox').attr('checked', 'checked');

        if (options.embedAutoPlay)
            $tagSettingsAutoPlay.find(':checkbox').attr('checked', 'checked');

        $tagSettingsVolume.find('[type="range"]').attr('value', options.volume);

        return '<ul>'
                + '<li>'
                +    $tagSettingsAudio.html()
                + '</li>'
                + '<li>'
                +    $tagSettingsVideo.html()
                + '</li>'
                + '<li>'
                +    $tagSettingsImage.html()
                + '</li>'
                + '<li>'
                +    $tagSettingsCode.html()
                + '</li>'
                + '<li>'
                +    $tagSettingsLoop.html()
                + '</li>'
                + '<li>'
                +    $tagSettingsAutoPlay.html()
                + '</li>'
                + '<li>'
                +    $tagSettingsVolume.html()
                + '</li>'
            + '</ul>'
            + '<div id="EmbedAVOptions" style="display: none">Saved...</div>'
        ;
    };

    this.setOption = function (key, value) {
        options[key] = value;
        saveOptions();
        $('#EmbedAVOptions').fadeIn('fast', function () {
            $(this).fadeOut();
        });
    };
}
EmbedAV.prototype.getName = function() {
    return "EmbedAV";
};
EmbedAV.prototype.getDescription = function() {
    return "Embeds Audio and Video links";
};
EmbedAV.prototype.getVersion = function() {
    return "1.2.0";
};
EmbedAV.prototype.getAuthor = function() {
    return "shtrih";
};
EmbedAV.prototype.load = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.", "color: purple; font-weight: bold;", "");
};
EmbedAV.prototype.unload = function() {
    this.destroy();
};
EmbedAV.prototype.start = function() {
    this.apply(true);
};
EmbedAV.prototype.stop = function() {
    this.destroy();
};
EmbedAV.prototype.onMessage = function() {
    this.apply(false, true);
};
EmbedAV.prototype.onSwitch = function() {
    this.apply(true);
};
/*@end @*/
