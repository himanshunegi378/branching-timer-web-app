(this.webpackJsonpcountdown_webapp=this.webpackJsonpcountdown_webapp||[]).push([[0],{20:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),c=n(9),a=n.n(c),o=n(13),s=n(3),u=(n(20),n(25)),l=n.p+"static/media/close.96841b05.svg",d=n(0);var m=function(e){var t=e.onNameChange,n=e.onTimeChange,i=e.onDelete,c=e.id,a=e.name,o=e.time,u=e.active,m=Object(r.useState)(),f=Object(s.a)(m,2),j=f[0],h=f[1],b=Object(r.useState)(),v=Object(s.a)(b,2),g=v[0],p=v[1],O=Object(r.useState)((function(){return!1})),x=Object(s.a)(O,2),w=x[0],y=x[1],T=Object(r.useState)("alert-info"),N=Object(s.a)(T,2),S=N[0],C=N[1];return Object(r.useEffect)((function(){if(o){var e=parseInt(o/60),t=parseInt(o%60);h(e),p(t)}}),[o]),Object(r.useEffect)((function(){C(u?"bg-red-100":"bg-blue-100")}),[u]),Object(d.jsxs)("div",{id:e.id,className:"my-1 rounded-lg ".concat(u?"elevation-4 ":"elevation-1"),children:[Object(d.jsx)("div",{className:"".concat(S," w-full rounded-t-lg  border border-b-0 border-gray-300 px-1 "),children:Object(d.jsxs)("div",{className:"flex flex-row justify-between items-center",children:[Object(d.jsx)("div",{onClick:function(){return y(!0)},children:w?Object(d.jsx)("form",{onSubmit:function(e){e.preventDefault(),y(!1),t(e.currentTarget.title.value)},onBlur:function(e){t(e.currentTarget.title.value),y(!1)},children:Object(d.jsx)("input",{autoFocus:!0,autoComplete:"off",type:"text",name:"title"})}):a}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{className:"select-none flex items-center rounded-full elevation-1",onClick:function(){i(c)},children:Object(d.jsx)("img",{className:"h-4 w-auto",src:l})})})]})}),Object(d.jsx)("div",{className:"border border-t-0 rounded-b-lg  border-gray-300",children:Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=parseInt(e.currentTarget.mins.value),r=parseInt(e.currentTarget.secs.value),i=0;t&&(i+=60*t),r&&(i+=r),n(i)},onBlur:function(e){var t=parseInt(e.currentTarget.mins.value),r=parseInt(e.currentTarget.secs.value),i=0;t&&(i+=60*t),r&&(i+=r),n(i)},className:"text-center py-2",children:[Object(d.jsx)("input",{name:"mins",style:{width:"3em"},type:"number",placeholder:"m",onChange:function(e){return h(e.target.value)},value:j}),Object(d.jsx)("span",{className:"mx-1",children:":"}),Object(d.jsx)("input",{name:"secs",style:{width:"3em"},type:"number",placeholder:"s",onChange:function(e){return p(e.target.value)},value:g})]})})]})},f=n.p+"static/media/close.96841b05.svg";function j(e){var t=e.isPlaying,n=void 0!==t&&t,r=e.onChange,i=void 0===r?function(){}:r;return Object(d.jsx)("div",{className:"cursor-pointer",onClick:function(){i(!n)},children:n?Object(d.jsxs)("svg",{style:{fill:"#007bff"},className:"h-8 w-auto",height:"512",version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 477.867 477.867",children:[Object(d.jsx)("g",{children:Object(d.jsx)("g",{children:Object(d.jsx)("path",{d:"M187.733,0H51.2c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533 c9.426,0,17.067-7.641,17.067-17.067V17.067C204.8,7.641,197.159,0,187.733,0z M170.667,443.733h-102.4v-409.6h102.4V443.733z"})})}),Object(d.jsx)("g",{children:Object(d.jsx)("g",{children:Object(d.jsx)("path",{d:"M426.667,0H290.133c-9.426,0-17.067,7.641-17.067,17.067V460.8c0,9.426,7.641,17.067,17.067,17.067h136.533 c9.426,0,17.067-7.641,17.067-17.067V17.067C443.733,7.641,436.092,0,426.667,0z M409.6,443.733H307.2v-409.6h102.4V443.733z"})})})]}):Object(d.jsx)("svg",{style:{fill:"#007bff"},className:"h-8 w-auto",height:"512",version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 477.886 477.886",children:Object(d.jsx)("g",{children:Object(d.jsx)("g",{children:Object(d.jsx)("path",{d:"M476.091,231.332c-1.654-3.318-4.343-6.008-7.662-7.662L24.695,1.804C16.264-2.41,6.013,1.01,1.8,9.442 c-1.185,2.371-1.801,4.986-1.8,7.637v443.733c-0.004,9.426,7.633,17.07,17.059,17.075c2.651,0.001,5.266-0.615,7.637-1.8 L468.429,254.22C476.865,250.015,480.295,239.768,476.091,231.332z M34.133,433.198V44.692l388.506,194.253L34.133,433.198z"})})})})})}function h(e){var t=e.looping,n=void 0!==t&&t,r=e.onChange,i=void 0===r?function(){}:r;return Object(d.jsx)("div",{className:"cursor-pointer",onClick:function(){i(!n)},children:n?Object(d.jsxs)("svg",{className:"h-8 w-auto",style:{fill:"#007bff"},id:"Layer",enableBackground:"new 0 0 64 64",height:"512",viewBox:"0 0 64 64",width:"512",xmlns:"http://www.w3.org/2000/svg",children:[Object(d.jsx)("path",{d:"m19 25h9c1.104 0 2-.896 2-2s-.896-2-2-2h-9c-6.065 0-11 4.935-11 11s4.935 11 11 11h4.172l-1.586 1.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l5-5c.781-.781.781-2.047 0-2.828l-5-5c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l1.586 1.586h-4.172c-3.859 0-7-3.141-7-7 0-3.86 3.141-7 7-7z"}),Object(d.jsx)("path",{d:"m45 21h-4.172l1.586-1.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0l-5 5c-.781.781-.781 2.047 0 2.828l5 5c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-1.586-1.586h4.172c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7h-9c-1.104 0-2 .896-2 2s.896 2 2 2h9c6.065 0 11-4.935 11-11s-4.935-11-11-11z"})]}):Object(d.jsxs)("svg",{className:"h-8 w-auto",style:{fill:" #dadada"},id:"Layer",enableBackground:"new 0 0 64 64",height:"512",viewBox:"0 0 64 64",width:"512",xmlns:"http://www.w3.org/2000/svg",children:[Object(d.jsx)("path",{d:"m19 25h9c1.104 0 2-.896 2-2s-.896-2-2-2h-9c-6.065 0-11 4.935-11 11s4.935 11 11 11h4.172l-1.586 1.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l5-5c.781-.781.781-2.047 0-2.828l-5-5c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l1.586 1.586h-4.172c-3.859 0-7-3.141-7-7 0-3.86 3.141-7 7-7z"}),Object(d.jsx)("path",{d:"m45 21h-4.172l1.586-1.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0l-5 5c-.781.781-.781 2.047 0 2.828l5 5c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-1.586-1.586h4.172c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7h-9c-1.104 0-2 .896-2 2s.896 2 2 2h9c6.065 0 11-4.935 11-11s-4.935-11-11-11z"})]})})}var b=function(e){var t=e.isStopped,n=e.onChange,r=void 0===n?function(){}:n;return Object(d.jsx)("div",{className:"cursor-pointer",onClick:function(){return r(!t)},children:t?Object(d.jsx)("div",{className:"mx-2 h-auto my-1",style:{width:"2rem"},children:Object(d.jsx)("svg",{style:{fill:"#dadada"},className:"h-8 w-auto",id:"Capa_1",enableBackground:"new 0 0 512 512",height:"512",viewBox:"0 0 512 512",width:"512",xmlns:"http://www.w3.org/2000/svg",children:Object(d.jsxs)("g",{children:[Object(d.jsx)("path",{d:"m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm115 356c0 8.284-6.716 15-15 15h-200c-8.284 0-15-6.716-15-15v-200c0-8.284 6.716-15 15-15h200c8.284 0 15 6.716 15 15z"}),Object(d.jsx)("path",{d:"m171 171h170v170h-170z"})]})})}):Object(d.jsx)("div",{className:"mx-2 h-auto my-1",style:{width:"2rem"},children:Object(d.jsx)("svg",{className:"h-8 w-auto",style:{fill:"#007bff"},id:"Capa_1",enableBackground:"new 0 0 512 512",height:"512",viewBox:"0 0 512 512",width:"512",xmlns:"http://www.w3.org/2000/svg",children:Object(d.jsxs)("g",{children:[Object(d.jsx)("path",{d:"m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm115 356c0 8.284-6.716 15-15 15h-200c-8.284 0-15-6.716-15-15v-200c0-8.284 6.716-15 15-15h200c8.284 0 15 6.716 15 15z"}),Object(d.jsx)("path",{d:"m171 171h170v170h-170z"})]})})})})},v=n(2),g=n(7),p=n(10),O=n(14),x=n(12),w=function(e){Object(O.a)(n,e);var t=Object(x.a)(n);function n(){var e;return Object(g.a)(this,n),(e=t.call(this,"tick","finished")).intervalId=void 0,e.intervalId=-1,e}return Object(p.a)(n,[{key:"play",value:function(e){var t=this;this.stop();var n,r=Date.now(),i=function(){n=e-((Date.now()-r)/1e3|0),t.trigger("tick",n),n<=0&&(r=Date.now()+1e3,t.stop(),t.trigger("finished"))};i(),this.intervalId=window.setInterval(i,1e3)}},{key:"stop",value:function(){clearInterval(this.intervalId)}}]),n}((function e(){Object(g.a)(this,e);for(var t={},n=this,r=0,i=0;i<arguments.length;i++){var c=arguments[i];switch(typeof c){case"string":t[c]=[],r++;break;case"object":n=c;break;default:throw new TypeError("Eventjs() only accepts string and object parameters")}}if(0===r)throw new Error("There should be at least one event name (string) for the Eventjs to be useful.");if(n===this&&!(this instanceof e))throw new ReferenceError('Eventjs is not called with "new" keyword and no parameter of type object is passed to it');function a(e){if("string"!==typeof e||!t[e])throw new ReferenceError("The event name does not exist in this event manager: "+e);return!0}return n.on=function(e){a(e);for(var n=1;n<arguments.length;n++){var r=arguments[n];-1===t[e].indexOf(r)&&t[e].push(r)}return this},n.off=function(e){switch(arguments.length){case 0:for(var r in t)t.hasOwnProperty(r)&&n.off(r);break;case 1:a(e),t[e].length=0;break;default:a(e);for(var i=1;i<arguments.length;i++){var c=arguments[i],o=t[e].indexOf(c);-1!==o&&t[e].splice(o,1)}}return this},n.trigger=function(e){a(e);for(var r=[],i=1;i<arguments.length;i++)r.push(arguments[i]);for(var c=t[e],o=[],s=0;s<c.length;s++){var u=c[s];try{u.apply(n,r)}catch(d){o.push({listener:u,error:d})}}if(o.length>0){var l=new Error("At least one of the event listeners was interrupted with an error. See errors");throw console.log(o),l.errors=o,l}return this},n}));var y=function(e){if("Notification"in window){if("granted"===Notification.permission)return new Notification(e);"denied"!==Notification.permission&&Notification.requestPermission().then((function(t){if("granted"===t)return new Notification(e)}))}else alert("This browser does not support desktop notification")},T=n(11);function N(){var e=Object(r.useState)(-1),t=Object(s.a)(e,2),n=t[0],i=t[1],c=Object(r.useRef)(null);return{play:function(e,t){c.current=new T.Howl({src:[e]});var n=c.current.play();t&&setTimeout((function(){c.current&&c.current.stop(n)}),1e3*t),i(n)},pause:function(){c.current&&c.current.pause(n)},stop:function(){c.current&&c.current.stop(n)}}}var S=function(e){var t=localStorage.getItem(e);return t?JSON.parse(t):null},C=function(e,t){localStorage.setItem(e,JSON.stringify(t))},I=function(e){localStorage.removeItem(e)},k=n(6);function E(){var e=Object(r.useState)({}),t=Object(s.a)(e,2),n=t[0],i=t[1];function c(e){C(e.id,e)}return{init:function(e){var t={};e.forEach((function(e){var n=function(e){return S(e)||null}(e);n&&(t[e]=n)})),i(t)},addTimer:function(e,t){var r=Object(u.a)(),a={id:r,name:e,time:t};return i(Object(v.a)(Object(v.a)({},n),{},Object(k.a)({},r,a))),c(a),a},getTimer:function(e){return n[e]},deleteTimer:function(e){var t=Object(v.a)({},n);delete t[e],function(e){I(e)}(e),i(t)},updateTimer:function(e,t){var r=Object(v.a)({},n);r[e].name=t.name||r[e].name,r[e].time=t.time||r[e].time,c(r[e]),i(r)},timerStore:n}}function D(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"unname",n=Object(r.useState)({id:e,name:t,timers:[]}),i=Object(s.a)(n,2),c=i[0],a=i[1],o=E(),u=o.init,l=o.addTimer,d=o.getTimer,m=o.deleteTimer,f=o.updateTimer,j=o.timerStore;Object(r.useEffect)((function(){if(e){var t=g(e);if(t){a(t);var n=t.timers;u(n)}}}),[e]);var h=function(e){C(e.id,e)},b=function(e){I(e.id)},g=function(e){return S(e)};function p(e,t){var n=l(e,t),r=Object(v.a)({},c);return r.timers.push(n.id),h(r),a(r),r}function O(e){var t=Object(v.a)({},c),n=t.timers.filter((function(t){return t!==e}));return n.length!==t.timers.length&&m(e),t.timers=n,h(t),a(t),t}function x(){c.timers.forEach((function(e){m(e)})),b(c)}function w(e){e&&(a(Object(v.a)(Object(v.a)({},c),{},{name:e})),h(Object(v.a)(Object(v.a)({},c),{},{name:e})))}return{addTimerInGroup:p,deleteTimerFromGroup:O,deleteTimerGroup:x,changeGroupName:w,timerGroupStore:c,updateTimer:f,getTimer:d,timerStore:j}}var z=n.p+"static/media/alarm.4ef57659.mp3";function L(e){var t=e.onDelete,n=e.timerCardId,i=function(e){var t=D(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Unnamed"),n=Object.assign({},t),i=Object(r.useState)({looping:!1,status:"stopped"}),c=Object(s.a)(i,2),a=c[0],o=c[1],u=Object(r.useState)({currentTimerId:"",remainingTime:0,time:0}),l=Object(s.a)(u,2),d=l[0],m=l[1],f=Object(r.useRef)(new w),j=Object(r.useState)(!1),h=Object(s.a)(j,2),b=h[0],g=h[1],p=Object(r.useRef)(d),O=Object(r.useRef)(a),x=N(),T=x.play;x.pause,x.stop,Object(r.useEffect)((function(){var t=function(){localStorage.setItem("runningTimerData"+e,JSON.stringify(p.current)),localStorage.setItem("timerCardData"+e,JSON.stringify(O.current))};return window.addEventListener("pagehide",t),function(){window.removeEventListener("pagehide",t)}}),[e]),Object(r.useEffect)((function(){var e=function(e){m((function(t){var n=Object.assign({},t);return Object(v.a)(Object(v.a)({},n),{},{remainingTime:e})}))},t=f.current;return t.on("tick",e),function(){t.off("tick",e)}}),[]),Object(r.useEffect)((function(){p.current=d}),[d]),Object(r.useEffect)((function(){O.current=Object(v.a)(Object(v.a)({},a),{},{status:"stopped"===a.status?"stopped":"paused"})}),[a]),Object(r.useEffect)((function(){if(b){var e=n.timerGroupStore.timers,t=e.indexOf(d.currentTimerId),r=n.timerStore[e[t+1]];if(!r){if(!1===a.looping)return o(Object(v.a)(Object(v.a)({},a),{},{status:"stopped"})),m(Object(v.a)(Object(v.a)({},d),{},{remainingTime:0,currentTimerId:""})),void g(!1);r=n.timerStore[e[0]],m({currentTimerId:r.id,remainingTime:r.time,time:r.time})}return m({currentTimerId:r.id,remainingTime:r.time,time:r.time}),S(r.id),g(!1),function(){}}}),[b]),Object(r.useEffect)((function(){var t=localStorage.getItem("timerCardData"+e);if(t){var n=JSON.parse(t);o(n)}var r=localStorage.getItem("runningTimerData"+e);if(r){var i=JSON.parse(r);m(i)}}),[e]);var S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if((e=e||d.currentTimerId)||(e=n.timerGroupStore.timers[0])){var t=n.timerStore[e];t&&(m(Object(v.a)(Object(v.a)({},d),{},{currentTimerId:e})),f.current.off("finished"),"paused"===a.status?f.current.play(d.remainingTime):f.current.play(t.time),o(Object(v.a)(Object(v.a)({},a),{},{status:"playing"})),f.current.on("finished",(function(){y("".concat(n.timerGroupStore.name," => ").concat(t.name," | completed")),T(z,2),g(!0)})))}},C=function(){o(Object(v.a)(Object(v.a)({},a),{},{status:"paused"})),f.current.stop()},I=function(){f.current.stop(),o(Object(v.a)(Object(v.a)({},a),{},{status:"stopped"})),m(Object(v.a)(Object(v.a)({},d),{},{remainingTime:0,currentTimerId:""}))},k=function(){var t=Object(v.a)(Object(v.a)({},a),{},{looping:!a.looping});o(t),localStorage.setItem("timerCardData"+e,JSON.stringify(t))};return Object(v.a)(Object(v.a)({},n),{},{playCard:S,pausecard:C,stopCard:I,toggleLooping:k,timerCardData:a,runningTimer:d})}(e.timerCardId),c=Object.assign({},i),a=Object(r.useState)((function(){return!1})),o=Object(s.a)(a,2),u=o[0],l=o[1];return Object(d.jsx)("div",{children:Object(d.jsxs)("div",{className:"m-1 md:elevation-4 p-2 border rounded-lg border-gray-300",style:{width:"25%",minWidth:"265px",maxWidth:"265px"},children:[Object(d.jsx)("div",{className:"flex flex-row-reverse",children:Object(d.jsx)("button",{className:"select-none outline-none rounded-full elevation-1",onClick:function(){c.deleteTimerGroup(),t(n)},children:Object(d.jsx)("img",{className:"h-6 w-auto",src:f})})}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"text-7xl font-mono tracking-tighter font-medium text-center select-none",children:[parseInt(c.runningTimer.remainingTime/60)<=9?"0"+parseInt(c.runningTimer.remainingTime/60):parseInt(c.runningTimer.remainingTime/60),":",c.runningTimer.remainingTime%60<=9?"0"+c.runningTimer.remainingTime%60:c.runningTimer.remainingTime%60]}),Object(d.jsx)("hr",{}),Object(d.jsxs)("div",{className:"flex flex-row justify-between mx-2",children:[Object(d.jsx)("div",{className:"text-center font-medium cursor-pointer",children:Object(d.jsx)("div",{onClick:function(){return l(!0)},children:u?Object(d.jsx)("form",{onSubmit:function(e){e.preventDefault();var t=e.currentTarget.title.value;t&&c.changeGroupName(t),l(!1)},onBlur:function(e){e.preventDefault();var t=e.currentTarget.title.value;t&&c.changeGroupName(t),l(!1)},children:Object(d.jsx)("input",{autoFocus:!0,type:"text",name:"title"})}):c.timerGroupStore.name})}),Object(d.jsx)("div",{className:"px-0 user-select-none",children:Object(d.jsx)(h,{looping:c.timerCardData.looping,onChange:function(){return c.toggleLooping()}})})]}),Object(d.jsxs)("div",{className:"flex",children:[Object(d.jsx)("div",{className:" mx-2 h-8 w-auto my-1",children:Object(d.jsx)(j,{isPlaying:"playing"===c.timerCardData.status,onChange:function(e){(e?c.playCard:c.pausecard)()}})}),Object(d.jsx)(b,{isStopped:"stopped"===c.timerCardData.status,onChange:function(e){e&&c.stopCard()}})]}),c.timerGroupStore.timers.map((function(e){var t,n=c.timerStore[e];return Object(d.jsx)(m,{id:n.id,active:(null===(t=c.runningTimer)||void 0===t?void 0:t.currentTimerId)===(null===n||void 0===n?void 0:n.id),onDelete:function(e){c.deleteTimerFromGroup(e)},onNameChange:function(t){return c.updateTimer(e,{name:t})},onTimeChange:function(t){return c.updateTimer(e,{time:t})},name:n.name,time:n.time},n.id)})),Object(d.jsx)("div",{className:"flex justify-center",children:Object(d.jsx)("button",{className:" bg-blue-600 px-4 py-1 rounded-md text-white select-none",onClick:function(){c.addTimerInGroup("unaname",300)},children:"Add Timer"})})]})]})})}var B=function(e){var t=Object(r.useState)([]),n=Object(s.a)(t,2),i=n[0],c=n[1];return Object(r.useEffect)((function(){var e=localStorage.getItem("timerCardList");e&&c(JSON.parse(e))}),[]),Object(r.useEffect)((function(){localStorage.setItem("timerCardList",JSON.stringify(i))}),[i]),Object(r.useEffect)((function(){document.body.classList.remove("page-loading"),document.body.classList.add("page-loaded")}),[]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("button",{className:"select-none bg-blue-600 text-white px-4 py-2 rounded-full",onClick:function(){c((function(e){return[].concat(Object(o.a)(e),[Object(u.a)()])}))},children:"Add Timer Card"}),Object(d.jsx)("div",{className:"overflow-auto",children:Object(d.jsx)("div",{className:"flex",style:{alignItems:"flex-start"},children:i.map((function(e){return Object(d.jsx)(L,{timerCardId:e,onDelete:function(e){c((function(t){return t.filter((function(t){return t!==e}))}))}},e)}))})})]})},G=i.a.createContext("");function J(e){var t=e.children;return Object(d.jsx)(G.Provider,{value:"Himanshu",children:t})}var W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function R(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(23);a.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(J,{children:Object(d.jsx)(B,{})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.filter((function(e){})).map((function(e){return caches.delete(e)})))})))})),window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");W?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):R(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):R(t,e)}))}}()}},[[24,1,2]]]);
//# sourceMappingURL=main.fce0833a.chunk.js.map