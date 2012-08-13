jQuery.webshims.register("track",function(e,g,p,t){var h=g.mediaelement;(new Date).getTime();var u={subtitles:1,captions:1},q=function(){g.error("not implemented yet")},o=function(a){var b={};a.addEventListener=function(a,c){b[a]&&g.error("always use $.bind to the shimed event: "+a+" already bound fn was: "+b[a]+" your fn was: "+c);b[a]=c};a.removeEventListener=function(a,c){b[a]&&b[a]!=c&&g.error("always use $.bind to the shimed event: "+a+" already bound fn was: "+b[a]+" your fn was: "+c);b[a]&&
delete b[a]};return a},v={getCueById:q},w={shimActiveCues:null,activeCues:null,cues:null,kind:"subtitles",label:"",language:"",mode:0,oncuechange:null,toString:function(){return"[object TextTrack]"},addCue:function(a){if(!this.cues)this.cues=[];a.track&&g.error("cue already part of a track element");a.track=this;this.cues.push(a)},removeCue:q,DISABLED:0,OFF:0,HIDDEN:1,SHOWING:2},x=["kind","label","srclang"],l=function(){var a=e.prop(this,"textTracks"),b=g.data(this,"mediaelementBase"),d=a.splice(0),
c,f;e("track",this).each(function(){a.push(e.prop(this,"track"))});if(b.scriptedTextTracks)for(c=0,f=b.scriptedTextTracks.length;c<f;c++)a.push(b.scriptedTextTracks[c]);if(h.trackDisplay&&b.trackDisplay)for(c=0,f=d.length;c<f;c++)-1==a.indexOf(d[c])&&h.trackDisplay.hide(d[c],b)},r=function(a,b){var d;b||(b=g.data(a,"trackData"));if(b&&!b.isTriggering)b.isTriggering=!0,d=(b.track||{}).mode,setTimeout(function(){if(d!==(b.track||{}).mode)b.readyState?e(a).parent().triggerHandler("updatetrackdisplay"):
e(a).triggerHandler("checktrackmode");b.isTriggering=!1},9)};p.TextTrackCue=function(a,b,d,c,f,e){this.id=a;this.startTime=b;this.endTime=d;this.text=c;this.pauseOnExit=e;f&&g.warn("webshims currently does not support any cue settings");o(this)};p.TextTrackCue.prototype={onenter:null,onexit:null,pauseOnExit:!1,getCueAsHTML:function(){},track:null,id:"",snapToLines:!0,line:-1,size:100,position:50,vertical:"",align:"middle"};h.createCueList=function(){return e.extend([],v)};h.createTextTrack=function(a,
b){var d,c,f;if(b.nodeName&&(c=g.data(b,"trackData")))r(b,c),d=c.track;if(!d)if(d=o(g.objectCreate(w)),x.forEach(function(a){var c=e.prop(b,a);c&&("srclang"==a&&(a="language"),d[a]=c)}),b.nodeName){if(f=function(){var n,s;if(d.mode&&(e(a).unbind("play playing timeupdate updatetrackdisplay",f),e(b).unbind("checktrackmode",f),!c.readyState)){n=function(){c.readyState=3;e(b).triggerHandler("error")};c.readyState=1;try{s=e.ajax({dataType:"text",url:e.prop(b,"src"),success:function(f){"text/vtt"!=s.getResponseHeader("content-type")&&
g.warn("set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt");h.parseCaptions(f,d,function(f){f&&"length"in f?(d.cues=f,d.activeCues=d.shimActiveCues=h.createCueList(),c.readyState=2,e(b).triggerHandler("load"),e(a).triggerHandler("updatetrackdisplay")):n()})},error:n})}catch(j){n(),g.warn(j)}}},c=g.data(b,"trackData",{track:d,readyState:0}),e(a).bind("play playing timeupdate updatetrackdisplay",f),e(b).bind("checktrackmode",f),e.prop(b,"default"))d.mode=
u[d.kind]?2:1,f()}else d.cues=h.createCueList(),d.activeCues=d.shimActiveCues=h.createCueList(),d.mode=1;return d};h.parseCaptionChunk=function(){var a=/^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,b=/^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,d=/^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,c=/^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;return function(f,g){var e="",j=[],i,h,k,l;if(j=b.exec(f))return j=j.slice(2).join(""),j=j.split(/\s+/g).filter(function(a){return a&&!!a.length}),
null;if(j=d.exec(f))return e+=j[j.length-1],null;if(j=c.exec(f))return null;for(i=f.split(/\n/g);!i[0].replace(/\s+/ig,"").length&&0<i.length;)i.shift();for(j=i[0].match(/^\s*[a-z0-9]+\s*$/ig)?""+i.shift().replace(/\s*/ig,""):g;0<i.length;){if(l=a.exec(i[0]))k=l.slice(1),h=parseInt(3600*(k[0]||0),10)+parseInt(60*(k[1]||0),10)+parseInt(k[2]||0,10)+parseFloat("0."+(k[3]||0)),k=parseInt(3600*(k[4]||0),10)+parseInt(60*(k[5]||0),10)+parseInt(k[6]||0,10)+parseFloat("0."+(k[7]||0));i=i.slice(0,0).concat(i.slice(1));
break}if(!h&&!k)return null;i=i.join("\n");h=new TextTrackCue(j,h,k,i,"",!1);h.styleData=e;return h}}();h.parseCaptions=function(a,b,d){var c=h.createCueList(),f,e,l,j,i;if(a)l=/^WEBVTT(\s*FILE)?/ig,e=function(m,k){for(;m<k;m++){f=a[m];if(l.test(f))i=!0;else if(f.replace(/\s*/ig,"").length){if(!i){g.error("please use WebVTT format. This is the standard");d(null);break}if(f=h.parseCaptionChunk(f,m))f.track=b,c.push(f)}if(j<(new Date).getTime()-9){m++;setTimeout(function(){j=(new Date).getTime();e(m,
k)},90);break}}m>=k&&(i||g.error("please use WebVTT format. This is the standard"),d(c))},a=a.replace(/\r\n/g,"\n"),setTimeout(function(){a=a.replace(/\r/g,"\n");setTimeout(function(){j=(new Date).getTime();a=a.split(/\n\n+/g);e(0,a.length)},9)},9);else throw Error("Required parameter captionData not supplied.");};h.createTrackList=function(a){a=g.data(a,"mediaelementBase")||g.data(a,"mediaelementBase",{});if(!a.textTracks)a.textTracks=[],g.defineProperties(a.textTracks,{onaddtrack:{value:null}}),
o(a.textTracks);return a.textTracks};g.defineNodeNamesBooleanProperty(["track"],"default");g.reflectProperties(["track"],["srclang","label"]);g.defineNodeNameProperties("track",{kind:{reflect:!0,propType:"enumarated",defaultValue:"subtitles",limitedTo:["subtitles","captions","descriptions","chapters","metadata"]},src:{reflect:!0,propType:"src"}});g.defineNodeNamesProperties(["track"],{ERROR:{value:3},LOADED:{value:2},LOADING:{value:1},NONE:{value:0},readyState:{get:function(){return(g.data(this,"trackData")||
{readyState:0}).readyState},writeable:!1},track:{get:function(){return h.createTextTrack(e(this).closest("audio, video")[0],this)},writeable:!1}},"prop");g.defineNodeNamesProperties(["audio","video"],{textTracks:{get:function(){e("track",this).each(function(){r(this)});return h.createTrackList(this)},writeable:!1},addTextTrack:{value:function(a,b,d){a=h.createTextTrack(this,{kind:a||"",label:b||"",srclang:d||""});b=g.data(this,"mediaelementBase")||g.data(this,"mediaelementBase",{});if(!b.scriptedTextTracks)b.scriptedTextTracks=
[];b.scriptedTextTracks.push(a);l.call(this);return a}}},"prop");e(t).bind("emptied",function(a){e(a.target).is("audio, video")&&setTimeout(function(){l.call(a.target)},9)});g.addReady(function(a,b){e("video, audio",a).add(b.filter("video, audio")).each(l);b.filter("track").parent("audio, video").each(l)})});
