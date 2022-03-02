import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Injectable, Injector } from '@angular/core';

import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector);
  }

  create(entry: Entry): Observable<Entry> {
    const { categoryId } = entry;

    return this.categoryService.getById(categoryId).pipe(
      // Merga o retorno da categoria com o entry
      mergeMap(category => {
        entry.category = category;
        return super.create(entry);
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    const { categoryId } = entry;

    return this.categoryService.getById(categoryId).pipe(
      // Merga o retorno da categoria com o entry
      mergeMap(category => {
        entry.category = category;
        return super.create(entry);
      })
    );
  }


  // *** PROTECTED METHOD's ***
  protected jsonDataToResources(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(el => entries.push(Object.assign(new Entry(), el)));
    return entries;
  }

  protected jsonDataToResource(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}
