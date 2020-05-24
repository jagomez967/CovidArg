import { CountryApi } from '../global.js';
import { getAsyncData, isDateBetween, formatDate } from '../shared/utils.js';
let rawDataCached = {};
export async function cargarArrayDatos(pais, tipo, fechaDesde, fechaHasta, isCached) {
    const url = CountryApi(pais, tipo);
    let rawData;
    if (isCached === false || rawDataCached.hasOwnProperty(tipo) === false) {
        rawData = await getAsyncData(url);
        rawDataCached[tipo] = rawData;
    }
    else {
        rawData = rawDataCached[tipo];
    }
    let returnValue = rawData
        .filter((x) => isDateBetween(x.Date, fechaDesde, fechaHasta) === true)
        .map((x) => {
        const dayData = { x: formatDate(x.Date, "/"), y: x.Cases };
        return dayData;
    });
    return returnValue;
}
