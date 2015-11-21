var codeformat, galleryInit;

galleryInit = function() {
  return setTimeout((function() {
    return $("[data-rel=\"colorbox\"]").colorbox({
      reposition: true,
      scalePhotos: true,
      scrolling: false,
      previous: "<i class=\"fa fa-arrow-left\"></i>",
      next: "<i class=\"fa fa-arrow-right\"></i>",
      close: "&times;",
      current: "{current} of {total}",
      maxWidth: "100%",
      maxHeight: "100%",
      onOpen: function() {
        return document.body.style.overflow = "hidden";
      },
      onClosed: function() {
        return document.body.style.overflow = "auto";
      },
      onComplete: function() {
        return $.colorbox.resize();
      }
    });
  }), 1000);
};

codeformat = function() {
  return jQuery(function() {});
};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elt) {
    var from, len;
    len = this.length >>> 0;
    from = Number(arguments_[1]) || 0;
    from = (from < 0 ? Math.ceil(from) : Math.floor(from));
    if (from < 0) {
      from += len;
    }
    while (from < len) {
      if (from in this && this[from] === elt) {
        return from;
      }
      from++;
    }
    return -1;
  };
}
