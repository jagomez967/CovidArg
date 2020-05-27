export async function getAsyncData(url:string, cached: boolean = true) {
  let fetchData = await fetch(url, {
    method: "Get",
    cache: cached === true ? "force-cache":"default",
  });
  return fetchData.json();
}

export function isDateBetween(currentDate: string, minDate: string, maxDate: string): boolean {
  let dHasta: Date = dateToUtc(maxDate);
  let dDesde: Date = dateToUtc(minDate);
  let dCurr: Date = dateToUtc(currentDate);

  return dCurr >= dDesde && dHasta >= dCurr;
}

export function sortAlphabetical(a:string, b:string) {
  if (a > b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}

function dateToUtc(fecha:string): Date{
  let date: Date = new Date(fecha);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export function formatDate(fecha:string , separador:string): string {
  let d: Date = dateToUtc(fecha);

  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join(separador);
}
