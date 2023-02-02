var request = require('request');

require('dotenv').config({ path: "../config/.env" })


const examples = require('./examples');

const options = {
    uri:process.env.EPCIS_CAPTURE_END_POINT,
    method: 'POST',
    body: examples.test,
    json:true
}

function postepcis(){

    request(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
            console.log(body);
        }else{
            console.log(error);
        }
      });

}

console.log("capture application");
console.log(process.env.EPCIS_CAPTURE_END_POINT)
postepcis()