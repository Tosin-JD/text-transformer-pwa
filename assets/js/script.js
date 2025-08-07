// Variable Declarations
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

// Sort buttons
let sortAlphaBtn = document.getElementById("sort-alpha-btn");
let sortReverseBtn = document.getElementById("sort-reverse-btn");
let sortLengthBtn = document.getElementById("sort-length-btn");
let sortLengthReverseBtn = document.getElementById("sort-length-reverse-btn");

// Functions
function getButtons() {
  return document.querySelectorAll('.tabs-button');
}

function getContents() {
  return document.querySelectorAll('.tab-content');
}

function showTabContent(tabId, contents) {
  contents.forEach(content => {
    content.classList.remove('active');
  });

  const activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.add('active');
  }

  // Update the title based on active tab
  const title = document.getElementById('tab-title');
  if (tabId === 'transform-text') {
    title.textContent = 'Text Transformer';
  } else if (tabId === 'sort-text') {
    title.textContent = 'Sort Text';
  }
}

function highlightTabButton(tabId, buttons) {
  buttons.forEach(button => {
    button.classList.remove('btn-active');
  });

  const activeButton = Array.from(buttons).find(
    btn => btn.getAttribute('data-tab') === tabId
  );

  if (activeButton) {
    activeButton.classList.add('btn-active');
  }
}

function saveTabToStorage(tabId) {
  // Using a simple variable instead of localStorage for Claude artifacts
  window.lastTab = tabId;
}

function getSavedTabId(contents) {
  return window.lastTab || contents[0]?.id;
}

function handleTabClick(buttons, contents) {
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      activateTab(tabId, buttons, contents);
    });
  });
}

function activateTab(tabId, buttons, contents) {
  showTabContent(tabId, contents);
  highlightTabButton(tabId, buttons);
  saveTabToStorage(tabId);
}

function switchTab() {
  const buttons = getButtons();
  const contents = getContents();
  const savedTabId = getSavedTabId(contents);

  activateTab(savedTabId, buttons, contents);
  handleTabClick(buttons, contents);
}

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
  const sentences = [...text].filter(char => sentenceEndings.includes(char)).length;

  const lines = text.split('\n');
  const paragraphs = lines.map(line => line.trim()).filter(line => line !== '').length;

  document.getElementById('stats').textContent =
    `Characters: ${chars} | Words: ${words} | Sentences: ${sentences} | Paragraphs: ${paragraphs}`;
}

function checkAndDisplayToast(input, message, messageType = "error"){
  if (!input.trim()) {
    showToast(message, messageType);
    return;
  }
}

// Text transformation functions
function toUpperCase() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to uppercase!");
  if (input.length > 0) {
    const output = input.toUpperCase();
    updateOutput(output);
    saveToHistory(input);
  }
}

function toLowerCase() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to lowercase!");
  if (input.length > 0) {
    const output = input.toLowerCase();
    updateOutput(output);
    saveToHistory(input);
  }
}

function toCapitalize() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to capitalize!");
  if (input.length > 0) {
    const words = input.split(' ');
    const capitalizedWords = words.map(word => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    });
    const output = capitalizedWords.join(' ');
    updateOutput(output);
    saveToHistory(input);
  }
}

function toSentenceCase() {
  const input = document.getElementById('input-text').value;
  if (input.length === 0) {
    showToast("No text to convert to sentence case", "error");
    return;
  }

  const sentenceEnders = ['.', '!', '?'];
  let capitalizeNext = true;

  const chars = input.split('');

  const result = chars.reduce((acc, char) => {
    if (capitalizeNext && char !== ' ' && char !== '\n' && char !== '\t') {
      acc += char.toUpperCase();
      capitalizeNext = false;
    } else if (sentenceEnders.includes(char)) {
      acc += char;
      capitalizeNext = true;
    } else {
      acc += (char === ' ' || char === '\n' || char === '\t') ? char : char.toLowerCase();
    }
    return acc;
  }, '');

  updateOutput(result);
  saveToHistory(input);
}


function toTitleCase() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to capitalize!");
  if (input.length > 0) {
    const words = input.split(' ');
    const titleCased = words.map(word => {
      if (word.length === 0) return ''; // keep extra spaces intact
      const firstChar = word[0].toUpperCase();
      const rest = word.slice(1).toLowerCase();
      return firstChar + rest;
    });
    const result = titleCased.join(' ');
    updateOutput(result);
    saveToHistory(input);
  }
}


function toCamelCase() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to convert to camel case!");
  if (input.length > 0) {
    const words = input.toLowerCase().split(' ').filter(word => word.length > 0);
    const camelWords = words.map((word, index) => {
      if (index === 0) {
        return word;
      }
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    });
    const output = camelWords.join('');
    updateOutput(output);
    saveToHistory(input);
  }
}

function toPascalCase() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to convert to pascal case!");
  if (input.length > 0) {
    const words = input.toLowerCase().split(' ').filter(word => word.length > 0);
    const pascalWords = words.map(word => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    });
    const output = pascalWords.join('');
    updateOutput(output);
    saveToHistory(input);
  }
}

function toSnakeCase() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to convert to snake case!");
  if (input.length > 0) {
    const words = input.toLowerCase().split(' ').filter(word => word.length > 0);
    const output = words.join('_');
    updateOutput(output);
    saveToHistory(input);
  }
}

function toKebabCase() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to convert to kebab case!");
  if (input.length > 0) {
    const words = input.toLowerCase().split(' ').filter(word => word.length > 0);
    const output = words.join('-');
    updateOutput(output);
    saveToHistory(input);
  }
}

function toToggleCase() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to convert to toggle case!");
  if (input.length > 0) {
    const output = input.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
    updateOutput(output);
    saveToHistory(input);
  }
}

function reverseText() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to reverse!");
  if (input.length > 0) {
    const output = input.split('').reverse().join('');
    updateOutput(output);
    saveToHistory(input);
  }
}

function removeSpaces() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to remove spaces from!");
  if (input.length > 0) {
    const output = input.replace(/\s+/g, '');
    updateOutput(output);
    saveToHistory(input);
  }
}

// Sort functions
function sortAlphabetically() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to sort!");
  if (input.length > 0) {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const sorted = lines.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    const output = sorted.join('\n');
    updateOutput(output);
    saveToHistory(input);
  }
}

function sortReverse() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to sort!");
  if (input.length > 0) {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const sorted = lines.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
    const output = sorted.join('\n');
    updateOutput(output);
    saveToHistory(input);
  }
}

function sortByLength() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to sort!");
  if (input.length > 0) {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const sorted = lines.sort((a, b) => a.length - b.length);
    const output = sorted.join('\n');
    updateOutput(output);
    saveToHistory(input);
  }
}

function sortByLengthReverse() {
  const input = document.getElementById('input-text').value;
  checkAndDisplayToast(input, "No text to sort!");
  if (input.length > 0) {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const sorted = lines.sort((a, b) => b.length - a.length);
    const output = sorted.join('\n');
    updateOutput(output);
    saveToHistory(input);
  }
}

function clearText() {
  const prevText = document.getElementById('input-text').value;
  if (!prevText){
    showToast("No text to clear!", "error");
    return;
  }
  updateOutput('');
  saveToHistory(prevText);
  showToast("Text cleared!", "success");
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
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
}

function showShortcuts() {
  // Create modal if it doesn't exist
  let modal = document.querySelector('.modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
          <div class="modal-content blur">
            <h3>Shortcuts</h3>
            <p>Ctrl+U: Uppercase<br>Ctrl+L: Lowercase<br>Ctrl+C: Copy</p>
            <button onclick="this.closest('.modal').style.display='none'">&times; Close</button>
          </div>
        `;
    document.body.appendChild(modal);
  }
  // Show modal
  modal.style.display = 'flex';
}

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

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Event listeners
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) {
    if (e.key === 'u') {
      e.preventDefault();
      toUpperCase();
    }
    if (e.key === 'l') {
      e.preventDefault();
      toLowerCase();
    }
    if (e.key === 'c' && e.target.id === 'input-text') {
      copyToClipboard();
    }
  }
});

// Check for saved theme
if (window.theme === 'dark') {
  document.body.classList.add('dark');
}

// Text transformation event listeners
if (uppercaseBtn) uppercaseBtn.addEventListener('click', toUpperCase);
if (lowercaseBtn) lowercaseBtn.addEventListener('click', toLowerCase);
if (capitalizeBtn) capitalizeBtn.addEventListener('click', toCapitalize);
if (titleCaseBtn) titleCaseBtn.addEventListener('click', toTitleCase);
if (sentenceCaseBtn) sentenceCaseBtn.addEventListener('click', toSentenceCase);
if (camelCaseBtn) camelCaseBtn.addEventListener('click', toCamelCase);
if (pascalCaseBtn) pascalCaseBtn.addEventListener('click', toPascalCase);
if (snakeCaseBtn) snakeCaseBtn.addEventListener('click', toSnakeCase);
if (kebabCaseBtn) kebabCaseBtn.addEventListener('click', toKebabCase);
if (toggleCaseBtn) toggleCaseBtn.addEventListener('click', toToggleCase);
if (reverseTextBtn) reverseTextBtn.addEventListener('click', reverseText);
if (removeSpacesBtn) removeSpacesBtn.addEventListener('click', removeSpaces);

// Sort event listeners
if (sortAlphaBtn) sortAlphaBtn.addEventListener('click', sortAlphabetically);
if (sortReverseBtn) sortReverseBtn.addEventListener('click', sortReverse);
if (sortLengthBtn) sortLengthBtn.addEventListener('click', sortByLength);
if (sortLengthReverseBtn) sortLengthReverseBtn.addEventListener('click', sortByLengthReverse);

// Common event listeners
copyTextBtn.addEventListener('click', copyToClipboard);
undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);
themeBtn.addEventListener('click', toggleTheme);
shortcutsBtn.addEventListener('click', showShortcuts);
clearTextBtn.addEventListener('click', clearText);

// Input event listener
document.getElementById('input-text').addEventListener('input', () => {
  const input = document.getElementById('input-text').value;
  updateStats(input);
});

// Initialize tabs
switchTab();