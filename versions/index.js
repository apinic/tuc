/**
* @description Read all files and make export for file
*              ignoring index file.
* @type {exports}
*/

const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname);

files.forEach((file) => {
  let fileName = path.basename(file, '.js');

  if (fileName !== 'index') {
    exports[fileName] = require(`./${fileName}`);
  }
});
