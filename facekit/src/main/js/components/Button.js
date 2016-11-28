import { defineComponent, createElement as htm, Types } from 'js-surface';

export default defineComponent({
    name: 'Button',
    
    properties: {
        text: {
            type: Types.string,
            defaultValue: ''
        }
    },
    
    render({ props }) {
        return (
            htm('button', null, props.text)
        );
    }
});
