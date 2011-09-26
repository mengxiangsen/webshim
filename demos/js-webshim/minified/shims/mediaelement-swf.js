jQuery.webshims.register("mediaelement-swf",function(c,e,w,t,n,j){var f=e.mediaelement,z=w.swfobject,x=Modernizr.audio&&Modernizr.video,A=z.hasFlashPlayerVersion("9.0.115"),s=0,B={paused:!0,ended:!1,currentSrc:"",duration:w.NaN,readyState:0,networkState:0,videoHeight:0,videoWidth:0,error:null,buffered:{start:function(a){if(a)e.error("buffered index size error");else return 0},end:function(a){if(a)e.error("buffered index size error");else return 0},length:0}},K=Object.keys(B),C={currentTime:0,volume:1,
muted:!1};Object.keys(C);var D=c.extend({isActive:"html5",activating:"html5",wasSwfReady:!1,_bufferedEnd:0,_bufferedStart:0,_metadata:!1,_callMeta:!1,currentTime:0,_ppFlag:n},B,C),E=/^jwplayer-/,k=function(a){if(a=t.getElementById(a.replace(E,"")))return a=e.data(a,"mediaelement"),a.isActive=="flash"?a:null},l=function(a){return(a=e.data(a,"mediaelement"))&&a.isActive=="flash"?a:null},g=function(a,b){b=c.Event(b);b.preventDefault();c.event.trigger(b,n,a)},u,L=j.playerPath||e.cfg.basePath+"jwplayer/"+
(j.playerName||"player.swf"),F=j.pluginPath||e.cfg.basePath+"swf/jwwebshims.swf";e.extendUNDEFProp(j.jwParams,{allowscriptaccess:"always",allowfullscreen:"true",wmode:"transparent"});e.extendUNDEFProp(j.jwVars,{screencolor:"ffffffff"});e.extendUNDEFProp(j.jwAttrs,{bgcolor:"#000000"});var G=function(a,b){try{if(a.duration=a.jwapi.getPlaylist()[0].duration,!a.duration||a.duration<=0||a.duration===a._lastDuration)a.duration=w.NaN}catch(d){}a.duration&&(g(a._elem,"durationchange"),(a._elemNodeName=="audio"||
a._callMeta)&&f.jwEvents.Model.META(c.extend({duration:a.duration},b),a))};f.jwEvents={View:{PLAY:function(a){var b=k(a.id);if(b&&!b.stopPlayPause&&(b._ppFlag=!0,b.paused==a.state)){b.paused=!a.state;if(b.ended)b.ended=!1;g(b._elem,a.state?"play":"pause")}}},Model:{BUFFER:function(a){var b=k(a.id);if(b&&b._bufferedEnd!=a.percentage){b.networkState=a.percentage==100?1:2;b.duration||G(b,a);if(b.ended)b.ended=!1;if(b.duration){if(a.percentage>1&&b.readyState<3)b.readyState=3,g(b._elem,"canplay");if(b._bufferedEnd&&
b._bufferedEnd>a.percentage)b._bufferedStart=b.currentTime||0;b._bufferedEnd=a.percentage;b.buffered.length=1;if(a.percentage==100)b.networkState=1,b.readyState=4;c.event.trigger("progress",n,b._elem,!0)}}},META:function(a,b){if(b=b&&b.networkState?b:k(a.id))if("duration"in a){if(!b._metadata||a.height&&b.videoHeight!=a.height){b._metadata=!0;var d=b.duration;b.duration=a.duration;b._lastDuration=b.duration;b.videoHeight=a.height||0;b.videoWidth=a.width||0;if(!b.networkState)b.networkState=2;if(b.readyState<
1)b.readyState=1;d!==b.duration&&g(b._elem,"durationchange");g(b._elem,"loadedmetadata")}}else b._callMeta=!0},TIME:function(a){var b=k(a.id);if(b&&b.currentTime!==a.position){b.currentTime=a.position;if(b.readyState<2)b.readyState=2;if(b.ended)b.ended=!1;g(b._elem,"timeupdate")}},STATE:function(a){var b=k(a.id);if(b)switch(a.newstate){case "BUFFERING":if(b.readyState>1)b.readyState=1;if(b.ended)b.ended=!1;g(b._elem,"waiting");break;case "PLAYING":b.paused=!1;b._ppFlag=!0;b.duration||G(b,a);if(b.readyState<
3)b.readyState=3,g(b._elem,"canplay");if(b.ended)b.ended=!1;g(b._elem,"playing");break;case "PAUSED":if(!b.paused&&!b.stopPlayPause)b.paused=!0,b._ppFlag=!0,g(b._elem,"pause");break;case "COMPLETED":if(b.readyState<4)b.readyState=4;b.ended=!0;g(b._elem,"ended")}}},Controller:{ERROR:function(a){var b=k(a.id);b&&f.setError(b._elem,a.message)},SEEK:function(a){var b=k(a.id);if(b){if(b.ended)b.ended=!1;if(b.paused)try{b.jwapi.sendEvent("play","false")}catch(d){}if(b.currentTime!=a.position)b.currentTime=
a.position,g(b._elem,"timeupdate")}},VOLUME:function(a){var b=k(a.id);if(b&&(a=a.percentage/100,b.volume!=a))b.volume=a,g(b._elem,"volumechange")},MUTE:function(a){if(!u||!a.state){var b=k(a.id);if(b&&b.muted!=a.state)b.muted=a.state,g(b._elem,"volumechange")}}}};var M=function(a){c.each(f.jwEvents,function(b,d){c.each(d,function(d){a.jwapi["add"+b+"Listener"](d,"jQuery.webshims.mediaelement.jwEvents."+b+"."+d)})})},H=function(a){a&&(a._ppFlag===n&&c.prop(a._elem,"autoplay")||!a.paused)&&setTimeout(function(){if(a.isActive==
"flash"&&(a._ppFlag===n||!a.paused))try{c(a._elem).play()}catch(b){}},1)},N=function(a){if(a&&a._elemNodeName=="video"){var b,d,h,e,m,i,g,j,f=function(o,p){if(p&&o&&!(p<1||o<1||a.isActive!="flash"))if(b&&(b.remove(),b=!1),e=o,m=p,clearTimeout(g),d=a._elem.style.width=="auto",h=a._elem.style.height=="auto",d||h){i=i||c(a._elem).getShadowElement();var f;d&&!h?(f=i.height(),o*=f/p,p=f):!d&&h&&(f=i.width(),p*=f/o,o=f);j=!0;setTimeout(function(){j=!1},9);i.css({width:o,height:p})}},k=function(){if(!(a.isActive!=
"flash"||c.prop(a._elem,"readyState")&&c.prop(this,"videoWidth"))){var i=c.prop(a._elem,"poster");if(i&&(d=a._elem.style.width=="auto",h=a._elem.style.height=="auto",d||h))b&&(b.remove(),b=!1),b=c('<img style="position: absolute; height: auto; width: auto; top: 0px; left: 0px; visibility: hidden;" />'),b.bind("load error alreadycomplete",function(){clearTimeout(g);var a=this,d=a.naturalWidth||a.width||a.offsetWidth,i=a.naturalHeight||a.height||a.offsetHeight;i&&d?(f(d,i),a=null):setTimeout(function(){d=
a.naturalWidth||a.width||a.offsetWidth;i=a.naturalHeight||a.height||a.offsetHeight;f(d,i);b&&(b.remove(),b=!1);a=null},9);c(this).unbind()}).prop("src",i).appendTo("body").each(function(){this.complete||this.error?c(this).triggerHandler("alreadycomplete"):(clearTimeout(g),g=setTimeout(function(){c(a._elem).triggerHandler("error")},9999))})}};c(a._elem).bind("loadedmetadata",function(){f(c.prop(this,"videoWidth"),c.prop(this,"videoHeight"))}).bind("emptied",k).bind("swfstageresize",function(){j||f(e,
m)}).bind("emptied",function(){e=void 0;m=void 0}).triggerHandler("swfstageresize");k();c.prop(a._elem,"readyState")&&f(c.prop(a._elem,"videoWidth"),c.prop(a._elem,"videoHeight"))}};f.playerResize=function(a){a&&(a=t.getElementById(a.replace(E,"")))&&c(a).triggerHandler("swfstageresize")};c(t).bind("emptied",function(a){a=l(a.target);H(a)});var v;f.jwPlayerReady=function(a){var b=k(a.id);if(b&&b.jwapi){clearTimeout(v);b.jwData=a;b.shadowElem.removeClass("flashblocker-assumed");b.wasSwfReady?c(b._elem).mediaLoad():
(a=parseFloat(a.version,10),(a<5.6||a>=6)&&e.warn("mediaelement-swf is only testet with jwplayer 5.6+"),c.prop(b._elem,"volume",b.volume),c.prop(b._elem,"muted",b.muted),M(b));b.wasSwfReady=!0;var a=b.actionQueue.length,d=0,h;if(a&&b.isActive=="flash")for(;b.actionQueue.length&&a>d;)d++,h=b.actionQueue.shift(),b.jwapi[h.fn].apply(b.jwapi,h.args);if(b.actionQueue.length)b.actionQueue=[];H(b)}};var y=c.noop;if(x){var O={play:1,playing:1},I="play,pause,playing,canplay,progress,waiting,ended,loadedmetadata,durationchange,emptied".split(","),
J=I.map(function(a){return a+".webshimspolyfill"}).join(" "),P=function(a){var b=e.data(a.target,"mediaelement");b&&(a.originalEvent&&a.originalEvent.type===a.type)==(b.activating=="flash")&&(a.stopImmediatePropagation(),O[a.type]&&b.isActive!=b.activating&&c(a.target).pause())},y=function(a){c(a).unbind(J).bind(J,P);I.forEach(function(b){e.moveToFirstEvent(a,b)})};y(t)}f.setActive=function(a,b,d){d||(d=e.data(a,"mediaelement"));if(d&&d.isActive!=b){b!="html5"&&b!="flash"&&e.warn("wrong type for mediaelement activating: "+
b);var h=e.data(a,"shadowData");d.activating=b;c(a).pause();d.isActive=b;b=="flash"?(h.shadowElement=h.shadowFocusElement=d.shadowElem[0],c(a).hide().getShadowElement().show()):(c(a).show().getShadowElement().hide(),h.shadowElement=h.shadowFocusElement=!1)}};var Q=function(){var a="_bufferedEnd,_bufferedStart,_metadata,_ppFlag,currentSrc,currentTime,duration,ended,networkState,paused,videoHeight,videoWidth,_callMeta".split(","),b=a.length;return function(d){if(d){for(var c=b,e=d.networkState;--c;)delete d[a[c]];
d.actionQueue=[];d.buffered.length=0;e&&g(d._elem,"emptied")}}}();f.createSWF=function(a,b,d){if(A){s<1?s=1:s++;var h=c.extend({},j.jwVars,{image:c.prop(a,"poster")||"",file:b.srcProp}),g=c(a).data("jwvars")||{};if(d&&d.swfCreated)f.setActive(a,"flash",d),Q(d),d.currentSrc=b.srcProp,c.extend(h,g),j.changeJW(h,a,b,d,"load"),r(a,"sendEvent",["LOAD",h]);else{var m=c.prop(a,"controls"),i="jwplayer-"+e.getID(a),k=c.extend({},j.jwParams,c(a).data("jwparams")),l=a.nodeName.toLowerCase(),n=c.extend({},j.jwAttrs,
{name:i,id:i},c(a).data("jwattrs")),q=c('<div class="polyfill-'+l+' polyfill-mediaelement" id="wrapper-'+i+'"><div id="'+i+'"></div>').css({position:"relative",overflow:"hidden"});c(a)[m?"addClass":"removeClass"]("webshims-controls");l=="audio"&&!m?q.css({width:0,height:0}):q.css({width:a.style.width||c(a).width(),height:a.style.height||c(a).height()});q.insertBefore(a);d=e.data(a,"mediaelement",e.objectCreate(D,{actionQueue:{value:[]},shadowElem:{value:q},_elemNodeName:{value:l},_elem:{value:a},
currentSrc:{value:b.srcProp},swfCreated:{value:!0},buffered:{value:{start:function(a){if(a>=d.buffered.length)e.error("buffered index size error");else return 0},end:function(a){if(a>=d.buffered.length)e.error("buffered index size error");else return(d.duration-d._bufferedStart)*d._bufferedEnd/100+d._bufferedStart},length:0}}}));x&&c.extend(d,{volume:c.prop(a,"volume"),muted:c.prop(a,"muted")});c.extend(h,{id:i,controlbar:m?j.jwVars.controlbar||(l=="video"?"over":"bottom"):"none",icons:""+(m&&l==
"video")},g,{playerready:"jQuery.webshims.mediaelement.jwPlayerReady"});h.plugins?h.plugins+=","+F:h.plugins=F;e.addShadowDom(a,q);y(a);f.setActive(a,"flash",d);j.changeJW(h,a,b,d,"embed");N(d);z.embedSWF(L,i,"100%","100%","9.0.0",!1,h,k,n,function(b){if(b.success)d.jwapi=b.ref,m||c(b.ref).attr("tabindex","-1").css("outline","none"),setTimeout(function(){if(!b.ref.parentNode&&q[0].parentNode||b.ref.style.display=="none")q.addClass("flashblocker-assumed"),c(a).trigger("flashblocker"),e.warn("flashblocker assumed");
c(b.ref).css({minHeight:"2px",minWidth:"2px",display:"block"})},9),v||(clearTimeout(v),v=setTimeout(function(){var a=c(b.ref);a[0].offsetWidth>1&&a[0].offsetHeight>1&&location.protocol.indexOf("file:")===0?e.warn("Add your local development-directory to the local-trusted security sandbox:  http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html"):(a[0].offsetWidth<2||a[0].offsetHeight<2)&&e.info("JS-SWF connection can't be established on hidden or unconnected flash objects")},
8E3))})}}else setTimeout(function(){c(a).mediaLoad()},1)};var r=function(a,b,d,c){return(c=c||l(a))?(c.jwapi&&c.jwapi[b]?c.jwapi[b].apply(c.jwapi,d||[]):(c.actionQueue.push({fn:b,args:d}),c.actionQueue.length>10&&setTimeout(function(){c.actionQueue.length>5&&c.actionQueue.shift()},99)),c):!1};["audio","video"].forEach(function(a){var b={},d,h=function(c){a=="audio"&&(c=="videoHeight"||c=="videoWidth")||(b[c]={get:function(){var a=l(this);return a?a[c]:x&&d[c].prop._supget?d[c].prop._supget.apply(this):
D[c]},writeable:!1})},f=function(a,c){h(a);delete b[a].writeable;b[a].set=c};f("volume",function(a){var b=l(this);if(b){if(a*=100,!isNaN(a)){(a<0||a>100)&&e.error("volume greater or less than allowed "+a/100);b.muted&&(u=!0);r(this,"sendEvent",["VOLUME",a],b);if(u){try{b.jwapi.sendEvent("mute","true")}catch(c){}u=!1}setTimeout(function(){a/=100;if(!(b.volume==a||b.isActive!="flash"))b.volume=a,g(b._elem,"volumechange"),b=null},1)}}else if(d.volume.prop._supset)return d.volume.prop._supset.apply(this,
arguments)});f("muted",function(a){var b=l(this);if(b)a=!!a,r(this,"sendEvent",["mute",""+a],b),setTimeout(function(){if(!(b.muted==a||b.isActive!="flash"))b.muted=a,g(b._elem,"volumechange"),b=null},1);else if(d.muted.prop._supset)return d.muted.prop._supset.apply(this,arguments)});f("currentTime",function(a){var b=l(this);if(b){if(a*=1,!isNaN(a)){if(b.paused)clearTimeout(b.stopPlayPause),b.stopPlayPause=setTimeout(function(){b.paused=!0;b.stopPlayPause=!1},50);r(this,"sendEvent",["SEEK",""+a],b);
if(b.paused){if(b.readyState>0)b.currentTime=a,g(b._elem,"timeupdate");try{b.jwapi.sendEvent("play","false")}catch(c){}}}}else if(d.currentTime.prop._supset)return d.currentTime.prop._supset.apply(this,arguments)});["play","pause"].forEach(function(a){b[a]={value:function(){var b=l(this);if(b)b.stopPlayPause&&clearTimeout(b.stopPlayPause),r(this,"sendEvent",["play",a=="play"],b),setTimeout(function(){if(b.isActive=="flash"&&(b._ppFlag=!0,b.paused!=(a!="play")))b.paused=a!="play",g(b._elem,a)},1);
else if(d[a].prop._supvalue)return d[a].prop._supvalue.apply(this,arguments)}}});K.forEach(h);e.onNodeNamesPropertyModify(a,"controls",function(b,d){var e=r(this,d?"showControls":"hideControls",[a]);c(this)[d?"addClass":"removeClass"]("webshims-controls");e&&c(e.jwapi).attr("tabindex",d?"0":"-1")});d=e.defineNodeNameProperties(a,b,"prop")});if(A){var R=c.cleanData,S=c.browser.msie&&e.browserVersion<9,T={object:1,OBJECT:1};c.cleanData=function(a){var b,c,e;if(a&&(c=a.length)&&s)for(b=0;b<c;b++)if(T[a[b].nodeName]){if("sendEvent"in
a[b]){s--;try{a[b].sendEvent("play",!1)}catch(f){}}if(S)try{for(e in a[b])typeof a[b][e]=="function"&&(a[b][e]=null)}catch(g){}}return R.apply(this,arguments)}}});