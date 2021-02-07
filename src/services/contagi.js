import { sortedArray } from "./../utilities/formatter";

/**
 * Call web api and retrieve data for contagi
 */
export const getSortedData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
    if (response) {
        const jsResponse = await response.json();
        return sortedArray([...jsResponse]);
    } else {
        console.warn('no data fetch')
        return null;
    }
};