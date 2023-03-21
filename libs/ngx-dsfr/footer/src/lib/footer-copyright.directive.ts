/**
 * Angular imports
 */
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dsfrFooterCopyright]'
})
export class DsfrFooterCopyrightDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}
