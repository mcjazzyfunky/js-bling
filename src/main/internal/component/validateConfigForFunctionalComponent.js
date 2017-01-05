import { CONFIG_FUNCTIONAL_COMPONENT_KEYS } from './componentConstants.js';
import prettifyComponentConfigError from './prettifyComponentConfigError.js';
import validateKeyValues from '../util/validateKeyValues.js';
import validateComponentName from './validateComponentName.js';
import validatePropertiesConfig from './validatePropertiesConfig.js';
import validateFunctionConfig from './validateFunctionConfig.js';

export default function validateConfigForFunctionalComponent(
	config, platformAdaption) {

	let err =
	    validateKeyValues(config,
	    	key => CONFIG_FUNCTIONAL_COMPONENT_KEYS.has(key))

		|| validateComponentName(config.name)
		|| validatePropertiesConfig(config)
		|| validateFunctionConfig(config, 'render', true);

	if (err) {
		throw prettifyComponentConfigError(err, config);
	}

	return err;
}
