eIntroPlayer = {
	id: null,
	name: 'IntroducePlayer',
	key: 'INTROPLAYER',
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
	URL: ''
}

eIntroPlayer.play = function(url) {
	var _ = this;
	eCommon.HISTORY.push(this);	
	//url = "http://172.16.9.141:3119/api/content/GrandDemo.mp4";
	ePlayer.play(url, _.hanlerEvent);
	_.URL = url;
	_.IS_PLAYING = true;
}

eIntroPlayer.hanlerEvent = function(event, data1, data2) {
	switch (event) {
		case 14: // OnCurrentPlayBackTime, param = playback time in ms
			var currentTime = data1 / 1000;
			break;
		case 1: // OnConnectionFailed
			eIntroPlayer.error("Connection source failed");
			break;
		case 2: // OnAuthenticationFailed
			eIntroPlayer.error("Authentication failed");
			break;
		case 3: // OnStreamNotFound
			eIntroPlayer.error("Stream not found");
			break;
		case 4: // OnNetworkDisconnected
			eIntroPlayer.error("Network disconnected");
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
			eIntroPlayer.error(error);
			break;

		case 8: // OnRenderingComplete
			//eIntroPlayer.end();
			eIntroPlayer.stop();
			eIntroPlayer.play(eIntroPlayer.URL);
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
eIntroPlayer.pause = function(){
	ePlayer.pause();
	this.state = this.PAUSED;
}
eIntroPlayer.resume = function(){
	ePlayer.resume();
	this.state = this.PLAYING;
}
eIntroPlayer.stop = function(){
	ePlayer.stop();
	this.state = this.STOPPED;
}
eIntroPlayer.error = function(msg) {
	eCommon.errorVideo(msg);
	this.focus();
}
eIntroPlayer.backward = function() {
	ePlayer.jumpBackward(30);
},
eIntroPlayer.forward = function() {
	ePlayer.jumpForward(30);
},
eIntroPlayer.show = function() {
}
eIntroPlayer.hide = function() {
}

eIntroPlayer.timeUpdate = function(time) {
	var _ = this;
	var value = time * 100 / _.duration;
	_.slidebar.setStartTime(eCommon.secondToTime(time));
	_.slidebar.getProgressbar().slider('setValue', value);
}

eIntroPlayer.focus = function() {
	$(eCommon.ELEMENT_GLOBAL).attr('onkeydown', 'eIntroPlayer.keyDown(this, event)');
	$(eCommon.ELEMENT_GLOBAL).focus();
}
eIntroPlayer.formater = function(value){
	var time = value * this.duration / 100;
	return eCommon.secondToTime(time);
}
eIntroPlayer.end = function(){
	eCommon.HISTORY.back();
}
eIntroPlayer.back = function() {
	var _ = this;
	_.IS_PLAYING = false;
	try {
		_.stop();
		_.hide();
		eCommon.showBackground();
		eCommon.showHeader();
		eCommon.showFooter();
		eCommon.unblockUI();
	} catch(error){
		eCommon.showBackground();
		eCommon.unblockUI();
	}
	
}
eIntroPlayer.itemClick = function($this, event){
	event.stopImmediatePropagation();
	var _=this;
	_.slidebar.enter($this);
}
eIntroPlayer.slideKeyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	_.slidebar.autoShowControls();
	switch (keyCode) {
	case eCommon.KEY_LEFT:
		_.slidebar.left($this);
		break;
	case eCommon.KEY_RIGHT:
		_.slidebar.right($this);
		break;
	case eCommon.KEY_DOWN:
		_.slidebar.down($this);
		_.focus();
		break;
	case eCommon.KEY_UP:
		_.slidebar.up($this);
		break;
	case eCommon.KEY_ENTER:
		_.slidebar.enter($this);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	}
}
eIntroPlayer.keyDown = function(inSender, inEvent) {
	var _ = this;
	inEvent.preventDefault();
	var keyCode = inEvent.keyCode;
	switch (keyCode) {
	case eCommon.KEY_UP:
		break;
	case eCommon.KEY_DOWN:
		break;
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
	case eCommon.KEY_RETURN:
		eWelcome.playSound(eCommon.back);
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		eWelcome.playSound(eCommon.reload);
		location.reload();
		break;
	}
}