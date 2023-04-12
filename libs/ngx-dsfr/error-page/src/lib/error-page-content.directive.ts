/**
 * Angular imports
 */
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dsfrErrorPageDescription]'
})
export class DsfrErrorPageDescriptionDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}

@Directive({
  selector: '[dsfrErrorPageSubDescription]'
})
export class DsfrErrorPageSubDescriptionDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}

