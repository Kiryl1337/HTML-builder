const fs = require('fs');
const path = require('path');
const {stdout} = require('process');

const filePath = path.join(__dirname, 'text.txt');

fs.createReadStream(filePath, 'utf-8').pipe(stdout);