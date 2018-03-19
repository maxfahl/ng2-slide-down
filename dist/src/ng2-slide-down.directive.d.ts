import { ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
export declare class Ng2SlideDownDirective implements OnDestroy {
    private elRef;
    private renderer;
    private _visible;
    private _initialized;
    private _animationTimeout;
    animated: boolean;
    duration: number;
    easing: string;
    slideDown: boolean;
    /**
     * Emitted when starting to show or hide content.
     *
     * Value emitted indicates if the content is visible or not.
     */
    slideStart: EventEmitter<boolean>;
    /**
     * Emitted when the show or hide animation has finished.
     *
     * Value emitted indicates if the content is visible or not.
     */
    slideEnd: EventEmitter<boolean>;
    constructor(elRef: ElementRef, renderer: Renderer2);
    private showOrHide();
    private show();
    private hide();
    /**
     * Returns the accumulated height of all children.
     */
    private getHeight();
    /**
     * Only animate after the initial status has been set.
     */
    private shouldAnimate();
    private clearAnimationTimer();
    /**
     * Wait two cycles of requestAnimationFrame to be sure styles
     * has been applied before continuing with whatever..
     */
    private waitDOMRender(cb);
    private readonly element;
    /**
     * Return all of my element's children as an array.
     */
    private readonly elementChildren;
    private readonly durationMs;
    /**
     * Clean-up.
     */
    ngOnDestroy(): void;
}
