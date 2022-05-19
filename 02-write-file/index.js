const fs = require('fs');
const path = require('path');
const {stdout, stdin} = require('process');

const filePath = path.join(__dirname, 'text.txt');
const fileWrite = fs.createWriteStream(filePath, 'utf-8');

const BEGIN_FRASE = 'Hello, input your text:\n';
const END_FRASE = 'Buy, this is the end!';

stdout.write(BEGIN_FRASE);
stdin.on('data', (data) => {
  if(data.toString().trim() === 'exit'){
    stdout.write(END_FRASE);
    process.exit();
  }
  fileWrite.write(data);
});

process.on('SIGINT', () => {
  stdout.write(END_FRASE);
  process.exit();
});