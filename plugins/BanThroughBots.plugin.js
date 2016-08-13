//META{"name":"BanTroughBots"}*//

class BanTroughBots{
  constructor(){
    this.settings = {
      "Spectra":{ command:"%ban byid {id}", commandReason:"%ban byid {id} for {reason}"},
      "NadekoBot":{ command:".ban <@{id}>", commandReason:".ban <@{id}> {reason}"}
    }
  }
  isEmpty(s) {
    if( !s || (typeof s === "undefined") || (typeof s === null) || (s == "null") || (s == "undefined") || (s == "empty") || (s == "-1")){
      return true;
    }else{
      return false;
    }
  };
  getReactInstance(node){ return node[ Object.keys(node).find((key)=>key.startsWith("__reactInternalInstance"))] }
  getReactObject(node){ return ((inst) => (inst._currentElement._owner._instance) )(this.getReactInstance(node)) }
  showBanModal(bot, user){
      let modal= $(`<span><div class="callout-backdrop botbans" style="background-color:#000; opacity:0.85"></div><div class="modal" style="opacity: 1">
          <div class="modal-inner">
              <form class="form">
                  <div class="form-header">
                      <header>Ban <font color="red">`+user.username+`</font> through <font color="green">`+bot+`</font</header>
                  </div>
                  <div class="form-inner">
                      <div class="control-group">
                          <label for="tagtext">
                              Reason
                          </label>
                          <input type="text" id="banreason" name="reason" >
                      </div>
                  </div>
                  <div class="form-actions">
                      <button type="button" class="btn btn-default">Cancel</button>
                      <button type="submit" class="btn btn-primary">Ban</button>
                  </div>
              </form>
          </div>
      </div></span>`).on("submit","form",(e)=>{
        e.preventDefault();var reason = $('#banreason').val();
        if(!this.isEmpty(reason.trim())){
          var _msg = this.settings[bot].commandReason.replace('{name}', user.username);
          var _msg = this.settings[bot].commandReason.replace('{discriminator}', user.discriminator);
          var _msg = this.settings[bot].commandReason.replace('{id}', user.id);
          var _msg = this.settings[bot].commandReason.replace('{reason}', user.reason);
          this.sendTextMessage(_msg);
        }else{
          var _msg = this.settings[bot].command.replace('{name}', user.username);
          var _msg = this.settings[bot].command.replace('{discriminator}', user.discriminator);
          var _msg = this.settings[bot].command.replace('{id}', user.id);
          this.sendTextMessage(_msg);
        }
        modal.remove();
      })
      .appendTo("#app-mount>:first-child")
      .on("click",".callout-backdrop,button.btn-default",(e)=>{modal.remove()})
      modal.find("#banreason").click().focus();
  }
  sendTextMessage(text){
  	var fd = new FormData();
  	fd.append('content',text);
  	$.ajax({
  	  type: "POST",
  	  url: "https://discordapp.com/api/channels/" + window.location.pathname.split('/').pop() + "/messages",
  	  headers: {
  		  "authorization": localStorage.token.slice(1, -1)
  	  },
  	  data: fd,
  	  processData: false,
  	  contentType: false
  	});
  };
  log(){
  //console.log("%c["+this.getName()+"]", 'font-weight: bold;color: green;' ,...arguments)
  }
  stop(){
		$('.botban').remove();
	}
  start(){
    this.loadDatabase();
    $(window)
    .on('keydown.renamer', (e)=> ((e.which==123) && eval('debugger')||true) );
    let contextmo = new MutationObserver( (changes,_) => {
      changes.forEach(
        (change,i) => {
          if(change.addedNodes)[...change.addedNodes].forEach((node)=>{
            if (node.nodeType==1&&node.className.includes("context-menu") ) this.onContextMenu( node )
          })
        }
      )
    } ),
      processmo = new MutationObserver( (changes,_) => {})
    this.waitForElement( "#app-mount>:first-child", (elem) => contextmo.observe( elem[0], {childList: true} ) )
    this.waitForElement( ".chat", (elem)=>processmo.observe( elem[0] , {childList:true, subtree: true} ))
    this.waitForElement( ".channel-members", (elem) => processmo.observe( elem[0] , {childList:true, subtree: true} ) )
    this.waitForElement(".channel-voice-states",(elem)=>processmo.observe( elem[0] , {childList:true, subtree: true} ))
		this.loadDatabase()

  }
  saveDatabase() {
  	window.localStorage.BotBans = btoa(JSON.stringify(this.settings));
  };

  loadDatabase() {
  	if (window.localStorage.hasOwnProperty('BotBans')) {
  		var data = window.localStorage.BotBans;
  		this.settings = JSON.parse(atob(data));
  	}
  };

  onContextMenu( context ){
    let inst = this.getReactInstance( context )
    if (!inst) return;
	this.log(inst._currentElement._owner._instance.props.type)
    switch (inst._currentElement._owner._instance.props.type) {
      case "USER_CHANNEL_MESSAGE":
      case "USER_CHANNEL_MEMBERS":
      case "USER_CHANNEL_MENTION":
      case "USER_PRIVATE_CHANNELS":
	  case "USER_PRIVATE_CHANNELS_MESSAGE":
        let { id, username, discriminator } = inst._currentElement._owner._instance.props.user;
        this.log(inst._currentElement._owner._instance.props.user)
        let data = { id, username, discriminator }
        $(context).append('<div class="item-group botbans" />');
        for (var key in this.settings) {
          if (!this.settings.hasOwnProperty(key)) continue;
          data["use"] = key;
          $(context).find('.botbans').append(`<div id="`+key+`" class="item">
                        			<span id="`+key+`">Ban with `+key+`</span>
                        			<div id="`+key+`" class="hint"></div>
                            </div>`)
            .on("click.botbans","#"+key,data,this.onContextMenuClick.bind(this))
        }
        //$(context).append('</div>');
    }

    this.log(this.getReactObject( context).props.type)
  }

// BOT SPECIFIC
  onContextMenuClick(e){
    $(e.delegateTarget).hide()
    this.showBanModal(e.target.id, e.data)
  }
// BOT SPECIFIC
  waitForElement(css,callback){
    let obj = $(css),
    timer;
    if(obj.length){
      this.log("Element Present")
      callback(obj)
    }
    else {
      timer = setInterval(()=>{
        obj = $(css);
        if(obj.length){ this.log("Element Attached"); clearInterval(timer); callback(obj);  }
      },100)
    }
  }
  getSettingsPanel() {
  	var self = this;
  	var settings = $('<div class="form"></div>');
  	settings.append('<h1 style="font-weight: bold">Bots:</h1>');

  	var rowHtml = "";
  	rowHtml += '<div class="control-group BanThroughBot-inputgroup">';
  	rowHtml += '	<input style="width: 15%;" type="text" name="name" placeholder="Name">';
  	rowHtml += '	<input style="width: 35%;" type="text" name="data" placeholder="Command">';
  	rowHtml += '	<input style="width: 35%;" type="text" name="dataReason" placeholder="Command with Reason">';
  	rowHtml += '</div><br>';

  	for (var key in this.settings) {
  		if (!this.settings.hasOwnProperty(key)) continue;
  		var row = $(rowHtml);
  		row.find('input[name="name"]').val(key);
  		row.find('input[name="data"]').val(this.settings[key].command);
  		row.find('input[name="dataReason"]').val(this.settings[key].commandReason);
  		settings.append(row);
  	}
  	settings.append(rowHtml);
  	var addButton = $('<button type="button" class="btn btn-primary">Add Row</div>')
  		.click(function() {
  			$(this).before(rowHtml);
  		});
  	var saveButton = $('<button type="button" class="btn btn-primary">Save</div>')
  		.click(function() {
  			this.settings = {};
  			settings.find('.BanThroughBot-inputgroup').each(function(i, el) {
  				var $e = $(el);
  				var key = $e.find('input[name="name"]').val();
  				var data = $e.find('input[name="data"]').val();
  				if (key.trim() === "" || data.trim() === "") return;
  				self.settings[key] = data;
  			});
  			self.saveDatabase();
  			var $b = $(this).text('Saved!');
  			setTimeout(function() {$b.text('Save');}, 1000);
  		});

  	settings.append(addButton);
  	settings.append(saveButton);
  	return settings;
  };
	getName(){return "Ban through bots"};
	getDescription(){return "Adds items to the contextmenu to ban through bots faster."};
	getVersion(){return "0.9 beta"};
	getAuthor(){return "Megamit/Mitchell, Bluscream"};

  //legacy
	load(){};
	unload(){};
}
