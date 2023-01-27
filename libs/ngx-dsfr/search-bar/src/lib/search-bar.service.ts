/**
 * Angular imports
 */
import { InjectionToken } from '@angular/core';

/**
 * 3rd-party imports
 */
import { Observable } from 'rxjs';

/**
 * Internal imports
 */
import { ItemResult } from './search-bar.component';

export interface DsfrSearchBarService {
  search: (query: string) => Observable<ItemResult[]>;
}

export const DSFR_SEARCH_BAR_SERVICE_TOKEN =
  new InjectionToken<DsfrSearchBarService>(
    'A service that can be used by the DsfrSearchBarComponent for autocompletion'
  );
