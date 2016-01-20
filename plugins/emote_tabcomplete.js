//META{"name":"emotab"}*//


/* global emotesTwitch, emotesBTTV2, emotesBTTV, emotesFfz */

function emotab() {}

emotab.config = JSON.parse(localStorage.getItem('emotab_config')) ||
        {useBTTV: true, useFFZ: true, useTwitch: false, minLength: 3, hint: false};

emotab.options = {
    arrowKeys: true, // Allow the use of <up> and <down> keys to iterate
    hint: false, // only false works with twitch emotes due to autocapitalize of bda
    caseSensitive: false,
    minLength: emotab.config.minLength || 3,
    wrapInput: false
};
emotab.list = [];
emotab.on = false;

emotab.obs = new MutationObserver(function (mutations) {
    //console.time("obs");
    mutations.forEach(function (mutation) {
        var cl = mutation.target.classList;
        if (cl !== undefined && !cl.contains('flex-spacer'))
            return;
        var an = mutation.addedNodes;
        if (an.length <= 0 || an.length > 0 && an[0].nodeName == "NOSCRIPT")
            return;
        if (an.length == 1 && an[0].classList !== undefined && an[0].classList.contains('chat-empty')) {
            if (document.querySelector('.channel-textarea-inner') === null && document.querySelector('.channel.private') !== null) {
                document.querySelector('.channel.private:not(.selected)').click();
            }
        }
        //console.log(mutation);
        if (emotab.on && document.querySelector('.hint') === null) {
            var el = $('.channel-textarea-inner>textarea:not(.hint)');
            el.tabcomplete(emotab.list, emotab.options);
            el.off("keydown", emotab.clearhint).on("keydown", emotab.clearhint);
        }
    });
    //console.timeEnd("obs");
});
emotab.clearhint = function (e) {
    if (!e.shiftKey && e.keyCode == 13) {
        $('.hint').val('');
    }
};
emotab.updateconfig = function (e) {
    if (e.type == "checkbox") {
        emotab.config[e.id] = e.checked;
        /*if (e.id != "useTwitch") {
            emotab.config[e.id] = e.checked;
        } else {
            emotab.config[e.id] = e.checked;
            if (e.checked) {
                emotab.config['hint'] = false;
                emotab.options['hint'] = false;
            } else {
                emotab.config['hint'] = "placeholder";
                emotab.options['hint'] = "placeholder";
            }*/
        }
    if (e.type == "select-one") {
        emotab.config.minLength = e.selectedIndex + 1;
        emotab.options.minLength = e.selectedIndex + 1;
    }
    localStorage.setItem('emotab_config', JSON.stringify(emotab.config));
    emotab.prototype.stop();
    emotab.on = true;
    emotab.prototype.start();
};
emotab.prototype.load = function () {
    (function ($) {
        var keys = {
            backspace: 8,
            tab: 9,
            up: 38,
            down: 40
        };
        $.tabcomplete = {};
        $.tabcomplete.defaultOptions = {
            after: "",
            arrowKeys: false, // Allow the use of <up> and <down> keys to iterate
            hint: "placeholder", // "placeholder", "select", false
            match: match,
            caseSensitive: false,
            minLength: 1,
            wrapInput: true
        };
        $.fn.tab =
                $.fn.tabcomplete = function (args, options) {
                    if (this.length > 1) {
                        return this.each(function () {
                            $(this).tabcomplete(args, options);
                        });
                    }
                    var tag = this.prop("tagName");
                    if (tag != "INPUT" && tag != "TEXTAREA") {
                        return;
                    }
                    this.options = options = $.extend(
                            $.tabcomplete.defaultOptions,
                            options
                            );
                    this.unbind(".tabcomplete");
                    this.prev(".hint").remove();
                    var self = this;
                    var backspace = false;
                    var i = -1;
                    var words = [];
                    var last = "";
                    var hint = $.noop;
                    switch (options.hint) {
                        case "placeholder":
                            hint = placeholder;
                            break;
                        case "select":
                            hint = select;
                            break;
                    }
                    this.on("input.tabcomplete", function () {
                        var input = self.val();
                        var word = input.split(/ |\n/).pop();
                        reset();
                        if (self[0].selectionStart == input.length
                                && word.length) {
                            words = options.match(word, args, options.caseSensitive);
                            if (options.after) {
                                words = $.map(words, function (w) {
                                    return w + options.after;
                                });
                            }
                        }
                        self.trigger("match", words.length);
                        if (options.hint) {
                            if (!(options.hint == "select" && backspace) && word.length >= options.minLength) {
                                hint.call(self, words[0]);
                            } else {
                                hint.call(self, "");
                            }
                        }

                        if (backspace) {
                            backspace = false;
                        }
                    });
                    this.on("keydown.tabcomplete", function (e) {
                        var key = e.which;
                        if (key == keys.tab
                                || (options.arrowKeys && (key == keys.up || key == keys.down))) {
                            e.preventDefault();
                            if (key != keys.up) {
                                i++;
                            } else {
                                if (i == -1)
                                    return;
                                if (i == 0) {
                                    i = words.length - 1;
                                } else {
                                    i--;
                                }
                            }
                            var word = words[i % words.length];
                            if (!word) {
                                return;
                            }

                            var value = self.val();
                            last = last || value.split(/ |\n/).pop();
                            if (last.length < options.minLength) {
                                return;
                            }
                            var text = options.hint == "select" ? value : value.substr(0, self[0].selectionStart - last.length) + word;
                            self.val(text);
                            if (options.hint == "select") {
                                self[0].selectionStart = text.length;
                            }
                            last = word;
                            self.trigger("tabcomplete", last);
                            if (options.hint) {
                                hint.call(self, "");
                            }
                        } else if (e.which == keys.backspace) {
                            backspace = true;
                            i = -1;
                            last = "";
                        } else if (options.hint) {
                            reset();
                            hint.call(self, "");
                        }
                    });
                    if (options.hint) {
                        hint.call(this, "");
                    }
                    this.on("blur.tabcomplete", function () {
                        reset();
                        if (options.hint) {
                            hint.call(self, "");
                        }
                    });
                    function reset() {
                        i = -1;
                        last = "";
                        words = [];
                    }
                    return this;
                };
        function match(word, array, caseSensitive) {
            return $.grep(
                    array,
                    function (w) {
                        if (caseSensitive) {
                            return !w.indexOf(word);
                        } else {
                            return !w.toLowerCase().indexOf(word.toLowerCase());
                        }
                    }
            );
        }
        function placeholder(word) {
            var input = this;
            var clone = input.prev(".hint");
            input.css({
                backgroundColor: "transparent",
                position: "relative"
            });
            if (!clone.length) {
                if (input.options.wrapInput) {
                    input.wrap(
                            $("<div>").css({
                        position: "relative",
                        height: input.css("height"),
                        display: input.css("display") === "block" ? "block" : "inline-block"
                    })
                            );
                }
                clone = input
                        .clone()
                        .attr("tabindex", -1)
                        .removeAttr("id name placeholder")
                        .addClass("hint")
                        .insertBefore(input);
                clone.css({
                    width: input.css("width"),
                    position: "absolute"
                });
            }

            var hint = "";
            if (typeof word !== "undefined") {
                var value = input.val();
                hint = value + word.substr(value.split(/ |\n/).pop().length);
            }

            clone.val(hint);
        }
        function select(word) {
            var input = this;
            var value = input.val();
            if (word) {
                input.val(
                        value
                        + word.substr(value.split(/ |\n/).pop().length)
                        );
                input[0].selectionStart = value.length;
            }
        }
    })(jQuery);
};
emotab.prototype.unload = function () {
    //$.tabcomplete = null;
};
emotab.prototype.start = function () {
    var delaythis = function () {
        //console.time('emotab_start');
        var minlen = 4;
        emotab.list = [];
        if (emotab.config.useTwitch && typeof (emotesTwitch) !== 'undefined' && emotesTwitch.hasOwnProperty("emotes")) {
            Object.keys(emotesTwitch.emotes).forEach(function (key, index) {
                if (key.length >= minlen){
                    emotab.list.push(key);
                }
            });
        }
        if (emotab.config.useBTTV && typeof (emotesBTTV) !== 'undefined') {
            Object.keys(emotesBTTV).forEach(function (key, index) {
                if (key.length >= minlen){
                    emotab.list.push(key);
                }
            });
        }
        if (emotab.config.useBTTV && typeof (emotesBTTV2) !== 'undefined') {
            Object.keys(emotesBTTV2).forEach(function (key, index) {
                if (key.length >= minlen){
                    emotab.list.push(key);
                }
            });
        }
        if (emotab.config.useFFZ && typeof (emotesFfz) !== 'undefined') {
            Object.keys(emotesFfz).forEach(function (key, index) {
                if (key.length >= minlen){
                    emotab.list.push(key);
                }
            });
        }

        emotab.on = true;
        var el = $('.channel-textarea-inner>textarea:not(.hint)');
        el.tabcomplete(emotab.list, emotab.options);
        el.on("keydown", emotab.clearhint);
        emotab.obs.observe(document.querySelector('.app'), {childList: true, subtree: true});
        //console.timeEnd('emotab_start');
    };
    if (!emotab.on) {
        setTimeout(delaythis, 1000);
    } else {
        delaythis();
    }
};
emotab.prototype.stop = function () {
    emotab.on = false;
    emotab.obs.disconnect();
    var el = $('.channel-textarea-inner>textarea:not(.hint)');
    el.unbind(".tabcomplete");
    el.off("keydown", emotab.clearhint);
    $('.hint').remove();
};
emotab.prototype.getName = function () {
    return "Emote Tabcomplete";
};
emotab.prototype.getDescription = function () {
    return "Tab-Complete Plugin for Emotes";
};
emotab.prototype.getVersion = function () {
    return "0.0.1";
};
emotab.prototype.getAuthor = function () {
    return "Pohky";
};
emotab.prototype.getSettingsPanel = function () {
    var html = [];
    html.push('<div><table>');

    html.push('<tr>');
    html.push('<td>');
    html.push('<p style="font-weight:bold;">Select Emote-Sets</p>');
    if (emotab.config.useBTTV) {
        html.push('<input type="checkbox" onclick="emotab.updateconfig(this);" id="useBTTV" checked>');
    } else {
        html.push('<input type="checkbox" onclick="emotab.updateconfig(this);" id="useBTTV">');
    }
    html.push('<label for="useBTTV">Use BTTV\t\tEmotes</label></br>');
    if (emotab.config.useFFZ) {
        html.push('<input type="checkbox" onclick="emotab.updateconfig(this);" id="useFFZ" checked>');
    } else {
        html.push('<input type="checkbox" onclick="emotab.updateconfig(this);" id="useFFZ">');
    }
    html.push('<label for="useFFZ">Use FFZ\t\tEmotes</label></br>');
    if (emotab.config.useTwitch) {
        html.push('<input type="checkbox" onclick="emotab.updateconfig(this);" id="useTwitch" checked>');
    } else {
        html.push('<input type="checkbox" onclick="emotab.updateconfig(this);" id="useTwitch">');
    }
    html.push('<label for="useTwitch">Use Twitch\t\tEmotes</label></br></br>');
    html.push('<select id="mwl" name="mwl" onchange="emotab.updateconfig(this);">');
    for (var i = 1; i <= 4; i++) {
        if (i == emotab.config.minLength) {
            html.push('<option selected>' + i + '</option>');
        } else {
            html.push('<option>' + i + '</option>');
        }
    }
    html.push('</select>');
    html.push('<label for="mwl">Min. Word length</label>');

    html.push('</td>');
    html.push('</tr>');

    html.push('</table></div>');
    return html.join("\n");
};
