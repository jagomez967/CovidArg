import { URLAPI } from '../global.js';
import { formatDate, sortAlphabetical, getAsyncData } from './utils.js';
import { Country } from '../domain/country.js';
export async function initCountry(selectorPaises) {
    let cCountry = Country.getInstance();
    let listaPaises = await getAsyncData(URLAPI.Countries);
    listaPaises
        .sort((a, b) => sortAlphabetical(a.Country, b.Country))
        .reverse();
    listaPaises.forEach((pais) => {
        let paisElement = document.createElement("option");
        [paisElement.value, paisElement.innerHTML] = [pais.Slug, pais.Country];
        selectorPaises.appendChild(paisElement);
    });
    if (cCountry.code) {
        selectorPaises.value = cCountry.code;
    }
}
export function initDates(inputDesde, inputHasta) {
    let dateDesde = new Date();
    dateDesde.setDate(dateDesde.getDate() - 14);
    inputDesde.value = inputHasta.min = formatDate(dateDesde.toString(), "-");
    let fechaHasta = formatDate(new Date().toString(), "-");
    inputHasta.value = inputDesde.max = inputHasta.max = fechaHasta;
}
