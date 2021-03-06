'use strict';

import {Config, Objects, Seq} from 'js-prelude';
import ComponentHelper from '../helpers/ComponentHelper.js';
import PaginationHelper from '../helpers/PaginationHelper.js';
import {Surface} from 'js-surface';
import {SurfaceX} from 'js-surface-x';

const dom = Surface.createElement; 

export default SurfaceX.createFactory({
    typeName: 'FKPaginationInfo',
    
    properties: {
        type: {
            type: 'string', 
            defaultValue: 'infoAboutPage',
            options: ['infoAboutPage']
        },
        
        pageIndex: {
            type: 'number',
            defaultValue: null
        },

        pageSize: {
            type: 'number',
            defaultValue: null
        },
        
        totalItemCount: {
            type: 'number',
            defaultValue: null
        },

        className: {
            type: 'string',
            defaultValue: null
        }
    },

    render({props}) {
        const
            metrics = PaginationHelper.calcPaginationMetrics(
                props.get('pageIndex'),
                props.get('pageSize'),
                props.get('totalItemCount'));

        return (
            dom('div',
                {className: 'fk-pagination-info'},
                props.type !== 'infoAboutItems'
                    ? getPageInfo(metrics)
                    : getItemsInfo(metrics))
        );
    }
});

function getPageInfo(metrics) {
   return 'Page '
        + (metrics.pageIndex + 1)
        + (metrics.pageCount >= 0
            ? ' of '
            + metrics.pageCount : '');
}

function getItemsInfo(metrics) {
    const firstItemIndex = metrics.pageIndex !== -1 && metrics.pageCount !== -1
                ? metrics.pageIndex * metrics.pageSize
                : -1,
          
          lastItemIndex = firstItemIndex !== -1 && metrics.totalItemCount !== -1
                ? Math.min(
                    metrics.totalItemCount - 1, firstItemIndex + metrics.pageSize - 1)
                : -1;

    return (firstItemIndex + 1)
            +
            ' - '
            +(lastItemIndex + 1)
            + ' of '
            + metrics.totalItemCount;
}
