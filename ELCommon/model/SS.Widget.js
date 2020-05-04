Widget = {
	// null: haven't task
	TRANSPORTER : null, 
	
	// time transporter
	TRANSPORTER_TIME : 0, 

	// false: have not task, true: otherwise
	TRANSPORTER_STATUS : false, 
	
	// Widget id player vlc use play TV
	WIDGET_PLAYER_VLC: null, 
	
	// Widget id player default system
	WIDGET_PLAYER: null, 
	
	// Widget id image background
	WIDGET_BACKGROUND: null,
	
	// Widget id image view 3D
	WIDGET_IMAGE: null,
	
	// Widget id slide image background
	WIDGET_SLIDE: null,
	
	// Widget id control view
	WIDGET_CONTROL_VIEW: null,
	/**
	 * receive data from HDPlay
	 * @param response
	 */
	Response: function(response){
		console.log(response);
		this.TRANSPORTER = response;
	},
	writeDataFile: function(){
		if(eCommon.isAndroid()){
			var data = {"KEY": "VALUE"};
			var command = {"path" : "/data/local/ehotel/ehoteldata.json", "data" : JSON.stringify(data) , "isOverWrite" : true};
			Android.Utils_SetDataFile(JSON.stringify(command));
		}
	},
	readDataFile: function(){
		if(eCommon.isAndroid()){
			Android.Utils_GetDataFile("/data/local/ehotel/ehoteldata.json");
		}
	},
	/**
	 * load app from android
	 */
	loadApp: function(json){
//		{"package_name": com.google.android.youtube.googletv , "url_download": "http://elcom.ehotel.com:8383/youtube.apk"}
		if(eCommon.isTV()){
			Android.Sys_openApp(JSON.stringify(json));
		}
	},
	/**
	 * Receive data 
	 * @param response data read from file
	 */
	getDataFile: function(response){
		console.log('#############################Data read file:' + response);
//		this.TRANSPORTER = response;
	},
	/**
	 * Receive data
	 * @param response status save data down file 0: fail, 1: success
	 */
	setDataFile: function(response){
		console.log('##############################Status save file:' + response);
	},
	/**
	 * login app HDPlay
	 * @param data
	 * @param cookie
	 */
	Login: function(data, cookie){
		console.log(data);
		this.TRANSPORTER = cookie;
	},
	// receive Video ID from system
	saveVV_ID : function(id) {
		console.log('--> PLAYER ' + id);
		this.WIDGET_PLAYER = id;
	},
	// receive Image ID from system
	saveIV_ID : function(id) {
		console.log('--> IMAGE ' + id);
		this.WIDGET_BACKGROUND = id;
	},
	// receive Image 3D ID from system
	saveIV3D_ID : function(id) {
		console.log('--> IMAGE_3D ' + id);
		this.WIDGET_IMAGE = id;
	},
	// receive id control view
	saveFV_ID: function(id){
		console.log('--> SLIDE_3D ' + id);
		this.WIDGET_CONTROL_VIEW = id;
	},
	// event control init success
	successInit: function(){
		var _ =this;
		Player.init(Widget.WIDGET_PLAYER);
		_.imageViewShow(false);
		_.controlViewShow(false);
		_.setBehindControlView(false);
		_.backgroundShow(false);
		
	},
	// event control click event
	Recv_CVItemClicked: function(position){
		Audio.handleAlbum(Number(position));
	},
	// event control view set color
	Recv_CVSetColor: function(){
		
	},
	// event slide image 
	Recv_IVIndexCurrent: function(index){
		ELCMain.indexSlide = index;
		ELCMain.changeSlide(index);
		return index;
	},
	destroy: function(idWidget){
		if(eCommon.isAndroid()){
			var cmd = {id: idWidget};
			Android.View_remove(JSON.stringify(cmd));
		}
	},
	
	startSlide: function(images){
		if(eCommon.isAndroid()){
			Android.Slide_start(JSON.stringify(images));
		}
	},
	stopSlide: function(){
		if(eCommon.isAndroid()){
			Android.Slide_stop();
		}
	},
	clearCache: function(){
		if(eCommon.isAndroid()){
			Android.makingClearCache();
		}
	},
	clearCacheImage: function(){
		if(eCommon.isAndroid()){
			var cmd = {id: this.WIDGET_CONTROL_VIEW, value: true};
			Android.Cv_clearCache(JSON.stringify(cmd));
		}
	},
	initWidget: function(){
		if(eCommon.isAndroid()){
			var array = []
			// init player
			var cmd = {
				type: 'PLAYER',
				data:{
					type : 0, // 0: video default; 1: VLC
					x : 0,
					y : 0,
					"width" : 0,
					"height" : 0,
					visible: false
				}
			};
			array.push(cmd);
			// init IMAGE_3D
			var cmd = {
				type: "IMAGE_3D",
				data:{
					x : 550,
					y : 0,
					"width" : 43*16,
					"height" : 43*9
				}
			}
			array.push(cmd);
			// init SLIDE_3D
			var cmd = {
				type: "SLIDE_3D",
				data:{
					x : 480,
					y : 150,
					width : 45*16,
					height : 350,
					unSelectedBorderColor:'#FFFFFFFF',
					selectedBorderColor:'#FFFFFF00',
					widthItem: 250,
					heightItem: 280
				}
			}
			array.push(cmd);
			// init IMAGE
			var cmd = {
					type: "IMAGE",
					data: {
						x : 0,
						y : 0,
						"width" : $(window).width(),
						"height" : $(window).height()
					}
			}
			array.push(cmd);
			Android.AllViews_new(JSON.stringify(array));
		}
		
	},
	// kill process mediaserver FW after root
	SysKillProcess: function(){
		if(eCommon.isAndroid()){
			Android.Sys_KillProcess('/system/bin/mediaserver');
		}
	},
	/**
	 * 
	 * @param cmd 
	 */
	SysShell: function(cmd){
		if(eCommon.isAndroid()){
			Android.Sys_shell(cmd);
		}
	},
	/**
	 * Create new player with VLC
	 * @param obj {
			left : 0,
			top : 0,
			width : $(window).width(),
			height : $(window).width(),
			visible: false
		}
	 */
	PlayerVLC : function(obj) { // left, top, width, height, visible
		var _=this;
		if(_.WIDGET_PLAYER_VLC != null){
			return;
		}
		if(!eCommon.isAndroid()){
			return;
		}

		var opt = obj || {
			left : 0,
			top : 0,
			width : $(window).width(),
			height : $(window).width(),
			visible: false
		};
		var cmd = {
				type : 1,
				x : 0,
				y : 0,
				width : opt.width,
				height : opt.height,
				visible: opt.visible
			};
			Android.Vv_new(JSON.stringify(cmd));
			_.TRANSPORTER_TIME = setInterval(function() {
				if (_.TRANSPORTER != null) {
					clearInterval(_.TRANSPORTER_TIME);
					_.WIDGET_PLAYER_VLC = _.TRANSPORTER;
					_.TRANSPORTER = null;
				}
			}, 1);
	},
	
	/**
	 * 
	 * @param url
	 */
	getYoutubeUrl: function(url){
		this.TRANSPORTER = url;
	},
	getStreamYoutubeLink: function(url){
		if(eCommon.isAndroid()){
			Android.getStreamYoutubeLink(url);
		}
	},
	/**
	 * Create new Player video default
	 * @param obj {
			left : 0,
			top : 0,
			width : $(window).width(),
			height : $(window).width(),
			visible: true
		}
	 */
	Player : function(obj) { // left, top, width, height, visible
		var _=this;
		if(_.WIDGET_PLAYER != null){
			return;
		}
		if(!eCommon.isAndroid()){
			return;
		}
		var opt = obj || {
			left : 0,
			top : 0,
			width : $(window).width(),
			height : $(window).width(),
			visible: true
		};
		var cmd = {
			type : 0, // 0: video default; 1: VLC
			x : 0,
			y : 0,
			width : opt.width,
			height : opt.height,
			visible: opt.visible
		};
		Android.Vv_new(JSON.stringify(cmd));
//		_.TRANSPORTER_TIME = setInterval(function() {
//			if (_.TRANSPORTER != null) {
//				clearInterval(_.TRANSPORTER_TIME);
//				_.WIDGET_PLAYER = _.TRANSPORTER;
//				console.log("--> init PLAYER with id=" + _.TRANSPORTER);
//				_.TRANSPORTER = null;
//			}
//		}, 1);
	},
	/**
	 * get current position of video
	 * 
	 */
	getCurrentPosition : function(){
		if(eCommon.isAndroid()){
			Android.Vv_getCurrentPosition(this.WIDGET_PLAYER.toString());
		}
	},
	/**
	 * Event error when play video
	 */
	Recv_VVError: function(){
		if(eCommon.HISTORY.current().key == "PLAYER"){ // Play video movies or video music
			eVideo.error();
		} else if (eCommon.HISTORY.current().key == "TVPLAYER") {
			eTVPlayer.error();
		}

	},
	/**
	 * Event end video
	 */
	Recv_VVEnd: function(){
		if(eCommon.HISTORY.current().key == "TVPLAYER"){ // when play video nosignal eCommon.SCREEN == eCommon.TV
			eTVPlayer.error();
		} else if(eCommon.HISTORY.current().key == "PLAYER"){
			eVideo.end();
		}
	},
	/**
	 * Receive duration video milisecond
	 * @param duration
	 */
	Recv_VVDuration: function(duration){
		eVideo.getDuration(Number(duration)/1000); // parse to seconds
	},
	/**
	 * Receive time current of video milisecond
	 * @param current
	 */
	Recv_VVCurrentPosition: function(current){
		eVideo.timeupdate(Number(current)/1000);
	},
	/**
	 * Create new controlview
	 */
	initControlView : function(){
		var _= this;
		var cmd = {
			x : 480,
			y : 150,
			width : 45*16,
			height : 350,
			unSelectedBorderColor:'#FFFFFFFF',
			selectedBorderColor:'#FFFFFF00',
			widthItem: 250,
			heightItem: 280
		};
		if (eCommon.isAndroid()) {
			if(_.WIDGET_CONTROL_VIEW == null){
				Android.Cv_new(JSON.stringify(cmd));
				_.TRANSPORTER_TIME = setInterval(function() {
					if (_.TRANSPORTER != null) {
						clearInterval(_.TRANSPORTER_TIME);
						_.WIDGET_CONTROL_VIEW = _.TRANSPORTER;
						_.controlViewShow(false);
						_.setBehindControlView(false);
						console.log("--> init CONTROL VIEW " + _.TRANSPORTER);
						_.TRANSPORTER = null;
					}
				}, 1);
			} 
		}
	},
	/**
	 * 
	 */
	setBehindControlView: function(status){
		var _=this;
		if(eCommon.isAndroid()){
			var cmd = {"id": _.WIDGET_CONTROL_VIEW, "value": status};
			Android.Cv_behindWebView(JSON.stringify(cmd));
		}
	},
	/**
	 * set color select index 
	 */
	setColorCV: function(color){
		if(eCommon.isAndroid()){
			var cmd = {id: this.WIDGET_CONTROL_VIEW, value: color};
			Android.Cv_setSelectedColor(JSON.stringify(cmd));
		}
	},
	/**
	 * Show or Hide controlview 3D
	 * @param status
	 */
	controlViewShow: function(status){
		var _=this;
		if(eCommon.isAndroid()){
			var cmd = {id: _.WIDGET_CONTROL_VIEW, value: status};
			Android.Cv_setVisible(JSON.stringify(cmd));
		}
	},
	/**
	 * Set image control view
	 * @param arrayImage [{"name":"imagename", "image":"url", "id":"id", "desc":"linksub"}]
	 */
	setControlView: function(arrayImage){
		var cmd = {id: this.WIDGET_CONTROL_VIEW, items: arrayImage}
		if(eCommon.isAndroid()){
			this.controlViewShow(true);
			Android.Cv_setData(JSON.stringify(cmd));
		}
	},
	/**
	 * Set image index of control view
	 * @param index
	 */
	setIndexControlView: function(index){
		if(eCommon.isAndroid()){
			var cmd = {"id" : Widget.WIDGET_CONTROL_VIEW, "position" : index};
			Android.Cv_setPosition(JSON.stringify(cmd));
		}
	},
	/**
	 * Create new image view
	 */
	initImageView : function(){
		var _= this;
		var cmd = {
			x : 550,
			y : 0,
			"width" : 43*16,
			"height" : 43*9
		};
		if (eCommon.isAndroid()) {
			if(_.WIDGET_IMAGE == null){
				Android.Iv_new(JSON.stringify(cmd));
				_.TRANSPORTER_TIME = setInterval(function() {
					if (_.TRANSPORTER != null) {
						clearInterval(_.TRANSPORTER_TIME);
						_.WIDGET_IMAGE = _.TRANSPORTER;
						_.imageViewShow(false);
						console.log("--> init Image View " + _.TRANSPORTER);
						_.TRANSPORTER = null;
					}
				}, 1);
			} 
		}
	},
	/**
	 * Show or Hide image view
	 * @param status
	 */
	imageViewShow: function(status){
		var _=this;
		if(eCommon.isAndroid()){
			var cmd = {id: _.WIDGET_IMAGE, value: status};
			Android.Iv_setVisible(JSON.stringify(cmd));
		}
	},
	backgroundShow: function(status){
		var _=this;
		if(eCommon.isAndroid()){
			if(_.WIDGET_BACKGROUND == null){
				_.TRANSPORTER_TIME = setInterval(function() {
					if (_.WIDGET_BACKGROUND != null) {
						clearInterval(_.TRANSPORTER_TIME);
						var cmd = {id: _.WIDGET_BACKGROUND, value: status};
						Android.Iv_setVisible(JSON.stringify(cmd));
					}
				}, 1);
			}  else {
				var cmd = {id: _.WIDGET_BACKGROUND, value: status};
				Android.Iv_setVisible(JSON.stringify(cmd));
			}
			
		}
	},
	/**
	 * Set image for image view
	 * @param url
	 */
	setImageView: function(url){
		var _ = this;
		url = url || location.href.replace('/index.html', '').concat('/ELCModule_eu01/view/images/BG_3.png');
		if (eCommon.isAndroid()) {
//			_.imageViewShow(true);
			var cmd = {
				id : _.WIDGET_IMAGE,
				images : [url],
				"widthReflection" : 1,
				"relfectionGap" : 5, 
				"angle" : 15
			};
			Android.Iv_setImageReflection(JSON.stringify(cmd));
			
		}
	},
	setLoaded: function(){
		if(eCommon.isAndroid()){
			Android.Hidden_BlackPanel(1);
		}
	},
	setSlide: function(images){
	},
	showSlide: function(state){
		if(eCommon.isAndroid()){
//			if(this.WIDGET_SLIDE !== null){
//				var cmd = {id: this.WIDGET_SLIDE, value: state};
//				Android.Iv_setVisible(JSON.stringify(cmd));
//			}
			if(state){
				Android.Slide_resume();
			} else {
				Android.Slide_pause();
			}
		}
	},
	/**
	 * Set background
	 * @param obj
	 */
	setBackground : function(obj) { // left, top, width, height, urls
		var _ = this;
		var url = ELCAPI.getAPI().BACKGROUND;
		var opt = obj
				|| {
					left : 0,
					top : 0,
					width : $(window).width(),
					height : $(window).height(),
					urls : [ url ]
				};
		var cmd = {
			x : 0,
			y : 0,
			"width" : opt.width,
			"height" : opt.height
		};
		if (eCommon.isAndroid()) {
			if(_.WIDGET_BACKGROUND == null){
				_.TRANSPORTER_TIME = setInterval(function() {
					if (_.WIDGET_BACKGROUND != null) {
						clearInterval(_.TRANSPORTER_TIME);
						var cmd = {
							id : _.WIDGET_BACKGROUND,
							images : opt.urls
						};
						Android.Iv_setImage(JSON.stringify(cmd));
					}
				}, 1);
			} else {
				var cmd = {
					id : _.WIDGET_BACKGROUND,
					images : opt.urls
				};
				Android.Iv_setImage(JSON.stringify(cmd));
			}
			
		}

	}
}