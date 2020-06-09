API = (function(){ // open IIFE
	//var defaults = {host:'http://joso-api.e-hotel.vn', serial: eCommon.getSerialNumber() };
	var defaults = {host:'http://172.16.9.205:18383', serial: eCommon.getSerialNumber() };
	var init = function(option){
		var opt = $.extend({}, defaults, option);
		opt.serial = eCommon.getSerialNumber();
		// location image
		//this.LOCATION_IMAGE = 'http://joso-data.e-hotel.vn/Image';
		this.LOCATION_IMAGE = 'http://172.16.9.205:80/Image';
		// MY HOTEL
		this.HOTEL = 'E01';
		// MOVIES
		this.MOVIES = 'E03';
		// TELEVISION
		this.TV = 'E02';
		// MUSIC
		this.MUSIC = 'E04';
		// STAY
		this.STAY = 'E05';
		// MESSAGE
		this.MESSAGE= 'E06';
		// RESTAURANT
		this.RESTAURANT= 'E07';
		// NEWS
		this.NEWS= 'E08';
		// SERVICE
		this.SERVICE= 'E09';
		// INFOMATION
		this.INFORMATION= 'E10';
		// DAILY GUEST ACTIVITY
		this.ACTIVITY= 'E11';
		// TRANSPORTTATION
		this.TRANSPORT= 'E12';
		// BILL
		this.BILL= 'E13';
		// EXCHANGERATE
		this.EXCHANGE= 'E14';
		// IN ROOM DINNING
		this.DINNING= 'E15';
		// TENNIS
		this.TENNIS= 'E16';
		// LAUNDRY
		this.LAUNDRY= 'E17';
		// SPA
		this.SPA= 'E18';
		// WEATHER
		this.WEATHER = 'E23';

		
		this.CMD_R= opt.host + '/WAI_01/CoreMedia?command=49';
		
		this.CMD_00 = opt.host + '/ELCommon/language/text_';
		// get info welcome customer
		this.CMD_102 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&typetvbox=TV&command=102&keystb='+opt.serial+'';
		// get image slide
		this.CMD_103 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=103&keystb='+opt.serial+'&types=WELCOME';
		// get image slide music
		this.CMD_1030 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=103&keystb='+opt.serial+'&types=MUSIC';
		// get menu main
		this.CMD_104 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=104&keystb='+opt.serial+'@-1';
		// list subject film type=VOD; type=MOD get video music
		this.CMD_1 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=1&keystb='+opt.serial+'&type=VOD';
		// list film by subjectid
		this.CMD_2 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=2&keystb='+opt.serial+'&fromRow=-1&noRows=-1&subjectid=';
		// get subtitle film
		this.CMD_5 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=5&keystb='+opt.serial+'&contentid=';
		// get detail film
		this.CMD_3 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=3&keystb='+opt.serial+'&contentid=';
		// get list subject TV
		this.CMD_21 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=21&keystb='+opt.serial+'&subjectid=31&fromRow=-1&noRows=-1';
		// get channel by subject TV
		this.CMD_22 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&keystb='+opt.serial+'&command=22';
		// get item MUSIC
		this.CMD_1053 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=105&keystb='+opt.serial+'&serviceid=3';
		// get subject music by item
		this.CMD_11 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=11&keystb='+opt.serial+'';
		// get video music
		this.CMD_10 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=1&keystb='+opt.serial+'&type=MOD';
		// get music by subject id
		this.CMD_12 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=12&keystb='+opt.serial+'&fromRow=-1&noRows=-1&subjectid=';
		// get service + id service
		this.CMD_105 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=105&keystb='+opt.serial+'&serviceid=';
		// get restaurant
		this.CMD_10525 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=105&keystb='+opt.serial+'&serviceid=25';
		// get detail info
		this.CMD_106 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=106&keystb='+opt.serial+'&outletType=M&outletid=';
		// get subtitle
		this.CMD_5 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=5&keystb='+opt.serial+'&contentid=';
		// get list subject dinning
		this.CMD_107 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=107&keystb='+opt.serial+'&mainnenuid=-9012';
		// get detail subject dinning
		this.CMD_1071 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=107&keystb='+opt.serial+'&mainnenuid=';
		// list foods
		this.CMD_1072 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=108&keystb='+opt.serial+'&fromRow=-1&noRows=-1&submenuid=';
		// Order dinning
		this.CMD_114 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=114&keystb='+opt.serial+'&items=';
		// get language and welcome
		this.CMD_46 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=46&keystb='+opt.serial+'&ip=' + eCommon.IP_ADDR + '|' + eCommon.MAC_ADDR;
		//set language to get content
		this.CMD_31 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=31&keystb='+opt.serial+'&langid=';
		// get promotion
		this.CMD_116 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=116&keystb='+opt.serial+'';
		// get Message
		this.CMD_115 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=115&keystb='+opt.serial+'';
		// get detail message
		this.CMD_100 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&command=100&keystb='+opt.serial+'&messId=';
		// get Bill
		this.CMD_109 = opt.host + '/WAI_01/CoreMedia?command=109&keystb='+opt.serial+'';
		//get item city weather
		this.CMD_118 = opt.host + '/WAI_01/CoreMedia?command=118&keystb='+opt.serial+'';
		// get weather
		this.CMD_120 = opt.host + '/WAI_01/CoreMedia?command=120&keystb='+opt.serial+'&coutrid=';
		// get weather default
		this.CMD_119 = opt.host + '/WAI_01/CoreMedia?command=119&keystb='+opt.serial+'&day=';
		// get exchange rate
		this.CMD_117 = opt.host + '/WAI_01/CoreMedia?command=117&keystb='+opt.serial+'';
		// get Interaction
		this.CMD_24 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&keystb='+opt.serial+'&command=24';
		// get TV Message
		this.CMD_26 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&keystb='+opt.serial+'&command=26';
		// get Birth Day
		this.CMD_30 = opt.host + '/WAI_01/CoreMedia?typetvbox=TV&keystb='+opt.serial+'&command=30';
		// get Weather TODAY and TOMOROW
		this.CMD_125 = opt.host + '/WAI_01/CoreMedia?command=125&keystb='+opt.serial+'';
	};
	var instance = null;
	var static_ = {
		getAPI: function(options){
			if(instance == null){
				instance = new init(options);
			}
			return instance;
		}
	}
	return static_;
})();
