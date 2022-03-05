import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BaseResouceModel } from 'src/app/shared/models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResouceModel> {

  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiPath}`).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiPath}/${id}`).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(`${this.apiPath}`, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  update(resource: T): Observable<T> {
    return this.http.put<T>(`${this.apiPath}/${resource.id}`, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiPath}/${id}`).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }


  // *** PROTECTED METHOD's ***
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    console.log('this: ', this);
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('ERROR NA REQUISIÇÃO: ', error);
    return throwError(error);
  }
}
