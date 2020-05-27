import * as Global from './app/global.js';
import { cargarPaises, cargarFechas } from './app/shared/initializer.js';
import { cargarGrafico } from './app/services/data-loader.js';
import { getDOMCountry, getDOMFromDate, getDOMToDate } from './app/services/dom-loader.js';
import { Singleton } from './app/services/static.js';
window.onload = function () {
    let pais = Global.PAIS_DEFAULT;
    let nombrePais = Global.PAIS_DEFAULT;
    const paisSelector = getDOMCountry();
    const fechaDesdeInput = getDOMFromDate();
    const fechaHastaInput = getDOMToDate();
    let a = Singleton.getInstance2();
    console.log(a);
    cargarPaises(paisSelector, pais);
    cargarFechas(fechaDesdeInput, fechaHastaInput);
    cargarGrafico(pais, nombrePais);
    paisSelector.addEventListener("change", function () {
        let indicePais = paisSelector.selectedIndex;
        if (indicePais >= 0) {
            pais = paisSelector.options[indicePais].value;
            nombrePais = paisSelector.options[indicePais].text;
        }
        cargarGrafico(pais, nombrePais);
    });
    let oldDateDesde = fechaDesdeInput.value;
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
            }
            else {
                cargarGrafico(pais, nombrePais, true);
            }
        }
    });
    let olddateHasta = fechaHastaInput.value;
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
            }
            else {
                cargarGrafico(pais, nombrePais, true);
            }
        }
    });
};
