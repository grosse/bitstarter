var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');

var HTML_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT="checks.json";

var assertFileExists = function(infile) {
  var instr =  infile.toString();
   if(!fs.existsSync(instr)) {
     console.log("%s does not exist. Exiting.",instr); 
     process.exit(1);
  }
   return instr;
};




var cheerioHtmlFile = function(htmlfile) {
  return cheerio.load(fs.readFileSync(htmlfile));
};


var loadChecks = function(checksfile) {
  return JSON.parse(fs.readFileSync(checksfile));
};

if(require.main == module) {
 program
   .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)

   .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
   .parse(process.argv);

 var checkJson = checkHtmlFile(program.file, progream.checks);
 var outJson = JSON.stringify(checkJson, null,4);
 console.log(outJson);
  }
  else {
   exports.checkHtmlFile = checkHtmlFile;
}
