import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) PIXILAB Technologies AB, Sweden (http://pixilab.se). All Rights Reserved.
 * Created 2018 by Max Fahl.
 */
class Ng2SlideDownDirective {
    /**
     * @param {?} elRef
     * @param {?} renderer
     */
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
        this._initialized = false;
        this.animated = true;
        this.duration = .25;
        this.easing = 'ease-out';
        this.slideStart = new EventEmitter();
        this.slideEnd = new EventEmitter();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set slideDown(val) {
        if (this._visible !== val) {
            this._visible = val;
            this.showOrHide();
            this._initialized = true;
        }
    }
    /**
     * @return {?}
     */
    showOrHide() {
        if (this._visible)
            this.show();
        else
            this.hide();
        this.slideStart.emit(this._visible);
    }
    /**
     * @return {?}
     */
    show() {
        this.clearAnimationTimer();
        const /** @type {?} */ doAnimate = this.shouldAnimate();
        const /** @type {?} */ animationDuration = doAnimate ? this.durationMs : 0;
        this.renderer.setStyle(this.element, 'overflowY', 'hidden');
        if (doAnimate) {
            this.renderer.setStyle(this.element, 'transitionProperty', 'height');
            this.renderer.setStyle(this.element, 'transitionDuration', `${this.durationMs}ms`);
            this.renderer.setStyle(this.element, 'transitionTimingFunction', this.easing);
        }
        this.waitDOMRender(() => {
            this.renderer.setStyle(this.element, 'height', `${this.getHeight()}px`);
            this._animationTimeout = window.setTimeout(() => {
                this.renderer.setStyle(this.element, 'overflowY', null);
                this.renderer.setStyle(this.element, 'transition', null);
                this.renderer.setStyle(this.element, 'height', null);
                this.slideEnd.emit(this._visible);
            }, animationDuration);
        });
    }
    /**
     * @return {?}
     */
    hide() {
        this.clearAnimationTimer();
        const /** @type {?} */ doAnimate = this.shouldAnimate();
        const /** @type {?} */ animationDuration = doAnimate ? this.durationMs : 0;
        this.renderer.setStyle(this.element, 'overflowY', 'hidden');
        this.renderer.setStyle(this.element, 'height', `${this.getHeight()}px`);
        if (doAnimate) {
            this.renderer.setStyle(this.element, 'transitionProperty', 'height');
            this.renderer.setStyle(this.element, 'transitionDuration', `${this.durationMs}ms`);
            this.renderer.setStyle(this.element, 'transitionTimingFunction', this.easing);
        }
        this.waitDOMRender(() => {
            this.renderer.setStyle(this.element, 'height', '0px');
            this._animationTimeout = window.setTimeout(() => {
                this.renderer.setStyle(this.element, 'transition', null);
                this.slideEnd.emit(this._visible);
            }, animationDuration);
        });
    }
    /**
     * Returns the accumulated height of all children.
     * @return {?}
     */
    getHeight() {
        let /** @type {?} */ height = 0;
        this.elementChildren.forEach(child => height += child.getBoundingClientRect().height);
        return height;
    }
    /**
     * Only animate after the initial status has been set.
     * @return {?}
     */
    shouldAnimate() {
        return this._initialized && this.animated;
    }
    /**
     * @return {?}
     */
    clearAnimationTimer() {
        if (this._animationTimeout !== undefined) {
            window.clearTimeout(this._animationTimeout);
            this._animationTimeout = undefined;
        }
    }
    /**
     * Wait two cycles of requestAnimationFrame to be sure styles
     * has been applied before continuing with whatever..
     * @param {?} cb
     * @return {?}
     */
    waitDOMRender(cb) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                cb();
            });
        });
    }
    /**
     * @return {?}
     */
    get element() {
        return this.elRef.nativeElement;
    }
    /**
     * Return all of my element's children as an array.
     * @return {?}
     */
    get elementChildren() {
        return Array.prototype.slice.call(this.element.children);
    }
    /**
     * @return {?}
     */
    get durationMs() {
        return this.duration * 1000;
    }
    /**
     * Clean-up.
     * @return {?}
     */
    ngOnDestroy() {
        this.clearAnimationTimer();
    }
}
Ng2SlideDownDirective.decorators = [
    { type: Directive, args: [{ selector: '[slide-down]' },] },
];
/** @nocollapse */
Ng2SlideDownDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
Ng2SlideDownDirective.propDecorators = {
    "animated": [{ type: Input, args: ['slide-down-animated',] },],
    "duration": [{ type: Input, args: ['slide-down-duration',] },],
    "easing": [{ type: Input, args: ['slide-down-easing',] },],
    "slideDown": [{ type: Input, args: ['slide-down',] },],
    "slideStart": [{ type: Output, args: ['slide-start',] },],
    "slideEnd": [{ type: Output, args: ['slide-end',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) PIXILAB Technologies AB, Sweden (http://pixilab.se). All Rights Reserved.
 * Created 2018 by Max Fahl.
 */
const commonDeclarations = [
    Ng2SlideDownDirective
];
class Ng2SlideDownModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: Ng2SlideDownModule
        };
    }
}
Ng2SlideDownModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ...commonDeclarations
                ],
                exports: [
                    ...commonDeclarations
                ]
            },] },
];
/** @nocollapse */
Ng2SlideDownModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Copyright (c) PIXILAB Technologies AB, Sweden (http://pixilab.se). All Rights Reserved.
 * Created 2018 by Max Fahl.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { Ng2SlideDownModule, Ng2SlideDownDirective };
//# sourceMappingURL=ng2-slide-down.js.map
