var http = require("http");
let fs = require("fs");
var convert = require('xml-js');



//create a server object:
http
  .createServer(async function(req, res) {
    let xml_data = fs.readFileSync(__dirname + "/../data.xml", "utf8");

    x = convert.xml2json(xml_data, {compact: true, spaces: 4});
    let object = JSON.parse(x);
    
    let result = object.product.forecast.area.map((item, index) => {
        if(item['forecast-period'] !== undefined) {
            return item['forecast-period']
        }
    });

    const output = result.map((item, index) => {
        if(item !== undefined && item[3].text._text !== null) { 
            return item[3].text._text;
        }
    })


    let results = {
        output };

    res.write(JSON.stringify(results));
    res.end();
  })
  .listen(8080);