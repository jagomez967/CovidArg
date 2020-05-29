import { initCountry, initDates } from './app/shared/initializer.js';
import { loadGraph } from './app/services/data-loader.js';
import { getDOMCountry, getDOMFromDate, getDOMToDate} from './app/services/dom-loader.js';
import { Country} from './app/domain/country.js';

window.onload = function () {
  const cCountry = Country.getInstance();

  //Elementos DOM
  const countrySelector: HTMLSelectElement = getDOMCountry();
  const fromDateInput: HTMLInputElement = getDOMFromDate();
  const toDateInput: HTMLInputElement = getDOMToDate();
  
  //Inicializo
  initCountry(countrySelector);
  initDates(fromDateInput, toDateInput);
  loadGraph();
  
  //Funciones
  function UpdateCountry(ev: Event):void{    
    let countryIndex = this.selectedIndex;
    if (countryIndex >= 0) {
      cCountry.code = this.options[countryIndex].value;
      cCountry.name = this.options[countryIndex].text;
    }
    loadGraph();
  }
  function UpdateLimitDate()
  {
    fromDateInput.max = toDateInput.value;
    toDateInput.min = fromDateInput.value;
  };
  function UpdateDate(ev: Event):void{
    const oldDate = (<HTMLInputElement>this).getAttribute('old-date');
    if(oldDate != this.value){
      (<HTMLInputElement>this).setAttribute('old-date',this.value);
      UpdateLimitDate();
      loadGraph(true); //Uso cache, porque que el endpoint ya me devolvió todas las fechas
    }      
  }

  //EventListeners
  countrySelector.addEventListener("change",UpdateCountry);  
  fromDateInput.addEventListener("change", UpdateDate);
  toDateInput.addEventListener("change", UpdateDate);
};