var request = require('request');


function postepcis(){
    request.post(
    'http://www.yoursite.com/formpage',
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
}

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


getepcis()