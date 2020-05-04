eMyStay = {
	name : '',
	key: 'MYSTAY',
	classes : 'eMyStay',
	key: 'MYSTAY',
	element:'#scenes-mystay',
	element_item:'#scenes-mystay-slide',
	scope : null
};

eMyStay.init = function(url) {
	var _ = this;
	eCommon.HISTORY.push(this);
	_.getItem(url);
}
eMyStay.getItem = function(url){
	var _ = this;
	$.ajax({
		url : url,
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
				obj.name = json[i].name;
				obj.image = json[i].urlImage;
				obj.index = (i + 1);
				var url = json[i].urllink;
				var serviceCode = json[i].service_code;
				if (serviceCode == API.getAPI().DINNING) {// service
					if (url != "-1") {
						url = API.getAPI().CMD_104.replace('@-1', url);
					} else {
						url = API.getAPI().CMD_107;
					}
				} else if (serviceCode == API.getAPI().INFORMATION
						|| serviceCode == API.getAPI().ACTIVITY
						|| serviceCode == API.getAPI().TRANSPORT
						|| serviceCode == API.getAPI().SERVICE) {// Information
					if (url != "-1") {
						url = API.getAPI().CMD_104.replace('@-1', url);
					} else {
						url = API.getAPI().CMD_105 + obj.id;
					}
				} else if (serviceCode == API.getAPI().BILL) {// View Bill
					if (url != "-1") {
						url = API.getAPI().CMD_104.replace('@-1', url);
					} else {
						url = API.getAPI().CMD_109;
					}
				} else if (serviceCode == API.getAPI().EXCHANGE) {// Exchange Rate
					if (url != "-1") {
						url = API.getAPI().CMD_104.replace('@-1', url);
					} else {
						url = API.getAPI().CMD_117;
					}
				}
				obj.url = url;
				obj.serviceCode = json[i].service_code;
				obj.icon =  json[i].urlIcon;
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
eMyStay.focus = function(){
	$(this.element).find('li.active div.thumbnail').focus();
}

eMyStay.show = function(){
//	$(eCommon.navbarName).text(this.name);
	$(this.element).show();
}
eMyStay.hide = function(){
	$(this.element).hide();
}
eMyStay.back = function(){
	this.hide();
	if(this.scope != null){
		this.scope.destroy();
	}
}
eMyStay.selectItem = function($this) {
	var _=this;
	_.hide();
	var id = $($this).attr('data-id');
	var title = $($this).attr('data-title');
	var url = $($this).attr('data-url');
	var serviceCode = $($this).attr('service-code');
	if (serviceCode == API.getAPI().EXCHANGE) {
		eExchangeRate.name = title;
		eExchangeRate.init();
	} else if (serviceCode == API.getAPI().BILL) {
		eBill.name = title;
		eBill.init();
	} else if (serviceCode === API.getAPI().INFORMATION 
			|| serviceCode === API.getAPI().TRANSPORT
			|| serviceCode === API.getAPI().SERVICE
			|| serviceCode === API.getAPI().ACTIVITY) {
		eInformation.name = title;
		eInformation.init(url);
	} else if (serviceCode === API.getAPI().ACTIVITY) {
//		eHotelActivity.name = title;
//		eHotelActivity.init(url);
	} else if(serviceCode === API.getAPI().SERVICE){
//		eHotelService.name = title;
//		eHotelService.init(url);
	} else if(serviceCode === API.getAPI().DINNING){
		eFood.name = title;
		eFood.init(url);
	} else if (serviceCode === API.getAPI().WEATHER) { // call Internet
		eWeather.name = title;
		eWeather.init();
	} else {
//		eMyStaySub.name = common.htmlToText(title);
//		eMyStaySub.init(id, url, serviceCode);
	}
}

eMyStay.errorNoSubjectClick = function() {
	eModal.hideInfo();
	eCommon.HISTORY.back();
}
eMyStay.itemClick = function($this, event){
	this.selectItem($this);
	$($this).focus();
}
eMyStay.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {
	case eCommon.KEY_LEFT:
		_.scope.left();
		_.focus();
		break;
	case eCommon.KEY_RIGHT:
		_.scope.right();
		_.focus();
		break;
	case eCommon.KEY_ENTER:
		_.selectItem($this);
		break;
	case eCommon.KEY_RETURN:
		eCommon.HISTORY.back();
		break;
	case eCommon.KEY_EXIT:
		location.reload();
		break;
	}
}

eMyStay.errorNoSubject = function() {
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_ENTER:
			_.errorNoSubjectClick();
			break;
		case eCommon.KEY_EXIT:
			eModal.hideInfo();
			location.reload();
			break;
	}
}