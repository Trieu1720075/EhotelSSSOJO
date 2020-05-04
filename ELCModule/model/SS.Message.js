var xmlAPI = new parseXML();

eMessage = {
	name : '',
	key:'eMessage',
	element : $('#scenes-message'),
	slide : '#message-subject',
	messageText : $('#message-detail'),
	messageContainer: '#message-content',
	messageBarLeft: '.bar-message-heading-left',
	messageBarRight:'.bar-message-heading-right',
	messageTitle: '.bar-message-title',
	classes: 'eMessage',
	messages : [],
	slideIndex : 1,
	slideCount : 0,
	slideCenter : 3,
	itemHeight : 54,
	minSlide : 8,
	countIsRead : 0
};

eMessage.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.getMessage();
	eCommon.unblockUI();
}

eMessage.getMessage = function(){
	var _= this;
	$.ajax({
		url : API.getAPI().CMD_115,
		data : "",
		cache: false,
		type : 'GET',
		async : true,
		success : function(response) {
			var xml = xmlAPI.loadXMLString(response);
			var length = xml.find("item").length;
			if (length == 0) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = 'eMessage.errorNoSubject()';
				obj.onclick = 'eMessage.errorNoSubjectClick(this, event)';
				eModal.showInfo(obj);
				return;
			}

			$(_.slide).append('<ul class="list-group"></ul>');
			_.slideCount = length;
			_.messages = [];
			_.countIsRead = 0;
			xml.find('item').each(
			function(index, element) {
				var object = {
					id : $(element).attr('id'),
					subject : $(element).find("subject").text(),
					content : $(element).find("content").text(),
					sender : $(element).find("sender").text(),
					isRead : $(element).find("isRead").text(),
					date : $(element).find("enterDate").text(),
					time : $(element).find("enterTime").text(),
					classes: _.classes,
					shortDate : ''
				};
				if (object.isRead == '1') {
					object.thumbnail =  '/ELCommon/view/images/ic_letter_open.png';
				} else {
					_.countIsRead += 1;
					object.thumbnail =  '/ELCommon/view/images/ic_letter_close.png';
				}
				if (object.date != null && object.date != "") {
					object.date = object.date.substring(0, 10);
					object.shortDate = object.date.substring(0, 5);
				}
				_.messages.push(object);
				$(_.slide).find('ul').append(eLayout.messageHtml(index + 1, object));
			});
			var txt = language.MSG_TITLE.replace('{0}', _.countIsRead);
			$(_.messageBarRight).find('h3').html(txt);
			txt = language.MSG_NEW.replace('{0}', _.countIsRead);
			$(_.messageTitle).find('h4').eq(0).html(txt);

			$(_.slide).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			_.show();
			_.addColor();
			_.readMessage(_.messages[0]);
			_.initSlide(_.slide, 0, 0);
			_.focus();
	  	},
	  	error: function(error){
	  		var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_ERROR + '</h5>';
			obj.onclick = 'eMessage.errorNoSubjectClick(this, event)';
			obj.onkeydown = 'eMessage.errorNoSubject()';
			eModal.showInfo(obj);
	  	}
	});
}

eMessage.initSlide = function(slideId, type, startAt) {
	var _ = this;
	var options = {
		horizontal : type,
		itemNav : 'centered',
		smart : 1,
		activateOn : 'click',
		mouseDragging : 0,
		touchDragging : 0,
		releaseSwing : 0,
		startAt : startAt,
		scrollBy : 1,
		speed : 0,
		elasticBounds : 1,
		easing : 'easeOutExpo',
		dragHandle : 0,
		dynamicHandle : 1,
		clickBar : 0,
		// Buttons
		prev : $(slideId).parent().find('.prev'),
		next : $(slideId).parent().find('.next')
	};
	var slideLG = new SlideLG(slideId, options).init();
}

eMessage.readMessage = function(obj) {
	var _ = this;
	_.messageText.html(eLayout.messagePanelHtml(obj));
	_.getMessageText(obj.id);
	_.updateView(obj.id);
}

eMessage.updateView = function(msgId) {
	var _ = this;
	var length = _.messages.length;
	for (var i = 0; i < length; i++) {
		if (msgId === _.messages[i].id) {
			if (_.messages[i].isRead != "1") {
				_.messages[i].isRead = 1;
				_.countIsRead--;
			}
			_.messages[i].thumbnail = '/ELCommon/view/images/ic_letter_open.png';
		}
	}
	var txt = language.MSG_TITLE.replace('{0}', _.countIsRead);
	$(_.messageBarRight).find('h3').html(txt);
	txt = language.MSG_NEW.replace('{0}', _.countIsRead);
	$(_.messageTitle).find('h4').eq(0).html(txt);
	$(_.slide).find('ul li').each(function(index, element) {
		$(element).find('img').attr('src', _.messages[index].thumbnail + '#' + eCommon.random());
	});
}

eMessage.getMessageText = function(msgId) {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_100 + msgId,
		data : "",
		cache : false,
		type : 'GET',
		async : true,
		success : function(response) {
		},
		error : function(error) {
		}
	});
}

eMessage.focus = function() {
	$(this.slide).find('ul li.active').focus();
}

eMessage.show = function() {
	var _=this;
	$(_.messageBarLeft).find('h4').text(eCommon.htmlToText(language.MSG_INBOX));
	$(_.messageBarRight).find('h4').text(eCommon.htmlToText(eCommon.CUSTOMER));
	$(_.messageBarRight).find('h3').text(eCommon.htmlToText(language.MSG_TITLE));
	$(_.messageTitle).find('h4').eq(0).text(eCommon.htmlToText(language.MSG_NEW));
	$(_.messageTitle).find('h4').eq(1).text(eCommon.htmlToText(language.MSG_MESSAGE));
	$(_.messageTitle).find('h4').eq(2).text(eCommon.htmlToText(language.MSG_DATE));
	_.element.show();
//	$(eCommon.navbarName).text(this.name);
}

eMessage.hide = function() {
	this.element.hide();
}

eMessage.upFocus = function() {
	var _ = this;
	_.slideIndex = Number($(_.slide).find('ul li.active').attr('tabindex'));
	if (_.slideIndex > 1) {
		$(_.slide).parent().find('.prev').trigger('click');
		_.slideIndex = Number($(_.slide).find('ul li.active').attr('tabindex'));
		_.focus();
	}
}

eMessage.downFocus = function() {
	var _ = this;
	if (_.slideIndex < _.slideCount) {
		$(_.slide).parent().find('.next').trigger('click');
		_.slideIndex = Number($(_.slide).find('ul li.active').attr('tabindex'));
		_.focus();
	}
}
eMessage.rightFocus = function() {
	$(this.messageContainer).focus();
}
eMessage.addColor = function() {
	var _ = this;
	$(_.slide).find('ul li').removeClass('item-selected');
	$(_.slide).find('ul li[tabindex="' + _.slideIndex + '"]').addClass('item-selected');
}

eMessage.home = function() {
	var _ = this;
	_.unload();
	_.hide();
	eHotelMain.show();
	eHotelMain.focus();
}
eMessage.messageUpFocus = function(){
	var doc = document.getElementById("msg-text");
	var scrollTop = doc.scrollTop;
	if(scrollTop > 0){
		 doc.scrollTop -= 5;
	}
}
eMessage.messageDownFocus = function(){
	var doc = document.getElementById("msg-text");
	var scrollHeight = doc.scrollHeight;
	var scrollTop = doc.scrollTop;
	var offSetHeight = doc.offsetHeight;
	if(scrollTop + offSetHeight <= scrollHeight){
		 doc.scrollTop += 5;
	}
}
eMessage.messageLeftFocus = function(){
	this.focus();
}
eMessage.back = function() {
	try {
		this.hide();
		$(this.slide).slideLG(false);
		$(this.slide).empty();
		this.slideIndex = 1;
	} catch(error){
		eCommon.logs(error);
	}
	
}
eMessage.messageKeyDown = function(){
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch(keyCode) {
		case eCommon.KEY_HOME:
			_.home();
			break;
		case eCommon.KEY_UP:
			eWelcome.playSound(eCommon.up);
			_.messageUpFocus();
		    break;
		case eCommon.KEY_DOWN:
			eWelcome.playSound(eCommon.down);
			_.messageDownFocus();
			break;
		case eCommon.KEY_LEFT:
			eWelcome.playSound(eCommon.left);
			_.messageLeftFocus();
			break;
		case eCommon.KEY_RETURN:
			eWelcome.playSound(eCommon.back);
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
	};
}
eMessage.keyDown = function(){
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch(keyCode) {
		case eCommon.KEY_HOME:
			_.home();
			break;
		case eCommon.KEY_UP:
			eWelcome.playSound(eCommon.up);
			_.upFocus();
		    break;
		case eCommon.KEY_DOWN:
			eWelcome.playSound(eCommon.down);
			_.downFocus();
			break;
		case eCommon.KEY_RIGHT:
			eWelcome.playSound(eCommon.right);
			_.rightFocus();
			break;
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			_.addColor();
			var id = $(_.slide).find('ul a[tabindex="'+(_.slideIndex) +'"]').attr('data-id');
			_.readMessage(_.messages[(_.slideIndex-1)]);
			break;
		case eCommon.KEY_RETURN:
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
		break;
	}
}
eMessage.errorNoSubjectClick = function($this, event){
	event.stopImmediatePropagation();
	eModal.hideInfo();
	eCommon.HISTORY.back();
}
eMessage.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			eModal.hideInfo();
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
		case eCommon.KEY_RETURN:
			eModal.hideInfo();
			eCommon.HISTORY.back();
			break;
	}
}