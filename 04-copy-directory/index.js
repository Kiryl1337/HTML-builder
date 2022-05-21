const path = require('path');
const promises = require('fs/promises');

const copyFromDir = path.join(__dirname, 'files');
const copyToDir = path.join(__dirname, 'files-copy');

filesCopy();

async function filesCopy() {
  await promises.mkdir(copyToDir, {recursive: true});

  const deleteFiles = await promises.readdir(copyToDir);
  for(const file of deleteFiles){
    const filePath = path.join(copyToDir, file);
    await promises.rm(filePath);
  }

  const copyFiles = await promises.readdir(copyFromDir);
  for(const file of copyFiles){
    const copyFileFrom = path.join(copyFromDir, file);
    const copyFileTo = path.join(copyToDir, file); 
    await promises.copyFile(copyFileFrom, copyFileTo);
  }

}
  

