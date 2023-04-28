import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFullScreen]'
})
export class FullScreenDirective implements OnChanges {
  @Input("appScreenfull") fullscreenState!: boolean;
  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes["fullscreenState"].isFirstChange()) {
      if (this.fullscreenState) {
        const element: any = this.el.nativeElement;
        const requestMethod =
          element.requestFullscreen ||
          element.webkitRequestFullScreen ||
          element.mozRequestFullScreen ||
          element.msRequestFullScreen;

        if (requestMethod) {
          // Native full screen.
          requestMethod.call(element);
        } else {
          return null;
        }
      } else {
        const element: any = document;
        const requestMethod =
          element.cancelFullscreen ||
          element.webkitExitFullscreen ||
          element.webkitCancelFullScreen ||
          element.mozCancelFullScreen ||
          element.msExitFullScreen;

        if (requestMethod) {
          // Native Cancel full screen.
          requestMethod.call(element);
        } else {
          return null;
        }
      }
    }
  }

}
