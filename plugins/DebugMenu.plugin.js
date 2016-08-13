//META{"name":"DebugMenu"}*//


class DebugMenu{
	getName(){return "Electron Debug Menu"};
	getDescription(){return "Adds items to the contextmenu to debug."};
	getVersion(){return "1.0"};
	getAuthor(){return "Megamit/Mitchell, Bluscream"};
  constructor(){
		this.contextMarkup =
		`<div class="item-group debug">
		  <div class="item inspect-item">
  			<span>Inspect element</span>
  			<div class="hint"></div>
      </div>
		</div>`;
  }
  start(){
    BetterAPI.npm("debug-menu", process.env.APPDATA + '/BetterDiscord/', function(){
      const debugMenu = require(process.env.APPDATA + '/BetterDiscord/node_modules/debug-menu');
      console.log(debugMenu);
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
      this.contextExtention = $(this.contextMarkup)
    });
  }
  stop(){
    //debugMenu.uninstall();
  }
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
        $(context).append(this.contextExtention)
          .on("click.botban",".spectra-item",data,this.onContextSpectra.bind(this))
          .on("click.botban",".boobot-item",data,this.onContextBoobot.bind(this))
        break;
    }

    this.log(this.getReactObject( context).props.type)
  }
  onContextSpectra(e){
    $(e.delegateTarget).hide()
    //debugMenu.
  }
  //legacy
	load(){};
	unload(){};
}
