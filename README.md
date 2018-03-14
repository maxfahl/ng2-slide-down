# ng2-slide-down

`ng2-slide-down` is a simple and extremely lightweight angular 2+ module providing slide down functionality in the package of a directive.

## Features

- Customizable animation duration
- Customizable animation easing
- Optional animation
- Outputs for when the slide animation starts and ends
- AoT compilable

## Installation
To use `ng2-slide-down` in your project install it via [npm](https://www.npmjs.com/package/ng2-slide-down):
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
<div [slide-down]="slideDownVisible">
	...
</div>
```

Additional inputs:

- `[slide-down-animated]="boolean"`
	- If the slide down should be animated or not (defaults to `true`)
- `[slide-down-duration]="number"`
	- The slide animation duration in seconds (defaults to `0.25`)
- `[slide-down-easing]="string"`
	- The slide animation ease function (defaults to `"ease-out"`)

Outputs:

- `(slide-start)="slideStart($event)"`
	- Emitted before the slide animation starts, the value emitted is a boolean indicating if the content is currently visible or not.
- `(slide-end)="slideStart($event)"`
	- Emitted when the slide animation has finished, , the value emitted is a boolean indicating if the content is currently visible or not.