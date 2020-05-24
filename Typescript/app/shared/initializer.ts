import {URLAPI} from '../global.js';
import {formatDate,sortAlphabetical,getAsyncData} from './utils.js';

interface ICountry{
  Country: string;
  Slug: string;
  ISO2: string;
}

export async function cargarPaises(selectorPaises:HTMLSelectElement, paisInicial:string): Promise<void> {
    let listaPaises: Array<ICountry>= await getAsyncData(URLAPI.Countries);

    listaPaises
      .sort((a, b) => sortAlphabetical(a.Country,b.Country))
      .reverse();

    listaPaises.forEach((pais) => {
      let paisElement: HTMLOptionElement = document.createElement("option");
      [paisElement.value, paisElement.innerHTML] = [pais.Slug, pais.Country];
      selectorPaises.appendChild(paisElement);
    });

    if (paisInicial) {
      selectorPaises.value = paisInicial;
    }
  }
  
  export function cargarFechas(inputDesde: HTMLInputElement, inputHasta:HTMLInputElement):void {
    let dateDesde: Date = new Date();
    dateDesde.setDate(dateDesde.getDate() - 7);
    inputDesde.value = inputHasta.min = formatDate(dateDesde.toString(), "-");      

    let fechaHasta: string = formatDate(new Date().toString(), "-");
    inputHasta.value = inputDesde.max = inputHasta.max = fechaHasta;
  }
