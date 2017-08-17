//META{"name":"fullSizeLightbox"}*//

var fullSizeLightbox = function () {};

fullSizeLightbox.prototype.onMessage = function () {};
fullSizeLightbox.prototype.onSwitch = function () {};
fullSizeLightbox.prototype.start = function () {};

fullSizeLightbox.prototype.observer = (e) => {
    if(!e.target.classList.contains("modal-image") || e.target.classList.contains("fslb")) return;
    let $target = $(e.target);
    $target.addClass("fslb");
    let imgSource = $target.find("img").attr("src");
    if(imgSource === undefined) return;
    $(".modal-inner").css({ "height": "100%" });
    $target.css({ "height": "100%" });
    imgSource = imgSource.split('?')[0];
    $target.prepend($("<div/>", {
        class: "scroller-wrap",
        css: {
            "height": "100%"
        }
    }).append($("<div/>", {
        class: "scroller"
    }).append($("<img/>", {
        src: imgSource
    }))));
    
    $(".modal-image > img").remove();
};

fullSizeLightbox.prototype.load = function () {};
fullSizeLightbox.prototype.unload = function () {};
fullSizeLightbox.prototype.stop = function () {};
fullSizeLightbox.prototype.getSettingsPanel = function () { return ""; };

fullSizeLightbox.prototype.getName = function () {
    return "Full Size Lightbox";
};
fullSizeLightbox.prototype.getDescription = function () {
    return "Show full sized images in image popup";
};
fullSizeLightbox.prototype.getVersion = function () {
    return "0.1.0";
};
fullSizeLightbox.prototype.getAuthor = function () {
    return "Jiiks";
};