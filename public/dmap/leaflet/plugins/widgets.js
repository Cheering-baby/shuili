/*! version:1.4.13 */
define(function(){return function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="./dist/dmap/leaflet/",n(n.s=178)}({178:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),t.d(n,"coordinates",function(){return i}),t.d(n,"hawkeyeMap",function(){return a});var o=t(179),r=t(180),i=function(e,n){return e._coordinates=new o.a(n).addTo(e.map)},a=function(e,n){return e._hawkeymap=new r.a(n).addTo(e.map)}},179:function(e,n,t){"use strict";var o=L,r=o.Control;n.a=r.extend({options:{position:"bottomleft"},onAdd:function(e){var n=T.create("span"),t=function(e){n.innerText="坐标："+e.lng.toFixed(4)+", "+e.lat.toFixed(4)};return t(e.getCenter()),e.on("mousemove",function(e){t(e.latlng)}),n}})},180:function(e,n,t){"use strict";var o=L,r=o.Control,i=o.TileLayer,a=o.Map,u=T,c=u.assign;n.a=r.extend({options:{position:"topright"},onAdd:function(e){var n=this,t=T.div();return T(t).setStyle({position:"relative",width:"200px",height:"200px",border:"2px solid #3D6DCC",borderRadius:"100px"}),T.defer(function(){n.createHawkeyeMap(t)}),t},createHawkeyeMap:function(e,n){var t=this._map,o=new a(e,c({},t.options,{attributionControl:!1,zoomControl:!1,scrollWheelZoom:!1}));o.touchZoom.disable(),o.doubleClickZoom.disable(),o.scrollWheelZoom.disable();var r=function(e){o.setView(t.getCenter(),t.getZoom()-2)};return function(e){e&&o.eachLayer(function(e){o.removeLayer(e)}),t.eachLayer(function(e){e instanceof i&&new i(e._url,c({},e.options)).addTo(o)})}(),t.whenReady(r),t.on("move",r),o.on("dragend",function(){t.panTo(o.getCenter(),{animate:!1})}),o}})}})});
//# sourceMappingURL=widgets.js.map