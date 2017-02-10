require('jsdom-global')();
var assert = require('chai').assert;
var AlignToSides = require('../AlignToSides.js');

describe('AlignToSides', function() {
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

	it('should set alignment', function() {
		setBoundingClientRect(parent, 0, 100);
		setBoundingClientRect(children[0], 10, 20);
		setBoundingClientRect(children[1], 45, 55);
		setBoundingClientRect(children[2], 80, 90);

		AlignToSides.set('ul');

		assert.equal(document.body.innerHTML, '<ul><li style="text-align: left;">one</li><li style="text-align: left;">two</li><li style="text-align: right;">three</li></ul>');		
	});
	it('should unset alignment', function() {
		AlignToSides.unset('ul');
		assert.equal(document.body.innerHTML, '<ul><li style="text-align: inherit;">one</li><li style="text-align: inherit;">two</li><li style="text-align: inherit;">three</li></ul>');		
	});
	it('should set alignment with respect to tolerance', function() {

		AlignToSides.set('ul', 20);
		assert.equal(document.body.innerHTML, '<ul><li style="text-align: left;">one</li><li style="text-align: center;">two</li><li style="text-align: right;">three</li></ul>');		
	});
	it('should set alignment on resize', function() {
		setBoundingClientRect(parent, 100, 200);
		setBoundingClientRect(children[0], 140, 150);
		setBoundingClientRect(children[1], 180, 190);
		setBoundingClientRect(children[2], 110, 120);

		AlignToSides.init('ul', 30);
		window.dispatchEvent(new Event('resize'));

		assert.equal(document.body.innerHTML, '<ul><li style="text-align: center;">one</li><li style="text-align: right;">two</li><li style="text-align: left;">three</li></ul>');		
	});

});