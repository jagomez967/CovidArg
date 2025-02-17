export async function getAsyncData(url, cached = true) {
    let fetchData = await fetch(url, {
        method: "Get",
        cache: cached === true ? "force-cache" : "default",
    });
    return fetchData.json();
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
function dateToUtc(fecha) {
    let date = new Date(fecha);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}
export function formatDate(fecha, separador) {
    let d = dateToUtc(fecha);
    let month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;
    return [year, month, day].join(separador);
}
