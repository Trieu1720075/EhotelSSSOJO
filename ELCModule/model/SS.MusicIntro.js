eMusicIntro = {
	player: null,
	containerAudio: '#container-audio',
	audio: '#audio-player-welcome',
	data: [],
	index: 0
}
eMusicIntro.play = function(){
	var _ = this;
	if(_.data.length == 0){
		return;
	}
	var url = _.data[_.index];
	eAudio.play(url, _.hanlerEvent);
}
eMusicIntro.hanlerEvent = function(event, data1, data2) {
	switch (event) {
		case 14: // OnCurrentPlayBackTime, param = playback time in ms
			var currentTime = data1 / 1000;
			break;
		case 1: // OnConnectionFailed
			eMusicIntro.error("Connection source failed");
			break;
		case 2: // OnAuthenticationFailed
			eMusicIntro.error("Authentication failed");
			break;
		case 3: // OnStreamNotFound
			eMusicIntro.error("Stream not found");
			break;
		case 4: // OnNetworkDisconnected
			eMusicIntro.error("Network disconnected");
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
			eMusicIntro.error(error);
			break;

		case 8: // OnRenderingComplete
			eMusicIntro.stop();
			eMusicIntro.next();
			break;
		case 9: // OnStreamInfoReady
//			ePlayer.setDisplayArea();
			break;
		case 11: // OnBufferingStart
			break;
		case 12: // OnBufferingComplete
//			eCommon.unblockUI();
//			eCommon.hideBackground();
			break;
		case 13: // OnBufferingProgress, param = progress in %
			break;
	}
}
eMusicIntro.next = function(){
	var _ = this;
	if(_.index < _.data.length){
		_.play();
		_.index+=1;
	} else {
		_.index = 0;
		_.play();
	}
}
eMusicIntro.error = function(msg) {
	eCommon.errorVideo(msg);
	this.focus();
	eCommon.logs(JSON.stringify({
		message: msg,
		type: "Music Intro"
	}));
}
eMusicIntro.pause = function(){
	eAudio.pause();
}
eMusicIntro.stop = function(){
	eAudio.stop();
}
eMusicIntro.jumpForward = function(time){
	eAudio.jumpForward(time);
}
eMusicIntro.jumpBackward = function(time){
	eAudio.jumpBackward(time);
}
/**
 * When play this player, lost focus on SOURCE AppTV Hospitality Browser
 */
//eMusicIntro.play = function(){
//	var _ = this;
//	if(_.data.length == 0){
//		return;
//	}
//	var url = _.data[_.index];
//	if (_.player != null) {
//		_.player.setSrc(url);
//		// call the play method
//		_.player.play();
//		return;
//	}
//	$(_.containerAudio).html('<audio style="width:100%" id="audio-player-welcome" src="#" type="audio/mp3" controls> </audio>');
//	$(_.audio).mediaelementplayer({
//		alwaysShowControls : true,
//		// turns keyboard support on and off for this instance
//		enableKeyboard : true,
//		// when this player starts, it will pause other players
//		pauseOtherPlayers : false,
//		features : [ 'playpause', 'progress', 'current', 'duration', 'tracks' ],
//		// width of audio player
//		audioWidth : '100%',
//		// height of audio player
//		audioHeight : 30,
//		// initial volume when the player starts
//		startVolume : 0.5,
//		// method that fires when the Flash or Silverlight object is
//		// ready
//		success : function(mediaElement, domObject) {
//			_.player = mediaElement;
//			// add event listener
//			_.player.addEventListener('ended', function(e) {
//				_.next(); // loop music
//			}, false);
//			_.player.setSrc(url);
//			// call the play method
//			_.player.play();
//		},
//		// fires when a problem is detected
//		error : function(e) {
//			eCommon.logs('Play audio error ' + e);
//			return;
//		}
//	});
//}
