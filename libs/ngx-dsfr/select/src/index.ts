/**
 * Angular imports
 */
import { InjectionToken } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const COMPONENT_PORTAL_DATA = new InjectionToken<Record<string, any>>(
  'An object representing data you might need to provide to a Component displayed in a PortalOutlet'
);

export { DsfrSelectComponent, SelectOption } from './lib/select.component';
export * from './lib/select.module';