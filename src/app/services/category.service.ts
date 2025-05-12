import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../data/category';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
    private categoriesUrl = `${environment.apiUrl}v1/categories`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl)
        .pipe(catchError(this.handleError<Category[]>('getAll', [])));
    }

    update(category: Category): Observable<Category> {
        return this.http.put<Category>(this.categoriesUrl, category)
        .pipe(catchError(this.handleError<Category>('update', category)));
    }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        console.error(`${operation} failed: ${error.message}`, error);
        return of(result as T);
        };
    }
}
