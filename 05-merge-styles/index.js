const fs = require('fs');
const path = require('path');
const promises = require('fs/promises');


async function copyStyles() {
  const stylesPath = path.join(__dirname, 'styles');  
  const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
  const resultStyle = fs.createWriteStream(bundlePath, 'utf-8'); 

  const styles = await promises.readdir(stylesPath, {
    withFileTypes: true,
  });
  
  for (let file of styles) {
    const filePath = path.join(stylesPath, file.name);
    const fileType = path.extname(filePath);
    if (file.isFile() && fileType === '.css') {
      const fileContent = await promises.readFile(filePath);
      resultStyle.write(fileContent + '\n');
    }
  }
}
copyStyles();
