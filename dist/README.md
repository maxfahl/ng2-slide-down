# ng2-slide-down

`ng2-slide-down` is a simple and extremely lightweight angular 2+ module providing slide down functionality in the form of a directive.

## Features

- Animation can be turned off
- Animation duration is customizable
- Animation ease function is customizable
- Outputs for when the slide animation starts and ends
- AoT compilable

## Installation
To use `ng2-slide-down` in your project install it via [npm](https://www.npmjs.com/package/ng2-slide-down)
```
npm i ng2-slide-down --save
```

## Usage

Add it to you app module.

```typescript
@NgModule({
	imports: [
		...
		Ng2SlideDownModule
	]
})
export class AppModule {}
```

Include it in your template on any block element.

```html
<div [slide-down]="contentVisible">
	...
</div>
```

Additional inputs:

- `[slide-down-animated]="boolean"`
	- If the slide down should be animated (defaults to `true`)
- `[slide-down-duration]="number"`
	- The slide animation duration in seconds (defaults to `0.25`)
- `[slide-down-easing]="string"`
	- The slide animation ease function (defaults to `"ease-out"`)

Outputs:

- `(slide-start)="slideStart($event)"`
	- Emitted before the slide animation starts, the value emitted is a boolean indicating if the content is currently visible.
- `(slide-end)="slideEnd($event)"`
	- Emitted when the slide animation has finished, the value emitted is a boolean indicating if the content is currently visible.
	
## Worth noting

1. Elements with the slide-down directive cannot have vertical padding applied to them. If this is required just wrap another div inside this element and apply padding to that div.
2. Direct children of the element with the slide-down directive should be styled as a block (or flex), if you need to float the children in any way please wrap another element inside it and float its children.

```html
<!-- No vertical padding allowed here -->
<div [slide-down]="contentVisible">
	
	<!-- Wrapped div with padding -->
	<div style="padding: 20px 0;" class="clearfix">
	
		<!-- Floated children not direct children -->
		<div style="float: left;">...</div>
		...
	</div>
</div>
```