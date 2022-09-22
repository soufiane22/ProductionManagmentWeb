import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCalloutDirective]'
})
export class CalloutDirectiveDirective {

  constructor() { }

  @HostBinding('style.font-weight') fontWeight = 'normal';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.fontWeight = 'normal';
  }

}
