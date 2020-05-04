eTV = {
	name  		: 'TIVI',
	key			: 'TV',
	element		: '#scenes-ehotel-tv',
	slide		: '#scenes-tv-slide',
	paging		: '.slide_button',
	data 		: [],
	timeValue 	: 0,
	classes		: 'eTV',
	margin		: 0,
	itemInPage	: 15,
	itemIndex	: 1,
	itemInRow   : 5,
	isKeyPress	: false,
	delay: 200
};

eTV.init = function() {
	var _ = this;
	eCommon.HISTORY.push(this);
	if(_.data.length > 0){
		eCommon.unblockUI();
		_.show();
		_.focus();
		return;
	}
	this.getItem();
}
eTV.show = function(){
//	$(eCommon.navbarName).text(this.name);
	$(this.element).show();
}
eTV.isHide = function(){
	if($(this.element + ':hidden')){
		return true;
	}
	return false;
}
eTV.hide = function(){
	$(this.element).hide();
	$(this.element).css('background', 'rgba(0,0,0,0)');
}
eTV.back = function(){
	this.hide();
}
eTV.getItem = function() {
	var _ = this;
	var data = eTVPlayer.data;
	var length = data.length;
	if(length == 0){
		var obj = new Object();
		obj.type = 'error';
		obj.title = _.name;
		obj.content = '<h5 class="color-black">' + language.TEXT_NO_CONTENT + '</h5>';
		obj.onkeydown = 'eModal.errorNoContent()';
		obj.onclick = 'eModal.errorNoContentClick()';
		eModal.showInfo(obj);
		return;
	}
	var itemInPage = _.itemInPage;
	var pages = parseInt(length / itemInPage);
	if(pages < 1){
		pages = 1;
		itemInPage = length;
	}
	var balances = length - itemInPage*pages;
	// draw grid 
	$(_.element).find('ul').empty();
	var count  = 0;
	for(var i= 0; i < pages; i++){
		var li = $('<li data-index="'+(i+1)+'"></li>');
		for(var j = 0; j < itemInPage; j++){
			var obj = {};
			obj.id = data[count].id;
			obj.name = data[count].name;
			obj.image = data[count].image;
			obj.url = data[count].url;
			obj.channelNumber = data[count].channelNumber;
			obj.dataIndex = count++;
			//obj.index = obj.dataIndex + 1;
			obj.index = data[count].channelNumber;
			_.data.push(obj);
			li.append(eLayout.itemChannel(obj, _.classes));
		}
		$(_.element).find('ul').append(li);
	}
	// draw item balance
	if(balances > 0){
		pages+=1;
		var li = $('<li data-index="'+(pages)+'"></li>');
		for(var j = 0; j < balances; j++){
			var obj = {};
			obj.id = data[count].id;
			obj.name = data[count].name;
			obj.image = data[count].image;
			obj.url = data[count].url;
			obj.channelNumber = data[count].channelNumber;
			obj.dataIndex = count++;
			obj.index = obj.dataIndex + 1;
			_.data.push(obj);
			li.append(eLayout.itemChannel(obj, _.classes));
		}
		$(_.element).find('ul').append(li);
	}
	// draw button
	$(_.paging).empty();
	for(var i = 0; i < pages; i++){
		var radio = '<label class="radio-inline"><input data-page="'+(i+1)+'" type="radio" name="optradio" onclick="eTV.pagingClick(this, event)" onkeydown="eTV.pagingKeyDown(this, event)"></input></label>';
		$(_.paging).append(radio);
	}
	_.show();
	var page = parseInt(eTVPlayer.indexChannel/_.itemInPage) + 1;
	_.initSlide(page-1);
	$(_.paging).find('input[data-page="'+page+'"]').prop('checked', true);
	_.selectPage(page, eTVPlayer.indexChannel);
	eCommon.unblockUI();
}
eTV.focus = function(){
	$(this.slide).find('ul li.active div[tabindex="'+this.itemIndex+'"]').focus();
}

eTV.prevPage = function(){
	var _=this;
	$(_.slide).slideLG('prev');
}
eTV.nextPage = function($this){
	var _=this;
	$(_.slide).slideLG('next');
}
/**
 * Move to page
 * @param pageIndex, itemIndex(default this.itemIndex value)
 */
eTV.selectPage = function(){
	var page = 1;
	typeof(arguments[0])==='undefined'? page =1: page=Number(arguments[0]);
	$(eTV.slide).slideLG('activate', page - 1);
	if(typeof(arguments[1]) === 'undefined'){
		this.itemIndex = page*this.itemInPage - this.itemInPage + 1;
		$(this.paging).find('input[data-page="'+(page)+'"]').prop("checked", true);
	} else {
		this.itemIndex = Number(arguments[1]);
	}
	setTimeout(function(){
		eTV.focus();
	}, 200);
}
eTV.updateLayout = function(){
	if(eTV.data.length > 0){ // check layout channel drawed
		var page = parseInt(eTVPlayer.indexChannel/eTV.itemInPage) + 1;
		$(eTV.paging).find('input[data-page="'+page+'"]').prop('checked', true);
		$(eTV.slide).slideLG('activate', page - 1);
		eTV.itemIndex = eTVPlayer.indexChannel;
	}
}
eTV.pagingClick = function($this, event){
	event.stopImmediatePropagation();
	var page = Number($($this).data('page'));
	$($this).prop("checked", true);
	this.selectPage(page);
}
eTV.pagingKeyDown = function($this, event){
	var _ = this;
	event.preventDefault();
	var page = Number($($this).data('page'));
	var keyCode = event.keyCode;
	_.autoHide();
	switch (keyCode) {
	case eCommon.KEY_UP:
		_.focus();
		break;
	case eCommon.KEY_LEFT:
		if(!_.isKeyPress){
			_.isKeyPress = true;
			setTimeout(function(){
				_.isKeyPress = false;
				if((page-1)*_.itemInPage - _.itemInPage + 1 < 0){
					return;
				}
//				_.prevPage();
				$(eTV.slide).slideLG('activate', page - 2); // page start from 1 
				_.itemIndex = (page-1)*_.itemInPage - _.itemInPage + 1;
				$(_.paging).find('input[data-page="'+(page-1)+'"]').prop("checked", true);
				$(_.paging).find('input[data-page="'+(page-1)+'"]').focus();
			}, _.delay);
		}
		break;
	
	case eCommon.KEY_RIGHT:
		if(!_.isKeyPress){
			_.isKeyPress = true;
			setTimeout(function(){
				_.isKeyPress = false;
				if(page > parseInt(_.data.length / _.itemInPage)){
					return;
				}
//				_.nextPage();
				$(eTV.slide).slideLG('activate', page);
				_.itemIndex = (page+1)*_.itemInPage - _.itemInPage + 1;
				$(_.paging).find('input[data-page="'+(page+1)+'"]').prop("checked", true);
				$(_.paging).find('input[data-page="'+(page+1)+'"]').focus();
			}, _.delay);
		}
		break;
	case eCommon.KEY_ENTER:
		break;
	case eCommon.KEY_RETURN:
		if(eTVPlayer.isPlaying()){ // TVPlayer is show
			clearTimeout(_.timeValue);
			_.hide();
			eCommon.HISTORY.current().focus();
		} else {
			eCommon.HISTORY.back();
		}
		break;
	}
}
eTV.initSlide = function(startAt) {
	var _=this;
	var options = {
			horizontal : 1,
			itemNav : 'centered',
			smart : 1,
			activateOn : 'click',
			activateMiddle : 1,
			mouseDragging : 0,
			touchDragging : 0,
			releaseSwing : 0,
			startAt : startAt,
			scrollBy : 1,
			speed : 0,
			elasticBounds : 1,
			easing : 'swing',
			dragHandle : 0,
			dynamicHandle : 1,
			clickBar : 0,
			focusOnSelect: true,
			// Buttons
			prev : $(_.slide).parent().find('.prev'),
			next : $(_.slide).parent().find('.next')
		};
//		$(_.slide).on('beforeChange', function(event, slick, currentSlide, nextSlide){
//			  console.log(nextSlide);
//		});
		$(_.slide).parent().find('.prev').attr('onClick', "eTV.prevClick(this,event)");
		$(_.slide).parent().find('.prev').attr('onKeyDown', "eTV.prevKeyDown(this,event)");
		$(_.slide).parent().find('.next').attr('onClick', "eTV.nextClick(this,event)");
		$(_.slide).parent().find('.next').attr('onKeyDown', "eTV.nextKeyDown(this,event)");
		var slideLG = new SlideLG(_.slide, options).init();
}
eTV.prevClick = function($this, event){
	var _=this;
	event.preventDefault();
	event.stopImmediatePropagation();
	var page = Number($(this.slide).find('ul li.active').data('index')) - 1;
	if(!_.isKeyPress){
		_.isKeyPress = true;
		setTimeout(function(){
			eTV.selectPage(page);
			_.isKeyPress = false;
		}, _.delay);
	}
	_.autoHide();
//	$(this.slide).slideLG('prev');
//	this.itemIndex = page*this.itemInPage - this.itemInPage + 1;
//	setTimeout(function(){
//		eTV.focus();
//	}, 200);
}
eTV.nextClick = function($this, event){
	var _=this;
	event.preventDefault();
	event.stopImmediatePropagation();
	var page = Number($(this.slide).find('ul li.active').data('index')) + 1;
	if(!_.isKeyPress){
		_.isKeyPress = true;
		setTimeout(function(){
			eTV.selectPage(page);
			_.isKeyPress = false;
		}, _.delay);
	}
	_.autoHide();
}
eTV.left = function(){
	var _=this;
	_.itemIndex-=1;
	if(_.itemIndex < 1){
		_.itemIndex = 1;
		return;
	}
	var pageIndex = Number($(_.slide).find('ul li.active').data('index'));
	if(_.itemIndex > 0 && _.itemIndex <= _.itemInPage*pageIndex - _.itemInPage){ // prev page
//		_.prevPage(); // problem
		$(eTV.slide).slideLG('activate', pageIndex-2);// pageIndex start from 1
		$(_.paging).find('input[data-page="'+(pageIndex-1)+'"]').prop('checked', true);
		setTimeout(function(){
			eTV.focus();
		}, 200);
		return;
	}
	_.focus();
}
eTV.right = function(){
	var _=this;
	_.itemIndex+=1;
	if(_.itemIndex > _.data.length){
		_.itemIndex = _.data.length;
		return;
	}
	var pageIndex = Number($(_.slide).find('ul li.active').data('index'));
	if(_.itemIndex > _.itemInPage*pageIndex && _.itemIndex <= _.data.length ){ // next page
//		_.nextPage(); //problem
		$(eTV.slide).slideLG('activate', pageIndex);
		$(_.paging).find('input[data-page="'+(pageIndex+1)+'"]').prop('checked', true);
		setTimeout(function(){
			eTV.focus();
		}, 200);
		return;
	}
	_.focus();
}
eTV.down = function(){
	var _=this;
	var pageIndex = Number($(_.slide).find('ul li.active').data('index'));
	var max = Number($(_.slide).find('ul li.active div.item-channel').last().find('div.thumbnail').attr('tabindex'));
	if(_.itemIndex + _.itemInRow <= max){
		_.itemIndex = _.itemIndex + _.itemInRow;
		_.focus();
	} else { // button page focus
		$(_.paging).find('input[data-page="'+pageIndex+'"]').focus();
	}
	
}
eTV.up = function(){
	var _=this;
	var pageIndex = Number($(_.slide).find('ul li.active').data('index'));
	var min = Number($(_.slide).find('ul li.active div.item-channel').first().find('div.thumbnail').attr('tabindex'));
	if(_.itemIndex > _.itemInRow && _.itemIndex > min && _.itemIndex - _.itemInRow >= min){
		_.itemIndex -= _.itemInRow;
		_.focus();
	}
}
eTV.captionClick = function($this,event){
	event.stopImmediatePropagation();
	event.preventDefault();
	$($this).parent().find('.thumbnail').trigger('click');
}
eTV.itemClick = function($this, event){
	var _ = this;
	event.stopImmediatePropagation();
	event.preventDefault();
	_.itemIndex = Number($($this).attr('tabindex'));
	_.hide();
	// play tv
	$($this).focus();
	eTVPlayer.play($($this).attr('data-url'));
}
eTV.autoHide = function(){
	var _=this;
	if(eTVPlayer.isPlaying()){ // TVPlayer is show
		eCommon.unblockUI();
		clearTimeout( _.timeValue );
		$(_.element).css('background', 'rgba(0,0,0,0.7)');
		if(_.data.length === 0){
			_.getItem();
		} else {
			_.show();
			_.focus();
		}
		_.timeValue = setTimeout(function(){
			_.hide();
			eCommon.HISTORY.current().focus();
		},7000);
	}
}
eTV.keyDown = function($this, event) {
	var _ = this;
	event.preventDefault();
	var keyCode = event.keyCode;
	_.autoHide();
	switch (keyCode) {
	case eCommon.KEY_LEFT:
//		eWelcome.playSound(eCommon.left);
		// delay press
		if(!_.isKeyPress){
			_.isKeyPress = true;
			setTimeout(function(){
				_.left($this);
				_.isKeyPress = false;
			}, _.delay);
		}
		break;
	case eCommon.KEY_RIGHT:
//		eWelcome.playSound(eCommon.right);
		// delay press
		if(!_.isKeyPress){
			_.isKeyPress = true;
			setTimeout(function(){
				_.right($this);
				_.isKeyPress = false;
			}, _.delay);
		}
		break;
	case eCommon.KEY_DOWN:
//		eWelcome.playSound(eCommon.down);
		_.down();
		break;
	case eCommon.KEY_UP:
//		eWelcome.playSound(eCommon.up);
		_.up();
		break;
	case eCommon.KEY_ENTER:
//		eWelcome.playSound(eCommon.select);
		_.hide();
		// play tv
		var url = $($this).attr('data-url');
		eTVPlayer.indexChannel = Number($($this).attr('tabindex'));
		eTVPlayer.play(url);
		break;
	case eCommon.KEY_RETURN:
//		eWelcome.playSound(eCommon.back);
		if(eTVPlayer.isPlaying()){ // TVPlayer is show
			clearTimeout(this.timeValue);
			this.hide();
			eCommon.HISTORY.current().focus();
		} else {
			eCommon.HISTORY.back();
		}
		break;
	case eCommon.KEY_EXIT:
//		eWelcome.playSound(eCommon.reload);
		location.reload();
		break;
	}
	
}