/**
 * Angular imports
 */
import { Injectable } from '@angular/core';

/**
 * 3rd-party imports
 */
import { Observable } from 'rxjs';

/**
 * Internal imports
 */
import { ItemResult } from './search-bar.component';

@Injectable()
export abstract class DsfrSearchBarService {

  constructor() { }

  /**
   * Returns a list of the result's search
   */
  abstract search(query: string): Observable<ItemResult[]>;

}
