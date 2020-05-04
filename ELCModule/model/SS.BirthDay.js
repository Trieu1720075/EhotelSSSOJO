eBirthDay = {
	name : 'BIRTHDAY',
	key: "BIRTHDAY",
	data: {
		name: '',
		//welcome: 'Chúc quý khách sinh nhật vui vẻ!',
		url: '',
		duration: '10000'
		//background: 'http://172.16.9.70:8383/SS_FLAMIGO/1920x1080.png'
	},
	element : '#scenes-birthday',
	item : '#birthday-content',
	content : '.birthday-content',	
	timeout: null,
	isBirthDay: false
}

eBirthDay.init = function() {
	var _ = this;
	_.getData();
}

eBirthDay.getData = function() {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_30,
		cache: false,
		type : 'GET',
		async : false,
		success : function(response) {
			if (response != null && response != ""){
				var response = JSON.parse(response);
				if (response.isbirthday == 1){
					_.isBirthDay = true;
					_.data = {
						name: response.guest,
						url: response.url,
						duration: eCommon.stringToTime(response.duration)
					}
					_.initData();
				} else {
					_.isBirthDay = false;
					eMain.init();
				}
			} else {
				eMain.init();
			}
		},
		error: function(){
			eMain.init();
		}
	});
	
}


eBirthDay.show = function() {
	eCommon.IS_KEY_PRESS = true;
	eCommon.hideHeader();
	eCommon.hideFooter();
	eCommon.hideBackground();
	$(this.element).show();
	setTimeout(function(){eBirthDay.focus()},500);
	clearTimeout(eBirthDay.timeout);
	eBirthDay.timeout = setTimeout(function(){eBirthDay.hide(); eMain.init()}, eBirthDay.data.duration);
}

eBirthDay.hide = function() {
	eCommon.IS_KEY_PRESS = false;
	$(this.element).hide();
	eCommon.showBackground();
	clearTimeout(eBirthDay.timeout);	
}

eBirthDay.focus = function(){
	$(this.item).focus();
}

eBirthDay.initData = function() {
	var _ = this;
	//$(_.context.containerRight).parent().attr('onkeydown', _.context.classes + ".contentKeyDown()");
	var def = _.data.url;
	if (def.indexOf('http://') == 0) {
		$.ajax({
			url:'/getHTML?url=' + def+ '?v=' + eCommon.random(),
			cache: false,
			type : 'GET',
			async : true, 
			success: function(response){
				var data = JSON.parse(response);
				if(data.error === 1){
					eMain.init();
					return;
				}
				var $frame = $('<iframe id="iframe-content" style="width:100%; height:100%;border:0px">');
				$(_.content).html($frame);
				setTimeout(function() {
					var ifrm = document.getElementById('iframe-content');
					ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
					ifrm.document.open();
					ifrm.document.write(data.data);
					ifrm.document.close();
					$($('#iframe-content').contents().find('#birthday-name')).html('<h4>'+eBirthDay.data.name+'</h4>');
					eBirthDay.show();
					//eCommon.logs($($('#iframe-content').contents().find('#birthday-name')).html())
				}, 1);
			}, 
			error: function(){
				eMain.init();
			}
		});
	} else {
		var $frame = $('<iframe id="iframe-content" style="width:100%; height:100%;border:0px">');
		$(_.content).html($frame);
		setTimeout(function() {
			var ifrm = document.getElementById('iframe-content');
			ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
			ifrm.document.open();
			ifrm.document.write(data.data);
			ifrm.document.close();
			$($('#iframe-content').contents().find('#birthday-name')).html('<h4>'+eBirthDay.data.name+'</h4>');
			eBirthDay.show();
		}, 1);
	}
}

eBirthDay.itemClick = function($this, event){
	var _ = this;
	_.hide();
	eMain.init();
}

eBirthDay.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	switch (keyCode) {		
		case eCommon.KEY_ENTER:
			eWelcome.playSound(eCommon.select);
			_.itemClick($this, event);
			break;
		case eCommon.KEY_RETURN:
			_.hide();
			eWelcome.show();
			setTimeout(function(){eWelcome.focus()}, 500);
			break;
		case eCommon.KEY_EXIT:
			eWelcome.playSound(eCommon.reload);
			location.reload();
			break;
	}
}