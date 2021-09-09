import { Observable } from "rxjs";
import { IForum, IArticle, IArticleInput } from "./core";

export interface IForumService {
    get(): Observable<IForum>;
    edit(): Observable<IForum>;
}

export interface IArticleService {
    getById(id: number): Observable<IArticle>;
    post(article: IArticleInput): Observable<IArticle>;
    edit(article: IArticleInput): Observable<IArticle>;
    delete(id: number): Observable<void>;

}
