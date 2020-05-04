var xmlAPI = new parseXML();

eRestaurant = {
	name : '',
	key : 'RESTAURANT',
	data : [],
	element : '#scenes-detail-view',
	container : '#container-detail-view',
	containerSubject : '#container-detail-subject',
	containerRight : '.content-right-view',
	classes : 'eRestaurant'
};

eRestaurant.init = function(url) {
	eCommon.HISTORY.push(this);
	var obj = {
		context : this,
		url : url,
		name : this.name
	};
	eViewDetail.init(obj);
}

eRestaurant.show = function() {
	eViewDetail.show();
}

eRestaurant.focus = function() {
	eViewDetail.focus();
}

eRestaurant.subjectSelects = function() {
	eViewDetail.subjectSelects();
}

eRestaurant.hide = function() {
	eViewDetail.hide();
}

eRestaurant.unload = function() {
	eViewDetail.unload();
}

eRestaurant.upFocus = function() {
	eViewDetail.upFocus();
}

eRestaurant.downFocus = function() {
	eViewDetail.downFocus();
}

eRestaurant.rightFocus = function() {
	eViewDetail.rightFocus()
}

eRestaurant.leftFocus = function() {
	eViewDetail.leftFocus();
}

eRestaurant.enterFocus = function($this, event) {
	eViewDetail.enterFocus($this, event);
}

eRestaurant.scrollUp = function() {
	eViewDetail.scrollUp();
}

eRestaurant.scrollDown = function() {
	eViewDetail.scrollDown();
}

eRestaurant.contentRightFocus = function() {
	eViewDetail.contentRightFocus();
}

eRestaurant.contentLeftFocus = function() {
	eViewDetail.contentLeftFocus();
}

eRestaurant.subjectLeftFocus = function() {
	eViewDetail.subjectLeftFocus();
}

eRestaurant.subjectRightFocus = function() {
	eViewDetail.subjectRightFocus();
}

eRestaurant.subjectUpFocus = function() {
	eViewDetail.subjectUpFocus();
}

eRestaurant.back = function(){
	var _=this;
	_.hide();
	_.unload();
}
eRestaurant.errorNoSubjectClick = function() {
	var _ = this;
	eModal.hideInfo();
	eCommon.HISTORY.back();
}

eRestaurant.errorNoContentClick = function() {
	var _ = this;
	eModal.hideInfo();
	_.subjectSelects();
}

eRestaurant.contentKeyDown = function() {
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
		_.contentLeftFocus();
		break;
	case eCommon.KEY_RIGHT:
		_.contentRightFocus();
		break;
	case eCommon.KEY_RETURN:
		_.unload();
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
	}
}

eRestaurant.keyDown = function($this, event) {
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
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}
eRestaurant.subjectClick = function($this, event){
	event.stopImmediatePropagation();
	$($this).focus();
	eViewDetail.subjectClick($this);
}
eRestaurant.itemClick  = function($this, event){
	event.stopImmediatePropagation();
	$($this).focus();
	eViewDetail.itemClick($this, event);
}
eRestaurant.subjectKeyDown = function($this, event) {
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
		eViewDetail.subjectEnterFocus($this);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}

eRestaurant.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_RETURN:
		case eCommon.KEY_ENTER:
			_.errorNoSubjectClick();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}

eRestaurant.errorNoContent = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			_.errorNoContentClick();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}