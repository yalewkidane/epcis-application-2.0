



//getepcis()

//Generates uuid
console.log(eventIdGen.uuid());
//Generates hashValue given an epcis document
const epcis_doc={}
console.log(eventIdGen.epcisHashValue(epcis_doc));

//
console.log(examples.ObjectEvent);