eTVPlayer = {
	element: '#scenes-tv',
	cNumTV : '.number-tv',
	isKeyPress: false,
	data: [],
	indexChannel: 1,
	avPlayer: null,
	url: '',
	deplay: 2000,
};


eTVPlayer.play = function(url){
	var _ = this;
	eCommon.HISTORY.push(this);	
//	url = 'udp://239.25.0.1:9001|COMPONENT=MPTS';
//	url = url + '|COMPONENT=MPTS';
//	ePlayer.play(url, _.handlerEvent);
	_.avPlayer(url);
	_.show();
	_.focus();
	eTVPlayer.showText(10, "text show");
}
eTVPlayer.avPlayer = function(url){
	try{
		  this.url = url;
		  webapis.avplay.getAVPlay(eTVPlayer.successCB, eTVPlayer.errorCB);
	  }catch(e){
		  eCommon.logs(e.name);
	  } 
}
eTVPlayer.successCB = function(avplay) {
	var playCB = {
		oncurrentplaytime : function(time) {
		},
		onresolutionchanged : function(width, height) {
		},
		onstreamcompleted : function() {

		},
		onerror : function(e) {
			eCommon.logs(e.name);
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
	eTVPlayer.avPlayer = avplay;
	$('#player_container').show();
	eTVPlayer.avPlayer.init({
		containerID : 'player_container',
		zIndex: -1,
		bufferingCallback : bufferingCB, 
		playCallback : playCB,
		displayRect: {
		  top: 0,
		  left: 0,
		  width: 1280,//window.screen.width,
		  height: 720 //window.screen.height
		},
		autoRatio: false, 
	});
	try{
		eCommon.hideBackground();
		eCommon.hideHeader();
		eCommon.hideFooter();
		var displayRect =  {
		  top: 0,
		  left: 0,
		  width: 1280,//window.screen.width,
		  height: 720 //window.screen.height
		};
		eTVPlayer.avPlayer.setDisplayRect(displayRect, function(){}, function(){});
		eTVPlayer.avPlayer.open( eTVPlayer.url ); 
		eTVPlayer.avPlayer.play(function(){
			eCommon.logs('Play Success');
			
		}, function(){eCommon.logs('Error')});
	}catch(e){
		eCommon.logs(e.name);
	}
};

eTVPlayer.errorCB = function(e) {
	eCommon.logs(e.name);
};



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
			eTVPlayer.showText(10, "Text show on TV");
			break;
		case 13: // OnBufferingProgress, param = progress in %
			break;
	}
}
eTVPlayer.stop = function(){
	ePlayer.stop();
}
eTVPlayer.error = function(){
//	this.play('http://'.concat(location.host,'/ELCommon/video/nosign.mp4'));
	eCommon.errorVideo(arguments[0]);
	this.focus();
}

eTVPlayer.focus = function() {
	$(eCommon.ELEMENT_GLOBAL).attr('onkeydown', 'eTVPlayer.keyDown(this, event)');
	$(eCommon.ELEMENT_GLOBAL).focus();
}

eTVPlayer.show = function() {
	$(this.element).show();
}
eTVPlayer.hide = function() {
	$(this.element).hide();
}
eTVPlayer.showText = function(time,text){
	$('.text-inform-tv').html('<h4>'+text+'</h4>');
}
eTVPlayer.back = function() {
	var _ = this;
	_.hide();
	_.stop();
	eCommon.unblockUI();
	eCommon.showHeader();
	eCommon.showFooter();
	eCommon.showBackground();
}
eTVPlayer.left = function() {
	var _ = this;
	_.indexChannel -= 1;
	if (_.indexChannel > 0) {
		_.play(_.data[_.indexChannel - 1].url);
	} else {
		_.indexChannel = _.data.length;
		_.play(_.data[_.indexChannel - 1].url);
	}
	eTV.updateLayout();
}

eTVPlayer.right = function() {
	var _ = this;
	_.indexChannel+=1;
	if (_.indexChannel <= _.data.length) {
		_.play(_.data[_.indexChannel - 1].url);
	} else {
		_.indexChannel = 1;
		_.play(_.data[_.indexChannel - 1].url);
	}
	eTV.updateLayout();
}
eTVPlayer.keyDown = function($this, event) {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eTV.autoHide();
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
	if(number.length > 2){
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
				$(eTVPlayer.cNumTV).find('span').text('');
				eTVPlayer.isKeyPress = false;
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
	eWelcome.playSound(eCommon.select);
	var number = $(eTVPlayer.cNumTV).find('span').text();
	switch (keyCode) {
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
		url : API.getAPI().CMD_22 + '162',
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