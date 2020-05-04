/**
 * @author DangTM
 * ELCOM CORP
 */
eSubtitle = {
	element: '', // element show subtitle
	container: '', // container show content subtitle 
	data:{}, // container object: {context:OBJECT, element: '', container: '', items:[{path:'', subtitle_id:'', langid:''}]}
	subtitles:[], // container content in file subtitle
	subtitleIndex: 0, // index subtitle current
	currentSubtitle: -1, // position subtitle show on screen in subtitles array
	indexSubtitle: 0
};
/**
 * Initial subtitle
 * @param object {context:OBJECT, element: '', container: '', items:[{path:'', subtitle_id:'', langid:''}]}
 */
eSubtitle.init = function(object){
	var _=this;
	_.subtitles = [];
	_.currentSubtitle = -1;
	_.clear();
	_.data = object || {context: eVideoSS, element: '.control-subtitle', container: '#subtitle', items:[]};
	_.getSubTitle(_.data.context.options.id);
	
}
eSubtitle.getSubTitle = function(id) {
	var _ = this;
	$.ajax({
		url : API.getAPI().CMD_5 + id,
		data : "",
		cache : false,
		type : 'GET',
		async : false,
		success : function(response) {
			var data = JSON.parse(response);
			var length = data.length;
			for(var i = 0; i < length; i++){
				var obj = new Object();
				obj.langid = data[i].langid;
				obj.path = data[i].url_lang;
				obj.name = data[i].name_lang;
				obj.id = data[i].id;
				_.data.items.push(obj);
			}
			if(_.data.items.length > 0){
				_.getSrt(_.data.items[0].path);
			}
		},
		error : function(error) {
		}
	});
}
eSubtitle.focus = function(){
	if ($('.popover').length > 0) {
		$('.popover .popover-content').find('input:checked').focus();
	}
}
eSubtitle.hide = function(){
	if ($('.popover').length > 0) {
		$(this.data.element).popover('toggle');
	}
}
/**
 * 
 * @param currentTime(seconds)
 */
eSubtitle.addSubTitle = function(currentTime){
	var _ = this;
	var index = -1;
	for(var i = 0; i < _.subtitles.length; i++) {
	  if(_.subtitles[i].timeFrom > currentTime){
		break;
	  }
	  index = i;
	}
	if(index > 0) {
	  if(index != _.currentSubtitle) {
		  _.addSub(_.subtitles[index].text);
		  _.currentSubtitle=index;
	  } else if(_.subtitles[index].timeTo < currentTime) {
		  _.clear();
	  }
   }
}
eSubtitle.addSub = function(text){
	$(this.data.container).html(text);
}
eSubtitle.clear = function(){
	$(this.data.container).html("");
	this.indexSubtitle = 0;
}
eSubtitle.show = function(){
	var _ = this;
	_.container =  $('<div></div>');
	var popOverSettings = {
		placement : 'top',
		html : true,
		container : _.data.element,
		selector : '[rel="popover"]',
		content : function() {
			if (_.data.items.length > 0) {
				for(var i = 0; i < _.data.items.length; i++){
					var input = '<div class="radio">'
						  +  '<label style="color:#000"><input onclick="" onkeydown="eSubtitle.keyDownRadio(event, this)" data-lang="'+ _.data.items[i].langid+'" tabindex="'+(i+1)+'" type="radio" data-url="'+ _.data.items[i].path+'" name="optradio">'+ _.data.items[i].name +'</label>'
						  +'</div>';
					_.container.append(input);
				}
				return _.container.html();
			} else {
				return '<div style="color:#000">'+language.TEXT_SUBTITLE_CONTENT+'</div>';
			}
		},
		title : function() {
			return language.TEXT_SUBTITLE;
		}
	};
	$(_.data.element).popover(popOverSettings);
	$(_.data.element).popover('toggle');
	// set language default
	$('.popover .popover-content').find('input[tabindex="'+( _.indexSubtitle+1)+'"]').prop("checked", true);
}
eSubtitle.getSrt = function(url){
	var _=this;
	$.ajax({
		  url: url,
		  dataType: 'text',
		  async: true, 
		  cache: true,
		  success: function(data){
			  var srt;
			  srt = data.replace(/\r\n|\r|\n/g, '\n');
			  srt = _.strip(srt);
			  _.subtitles = [];
			  _.currentSubtitle = -1;
			  var arrSrt = srt.split('\n\n');
			  for(s in arrSrt) {
				  var st = arrSrt[s].split('\n');
				  if(st.length >=2) {
					var n = st[0];
					var i = _.strip(st[1].split(' --> ')[0]);
					var o = _.strip(st[1].split(' --> ')[1]);
					var t = '';//st[2];
					for(j = 2; j < st.length; j++){
						t += st[j]+'</br>';
					}
					is = _.timeToSeconds(i);
					os = _.timeToSeconds(o);
					var obj = new Object();
					obj.timeFrom = is;
					obj.timeTo = os;
					obj.text = t;
					_.subtitles.push(obj);
				  }
			  }
		  }, error: function(error){
			  console.log('Error get ' + url);
		  }
	  });
}
eSubtitle.strip = function(s) {
	try {
		return s.replace(/^\s+|\s+$/g,"");
	} catch(e){
		return "";
	}
}
eSubtitle.timeToSeconds = function(t){
	var s = 0.0;
    if(t) {
      var p = t.split(':');
      for(i=0; i< p.length; i++)
        s = s * 60 + parseFloat(p[i].replace(',', '.'))
    }
    return s;
}
eSubtitle.keyDownRadio = function(event, $this){
	event.preventDefault();
	event.stopImmediatePropagation();
	var _ = this;
	_.data.context.slidebar.show();
	var keyCode = event.keyCode;
	switch (keyCode) {
		case eCommon.KEY_DOWN:
			var tabindex = Number($($this).attr('tabindex'));
			if(tabindex < _.data.items.length){
				$('.popover .popover-content').find('input[tabindex="' + (tabindex + 1) + '"]').prop('checked', true);
				$('.popover .popover-content').find('input[tabindex="' + (tabindex + 1) + '"]').focus();
			} else {
				_.data.context.slidebar.focus();
			}
			break;
		case eCommon.KEY_UP:
			var tabindex = Number($($this).attr('tabindex'));
			if(tabindex > 1){
				$('.popover .popover-content').find('input[tabindex="' + (tabindex - 1) + '"]').prop('checked', true);
				$('.popover .popover-content').find('input[tabindex="' + (tabindex - 1) + '"]').focus();
			}
			break;
		case eCommon.KEY_ENTER:
			var url = $($this).attr("data-url");
			var tabindex = Number($($this).attr('tabindex'));
			_.indexSubtitle = tabindex - 1;
			_.getSrt(url);
			break;
	}
}
