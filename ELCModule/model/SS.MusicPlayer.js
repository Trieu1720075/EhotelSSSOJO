eMusicPlayer = {
	player: null,
	containerAudio: '#container-audio',
	url: '',
	audio: '#audio-player'
}
eMusicPlayer.play = function(url){
	var _ = this;
	_.url = url;
	if (_.player != null) {
		_.player.setSrc(_.url);
		// call the play method
		_.player.play();
		return;
	}
	$(_.containerAudio).html('<audio style="width:100%" id="audio-player" src="#" type="audio/mp3" controls> </audio>');
	$(_.audio).mediaelementplayer({
		alwaysShowControls : true,
		// turns keyboard support on and off for this instance
		enableKeyboard : true,
		// when this player starts, it will pause other players
		pauseOtherPlayers : true,
		features : [ 'playpause', 'progress', 'current', 'duration', 'tracks' ],
		// width of audio player
		audioWidth : '100%',
		// height of audio player
		audioHeight : 30,
		// initial volume when the player starts
		startVolume : 0.8,
		// method that fires when the Flash or Silverlight object is
		// ready
		success : function(mediaElement, domObject) {
			_.player = mediaElement;
			// add event listener
			_.player.addEventListener('ended', function(e) {
				_.play(); // loop music
			}, false);
			_.player.setSrc(_.url);
			// call the play method
			_.player.play();
		},
		// fires when a problem is detected
		error : function(e) {
			eCommon.logs('Play audio error ' + e);
			return;
		}
	});
}
eMusicPlayer.pause = function(){
	if(this.player!= null){
		this.player.pause();
	}
}
eMusicPlayer.stop = function(){
	this.pause();
}