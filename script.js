const input = document.getElementById("inputText");

function toUpperCase() {
  input.value = input.value.toUpperCase();
}

function toLowerCase() {
  input.value = input.value.toLowerCase();
}

function toCapitalize() {
  input.value = input.value
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function toSentenceCase() {
  input.value = input.value
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
}

function toCamelCase() {
  input.value = input.value
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/^./, char => char.toLowerCase());
}

function toPascalCase() {
  input.value = input.value
    .replace(/(\w)(\w*)/g,
      (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
    )
    .replace(/\s+/g, '');
}

function toSnakeCase() {
  input.value = input.value
    .toLowerCase()
    .replace(/\s+/g, '_');
}

function toKebabCase() {
  input.value = input.value
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function toToggleCase() {
  input.value = input.value
    .split('')
    .map(char => {
      return char === char.toLowerCase()
        ? char.toUpperCase()
        : char.toLowerCase();
    })
    .join('');
}

function reverseText() {
  input.value = input.value.split('').reverse().join('');
}

function removeSpaces() {
  input.value = input.value.replace(/\s+/g, '');
}
