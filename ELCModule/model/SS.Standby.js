eStandby = {
	name : 'STANDBY',
	key: "STANDBY",
	element : '#scenes-standby',
	item : '#standby-content',
	content : '.standby-content',
	slidePromotion : $('#slide-promotion'),	
	timeout: null,
}

eStandby.init = function() {
	var _ = this;
	_.getData();
}

eStandby.getData = function() {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_46,
		cache: false,
		type: 'GET',
		async: false,
		success: function (response) {
			$('#standby-content').html(eLayout.standbyHtml());
			//_.hanler = _.element.find('div.row-flag');
			_.xmlDoc = $($.parseXML(response.replace("<?xml version='1.0' encoding='UTF-8'?>", "")));
			var length = _.xmlDoc.find('item').length;
			var indexIcon = 0;
			_.xmlDoc.find('item').each(function () {
				if ($(this).attr("key") === "picstandby") {
					var url = $(this).find("url").text();
					eCommon.background = API.getAPI().LOCATION_IMAGE.concat(url);
					eCommon.setBackground();
				}else if ($(this).attr("key") === "WelcomeGuest") {
					var nameRoom = $(this).find("id").text();
					var nameWelcome = $(this).find("name").text();
					var currentdate = new Date();
					var currentTime = eCommon.getPrettyTime(currentdate);
					var periodTime = eCommon.getPeriodTime(currentdate);
					//var currentDay = eCommon.getDateString(); 
					var currentDay = eCommon.getPrettyDate(currentdate);
					var currentTimeStandby = eCommon.getPrettyDateStandby(currentdate);
					eCommon.CUSTOMER = $(this).find("fullname").text();
					eCommon.ROOM = nameRoom;
					eCommon.setLang(currentLang);
					_.getWeather();
					_.getWeatherTomorrow();
					_.name = nameRoom;
					$(eCommon.navbarName).html(nameRoom);
					$('.ehotel-name-welcome').html(nameWelcome);
					$('.name-room').html(nameRoom);
					$(eCommon.timeforNavbarHome).html(currentTime);
					$(eCommon.dateNavbarHome).html(currentDay);
					$(eCommon.timeperiodNavbarHome).html(periodTime);
					$(eCommon.dateNavbarHomeStandby).html(currentTimeStandby);
				} else if ($(this).attr("key") === "current_language") {
					var currentLang = $(this).find("id").text();
					eCommon.languageCode = currentLang;
					eCommon.setLang();
				} else if ($(this).attr("key") === "piciconout") {
					var url = API.getAPI().LOCATION_IMAGE.concat($(this).find("url").text());
					$('.img-logo').attr('src', url);
				} else if ($(this).attr("key") === "piciconin") {
					var url = API.getAPI().LOCATION_IMAGE.concat($(this).find("url").text());
					$('.logo__nav').attr('src', url)
				}
				setInterval(function () {
					eCommon.runTimeSoJo();
				}, 1000);
				// eVideoSS.play({
				// 	//name: $($this).attr('data-title'),
				// 	url: 'http://172.16.9.198/Video/eSmileAtHotel.mp4',
				// 	//id: $($this).attr('data-id')
				// });
				//eMusicPlayer.play("http://172.16.9.205/Music/audio_1526711059265.mp3");
				eStandby.show(); 
				//eMusic.play("http://172.16.9.205/Music/audio_1526711059265.mp3");
			});
			//error: function (error) { }
		}
	});
}

eStandby.show = function() {
	//eCommon.showBackground();
	eCommon.IS_KEY_PRESS = true;
	eCommon.hideHeader();
	eCommon.showFooterSojo();
	eStandby.getMessage();
	eCommon.showBackground();
	$(this.element).show();
	// setTimeout(function(){eStandby.focus()},500);
	// clearTimeout(eStandby.timeout);
	// eStandby.timeout = setTimeout(function(){eStandby.hide(); eMain.init()}, 10000);
}

eStandby.hide = function() {
	eCommon.IS_KEY_PRESS = false;
	$(this.element).hide();
	//eCommon.showBackground();
	eCommon.hideFooterSojo();
	clearTimeout(eStandby.timeout);	
}

eStandby.focus = function(){
	$(this.item).focus();
}

// eStandby.initData = function() {
// 	var _ = this;
// 	//$(_.context.containerRight).parent().attr('onkeydown', _.context.classes + ".contentKeyDown()");
// 	var def = _.data.url;
// 	if (def.indexOf('http://') == 0) {
// 		$.ajax({
// 			url:'/getHTML?url=' + def+ '?v=' + eCommon.random(),
// 			cache: false,
// 			type : 'GET',
// 			async : true, 
// 			success: function(response){
// 				var data = JSON.parse(response);
// 				if(data.error === 1){
// 					eMain.init();
// 					return;
// 				}
// 				var $frame = $('<iframe id="iframe-content" style="width:100%; height:100%;border:0px">');
// 				$(_.content).html($frame);
// 				setTimeout(function() {
// 					var ifrm = document.getElementById('iframe-content');
// 					ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
// 					ifrm.document.open();
// 					ifrm.document.write(data.data);
// 					ifrm.document.close();
// 					$($('#iframe-content').contents().find('#birthday-name')).html('<h4>'+eBirthDay.data.name+'</h4>');
// 					eBirthDay.show();
// 					//eCommon.logs($($('#iframe-content').contents().find('#birthday-name')).html())
// 				}, 1);
// 			}, 
// 			error: function(){
// 				eMain.init();
// 			}
// 		});
// 	} else {
// 		var $frame = $('<iframe id="iframe-content" style="width:100%; height:100%;border:0px">');
// 		$(_.content).html($frame);
// 		setTimeout(function() {
// 			var ifrm = document.getElementById('iframe-content');
// 			ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
// 			ifrm.document.open();
// 			ifrm.document.write(data.data);
// 			ifrm.document.close();
// 			$($('#iframe-content').contents().find('#birthday-name')).html('<h4>'+eBirthDay.data.name+'</h4>');
// 			eBirthDay.show();
// 		}, 1);
// 	}
// }

eStandby.itemClick = function($this, event){
	var _ = this;
	_.hide();
	eMain.init();
}

eStandby.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {		
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			_.itemClick($this, event);
			break;
		case eCommon.KEY_RETURN:
			_.hide();
			eWelcome.show();
			setTimeout(function(){eWelcome.focus()}, 500);
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
	}
}
eStandby.getWeatherTomorrow = function () {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_119 + eCommon.getTomorrow(),
		data: "",
		cache: false,
		type: 'GET',
		async: true,
		success: function (response) {
			var weather = xmlAPI.loadXMLString(response);
			var length = weather.find('item').length;
			weather.find('item').each(function () {
				var tmpmin = Math.round($(this).find('tempmin').text());
				var tmpmax = Math.round($(this).find('tempmax').text());
				var humidity = $(this).find('humidity').text();
				var winSpeed = $(this).find('winSpeed').text();
				var image = $(this).find('urlImage').text();
				$('.temp-max-tomorow').html(tmpmax + '&deg');
				$('.temp-min-tomorow').html(tmpmin + '&deg ');
				$('.humidity').html(humidity + '&%');
				$('.winSpeed').html(winSpeed + '&m/s');
				$('.img-weather-tomorow').attr('src', API.getAPI().LOCATION_IMAGE + image);
				//$('.media-object').attr('src', API.getAPI().LOCATION_IMAGE + image);
				$('.pull-right').find('.media-object').attr('src', API.getAPI().LOCATION_IMAGE + image);

			});
		},
		error: function (jqXHR, exception) {
			eCommon.logs(eCommon.ajaxError(jqXHR, exception) + ' --> ' + API.getAPI().CMD_119 + eCommon.getDay());
		}
	});
}
eStandby.getWeather = function () {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_119 + eCommon.getDay(),
		data: "",
		cache: false,
		type: 'GET',
		async: true,
		success: function (response) {
			var weather = xmlAPI.loadXMLString(response);
			var length = weather.find('item').length;
			weather.find('item').each(function () {
				var tmpmin = Math.round($(this).find('tempmin').text());
				var tmpmax = Math.round($(this).find('tempmax').text());
				var humidity = $(this).find('humidity').text();
				var winSpeed = $(this).find('winSpeed').text();
				var tmpav = Math.round((tmpmax+tmpmin)/2);
				var image = $(this).find('urlImage').text();
				$('.temp-max').html(tmpmax + '&deg');
				$('.temp-min').html(tmpmin + '&deg ');
				$('.temp-avg').html(tmpav + '&deg');
				$('.humidity').html(humidity + '&%');
				$('.winSpeed').html(winSpeed + '&m/s');
				$('.img-weather').attr('src', API.getAPI().LOCATION_IMAGE + image);
				//$('.media-object').attr('src', API.getAPI().LOCATION_IMAGE + image);
				$('.pull-right').find('.media-object').attr('src', API.getAPI().LOCATION_IMAGE + image);

			});
		},
		error: function (jqXHR, exception) {
			eCommon.logs(eCommon.ajaxError(jqXHR, exception) + ' --> ' + API.getAPI().CMD_119 + eCommon.getDay());
		}
	});
}
eStandby.getMessage = function(){
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_115,
		data : "",
		cache: false,
		type : 'GET',
		async : true,
		success : function(response) {
			eWelcome.slidePromotion.empty();
			eWelcome.slideIcon.empty();
			var xml = xmlAPI.loadXMLString(response);
			var length = xml.find("item").length;
			//eWelcome.slidePromotion.find('li[data-type="msg"]').remove();
			//eWelcome.slideIcon.find('li[data-type="msg"]').remove();
			var messages = [];
			xml.find('item').each(
			function(index, element) {
				if ($(element).find("isRead").text() == '0') {
					var object = {
						classes : _.classes,
						title : eCommon.htmlToText($(element).find("subject").text()),
						content : eCommon.htmlToText($(element).find("content_top").text()),
						icon : '<img style="width: 90px; height:100px" class="media-object" src="'+location.href+'/ELCModule/view/images/msg.png'+'">',
						type : 'msg'
					};
					eWelcome.slidePromotion.prepend(eLayout.promotion(object));
					eWelcome.slideIcon.prepend('<li data-type="msg">'+object.icon+'</li>');
					messages.push(object);
				}
			});
			if (messages.length == 0){
				$(_.slide).find('a[data-service="'+API.getAPI().MESSAGE+'"] .msg-count').html('');
			} else {
				var count = messages.length > 99 ? '99+' : messages.length;
				$(_.slide).find('a[data-service="'+API.getAPI().MESSAGE+'"] .msg-count').html('('+count+')');
			}			
			eWelcome.getPromotion();
	  	},
	  	error: function(error){
	  		$(_.slide).find('a[data-service="'+API.getAPI().MESSAGE+'"] .msg-count').html('');
	  	}
	});
}

eStandby.initPromotion = function() {
	var _ = this;
	_.slidePromotion.slick({
		dots : false,
		initialSlide : 0,
		autoplay : true,
		autoplaySpeed : 5000,
		infinite : false,
		speed : 1,
		slidesToShow : 1,
		slidesToScroll : 1,
		swipeToSlide : false,
		draggable : true,
		centerMode : false,
		vertical : false,
		focusOnSelect : false
	});
}