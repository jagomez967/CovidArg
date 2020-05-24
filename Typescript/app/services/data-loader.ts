import {CountryApi} from '../global.js';
import {getAsyncData,isDateBetween,formatDate} from '../shared/utils.js';

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
  