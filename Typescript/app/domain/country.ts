export interface ICountry{
    code: string;
    name: string;
}
//singleton, pues lo uso en varios lados.
export class Country implements ICountry{
    private static instance: Country;
    
    code: string;
    name: string;
    //Para evitar new, no si esto funciona en js/ts, pero we
    private constructor(){}
    public static getInstance(): Country{
        if(!Country.instance){
            Country.instance = new Country();
        }
        return Country.instance;
    }   
}