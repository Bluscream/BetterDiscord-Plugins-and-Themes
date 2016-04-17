var BetterAPI=BetterAPI||bdplugins.BetterAPI.plugin.constructor
function searchPlugin(){var self=this;if(searchPlugin.prototype.self)return searchPlugin.prototype.self;else(searchPlugin.prototype.self=self)
this.log=function(){var args=Array.prototype.slice.call(arguments);args.unshift("%c["+self.getName()+"]",'font-weight: bold;color: green;');console.log.apply(console,args);}
this.init=function(){self.cancelFlag=false;}
this.stop=function(){};this.start=function(){window.addEventListener('keydown',function(e){if(e.ctrlKey&&e.which==70){self.displaySearchbar()}});};this.addStopper=function(){self.removeStopper()
$("#searchBarInner").append($("<a id='searchBarStopper'>Stop Search</a>").click(function(){self.stopSearch();self.removeStopper();}).css("cursor","pointer"))}
this.removeStopper=function(){$("#searchBarStopper").remove();}
this.searchDown=function(query,matchCase,startNode,startIndex){if(self.cancelFlag){self.cancelFlag=false;return}
var query=matchCase?query:query.toLowerCase();var messages=$(".message-group.compact .message-content *,.message-group:not(.compact) .markup *").contents().filter(function(){return this.nodeType===3;})
var foundStart=false;var found=false;var msg;for(i=0;i<messages.length;i++){msg=messages[i];var msgtxt=matchCase?msg.nodeValue:msg.nodeValue.toLowerCase();if(!startNode||foundStart||startNode==msg){foundStart=true;if(startIndex==0&&startNode==msg)continue;var index=startNode==msg?msgtxt.indexOf(query,startIndex):msgtxt.indexOf(query)
if(index!=-1){found=true
$(".messages").scrollTop(msg.parentElement.offsetTop)
var sel=window.getSelection();var range=document.createRange();var endpoint=query.length+index
range.setStart(msg,0);range.setEnd(msg,endpoint);range.setStart(msg,index);sel.removeAllRanges();sel.addRange(range);break;}}}
if(found)self.removeStopper();else{self.removeStopper();}}
this.searchUp=function(query,matchCase,startNode,startIndex){if(self.cancelFlag){self.cancelFlag=false;return}
var query=matchCase?query:query.toLowerCase();var messages=$(".message-group.compact .message-content *,.message-group:not(.compact) .markup *").contents().filter(function(){return this.nodeType===3;})
var foundStart=false;var found=false;var msg;for(i=messages.length-1;i>=0;i--){msg=messages[i];var msgtxt=matchCase?msg.nodeValue:msg.nodeValue.toLowerCase();if(!startNode||foundStart||startNode==msg){foundStart=true;if(startIndex==0&&startNode==msg)continue;var index=startNode==msg?msgtxt.lastIndexOf(query,startIndex-1):msgtxt.lastIndexOf(query)
if(index!=-1){found=true
$(".messages").scrollTop(msg.parentElement.offsetTop)
var sel=window.getSelection();var range=document.createRange();var endpoint=query.length+index
range.setStart(msg,0);range.setEnd(msg,endpoint);range.setStart(msg,index);sel.removeAllRanges();sel.addRange(range);break;}}}
if(found)self.removeStopper();else{self.scrollChatToTop()
self.cancelTO=setTimeout(function(){self.searchUp(query,matchCase,msg,0)},100)}}
this.onSwitch=function(){}
this.scrollChatToTop=function(){$(".messages")[0].scrollTop=0;}
this.displaySearchbar=function(){if($("#searchBar").length==0){var sb=$("<form class='searchPlugin' id='searchBar'></form>").css("display","block")
var sbInner=$("<div id='searchBarInner'></div>").css("float","left")
sb.append(sbInner)
sbInner.append($("<input id='searchBarInput'>").keydown(function(event){if(event.keyCode==13){event.preventDefault()
$("#searchBarUp").click();}}))
var up=$("<input id='searchBarUp' class='btn' type='button' value='&#x25B2'>").click(function(){var q=$("#searchBarInput").val()
if(q.length>0){var sel=window.getSelection();if(sel.type=="Range"&&sel.anchorNode.id!="searchBarForm"){$(".messages").scrollTop(sel.anchorNode.parentElement.offsetTop)
self.addStopper();self.searchUp($("#searchBarInput").val(),document.getElementById('searchBarCaseCheck').checked,sel.anchorNode,sel.anchorOffset)}else{self.addStopper();self.searchUp($("#searchBarInput").val(),document.getElementById('searchBarCaseCheck').checked)}}})
sbInner.append(up);var down=$("<input id='searchBarDown' class='btn' type='button' value='&#x25BC'>").click(function(){var q=$("#searchBarInput").val()
if(q.length>0){var sel=window.getSelection();if(sel.type=="Range"&&sel.anchorNode.id!="searchBarForm"){var end=sel.getRangeAt(0).endOffset;$(".messages").scrollTop(sel.anchorNode.parentElement.offsetTop)
self.addStopper();self.searchDown($("#searchBarInput").val(),document.getElementById('searchBarCaseCheck').checked,sel.anchorNode,end)}else{self.addStopper();self.searchDown($("#searchBarInput").val(),document.getElementById('searchBarCaseCheck').checked)}}})
sbInner.append(down);var caseCheck=$("<input name='caseCheck' id='searchBarCaseCheck' class='btn' type='checkbox'>")
var caseLabel=$("<label for='caseCheck' id='searchBarCaseLabel' class='btn' type='checkbox'>Match Case</label>")
sbInner.append(caseCheck);caseCheck.after(caseLabel);var closeX=$("<div></div>").append($("<input id='searchBarClose' class='btn' type='button' value='Done'>").click(function(){self.stopSearch();$("#searchBar").remove();})).css("float","right")
sb.append(closeX);$(".messages-wrapper").after(sb)}
$("#searchBarInput").focus();}
this.stopSearch=function(){clearTimeout(self.cancelTO)
self.cancelFlag=true;setTimeout(function(){self.cancelFlag=false;},50)}
this.getName=function(){return"Search"};this.getDescription=function(){return"The return of [CTRL]+[F]! until at least discord devs decide to add it."};this.getVersion=function(){return"1.0"};this.getAuthor=function(){return"Megamit/Mitchell"};this.load=function(){};this.unload=function(){};this.init();}
searchPlugin.prototype.search=function(){searchPlugin.prototype.self.search.apply(searchPlugin.prototype.self,arguments);}
exports.searchPlugin=searchPlugin;