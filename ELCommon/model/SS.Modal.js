eModal = {
	elementError:'#msg-error',
	elementInfo:'#msg-info',
	elementConfirm: '#msg-confirm',
	elementSuccess: '#msg-success',
	state: null,
	ERROR:'E',
	INFO:'I',
	WARNING: 'W',
	SUCCESS:'S'
}
eModal.show = function(option){
	var _=this;
	$(_.elementError).find('.modal .modal-title').html(option.title);
	$(_.elementError).find('.modal .modal-body').html(option.error + option.code);
	$(_.elementError).find('.modal').modal('show');
}
eModal.hide = function(){
	$(this.elementError).find('.modal').modal('hide');
	eCommon.unblockUI();
}
eModal.showInfo = function(option){
	var _=this;
	_.state = this.INFO;
	$(_.elementInfo).find('.modal .modal-title').html(option.title);
	$(_.elementInfo).find('.modal .modal-body').html(option.content);
	$(_.elementInfo).find('.modal .modal-footer a[tabindex="0"]').attr('onKeyDown', option.onkeydown);
	$(_.elementInfo).find('.modal .modal-footer a[tabindex="0"]').attr('onClick', option.onclick);
	$(_.elementInfo).find('.modal').modal('show');
}
eModal.hideInfo = function(){
	$(this.elementInfo).find('.modal').modal('hide');
	eCommon.unblockUI();
}
eModal.showSuccess = function(option){
	var _= this;
	_.state = this.SUCCESS;
	$(_.elementSuccess).find('.modal .modal-title').html(option.title);
	$(_.elementSuccess).find('.modal .modal-body').html(option.content);
	$(_.elementSuccess).find('.modal').modal('show');
}
eModal.hideSuccess = function(){
	$(this.elementSuccess).find('.modal').modal('hide');
	eCommon.unblockUI();
}
eModal.showError = function(option){
	var _= this;
	_.state = this.SUCCESS;
	$(_.elementError).find('.modal .modal-title').html(option.title);
	$(_.elementError).find('.modal .modal-body').html(option.content);
	$(_.elementError).find('.modal').modal('show');
}
eModal.hideError = function(){
	$(this.elementError).find('.modal').modal('hide');
	eCommon.unblockUI();
}
eModal.showConfirm= function(){
	var _=this;
	_.state = this.CONFIRM;
	eCommon.blockScreen();
	$(_.elementConfirm).find('a').eq(0).html(language.TEXT_BUTTON_NO);
	$(_.elementConfirm).find('a').eq(1).html(language.TEXT_BUTTON_YES);
	var option = new Object();
	option.title = eFood.name;
	option.content = '<h5 class="color-black">'+language.FOOD_WARNING+'</h5><h5 class="color-black">'+language.FOOD_QUESTION_EXIT+'</h5>';
	$(_.elementConfirm).find('.modal .modal-title').html(option.title);
	$(_.elementConfirm).find('.modal .modal-body').html(option.content);
	$(_.elementConfirm).find('.modal').modal('show');
}
eModal.hideConfirm = function(){
	eCommon.unblockUI();
	$(this.elementConfirm).find('.modal').modal('hide');
}
eModal.keyDown = function(){
	event.preventDefault();
	var _ = this;
	var keyCode = event.keyCode;
	switch(keyCode)
	{
		case hcap.key.Code.HOME:
			welcome.playSound(welcome.back);
			eCommon.unblockUI();
			eModal.hideError();
			ePlayer.Stop();
			ePlayer.hide();
			if(eCommon.typeVideo === eCommon.VOD){
				moviesSub.unload();
				movies.unload();
			} else if(eCommon.typeVideo === eCommon.MOD){
				eHotelVideoSub.unload();
				eHotelMusicVideo.unload();
				eHotelMusicItem.unload();
			}
			
			eCommon.setBackground();
			eHotelMain.show();
			eHotelMain.selects();
			break;
		case hcap.key.Code.ENTER:
		case hcap.key.Code.BACK:
			welcome.playSound(welcome.back);
			eModal.hideError();
			ePlayer.Stop();
			ePlayer.hide();
			eCommon.setBackground();
			eHotelMain.showNavbar();
			if(eCommon.typeVideo === eCommon.VOD){
				eHotelMoviesDetail.unload();
				moviesSub.show();
				moviesSub.selects();
			} else if(eCommon.typeVideo === eCommon.MOD){
				eHotelVideoSub.show();
				eHotelVideoSub.slide.slick('slickGoTo', eHotelVideoSub.xmlDocCurrent.slideIndex, true);
				eHotelVideoSub.selects();
			}
			eCommon.unblockUI();
			break;
		case hcap.key.Code.EXIT:
			welcome.playSound(welcome.reload);
			location.reload();
		break;
	}
}
eModal.errorNoContentClick = function(){
	eModal.hideInfo();
	eCommon.HISTORY.back();
}
eModal.errorNoContent = function() {
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
		case eCommon.KEY_RETURN:
			eModal.hideInfo();
			eCommon.HISTORY.back();
			break;
	}
}
