//META{"name":"evenBetterRepo"}*//
var evenBetterRepo = function(){};

/* Information */
evenBetterRepo.prototype.getName = function(){
    return 'Even Better Repo';
};
evenBetterRepo.prototype.getDescription = function(){
    return 'Easily access theme & plugin repository from within Discord client<br>Want to add your plugin or theme?  Submit a pull request here: <a href="https://github.com/IRDeNial/BD-Even-Better-Repo/tree/dev/" target="_BLANK">https://github.com/IRDeNial/BD-Even-Better-Repo/tree/dev/</a>';
};
evenBetterRepo.prototype.getVersion = function(){
    return '2.0.0';
};
evenBetterRepo.prototype.getAuthor = function(){
    return '<a href="https://github.com/IRDeNial" target="_BLANK">DeNial</a>';
};

// API Hooks
evenBetterRepo.prototype.load = function(){
    this.themePath = process.env.APPDATA + "\\BetterDiscord\\themes\\";
    this.pluginPath = process.env.APPDATA + "\\BetterDiscord\\plugins\\";
    this.cssURL = 'https://raw.githubusercontent.com/IRDeNial/BD-Even-Better-Repo/master/ebr.css';
    this.repoURL = 'https://raw.githubusercontent.com/IRDeNial/BD-Even-Better-Repo/master/repo.json';
    this.ebrCSS = '';
    this.repo = '';
    this.useHTTP = false;
    this.settingsAreaLoaded = false;

    this.getCSS = function(){
        require("request").get(this.cssURL,(error,response,body)=>{
            if(!error) {
                this.ebrCSS = body;
                BdApi.injectCSS("ebr-css",this.ebrCSS);
            }
        });
    };
    this.getRepo = function(){
        require("request").get(this.repoURL,(error,response,body)=>{
            if(error) {
                this.repo = JSON.parse('{"error": "Could not get repo"}');
            } else {
                this.repo = JSON.parse(body.trim());
            }
        });
    };
    this.doesFileExist = function(filePath) {
        try{
            require('fs').accessSync(filePath);
            return true;
        } catch(e) {
            return false;
        }
    };
    this.isThemeInstalled = function(url){
        var themeName = url.substr(url.lastIndexOf('/') + 1);
        if(this.doesFileExist(this.themePath + themeName)) {
            return 1;
        } else {
            return 0;
        }
    };
    this.isPluginInstalled = function(url) {
        var pluginName = url.substr(url.lastIndexOf('/') + 1);
        if(this.doesFileExist(this.pluginPath + pluginName)) {
            return 1;
        } else {
            return 0;
        }
    };
    this.populateThemes = function(){
        var themes = this.repo.themes;
        for(var i = 0;i < this.repo.themes.length;++i) {
            var themeInfo = '';
            themeInfo += '<div class="ebr-theme-item">';
                themeInfo += '<div class="ebr-theme-item-info">';
                    themeInfo += '<p class="name">'+themes[i].name+'</p>';
                    themeInfo += '<p class="author">'+themes[i].author+'</p>';
                    themeInfo += '<div class="float-clear"></div>';
                    themeInfo += '<p class="description">'+themes[i].description+'</p>';
                    if(this.isThemeInstalled(themes[i].url)) {
                        themeInfo += '<span style="display:none;">Installed</span>';
                    }
                themeInfo += '</div>';
            if(this.isThemeInstalled(themes[i].url)) {
                themeInfo += '<button class="update-button theme-update-button" updateURL="'+themes[i].url+'">Update</button>'
            } else {
                themeInfo += '<button target="_BLANK" installURL="'+themes[i].url+'" class="install-button theme-install-button">Install</button>';
            }
            themeInfo += '<button  onclick="window.open(\''+themes[i].url+'\');return false;" class="view-source-button">View Source</button>';
            themeInfo += '<div class="float-clear"></div>';
            $('.settings .settings-right #ebr-themes-pane .control-group').append(themeInfo);
        }
    };
    this.populatePlugins = function(){
        var plugins = this.repo.plugins;
        for(var i = 0;i < this.repo.plugins.length;++i) {
            var pluginInfo = '';
            pluginInfo += '<div class="ebr-plugin-item">';
            pluginInfo += '<div class="ebr-plugin-item-info">';
                pluginInfo += '<p class="name">'+plugins[i].name+'</p>';
                pluginInfo += '<p class="author">'+plugins[i].author+'</p>';
                pluginInfo += '<div class="float-clear"></div>';
                pluginInfo += '<p class="description">'+plugins[i].description+'</p>';
                if(this.isPluginInstalled(plugins[i].url)) {
                    pluginInfo += '<span style="display:none;">Installed</span>';
                }
            pluginInfo += '</div>';
            if(this.isPluginInstalled(plugins[i].url)) {
                pluginInfo += '<button class="update-button plugin-update-button" updateURL="'+plugins[i].url+'">Update</button>'
            } else {
                pluginInfo += '<button target="_BLANK" installURL="'+plugins[i].url+'" class="install-button plugin-install-button">Install</button>';
            }
            pluginInfo += '<button onclick="window.open(\''+plugins[i].url+'\');return false;" class="view-source-button">View Source</button>';
            pluginInfo += '<div class="float-clear"></div>';
            $('.settings .settings-right #ebr-plugins-pane .control-group').append(pluginInfo);
        }
    };
    this.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    evenBetterRepo.installTheme = function(url){
        var themeName = url.substr(url.lastIndexOf('/') + 1);
        
        var dest = process.env.APPDATA + "\\BetterDiscord\\themes\\" + url.substr(url.lastIndexOf('/') + 1);
        var file = require('fs').createWriteStream(dest);

        require('https').get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();
            });
        }).on('error', function(err) {
            console.log("Error installing theme: "+err);
            require('fs').unlink(dest);
            file.close();
        });
    };
    evenBetterRepo.installPlugin = function(url){
        var pluginName = url.substr(url.lastIndexOf('/') + 1);
        
        var dest = process.env.APPDATA + "\\BetterDiscord\\plugins\\" + url.substr(url.lastIndexOf('/') + 1);
        var file = require('fs').createWriteStream(dest);

        require('https').get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();
            });
        }).on('error', function(err) {
            console.log("Error installing plugin: "+err);
            require('fs').unlink(dest);
            file.close();
        });
    };

    this.getCSS();
    this.getRepo();
};
evenBetterRepo.prototype.unload = function(){};
evenBetterRepo.prototype.start = function(){};
evenBetterRepo.prototype.stop = function(){
    $('#plugin-search').off('keyup.ebr');
    $('#theme-search').off('keyup.ebr');
    $('.ebr-themes').off('click.ebr');
    $('.ebr-plugins').off('click.ebr');
    $('.plugin-install-button').off('click.ebr');
    $('.tab-bar.SIDE .tab-bar-item:not(.ebr-themes):not(.ebr-plugins)').off('click.ebr');
    $('.plugin-update-button').off('click.ebr');
    $('.theme-install-button').off('click.ebr');
    $('.theme-update-button').off('click.ebr');
};
evenBetterRepo.prototype.observer = function(e){
    if(!this.settingsAreaLoaded && this.repo != '') {
        if(e.target.classList.contains('settings-right')) {
            this.settingsAreaLoaded = true;
            $('.tab-bar.SIDE').append('<div class="tab-bar-item ebr-themes">Themes</div>');
            $('.tab-bar.SIDE').append('<div class="tab-bar-item ebr-plugins">Plugins</div>');

            $(`<div id="ebr-themes-pane" class="settings-inner" style="display:none;">
                    <div class="scroller-wrap">
                        <div class="scroller settings-wrapper settings-panel">
                            <div class="ebr-top">
                                <h2 class="themes-header">Themes</h2>
                                <input type="text" id="theme-search" placeholder="Search...">
                            </div>
                            <div class="ebr-themes">
                                <div class="control-group">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).insertBefore($('.settings .settings-right .settings-actions'));

            $(`<div id="ebr-plugins-pane" class="settings-inner" style="display:none;">
                    <div class="scroller-wrap">
                        <div class="scroller settings-wrapper settings-panel">
                            <div class="ebr-top">
                                <h2 class="plugins-header">Plugins</h2>
                                <input type="text" id="plugin-search" placeholder="Search...">
                            </div>
                            <div class="ebr-plugins">
                                <div class="control-group">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).insertBefore($('.settings .settings-right .settings-actions'));

            this.populatePlugins();
            this.populateThemes();

            $('.tab-bar.SIDE .tab-bar-item:not(.ebr-themes):not(.ebr-plugins)').on('click.ebr',function(){
                $('#ebr-themes-pane').hide();
                $('#ebr-plugins-pane').hide();
                $('.ebr-themes').removeClass('selected');
                $('.ebr-plugins').removeClass('selected');
            });
            $('.ebr-themes').on('click.ebr',function(){
                $('.tab-bar.SIDE .tab-bar-item').removeClass('selected');
                $('.ebr-themes').addClass('selected');
                $('.settings-inner').hide();
                $('#ebr-themes-pane').show();
            });
            $('.ebr-plugins').on('click.ebr',function(){
                $('.tab-bar.SIDE .tab-bar-item').removeClass('selected');
                $('.ebr-plugins').addClass('selected');
                $('.settings-inner').hide();
                $('#ebr-plugins-pane').show();
            });
            $('.plugin-install-button').on('click.ebr',function(e){
                var me = $(e.target);
                e.preventDefault();
                me.html('Update');
                evenBetterRepo.installPlugin(me.attr('installURL'));
                return false;
            });
            $('.plugin-update-button').on('click.ebr',function(e){
                var me = $(e.target);
                e.preventDefault();
                me.html('Updated');
                evenBetterRepo.installPlugin(me.attr('updateURL'));
                return false;
            });
            $('.theme-install-button').on('click.ebr',function(e){
                var me = $(e.target)
                e.preventDefault();
                me.html('Update');
                evenBetterRepo.installTheme(me.attr('installURL'));
                return false;
            });
            $('.theme-update-button').on('click.ebr',function(e){
                var me = $(e.target);
                e.preventDefault();
                me.html('Updated');
                me.addClass('disabled');
                evenBetterRepo.installTheme(me.attr('updateURL'));
                return false;
            });
            $('#theme-search').on('keyup.ebr',this.debounce(function(){
                var me = $('#theme-search');        
                if(me.val().length < 3) {
                    $('.ebr-theme-item').show();
                } else {
                    $('.ebr-theme-item').each(function(index,value){
                        var themeItem = $(value);
                        var themeItemInfo = $(value).find('.ebr-theme-item-info');
                        if(themeItemInfo.text().toLowerCase().indexOf(me.val().toLowerCase()) == -1) {
                            themeItem.hide();
                        } else {
                            themeItem.show();
                        }
                    });
                }
            },150));
            $('#plugin-search').on('keyup.ebr',this.debounce(function(){
                var me = $('#plugin-search');        
                if(me.val().length < 3) {
                    $('.ebr-plugin-item').show();
                } else {
                    $('.ebr-plugin-item').each(function(index,value){
                        var pluginItem = $(value);
                        var pluginItemInfo = $(value).find('.ebr-plugin-item-info');
                        if(pluginItemInfo.text().toLowerCase().indexOf(me.val().toLowerCase()) == -1) {
                            pluginItem.hide();
                        } else {
                            pluginItem.show();
                        }
                    });
                }
            },150));
        }
    }
    if(!$('.settings-right').length) {
        this.settingsAreaLoaded = false;
    }
};