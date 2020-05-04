eFood = {
	name : '',
	key:"FOOD",
	data : [],
	element : '#scenes-food',
	container : '#container-food-view',
	containerSubject : '#container-food-subject',
	containerFood : '#content-food-list',
	foodHeadingLeft: '.bar-food-heading-left',
	foodHeadingRight: '.bar-food-heading-right',
	foodHeadingImage: '.bar-food-heading-image',
	classes : 'eFood',
	subjectIndex : 0,
	subjectFoodIndex : 0,
	foodIndex: 0,
	subjectList:[],
};

eFood.init = function(url) {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.getSubject(url);
}

eFood.languageIndex = function() {
	var _ = this;
	for (var i = 0; i < _.data.length; i++) {
		if (eCommon.languageCode == _.data[i].language) {
			return i;
		}
	}
	return -1;
}

eFood.resetsubjectFood = function() {
	var _ = this;
	$(_.container).slideLG(false);
	$(_.container).find('ul').empty();
	$(_.container).parent().find('div.hidden').trigger('remove');
}

eFood.resetFood = function() {
	var _ = this;
	$(_.containerFood).slideLG(false);
	$(_.containerFood).find('ul').empty();
	$(_.containerFood).parent().find('div.hidden').trigger('remove');
}

eFood.show = function() {
	var _ = this;
	$(_.element).find('div.container-fluid').show();
	$(_.foodHeadingLeft).find('h4').eq(0).html(eCommon.htmlToText(language.FOOD_ORDER));
	$(_.foodHeadingLeft).find('h3').eq(0).html(language.FOOD_TOTAL);
	$(_.foodHeadingLeft).find('h3').eq(1).html('0');
	$(_.foodHeadingLeft).find('h3').eq(2).html(language.FOOD_TOTAL_QUALITY);
	$(_.foodHeadingLeft).find('h3').eq(3).html('0');
	var btn = '<button id="btn-order" class="btn btn-sm" onkeydown="eFood.orderKeyDown(this, event)" onclick="eFood.orderClick(this, event)"><img src="ELCommon/view/images/ic_ordered.png"/><h4>'+language.FOOD_ORDERED+'</h4></button>';
	$('.bar-footer').html(btn);
	//$('.bar-footer').find('h4').eq(0).html(language.FOOD_INFO);
	//$('.bar-footer').find('h4').eq(1).html(language.FOOD_ORDERED);
	$('.bar-footer-content').find('h4').eq(0).html(language.FOOD_OK);
	$('.bar-footer-content').find('h4').eq(1).html(language.FOOD_BACK);
	$('.bar-footer-content').find('h4').eq(2).html(language.FOOD_EXIT);
	$('.modal-footer-guide').find('h4').eq(0).html(language.FOOD_LEFT);
	$('.modal-footer-guide').find('h4').eq(1).html(language.FOOD_RIGHT);
	$(_.foodHeadingRight).find('h4').text(eCommon.htmlToText(eCommon.CUSTOMER));
	$(_.foodHeadingRight).find('p').text(eCommon.htmlToText(eCommon.ROOM));
	
	eCommon.hideFooter();
	$(_.element).show();
//	$(eCommon.navbarName).text(this.name);
}

eFood.hide = function() {
	eCommon.showFooter();
	$(this.element).hide();
}

eFood.focus = function() {
	$(this.container).find('li.active .item-sub').focus();
}

eFood.selected = function(){
	$(this.container).find('li').removeClass("item-selected");
	$(this.container).find('li div[tabindex="' + (this.subjectFoodIndex + 1) + '"]').parent().addClass("item-selected");
	var src = this.subjectList[this.subjectIndex].subjectFood[this.subjectFoodIndex].image;
	var txt = this.subjectList[this.subjectIndex].subjectFood[this.subjectFoodIndex].name;
	$(this.foodHeadingImage).html('<img src="'+API.getAPI().LOCATION_IMAGE.concat(src)+'"/><div><h4>'+eCommon.htmlToText(txt)+'</h4></div>');
}

eFood.contentSelects = function() {
	$(this.containerFood).find('li.active').focus();
}

eFood.subjectSelects = function() {
	$(this.containerSubject).find('ul li.active .thumbnail').focus();
}
eFood.orderSelects = function() {
	$('#btn-order').focus();
}
eFood.unload = function() {
	var _ = this;
	data = [];
	_.subjectIndex = 0;
	_.subjectFoodIndex = 0;
	_.foodIndex = 0;
	_.subjectList = [];
	_.resetsubjectFood();
	_.resetFood();
	$(_.containerSubject).slideLG(false);
	$(_.containerSubject).find('ul').empty();
	$(_.containerSubject).parent().parent().removeAttr("style");
	_.subjectList = [];
}

eFood.reInit = function() {
	var _ = this;
	var index = _.languageIndex();
	_.listObject = _.data[index].listObject;
	_.subjectFocus = _.data[index].subjectFocus;
	_.itemFocus = _.data[index].itemFocus;
	_.subjectIndex = _.subjectFocus;

	for(var i = 0; i < _.listObject.length; i++){
		$(_.containerSubject).append(eLayout.subjectSlide(_.listObject[i], _.classes));
	}
	
	_.show();
	_.subjectSelects();
	_.reInitItem();
	eCommon.unblockUI();
}

eFood.reInitFood = function(){
	var _ = this;
	_.resetFood();
	var foods = _.subjectList[_.subjectIndex].subjectFood[_.subjectFoodIndex].foods;
	var length = foods.length;
	for(var i = 0; i < length; i++){
		$(_.containerFood).find('ul').append(eLayout.itemFood(foods[i], _.classes));
	}
	$(_.containerFood).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
	_.initSlide(_.containerFood,0, 0);
}

eFood.reInitsubjectFood = function() {
	var _ = this;
	_.resetsubjectFood();
	var subject = _.subjectList[_.subjectIndex].subjectFood;
	var length = subject.length;
	for (var i = 0; i < length; i++) {
		$(_.container).find('ul').append(eLayout.itemHtml(subject[i], _.classes));
	}
	$(_.element).find('div.container-fluid').show();
	$(_.container).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
	_.subjectFoodIndex = 0;
	_.initSlide(_.container, 0, 0);
	_.focus();
	_.enterFocus();
}

eFood.getSubject = function(url) {
	var _ = this;
	$.ajax({
		url : url,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			_.subjectIndex = 0;
			var length = data.length;
			if (length == 0) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-white">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = _.classes + '.errorNoSubject()';
				obj.onclick = _.classes + '.errorNoSubjectClick()';
				eModal.showInfo(obj);
				return;
			}
			
			for(var i = 0;i < length; i++){
				var obj = new Object();
				obj.id = data[i].id;
				obj.name = data[i].name;
				obj.image = data[i].urlImage;
				obj.icon = data[i].urlIcon;
				obj.url = API.getAPI().CMD_1071 + obj.id;
				obj.index = (i + 1);
				obj.subjectFood = [];
				_.subjectList.push(obj);
				$(_.containerSubject).find('ul').append(eLayout.subject(obj, _.classes));
			}
			// set object language
			_.show();
			_.initSlide(_.containerSubject, 1, 0);
			// set position center 
			var distance = $(_.containerSubject).outerWidth() - $(_.containerSubject).find('ul li').outerWidth()*length;
			if (distance > 0) {
				$(_.containerSubject).find('ul').css({'margin-left' : distance/2 + 'px'});
			}
			$(_.containerSubject).parent().parent().css({"margin-bottom":"15px"});
			var obj = new Object();
			obj.language = eCommon.languageCode;
			_.data.push(obj);
			_.getItem(_.subjectList[_.subjectIndex].url);
		},
		error : function(error) {
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-white">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = _.classes + '.errorNoSubject()';
			obj.onclick = _.classes + '.errorNoSubjectClick()';
			eModal.showInfo(obj);
		}
	});
}

eFood.getItem = function(url) {
	var _ = this;
	$.ajax({
		url : url,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			var subjectFood = [];
			var length = data.length;
			_.subjectFoodIndex = 0;
			// reset
			if ($(_.container).find('ul li').length > 0) {
				_.resetsubjectFood();
			}
			if (length == 0) {
				$(_.element).find('div.container-fluid').hide();
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-white">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = _.classes + '.errorNoContent()';
				obj.onclick = _.classes + '.errorNoContentClick()';
				eModal.showInfo(obj);
				return;
			}
			$(_.element).find('div.container-fluid').show();
			
			if ($(_.containerFood).find('ul li').length > 0) {
				_.resetFood();
			}
			// set itemsubject
			for(var i = 0; i < length; i++){
				var obj = new Object();
				obj.id = data[i].id;
				obj.name = data[i].name;
				obj.url = API.getAPI().CMD_1072 + obj.id;
				obj.image = data[i].urlImage;
				obj.index = (i + 1);
				obj.foods = [];
				subjectFood.push(obj);
				$(_.container).find('ul').append(eLayout.itemHtml(obj, _.classes));
			}
			_.subjectList[_.subjectIndex].subjectFood = subjectFood;
			$(_.container).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			_.initSlide(_.container, 0, 0);
			_.focus();
			_.selected();
			_.getFood(subjectFood[_.subjectFoodIndex].url);
			eCommon.unblockUI();
		},
		error : function(error) {
			$(_.element).find('div.container-fluid').hide();
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-white">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = _.classes + '.errorNoContent()';
			obj.onclick = _.classes + '.errorNoContentClick()';
			eModal.showInfo(obj);
		}
	});
}

eFood.getFood = function(url){
	var _ = this;
	$.ajax({
		url : url,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			var length = data.length;
			var food = [];
			// reset
			if ($(_.containerFood).find('ul li').length > 0) {
				_.resetFood();
			}
			if (length == 0) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = _.classes + '.errorNoContent()';
				obj.onclick = _.classes + '.errorNoContentClick()';
				eModal.showInfo(obj);
				return;
			}
			// set itemsubject
			for(var i = 0; i < length; i++){
				var obj = new Object();
				obj.id = data[i].id;
				obj.name = data[i].printname;
				obj.def =data[i].def;
				obj.currency = data[i].currency;
				obj.iunit = data[i].itemunit;
				obj.image = data[i].urlImage;
				obj.count = 0;
				obj.index = (i + 1);
				food.push(obj);
				$(_.containerFood).find('ul').append(eLayout.itemFood(obj, _.classes));
			}
			_.subjectList[_.subjectIndex].subjectFood[_.subjectFoodIndex].foods = food;
			$(_.containerFood).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			_.initSlide(_.containerFood, 0, 0);
			eCommon.unblockUI();
		},
		error : function(error) {
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-white">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = _.classes + '.errorNoContent()';
			obj.onclick = _.classes + '.errorNoContentClick()';
			eModal.showInfo(obj);
		}
	});
}

eFood.initSlide = function(container, type, startAt) {
	var _ = this;
	var options = {
		horizontal : type,
		itemNav : 'centered',
		smart : 1,
		activateOn : 'click',
		activateMiddle : 1,
		mouseDragging : 1,
		touchDragging : 1,
		releaseSwing : 0,
		startAt : startAt,
		scrollBy : 1,
		speed : 0,
		elasticBounds : 1,
		easing : 'linear',
		dragHandle : 0,
		dynamicHandle : 1,
		clickBar : 0,
		// Buttons
		prev : $(container).parent().find('.prev'),
		next : $(container).parent().find('.next')
	};
	var slideLG = new SlideLG(container, options).init();
}

eFood.upFocus = function($this) {
	var _ = this;
	$(_.container).slideLG('prev');
	_.focus();

}

eFood.downFocus = function($this) {
	var _ = this;
	var index = Number($(_.container).find('li.active .item-sub').attr('tabindex')) - 1;
	if (index < _.subjectList[_.subjectIndex].subjectFood.length - 1) {
		$(_.container).slideLG('next');
		_.focus();
	} else {
		_.orderSelects();
//		_.subjectSelects();
	}
}

eFood.enterFocus = function($this) {
	var _ = this;
	_.subjectFoodIndex = Number($(_.container + ' ul li.active .item-sub').attr('tabindex')) - 1;
	_.selected();
	if(_.subjectList[_.subjectIndex].subjectFood[_.subjectFoodIndex].foods.length == 0){
		var url = _.subjectList[_.subjectIndex].subjectFood[_.subjectFoodIndex].url;
		_.getFood(url);
	} else {
		_.reInitFood();
	}
}

eFood.rightFocus = function() {
	this.contentSelects();
}

eFood.leftFocus = function() {
	this.subjectSelects();
}

eFood.contentUpFocus = function() {
	var _ = this;
	_.foodIndex = Number($(_.containerFood).find('li.active').attr('tabindex')) - 1;
	if (_.foodIndex > 0) {
		$(_.containerFood).parent().find('.prev').trigger('click');
		_.contentSelects();
	} 
}

eFood.contentDownFocus = function() {
	var _ = this;
	_.foodIndex = Number($(_.containerFood).find('li.active').attr('tabindex')) - 1;
	if (_.foodIndex < _.subjectList[_.subjectIndex].subjectFood[_.subjectFoodIndex].foods.length) {
		$(_.containerFood).slideLG('next');
		_.contentSelects();
	}
}

eFood.contentRightFocus = function() {
	this.subjectSelects();
}

eFood.contentLeftFocus = function() {
	this.focus();
}

eFood.subjectRightFocus = function($this) {
	var _ = this;
	$(_.containerSubject).slideLG('next');
	_.subjectSelects();
}

eFood.subjectLeftFocus = function($this) {
	var _ = this;
	$(_.containerSubject).slideLG('prev');
	_.subjectSelects();
}

eFood.subjectUpFocus = function($this) {
	var _ = this;
	$(_.containerSubject).slideLG('activate', _.subjectIndex, true);
//	_.focus();
	_.orderSelects();
}

eFood.subjectEnterFocus = function($this) {
	var _ = this;
	_.subjectFoodIndex = 0;
	_.subjectIndex = Number($($this).attr('tabindex')) -1;
	if (_.subjectList[_.subjectIndex].subjectFood.length > 0) {
		_.reInitsubjectFood();
	} else {
		var url = _.subjectList[_.subjectIndex].url;
		_.getItem(url);
	}
	_.subjectSelects();
}

eFood.foodOrder = function(){
	var _=this;
	var subjectFoodIndex =  Number($(_.container).find('ul li.item-selected .item-sub').attr('tabindex')) - 1;
	var foodIndex = Number($(_.containerFood).find('ul li.active').attr('tabindex')) - 1;
	var option = new Object();
	_.subjectList[_.subjectIndex].subjectFood[subjectFoodIndex].foods[foodIndex].count += 1;
	var count = _.subjectList[_.subjectIndex].subjectFood[subjectFoodIndex].foods[foodIndex].count;
	$(_.containerFood).find('ul li.active span.badge').html(count);
	var opt = _.subjectList[_.subjectIndex].subjectFood[subjectFoodIndex].foods[foodIndex];
	option.name = opt.name;
	option.def = opt.def;
	option.currency = opt.currency;
	option.price = opt.currency;
	option.iunit = opt.iunit;
	option.thumbnail = opt.image;
	option.id = opt.id;
	option.count = count;
	option.time = eCommon.getTime();
	option.date = eCommon.getDate();
	eCard.add(option);
}
eFood.back = function() {
	var _ = this;
	_.unload();
	_.hide();
}
eFood.clickSubject = function(object) {
	var _ = this;
	var index = $(object).attr("tabindex");
	if (_.subjectIndex < index - 1) {
		var length = (index - 1) - _.subjectIndex;
		for (var i = 0; i < length; i++) {
			_.subjectRightFocus();
		}
	} else {
		var length = _.subjectIndex - (index - 1);
		for (var i = 0; i < length; i++) {
			_.subjectLeftFocus();
		}
	}
	_.subjectEnterFocus();
}

eFood.clickItem = function(object) {
	var _ = this;
	var index = $(object).attr("tabindex");
	if (_.subjectFoodIndex < index - 1) {
		var length = (index - 1) - _.subjectFoodIndex;
		for (var i = 0; i < length; i++) {
			_.downFocus();
		}
	} else {
		var length = _.subjectFoodIndex - (index - 1);
		for (var i = 0; i < length; i++) {
			_.upFocus();
		}
	}
	_.enterFocus();
}

eFood.errorNoSubjectClick = function() {
	var _ = this;
	eModal.hideInfo();
	_.hide();
	_.unload();
	eCommon.HISTORY.back();
}

eFood.errorNoContentClick = function() {
	var _ = this;
	eModal.hideInfo();
	_.subjectSelects();
}

eFood.foodKeyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_UP:
		_.contentUpFocus();
		break;
	case eCommon.KEY_DOWN:
		_.contentDownFocus();
		break;
	case eCommon.KEY_LEFT:
		_.contentLeftFocus();
		break;
	case eCommon.KEY_RIGHT:
		_.contentRightFocus();
		break;
	case eCommon.KEY_ENTER:
		_.foodOrder();
		break;
	case eCommon.KEY_INFO:
		eCard.showOrder();
		break;
	case eCommon.KEY_RETURN:
		if(eCard.card.length > 0){
			eModal.showConfirm();
			return;
		}
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
	}
}

eFood.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_UP:
		_.upFocus($this);
		break;
	case eCommon.KEY_DOWN:
		_.downFocus($this);
		break;
	case eCommon.KEY_RIGHT:
		_.rightFocus($this);
		break;
	case eCommon.KEY_LEFT:
		_.leftFocus($this);
		break;
	case eCommon.KEY_ENTER:
		_.enterFocus($this);
		break;
	case eCommon.KEY_INFO:
		eCard.showOrder();
		break;
	case eCommon.KEY_RETURN:
		if(eCard.card.length > 0){
			eModal.showConfirm();
			return;
		}
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}
eFood.orderClick = function($this, event){
	var _=this;
	event.stopImmediatePropagation();
	eCard.showOrder();
}
eFood.subjectClick = function($this, event){
	eFood.subjectEnterFocus($this);
}
eFood.itemClick  = function($this, event){
	var index = $($this).attr('tabindex');
	$(this.container).slideLG('activate', index - 1, true);
	$($this).focus();
	this.enterFocus($this);
}
eFood.foodClick = function($this, event) {
	event.stopImmediatePropagation();
	var index = $($this).attr('tabindex');
	$(this.containerFood).slideLG('activate', index - 1, true);
	$($this).focus();
	this.foodOrder();
}
eFood.orderKeyDown = function($this, event){
	var _=this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_UP:
			_.focus();
			break;
		case eCommon.KEY_DOWN:
			_.subjectSelects();
			break;
		case eCommon.KEY_ENTER:
			eCard.showOrder();
			break;
		case eCommon.KEY_RIGHT:
			_.rightFocus($this);
			break;
		case eCommon.KEY_RETURN:
			if(eCard.card.length > 0){
				eModal.showConfirm();
				return;
			}
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}
eFood.subjectKeyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_INFO:
		eCard.showOrder();
		break;
	case eCommon.KEY_UP:
		_.subjectUpFocus($this);
		break;
	case eCommon.KEY_RIGHT:
		_.subjectRightFocus($this);
		break;
	case eCommon.KEY_LEFT:
		_.subjectLeftFocus($this);
		break;
	case eCommon.KEY_ENTER:
		_.subjectEnterFocus($this);
		break;
	case eCommon.KEY_RETURN:
		if(eCard.card.length > 0){
			eModal.showConfirm();
			return;
		}
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}

eFood.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_ENTER:
		_.errorNoSubjectClick();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}

eFood.errorNoContent = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_ENTER:
		_.errorNoContentClick();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}

eFood.formatCurrentcy = function(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

eFood.formatCurrentcyUnit = function(a, t) {
	var d = '', j = 0, c = '';
	for (var i = 0; i < a.length; i++){
		if (!isNaN(parseInt(a[i]))){
			c += a[i];
		} else {
			if (c != '') d += eFood.formatCurrentcy(c, t);
			d += a[i];
			c = '';
		}
	}
	return d;
}