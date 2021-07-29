const path = require("path");
const fs = require("fs");

// themes folder
const THEMES_FOLDER_NAME = path.join(__dirname, "themes");
try {
  fs.mkdirSync(THEMES_FOLDER_NAME, { recursive: true });
} catch (error) {
  console.log("Unable to make a folder");
}

const TEMPLATE_FILE_NAME = path.join(__dirname, "/template.json");
const templateFiLE = fs.readFileSync(TEMPLATE_FILE_NAME).toString();
const template = JSON.parse(templateFiLE);

const THEMES_FILE_NAME = path.join(__dirname, "/windows-terminal-themes.json");
const themeFile = fs.readFileSync(THEMES_FILE_NAME).toString();
const themes = JSON.parse(themeFile);

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

let numberOfThemes = 0;

function SaveThemeToFile(theme) {
  const FILE_NAME = path.join(__dirname, `/themes/${theme.Name}.flutecolors`);
  try {
    const themeFile = fs.writeFileSync(FILE_NAME, JSON.stringify(theme));
    ++numberOfThemes;
  } catch (err) {
    console.log("Error in writing file:", theme.Name);
  }
}

for (const theme of themes) {
  template.Name = theme.name;
  template.Author = "not atulit :)";
  for (let color of Object.keys(theme).slice(1)) {
    if (color.toLowerCase() === "purple") {
      template.Colors["Magenta"] = theme[color];
      continue;
    }
    template.Colors[capitalize(color)] = theme[color];
  }
  SaveThemeToFile(template);
}
console.log(numberOfThemes, "themes written");
