import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath = 'api/categories';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiPath}`);

    // return this.http.get(`${this.apiPath}`).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToCategories)
    // );
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiPath}/${id}`);

    // return this.http.get(`${this.apiPath}/${id}`).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToCategory)
    // );
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiPath}`, category);

    // return this.http.post(`${this.apiPath}`, category).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToCategory)
    // );
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiPath}`, category).pipe(map(() => category));

    // return this.http.put(`${this.apiPath}/${category.id}`, category).pipe(
    //   catchError(this.handleError),
    //   map(() => category)
    // );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiPath}/${id}`);

    // return this.http.delete(`${this.apiPath}/${id}`).pipe(
    //   catchError(this.handleError),
    //   map(() => null)
    // );
  }


  // *** PRIVATE METHOD's ***
  // private jsonDataToCategory(jsonData: any): Category {
  //   return jsonData as Category;
  // }

  // private jsonDataToCategories(jsonData: any[]): Category[] {
  //   const categories: Category[] = [];
  //   jsonData.forEach(element => categories.push(element as Category));
  //   return categories;
  // }

  // private handleError(error: any): Observable<any> {
  //   console.log('ERROR NA REQUISIÇÃO: ', error);
  //   return throwError(error);
  // }
}
