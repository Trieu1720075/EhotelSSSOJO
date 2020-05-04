eWelcome = {
	name: 'WELCOME',
	key: 'WELCOME',
	element: $("#scenes-welcome"),
	hanler: null,
	xmlDoc: null,
	slidePromotion: $('#slide-promotion-footer'),
	slideIcon: $('#slide-promotion-icon'),
	slideShow: $('.ehotel-slide-show'),
	languages: [],
	indexIcon: 0,
	slideTime: 0,
	itemInRow: 4,
	slideBg: null,
	languageCount: 0,
	timeout: null,
	callSetting: false,
};
eWelcome.init = function () {
	var _ = this;
	eCommon.init();
}
eWelcome.startApp = function () {
	var _ = this;
	eCommon.initEvent();
	eCommon.HISTORY.push(this);
	_.getData();

}
eWelcome.focus = function () {
	this.hanler.find('a[tabindex="' + this.languages[this.indexIcon] + '"]').focus();
}

eWelcome.show = function () {
	$(eCommon.navbarName).text(this.name);
	eCommon.hideFooter();
	eCommon.hideHeader();
	eCommon.showBackground();
	$(this.element).show();
	//eTVPlayer.play('http://172.16.9.205/Music/audio_1526711059265.mp3')
	//eCommon.launchApp('com.samsung.tv.cobalt-yt', null, 500);
	//this.showSlideShow();
	timeoutStandby = setTimeout(function () { eWelcome.hide(); eStandby.init() }, 5000);
}
eWelcome.hide = function () {
	clearTimeout(timeoutStandby);
	eMusicIntro.stop(); // stop music welcome
	eCommon.hideFooter();
	eCommon.hideHeader();
	// eCommon.setBackground();
	eMusicIntro.play();
	$(this.element).hide();
	//this.hideSlideShow();
}
eWelcome.getData = function () {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_46,
		cache: false,
		type: 'GET',
		async: false,
		success: function (response) {
			$('#ehotel-welcome').html(eLayout.welcomeHtml());
			_.hanler = _.element.find('div.row-flag');
			_.xmlDoc = $($.parseXML(response.replace("<?xml version='1.0' encoding='UTF-8'?>", "")));
			var length = _.xmlDoc.find('item').length;
			var indexIcon = 0;
			_.xmlDoc.find('item').each(function () {
				if ($(this).attr("key") === "picbackground") {
					var url = $(this).find("url").text();
					eCommon.background = API.getAPI().LOCATION_IMAGE.concat(url);
					eCommon.setBackground();
				} else if ($(this).attr("key") === "WelcomeGuest") {
					var nameRoom = $(this).find("id").text();
					var nameWelcome = $(this).find("fullname").text();
					var currentdate = new Date();
					var currentTime = eCommon.getPrettyTime(currentdate);
					var periodTime = eCommon.getPeriodTime(currentdate);
					var currentTimeStandby = eCommon.getPrettyDateStandby(currentdate);
					//var currentDay = eCommon.getDateString(); 
					var currentDay = eCommon.getPrettyDate(currentdate);
					eCommon.CUSTOMER = $(this).find("fullname").text();
					eCommon.ROOM = nameRoom;
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
				} else if ($(this).attr("key") === "welcome") {
					var text = $(this).find("url").text();
					$('.text-welcome').html(text);
				} else if ($(this).attr("key") === "lang") {
					var idFlag = $(this).find("id").text();
					var nameFlag = $(this).find("name").text();
					var iconFlag = API.getAPI().LOCATION_IMAGE.concat($(this).find("icon").text());
					var code = $(this).find("code").text();
					var flag = '<div class="flag"><a href="#" data-code="' + code.toLowerCase() + '" tabindex="' + idFlag + '" onclick="eWelcome.clickItem()"  onKeyUp="eWelcome.keyUp()" onKeyDown="eWelcome.keyDown()">'
						+ '<img style="width:35px; height:35px" src="' + iconFlag + '" class="img-circle"/>'
						+ '<h6>' + nameFlag + '</h6>'
						+ '</a></div>';
					$('.row-flag').append(flag);
					indexIcon += 1;
					_.languages.push(idFlag);
				} else if ($(this).attr("key") === "piciconout") {
					var url = API.getAPI().LOCATION_IMAGE.concat($(this).find("url").text());
					$('.img-logo').attr('src', url);
				} else if ($(this).attr("key") === "piciconin") {
					var url = API.getAPI().LOCATION_IMAGE.concat($(this).find("url").text());
					$('.logo__nav').attr('src', url);
				} else if ($(this).attr("key") === "welcome_01") {
					var text = $(this).find("url").text();
					$('.text-welcome_01').html(eCommon.htmlToText(text));
				} else if ($(this).attr("key") === "welcome_02") {
					var text = $(this).find("url").text();
					$('.text-welcome_02').html(eCommon.htmlToText(text));
				} else if ($(this).attr("key") === "welcomvideo") {
					var text = $(this).find("url").text();
					if (text.trim() != "") {
						eVideoIntro.data = text.split('@');
					}
				} else if ($(this).attr("key") === "welcommusic") {
					var text = $(this).find("url").text();
					if (text.trim() != "") {
						eMusicIntro.data = text.split('@');
					}
				}/* else if ($(this).attr("key") === "birthday") {
						var isbirthday = $(this).find("isbirthday").text();
						var url = $(this).find("url").text();
						var guest = $(this).find("guest").text();
						var  duration = $(this).find("duration").text();
						if (isbirthday == 1){
							eBirthDay.isBirthDay = true;
							eBirthDay.data = {
								name: guest,
								url: url,
								duration: eCommon.stringToTime(duration)
							}
						} else {
							eBirthDay.isBirthDay = false;
						}
					}*/
			});
			//eVideoIntro.data = ['http://172.16.9.70:8383/Music/a.mp4']
			_.languageCount = _.languages.length;
			eTVPlayer.getAllChannel();
			_.getWeather();
			setInterval(function () {
				eWelcome.receivePMS();
			}, 60000);
			setInterval(function () {
				eCommon.runTimeSoJo();
			}, 1000);
			if (eVideoIntro.data.length > 0) {
				eVideoIntro.play();
				return;
			} else {
				_.show();
				_.focus();
			}

		},
		error: function (error) { }
	});
}

eWelcome.backWelcome = function () {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_46,
		cache: false,
		type: 'GET',
		async: false,
		success: function (response) {
			$('#ehotel-welcome').html(eLayout.welcomeHtml());
			_.hanler = _.element.find('div.row-flag');
			_.xmlDoc = $($.parseXML(response.replace("<?xml version='1.0' encoding='UTF-8'?>", "")));
			var length = _.xmlDoc.find('item').length;
			var indexIcon = 0;
			_.xmlDoc.find('item').each(function () {
				if ($(this).attr("key") === "WelcomeGuest") {
					var nameRoom = $(this).find("id").text();
					var nameWelcome = $(this).find("fullname").text();
					var currentdate = new Date();
					var currentTime = eCommon.getPrettyTime(currentdate);
					var periodTime = eCommon.getPeriodTime(currentdate);
					var currentTimeStandby = eCommon.getPrettyDateStandby(currentdate);
					//var currentDay = eCommon.getDateString(); 
					var currentDay = eCommon.getPrettyDate(currentdate);
					eCommon.CUSTOMER = $(this).find("fullname").text();
					eCommon.ROOM = nameRoom;
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
				} else if ($(this).attr("key") === "welcome") {
					var text = $(this).find("url").text();
					$('.text-welcome').html(text);
				} else if ($(this).attr("key") === "lang") {
					var idFlag = $(this).find("id").text();
					var nameFlag = $(this).find("name").text();
					var iconFlag = API.getAPI().LOCATION_IMAGE.concat($(this).find("icon").text());
					var code = $(this).find("code").text();
					var flag = '<div class="flag"><a href="#" data-code="' + code.toLowerCase() + '" tabindex="' + idFlag + '" onclick="eWelcome.clickItem()"  onKeyUp="eWelcome.keyUp()" onKeyDown="eWelcome.keyDown()">'
						+ '<img style="width:35px; height:35px" src="' + iconFlag + '" class="img-circle"/>'
						+ '<h6>' + nameFlag + '</h6>'
						+ '</a></div>';
					$('.row-flag').append(flag);
					indexIcon += 1;
					_.languages.push(idFlag);
				} else if ($(this).attr("key") === "picbackground") {
					var url = $(this).find("url").text();
					eCommon.background = API.getAPI().LOCATION_IMAGE.concat(url);
					eCommon.setBackground();
				} else if ($(this).attr("key") === "piciconout") {
					var url = API.getAPI().LOCATION_IMAGE.concat($(this).find("url").text());
					$('.img-logo').attr('src', url);
				} else if ($(this).attr("key") === "piciconin") {
					var url = API.getAPI().LOCATION_IMAGE.concat($(this).find("url").text());
					$('.logo__nav').attr('src', url);
				} else if ($(this).attr("key") === "welcome_01") {
					var text = $(this).find("url").text();
					$('.text-welcome_01').html(eCommon.htmlToText(text));
				} else if ($(this).attr("key") === "welcome_02") {
					var text = $(this).find("url").text();
					$('.text-welcome_02').html(eCommon.htmlToText(text));
				} else if ($(this).attr("key") === "welcomvideo") {
					var text = $(this).find("url").text();
					if (text.trim() != "") {
						eVideoIntro.data = text.split('@');
					}
				} else if ($(this).attr("key") === "welcommusic") {
					var text = $(this).find("url").text();
					if (text.trim() != "") {
						eMusicIntro.data = text.split('@');
					}
				}/* else if ($(this).attr("key") === "birthday") {
						var isbirthday = $(this).find("isbirthday").text();
						var url = $(this).find("url").text();
						var guest = $(this).find("guest").text();
						var  duration = $(this).find("duration").text();
						if (isbirthday == 1){
							eBirthDay.isBirthDay = true;
							eBirthDay.data = {
								name: guest,
								url: url,
								duration: eCommon.stringToTime(duration)
							}
						} else {
							eBirthDay.isBirthDay = false;
						}
					}*/
			});
			//eVideoIntro.data = ['http://172.16.9.70:8383/Music/a.mp4']
			_.languageCount = _.languages.length;
			eTVPlayer.getAllChannel();
			_.getWeather();
			setInterval(function () {
				eWelcome.receivePMS();
			}, 60000);
			setInterval(function () {
				eCommon.runTimeSoJo();
			}, 1000);
			if (eVideoIntro.data.length > 0) {
				eVideoIntro.play();
				return;
			} else {
				_.show();
				_.focus();
			}

		},
		error: function (error) { }
	});
}

eWelcome.receivePMS = function () {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_46,
		cache: false,
		type: 'GET',
		async: false,
		success: function (response) {
			_.xmlDoc = $($.parseXML(response.replace("<?xml version='1.0' encoding='UTF-8'?>", "")));
			var length = _.xmlDoc.find('item').length;
			var indexIcon = 0;
			_.xmlDoc.find('item').each(function () {
				if ($(this).attr("key") === "WelcomeGuest") {
					var nameRoom = $(this).find("id").text();
					var nameWelcome = $(this).find("name").text();
					eCommon.CUSTOMER = $(this).find("fullname").text();
					eCommon.ROOM = nameRoom;
					_.name = nameRoom;
					$(eCommon.navbarName).html(nameRoom);
					$('.ehotel-name-welcome').html(nameWelcome);
				}
			});
		},
		error: function (jqXHR, exception) {
			eCommon.logs(eCommon.ajaxError(jqXHR, exception));
		}
	});
}
eWelcome.getImageSlide = function () {

}
eWelcome.getPromotion = function () {
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
			_.initPromotion();
		},
		error: function (error) {
		}
	});
}
eWelcome.initPromotion = function () {
	var _ = this;
	_.slideIcon.responsiveSlides({
		speed: 0000,
		timeout: 25000,
		page: false
	});
	_.slidePromotion.responsiveSlides({
		speed: 0000,
		timeout: 25000,
		page: false
	});
}
eWelcome.showSlideShow = function () {
	var _ = this;
	$.ajax({
		url: API.getAPI().CMD_103,
		data: "",
		cache: false,
		type: 'GET',
		async: true,
		success: function (response) {
			var data = JSON.parse(response);
			var length = data.length;
			var images = [];
			for (var i = 0; i < length; i++) {
				var url = API.getAPI().LOCATION_IMAGE.concat(data[i].url);
				images.push(url);
			}
			_.slideTime = setTimeout(function () {
				_.slideBg = $.backstretch(images, { fade: 500, duration: 7000 });
			}, 5000);
		},
		error: function (error) { }
	});
}
eWelcome.resumeSlideShow = function () {
	$.backstretch('resume');
}
eWelcome.hideSlideShow = function () {
	var _ = this;
	clearTimeout(this.slideTime);
	if (_.slideBg != null) {
		$.backstretch("destroy", false);
	}
}
eWelcome.home = function () {
	var _ = this;
	_.show();
	_.focus();
}

eWelcome.back = function () {
	var _ = this;
	_.show();
	_.focus();
}
eWelcome.keyDown = function () {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	eCommon.logs(JSON.stringify({
		keyPress: keyCode,
		text: 'PRESS',
		charCode: event.charCode
	}));
	switch (keyCode) {
		case eCommon.KEY_F1:
			_.callSetting = true;
			break;

		case eCommon.KEY_LEFT:
			eWelcome.playSound(eCommon.left);
			if (_.indexIcon > 0) {
				_.indexIcon -= 1;
				_.focus();
			}
			break;
		case eCommon.KEY_RW:
			eMusicIntro.jumpBackward(10);
			break;
		case eCommon.KEY_FF:
			eMusicIntro.jumpForward(10);
		case eCommon.KEY_RIGHT:
			eWelcome.playSound(eCommon.right);
			if (_.indexIcon < _.languageCount - 1) {
				_.indexIcon++;
				_.focus();
			}
			break;
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			this.hanler.find('a').each(function () {
				var $this = $(this);
				var langCode = $this.attr('tabindex');
				var code = $this.attr('data-code');

				if ($this.is(':focus')) {
					eCommon.languageCode = langCode;
					$.ajax({
						url: '/languages/text/' + code,
						data: "",
						cache: false,
						type: 'GET',
						async: false,
						dataType: 'json',
						success: function (response) {
							language = response;
							$.ajax({
								url: API.getAPI().CMD_31 + langCode,
								data: "",
								cache: false,
								type: 'GET',
								async: false,
								success: function (response) {
									eWelcome.hide();
									//eMain.init();
									eBirthDay.init();
								},
								error: function (error) { }
							});
						},
						error: function (error) {
							eCommon.logs('Welcome error ' + error);
						}
					});
				}
			});
			break;
		case eCommon.KEY_RETURN:
			eWelcome.playSound(eCommon.back);
			eCommon.widgetAPI.blockNavigation(event);
			//			eCommon.widgetAPI.sendExitEvent ();
			//			eCommon.widgetAPI.sendReturnEvent();
			break;
		case eCommon.KEY_EXIT:
			//eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
	}
}
eWelcome.keyUp = function () {
	var _ = this;
	event.preventDefault();
	clearTimeout(_.timout);
	_.timout = null;
	if (_.callSetting) {
		_.showPoup();
	}
}

eWelcome.showPoup = function () {
	eCommon.reConfig();
}

eWelcome.clickItem = function () {
	this.hanler.find('a').each(function () {
		var $this = $(this);
		if ($this.is(':focus')) {
			var langCode = $this.attr('tabindex');
			eWelcome.indexIcon = Number(langCode - 1);
			eWelcome.focus();
			var code = $this.attr('data-code');
			eCommon.languageCode = langCode;
			$.ajax({
				url: '/languages/text/' + code,
				data: "",
				cache: false,
				type: 'GET',
				async: false,
				dataType: 'json',
				success: function (response) {
					language = response;
					$.ajax({
						url: API.getAPI().CMD_31 + langCode,
						data: "",
						cache: false,
						type: 'GET',
						async: false,
						success: function (response) {
							eWelcome.hide();
							//eMain.init();
							eBirthDay.init();
						},
						error: function (error) { }
					});
				},
				error: function (error) {
					eCommon.logs('Json file error');
				}
			});
		}
	});
}
eWelcome.playSound = function (type) {
	try {
		if (eCommon.isTV()) {
			//			if (type === eCommon.right) {
			//				eCommon.audioControl.playSound(eCommon.audioControl.AUDIO_SOUND_TYPE_RIGHT);
			//			} else if (type === eCommon.left) {
			//				eCommon.audioControl.playSound(eCommon.audioControl.AUDIO_SOUND_TYPE_LEFT);
			//			} else if (type === eCommon.up) {
			//				eCommon.audioControl.playSound(eCommon.audioControl.AUDIO_SOUND_TYPE_UP);
			//			} else if (type === eCommon.down) {
			//				eCommon.audioControl.playSound(eCommon.audioControl.AUDIO_SOUND_TYPE_DOWN);
			//			} else if (type === eCommon.select) {
			//				eCommon.audioControl.playSound(eCommon.audioControl.AUDIO_SOUND_TYPE_SELECT);
			//			} else if (type === eCommon.reload) {
			//				eCommon.audioControl.playSound(eCommon.audioControl.AUDIO_SOUND_TYPE_PREPARING);
			//				eCommon.widgetAPI.blockNavigation();
			//			} else if (type === eCommon.back) {
			//				eCommon.audioControl.playSound(eCommon.audioControl.AUDIO_SOUND_TYPE_BACK);
			//				eCommon.widgetAPI.blockNavigation();
			//			}
		}

	} catch (error) {
		console.log(error.name + ' ' + type);
	}
}

eWelcome.getWeather = function () {
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
				var image = $(this).find('urlImage').text();
				$('.temp-max').html(tmpmax + '&deg;C');
				$('.temp-min').html(tmpmin + '&deg;C');
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