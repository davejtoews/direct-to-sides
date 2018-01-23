"use strict";

var LayoutQueue = require('layout-queue');

var DirectToSides = (function () {

	function direct(selector, tolerance, reverse = false, condition = function(){return true} ) {
        document.querySelectorAll(selector).forEach(function(parent) {
            var parentRect = parent.getBoundingClientRect();
            var children = Array.from(parent.children);
            
            if ( condition() ) {
	            children.forEach(function(child){
	            	setDirectionStyle(child, parentRect, tolerance, reverse);
	            });            	
            } else {
            	release(selector);
            }

        });    		
	}

	function setDirectionStyle(child, parentRect, tolerance, reverse) {
    	var childRect = child.getBoundingClientRect();
    	var diffLeft = childRect.left - parentRect.left;
    	var diffRight = parentRect.right - childRect.right;

    	if (!reverse) {
			if (tolerance && diffLeft >= tolerance && diffRight >= tolerance) {
				child.style.direction = "inherit";
			} else if ( diffRight >= diffLeft ) {
				child.style.direction = "rtl";
			} else {
				child.style.direction = "ltr";
			}            		
    	} else { 
			if (tolerance && diffLeft >= tolerance && diffRight >= tolerance) {
				child.style.direction = "inherit";
			} else if ( diffRight >= diffLeft ) {
				child.style.direction = "ltr";
			} else {
				child.style.direction = "rtl";
			}                     		
    	}
	}

	function release(selector) {
        document.querySelectorAll(selector).forEach(function(parent) {
            var children = Array.from(parent.children);
            children.forEach(function(child){
				child.style.direction = "inherit";
            });
        });    		
	}

	function enqueue(selector, tolerance, reverse, condition) {
		LayoutQueue.add(direct, [selector, tolerance, reverse, condition]);
	}

	return {
		init: function (selector, tolerance, reverse, condition) {
			enqueue(selector, tolerance, reverse, condition);
		},
		set: function (selector, tolerance, reverse, condition) {
			direct(selector, tolerance, reverse, condition);
		},
		unset: function (selector) {
			release(selector);
		}
	}

})();

module.exports = DirectToSides;
