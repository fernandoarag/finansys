import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';


@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiPath = 'api/entries';
  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  getAll(): Observable<Entry[]> {
    // return this.http.get<Entry[]>(`${this.apiPath}`);

    return this.http.get(`${this.apiPath}`).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  getById(id: number): Observable<Entry> {
    return this.http.get<Entry>(`${this.apiPath}/${id}`);

    // return this.http.get(`${this.apiPath}/${id}`).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToEntry)
    // );
  }

  create(entry: Entry): Observable<Entry> {
    const { categoryId } = entry;

    return this.categoryService.getById(categoryId).pipe(
      // Merga o retorno da categoria com o entry
      mergeMap(category => {
        entry.category = category;
        return this.http.post<Entry>(`${this.apiPath}`, entry);
      })
    );

    // const { categoryId } = entry;
    // return this.categoryService.getById(categoryId).pipe(
    //   mergeMap(category => {
    //     entry.category = category;
    //     return this.http.post(`${this.apiPath}`, entry).pipe(
    //       catchError(this.handleError),
    //       map(this.jsonDataToEntry)
    //     );
    //   })
    // );

  }

  update(entry: Entry): Observable<Entry> {
    const { categoryId } = entry;

    return this.categoryService.getById(categoryId).pipe(
      // Merga o retorno da categoria com o entry
      mergeMap(category => {
        entry.category = category;
        return this.http.put<Entry>(`${this.apiPath}`, entry).pipe(map(() => entry));
      })
    );

    // return this.categoryService.getById(categoryId).pipe(
    //   mergeMap(category => {
    //     entry.category = category;
    //     return this.http.put(`${this.apiPath}/${entry.id}`, entry).pipe(
    //       catchError(this.handleError),
    //       map(() => entry)
    //     );
    //   })
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
  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(el => entries.push(Object.assign(new Entry(), el)));
    return entries;
  }

  private handleError(error: any): Observable<any> {
    console.log('ERROR NA REQUISIÇÃO: ', error);
    return throwError(error);
  }
}
