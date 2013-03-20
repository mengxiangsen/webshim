jQuery.webshims.register("form-native-extend",function(e,t,i,n,a,r){"use strict";var o=i.Modernizr,s=o.inputtypes;if(o.formvalidation&&!t.bugs.bustedValidity){var u=t.inputTypes,l={};t.addInputType=function(e,t){u[e]=t},t.addValidityRule=function(e,t){l[e]=t},t.addValidityRule("typeMismatch",function(e,t,i,n){if(""===t)return!1;var a=n.typeMismatch;return"type"in i||(i.type=(e[0].getAttribute("type")||"").toLowerCase()),u[i.type]&&u[i.type].mismatch&&(a=u[i.type].mismatch(t,e)),a});var c=r.overrideMessages,p=!s.number||!s.time||!s.range||c,d=["customError","typeMismatch","rangeUnderflow","rangeOverflow","stepMismatch","tooLong","patternMismatch","valueMissing","valid"],h=c?["value","checked"]:["value"],f=[],m=function(t,i){if(t){var a=(t.getAttribute&&t.getAttribute("type")||t.type||"").toLowerCase();(c||u[a])&&(c&&!i&&"radio"==a&&t.name?e(n.getElementsByName(t.name)).each(function(){e.prop(this,"validity")}):e.prop(t,"validity"))}},v={};if(["input","textarea","select"].forEach(function(i){var n=t.defineNodeNameProperty(i,"setCustomValidity",{prop:{value:function(a){a+="";var r="input"==i?e(this).getNativeElement()[0]:this;n.prop._supvalue.call(r,a),t.bugs.validationMessage&&t.data(r,"customvalidationMessage",a),p&&(t.data(r,"hasCustomError",!!a),m(r))}}});v[i]=n.prop._supvalue}),(p||c)&&(h.push("min"),h.push("max"),h.push("step"),f.push("input")),c&&(h.push("required"),h.push("pattern"),f.push("select"),f.push("textarea")),p){var g;if(f.forEach(function(i){var n=t.defineNodeNameProperty(i,"validity",{prop:{get:function(){if(!g){var r="input"==i?e(this).getNativeElement()[0]:this,o=n.prop._supget.call(r);if(!o)return o;var s={};if(d.forEach(function(e){s[e]=o[e]}),!e.prop(r,"willValidate"))return s;g=!0;var p,h=e(r),f={type:(r.getAttribute&&r.getAttribute("type")||"").toLowerCase(),nodeName:(r.nodeName||"").toLowerCase()},m=h.val(),y=!!t.data(r,"hasCustomError");if(g=!1,s.customError=y,s.valid&&s.customError)s.valid=!1;else if(!s.valid){var b=!0;e.each(s,function(e,t){return t?(b=!1,!1):a}),b&&(s.valid=!0)}return e.each(l,function(e,n){s[e]=n(h,m,f,s),s[e]&&(s.valid||!p)&&(c||u[f.type]&&u[f.type].mismatch)&&(v[i].call(r,t.createValidationMessage(r,e)),s.valid=!1,p=!0)}),s.valid?(v[i].call(r,""),t.data(r,"hasCustomError",!1)):!c||p||y||e.each(s,function(e,n){return"valid"!==e&&n?(v[i].call(r,t.createValidationMessage(r,e)),!1):a}),s}},writeable:!1}})}),h.forEach(function(e){t.onNodeNamesPropertyModify(f,e,function(){m(this)})}),n.addEventListener){var y,b=function(t){if("form"in t.target){var i=t.target.form;clearTimeout(y),m(t.target),i&&c&&e("input",i).each(function(){"password"==this.type&&m(this)})}};n.addEventListener("change",b,!0),c&&(n.addEventListener("blur",b,!0),n.addEventListener("keydown",function(e){13==e.keyCode&&b(e)},!0)),n.addEventListener("input",function(e){clearTimeout(y),y=setTimeout(function(){m(e.target)},290)},!0)}var w=f.join(",");t.addReady(function(t,i){e(w,t).add(i.filter(w)).each(function(){e.prop(this,"validity")})}),c&&t.ready("DOM form-message",function(){t.activeLang({register:"form-core",callback:function(){e("input, select, textarea").getNativeElement().each(function(){if(!t.data(this,"hasCustomError")){var i,n=this,r=e.prop(n,"validity")||{valid:!0};r.valid||(i=(n.nodeName||"").toLowerCase(),e.each(r,function(e,r){return"valid"!==e&&r?(v[i].call(n,t.createValidationMessage(n,e)),!1):a}))}})}})})}t.defineNodeNameProperty("input","type",{prop:{get:function(){var e=this,i=(e.getAttribute("type")||"").toLowerCase();return t.inputTypes[i]?i:e.type}}})}});