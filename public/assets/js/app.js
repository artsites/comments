(()=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */t=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,a=Object.defineProperty||function(e,t,r){e[t]=r.value},c="function"==typeof Symbol?Symbol:{},i=c.iterator||"@@iterator",u=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,r){return e[t]=r}}function f(e,t,r,n){var o=t&&t.prototype instanceof h?t:h,c=Object.create(o.prototype),i=new _(n||[]);return a(c,"_invoke",{value:E(e,r,i)}),c}function m(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}r.wrap=f;var d={};function h(){}function p(){}function v(){}var y={};l(y,i,(function(){return this}));var b=Object.getPrototypeOf,w=b&&b(b(O([])));w&&w!==n&&o.call(w,i)&&(y=w);var g=v.prototype=h.prototype=Object.create(y);function x(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function S(t,r){function n(a,c,i,u){var s=m(t[a],t,c);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==e(f)&&o.call(f,"__await")?r.resolve(f.__await).then((function(e){n("next",e,i,u)}),(function(e){n("throw",e,i,u)})):r.resolve(f).then((function(e){l.value=e,i(l)}),(function(e){return n("throw",e,i,u)}))}u(s.arg)}var c;a(this,"_invoke",{value:function(e,t){function o(){return new r((function(r,o){n(e,t,r,o)}))}return c=c?c.then(o,o):o()}})}function E(e,t,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return j()}for(r.method=o,r.arg=a;;){var c=r.delegate;if(c){var i=k(c,r);if(i){if(i===d)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=m(e,t,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function k(e,t){var r=t.method,n=e.iterator[r];if(void 0===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,k(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),d;var o=m(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,d;var a=o.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function q(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function O(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,n=function t(){for(;++r<e.length;)if(o.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return n.next=n}}return{next:j}}function j(){return{value:void 0,done:!0}}return p.prototype=v,a(g,"constructor",{value:v,configurable:!0}),a(v,"constructor",{value:p,configurable:!0}),p.displayName=l(v,s,"GeneratorFunction"),r.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},r.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,l(e,s,"GeneratorFunction")),e.prototype=Object.create(g),e},r.awrap=function(e){return{__await:e}},x(S.prototype),l(S.prototype,u,(function(){return this})),r.AsyncIterator=S,r.async=function(e,t,n,o,a){void 0===a&&(a=Promise);var c=new S(f(e,t,n,o),a);return r.isGeneratorFunction(t)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},x(g),l(g,s,"Generator"),l(g,i,(function(){return this})),l(g,"toString",(function(){return"[object Generator]"})),r.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},r.values=O,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(q),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(r,n){return c.type="throw",c.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n],c=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var i=o.call(a,"catchLoc"),u=o.call(a,"finallyLoc");if(i&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(i){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var c=a?a.completion:{};return c.type=e,c.arg=t,a?(this.method="next",this.next=a.finallyLoc,d):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),q(r),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;q(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:O(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},r}function r(e,t,r,n,o,a,c){try{var i=e[a](c),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,o)}function n(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var c=e.apply(t,n);function i(e){r(c,o,a,i,u,"next",e)}function u(e){r(c,o,a,i,u,"throw",e)}i(void 0)}))}}function o(){return a.apply(this,arguments)}function a(){return(a=n(t().mark((function e(){var r,n,o,a,c,i;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=document.querySelectorAll(".comments-container .comments-view .comment-body"),0!==(n=r.length)){e.next=4;break}return e.abrupt("return",!1);case 4:return o=document.querySelector(".comments-container form.comment-form"),e.next=7,fetch("/api-comments/has-more?offset=".concat(n,"&model_type=").concat(o.dataset.model_type,"&model_id=").concat(o.dataset.model_id));case 7:return a=e.sent,e.next=10,a.json();case 10:if(c=e.sent,200===a.status){e.next=14;break}throw i="An error has occurred: ".concat(a.status),new Error(i);case 14:return c.hasMore&&document.querySelector(".comments-container").insertAdjacentHTML("beforeend",c.showMoreButtonView),e.abrupt("return",c.hasMore);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function c(){var e=document.querySelector(".comments-container button.show-more-btn");e.addEventListener("click",function(){var r=n(t().mark((function r(o){var a,c,i,s,f,m,d,h,p;return t().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o.preventDefault(),e.disabled=!0,a=document.querySelectorAll(".comments-container .comments-view .comment-body"),c=a.length,i=document.querySelector(".comments-container form.comment-form"),r.next=7,fetch("/api-comments/show-more?offset=".concat(c,"&model_type=").concat(i.dataset.model_type,"&model_id=").concat(i.dataset.model_id));case 7:return s=r.sent,r.next=10,s.json();case 10:if(f=r.sent,200===s.status){r.next=15;break}throw e.disabled=!1,m="An error has occurred: ".concat(s.status),new Error(m);case 15:(d=f.commentsViews)&&(h=document.querySelector(".comments-container div.comments-view"),d.forEach((function(e){var r,o=document.createElement("div");o.innerHTML=e;var a=null===(r=o=o.querySelector("div"))||void 0===r?void 0:r.querySelector("form.delete-comment-form");null==a||a.addEventListener("submit",function(){var e=n(t().mark((function e(r){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.next=3,u(a);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),o.querySelector(".reply-btn").addEventListener("click",(function(e){e.preventDefault(),l(o)})),h.insertAdjacentElement("beforeend",o)})),p=document.querySelector(".comments-container button.show-more-btn"),!1===f.hasMore&&p.parentElement.remove()),e.disabled=!1;case 18:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())}function i(){var e=document.querySelector(".comment-form");grecaptcha.ready((function(){e.addEventListener("submit",function(){var r=n(t().mark((function r(o){var a,c,i,s,d,p,v,y,b,w,g,x;return t().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o.preventDefault(),e.querySelector("button.submit-btn").disabled=!0,c=e.dataset.recaptcha_key,r.next=5,grecaptcha.execute(c);case 5:return i=r.sent,s=JSON.parse(m("comment-user")),d={name:e.querySelector('input[name="name"]').value,email:e.querySelector('input[name="email"]').value,token:null!==(a=null==s?void 0:s.token)&&void 0!==a?a:h()},f("comment-user",JSON.stringify(d),365),"/api-comments/create",(p=Object.fromEntries(new FormData(e))).url=location.href,p.user_token=d.token,p.model_type=e.dataset.model_type,p.model_id=e.dataset.model_id,p.g_recaptcha_token=i,v={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},cache:"no-cache",body:JSON.stringify(p)},r.next=19,fetch("/api-comments/create",v);case 19:return y=r.sent,r.next=22,y.json();case 22:if(b=r.sent,y.ok){r.next=26;break}throw e.querySelector("button.submit-btn").disabled=!1,new Error(b.message);case 26:e.reset(),e.querySelector('input[name="name"]').setAttribute("value",d.name),e.querySelector('input[name="email"]').setAttribute("value",d.email),(w=b.commentView)&&(g=document.querySelector(".comments-view"),(x=document.createElement("div")).innerHTML=w,(x=x.querySelector("div")).addEventListener("submit",function(){var e=n(t().mark((function e(r){var n;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),n=x.querySelector("form.delete-comment-form"),e.next=4,u(n,d);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),x.querySelector(".reply-btn").addEventListener("click",(function(e){e.preventDefault(),l(x)})),g.prepend(x),window.scroll(0,g.offsetTop-130)),e.querySelector("button.submit-btn").disabled=!1;case 32:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())}))}function u(e){return s.apply(this,arguments)}function s(){return(s=n(t().mark((function e(r){var n,o,a,c,i,u,s,l;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=(n=JSON.parse(m("comment-user")))&&n.token){e.next=3;break}return e.abrupt("return");case 3:if(o=document.querySelector("form.comment-form"),a=!1,confirm("Точно хотите удалить?")&&(a=!0),a){e.next=8;break}return e.abrupt("return");case 8:return r.querySelector("button.delete-btn").disabled=!0,c="/api-comments/delete/".concat(r.dataset.id),(i=Object.fromEntries(new FormData(r))).user_token=n.token,u={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},cache:"no-cache",body:JSON.stringify(i)},e.next=15,fetch(c,u);case 15:return s=e.sent,e.next=18,s.json();case 18:if(l=e.sent,s.ok){e.next=23;break}throw o.querySelector("button.delete-btn").disabled=!1,new Error(l.message);case 23:r.closest("div.comment-body").remove();case 24:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(e){var t=e.querySelector(".comment-name").innerText,r=document.querySelector(".comments-container .comment-form textarea");r.scrollIntoView({behavior:"smooth",block:"center"}),r.value="@".concat(t," "),setTimeout((function(){r.focus(),r.setSelectionRange(r.value.length,r.value.length)}),500)}function f(e,t,r){var n="";if(r){var o=new Date;o.setTime(o.getTime()+24*r*60*60*1e3),n="; expires="+o.toUTCString()}document.cookie=e+"="+(t||"")+n+"; path=/"}function m(e){for(var t=e+"=",r=document.cookie.split(";"),n=0;n<r.length;n++){for(var o=r[n];" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return null}document.addEventListener("DOMContentLoaded",n(t().mark((function e(){var r,a;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=document.querySelector("form.comment-form"),(a=JSON.parse(m("comment-user")))&&(r.querySelector('input[name="name"]').setAttribute("value",a.name),r.querySelector('input[name="email"]').setAttribute("value",a.email),void 0,document.querySelectorAll("form.delete-comment-form").forEach((function(e){e.addEventListener("submit",function(){var r=n(t().mark((function r(n){return t().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,u(e);case 3:case"end":return t.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())}))),void 0,document.querySelectorAll(".comments-view .comment-body").forEach((function(e){var t=e.querySelector(".reply-btn");t.addEventListener("click",(function(t){t.preventDefault(),l(e)}))})),i(),e.next=7,o();case 7:if(!e.sent){e.next=9;break}c();case 9:case"end":return e.stop()}}),e)}))));var d=function(){return Math.random(0).toString(36).substr(2)},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:40;return(d()+d()+d()+d()).substr(0,e)}})();