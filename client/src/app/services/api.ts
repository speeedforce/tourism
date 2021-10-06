import { environment } from "src/environments/environment";

export class Api {

    protected APIURL: string;

    constructor() {
        this.APIURL = environment.APIURL;
        console.log(this.APIURL);
        if (environment.production) {
            this.APIURL = `http://${window.location.hostname}/tourism-api/api`;
        } 
    }
}
