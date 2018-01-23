require('jsdom-global')();
var assert = require('chai').assert;
var DirectToSides = require('../DirectToSides.js');

describe('DirectToSides', function() {
	document.body.innerHTML = '<ul><li>one</li><li>two</li><li>three</li></ul>';
	
	var parent = document.querySelector('ul');
	var children = document.querySelectorAll('li');

	function setBoundingClientRect(element, left, right) {
		element.getBoundingClientRect = function() {
			return {
				left: left,
				right: right
			}
		}
	}

	it('should set direction', function() {
		setBoundingClientRect(parent, 0, 100);
		setBoundingClientRect(children[0], 10, 20);
		setBoundingClientRect(children[1], 45, 55);
		setBoundingClientRect(children[2], 80, 90);

		DirectToSides.set('ul');

		assert.equal(document.body.innerHTML, '<ul><li style="direction: ltr;">one</li><li style="direction: ltr;">two</li><li style="direction: rtl;">three</li></ul>');		
	});
	it('should unset direction', function() {
		DirectToSides.unset('ul');
		assert.equal(document.body.innerHTML, '<ul><li style="direction: inherit;">one</li><li style="direction: inherit;">two</li><li style="direction: inherit;">three</li></ul>');		
	});
	it('should set direction with respect to tolerance', function() {

		DirectToSides.set('ul', 20);
		assert.equal(document.body.innerHTML, '<ul><li style="direction: ltr;">one</li><li style="direction: inherit;">two</li><li style="direction: rtl;">three</li></ul>');		
	});
	it('should set direction on resize', function() {
		setBoundingClientRect(parent, 100, 200);
		setBoundingClientRect(children[0], 140, 150);
		setBoundingClientRect(children[1], 180, 190);
		setBoundingClientRect(children[2], 110, 120);

		DirectToSides.init('ul', 30);
		window.dispatchEvent(new Event('resize'));

		assert.equal(document.body.innerHTML, '<ul><li style="direction: inherit;">one</li><li style="direction: rtl;">two</li><li style="direction: ltr;">three</li></ul>');		
	});
	it('should set direction in reverse', function() {
		setBoundingClientRect(parent, 0, 100);
		setBoundingClientRect(children[0], 10, 20);
		setBoundingClientRect(children[1], 45, 55);
		setBoundingClientRect(children[2], 80, 90);

		DirectToSides.set('ul', null, true);

		assert.equal(document.body.innerHTML, '<ul><li style="direction: rtl;">one</li><li style="direction: rtl;">two</li><li style="direction: ltr;">three</li></ul>');		
	});
	it('should take conditions', function() {
		var condition = function() {
			return false;
		}
		DirectToSides.unset('ul');
		DirectToSides.set('ul', null, null, condition);
		assert.equal(document.body.innerHTML, '<ul><li style="direction: inherit;">one</li><li style="direction: inherit;">two</li><li style="direction: inherit;">three</li></ul>');
	});

});