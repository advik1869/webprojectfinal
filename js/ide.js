const questionGroups = {
  html: Array.from({ length: 25 }, (_, index) => index + 1),
  js: Array.from({ length: 19 }, (_, index) => index + 26)
};

const questionNotes = {
  4: "Main file loaded. This question also has linked home, about, and contact pages outside the editor.",
  18: "The main login example is loaded here. The separate register page remains available from your lessons.",
  37: "This loads the original file used for teaching autofocus. The live preview in Code Lab will not scroll the main website."
};

const htmlEditor = document.getElementById("htmlEditor");
const cssEditor = document.getElementById("cssEditor");
const jsEditor = document.getElementById("jsEditor");
const previewFrame = document.getElementById("previewFrame");
const challengeTitle = document.getElementById("challengeTitle");
const challengeDescription = document.getElementById("challengeDescription");
const runStatus = document.getElementById("runStatus");
const tabButtons = document.querySelectorAll(".lab-tab");
const editors = document.querySelectorAll(".lab-editor");
const runButtons = [document.getElementById("runBtn"), document.getElementById("runBtnBottom")].filter(Boolean);
const resetButtons = [document.getElementById("resetBtn"), document.getElementById("resetBtnBottom")].filter(Boolean);
const htmlQuestionList = document.getElementById("htmlQuestionList");
const jsQuestionList = document.getElementById("jsQuestionList");

let currentQuestion = 1;
let currentFiles = {
  htmlPath: "",
  cssPath: "",
  jsPath: "",
  baseHref: `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, "")}`
};
let originalState = {
  html: "",
  css: "",
  js: ""
};

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

async function fetchTextIfExists(path) {
  const response = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });

  if (!response.ok) {
    return "";
  }

  return response.text();
}

function getQuestionPaths(questionNumber) {
  return {
    htmlPath: `html/${questionNumber}.html`,
    cssPath: `css/${questionNumber}.css`,
    jsPath: `js/${questionNumber}.js`,
    baseHref: `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, "")}html/`
  };
}

function stripExternalReferences(html, cssPath, jsPath) {
  const parser = new DOMParser();
  const documentNode = parser.parseFromString(html, "text/html");

  documentNode.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const href = link.getAttribute("href") || "";

    if (href.endsWith(cssPath) || href.endsWith(`/${cssPath}`) || href === `../${cssPath}`) {
      link.remove();
    }
  });

  documentNode.querySelectorAll("script[src]").forEach((script) => {
    const src = script.getAttribute("src") || "";

    if (src.endsWith(jsPath) || src.endsWith(`/${jsPath}`) || src === `../${jsPath}`) {
      script.remove();
    }
  });

  return "<!DOCTYPE html>\n" + documentNode.documentElement.outerHTML;
}

function buildPreviewDocument() {
  const htmlSource = htmlEditor.value;
  const cssSource = cssEditor.value;
  const jsSource = jsEditor.value;
  const parser = new DOMParser();
  const parsed = parser.parseFromString(htmlSource, "text/html");
  const hasHtmlTag = /<html[\s>]/i.test(htmlSource);

  let headContent = parsed.head ? parsed.head.innerHTML : "";
  let bodyContent = parsed.body ? parsed.body.innerHTML : htmlSource;
  let bodyAttributes = "";

  if (!hasHtmlTag) {
    headContent = "";
    bodyContent = htmlSource;
  }

  if (parsed.body) {
    bodyAttributes = Array.from(parsed.body.attributes)
      .map((attribute) => `${attribute.name}="${escapeAttribute(attribute.value)}"`)
      .join(" ");
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="${currentFiles.baseHref}">
  ${headContent}
  <style>${cssSource}</style>
</head>
<body ${bodyAttributes}>
${bodyContent}
<script>
${jsSource}
<\/script>
</body>
</html>`;
}

function buildPreview() {
  previewFrame.srcdoc = buildPreviewDocument();
  runStatus.textContent = `Preview updated for Question ${currentQuestion}`;
}

function activateTab(name) {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === name);
  });

  editors.forEach((editor) => {
    editor.classList.toggle("active", editor.id === `${name}Editor`);
  });
}

function setActiveQuestionButton(questionNumber) {
  document.querySelectorAll(".lab-number-btn").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.question) === questionNumber);
  });
}

function renderQuestionButtons(container, questions) {
  questions.forEach((questionNumber) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lab-number-btn";
    button.dataset.question = String(questionNumber);
    button.textContent = questionNumber;
    button.addEventListener("click", () => {
      loadQuestion(questionNumber);
    });
    container.append(button);
  });
}

async function loadQuestion(questionNumber) {
  currentQuestion = questionNumber;
  currentFiles = getQuestionPaths(questionNumber);

  runStatus.textContent = `Loading Question ${questionNumber}...`;
  setActiveQuestionButton(questionNumber);

  try {
    const [htmlSource, cssSource, jsSource] = await Promise.all([
      fetchTextIfExists(currentFiles.htmlPath),
      fetchTextIfExists(currentFiles.cssPath),
      fetchTextIfExists(currentFiles.jsPath)
    ]);

    if (!htmlSource) {
      throw new Error("Question file not found.");
    }

    const cleanedHtml = stripExternalReferences(htmlSource, currentFiles.cssPath, currentFiles.jsPath);

    htmlEditor.value = cleanedHtml;
    cssEditor.value = cssSource;
    jsEditor.value = jsSource;

    originalState = {
      html: cleanedHtml,
      css: cssSource,
      js: jsSource
    };

    challengeTitle.textContent = `Question ${questionNumber}`;
    challengeDescription.textContent = questionNotes[questionNumber] || "The current website files for this question are loaded here. Edit them and rerun the preview to test changes.";

    buildPreview();
    activateTab("html");
  } catch (error) {
    challengeTitle.textContent = `Question ${questionNumber}`;
    challengeDescription.textContent = "This question could not be loaded into the editor.";
    htmlEditor.value = "";
    cssEditor.value = "";
    jsEditor.value = "";
    runStatus.textContent = `Could not load Question ${questionNumber}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestionButtons(htmlQuestionList, questionGroups.html);
  renderQuestionButtons(jsQuestionList, questionGroups.js);

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tab);
    });
  });

  runButtons.forEach((button) => {
    button.addEventListener("click", buildPreview);
  });

  resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      htmlEditor.value = originalState.html;
      cssEditor.value = originalState.css;
      jsEditor.value = originalState.js;
      buildPreview();
      runStatus.textContent = `Question ${currentQuestion} restored`;
    });
  });

  [htmlEditor, cssEditor, jsEditor].forEach((editor) => {
    editor.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        buildPreview();
      }
    });
  });

  activateTab("html");
  loadQuestion(1);
});
