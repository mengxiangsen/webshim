jQuery.webshims.register("dom-extend",function(c,f,i,n,p){var v=f.modules,q=/\s*,\s*/,o={},s={},j={},z={},m={},h=c.fn.val,g=function(b,a,d,e,t){return t?h.call(c(b)):h.call(c(b),d)};c.fn.val=function(b){var a=this[0];arguments.length&&null==b&&(b="");if(!arguments.length)return!a||1!==a.nodeType?h.call(this):c.prop(a,"value",b,"val",!0);if(c.isArray(b))return h.apply(this,arguments);var d=c.isFunction(b);return this.each(function(e){a=this;1===a.nodeType&&(d?(e=b.call(a,e,c.prop(a,"value",p,"val",
!0)),null==e&&(e=""),c.prop(a,"value",e,"val")):c.prop(a,"value",b,"val"))})};var y="_webshimsLib"+Math.round(1E3*Math.random()),C=function(b,a,d){b=b.jquery?b[0]:b;if(!b)return d||{};var e=c.data(b,y);d!==p&&(e||(e=c.data(b,y,{})),a&&(e[a]=d));return a?e&&e[a]:e};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(b){c.fn[b.name]=function(){return this.map(function(){var a=C(this,
"shadowData");return a&&a[b.prop]||this})}});["removeAttr","prop","attr"].forEach(function(b){o[b]=c[b];c[b]=function(a,d,e,t,D){var h="val"==t,r=!h?o[b]:g;if(!a||!s[d]||1!==a.nodeType||!h&&t&&"attr"==b&&c.attrFn[d])return r(a,d,e,t,D);var k=(a.nodeName||"").toLowerCase(),A=j[k],B="attr"==b&&(!1===e||null===e)?"removeAttr":b,w,f,l;A||(A=j["*"]);A&&(A=A[d]);A&&(w=A[B]);if(w){if("value"==d)f=w.isVal,w.isVal=h;if("removeAttr"===B)return w.value.call(a);if(e===p)return w.get?w.get.call(a):w.value;w.set&&
("attr"==b&&!0===e&&(e=d),l=w.set.call(a,e));if("value"==d)w.isVal=f}else l=r(a,d,e,t,D);if((e!==p||"removeAttr"===B)&&m[k]&&m[k][d]){var i;i="removeAttr"==B?!1:"prop"==B?!!e:!0;m[k][d].forEach(function(k){if(!k.only||(k.only="prop"==b)||"attr"==k.only&&"prop"!=b)k.call(a,e,i,h?"val":B,b)})}return l};z[b]=function(a,d,e){j[a]||(j[a]={});j[a][d]||(j[a][d]={});var t=j[a][d][b],h=function(a,r,k){return r&&r[a]?r[a]:k&&k[a]?k[a]:"prop"==b&&"value"==d?function(a){return e.isVal?g(this,d,a,!1,0===arguments.length):
o[b](this,d,a)}:"prop"==b&&"value"==a&&e.value.apply?function(a){var k=o[b](this,d);k&&k.apply&&(k=k.apply(this,arguments));return k}:function(k){return o[b](this,d,k)}};j[a][d][b]=e;if(e.value===p){if(!e.set)e.set=e.writeable?h("set",e,t):f.cfg.useStrict&&"prop"==d?function(){throw d+" is readonly on "+a;}:c.noop;if(!e.get)e.get=h("get",e,t)}["value","get","set"].forEach(function(a){e[a]&&(e["_sup"+a]=h(a,t))})}});var F=!c.browser.msie||8<parseInt(c.browser.version,10),l=function(){var b=f.getPrototypeOf(n.createElement("foobar")),
a=Object.prototype.hasOwnProperty;return function(d,e,c){var h=n.createElement(d),g=f.getPrototypeOf(h);if(F&&g&&b!==g&&(!h[e]||!a.call(h,e))){var r=h[e];c._supvalue=function(){return r&&r.apply?r.apply(this,arguments):r};g[e]=c.value}else c._supvalue=function(){var a=C(this,"propValue");return a&&a[e]&&a[e].apply?a[e].apply(this,arguments):a&&a[e]},u.extendValue(d,e,c.value);c.value._supvalue=c._supvalue}}(),u=function(){var b={};f.addReady(function(a,d){var e={},r=function(k){e[k]||(e[k]=c(a.getElementsByTagName(k)),
d[0]&&c.nodeName(d[0],k)&&(e[k]=e[k].add(d)))};c.each(b,function(a,b){r(a);!b||!b.forEach?f.warn("Error: with "+a+"-property. methods: "+b):b.forEach(function(b){e[a].each(b)})});e=null});var a,d=c([]),e=function(d,e){b[d]?b[d].push(e):b[d]=[e];c.isDOMReady&&(a||c(n.getElementsByTagName(d))).each(e)};return{createTmpCache:function(b){c.isDOMReady&&(a=a||c(n.getElementsByTagName(b)));return a||d},flushTmpCache:function(){a=null},content:function(a,b){e(a,function(){var a=c.attr(this,b);null!=a&&c.attr(this,
b,a)})},createElement:function(a,b){e(a,b)},extendValue:function(a,b,d){e(a,function(){c(this).each(function(){C(this,"propValue",{})[b]=this[b];this[b]=d})})}}}(),x=function(b,a){if(b.defaultValue===p)b.defaultValue="";if(!b.removeAttr)b.removeAttr={value:function(){b[a||"prop"].set.call(this,b.defaultValue);b.removeAttr._supvalue.call(this)}};if(!b.attr)b.attr={}};c.extend(f,{getID:function(){var b=(new Date).getTime();return function(a){var a=c(a),d=a.attr("id");d||(b++,d="ID-"+b,a.attr("id",d));
return d}}(),extendUNDEFProp:function(b,a){c.each(a,function(a,e){a in b||(b[a]=e)})},createPropDefault:x,data:C,moveToFirstEvent:function(){var b=c._data?"_data":"data";return function(a,d,e){if((a=(c[b](a,"events")||{})[d])&&1<a.length)d=a.pop(),e||(e="bind"),"bind"==e&&a.delegateCount?a.splice(a.delegateCount,0,d):a.unshift(d)}}(),addShadowDom:function(){var b,a,d,e={init:!1,runs:0,test:function(){var a=e.getHeight(),b=e.getWidth();a!=e.height||b!=e.width?(e.height=a,e.width=b,e.handler({type:"docresize"}),
e.runs++,30>e.runs&&setTimeout(e.test,30)):e.runs=0},handler:function(h){clearTimeout(b);b=setTimeout(function(){if("resize"==h.type){var b=c(i).width(),g=c(i).width();if(g==a&&b==d)return;a=g;d=b;e.height=e.getHeight();e.width=e.getWidth()}c.event.trigger("updateshadowdom")},"resize"==h.type?50:9)},_create:function(){c.each({Height:"getHeight",Width:"getWidth"},function(a,b){var d=n.body,c=n.documentElement;e[b]=function(){return Math.max(d["scroll"+a],c["scroll"+a],d["offset"+a],c["offset"+a],c["client"+
a])}})},start:function(){if(!this.init&&n.body)this.init=!0,this._create(),this.height=e.getHeight(),this.width=e.getWidth(),setInterval(this.test,400),c(this.test),c(i).bind("load",this.test),c(i).bind("resize",this.handler),function(){var a=c.fn.animate,b;c.fn.animate=function(){clearTimeout(b);b=setTimeout(function(){e.test();e.handler({type:"animationstart"})},19);return a.apply(this,arguments)}}()}};c.event.customEvent.updateshadowdom=!0;f.docObserve=function(){f.ready("DOM",function(){e.start()})};
return function(a,b,d){d=d||{};a.jquery&&(a=a[0]);b.jquery&&(b=b[0]);var e=c.data(a,y)||c.data(a,y,{}),k=c.data(b,y)||c.data(b,y,{}),h={};if(d.shadowFocusElement){if(d.shadowFocusElement){if(d.shadowFocusElement.jquery)d.shadowFocusElement=d.shadowFocusElement[0];h=c.data(d.shadowFocusElement,y)||c.data(d.shadowFocusElement,y,h)}}else d.shadowFocusElement=b;e.hasShadow=b;h.nativeElement=k.nativeElement=a;h.shadowData=k.shadowData=e.shadowData={nativeElement:a,shadowElement:b,shadowFocusElement:d.shadowFocusElement};
d.shadowChilds&&d.shadowChilds.each(function(){C(this,"shadowData",k.shadowData)});if(d.data)h.shadowData.data=k.shadowData.data=e.shadowData.data=d.data;d=null;f.docObserve()}}(),propTypes:{standard:function(b){x(b);if(!b.prop)b.prop={set:function(a){b.attr.set.call(this,""+a)},get:function(){return b.attr.get.call(this)||b.defaultValue}}},"boolean":function(b){x(b);if(!b.prop)b.prop={set:function(a){a?b.attr.set.call(this,""):b.removeAttr.value.call(this)},get:function(){return null!=b.attr.get.call(this)}}},
src:function(){var b=n.createElement("a");b.style.display="none";return function(a,d){x(a);if(!a.prop)a.prop={set:function(b){a.attr.set.call(this,b)},get:function(){var a=this.getAttribute(d),h;if(null==a)return"";b.setAttribute("href",a+"");if(!c.support.hrefNormalized){try{c(b).insertAfter(this),h=b.getAttribute("href",4)}catch(g){h=b.getAttribute("href",4)}c(b).detach()}return h||b.href}}}}(),enumarated:function(b){x(b);if(!b.prop)b.prop={set:function(a){b.attr.set.call(this,a)},get:function(){var a=
(b.attr.get.call(this)||"").toLowerCase();if(!a||-1==b.limitedTo.indexOf(a))a=b.defaultValue;return a}}}},reflectProperties:function(b,a){"string"==typeof a&&(a=a.split(q));a.forEach(function(a){f.defineNodeNamesProperty(b,a,{prop:{set:function(b){c.attr(this,a,b)},get:function(){return c.attr(this,a)||""}}})})},defineNodeNameProperty:function(b,a,d){s[a]=!0;if(d.reflect)f.propTypes[d.propType||"standard"](d,a);["prop","attr","removeAttr"].forEach(function(e){var h=d[e];h&&(h="prop"===e?c.extend({writeable:!0},
h):c.extend({},h,{writeable:!0}),z[e](b,a,h),"*"!=b&&f.cfg.extendNative&&"prop"==e&&h.value&&c.isFunction(h.value)&&l(b,a,h),d[e]=h)});d.initAttr&&u.content(b,a);return d},defineNodeNameProperties:function(b,a,d,e){for(var c in a)!e&&a[c].initAttr&&u.createTmpCache(b),d&&!a[c][d]&&(a[c][d]={},["value","set","get"].forEach(function(b){b in a[c]&&(a[c][d][b]=a[c][b],delete a[c][b])})),a[c]=f.defineNodeNameProperty(b,c,a[c]);e||u.flushTmpCache();return a},createElement:function(b,a,d){var e;c.isFunction(a)&&
(a={after:a});u.createTmpCache(b);a.before&&u.createElement(b,a.before);d&&(e=f.defineNodeNameProperties(b,d,!1,!0));a.after&&u.createElement(b,a.after);u.flushTmpCache();return e},onNodeNamesPropertyModify:function(b,a,d,e){"string"==typeof b&&(b=b.split(q));c.isFunction(d)&&(d={set:d});b.forEach(function(b){m[b]||(m[b]={});"string"==typeof a&&(a=a.split(q));d.initAttr&&u.createTmpCache(b);a.forEach(function(a){m[b][a]||(m[b][a]=[],s[a]=!0);if(d.set){if(e)d.set.only=e;m[b][a].push(d.set)}d.initAttr&&
u.content(b,a)});u.flushTmpCache()})},defineNodeNamesBooleanProperty:function(b,a,d){d||(d={});if(c.isFunction(d))d.set=d;f.defineNodeNamesProperty(b,a,{attr:{set:function(b){this.setAttribute(a,b);d.set&&d.set.call(this,!0)},get:function(){return null==this.getAttribute(a)?p:a}},removeAttr:{value:function(){this.removeAttribute(a);d.set&&d.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:d.initAttr||!1})},contentAttr:function(b,a,d){if(b.nodeName){if(d===p)return b=b.attributes[a]||{},
d=b.specified?b.value:null,null==d?p:d;"boolean"==typeof d?d?b.setAttribute(a,a):b.removeAttribute(a):b.setAttribute(a,d)}},activeLang:function(){var b=[],a={},d,e,h=/:\/\/|^\.*\//,g=function(a,b,d){return b&&d&&-1!==c.inArray(b,d.availabeLangs||[])?(a.loading=!0,d=d.langSrc,h.test(d)||(d=f.cfg.basePath+d),f.loader.loadScript(d+b+".js",function(){a.langObj[b]?(a.loading=!1,r(a,!0)):c(function(){a.langObj[b]&&r(a,!0);a.loading=!1})}),!0):!1},j=function(b){a[b]&&a[b].forEach(function(a){a.callback()})},
r=function(a,b){if(a.activeLang!=d&&a.activeLang!==e){var c=v[a.module].options;if(a.langObj[d]||e&&a.langObj[e])a.activeLang=d,a.callback(a.langObj[d]||a.langObj[e],d),j(a.module);else if(!b&&!g(a,d,c)&&!g(a,e,c)&&a.langObj[""]&&""!==a.activeLang)a.activeLang="",a.callback(a.langObj[""],d),j(a.module)}};return function(k){if("string"==typeof k&&k!==d)d=k,e=d.split("-")[0],d==e&&(e=!1),c.each(b,function(a,b){r(b)});else if("object"==typeof k)if(k.register)a[k.register]||(a[k.register]=[]),a[k.register].push(k),
k.callback();else{if(!k.activeLang)k.activeLang="";b.push(k);r(k)}return d}}()});c.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(b,a){f[b]=function(b,c,h,g){"string"==typeof b&&(b=b.split(q));var j={};b.forEach(function(b){j[b]=f[a](b,c,h,g)});return j}});f.isReady("webshimLocalization",!0)});
(function(c,f){var i=c.webshims.browserVersion;if(!(c.browser.mozilla&&5<i)&&(!c.browser.msie||12>i&&7<i)){var n={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},p=function(c,f){c.getAttribute("role")||c.setAttribute("role",f)};c.webshims.addReady(function(i,q){c.each(n,function(j,f){for(var h=c(j,i).add(q.filter(j)),g=0,y=h.length;g<y;g++)p(h[g],f)});if(i===f){var o=f.getElementsByTagName("header")[0],s=f.getElementsByTagName("footer"),j=s.length;
o&&!c(o).closest("section, article")[0]&&p(o,"banner");j&&(o=s[j-1],c(o).closest("section, article")[0]||p(o,"contentinfo"))}})}})(jQuery,document);
(function(c,f,i){var n=f.audio&&f.video,p=!1,v=i.cfg.mediaelement,q=i.bugs,o="jwplayer"==v.player?"mediaelement-swf":"mediaelement-jaris",s=function(){i.ready(o,function(){if(!i.mediaelement.createSWF)i.mediaelement.loadSwf=!0,i.reTest([o],n)})},j;if(n){var z=document.createElement("video");f.videoBuffered="buffered"in z;p="loop"in z;i.capturingEvents("play,playing,waiting,paused,ended,durationchange,loadedmetadata,canplay,volumechange".split(","));f.videoBuffered||(i.addPolyfill("mediaelement-native-fix",
{f:"mediaelement",test:f.videoBuffered,d:["dom-support"]}),i.reTest("mediaelement-native-fix"))}if(n&&!v.preferFlash){var m=function(h){var g=h.target.parentNode;!v.preferFlash&&(c(h.target).is("audio, video")||g&&c("source:last",g)[0]==h.target)&&i.ready("DOM mediaelement",function(){j&&s();i.ready("WINDOWLOAD "+o,function(){setTimeout(function(){j&&!v.preferFlash&&i.mediaelement.createSWF&&!c(h.target).closest("audio, video").is(".nonnative-api-active")?(v.preferFlash=!0,document.removeEventListener("error",
m,!0),c("audio, video").mediaLoad(),i.info("switching mediaelements option to 'preferFlash', due to an error with native player: "+h.target.src)):j||document.removeEventListener("error",m,!0)},20)})})};document.addEventListener("error",m,!0);c("audio, video").each(function(){this.error&&m({target:this})})}q.track=!1;f.track&&function(){if(!q.track)q.track="number"!=typeof c("<track />")[0].readyState;if(!q.track)try{new TextTrackCue(2,3,"")}catch(h){q.track=!0}var g=i.cfg.track,j=function(h){c(h.target).filter("track").each(f)},
f=function(){if(q.track||!g.override&&3==c.prop(this,"readyState"))g.override=!0,i.reTest("track"),document.removeEventListener("error",j,!0),this&&c.nodeName(this,"track")?i.error("track support was overwritten. Please check your vtt including your vtt mime-type"):i.info("track support was overwritten. due to bad browser support")},m=function(){document.addEventListener("error",j,!0);q.track?f():c("track").each(f)};g.override||(i.isReady("track")?m():c(m))}();i.register("mediaelement-core",function(c,
g,i,m,z){j=swfobject.hasFlashPlayerVersion("9.0.115");var l=g.mediaelement,u=function(a,b){var a=c(a),d={src:a.attr("src")||"",elem:a,srcProp:a.prop("src")};if(!d.src)return d;var e=a.attr("type");if(e)d.type=e,d.container=c.trim(e.split(";")[0]);else if(b||(b=a[0].nodeName.toLowerCase(),"source"==b&&(b=(a.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),e=l.getTypeForSrc(d.src,b))d.type=e,d.container=e;if(e=a.attr("media"))d.media=e;return d},x=!j&&"postMessage"in i&&n,b=
function(){var a;return function(){!a&&x&&(a=!0,g.loader.loadScript("https://www.youtube.com/player_api"),c(function(){g.polyfill("mediaelement-yt")}))}}(),a=function(){j?s():b();c(function(){g.loader.loadList(["track-ui"])})};g.addPolyfill("mediaelement-yt",{test:!x,d:["dom-support"]});l.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":"mp4,mpg4,m4r,m4a,m4p,m4b,aac".split(","),"audio/wav":["wav"],"audio/3gpp":["3gp",
"3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}};l.mimeTypes.source=c.extend({},l.mimeTypes.audio,l.mimeTypes.video);
l.getTypeForSrc=function(a,b){if(-1!=a.indexOf("youtube.com/watch?")||-1!=a.indexOf("youtube.com/v/"))return"video/youtube";var a=a.split("?")[0].split("."),a=a[a.length-1],d;c.each(l.mimeTypes[b],function(b,c){if(-1!==c.indexOf(a))return d=b,!1});return d};l.srces=function(a,b){a=c(a);if(b)a.removeAttr("src").removeAttr("type").find("source").remove(),c.isArray(b)||(b=[b]),b.forEach(function(b){var c=m.createElement("source");"string"==typeof b&&(b={src:b});c.setAttribute("src",b.src);b.type&&c.setAttribute("type",
b.type);b.media&&c.setAttribute("media",b.media);a.append(c)});else{var b=[],d=a[0].nodeName.toLowerCase(),e=u(a,d);e.src?b.push(e):c("source",a).each(function(){e=u(this,d);e.src&&b.push(e)});return b}};c.fn.loadMediaSrc=function(a,b){return this.each(function(){b!==z&&(c(this).removeAttr("poster"),b&&c.attr(this,"poster",b));l.srces(this,a);c(this).mediaLoad()})};l.swfMimeTypes="video/3gpp,video/x-msvideo,video/quicktime,video/x-m4v,video/mp4,video/m4p,video/x-flv,video/flv,audio/mpeg,audio/aac,audio/mp4,audio/x-m4a,audio/m4a,audio/mp3,audio/x-fla,audio/fla,youtube/flv,jwplayer/jwplayer,video/youtube".split(",");
l.canThirdPlaySrces=function(a,b){var d="";if(j||x)a=c(a),b=b||l.srces(a),c.each(b,function(a,b){if(b.container&&b.src&&(j&&-1!=l.swfMimeTypes.indexOf(b.container)||x&&"video/youtube"==b.container))return d=b,!1});return d};var d={};l.canNativePlaySrces=function(a,b){var e="";if(n){var a=c(a),g=(a[0].nodeName||"").toLowerCase();if(!d[g])return e;b=b||l.srces(a);c.each(b,function(b,c){if(c.type&&d[g].prop._supvalue.call(a[0],c.type))return e=c,!1})}return e};l.setError=function(a,b){b||(b="can't play sources");
c(a).pause().data("mediaerror",b);g.warn("mediaelementError: "+b);setTimeout(function(){c(a).data("mediaerror")&&c(a).trigger("mediaerror")},1)};var e=function(){var d;return function(k,f,i){g.ready(j?o:"mediaelement-yt",function(){l.createSWF?l.createSWF(k,f,i):d||(d=!0,a(),e(k,f,i))});!d&&x&&!l.createSWF&&b();c(function(){g.loader.loadList(["track-ui"])})}}(),t=function(a,b,c,d,g){c||!1!==c&&b&&"third"==b.isActive?(c=l.canThirdPlaySrces(a,d))?e(a,c,b):g?l.setError(a,!1):t(a,b,!1,d,!0):(c=l.canNativePlaySrces(a,
d))?b&&"third"==b.isActive&&l.setActive(a,"html5",b):g?(l.setError(a,!1),b&&"third"==b.isActive&&l.setActive(a,"html5",b)):t(a,b,!0,d,!0)},D=/^(?:embed|object|datalist)$/i,E=function(a,b){var d=g.data(a,"mediaelementBase")||g.data(a,"mediaelementBase",{}),e=l.srces(a),j=a.parentNode;clearTimeout(d.loadTimer);c.data(a,"mediaerror",!1);if(e.length&&j&&!(1!=j.nodeType||D.test(j.nodeName||"")))b=b||g.data(a,"mediaelement"),t(a,b,v.preferFlash||z,e)};c(m).bind("ended",function(a){var b=g.data(a.target,
"mediaelement");(!p||b&&"html5"!=b.isActive||c.prop(a.target,"loop"))&&setTimeout(function(){!c.prop(a.target,"paused")&&c.prop(a.target,"loop")&&c(a.target).prop("currentTime",0).play()},1)});p||g.defineNodeNamesBooleanProperty(["audio","video"],"loop");["audio","video"].forEach(function(a){var b=g.defineNodeNameProperty(a,"load",{prop:{value:function(){var a=g.data(this,"mediaelement");E(this,a);n&&(!a||"html5"==a.isActive)&&b.prop._supvalue&&b.prop._supvalue.apply(this,arguments)}}});d[a]=g.defineNodeNameProperty(a,
"canPlayType",{prop:{value:function(b){var e="";n&&d[a].prop._supvalue&&(e=d[a].prop._supvalue.call(this,b),"no"==e&&(e=""));!e&&j&&(b=c.trim((b||"").split(";")[0]),-1!=l.swfMimeTypes.indexOf(b)&&(e="maybe"));return e}}})});g.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var a=this,b=g.data(a,"mediaelementBase")||g.data(a,"mediaelementBase",{});clearTimeout(b.loadTimer);b.loadTimer=setTimeout(function(){E(a);a=null},9)}});i=function(){g.addReady(function(a,b){c("video, audio",
a).add(b.filter("video, audio")).each(function(){c.browser.msie&&8<g.browserVersion&&c.prop(this,"paused")&&!c.prop(this,"readyState")&&c(this).is('audio[preload="none"][controls]:not([autoplay])')?c(this).prop("preload","metadata").mediaLoad():E(this);if(n){var a,b,d=this,e=function(){var a=c.prop(d,"buffered");if(a){for(var b="",e=0,g=a.length;e<g;e++)b+=a.end(e);return b}},j=function(){var a=e();a!=b&&(b=a,c(d).triggerHandler("progress"))};c(this).bind("play loadstart progress",function(c){"progress"==
c.type&&(b=e());clearTimeout(a);a=setTimeout(j,999)}).bind("emptied stalled mediaerror abort suspend",function(c){"emptied"==c.type&&(b=!1);clearTimeout(a)})}})})};f.track&&!q.track&&g.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}});n?(g.isReady("mediaelement-core",!0),i(),g.ready("WINDOWLOAD mediaelement",a)):g.ready(o,i);c(function(){m.getElementsByTagName("track")[0]&&g.loader.loadList(["track-ui"])})})})(jQuery,Modernizr,jQuery.webshims);
jQuery.webshims.register("details",function(c,f,i,n,p,v){var q=function(j){var f=c(j).parent("details");if(f[0]&&f.children(":first").get(0)===j)return f},o=function(j,f){var j=c(j),f=c(f),i=c.data(f[0],"summaryElement");c.data(j[0],"detailsElement",f);if(!i||j[0]!==i[0])i&&(i.hasClass("fallback-summary")?i.remove():i.unbind(".summaryPolyfill").removeData("detailsElement").removeAttr("role").removeAttr("tabindex").removeAttr("aria-expanded").removeClass("summary-button").find("span.details-open-indicator").remove()),
c.data(f[0],"summaryElement",j),f.prop("open",f.prop("open"))};f.createElement("summary",function(){var j=q(this);if(j&&!c.data(this,"detailsElement")){var i,m,h=c.attr(this,"tabIndex")||"0";o(this,j);c(this).bind("focus.summaryPolyfill",function(){c(this).addClass("summary-has-focus")}).bind("blur.summaryPolyfill",function(){c(this).removeClass("summary-has-focus")}).bind("mouseenter.summaryPolyfill",function(){c(this).addClass("summary-has-hover")}).bind("mouseleave.summaryPolyfill",function(){c(this).removeClass("summary-has-hover")}).bind("click.summaryPolyfill",
function(g){var h=q(this);if(h){if(!m&&g.originalEvent)return m=!0,g.stopImmediatePropagation(),g.preventDefault(),c(this).trigger("click"),m=!1;clearTimeout(i);i=setTimeout(function(){g.isDefaultPrevented()||h.prop("open",!h.prop("open"))},0)}}).bind("keydown.summaryPolyfill",function(g){if((13==g.keyCode||32==g.keyCode)&&!g.isDefaultPrevented())m=!0,g.preventDefault(),c(this).trigger("click"),m=!1}).attr({tabindex:h,role:"button"}).prepend('<span class="details-open-indicator" />');f.moveToFirstEvent(this,
"click")}});var s;f.defineNodeNamesBooleanProperty("details","open",function(f){var i=c(c.data(this,"summaryElement"));if(i){var m=f?"removeClass":"addClass",h=c(this);if(!s&&v.animate){h.stop().css({width:"",height:""});var g={width:h.width(),height:h.height()}}i.attr("aria-expanded",""+f);h[m]("closed-details-summary").children().not(i[0])[m]("closed-details-child");!s&&v.animate&&(f={width:h.width(),height:h.height()},h.css(g).animate(f,{complete:function(){c(this).css({width:"",height:""})}}))}});
f.createElement("details",function(){s=!0;var f=c.data(this,"summaryElement");f||(f=c("> summary:first-child",this),f[0]?o(f,this):(c(this).prependPolyfill('<summary class="fallback-summary">'+v.text+"</summary>"),c.data(this,"summaryElement")));c.prop(this,"open",c.prop(this,"open"));s=!1})});
