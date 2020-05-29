import { PAIS_DEFAULT } from '../global.js';
export class Country {
    constructor() {
        this.code = PAIS_DEFAULT;
        this.name = PAIS_DEFAULT;
    }
    static getInstance() {
        if (!Country.instance) {
            Country.instance = new Country();
        }
        return Country.instance;
    }
}
