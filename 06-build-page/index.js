const path = require('path');
const fs = require('fs');
const promises = require('fs/promises');

const projectDistPath = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');

async function buildPage() {

  await promises.mkdir(projectDistPath, {recursive: true});

  const newAssetsPath = path.join(projectDistPath, 'assets');
  await promises.mkdir(newAssetsPath, {recursive: true});

  copyStyles();

  assetsFolderCopy(assetsPath, newAssetsPath);

  createHtml();

}

async function copyStyles() {
  const stylesPath = path.join(__dirname, 'styles');
  const stylePath = path.join(__dirname, 'project-dist', 'style.css');
  const resultStyle = fs.createWriteStream(stylePath, 'utf-8');

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

async function assetsFolderCopy(copyFromDir, copyTodDir){
  const folderFiles = await promises.readdir(copyFromDir, {withFileTypes: true});
  for(const item of folderFiles){
    if(item.isDirectory()){
      await promises.mkdir(path.join(copyTodDir, item.name), {recursive: true});
      await assetsFolderCopy(path.join(copyFromDir, item.name), path.join(copyTodDir, item.name));
    } else if(item.isFile()){
      promises.copyFile(path.join(copyFromDir, item.name), path.join(copyTodDir, item.name));
    }
  }
}

async function createHtml(){
  const templateFile = path.join(__dirname, 'template.html');
  const htmlFile = await promises.readFile(templateFile);
  await promises.writeFile(path.join(projectDistPath, 'index.html'), htmlFile);

  const componentsPath = path.join(__dirname, 'components');
  const componentsFiles = await promises.readdir(componentsPath, { withFileTypes: true });

  for (const item of componentsFiles) {
    const itemPath = path.join(componentsPath, item.name);
    if (item.isFile() && path.extname(itemPath).split('.')[1] === 'html') {
      const componentsFileData = await promises.readFile(itemPath);
      const indexFile = await promises.readFile(path.join(projectDistPath, 'index.html'), {encoding:'utf-8'});
      const htmlTag = indexFile.replace(`{{${item.name.split('.')[0]}}}`, componentsFileData);
      await promises.writeFile(path.join(projectDistPath, 'index.html'), htmlTag);
    }
  }
}


buildPage();






