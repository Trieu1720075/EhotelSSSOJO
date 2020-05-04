SlideMiddle = function(options){
	if(typeof options != 'object'){
		console.log('Options not is object');
		return;
	}
	this.data = options.data;
	this.element = options.element;
	this.startAt = options.startAt || 0;
	this.classes = options.classes;
};
SlideMiddle.prototype.init = function(){
	var _=this;
	var length = _.data.length;
	for(var i = 0; i < length; i++){
		$(_.element).find('ul').append(eLayout.itemSlide(_.data[i], _.classes));
	}
	_.initSlide(_.startAt);
	var distance = $(_.element).outerWidth() - $(_.element).find('ul').outerWidth();
	if (distance > 0) {
		$(_.element).find('ul').css({'margin-left' : (distance/2)+ 'px'});
	}
};
SlideMiddle.prototype.destroy = function(){
	var _=this;
	$(_.element).slideLG(false);
	$(_.element).find('ul').empty();
}
SlideMiddle.prototype.left = function(){
	$(this.element).slideLG('prev');
}
SlideMiddle.prototype.right = function(){
	$(this.element).slideLG('next');
}
SlideMiddle.prototype.initSlide = function(){
	var _ = this;
	var options = {
		horizontal : 1,
		itemNav : 'centered',
		smart : 1,
		activateOn : 'click',
		activateMiddle : 1,
		mouseDragging : 1,
		touchDragging : 0,
		releaseSwing : 1,
		startAt : arguments[0],
		scrollBy : 1,
		speed : 300,
		moveBy: 0,
		elasticBounds : 1,
		easing : 'swing',
		dragHandle : 0,
		dynamicHandle : 1,
		clickBar : 0,
		// Buttons
		prev : $(_.element).parent().find('.prev'),
		next : $(_.element).parent().find('.next')
	};
	var slideLG = new SlideLG(_.element, options).init();
//	$(_.element_item).slideLG('on', 'moveEnd', function(eventName){
//		console.log(eventName);
//	});
}