"use strict";

var LayoutQueue = require('layout-queue');

var AlignToSides = (function () {

	function align(selector, tolerance, reverse = false, condition = function(){return true} ) {
        document.querySelectorAll(selector).forEach(function(parent) {
            var parentRect = parent.getBoundingClientRect();
            var children = Array.from(parent.children);

            console.log(condition());
            if ( condition() ) {
	            children.forEach(function(child){
	            	setAlingmentStyle(child, parentRect, tolerance, reverse);
	            });            	
            } else {
            	release(selector);
            }

        });    		
	}

	function setAlingmentStyle(child, parentRect, tolerance, reverse) {
    	var childRect = child.getBoundingClientRect();
    	var diffLeft = childRect.left - parentRect.left;
    	var diffRight = parentRect.right - childRect.right;

    	if (!reverse) {
			if (tolerance && diffLeft >= tolerance && diffRight >= tolerance) {
				child.style.textAlign = "center";
			} else if ( diffRight >= diffLeft ) {
				child.style.textAlign = "left";
			} else {
				child.style.textAlign = "right";
			}            		
    	} else { 
			if (tolerance && diffLeft >= tolerance && diffRight >= tolerance) {
				child.style.textAlign = "center";
			} else if ( diffRight >= diffLeft ) {
				child.style.textAlign = "right";
			} else {
				child.style.textAlign = "left";
			}                     		
    	}
	}

	function release(selector) {
        document.querySelectorAll(selector).forEach(function(parent) {
            var children = Array.from(parent.children);
            children.forEach(function(child){
				child.style.textAlign = "inherit";
            });
        });    		
	}

	function enqueue(selector, tolerance, reverse, condition) {
		LayoutQueue.add(align, [selector, tolerance, reverse, condition]);
	}

	return {
		init: function (selector, tolerance, reverse, condition) {
			enqueue(selector, tolerance, reverse, condition);
		},
		set: function (selector, tolerance, reverse, condition) {
			align(selector, tolerance, reverse, condition);
		},
		unset: function (selector) {
			release(selector);
		}
	}

})();

module.exports = AlignToSides;
