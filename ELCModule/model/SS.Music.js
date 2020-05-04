eMusic = {
	name : '',
	key: 'MUSIC',
	element : '#scenes-music',
	slideSubject : '#scenes-music-subject',
	containerAudio : '#container-audio',
	player : null,
	plugin : null,
	subjectId : null,
	slideCount : 0,
	slide : '#ehotel-item-music',
	slideMusic : '#slider-music',
	url : '',
	title : null,
	slideImage : [],
	data : [],
	subjectIndex : 1,
	slideIndex : 1,
	classes : 'eMusic',
	slidebar: null,
	state: 0,
	STOPPED : 0,
	PLAYING : 1,
	PAUSED : 2,
	FORWARD : 3,
	REWIND : 4,
	IS_PLAYING: false,
	currentTime: 0,
	duration: 0
};

eMusic.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.getSubject();
	//_.showSlide();
	// test
//	eMusic.showControl();
}

eMusic.showSlide = function() {
	var _ = this;
	if ($(_.slideMusic).find('li').length > 0) {
		return;
	}
	$.ajax({
		url : API.getAPI().CMD_1030,
		data : "",
		cache : false,
		type : 'GET',
		async : true,
		success : function(response) {
			var data = JSON.parse(response);
			var length = data.length;
			for(var i = 0; i < length; i++){
				var url = API.getAPI().LOCATION_IMAGE.concat(data[i].url);
				$(_.slideMusic).append('<li><img src="' + url + '"></li>');
			}
			$(_.slideMusic).responsiveSlides({ speed : 10000, timeout: 12000,page : false });
			
		},
		error : function(error) {
		}
	});
}
eMusic.play = function(url){
	var _=this;
	_.IS_PLAYING = true;
	eAudio.play(url, _.hanlerEvent);
}
eMusic.pause = function(){
	eAudio.pause();
	this.state = this.PAUSED;
	this.slidebar.iconPause();
}
eMusic.resume = function(){
	eAudio.resume();
	this.state = this.PLAYING;
	this.slidebar.iconResume();
}
eMusic.stop = function(){
	eAudio.stop();
	this.state = this.STOPPED;
	this.slidebar.iconStop();
	this.slidebar.setStartTime("00:00");
	this.slidebar = null;
}
eMusic.backward = function() {
	eAudio.jumpBackward(10);
},
eMusic.forward = function() {
	eAudio.jumpForward(10);
},
eMusic.showControl = function(){
	var _=this;
	if(_.slidebar === null){		
		//eCommon.logs('_.slidebar === null '+eMusic.title);
		$(_.containerAudio).css({width:$(_.slideMusic).width()});
		_.slidebar = $(_.containerAudio).slideBar({
			name: _.title,
			classes: 'eMusic',
			formater: eAudio.formater,
			type: 0 // type for audio
		});
		_.slidebar.init();
		_.slidebar.getProgressbar().on('slideStart', function(ev) {
			console.log(ev);
		});
		_.slidebar.getProgressbar().on('slideStop', function(ev) {
			var time = ev.value*_.duration/100;
			if(time > _.currentTime){
				eAudio.jumpForward(time);
			} else {
				eAudio.jumpBackward(time);
			}
			eCommon.logs(JSON.stringify({
				message:"mouse click progressbar",
				time: time + " seconds",
				current_time: _.currentTime
			}));
		});
		_.state = _.PLAYING;
		_.slidebar.iconPlay();
		_.show();
	} else {
		_.slidebar.setName(_.title);
	}
}
eMusic.formater = function(value){
	var time = value * this.duration / 100;
	return eCommon.secondToTime(time);
}
eMusic.show = function() {
//	$('.music-title').html(language.MUSIC_TITLE);
//	$('.bar-footer-music h4').eq(0).html(language.MUSIC_GUIDE_1);
//	$('.bar-footer-music h4').eq(1).html(language.MUSIC_GUIDE_2);
//	$('.bar-footer-content-music h4').eq(0).html(language.MUSIC_GUIDE_3);
//	$('.bar-footer-content-music h4').eq(1).html(language.MUSIC_GUIDE_4);
	eCommon.hideFooter();
	$(this.element).show();
	$(this.element).find('.list-music').show();
}

eMusic.hide = function() {
	eCommon.showFooter();
	$(this.element).find('.list-music').hide();
	$(this.element).hide();
	eAudio.stop();
}

eMusic.reInitMusic = function() {
	var _ = this;
	_.resetSubjectMusic();
	var items = _.data[_.subjectIndex - 1].items;
	var length = items.length;
	for (var i = 0; i < length; i++) {
		$(_.slide + ' ul').append(eLayout.itemMusic(items[i], _.classes));
	}
	$(_.slide).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
	_.initSlide(_.slide, 0, 0);
	var index = Number(_.data[_.subjectIndex - 1].musicIndex);
	_.title = _.data[_.subjectIndex - 1].items[index].title;
	_.url = _.data[_.subjectIndex - 1].items[index].url;
	for (var i = 0; i < index; i++) {
		$(_.slide).parent().find('.next').trigger('click');
		_.slideIndex++;
	}
	_.initPlayer();
}

eMusic.focus = function() {
	$(this.slide).find('li.active div.item-music').focus();
}

eMusic.getSubject = function() {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_11,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			var length = data.length;
			_.slideCount = data.length;
			_.subjectIndex = 1;
			_.slideObject = [];
			if (length === 0) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = 'eMusic.errorNoSubject()';
				obj.onclick = 'eMusic.errorNoSubjectClick()';
				eModal.showInfo(obj);
				return;
			}
			var li = '';
			for(var i = 0; i < length; i++){
				var obj = new Object();
				obj.id = data[i].id;
				obj.name = data[i].subjectname;
				obj.image = data[i].url_image;
				obj.icon = data[i].url_image;
				obj.url = API.getAPI().CMD_12 + obj.id;
				obj.index = (i + 1);
				obj.musicIndex = 0;
				obj.items = [];
				_.data.push(obj);
				li+= eLayout.subject(obj, _.classes);//eLayout.subjectSlide(obj, _.classes);
			}
			var margin = ($(window).width() - length*120)/3;
			if(margin > 0){
				$(_.slideSubject).css('margin-left', margin + 'px');
			}
			_.show();
			$(_.slideSubject).find('ul').html(li);
			_.initSlide(_.slideSubject, 1, 0);
			_.getMusic(_.data[_.subjectIndex - 1].url);
		},
		error : function(error) {
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = 'eMusic.errorNoSubject()';
			obj.onclick = 'eMusic.errorNoSubjectClick()';
			eModal.showInfo(obj);
		}
	});
}

eMusic.resetSubjectMusic = function() {
	var _ = this;
	_.slideIndex = 1;
	$(_.slide).slideLG(false);
	$(_.slide).find('ul').empty();
	$(_.slide).parent().find('div.hidden').trigger('remove');
}

eMusic.getMusic = function(url) {
	var _ = this;
	$.ajax({
		url : url,
		data : "",
		cache : false,
		type : 'GET',
		async : true,
		success : function(response) {
			var data = JSON.parse(response);
			var length = data.length;
			_.slideIndex = 1;
			// show error
			if (length === 0) {
				$(_.containerAudio).hide();
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = 'eMusic.errorNoContent()';
				obj.onclick = 'eMusic.errorNoContentClick()';
				eModal.showInfo(obj);
				return;
			}
			// reset
			if ($(_.slide).find('ul li').length > 0) {
				_.resetSubjectMusic();
			}
			for(var i = 0; i < length; i++){
				var object = new Object();
				object.title = data[i].title;
				object.url =  data[i].url;
				object.index = i + 1;
				if (i === 0) {
					_.url =  data[i].url;
					_.title =  data[i].title;
				}
				_.data[_.subjectIndex - 1].items.push(object);
				$(_.slide + ' ul').append(eLayout.itemMusic(object, _.classes));
			}
			
			$(_.slide).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			_.initSlide(_.slide, 0, 0);
			_.subjectFocus();
			$(_.slide).find('li.active div.item-music').addClass('playing');
			_.play(_.url);
		},
		error : function(error) {
			$(_.containerAudio).hide();
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
			obj.onkeydown = 'eMusic.errorNoContent()';
			obj.onclick = 'eMusic.errorNoContentClick()';
			eModal.showInfo(obj);
		}
	});
}
eMusic.hanlerEvent = function(event, data1, data2) {
	switch (event) {
		case 14: // OnCurrentPlayBackTime, param = playback time in ms
			var currentTime = data1 / 1000;
			eMusic.timeUpdate(currentTime);
			break;
		case 1: // OnConnectionFailed
			eMusic.error("Connection source failed");
			break;
		case 2: // OnAuthenticationFailed
			eMusic.error("Authentication failed");
			break;
		case 3: // OnStreamNotFound
			eMusic.error("Stream not found");
			break;
		case 4: // OnNetworkDisconnected
			eMusic.error("Network disconnected");
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
			eMusic.error(error);
			break;

		case 8: // OnRenderingComplete
			eMusic.next();
			break;
		case 9: // OnStreamInfoReady
			eMusic.duration = eAudio.getDuration();
			break;
		case 11: // OnBufferingStart
			break;
		case 12: // OnBufferingComplete
			eMusic.playing();
			eMusic.showControl();
			eMusic.slidebar.setEndTime(eCommon.secondToTime(eMusic.duration));
			break;
		case 13: // OnBufferingProgress, param = progress in %
			break;
	}
}
eMusic.timeUpdate = function(time) {
	var _ = this;
	var value = time * 100 / _.duration;
	_.currentTime = time;
	_.slidebar.setStartTime(eCommon.secondToTime(time));
	//_.slidebar.setProgressbar(value);
	_.slidebar.getProgressbar().slider('setValue', value);
}
eMusic.error = function(msg) {
	//eCommon.errorVideo(msg);
	var _ = this;
	_.slidebar.setStartTime(eCommon.secondToTime(0));
	_.slidebar.setEndTime(eCommon.secondToTime(0));
	//_.slidebar.setProgressbar(value);
	_.slidebar.getProgressbar().slider('setValue', 0);
	var title = $(_.slide + ' li.active div.item-music').attr('data-title');
	_.title = 'Can\'t play the "'+title+'"';
	_.slidebar.setName(eMusic.title);
	this.focus();
	eCommon.logs(JSON.stringify({
		message: msg,
		type: "Music Intro"
	}));
}
//eMusic.itemClick = function(object, event) {
//	var _ = this;
//	var index = $(object).attr("tabindex");
//	$('.mejs-controls').find('.mejs-button').removeClass('mejs-stop');
//	_.selectInex = Number(index);
//	_.selectItem();
//}
eMusic.initSlide = function(slideId, type, startAt) {
	var _ = this;
	var options = {
		horizontal : type,
		itemNav : 'centered',
		smart : 1,
		activateOn : 'click',
		mouseDragging : 1,
		touchDragging : 1,
		releaseSwing : 1,
		startAt : startAt,
		scrollBy : 1,
		speed : 0,
		elasticBounds : 1,
		easing : 'easeOutExpo',
		dragHandle : 1,
		dynamicHandle : 1,
		clickBar : 0,
		activateOn : 'click',
		// Buttons
		prev : $(slideId).parent().find('.prev'),
		next : $(slideId).parent().find('.next')
	};
	var slideLG = new SlideLG(slideId, options).init();
	eCommon.unblockUI();
}

eMusic.upFocus = function() {
	var _ = this;
	if (_.slideIndex > 1) {
		_.slideIndex--;
		$(_.slide).parent().find('.prev').trigger('click');
		_.focus();
	}
}

eMusic.downFocus = function() {
	var _ = this;
	var length = _.data[_.subjectIndex - 1].items.length;
	if (_.slideIndex < length) {
		_.slideIndex++;
		$(_.slide).parent().find('.next').trigger('click');
		_.focus();
	} else {
		_.subjectFocus();
	}
}

eMusic.leftFocus = function() {
	this.subjectFocus();
}

eMusic.rightFocus = function() {
	this.subjectFocus();
}

eMusic.unload = function() {
	var _ = this;
	_.data = [];
	_.subjectIndex = 1;
	_.slideIndex = 1;
	$(_.slide).slideLG(false);
	$(_.slide).parent().find('.hidden').remove();
	$(_.slide).find('ul').empty();
	$(_.slideSubject).slideLG(false);
	$(_.slideSubject).find('ul').empty();
}

eMusic.subjectFocus = function() {
	$(this.slideSubject).find('li.active div.thumbnail').focus();
}

eMusic.selectItem = function() {
	var _ = this;
	_.title = $(_.slide + ' li.active div.item-music').attr('data-title');
	//eCommon.logs(_.title);
	_.url = $(_.slide + ' li.active div.item-music').attr('data-url');
	_.data[_.subjectIndex - 1].musicIndex = _.slideIndex - 1;
	$(_.slide + ' li div.item-music').removeClass('playing');
	$(_.slide + ' li.active div.item-music').addClass('playing');
	_.play(_.url);
	_.focus();
}

eMusic.playing = function() {
	var _ = this;
	$('.text-images').addClass('hidden');
	$('.text-number').removeClass('hidden'); 
	$(_.slide).find('li div.playing .text-number').addClass('hidden'); 
	$(_.slide).find('li div.playing .text-images').removeClass('hidden');
	 
}

eMusic.playNext = function() {
	var _ = this;
	var index = Number($(_.slide).find('li div.playing').attr('tabindex'));
	$(_.slide).find('li div.item-music').removeClass('playing');
	$(_.slide).find('li div.item-music[tabindex="' + (index + 1) + '"]').addClass('playing');
	_.title = $(_.slide).find('li div.playing').attr('data-title');
	_.url = $(_.slide).find('li div.playing').attr('data-url');
	_.player.pause();
	_.player.setSrc(_.url);
	_.player.play();
	_.playing();
}
eMusic.next = function(){
	var _ = this;
	var index = Number($(_.slide).find('li div.playing').attr('tabindex'));
	if(index + 1 >= _.data[_.subjectIndex - 1].items.length){
		return;
	}
	// $(_.slide).find('li div.item-music').removeClass('playing');
	// $(_.slide).find('li div.item-music[tabindex="' + (index + 1) + '"]').addClass('playing');
	_.title = $(_.slide).find('li div.playing').attr('data-title');
	_.url = $(_.slide).find('li div.playing').attr('data-url');
	_.play(_.url);
}
eMusic.back = function() {
	var _ = this;
	_.hide();
	_.unload();
}

eMusic.subjectRightFocus = function() {
	var _ = this;
	$(_.slideSubject).slideLG('next');
	_.subjectIndex = Number($(this.slideSubject).find('li.active .thumbnail').attr('tabindex'));
	_.subjectFocus();
}

eMusic.subjectLeftFocus = function() {
	var _ = this;
	$(_.slideSubject).slideLG('prev');
	_.subjectIndex = Number($(this.slideSubject).find('li.active .thumbnail').attr('tabindex'));
	_.subjectFocus();
}

eMusic.subjectUpFocus = function() {
	var _ = this;
//	_.subjectIndex = Number($(this.slideSubject).find('li.active .thumbnail').attr('tabindex'));
	$(_.slideSubject).slideLG('slideTo', (_.subjectIndex-1), true);
	_.focus();
}

eMusic.subjectSelect = function() {
	var _ = this;
//	_.subjectIndex = Number($(this.slideSubject).find('li.active div.thumbnail').attr('tabindex'));
	$(_.containerAudio).show();
	if (_.data[_.subjectIndex - 1].items.length > 0) {
		_.reInitMusic();
	} else {
		var url = _.data[_.subjectIndex - 1].url;
		_.getMusic(url);
	}
	$(_.slideSubject).slideLG('activate', _.subjectIndex-1);
	_.subjectFocus();
}

eMusic.subjectClick = function($this, event) {
	event.stopImmediatePropagation();
	var _ = this;
	var index = Number($($this).attr("tabindex"));
	$($this).focus();
	_.subjectIndex = index;
	_.subjectSelect();
}

eMusic.itemClick = function(object, event) {
	event.stopImmediatePropagation(); // stopImmediatePropagation
	var _ = this;
	var index = $(object).attr("tabindex");
	if (_.slideIndex < index) {
		var length = index - _.slideIndex;
		for (var i = 0; i < length; i++) {
			_.downFocus();
		}
	} else {
		var length = _.slideIndex - index;
		for (var i = 0; i < length; i++) {
			_.upFocus();
		}
	}
	_.slideIndex = index;
	_.selectItem();
}

eMusic.errorNoSubjectClick = function() {
	var _ = this;
	eModal.hideInfo();
	eCommon.HISTORY.back();
}

eMusic.errorNoContentClick = function() {
	var _ = this;
	eModal.hideInfo();
	_.show();
	_.subjectFocus();
}

eMusic.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_DOWN:
		_.downFocus();
		break;
	case eCommon.KEY_UP:
		_.upFocus();
		break;
	case eCommon.KEY_LEFT:
		_.leftFocus();
		break;
	case eCommon.KEY_RIGHT:
		_.rightFocus();
		break;
	case eCommon.KEY_ENTER:
		_.selectItem();
		break;
	case eCommon.KEY_PLAY:
		if(_.state == _.PAUSED){
			eMusic.resume();
		}
		break;
		break;
	case eCommon.KEY_PAUSE:
		eMusic.pause();
		break;
	case eCommon.KEY_STOP:
		eMusic.stop();
		break;
	case eCommon.KEY_RW:
		eMusic.backward();
		break;
	case eCommon.KEY_FF:
		eMusic.forward(10);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}

eMusic.subjectKeyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	
	case eCommon.KEY_UP:
		_.subjectUpFocus();
		break;
	case eCommon.KEY_RIGHT:
		_.subjectRightFocus();
		break;
	case eCommon.KEY_LEFT:
		_.subjectLeftFocus();
		break;
	case eCommon.KEY_ENTER:
		_.subjectSelect();
		break;
	case eCommon.KEY_PLAY:
		if(_.state == _.PAUSED){
			eMusic.resume();
		}
		break;
	case eCommon.KEY_PAUSE:
		eMusic.pause();
		break;
	case eCommon.KEY_STOP:
		eMusic.stop();
		break;
	case eCommon.KEY_RW:
		eMusic.backward();
		break;
	case eCommon.KEY_FF:
		eMusic.forward(10);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}
eMusic.buttonClick = function($this, event){
	//event.stopImmediatePropagation();
	var _=this;
	_.slidebar.enter($this);
}
eMusic.slideKeyDown = function($this, event) {
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
		if(_.state == _.PAUSED){
			eAudio.resume();
		}
		break;
	case eCommon.KEY_PAUSE:
		eAudio.pause();
		break;
	case eCommon.KEY_STOP:
		eAudio.stop();
		break;
	case eCommon.KEY_RW:
		eAudio.jumpBackward();
		break;
	case eCommon.KEY_FF:
		eAudio.jumpForward();
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	}
}

eMusic.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_ENTER:
		eWelcome.playSound(eCommon.select);
		_.errorNoSubjectClick();
		break;
	case eCommon.KEY_EXIT:
		eWelcome.playSound(eCommon.reload);
		location.reload();
		break;
	}
}

eMusic.errorNoContent = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_ENTER:
		eWelcome.playSound(eCommon.select);
		_.errorNoContentClick();
		break;
	case eCommon.KEY_EXIT:
		eWelcome.playSound(eCommon.reload);
		location.reload();
		break;
	}
}