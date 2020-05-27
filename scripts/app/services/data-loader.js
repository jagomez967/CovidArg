import { CountryApi } from '../global.js';
import { getAsyncData, isDateBetween, formatDate } from '../shared/utils.js';
import { renderGrafico } from './graph-render.js';
import { getDOMFromDate, getDOMToDate } from './dom-loader.js';
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
export async function cargarGrafico(pais, nombrePais, isCached = false) {
    const fechaDesdeRaw = getDOMFromDate().value;
    const fechaHastaRaw = getDOMToDate().value;
    let fechaDesde = new Date(fechaDesdeRaw).toISOString();
    let fechaHasta = new Date(fechaHastaRaw).toISOString();
    let dataCasos = await cargarArrayDatos(pais, "confirmed", fechaDesde, fechaHasta, isCached);
    let dataRecuperados = await cargarArrayDatos(pais, "recovered", fechaDesde, fechaHasta, isCached);
    let dataDecesos = await cargarArrayDatos(pais, "deaths", fechaDesde, fechaHasta, isCached);
    let ChartHtml = document.querySelector("#chart");
    renderGrafico(nombrePais, dataCasos, dataDecesos, dataRecuperados, ChartHtml);
}
