/**
 * Angular imports
 */
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dsfrHeaderAction]'
})
export class DsfrHeaderActionDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
