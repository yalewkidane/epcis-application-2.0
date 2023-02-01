exports.AggregationEvent={
    "@context": [
        "https://gs1.github.io/EPCIS/epcis-context.jsonld",
        {
            "example": "https://example.org/epcis"
        }
    ],
    "eventID": "ni:///sha-256;87b5f18a69993f0052046d4687dfacdf48f7c988cfabda2819688c86b4066a49?ver=CBV2.0",
    "type": "AggregationEvent",
    "eventTime": "2013-06-08T14:58:56.591Z",
    "eventTimeZoneOffset": "+02:00",
    "parentID":"urn:epc:id:sscc:0614141.1234567890",
    "childEPCs":["urn:epc:id:sgtin:0614141.107346.2017","urn:epc:id:sgtin:0614141.107346.2018"],
    "action": "OBSERVE",
    "bizStep": "receiving",
    "disposition": "in_progress",
    "readPoint": {"id": "urn:epc:id:sgln:0614141.00777.0"},
    "bizLocation": {"id": "urn:epc:id:sgln:0614141.00888.0"},
    
    "childQuantityList": [
        {"epcClass":"urn:epc:idpat:sgtin:4012345.098765.*","quantity":10},
        {"epcClass":"urn:epc:class:lgtin:4012345.012345.998877","quantity":200.5,"uom":"KGM"}
    ],
    "example:myField":"Example of a vendor/user extension"
};

exports.AssociationEvent={
    "@context": "https://gs1.github.io/EPCIS/epcis-context.jsonld",
    "eventID": "ni:///sha-256;025ac144187a8c5e14caf4d1cfa69250a33dc59a5bc42a68d31b1b5e55a3f15a?ver=CBV2.0",
    "type": "AssociationEvent",
    "eventTime": "2019-11-01T14:00:00.000+01:00",
    "eventTimeZoneOffset": "+01:00",
    "parentID":"urn:epc:id:grai:4012345.55555.987",
    "childEPCs":["urn:epc:id:giai:4000001.12345"],
    "action": "ADD",
    "bizStep": "assembling",
    "readPoint": {"id": "urn:epc:id:sgln:4012345.00001.0"}
};


exports.Extended_Event={
    "@context": [
        "https://gs1.github.io/EPCIS/epcis-context.jsonld",
        {
            "example": "https://example.org/epcis"
        }
    ],
    "type": "example:CustomEvent",
    "eventTime": "2005-04-03T20:33:31.116000-06:00",
    "eventTimeZoneOffset": "-06:00"
};


exports.ObjectEvent={
    "@context": "https://gs1.github.io/EPCIS/epcis-context.jsonld",
    "eventID": "ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0",
    "type": "ObjectEvent",
    "action": "OBSERVE",
    "bizStep": "shipping",
    "disposition": "in_transit",
    "epcList": ["urn:epc:id:sgtin:0614141.107346.2017","urn:epc:id:sgtin:0614141.107346.2018"],
    "eventTime": "2005-04-03T20:33:31.116000-06:00",
    "eventTimeZoneOffset": "-06:00",
    "readPoint": {"id": "urn:epc:id:sgln:0614141.07346.1234"},
    "bizTransactionList": [  {"type": "po", "bizTransaction": "http://transaction.acme.com/po/12345678" }  ]
};


exports.TransformationEvent={
    "@context": [
        "https://gs1.github.io/EPCIS/epcis-context.jsonld",
        {
            "example": "https://example.org/epcis"
        }
    ],
    "eventID": "ni:///sha-256;e65c3a997e77f34b58306da7a82ab0fc91c7820013287700f0b50345e5795b97?ver=CBV2.0",
    "type": "TransformationEvent",
    "eventTime": "2013-10-31T14:58:56.591Z",
    "eventTimeZoneOffset": "+02:00",
    "inputEPCList": ["urn:epc:id:sgtin:4012345.011122.25","urn:epc:id:sgtin:4000001.065432.99886655"],
    "inputQuantityList": [{"epcClass":"urn:epc:class:lgtin:4012345.011111.4444","quantity":10,"uom":"KGM"},
            {"epcClass":"urn:epc:class:lgtin:0614141.077777.987","quantity":30},
            {"epcClass":"urn:epc:idpat:sgtin:4012345.066666.*","quantity":220}		  		
    ],
    "outputEPCList": [
        "urn:epc:id:sgtin:4012345.077889.25",
        "urn:epc:id:sgtin:4012345.077889.26",
        "urn:epc:id:sgtin:4012345.077889.27",
        "urn:epc:id:sgtin:4012345.077889.28"
    ],
  
    "bizStep": "commissioning",
    "disposition": "in_progress",
    "readPoint": {"id": "urn:epc:id:sgln:4012345.00001.0"},
    "ilmd": {"example:bestBeforeDate":"2014-12-10","example:batch":"XYZ" },
    "example:myField":"Example of a vendor/user extension"
};




exports.AllEvents = [
{
    "@context": [
        "https://gs1.github.io/EPCIS/epcis-context.jsonld",
        {
            "example": "https://example.org/epcis"
        }
    ],
    "eventID": "ni:///sha-256;87b5f18a69993f0052046d4687dfacdf48f7c988cfabda2819688c86b4066a49?ver=CBV2.0",
    "type": "AggregationEvent",
    "eventTime": "2013-06-08T14:58:56.591Z",
    "eventTimeZoneOffset": "+02:00",
    "parentID":"urn:epc:id:sscc:0614141.1234567890",
    "childEPCs":["urn:epc:id:sgtin:0614141.107346.2017","urn:epc:id:sgtin:0614141.107346.2018"],
    "action": "OBSERVE",
    "bizStep": "receiving",
    "disposition": "in_progress",
    "readPoint": {"id": "urn:epc:id:sgln:0614141.00777.0"},
    "bizLocation": {"id": "urn:epc:id:sgln:0614141.00888.0"},
    
    "childQuantityList": [
        {"epcClass":"urn:epc:idpat:sgtin:4012345.098765.*","quantity":10},
        {"epcClass":"urn:epc:class:lgtin:4012345.012345.998877","quantity":200.5,"uom":"KGM"}
    ],
    "example:myField":"Example of a vendor/user extension"
},
{
    "@context": "https://gs1.github.io/EPCIS/epcis-context.jsonld",
    "eventID": "ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0",
    "type": "ObjectEvent",
    "action": "OBSERVE",
    "bizStep": "shipping",
    "disposition": "in_transit",
    "epcList": ["urn:epc:id:sgtin:0614141.107346.2017","urn:epc:id:sgtin:0614141.107346.2018"],
    "eventTime": "2005-04-03T20:33:31.116000-06:00",
    "eventTimeZoneOffset": "-06:00",
    "readPoint": {"id": "urn:epc:id:sgln:0614141.07346.1234"},
    "bizTransactionList": [  {"type": "po", "bizTransaction": "http://transaction.acme.com/po/12345678" }  ]
},
{
    "@context": "https://gs1.github.io/EPCIS/epcis-context.jsonld",
    "eventID": "ni:///sha-256;025ac144187a8c5e14caf4d1cfa69250a33dc59a5bc42a68d31b1b5e55a3f15a?ver=CBV2.0",
    "type": "AssociationEvent",
    "eventTime": "2019-11-01T14:00:00.000+01:00",
    "eventTimeZoneOffset": "+01:00",
    "parentID":"urn:epc:id:grai:4012345.55555.987",
    "childEPCs":["urn:epc:id:giai:4000001.12345"],
    "action": "ADD",
    "bizStep": "assembling",
    "readPoint": {"id": "urn:epc:id:sgln:4012345.00001.0"}
},
{
    "@context": [
        "https://gs1.github.io/EPCIS/epcis-context.jsonld",
        {
            "example": "https://example.org/epcis"
        }
    ],
    "eventID": "ni:///sha-256;e65c3a997e77f34b58306da7a82ab0fc91c7820013287700f0b50345e5795b97?ver=CBV2.0",
    "type": "TransformationEvent",
    "eventTime": "2013-10-31T14:58:56.591Z",
    "eventTimeZoneOffset": "+02:00",
    "inputEPCList": ["urn:epc:id:sgtin:4012345.011122.25","urn:epc:id:sgtin:4000001.065432.99886655"],
    "inputQuantityList": [{"epcClass":"urn:epc:class:lgtin:4012345.011111.4444","quantity":10,"uom":"KGM"},
            {"epcClass":"urn:epc:class:lgtin:0614141.077777.987","quantity":30},
            {"epcClass":"urn:epc:idpat:sgtin:4012345.066666.*","quantity":220}		  		
    ],
    "outputEPCList": [
        "urn:epc:id:sgtin:4012345.077889.25",
        "urn:epc:id:sgtin:4012345.077889.26",
        "urn:epc:id:sgtin:4012345.077889.27",
        "urn:epc:id:sgtin:4012345.077889.28"
    ],
  
    "bizStep": "commissioning",
    "disposition": "in_progress",
    "readPoint": {"id": "urn:epc:id:sgln:4012345.00001.0"},
    "ilmd": {"example:bestBeforeDate":"2014-12-10","example:batch":"XYZ" },
    "example:myField":"Example of a vendor/user extension"
}

];