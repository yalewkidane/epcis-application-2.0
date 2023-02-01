var request = require('request');

const eventIdGen = require('./utili/eventIdGen.js');
const examples = require('./capture/examples');
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
console.log("capture application");
