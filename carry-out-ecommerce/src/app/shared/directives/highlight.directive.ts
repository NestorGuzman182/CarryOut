import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  private element = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseleave() {
    this.element.nativeElement.style.backgroundColor = '';
  }

}
