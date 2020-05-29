import { initCountry, initDates } from './app/shared/initializer.js';
import { loadGraph } from './app/services/data-loader.js';
import { getDOMCountry, getDOMFromDate, getDOMToDate } from './app/services/dom-loader.js';
import { Country } from './app/domain/country.js';
window.onload = function () {
    const cCountry = Country.getInstance();
    const countrySelector = getDOMCountry();
    const fromDateInput = getDOMFromDate();
    const toDateInput = getDOMToDate();
    initCountry(countrySelector);
    initDates(fromDateInput, toDateInput);
    loadGraph();
    function UpdateCountry(ev) {
        let countryIndex = this.selectedIndex;
        if (countryIndex >= 0) {
            cCountry.code = this.options[countryIndex].value;
            cCountry.name = this.options[countryIndex].text;
        }
        loadGraph();
    }
    function UpdateLimitDate() {
        fromDateInput.max = toDateInput.value;
        toDateInput.min = fromDateInput.value;
    }
    ;
    function UpdateDate(ev) {
        const oldDate = this.getAttribute('old-date');
        if (oldDate != this.value) {
            this.setAttribute('old-date', this.value);
            UpdateLimitDate();
            loadGraph(true);
        }
    }
    countrySelector.addEventListener("change", UpdateCountry);
    fromDateInput.addEventListener("change", UpdateDate);
    toDateInput.addEventListener("change", UpdateDate);
};
