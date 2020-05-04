eMusic = {
	name : '',
	key: 'MUSIC',
	element : '#scenes-music',
	slideSubject : '#scenes-music-subject',
	containerAudio : '#container-audio',
	player : null,
	eventInit : false,
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
	classes : 'eMusic'
};

eMusic.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.getSubject();
	_.showSlide();
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
				$(_.slideMusic).append('<li><img style="height:330px" src="' + url + '"></li>');
			}
			$(_.slideMusic).responsiveSlides({ speed : 10000, timeout: 12000,page : false });
			
		},
		error : function(error) {
		}
	});
}

eMusic.show = function() {
	$('.music-title').html(language.MUSIC_TITLE);
	$('.bar-footer-music h4').eq(0).html(language.MUSIC_GUIDE_1);
	$('.bar-footer-music h4').eq(1).html(language.MUSIC_GUIDE_2);
	$('.bar-footer-content-music h4').eq(0).html(language.MUSIC_GUIDE_3);
	$('.bar-footer-content-music h4').eq(1).html(language.MUSIC_GUIDE_4);
	eCommon.hideFooter();
	$(this.element).show();
	$(this.containerAudio).show();
//	$(eCommon.navbarName).text(this.name);
	$(this.element).find('.list-music').show();
//	$(this.element).append(eLayout.audioTag());
	if (this.player != null) {
		this.player.setSrc(this.url);
		this.player.play();
		this.playing();
	}
}

eMusic.hide = function() {
	eCommon.showFooter();
	$(this.element).find('.list-music').hide();
	$(this.element).hide();
//	$(this.containerAudio).empty();
	if (this.player != null) {
		this.player.pause();
	}
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
			$(_.containerAudio).html('<audio style="width:100%" id="audio-player" src="#" type="audio/mp3" controls> </audio>');
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
			_.initPlayer();
			_.subjectFocus();
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

eMusic.initPlayer = function() {
	var _ = this;
	if (_.player != null) {
		_.player.setSrc(_.url);
		// call the play method
		_.player.play();
		$(_.slide + ' li.active div.item-music').addClass('playing');
		_.playing();
		return;
	}
	$('#audio-player').mediaelementplayer({
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
				_.playNext();
			}, false);
			_.player.setSrc(_.url);
			// call the play method
			_.player.play();
			$(_.slide).find('li.active div.item-music').addClass('playing');
			_.playing();
		},
		// fires when a problem is detected
		error : function() {
			var option = {
				context : 'eMusic',
				code : '',
				message : '<h5 class="text-danger">' + Dialog.E_02 + '</h5>',
				title : Dialog.TITLE,
				type : 'E'
			};
			Dialog.show(option);
			return;
		}
	});
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
	_.player = null;
	
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
	_.url = $(_.slide + ' li.active div.item-music').attr('data-url');
	_.data[_.subjectIndex - 1].musicIndex = _.slideIndex - 1;
	$(_.slide + ' li div.item-music').removeClass('playing');
	$(_.slide + ' li.active div.item-music').addClass('playing');
	if (_.player != null) {
		_.player.pause();
		_.player.setSrc(_.url);
		_.player.play();
		_.playing();
	} else {
		_.initPlayer();
	}
	_.focus();
}

eMusic.playing = function() {
	var _ = this;
	$('.bar-title h4').html(_.title);
	$('.text-images').addClass('hidden');
	$('.text-number').removeClass('hidden'); 
	$(_.slide).find('li div.playing .text-number').addClass('hidden'); $(_.slide).find('li div.playing .text-images').removeClass('hidden');
	 
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

eMusic.itemClick = function(object) {
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
	$('.mejs-controls').find('.mejs-button').removeClass('mejs-stop');
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
	eCommon.logServer(keyCode);
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
		$('.mejs-controls').find('.mejs-button').removeClass('mejs-stop');
		_.selectItem();
		break;
	case eCommon.KEY_PLAY:
		if (_.player != null && _.player.paused) {
			$('.mejs-controls').find('.mejs-button').removeClass('mejs-stop');
			_.player.play();
		}
		break;
	case eCommon.KEY_PAUSE:
		if (_.player != null && _.player.played) {
			$('.mejs-controls').find('.mejs-button').removeClass('mejs-stop');
			_.player.pause();
		}
		break;
	case eCommon.KEY_STOP:
		if (_.player != null) {
			$('.mejs-controls').find('.mejs-button').removeClass('mejs-pause');
			$('.mejs-controls').find('.mejs-button button').attr('title', 'Play');
			$('.mejs-controls').find('.mejs-button button').attr('aria-label', 'Play');
			$('.mejs-controls').find('.mejs-button').addClass('mejs-stop');
			if (!_.player.paused) {
				_.player.pause();
			}
			if (_.player.currentTime > 0) {
				_.player.setCurrentTime(0);
				_.player.pause();
				$('.mejs-controls').find('.mejs-time-current').width('0px');
				$('.mejs-controls').find('.mejs-time-handle').css('left', '0px');
				$('.mejs-controls').find('.mejs-time-float-current').html('00:00');
				$('.mejs-controls').find('.mejs-currenttime').html('00:00');
			}
		}
		break;
	case eCommon.KEY_RW:
		if (_.player != null && !_.player.paused && !isNaN(_.player.duration)
				&& _.player.duration > 0) {
			var newTime = _.player.currentTime - _.player.currentTime * 0.05;
			_.player.setCurrentTime(newTime);
		}
		break;
	case eCommon.KEY_FF:
		eCommon.logServer(_.player + " " + _.player.paused + " " +_.player.duration);
		if (_.player != null && !_.player.paused && !isNaN(_.player.duration)
				&& _.player.duration > 0) {
			var newTime = _.player.currentTime + _.player.currentTime * 0.05;
			_.player.setCurrentTime(newTime);
		}
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
		if (_.player != null && _.player.paused) {
			$('.mejs-controls').find('.mejs-button').removeClass('mejs-stop');
			_.player.play();
		}
		break;
	case eCommon.KEY_PAUSE:
		if (_.player != null && _.player.played) {
			$('.mejs-controls').find('.mejs-button').removeClass('mejs-stop');
			_.player.pause();
		}
		break;
	case eCommon.KEY_STOP:
		if (_.player != null) {
			$('.mejs-controls').find('.mejs-button').removeClass('mejs-pause');
			$('.mejs-controls').find('.mejs-button button').attr('title',
					'Play');
			$('.mejs-controls').find('.mejs-button button').attr('aria-label',
					'Play');
			$('.mejs-controls').find('.mejs-button').addClass('mejs-stop');
			if (!_.player.paused) {
				_.player.pause();
			}
			if (_.player.currentTime > 0) {
				_.player.setCurrentTime(0);
				_.player.pause();
				$('.mejs-controls').find('.mejs-time-current').width('0px');
				$('.mejs-controls').find('.mejs-time-handle').css('left', '0px');
				$('.mejs-controls').find('.mejs-time-float-current').html('00:00');
				$('.mejs-controls').find('.mejs-currenttime').html('00:00');
			}
		}
		break;
	case eCommon.KEY_RW:
		if (_.player != null && !_.player.paused && !isNaN(_.player.duration)
				&& _.player.duration > 0) {
			var newTime = _.player.currentTime - _.player.currentTime * 0.05;
			_.player.setCurrentTime(newTime);
		}
		break;
	case eCommon.KEY_FF:
		if (_.player != null && !_.player.paused && !isNaN(_.player.duration)
				&& _.player.duration > 0) {
			var newTime = _.player.currentTime + _.player.currentTime * 0.05;
			_.player.setCurrentTime(newTime);
		}
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
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