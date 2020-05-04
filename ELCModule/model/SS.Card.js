eCard = {
	key: 'CARD',
	element : '#msg-card',
	slide : '#food-order',
	slideLG: null,
	orderTotal: '.order-total',
	amountTotal: '.order-quality',
	itemIndex : 1,
	card : [],
	slideCenter : 2,
	priceUnit: ''
};

eCard.add = function(option) {
	var _ = this;
	var indx = _.checkCard(option.id);
	_.priceUnit = option.iunit;
	if (indx === -1) {
		_.card.push(option);
	} else {
		_.card[indx].count += 1;
		_.card[indx].currency = _.card[indx].count * _.card[indx].price;
	}
	_.updateCardScreen();
}

eCard.checkCard = function(id){
	var _= this;
	var length = _.card.length;
	for(var i = 0 ; i< length; i++){
		if( _.card[i].id === id ){
			return i;
		}
	}
	return -1;
}

eCard.update = function() {
	var _ = this;
	var index = Number($(_.slide + ' li.active').attr('tabindex')) - 1 ;
	_.card[index].count += 1;
	_.card[index].currency = _.card[index].count * _.card[index].price;
	$(_.slide + ' ul li[tabindex="' + (index+1) + '"] button').html(_.card[index].currency + ' ' + _.priceUnit
			+ ' <span class="badge">' + _.card[index].count + '</span>');
	_.updateCardScreen();
	_.updateFood();
}

eCard.updateCardScreen = function() {
	var _ = this;
	var count = 0;
	var total = 0;
	for (var i = 0; i < this.card.length; i++) {
		count += parseInt(this.card[i].count);
		total += parseInt(this.card[i].currency);
	}
	$(this.orderTotal).html(eFood.formatCurrentcy(total, 0)+" "+this.priceUnit);
	$(this.amountTotal).html(count);
	$(this.element + ' .modal-footer-total h4').eq(0).html(language.FOOD_TOTAL_QUALITY + ' ' + count);
	$(this.element + ' .modal-footer-total h4').eq(1).html(language.FOOD_TOTAL_AMOUNT + ' ' + eFood.formatCurrentcy(total, 0)+" "+this.priceUnit);
}

eCard.updateFood = function() {
	var _ = this;
	var index = Number($(_.slide + ' li.active').attr('tabindex')) - 1 ;
	var item = _.card[index];
	var count = parseInt(item.count);
	var idx = Number($(eFood.containerFood + ' ul li.active').attr('tabindex')) - 1;
	var subjectFoodIndex = Number($(eFood.container + ' ul li.item-selected .item-sub').attr('tabindex')) - 1;
	var subject = Number($(eFood.containerSubject + ' ul li.active .thumbnail').attr('tabindex')) - 1;
	eFood.subjectList[subject].subjectFood[subjectFoodIndex].foods[idx].count = count;
	$.each($(eFood.containerFood).find('ul li'), function(i, element) {
		if ($(element).attr('data-id') == item.id) {
			$(element).find('span.badge').html(count);
		}
	});
}

eCard.resetCard = function() {
	var _ = this;
	$(_.orderTotal).html(0 + ' ' + _.priceUnit);
	$(_.amountTotal).html(0);
	$(eFood.containerFood).find('ul li').each(function(index, element) {
		$(element).find('span.badge').text('0');
	});
	var length = eFood.subjectList.length;
	for(var k = 0; k < length; k++){
		var slength = eFood.subjectList[k].subjectFood.length;
		for (var i = 0; i < slength; i++) {
			var size = eFood.subjectList[k].subjectFood[i].foods.length;
			for(var j = 0; j < size; j++){
				eFood.subjectList[k].subjectFood[i].foods[j].count = 0;
			}	
		}
	}
	
	_.card = [];
}

eCard.del = function(){
	var _= this;
	var index = Number($(_.slide + ' li.active').attr('tabindex')) - 1 ;
	_.card[index].count-=1;
	_.card[index].currency = _.card[index].count* _.card[index].price;
	$(_.slide + ' ul li[tabindex="'+ (index+1) +'"] button').html( _.card[index].currency + ' ' + _.priceUnit
			+ ' <span class="badge">'+_.card[index].count+'</span>');
	_.updateFood();
	if(_.card[index].count === 0){
		$(_.slide + ' ul li[tabindex="'+(index+1) +'"]').trigger('remove').remove();
		_.card.splice(index, 1);
		_.slideLG.reload();
		if(_.card.length === 0){
			_.hide();
			_.resetFood();
			_.resetCard();
			var obj = new Object();
			obj.title = language.FOOD_ORDERED;
			obj.content = '<h5 class="color-black">'+language.FOOD_CARD_EMPTY+'</h5>';
			obj.onkeydown = 'eCard.emptyCard()';
			obj.onclick = 'eCard.emptyCardClick()';
			eModal.showInfo(obj);
			return false;
		}
		// update tabindex onview
		$(_.slide).find('ul li').each(function(idx, element){
			$(element).attr('tabindex', (idx+1));
		});
		$(_.slide + ' ul li').removeClass('active');
		if(index == 0){
			$(_.slide + ' ul li[tabindex="'+(index+1) +'"]').addClass('active');
		}else if(index <= _.card.length){
			$(_.slide + ' ul li[tabindex="'+(index) +'"]').addClass('active');
		}
		_.focus();
	}
	_.updateCardScreen();
}

eCard.focus = function(){
	var _= this;
	$(_.slide).find('ul li.active').focus();
}
eCard.back = function(){
	this.close();
}
eCard.modalFocus = function(){
	var _=this;
	$(_.element).find('.modal-footer a[tabindex="0"]').focus();
}
eCard.initSlide = function(container, startAt) {
	var _ = this;
	var options = {
		horizontal : 0,
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
		easing : 'linear',
		dragHandle : 0,
		dynamicHandle : 1,
		clickBar : 0,
		activateOn : 'click',
		// Buttons
		prev : $(container).parent().find('.prev'),
		next : $(container).parent().find('.next')
	};
	_.slideLG = new SlideLG(container, options).init();
}
eCard.upFocus = function(){
	var _= this;
	var index = Number($(_.slide + ' li.active').attr('tabindex'));
	if(index == 1){
		_.modalFocus();
	} else {
		$(_.slide).parent().find('.prev').trigger('click');
		_.focus();
	}
	
}

eCard.downFocus = function(){
	var _= this;
	var index = Number($(_.slide + ' li.active').attr('tabindex'));
	if(index == _.card.length){
		_.modalFocus();
	} else {
		$(_.slide).parent().find('.next').trigger('click');
		_.focus();
	}
	
}

eCard.show = function(){
	var _= this;
	eCommon.HISTORY.push(eCard);
//	eCommon.blockScreen();
	$(_.element + ' .modal-footer a').eq(0).html(language.TEXT_BUTTON_CLOSE);
	$(_.element + ' .modal-footer a').eq(1).html(language.TEXT_BUTTON_ORDER);
	$(_.element + ' .modal').modal('show');
	var length = _.card.length;
	_.itemIndex = 1;
	var content = '';
	if ($(_.slide + ' ul li').length > 0) {
		_.resetFood();
	}
	for(var i =0; i < length; i++){
		content+= eLayout.orderedHtml((i+1), _.card[i]);
	}
	$(_.element + ' .modal .modal-title').html(language.FOOD_ORDERED);
	$(_.slide).html('<ul class="list-group">'+content+'</ul>');
	$(_.slide).parent().append('<div class="hidden"><button class="btn prev"></button><button class="btn next"></button></div>');
	//_.initSlide(_.slide, 0);
	
}

eCard.resetFood = function() {
	var _ = this;
	$(_.slide).slideLG(false);
	$(_.slide).empty();
}

eCard.hide = function(){
	$(this.element).find('.modal').modal('hide');
	eCommon.unblockUI();
}

eCard.emptyCardClick = function() {
	eModal.hideInfo();
	eFood.focus();
}

eCard.close = function() {
	var _ = this;
	_.hide();
}
eCard.closeClick = function($this,event){
	event.stopImmediatePropagation();
	this.close();
}
eCard.orderClick = function($this,event){
	event.stopImmediatePropagation();
	this.sendOrder();
}
eCard.clickConfirm = function($this, event){
	event.stopImmediatePropagation();
	var index = Number($($this).attr('tabindex'));
	if(index === 0){
		eModal.hideConfirm();
		eFood.focus();
	} else {
		eModal.hideConfirm();
		eCommon.HISTORY.back();
	}
}
eCard.orderSuccessClick = function() {	
	eModal.hideSuccess();
	eFood.focus();
	eCommon.HISTORY.back();
}

eCard.orderErrorClick = function() {
	eModal.hideError();
	eFood.focus();
}

eCard.confirmNoClick = function() {
	eModal.hideConfirm();
	eFood.focus();
}

eCard.confirmYesClick = function() {
	eCard.resetCard();
	eModal.hideConfirm();
	eCommon.HISTORY.back();
}

eCard.keyDown = function(){
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch(keyCode) {
		case eCommon.KEY_UP:
			_.upFocus();
		    break;
		case eCommon.KEY_DOWN:
			_.downFocus();
			break;
		case eCommon.KEY_LEFT:
			_.del();
		    break;
		case eCommon.KEY_RIGHT:
			_.update();
		    break;
		case eCommon.KEY_RETURN:
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
		break;
	}
}

eCard.keyDownClose = function(){
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch(keyCode) {
		case eCommon.KEY_HOME:
			break;
		case eCommon.KEY_UP:
			_.focus();
		    break;
		case eCommon.KEY_RIGHT:
			$(_.element).find('.modal-footer a[tabindex="0"]').focus();
		    break;
		case eCommon.KEY_ENTER:
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_RETURN:
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
		break;
	}
}
eCard.orderConfirm = function($this, event){
	event.stopImmediatePropagation();
	var index = Number($($this).attr('tabindex'));
	if(index === 1){
		eCommon.HISTORY.back();
	} else {
		this.sendOrder();
	}
}

eCard.keyDownOrder = function(){
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch(keyCode) {
		case eCommon.KEY_UP:
			_.focus();
		    break;
		case eCommon.KEY_LEFT:
			$(_.element + ' .modal-footer a[tabindex="1"]').focus();
		    break;
		case eCommon.KEY_ENTER:
			_.sendOrder();
			break;
		case eCommon.KEY_RETURN:
			eCommon.HISTORY.back();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
		break;
	}
}

eCard.emptyCard = function(){
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_RETURN:
		case eCommon.KEY_ENTER:
			_.emptyCardClick();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}

eCard.orderSuccess = function(){
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch(keyCode) {
		case eCommon.KEY_ENTER:
		case eCommon.KEY_RETURN:
			_.orderSuccessClick();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
		break;
	}
}

eCard.orderError = function(){
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch(keyCode) {
		case eCommon.KEY_ENTER:
		case eCommon.KEY_RETURN:
			_.orderErrorClick();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
		break;
	}
}

eCard.confirmNo = function() {
	var _ = this;
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_RIGHT:
			$(eModal.elementConfirm).find('a[tabindex="1"]').focus();
			break;
		case eCommon.KEY_ENTER:
			_.confirmNoClick();
			break;
		case eCommon.KEY_RETURN:
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}

eCard.confirmYes = function(state) {
	var _ = this;
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_LEFT:
			$(eModal.elementConfirm).find('a[tabindex="0"]').focus();
			break;
		case eCommon.KEY_ENTER:
			_.confirmYesClick();
			break;
		case eCommon.KEY_EXIT:
			location.reload();
			break;
	}
}

eCard.sendOrder = function(){
	var _= this;
	var length = _.card.length;
	var text = '';
	var food = [];
	for(var i = 0; i < length; i++){
		if(i < length - 1){
			text = text + _.card[i].id + '-' + _.card[i].count + '-' + _.card[i].time + '-' + _.card[i].date + '@';
		} else {
			text = text + _.card[i].id + '-' + _.card[i].count + '-' + _.card[i].time + '-' + _.card[i].date;
		}
		food.push({name: _.card[i].name, price: _.card[i].price, count: _.card[i].count, unit:_.card[i].iunit, order_time: _.card[i].date+' '+_.card[i].time});
	}	
	$.ajax({
	  url : API.getAPI().CMD_114 + text,
	  data : "",
	  cache: false,
	  type : 'GET',
	  async : true,
	  success : function(response) {
		  if(response == 1){
			 _.hide();
			 _.resetCard();
			 $(eModal.elementSuccess).find('a').attr('onKeyDown', 'eCard.orderSuccess()');
			  $(eModal.elementSuccess).find('a').attr('onclick', 'eCard.orderSuccessClick()');
			 eModal.showSuccess({
				 title : language.FOOD_ORDERED, 
				 content : '<h5 class="color-black">'+language.FOOD_ORDER_SUCCESS+'<h5>',
				 onkeydown : 'eCard.orderSuccess()',
				 onclick : 'eCard.orderSuccessClick()',
			 });
			 $.ajax({
				  url : 'http://'+location.hostname+':4657/sendMail',
				  data : {
				  	food: food,
				  	room: eCommon.ROOM,
				  	guest: eCommon.CUSTOMER
				  },
				  type : 'POST',
				  async : true,
				  success : function(data) {
				  },
				  error: function(error){
				  }
				});
		  } else {
			  _.hide();
			  $(eModal.elementError).find('a').attr('onKeyDown', 'eCard.orderError()');
			  $(eModal.elementError).find('a').attr('onclick', 'eCard.orderErrorClick()');
			  eModal.showError({
					title: language.FOOD_ORDERED, 
					content:'<h5 class="text-danger">'+language.FOOD_ORDER_ERROR+'</h5>', 
					code:'<h5 class="text-danger">'+language.FOOD_RECOMMEND+'</h5>',
				});
		  }
	  },
	  error: function(error){
		   _.hide();
			$(eModal.elementError).find('a').attr('onKeyDown', 'eCard.orderError()');
			eModal.showError({
					title: language.FOOD_ORDERED, 
					content:'<h5 class="text-danger">'+language.FOOD_ORDER_ERROR+'</h5>', 
					code:'<h5 class="text-danger">'+language.FOOD_RECOMMEND+'</h5>'
			});
	  }
	});
}

eCard.showOrder = function(){
	var _ = this;
	if (_.card.length > 0) {
		_.show();
	} else {
		var obj = new Object();
		obj.title = language.FOOD_ORDERED;
		obj.content = '<h5 class="color-black">'+language.FOOD_CARD_EMPTY+'</h5>';
		obj.onkeydown = 'eCard.emptyCard()';
		obj.onclick = 'eCard.emptyCardClick()';
		eModal.showInfo(obj);
	}
}