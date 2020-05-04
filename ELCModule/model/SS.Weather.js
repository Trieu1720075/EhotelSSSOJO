var xmlAPI = new parseXML();

eWeather = {
	name : 'Weather',
	key: 'eWeather',
	element : '#scenes-weather',
	slideIndex : 0,
	itemsInRow : 5,
	itemWeather : '.day-weather',
	slide : '#slide-weather',
	slideText : '#slide-weather-text',
	classes: 'eWeather',
	keyPress : false,
	classes: 'eWeather',
	subjectObject : [],
	timeout: 0
};

eWeather.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.getSubject();
}

eWeather.show = function() {
	$(this.element).show();
//	$(eCommon.navbarName).text(this.name);
	eCommon.hideFooter();
}

eWeather.hide = function() {
	$(this.element).hide();
	eCommon.showFooter();
}


eWeather.focus = function() {
	$(this.slide).find('li.active div.thumbnail').focus();
}

eWeather.getSubject = function() {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_118,
		data : "",
		cache : false,
		type : 'GET',
		async : true,
		success : function(response) {
			var xml = xmlAPI.loadXMLString(response);
			if (xml.find('item').length == 0) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = 'eWeather.errorNoSubject()';
				eModal.showInfo(obj);
				return;
			}
			
			subjectObject = [];
			_.slideIndex = 1;
			var length = xml.find('item').length;
			_.slideCount = length;
			// set item subject
			xml.find('item').each(function(i, element) {
				var obj = new Object();
				obj.id = $(element).attr("id");
				obj.name = $(element).find("name").text();
				obj.code = $(element).find("code").text();
				obj.image = $(element).find("urlImage").text();
				obj.icon = $(element).find("urlIcon").text();
				obj.classes = _.classes;
				obj.index = (i + 1);
				obj.items = [];
				_.subjectObject.push(obj);
				$(_.slide).find('ul').append(eLayout.subjectWeather(obj));
				$(_.slideText).find('ul').append(eLayout.subjectTextWeather(obj));
			});
			_.show();
			// init sidebar
			$(_.slide).find('ul').attr('data-count', length);
			$(_.slideText).find('ul').attr('data-count', length);
			$(_.slide).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			$(_.slideText).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			_.initSlide(_.slide, 1, 0);
			_.initSlide(_.slideText, 1, 0);
			_.getItem(_.subjectObject[_.slideIndex - 1].id, _.subjectObject[_.slideIndex - 1].name);		
			_.focus();
			eCommon.unblockUI();
		},
		error : function(error) {
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = 'eWeather.errorNoSubject()';
			eModal.showInfo(obj);
		}
	});
}

eWeather.getItem = function(countryId, countryName) {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_120 + countryId,
		data : "",
		cache : false,
		type : 'GET',
		async : true,
		success : function(response) {
			var xml = xmlAPI.loadXMLString(response);
			if (xml.find('item').length == 0) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = 'eWeather.errorNoContent()';
				eModal.showInfo(obj);
				return;
			}
			
			xml.find('item').each(function(i, element) {
				var obj = new Object();
				obj.id = $(element).attr("id");
				obj.datetime = $(element).find("datetime").text();
				obj.temp = $(element).find("temp").text();
				obj.tempmin = $(element).find("tempmin").text();
				obj.tempmax = $(element).find("tempmax").text();
				obj.day = $(element).find("day").text();
				obj.urlImage = $(element).find("urlImage").text();
				obj.description = $(element).find("description").text();
				obj.index = (i + 1);
				_.subjectObject[_.slideIndex - 1].items.push(obj);
				if (i == 0) {
					obj.weekdays = language.WEATHER_TODAY;
					$('.day-weather-large').append(eLayout.itemWeatherLarge(obj, countryName));
				} else {
					if (i == 1) {
						obj.weekdays = language.WEATHER_TOMORROW;
					} else {
						obj.weekdays = _.getWeekDays(Number(obj.day));
					}
					$('.day-weather-' + i).append(eLayout.itemWeather(obj));
				}
			});
		},
		error : function(error) {
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = 'eWeather.errorNoContent()';
			eModal.showInfo(obj);
		}
	});
}

eWeather.initSlide = function(slideId, type, startAt) {
	var _ = this;
	var options = {
		horizontal : type,
		itemNav : 'centered',
		smart : 1,
		activateOn : 'click',
		mouseDragging : 0,
		touchDragging : 0,
		releaseSwing : 0,
		startAt : startAt,
		scrollBy : 1,
		speed : 0,
		elasticBounds : 1,
		easing : 'easeOutExpo',
		dragHandle : 0,
		dynamicHandle : 1,
		clickBar : 0,
		activateOn : 'click',
		// Buttons
		prev : $(slideId).parent().find('.prev'),
		next : $(slideId).parent().find('.next')
	};
	var slideLG = new SlideLG(slideId, options).init();
}

eWeather.rightFocus = function() {
	var _ = this;
	var count = Number($(_.slide).find('ul').attr('data-count'));
	if (_.slideIndex == count) {
		return;
	}
	$(_.slide).parent().find('.next').trigger('click');
	$(_.slideText).parent().find('.next').trigger('click');
	_.slideIndex++;
	_.focus();
	clearTimeout(_.timeout);
	_.timeout = setTimeout('eWeather.enterFocus()', 1000);
}


eWeather.leftFocus = function() {
	var _ = this;
	if (_.slideIndex == 1) {
		return;
	}
	$(_.slide).parent().find('.prev').trigger('click');
	$(_.slideText).parent().find('.prev').trigger('click');
	_.slideIndex--;
	_.focus();
	clearTimeout(_.timeout);
	_.timeout = setTimeout('eWeather.enterFocus()', 1000);
}

eWeather.enterFocus = function() {
	var _ = this;
	_.slideIndex = Number($(_.slide).find('li.active div.thumbnail').attr('tabindex'));
	$(_.itemWeather).empty();
	_.getItem(_.subjectObject[_.slideIndex - 1].id, _.subjectObject[_.slideIndex - 1].name);
}

eWeather.getWeekDays = function(day) {
	var result = "";
	switch(day) {
	case 2 : 
		result = language.WEATHER_MONDAY;
		break;
	case 3 : 
		result = language.WEATHER_TUESDAY;
		break;
	case 4 : 
		result = language.WEATHER_WEDNESDAY;
		break;
	case 5 : 
		result = language.WEATHER_THURSDAY;
		break;
	case 6 : 
		result = language.WEATHER_FRIDAY;
		break;
	case 7 : 
		result = language.WEATHER_SATURDAY;
		break;
	case 8 : 
		result = language.WEATHER_SUNDAY;
		break;
	default :
		break;
	}
	return result;
}

eWeather.home = function() {
	var _ = this;
	_.hide();
	_.unload();
	eHotelMain.show();
	eHotelMain.focus();
}

eWeather.back = function() {
	var _ = this;
	this.hide();
	$(_.slide).slideLG(false);
	$(_.slide).find('ul').empty();
	$(_.slideText).slideLG(false);
	$(_.slideText).find('ul').empty();
	$(_.itemWeather).empty();
	_.slideIndex = 1;
}

eWeather.clickItem = function (object) {
	var _ = this;
	var slideIndex = $(object).attr("tabindex");
	if (_.slideIndex < slideIndex) {
		var length = slideIndex - _.slideIndex;
		for (var i = 0; i < length; i++) {
			_.rightFocus();
		}
	} else {
		var length = _.slideIndex - slideIndex;
		for (var i = 0; i < length; i++) {
			_.leftFocus();
		}
	}
	_.enterFocus();
}

eWeather.keyDown = function() {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_HOME:
		eWelcome.playSound(eCommon.back);
		_.home();
		break;
	case eCommon.KEY_LEFT:
		eWelcome.playSound(eCommon.left);
		_.leftFocus();
		break;
	case eCommon.KEY_RIGHT:
		eWelcome.playSound(eCommon.right);
		_.rightFocus();
		break;
	case eCommon.KEY_ENTER:
		eWelcome.playSound(eCommon.select);
		_.enterFocus();
		break;
	case eCommon.KEY_RETURN:
		eWelcome.playSound(eCommon.back);
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		eWelcome.playSound(eCommon.reload);
		location.reload();
		break;
	}
}

eWeather.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
	}
}

eWeather.errorNoContent = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			eModal.hideInfo();
			_.focus();
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
	}
}