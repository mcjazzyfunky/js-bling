import adaptFunctionalComponent from
	'./internal/component/adaptions/adaptFunctionalComponent.js';

import adaptBasicComponent from
	'./internal/component/adaptions/adaptBasicComponent.js';

import defineStandardComponent from './api/defineStandardComponent.js';
import defineAdvancedComponent from './api/defineAdvancedComponent.js';

import Component from './api/Component.js';
import Constraints from './api/Constraints.js';

import { render as renderInferno } from 'inferno';
import createInfernoElement from 'inferno-create-element';
import InfernoComponent from 'inferno-component';

//import defineMessages from './api/defineMessages.js';
//import defineStore from './api/defineStore.js';
import hyperscript from './api/hyperscript.js';
import Injector from './api/Injector.js';

export {
	createElement,
	defineAdvancedComponent,
	defineStandardComponent,
	defineFunctionalComponent,
	defineBasicComponent,

//	defineMessages,
//	defineStore,
	hyperscript,
	isElement,
	render,
	Component,
	Constraints,
	Injector
};

function defineFunctionalComponent(config) {
	return adaptFunctionalComponent(config, adjustedConfig => {
		const ret = props => adjustedConfig.render(props);

		ret.displayName = adjustedConfig.name;

		return ret;
	});
}

function defineBasicComponent(config) {
	return adaptBasicComponent(config, adjustedConfig => {
		class ExtCustomComponent extends CustomComponent {
			constructor(...args) {
				super(args, adjustedConfig);
			}
		}

		ExtCustomComponent.displayName = adjustedConfig.name;

		return (...args) => {
			return createElement(ExtCustomComponent, ...args);
		};
	});
}

function createElement(tag, props, ...children)  {
    // TODO: For performance reasons
    if (tag === undefined || tag === null) {
        throw new TypeError(
            '[createElement] '
            + "First argument 'tag' must not be undefined or null");
    }

    let ret;

    if (!children) {
        ret = createInfernoElement.apply(null, arguments);
    } else {
        const newArguments = [tag, props];

        for (let child of children) {
            if (child && !Array.isArray(child) && typeof child[Symbol.iterator] === 'function') {
                newArguments.push(Array.from(child));
            } else {
                newArguments.push(child);
            }
        }

        ret = createInfernoElement.apply(null, newArguments);
    }

    return ret;
}

function isElement(it) {
    return it !== undefined
        && it !== null
        && typeof it === 'object'
        && !!(it.flags & (28 | 3970 )); // 28: component, 3970: element
}

function render(content, targetNode) {
    if (!isElement(content)) {
        throw new TypeError(
            "[render] First argument 'content' has to be a valid element");
    }

    const target = typeof targetNode === 'string'
        ? document.getElementById(targetNode)
        : targetNode;

    renderInferno(content, target);
}

class CustomComponent extends InfernoComponent {
    constructor(superArgs, config) {
        super(...superArgs);

		this.__viewToRender = null;
		this.__initialized  = false;
		this.__shouldUpdate = false;

		const
			{ sendProps, methods } = config.initProcess(
				view => {
					this.__viewToRender = view;

					if (this.__initialized) {
						this.__shouldUpdate = true;
						this.setState(null);
					} else {
						this.__initialized  = true;
					}});

		this.__sendProps = sendProps;

		if (methods) {
			Object.assign(this, methods);
		}
    }

    componentWillMount() {
    	this.__sendProps(this.props);
    }

    componentWillUnmount() {
		this.__sendProps(undefined);
    }

    componentWillReceiveProps(nextProps) {
    	this.__sendProps(nextProps);
    }

    shouldComponentUpdate() {
    	const ret = this.__shouldUpdate;
    	this.__shouldUpdate = false;
    	return ret;
    }

    render() {
    	return this.__viewToRender;
    }
}
