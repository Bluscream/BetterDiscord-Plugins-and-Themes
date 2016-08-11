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
function EmbedAV() {
    this.initiated = false;
    this.optionsDefault = {
        embedAudio: true,
        embedVideo: true,
        embedLoop: false,
        volume: 0.5
    };

    var options = this.optionsDefault,
        filterAudio = 'a[href$=".ogg"],a[href$=".OGG"],\
            a[href$=".oga"],a[href$=".OGA"],\
            a[href$=".mp3"],a[href$=".MP3"],\
            a[href$=".wav"],a[href$=".WAV"],\
            a[href$=".wma"],a[href$=".WMA"],\
            a[href$=".m4a"],a[href$=".M4A"],\
            a[href$=".aac"],a[href$=".AAC"]',
        filterVideo = 'a[href $=".ogm"],a[href $=".OGM"],\
            a[href$=".ogv"],a[href$=".OGV"],\
            a[href$=".m4v"],a[href$=".M4V"],\
            a[href$=".mp4"],a[href$=".MP4"],\
            a[href$=".webm"],a[href$=".WEBM"]',
        tagAudio = '<div class="embed EmbedAV"><audio controls preload="metadata" src="%src%" %loop%></audio></div>',
        tagVideo = '<div class="embed EmbedAV"><video controls preload="metadata" src="%src%" %loop%></video></div>',
        tagStyles = '<style>\
            .embed.EmbedAV video, \
            .embed.EmbedAV audio {\
                max-width: 100%;\
            }\
        </style>',
        tagSettingsAudio = '<div><label><input type="checkbox" name="embedav-audio" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedAudio\', $(this).is(\':checked\'))" />Embed Audio</label></div>',
        tagSettingsVideo = '<div><label><input type="checkbox" name="embedav-video" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedVideo\', $(this).is(\':checked\'))"/>Embed Video</label></div>',
        tagSettingsVolume = '<div>Volume: <input type="range" min="0" max="1" step="0.1" name="embedav-audio" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'volume\', this.value)"/></div>',
        tagLoop = '<div><label><input type="checkbox" name="embedav-loop" ' +
            'onchange="BdApi.getPlugin(\'EmbedAV\').setOption(\'embedLoop\', $(this).is(\':checked\'))" />Loop</label></div>';
        saveOptions = function () {
            localStorage.setItem('EmbedAVOptions', JSON.stringify(options));
        }
    ;

    this.init = function () {
        $('head').append(tagStyles);

        options = $.extend({}, this.optionsDefault, JSON.parse(localStorage.getItem('EmbedAVOptions')));
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
        }

        $links.filter(filter).each(function () {
            var link = $(this),
                url  = link.attr('href').replace(/^http:/, 'https:'),
                accessory = link.closest('.message').find('.accessory')
            ;

            link.addClass('EmbedAV-processed');
            tag = tag.replace(/%loop%/, (options.embedLoop ? 'loop' : ''));
            accessory.append(
                tag.replace(/%src%/, url)
            );
            accessory.find(tagName).get(0).volume = options.volume;
        });

        // Metadata loading takes some time, so that the calculations are inaccurate
        messages.scrollTop += messages.scrollHeight - mHeight;
    };

    this.apply = function (){
        var links = $('.message .markup a:not(.EmbedAV-processed),.message .attachment a:not(.EmbedAV-processed)');

        if (!this.initiated) {
            this.init();
            this.initiated = true;
        }

        if (options.embedAudio)
            this.process(links, 'audio');

        if (options.embedVideo)
            this.process(links, 'video');
    };

    this.getSettingsPanel = function () {
        var $tagSettingsAudio = $(tagSettingsAudio),
            $tagSettingsVideo = $(tagSettingsVideo),
            $tagSettingsVolume = $(tagSettingsVolume),
            $tagSettingsLoop = $(tagLoop)
        ;
        if (options.embedAudio)
            $tagSettingsAudio.find(':checkbox').attr('checked', 'checked');

        if (options.embedVideo)
            $tagSettingsVideo.find(':checkbox').attr('checked', 'checked');

        if (options.embedLoop)
            $tagSettingsLoop.find(':checkbox').attr('checked', 'checked');

        $tagSettingsVolume.find('[type="range"]').attr('value', options.volume);

        return '<ul>'
                + '<li>'
                +    $tagSettingsAudio.html()
                + '</li>'
                + '<li>'
                +    $tagSettingsVideo.html()
                + '</li>'
                + '<li>'
                +    $tagSettingsLoop.html()
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
    return "1.1.3";
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
    this.apply();
};
EmbedAV.prototype.stop = function() {
    this.destroy();
};
EmbedAV.prototype.onMessage = function() {
    this.apply();
};
EmbedAV.prototype.onSwitch = function() {
    this.apply();
};
