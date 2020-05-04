eIntroduce = {
	name : '',
	key: 'INTRODUCE',
	element:'#scenes-introduce',
	element_item:'#scenes-introduce-slide',
	classes : 'eIntroduce',
	scope : null
};

eIntroduce.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.getItem();
}
eIntroduce.getItem = function(){
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_24,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var json = JSON.parse(response);
			var length = json.length;
			if (length === 0) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = _.classes + '.errorNoContent()';
				eModal.showInfo(obj);
				return;
			}
			var data = [];
			for(var i = 0; i < length; i++){
				var obj = new Object();
				obj.id = json[i].id;
				obj.name = json[i].channelname;
				obj.image = json[i].urlpic;
				obj.url = json[i].urlplay;
				obj.index = (i + 1);
				data.push(obj);
			}
			_.show();
			var opt = {element: _.element_item, data: data, classes: _.classes};
			_.scope = new SlideMiddle(opt);
			_.scope.init();
			_.focus();
			eCommon.unblockUI();
		},
		error : function(error) {
			var obj = new Object();
			obj.type = 'error';
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
			obj.onkeydown = 'eModal.errorNoSubject()';
			obj.onclick = 'eModal.clickErrorNoSubject()';
			eModal.showInfo(obj);
		}
	});
}
eIntroduce.focus = function(){
	$(this.element).find('li.active div.thumbnail').focus();
}

eIntroduce.show = function(){
	$(this.element).show();
}
eIntroduce.hide = function(){
	$(this.element).hide();
}
eIntroduce.back = function(){
	this.hide();
	if(this.scope != null){
		this.scope.destroy();
	}
}
eIntroduce.hanlerEvent = function(event, data1, data2) {
	switch (event) {
		case 14: // OnCurrentPlayBackTime, param = playback time in ms
			var currentTime = data1 / 1000;
			break;
		case 1: // OnConnectionFailed
			eIntroduce.error("Connection source failed");
			break;
		case 2: // OnAuthenticationFailed
			eIntroduce.error("Authentication failed");
			break;
		case 3: // OnStreamNotFound
			eIntroduce.error("Stream not found");
			break;
		case 4: // OnNetworkDisconnected
			eIntroduce.error("Network disconnected");
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
			eIntroduce.error(error);
			break;

		case 8: // OnRenderingComplete Play end
			eCommon.showBackground();
			eCommon.showHeader();
			eCommon.showFooter();
			ePlayer.stop();
			eIntroduce.show();
			break;
		case 9: // OnStreamInfoReady
			eIntroduce.duration = ePlayer.getDuration();
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
eIntroduce.selectItem = function($this) {
	var _=this;
	var id = $($this).attr('data-id');
	var title = $($this).attr('data-title');
	var url = $($this).attr('data-url');
	this.hide();
	// play video
	eIntroPlayer.play(url);
}

eIntroduce.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_HOME:
		eWelcome.playSound(eCommon.back);
		break;
	case eCommon.KEY_LEFT:
		_.scope.left();
		_.focus();
		break;
	case eCommon.KEY_RIGHT:
		_.scope.right();
		_.focus();
		break;
	case eCommon.KEY_ENTER:
		eWelcome.playSound(eCommon.select);
		_.selectItem($this);
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
eIntroduce.error = function(msg) {
	eCommon.errorVideo(msg);
	this.focus();
}
eIntroduce.errorNoContent = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_RETURN:
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			eModal.hideInfo();
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
	}
}