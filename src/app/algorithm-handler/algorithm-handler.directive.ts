import  {Directive, ViewContainerRef} from '@angular/core'
@Directive({
  selector: '[alg-host]',
})
export class AlgDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}