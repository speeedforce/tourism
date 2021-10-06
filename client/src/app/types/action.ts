import { Observable } from "rxjs";
import { IArticle, IArticleInput } from "./core";

export interface IArticleService {
    getById(id: number): Observable<IArticle>;
    create(article: IArticleInput): Observable<IArticle>;
    edit(id: number, article: IArticleInput): Observable<IArticle>;
    delete(id: number): Observable<boolean>;
}
