//META{"name":"ownerTag"}*//
var ownerTag=function(){};(function(){"use strict";const getInternalInstance=e=>e[Object.keys(e).find(k=>k.startsWith("__reactInternalInstance"))];function getOwnerInstance(e,{include,exclude=["Popout","Tooltip","Scroller","BackgroundFlash"]}={}){if(e===undefined){return undefined;}
const excluding=include===undefined;const filter=excluding?exclude:include;function getDisplayName(owner){const type=owner._currentElement.type;const constructor=owner._instance&&owner._instance.constructor;return type.displayName||constructor&&constructor.displayName||null;}
function classFilter(owner){const name=getDisplayName(owner);return(name!==null&&!!(filter.includes(name)^excluding));}
for(let prev,curr=getInternalInstance(e);!_.isNil(curr);prev=curr,curr=curr._hostParent){if(prev!==undefined&&!_.isNil(curr._renderedChildren)){let owner=Object.values(curr._renderedChildren).find(v=>!_.isNil(v._instance)&&v.getHostNode()===prev.getHostNode());if(!_.isNil(owner)&&classFilter(owner)){return owner._instance;}}
if(_.isNil(curr._currentElement)){continue;}
let owner=curr._currentElement._owner;if(!_.isNil(owner)&&classFilter(owner)){return owner._instance;}}
return null;}
function getInternalProps(e){if(e===undefined){return undefined;}
try{return getOwnerInstance(e).props;}catch(err){return undefined;}}
function getUserId(e){var props=getInternalProps(e);if(props===undefined){return undefined;}
try{return props.user.id;}catch(err){}
try{return props.message.author.id;}catch(err){}
return undefined;}
function getUserColor(e){var props=getInternalProps(e);if(props===undefined){return undefined;}
try{return props.message.colorString;}catch(err){}
return props.colorString;}
function hexToRgb(hex){var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return result?[parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16)]:null;}
function isBright(color){var c=hexToRgb(color);return!!c&&(c[0]*0.299+c[1]*0.587+c[2]*0.114)>186;}
function getGuildId(e){var owner=getOwnerInstance(e);if(owner===undefined){return undefined;}
try{return owner.props.guild.id;}catch(err){}
try{return owner.state.guild.id;}catch(err){}
return undefined;}
function getOwnerId(e){var owner=getOwnerInstance(e);if(owner===undefined){return undefined;}
try{return owner.props.guild.ownerId;}catch(err){}
try{return owner.state.guild.ownerId;}catch(err){}
return undefined;}
function addTag(){var color=getUserColor(this);var tag=$("<span>",{class:"kawaii-tag",}).text("OWNER");if(color!==null){tag.css("background-color",color);if(isBright(color)){tag.addClass("kawaii-tag-bright");}}
return tag;}
var prevGuildId;function processServer(mutation){var chat,guildId,ownerId,members,authors,tags;chat=$(".chat")[0];guildId=getGuildId(chat);ownerId=getOwnerId(chat);if(ownerId===undefined){return;}
if(guildId!==prevGuildId){members=$(".member-username-inner");members.siblings(".kawaii-tag").remove();members.filter(".kawaii-tagged").removeClass("kawaii-tagged");}else{members=mutationFind(mutation,".member-username-inner");}
authors=mutationFind(mutation,".user-name");if(!authors.closest(".message-group").hasClass("compact")){members=members.add(authors);}else{authors.filter((_,e)=>getUserId(e)===ownerId).not(".kawaii-tagged").before(addTag).addClass("kawaii-tagged");}
members.filter((_,e)=>getUserId(e)===ownerId).not(".kawaii-tagged").after(addTag).addClass("kawaii-tagged");tags=mutationFind(mutation,".discord-tag").filter((_,e)=>getUserId(e)===ownerId).not(".kawaii-tagged");if(tags.parent(".username-wrapper").length>0){tags.append($("<span>",{class:"kawaii-tag kawaii-tag-invert"}).text("OWNER")).addClass("kawaii-tagged");}
if(tags.parent(".header-info-inner").length>0){tags.append($("<span>",{class:"kawaii-tag kawaii-tag"}).text("OWNER")).addClass("kawaii-tagged");}
prevGuildId=guildId;}
function processProfile(mutation){var profile,userId,guilds;profile=mutationFind(mutation,"#user-profile-modal");userId=getUserId(profile[0]);if(userId===undefined){return;}
guilds=profile.find(".guild .avatar-large");guilds.filter((_,e)=>getOwnerId(e)===userId).parent().not(".kawaii-tagged").append($("<span>",{class:"kawaii-tag"}).text("OWNER")).addClass("kawaii-tagged");}
function mutationFind(mutation,selector){var target=$(mutation.target),addedNodes=$(mutation.addedNodes);var mutated=target.add(addedNodes).filter(selector);var descendants=addedNodes.find(selector);var ancestors=target.parents(selector);return mutated.add(descendants).add(ancestors);}
var css=`
    .kawaii-tag {
        background: #7289da;
        font-size: 10px;
        font-weight: 600;
        color: #fff!important;
        margin-left: 6px;
        padding: 1px 2px;
        border-radius: 3px;
        text-transform: uppercase;
        vertical-align: bottom;
        line-height: 16px;
        -ms-flex-negative: 0;
        flex-shrink: 0;
    }

    .compact .kawaii-tag {
        margin: 0 3px 0 0;
    }

    .kawaii-tag-bright {
        color: #23272A!important;
    }

    .kawaii-tag-invert {
        background: #fff;
        color: #7289da!important;
    }`;ownerTag.prototype.start=function(){BdApi.injectCSS("kawaii-tag-css",css);var mutation={target:document,addedNodes:[document]};processServer(mutation);processProfile(mutation);};ownerTag.prototype.observer=function(mutation){processServer(mutation);processProfile(mutation);};ownerTag.prototype.load=function(){};ownerTag.prototype.unload=function(){};ownerTag.prototype.stop=function(){BdApi.clearCSS("kawaii-tag-css");$(".kawaii-tag").remove();$(".kawaii-tagged").removeClass("kawaii-tagged");};ownerTag.prototype.getSettingsPanel=function(){return"";};ownerTag.prototype.getName=function(){return"Owner Tags";};ownerTag.prototype.getDescription=function(){return"Show a tag next to a server owner's name";};ownerTag.prototype.getVersion=function(){return"1.3.2";};ownerTag.prototype.getAuthor=function(){return"noodlebox";};})();