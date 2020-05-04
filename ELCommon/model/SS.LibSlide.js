/**
 * @author DangTM
 * @date: 31/08/2016
 * @description: library slide vertical or horizontal
 * 
 */
!(function($){
	var Slide = function(option){
		
	}
	Slide.prototype.init = function(){
		
	}
	$.fn.eSlide = function(options){
		options = typeof(option) === "object" && option;
		var obj = $.extend({}, $.fn.eSlide.defaults, options);
		obj.element = this;
		obj.instance = '';
		return new Slide(obj);
	};
	$.fn.eSlide.defaults = {
			horizontal : 1,
			itemNav : 'forceCentered',
			smart : 1,
			activateOn : 'click',
			activateMiddle : 1,
			mouseDragging : 0,
			touchDragging : 0,
			releaseSwing : 0,
			startAt : 0,
			scrollBy : 1,
			speed : 300,
			elasticBounds : 1,
			easing : 'linear',
			dragHandle : 0,
			dynamicHandle : 1,
			clickBar : 0,
			// Buttons
			prev : $('.prev'),
			next : $('.next')
	};
})(jQuery);