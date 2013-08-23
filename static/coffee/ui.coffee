# ui.coffee

$ ->
  html2canvas document.body,
    onrendered: (canvas) ->
      console.log canvas.toDataURL()
