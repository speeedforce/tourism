import { Api } from '../../services/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IForum } from '../../types/core';

@Injectable({
  providedIn: 'root'
})
export class ForumService extends Api {

  constructor(private http: HttpClient) {
   super();
  }

  get(): Observable<IForum> {
     return this.http.get<IForum>(`${this.APIURL}/forum`);
  }

}
