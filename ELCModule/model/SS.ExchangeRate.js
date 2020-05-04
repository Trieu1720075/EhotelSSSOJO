eExchangeRate = {
	name : 'Exchange Rate',
	key: 'EXCHANGE_RATE',
	exchangeRateObject : [],
	element : $('#scenes-exchange-rate'),
	slideIndex : 0,
	itemsInRow : 5,
	numRow : 3,
	content : $('#content-exchange-rate'),
	slide : '#slide-exchange-rate',
	slideText : '#slide-exchange-rate-text',
	keyPress : false,
	subjectObject : [],
	slideObject : [],
	marginLeft : 0,
	classes: 'eExchangeRate'
};

eExchangeRate.init = function() {
	var _ = this;
	_.getSubject();
	eCommon.HISTORY.push(this);
}
eExchangeRate.show = function() {
	eCommon.hideFooter();
	this.element.show();
//	$(eCommon.navbarName).text(this.name);
}

eExchangeRate.hide = function() {
	this.element.hide();
	eCommon.showFooter();
}

eExchangeRate.unload = function() {
	var _ = this;
	$(_.slide).slideLG(false);
	$(_.slideText).slideLG(false);
	$(_.slide).find('ul').empty();
	$(_.slideText).find('ul').empty();
	_.slideIndex = 0;
}

eExchangeRate.focus = function() {
	$(this.slide).find('li.active div.thumbnail').focus();
	var index = Number($(this.slide).find('li.active div.thumbnail').attr('tabindex'));
	this.content.html(eLayout.contentExchangeRate(this.subjectObject[index - 1]));
}

eExchangeRate.reInit = function() {
	var _ = this;
	_.show();
	var index = _.languageIndex();
	var subject = _.exchangeRateObject[index].subject;
	_.subjectObject = subject;
	for (var i = 0; i < subject.length; i++) {
		// reinit subject
		var obj = new Object();
		obj.name = subject[i].name;
		obj.image = subject[i].image;
		obj.id = subject[i].id;
		obj.icon = subject[i].icon;
		obj.buy = subject[i].buy;
		obj.tranfer = subject[i].tranfer;
		obj.sale = subject[i].sale;
		obj.code = subject[i].code;
		obj.index = subject[i].index;
		obj.marginLeft = _.marginLeft;
		obj.transform = '';
		obj.width = '';
		obj.slideIndex = 0;
		$(_.slide).find('ul').append(eLayout.itemExchangeRate(obj));
		$(_.slideText).find('ul').append(eLayout.itemExchangeRateText(obj));
	}
	$(_.slide).find('ul').attr('data-count', subject.length);
	$(_.slideText).find('ul').attr('data-count', subject.length);
	$(_.slide).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
	$(_.slideText).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
	_.initSlide(_.slide, 1, 0);
	_.initSlide(_.slideText, 1, 0);
	_.focus();
	eCommon.unblockUI();
}

eExchangeRate.getSubject = function() {
	var _ = this;
	_.show();
	$.ajax({
		url : API.getAPI().CMD_117,
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
				obj.onkeydown = 'eExchangeRate.errorNoSubject()';
				obj.onclick = 'eExchangeRate.errorNoSubjectClick()';
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
				obj.name = $(element).find("name").text();
				obj.image = $(element).find("url").text();
				obj.id = $(element).attr("id");
				obj.icon = $(element).find("urlICon").text();
				obj.buy = $(element).find("buyRate").text();
				obj.tranfer = $(element).find("exRateVN").text();
				obj.sale = $(element).find("sellRate").text();
				obj.code = $(element).find("code").text();
				obj.index = (i + 1);
				obj.marginLeft = _.marginLeft;
				obj.classes = _.classes;
				obj.slideIndex = 0;
				_.subjectObject.push(obj);
				$(_.slide).find('ul').append(eLayout.itemExchangeRate(obj));
				$(_.slideText).find('ul').append(eLayout.itemExchangeRateText(obj));
			});
			// init sidebar
			$(_.slide).find('ul').attr('data-count', _.subjectObject.length);
			$(_.slideText).find('ul').attr('data-count', _.subjectObject.length);
			$(_.slide).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			$(_.slideText).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			_.initSlide(_.slide, 1, 0);
			_.initSlide(_.slideText, 1, 0);
			// save data
			var obj = new Object();
			obj.language = eCommon.languageCode;
			obj.subject = _.subjectObject;
			_.exchangeRateObject.push(obj);
			_.focus();
			eCommon.unblockUI();
		},
		error : function(error) {
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = 'eExchangeRate.errorNoSubject()';
			obj.onclick = 'eExchangeRate.errorNoSubjectClick()';
			eModal.showInfo(obj);
		}
	});
}

eExchangeRate.initSlide = function(slideId, type, startAt) {
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

eExchangeRate.rightFocus = function() {
	var _ = this;
	var count = Number($(_.slide).find('ul').attr('data-count'));
	if (_.slideIndex == count) {
		return;
	}
	_.slideIndex++;
	$(_.slide).parent().find('.next').trigger('click');
	$(_.slideText).parent().find('.next').trigger('click');
	_.focus();
}


eExchangeRate.leftFocus = function() {
	var _ = this;
	if (_.slideIndex == 1) {
		return;
	}
	_.slideIndex--;
	$(_.slide).parent().find('.prev').trigger('click');
	$(_.slideText).parent().find('.prev').trigger('click');
	_.focus();
}

eExchangeRate.back = function() {
	var _ = this;
	_.hide();
	_.unload();
}

eExchangeRate.clickItem = function (object) {
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

eExchangeRate.errorNoSubjectClick = function() {
	var _ = this;
	eModal.hideInfo();
	eCommon.HISTORY.back();
}

eExchangeRate.keyDown = function() {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_LEFT:
		_.leftFocus();
		break;
	case eCommon.KEY_RIGHT:
		_.rightFocus();
		break;
	case eCommon.KEY_ENTER:
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}

eExchangeRate.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			welcome.playSound(welcome.select);
			_.errorNoSubjectClick();
			break;
		case eCommon.KEY_EXIT:
			welcome.playSound(welcome.reload);
			eModal.hideInfo();
			location.reload();
			break;
	}
}