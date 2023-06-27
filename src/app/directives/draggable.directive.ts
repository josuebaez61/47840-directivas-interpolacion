import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Renderer2 } from '@angular/core';
import { Subscription, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  private element: HTMLElement;

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
  ) {
    this.element = this.elementRef.nativeElement as HTMLElement;
  }

  ngOnInit(): void {
    this.initDrag();
  }

  initDrag(): void {
    this.renderer2.setStyle(this.element, 'cursor', 'grab');
    // 1
    const dragStart$ = fromEvent<MouseEvent>(this.element, 'mousedown');
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup');
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(dragEnd$)
    );

    // 2
    let initialX: number,
      initialY: number,
      currentX = 0,
      currentY = 0;

    let dragSub: Subscription;

    // 3
    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      this.renderer2.setStyle(this.element, 'cursor', 'grabbing');

      // 4
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        this.element.style.transform =
          'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)';
      });
    });

    // 5
    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      this.renderer2.setStyle(this.element, 'cursor', 'unset');
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    // 6
    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub!,
      dragEndSub,
    ]);
  }
}
