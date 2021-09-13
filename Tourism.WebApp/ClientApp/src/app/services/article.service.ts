import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticle, IArticleInput } from '../types/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<IArticle> {
    return this.http.get<IArticle>(`${environment.APIURL}/article/${id}`);
  }

  create(articleInput: IArticleInput): Observable<IArticle> {
    console.log(articleInput);
    return this.http.post<IArticle>(`${environment.APIURL}/article`, articleInput);
  }

  edit(id: number, value: IArticleInput): Observable<IArticle> {
    return this.http.put<IArticle>(`${environment.APIURL}/article/${id}`, value);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete(`${environment.APIURL}/article/${id}`)
    .pipe(map(response => {
      return response === id;
    }));
  }
}
