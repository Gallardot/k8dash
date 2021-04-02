import React from 'react';
import fromNow from '../../utils/dates';
import Sorter, {sortByDate} from '../sorter';
import ResourceSvg from '../../art/resourceSvg';
import {TODO} from '../../utils/types';

export function BootMetadataHeaders({sort}: { sort: TODO}) {
    return (
        <>
            <th className='th_icon optional_small'>
                <Sorter field='kind' sort={sort}>Type</Sorter>
            </th>
            <th>
                <Sorter field='metadata.name' sort={sort}>Name</Sorter>
            </th>
            <th>
                <Sorter field='spec.image' sort={sort}>Image</Sorter>
            </th>
            <th>
                <Sorter field='spec.version' sort={sort}>Version</Sorter>
            </th>
            <th>
                <Sorter field='spec.replicas' sort={sort}>Replicas</Sorter>
            </th>
            <th className='optional_medium'>
                <Sorter field={sortByDate} sort={sort}>Age</Sorter>
            </th>
        </>
    );
}

type BootMetadataColumnsProps = {
    item: TODO,
    href: string,
    resourceClass?: string
};

export function BootMetadataColumns({item, href, resourceClass}: BootMetadataColumnsProps) {
    return (
        <>
            <td className='td_icon optional_small'>
                <ResourceSvg
                    resource={item.kind}
                    className={resourceClass}
                />
                <div className='td_iconLabel metadata-type'>{item.kind}</div>
            </td>
            <td>
                {href ? (<a href={href}>{item.metadata.name}</a>) : item.metadata.name}
            </td>
            <td className='optional_medium'>
                { item.spec.image}
            </td>
            <td className='optional_medium'>
                { item.spec.version}
            </td>
            <td className='optional_medium'>
                { item.spec.replicas}
            </td>
            <td className='optional_medium'>
                {fromNow(item.metadata.creationTimestamp)}
            </td>
        </>
    );
}
