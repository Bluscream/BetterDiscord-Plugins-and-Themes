//META{"name":"CollapsibleEmbeds"}*//
/*
 Check for Updates: https://gist.github.com/shtrih/59a8be1f9ff53f0499c2
 How to install:
     1. If you don't have it, get Discord from https://discordapp.com/apps
     2. Download BetterDiscord for your platform on https://betterdiscord.net/home
     3. Push the button «Raw» then Ctrl + S.
     3. Place the plugin in %appdata%\BetterDiscord\plugins\.
     4. Refresh Discord with Ctrl + Shift + R or just restart Discord completely.
     5. Go to the BetterDiscord settings → plugins tab and check plugin.
 */
function CollapsibleEmbeds() {
    this.initiated = false;
    this.oDefaultSettings = {
        defaultCollapsed: false
    };
    this.oSettings = {};

    var that = this,
        oData,
        iDataTTL = 86400 * 7,
        tagCaret = '&nbsp;<a class="embed-toggle" href="#"><span class="Select-arrow"></span></a>',
        handlerCaretClick = function (e, isTriggered) {
            e.stopPropagation();
            var self = $(e.currentTarget),
                message = self.closest('.message'),
                accessory = $('.accessory', message),
                url = self.prev().attr('href'),
                state
            ;

            if (accessory.children('.attachment').length) {
                accessory.children('.embed').toggleClass('CollapsibleEmbeds-hidden');
            }
            else {
                accessory.toggleClass('CollapsibleEmbeds-hidden');
            }
            self.toggleClass('embed-closed');

            if (!isTriggered && url) {
                state = (self.hasClass('embed-closed') ^ that.oSettings['defaultCollapsed'] ? Date.now() : false);
                that.setState(url, state);
            }
        },
        handlerCaretHover = function (e) {
            if (that.oSettings['defaultCollapsed']) {
                $(e.currentTarget).trigger('click', true /* isTriggered*/);
            }
        },
        handlerEachLink = function () {
            var self = $(this),
                message = self.closest('.message'),
                accessory = $('.accessory', message)
            ;
            self.addClass('CollapsibleEmbeds-processed');

            // wait other plugins to create embeds
            setTimeout(function () {
                // In some cases here children <noscript> tag, so no need caret (example message: http://store.otaku.ru/catalog/product/48459.html)
                if (accessory.children(':not(noscript)').length) {
                    self.after(tagCaret)
                        .next('.embed-toggle')
                            .on('click', handlerCaretClick)
                            // .on('mouseenter mouseleave', handlerCaretHover)
                    ;

                    loadState(self);
                }
            }, 300);
        },
        loadState = function ($link) {
            var url = $link.attr('href');

            if (!!(url && oData[url]) ^ that.oSettings['defaultCollapsed']) {
                $link.next('.embed-toggle').trigger('click', true /* isTriggered*/);
            }
        },
        tagStyles = '<style>\
            .CollapsibleEmbeds-hidden {\
                display: none\
            }\
            .message-group .comment .attachment a.CollapsibleEmbeds-processed,\
            .message-group .comment .attachment .embed-toggle{\
                display: inline-block;\
            }\
            .embed-toggle > .Select-arrow {\
                border-color: #0096cf transparent transparent;\
            }\
            .embed-closed > .Select-arrow {\
                border-width: 4px 0 5px 5px;\
                border-color: transparent #0096cf transparent;\
                margin-left: 2px;\
                padding-right: 4px;\
            }\
        </style>',
        cleanData = function () {
            var expireTime = Date.now() - iDataTTL;
            $.each(oData, function (key, value) {
                if (typeof(value) === 'number' && value < expireTime
                    // remove old v1.* values
                    || typeof(value) !== 'number'
                ) {
                    delete oData[key];
                }
            });
        },
        loadSettings = function () {
            that.oSettings = $.extend(
                that.oDefaultSettings,
                JSON.parse(localStorage.getItem('CollapsibleEmbeds-Settings')) || {}
            );
        },
        saveSettings = function () {
            localStorage.setItem('CollapsibleEmbeds-Settings', JSON.stringify(that.oSettings));
        }
    ;

    this.init = function () {
        $('head').append(tagStyles);

        loadSettings();
        oData = JSON.parse(localStorage.getItem('CollapsibleEmbeds-Data')) || {};
        cleanData();
    };

    this.destroy = function () {
        $('.embed-toggle').remove();
        $('.CollapsibleEmbeds-hidden').removeClass('CollapsibleEmbeds-hidden');
    };

    this.process = function ($links) {
        $links.each(handlerEachLink);
    };

    this.apply = function (){
        if (!this.initiated) {
            this.init();
            this.initiated = true;
        }

        var links = $('.message .markup a:not(.CollapsibleEmbeds-processed):not(.embed-toggle),' +
            '.message .attachment a:not(.CollapsibleEmbeds-processed):not(.embed-toggle)');

        this.process(links);

        // Dealing with attachment images
        var attachment_links = $('.message .attachment-image a:not(.CollapsibleEmbeds-processed):not(.embed-toggle)'),
            attachment_fake_link = $('<a/>', {
                target: '_blank'
            }),
            links_to_process = $()
        ;
        attachment_links.each(function () {
            var self = $(this),
                message = self.closest('.message'),
                link = attachment_fake_link
                    .clone()
                    .attr('href', self.attr('href'))
                    .text(self.attr('href').split('/').pop())
            ;

            self.addClass('CollapsibleEmbeds-processed');
            message.find('.markup').append(link);
            links_to_process = links_to_process.add(link);
        });
        this.process(links_to_process);
    };

    this.setState = function (key, value) {
        if (!value) {
            delete oData[key];
        }
        else {
            oData[key] = value;
        }
        localStorage.setItem('CollapsibleEmbeds-Data', JSON.stringify(oData));
    };

    this.setOption = function (key, value) {
        that.oSettings[key] = value;
        saveSettings();
    };
}
CollapsibleEmbeds.prototype.getName = function() {
    return "CollapsibleEmbeds";
};
CollapsibleEmbeds.prototype.getDescription = function() {
    return "Near each link adds a carriage, which allows you to hide image/video preview. It works with \"embed\" plugins.\n";
};
CollapsibleEmbeds.prototype.getVersion = function() {
    return "2.1.0";
};
CollapsibleEmbeds.prototype.getAuthor = function() {
    return "shtrih";
};
CollapsibleEmbeds.prototype.getSettingsPanel = function() {
    if (!this.oSettings)
        this.loadSettings();

    return '<label><input type="checkbox"'+ (this.oSettings['defaultCollapsed'] ? ' checked="checked" ' : '')
        +' onchange="BdApi.getPlugin(\'CollapsibleEmbeds\').setOption(\'defaultCollapsed\', $(this).is(\':checked\'))" /> Collapsed previews by default</label>'
        +'<p>Proptip: Settings will take effect when you switch the channel. No need to restart Discord.</p>';
};

CollapsibleEmbeds.prototype.load = function() {
    console.info("%c[BetterDiscord]" + " %c" + this.getName() + " v" + this.getVersion() + " by " + this.getAuthor() + " loaded.", "color: purple; font-weight: bold;", "");
};
CollapsibleEmbeds.prototype.unload = function() {
    this.destroy();
};
CollapsibleEmbeds.prototype.start = function() {
    this.apply();
};
CollapsibleEmbeds.prototype.stop = function() {
    this.destroy();
};
CollapsibleEmbeds.prototype.onMessage = function() {
    this.apply();
};
CollapsibleEmbeds.prototype.onSwitch = function() {
    this.apply();
};