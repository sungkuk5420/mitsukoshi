parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Ppov":[function(require,module,exports) {
var e=document.querySelector(".page1"),o=document.querySelector(".page2"),c=document.querySelector(".scroll-area.page3-4"),l=document.querySelector(".scroll-area.page6-7"),n=document.querySelector(".scroll-area.page9-10"),d=document.querySelector(".page5"),i=document.querySelector(".page6"),t=document.querySelector(".page7"),a=document.querySelector(".page8"),r=document.querySelector(".page9"),s=document.querySelector(".page10"),u=document.querySelector(".page11"),g=document.querySelector(".page12"),h=document.querySelector(".page13"),m=document.querySelector(".page14"),k=document.querySelector(".page15"),S=document.querySelector(".page16"),p=document.querySelector(".page17");window.handleClickMenu=function(){o.classList.add("show")},window.handleClickServiceBooking=function(){console.log("handleClickServiceBooking"),e.classList.add("hide"),o.classList.add("hide"),c.classList.remove("hide")},window.handleClickBooking=function(){console.log("handleClickBooking"),c.classList.add("hide"),d.classList.remove("hide")},window.handleClickAttendBooking=function(){console.log("handleClickAttendBooking"),d.classList.add("hide"),l.classList.remove("hide")},window.handleClick13Booking=function(){console.log("handleClickServiceBooking"),l.classList.add("hide"),a.classList.remove("hide")},window.handleClickNextOnPage8=function(){console.log("handleClickServiceBooking"),a.classList.add("hide"),n.classList.remove("hide")},window.handleClickNextOnPage10=function(){console.log("handleClickServiceBooking"),n.classList.add("hide"),u.classList.remove("hide")};
},{}]},{},["Ppov"], null)
//# sourceMappingURL=/javascripts.41c30d4a.js.map