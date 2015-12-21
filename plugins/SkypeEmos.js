//META{"name":"SkypeEmos"}*//

function SkypeEmos() {}

SkypeEmos.settingsButton = null;
SkypeEmos.settingsPanel = null;
SkypeEmos.settings_lastTab = "";
SkypeEmos.speedMultiplier = 0.04;
SkypeEmos.prototype.settings_changeTab = function(tab) {

    SkypeEmos.settings_lastTab = tab;

    var controlGroups = $("#se-control-groups");
    $(".se-tab").removeClass("selected");
    $(".se-pane").hide();
    $("#" + tab).addClass("selected");
    $("#" + tab.replace("tab", "pane")).show();

    switch (tab) {
        case "se-settings-tab":
            break;
    }
};

SkypeEmos.settings_updateSetting = function(checkbox) {
    var cb = $(checkbox).children().find('input[type="checkbox"]');
    var enabled = !cb.is(":checked");
    var id = cb.attr("id");
    cb.prop("checked", enabled);
    SkypeEmos.settings[id] = enabled;
    SkypeEmos.prototype.saveSettings()
    console.log("id", enabled)
}

SkypeEmos.settings_construct = function() {

    SkypeEmos.settingsPanel = $("<div/>", {
        id: "se-pane",
        class: "settings-inner",
        css: {
            "display": "none"
        }
    });

    var settingsInner = '' +
        '<div class="scroller-wrap">' +
        '   <div class="scroller settings-wrapper settings-panel">' +
        '       <div class="tab-bar TOP">' +
        '           <div class="tab-bar-item se-tab" id="se-settings-tab" onclick="SkypeEmos.prototype.settings_changeTab(\'se-settings-tab\');">Settings</div>' +
        '       </div>' +
        '       <div class="se-settings">' +
        '' +
        '               <div class="se-pane control-group" id="se-settings-pane" style="display:none;">' +
        '                   <ul class="checkbox-group">';

    for (var setting in SkypeEmos.settingsArray) {
        var sett = SkypeEmos.settingsArray[setting];
        var id = sett["id"];
        if (sett["implemented"]) {
            settingsInner += '' +
                '<li>' +
                '<div class="checkbox" onclick="SkypeEmos.settings_updateSetting(this);" >' +
                '<div class="checkbox-inner">' +
                '<input type="checkbox" id="' + id + '" ' + (SkypeEmos.settings[id] ? "checked" : "") + '>' +
                '<span></span>' +
                '</div>' +
                '<span>' + setting + " - " + sett["info"] +
                '</span>' +
                '</div>' +
                '</li>';
        }
    }
    settingsInner += '</ul>' +
        '               </div>' +
        ' </div>' +
        ' </div>' +
        '</div>'

    function show_Settings() {
        $(".tab-bar-item").removeClass("selected");
        SkypeEmos.settingsButton.addClass("selected");
        $(".form .settings-right .settings-inner").hide();

        SkypeEmos.settingsPanel.show();
        if (SkypeEmos.settings_lastTab == "") {
            SkypeEmos.prototype.settings_changeTab("se-settings-tab");
        } else {
            SkypeEmos.prototype.settings_changeTab(SkypeEmos.settings_lastTab);
        }
    }

    SkypeEmos.settingsButton = $("<div/>", {
        class: "tab-bar-item",
        text: "Skype-Emos",
        id: "se-settings-new",
        click: function() {
            setTimeout(show_Settings, 100);
        }
    });

    SkypeEmos.settingsPanel.html(settingsInner);

    function defer() {
        if ($(".btn.btn-settings").length < 1) {
            setTimeout(defer, 100);
        } else {
            $(".btn.btn-settings").first().on("click", function() {

                function innerDefer() {
                    if ($(".modal-inner").first().is(":visible")) {

                        SkypeEmos.settingsPanel.hide();
                        var tabBar = $(".tab-bar.SIDE").first();

                        $(".tab-bar.SIDE .tab-bar-item:not(#bd-settings-new)").click(function() {
                            $(".form .settings-right .settings-inner").first().show();
                            $("#se-settings-new").removeClass("selected");
                            SkypeEmos.settingsPanel.hide();
                        });
                        $(".tab-bar.SIDE .tab-bar-item#bd-settings-new").click(function() {
                            $("#se-settings-new").removeClass("selected");
                            SkypeEmos.settingsPanel.hide();
                        });

                        tabBar.append(SkypeEmos.settingsButton);
                        $(".form .settings-right .settings-inner").last().after(SkypeEmos.settingsPanel)
                        $("#se-settings-new").removeClass("selected");
                    } else {
                        setTimeout(innerDefer, 100);
                    }
                }
                innerDefer();
            });
        }
    }
    defer();

};
String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}
SkypeEmos.settingsArray = {
    "Enable Skype Emotes in Messages": {
        "id": "emote-enable",
        "info": "Enable Message Parsing",
        "default": true,
        "implemented": true
    },
    "Show Skype Emo list": {
        "id": "emote-list",
        "info": "Shows the Skype Emo list",
        "default": true,
        "implemented": false
    },
    "Show Emo Names": {
        "id": "emote-tooltip",
        "info": "Shows the Emo Names",
        "default": true,
        "implemented": false
    },
}
SkypeEmos.emotelist = {
    ":cat_cleaning:": {
        "url": "https://i.gyazo.com/da52bad9d25dcf64f1e9cec667f22e26.gif",
        "type": "gif"
    }
};
SkypeEmos.isReady = false;

SkypeEmos.prototype.load = function() {
    $.getJSON("https://megamit.github.io/repository/skype-emotes/skypeemotedata.json", function(list) {
        SkypeEmos.emotelist = list;
        SkypeEmos.isReady = true;
        console.log("Skype-Emos: Ready");
        SkypeEmos.process();
    }).fail(function(xhr, status, error) {
        console.log("[Skype-Emos] Error Loading emotelist '" + status + ":" + error + "'. Using fallback");
        SkypeEmos.isReady = true;
        SkypeEmos.process();
    });
    $('head').append(
        '<style>' +
        '.s_emo_sprite{animation: play 1s steps(1) infinite; display:inline-block;}' +
        '.s_emo_sprite40 { width: 40px;  height: 40px;}' +
        '.s_emo_sprite20 { width: 20px;  height: 20px;}' +
        '@keyframes play {  from { background-position:  0 0; }  to { background-position:  0 100%; }}' +
        '</style>"'
    );
    console.log("Skype-Emos: Loaded.");
};
SkypeEmos.prototype.saveSettings = function() {
    localStorage.setItem("s_emo_settings", SkypeEmos.settings);
}
SkypeEmos.prototype.getDefaultSettings = function() {
    var new_settings = {}
    for (var setting in SkypeEmos.settingsArray) {
        new_settings[SkypeEmos.settingsArray[setting]["id"]] = SkypeEmos.settingsArray[setting]["default"];
    }
    return new_settings;
}
SkypeEmos.prototype.unload = function() {
    console.log("Skype-Emos: Unloaded.");
};

SkypeEmos.prototype.start = function() {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observer = new MutationObserver(function(mutations, observer) {
        if (SkypeEmos.isReady && SkypeEmos.settings["emote-enable"]) SkypeEmos.process();
        // ...
    });
    var attempt = 0;
    var retry = setInterval(function() {
        attempt++;
        $(".chat").each(function() {
            console.log("[SkypeEmos] Chat listener attached after " + attempt + " tries")
            clearInterval(retry);
            observer.observe(this, {
                childList: true,
                characterData: true,
                attributes: false,
                subtree: true
            });
        });
    }, 100);

    SkypeEmos.settings = JSON.parse(localStorage.getItem("s_emo_settings")) || SkypeEmos.prototype.getDefaultSettings();
    SkypeEmos.settings_construct();
    console.log("Skype-Emos: Started.")
};
SkypeEmos.process = function() {
    $(".chat .comment .markup>span:not(.s_emos_scanned)").html(function(i, html) {
        $.each(SkypeEmos.emotelist, function(key, emote) {
            if (emote.type == "gif") {
                html = html.replaceAll(key, "<img src='" + emote.url + "'alt='" + key + "'><\/img>");
            } else if (emote.type == "sprite20") {
                var css_size = emote.steps - 1;
                var duration = emote.steps * SkypeEmos.speedMultiplier;
                html = html.replaceAll(key, "<div class='s_emo_sprite s_emo_sprite20' style='animation-timing-function: steps(" + css_size + "); animation-duration: " + duration + "s; background-image: url(\"" + emote.url + "\") '></div>")
            } else if (emote.type == "sprite40") {
                var css_size = emote.steps - 1;
                var duration = emote.steps * SkypeEmos.speedMultiplier;
                html = html.replaceAll(key, "<div class='s_emo_sprite s_emo_sprite40' style='animation-timing-function: steps(" + css_size + "); animation-duration: " + duration + "s; background-image: url(\"" + emote.url + "\") '></div>")
            }
        });
        return html
    }).addClass("s_emos_scanned");
    /* $(".topic:not(.s_emos_scanned)").html(function(i,html){
  $.each(SkypeEmos.emotelist,function(emote,url){
console.log(url,emote);
html = html.replaceAll(emote, "<img src='" + url+"'><\/img>");
});
return html;
}).addClass("s_emos_scanned"); */
}
SkypeEmos.prototype.stop = function() {
    $(".s_emos_scanned>img").replaceWith("<span>" + $(this).attr("alt") + "</span>").removeClass(".s_emos_scanned")
    console.log("Skype-Emos: Stopped.");
};

SkypeEmos.prototype.update = function() {
    console.log("Skype-Emos: Updated");
};

SkypeEmos.prototype.getName = function() {
    return "Skype-Emos";
};

SkypeEmos.prototype.getDescription = function() {
    return "A plugin for BetterDiscord that brings some of the Skype Emos to Discord.";
};

SkypeEmos.prototype.getVersion = function() {
    return "1.0 Beta";
};

SkypeEmos.prototype.getAuthor = function() {
    return "megamit & Decorater";
};