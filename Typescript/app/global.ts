export const URLAPI = {
    Countries: "https://api.covid19api.com/countries"
};
export const PAIS_DEFAULT = "argentina";
export const CASOS_LABEL = "Casos";
export const DECESOS_LABEL = "Decesos";
export const RECUPERADOS_LABEL = "Recuperados";

export function CountryApi(pais: string, tipo: string) {
    return `https://api.covid19api.com/total/country/${pais}/status/${tipo}`;
}

