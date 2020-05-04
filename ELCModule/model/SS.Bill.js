eBill = {
	name : '',
	element : $('#scenes-bill'),
	slide: '#bill-detail',
	billTitle : '.bar-bill-title',
	billBarLeft: '.bar-bill-heading-left',
	billBarRight: '.bar-bill-heading-right',
	keyPress : false,
	billObject : [],
	subjectObject : [],
	slideIndex: 0,
	slideCount: 0
};

eBill.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.getSubject();
}

eBill.show = function() {
	var _=this;
	$(_.billBarLeft).find('h4').text(language.BILL_YOUR_BILL);
	$(_.billBarLeft).find('h3').eq(0).text(language.BILL_YOUR_TOTAL);
	$(_.billBarLeft).find('h3').eq(2).text(language.BILL_QUALITY_TOTAL);
	$(_.billBarRight).find('h4').text(eCommon.htmlToText(eCommon.CUSTOMER));
	$(_.billBarRight).find('p').text(eCommon.htmlToText(eCommon.ROOM));
	$(_.billTitle).find('h4').eq(0).text(language.BILL_NUM);
	$(_.billTitle).find('h4').eq(1).text(language.BILL_DATE);
	$(_.billTitle).find('h4').eq(2).text(language.BILL_DESCRIPTION);
	$(_.billTitle).find('h4').eq(3).text(language.BILL_QUALITY);
	$(_.billTitle).find('h4').eq(4).text(language.BILL_AMOUNT);
	_.element.show();
	$(eCommon.navbarName).text(_.name);
}

eBill.hide = function() {
	this.element.hide();
}
eBill.upFocus = function() {
	var _ =this;
	if (_.slideIndex > 1) {
		$(_.slide).parent().find('.prev').trigger('click');
		_.slideIndex = Number($(_.slide).find('ul li.active').attr('tabindex'));
		_.focus();
	}
}
eBill.downFocus = function() {
	var _ =this;
	if (_.slideIndex < _.slideCount) {
		$(_.slide).parent().find('.next').trigger('click');
		_.slideIndex = Number($(_.slide).find('ul li.active').attr('tabindex'));
		_.focus();
	}
}
eBill.focus = function() {
	$(this.slide).find('ul li.active').focus();
}

eBill.unload = function() {
	var _ = this;
	$(this.slide).slideLG(false);
	$(this.slide).empty();
	$(this.slide).parent().remove('div.hidden');
}

eBill.getSubject = function() {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_109,
		data : "",
		cache : false,
		type : 'GET',
		async : true,
		success : function(response) {
			var data = JSON.parse(response);
			var length = data.length;
			if (data.length == 0) {
				var obj = new Object();
				obj.title = _.name;
				obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
				obj.onkeydown = 'eModal.errorNoContent()';
				obj.onclick = 'eModal.errorNoContentClick()';
				eModal.showInfo(obj);
				return;
			}
			
			subjectObject = [];
			$(_.slide).html('<ul class="list-group"></ul>');
			// set item subject
			for(var i = 0; i < length; i++){
				var obj = new Object();
				obj.id = data[i].id;
				obj.itemcode = data[i].itemcode;
				obj.iqty = data[i].iqty;
				obj.iamount = data[i].iamount;
				obj.istartdate = data[i].istartdate.substr(0, 10);
				obj.istarttime = data[i].istartdate.substr(10, data[i].istartdate.length);
				obj.iunit = data[i].iunit;
				obj.index = (i + 1);
				obj.itype = data[i].itype;
				_.subjectObject.push(obj);
				if(obj.itype == "USER"){
					$(_.billBarLeft).find('h3').eq(1).text(eFood.formatCurrentcyUnit(obj.iamount, 0));
					$(_.billBarLeft).find('h3').eq(3).text(obj.iqty);
				} else {
					$(_.slide).find('ul').append(eLayout.billHtml(obj));
				}
			}
			
			_.slideCount = _.subjectObject.length;
			_.show();
			$(_.slide).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
			_.initSlide(_.slide, 0, 0);
			// save data
			var obj = new Object();
			obj.language = eCommon.languageCode;
			obj.subject = _.subjectObject;
			_.billObject.push(obj);
			_.focus();
			eCommon.unblockUI();
		},
		error : function(error) {
			var obj = new Object();
			obj.title = _.name;
			obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
			obj.onkeydown = 'eModal.errorNoContent()';
			obj.onclick = 'eModal.errorNoContentClick()';
			eModal.showInfo(obj);
			return;
		}
	});
}
eBill.initSlide = function(slideId, type, startAt) {
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
eBill.home = function() {
	var _ = this;
	_.hide();
	_.unload();
	eHotelScenesSlide.hide();
	eHotelScenesSlide.unload();
	eHotelMain.show();
	eHotelMain.focus();
}

eBill.back = function() {
	var _ = this;
	_.hide();
	_.unload();
}

eBill.keyDown = function() {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_HOME:
			_.home();
			break;
		case eCommon.KEY_DOWN:
			_.downFocus();
			break;
		case eCommon.KEY_UP:
			_.upFocus();
			break;
		case eCommon.KEY_RETURN:
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}

eBill.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			eModal.hideInfo();
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			eModal.hideInfo();
			location.reload();
			break;
	}
}