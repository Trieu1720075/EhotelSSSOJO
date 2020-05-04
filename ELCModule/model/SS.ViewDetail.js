eViewDetail = {
	name : '',
	context : null, // container object
	data : [],
	subjectIndex : 1,
	itemIndex : 1,
	isItemFocus : true
}

eViewDetail.init = function(obj) {
	var _ = this;
	_.context = obj.context;
	_.name = obj.name;
	_.getSubject(obj.url);
}

eViewDetail.reset = function() {
	var _ = this;
	$(_.context.container).slideLG(false);
	$(_.context.container).find('ul').empty();
	$(_.context.containerRight).html("");
}

eViewDetail.show = function() {
	eCommon.hideFooter();
	$(this.context.element).show();
//	$(eCommon.navbarName).text(this.context.name);
}

eViewDetail.hide = function() {
	$(this.context.element).hide();
	eCommon.showFooter();
}

eViewDetail.focus = function() {
	$(this.context.container).find('li.active .item-sub').focus();
	$(this.context.container).find('li').removeClass("item-selected");
	$(this.context.container).find('li div[tabindex="' + this.itemIndex + '"]').parent().addClass("item-selected");
}

eViewDetail.contentSelects = function() {
	$(this.context.containerRight).parent().focus();
}

eViewDetail.subjectSelects = function() {
	$(this.context.containerSubject).find('li.active div.thumbnail').focus();
}

eViewDetail.unload = function() {
	var _ = this;
	_.reset();
	$(_.context.containerSubject).slideLG(false);
	$(_.context.containerSubject).find('ul').empty();
	_.subjectIndex = 1;
	_.itemIndex = 1;
	_.data = [];
}

eViewDetail.reInitItem = function() {
	var _ = this;
	var list = _.data[_.subjectIndex - 1].items;
	var length = list.length;
	for (var i = 0; i < length; i++) {
		$(_.context.container).find('ul').append(eLayout.itemHtml(list[i], _.context.classes));
	}

	_.itemIndex = _.data[_.subjectIndex - 1].itemIndex;
	_.show();
	_.initSlide(_.context.container, 0, _.itemIndex - 1);
	_.focus();
	_.setContent();
}

eViewDetail.getSubject = function(url) {
	var _ = this;
	$.ajax({
		url : url,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			_.subjectIndex = 1;
			_.data = [];
			if (data.length == 0) {
				var obj = new Object();
				obj.type = 'error';
				obj.title = _.context.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = _.context.classes + '.errorNoSubject(this, event)';
				obj.onclick = _.context.classes + '.clickErrorNoSubject(this, event)';
				eModal.showInfo(obj);
				return;
			}
			var length = data.length;
			for (var i = 0; i < length; i++) {
				var obj = new Object();
				obj.id = data[i].id;
				obj.name = data[i].name;
				obj.image = data[i].urlIcon;
				obj.url = API.getAPI().CMD_106 + obj.id;
				obj.index = (i + 1);
				obj.items = [];
				_.data.push(obj);
				$(_.context.containerSubject).find('ul').append(eLayout.subject(obj, _.context.classes));
			}

			_.show();
			_.initSlide(_.context.containerSubject, 1, 0);
			_.subjectSelects();
			// set position center 
			var distance = $(_.context.containerSubject).outerWidth() - $(_.context.containerSubject).find('ul').outerWidth();
			if (distance > 0) {
				$(_.context.containerSubject).find('ul').css({'margin-left' : distance/2 + 'px'});
			}
			// set object language
			var obj = new Object();
			obj.language = eCommon.languageCode;
			obj.data = _.data;
			_.context.data.push(obj);
			_.getItem(_.data[0].url);
		},
		error : function(error) {
			var obj = new Object();
			obj.type = 'error';
			obj.title = _.context.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
			obj.onkeydown = _.context.classes + '.errorNoSubject(this, event)';
			obj.onclick = _.context.classes + '.clickErrorNoSubject(this,event)';
			eModal.showInfo(obj);
		}
	});
}

eViewDetail.getItem = function(url) {
	var _ = this;
	$.ajax({
		url : url,
		data : "",
		cache : true,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			_.itemIndex = 1;
			var length = data.length;
			if (length == 0) {
				var obj = new Object();
				obj.id = 1
				obj.name = language.TEXT_NO_CONTENT;
				obj.def = 'http://' + location.host + '/ELCommon/404/404.html';
				obj.index = 1;
				_.data[_.subjectIndex - 1].itemIndex = 1;
				_.data[_.subjectIndex - 1].items.push(obj);
				$(_.context.container).find('ul').append(eLayout.itemHtml(obj, _.context.classes));
			} else {
				// set itemsubject
				for (var i = 0; i < length; i++) {
					var obj = new Object();
					obj.id = data[i].id
					obj.name = data[i].name;
					obj.def = data[i].def;
					obj.index = (i + 1);
					_.data[_.subjectIndex - 1].itemIndex = 1;
					_.data[_.subjectIndex - 1].items.push(obj);
					$(_.context.container).find('ul').append(eLayout.itemHtml(obj, _.context.classes));
				}
			}
			_.initSlide(_.context.container, 0, _.itemIndex - 1);
			_.focus();
			_.setContent();
			eCommon.unblockUI();
		},
		error : function(error) {
			
		}
	});
}

eViewDetail.setContent = function() {
	var _ = this;
	$(_.context.containerRight).parent().attr('onkeydown', _.context.classes + ".contentKeyDown()");
	if (_.data[_.subjectIndex - 1].items.length > 0) {
		var def = _.data[_.subjectIndex - 1].items[_.itemIndex - 1].def;
		if (def.indexOf('http://') == 0) {
			$.ajax({
				url:'/getHTML?url=' + def,
				cache: false,
				type : 'GET',
				async : true, 
				success: function(response){
					var data = JSON.parse(response);
					if(data.error === 1){
						var def = 'http://' + location.host + '/ELCommon/404/404.html'
						var $frame = ('<iframe id="iframe-content" src=' + (def + '?v=' + eCommon.random()) + ' style="width:100%; height:100%;border:0px">');
						$(_.context.containerRight).html($frame);
						return;
					}
					var $frame = $('<iframe id="iframe-content" style="width:100%; height:100%;border:0px">');
					$(_.context.containerRight).html($frame);
					setTimeout(function() {
						var doc = $frame[0].contentWindow.document;
						var $body = $('body', doc);
						$body.html(data.data);
					}, 1);
				}, 
				error: function(){
				}
			});
		} else {
			var $frame = $('<iframe id="iframe-content" style="width:100%; height:100%;border:0px">');
			$(_.context.containerRight).html($frame);
			setTimeout(function() {
				var doc = $frame[0].contentWindow.document;
				var $body = $('body', doc);
				$body.html(def);
			}, 1);
		}
	} else {
		var obj = new Object();
		obj.type = 'error';
		obj.title = _.name;
		obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
		obj.onkeydown = _.context.classes + '.errorNoItem()';
		obj.onclick = _.context.classes + '.clickErrorNoItem()';
		eModal.showInfo(obj);
	}
}

eViewDetail.initSlide = function(slide, type, startAt) {
	var options = {
		horizontal : type,
		itemNav : 'centered',
		smart : 1,
		activateOn : 'click',
		activateMiddle : 1,
		mouseDragging : 1,
		touchDragging : 0,
		releaseSwing : 1,
		startAt : startAt,
		scrollBy : 1,
		speed : 300,
		moveBy : 0,
		elasticBounds : 1,
		easing : 'swing',
		dragHandle : 0,
		dynamicHandle : 1,
		clickBar : 0,
		// Buttons
		prev : $(slide).parent().find('.prev'),
		next : $(slide).parent().find('.next')
	};
	var slideLG = new SlideLG(slide, options).init();
}

eViewDetail.rightFocus = function() {
	this.isItemFocus = false;
	this.contentSelects();
}

eViewDetail.leftFocus = function() {
	this.isItemFocus = false;
	this.subjectSelects();
}

eViewDetail.upFocus = function() {
	var _ = this;
	var index = Number($(_.context.container).find('li.active .item-sub').attr('tabindex'));
	if (index > 1) {
		$(_.context.container).slideLG('prev');
		_.focus();
	}
}

eViewDetail.downFocus = function() {
	var _ = this;
	var index = Number($(_.context.container).find('li.active .item-sub').attr('tabindex'));
	if (index < _.data[_.subjectIndex - 1].items.length) {
		$(_.context.container).slideLG('next');
		_.focus();
	} else {
		_.isItemFocus = false;
		_.subjectSelects();
	}
}

eViewDetail.enterFocus = function($this, event) {
	var _ = this;
	event.stopPropagation();
	_.itemIndex = Number($($this).attr("tabindex"));
	_.data[_.subjectIndex - 1].itemIndex = _.itemIndex;
	_.setContent();
	_.focus();
}

eViewDetail.scrollUp = function() {
	var iframe = document.getElementById('iframe-content');
	var heightIFrame = iframe.offsetHeight;
	var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	var divContent = innerDoc.body;
	divContent.style.height = heightIFrame + "px";
	divContent.style.overflow = "auto";
	divContent.style.overflowX = "hidden";
	var scrollHeight = divContent.scrollHeight;
	var scrollTop = divContent.scrollTop;
	var offSetHeight = divContent.offsetHeight;
	if (scrollHeight == 0) {
		return;
	}
	if (divContent.scrollTop >= 5) {
		innerDoc.body.scrollTop = innerDoc.body.scrollTop - 5;
	}
}

eViewDetail.scrollDown = function() {
	var iframe = document.getElementById('iframe-content');
	var heightIFrame = iframe.offsetHeight;
	var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	var divContent = innerDoc.body;// innerDoc.getElementById('div-content');
	divContent.style.height = heightIFrame + "px";
	divContent.style.overflow = "auto";
	divContent.style.overflowX = "hidden";
	var scrollHeight = divContent.scrollHeight;
	var scrollTop = divContent.scrollTop;
	var offSetHeight = $("body")[0].offsetHeight;
	if (scrollHeight == offSetHeight) {
		// return;
	}
	divContent.scrollTop = divContent.scrollTop + 5;
}

eViewDetail.contentRightFocus = function() {
	this.subjectSelects();
}

eViewDetail.contentLeftFocus = function() {
	this.isItemFocus = true;
	this.focus();
}

eViewDetail.subjectRightFocus = function() {
	var _ = this;
	$(_.context.containerSubject).slideLG('next');
	_.subjectSelects();
}

eViewDetail.subjectLeftFocus = function() {
	var _ = this;
	$(_.context.containerSubject).slideLG('prev');
	_.subjectSelects();
}

eViewDetail.subjectUpFocus = function() {
	var _ = this;
	$(_.context.containerSubject).slideLG('activate', (_.subjectIndex - 1), true);
	_.focus();
}

eViewDetail.subjectEnterFocus = function($this) {
	var _ = this;
	_.subjectIndex = Number($($this).attr("tabindex"));
	_.reset();
	if (_.data[_.subjectIndex - 1].items.length > 0) {
		_.reInitItem();
	} else {
		var url = _.data[_.subjectIndex - 1].url;
		_.getItem(url);
	}
	_.subjectSelects();
}

eViewDetail.subjectClick = function($this) {
	var _ = this;
	var index = $($this).attr('tabindex');
	$(_.context.containerSubject).slideLG('activate', index - 1, true);
	_.subjectEnterFocus($this);
}

eViewDetail.itemClick = function($this, event) {
	var _ = this;
	event.stopImmediatePropagation();
	var index = $($this).attr('tabindex');
	$(_.context.container).slideLG('activate', index - 1, true);
	_.enterFocus($this, event);
}