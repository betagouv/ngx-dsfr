/**
 * Angular imports
 */
import { Injectable } from '@angular/core';

/**
 * 3rd party imports
 */
import { DsfrSearchBarService, ItemResult } from '@betagouv/ngx-dsfr/search-bar';
import { Observable, of } from 'rxjs';

/**
 * Internal imports
 */
import { COUNTRIES } from './data-mock';

@Injectable()
export class TestSearchService implements DsfrSearchBarService {

  search(query: string): Observable<ItemResult[]> {
    const results: ItemResult[] = COUNTRIES.filter((element: ItemResult) => {
      return element.label.toLowerCase().includes(query.toLowerCase())
    });
    return of(results);
  }

}
