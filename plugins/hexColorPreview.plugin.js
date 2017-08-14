META{"name":"hexColorPreview"}*//
class hexColorPreview{constructor(){this.whatever="whatever";}
wrapAll(){let regHex=new RegExp(/#(?:[0-9a-fA-F]{3}){1,2}\b/,'g');$(".comment .markup").each(function(){if($(this).find(".hex-value").length)return;if($(this).text().match(regHex)!==null){$(this).html(function(_,html){return html.replace(regHex,'<div class="hex-value" style="color: $&;">$&<div class="hex-preview" style="background: $&;"></div></div>');});}});}
cleanUp(){$(".hex-value").each(function(){$(this).replaceWith(function(){return $(this).text();});});}
updateStyle(){let self=this;let css=`
      .hex-value {
        position: relative;
        display: inline-block;
        font-weight: bold;
      }

      .hex-value .hex-preview {
        visibility: hidden;
        height: ${self.size}px;
        width: ${self.size}px;
        border-radius: 5px;

        position: absolute;
        z-index: 1;
        top: -10px;
        left: 105%;

        opacity: 0;
        transition: opacity 0.5s;
      }

      .hex-value:hover .hex-preview {
        visibility: visible;
        opacity: 1;
      }
    `;if($("#hexPreview-stylesheet").length){$("#hexPreview-stylesheet").html(css);}else{BdApi.injectCSS("hexPreview-stylesheet",css);}}
updateSettings(save){let input=$("#hexPreview-size").val();if(isNaN(input)){$("#hexPreview-size").val(this.size);}else{this.size=input;this.updateStyle();if(save===true){bdPluginStorage.set("hexColorPreview","size",this.size);}}}
start(){this.wrapAll();}
stop(){this.cleanUp();}
load(){this.size=bdPluginStorage.get("hexColorPreview","size");if(this.size===null)this.size="25";this.updateStyle();}
unload(){this.cleanUp();}
getTimeout(){return this.timeout;}
onMessage(){if(this.timeout)return;this.wrapAll();this.timeout=true;let self=this;setTimeout(function(){self.timeout=false;},200);}
onSwitch(){this.wrapAll();}
getSettingsPanel(){return`
    <div style="background: black;color: white;">
      <label>
        <span>Preview Size (px)</span>
        <input id="hexPreview-size" type="number" value="25" />
      </label>
      <br/>
      <button onclick="hexColorPreview.prototype.updateSettings()">Update</button> <button onclick="hexColorPreview.prototype.updateSettings(true)">Save & Update</button>
    </div>
    `;}
getName(){return"Hex Color Preview";}
getDescription(){return"Hover over hex colors to get a popup preview of that color.";}
getVersion(){return"0.0.3";}
getAuthor(){return"kaloncpu57";}}