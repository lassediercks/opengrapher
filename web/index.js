window.addEventListener("load", function(event) {
  const widthInput = document.querySelector(".ogWidth");
  const heightInput = document.querySelector(".ogHeight");
  const resultLink = document.querySelector(".resultlink");
  const htmlInput = document.querySelector(".html");
  const cssInput = document.querySelector(".css");
  const htmlOutput = document.querySelector(".htmlresult");

  var iframe = document.querySelector(".result");
  var iframeDoc = iframe.contentWindow;
  let css = escape(localStorage.getItem("css"));
  let html = escape(localStorage.getItem("html"));
  let width = localStorage.getItem("width");
  let height = localStorage.getItem("height");

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

  //   Initiation

  var htmlEditor = CodeMirror.fromTextArea(htmlInput, {
    ...editorOptions,
    mode: "text/html"
  });

  localStorage.getItem("html")
    ? htmlEditor.getDoc().setValue(localStorage.getItem("html"))
    : "";

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

  var cssEditor = CodeMirror.fromTextArea(cssInput, {
    ...editorOptions,
    mode: "css"
  });

  localStorage.getItem("css")
    ? cssEditor.getDoc().setValue(localStorage.getItem("css"))
    : "";

  cssEditor.on("change", () => {
    cssEditor.save();
    iframeDoc.document.head.innerHTML = `<style>${cssInput.value}</style>`;
    localStorage.setItem("css", cssInput.value);
    css = escape(cssInput.value);
    return css;
  });

  widthInput.value = localStorage.getItem("width");
  iframe.style.width = `${widthInput.value}px`;
  heightInput.value = localStorage.getItem("height");
  iframe.style.height = `${heightInput.value}px`;

  htmlInput.value = localStorage.getItem("html");
  iframeDoc.document.body.innerHTML = htmlInput.value;

  cssInput.value = localStorage.getItem("css");
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