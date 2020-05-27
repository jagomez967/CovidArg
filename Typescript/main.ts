import * as Global from './app/global.js';
import { cargarPaises, cargarFechas } from './app/shared/initializer.js';
import { cargarGrafico } from './app/services/data-loader.js';
import { getDOMCountry, getDOMFromDate, getDOMToDate} from './app/services/dom-loader.js';
import { Country} from './app/domain/country.js';

window.onload = function () {
  let cCountry = Country.getInstance();
  cCountry.code = Global.PAIS_DEFAULT;
  cCountry.name = Global.PAIS_DEFAULT;

  const paisSelector: HTMLSelectElement   = getDOMCountry();
  const fechaDesdeInput: HTMLInputElement = getDOMFromDate();
  const fechaHastaInput: HTMLInputElement = getDOMToDate();
  
  cargarPaises(paisSelector);
  cargarFechas(fechaDesdeInput, fechaHastaInput);
  cargarGrafico();

  //EventListeners
  paisSelector.addEventListener("change", function () {
    let indicePais = paisSelector.selectedIndex;
    if (indicePais >= 0) {
      cCountry.code = paisSelector.options[indicePais].value;
      cCountry.name = paisSelector.options[indicePais].text;
    }
    cargarGrafico();
  });

  let oldDateDesde:string = fechaDesdeInput.value;
  let isChangedDesde = function () {
    if (fechaDesdeInput.value !== oldDateDesde) {
      oldDateDesde = fechaDesdeInput.value;
      fechaHastaInput.min = fechaDesdeInput.value;
      return true;
    }
    return false;
  };
  fechaDesdeInput.addEventListener("change", function () {
    if (isChangedDesde()) {
      if (new Date(this.value) > new Date(fechaHastaInput.value)) {
        this.value = oldDateDesde;
        this.innerText = oldDateDesde;
      } else {
        cargarGrafico(true);
      }
    }
  });

  let olddateHasta:string  = fechaHastaInput.value;
  let isChangedHasta = function () {
    if (fechaHastaInput.value !== olddateHasta) {
      olddateHasta = fechaHastaInput.value;
      fechaDesdeInput.max = fechaHastaInput.value;
      return true;
    }
    return false;
  };
  fechaHastaInput.addEventListener("change", function () {
    if (isChangedHasta()) {
      if (new Date(this.value) < new Date(fechaDesdeInput.value)) {
        this.value = olddateHasta;
        this.innerText = olddateHasta;
      } else {
        cargarGrafico(true);
      }
    }
  });
};