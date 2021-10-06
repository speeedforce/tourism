import { IForumService } from '../../types/action';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IForum } from '../../types/core';
import { environment } from 'src/environments/environment';
import { AppSettings } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ForumService implements IForumService {

  private APIURL = AppSettings.API_URL;
  constructor(private http: HttpClient) {
   console.log(this.APIURL);
  }

  get(): Observable<IForum> {
     return this.http.get<IForum>(`${this.APIURL}/forum`);
  }
  edit(): Observable<IForum> {
    throw new Error('Method not implemented.');
  }

}
