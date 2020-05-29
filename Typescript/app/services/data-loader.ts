import {CountryApi} from '../global.js';
import { getAsyncData,isDateBetween,formatDate} from '../shared/utils.js';
import { renderGraph} from './graph-render.js';
import { getDOMFromDate, getDOMToDate, getDOMChart } from './dom-loader.js';
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


//Esto es una verga, cambiar a cache en localstorage o algo mejor.
let rawDataCached = {};

export async function loadArray(tipo: string, isCached: boolean = false): Promise<IDayData[]> {
  const cCountry = Country.getInstance();  
  const fromDate: string = new Date(getDOMFromDate().value).toISOString();
  const toDate: string = new Date(getDOMToDate().value).toISOString();
  const url: string = CountryApi(cCountry.code,tipo);

    let rawData:Array<ICountryStats>;
  
    if (isCached === false || rawDataCached.hasOwnProperty(tipo) === false) {
      rawData = await getAsyncData(url);
      rawDataCached[tipo] = rawData;
    } else {
      rawData = rawDataCached[tipo];
    }
  
    let returnValue = rawData
      .filter((x) => isDateBetween(x.Date, fromDate, toDate) === true)
      .map((x) => {
        const dayData :IDayData = {x: formatDate(x.Date, "/"), y: x.Cases};
        return dayData;
      });
    return returnValue;
  }
  export async function loadGraph(isCached = false): Promise<void> {
    const Confirmed = await loadArray('confirmed',isCached);
    const Deaths = await loadArray('deaths',isCached);
    const Recovered = await loadArray('recovered',isCached);

    renderGraph(Confirmed,Deaths,Recovered);
  }