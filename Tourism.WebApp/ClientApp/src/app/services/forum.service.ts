import { IForumService } from './../types/action';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IForum } from '../types/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService implements IForumService {

  
  constructor(private http: HttpClient) {
   
  }

  get(): Observable<IForum> {
     return this.http.get<IForum>(`${environment.APIURL}/forum`);
  }
  edit(): Observable<IForum> {
    throw new Error('Method not implemented.');
  }

}
