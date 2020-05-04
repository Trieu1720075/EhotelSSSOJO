/**
 * @author DangTM
 * @date 11/08/2016
 * @returns Object History Application
 */
History = function(){
	this.data = [];
};
History.prototype.isExist = function(object){
	var length = this.data.length;
	for(var i = 0; i < length; i++){
		if((object.key === this.data[i].key)){
			return i;
		}
	}
	return -1;
};
History.prototype.current = function(){
	var length = this.data.length;
	return this.data[length - 1];
};
History.prototype.push = function(object){
	if(typeof(object) === "object" && this.isExist(object) === -1){
		var length = this.data.length;
		if(length > 0 && typeof(this.data[length - 1].pause) === "function"){
			// stop timeout
			this.data[length - 1].pause(); 
		}
		this.data.push(object);
	} else {
		console.log("Object is exist");
	}
};
History.prototype.forward = function(othis){
	// check screen current is screen forward
	if(othis.key === this.data[this.data.length -1].key){
		return;
	}
	this.current().hide();
	if(this.current().key === ELCommon.VOD || this.current().key === ELCommon.TV){ // current is playing TV or Video
		this.current().back();
		this.pop();
	}
	var index = this.isExist(othis);
	// exist screen in list
	if(index !== -1){
		// check exist screen child
		if((index+1) < this.data.length && this.data[index + 1].key.indexOf("SUB") >= 0){
			this.data[index + 1].back();
			this.pop(index+1);
		}
		index = this.isExist(othis);
		// remove screen from list
		this.pop(index);
		// add end list
		this.push(othis);
		// reinit screen
		othis.show();
		othis.focus();
	} else {
		othis.init();
	}
}
History.prototype.pop = function(){
	if(this.data.length > 0 && arguments.length === 0){
		this.data.pop();
	} else if(this.data.length > 0){
		this.data.splice(arguments[0], 1);
	}
};
History.prototype.back = function(){
	if(this.data.length > 0){
		var index =  this.data.length - 1;
		if(typeof(this.data[index].back) === "function"){			
			this.data[index].back();
		}
		this.pop();
		index = this.data.length - 1;
		if(index >= 0){
			this.data[index].show();
			this.data[index].focus();
		} 
	}
}
History.prototype.destroyAll = function(){
	var length = this.data.length;
	for(var i = length - 1; i >= 0; i--){
		if(typeof(this.data[i]) === "object"){
			this.data[i].hide();
			if(typeof(this.data[i].unload) === "function"){
				this.data[i].unload();
			}
		}
	}
};
