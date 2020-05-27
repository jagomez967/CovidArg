import {CountryApi} from '../global.js';
import {getAsyncData,isDateBetween,formatDate} from '../shared/utils.js';
import {renderGrafico} from './graph-render.js';
import { getDOMFromDate, getDOMToDate } from './dom-loader.js';
import { Country } from '../domain/country.js';

interface IDayData {
    x: string;
    y: number;
}

interface ICountryStats{
    Country: string;
    Lat: number;
    Lon: number;
    Cases: number;
    Status: string;
    Date: string;
}

let rawDataCached = {};

export async function cargarArrayDatos(pais: string, tipo: string, fechaDesde: string, fechaHasta: string, isCached: boolean): Promise<IDayData[]> {
    const url: string = CountryApi(pais,tipo);
    let rawData:Array<ICountryStats>;
  
    if (isCached === false || rawDataCached.hasOwnProperty(tipo) === false) {
      rawData = await getAsyncData(url);
      rawDataCached[tipo] = rawData;
    } else {
      rawData = rawDataCached[tipo];
    }
  
    let returnValue = rawData
      .filter((x) => isDateBetween(x.Date, fechaDesde, fechaHasta) === true)
      .map((x) => {
        const dayData :IDayData = {x: formatDate(x.Date, "/"), y: x.Cases};
        return dayData;
      });
    return returnValue;
  }
  

  export async function cargarGrafico(isCached = false): Promise<void> {
    let cCountry = Country.getInstance();
    let pais: string = cCountry;
    let nombrePais: string = cCountry;
    const fechaDesdeRaw = getDOMFromDate().value;
    const fechaHastaRaw = getDOMToDate().value;
    
    let fechaDesde = new Date(fechaDesdeRaw).toISOString();
    let fechaHasta = new Date(fechaHastaRaw).toISOString();
  
    let dataCasos = await cargarArrayDatos(
      pais,
      "confirmed",
      fechaDesde,
      fechaHasta,
      isCached
    );
    let dataRecuperados = await cargarArrayDatos(
      pais,
      "recovered",
      fechaDesde,
      fechaHasta,
      isCached
    );
    let dataDecesos = await cargarArrayDatos(
      pais,
      "deaths",
      fechaDesde,
      fechaHasta,
      isCached
    );
  
    let ChartHtml:Element = document.querySelector("#chart");
    renderGrafico(nombrePais, dataCasos, dataDecesos, dataRecuperados,ChartHtml);
  }