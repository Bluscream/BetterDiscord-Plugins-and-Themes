//META{"name":"TabCompletion"}*//

function TabCompletion() {}

TabCompletion.prototype.load = function() {
    //Called when plugin is loaded
};

TabCompletion.prototype.unload = function() {
    //Called when plugin is unloaded
};

TabCompletion.prototype.start = function() {
    this.attachHandler();
};

TabCompletion.prototype.onSwitch = function() {
    this.attachHandler();
};

TabCompletion.prototype.stop = function() {
    var el = $('.channel-textarea textarea');
    if (el.length == 0) return;

    el.unbind("click focus", this.focusHandler);
    el[0].removeEventListener("keydown", this.handleKeypress);
    $('#jqueryCaretPlugin').remove()
};

TabCompletion.prototype.getName = function() {
    return "Tab Completion";
};

TabCompletion.prototype.getDescription = function() {
    return "Adds tabcompletion for favorited emotes";
};

TabCompletion.prototype.getVersion = function() {
    return "1.2";
};

TabCompletion.prototype.getAuthor = function() {
    return "EhsanKia";
};

TabCompletion.prototype.attachHandler = function() {
    var el = $('.channel-textarea textarea');
    if (el.length == 0) return;

    var s = document.createElement("script");
    s.id = "jqueryCaretPlugin"
    s.type = "text/javascript";
    s.src = "//raw.githubusercontent.com/acdvorak/jquery.caret/master/src/jquery.caret.js";
    $("head").append(s);

    var self = this;
    this.tabtries = -1;
    this.textsplit = ["", "", ""];

    this.focusHandler = function() {
        self.tabtries = -1;
    }

    this.handleKeypress = function(e) {
        var code = e.keyCode || e.which;
        if (code == 9) { // tab pressed
            e.preventDefault();

            // if this is the first time tab is pressed here, we split the text before and after the word
            if (self.tabtries == -1) {
                $this = $(this);
                var caretpos = $this.caret();
                textfunction = function(v) {
                    return (arguments.length ? $this.val(v) : $this.val());
                };


                var text = textfunction();
                var start = (/\w+$/.exec(text.substr(0, caretpos)) || {
                    index: caretpos
                }).index;
                var end = caretpos + (/^\w+/.exec(text.substr(caretpos)) || [""])[0].length;
                self.textsplit = [text.substring(0, start), text.substring(start, end), text.substring(end + 1)];
            }

            if (self.textsplit[1] === "") return;

            // calculate the collection of strings actually eligible for suggestion, either by filtering or by executing the function specified
            var collection = Object.keys(favoriteEmotes);
            collection = collection.filter(function(v) {
                return v.toLowerCase().indexOf(self.textsplit[1].toLowerCase()) == 0;
            });

            // collection now (hopefully) is a list of values
            if (collection.length > 0) {
                // shift key iterates backwards
                self.tabtries += e.shiftKey ? -1 : 1;
                if (self.tabtries >= collection.length) self.tabtries = 0;
                if (self.tabtries < 0) self.tabtries = collection.length + self.tabtries;
                textfunction(self.textsplit[0] + collection[self.tabtries] + self.textsplit[2]);
                $(self).caret(self.textsplit[0].length + collection[self.tabtries].length);
            }
        } else if (code == 27 && self.tabtries >= 0) { // escape
            textfunction(self.textsplit[0] + self.textsplit[1] + self.textsplit[2]);
        } else if (code != 16) { // not shift
            self.tabtries = -1;
        }
    };

    el.bind("click focus", this.focusHandler);
    el[0].addEventListener("keydown", this.handleKeypress, false);
}