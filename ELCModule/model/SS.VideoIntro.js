eVideoIntro = {
	id: null,
	name: 'VideoIntro',
	key: 'VIDEOINTRO',
	element : '#scenes-player',
	slidebar: null,
	duration: 0,
	state: 0,
	STOPPED : 0,
	PLAYING : 1,
	PAUSED : 2,
	FORWARD : 3,
	REWIND : 4,
	IS_PLAYING: false,
	data: [],
	index: 0
}

eVideoIntro.play = function() {
	var _ = this;
	if(_.data.length == 0){
		return;
	}
	var url = _.data[_.index];
	eCommon.logs(JSON.stringify({
		message: "playing video welcome",
		url: 'playing ' + url,
		index: _.index
	}));
	_.index+=1;
	ePlayer.play(url, _.hanlerEvent);
	_.IS_PLAYING = true;
	eCommon.IS_KEY_PRESS = true;
	setTimeout(function(){
		_.focus();
	}, 500);
}

eVideoIntro.hanlerEvent = function(event, data1, data2) {
	switch (event) {
		case 14: // OnCurrentPlayBackTime, param = playback time in ms
			var currentTime = data1 / 1000;
			break;
		case 1: // OnConnectionFailed
			eVideoIntro.error("Connection source failed");
			break;
		case 2: // OnAuthenticationFailed
			eVideoIntro.error("Authentication failed");
			break;
		case 3: // OnStreamNotFound
			eVideoIntro.error("Stream not found");
			break;
		case 4: // OnNetworkDisconnected
			eVideoIntro.error("Network disconnected");
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
			eVideoIntro.error(error);
			break;

		case 8: // OnRenderingComplete
			//eVideoIntro.end();
			eVideoIntro.stop();
			eVideoIntro.next();
			break;
		case 9: // OnStreamInfoReady
			ePlayer.setDisplayArea();
			break;
		case 11: // OnBufferingStart
			break;
		case 12: // OnBufferingComplete
			eCommon.unblockUI();
			eCommon.hideBackground();
			break;
		case 13: // OnBufferingProgress, param = progress in %
			break;
	}
}
eVideoIntro.next = function(){
	var _ = this;
	if(_.index < _.data.length){
		_.play();
	} else {
		_.index = 0;
		_.play();
	}
}
eVideoIntro.pause = function(){
	ePlayer.pause();
	this.state = this.PAUSED;
}
eVideoIntro.resume = function(){
	ePlayer.resume();
	this.state = this.PLAYING;
}
eVideoIntro.stop = function(){
	ePlayer.stop();
	this.state = this.STOPPED;
}
eVideoIntro.error = function(msg) {
	eCommon.errorVideo(msg);
	this.focus();
	eCommon.logs(JSON.stringify({
		message: msg,
		type: "Video Intro"
	}));
}
eVideoIntro.backward = function() {
	ePlayer.jumpBackward(30);
},
eVideoIntro.forward = function() {
	ePlayer.jumpForward(30);
},
eVideoIntro.show = function() {
}
eVideoIntro.hide = function() {
}

eVideoIntro.timeUpdate = function(time) {
	var _ = this;
	var value = time * 100 / _.duration;
	_.slidebar.setStartTime(eCommon.secondToTime(time));
	_.slidebar.getProgressbar().slider('setValue', value);
}

eVideoIntro.focus = function() {
	$(eCommon.ELEMENT_GLOBAL).attr('onkeydown', 'eVideoIntro.keyDown(this, event)');
	$(eCommon.ELEMENT_GLOBAL).focus();
}
eVideoIntro.formater = function(value){
	var time = value * this.duration / 100;
	return eCommon.secondToTime(time);
}
eVideoIntro.end = function(){
	eVideoIntro.play(this.URL);
}
eVideoIntro.back = function() {
	var _ = this;
	_.IS_PLAYING = false;
	try {
		_.stop();
		_.hide();
		eCommon.IS_KEY_PRESS = false;
		eWelcome.show();
		eWelcome.focus();
		//eCommon.showBackground();
//		eCommon.showHeader();
		//eCommon.showFooter();
		eCommon.unblockUI();
	} catch(error){
		eCommon.showBackground();
		eCommon.unblockUI();
	}
	
}
eVideoIntro.keyDown = function(inSender, inEvent) {
	var _ = this;
	inEvent.preventDefault();
	inEvent.stopImmediatePropagation();
	var keyCode = inEvent.keyCode;
	switch (keyCode) {
	case eCommon.KEY_PLAY:
		if(_.state == _.PAUSED){
			_.resume();
		}
		break;
	case eCommon.KEY_PAUSE:
		_.pause();
		break;
	case eCommon.KEY_STOP:
		_.stop();
		break;
	case eCommon.KEY_RW:
		_.backward();
		break;
	case eCommon.KEY_FF:
		_.forward();
		break;
	case eCommon.KEY_0:
	case eCommon.KEY_1:
	case eCommon.KEY_2:
	case eCommon.KEY_3:
	case eCommon.KEY_4:
	case eCommon.KEY_5:
	case eCommon.KEY_6:
	case eCommon.KEY_7:
	case eCommon.KEY_8:
	case eCommon.KEY_9:
	case eCommon.KEY_ENTER:
		_.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}