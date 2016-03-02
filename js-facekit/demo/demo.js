'use strict';


import Button from '../src/main/js/components/Button.js';
import ButtonGroup from '../src/main/js/components/ButtonGroup.js';
import Pager from '../src/main/js/components/Pager.js';
import Pagination from '../src/main/js/components/Pagination.js';
import PaginationInfo from '../src/main/js/components/PaginationInfo.js';
import Tabs from '../src/main/js/components/Tabs.js';
import Tab from '../src/main/js/components/Tab.js';
import VerticalNavi from '../src/main/js/components/VerticalNavi.js';

import {Component} from 'js-bling';
import {Seq} from 'js-prelude';

import {Observable, Subject} from 'rxjs';

import PaginationHelper from '../src/main/js/helpers/PaginationHelper.js';
import ComponentHelper from '../src/main/js/helpers/ComponentHelper.js';

import React from 'react';
import ReactDOM from 'react-dom';

const
    {createElement: dom, createEventBinder: binder} = Component,
    buttonTypes = ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'],
    sizes = ['large', 'default', 'small', 'extra-small'],
    exampleIcons = ['fa-calendar', 'fa-twitter', 'glyphicon-home', 'glyphicon-print'],
    iconPositions = ['left', 'top', 'right', 'bottom'];


const demoOfButtonsDisplay = (props, bind) => (
    dom('div',
        {className: 'container-fluid'},
        dom('div',
            {className: 'row'},
            dom('div',
                {className: 'col-md-2'},
                'Enabled buttons:'),
            ...Seq.from(buttonTypes).map(buttonType =>
                dom('div',
                    {className: 'col-md-1'},
                    Button({
                        text: buttonType,
                        type: buttonType,
                        onClick: () => alert('You clicked: ' + buttonType)})))),
        dom('div',
            {className: 'row'},
            dom('div',
                {className: 'col-md-2'},
                'Disabled buttons:'),
            ...Seq.from(buttonTypes).map(buttonType =>
                dom('div',
                    {className: 'col-md-1'},
                    Button({
                        text: buttonType,
                        type: buttonType,
                        disabled: true
                    }))
            )),

        dom('div',
            {className: 'row'},
            dom('div',
                {className: 'col-md-2'},
                'Buttons with icons'),
            ...Seq.from(exampleIcons).map(icon =>
                dom('div',
                    {className: 'col-md-1'},
                    Button({text: icon.replace(/^[^\-]+-/, ''), icon: icon})))),
        dom('div',
            {className: 'row'},
            dom('div',
                {className: 'col-md-2'},
                'Buttons with different icon positions'),
            ...Seq.from(iconPositions).map(iconPosition =>
                dom('div',
                    {className: 'col-md-1'},
                    Button({text: iconPosition, icon: 'fa-cab', iconPosition: iconPosition})))),

        dom('div',
            {className: 'row'},
            dom('div',
                {className: 'col-md-2'},
                'Links with different icon positions'),
            ...Seq.from(iconPositions).map(iconPosition =>
                dom('div',
                    {className: 'col-md-1'},
                    Button({
                        text: iconPosition,
                        icon: 'fa-cab',
                        iconPosition: iconPosition,
                        type: 'link'})))),
        dom('div',
            {className: 'row'},
            dom('div',
                {className: 'col-md-2'},
                'Button sizes:'),
            ...Seq.from(sizes).map(size =>
                dom('div', {className: 'col-md-1'},
                    Button({text: size, size: size})))),

        dom('div',
            {className: 'row'},
            dom('div', {className: 'col-md-2'},
                'Link sizes:'),
            ...Seq.from(sizes).map(size =>
                dom('div', {className: 'col-md-1'},
                    Button({text: size, size: size, type: 'link'})))),
        dom('div',
            {className: 'row'},
            dom('div',
                {className: 'col-md-2'},
                'Menu buttons:'),
            dom('button', {
                    className: 'col-md-2',
                    type: 'info', text: 'Dropdown button',
                    menu: [{text: 'Item 1'}]}),
            dom('button', {
                    className: 'col-md-2',
                    text: 'Split button',
                    onClick: () => alert('Juhuuu'),
                    menu: [{text: 'Item 1'}]})))
);

export const DemoOfButtons = Component.createFactory({
    typeId: 'DemoOfButtons',

    view: (behavior, {on, bind}) =>
        behavior.map(props => demoOfButtonsDisplay(props))
});


export const DemoOfButtonGroups = Component.createFactory({
    typeId: 'DemoOfButtonGroups',
    
    view: behavior => ({
        display: behavior.map(props =>
            dom('div',
                {className: 'container-fluid'},
                dom('div',
                    {className: 'row'},
                    ButtonGroup(
                        {className: 'col-md-2'},
                        Button({text: 'New'}),
                        Button({text: 'View'}),
                        Button({text: 'Edit'}),
                        Button({text: 'Delete'})
                    ),
                    ButtonGroup(
                        {className: 'col-md-2'},
                        Button({text: 'New', type: 'info'}),
                        Button({text: 'Edit', type: 'warning'}),
                        Button({text: 'Delete', type: 'danger'}),
                        Button({text: 'Export', type: 'success', xxxmenu: [{text: 'Juhu'}]})
                    ),
                    ButtonGroup(
                        {className: 'col-md-3'},
                        Button({text: 'Single Button', type: 'default'})))))
    })
});


export const DemoOfPagination = Component.createFactory({
    typeId: 'DemoOfPagination',
    
    defaultProps: {
        pageIndex: 0,
        pageSize: 25,
        totalItemCount: 744
    },
    
    model: actions => {return Observable.of({pageIdx: 1});
        return (
            actions
                .map(action => ({pageIdx: action}))
                .startWith({pageIdx: 0})
        );
    },
    
    view: (behavior, model) => {
        const
            changeEvents = new Subject(),
            onChange = binder((_, pageIndex) => {tagetPage: pageIndex}),
        
            display = 
                behavior.combineLatest(model, (props, state) =>
                    dom('div',
                        {className: 'container-fluid'},
                        ...Seq.range(1, 100).map(_ =>
                            dom('div',
                                {className: 'row'},
                                Pagination({
                                    className: 'col-md-3',
                                    pageIndex: model.pageIdx,
                                    pageSize: props.pageSize,
                                    totalItemCount: props.totalItemCount,
                                    onChange: onChange.bind(({targetPage}) => targetPage)
                                }),
                                Pager({
                                    className: 'col-md-3',
                                    pageIndex: model.pageIdx,
                                    pageSize: props.pageSize,
                                    totalItemCount: props.totalItemCount,
                                    onChange: evt => alert('juhu') 
                                })
                            ))));
        return {
            display,
            actions: changeEvents.asObservable()
        };
    }
});


const
    demo1 = DemoOfButtons(),
    demo2 = DemoOfButtonGroups(),
    demo3 = DemoOfPagination({
        pageIndex: 10,
        pageSize: 25,
        totalItemCount: 1000        
    }),
    demos = Tabs(null,
        Tab({caption: 'Buttons'}, demo1),
        Tab({caption: 'Button groups'}, demo2),
        Tab({caption: 'Pagination'}, demo3));
        
        
const demo = VerticalNavi({
    menu: [{
        caption: 'Module 1',
    }, {
        caption: 'Module 2'
    }, {
        caption: 'module 3'
    }]
});

Component.mount(
    demo3,
    'main-content');
