(function(f,g){"use strict";if("undefined"!==typeof va){var e=function(c){c=va.byId("blog-pager");var b=va.queryAll(c,".loadmore-btn");c&&va.each(b,function(a){va.on(a,"click",function(b){b.preventDefault();va.html(a,loadmoreSettings.loading);va.setAttr(a,"title",loadmoreSettings.loading);va.setStyle(a,{cursor:"wait"});d(!0);h(a.href,function(a){var b=g.createElement("div");va.html(b,a);va.each(va.queryAll(b,".post-outer"),function(a){var b=va.query("#Blog .post-wrap"),c=va.query("#Blog .post-wrap .post-last");b.insertBefore(a,c)});-1!=a.indexOf("id='blog-pager'")?va.html(c,va.query(b,"#blog-pager").innerHTML):va.remove(c);e();d(!1)})},!1)});"undefined"!==typeof potentialIT&&(potentialIT.ads(),potentialIT.loadImages())},h=function(c,b){if("undefined"==typeof XMLHttpRequest)return!1;var a=f.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("MicrosoftXMLHTTP");a.open("GET",c,!0);a.onreadystatechange=function(){4===a.readyState&&200===a.status&&(eval("console.clear();"),b(a.responseText))};a.setRequestHeader("X-Requested-With","XMLHttpRequest");a.send();return a},d=function(c){var b=document.body;c?(va.removeClass(b,"js-loaded"),va.addClass(b,"js-loading")):c||(va.removeClass(b,"js-loading"),va.addClass(b,"js-loaded"))};e()}})(window,document);
