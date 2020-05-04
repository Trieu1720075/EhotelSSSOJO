eAudio = {
	timeInterval: 0,
	type: 0, // type = 0: Player TV, type = 1: Player VOD
	player: null,
	initWidth: 0,
	initHeight: 0,
	TOTAL_BUFFER_SIZE_IN_BYTES : 1024 * 1024,
	INITIAL_BUFFERPER_CENT : 40,
	PENDING_BUFFER_PERCENT : 35,
	
	/**
	 * init player
	 */
	init: function(){
		var _=this;
		_.initWidth = window.screen.width;
		_.initHeight = window.screen.height;
		_.player = document.getElementById("pluginObjectPlayer");
		_.player.Open('Player', '1.112', 'Player'); 
	},
	play: function(url, callbackEvent){
		var _=this;
		//url = "http://10.5.80.7/Video/1656.mp4";
		if(!eCommon.isTV()){
			console.log("Player only support Smart TV SamSung");
			return; 
		}
		if(eCommon.IS_PLAYING){
			_.stop();
		}
		if(_.player === null){
			_.init();
		}
		eCommon.IS_PLAYING = true;
		_.player.Execute("InitPlayer", url);
		_.player.OnEvent = callbackEvent;
		_.player.Execute("SetInitialBufferSize", 400*1024);
		_.player.Execute("SetInitialBuffer", _.TOTAL_BUFFER_SIZE_IN_BYTES
				* (_.INITIAL_BUFFERPER_CENT / 100));
		_.player.Execute("SetTotalBufferSize", _.TOTAL_BUFFER_SIZE_IN_BYTES);
		_.player.Execute("SetPendingBuffer", _.TOTAL_BUFFER_SIZE_IN_BYTES
				* (_.PENDING_BUFFER_PERCENT / 100));
		_.player.Execute("Play");
	},
	stop: function(){
		if(eCommon.isTV() && this.player != null){
			eCommon.IS_PLAYING = false;
			this.player.Execute("Stop");
		}
	},
	pause: function(){
		if(eCommon.isTV() && this.player != null){
			this.player.Execute("Pause");
		}
	},
	resume: function(){
		if(eCommon.isTV() && this.player != null){
			this.player.Execute("Resume");
		}
	},
	jumpForward : function(time) {
		if(eCommon.isTV() && this.player != null){
			this.player.Execute("JumpForward", time);
		}
	},
	jumpBackward : function(time) {
		if(eCommon.isTV() && this.player != null){
			this.player.Execute("JumpBackward", time);
		}
	},
	setDisplayArea: function(){
		if(eCommon.isTV() && this.player != null){
			this.player.Execute("SetDisplayArea", 0, 0, this.initWidth, this.initHeight);
		}
	},
	getDuration: function(){
		if(eCommon.isTV() && this.player != null){
			return this.player.Execute("GetDuration") / 1000;
		}
		return 0;
	}
}
