/**
 * Angular imports
 */
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[routerLinkActive]'
})
export class RouterLinkActiveDirectiveStub {
  @Input() routerLinkActiveOptions: any;
}
