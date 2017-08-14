//META{"name":"greentext"}*//

class greentext {
  constructor() {
    this.css = `
      .markup > .greentext {
        color: #789922;
      }
    `;

    this.htmlEncode = (s) => {
      return $("<div>").text(s).html();
    };

    this.main = (elem) => {
      if ($(elem).children(".greentext").length > 0) return;
      var self = this;
      var lines = $(elem).text().split("\n");
      lines.forEach((i) => {
        i = self.htmlEncode(i);
        if (i.substr(0, 4) == "&gt;") {
          $(elem).html(function (_, html) {
            return html.replace(i, '<span class="greentext">' + i + '</span>');
          });
        }
      });
    };

    this.allGreen = () => {
      var self = this;
      $(".markup").each(function () {
        self.main(this);
      });
    };

    this.noGreen = () => {
      $(".greentext").replaceWith(function () {
        return $(this).text();
      });
    }
  }

  start() {
    this.allGreen();
  }

  stop() {
    this.noGreen();
  }

  load() {
    BdApi.injectCSS("greentext-stylesheet", this.css);
  }

  unload() {
    this.noGreen();
  }

  onMessage() {
    this.allGreen();
  }

  onSwitch() {
    this.allGreen();
  }

  getName        () { return "greentext plugin"; }
  getDescription () { return "Make lines that start with \">\" into greentext"; }
  getVersion     () { return "0.1.0"; }
  getAuthor      () { return "kaloncpu57"; }
}
