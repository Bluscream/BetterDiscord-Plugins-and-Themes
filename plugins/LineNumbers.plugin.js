//META{"name":"lineNumbers"}*//
var lineNumbers=function(){};(function(){"use strict";function topPanel(){var panel=$("<form>").addClass("form").css("width","100%");return panel;}
function controlGroups(){return $("<div>").addClass("control-groups");}
function controlGroup(settings){var group=$("<div>").addClass("control-group");if(typeof settings.label==="string"){group.append($("<label>").text(settings.label));}else if(settings.label!==undefined){group.append($("<label>").append(settings.label));}
return group;}
function checkboxGroup(settings){settings=$.extend({items:[],callback:$.noop,},settings);var state=settings.items.map(item=>item.checked===true);function onClick(i,itemState){if(settings.items[i].callback!==undefined){settings.items[i].callback(itemState);}
state[i]=itemState;settings.callback(state);}
var group=$("<ul>").addClass("checkbox-group");group.append(settings.items.map(function(item,i){return checkbox($.extend({},item,{callback:onClick.bind(undefined,i),}));}));return group;}
function checkbox(settings){settings=$.extend({checked:false,disabled:false,callback:$.noop,},settings);var input=$("<input>").attr("type","checkbox").prop("checked",settings.checked).prop("disabled",settings.disabled);var inner=$("<div>").addClass("checkbox-inner").append(input).append($("<span>"));var outer=$("<div>").addClass("checkbox").append(inner);if(settings.disabled){outer.addClass("disabled");}
if(typeof settings.label==="string"){outer.append($("<span>").text(settings.label));}else if(settings.label!==undefined){outer.append($("<span>").append(settings.label));}
outer.on("click.kawaiiSettings",function(){if(!input.prop("disabled")){var checked=!input.prop("checked");input.prop("checked",checked);settings.callback(checked);}});var item=$("<li>").append(outer);var help;if(typeof settings.help==="string"){help=$("<div>").text(settings.help);}else if(settings.help!==undefined){help=$("<div>").append(settings.help);}
if(help!==undefined){help.appendTo(item).addClass("help-text").css("margin-top","-3px").css("margin-left","27px");}
return item;}
function processCodeBlocks(mutation){mutationFind(mutation,".hljs").not(":has(ol)").filter((_,e)=>!(settings.ignoreNoLanguage&&e.className=="hljs")).each(function(){this.innerHTML=this.innerHTML.split("\n").map(line=>"<li>"+line+"</li>").join("");}).wrapInner($("<ol>").addClass("kawaii-linenumbers"));}
function mutationFind(mutation,selector){var target=$(mutation.target),addedNodes=$(mutation.addedNodes);var mutated=target.add(addedNodes).filter(selector);var descendants=addedNodes.find(selector);var ancestors=target.parents(selector);return mutated.add(descendants).add(ancestors);}
var css=`
    .hljs ol {
        list-style: none;
        counter-reset: linenumbers;
    }

    .hljs ol li {
        text-indent: -4ch;
        margin-left: 3.5ch;
        padding-left: 0.5ch;
        border-left: 1px solid rgba(0,0,0,0.2);
    }

    .hljs ol li::before {
        color: rgba(127,127,127,0.5);
        display: inline-block;
        width: 3ch;
        margin-right: 0.5ch;
        padding-right: 0.5ch;
        text-align: right;
        counter-increment: linenumbers;
        content: counter(linenumbers);
        -webkit-user-select: none;
        user-select: none;
    }`;lineNumbers.prototype.start=function(){settings=localSettings();if(!settings.noStyle){BdApi.injectCSS("kawaii-linenumbers-css",css);}
var mutation={target:document,addedNodes:[document]};processCodeBlocks(mutation);};lineNumbers.prototype.observer=function(mutation){processCodeBlocks(mutation);};var settings={},defaultSettings={ignoreNoLanguage:false,noStyle:false,};function localSettings(settings){if(settings===undefined){var localSettings;try{localSettings=bdPluginStorage.get("lineNumbers","settings");}catch(err){console.warn("LineNumbers:","unable to load settings:",err);localSettings=null;}
if(localSettings===null){try{localSettings=JSON.parse(localStorage.lineNumbers);}catch(err){localSettings={};}
bdPluginStorage.set("lineNumbers","settings",localSettings);}
return $.extend({},defaultSettings,localSettings);}
try{bdPluginStorage.set("lineNumbers","settings",settings);}catch(err){console.warn("LineNumbers:","unable to save settings:",err);}}
lineNumbers.prototype.load=function(){};lineNumbers.prototype.unload=function(){};lineNumbers.prototype.stop=function(){BdApi.clearCSS("kawaii-linenumbers-css");$(".kawaii-linenumbers").removeClass("kawaii-linenumbers").children().not(":last-child").append(document.createTextNode("\n")).end().contents().unwrap().unwrap();localSettings(settings);};lineNumbers.prototype.restart=function(){this.stop();this.start();};lineNumbers.prototype.getSettingsPanel=function(){var panel=topPanel();var filterControls=controlGroups().appendTo(panel);var Control=controlGroup({label:"Filtering options"}).appendTo(filterControls).append(checkboxGroup({callback:state=>{localSettings(settings);this.restart();},items:[{label:"Ignore code blocks with no language specified.",checked:settings.ignoreNoLanguage,callback:state=>{settings.ignoreNoLanguage=state;},},{label:"Don't add style rules.",help:"Leave styling up to themes or custom CSS.",checked:settings.noStyle,callback:state=>{settings.noStyle=state;},},],}));return panel[0];};lineNumbers.prototype.getName=function(){return"Line Numbers";};lineNumbers.prototype.getDescription=function(){return"Add line numbers to code blocks";};lineNumbers.prototype.getVersion=function(){return"1.1.5";};lineNumbers.prototype.getAuthor=function(){return"noodlebox";};})();