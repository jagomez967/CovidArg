import { CountryApi } from '../global.js';
import { getAsyncData, isDateBetween, formatDate } from '../shared/utils.js';
import { renderGraph } from './graph-render.js';
import { getDOMFromDate, getDOMToDate } from './dom-loader.js';
import { Country } from '../domain/country.js';
let rawDataCached = {};
export async function loadArray(tipo, isCached = false) {
    const cCountry = Country.getInstance();
    const fromDate = new Date(getDOMFromDate().value).toISOString();
    const toDate = new Date(getDOMToDate().value).toISOString();
    const url = CountryApi(cCountry.code, tipo);
    let rawData;
    if (isCached === false || rawDataCached.hasOwnProperty(tipo) === false) {
        rawData = await getAsyncData(url);
        rawDataCached[tipo] = rawData;
    }
    else {
        rawData = rawDataCached[tipo];
    }
    let returnValue = rawData
        .filter((x) => isDateBetween(x.Date, fromDate, toDate) === true)
        .map((x) => {
        const dayData = { x: formatDate(x.Date, "/"), y: x.Cases };
        return dayData;
    });
    return returnValue;
}
export async function loadGraph(isCached = false) {
    const Confirmed = await loadArray('confirmed', isCached);
    const Deaths = await loadArray('deaths', isCached);
    const Recovered = await loadArray('recovered', isCached);
    renderGraph(Confirmed, Deaths, Recovered);
}
