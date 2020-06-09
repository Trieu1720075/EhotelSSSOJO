eVideoSS = {
	id: null,
	name: 'PLAYER',
	key: 'PLAYER',
	element: '#scenes-player',
	slidebar: null,
	duration: 0,
	currentTime: 0,
	state: 0,
	STOPPED: 0,
	PLAYING: 1,
	PAUSED: 2,
	FORWARD: 3,
	REWIND: 4,
	options: null,
	IS_PLAYING: false,
}

eVideoSS.play = function (options) {
	var _ = this;
	if (typeof (options) !== 'object') {
		throw ("--> Error: param isn't object");
	}
	//eCommon.HISTORY.push(this);	
	_.options = options;
	ePlayer.play(_.options.url, _.hanlerEvent);
	_.IS_PLAYING = true;
	var obj = { context: this, element: '.control-subtitle', container: '#subtitle', items: [] };
	eSubtitle.init(obj);
	// test
	//_.showControl();
}

eVideoSS.showControl = function () {
	var _ = this;
	if (_.slidebar === null) {
		_.slidebar = $(_.element).slideBar({
			name: _.options.name,
			classes: 'eVideoSS',
			formater: eVideoSS.formater,
			type: 1 // type for video
		});
		_.slidebar.init();
		_.slidebar.getProgressbar().on('slideStart', function (ev) {
			console.log(ev);
		});
		_.slidebar.getProgressbar().on('slideStop', function (ev) {
			var time = ev.value * _.duration / 100;
			if (time > _.currentTime) {
				ePlayer.jumpForward(time);
			} else {
				ePlayer.jumpBackward(time);
			}
			_.slidebar.autoShowControls();
			eCommon.logs(JSON.stringify({
				message: "mouse click progressbar",
				time: time + " seconds",
				current_time: _.currentTime
			}));
		});
		_.state = _.PLAYING;
		_.slidebar.iconPlay();
		_.show();
		_.slidebar.autoShowControls();
	}
}
eVideoSS.hanlerEvent = function (event, data1, data2) {
	switch (event) {
		case 14: // OnCurrentPlayBackTime, param = playback time in ms
			var currentTime = data1 / 1000;
			eVideoSS.timeUpdate(currentTime);
			break;
		case 1: // OnConnectionFailed
			eVideoSS.error("Connection source failed");
			break;
		case 2: // OnAuthenticationFailed
			eVideoSS.error("Authentication failed");
			break;
		case 3: // OnStreamNotFound
			eVideoSS.error("Stream not found");
			break;
		case 4: // OnNetworkDisconnected
			eVideoSS.error("Network disconnected");
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
			eVideoSS.error(error);
			break;

		case 8: // OnRenderingComplete
			eVideoSS.end();
			break;
		case 9: // OnStreamInfoReady
			eVideoSS.duration = ePlayer.getDuration();
			ePlayer.setDisplayArea();
			break;
		case 11: // OnBufferingStart
			break;
		case 12: // OnBufferingComplete
			eCommon.unblockUI();
			eCommon.hideBackground();
			eVideoSS.showControl();
			eVideoSS.slidebar.setEndTime(eCommon.secondToTime(eVideoSS.duration));
			break;
		case 13: // OnBufferingProgress, param = progress in %
			break;
	}
}
eVideoSS.pause = function () {
	ePlayer.pause();
	this.state = this.PAUSED;
	this.slidebar.iconPause();
}
eVideoSS.resume = function () {
	ePlayer.resume();
	this.state = this.PLAYING;
	this.slidebar.iconResume();
}
eVideoSS.stop = function () {
	ePlayer.stop();
	this.state = this.STOPPED;
	this.slidebar.iconStop();
	this.slidebar.setStartTime("00:00");
	this.slidebar = null;
}
eVideoSS.error = function (msg) {
	eCommon.errorVideo(msg);
	this.focus();
}
eVideoSS.backward = function () {
	ePlayer.jumpBackward(30);
},
	eVideoSS.forward = function () {
		ePlayer.jumpForward(30);
	},
	eVideoSS.show = function () {
		$(this.element).show();
	}
eVideoSS.hide = function () {
	$(this.element).hide();
}

eVideoSS.timeUpdate = function (time) {
	var _ = this;
	eSubtitle.addSubTitle(time);
	var value = time * 100 / _.duration;
	_.currentTime = time;
	_.slidebar.setStartTime(eCommon.secondToTime(time));
	//_.slidebar.setProgressbar(value);
	_.slidebar.getProgressbar().slider('setValue', value);
}

eVideoSS.focus = function () {
	$(eCommon.ELEMENT_GLOBAL).attr('onkeydown', 'eVideoSS.keyDown(this, event)');
	$(eCommon.ELEMENT_GLOBAL).focus();
}
eVideoSS.formater = function (value) {
	var time = value * this.duration / 100;
	return eCommon.secondToTime(time);
}
eVideoSS.end = function () {
	var _ = this;
	if (eCommon.mode == "SLEEP") {
		var g_playHotel = document.getElementById('pluginPower');
		g_playHotel.Open("HOTEL", "1.000", "HOTEL");
		g_playHotel.Execute("SetPowerOff");
	}
	else  eVideoSS.play(_.options);
}
eVideoSS.back = function () {
	var _ = this;
	_.IS_PLAYING = false;
	try {
		_.stop();
		_.hide();
		eCommon.showBackground();
		eCommon.showHeader();
		eCommon.unblockUI();
		eSubtitle.clear();
		eRelateVideo.back();
	} catch (error) {
		eCommon.showBackground();
		eCommon.showHeader();
		eCommon.unblockUI();
		eSubtitle.clear();
		eRelateVideo.back();
	}

}
eVideoSS.itemClick = function ($this, event) {
	//event.stopImmediatePropagation();
	var _ = this;
	_.slidebar.enter($this);
}
eVideoSS.slideKeyDown = function ($this, event) {
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
		case eCommon.KEY_PLAY:
			if (_.state == _.PAUSED) {
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
			eCommon.HISTORY.back();
			break;
	}
}
eVideoSS.keyDown = function (inSender, inEvent) {
	var _ = this;
	inEvent.preventDefault();
	var keyCode = inEvent.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
		case eCommon.KEY_UP:
			eWelcome.playSound(eCommon.up);
			_.slidebar.autoShowControls();
			break;
		case eCommon.KEY_DOWN:
			eWelcome.playSound(eCommon.down);
			_.slidebar.autoShowControls();
			break;
		case eCommon.KEY_PLAY:
			if (_.state == _.PAUSED) {
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