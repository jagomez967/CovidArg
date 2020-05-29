import {PAIS_DEFAULT} from '../global.js';    

export interface ICountry{
    code: string;
    name: string;
}
//singleton, pues lo uso en varios lados.
export class Country implements ICountry{
    private static instance: Country;    
    code: string;
    name: string;
    //Para evitar new, no si esto funciona en js/ts, instancio variables default
    private constructor(){
        this.code= PAIS_DEFAULT;
        this.name= PAIS_DEFAULT;
    }
    public static getInstance(): Country{
        if(!Country.instance){
            Country.instance = new Country();
        }
        return Country.instance;
    }   
}