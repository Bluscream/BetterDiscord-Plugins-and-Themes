//META{"name":"matrixWall"}*//

function matrixWall() {}
matrixWall.interval = 0;
matrixWall.prototype.load = function() {
		localStorage.matrixWall = localStorage.matrixWall||"1";
};

matrixWall.prototype.unload = function() {
	//Called when plugin is unloaded
};

matrixWall.prototype.start = function() {
	$(document.body).append("<canvas id='c'></canvas>")
	if (localStorage.matrixWall=="1") matrixWall.style1()
		else matrixWall.style2()
	
};

matrixWall.style1 = function() {
	(function(){
		var canvas = document.getElementById("c");
		var context = c.getContext( '2d' );
		context.globalCompositeOperation = 'lighter';
		canvas.width = 1280;
		canvas.height = 800;
		draw();

		var textStrip = ['诶', '比', '西', '迪', '伊', '吉', '艾', '杰', '开', '哦', '屁', '提', '维'];

		var stripCount = 60, stripX = new Array(), stripY = new Array(), dY = new Array(), stripFontSize = new Array();

		for (var i = 0; i < stripCount; i++) {
			stripX[i] = Math.floor(Math.random()*1265);
			stripY[i] = -100;
			dY[i] = Math.floor(Math.random()*7)+3;
			stripFontSize[i] = Math.floor(Math.random()*16)+8;
		}

		var theColors = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'];

		var elem, context, timer;

		function drawStrip(x, y) {
			for (var k = 0; k <= 20; k++) {
				var randChar = textStrip[Math.floor(Math.random()*textStrip.length)];
				if (context.fillText) {
					switch (k) {
					case 0:
						context.fillStyle = theColors[0]; break;
					case 1:
						context.fillStyle = theColors[1]; break;
					case 3:
						context.fillStyle = theColors[2]; break;
					case 7:
						context.fillStyle = theColors[3]; break;
					case 13:
						context.fillStyle = theColors[4]; break;
					case 17:
						context.fillStyle = theColors[5]; break;
					}
					context.fillText(randChar, x, y);
				}
				y -= stripFontSize[k];
			}
		}

		function draw() {
			// clear the canvas and set the properties
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.shadowOffsetX = context.shadowOffsetY = 0;
			context.shadowBlur = 8;
			context.shadowColor = '#94f475';
			
			for (var j = 0; j < stripCount; j++) {
				context.font = stripFontSize[j]+'px MatrixCode';
				context.textBaseline = 'top';
				context.textAlign = 'center';
				
				if (stripY[j] > 1358) {
					stripX[j] = Math.floor(Math.random()*canvas.width);
					stripY[j] = -100;
					dY[j] = Math.floor(Math.random()*7)+3;
					stripFontSize[j] = Math.floor(Math.random()*16)+8;
					drawStrip(stripX[j], stripY[j]);
				} else drawStrip(stripX[j], stripY[j]);
				
				stripY[j] += dY[j];
			}
		 
		}
	 matrixWall.interval = setInterval(draw, 70);
	})()
};
//stolen from http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
matrixWall.style2 = function(){
	var c = document.getElementById("c");
	var ctx = c.getContext("2d");

	//making the canvas full screen
	c.height = window.innerHeight;
	c.width = window.innerWidth;

	//chinese characters - taken from the unicode charset
	var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
	//converting the string into an array of single characters
	chinese = chinese.split("");

	var font_size = 10;
	var columns = c.width/font_size; //number of columns for the rain
	//an array of drops - one per column
	var drops = [];
	//x below is the x coordinate
	//1 = y co-ordinate of the drop(same for every drop initially)
	for(var x = 0; x < columns; x++)
		drops[x] = 1; 

	//drawing the characters
	function draw()
	{
		//Black BG for the canvas
		//translucent BG to show trail
		ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
		ctx.fillRect(0, 0, c.width, c.height);
		
		ctx.fillStyle = "#0F0"; //green text
		ctx.font = font_size + "px arial";
		//looping over drops
		for(var i = 0; i < drops.length; i++)
		{
			//a random chinese character to print
			var text = chinese[Math.floor(Math.random()*chinese.length)];
			//x = i*font_size, y = value of drops[i]*font_size
			ctx.fillText(text, i*font_size, drops[i]*font_size);
			
			//sending the drop back to the top randomly after it has crossed the screen
			//adding a randomness to the reset to make the drops scattered on the Y axis
			if(drops[i]*font_size > c.height && Math.random() > 0.975)
				drops[i] = 0;
			
			//incrementing Y coordinate
			drops[i]++;
		}
	}

	matrixWall.interval  = setInterval(draw, 33);
}

matrixWall.prototype.stop = function() {
	clearInterval(matrixWall.interval );
	$("#c").remove();
};

matrixWall.prototype.getName = function() {
    return "Matrix Wallpaper";
};

matrixWall.prototype.getDescription = function() {
    return "Gives body matrix code rain effect. Stolen from https://codepen.io/hendo13/pen/bLzAi and http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript";
};

matrixWall.prototype.getVersion = function() {
    return "1.0";
};

matrixWall.prototype.getAuthor = function() {
    return "Megamit/Mitchell";
};

matrixWall.prototype.getSettingsPanel = function() {
	return 	'<form class="form" style = "width:auto;">'+
					'<div class="control-group">'+
					'<label> Style </label>'+
					'<ul class="radio-group">'+
					'<li>'+
						'<div class="radio" onclick="this.getElementsByTagName(\'input\')[0].checked = matrixWall.setStyle(\'1\' );">'+
						'<div class="radio-inner">'+
							'<input name="style" type="radio" value="1" '+(localStorage.matrixWall=='1'?"checked":"")+'>'+
							'<span></span>'+
						'</div>'+
						'<span> Mode 1 </span'+
						'</div>'+
					'</li>'+
					'<li>'+
						'<div class="radio" onclick="this.getElementsByTagName(\'input\')[0].checked = matrixWall.setStyle(\'2\' );">'+
						'<div class="radio-inner">'+
							'<input name="style" type="radio" value="2" '+(localStorage.matrixWall=='2'?"checked":"")+'>'+
							'<span></span>'+
						'</div>'+
						'<span> Mode 2 </span>'+
						'</div>'+
					'</li>'+
					'</ul>'+
					'</div>'+
					'</form>';
};

matrixWall.setStyle = function(style){
	var hasChanged = localStorage.matrixWall!=style;
	localStorage.matrixWall=style;
	if(hasChanged){
		clearInterval(matrixWall.interval )
		if (style=="1") matrixWall.style1()
		else matrixWall.style2()
	}
	return true;
}

