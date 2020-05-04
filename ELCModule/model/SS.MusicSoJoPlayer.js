eMusicSoJoPlayer = {
	key: "TVPLAYER",
	element: '#scenes-tv',
	cNumTV : '.number-tv',
	isKeyPress: false,
	data: [],
	indexChannel: 1,
	avPlayer: null,
	url: '',
	deplay: 2000,
	timeout: 0,
	timeValue: 0,
	countError: 0,
	IS_PLAY_SUCCESS: false,
	playAgain: true,
	timeout: null,
	status: '',
	playTime: 0
};


eMusicSoJoPlayer.play = function(url){
	var _ = this;
	eCommon.HISTORY.push(this);	
	_.url = url; //+ '|COMPONENT=MPTS';
	eCommon.logs(JSON.stringify({
		message: "Play channel",
		request: _.url
	}));
	_.show();
	_.AVPlayer(_.url);
	_.focus();
	//eMusicSoJoPlayer.checkText();
//	_.showText(10, "Flamingo thông báo");
}
eMusicSoJoPlayer.playAgain = function(url, playAgain){
	var _ = this;
	_.url = url;
	_.playAgain = true;
	do{
		eMusicSoJoPlayer.play(_.url);
	}
	while(playAgain)
}
eMusicSoJoPlayer.AVPlayer = function(url){
	var _ = this;	
	try{
		  _.url = url;
		  eCommon.blockUI();
		  eMusicSoJoPlayer.playTime = 0;
		  if(eCommon.IS_PLAYING){
			  _.stop();
		  }
		  if(this.avPlayer != null){
			  _.playAV();
		  } else {
			  webapis.avplay.getAVPlay(eMusicSoJoPlayer.successCB, eMusicSoJoPlayer.errorCB);
		  }
	  }catch(e){
		  eCommon.logs(JSON.stringify({
				error: e.name,
				fn: "eMusicSoJoPlayer.AVPlayer"
			}));
	  } 
}

eMusicSoJoPlayer.timeToSec = function(time){
	//eCommon.logs("eMusicSoJoPlayer.timeToSec: "+ time);
	var sec = (time+"").split(':');
	//eCommon.logs("eMusicSoJoPlayer.timeToSec: "+ JSON.stringify(sec));
	var h = Number(sec[0])*3600;
	var m = Number(sec[1])*60;
	var s = Number(sec[2]);
	return h+m+s;
}

eMusicSoJoPlayer.successCB = function(avplay) {
	eMusicSoJoPlayer.avPlayer = avplay;
	var playCB = {
		oncurrentplaytime : function(time) {
			/*var sec = eMusicSoJoPlayer.timeToSec(time)+1;
			var cur = eMusicSoJoPlayer.playTime/2;
			//eCommon.logs("oncurrentplaytime: "+cur+":"+sec);
			if (sec > 0 && cur > sec) {
				if (eMusicSoJoPlayer.status != "oncurrentplaytime"){
					eCommon.loading();
					eMusicSoJoPlayer.status = "oncurrentplaytime";
					eMusicSoJoPlayer.playTime = 0;
					eCommon.logs("oncurrentplaytime");
				}
			} else if (sec - cur > 5) {
				eMusicSoJoPlayer.playTime = sec*2-1;
			} else {
				eMusicSoJoPlayer.playTime++;
			}*/
		},
		onresolutionchanged : function(width, height) {
			eCommon.logs("onresolutionchanged");
			//eMusicSoJoPlayer.status = "onresolutionchanged";
		},
		onstreamcompleted : function() {
			eCommon.logs("onstreamcompleted");
			//eMusicSoJoPlayer.status = "onstreamcompleted";
			/*eMusicSoJoPlayer.stop();
			eMusicSoJoPlayer.AVPlayer(eMusicSoJoPlayer.url);*/
		},
		onerror : function(e) {
			//eMusicSoJoPlayer.status = "onerror";
			eCommon.logs(JSON.stringify({
				error: e.name,
				fn: "eMusicSoJoPlayer.successCB"
			}));
			eMusicSoJoPlayer.error(e.name);
		}
	};
	var bufferingCB = {
		onbufferingstart : function() {
			eCommon.logs("onbufferingstart");
		},
		onbufferingprogress : function(percent) {
			eCommon.logs("onbufferingprogress: "+percent);
			/*if (eMusicSoJoPlayer.playTime > 0){
				eCommon.loading();
				eMusicSoJoPlayer.stop();
				eMusicSoJoPlayer.AVPlayer(eMusicSoJoPlayer.url);
			}
			eMusicSoJoPlayer.status = "onbufferingprogress";*/
		},
		onbufferingcomplete : function() {
			eCommon.logs("onbufferingcomplete");
		}
	};
	eMusicSoJoPlayer.avPlayer.init({
		containerID : 'player_container',
		zIndex : -1,
		bufferingCallback : bufferingCB,
		playCallback : playCB,
		displayRect : {
			top : 0,
			left : 0,
			width : window.screen.width,
			height : window.screen.height
		},
		autoRatio : false,
	});
	eMusicSoJoPlayer.playAV();
};

eMusicSoJoPlayer.errorCB = function(e) {
	eCommon.logs(e.name);
	eMusicSoJoPlayer.error(e.name);
};
eMusicSoJoPlayer.playAV = function(){
	var _ = this;
	_.countError = 0;
	try{
		$('#player_container').show();
		var displayRect =  {
		  top: 0,
		  left: 0,
		  width: window.screen.width,
		  height: window.screen.height
		};
		eMusicSoJoPlayer.avPlayer.setDisplayRect(displayRect, function(){}, function(){});
		eMusicSoJoPlayer.avPlayer.open(_.url, {totalBufferSize: 10485760, pendingBufferSize: 1048576});
		// hidden something on screen
		eCommon.hideHeader();
		eCommon.hideFooter();
		//eCommon.showBackground();
		// handle play channel
		eCommon.logs('Before play:'+_.url);
		_.IS_PLAY_SUCCESS = false;
		clearTimeout(_.timeout);
		_.timeout = setTimeout(function(){
			if(!_.IS_PLAY_SUCCESS){
				_.error("avPlayer.play ERROR");
				_.stop();
			}
		}, 5000);
		eMusicSoJoPlayer.avPlayer.play(function(){
			eCommon.logs('TV Play Success');	
			_.IS_PLAY_SUCCESS = true;
			eCommon.unblockUI();
			eCommon.IS_PLAYING = true;
		}, function(){
			eCommon.logs(JSON.stringify({
				message: "play error",
				fn: "eMusicSoJoPlayer.avPlayer.play"
			}));
			//_.error("avPlayer.play ERROR");
			_.stop();
			_.countError+=1;
			if(_.countError < 3){
				_.playAV();
			} else {
				_.countError = 0;
			}
		});
	} catch(e){
		eCommon.logs(JSON.stringify({
			message: e.name,
			fn: "eMusicSoJoPlayer.playAV"
		}));
		//_.error(e.name);
		_.stop();
		_.countError+=1;
		if(_.countError < 3){
			_.playAV();
		} else {
			_.countError = 0;
			_.error(e.name);
			_.stop();
		}
	}
}
eMusicSoJoPlayer.isPlaying = function(){
	if($(eMusicSoJoPlayer.element).css('display') != 'none' ){
		return true;
	}
	return false;
}
eMusicSoJoPlayer.handlerEvent = function(event, data1, data2) {
	switch (event) {
		case 14: // OnCurrentPlayBackTime, param = playback time in ms
			break;
		case 1: // OnConnectionFailed
			eMusicSoJoPlayer.error("Connection source failed");
			break;
		case 2: // OnAuthenticationFailed
			eMusicSoJoPlayer.error("Authentication failed");
			break;
		case 3: // OnStreamNotFound
			eMusicSoJoPlayer.error("Stream not found");
			break;
		case 4: // OnNetworkDisconnected
			eMusicSoJoPlayer.error("Network disconnected");
			break;

		case 6: // OnRenderError
			var error;
			switch (param) {
				case 1:
					error = 'Unsupported container';
					break;
				case 2:
					error = 'Unsupported  codec';
					break;
				case 3:
					error = 'Unsupported audio codec';
					break;
				case 6:
					error = 'Corrupted stream';
					break;
				default:
					error = 'Unknown';
				}
			eMusicSoJoPlayer.error(error);
			break;

		case 8: // OnRenderingComplete
			break;
		case 9: // OnStreamInfoReady
			ePlayer.setDisplayArea();
			break;
		case 11: // OnBufferingStart
			break;
		case 12: // OnBufferingComplete
			eCommon.unblockUI();
			eCommon.showBackground();
			eCommon.hideFooter();
//			eMusicSoJoPlayer.showText(10, "Flamingo thông báo");
			break;
		case 13: // OnBufferingProgress, param = progress in %
			break;
	}
}
eMusicSoJoPlayer.stop = function(){
//	ePlayer.stop();
	if(this.avPlayer != null){
		this.avPlayer.stop();
		eCommon.IS_PLAYING = false;
	}
}
eMusicSoJoPlayer.error = function(){
//	this.play('http://'.concat(location.host,'/ELCommon/video/nosign.mp4'));
	eCommon.errorChannel(arguments[0]);
	this.focus();
	this.stop();
	eCommon.logs("eMusicSoJoPlayer.error: "+arguments[0]);
}

eMusicSoJoPlayer.focus = function() {
	$(eCommon.ELEMENT_GLOBAL).attr('onkeydown', 'eMusicSoJoPlayer.keyDown(this, event)');
	//$(eCommon.ELEMENT_GLOBAL).attr('onClick', 'eMusicSoJoPlayer.keyDown(this, event)');
	$(eCommon.ELEMENT_GLOBAL).focus();
}

eMusicSoJoPlayer.show = function() {
	eMusic.init();
	$(this.element).show();
}

eMusicSoJoPlayer.hide = function() {
	$(this.element).hide();
}
eMusicSoJoPlayer.showText = function(time, text, font_size, font_color, background_color){
	eCommon.hideFooter();
	$('.text-inform-tv').html('<h4 style="font-size: '+font_size+'; color: '+font_color+';">'+text+'</h4>');
	$('.text-inform-tv').css({
		background: background_color
	});
	$('.text-inform-tv').show();
	clearTimeout(eMusicSoJoPlayer.timeout);
	eMusicSoJoPlayer.timeout = setTimeout(function(){$('.text-inform-tv').empty(); $('.text-inform-tv').hide()}, time);
}
eMusicSoJoPlayer.checkText = function(){
	$('.text-inform-tv').empty();
	$.ajax({
		url : API.getAPI().CMD_26,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			if (response != null && response != ""){
				var data = JSON.parse(response);
				//var time = eCommon.stringToTime(data.time);
				//{"duration":"000:00:20","background_color":"#ffffff","font_color":"#ff0000","font_size":"32px","text":"It is stormy so the TV signal is not stable. group elcom"}
				eMusicSoJoPlayer.showText(eCommon.stringToTime(data.duration), data.text, data.font_size, data.font_color, data.background_color);
			}			
		},
		error: function(){
			//eMusicSoJoPlayer.showText(10000, 'Thông báo');
		}
	});	
}
eMusicSoJoPlayer.back = function() {
	var _ = this;
	_.hide();
	_.stop();
	_.avPlayer = null;
	eCommon.unblockUI();
	eCommon.showHeader();
	eCommon.showFooter();
	eCommon.showBackground();
}
eMusicSoJoPlayer.left = function() {
	var _ = this;
	_.countError = 0;
	if (!eMusicSoJoPlayer.isKeyPress) {
		eMusicSoJoPlayer.isKeyPress = true;
		eMusicSoJoPlayer.timeValue = setTimeout(function() {
			_.indexChannel -= 1;
			if (_.indexChannel > 0) {
				_.AVPlayer(_.data[_.indexChannel - 1].url);
			} else {
				_.indexChannel = _.data.length;
				_.AVPlayer(_.data[_.indexChannel - 1].url);
			}
			// show number channel on right
			eMusicSoJoPlayer.showNumberChannel(_.indexChannel);
			eTV.updateLayout();
			eMusicSoJoPlayer.isKeyPress = false;
		}, 1500)
	}
}

eMusicSoJoPlayer.right = function() {
	var _ = this;
	_.countError = 0;
	if (!eMusicSoJoPlayer.isKeyPress) {
		eMusicSoJoPlayer.isKeyPress = true;
		eMusicSoJoPlayer.timeValue = setTimeout(function() {
			_.indexChannel = _.indexChannel + 1;
			if (_.indexChannel <= _.data.length) {
				_.AVPlayer(_.data[_.indexChannel - 1].url);
			} else {
				_.indexChannel = 1;
				_.AVPlayer(_.data[_.indexChannel - 1].url);
			}
			// show number channel on right
			eMusicSoJoPlayer.showNumberChannel(_.indexChannel);
			eTV.updateLayout();
			eMusicSoJoPlayer.isKeyPress = false;
		}, 1500)
	}
}

eMusicSoJoPlayer.showNumberChannel = function(indexChannel){
	$(eMusicSoJoPlayer.cNumTV).find('span').text(indexChannel);
	if(indexChannel <= eMusicSoJoPlayer.data.length && indexChannel > 0){
		$(eMusicSoJoPlayer.cNumTV).find('img').attr('src', API.getAPI().LOCATION_IMAGE.concat(eMusicSoJoPlayer.data[indexChannel-1].image));
	} else {
		$(eMusicSoJoPlayer.cNumTV).find('img').attr('src', 'ELCommon/view/images/ic_nosignal.gif');
	}
	$(eMusicSoJoPlayer.cNumTV).show('slide', {direction: 'right'}, 200);
	setTimeout(function(){
		$(eMusicSoJoPlayer.cNumTV).find('span').text('');
		$(eMusicSoJoPlayer.cNumTV).hide('drop', {direction: 'right'}, "slow");
	},2000);
}
eMusicSoJoPlayer.autoHide = function(){
	eTV.autoHide();
}
eMusicSoJoPlayer.keyDown = function($this, event) {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eTV.autoHide();
			break;
		case eCommon.KEY_UP:
		case eCommon.KEY_DOWN:
			if(eTV.isHide()){
				_.autoHide();
			} else {
				eTV.hide();
				eCommon.HISTORY.current().focus();
			}
			break;
		case eCommon.KEY_RIGHT:
			_.right();
			break;
		case eCommon.KEY_CH_UP:
			_.right();
			break;
		case eCommon.KEY_LEFT:
			_.left();
			break;
		case eCommon.KEY_CH_DOWN:
			_.left();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
		case eCommon.KEY_RETURN:
			eCommon.HISTORY.back();
			break;
	}
}

eMusicSoJoPlayer.onErrorKeyDown = function(event) {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			clearInterval(eCommon.countDownInterval);
			clearTimeout(eCommon.countDownTimeout);
			eCommon.unblockUI();
			_.stop();
			_.AVPlayer(_.url);
			_.focus();
			break;		
		case eCommon.KEY_RIGHT:
			clearInterval(eCommon.countDownInterval);
			clearTimeout(eCommon.countDownTimeout);
			eCommon.unblockUI();
			_.right();
			_.focus();
			break;
		case eCommon.KEY_CH_UP:
			clearInterval(eCommon.countDownInterval);
			clearTimeout(eCommon.countDownTimeout);
			eCommon.unblockUI();
			_.right();
			_.focus();
			break;
		case eCommon.KEY_LEFT:
			clearInterval(eCommon.countDownInterval);
			clearTimeout(eCommon.countDownTimeout);
			eCommon.unblockUI();
			_.left();
			_.focus();
			break;
		case eCommon.KEY_CH_DOWN:
			clearInterval(eCommon.countDownInterval);
			clearTimeout(eCommon.countDownTimeout);
			eCommon.unblockUI();
			_.left();
			_.focus();
			break;
		case eCommon.KEY_EXIT:
			clearInterval(eCommon.countDownInterval);
			clearTimeout(eCommon.countDownTimeout);
			location.reload();
			break;
		case eCommon.KEY_RETURN:
			clearInterval(eCommon.countDownInterval);
			clearTimeout(eCommon.countDownTimeout);
			eCommon.unblockUI();
			eCommon.HISTORY.back();
			break;
	}
}

eMusicSoJoPlayer.remoteKeyPress = function(number){
	$(eMusicSoJoPlayer.cNumTV).show('slide', {direction: 'right'}, 200);
	if(number.length > 3){
		$(eMusicSoJoPlayer.cNumTV).find('span').text('');
		$(eMusicSoJoPlayer.cNumTV).hide('drop', {direction: 'right'}, 200);
		return;
	}
	$(eMusicSoJoPlayer.cNumTV).find('span').text(number);
	var index = Number(number);
	
	if(index <= eMusicSoJoPlayer.data.length && index > 0){
		$(eMusicSoJoPlayer.cNumTV).find('img').attr('src', API.getAPI().LOCATION_IMAGE.concat(eMusicSoJoPlayer.data[index-1].image));
	} else {
		$(eMusicSoJoPlayer.cNumTV).find('img').attr('src', 'ELCommon/view/images/ic_nosignal.gif');
	}
	if (!eMusicSoJoPlayer.isKeyPress) {
		eMusicSoJoPlayer.isKeyPress = true;
		eMusicSoJoPlayer.timeValue = setTimeout(function() {
			var num = $(eMusicSoJoPlayer.cNumTV).find('span').text();
			var index = Number(num);
			if(index <= 0 || index > eMusicSoJoPlayer.data.length){
				eMusicSoJoPlayer.isKeyPress = false;
				$(eMusicSoJoPlayer.cNumTV).find('span').text('');
				$(eMusicSoJoPlayer.cNumTV).hide('drop', {direction: 'right'}, "slow");
				return;
			}
			eMusicSoJoPlayer.indexChannel = index;
			eCommon.HISTORY.current().hide();
			if(eIntroPlayer.IS_PLAYING || eVideoSS.IS_PLAYING){
				eCommon.HISTORY.current().back();
				eCommon.HISTORY.pop();
			}
			// set screen to detect screen current
			eMusicSoJoPlayer.play(eMusicSoJoPlayer.data[index-1].url);
			$(eMusicSoJoPlayer.cNumTV).find('span').text('');
			$(eMusicSoJoPlayer.cNumTV).hide('drop', {direction: 'right'}, "slow");
			eMusicSoJoPlayer.isKeyPress = false;
			eMusicSoJoPlayer.focus();
			
			// update layout channel TV
			eTV.hide();
			eTV.updateLayout();
			
		}, eMusicSoJoPlayer.deplay);
	}
}
eMusicSoJoPlayer.keyDownNumber = function() {
	event.preventDefault();
	//clearTimeout(eMusicSoJoPlayer.timeValue);
	var keyCode = event.keyCode;
	if(eCommon.IS_KEY_PRESS){
		return true;
	}
	eWelcome.playSound(eCommon.select);
	var number = $(eMusicSoJoPlayer.cNumTV).find('span').text();
	switch (keyCode) {
		case eCommon.KEY_HOME:
			location.reload();
			break;
		case eCommon.KEY_0:
			number = number + '0';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_1:
			number = number + '1';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_2:
			number = number + '2';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_3:
			number = number + '3';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_4:
			number = number + '4';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_5:
			number = number + '5';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_6:
			number = number + '6';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_7:
			number = number + '7';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_8:
			number = number + '8';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_9:
			number = number + '9';
			eMusicSoJoPlayer.remoteKeyPress(number);
			break;
	}
}
eMusicSoJoPlayer.getAllChannel = function() {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_22,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			var length = data.length;
			_.totalChannel = length;
			_.indexChannel = 1;
			_.data = [];
			
			for(var i = 0; i < length; i++){
				var obj = {};
				obj.id = data[i].id;
				obj.name = data[i].channelname;
				obj.image = data[i].urlpic;
				obj.url = data[i].urlplay;
				obj.isPlay = false;
				//obj.index = (i + 1);
				obj.index = data[i].channelnumber;
				_.data.push(obj);
			}
		},
		error : function(error) {
		}
	});
}
eMusicSoJoPlayer.showError = function(code, message) {
	var option = {
		code : '<h5 class="text-danger">Error code [' + code + ']</h5>',
		error : '<h5 class="text-danger">' + message + '</h5>',
		title : 'ERROR'
	};
	$(eModal.elementError).find('a').attr('onKeyDown', 'eMusicSoJoPlayer.errorModal()');
	eModal.showError(option);
}

eMusicSoJoPlayer.errorModal = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_RETURN:
			eWelcome.playSound(eCommon.back);
			eCommon.HISTORY.back();
			break;
	}
}
