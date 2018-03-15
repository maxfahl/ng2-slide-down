/*
 * Copyright (c) PIXILAB Technologies AB, Sweden (http://pixilab.se). All Rights Reserved.
 * Created 2018 by Max Fahl.
 */

import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';

@Directive({ selector: '[slide-down]' })
export class Ng2SlideDownDirective implements OnDestroy {

	private _visible: boolean;
	private _initialized: boolean = false;
	private _animationTimeout: number;

	@Input('slide-down-animated')
	animated: boolean = true;

	@Input('slide-down-duration')
	duration: number = .25;

	@Input('slide-down-easing')
	easing: string = 'ease-out';

	@Input('slide-down')
	set slideDown(val: boolean) {
		if (this._visible !== val) {
			this._visible = val;
			this.showOrHide();
			this._initialized = true;
		}
	}

	/**
	 * Emitted when starting to show or hide content.
	 *
	 * Value emitted indicates if the content is visible or not.
	 */
	@Output('slide-start')
	slideStart: EventEmitter<boolean>;

	/**
	 * Emitted when the show or hide animation has finished.
	 *
	 * Value emitted indicates if the content is visible or not.
	 */
	@Output('slide-end')
	slideEnd: EventEmitter<boolean>;

	constructor(
		private elRef: ElementRef,
		private renderer: Renderer2
	) {
		this.slideStart = new EventEmitter<boolean>();
		this.slideEnd = new EventEmitter<boolean>();
	}

	private showOrHide(): void {
		if (this._visible)
			this.show();
		else
			this.hide();

		this.slideStart.emit(this._visible);
	}

	private show(): void {
		this.clearAnimationTimer();

		const doAnimate = this.shouldAnimate();
		const animationDuration = doAnimate ? this.durationMs : 0;

		this.renderer.setStyle(this.element, 'overflowY', 'hidden');
		if (doAnimate) {
			this.renderer.setStyle(this.element, 'transitionProperty', 'height');
			this.renderer.setStyle(this.element, 'transitionDuration', `${ this.durationMs }ms`);
			this.renderer.setStyle(this.element, 'transitionTimingFunction', this.easing);
		}

		this.waitDOMRender(() => {
			this.renderer.setStyle(this.element, 'height', `${ this.getHeight() }px`);
			this._animationTimeout = window.setTimeout(() => {
				this.renderer.setStyle(this.element, 'overflowY', null);
				this.renderer.setStyle(this.element, 'transition', null);
				this.renderer.setStyle(this.element, 'height', null);
				this.slideEnd.emit(this._visible);
			}, animationDuration);
		});
	}

	private hide(): void {
		this.clearAnimationTimer();

		const doAnimate = this.shouldAnimate();
		const animationDuration = doAnimate ? this.durationMs : 0;

		this.renderer.setStyle(this.element, 'overflowY', 'hidden');
		this.renderer.setStyle(this.element, 'height', `${ this.getHeight() }px`);
		if (doAnimate) {
			this.renderer.setStyle(this.element, 'transitionProperty', 'height');
			this.renderer.setStyle(this.element, 'transitionDuration', `${ this.durationMs }ms`);
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
	 */
	private getHeight(): number {
		let height = 0;
		this.elementChildren.forEach(child => height += child.getBoundingClientRect().height);
		return height;
	}

	/**
	 * Only animate after the initial status has been set.
	 */
	private shouldAnimate(): boolean {
		return this._initialized && this.animated;
	}

	private clearAnimationTimer(): void {
		if (this._animationTimeout !== undefined) {
	 		window.clearTimeout(this._animationTimeout);
			this._animationTimeout = undefined;
		}
	}

	/**
	 * Wait two cycles of requestAnimationFrame to be sure styles
	 * has been applied before continuing with whatever..
	 */
	private waitDOMRender(cb: Function): void {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				cb();
			});
		});
	}

	private get element(): HTMLElement {
		return this.elRef.nativeElement;
	}

	/**
	 * Return all of my element's children as an array.
	 */
	private get elementChildren(): HTMLElement[] {
		return Array.prototype.slice.call(this.element.children);
	}

	private get durationMs(): number {
		return this.duration * 1000;
	}

	/**
	 * Clean-up.
	 */
	public ngOnDestroy(): void {
		this.clearAnimationTimer();
	}
}
