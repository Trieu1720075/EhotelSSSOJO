eRelateVideo = {
	key: 'RELATION',
	slideIndex : 0,
	itemsInRow : 5,
	element: '#scenes-relate-container',
	slide : '#scenes-movies-relate',
	keyPress : false,
	classes: 'eRelateVideo',
	data : [],
	isKeyPress: false,
	keyTimeout: 0, 
	limit: 5,
	itemOnScreen:13,
	itemsInRow: 7
};

eRelateVideo.init = function() {
	var _ = this;
	if($(_.element).find('ul li').length > 0){
		_.autoHide();
		return;
	}
	_.getVideo(eVideoSS.options.id, 0, _.itemOnScreen);
}

eRelateVideo.autoHide = function() {
	var _=this;
	clearTimeout(_.timeout);
	$(_.element).show();
	$(eSubtitle.data.container).css('margin-bottom', '250px');
	_.focus();
	_.timeout = setTimeout(function() {
		_.hide();
	}, 7000);
}
eRelateVideo.hide = function(){
	var _=this;
	clearTimeout(_.timeout);
	$(_.element).hide();
	$(eSubtitle.data.container).css('margin-bottom', '70px');
	eCommon.HISTORY.current().focus();
}
eRelateVideo.unload = function() {
	var _ = this;
	try{
		$(_.slide).slideLG(false);
		$(_.slide).find('ul').empty();
	} catch(error){
		
	}
	
}

eRelateVideo.focus = function() {
	$(this.slide).find('li.active div.thumbnail').focus();
}

eRelateVideo.getVideo = function(id, offset, limit) {
	var _ = this;
	var url = eScreenSlide.get().data[eScreenSlide.get().subjectIndex - 1].url;
	$.ajax({
		url : url,//API.getAPI().GET_RELATE_VIDEO + id + '/' + offset + '/' + limit,
		data : "",
		cache : false,
		type : 'GET',
		async : true,
		success : function(response) {
			var data = JSON.parse(response) || response;
			var length = data.length;
			if (length == 0) {
				var obj = new Object();
				obj.title = '';
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = 'eRelateVideo.errorNoSubject()';
				eModal.showInfo(obj);
				return;
			}
			_.data = [];
			// set item subject
			for(var i= 0; i < length; i++){
				var obj = {};
				obj.index = (i + 1);
				obj.id = data[i].id;
				obj.name = data[i].servicename;
				obj.image = data[i].poster;
				obj.url = data[i].urlfilm;
				obj.price = data[i].price;
				obj.iunit = data[i].iunit;
				obj.classes = _.classes;
				_.data.push(obj);
				$(_.slide).find('ul').append(eLayout.relateVideo(obj));
			}
			// init sidebar
			$(_.slide).find('ul').attr('data-count', length);
			_.autoHide();
			_.initSlide(_.slide, 0);
			_.focus();
			var distance = $(_.slide).outerWidth() - $(_.slide).find('ul').outerWidth();
			if (distance > 0) {
				$(_.slide).find('ul').css({'margin-left' : (distance/2)+ 'px'});
			}
		},
		error : function(error) {
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = 'eRelateVideo.errorNoSubject()';
			eModal.showInfo(obj);
		}
	});
}

eRelateVideo.initSlide = function(slideId, startAt) {
	var _ = this;
	var options = {
		horizontal : 1,
		itemNav : 'centered',
		smart : 1,
		activateOn : 'click',
		mouseDragging : 1,
		touchDragging : 1,
		releaseSwing : 1,
		startAt : startAt,
		scrollBy : 1,
		speed : 0,
		elasticBounds : 1,
		easing : 'easeOutExpo',
		dragHandle : 1,
		dynamicHandle : 1,
		clickBar : 0,
		activateOn : 'click',
		// Buttons
		prev : $(slideId).parent().find('.prev'),
		next : $(slideId).parent().find('.next')
	};
	var slideLG = new SlideLG(slideId, options).init();
}

eRelateVideo.rightFocus = function($this) {
	var _=this;
	if(!_.isKeyPress){
		_.isKeyPress = true;
		_.keyTimeout = setTimeout(function(){
			$(_.slide).slideLG('next');
			var slideIndex = Number($(_.slide).find('li.active div.thumbnail').attr('tabindex'));
			_.focus();
//			console.log('SlideIndex= ' + slideIndex);
//			var count = _.data.length;
//			if(slideIndex + _.limit > count){
//				console.log('add new');
//				_.add("/movies/content/retail/3", count + 1, _.limit);//API.getAPI().GET_RELATE_VIDEO + idVideo + '/' + offset + '/' + limit,
//			} 
			_.isKeyPress = false;
		}, 100);
	}
}
eRelateVideo.add = function(url, offset, limit){
	var _ = this;
	$.ajax({
		url : url + '/' + offset + '/' + limit,
		data : "",
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON && JSON.parse(response).data || response.data;
			var length = data.length;
			if(length == 0){
				return;
			}
			var end =  _.data.length;
			var li = '';
			// set itemsubject
			for(var i= 0; i < length; i++){
				var obj = {};
				obj.index = (end + i + 1);
				obj.id = data[i].id;
				obj.name = data[i].title;
				obj.image = data[i].thumb;
				obj.url = API.getAPI().HDPLAY_GET_STREAM + obj.id;//'movies/url/' + obj.id;//API.getAPI().HDPLAY_GET_STREAM + obj.id;
				obj.classes = _.classes;
				_.data.push(obj);
				$(_.slide).find('ul').append(eLayout.relateVideo(obj));
			}
			
			for(var i = 0; i < _.limit; i++){
				$(_.slide).find('ul li').eq(0).remove();
			}
			var index = $(_.slide).find('ul li').index($(_.slide).find('ul li.active'));
			$(_.slide).slideLG(false);
			_.initSlide(_.slide, index);
		},
		error : function(error) {
			console.log('--> error ' + url + '/' + offset + '/' + limit);
		}
	});
}
eRelateVideo.leftFocus = function($this) {
	var _ = this;
	if(!_.isKeyPress){
		_.isKeyPress = true;
		_.keyTimeout = setTimeout(function(){
			$(_.slide).slideLG('prev');
			var slideIndex = Number($(_.slide).find('li.active div.thumbnail').attr('tabindex'));
			_.focus();
//			var first = Number($(_.slide).find('ul li').first().find('div.thumbnail').attr('tabindex')) - 1;
//			console.log('SlideIndex=' + slideIndex);
//			var slideCount = _.data.length;
//			if(slideIndex - _.limit <= first && slideCount > _.itemOnScreen){
//				for(var i = 1; i <= _.limit; i++){
//					var li = eLayout.relateVideo(_.data[first-i]);
//					$(li).insertBefore($(_.slide).find('ul li').first());
//				}
//				for(var i = 0; i < _.limit; i++){
//					var last = $(_.slide).find('ul li').length;
//					var index = Number($(_.slide).find('ul li').last().find('div.thumbnail').attr('tabindex')) - 1;
//					if(last > _.itemOnScreen){
//						$(_.slide).find('ul li').eq(last-1).remove();
//						_.data.splice(index,1);
//					}
//				}
//				var startAt = $(_.slide).find('ul li').length - 1;
//				$(_.slide).slideLG(false);
//				_.initSlide(_.slide, startAt - parseInt(_.itemsInRow / 2));
//				
//			}
		_.isKeyPress = false;
		}, 100);
	}
}

eRelateVideo.selectItem = function($this, event) {
	var _ = this;
	eVideoSS.play({
		name:$($this).attr('data-title'),
		url: $($this).attr('data-url'),
		id: $($this).attr('data-id')
	});
	
	_.focus();
}

eRelateVideo.home = function() {
	var _ = this;
	_.hide();
	_.unload();
}

eRelateVideo.back = function() {
	var _ = this;
	_.unload();
	_.hide();
}

eRelateVideo.itemClick = function ($this, event) {
	var _ = this;
	event.stopImmediatePropagation();
	var index = $($this).attr('tabindex');
	$(_.slide).slideLG('activate', index - 1, true);
	$($this).focus();
	_.selectItem($this, event);
}

eRelateVideo.slideKeyDown  = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	_.autoHide();
	switch (keyCode) {
	case eCommon.KEY_LEFT:
		_.leftFocus($this);
		break;
	case eCommon.KEY_RIGHT:
		_.rightFocus($this);
		break;
	case eCommon.KEY_ENTER:
		_.selectItem($this, event);
		break;
	case eCommon.KEY_DOWN:
		_.hide();
		break;
	case eCommon.KEY_RETURN:
		_.hide();
		break;
	}
}

eRelateVideo.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			_.back();
			break;
	}
}

eRelateVideo.errorNoContent = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			_.back();
			break;
	}
}