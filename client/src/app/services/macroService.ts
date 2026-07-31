import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MacroService {
    apiBaseUrl: string = environment.apiUrl + '/nutrition'; // Base URL for the macros API, defined in the environment configuration

    
    constructor(private http: HttpClient) { }
    
    async getMacros(query: string): Promise<any> {
        return await firstValueFrom(
            this.http.get(`${this.apiBaseUrl}`, 
                { params : { query } }) // Make a GET request to the macros API with the query as a parameter
        );
    }
}
    