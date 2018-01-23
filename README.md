# Direct To Sides

This library can be used to dynamically ensure all child elements of a given CSS selector have their direction property set according to their position relative to their parent. On page-load the elements' positions are measured, elements nearest the left edge of thier parent are set direction: ltr, elements nearest the right edge of their parent are set direction: rtl, and if a tolerance value is provided elements further than the tolerance value from either edge are set direction: inherit. On a window resize (or orientation change on mobile) the positions are measured again and the directions reset to accomodate any shift in layout caused by the change in window size.

Additional triggers can be added via [LayoutQueue](https://github.com/davejtoews/layout-queue).

##  Installation

Install via npm or yarn.

    npm install direct-to-sides

OR

	yarn add direct-to-sides

Then require this module within your javascript:

    var DirectToSides = require('direct-to-sides');

## Basic Use

The methods of DirectToSides all use standard CSS selectors, (e.g. 'p', '.class', '#id'). To align the children of a element or set of elements, pass the selector to `init()`:

    DirectToSides.init(selector);

A tolerance value in pixels can be added as a second parameter to set any child elements to `direction: inherit;` if they are further than the given pixel value from either side. Without a tolerance value, all children will have a direction set either ltr, or rtl.

    DirectToSides.init(selector, tolerance);

A third boolean parameter can be added to reverse the orientation, and align elements to the center rather than the sides. This parameter will default to `false`.

    var reverse = true;
    DirectToSides.init(selector, tolerance, reverse);

A condition passed as a function can be added as a fourth parameter, allowing for a conditional applicaiton of the direction.

	var condition = function () { return false }
	DirectToSides.init(selector, tolerance, reverse, condition);

## Advanced use

To manually unset the direction of an elements children use `unset()`:

	DirectToSides.unset(selector);

To manually set the directionof an elements children use 'set()';

    DirectToSides.set(selector);

To add additional triggers for the execution of the queue see the documentation for [LayoutQueue](https://github.com/davejtoews/layout-queue);