import { __spread } from 'tslib';
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, NgModule } from '@angular/core';

var Ng2SlideDownDirective = /** @class */ (function () {
    function Ng2SlideDownDirective(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
        this._initialized = false;
        this.animated = true;
        this.duration = .25;
        this.easing = 'ease-out';
        this.slideStart = new EventEmitter();
        this.slideEnd = new EventEmitter();
    }
    Object.defineProperty(Ng2SlideDownDirective.prototype, "slideDown", {
        set: function (val) {
            if (this._visible !== val) {
                this._visible = val;
                this.showOrHide();
                this._initialized = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Ng2SlideDownDirective.prototype.showOrHide = function () {
        if (this._visible)
            this.show();
        else
            this.hide();
        this.slideStart.emit(this._visible);
    };
    Ng2SlideDownDirective.prototype.show = function () {
        var _this = this;
        this.clearAnimationTimer();
        var doAnimate = this.shouldAnimate();
        var animationDuration = doAnimate ? this.durationMs : 0;
        this.renderer.setStyle(this.element, 'overflowY', 'hidden');
        if (doAnimate) {
            this.renderer.setStyle(this.element, 'transitionProperty', 'height');
            this.renderer.setStyle(this.element, 'transitionDuration', this.durationMs + "ms");
            this.renderer.setStyle(this.element, 'transitionTimingFunction', this.easing);
        }
        this.waitDOMRender(function () {
            _this.renderer.setStyle(_this.element, 'height', _this.getHeight() + "px");
            _this._animationTimeout = window.setTimeout(function () {
                _this.renderer.setStyle(_this.element, 'overflowY', null);
                _this.renderer.setStyle(_this.element, 'transition', null);
                _this.renderer.setStyle(_this.element, 'height', null);
                _this.slideEnd.emit(_this._visible);
            }, animationDuration);
        });
    };
    Ng2SlideDownDirective.prototype.hide = function () {
        var _this = this;
        this.clearAnimationTimer();
        var doAnimate = this.shouldAnimate();
        var animationDuration = doAnimate ? this.durationMs : 0;
        this.renderer.setStyle(this.element, 'overflowY', 'hidden');
        this.renderer.setStyle(this.element, 'height', this.getHeight() + "px");
        if (doAnimate) {
            this.renderer.setStyle(this.element, 'transitionProperty', 'height');
            this.renderer.setStyle(this.element, 'transitionDuration', this.durationMs + "ms");
            this.renderer.setStyle(this.element, 'transitionTimingFunction', this.easing);
        }
        this.waitDOMRender(function () {
            _this.renderer.setStyle(_this.element, 'height', '0px');
            _this._animationTimeout = window.setTimeout(function () {
                _this.renderer.setStyle(_this.element, 'transition', null);
                _this.slideEnd.emit(_this._visible);
            }, animationDuration);
        });
    };
    Ng2SlideDownDirective.prototype.getHeight = function () {
        var height = 0;
        this.elementChildren.forEach(function (child) { return height += child.getBoundingClientRect().height; });
        return height;
    };
    Ng2SlideDownDirective.prototype.shouldAnimate = function () {
        return this._initialized && this.animated;
    };
    Ng2SlideDownDirective.prototype.clearAnimationTimer = function () {
        if (this._animationTimeout !== undefined) {
            window.clearTimeout(this._animationTimeout);
            this._animationTimeout = undefined;
        }
    };
    Ng2SlideDownDirective.prototype.waitDOMRender = function (cb) {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                cb();
            });
        });
    };
    Object.defineProperty(Ng2SlideDownDirective.prototype, "element", {
        get: function () {
            return this.elRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ng2SlideDownDirective.prototype, "elementChildren", {
        get: function () {
            return Array.prototype.slice.call(this.element.children);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ng2SlideDownDirective.prototype, "durationMs", {
        get: function () {
            return this.duration * 1000;
        },
        enumerable: true,
        configurable: true
    });
    Ng2SlideDownDirective.prototype.ngOnDestroy = function () {
        this.clearAnimationTimer();
    };
    return Ng2SlideDownDirective;
}());
Ng2SlideDownDirective.decorators = [
    { type: Directive, args: [{ selector: '[slide-down]' },] },
];
Ng2SlideDownDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
Ng2SlideDownDirective.propDecorators = {
    "animated": [{ type: Input, args: ['slide-down-animated',] },],
    "duration": [{ type: Input, args: ['slide-down-duration',] },],
    "easing": [{ type: Input, args: ['slide-down-easing',] },],
    "slideDown": [{ type: Input, args: ['slide-down',] },],
    "slideStart": [{ type: Output, args: ['slide-start',] },],
    "slideEnd": [{ type: Output, args: ['slide-end',] },],
};
var commonDeclarations = [
    Ng2SlideDownDirective
];
var Ng2SlideDownModule = /** @class */ (function () {
    function Ng2SlideDownModule() {
    }
    Ng2SlideDownModule.forRoot = function () {
        return {
            ngModule: Ng2SlideDownModule
        };
    };
    return Ng2SlideDownModule;
}());
Ng2SlideDownModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: __spread(commonDeclarations),
                exports: __spread(commonDeclarations)
            },] },
];
Ng2SlideDownModule.ctorParameters = function () { return []; };

export { Ng2SlideDownModule, Ng2SlideDownDirective };
//# sourceMappingURL=ng2-slide-down.js.map
