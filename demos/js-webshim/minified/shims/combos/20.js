(function(c,d,h){var n=d.audio&&d.video,t=!1,m=h.cfg.mediaelement,k=h.bugs,w="jwplayer"==m.player?"mediaelement-swf":"mediaelement-jaris",A=function(){h.ready(w,function(){if(!h.mediaelement.createSWF)h.mediaelement.loadSwf=!0,h.reTest([w],n)})},p;if(n){var r=document.createElement("video");d.videoBuffered="buffered"in r;t="loop"in r;h.capturingEvents("play,playing,waiting,paused,ended,durationchange,loadedmetadata,canplay,volumechange".split(","));d.videoBuffered||(h.addPolyfill("mediaelement-native-fix",
{f:"mediaelement",test:d.videoBuffered,d:["dom-support"]}),h.reTest("mediaelement-native-fix"))}if(n&&!m.preferFlash){var v=function(u){var d=u.target.parentNode;!m.preferFlash&&(c(u.target).is("audio, video")||d&&c("source:last",d)[0]==u.target)&&h.ready("DOM mediaelement",function(){p&&A();h.ready("WINDOWLOAD "+w,function(){setTimeout(function(){p&&!m.preferFlash&&h.mediaelement.createSWF&&!c(u.target).closest("audio, video").is(".nonnative-api-active")?(m.preferFlash=!0,document.removeEventListener("error",
v,!0),c("audio, video").mediaLoad(),h.info("switching mediaelements option to 'preferFlash', due to an error with native player: "+u.target.src)):p||document.removeEventListener("error",v,!0)},20)})})};document.addEventListener("error",v,!0);c("audio, video").each(function(){this.error&&v({target:this})})}k.track=!1;d.track&&function(){if(!k.track)k.track="number"!=typeof c("<track />")[0].readyState;if(!k.track)try{new TextTrackCue(2,3,"")}catch(u){k.track=!0}var d=h.cfg.track,m=function(d){c(d.target).filter("track").each(l)},
l=function(){if(k.track||!d.override&&3==c.prop(this,"readyState"))d.override=!0,h.reTest("track"),document.removeEventListener("error",m,!0),this&&c.nodeName(this,"track")?h.error("track support was overwritten. Please check your vtt including your vtt mime-type"):h.info("track support was overwritten. due to bad browser support")},n=function(){document.addEventListener("error",m,!0);k.track?l():c("track").each(l)};d.override||(h.isReady("track")?n():c(n))}();h.register("mediaelement-core",function(c,
j,h,l,s){p=swfobject.hasFlashPlayerVersion("9.0.115");var g=j.mediaelement,r=function(f,e){var f=c(f),d={src:f.attr("src")||"",elem:f,srcProp:f.prop("src")};if(!d.src)return d;var i=f.attr("type");if(i)d.type=i,d.container=c.trim(i.split(";")[0]);else if(e||(e=f[0].nodeName.toLowerCase(),"source"==e&&(e=(f.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),i=g.getTypeForSrc(d.src,e))d.type=i,d.container=i;if(i=f.attr("media"))d.media=i;return d},x=!p&&"postMessage"in h&&n,v=
function(){var f;return function(){!f&&x&&(f=!0,j.loader.loadScript("https://www.youtube.com/player_api"),c(function(){j.polyfill("mediaelement-yt")}))}}(),o=function(){p?A():v();c(function(){j.loader.loadList(["track-ui"])})};j.addPolyfill("mediaelement-yt",{test:!x,d:["dom-support"]});g.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":"mp4,mpg4,m4r,m4a,m4p,m4b,aac".split(","),"audio/wav":["wav"],"audio/3gpp":["3gp",
"3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}};g.mimeTypes.source=c.extend({},g.mimeTypes.audio,g.mimeTypes.video);
g.getTypeForSrc=function(f,e){if(-1!=f.indexOf("youtube.com/watch?")||-1!=f.indexOf("youtube.com/v/"))return"video/youtube";var f=f.split("?")[0].split("."),f=f[f.length-1],d;c.each(g.mimeTypes[e],function(c,e){if(-1!==e.indexOf(f))return d=c,!1});return d};g.srces=function(f,e){f=c(f);if(e)f.removeAttr("src").removeAttr("type").find("source").remove(),c.isArray(e)||(e=[e]),e.forEach(function(c){var e=l.createElement("source");"string"==typeof c&&(c={src:c});e.setAttribute("src",c.src);c.type&&e.setAttribute("type",
c.type);c.media&&e.setAttribute("media",c.media);f.append(e)});else{var e=[],d=f[0].nodeName.toLowerCase(),g=r(f,d);g.src?e.push(g):c("source",f).each(function(){g=r(this,d);g.src&&e.push(g)});return e}};c.fn.loadMediaSrc=function(f,e){return this.each(function(){e!==s&&(c(this).removeAttr("poster"),e&&c.attr(this,"poster",e));g.srces(this,f);c(this).mediaLoad()})};g.swfMimeTypes="video/3gpp,video/x-msvideo,video/quicktime,video/x-m4v,video/mp4,video/m4p,video/x-flv,video/flv,audio/mpeg,audio/aac,audio/mp4,audio/x-m4a,audio/m4a,audio/mp3,audio/x-fla,audio/fla,youtube/flv,jwplayer/jwplayer,video/youtube".split(",");
g.canThirdPlaySrces=function(f,e){var d="";if(p||x)f=c(f),e=e||g.srces(f),c.each(e,function(c,f){if(f.container&&f.src&&(p&&-1!=g.swfMimeTypes.indexOf(f.container)||x&&"video/youtube"==f.container))return d=f,!1});return d};var B={};g.canNativePlaySrces=function(f,e){var d="";if(n){var f=c(f),i=(f[0].nodeName||"").toLowerCase();if(!B[i])return d;e=e||g.srces(f);c.each(e,function(c,e){if(e.type&&B[i].prop._supvalue.call(f[0],e.type))return d=e,!1})}return d};g.setError=function(f,e){e||(e="can't play sources");
c(f).pause().data("mediaerror",e);j.warn("mediaelementError: "+e);setTimeout(function(){c(f).data("mediaerror")&&c(f).trigger("mediaerror")},1)};var E=function(){var f;return function(e,d,i){j.ready(p?w:"mediaelement-yt",function(){g.createSWF?g.createSWF(e,d,i):f||(f=!0,o(),E(e,d,i))});!f&&x&&!g.createSWF&&v();c(function(){j.loader.loadList(["track-ui"])})}}(),C=function(c,d,h,i,j){h||!1!==h&&d&&"third"==d.isActive?(h=g.canThirdPlaySrces(c,i))?E(c,h,d):j?g.setError(c,!1):C(c,d,!1,i,!0):(h=g.canNativePlaySrces(c,
i))?d&&"third"==d.isActive&&g.setActive(c,"html5",d):j?(g.setError(c,!1),d&&"third"==d.isActive&&g.setActive(c,"html5",d)):C(c,d,!0,i,!0)},H=/^(?:embed|object|datalist)$/i,y=function(d,e){var h=j.data(d,"mediaelementBase")||j.data(d,"mediaelementBase",{}),i=g.srces(d),k=d.parentNode;clearTimeout(h.loadTimer);c.data(d,"mediaerror",!1);if(i.length&&k&&!(1!=k.nodeType||H.test(k.nodeName||"")))e=e||j.data(d,"mediaelement"),C(d,e,m.preferFlash||s,i)};c(l).bind("ended",function(d){var e=j.data(d.target,
"mediaelement");(!t||e&&"html5"!=e.isActive||c.prop(d.target,"loop"))&&setTimeout(function(){!c.prop(d.target,"paused")&&c.prop(d.target,"loop")&&c(d.target).prop("currentTime",0).play()},1)});t||j.defineNodeNamesBooleanProperty(["audio","video"],"loop");["audio","video"].forEach(function(d){var e=j.defineNodeNameProperty(d,"load",{prop:{value:function(){var c=j.data(this,"mediaelement");y(this,c);n&&(!c||"html5"==c.isActive)&&e.prop._supvalue&&e.prop._supvalue.apply(this,arguments)}}});B[d]=j.defineNodeNameProperty(d,
"canPlayType",{prop:{value:function(e){var h="";n&&B[d].prop._supvalue&&(h=B[d].prop._supvalue.call(this,e),"no"==h&&(h=""));!h&&p&&(e=c.trim((e||"").split(";")[0]),-1!=g.swfMimeTypes.indexOf(e)&&(h="maybe"));return h}}})});j.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var c=this,d=j.data(c,"mediaelementBase")||j.data(c,"mediaelementBase",{});clearTimeout(d.loadTimer);d.loadTimer=setTimeout(function(){y(c);c=null},9)}});h=function(){j.addReady(function(d,e){c("video, audio",
d).add(e.filter("video, audio")).each(function(){c.browser.msie&&8<j.browserVersion&&c.prop(this,"paused")&&!c.prop(this,"readyState")&&c(this).is('audio[preload="none"][controls]:not([autoplay])')?c(this).prop("preload","metadata").mediaLoad():y(this);if(n){var d,e,f=this,g=function(){var d=c.prop(f,"buffered");if(d){for(var e="",g=0,h=d.length;g<h;g++)e+=d.end(g);return e}},h=function(){var d=g();d!=e&&(e=d,c(f).triggerHandler("progress"))};c(this).bind("play loadstart progress",function(c){"progress"==
c.type&&(e=g());clearTimeout(d);d=setTimeout(h,999)}).bind("emptied stalled mediaerror abort suspend",function(c){"emptied"==c.type&&(e=!1);clearTimeout(d)})}})})};d.track&&!k.track&&j.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}});n?(j.isReady("mediaelement-core",!0),h(),j.ready("WINDOWLOAD mediaelement",o)):j.ready(w,h);c(function(){l.getElementsByTagName("track")[0]&&j.loader.loadList(["track-ui"])})})})(jQuery,Modernizr,jQuery.webshims);
jQuery.webshims.register("mediaelement-swf",function(c,d,h,n,t,m){var k=d.mediaelement,w=h.swfobject,A=Modernizr.audio&&Modernizr.video,p=w.hasFlashPlayerVersion("9.0.115"),r=0,h={paused:!0,ended:!1,currentSrc:"",duration:h.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(a){if(a)d.error("buffered index size error");else return 0},end:function(a){if(a)d.error("buffered index size error");else return 0},length:0}},v=Object.keys(h),u={currentTime:0,volume:1,
muted:!1};Object.keys(u);var j=c.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,_metadata:!1,_durationCalcs:-1,_callMeta:!1,currentTime:0,_ppFlag:t},h,u),J=/^jwplayer-/,l=function(a){if(a=n.getElementById(a.replace(J,"")))return a=d.data(a,"mediaelement"),"third"==a.isActive?a:null},s=function(a){return(a=d.data(a,"mediaelement"))&&"third"==a.isActive?a:null},g=function(a,b){b=c.Event(b);b.preventDefault();c.event.trigger(b,t,a)},L=m.playerPath||d.cfg.basePath+
"jwplayer/"+(m.playerName||"player.swf"),x=m.pluginPath||d.cfg.basePath+"swf/jwwebshims.swf";d.extendUNDEFProp(m.params,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"});d.extendUNDEFProp(m.vars,{screencolor:"ffffffff"});d.extendUNDEFProp(m.attrs,{bgcolor:"#000000"});var G=function(a,b){var d=a.duration;if(!(d&&0<a._durationCalcs)){try{if(a.duration=a.jwapi.getPlaylist()[0].duration,!a.duration||0>=a.duration||a.duration===a._lastDuration)a.duration=d}catch(e){}a.duration&&
a.duration!=a._lastDuration?(g(a._elem,"durationchange"),("audio"==a._elemNodeName||a._callMeta)&&k.jwEvents.Model.META(c.extend({duration:a.duration},b),a),a._durationCalcs--):a._durationCalcs++}},o=function(a,b){3>a&&clearTimeout(b._canplaythroughTimer);if(3<=a&&3>b.readyState)b.readyState=a,g(b._elem,"canplay"),clearTimeout(b._canplaythroughTimer),b._canplaythroughTimer=setTimeout(function(){o(4,b)},4E3);if(4<=a&&4>b.readyState)b.readyState=a,g(b._elem,"canplaythrough");b.readyState=a};c.extend(c.event.customEvent,
{updatemediaelementdimensions:!0,flashblocker:!0,swfstageresize:!0,mediaelementapichange:!0});k.jwEvents={View:{PLAY:function(a){var b=l(a.id);if(b&&!b.stopPlayPause&&(b._ppFlag=!0,b.paused==a.state)){b.paused=!a.state;if(b.ended)b.ended=!1;g(b._elem,a.state?"play":"pause")}}},Model:{BUFFER:function(a){var b=l(a.id);if(b&&"percentage"in a&&b._bufferedEnd!=a.percentage){b.networkState=100==a.percentage?1:2;(isNaN(b.duration)||5<a.percentage&&25>a.percentage||100===a.percentage)&&G(b,a);if(b.ended)b.ended=
!1;if(b.duration){2<a.percentage&&20>a.percentage?o(3,b):20<a.percentage&&o(4,b);if(b._bufferedEnd&&b._bufferedEnd>a.percentage)b._bufferedStart=b.currentTime||0;b._bufferedEnd=a.percentage;b.buffered.length=1;if(100==a.percentage)b.networkState=1,o(4,b);c.event.trigger("progress",t,b._elem,!0)}}},META:function(a,b){if(b=b&&b.networkState?b:l(a.id))if("duration"in a){if(!b._metadata||!((!a.height||b.videoHeight==a.height)&&a.duration===b.duration)){b._metadata=!0;var c=b.duration;if(a.duration)b.duration=
a.duration;b._lastDuration=b.duration;if(a.height||a.width)b.videoHeight=a.height||0,b.videoWidth=a.width||0;if(!b.networkState)b.networkState=2;1>b.readyState&&o(1,b);b.duration&&c!==b.duration&&g(b._elem,"durationchange");g(b._elem,"loadedmetadata")}}else b._callMeta=!0},TIME:function(a){var b=l(a.id);if(b&&b.currentTime!==a.position){b.currentTime=a.position;b.duration&&b.duration<b.currentTime&&G(b,a);2>b.readyState&&o(2,b);if(b.ended)b.ended=!1;g(b._elem,"timeupdate")}},STATE:function(a){var b=
l(a.id);if(b)switch(a.newstate){case "BUFFERING":if(b.ended)b.ended=!1;o(1,b);g(b._elem,"waiting");break;case "PLAYING":b.paused=!1;b._ppFlag=!0;b.duration||G(b,a);3>b.readyState&&o(3,b);if(b.ended)b.ended=!1;g(b._elem,"playing");break;case "PAUSED":if(!b.paused&&!b.stopPlayPause)b.paused=!0,b._ppFlag=!0,g(b._elem,"pause");break;case "COMPLETED":4>b.readyState&&o(4,b),b.ended=!0,g(b._elem,"ended")}}},Controller:{ERROR:function(a){var b=l(a.id);b&&k.setError(b._elem,a.message)},SEEK:function(a){var b=
l(a.id);if(b){if(b.ended)b.ended=!1;if(b.paused)try{b.jwapi.sendEvent("play","false")}catch(c){}if(b.currentTime!=a.position)b.currentTime=a.position,g(b._elem,"timeupdate")}},VOLUME:function(a){var b=l(a.id);if(b&&(a=a.percentage/100,b.volume!=a))b.volume=a,g(b._elem,"volumechange")},MUTE:function(a){if(!a.state){var b=l(a.id);if(b&&b.muted!=a.state)b.muted=a.state,g(b._elem,"volumechange")}}}};var B=function(a){var b=!0;c.each(k.jwEvents,function(d,e){c.each(e,function(c){try{a.jwapi["add"+d+"Listener"](c,
"jQuery.webshims.mediaelement.jwEvents."+d+"."+c)}catch(e){return b=!1}})});return b},E=function(a){var b=a.actionQueue.length,c=0,d;if(b&&"third"==a.isActive)for(;a.actionQueue.length&&b>c;)c++,d=a.actionQueue.shift(),a.jwapi[d.fn].apply(a.jwapi,d.args);if(a.actionQueue.length)a.actionQueue=[]},C=function(a){a&&(a._ppFlag===t&&c.prop(a._elem,"autoplay")||!a.paused)&&setTimeout(function(){if("third"==a.isActive&&(a._ppFlag===t||!a.paused))try{c(a._elem).play()}catch(b){}},1)},H=function(a){if(a&&
"video"==a._elemNodeName){var b,d,e,f,g,q,h,j,i=function(i,z){if(z&&i&&!(1>z||1>i||"third"!=a.isActive))if(b&&(b.remove(),b=!1),f=i,g=z,clearTimeout(h),d="auto"==a._elem.style.width,e="auto"==a._elem.style.height,d||e){q=q||c(a._elem).getShadowElement();var k;d&&!e?(k=q.height(),i*=k/z,z=k):!d&&e&&(k=q.width(),z*=k/i,i=k);j=!0;setTimeout(function(){j=!1},9);q.css({width:i,height:z})}},k=function(){if(!("third"!=a.isActive||c.prop(a._elem,"readyState")&&c.prop(this,"videoWidth"))){var f=c.prop(a._elem,
"poster");if(f&&(d="auto"==a._elem.style.width,e="auto"==a._elem.style.height,d||e))b&&(b.remove(),b=!1),b=c('<img style="position: absolute; height: auto; width: auto; top: 0px; left: 0px; visibility: hidden;" />'),b.bind("load error alreadycomplete",function(){clearTimeout(h);var a=this,d=a.naturalWidth||a.width||a.offsetWidth,e=a.naturalHeight||a.height||a.offsetHeight;e&&d?(i(d,e),a=null):setTimeout(function(){d=a.naturalWidth||a.width||a.offsetWidth;e=a.naturalHeight||a.height||a.offsetHeight;
i(d,e);b&&(b.remove(),b=!1);a=null},9);c(this).unbind()}).prop("src",f).appendTo("body").each(function(){this.complete||this.error?c(this).triggerHandler("alreadycomplete"):(clearTimeout(h),h=setTimeout(function(){c(a._elem).triggerHandler("error")},9999))})}};c(a._elem).bind("loadedmetadata",function(){i(c.prop(this,"videoWidth"),c.prop(this,"videoHeight"))}).bind("emptied",k).bind("swfstageresize updatemediaelementdimensions",function(){j||i(f,g)}).bind("emptied",function(){f=void 0;g=void 0}).triggerHandler("swfstageresize");
k();c.prop(a._elem,"readyState")&&i(c.prop(a._elem,"videoWidth"),c.prop(a._elem,"videoHeight"))}};k.playerResize=function(a){a&&(a=n.getElementById(a.replace(J,"")))&&c(a).triggerHandler("swfstageresize")};c(n).bind("emptied",function(a){a=s(a.target);C(a)});var y;k.jwPlayerReady=function(a){var b=l(a.id),e=0,f=function(){if(!(9<e))if(e++,B(b)){if(b.wasSwfReady)c(b._elem).mediaLoad();else{var g=parseFloat(a.version,10);(5.1>g||6<=g)&&d.warn("mediaelement-swf is only testet with jwplayer 5.6+")}b.wasSwfReady=
!0;b.tryedReframeing=0;E(b);C(b)}else clearTimeout(b.reframeTimer),b.reframeTimer=setTimeout(f,9*e),2<e&&9>b.tryedReframeing&&(b.tryedReframeing++,b.shadowElem.css({overflow:"visible"}),setTimeout(function(){b.shadowElem.css({overflow:"hidden"})},16))};if(b&&b.jwapi){if(!b.tryedReframeing)b.tryedReframeing=0;clearTimeout(y);b.jwData=a;b.shadowElem.removeClass("flashblocker-assumed");c.prop(b._elem,"volume",b.volume);c.prop(b._elem,"muted",b.muted);f()}};var f=c.noop;if(A){var e={play:1,playing:1},
K="play,pause,playing,canplay,progress,waiting,ended,loadedmetadata,durationchange,emptied".split(","),i=K.map(function(a){return a+".webshimspolyfill"}).join(" "),M=function(a){var b=d.data(a.target,"mediaelement");b&&(a.originalEvent&&a.originalEvent.type===a.type)==("third"==b.activating)&&(a.stopImmediatePropagation(),e[a.type]&&b.isActive!=b.activating&&c(a.target).pause())},f=function(a){c(a).unbind(i).bind(i,M);K.forEach(function(b){d.moveToFirstEvent(a,b)})};f(n)}k.setActive=function(a,b,
e){e||(e=d.data(a,"mediaelement"));if(e&&e.isActive!=b){"html5"!=b&&"third"!=b&&d.warn("wrong type for mediaelement activating: "+b);var f=d.data(a,"shadowData");e.activating=b;c(a).pause();e.isActive=b;"third"==b?(f.shadowElement=f.shadowFocusElement=e.shadowElem[0],c(a).addClass("swf-api-active nonnative-api-active").hide().getShadowElement().show()):(c(a).removeClass("swf-api-active nonnative-api-active").show().getShadowElement().hide(),f.shadowElement=f.shadowFocusElement=!1);c(a).trigger("mediaelementapichange")}};
var N=function(){var a="_bufferedEnd,_bufferedStart,_metadata,_ppFlag,currentSrc,currentTime,duration,ended,networkState,paused,videoHeight,videoWidth,_callMeta,_durationCalcs".split(","),b=a.length;return function(c){if(c){var d=b,e=c.networkState;for(o(0,c);--d;)delete c[a[d]];c.actionQueue=[];c.buffered.length=0;e&&g(c._elem,"emptied")}}}(),I=function(a,b){var d=a._elem,e=a.shadowElem;c(d)[b?"addClass":"removeClass"]("webshims-controls");"audio"==a._elemNodeName&&!b?e.css({width:0,height:0}):e.css({width:d.style.width||
c(d).width(),height:d.style.height||c(d).height()})};k.createSWF=function(a,b,e){if(p){1>r?r=1:r++;var g=c.extend({},m.vars,{image:c.prop(a,"poster")||"",file:b.srcProp}),h=c(a).data("vars")||{};e||(e=d.data(a,"mediaelement"));if(e&&e.swfCreated)k.setActive(a,"third",e),N(e),e.currentSrc=b.srcProp,c.extend(g,h),m.changeSWF(g,a,b,e,"load"),D(a,"sendEvent",["LOAD",g]);else{var F=c.prop(a,"controls"),q="jwplayer-"+d.getID(a),i=c.extend({},m.params,c(a).data("params")),l=a.nodeName.toLowerCase(),n=c.extend({},
m.attrs,{name:q,id:q},c(a).data("attrs")),o=c('<div class="polyfill-'+l+' polyfill-mediaelement" id="wrapper-'+q+'"><div id="'+q+'"></div>').css({position:"relative",overflow:"hidden"}),e=d.data(a,"mediaelement",d.objectCreate(j,{actionQueue:{value:[]},shadowElem:{value:o},_elemNodeName:{value:l},_elem:{value:a},currentSrc:{value:b.srcProp},swfCreated:{value:!0},buffered:{value:{start:function(a){if(a>=e.buffered.length)d.error("buffered index size error");else return 0},end:function(a){if(a>=e.buffered.length)d.error("buffered index size error");
else return(e.duration-e._bufferedStart)*e._bufferedEnd/100+e._bufferedStart},length:0}}}));I(e,F);o.insertBefore(a);A&&c.extend(e,{volume:c.prop(a,"volume"),muted:c.prop(a,"muted")});c.extend(g,{id:q,controlbar:F?m.vars.controlbar||("video"==l?"over":"bottom"):"video"==l?"none":"bottom",icons:""+(F&&"video"==l)},h,{playerready:"jQuery.webshims.mediaelement.jwPlayerReady"});g.plugins=g.plugins?g.plugins+(","+x):x;d.addShadowDom(a,o);f(a);k.setActive(a,"third",e);m.changeSWF(g,a,b,e,"embed");c(a).bind("updatemediaelementdimensions updateshadowdom",
function(){I(e,c.prop(a,"controls"))});H(e);w.embedSWF(L,q,"100%","100%","9.0.0",!1,g,i,n,function(b){if(b.success)e.jwapi=b.ref,F||c(b.ref).attr("tabindex","-1").css("outline","none"),setTimeout(function(){if(!b.ref.parentNode&&o[0].parentNode||"none"==b.ref.style.display)o.addClass("flashblocker-assumed"),c(a).trigger("flashblocker"),d.warn("flashblocker assumed");c(b.ref).css({minHeight:"2px",minWidth:"2px",display:"block"})},9),y||(clearTimeout(y),y=setTimeout(function(){var a=c(b.ref);1<a[0].offsetWidth&&
1<a[0].offsetHeight&&0===location.protocol.indexOf("file:")?d.error("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html"):(2>a[0].offsetWidth||2>a[0].offsetHeight)&&d.warn("JS-SWF connection can't be established on hidden or unconnected flash objects")},8E3))})}}else setTimeout(function(){c(a).mediaLoad()},1)};var D=function(a,b,c,d){return(d=d||s(a))?(d.jwapi&&d.jwapi[b]?d.jwapi[b].apply(d.jwapi,
c||[]):(d.actionQueue.push({fn:b,args:c}),10<d.actionQueue.length&&setTimeout(function(){5<d.actionQueue.length&&d.actionQueue.shift()},99)),d):!1};["audio","video"].forEach(function(a){var b={},e,f=function(c){"audio"==a&&("videoHeight"==c||"videoWidth"==c)||(b[c]={get:function(){var a=s(this);return a?a[c]:A&&e[c].prop._supget?e[c].prop._supget.apply(this):j[c]},writeable:!1})},h=function(a,c){f(a);delete b[a].writeable;b[a].set=c};h("volume",function(a){var b=s(this);if(b){if(a*=100,!isNaN(a)){var c=
b.muted;(0>a||100<a)&&d.error("volume greater or less than allowed "+a/100);D(this,"sendEvent",["VOLUME",a],b);if(c)try{b.jwapi.sendEvent("mute","true")}catch(f){}a/=100;if(!(b.volume==a||"third"!=b.isActive))b.volume=a,g(b._elem,"volumechange")}}else if(e.volume.prop._supset)return e.volume.prop._supset.apply(this,arguments)});h("muted",function(a){var b=s(this);if(b){if(a=!!a,D(this,"sendEvent",["mute",""+a],b),!(b.muted==a||"third"!=b.isActive))b.muted=a,g(b._elem,"volumechange")}else if(e.muted.prop._supset)return e.muted.prop._supset.apply(this,
arguments)});h("currentTime",function(a){var b=s(this);if(b){if(a*=1,!isNaN(a)){if(b.paused)clearTimeout(b.stopPlayPause),b.stopPlayPause=setTimeout(function(){b.paused=!0;b.stopPlayPause=!1},50);D(this,"sendEvent",["SEEK",""+a],b);if(b.paused){if(0<b.readyState)b.currentTime=a,g(b._elem,"timeupdate");try{b.jwapi.sendEvent("play","false")}catch(c){}}}}else if(e.currentTime.prop._supset)return e.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(a){b[a]={value:function(){var b=
s(this);if(b)b.stopPlayPause&&clearTimeout(b.stopPlayPause),D(this,"sendEvent",["play","play"==a],b),setTimeout(function(){if("third"==b.isActive&&(b._ppFlag=!0,b.paused!=("play"!=a)))b.paused="play"!=a,g(b._elem,a)},1);else if(e[a].prop._supvalue)return e[a].prop._supvalue.apply(this,arguments)}}});v.forEach(f);d.onNodeNamesPropertyModify(a,"controls",function(b,e){var f=s(this);c(this)[e?"addClass":"removeClass"]("webshims-controls");if(f){try{D(this,e?"showControls":"hideControls",[a],f)}catch(g){d.warn("you need to generate a crossdomain.xml")}"audio"==
a&&I(f,e);c(f.jwapi).attr("tabindex",e?"0":"-1")}});e=d.defineNodeNameProperties(a,b,"prop")});if(p){var O=c.cleanData,P=c.browser.msie&&9>d.browserVersion,Q={object:1,OBJECT:1};c.cleanData=function(a){var b,c,d;if(a&&(c=a.length)&&r)for(b=0;b<c;b++)if(Q[a[b].nodeName]){if("sendEvent"in a[b]){r--;try{a[b].sendEvent("play",!1)}catch(e){}}if(P)try{for(d in a[b])"function"==typeof a[b][d]&&(a[b][d]=null)}catch(f){}}return O.apply(this,arguments)}}A||(["poster","src"].forEach(function(a){d.defineNodeNamesProperty("src"==
a?["audio","video","source"]:["video"],a,{reflect:!0,propType:"src"})}),["autoplay","controls"].forEach(function(a){d.defineNodeNamesBooleanProperty(["audio","video"],a)}),d.defineNodeNamesProperties(["audio","video"],{HAVE_CURRENT_DATA:{value:2},HAVE_ENOUGH_DATA:{value:4},HAVE_FUTURE_DATA:{value:3},HAVE_METADATA:{value:1},HAVE_NOTHING:{value:0},NETWORK_EMPTY:{value:0},NETWORK_IDLE:{value:1},NETWORK_LOADING:{value:2},NETWORK_NO_SOURCE:{value:3}},"prop"))});
