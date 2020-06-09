eStandby = {
	name : 'STANDBY',
	key: "STANDBY",
	element : '#scenes-standby',
	item : '#standby-content',
	content : '.standby-content',
	//slidePromotion : $('#slide-promotion'),
	slidePromotion: $('#slide-promotion-footer'),	
	timeout: null,
}

eStandby.init = function() {
	var _ = this;
	//eStandby.getMessage();
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
				if ($(this).attr("key") === "picbackground") {
					var url = $(this).find("url").text();
					eCommon.background = API.getAPI().LOCATION_IMAGE.concat(url);
					eCommon.setBackground();
				} else if ($(this).attr("key") === "current_language") {
					var currentLang = $(this).find("id").text();
					eCommon.languageCode = currentLang;	
				}
			});
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
					_.getWeather();
					_.name = nameRoom;
					$(eCommon.navbarName).html(nameRoom);
					$('.ehotel-name-welcome').html(nameWelcome);
					$('.name-room').html(nameRoom);
					$(eCommon.timeforNavbarHome).html(currentTime);
					$(eCommon.dateNavbarHome).html(currentDay);
					$(eCommon.timeperiodNavbarHome).html(periodTime);
					$(eCommon.dateNavbarHomeStandby).html(currentTimeStandby);
				} else if ($(this).attr("key") === "piciconout") {
					var url = API.getAPI().LOCATION_IMAGE.concat($(this).find("url").text());
					$('.img-logo').attr('src', url);
				} else if ($(this).attr("key") === "piciconin") {
					var url = API.getAPI().LOCATION_IMAGE.concat($(this).find("url").text());
					$('.logo__nav').attr('src', url)
				}
				setInterval(function () {
					eWelcome.receivePMS();
				}, 60000);
				setInterval(function () {
					eCommon.runTimeSoJo();
				}, 1000);
				// eVideoSS.play({
				// 	//name: $($this).attr('data-title'),
				// 	url: 'http://172.16.9.198/Video/eSmileAtHotel.mp4',
				// 	//id: $($this).attr('data-id')
				// });
				//eMusicPlayer.play("http://172.16.9.205/Music/audio_1526711059265.mp3");
				eWelcome.getPromotion();
				eStandby.show(); 
				//eMusic.play("http://172.16.9.205/Music/audio_1526711059265.mp3");
			});
			//error: function (error) { }
		}
	});
}

eStandby.show = function() {
	//eCommon.showBackground();
	eCommon.showBackground();
	eCommon.IS_KEY_PRESS = true;
	eCommon.hideHeader();
	eCommon.showFooterSojo();
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

eStandby.getWeather = function () {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_125,
		data: "",
		cache: false,
		type: 'GET',
		async: true,
		success: function (response) {
			var weather = xmlAPI.loadXMLString(response);
			weather.find('item').each(function () {
				var day = $(this).find('day').text();
				if (day == eCommon.getDay())
				{
					
					var tmpmin = Math.round($(this).find('tempmin').text());
					var tmpmax = Math.round($(this).find('tempmax').text());
					var tmp = Math.round($(this).find('temp').text());
					var humidity = $(this).find('humidity').text()*100;
					var winSpeed = Math.round($(this).find('windspeed').text());
					var image = $(this).find('image').text();
					if ($(this).find('humidity').text() == null){
						humidity = 0
					}
					if ($(this).find('windspeed').text() == null){
						windspeed = 0
					}
					$('.temp-max').html(tmpmax + '&deg');
					$('.temp-min').html(tmpmin + '&deg ');
					$('.temp-avg').html(tmp + '&deg');
					$('.humidity').html(humidity + '%');
					$('.winSpeed').html(winSpeed + ' m/s');
					$('.img-weather').attr('src', API.getAPI().LOCATION_IMAGE + image);
				}
				else {
					var tmpmin = Math.round($(this).find('tempmin').text());
					var tmpmax = Math.round($(this).find('tempmax').text());
					var tmp = Math.round($(this).find('temp').text());
					var humidity = $(this).find('humidity').text()*100;
					var winSpeed = Math.round($(this).find('windspeed').text());
					var image = $(this).find('image').text();
					if ($(this).find('humidity').text() == null){
						humidity = 0
					}
					if ($(this).find('windspeed').text() == null){
						windspeed = 0
					}
					$('.temp-max-tomorow').html(tmpmax + '&deg');
					$('.temp-min-tomorow').html(tmpmin + '&deg ');
					$('.humidity-tomorow').html(humidity + '%');
					$('.winSpeed-tomorow').html(winSpeed + ' m/s');
					$('.img-weather-tomorow').attr('src', API.getAPI().LOCATION_IMAGE + image);
				}
				
			});
		},
		error: function (jqXHR, exception) {
			eCommon.logs(eCommon.ajaxError(jqXHR, exception) + ' --> ' + API.getAPI().CMD_119 + eCommon.getDay());
		}
	});
}
eStandby.getPromotion = function () {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_116,
		data: "",
		cache: true,
		type: 'GET',
		async: false,
		success: function (response) {
			_.slidePromotion.empty();
			_.slideIcon.empty();
			_.promotion = $($.parseXML(response.replace("<?xml version='1.0' encoding='UTF-8'?>", "")));
			_.promotion.find('item').each(function (index, element) {
				var object = {};
				object.title = $(element).find("name").text();
				object.icon = $(element).find("urlIcon").text();
				object.url = $(element).find("urlLink").text();
				object.content = $(element).find("proDef").text();
				_.slidePromotion.append(eLayout.promotion(object));
				_.slideIcon.append('<li><img data-url="' + object.url + '" style="width: 90px; height:100px" class="media-object" src="' + API.getAPI().LOCATION_IMAGE.concat(object.icon) + '"></li>');
			});
			//_.initPromotion();
		},
		error: function (error) {
		}
	});
}
eStandby.initPromotion = function () {
	var _ = this;
	_.slideIcon.responsiveSlides({
		speed: 0000,
		timeout: 28000,
		page: false
	});
	_.slidePromotion.responsiveSlides({
		speed: 000,
		timeout: 28000,
		page: false
	});
}
