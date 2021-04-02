import {ApiItem} from '../types';

export function filterByBoot<T extends ApiItem<any, any>>(items?: T[], owner?: ApiItem<any, any>): T[] | undefined {
    if (!items || !owner) return undefined;

    const {name} = owner.metadata;

    return items.filter((x) => {
        const {bootName} = x.metadata.labels;
        return name === bootName;
    });
}
