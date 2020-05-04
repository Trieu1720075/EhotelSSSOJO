eCommon = {
	languageCode: '1',
	CODE_EN: '2',
	CODE_VN: '1',
	IS_PLAYING: false,
	navbarName: '.ehotel-name-room',
	typeVideo: null,
	intervalTime: 0,
	timeNavbarHome: '',
	timeforNavbarHome: '.ehotel-time-room',
	dateNavbarHome: '.ehotel-date-room',
	dateNavbarHomeStandby: '.ehotel-date-room-standby',
	timeperiodNavbarHome: '.ehotel-timeperiod-room',
	background: null,
	MOD: 'MOD',
	VOD: 'VOD',
	EHOTEL: 'EHOTEL',
	CUSTOMER: 'ELCOM',
	ROOM: 'ROOM',
	KEY_LEFT: 37,
	KEY_RIGHT: 39,
	KEY_UP: 38,
	KEY_F1: 108,//112,//desktop
	KEY_DOWN: 40,
	KEY_RETURN: 8,
	KEY_ENTER: 13,
	KEY_HOME: 27,
	KEY_EXIT: 27,
	KEY_CH_DOWN: 34,
	KEY_CH_UP: 33,
	KEY_PLAY: 0,
	KEY_PAUSE: 0,
	KEY_STOP: 0,
	KEY_FF: 34,
	KEY_RW: 33,
	KEY_INFO: 120,
	KEY_0: 48,
	KEY_1: 49,
	KEY_2: 50,
	KEY_3: 51,
	KEY_4: 52,
	KEY_5: 53,
	KEY_6: 54,
	KEY_7: 55,
	KEY_8: 56,
	KEY_9: 57,
	KEY_SMART_HUB: 261,
	audioControl: null,
	pluginObjectNNavi: null,
	right: 'AUDIO_SOUND_TYPE_RIGHT',
	left: 'AUDIO_SOUND_TYPE_LEFT',
	up: 'AUDIO_SOUND_TYPE_UP',
	down: 'AUDIO_SOUND_TYPE_DOWN',
	select: 'AUDIO_SOUND_TYPE_SELECT',
	reload: 'AUDIO_SOUND_TYPE_PREPARING',
	back: 'AUDIO_SOUND_TYPE_BACK',
	cancel: 'AUDIO_SOUND_TYPE_CANCEL',
	warning: 'AUDIO_SOUND_TYPE_WARNING',
	move: 'AUDIO_SOUND_TYPE_MOVE',
	tvKey: null,
	widgetAPI: null,
	pluginAPI: null,
	HISTORY: null,
	ELEMENT_GLOBAL: '#elc_global_event',
	ROOM: 'ROOM',
	KEY_SERIAL_NUMBER: '2000',// default is 2001
	KEY_ROOM_NUMBER: '',
	IP_ADDR: '0.0.0.0',
	IS_KEY_PRESS: false, // not allow press channel number
	countDownInterval: null,
	countDownTimeout: null,
	mwPlugin: null,
	pluginAudio: null,
	pluginPlayer: null,
	pluginSef: null,
	pluginIPTV: null,
	pluginAppCommon: null,
	pluginReceiveMessage: null
};
eCommon.init = function () {
	var _ = this;
	//
	if (eCommon.isTV()) {
		_.tvKey = new Common.API.TVKeyValue();
		_.widgetAPI = new Common.API.Widget();
		_.pluginAPI = new Common.API.Plugin();
		_.xmlAPI = new parseXML();
		_.widgetAPI.sendReadyEvent();
		_.mwPlugin = document.getElementById("pluginTVMW");
		_.pluginPlayer = document.getElementById("pluginPlayer");
		_.pluginAudio = document.getElementById("pluginAudio");
		_.pluginSef = document.getElementById("pluginReceiveMessage");
		_.pluginSef.Open("IPTV", "1.00", "IPTV");
		_.pluginSef.OnEvent = onEvent_SEF;
		// set volume
		_.pluginObjectNNavi = document.getElementById('pluginObjectNNavi');
		if (_.pluginObjectNNavi) {
			_.pluginObjectNNavi.SetBannerState(1);
		}
		// set audio
		_.audioControl = webapis.audiocontrol;
		_.pluginAPI.registAllKey();
		_.pluginAPI.registIMEKey();
		//		_.pluginAPI.registPartWidgetKey();
		//		_.pluginAPI.setOnIdleEvent();
		//		_.pluginAPI.registFullWidgetKey();
		_.pluginAPI.unregistKey(_.tvKey.KEY_VOL_UP);
		_.pluginAPI.unregistKey(_.tvKey.KEY_VOL_DOWN);
		_.pluginAPI.unregistKey(_.tvKey.KEY_MUTE);
		_.pluginAPI.unregistKey(_.tvKey.KEY_POWER);
		_.pluginAPI.unregistKey(_.tvKey.KEY_SOURCE);
		// register key for SAMSUNG
		_.KEY_LEFT = _.tvKey.KEY_LEFT;
		_.KEY_RIGHT = _.tvKey.KEY_RIGHT;
		_.KEY_UP = _.tvKey.KEY_UP;
		_.KEY_DOWN = _.tvKey.KEY_DOWN;
		_.KEY_RETURN = _.tvKey.KEY_RETURN;
		_.KEY_ENTER = _.tvKey.KEY_ENTER;
		_.KEY_HOME = _.tvKey.KEY_HOME;
		_.KEY_EXIT = _.tvKey.KEY_EXIT;
		_.KEY_CH_DOWN = _.tvKey.KEY_CH_DOWN;
		_.KEY_CH_UP = _.tvKey.KEY_CH_UP;
		_.KEY_PLAY = _.tvKey.KEY_PLAY;
		_.KEY_PAUSE = _.tvKey.KEY_PAUSE;
		_.KEY_STOP = _.tvKey.KEY_STOP;
		_.KEY_FF = 72;//_.tvKey.KEY_FF;
		_.KEY_RW = 69;//_.tvKey.KEY_RW;
		_.KEY_INFO = _.tvKey.KEY_INFO;
		_.KEY_0 = _.tvKey.KEY_0;
		_.KEY_1 = _.tvKey.KEY_1;
		_.KEY_2 = _.tvKey.KEY_2;
		_.KEY_3 = _.tvKey.KEY_3;
		_.KEY_4 = _.tvKey.KEY_4;
		_.KEY_5 = _.tvKey.KEY_5;
		_.KEY_6 = _.tvKey.KEY_6;
		_.KEY_7 = _.tvKey.KEY_7;
		_.KEY_8 = _.tvKey.KEY_8;
		_.KEY_9 = _.tvKey.KEY_9;
	}
	eCommon.getIP();
	if (!this.isTV()) {
		eWelcome.startApp();
	}
}
function onEvent_SEF(event, data1) {
	var requestTablet = data1.split("$");
	//eTVPlayer.show();
	if (requestTablet[0].toLowerCase() === "TC_ApiBackWelcome".toLowerCase()) {
		eCommon.showBackground();
		eTVPlayer.back();
		//eTVPlayer.stop();
		//eMusic.stop();
		//eVideoSS.stop();
		//eTVPlayer.hide();
		//eMusic.hide();
		//eWelcome.hide();
		//eStandby.show();
		//eWelcome.startApp();
	}
	else if (requestTablet[0].toLowerCase() === "TC_ApiPlayChannel".toLowerCase()) {
		//eCommon.log(requestTablet);
		eTVPlayer.stop();
		//eMusic.stop();
		//eTVPlayer.hide();
		//eMusic.stop();
		//eMusic.hide();
		eWelcome.hide();
		eStandby.hide();
		eTVPlayer.play(requestTablet[1]);
		//eTVPlayer.hide();
	}
	else if (requestTablet[0].toLowerCase() === "TC_ApiPlayVideo".toLowerCase()) {
		eTVPlayer.back();
		eWelcome.hide();
		eStandby.hide();
		// play video
		eVideoSS.play({
			url: requestTablet[1],
		});
	}
	else if (requestTablet[0].toLowerCase() === "TC_ApiPlayMusic".toLowerCase()) {
		eTVPlayer.back();
		eCommon.showBackground();
		//eTVPlayer.stop();
		//eVideoSS.stop();
		//eVideoSS.hide();
		//eMusic.stop();
		//eVideoSS.stop();
		//eVideoSS.hide();
		//eTVPlayer.hide();
		eWelcome.hide();
		eStandby.hide();
		//eWelcome.backWelcome();
		//eMusic.hide();
		//eWelcome.startApp();
		eMusic.play(requestTablet[1]);
	}
	else if (requestTablet[0].toLowerCase() === "TC_ApiUpDownChannel".toLowerCase()) {
		var num = parseInt(requestTablet[2]) + parseInt(requestTablet[3]);
		eWelcome.hide();
		eStandby.hide();
		eTVPlayer.remoteKeyPress(num);
	} else if (requestTablet[0].toLowerCase() === "TC_ApiControlVolume".toLowerCase()) {
		// var volPlug= document.getElementById("pluginAudio");
		// volPlug.Open('Audio','1.000','Audio');
		// volPlug.Execute("SetVolume",5);
		// eCommon.logs(JSON.stringify(volPlug.Execute("SetVolume",5)));
		// volPlug.Close()
		eTVPlayer.stop();
	}
}
eCommon.initEvent = function () {
	var _ = this;
	eCommon.HISTORY = new History();
	// listen event show modal
	$(eModal.elementError).on('shown.bs.modal', function () {
		setTimeout(function () { $(eModal.elementError).find('a[tabindex="0"]').focus(); }, 500);
	});
	$(eModal.elementInfo).on('shown.bs.modal', function () {
		setTimeout(function () { $(eModal.elementInfo).find('a[tabindex="0"]').focus(); }, 500);
	});
	$(eModal.elementConfirm).on('shown.bs.modal', function () {
		setTimeout(function () { $(eModal.elementConfirm).find('a[tabindex="0"]').focus(); }, 500);
	});
	$(eModal.elementSuccess).on('shown.bs.modal', function () {
		setTimeout(function () { $(eModal.elementSuccess).find('a[tabindex="0"]').focus(); }, 500);
	});
	$(eCard.element).on('shown.bs.modal', function () {
		eCard.initSlide(eCard.slide, 0);
		eCard.modalFocus();
	});
	document.addEventListener("keydown", eTVPlayer.keyDownNumber, false);
	document.addEventListener("click", function () {
		if (eCommon.HISTORY.current().key === 'PLAYER') { // click screen Video
			eCommon.HISTORY.current().slidebar.autoShowControls();
		} else if (eCommon.HISTORY.current().key === 'TVPLAYER') { // click screen TV
			eCommon.HISTORY.current().autoHide();
		} else if (eCommon.HISTORY.current().key === 'WELCOME'
			&& eVideoIntro.IS_PLAYING) { // click on video introduction
			//eVideoIntro.focus();
			eVideoIntro.back();
		} else {
			eCommon.HISTORY.current().focus();
		}
	}, false);
}
// eCommon.launchApp = function(appName, params, timeout) {
// 	eCommon.logs("eCommon.launchApp: "+appName+" "+params+" "+timeout);
// 	try {
// 		var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", params);		
// 		// ApplicationControlDataArrayReplyCallback instance
// 		var appControlReplyCallback = {
// 		    // callee sent a reply
// 		    onsuccess: function(data) {
// 		    	eCommon.logs("inside success");
// 		    },
// 		    // callee returned failure
// 		    onfailure: function() {
// 		    	eCommon.logs('The launch application control failed');
// 		    }
// 		};
// 		tizen.application.launchAppControl(appControl, appName, function(){eCommon.logs("launchAppControl success !!"); setTimeout(function(){eCommon.unblockUI();}, timeout);}, 
// 				 function(e){eCommon.logs("launchAppControl error !!" + e.message); eCommon.unblockUI();}, appControlReplyCallback);
// 	} catch(error) {
// 		eCommon.logs("Error occured :: " + error.message);
// 		eCommon.unblockUI();
// 	}
// }
eCommon.isTV = function () {
	if (/SMART-TV|SmartHub|SmartTV/i
		.test(navigator.userAgent)) {
		return true;
	}
	return false;
}
eCommon.getIP = function () {
	try {
		webapis.network.getAvailableNetworks(function (networks) {
			for (var i = 0; i < networks.length; i++) {
				if (networks[i].isActive && networks[i].interfaceType == 1) { // Wire connect
					eCommon.logs(JSON.stringify({
						message: 'Available Network interface',
						interfaceType: networks[i].interfaceType,
						ip: networks[i].ip
					}));
					eCommon.IP_ADDR = networks[i].ip;
				}
			}
			eCommon.applicationSetup();
		}, function () {
			eCommon.logs(JSON.stringify({
				message: "Error get IP address",
				key: eCommon.getDeviceID()
			}));
			eCommon.applicationSetup();
		});
	} catch (error) {
		console.log(error.name);
		// eCommon.applicationSetup();
	}
}
eCommon.getDeviceID = function () {
	if (eCommon.isTV()) {
		var id = webapis.tv.info.getDeviceID();
		return id;
	}
	return '2000';
}
eCommon.getModel = function () {
	if (eCommon.isTV()) {
		var model = webapis.tv.info.getModel();
		return model;
	}
	return "SMARTTV-SAMSUNG";
}
eCommon.getTimeZone = function () {
	if (eCommon.isTV()) {
		var time = webapis.tv.info.getTimeZone();
		return time;
	}
	return "00:00";
}
eCommon.getSerialNumber = function () {
	return eCommon.KEY_SERIAL_NUMBER;
}
eCommon.applicationSetup = function () {
	eCommon.KEY_SERIAL_NUMBER = eCommon.getDeviceID();
	eCommon.logs(JSON.stringify({
		message: "Application check before go ahead",
		fn: "eCommon.applicationSetup",
		request: API.getAPI().CMD_R + '&keystb=' + eCommon.KEY_SERIAL_NUMBER + '&room=-999&ip=' + eCommon.IP_ADDR
	}));
	$.ajax({
		url: API.getAPI().CMD_R + '&keystb=' + eCommon.KEY_SERIAL_NUMBER + '&room=-999&ip=' + eCommon.IP_ADDR,
		data: "",
		cache: true,
		type: 'GET',
		async: false,
		success: function (response) {
			var room = response;
			eCommon.logs(JSON.stringify({
				message: "Response application check",
				fn: "eCommon.applicationSetup",
				room: room,
				key: eCommon.KEY_SERIAL_NUMBER
			}));
			if (parseInt(response) === -999) { // register
				$('#msg-register').on('shown.bs.modal', function () {
					setTimeout(function () {
						$('#msg-register').find('input').val(eCommon.KEY_ROOM_NUMBER);
						$('#msg-register').find('a[tabindex="0"]').focus();
					}, 1);
				});
				$('#msg-register').find('.modal').modal('show');
			} else {
				eCommon.KEY_ROOM_NUMBER = room;
				eWelcome.startApp();
			}
		},
		error: function () {
			eCommon.logs(JSON.stringify({
				message: "Not connect to server",
				fn: "eCommon.applicationSetup",
				key: eCommon.KEY_SERIAL_NUMBER
			}));
		}
	});
	//	if (typeof (Storage) !== "undefined") {
	//		if (localStorage.getItem("KEY_SERIAL_NUMBER") === null
	//				|| localStorage.getItem("KEY_ROOM_NUMBER") === null) {
	//			 
	//			// show popup register
	//			$('#msg-register').on('shown.bs.modal', function() {
	//				setTimeout(function(){
	//					$('#msg-register').find('input').val(eCommon.KEY_ROOM_NUMBER);
	//					$('#msg-register').find('a[tabindex="0"]').focus();
	//				}, 1);
	//			});
	//			$('#msg-register').find('.modal').modal('show');
	//			return;
	//		}
	//		// start app
	//		eCommon.KEY_SERIAL_NUMBER = localStorage.getItem("KEY_SERIAL_NUMBER");
	//		eCommon.KEY_ROOM_NUMBER = localStorage.getItem("KEY_ROOM_NUMBER");
	//		eWelcome.startApp();
	//	} else {
	//		$('.error').html("TV not support localStorage");
	//	}
}
eCommon.setConfig = function () {
	eCommon.KEY_SERIAL_NUMBER = eCommon.getDeviceID();
	eCommon.logs(JSON.stringify({
		message: "Request register room",
		fn: "eCommon.setConfig",
		request: API.getAPI().CMD_R + '&keystb=' + eCommon.KEY_SERIAL_NUMBER + '&room=' + eCommon.KEY_ROOM_NUMBER + '&ip=' + eCommon.IP_ADDR
	}));
	//send data to server
	$.ajax({
		url: API.getAPI().CMD_R + '&keystb=' + eCommon.KEY_SERIAL_NUMBER + '&room=' + eCommon.KEY_ROOM_NUMBER + '&ip=' + eCommon.IP_ADDR,
		data: "",
		cache: true,
		type: 'GET',
		async: false,
		success: function (response) {
			eCommon.logs(JSON.stringify({
				"key": eCommon.KEY_SERIAL_NUMBER,
				"room": eCommon.KEY_ROOM_NUMBER,
				"response": response,
				"message": "Register TV",
				"fn": "eCommon.setConfig"
			}));
			if (Number(response) == -1) { // Room is registered with ID TV
				localStorage.clear();
				// show popup err
				$('#msg-register').find('.text-danger').html(language.TEXT_REGISTERY_ERROR1);
				$('#msg-register').find('input').select();
			} else if (Number(response) == -2) { // ID TV is registered with room other
				localStorage.clear();
				$('#msg-register').find('.text-danger').html(language.TEXT_REGISTERY_ERROR2);
				$('#msg-register').find('input').select();
			} else if (Number(response) == -3) { // Room not exist
				localStorage.clear();
				$('#msg-register').find('.text-danger').html(language.TEXT_REGISTERY_ERROR3);
				$('#msg-register').find('input').select();
			} else { // success
				localStorage.setItem("KEY_SERIAL_NUMBER", eCommon.KEY_SERIAL_NUMBER);
				localStorage.setItem("KEY_ROOM_NUMBER", eCommon.KEY_ROOM_NUMBER);
				//show popup
				$('#msg-register').find('.modal-body').html('<h5 class="text-black">Your TV is register success</h5>' + '<h5 class="text-black">' + eCommon.KEY_SERIAL_NUMBER + '-' + eCommon.KEY_ROOM_NUMBER + '</h5>');
				$('#msg-register').find('.modal-footer').html('<a tabindex="0" href="javascript:void()"  class="btn btn-sm" role="button" onKeyDown="eCommon.configSuccess()"><i class="fa fa-times"></i> Close</a>');
				$('#msg-register').find('.modal').modal('show');
				setTimeout(function () {
					$('#msg-register').find('a[tabindex="0"]').focus();
					location.reload();
				}, 1500);
				eCommon.IS_KEY_PRESS = false;
			}
		},
		error: function (error) {
			$('.error').html("Please press Exit button to reload " + error.responseText);
		}
	});
}
eCommon.reConfig = function () {
	eCommon.IS_KEY_PRESS = true;
	eCommon.KEY_SERIAL_NUMBER = eCommon.getDeviceID();
	//eCommon.KEY_ROOM_NUMBER = eCommon.KEY_ROOM_NUMBER;
	//eCommon.KEY_SERIAL_NUMBER = "EXCLEH4S552FK";
	//eCommon.KEY_ROOM_NUMBER = "1037";
	//send data to server
	eCommon.logs(JSON.stringify({
		fn: "eCommon.reConfig",
		message: "Request change room",
		request: API.getAPI().CMD_R + '&keystb=' + eCommon.KEY_SERIAL_NUMBER + '&room=' + eCommon.KEY_ROOM_NUMBER + '&ip=' + eCommon.IP_ADDR
	}));
	$.ajax({
		url: API.getAPI().CMD_R + '&keystb=' + eCommon.KEY_SERIAL_NUMBER + '&room=' + eCommon.KEY_ROOM_NUMBER + '&ip=' + eCommon.IP_ADDR,
		data: "",
		cache: true,
		type: 'GET',
		async: false,
		success: function (response) {
			eCommon.logs(JSON.stringify({
				"key": eCommon.KEY_SERIAL_NUMBER,
				"room": eCommon.KEY_ROOM_NUMBER,
				"response": response,
				"message": "Re-register TV"
			}));
			if (Number(response) == -1) { // Room is registered with ID TV
				localStorage.clear();
				// show popup err
				$('#msg-register').find('.text-danger').html(language.TEXT_REGISTERY_ERROR1);
				$('#msg-register').find('input').select();
			} else if (Number(response) == -2) { // ID TV is registered with room other
				localStorage.clear();
				$('#msg-register').find('.text-danger').html(language.TEXT_REGISTERY_ERROR2);
				$('#msg-register').find('input').select();
			} else if (Number(response) == -3) { // Room not exist
				localStorage.clear();
				$('#msg-register').find('.text-danger').html(language.TEXT_REGISTERY_ERROR3);
				$('#msg-register').find('input').select();

			} else { // success
				$('#msg-register').on('shown.bs.modal', function () {
					setTimeout(function () {
						$('#msg-register').find('input').val(eCommon.KEY_ROOM_NUMBER);
						$('#msg-register').find('a[tabindex="0"]').focus();
					}, 1);
				});
				$('#msg-register').find('.modal').modal('show');
			}
		},
		error: function (error) {
			$('.error').html("Please press Exit button to reload " + error.responseText);
		}
	});
}
eCommon.configSuccess = function () {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			$('#msg-register').find('.modal').modal('hide');
			eWelcome.startApp();
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
	}
}
eCommon.roomSetting = function () {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	eCommon.IS_KEY_PRESS = true;
	$('#msg-register').find('.text-danger').html('');
	var text = $('#roomSetting').val();
	//var inp = String.fromCharCode(keyCode);
	//$('#roomSetting').val(text + inp);
	//if (/[a-zA-Z0-9]/.test(inp)){

	//}
	eCommon.logs(JSON.stringify({
		key: keyCode,
		text: text,
		message: 'Resgister'
	}));
	switch (keyCode) {
		case eCommon.KEY_DOWN:
			$('#msg-register').find('a[tabindex="0"]').focus();
			break;
		case eCommon.KEY_ENTER:
			$('#msg-register').find('a[tabindex="0"]').focus();
			break;
		case eCommon.KEY_0:
			text = text + '0';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_1:
			text = text + '1';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_2:
			text = text + '2';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_3:
			text = text + '3';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_4:
			text = text + '4';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_5:
			text = text + '5';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_6:
			text = text + '6';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_7:
			text = text + '7';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_8:
			text = text + '8';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_9:
			text = text + '9';
			$('#roomSetting').val(text);
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}
eCommon.registerTV = function ($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	var tabindex = Number($($this).attr('tabindex'));
	switch (keyCode) {
		case eCommon.KEY_UP:
			$('#msg-register').find('input').select();
			break;
		case eCommon.KEY_LEFT:
			if (tabindex == 1) {
				$('#msg-register').find('a[tabindex="0"]').focus();
			}
			break;
		case eCommon.KEY_RIGHT:
			if (tabindex == 0) {
				$('#msg-register').find('a[tabindex="1"]').focus();
			}
			break;
		case eCommon.KEY_ENTER:
			if (tabindex == 0) {
				try {
					var room = ($('#msg-register').find('input').val());
					if ((room) == "" || room == null) {
						$('#msg-register').find('.text-danger').html('Invalid room number');
						$('#msg-register').find('input').select();
						return;
					}
					eCommon.KEY_ROOM_NUMBER = room;
					eCommon.setConfig();
				} catch (e) {
					$('#msg-register').find('.text-danger').html('Invalid room number');
					$('#msg-register').find('input').select();
					return;
				}
			} else {
				$('#msg-register').find('input').val('');
				$('#msg-register').find('input').focus();
			}

			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}

}
eCommon.showBackground = function (url) {
	$('body').css('background', 'url(' + eCommon.background + ')');
}
eCommon.hideBackground = function () {
	$('body').css('background', 'transparent');
}
eCommon.getSerial = function () {
	return;
}
eCommon.includeJSFile = function (nameFile, type) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script'); //script tag creation. 
	script.type = type;
	script.src = nameFile;
	head.appendChild(script);
}
eCommon.includeCSSFile = function (nameFile, type) {
	var head = document.getElementsByTagName('head')[0];
	var css = document.createElement('link'); //css tag creation. 
	css.type = type;
	css.href = nameFile;
	head.appendChild(css);
}
eCommon.showHeader = function () {
	$('nav[data-ehotel-header="false"]').attr('data-ehotel-header', true);
}
eCommon.hideHeader = function () {
	$('nav[data-ehotel-header="true"]').attr('data-ehotel-header', false);
}
eCommon.showFooter = function () {
	$('#footer-main').show();
}
eCommon.showFooterSojo = function () {
	$('#footer-Sojo').show();
}
eCommon.hideFooterSojo = function () {
	$('#footer-Sojo').hide();
}
eCommon.hideFooter = function () {
	$('#footer-main').hide();
}
eCommon.backgroundTransparent = function () {
	$('body').css({ 'background': 'transparent' });
}
eCommon.setBackground = function () {
	// set background
	$('body').css({
		'background': 'url(' + eCommon.background + ') no-repeat center center fixed',
		'-webkit-background-size': 'cover',
		'-moz-background-size': 'cover',
		'-o-background-size': 'cover',
		'background-size': 'cover'
	});
}
eCommon.errorVideo = function (message) {
	message = "<h4>Nguồn Kênh Bị Lỗi Quý Khách Vui Lòng Chọn Kênh Khác</h4><h4>The channel source error. Visitors are kindly requested to channel else</h4>"
	$.blockUI({
		message: message,
		css: {
			padding: 0,
			margin: 0,
			width: '30%',
			top: '40%',
			left: '35%',
			textAlign: 'center',
			color: '#fff',
			'font-size': '30px',
			border: '0px solid #000',
			backgroundColor: 'transparent',
			cursor: 'wait'
		},
		overlayCSS: {
			backgroundColor: '#000',
			opacity: 1,
			cursor: 'wait'
		}
	});
}

eCommon.errorChannel = function (message) {
	message = '<h4>Nguồn kênh tạm thời bị gián đoạn, quý khách vui lòng chọn kênh khác hoặc đợi trong giây lát</h4><h4>The channel temporary error, kindly change other channel or wait a moment</h4><br/><button class="btn btn-default" id="btn-retry" onKeyDown="eTVPlayer.onErrorKeyDown(event)">Thử lại/ Retry<span style="color: red; padding-left: 10px">30</span></button>';
	$.blockUI({
		message: message,
		css: {
			padding: 0,
			margin: 0,
			width: '40%',
			top: '40%',
			left: '30%',
			textAlign: 'center',
			color: '#fff',
			'font-size': '30px',
			border: '0px solid #000',
			backgroundColor: 'transparent',
			cursor: 'wait'
		},
		overlayCSS: {
			backgroundColor: '#000',
			opacity: 1,
			cursor: 'wait'
		},
		onBlock: function () {
			clearTimeout(eCommon.countDownTimeout);
			eCommon.countDownTimeout = setTimeout(function () { $('#btn-retry').focus(); }, 500);
			eCommon.countDownInterval = setInterval(function () {
				var countDown = Number($('#btn-retry span').text());
				countDown--;
				if (countDown > 0) {
					$('#btn-retry span').text(countDown);
				} else {
					clearTimeout(eCommon.countDownTimeout);
					clearInterval(eCommon.countDownInterval);
					eCommon.unblockUI();
					eTVPlayer.stop();
					eTVPlayer.AVPlayer(eTVPlayer.url);
				}
			}, 1000);
		}
	});
}

eCommon.loading = function () {
	$.blockUI({
		message: '<div><img style="width:73px;height:73px;border-radius: 73px;" src="ELCommon/view/images/ic_spinner.gif"></div>',
		css: {
			padding: 0,
			margin: 0,
			width: '30%',
			top: '43%',
			left: '35%',
			textAlign: 'center',
			color: '#000',
			border: '0px solid #aaa',
			backgroundColor: 'transparent',
			cursor: 'wait'
		},
		overlayCSS: {
			backgroundColor: '#000',
			opacity: 0.1,
			cursor: 'wait'
		}
	});
}

eCommon.blockUI = function () {
	$.blockUI({
		message: '<div><img style="width:73px;height:73px;border-radius: 73px;" src="ELCommon/view/images/ic_spinner.gif"></div>',
		css: {
			padding: 0,
			margin: 0,
			width: '30%',
			top: '43%',
			left: '35%',
			textAlign: 'center',
			color: '#000',
			border: '0px solid #aaa',
			backgroundColor: 'transparent',
			cursor: 'wait'
		}
	});
}
eCommon.unblockUI = function () {
	$.unblockUI();
}
eCommon.blockScreen = function () {
	$.blockUI({
		message: '',
		css: {
			padding: 0,
			margin: 0,
			width: '30%',
			top: '40%',
			left: '35%',
			textAlign: 'center',
			color: '#000',
			border: '0px solid #aaa',
			backgroundColor: 'transparent',
			cursor: 'wait'
		}
	});
}
eCommon.htmlUnescape = function (value) {
	return value.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}
eCommon.htmlEscape = function (str) {
	return str.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}
eCommon.htmlToText = function (html) {
	var tag = document.createElement('div');
	tag.innerHTML = html;
	return tag.innerText;
}
eCommon.convertImgToBase64 = function (url, callback) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.height = this.height;
		canvas.width = this.width;
		ctx.drawImage(this, 0, 0);
		var dataURL = canvas.toDataURL();
		callback(dataURL);
		canvas = null;
	};
	img.src = url;
}
eCommon.getTime = function () {
	var _ = this;
	var date = new Date();
	var hour = date.getHours() + (date.getHours() < 12 ? 12 : 0);
	var period = date.getHours() > 12 ? 'PM' : 'AM';
	return (_.showTime(hour) + ':' + _.showTime(date.getMinutes()) + period);
}
eCommon.getDate = function () {
	var _ = this;
	var currentdate = new Date();
	return (_.showTime(currentdate.getDate()) + "/" + _.showTime(currentdate.getMonth() + 1) + "/" + _.showTime(currentdate.getFullYear()));
}
eCommon.showTime = function (time) {
	return time < 10 ? '0' + time : time;
}
eCommon.initialSlide = function (slideCount) {
	if (slideCount === 1 || slideCount === 2) {
		return 0;
	} else if (slideCount === 3) {
		return 1;
	} else if (slideCount === 4 || slideCount === 5 || slideCount === 6) {
		return 2;
	} else if (slideCount === 7 || slideCount === 8) {
		return 3;
	} else if (slideCount > 8) {
		return 4;
	}
}
eCommon.random = function () {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
eCommon.getPrettyTime = function (date) {
	var _ = this;
	if (eCommon.languageCode === eCommon.CODE_EN) {
		var hour = date.getHours();
		var period = date.getHours() >= 12 ? 'PM' : 'AM';
		//_.timeNavbarHome = _.timeNavbarHome + _.showTime(hour) + ' : ' + _.showTime(date.getMinutes()) + period;
		return (_.showTime(hour) + ':' + _.showTime(date.getMinutes()));
	} else if (eCommon.languageCode === eCommon.CODE_VN) {
		var hour = date.getHours();
		var period = date.getHours() >= 12 ? 'CH' : 'SA';
		//_.timeNavbarHome = _.timeNavbarHome + _.showTime(hour) + ' : ' + _.showTime(date.getMinutes()) + period;
		return (_.showTime(hour) + ':' + _.showTime(date.getMinutes()));
	}
}
eCommon.getPrettyDateStandby = function (date) {
	var _ = this;
	var vnDay = ['Ch&#7911; nh&#7853;t', 'Th&#7913; Hai', 'Th&#7913; Ba', 'Th&#7913; Tư', 'Th&#7913; Năm', 'Th&#7913; Sáu', 'Th&#7913; Bảy'];
	var enDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var vnMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	var enMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	//var enMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	var enPeriodDays;
	if (eCommon.languageCode === eCommon.CODE_EN) {
		var day = date.getDay();
		var month = date.getMonth();
		if (_.showTime(date.getDate()) == 1 || _.showTime(date.getDate()) == 21) {
			enPeriodDays = 'st';
		} else if (_.showTime(date.getDate()) == 2 || _.showTime(date.getDate()) == 22) {
			enPeriodDays = 'nd';
		} else if (_.showTime(date.getDate()) == 3 || _.showTime(date.getDate()) == 23) {
			enPeriodDays = 'rd';
		} else {
			enPeriodDays = 'th';
		}
		_.timeNavbarHome = enDay[day] + ', ' + enMonth[month] + ' ' + _.showTime(date.getDate()) + ' | ';
		return (enDay[day] + ', ' + enMonth[month] + ' ' + _.showTime(date.getDate()) + enPeriodDays.sup() + ' ' + date.getFullYear());
	} else if (eCommon.languageCode === eCommon.CODE_VN) {
		var day = date.getDay();
		var month = date.getMonth();
		_.timeNavbarHome = enDay[day] + ', ' + enMonth[month] + ' ' + _.showTime(date.getDate()) + ' | ';
		return (vnDay[day] + ',' + ' ' + _.showTime(date.getDate()) + '/' + vnMonth[month] + '/' + date.getFullYear());
	}
}
eCommon.getPeriodTime = function (date) {
	var _ = this;
	if (eCommon.languageCode === eCommon.CODE_EN) {
		var hour = date.getHours() - (date.getHours() > 12 ? 12 : 0);
		var period = date.getHours() >= 12 ? 'PM' : 'AM';
		if (date.getHours() >= 12) {
			$("#pmWel").show();
			$("#pmStand").show();
		} else {
			$("#amWel").show();
			$("#amStand").show();
		}
		_.timeNavbarHome = _.timeNavbarHome + _.showTime(hour) + ' : ' + _.showTime(date.getMinutes()) + period;
		return (' ' + period);
	} else if (eCommon.languageCode === eCommon.CODE_VN) {
		var hour = date.getHours() - (date.getHours() > 12 ? 12 : 0);
		var period = date.getHours() >= 12 ? 'CH' : 'SA';
		if (date.getHours() >= 12) {
			$("#pmWel").show();
			$("#pmStand").show();
		} else {
			$("#amWel").show();
			$("#amStand").show();
		}
		_.timeNavbarHome = _.timeNavbarHome + _.showTime(hour) + ' : ' + _.showTime(date.getMinutes()) + period;
		return (' ' + period);
	}
}
eCommon.setLang = function () {
	var _ = this;
	var vnRoom = 'PH&Ograve;NG';
	var enRoom = 'ROOM';
	var vnCity = 'TH&Agrave;NH PHỐ NAM ĐỊNH';
	var enCity = 'NAM DINH CITY';
	var vnToday = 'H&Ocirc;M NAY';
	var enToday = 'TODAY';
	var vnTomorrow = 'NG&Agrave;Y MAI';
	var enTomorrow = 'TOMORROW';
	if (eCommon.languageCode === eCommon.CODE_EN) {
		$('.nav-lang-room').html(enRoom);
		$('.nav-lang-city').html(enCity);
		$('.nav-lang-today').html(enToday);
		$('.nav-lang-tomorrow').html(enTomorrow);
		//$('.nav-time').html(eCommon.getPrettyTime(date));
		//return enRoom
	} else if (eCommon.languageCode === eCommon.CODE_VN) {
		//return vnRoom;
		$('.nav-lang-room').html(vnRoom);
		$('.nav-lang-city').html(vnCity);
		$('.nav-lang-today').html(vnToday);
		$('.nav-lang-tomorrow').html(vnTomorrow);
	}
}
eCommon.getPrettyDate = function (date) {
	var _ = this;
	var vnDay = ['Ch&#7911; nh&#7853;t', 'Th&#7913; 2', 'Th&#7913; 3', 'Th&#7913; 4', 'Th&#7913; 5', 'Th&#7913; 6', 'Th&#7913; 7'];
	var enDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var vnMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	var enMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	var enPeriodDays;
	if (eCommon.languageCode === eCommon.CODE_EN) {
		var day = date.getDay();
		var month = date.getMonth();
		if (_.showTime(date.getDate()) == 1 || _.showTime(date.getDate()) == 21) {
			enPeriodDays = 'st';
		} else if (_.showTime(date.getDate()) == 2 || _.showTime(date.getDate()) == 22) {
			enPeriodDays = 'nd';
		} else if (_.showTime(date.getDate()) == 3 || _.showTime(date.getDate()) == 23) {
			enPeriodDays = 'rd';
		} else {
			enPeriodDays = 'th';
		}
		_.timeNavbarHome = enDay[day] + ', ' + enMonth[month] + ' ' + _.showTime(date.getDate()) + ' | ';
		return (enDay[day] + ', ' + enMonth[month] + ' ' + _.showTime(date.getDate()) + enPeriodDays.sup() + ' ' + date.getFullYear());
	} else if (eCommon.languageCode === eCommon.CODE_VN) {
		var day = date.getDay();
		var month = date.getMonth();
		_.timeNavbarHome = enDay[day] + ', ' + enMonth[month] + ' ' + _.showTime(date.getDate()) + ' | ';
		return (vnDay[day] + ',' + ' ' + _.showTime(date.getDate()) + '/' + vnMonth[month] + '/' + date.getFullYear());
	}
}

eCommon.runTime = function () {
	var date = new Date;
	$('.nav-date').html(eCommon.getPrettyDate(date));
	$('.nav-time').html(eCommon.getPrettyTime(date));
	$('.main-time').html(eCommon.timeNavbarHome);
	eCommon.intervalTime = setInterval(function () {
		var date = new Date;
		eCommon.timeNavbarHome = '';
		$('.nav-date').html(eCommon.getPrettyDate(date));
		$('.nav-time').html(eCommon.getPrettyTime(date));
		$('.main-time').html(eCommon.timeNavbarHome);
	}, 1000);
}
eCommon.runTimeSoJo = function () {
	var currentdate = new Date();
	var currentTime = eCommon.getPrettyTime(currentdate);
	var periodTime = eCommon.getPeriodTime(currentdate);
	//var currentDay = eCommon.getDateString(); 
	var currentDay = eCommon.getPrettyDate(currentdate);
	var currentTimeStandby = eCommon.getPrettyDateStandby(currentdate);
	$(eCommon.timeforNavbarHome).html(currentTime);
	$(eCommon.dateNavbarHome).html(currentDay);
	$(eCommon.timeperiodNavbarHome).html(periodTime);
	$(eCommon.dateNavbarHomeStandby).html(currentTimeStandby);
}
/**
 * convert time to second
 * @param strTime
 * @returns {Number} 
 */
eCommon.timeToSecond = function (strTime) { // strTime format: 00:00:00
	var second = 0;
	strTime = strTime || '00:00:00';
	var str = strTime.split(":");
	if (str.length == 0) {
		console.log("--> Time input wrong format");
	} else {
		if (str.length == 3) {
			second = Number(str[0]) * 60 * 60 + Number(str[1]) * 60 + Number(str[2]);
		} else if (str.length == 2) {
			second = Number(str[0]) * 60 * 60 + Number(str[1]) * 60;
		}
	}
	return second;
}
/**
 * 
 * @param second
 */
eCommon.secondToTime = function (second) {
	second = second || 0;
	var hours = parseInt(second / 3600) % 24;
	if (hours == 0) {
		hours = "";
	} else {
		hours = hours < 10 ? "0".concat(hours, ":") : hours.concat(":");
	}
	var minutes = parseInt(second / 60) % 60;
	var seconds = parseInt(second % 60);
	return (hours + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
}
/**
 * 
 * @returns {String} format: hh:mm
 */
eCommon.getTime = function () {
	var _ = this;
	var date = new Date();
	var hour = date.getHours(); //- (date.getHours() > 12 ? 12 : 0);
	//var period = date.getHours() >= 12 ? 'PM' : 'AM';
	return (_.showTime(hour) + ':' + _.showTime(date.getMinutes()));
}
eCommon.logServer = function (data) {
}
eCommon.logs = function (data) {
	$('.logs').html(data);
	$.ajax({
		url: 'http://' + location.hostname + ':3122/logs',
		data: { message: data, key: eCommon.KEY_SERIAL_NUMBER },
		success: function (response) {
		},
		error: function () {
		}
	});
}

eCommon.stringToTime = function (str) {
	if (str == null || str == '') {
		return 0;
	}
	var time = str.split(':');
	if (time.length != 3) {
		return 0;
	}
	time = Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);
	return time * 1000;
}

eCommon.getDay = function () {
	var d = new Date();
	var day = [8, 2, 3, 4, 5, 6, 7]
	var a = d.getDay()
	return day[d.getDay()];
}

eCommon.getTomorrow = function () {
	var d = new Date();
	var day = [8, 2, 3, 4, 5, 6, 7]
	return day[d.getDay() + 1];
}