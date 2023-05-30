/**
 * Internal imports
 */
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * TypeScript entities and constants
 */
export function createTypeSafeTakeUntilDestroyed(destroyRef: DestroyRef) {
  return <T>() => takeUntilDestroyed<T>(destroyRef);
}
