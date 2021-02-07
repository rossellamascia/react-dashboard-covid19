import isArray from 'lodash/isArray';
import { firstDate, lastDate, splitDataByRegion } from './../utilities/formatter';

export const toPresentationData = (data) => {
    let newData = null;
    if(data && isArray(data) && data.length > 0) {
        newData = {
            firstDate: firstDate(data),
            lastDate: lastDate(data),
            recordCount: data.length,
            records: data.map(item => item),
        };
        return newData;
    } else {
        console.warn('toPresentationData - no data to transform');
        return newData;
    }
};

export const toSplitRegionsData = (data) => {
    let newData = null;
    if(data && isArray(data) && data.length) {
        let regions = splitDataByRegion(data);
        return regions;
    } else {
        console.warn('toSplitRegionsData - no data to transform');
        return newData;
    }
};