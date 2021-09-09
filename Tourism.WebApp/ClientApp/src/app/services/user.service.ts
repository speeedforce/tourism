import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/core';



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.APIURL}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.APIURL}/users/${id}`);
    }
}