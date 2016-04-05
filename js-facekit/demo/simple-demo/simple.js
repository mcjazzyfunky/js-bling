'use strict';

import {Component, Processor, Publisher, commonView} from 'js-surface';
import {Objects, Seq, Storage} from 'js-prelude';

const {createElement: dom} = Component;


class ComponentStorage extends Storage {
    constructor(params) {
        super(params);

        this.modificationEvents.subscribe(event => {
            this.notify({type: 'update'});
        });
    }

    get initialState() {
        return {
            counter: 0
        }
    }

    getCounter() {
        return this.state.counter;
    }

    incrementCounter() {
        this.state = Objects.transform(this.state, {
            counter: {$update: n => n + 1}
        });
    }

    decrementCounter() {
        this.state = Objects.transform(this.state, {
            counter: {$update: n => n - 1}
        });
    }
}

const SimpleDemo = Component.createFactory({
    typeName: 'SimpleDemo',

    view: commonView({
        createStorage() {
            return new ComponentStorage();
        },

        render({props, ctrl}) {
            return (
                dom('div',
                    null,
                    dom('button', {
                        onClick: _ => ctrl.decrementCounter()
                    },
                    '-'),
                    dom('label',
                        null,
                        ctrl.getCounter()),
                    dom('button', {
                        onClick: _ => ctrl.incrementCounter()
                    },
                    '+'))
            );
        }
    })

 //   view: behavior => {
        /*
        const contentPublisher = new Publisher(subscriber => {
            subscriber.next(dom('div', null, 'Juhuuuuuu'));
            return () => {};
        });
        */
/*
        const
            contentPublisher = new Publisher(subscriber => {
                subscriber.next(dom('span', null, 'Starting...'));

                const intervalId = setInterval(() => {
                    subscriber.next(dom('div', null, '' + new Date));
                }, 1000);

                return () => clearInterval(intervalId);
            });


        return contentPublisher;
    }
 */
});

Component.mount(
    SimpleDemo({onUpdate: event => console.log(111, event)}),
    'main-content');
