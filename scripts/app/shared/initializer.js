import { URLAPI } from '../global.js';
import { formatDate, sortAlphabetical, getAsyncData } from './utils.js';
export async function cargarPaises(selectorPaises, paisInicial) {
    let listaPaises = await getAsyncData(URLAPI.Countries);
    listaPaises
        .sort((a, b) => sortAlphabetical(a.Country, b.Country))
        .reverse();
    listaPaises.forEach((pais) => {
        let paisElement = document.createElement("option");
        [paisElement.value, paisElement.innerHTML] = [pais.Slug, pais.Country];
        selectorPaises.appendChild(paisElement);
    });
    if (paisInicial) {
        selectorPaises.value = paisInicial;
    }
}
export function cargarFechas(inputDesde, inputHasta) {
    let dateDesde = new Date();
    dateDesde.setDate(dateDesde.getDate() - 7);
    inputDesde.value = inputHasta.min = formatDate(dateDesde.toString(), "-");
    let fechaHasta = formatDate(new Date().toString(), "-");
    inputHasta.value = inputDesde.max = inputHasta.max = fechaHasta;
}
