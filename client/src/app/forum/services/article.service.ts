
import { IArticleService } from './../../types/action';
import { Api } from '../../services/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticle, IArticleInput } from '../../types/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends Api implements IArticleService {


  constructor(private http: HttpClient) { 
    super();
  }

  getById(id: number): Observable<IArticle> {
    return this.http.get<IArticle>(`${this.APIURL}/article/${id}`);
  }

  create(articleInput: any): Observable<IArticle> {
    return this.http.post<IArticle>(`${this.APIURL}/article`, articleInput);
  }

  edit(id: number, value: IArticleInput): Observable<IArticle> {
    return this.http.put<IArticle>(`${this.APIURL}/article/${id}`, value);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete(`${this.APIURL}/article/${id}`)
    .pipe(map(response => {
      return response === id;
    }));
  }
  
}
