var dir  = '../img/gallery';
var filesystem = require("fs");
var results = [];

filesystem.readdirSync(dir).forEach(function(file) {

  file = dir+'/'+file;
  var stat = filesystem.statSync(file);

  if (stat && stat.isDirectory()) {
    results = results.concat(_getAllFilesFromFolder(file))
  } else results.push({src:file, sub: ''});

});

console.log(results);
