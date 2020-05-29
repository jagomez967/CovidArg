
export function getDOMCountry() : HTMLSelectElement{
    return <HTMLSelectElement>document.getElementById("paises");
}
export function getDOMFromDate() : HTMLInputElement{
    return <HTMLInputElement>document.getElementById("fechadesde");
}
export function getDOMToDate() : HTMLInputElement{
    return <HTMLInputElement>document.getElementById("fechahasta");
}
export function getDOMChart() : Element{
    return <Element>document.querySelector("#chart");
}
