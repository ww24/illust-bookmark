$(function() {
  return html2canvas(document.body, {
    onrendered: function(canvas) {
      return console.log(canvas.toDataURL());
    }
  });
});

/*
//@ sourceMappingURL=ui.js.map
*/