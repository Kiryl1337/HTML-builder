const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    const filePath = path.join(folderPath, file.name);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats.isFile()) {
        stdout.write(file.name.split('.')[0] + ' - ' + file.name.split('.')[1] + ' - ' + stats.size / 1024 + 'kb' + '\n');
      }
    });
  });
});

