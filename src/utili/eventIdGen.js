const crypto = require('crypto');

exports.uuid = ()=>{
    return crypto.randomUUID()
}

exports.epcisHashValue = (epcis_doc)=>{
    return "under constraction"
}
