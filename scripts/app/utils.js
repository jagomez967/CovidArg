"use strict";

export async function getAsyncData(url) {
  let fetchData = await fetch(url, {
    method: "Get",
    cache: "force-cache"
  });
  return fetchData.json();
}

/*Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};*/

function dateToUtc(fecha) {
  let date = new Date(fecha);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export function isDateBetween(currentDate, minDate, maxDate) {
  let dHasta = dateToUtc(maxDate);
  let dDesde = dateToUtc(minDate);
  let dCurr = dateToUtc(currentDate);

  return dCurr >= dDesde && dHasta >= dCurr;
}

export function sortAlphabetical(a, b) {
  if (a > b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}

export function formatDate(fecha, separador) {
  let d = dateToUtc(fecha);

  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join(separador);
}
