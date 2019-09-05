window.addEventListener("load", function(event) {
  const widthInput = document.querySelector(".ogWidth");
  const heightInput = document.querySelector(".ogHeight");
  const resultLink = document.querySelector(".resultlink");
  const htmlInput = document.querySelector(".html");
  const cssInput = document.querySelector(".css");
  const iframe = document.querySelector(".result");
  const iframeDoc = iframe.contentWindow;
  const THROTTLE_AMOUNT = 5000;
  // Default Values

  const htmlDefault = "<h1>Hi there!</h1>";
  const cssDefault = `body{
    background: peachpuff;
  }`;
  const resultUrl = "http://localhost:5000/result.html";

  let css = localStorage.getItem("css") || cssDefault;
  let html = localStorage.getItem("html") || htmlDefault;
  let width = localStorage.getItem("width") || 500;
  let height = localStorage.getItem("height") || 500;

  PixelateMeStorage = localStorage;

  // Editor
  const editorOptions = {
    lineNumbers: true,
    extraKeys: {
      Tab: "emmetExpandAbbreviation",
      Enter: "emmetInsertLineBreak"
    },
    smartIndent: true,
    theme: "material",
    lineWrapping: true
  };

  var htmlEditor = CodeMirror.fromTextArea(htmlInput, {
    mode: "htmlmixed",
    ...editorOptions
  });

  htmlEditor.getDoc().setValue(html);

  var cssEditor = CodeMirror.fromTextArea(cssInput, {
    ...editorOptions,
    mode: "css"
  });

  cssEditor.getDoc().setValue(css);

  //   Initiation

  widthInput.value = width;
  heightInput.value = height;
  cssInput.value = css;
  iframeDoc.document.body.innerHTML = html;
  iframe.style.width = `${width}px`;
  iframe.style.height = `${height}px`;
  iframeDoc.document.head.innerHTML = `<style>${css}</style>`;

  // Generates the link with html and css as url parametes attached

  function updateLink() {
    let generatepath = "/generate/";
    let addition = `?html=${escape(html)}&css=${escape(
      css
    )}&width=${width}&height=${height}`;
    resultLink.href = `${generatepath}${encodeURIComponent(
      resultUrl
    )}${addition}`;
  }

  // All the Evenet listeners

  htmlEditor.on("change", () => {
    htmlEditor.save();
    iframeDoc.document.body.innerHTML = htmlInput.value;
    localStorage.setItem("html", htmlInput.value);
    html = htmlInput.value;
    return html;
  });

  cssEditor.on("change", () => {
    cssEditor.save();
    iframeDoc.document.head.innerHTML = `<style>${cssInput.value}</style>`;
    localStorage.setItem("css", cssInput.value);
    css = cssInput.value;
    return css;
  });

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
