eMain = {
	name : 'MAIN',
	key: "MAIN",
	data: [],
	element : '#scenes-main',
	slideIndex : 1,
	slideCount : 0,
	itemInRow: 4,
	slide : '#ehotel-item',
	minSlide : 8,
	initialSlide : 0,
	promotion : null,
	slidePromotion : $('#slide-promotion'),
	timeout : null,
	isKeyPress: false,
	timeDelay: 0
};

eMain.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.show();
	$(_.slide).removeAttr('style');
	_.getMenu();
}
eMain.languageIndex = function(){
	var _=this;
	for(var i = 0; i < _.data.length; i++){
		if(eCommon.languageCode == _.data[i].language){
			return i;
		}
	}
	return -1;
}
eMain.focus = function() {
	/*var target = $(this.slide).find('a.thumbnail[tabindex="' + (this.slideIndex) + '"]');
	$('html,body').animate({opacity: "show", easing: "easein"}, 0, function() {target.focus();});*/
	$(this.slide).find('a.thumbnail[tabindex="' + (this.slideIndex) + '"]').focus();
}

eMain.clearFocus = function() {
	$(this.slide).find('a.thumbnail[tabindex="' + (this.slideIndex) + '"]').blur();
}

eMain.show = function() {
	// eCommon.showHeader();
	eCommon.showFooter();
	eCommon.hideFooterSojo();
	$(this.element).show();
}
eMain.hide = function() {
	$(this.element).hide();
	if(eCommon.isTV()){
		eCommon.widgetAPI.sendReadyEvent();
		eCommon.pluginAPI.registAllKey();
		eCommon.pluginAPI.unregistKey(eCommon.tvKey.KEY_VOL_UP);
		eCommon.pluginAPI.unregistKey(eCommon.tvKey.KEY_VOL_DOWN);
		eCommon.pluginAPI.unregistKey(eCommon.tvKey.KEY_MUTE);
		eCommon.pluginAPI.unregistKey(eCommon.tvKey.KEY_POWER);
		eCommon.pluginAPI.unregistKey(eCommon.tvKey.KEY_SOURCE);
	}
	
}
eMain.reInit = function() {
	var _ = this;
	var index = _.languageIndex();
	var items = _.data[index].items;
	var length = items.length;
	_.slideCount = length;
	for (var i = 0; i < length; i++) {
		var object = new Object();
		object.id = items[i].id;
		object.title = items[i].title;
		object.icon = items[i].icon;
		object.url = items[i].url;
		object.serviceCode = items[i].serviceCode;
		object.index = i + 1;
		object.clazz = 'eMain';
		$(_.slide).append(eLayout.menuHtml(object));
	}
	_.focus();
}
eMain.getMenu = function() {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_104,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			var length = data.length;
			if (length == 0) {
				var obj = {};
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = 'eMain.errorNoSubject()';
				eModal.showInfo(obj);
				return;
			}
			_.slideCount = length;
			_.slideIndex = 1;
			var items = [];
			for(var i = 0; i < length; i++){
				var object = {};
				object.id= data[i].id;
				object.title= data[i].name;
				object.image = data[i].urlImage;
				object.url= data[i].urllink;
				object.serviceCode= data[i].service_code;
				object.index= i + 1;
				object.clazz = 'eMain';
				items.push(object);
				$(_.slide).append(eLayout.menuHtml(object));
			}
			var obj = {};
			eWelcome.getPromotion();
			obj.language = eCommon.languageCode;
			obj.items = items;
			_.data.push(obj);
			if(_.slideCount < 5){
				var distance = $(_.slide).parent().outerWidth() - 235* _.slideCount;
				if (distance > 0) {
					$(_.slide).css({'margin-left' : (distance/2)+ 'px', 'padding-top': '20%'});
				}
			} else {
				_.itemInRow = Math.ceil(_.slideCount/2);
				if (_.itemInRow > 5){
					_.itemInRow = 5;
				}
				var width = 235*_.itemInRow+'px';
				var distance = $(_.slide).outerWidth() - 235* _.itemInRow;
				if (distance > 0) {
					$(_.slide).css({'margin-left' : (distance/2)+ 'px', 'width': width, 'padding-top': '14%'});
				}
			}
			_.focus();
		},
		error : function(error) {
			var obj = {};
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = 'eMain.errorNoSubject()';
			eModal.showInfo(obj);
		}
	});
}

eMain.initPromotion = function() {
	var _ = this;
	_.slidePromotion.slick({
		dots : false,
		initialSlide : 0,
		autoplay : true,
		autoplaySpeed : 5000,
		infinite : false,
		speed : 1,
		slidesToShow : 2,
		slidesToScroll : 2,
		swipeToSlide : false,
		draggable : true,
		centerMode : false,
		vertical : false,
		focusOnSelect : false
	});
}

eMain.unload = function() {
	$(this.slide).empty();
}
eMain.leftFocus = function() {
	var _=this;
	if(!_.isKeyPress){
		_.isKeyPress = true;
		var time = setTimeout(function(){
			if (_.slideIndex > 1) {
				_.slideIndex-=1;
				_.focus();
			}				
			_.isKeyPress = false;
		}, _.timeDelay);
	}
}

eMain.rightFocus = function() {
	var _=this;
	if(!_.keyPress){
		_.keyPress = true;
		var time = setTimeout(function(){
			if (_.slideIndex < _.slideCount) {
				_.slideIndex+=1;
				_.focus();
			}
			_.keyPress = false;
		}, _.timeDelay);
	}
}

eMain.upFocus = function() {
	var _=this;
	if (_.slideIndex - _.itemInRow > 0) {
		_.slideIndex -= _.itemInRow;
		_.focus();
	}
}

eMain.home = function() {
	var _ = this;
	_.show();
	_.focus();
}

eMain.back = function() {
	var _ = this;
	_.hide();
	_.data = [];
	eCommon.hideHeader();
	eCommon.hideFooter();
	$(_.slide).empty();
	
	// set volume
//	eCommon.pluginObjectNNavi = document.getElementById('pluginObjectNNavi');
//	if (eCommon.pluginObjectNNavi) {
//		eCommon.pluginObjectNNavi.SetBannerState(1);
//	}
}
eMain.downFocus = function() {
	var _=this;
	if (_.slideIndex + _.itemInRow <= _.slideCount) {
		_.slideIndex += _.itemInRow;
		_.focus();
	} 
}
eMain.selectItem = function($this, event) {
	event.stopImmediatePropagation();
	var _ = this;
	var serviceCode = $(_.slide).find('a.thumbnail[tabindex="' + _.slideIndex + '"]').attr('data-service');
	var title = $(_.slide).find('a.thumbnail[tabindex="' + _.slideIndex + '"]').attr('data-title');
	var url = $(_.slide).find('a.thumbnail[tabindex="' + _.slideIndex + '"]').attr('data-url');
	if (serviceCode === API.getAPI().NEWS) { // call Internet
//		eWeather.name = eCommon.htmlToText(title);
//		eWeather.init();
		eCommon.unblockUI();
		eCommon.widgetAPI.sendReturnEvent();
		return;
	}
	_.hide();
	eCommon.blockUI();
	if (serviceCode === API.getAPI().HOTEL) {// Service MY HOTEL
		eIntroduce.name = eCommon.htmlToText(title);
		eIntroduce.init();
	} else if (serviceCode === API.getAPI().STAY) {// Service MY STAY
		if(url != "-1"){
			url = API.getAPI().CMD_104.replace('@-1', url);
		}
		eMyStay.name = eCommon.htmlToText(title);
		eMyStay.init(url);
	} else if (serviceCode === API.getAPI().MOVIES) {// Service Movies VOD
		eMovies.name = eCommon.htmlToText(title);
		eMovies.init();
	} else if (serviceCode === API.getAPI().TV) { // Service LiveTV
		eTV.name = eCommon.htmlToText(title);
		eTV.init();
	} else if (serviceCode === API.getAPI().MUSIC) { // MUSIC
		eMusic.name = eCommon.htmlToText(title);
		eMusic.init();
	} else if (serviceCode === API.getAPI().RESTAURANT) { // RESTAURANT
		var url = API.getAPI().CMD_10525;
		eRestaurant.name = eCommon.htmlToText(title);
		eRestaurant.init(url);
	} else if (serviceCode === API.getAPI().MESSAGE) {
		eMessage.name = eCommon.htmlToText(title);
		eMessage.init();
	} 
}
eMain.itemClick = function($this, event){
	var _=this;
	event.stopImmediatePropagation();
	$($this).focus();
	_.slideIndex = Number($($this).attr('tabindex'));
	_.selectItem($this, event);
}
eMain.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_LEFT:
			eWelcome.playSound(eCommon.left);
			_.leftFocus();
			break;
		case eCommon.KEY_RIGHT:
			eWelcome.playSound(eCommon.right);
			_.rightFocus();
			break;
		case eCommon.KEY_UP:
			eWelcome.playSound(eCommon.up);
			_.upFocus();
			break;
		case eCommon.KEY_DOWN:
			eWelcome.playSound(eCommon.down);
			_.downFocus();
			break;
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			_.selectItem($this, event);
			break;
		case eCommon.KEY_RETURN:
//			eWelcome.playSound(eCommon.back);
//			eCommon.widgetAPI.sendExitEvent();
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
	}
}

eMain.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eWelcome.select);
			eModal.hideInfo();
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}