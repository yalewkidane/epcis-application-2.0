
var request = require('request');


function getepcis(){
    request.get(
    'http://127.0.0.1:8090/epcis/v2',
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
}

console.log("Query application");