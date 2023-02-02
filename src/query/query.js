
var request = require('request');

const params= '?MATCH_epc=urn:epc:id:sgtin:0614141.107346.6080'

const uri_val=process.env.EPCIS_QUERY_END_POINT+params;
console.log(uri_val);

exports.getEPCIS2 = (epcisDoc)=>{

    const options = {
        uri: uri_val,
    };

    request.get(options, function (error, response, body) {
        //callback
        console.log("here")
    });

}

