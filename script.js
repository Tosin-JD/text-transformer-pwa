// ================================================================ //
// ================================================================ //
// ================================================================ //
// Varible Declarations

let history = [];
let historyIndex = -1;

let copyTextBtn = document.getElementById("copy-btn");
let uppercaseBtn = document.getElementById("uppercase-btn");
let lowercaseBtn = document.getElementById("lowercase-btn");
let capitalizeBtn = document.getElementById("capitalize-btn");
let titleCaseBtn = document.getElementById("to-title-case-btn");
let sentenceCaseBtn = document.getElementById("to-sentence-case-btn");
let camelCaseBtn = document.getElementById("to-camel-case-btn");
let pascalCaseBtn = document.getElementById("to-pascal-case-btn");
let snakeCaseBtn = document.getElementById("to-snake-case-btn");
let kebabCaseBtn = document.getElementById("to-kebab-case-btn");
let toggleCaseBtn = document.getElementById("to-toggle-case-btn");
let reverseTextBtn = document.getElementById("reverse-text-btn");
let removeSpacesBtn = document.getElementById("remove-spaces-btn");
let undoBtn = document.getElementById("undo-btn");
let redoBtn = document.getElementById("redo-btn");
let themeBtn = document.getElementById("theme-btn");
let shortcutsBtn = document.getElementById("shortcuts-btn");
let clearTextBtn = document.getElementById("clear-text-btn");

// end of variable declarations


// ================================================================ //
// ================================================================ //
// ================================================================ //
// Functions

function updateOutput(text) {
  document.getElementById('input-text').value = text;
  updateStats(text);
}

function saveToHistory(input) {
  history = history.slice(0, historyIndex + 1);
  history.push({ input });
  historyIndex++;
  if (history.length > 10) {
    history.shift();
    historyIndex--;
  }
}

function updateStats(text) {
  const chars = text.length;

  const wordsArray = text.trim().split(' ');
  const words = wordsArray.filter(word => word !== '').length;

  const sentenceEndings = ['.', '!', '?'];
  let sentences = 0;
  for (let i = 0; i < text.length; i++) {
    if (sentenceEndings.includes(text[i])) {
      sentences++;
    }
  }

  document.getElementById('stats').textContent =
    `Characters: ${chars} | Words: ${words} | Sentences: ${sentences}`;
}


function toUpperCase() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.toUpperCase();
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function toLowerCase() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.toLowerCase();
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function toCapitalize() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.replace(/\b\w/g, c => c.toUpperCase());
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function toSentenceCase() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function toCamelCase() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function toPascalCase() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.toLowerCase().replace(/\b\w|[^a-zA-Z0-9]+(.)/g, (m, c) => (c || m).toUpperCase());
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function toSnakeCase() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.toLowerCase().replace(/\s+/g, '_');
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function toKebabCase() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.toLowerCase().replace(/\s+/g, '-');
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function toToggleCase() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function reverseText() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.split('').reverse().join('');
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function removeSpaces() {
  const input = document.getElementById('input-text').value;
  if (input.length > 0) {
    const output = input.replace(/\s+/g, '');
    updateOutput(output);
    saveToHistory(input, output);
  }
}

function clearText() {
  prevText = document.getElementById('input-text').value;
  updateOutput('');
  saveToHistory(prevText);
  showToast("Text cleared!", "danger");
}

function copyToClipboard() {
  const output = document.getElementById('input-text').value;
  if (output) {
    navigator.clipboard.writeText(output).then(() => {
      showToast("Text copied to clipboard!");
    });
  } else {
    showToast("No text to copy!", "error");
  }
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    const { input } = history[historyIndex];
    document.getElementById('input-text').value = input;
    updateOutput(input);
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    const { input } = history[historyIndex];
    document.getElementById('input-text').value = input;
    updateOutput(input);
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function showShortcuts() {
  alert('Shortcuts:\nCtrl+U: Uppercase\nCtrl+L: Lowercase\nCtrl+C: Copy');
}

document.getElementById('input-text').addEventListener('input', () => {
  const input = document.getElementById('input-text').value;
  updateStats(input);
});

function showToast(message, messageType = "success") {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast blur ${messageType}`;
  toast.innerHTML = `
                <div class="toast-content">
                  ${message}
                  <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                </div>
            `;
  toastContainer.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Auto-hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
// end of functions

// ================================================================ //
// ================================================================ //
// ================================================================ //
// Event listeners

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) {
    if (e.key === 'u') toUpperCase();
    if (e.key === 'l') toLowerCase();
    if (e.key === 'c') copyToClipboard();
  }
});

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

uppercaseBtn.addEventListener('click', toUpperCase);
lowercaseBtn.addEventListener('click', toLowerCase);
capitalizeBtn.addEventListener('click', toCapitalize);
titleCaseBtn.addEventListener('click', toSentenceCase);
sentenceCaseBtn.addEventListener('click', toSentenceCase);
camelCaseBtn.addEventListener('click', toCamelCase);
pascalCaseBtn.addEventListener('click', toPascalCase);
snakeCaseBtn.addEventListener('click', toSnakeCase);
kebabCaseBtn.addEventListener('click', toKebabCase);
toggleCaseBtn.addEventListener('click', toToggleCase);
reverseTextBtn.addEventListener('click', reverseText);
removeSpacesBtn.addEventListener('click', removeSpaces);
copyTextBtn.addEventListener('click', copyToClipboard);
undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);
themeBtn.addEventListener('click', toggleTheme);
shortcutsBtn.addEventListener('click', showShortcuts);
clearTextBtn.addEventListener('click', clearText);


// End of Event Listeners
// ================================================================ //
// ================================================================ //
// ================================================================ //
// ================================================================ //