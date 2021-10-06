import { Api } from './api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/core';

@Injectable({ providedIn: 'root' })
export class UserService extends Api {
    
   
    constructor(private http: HttpClient) { 
        super();
    }

    getAll() {
        return this.http.get<User[]>(`${this.APIURL}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${this.APIURL}/users/${id}`);
    }
}