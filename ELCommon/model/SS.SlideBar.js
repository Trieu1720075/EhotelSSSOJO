/**
 * @author DangTM
 * 
 */
!function($){
	// private value
	var autoHide = 0;
	var controlIndex = 3;
	SlideBar = function(options){
		// public value
		this.options = options;
		this.progressbar = null;
	}
	
	SlideBar.prototype.init = function(){
		var _ = this;
		controlIndex = 3;
		$(_.options.element).html(_.layout());
		$(_.options.element).find('.media-name').html(_.options.name);
		if(_.options.type === 0){
			$('.'.concat(_.options.classes,'_process_slider')).css({width : $(_.options.element).width() - $(_.options.element).find('.time-start').width()- $(_.options.element).find('.time-end').width() - 80});
		} else {
			$('.'.concat(_.options.classes,'_process_slider')).css({width : $(window).width() - $(_.options.element).find('.time-start').width()- $(_.options.element).find('.time-end').width() - 80});
		}
		_.progressbar = $('.'.concat(_.options.classes,'_process_slider')).slider({
			formater : _.options.formater
		});
	}
	SlideBar.prototype.autoShowControls = function(){
		var _=this;
		_.show();
		_.focus();
		if(_.options.autoShowControls){
			clearTimeout(autoHide);
			autoHide = setTimeout(function() {
				_.hide();
				eCommon.HISTORY.current().focus();
			}, _.options.autoCloseTimeout);
		}
	}
	SlideBar.prototype.closeControls = function(){
		var _=this;
		clearTimeout(autoHide);
//		_.hide();
		$(this.options.element).find('.controls-player').hide();
	}
	SlideBar.prototype.show = function(){
		$(this.options.element).find('.controls-player').show("clip", {}, "fast");
	}
	SlideBar.prototype.hide = function(){
		$(this.options.element).find('.controls-player').hide("clip", {}, "slow");
	}
	SlideBar.prototype.focus = function(){
		var _ = this;
		$(_.options.element).find('.controls div[tabindex="' + controlIndex + '"]').focus();
	}
	SlideBar.prototype.setProgressbar = function(value){
		this.progressbar.slider('setValue', value);
	}
	SlideBar.prototype.getProgressbar = function(){
		return this.progressbar;
	}
	SlideBar.prototype.setName = function(name){
		name = name || '';
		$(this.options.element).find('.media-name').html(name);
	}
	SlideBar.prototype.left = function($this){
		var _=this;
		controlIndex -= 1;
		if (controlIndex < 1) {
			controlIndex = 1;
		}
		$($this).parent().removeClass('active');
		$($this).addClass('active');
		_.focus();
	}
	SlideBar.prototype.right = function($this){
		var _=this;
		controlIndex += 1;
		if (controlIndex > 5) {
			controlIndex = 5;
		}
		$($this).parent().removeClass('active');
		$($this).addClass('active');
//		Subtitle.hide();
		_.focus();
	}
	SlideBar.prototype.up = function($this){
		var control = $($this).attr('data-control');
//		if (control === 'SUBTITLE') {
//			Subtitle.focus();
//		}
	}
	SlideBar.prototype.down = function($this){
		var _=this;
		_.hide();
		
//		clearTimeout(_.timeout);
//		$(Subtitle.data.container).css('margin-bottom', '70px');
//		Subtitle.hide();
	}
	SlideBar.prototype.enter = function(sendEvent){
		var _=this;
		var control = $(sendEvent).attr('data-control');
		controlIndex = Number($(sendEvent).attr('tabindex'));
		$(sendEvent).focus();
		if(_.options.type === 0){ // audio
			if (control === 'RW') {
				eMusic.backward();
			} else if (control === 'FF') {
				eMusic.forward();
			} else if (control === 'PLAY') {
				if (eMusic.state === eMusic.STOPPED) {
					eMusic.play();
				} else if (eMusic.state === eMusic.PAUSED) {
					eMusic.resume();
				} else if (eMusic.state === eMusic.PLAYING) {
					eMusic.pause();
				}
			} 
		} else {
			if (control === 'SUBTITLE') {
				Subtitle.show();
			} else if (control === 'RW') {
				eVideoSS.backward();
			} else if (control === 'FF') {
				eVideoSS.forward();
			} else if (control === 'PLAY') {
				if (eVideoSS.state === eVideoSS.STOPPED) {
					eVideoSS.play();
				} else if (eVideoSS.state === eVideoSS.PAUSED) {
					eVideoSS.resume();
				} else if (eVideoSS.state === eVideoSS.PLAYING) {
					eVideoSS.pause();
				}
			} else if (control === 'RELATION') {
				_.closeControls();
				eRelateVideo.init();
			}
		}
	
		
	}
	SlideBar.prototype.downHandle = function(){
		this.show();
		this.focus();
	}
	SlideBar.prototype.iconPlay = function(){
		$(this.options.element).find('.control-play').html('<h4><i class="fa fa-pause" aria-hidden="true"></i></h4>');
	}
	SlideBar.prototype.iconPause = function(){
		$(this.options.element).find('.control-play').html('<h4><i class="fa fa-play" aria-hidden="true"></i></h4>');
	}
	SlideBar.prototype.iconResume = function(){
		$(this.options.element).find('.control-play').html('<h4><i class="fa fa-pause" aria-hidden="true"></i></h4>');
	}
	SlideBar.prototype.iconStop = function(){
		$(this.options.element).find('.control-play').html('<h4><i class="fa fa-play" aria-hidden="true"></i></h4>');
	}
	SlideBar.prototype.setEndTime = function(time){
		time = time || "00:00:00";
		$(this.options.element).find('.time-end').html(time);
	}
	SlideBar.prototype.setStartTime = function(time){
		$(this.options.element).find('.time-start').html(time);
	}
	
	SlideBar.prototype.layout = function(){
		var ui = '<div class="controls-player navbar-fixed-bottom"><div class="controls">' 
				+ '	<div tabindex="1" onclick="'+this.options.classes+'.itemClick(this, event)" onKeyDown="'
					+ this.options.classes
					+ '.slideKeyDown(this, event)" data-toggle="popover" data-control="SUBTITLE" class="col-md-2x control-subtitle" data-toggle="popover">'
					+ '		<h4><i class="fa fa-list" aria-hidden="true"></i></h4>'
					+ '	</div>'
					+ '	<div  tabindex="2" onclick="'+this.options.classes+'.itemClick(this, event)" onKeyDown="'
					+ this.options.classes
					+ '.slideKeyDown(this, event)" data-control="RW" class="col-md-2x control-rewind">'
					+ '		<h4><i class="fa fa-fast-backward" aria-hidden="true"></i></h4>'
					+ '	</div>'
					+ '	<div tabindex="3" onclick="'+this.options.classes+'.itemClick(this, event)" onKeyDown="'
					+ this.options.classes
					+ '.slideKeyDown(this, event)" data-control="PLAY" class="col-md-2x control-play">'
					+ '		<h4><i class="fa fa-play" aria-hidden="true"></i></h4>'
					+ '	</div>'
					+ '	<div  tabindex="4" onclick="'+this.options.classes+'.itemClick(this, event)" onKeyDown="'
					+ this.options.classes
					+ '.slideKeyDown(this, event)" data-control="FF" class="col-md-2x control-forward">'
					+ '		<h4><i class="fa fa-fast-forward" aria-hidden="true"></i></h4>'
					+ '	</div>'
					+ '	<div tabindex="5" onclick="'+this.options.classes+'.itemClick(this, event)" onKeyDown="'
					+ this.options.classes
					+ '.slideKeyDown(this, event)" data-control="RELATION" class="col-md-2x control-film">'
					+ '		<h4><i class="fa fa-film" aria-hidden="true"></i></h4>'
					+ '	</div>'
					+ '</div>'
					+ '<div class="slider-progress">'
					+ '	<div class="col-md-12">'
					+ '		<div class="time-start"><span>00:00</span></div>'
					+ '		<input type="text"  class="'+this.options.classes+'_process_slider" value="" data-slider-min="0" '
					+ '			data-slider-max="100" data-slider-step="1" data-slider-value="1" data-slider-handle="round" '
					+ '			data-slider-orientation="horizontal" data-slider-selection="show" '
					+ '			data-slider-tooltip="false">'
					+ '		<div class="time-end"><span>00:00:00</span></div>'
					+ '		<h4 class="media-name"></h4>' 
					+ '	</div>' 
				+ '</div></div>';
		if(this.options.type === 0){ // audio
			ui = '<div class="controls-player"><div class="controls">' 
					+ '	<div  tabindex="1" onclick="'+this.options.classes+'.buttonClick(this, event)" onKeyDown="'
					+ this.options.classes
					+ '.slideKeyDown(this, event)" data-control="RW" class="col-md-2x control-rewind">'
					+ '		<h4><i class="fa fa-fast-backward" aria-hidden="true"></i></h4>'
					+ '	</div>'
					+ '	<div tabindex="2" onclick="'+this.options.classes+'.buttonClick(this, event)" onKeyDown="'
					+ this.options.classes
					+ '.slideKeyDown(this, event)" data-control="PLAY" class="col-md-2x control-play">'
					+ '		<h4><i class="fa fa-play" aria-hidden="true"></i></h4>'
					+ '	</div>'
					+ '	<div  tabindex="3" onclick="'+this.options.classes+'.buttonClick(this, event)" onKeyDown="'
					+ this.options.classes
					+ '.slideKeyDown(this, event)" data-control="FF" class="col-md-2x control-forward">'
					+ '		<h4><i class="fa fa-fast-forward" aria-hidden="true"></i></h4>'
					+ '	</div>'
					+ '</div>'
					+ '<div class="slider-progress">'
					+ '	<div class="col-md-12">'
					+ '		<div class="time-start"><span>00:00</span></div>'
					+ '		<input type="text"  class="'+this.options.classes+'_process_slider" value="" data-slider-min="0" '
					+ '			data-slider-max="100" data-slider-step="1" data-slider-value="1" data-slider-handle="round" '
					+ '			data-slider-orientation="horizontal" data-slider-selection="show" '
					+ '			data-slider-tooltip="false">'
					+ '		<div class="time-end"><span>00:00:00</span></div>'
					+ '		<h4 class="media-name"></h4>' 
					+ '	</div>' 
				+ '</div></div>';
		}
		return ui;
	}
	
	$.fn.slideBar = function(options){
		if (typeof(options)==='object'){
			$.fn.slideBar.defaults.element = this;
			var option = $.extend({}, $.fn.slideBar.defaults, options);
			return new SlideBar(option);
		}
		throw("options param isn't object");
	};
	$.fn.slideBar.defaults = {
		classes: '',
		name: '',
		autoCloseTimeout: 7000,
		handleAutoClose: function(){
			console.log('--> autoCloseTimeout');
		},
		autoShowControls: true,
		formater: function(value){
			console.log('--> ' + value);
			return value;
		}
	};
	
}(jQuery);

!function( $ ) {
	var Slider = function(element, options) {
		this.element = $(element);
		this.picker = $('<div class="slider">'+
							'<div class="slider-track">'+
								'<div class="slider-selection"></div>'+
								'<div class="slider-handle"></div>'+
								'<div class="slider-handle"></div>'+
							'</div>'+
							'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'+
						'</div>')
							.insertBefore(this.element)
							.append(this.element);
		this.id = this.element.data('slider-id')||options.id;
		if (this.id) {
			this.picker[0].id = this.id;
		}

		if (typeof Modernizr !== 'undefined' && Modernizr.touch) {
			this.touchCapable = true;
		}

		var tooltip = this.element.data('slider-tooltip')||options.tooltip;

		this.tooltip = this.picker.find('.tooltip');
		this.tooltipInner = this.tooltip.find('div.tooltip-inner');

		this.orientation = this.element.data('slider-orientation')||options.orientation;
		switch(this.orientation) {
			case 'vertical':
				this.picker.addClass('slider-vertical');
				this.stylePos = 'top';
				this.mousePos = 'pageY';
				this.sizePos = 'offsetHeight';
				this.tooltip.addClass('right')[0].style.left = '100%';
				break;
			default:
				this.picker
					.addClass('slider-horizontal')
					.css('width', this.element.outerWidth());
				this.orientation = 'horizontal';
				this.stylePos = 'left';
				this.mousePos = 'pageX';
				this.sizePos = 'offsetWidth';
				this.tooltip.addClass('top')[0].style.top = -this.tooltip.outerHeight() - 14 + 'px';
				break;
		}

		this.min = this.element.data('slider-min')||options.min;
		this.max = this.element.data('slider-max')||options.max;
		this.step = this.element.data('slider-step')||options.step;
		this.value = this.element.data('slider-value')||options.value;
		if (this.value[1]) {
			this.range = true;
		}

		this.selection = this.element.data('slider-selection')||options.selection;
		this.selectionEl = this.picker.find('.slider-selection');
		if (this.selection === 'none') {
			this.selectionEl.addClass('hide');
		}
		this.selectionElStyle = this.selectionEl[0].style;


		this.handle1 = this.picker.find('.slider-handle:first');
		this.handle1Stype = this.handle1[0].style;
		this.handle2 = this.picker.find('.slider-handle:last');
		this.handle2Stype = this.handle2[0].style;

		var handle = this.element.data('slider-handle')||options.handle;
		switch(handle) {
			case 'round':
				this.handle1.addClass('round');
				this.handle2.addClass('round');
				break
			case 'triangle':
				this.handle1.addClass('triangle');
				this.handle2.addClass('triangle');
				break
		}

		if (this.range) {
			this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
			this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
		} else {
			this.value = [ Math.max(this.min, Math.min(this.max, this.value))];
			this.handle2.addClass('hide');
			if (this.selection == 'after') {
				this.value[1] = this.max;
			} else {
				this.value[1] = this.min;
			}
		}
		this.diff = this.max - this.min;
		this.percentage = [
			(this.value[0]-this.min)*100/this.diff,
			(this.value[1]-this.min)*100/this.diff,
			this.step*100/this.diff
		];

		this.offset = this.picker.offset();
		this.size = this.picker[0][this.sizePos];

		this.formater = options.formater;

		this.layout();

		if (this.touchCapable) {
			// Touch: Bind touch events:
			this.picker.on({
				touchstart: $.proxy(this.mousedown, this)
			});
		} else {
			this.picker.on({
				mousedown: $.proxy(this.mousedown, this)
			});
		}

		if (tooltip === 'show') {
			this.picker.on({
				mouseenter: $.proxy(this.showTooltip, this),
				mouseleave: $.proxy(this.hideTooltip, this)
			});
		} else {
			this.tooltip.addClass('hide');
		}
	};

	Slider.prototype = {
		constructor: Slider,

		over: false,
		inDrag: false,
		
		showTooltip: function(){
			this.tooltip.addClass('in');
			//var left = Math.round(this.percent*this.width);
			//this.tooltip.css('left', left - this.tooltip.outerWidth()/2);
			this.over = true;
		},
		
		hideTooltip: function(){
			if (this.inDrag === false) {
				this.tooltip.removeClass('in');
			}
			this.over = false;
		},

		layout: function(){
			this.handle1Stype[this.stylePos] = this.percentage[0]+'%';
			this.handle2Stype[this.stylePos] = this.percentage[1]+'%';
			if (this.orientation == 'vertical') {
				this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) +'%';
				this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) +'%';
			} else {
				this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) +'%';
				this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) +'%';
			}
			if (this.range) {
				this.tooltipInner.text(
					this.formater(this.value[0]) + 
					' : ' + 
					this.formater(this.value[1])
				);
				this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0])/2)/100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight()/2 : this.tooltip.outerWidth()/2) +'px';
			} else {
				this.tooltipInner.text(
					this.formater(this.value[0])
				);
				this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0]/100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight()/2 : this.tooltip.outerWidth()/2) +'px';
			}
		},

		mousedown: function(ev) {

			// Touch: Get the original event:
			if (this.touchCapable && ev.type === 'touchstart') {
				ev = ev.originalEvent;
			}

			this.offset = this.picker.offset();
			this.size = this.picker[0][this.sizePos];

			var percentage = this.getPercentage(ev);

			if (this.range) {
				var diff1 = Math.abs(this.percentage[0] - percentage);
				var diff2 = Math.abs(this.percentage[1] - percentage);
				this.dragged = (diff1 < diff2) ? 0 : 1;
			} else {
				this.dragged = 0;
			}

			this.percentage[this.dragged] = percentage;
			this.layout();

			if (this.touchCapable) {
				// Touch: Bind touch events:
				$(document).on({
					touchmove: $.proxy(this.mousemove, this),
					touchend: $.proxy(this.mouseup, this)
				});
			} else {
				$(document).on({
					mousemove: $.proxy(this.mousemove, this),
					mouseup: $.proxy(this.mouseup, this)
				});
			}

			this.inDrag = true;
			var val = this.calculateValue();
			this.element.trigger({
					type: 'slideStart',
					value: val
				}).trigger({
					type: 'slide',
					value: val
				});
			return false;
		},

		mousemove: function(ev) {
			
			// Touch: Get the original event:
			if (this.touchCapable && ev.type === 'touchmove') {
				ev = ev.originalEvent;
			}

			var percentage = this.getPercentage(ev);
			if (this.range) {
				if (this.dragged === 0 && this.percentage[1] < percentage) {
					this.percentage[0] = this.percentage[1];
					this.dragged = 1;
				} else if (this.dragged === 1 && this.percentage[0] > percentage) {
					this.percentage[1] = this.percentage[0];
					this.dragged = 0;
				}
			}
			this.percentage[this.dragged] = percentage;
			this.layout();
			var val = this.calculateValue();
			this.element
				.trigger({
					type: 'slide',
					value: val
				})
				.data('value', val)
				.prop('value', val);
			return false;
		},

		mouseup: function(ev) {
			if (this.touchCapable) {
				// Touch: Bind touch events:
				$(document).off({
					touchmove: this.mousemove,
					touchend: this.mouseup
				});
			} else {
				$(document).off({
					mousemove: this.mousemove,
					mouseup: this.mouseup
				});
			}

			this.inDrag = false;
			if (this.over == false) {
				this.hideTooltip();
			}
			this.element;
			var val = this.calculateValue();
			this.element
				.trigger({
					type: 'slideStop',
					value: val
				})
				.data('value', val)
				.prop('value', val);
			return false;
		},

		calculateValue: function() {
			var val;
			if (this.range) {
				val = [
					(this.min + Math.round((this.diff * this.percentage[0]/100)/this.step)*this.step),
					(this.min + Math.round((this.diff * this.percentage[1]/100)/this.step)*this.step)
				];
				this.value = val;
			} else {
				val = (this.min + Math.round((this.diff * this.percentage[0]/100)/this.step)*this.step);
				this.value = [val, this.value[1]];
			}
			return val;
		},

		getPercentage: function(ev) {
			if (this.touchCapable) {
				ev = ev.touches[0];
			}
			var percentage = (ev[this.mousePos] - this.offset[this.stylePos])*100/this.size;
			percentage = Math.round(percentage/this.percentage[2])*this.percentage[2];
			return Math.max(0, Math.min(100, percentage));
		},

		getValue: function() {
			if (this.range) {
				return this.value;
			}
			return this.value[0];
		},

		setValue: function(val) {
			this.value = val;

			if (this.range) {
				this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
				this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
			} else {
				this.value = [ Math.max(this.min, Math.min(this.max, this.value))];
				this.handle2.addClass('hide');
				if (this.selection == 'after') {
					this.value[1] = this.max;
				} else {
					this.value[1] = this.min;
				}
			}
			this.diff = this.max - this.min;
			this.percentage = [
				(this.value[0]-this.min)*100/this.diff,
				(this.value[1]-this.min)*100/this.diff,
				this.step*100/this.diff
			];
			this.layout();
		}
	};

	$.fn.slider = function ( option, val ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('slider'),
				options = typeof option === 'object' && option;
			if (!data)  {
				$this.data('slider', (data = new Slider(this, $.extend({}, $.fn.slider.defaults,options))));
			}
			if (typeof option == 'string') {
				data[option](val);
			}
		})
	};

	$.fn.slider.defaults = {
		min: 0,
		max: 10,
		step: 1,
		orientation: 'horizontal',
		value: 5,
		selection: 'before',
		tooltip: 'show',
		handle: 'round',
		formater: function(value) {
			return value;
		}
	};

	$.fn.slider.Constructor = Slider;

}( window.jQuery );