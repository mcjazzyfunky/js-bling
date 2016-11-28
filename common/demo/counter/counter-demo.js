import { defineComponent, mount, createElement as htm, Types } from 'js-surface';

const commands = {
    increase(delta) {
        return state => ({ counterValue: state.counterValue + delta });
    },
    
    reset(value) {
        return state => ({ counterValue: value });
    }
};

const CounterLabel = defineComponent({
    name: 'CounterLabel',
    
    properties: {
        value: {
            type: Types.number
        }
    },
    
    render({props}) {
        return htm('label', null, htm('b', null, props.value));
    }
});

const Counter = defineComponent({
    name: 'Counter',
   
    commands,
    
    properties: {
        initValue: {
            type: Types.number,
            defaultValue: 0
        },
        style: {
            type: Types.object,
            defaultValue: null
        }
    },
    
    prepareState(props) {
        return { counterValue: props.initValue };
    },
    
    initiate({ ctrl }) {
        return {
            needsUpdate(params) {
                console.log('check wheter update needed - params:', params);
                
                return true;
            },
            
            onWillMount(params) {
                console.log('will mount Counter - params:', params);
            },
            
            onDidMount(params) {
                console.log('did mount Counter - params:', params);  
            },
            
            onWillUpdate(params) {
                console.log('will update Counter - params:', params);
            },
            
            onDidUpdate(params) {
                console.log('did update Counter - params:', params);
            },
            
            onWillUnmount(params) {
                console.log('will unmount Counter - params:', params);
            },
            
            render({ props, state }) {
                 return (
                    htm('span',
                        {style: props.style},
                        htm('button',
                            { onClick: () => ctrl.increase(-1) },
                            '-'),
                        
                        htm('div',
                            { style: {width: '30px', display: 'inline-block', textAlign: 'center' }},
                            CounterLabel({value: state.counterValue})),
                            
                        htm('button',
                            { onClick: () => ctrl.increase(1) } ,
                            '+'))
                );
            },
            
            reset(value) {
                ctrl.reset(value);
            }
        };
    }
});

const CounterCtrl = defineComponent({
    name: 'CounterCtrl',
    
    initiate() {
        let counter = null;
 
        return {
            render() {    
                return (
                    htm("div",
                        null,
                        htm('button', {onClick: () => counter.reset(0) }, 'Reset to 0'),
                        ' ',
                        Counter({ref: node => counter = node, style: {margin: '0 20px'}}),
                        ' ',
                        htm('button', {onClick: () => counter.reset(100) }, 'Reset to 100'))
                );           
            }
        };
    }
});

mount(CounterCtrl(), 'main-content');

/*
setTimeout(() => {
    mount(htm('div', null, 'done'), 'main-content'); 
}, 4000);
*/