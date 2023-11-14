function loadCSS(filename) {
  var link = document.createElement("link");
  link.href = filename;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}
loadCSS("./style.css");
