eMovies = {
	name : 'VOD',
	key: "VOD",
	classes : 'eMovies',
	itemObject : []
};

eMovies.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	var obj = {
		url:API.getAPI().CMD_1,
		name: _.name,
		element : '#scenes-movies-content',
		element_item : '#scenes-movies-item',
		element_subject : '#scenes-movies-subject',
		classes: _.classes,
		serviceCode: API.getAPI().MOVIES
	};
	eScreenSlide.get(obj).getSubject();
}

eMovies.focus = function(){
	eScreenSlide.get().focus();
}

eMovies.selectSubject = function($this){
	eScreenSlide.get().selectSubject($this);
}
eMovies.show = function(){
	eScreenSlide.get().show();
}
eMovies.hide = function(){
	eScreenSlide.get().hide();
}
eMovies.back = function(){
	eScreenSlide.get().back();
}
eMovies.selectMovies = function($this){
	var _=this;
	_.hide();
	// play video
	eVideoSS.play({
		name:$($this).attr('data-title'),
		url: $($this).attr('data-url'),
		id: $($this).attr('data-id')
	});
}
eMovies.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_HOME:
		break;
	case eCommon.KEY_LEFT:
		eScreenSlide.get().left();
		break;
	case eCommon.KEY_RIGHT:
		eScreenSlide.get().right();
		break;
	case eCommon.KEY_DOWN:
		eScreenSlide.get().down();
		break;
	case eCommon.KEY_ENTER:
		_.selectMovies($this);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
	
}

eMovies.subjectKeyDown = function($this, event) {
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_LEFT:
		eScreenSlide.get().leftSubject($this);
		break;
	case eCommon.KEY_RIGHT:
		eScreenSlide.get().rightSubject($this);
		break;
	case eCommon.KEY_UP:
		eScreenSlide.get().up();
		break;
	case eCommon.KEY_ENTER:
		eScreenSlide.get().selectSubject($this);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}
eMovies.subjectClick = function($this){
	eScreenSlide.get().selectSubject($this);
}
eMovies.itemClick = function($this, event){
	event.stopImmediatePropagation();
	eScreenSlide.get().selectItem($this, event);
	this.selectMovies($this);
}
eMovies.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eModal.hideInfo();
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}

eMovies.errorNoContent = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eModal.hideInfo();
			eScreenSlide.get().subjectFocus();
			break;
		case eCommon.KEY_EXIT:
			eModal.hideInfo();
			location.reload();
			break;
	}
}