(function(c){if(!navigator.geolocation){var n=function(){setTimeout(function(){throw"document.write is overwritten by geolocation shim. This method is incompatibel with this plugin";},1)},o=0,i=c.webshims.modules.geolocation.options||{};navigator.geolocation=function(){var a,m={getCurrentPosition:function(j,d,f){var e=2,p,k,l,g=function(){if(!l)if(a){l=true;j(c.extend({timestamp:(new Date).getTime()},a));h();if(window.JSON&&window.sessionStorage)try{sessionStorage.setItem("storedGeolocationData654321",
JSON.stringify(a))}catch(b){}}else if(d&&!e){l=true;h();d({code:2,message:"POSITION_UNAVAILABLE"})}},r=function(){e--;q();g()},h=function(){c(document).unbind("google-loader",h);clearTimeout(k);clearTimeout(p)},q=function(){if(a||!window.google||!google.loader||!google.loader.ClientLocation)return false;var b=google.loader.ClientLocation;a={coords:{latitude:b.latitude,longitude:b.longitude,altitude:null,accuracy:43E3,altitudeAccuracy:null,heading:parseInt("NaN",10),velocity:null},address:c.extend({streetNumber:"",
street:"",premises:"",county:"",postalCode:""},b.address)};return true};if(!a){q();if(!(a||!window.JSON||!window.sessionStorage))try{a=(a=sessionStorage.getItem("storedGeolocationData654321"))?JSON.parse(a):false;a.coords||(a=false)}catch(s){a=false}}if(a)setTimeout(g,1);else if(!(i.confirmText&&!confirm(i.confirmText.replace("{location}",location.hostname)))){c.ajax({url:"http://freegeoip.net/json/",dataType:"jsonp",cache:true,jsonp:"callback",success:function(b){e--;if(b){a=a||{coords:{latitude:b.latitude,
longitude:b.longitude,altitude:null,accuracy:43E3,altitudeAccuracy:null,heading:parseInt("NaN",10),velocity:null},address:{city:b.city,country:b.country_name,countryCode:b.country_code,county:"",postalCode:b.zipcode,premises:"",region:b.region_name,street:"",streetNumber:""}};g()}},error:function(){e--;g()}});clearTimeout(k);if(!window.google||!window.google.loader)k=setTimeout(function(){if(i.destroyWrite){document.write=n;document.writeln=n}c(document).one("google-loader",r);c.webshims.loader.loadScript("http://www.google.com/jsapi",
false,"google-loader")},800);else e--;p=f&&f.timeout?setTimeout(function(){h();d&&d({code:3,message:"TIMEOUT"})},f.timeout):setTimeout(function(){e=0;g()},1E4)}},clearWatch:c.noop};m.watchPosition=function(j,d,f){m.getCurrentPosition(j,d,f);o++;return o};return m}()}})(jQuery);
