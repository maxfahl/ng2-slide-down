/*
 * Copyright (c) PIXILAB Technologies AB, Sweden (http://pixilab.se). All Rights Reserved.
 * Created 2018 by Max Fahl.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { Ng2SlideDownDirective } from './ng2-slide-down.directive';

const commonDeclarations = [
	Ng2SlideDownDirective
];

@NgModule({
	imports: [

	],
	declarations: [
		...commonDeclarations
	],
	exports: [
		...commonDeclarations
	]
})
export class Ng2SlideDownModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: Ng2SlideDownModule
		};
	}
}
