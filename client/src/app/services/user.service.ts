import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/core';
import { AppSettings } from '../app.settings';



@Injectable({ providedIn: 'root' })
export class UserService {
    
    private APIURL = environment.production ? AppSettings.API_URL : environment.APIURL;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.APIURL}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${this.APIURL}/users/${id}`);
    }
}