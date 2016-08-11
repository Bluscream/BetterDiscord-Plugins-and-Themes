//META{"name":"detTube"}*//
function onYouTubeIframeAPIReady(){
	console.log("Youtube API Ready");
}
function detTube() {
	//construction
	var self = this;
	var setupComplete = false;
	var utubeURL = "https://www.youtube.com/";
	var utubeApi = "https://www.youtube.com/iframe_api";
	var currentVideo = ""
	this.log = function(){
		//var args = Array.prototype.slice.call(arguments);
		//args.unshift("%c["+self.getName()+"]", 'font-weight: bold;color: green;');
		//console.log.apply(console,args);
	}
	this.init = function(){
		self.css = "<style class='detTubePlugin'>"+
		".detTubeWindow{"+
			"float:right; z-index:2; background-color: #2e3136; position:absolute; bottom:0; right:0; color:#FFF; padding: 4px; border-radius: 4px;"+
		'}'+
		".detTubeInner{position:relative;}"+
		'.buttonClose{'+
			'background: transparent url(https://discordapp.com/assets/14f734d6803726c94b970c3ed80c0864.svg); background-size: cover; transition: opacity .1s easeout; opacity: .5; width:12px; height: 12px; padding: 0'+
		'}'+
		'.buttonClose:hover{opacity:1;}'+
		'.detTubeWrapper{'+
			'height:0; width:auto;position:relative;'+
		'}'+		
		'.detTubeWrapper .btn{cursor: pointer;}'+
		'.detTubeWindow>*+*{'+
			'margin-left:5px;'+ 
		'}'+
		'.detTubeInner>.buttonClose{'+
			'position:absolute; right:0; top:0;'+
		'}'+
		'.detTubeInner>.buttonClose:last-child{display:none;}'+
		'.detTubeWindow .embed{border-left:none; padding:0; margin:0;}'+
		'.detTubeWindow div:not([class]):nth-child(1), .detTubeWindow div:not([class]):nth-child(2){display: inline-block;}'+
		'.detTubeWindow .embed-provider{color: #FFF;display: inline-block;background-color: #E55;border: solid #E55;border-radius: 4px;}'+
		'.detTubeWindow .embed-author{font-size: 12px;border: solid #EEE;display: inline-block;background-color: #EEE;border-radius: 4px;}'+
		'.embed .embed-video-actions .embed-video-play.detTubeButton{background-image:url(https://i.imgur.com/6pQAhEZ.png);}'+
		'.embed .embed-video-actions.detTubeFloatingWrapper{position: absolute; top:0; left:100%; bottom:initial; right:initial;opacity:.6;}'+
		'.embed .embed-video-actions.detTubeFloatingWrapper .embed-video-actions-inner{padding:8px;}'+
		'.embed .embed-video-actions.detTubeFloatingWrapper:hover{opacity:1;}'+
		'.detTubeFloatingWrapper .detTubeButton{background:none;background-image:url(https://i.imgur.com/6pQAhEZ.png); width:19px; height:19px;background-size:19px 19px;}'+
		'.detTubeWindow .detTubeFloatingWrapper {display:none;}'+
		'.detTube-dragging iframe{pointer-events:none;}'+
		'.detTube-disableSelection{user-select:none;-moz-user-select: none;-webkit-user-select: none;}'+
		'</style>';
		self.markup = "<div class='detTubeWrapper'><div class='detTubeWindow'><div class='detTubeInner'><button id='detTubeClose' class='btn buttonClose' type='button'></button></div></div></div>"
		self.button = "<button class='detTubeButton embed-video-play' type='button' style='background-image:url(https://i.imgur.com/6pQAhEZ.png);'></button>"
	};
	self.process = function(){
		if(!setupComplete){self.setup()}
		$(".embed-video-popout[href^='https://www.youtube.com/']:not([data-dettube-scanned])").before(self.button)
		.each(function(i,el){
			el.setAttribute("data-dettube-scanned",true)
		})
		.closest(".embed")
		.each(function(i,el){
			self.observer.observe(el,{childList: true})
		})		
	};
	self.deactivateAutoplay = function(){
		frame = $(".detTube_detached iframe")
		if (frame.length){
			frame.attr("src",frame.attr("src").replace("&autoplay=1&auto_play=1","&autoplay=0&auto_play=0"))
		}
	}
	self.setStartTime = function(frame,time){
		var src = frame.src.replace(/&start=(\d+)/,"");
		frame.src= src+"&start="+time;
	}
	self.enableJSControl = function(iframe){
		if (iframe.src.indexOf("enablejsapi")==-1){
			iframe.src += "&enablejsapi=1";
		}
	}
	
	self.detachVideo= function(vid){
		currentVideo = vid.find(".embed-title").attr("href")
		//if .embed contains an iframe a vid has been expanded
		var subframe = vid.find("iframe")

		if (subframe.length){
			vid.data("move",true);
			var p = new YT.Player(subframe[0],{
				events:{
					onReady:function(e){
						self.log("READY!")
						if(vid.data("move")){
							vid.data("move",false)
							var time = Math.floor(e.target.getCurrentTime());
							self.log("Time is "+time)
							//e.target.destroy();
							self.setStartTime(subframe[0],time);
							vid.before("<div class='detTube_placeholder'></div>").detach().appendTo(".detTubeInner").addClass("detTube_detached");
						}
						
					}
				}
			});
			subframe[0].src+=""
		}else{
			//no iframe
			vid.before("<div class='detTube_placeholder'></div>").detach().appendTo(".detTubeInner").addClass("detTube_detached");
		}
		
	};
	self.reattachVideo = function(){
		var old = $(".detTube_placeholder");
		self.log("placeholders: "+old.length)
		self.log("detached: "+$(".detTube_detached").length)
		if(old.length){
			self.deactivateAutoplay();
			old.before($(".detTube_detached").removeClass("detTube_detached").detach()).remove();
		}else{
			$(".detTube_detached").remove();
		}
	}
	self.moveWindowListener = function(e){
		self.log("mousemove")
		var elem = $('.detTubeWindow')[0];
		var pos = elem.parentElement.getBoundingClientRect();
		if(elem.style.right == ''){
			elem.style.right = '0px';
			elem.style.bottom = '0px';
		}
		elem.style.right = Math.max(parseInt(elem.style.right)-e.movementX,pos.right-window.innerWidth)+'px';
		elem.style.bottom = Math.max(parseInt(elem.style.bottom)-e.movementY,pos.bottom-window.innerHeight)+'px';
	};    

	self.setup = function(){
		if (!$(".content > .flex-spacer.flex-vertical").length) return;
		self.log("setup")
		$("head").append(self.css);
		self.window = $(self.markup);
		
		$(".content > .flex-spacer.flex-vertical").append(self.window);
		self.window.find("#detTubeClose").click(self.reattachVideo);
		setupComplete = true;
		var that = $(".detTubeWrapper").on("mousedown.detTube",function(){
			self.log("mousedown")
			that.addClass("detTube-dragging");
			$(".app").addClass(".detTube-disableSelection");
			window.addEventListener('mousemove', self.moveWindowListener, false);
		})
		$(window).on("mouseup.detTube",function(){
			$(".detTubeWrapper").removeClass("detTube-dragging")
			self.log("mouseup")
			$(".app").removeClass(".detTube-disableSelection");
			window.removeEventListener('mousemove', self.moveWindowListener);
		}) 
	}
	self.onSwitch = self.process;
	self.onMessage = self.process;
	self.stop = function(){
		
	};
	self.start = function(){
		var tubeAPI = document.createElement('script');
		tubeAPI.src = utubeApi;
		document.body.appendChild(tubeAPI);
		$(".content").append(self.window)
		$(".app").on("click",".detTubeButton",function(){
						self.reattachVideo();
						self.detachVideo($(this).closest(".embed"))
		})
		/*
		========================================
		|Mutation Observer for IFrame Insertion|
		========================================
		*/
		self.observer = new MutationObserver(function(mutations) {
			var embed = mutations.target;
		  mutations.forEach(function(mutation) {
			self.log(mutation);
			for(i=0;i<mutation.addedNodes.length;i++){
				var node = mutation.addedNodes[i];
				//check if it contains a youtube iframe
				if (node.firstChild.nodeName == "IFRAME" && node.firstChild.src.startsWith(utubeURL)){
					self.enableJSControl(node.firstChild)
					$("<button class='detTubeButton'></button>")
					.appendTo(node)
					.wrap("<div class='embed-video-actions detTubeFloatingWrapper'> <div class='embed-video-actions-inner'></div></div>")
				}
			}
		});
		//Mutation Observer End/////////////////
		
		self.process();
});
	};
	self.getName = function(){return "detTube"};
	self.getDescription = function(){return "Detatch youtube to make it moveable"};
	self.getVersion = function(){return "1.1"};
	self.getAuthor = function(){return "Megamit/Mitchell"};
	self.load = function(){};
	self.unload = function(){};
	this.init();
}
