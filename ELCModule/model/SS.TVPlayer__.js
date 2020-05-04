eTVPlayer = {
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
	timeout: null
};


eTVPlayer.play = function(url){
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
	eTVPlayer.checkText();
//	_.showText(10, "Flamingo thông báo");
}
eTVPlayer.AVPlayer = function(url){
	var _=this;
	try{
		  _.url = url;
		  eCommon.blockUI();
		  if(eCommon.IS_PLAYING){
			  _.stop();
		  }
		  if(this.avPlayer != null){
			  _.playAV();
		  } else {
			  webapis.avplay.getAVPlay(eTVPlayer.successCB, eTVPlayer.errorCB);
		  }
	  }catch(e){
		  eCommon.logs(JSON.stringify({
				error: e.name,
				fn: "eTVPlayer.AVPlayer"
			}));
	  } 
}
eTVPlayer.successCB = function(avplay) {
	eTVPlayer.avPlayer = avplay;
	var playCB = {
		oncurrentplaytime : function(time) {
		},
		onresolutionchanged : function(width, height) {
		},
		onstreamcompleted : function() {
			eTVPlayer.stop();
			eTVPlayer.AVPlayer(eTVPlayer.url);
		},
		onerror : function(e) {
			eCommon.logs(JSON.stringify({
				error: e.name,
				fn: "eTVPlayer.successCB"
			}));
			eTVPlayer.error(e.name);
		}
	};
	var bufferingCB = {
		onbufferingstart : function() {
		},
		onbufferingprogress : function(percent) {
			eCommon.logs(percent);
		},
		onbufferingcomplete : function() {
		}
	};
	eTVPlayer.avPlayer.init({
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
	eTVPlayer.playAV();
};

eTVPlayer.errorCB = function(e) {
	eCommon.logs(e.name);
	eTVPlayer.error(e.name);
};
eTVPlayer.playAV = function(){
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
		eTVPlayer.avPlayer.setDisplayRect(displayRect, function(){}, function(){});
		eTVPlayer.avPlayer.open(_.url);
		// hidden something on screen
		eCommon.hideHeader();
		eCommon.hideFooter();
		eCommon.hideBackground();
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
		eTVPlayer.avPlayer.play(function(){
			eCommon.logs('TV Play Success');	
			_.IS_PLAY_SUCCESS = true;
			eCommon.unblockUI();
			eCommon.IS_PLAYING = true;
		}, function(){
			eCommon.logs(JSON.stringify({
				message: "play error",
				fn: "eTVPlayer.avPlayer.play"
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
			fn: "eTVPlayer.playAV"
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
eTVPlayer.isPlaying = function(){
	if($(eTVPlayer.element).css('display') != 'none' ){
		return true;
	}
	return false;
}
eTVPlayer.handlerEvent = function(event, data1, data2) {
	switch (event) {
		case 14: // OnCurrentPlayBackTime, param = playback time in ms
			break;
		case 1: // OnConnectionFailed
			eTVPlayer.error("Connection source failed");
			break;
		case 2: // OnAuthenticationFailed
			eTVPlayer.error("Authentication failed");
			break;
		case 3: // OnStreamNotFound
			eTVPlayer.error("Stream not found");
			break;
		case 4: // OnNetworkDisconnected
			eTVPlayer.error("Network disconnected");
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
			eTVPlayer.error(error);
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
			eCommon.hideBackground();
			eCommon.hideFooter();
//			eTVPlayer.showText(10, "Flamingo thông báo");
			break;
		case 13: // OnBufferingProgress, param = progress in %
			break;
	}
}
eTVPlayer.stop = function(){
//	ePlayer.stop();
	if(this.avPlayer != null){
		this.avPlayer.stop();
		eCommon.IS_PLAYING = false;
	}
}
eTVPlayer.error = function(){
//	this.play('http://'.concat(location.host,'/ELCommon/video/nosign.mp4'));
	eCommon.errorVideo(arguments[0]);
	this.focus();
	this.stop();
	eCommon.logs("eTVPlayer.error: "+arguments[0]);
}

eTVPlayer.focus = function() {
	$(eCommon.ELEMENT_GLOBAL).attr('onkeydown', 'eTVPlayer.keyDown(this, event)');
	//$(eCommon.ELEMENT_GLOBAL).attr('onClick', 'eTVPlayer.keyDown(this, event)');
	$(eCommon.ELEMENT_GLOBAL).focus();
}

eTVPlayer.show = function() {
	$(this.element).show();
}

eTVPlayer.hide = function() {
	$(this.element).hide();
}
eTVPlayer.showText = function(time, text, font_size, font_color, background_color){
	eCommon.hideFooter();
	$('.text-inform-tv').html('<h4 style="font-size: '+font_size+'; color: '+font_color+';">'+text+'</h4>');
	$('.text-inform-tv').css({
		background: background_color
	});
	$('.text-inform-tv').show();
	clearTimeout(eTVPlayer.timeout);
	eTVPlayer.timeout = setTimeout(function(){$('.text-inform-tv').empty(); $('.text-inform-tv').hide()}, time);
}
eTVPlayer.checkText = function(){
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
				eTVPlayer.showText(eCommon.stringToTime(data.duration), data.text, data.font_size, data.font_color, data.background_color);
			}			
		},
		error: function(){
			//eTVPlayer.showText(10000, 'Thông báo');
		}
	});	
}
eTVPlayer.back = function() {
	var _ = this;
	_.hide();
	_.stop();
	_.avPlayer = null;
	eCommon.unblockUI();
	eCommon.showHeader();
	eCommon.showFooter();
	eCommon.showBackground();
}
eTVPlayer.left = function() {
	var _ = this;
	_.countError = 0;
	if (!eTVPlayer.isKeyPress) {
		eTVPlayer.isKeyPress = true;
		eTVPlayer.timeValue = setTimeout(function() {
			_.indexChannel -= 1;
			if (_.indexChannel > 0) {
				_.AVPlayer(_.data[_.indexChannel - 1].url);
			} else {
				_.indexChannel = _.data.length;
				_.AVPlayer(_.data[_.indexChannel - 1].url);
			}
			// show number channel on right
			eTVPlayer.showNumberChannel(_.indexChannel);
			eTV.updateLayout();
			eTVPlayer.isKeyPress = false;
		}, 1500)
	}
}

eTVPlayer.right = function() {
	var _ = this;
	_.countError = 0;
	if (!eTVPlayer.isKeyPress) {
		eTVPlayer.isKeyPress = true;
		eTVPlayer.timeValue = setTimeout(function() {
			_.indexChannel = _.indexChannel + 1;
			if (_.indexChannel <= _.data.length) {
				_.AVPlayer(_.data[_.indexChannel - 1].url);
			} else {
				_.indexChannel = 1;
				_.AVPlayer(_.data[_.indexChannel - 1].url);
			}
			// show number channel on right
			eTVPlayer.showNumberChannel(_.indexChannel);
			eTV.updateLayout();
			eTVPlayer.isKeyPress = false;
		}, 1500)
	}
	
}
eTVPlayer.showNumberChannel = function(indexChannel){
	$(eTVPlayer.cNumTV).find('span').text(indexChannel);
	if(indexChannel <= eTVPlayer.data.length && indexChannel > 0){
		$(eTVPlayer.cNumTV).find('img').attr('src', API.getAPI().LOCATION_IMAGE.concat(eTVPlayer.data[indexChannel-1].image));
	} else {
		$(eTVPlayer.cNumTV).find('img').attr('src', 'ELCommon/view/images/ic_nosignal.gif');
	}
	$(eTVPlayer.cNumTV).show('slide', {direction: 'right'}, 200);
	setTimeout(function(){
		$(eTVPlayer.cNumTV).find('span').text('');
		$(eTVPlayer.cNumTV).hide('drop', {direction: 'right'}, "slow");
	},2000);
}
eTVPlayer.autoHide = function(){
	eTV.autoHide();
}
eTVPlayer.keyDown = function($this, event) {
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
eTVPlayer.remoteKeyPress = function(number){
	$(eTVPlayer.cNumTV).show('slide', {direction: 'right'}, 200);
	if(number.length > 3){
		$(eTVPlayer.cNumTV).find('span').text('');
		$(eTVPlayer.cNumTV).hide('drop', {direction: 'right'}, 200);
		return;
	}
	$(eTVPlayer.cNumTV).find('span').text(number);
	var index = Number(number);
	
	if(index <= eTVPlayer.data.length && index > 0){
		$(eTVPlayer.cNumTV).find('img').attr('src', API.getAPI().LOCATION_IMAGE.concat(eTVPlayer.data[index-1].image));
	} else {
		$(eTVPlayer.cNumTV).find('img').attr('src', 'ELCommon/view/images/ic_nosignal.gif');
	}
	if (!eTVPlayer.isKeyPress) {
		eTVPlayer.isKeyPress = true;
		eTVPlayer.timeValue = setTimeout(function() {
			var num = $(eTVPlayer.cNumTV).find('span').text();
			var index = Number(num);
			if(index <= 0 || index > eTVPlayer.data.length){
				eTVPlayer.isKeyPress = false;
				$(eTVPlayer.cNumTV).find('span').text('');
				$(eTVPlayer.cNumTV).hide('drop', {direction: 'right'}, "slow");
				return;
			}
			eTVPlayer.indexChannel = index;
			eCommon.HISTORY.current().hide();
			if(eIntroPlayer.IS_PLAYING || eVideoSS.IS_PLAYING){
				eCommon.HISTORY.current().back();
				eCommon.HISTORY.pop();
			}
			// set screen to detect screen current
			eTVPlayer.play(eTVPlayer.data[index-1].url);
			$(eTVPlayer.cNumTV).find('span').text('');
			$(eTVPlayer.cNumTV).hide('drop', {direction: 'right'}, "slow");
			eTVPlayer.isKeyPress = false;
			eTVPlayer.focus();
			
			// update layout channel TV
			eTV.hide();
			eTV.updateLayout();
			
		}, eTVPlayer.deplay);
	}
}
eTVPlayer.keyDownNumber = function() {
	event.preventDefault();
	//clearTimeout(eTVPlayer.timeValue);
	var keyCode = event.keyCode;
	if(eCommon.IS_KEY_PRESS){
		return true;
	}
	eWelcome.playSound(eCommon.select);
	var number = $(eTVPlayer.cNumTV).find('span').text();
	switch (keyCode) {
		case eCommon.KEY_HOME:
			location.reload();
			break;
		case eCommon.KEY_0:
			number = number + '0';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_1:
			number = number + '1';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_2:
			number = number + '2';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_3:
			number = number + '3';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_4:
			number = number + '4';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_5:
			number = number + '5';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_6:
			number = number + '6';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_7:
			number = number + '7';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_8:
			number = number + '8';
			eTVPlayer.remoteKeyPress(number);
			break;
		case eCommon.KEY_9:
			number = number + '9';
			eTVPlayer.remoteKeyPress(number);
			break;
	}
}
eTVPlayer.getAllChannel = function() {
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
				obj.index = (i + 1);
				_.data.push(obj);
			}
		},
		error : function(error) {
		}
	});
}
eTVPlayer.showError = function(code, message) {
	var option = {
		code : '<h5 class="text-danger">Error code [' + code + ']</h5>',
		error : '<h5 class="text-danger">' + message + '</h5>',
		title : 'ERROR'
	};
	$(eModal.elementError).find('a').attr('onKeyDown', 'eTVPlayer.errorModal()');
	eModal.showError(option);
}

eTVPlayer.errorModal = function() {
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
