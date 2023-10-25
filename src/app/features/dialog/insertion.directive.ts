import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[appInsertion]'
})
export class InsertionDirective {
  public viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
}
