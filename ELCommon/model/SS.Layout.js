/*
@author dangtm Elcom HCM Corp
*/
eLayout = {
};
eLayout.welcomeHtml = function () {
	var tmp = '<nav class=" navbar-fixed-top" role="navigation">'
		+ '      <div class="row logo col-lg-4" style="margin-top: 20px;">'
		+ '          <div class="col-xs-12 col-sm-12 text-center">'
		+ '            		<img class="img-logo" style = "magin-top:10px; width:300px; height:100px" src = "ELCommon/view/images/ic_SojoLogo.png" alt="logo_ehotel">'
		+ '       		</div>'
		+ '       </div>'
		//    +'       <div class="col-lg-4 text-center">'
		//    +'          <button type="button" class="btn ehotel-name-room" style="height: 55px; font-weight:bolder">ROOM</button>'
		//    +'       </div>'
		// + '       <div class="col-lg-4">'
		// + '           <div class="media" style="float:right; margin-top: 5px;">'
		// + '             <div class="media-left media-middle">'
		// + '               <a href="javascript:void()">'
		// + '                 <img class="media-object" style="width:14px" src="ELCommon/view/images/ic_temperature.png" alt="temperature">'
		// + '               </a>'
		// + '             </div>'
		// + '             <div class="media-body media-middle">'
		// + '               <h5 class="media-heading color-white temp-max">Max:&nbsp;32&deg;C</h5>'
		// + '               <h5 class="media-heading color-white temp-min">Min:&nbsp;25&deg;C</h5>'
		// + '             </div>'
		// + '           </div>'
		// + '       </div>'
		+ ' </nav>'
		+ ' <div class="container-fluid" sty>'
		+ '       <div class="row-fluid">'
		+ '           <div class="centering text-left">'
		// + '               <div class="container-welcome">'
		// + ' 				</div>'
		+ '                   <div style="margin-left: 50px; margin-top:100px">'
		+ '                       <h3 class=" media-heading textcolor text-center" style="text-align:left; font-weight: 400; font-size:45px; margin-bottom:10px; margin-top: 10px;"><span class = "ehotel-name-welcome"></span> <span class = "sojo-textcolor" style="text-align:left; font-weight: 400; font-size:45px; margin-bottom:10px; margin-top: 10px;">oi</span> </h3>'
		//+ '						<h3 class="media-heading color-white text-center " style=" float: left; font-family: Arial, Helvetica, sans-serif; text-align:left; font-weight: 400; font-size:45px; margin-bottom:10px; margin-top: 10px;">Tuan</h3>'
		//+ '						<h3 class="media-heading color-white text-center " style="float: left ;font-family: Arial, Helvetica, sans-serif; text-align:left; font-weight: 400; font-size:45px; margin-bottom:10px; margin-top: 10px;"></h3>'
		+ '                       <h3 class="sojo-textcolor text-center text-welcome_01" style=" text-align:left; font-weight: 400; font-size:45px; margin-bottom:10px; margin-top: 0px;"></h3>'
		+ '                       <h3 class="sojo-textcolor text-center text-welcome_02" style=" text-align:left; font-weight: 400; font-size:45px; margin-bottom:10px; margin-top: 0px;"></h3>'
		+ '                   </div>'
		//    +'               </div>'
		//    +'           	<div class="row-flag">'
		//    +'               </div>'
		+ '            </div>'
		+ '       </div>'
		+ '<nav class="navbar-fixed-bottom" style="height: 80px" role="navigation">'
		+ '    <div class="centering text-center" style="margin-left: 70px">'
		+ '      <div class="row logo col-lg-3" >'
		+ '             <div class="column media-left">'
		+ '               <span class="nav-lang-room sojo-textcolor">ROOM </span> <span class = "name-room textcolor">101</span>'
		+ '             </div>'
		+ '       </div>'
		+ '      <div class="row logo col-lg-3" >'
		+ '             <div class="column media-right  media-middle" style="margin-top: 10px;">'
		+ '               <img class = "navbar-weathericon img-weather" style="height: 25px;"  src="ELCommon/view/images/ic_cloud.png"></img>'
		+ '             </div>'
		+ '             <div class="column media-right media-middle">'
		+ '               <span class=" textcolor temp">32&deg;C</span>'
		+ '             </div>'
		+ '       </div>'
		+ '      <div class="row logo col-lg-3" >'
		+ '			  <div class="column media-left media-middle">'
		+ '               <img class = "navbar-clock" src="ELCommon/view/images/ic_clock.png"></img>'
		+ '             </div>'
		+ '             <div class="column media-left media-middle">'
		+ '               <span class="sojo-textcolor ehotel-time-room">10:35</span>'
		+ '             </div>'
		// + '             <div class="column media-left media-middle">'
		// + '               <span id="amWel" class="color-white " style="font-size: 20px; display: none"><sup>AM<sup></span>'
		// + '               <span id="pmWel" class="color-white " style="font-size: 20px; display: none" ><sub>PM<sub></span>'
		// + '             </div>'
		+ '       </div>'
		+ '      <div class="row logo col-lg-4">'
		+ '             <div class="column media-left media-middle" >'
		+ '               <h4 class="textcolor ehotel-date-room">Tue,Feb 15th 2018</h4>'
		+ '             </div>'
		+ '       </div>'
		+ '   </div>'
		+ ' </nav>'
		+ ' </div>';
	return tmp;
}
eLayout.standbyHtml = function () {
	var tmp = '<nav class=" navbar-fixed-top" role="navigation" style="margin-top: 20px;">'
		+ '      <div class="row logo col-lg-4" >'
		+ '          <div class="col-xs-12 col-sm-12 text-center">'
		+ '            		<img class="img-logo" style = "magin-top:10px; width:300px; height:100px" alt="logo_ehotel">'
		+ '       		</div>'
		+ '       </div>'
		+ '      <div class="row logo col-lg-5" style="margin-left: 100px; margin-top: 10px;">'
		+ '             <div class="column media-center media-middle text-right" >'
		+ '               <h6 class="marquee nav-lang-city sojo-textcolor" style = "font-size:20px" >NAM DINH CITY</h6>'
		+ '             </div>'
		+ '             <div class="column media-center media-middle text-right">'
		+ '               <h6 class="ehotel-date-room-standby sojo-textcolor" style="font-size:35px">Tue,Feb 15th 2018</h6>'
		+ '             </div>'
		+ '       </div>'
		+ '      <div class="row logo col-lg-1" style="margin-left: 5px; margin-right: 5px;">'
		// + '          <div class="text-center">'
		// + '            		<img class="logo__nav" style = "width:95px; height:90px" src = "ELCommon/view/images/ic_SojoAavatar.png" alt="logo_ehotel">'
		// + '       		</div>'
		+ '       </div>'
		+ '      <div class="row logo col-lg-2"  style="margin-top: 5px;margin-left: 10px;">'
		+ '			  <div class="column media-right media-middle">'
		+ '               <img class = "navbar-clock" style = "height:50px; width:50px" src="ELCommon/view/images/ic_clock.png"></img>'
		+ '             </div>'
		+ '             <div class="column media-right media-middle">'
		+ '               <span class="sojo-textcolor ehotel-time-room" style="font-size: 50px">10:35</span>'
		+ '             </div>'
		+ '             <div class="column media-right media-middle">'
		// + '               <span id="amStand" class="color-white " style="display: none"><sup>AM<sup></span>'
		// + '               <span id="pmStand" class="color-white " style="display: none" ><sub>PM<sub></span>'
		+ '             </div>'
		+ '       </div>'
		+ ' </nav>'
		+ ' <div class="container-fluid">'
		+ '       <div class="row-fluid" style="padding-top: 30px;">'
		+ '            <div class="col-md-5  text-right" style="right: 30px;">'
		+ '               <div>'
		+ '                    <div class="col-md-6 media-center  media-middle" style="float:left">'
		+ '                        <span class=" textcolor temp-min" style="font-size: 25px">25&deg</span> <span class=" sojo-textcolor temp-max" style="font-size: 25px">32&deg</span><span class="textcolor" style="font-size: 25px">C</span>'
		+ '                    </div>'
		+ '                    <div class="col-md-6 media-center media-middle">'
		+ '                        <span class="nav-lang-today sojo-textcolor" style="font-size: 30px">TODAY</span>'
		+ '                    </div>'
		+ '               </div>'
		+ '               <div style="float: right;height: 125px;">'
		+ '                    <div class="col-md-6 media-center media-middle"  style="top: 25px;">'
		+ '                         <img class = "navbar-weathericon img-weather"  src="ELCommon/view/images/ic_cloud_rainnew.png" style="width:150px;height:80px;margin-right: 20px;"></img>'
		+ '                    </div>'
		+ '                    <div class="col-md-6 media-center media-middle">'
		+ '                        <span class=" sojo-textcolor temp-avg" style="font-size: 80px">31&deg</span><span class=" textcolor" style="font-size: 80px">C</span>'
		+ '                    </div>'
		+ '               </div>'
		+ '               <div style="margin-left: 240px;">'
		+ '                    <div class="column media-right  media-middle" style="margin-top: 10px;">'
		+ '                        <img class = "navbar-weathericon "  src="ELCommon/view/images/ic_water.png"></img>'
		+ '                    </div>'
		+ '                    <div class="column media-right media-middle">'
		+ '                        <span class=" sojo-textcolor humidity" style="font-size: 25px">75%</span>'
		+ '                    </div>'
		+ '                    <div class="column media-right  media-middle" style="margin-top: 10px;margin-top: 10px;padding-left: 30px;">'
		+ '                        <img class = "navbar-weathericon "  src="ELCommon/view/images/ic_wind.png"></img>'
		+ '                    </div>'
		+ '                    <div class="column media-right media-middle">'
		+ '                        <span class=" sojo-textcolor winSpeed" style="font-size: 25px">4 m/s</span>'
		+ '                    </div>'
		+ '               </div>'
		+ '            </div>'
		//+'  		   <div class="col-md-2  text-right"></div>'
		+ '            <div class="col-md-6  text-right" style="left: 50px;">'
		+ '               <div>'
		// + '                    <div class="col-md-6 media-center  media-middle" style="float:left">'
		// + '                        <span class=" textcolor temp-min" style="font-size: 30px">32&deg</span> <span class=" textcolor temp-max" style="font-size: 30px">32&deg;C</span>'
		// + '                    </div>'
		+ '                    <div class="col-md-6 media-center media-middle" style="float:right">'
		+ '                        <span class="nav-lang-tomorrow sojo-textcolor" style="font-size: 30px">TOMOROW</span>'
		+ '                    </div>'
		+ '               </div>'
		+ '               <div style="float: right;height: 125px;">'
		+ '                    <div class="col-md-3 media-center media-middle" style="top: 25px;" >'
		+ '                         <img class = "navbar-weathericon img-weather-tomorow"  src="ELCommon/view/images/ic_cloud_rainnew.png" style="width:150px; height:80px"></img>'
		+ '                    </div>'
		+ '                    <div class="col-md-9 media-center media-middle">'
		+ '                        <span class=" textcolor temp-min-tomorow" style="font-size: 80px">27&deg</span> <span class=" sojo-textcolor temp-max-tomorow" style="font-size: 80px">33&deg</span><span class=" textcolor" style="font-size: 80px">C</span>'
		+ '                    </div>'
		+ '               </div>'
		+ '               <div style="margin-left: 340px;">'
		+ '                    <div class="column media-right  media-middle" style="margin-top: 10px;">'
		+ '                        <img class = "navbar-weathericon "  src="ELCommon/view/images/ic_water.png"></img>'
		+ '                    </div>'
		+ '                    <div class="column media-right media-middle">'
		+ '                        <span class=" sojo-textcolor humidity-tomorow" style="font-size: 25px">70%</span>'
		+ '                    </div>'
		+ '                    <div class="column media-right  media-middle" style="margin-top: 10px; padding-left: 30px;">'
		+ '                        <img class = "navbar-weathericon "  src="ELCommon/view/images/ic_wind.png"></img>'
		+ '                    </div>'
		+ '                    <div class="column media-right media-middle">'
		+ '                        <span class=" sojo-textcolor winSpeed-tomorow" style="font-size: 25px">3 m/s</span>'
		+ '                    </div>'
		+ '               </div>'
		+ '            </div>'
		//+ '				<marquee class = "sojo-promotion sojo-textcolor" width="100%" direction="left" >This is a sample scrolling text that has scrolls texts to left.</marquee>'
		+ '       </div>'
		+'	</div>';

	return tmp;
}
eLayout.menuHtml = function (obj) {
	var tmp = '<div class="col-md-3">'
		+ '     <a href="javascript:void()" class="thumbnail" data-url="' + obj.url + '" data-id="' + obj.id + '" data-title="' + eCommon.htmlToText(obj.title) + '" data-service="' + obj.serviceCode + '" tabindex="' + obj.index + '" onclick="' + obj.clazz + '.itemClick(this, event)" onKeyDown="' + obj.clazz + '.keyDown(this, event)" >'
		+ '     	 <div class="caption">'
		+ '       <h4>' + eCommon.htmlToText(obj.title) + '</h4>'
		+ '    </div>'
		+ '          <img src="' + API.getAPI().LOCATION_IMAGE.concat(obj.image) + '" alt="">'
		+ '        </a>'
		+ '</div>';
	return tmp;
}
eLayout.moviesDetail = function (obj) {
	var star = '';
	var star_half = '<i class="fa fa-star-half-o" aria-hidden="true"></i> ';
	var rate = 5 - Number(obj.rate);
	if (rate === 0) {
		for (var i = 0; i < 5; i++) {
			star += '<i class="fa fa-star" aria-hidden="true"></i> ';
		}
	} else {
		for (var i = 0; i < parseInit(obj.rate); i++) {
			star += '<i class="fa fa-star" aria-hidden="true"></i> ';
		}
		if (eCommon.isInt(obj.rate)) {
			for (var i = 0; i < 5 - parseInit(obj.rate); i++) {
				star += '<i class="fa fa-star-o" aria-hidden="true"></i> ';
			}
		} else {
			var haft = 5 - Number(obj.rate);
			if (haft < 1) {
				star += '<i class="fa fa-star-half-o" aria-hidden="true"></i> ';
			} else {
				star += '<i class="fa fa-star-half-o" aria-hidden="true"></i> ';
				for (var i = 0; i < 5 - parseInit(obj.rate); i++) {
					star += '<i class="fa fa-star-o" aria-hidden="true"></i> ';
				}
			}
		}
	}
	var button = '<button type="button" data-type="play" data-id="' + obj.id + '" onclick="' + obj.classes + '.buttonClick(this, event)" onkeydown="' + obj.classes + '.keyDown(this, event)" tabindex="1" class="btn btn-default btn-ctrl"><i class="fa fa-play" aria-hidden="true"></i> Xem Phim</button> '
		+ '<button type="button" id="episode-popover" data-episodes="' + obj.episodes + '" data-type="episodes" data-id="' + obj.id + '" onclick="' + obj.classes + '.buttonClick(this, event)" onkeydown="' + obj.classes + '.keyDown(this, event)" tabindex="2" class="btn btn-default btn-ctrl"><i class="fa fa-empire" aria-hidden="true"></i> Tập Phim</button> '
		+ '<button type="button" data-type="error"  data-id="' + obj.id + '" onclick="' + obj.classes + '.buttonClick(this, event)" onkeydown="' + obj.classes + '.keyDown(this, event)" tabindex="3" class="btn btn-default btn-ctrl"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Báo Lỗi</button> '
		+ '<button type="button" data-type="favourite" data-id="' + obj.id + '" onclick="' + obj.classes + '.buttonClick(this, event)" onkeydown="' + obj.classes + '.keyDown(this, event)" tabindex="4" class="btn btn-default btn-ctrl"><i class="fa fa-heart" aria-hidden="true"></i> Yêu Thích</button> ';
	if (Number(obj.episodes) == 1) {
		button = '<button type="button" data-type="play" data-id="' + obj.id + '" onclick="' + obj.classes + '.buttonClick(this, event)" onkeydown="' + obj.classes + '.keyDown(this, event)" tabindex="1" class="btn btn-default btn-ctrl"><i class="fa fa-play" aria-hidden="true"></i> Xem Phim</button> '
			+ '<button type="button" data-type="error" data-id="' + obj.id + '" onclick="' + obj.classes + '.buttonClick(this, event)" onkeydown="' + obj.classes + '.keyDown(this, event)" tabindex="2" class="btn btn-default btn-ctrl"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Báo Lỗi</button> '
			+ '<button type="button" data-type="favourite" data-id="' + obj.id + '" onclick="' + obj.classes + '.buttonClick(this, event)" onkeydown="' + obj.classes + '.keyDown(this, event)" tabindex="3" class="btn btn-default btn-ctrl"><i class="fa fa-heart" aria-hidden="true"></i> Yêu Thích</button> ';
	}
	var ui = '<div class="movies-detail row">'
		+ ' <div class="col-md-2 poster">'
		+ ' 	<img src="' + obj.image + '"/>'
		+ ' </div>'
		+ ' <div class="col-md-10">'
		+ ' 	<div class="movies-header-detail">'
		+ ' 		<div class="col-md-7">'
		+ '     		<h4 class="title">' + obj.title + '</h4>'
		+ '     	</div>'
		+ '     	<div class="col-md-5">'
		+ '     		<h5 class="movies-rate-star">' + star
		+ '     		</h5>'
		+ '     	</div>'
		+ ' 	</div>'
		+ ' 	<div class="col-md-12 movies-detail-content">'
		+ ' 		<div class="col-md-6">'
		+ '     		<form class="form-horizontal">'
		+ '			  <div class="form-group">'
		+ '			    <label for="" class="col-sm-3 control-label">Thời gian</label>'
		+ '			    <div class="col-sm-9">'
		+ '			       <h5>' + obj.duration + '</h5>'
		+ '			    </div>'
		+ '			  </div>'
		+ '			  <div class="form-group">'
		+ '			    <label for="" class="col-sm-3 control-label">Thể loai</label>'
		+ '			    <div class="col-sm-9">'
		+ '			       <h5>' + obj.category + '</h5>'
		+ '			    </div>'
		+ '			  </div>'
		+ '			  <div class="form-group">'
		+ '			    <label for="" class="col-sm-3 control-label">Diễn viên</label>'
		+ '			    <div class="col-sm-9">'
		+ '			      <h5>' + obj.actors + '</h5>'
		+ '			    </div>'
		+ '			  </div>'
		+ '			  <div class="form-group">'
		+ '			    <label for="" class="col-sm-3 control-label">Đạo diễn</label>'
		+ '			    <div class="col-sm-9">'
		+ '			      <h5>' + obj.director + '</h5>'
		+ '			    </div>'
		+ '			  </div>'
		+ '			   <div class="form-group">'
		+ '			    <label for="" class="col-sm-3 control-label">Quốc gia</label>'
		+ '			    <div class="col-sm-9">'
		+ '			      <h5>' + obj.nation + '</h5>'
		+ '			    </div>'
		+ '			  </div>'
		+ '			  <div class="form-group">'
		+ '			    <label for="" class="col-sm-3 control-label">Xuất bản</label>'
		+ '			    <div class="col-sm-9">'
		+ '			      <h5>' + obj.publish + '</h5>'
		+ '			    </div>'
		+ '			  </div>'
		+ '			</form>'
		+ '    	</div>'
		+ '     	<div class="col-md-6 movies-desciption">'
		+ '     		<div class="description-content">'
		+ '         		<h5>' + obj.description + '</h5>'
		+ '    		</div>'
		+ '     		<div class="btn-control">' + button
		+ '     		</div>'
		+ '     	</div>'
		+ ' 	</div> '
		+ ' </div>'
		+ '</div>'
		+ '<div class="navbar-fixed-bottom movies-relation">'
		+ '	<h4>Phim liên quan</h4>'
		+ '	<div>'
		+ '		<div id="movies-relation" class="slide-relation">'
		+ '			<ul></ul>'
		+ '		</div>'
		+ '		<div class="hidden">'
		+ '			<button class="prev"></button>'
		+ '			<button class="next"></button>'
		+ '		</div>'
		+ '	</div>'
		+ '</div>';
	return ui;
}
eLayout.itemExchangeRate = function (obj) {
	var ui = '<li class="">'
		+ '	<div class="thumbnail" data-buy="' + obj.buy + '" data-tranfer=' + obj.tranfer + ' data-sale="' + obj.sale
		+ '" data-code="' + obj.code + '" data-title="' + eCommon.htmlToText(obj.name) + '" data-id="' + obj.id + '" tabindex="' + obj.index + '" data-icon="' + API.getAPI().LOCATION_IMAGE.concat(obj.icon)
		+ '" onKeyDown="' + obj.classes + '.keyDown()" onclick="' + obj.classes + '.clickItem(this)">'
		+ '      <img data-status="0" src="' + API.getAPI().LOCATION_IMAGE.concat(obj.image) + '">'
		//  +'      	<div class="title-item">'
		//  +'        	<h6 style="text-align:center">'+eCommon.htmlToText(obj.name)+'</h4>'
		//  +'        </div>'
		+ '    </div>'
		+ '</li>';
	return ui;
}
eLayout.itemExchangeRateText = function (obj) {
	var ui = '<li class="">'
		+ '    <div class="parent-title-item"><div class="title-item">'
		+ '      <h6 style="text-align:center">' + eCommon.htmlToText(obj.name) + '</h4>'
		+ '    </div></div>'
		+ '</li>';
	return ui;
}
eLayout.relateVideo = function (obj) {
	var ui = '<li class="">'
		+ '	<div class="thumbnail" data-url="' + obj.url + '" data-title="' + eCommon.htmlToText(obj.name) + '" data-id="' + obj.id + '" tabindex="' + obj.index
		+ '" onKeyDown="' + obj.classes + '.slideKeyDown(this, event)" onclick="' + obj.classes + '.itemClick(this, event)">'
		+ '      <img data-status="0" src="' + API.getAPI().LOCATION_IMAGE.concat(obj.image) + '">'
		+ '       <div class="title-item">'
		+ '        	<h6 style="text-align:center">' + eCommon.htmlToText(obj.name) + '</h4>'
		+ '       </div>'
		+ '  </div>'
		+ '</li>';
	return ui;
}
eLayout.relateVideoText = function (obj) {
	var ui = '<li class="">'
		+ '    <div class="parent-title-item"><div class="title-item">'
		+ '      <h6 style="text-align:center">' + eCommon.htmlToText(obj.name) + '</h4>'
		+ '    </div></div>'
		+ '</li>';
	return ui;
}
eLayout.subject = function (obj, classes) {
	var ui = '<li class="">'
		+ '	<div class="thumbnail" data-code="' + obj.code + '" data-title="' + eCommon.htmlToText(obj.name) + '" data-id="' + obj.id + '" tabindex="' + obj.index + '" data-url="' + obj.url
		+ '" onKeyDown="' + classes + '.subjectKeyDown(this, event)" onclick="' + classes + '.subjectClick(this, event)">'
		+ '      <img data-status="0" src="' + API.getAPI().LOCATION_IMAGE.concat(obj.image) + '">'
		+ '       <div class="title-item">'
		+ '        	<h6 style="text-align:center">' + eCommon.htmlToText(obj.name) + '</h4>'
		+ '       </div>'
		+ '  </div>'
		+ '</li>';
	return ui;
}
eLayout.subjectText = function (name) {
	var ui = '<li class="">'
		+ '    <div class="parent-title-item"><div class="title-item">'
		+ '      <h6 style="text-align:center">' + eCommon.htmlToText(name) + '</h4>'
		+ '    </div></div>'
		+ '</li>';
	return ui;
}
eLayout.subjectWeather = function (obj) {
	var ui = '<li class="">'
		+ '	<div class="thumbnail" data-code="' + obj.code + '" data-title="' + eCommon.htmlToText(obj.name) + '" data-id="' + obj.id + '" tabindex="' + obj.index + '" data-icon="' + API.getAPI().LOCATION_IMAGE.concat(obj.icon)
		+ '" onKeyDown="' + obj.classes + '.keyDown()" onclick="' + obj.classes + '.clickItem(this)">'
		+ '      <img data-status="0" src="' + API.getAPI().LOCATION_IMAGE.concat(obj.image) + '">'
		//  +'      <div class="title-item">'
		//  +'        	<h6 style="text-align:center">'+eCommon.htmlToText(obj.name)+'</h6>'
		//  +'      </div>'
		+ '  </div>'
		+ '</li>';
	return ui;
}
eLayout.subjectTextWeather = function (obj) {
	var ui = '<li class="">'
		+ '    <div class="parent-title-item"><div class="title-item">'
		+ '      <h6 style="text-align:center">' + eCommon.htmlToText(obj.name) + '</h4>'
		+ '    </div></div>'
		+ '</li>';
	return ui;
}
eLayout.itemWeatherLarge = function (obj, countryName) {
	var ui = '<div>'
		+ '		<span class="col-md-4" style="color: white; font-size: 18px;padding:0px">' + obj.weekdays.toUpperCase() + '</span>'
		+ '		<span class="col-md-8" style="color: orange; font-size: 18px;text-align:right">' + countryName + '</span>'
		+ '	</div>'
		+ '	<div class="col-md-12" style="text-align:center">'
		+ '		<span style="color: white; font-size: 24px">' + obj.tempmin + '&deg;C - ' + obj.tempmax + '&deg;C</span>'
		+ '	</div>'
		+ '	<div class="col-md-12" style="height: 180px; text-align: center;">'
		+ '		<img height="150px" style="margin-top:15px" src="' + API.getAPI().LOCATION_IMAGE + obj.urlImage + '">'
		+ '	</div>'
		+ '	<div class="col-md-12" style="text-align:center;color: white;font-size:17px;font-weight: bolder;  vertical-align: middle; overflow: hidden; display: -webkit-box; text-overflow: ellipsis; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">' + obj.description + '</div>';
	return ui;
}

eLayout.itemWeather = function (obj) {
	var ui = '<div style="text-align:center">'
		+ '		<span style="color: white; font-size: 14px">' + obj.weekdays + '</span>'
		+ '	</div>'
		+ '	<div class="col-md-12" style="height: 115px; text-align: center;">'
		+ '		<img height="80px" width="100%" style="margin-top:15px" src="' + API.getAPI().LOCATION_IMAGE + obj.urlImage + '">'
		+ '	</div>'
		+ '	<div class="col-md-12 text-center">'
		+ '		<span>' + obj.description + '</span>'
		+ '	</div>'
		+ '	<div class="col-md-12">'
		+ '		<span style="float: left;">Min:</span>'
		+ '		<span style="float: right;">' + obj.tempmin + '&deg;C</span>	'
		+ '	</div>'
		+ '	<div class="col-md-12">'
		+ '		<span style="float: left;">Max:</span>	'
		+ '		<span style="float: right;">' + obj.tempmax + '&deg;C</span>	'
		+ '	</div>';
	return ui;
}
eLayout.billHtml = function (option) {
	var tmp = '<li tabindex="' + option.index + '" data-id="' + option.id + '" class="list-group-item color-white" style="padding:5px" onKeyDown="eBill.keyDown()">'
		+ '<div class="row">'
		+ '<div class="col-md-1">'
		+ '<p class="bill-no">' + (option.index - 1) + '</p>'
		+ '</div>'
		+ '<div class="col-md-2">'
		+ '<p class="bill-date">' + option.istartdate + '</p>'
		+ '<p class="bill-hour">' + option.istarttime + '</p>'
		+ '</div>'
		+ '<div class="col-md-6">'
		+ '<p class="media-heading color-white">' + eCommon.htmlToText(option.itemcode) + '</p>'
		+ '</div>'
		+ '<div class="col-md-1">'
		+ '<p class="bill-quality">' + option.iqty + '</p>'
		+ '</div>'
		+ '<div class="col-md-2">'
		+ '<p class="bill-amount">' + eFood.formatCurrentcy(option.iamount, 0) + ' ' + option.iunit + '</p>'
		+ '</div>'
		+ '</div>'
		+ '</li>';
	return tmp;
}
eLayout.itemBillTotal = function (obj) {
	var ui = '<div class="col-lg-4 text-left">'
		+ '<span class="glyphicon glyphicon-user"></span>'
		+ '<span class="txt-user">' + obj.itemcode + '</span>'
		+ '</div>'
		+ '<div class="col-lg-4 text-center txt-quantity">Quantity Total: ' + eFood.formatCurrentcyUnit(obj.iqty, 0) + '</div>'
		+ '<div class="col-lg-4 text-right txt-amount">Amount Total: ' + obj.iamount + '</div>';
	return ui;
}
eLayout.itemBill = function (obj) {
	var ui = '<tr>'
		+ '<td width="10%">' + obj.index + '</td>'
		+ '<td width="30%" class="text-left">' + obj.istartdate + ' ' + obj.istarttime + '</td>'
		+ '<td width="40%" class="text-left">' + obj.itemcode + '</td>'
		+ '<td width="30%" class="text-right">' + obj.iamount + ' ' + obj.iunit + '</td>'
		+ '</tr>';
	return ui;
}
eLayout.contentExchangeRate = function (obj) {
	var ui = '<div class="row content-exchange-rate centering">'
		+ '<div>'
		+ '<div style="float: left;">'
		+ '<img width="150px" height="100px" src="' + API.getAPI().LOCATION_IMAGE.concat(obj.icon) + '">'
		+ '</div>'
		+ '<div style="float: left; width: auto; padding-left: 20px;height:100px; font-size: 24px">'
		+ obj.code + '<br>' + '(' + eCommon.htmlToText(obj.name) + ')'
		+ '</div>'
		+ '</div>'
		+ '<table style="width:80%; margin-left: 20%; font-size: 20px">'
		+ '<tr>'
		+ '<td width="50%">Buy</td>'
		+ '<td width="30%">' + obj.buy + '</td>'
		+ '<td width="20%">VND</td>'
		+ '</tr>'
		+ '<tr>'
		+ '<td>Tranfer</td>'
		+ '<td>' + obj.tranfer + '</td>'
		+ '<td>VND</td>'
		+ '</tr>'
		+ '<tr>'
		+ '<td>Sale</td>'
		+ '<td>' + obj.sale + '</td>'
		+ '<td>VND</td>'
		+ '</tr>'
		+ '</table>'
		+ '</div>'
	return ui;
}
eLayout.promotionHtml = function (index, option) {
	var tmp = '<div><div tabindex="' + index + '" class="media" style="width: 100%; overflow: hidden;">'
		+ '    <div class="media-left" style="width:90px; width: 100%; overflow: hidden;"></div>'
		+ '     <div class="media-body" style="width: 100%; overflow: hidden;">'
		+ '       <h5 class="media-heading color-white">' + eCommon.htmlToText(option.title) + '</h5>'
		+ '      <div class="media-heading color-white"><span>' + eCommon.htmlToText(option.def) + '</span></div>'
		+ '     </div>'
		+ '  </div>'
		+ '</div>';
	return tmp;
}
eLayout.menuDetailHtml = function (option) {
	var tmp = '<div class="row" style="margin-left:10px; margin-right:10px">'
		+ '<div class="col-md-5 col-lg-5 text-right">'
		+ '<div class="movie-disc" style="margin-top: 65px;">'
		+ '<div class="movie-avatar">'
		+ '<div class="movie-avatar-img">'
		+ '<img style="height: 370px;" src="' + option.poster + '">'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="col-md-7 col-lg-7 color-white" style="font-size:20px">'
		+ '<h2 class="title-film color-white">' + option.title + '</h2>'
		+ '<div class="row">'
		+ '<div class="col-md-2">Productor</div>'
		+ '<div class="col-md-1">:</div>'
		+ '<div class="col-md-8">' + option.productor + '</div>'
		+ '</div>'
		+ '<div class="row">'
		+ '<div class="col-md-2">Director</div>'
		+ '<div class="col-md-1">:</div>'
		+ '<div class="col-md-8">' + option.director + '</div>'
		+ '</div>'
		+ '<div class="row">'
		+ '	<div class="col-md-2">Actors</div>'
		+ '<div class="col-md-1">:</div>'
		+ '	<div class="col-md-8">' + option.actors + '</div>'
		+ '</div>'
		+ '<div class="row">'
		+ '	<div class="col-md-2">Time</div>'
		+ '<div class="col-md-1">:</div>'
		+ '	<div class="col-md-8">' + option.time + ' </div>'
		+ '</div>'
		+ '<div class="row">'
		+ '	<div class="col-md-2">Age</div>'
		+ '<div class="col-md-1">:</div>'
		+ '	<div class="col-md-8"><span class="label label-success">' + option.age + '+</span></div>'
		+ '</div>'
		+ '<div class="row">'
		+ '	<div class="col-md-2">Rating</div>'
		+ '<div class="col-md-1">:</div>'
		+ '	<div class="col-md-8">'
		+ '<i class="fa fa-star color-yellow"></i>'
		+ '<i class="fa fa-star color-yellow"></i>'
		+ '<i class="fa fa-star color-yellow"></i>'
		+ '<i class="fa fa-star color-yellow"></i>'
		+ '<i class="fa fa-star-half-o color-yellow"></i>'
		+ '</div>'
		+ '</div>'
		+ '<div id="scroll-detail" style="height:160px; overflow-y:auto;">'
		+ '		<p class="color-white" style="font-size:20px">' + option.plot + '</p></div>'
		+ '<div class="text-center" style="margin-top:10px">'
		+ '<button type="button" class="btn btn-warning"><i class="fa fa-money"></i> ' + option.price + ' ' + option.iunit + '</button>'
		+ ' <a tabindex="1" href="javascript:void()" class="btn btn-success" onKeyDown="eHotelMoviesDetail.keyDown()"><i class="fa fa-play"></i> PLAY <i class="fa fa-film"></i></a>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
	return tmp;
}
eLayout.messageHtml = function (index, option) {
	var tmp = '<li tabindex="' + index + '" data-id="' + option.id + '" class="list-group-item color-white" style="padding:5px" onKeyDown="' + option.classes + '.keyDown()">'
		+ '<div class="media">'
		+ '<div class="media-left media-middle">'
		+ '	  <img class="media-object" style="width:30px; margin-top:-10px" src="' + option.thumbnail + '">'
		+ '</div>'
		+ '<div class="media-body media-left media-middle" style="width:100%;padding-left: 15px;">'
		+ '<h5 class="media-heading color-white">' + eCommon.htmlToText(option.subject) + '</h5>'
		//	  +'<p>'+ eCommon.htmlToText(option.content)+'</p>'
		+ '</div>'
		+ '<div class="media-right media-middle">'
		+ '<span>' + option.shortDate + '</span>'
		+ '</div>'
		+ '</div>'
		+ '</li>';
	return tmp;
}

eLayout.messagePanelHtml = function (obj) {
	var tmp = '<div style="padding:	10px">'
		+ '	<div class="row">'
		+ '		<div class="col-md-6"><h5 class="color-white">From : ' + obj.sender + '</h4></div>'
		+ '		<div class="col-md-6 text-right"><h5 class="color-white"><i class="fa fa-calendar"></i> ' + obj.date + ' <i class="fa fa-clock-o"></i> ' + obj.time + '</h4></div>'
		+ '	</div>'
		+ '	<a href="javascript:void()" id="message-content" onKeyDown="' + obj.classes + '.messageKeyDown()" style="text-decoration:none;"><div id="msg-text" class="msg-text">' + eCommon.htmlToText(eCommon.htmlToText(eCommon.htmlToText(obj.content))) + '</div></a>'
		+ '</div>';
	return tmp;
}
eLayout.promotion = function (obj) {
	$('#promotion-text-calc').text(obj.content);
	var width = $('#promotion-text-calc').width();
	var classes = '';
	if (width > 900) {
		classes = 'promotion-slow';
	}

	var tmp = '<li><div data-url="' + obj.url + '" class="media" style="margin-left: 30px;">'
		+ '  <div class="navbar-fixed-bottom" style="color: #2AD1C8;font-family: sojofont;font-size: 25px;">'
		// + '    <h5 class="color-white">' + obj.title + '</h5>'
		+ '    <marquee width="100%" direction="left" height="40px" scrollamount="5" class="sojo-colortext' + classes + '">' + obj.content + '</marquee>'
		+ '  </div>'
		+ '</div></li>';
	return tmp;
}
eLayout.itemFood = function (option, className) {
	var tmp = '<li tabindex="' + option.index + '" data-id="' + option.id + '" class="list-group-item color-white" onclick="' + className + '.foodClick(this, event)" onKeyDown="' + className + '.foodKeyDown(this, event)">'
		+ '<div class="media">'
		+ '<div class="media-left media-middle">'
		+ '  <a href="javascript:void()">'
		+ '	<img class="media-object" style="width:100px; height:70px" src="' + API.getAPI().LOCATION_IMAGE.concat(option.image) + '">'
		+ '  </a>'
		+ '</div>'
		+ '<div class="media-body media-middle text-left" style="width:100%">'
		+ '<h4 class="media-heading">' + eCommon.htmlToText(option.name) + '</h4>'
		+ '<p>' + eCommon.htmlToText(option.def).replace(/\\n/g, "<br\/>") + '</p>'
		+ '</div>'
		+ '<div class="media-right media-middle">'
		+ '<button type="button" class="btn">'
		+ eFood.formatCurrentcy(option.currency, 0) + ' ' + option.iunit + ' <span class="badge">' + option.count + '</span></button>'
		+ '</div>'
		+ '</div>'
		+ '</li>';
	return tmp;
}
eLayout.dinningPanelHtml = function () {
	var tmp = '<div class="panel panel-default" style="background:rgba(51,51,51,0.7);margin-bottom: 0px;">'
		+ '      <div class="panel-heading color-white" style="background: rgba(51,51,51,0.8); color: #fff; height: 45px; padding:5px 5px">'
		+ '        <div class="row">'
		+ '           <div class="col-lg-4 text-left">Name</div>'
		+ '           <div class="col-lg-4 text-center sub-name"></div>'
		+ '           <div class="col-lg-4 text-right">Price</div>'
		+ '        </div>'
		+ '      </div>'
		+ '      <div class="table-responsive">'
		+ '       <div style="height: 400px;overflow: auto;">'
		+ '			<ul class="list-group" style="margin: 10px;">'
		+ '			</ul>'
		+ '		 </div>'
		+ '	   </div>'
		+ '</div>';
	return tmp;
}
eLayout.orderedHtml = function (index, option) {
	var tmp = '<li tabindex="' + index + '" data-id="' + option.id + '" class="list-group-item" onKeyDown="eCard.keyDown()">'
		+ '<div class="media">'
		+ '<div class="media-left media-middle">'
		+ '<img class="media-object" style="width:70px; height:40px" src="' + API.getAPI().LOCATION_IMAGE.concat(option.thumbnail) + '">'
		+ '</div>'
		+ '<div class="media-body media-middle text-left" style="width:100%">'
		+ '<h4 class="media-heading">' + eCommon.htmlToText(option.name) + '</h4>'
		+ '<p>' + eCommon.htmlToText(option.def) + '</p>'
		+ '</div>'
		+ '<div class="media-right media-middle">'
		+ '<button type="button" class="btn">'
		+ eFood.formatCurrentcy(option.currency, 0) + ' ' + option.iunit + ' <span class="badge">' + option.count + '</span></button>'
		+ '</div>'
		+ '</div>'
		+ '</li>';
	return tmp;
}
eLayout.menueHotelMusicHtml = function (obj) {
	var tmp = '<li><div style="padding-left:20px; border-bottom: 1px solid">'
		+ '	<div data-url="' + obj.url + '" data-title="' + eCommon.htmlToText(obj.title) + '" class="item-music row" tabindex="' + obj.index + '" onKeyDown="eHotelMusicPlayer.keyDown()">'
		+ '			<div class="col-md-2" style="margin:0px;">'
		+ '				<h5 class="color-white text-center text-number" style="margin-top:6.5px; margin-bottom:6.5px;">' + obj.index + '.' + '</h5>'
		+ '				<h5 class="text-center text-images hidden" style="margin-top:2.5px; margin-bottom:0px;"><img  style="width:35px; height:30px" src="images/music-play.gif" /></h5>'
		+ '			</div>'
		+ '		<div class="col-md-10" style="margin-left:-30px;">'
		+ '			<h5 class="color-white text-title" style="margin-top:6.5px; margin-bottom:6.5px;">' + eCommon.htmlToText(obj.title)
		+ '			</h5>'
		+ '		</div>'
		+ '  </div>'
		+ '</div></li>';

	return tmp;
}
eLayout.itemMusic = function (obj, className) {
	var tmp = '<li><div style="padding-left:0px;">'
		+ '	<div data-url="' + obj.url + '" data-title="' + eCommon.htmlToText(obj.title) + '" class="item-music row" tabindex="' + obj.index + '" onKeyDown="' + className + '.keyDown(this, event)" onclick="' + className + '.itemClick(this, event)">'
		+ '			<div class="col-md-2" style="margin:0px;padding-left:0px; padding-right:0px">'
		+ '				<h5 class="color-white text-center text-number" style="margin-top:6.5px; margin-bottom:6.5px;">' + obj.index + '.' + '</h5>'
		+ '				<h5 class="text-center text-images hidden" style="margin-top:2.5px; margin-bottom:0px;"><img  style="width:35px; height:27px" src="ELCModule/view/images/music-play.gif" /></h5>'
		+ '			</div>'
		+ '		<div class="col-md-10" style="margin-left:-5px;padding-left: 0px;padding-right:5px;">'
		+ '			<h5 class="color-white text-title" style="margin-top:6.5px; margin-bottom:6.5px;">' + eCommon.htmlToText(obj.title)
		+ '			</h5>'
		+ '		</div>'
		+ '  </div>'
		+ '</div></li>';

	return tmp;
}
eLayout.menueHotelMusicHiddenHtml = function () {
	var tmp = '<div class="hidden" style="padding-left:20px">'
		+ '	<div class="item-music" tabindex="-1">'
		+ '		<h5 class="color-white" style="margin-top:6.5px; margin-bottom:6.5px">'
		+ '		</h5>'
		+ '  </div>'
		+ '</div>';

	return tmp;
}
eLayout.slideShowHtml = function () {
	var tmp = '<ul class="cb-slideshow">'
		+ '<li><span></span></li>'
		+ '<li><span></span></li>'
		+ '<li><span></span></li>'
		+ '<li><span></span></li>'
		+ '<li><span></span></li>'
		+ '<li><span></span></li>'
	'</ul>';
	return tmp;
}
eLayout.popoverHtml = function (option) {
	var tmp = '<div class="radio">'
		+ '<label style="color:#000"><input data-id="' + option.id + '" tabindex="' + option.index + '" type="radio" data-url="' + option.url + '" data-lang="' + option.langid + '" name="optradio">' + option.name + '</label>'
		+ '</div>';
	return tmp;
}
eLayout.playerMusicControl = function () {
	var tmp = '<div class="videocontrols" style="background:rgba(102,102,102,0.7)">' +
		'	<div class="videocontrols-seeker">' +
		'		<div class="videocontrols-loadingbar"></div>' +
		'		<div class="videocontrols-progressbar progressbar-color-' + 'blue' + '"></div>' +
		'		<div class="videocontrols-seekbar videocontrols-range">' +
		'			<div class="videocontrols-range-little range-little-' + 'pink' + '"></div>' +
		'		</div>' +
		'	</div>' +
		'	<div class="videocontrols-btn">' +
		'		<div class="videocontrols-play videocontrols-button vc-icon-play"></div>' +
		'		<div class="videocontrols-time">' +
		'			<span class="videocontrols-timer">00:00</span><span class="videocontrols-totaltime"> / 00:00</span>' +
		'		</div>' +
		'		<div class="videocontrols-title">' +
		'			<span></span>' +
		'		</div>' +
		'	</div>' +
		'</div>';

	return tmp;
}
eLayout.audioTag = function () {
	var tmp = '<audio id="audio-music">' +
		'<source src="" type="audio/mp3">' +
		'</audio>';
	return tmp;
}

eLayout.addOrderHTML = function () {
	var tmp = '<div class="col-md-6">'
		+ '<a tabindex="1" href="javascript:void()" onKeyDown="eHotelDinning.viewCardFocus()" role="button" class="btn btn-warning btn-block viewcard">'
		+ '	<i class="fa fa-cart-arrow-down"></i> View Card '
		+ '	<span class="badge badge-bottom">0</span>'
		+ '</a>'
		+ '</div>'
		+ '<div class="col-md-6">'
		+ '<a tabindex="0" href="javascript:void()" onKeyDown="eHotelDinning.checkOutFocus()" role="button" class="btn btn-warning btn-block checkoutcard">'
		+ '<i class="fa fa-check-square-o"></i> Checkout Order'
		+ '</a>'
		+ '</div>';
	return tmp;
}

eLayout.itemSlide = function (obj, className) {
	var ui = '<li>'
		+ '      <div class="caption">'
		+ '        	<div style="display: table-cell; vertical-align: middle;"><h4>' + eCommon.htmlToText(obj.name) + '</h4></div>'
		+ '      </div>'
		+ '	<div class="thumbnail" service-code="' + obj.serviceCode + '" data-type="' + obj.type + '" data-url="' + obj.url + '" data-title="' + eCommon.htmlToText(obj.name) + '" data-id="' + obj.id + '" tabindex="' + obj.index + '" onKeyDown="' + className + '.keyDown(this, event)" onclick="' + className + '.itemClick(this, event)">'
		+ '      <img data-status="0" src="' + API.getAPI().LOCATION_IMAGE.concat(obj.image) + '">'
		+ '    </div>'
		+ '</li>';
	return ui;
}
eLayout.itemChannel = function (obj, className) {
	var ui = '<div class="col-md-2x item-channel">'
		+ '  <div class="caption" onClick="' + className + '.captionClick(this, event)">'
		+ '        <div style="display: table-cell; vertical-align: middle;"><h4>' + eCommon.htmlToText(obj.name) + '</h4></div>'
		+ '  </div>'
		+ '	<div class="thumbnail" data-number="' + obj.channelNumber + '" data-index="' + obj.dataIndex + '" data-url="' + obj.url + '" data-title="' + eCommon.htmlToText(obj.name) + '" data-id="' + obj.id + '" tabindex="' + obj.index + '" onKeyDown="' + className + '.keyDown(this, event)" onclick="' + className + '.itemClick(this, event)">'
		+ '      <img style="height: 125px; width: 162px;" data-status="0" src="' + API.getAPI().LOCATION_IMAGE.concat(obj.image) + '">'
		+ '    </div>'
		+ '</div>';
	return ui;
}
eLayout.subjectSlide = function (obj, className) {
	var temp = '<div class="subject-slide" data-id="' + obj.id + '" tabindex="' + obj.index
		+ '" data-url="' + obj.url + '" onkeydown="' + className + '.subjectKeyDown(this, event)" onclick="' + className + '.subjectClick(this, event)">'
		+ '<div class="subject-icon"><div style="width:100%; height:100%"><img src="' + API.getAPI().LOCATION_IMAGE.concat(obj.image) + '"></div></div>'
		+ '<div class="subject-title" ><h4>' + obj.name + '</h4></div></div>';
	return temp;
}

eLayout.itemHtml = function (obj, className) {
	var tmp = '<li>' + '<div class="item-sub" data-id="' + obj.id
		+ '" tabindex="' + obj.index + '"  tabindex="' + obj.index
		+ '" onKeyDown="' + className + '.keyDown(this, event)" onclick="' + className + '.itemClick(this, event)">'
		+ '	<h5 class="color-white text-title">'
		+ eCommon.htmlToText(obj.name) + '	</h5>' + '</div>'
	'</li>';
	return tmp;
}