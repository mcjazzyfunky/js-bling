export default function validateKeyValues(
	obj, keyValueValidator, mandatory = true) {

	let ret = null;

	const illegalParameters = [];

	if (obj === null || typeof obj !== 'object') {
		if (mandatory || obj !== undefined) {
			ret = new Error('Must be an object');
		}
	} else {
	    for (let key in obj) {
	    	if (obj.hasOwnProperty(key) && !keyValueValidator(key, obj[key])) {
	    		console.log('>>', key, obj[key], keyValueValidator(key, obj[key]))
	    		console.log(keyValueValidator)
				illegalParameters.push(key);
	    	}
	    }

	    if (illegalParameters.length === 1) {
	    	ret = new Error('Illegal parameter ' + illegalParameters[0]);
	    } else if (illegalParameters.length > 1) {
			const errMsg = 'Illegal parameters '
				+ illegalParameters.map(key => `'${key}'`).join(', ');

	    	ret = new Error(errMsg);
	    }
	}

    if (!ret) {
    	const ownSymbols = Object.getOwnPropertySymbols(obj);

    	if (ownSymbols.length > 0) {
    		ret = new Error(
    			'Symbol keys are not allowed ('
    			+ ownSymbols.map(String).join(', ')
    			+ ')');
    	}
    }

    return ret;
}
