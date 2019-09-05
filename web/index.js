window.addEventListener("load", function(event) {
  const widthInput = document.querySelector(".ogWidth");
  const heightInput = document.querySelector(".ogHeight");
  const resultLink = document.querySelector(".resultlink");
  const htmlInput = document.querySelector(".html");
  const cssInput = document.querySelector(".css");
  const htmlOutput = document.querySelector(".htmlresult");

  var iframe = document.querySelector(".result");
  var iframeDoc = iframe.contentWindow;
  let css = escape(
    localStorage.getItem("css") || "body{background: peachpuff;}"
  );
  let html = escape(localStorage.getItem("html") || "<h1>Hi there!</h1>");
  let width = localStorage.getItem("width") || 500;
  let height = localStorage.getItem("height") || 500;

  myStorage = localStorage;

  // Editor
  const editorOptions = {
    lineNumbers: true,
    extraKeys: {
      Tab: "emmetExpandAbbreviation",
      Enter: "emmetInsertLineBreak"
    },
    smartIndent: true,
    theme: "icecoder",
    lineWrapping: true
  };

  var htmlEditor = CodeMirror.fromTextArea(htmlInput, {
    ...editorOptions
  });

  htmlEditor
    .getDoc()
    .setValue(localStorage.getItem("html") || "<h1>Hi there!</h1>");

  var cssEditor = CodeMirror.fromTextArea(cssInput, {
    ...editorOptions,
    mode: "css"
  });

  cssEditor
    .getDoc()
    .setValue(localStorage.getItem("css") || "body{background: peachpuff;}");

  //   Initiation

  iframeDoc.document.body.innerHTML =
    localStorage.getItem("html") || "<h1>Hi there!</h1>";

  function updateLink() {
    let generatepath = "/generate/";
    let root = "https://csstoimg.herokuapp.com/result.html";
    let addition = `?html=${html}&css=${css}&width=${width}&height=${height}`;
    resultLink.href = `${generatepath}${encodeURIComponent(root)}${addition}`;
  }

  htmlEditor.on("change", () => {
    htmlEditor.save();
    iframeDoc.document.body.innerHTML = htmlInput.value;
    localStorage.setItem("html", htmlInput.value);
    html = escape(htmlInput.value);
    return html;
  });

  localStorage.getItem("css")
    ? cssEditor.getDoc().setValue(localStorage.getItem("css"))
    : "body{background: peachpuff;}";

  cssEditor.on("change", () => {
    cssEditor.save();
    iframeDoc.document.head.innerHTML = `<style>${cssInput.value}</style>`;
    localStorage.setItem("css", cssInput.value);
    css = escape(cssInput.value);
    return css;
  });

  widthInput.value = localStorage.getItem("width") || width;
  iframe.style.width = `${widthInput.value}px` || width;
  heightInput.value = localStorage.getItem("height") || height;
  iframe.style.height = `${heightInput.value}px` || height;

  cssInput.value =
    localStorage.getItem("css") || `body{background: peachpuff;}`;
  iframeDoc.document.head.innerHTML = `<style>${cssInput.value}</style>`;

  widthInput.addEventListener("input", () => {
    iframe.style.width = `${widthInput.value}px`;
    localStorage.setItem("width", widthInput.value);
    width = widthInput.value;
  });

  heightInput.addEventListener("input", () => {
    iframe.style.height = `${heightInput.value}px`;
    localStorage.setItem("height", heightInput.value);
    height = heightInput.value;
  });

  resultLink.addEventListener("mouseover", () => {
    updateLink();
  });
});
