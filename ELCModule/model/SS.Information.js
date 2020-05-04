eInformation = {
	name : 'HOTEL INFO',
	key: 'INFO',
	data : [],
	element : '#scenes-detail-view',
	container : '#container-detail-view',
	containerSubject : '#container-detail-subject',
	containerRight : '.content-right-view',
	classes : 'eInformation',
	isZoom: false
};
/**
 * @param id: service id
 */
eInformation.init = function(url) {
	var obj = {
		context : this,
		url : url,
		name : this.name,
	};
	eCommon.HISTORY.push(this);
	eViewDetail.init(obj);
}

eInformation.show = function() {
	eViewDetail.show();
}

eInformation.focus = function() {
	eViewDetail.focus();
}

eInformation.subjectFocus = function() {
	eViewDetail.subjectSelects();
}

eInformation.hide = function() {
	eViewDetail.hide();
}

eInformation.unload = function() {
	eViewDetail.unload();
}

eInformation.upFocus = function() {
	eViewDetail.upFocus();
}

eInformation.downFocus = function() {
	eViewDetail.downFocus();
}

eInformation.rightFocus = function() {
	eViewDetail.rightFocus()
}

eInformation.leftFocus = function() {
	eViewDetail.leftFocus();
}

eInformation.enterFocus = function($this, event) {
	eViewDetail.enterFocus($this, event);
}

eInformation.scrollUp = function() {
	eViewDetail.scrollUp();
}

eInformation.scrollDown = function() {
	eViewDetail.scrollDown();
}

eInformation.contentRightFocus = function() {
	eViewDetail.contentRightFocus();
}

eInformation.contentLeftFocus = function() {
	eViewDetail.contentLeftFocus();
}

eInformation.subjectLeftFocus = function() {
	eViewDetail.subjectLeftFocus();
}

eInformation.subjectRightFocus = function() {
	eViewDetail.subjectRightFocus();
}

eInformation.subjectUpFocus = function() {
	eViewDetail.subjectUpFocus();
}

eInformation.subjectEnterFocus = function($this, event) {
	eViewDetail.subjectEnterFocus($this, event);
}

eInformation.back = function(){
	var _ = this;
	_.hide();
	_.unload();
}

eInformation.contentKeyDown = function() {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_UP:
		_.scrollUp();
		break;
	case eCommon.KEY_DOWN:
		_.scrollDown();
		break;
	case eCommon.KEY_LEFT:
		if (!_.isZoom){
			_.contentLeftFocus();
		}
		break;
	case eCommon.KEY_RIGHT:
		if (!_.isZoom){
			_.contentRightFocus();
		}
		break;
	case eCommon.KEY_ENTER:
		_.zoom(!_.isZoom);
		break;
	case eCommon.KEY_RETURN:
		if (!_.isZoom){
			eCommon.HISTORY.back();
		} else {
			_.zoom(false);
		}
		break;
	}
}
eInformation.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_UP:
		_.upFocus();
		break;
	case eCommon.KEY_DOWN:
		_.downFocus();
		break;
	case eCommon.KEY_RIGHT:
		_.rightFocus();
		break;
	case eCommon.KEY_LEFT:
		_.leftFocus();
		break;
	case eCommon.KEY_ENTER:
		_.enterFocus($this, event);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	}
}
eInformation.subjectKeyDown = function($this, event) {
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
		_.subjectEnterFocus($this, event);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;

	}
}
eInformation.subjectClick = function($this, event){
	eViewDetail.subjectClick($this, event);
}
eInformation.itemClick = function($this, event){
	eViewDetail.itemClick($this, event);
}
eInformation.errorNoSubject = function($this, event){
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_ENTER:
	case eCommon.KEY_RETURN:
		eModal.hideInfo();
		eCommon.HISTORY.back();
		break;

	}
}
eInformation.clickErrorNoSubject = function($this, event){
	event.stopImmediatePropagation();
	eModal.hideInfo();
	eCommon.HISTORY.back();
}

eInformation.zoom = function(isZoom){
	var _ = this;
	_.isZoom = isZoom;
	if (isZoom){
		eCommon.IS_KEY_PRESS = true;
		$('.content-right-view').css({'position': 'fixed', 'top': '0px', 'left': '0px', 'width':'100%', 'height': '100%', 'z-index': '9999', 'background': '#000'})
	} else {
		eCommon.IS_KEY_PRESS = false;
		$('.content-right-view').removeAttr('style');
	}
}