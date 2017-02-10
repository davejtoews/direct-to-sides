"use strict";

var LayoutQueue = require('layout-queue');

var AlignToSides = (function () {

	function align(selector, tolerance) {
        document.querySelectorAll(selector).forEach(function(parent) {
            var parentRect = parent.getBoundingClientRect();
            var children = Array.from(parent.children);
            
            children.forEach(function(child){
            	var childRect = child.getBoundingClientRect();
            	var diffLeft = childRect.left - parentRect.left;
            	var diffRight = parentRect.right - childRect.right; 

				if (tolerance && diffLeft >= tolerance && diffRight >= tolerance) {
					child.style.textAlign = "center";
				} else if ( diffRight >= diffLeft ) {
					child.style.textAlign = "left";
				} else {
					child.style.textAlign = "right";
				}
            });
        });    		
	}

	function release(selector) {
        document.querySelectorAll(selector).forEach(function(parent) {
            var children = Array.from(parent.children);
            children.forEach(function(child){
				child.style.textAlign = "inherit";
            });
        });    		
	}

	function enqueue(selector, tolerance) {
		LayoutQueue.add(align, [selector, tolerance]);
	}

	return {
		init: function (selector, tolerance) {
			enqueue(selector, tolerance);
		},
		set: function (selector, tolerance) {
			align(selector, tolerance);
		},
		unset: function (selector) {
			release(selector);
		}
	}

})();

module.exports = AlignToSides;
