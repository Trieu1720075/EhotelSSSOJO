/**
 * @author DangTM
 * @returns {___anonymous_eScreenSlide}
 * @description Define screen load image with slide
 * v 1.0.0
 */
eScreenSlide = (function(){
	var Slide = function(options){
		var defaults = {
			url: '',
			name : '',
			id : null,
			classes : '',
			data : [],
			element : '#scenes-movies-content',
			element_item : '#scenes-movies-item',
			element_subject : '#scenes-movies-subject',
			subjectIndex : 1,
			subjectCount : 0,
			slideIndex : 1,
			slideCount : 0,
			itemsInRow : 7,
			serviceCode : null,
			timeout: 0,
			isKeyPress: false,
			margin: 30,
			
		};
		var opt = $.extend({}, defaults, options);
		this.data = opt.data;
		this.url = opt.url;
		this.classes = opt.classes;
		this.element = opt.element;
		this.element_item = opt.element_item;
		this.subjectIndex = opt.subjectIndex;
		this.element_subject = opt.element_subject;
		this.subjectCount = opt.subjectCount;
		this.slideIndex = opt.slideIndex;
		this.itemsInRow = opt.itemsInRow;
		this.serviceCode = opt.serviceCode;
		this.timeout= opt.timeout;
		this.isKeyPress = opt.isKeyPress;
		this.margin = 30;
		this.dataType = opt.dataType;
		this.index = opt.index;
		this.limit = 5;
		this.itemOnScreen = 13;
	}
	Slide.prototype.show = function(){
		$(this.element).show();
		eCommon.hideFooter();
//		$(eCommon.navbarName).text(this.name);
	}
	Slide.prototype.hide = function(){
		$(this.element).hide();
	}
	Slide.prototype.focus = function(){
		var _ = this;
		$(_.element_item).find('li.active div.thumbnail').focus();
	}
	Slide.prototype.subjectFocus = function(){
		$(this.element_subject).find('li.active div.thumbnail').focus();
	}
	Slide.prototype.subjectActive = function(index){
		$(this.element_subject).slideLG('activate', index - 1, true);
	}
	Slide.prototype.up = function(){
		var _ = this;
		$(_.element_subject).slideLG('slideTo', (_.subjectIndex-1), true);
		_.focus();
	}
	Slide.prototype.down = function(){
		this.subjectFocus();
	}
	Slide.prototype.selectSubject = function($this, event){
		var _ = this;
		// unload list current
		$(_.element_item).slideLG(false);
		$(_.element_item).find('ul').empty();
		var index = Number($($this).attr('tabindex'));
		// save index of subject selected 
		_.subjectIndex = index;
		_.subjectActive(index);
		_.data[index - 1].items = [];
		var url = _.data[index - 1].url;
		_.getItem(url, 0, 13);
//		if (_.data[index - 1].items.length > 0) {
//			_.reInitItems(index);
//		} else {
//			var url = _.data[index - 1].url;
//			_.getItem(url, 0, 10);
//		}
	}
	Slide.prototype.selectItem = function($this, event){
		var _ = this;
		event.stopImmediatePropagation();
		var index = Number($($this).attr('tabindex'));
		$(this.element_item).slideLG('activate', index - 1, false);
	}
	Slide.prototype.getSubject = function(){
		var _ = this;
		$.ajax({
			url : _.url,
			data : "",
			cache : true,
			type : 'GET',
			async : false,
			success : function(response) {
				var data = JSON.parse(response);
				var length = data.length;
				if (length == 0) {
					var obj = new Object();
					obj.type = 'error';
					obj.title = 'MESSAGE';
					obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
					obj.onkeydown = _.classes + '.errorNoSubject()';
					eModal.showInfo(obj);
					return;
				}
				
				_.subjectIndex = 1;
				_.subjectCount = length;
				
				for(var i =0; i < length; i++){
					var obj = {};
					obj.index = (i + 1);
					obj.items = [];
					obj.id = data[i].id;
					obj.name = data[i].subjectname;
					obj.image = data[i].url_image;
					obj.icon = data[i].url_image;
					obj.url = API.getAPI().CMD_2 + obj.id;
					_.data.push(obj);
					$(_.element_subject).find('ul').append(eLayout.subject(obj, _.classes));
				}
				var margin = ($(window).width() - length*120)/3;
				if(margin > 0){
					$(_.element_subject).css('margin-left', margin + 'px');
				}
				
				_.show();
				_.initSlide(_.element_subject, 0);
				_.subjectActive(_.subjectIndex);
				_.getItem(_.data[0].url, 0, _.itemOnScreen);
				
			},
			error : function(error) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
				obj.onkeydown = _.classes + '.errorNoSubject()';
				eModal.showInfo(obj);
			}
		});
	}
	Slide.prototype.getItem = function(url, offset, limit){
		var _ = this;
		$.ajax({
			url : url, //+ '/' + offset + '/' + limit,
			data : "",
			type : 'GET',
			async : false,
			success : function(response) {
				var data = JSON.parse(response);
				var length = data.length;
				if(length == 0){
					var obj = {};
					obj.title = _.name;
					obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
					obj.onkeydown = _.classes + '.errorNoContent()';
					eModal.showInfo(obj);
					return;
				}
				
				_.slideCount = length;
				_.slideIndex = 1;
				// set itemsubject
				for(var i= 0; i < length; i++){
					var obj = {};
					obj.index = (i + 1);
					obj.id = data[i].id;
					obj.name = data[i].servicename;
					obj.image = data[i].poster;
					obj.url = data[i].urlfilm;
					obj.price = data[i].price;
					obj.iunit = data[i].iunit;
					_.data[_.subjectIndex - 1].items.push(obj);
					$(_.element_item).find('ul').append(eLayout.itemSlide(obj, _.classes));
				}
				$(_.element_item).css('margin-left', _.margin + 'px');
				_.show();
				_.initSlide(_.element_item, 0);
				_.focus();
				eCommon.unblockUI();
			},
			error : function(error) {
				var obj = {};
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
				obj.onkeydown = _.classes + '.errorNoContent()';
				eModal.showInfo(obj);
			}
		});
	}
	Slide.prototype.reInitItems = function(indexSubject){
		var _ = this;
		indexSubject = indexSubject || _.subjectIndex;
		var list = _.data[indexSubject - 1].items;
		_.slideIndex = _.data[indexSubject - 1].slideIndex;
		_.slideCount = list.length;
		for (var i = 0; i < list.length; i++) {
			$(_.element_item).find('ul').append(eLayout.itemSlide(list[i], _.classes));
		}
		
		if (_.slideCount < _.itemsInRow) {
			for (var i = 0; i < _.slideCount; i++) {
				$(_.element_item).find('div.thumbnail[tabindex=' + (i + 1) + '] img').attr('src', (_.data[indexSubject - 1].items[i].image));
				$(_.element_item).find('div.thumbnail[tabindex=' + (i + 1) + '] img').attr('data-status', "1");
			}
		} else {
			for (var i = 0; i < _.itemsInRow; i++) {
				$(_.element_item).find('div.thumbnail[tabindex=' + (i + 1) + '] img').attr('src', (_.data[indexSubject - 1].items[i].image));
				$(_.element_item).find('div.thumbnail[tabindex=' + (i + 1) + '] img').attr('data-status', "1");
			}
		}
		
		_.initSlide(_.element_item, 0);
		_.focus();
	}
	Slide.prototype.left = function($this){
		var _ = this;
		if(!_.isKeyPress){
			_.isKeyPress = true;
			_.timeout = setTimeout(function(){
				if (_.slideIndex > 1) {
						if (Number(_.slideIndex) <= parseInt(_.itemsInRow / 2)) {
							$(_.element_item).css('margin-left', _.margin + 'px');
						}
						$(_.element_item).slideLG('prev');
						_.slideIndex = Number($(_.element_item).find('li.active div.thumbnail').attr('tabindex'));
						_.focus();
					}
					_.isKeyPress = false;
			}, 200);
		}
		
	}
	Slide.prototype.right = function($this){
		var _ = this;
		if(!_.isKeyPress){
			_.isKeyPress = true;
			_.timeout = setTimeout(function(){
				if (_.slideIndex < _.slideCount) {
						if (Number(_.slideIndex) >= parseInt(_.itemsInRow / 2)) {
							$(_.element_item).css('margin-left', '0px');
						}
						$(_.element_item).slideLG('next');
						_.slideIndex = Number($(_.element_item).find('li.active div.thumbnail').attr('tabindex'));
						_.focus();
					}
					_.isKeyPress = false;
			}, 100);
		}
	}
	Slide.prototype.add = function(url, offset, limit){
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
				var end =  _.data[_.subjectIndex - 1].items.length;
				var li = '';
				// set itemsubject
				for(var i= 0; i < length; i++){
					var obj = {};
					obj.index = (end + i + 1);
					obj.id = data[i].id;
					obj.name = data[i].title;
					obj.image = data[i].thumb;
					obj.url = API.getAPI().HDPLAY_GET_STREAM + obj.id;//'movies/url/' + obj.id;//API.getAPI().HDPLAY_GET_STREAM + obj.id;
					_.data[_.subjectIndex - 1].items.push(obj);
					$(_.element_item).find('ul').append(eLayout.itemSlide(obj, _.classes));
				}
				_.slideCount = _.data[_.subjectIndex - 1].items.length;
				$(_.element_item).find('ul li').each(function(index, element){
					if(index < _.limit){
						$(element).trigger('remove');
					}
				});
				var index = $(_.element_item).find('ul li').index($(_.element_item).find('ul li.active'));
				$(_.element_item).slideLG(false);
				_.initSlide(_.element_item, index);
			},
			error : function(error) {
				console.log('--> error ' + url + '/' + offset + '/' + limit);
			}
		});
	}
	Slide.prototype.leftSubject = function($this) {
		var _ = this;
		$(_.element_subject).slideLG('prev');
		_.subjectFocus();
	}

	Slide.prototype.rightSubject = function($this) {
		var _ = this;
		$(_.element_subject).slideLG('next');
		_.subjectFocus();
	}
	
	
	Slide.prototype.initSlide = function(){
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
			startAt : arguments[1],
			scrollBy : 1,
			speed : 0,
			moveBy: 0,
			elasticBounds : 1,
			easing : 'swing',
			dragHandle : 0,
			dynamicHandle : 1,
			clickBar : 0,
			// Buttons
			prev : $(arguments[0]).parent().find('.prev'),
			next : $(arguments[0]).parent().find('.next')
		};
		var slideLG = new SlideLG(arguments[0], options).init();
	}
	var instance = null;
	var static_ = {
			get: function(options){
				if(instance === null){
					instance = new Slide(options);
				}
				return instance;
			}
	};
	Slide.prototype.back = function(){
		var _ = this;
		$(_.element_item).find('ul').empty();
		$(_.element_item).slideLG(false);
		$(_.element_subject).slideLG(false);
		$(_.element_subject).find('ul').empty();
		_.subjectIndex = 1;
		_.data = [];
		_.hide();
		eCommon.showFooter();
		instance = null;
	}
	return static_;
})();
