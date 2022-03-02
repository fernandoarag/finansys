import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResouceModel } from 'src/app/shared/models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResouceModel> {

  protected http: HttpClient;

  constructor(protected apiPath: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiPath}`);

    // return this.http.get(`${this.apiPath}`).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToResources)
    // );
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiPath}/${id}`);

    // return this.http.get(`${this.apiPath}/${id}`).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToResource)
    // );
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(`${this.apiPath}`, resource);

    // return this.http.post(`${this.apiPath}`, resource).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToResource)
    // );
  }

  update(resource: T): Observable<T> {
    return this.http.put<T>(`${this.apiPath}`, resource).pipe(map(() => resource));

    // return this.http.put(`${this.apiPath}/${resource.id}`, resource).pipe(
    //   catchError(this.handleError),
    //   map(() => resource)
    // );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiPath}/${id}`);

    // return this.http.delete(`${this.apiPath}/${id}`).pipe(
    //   catchError(this.handleError),
    //   map(() => null)
    // );
  }


  // *** PROTECTED METHOD's ***
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(element as T));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  protected handleError(error: any): Observable<any> {
    console.log('ERROR NA REQUISIÇÃO: ', error);
    return throwError(error);
  }
}
