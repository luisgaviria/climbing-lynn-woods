(this.webpackJsonplynnwoods=this.webpackJsonplynnwoods||[]).push([[0],{144:function(e,t,n){},145:function(e,t,n){},210:function(e,t,n){},211:function(e,t,n){},213:function(e,t,n){},440:function(e,t,n){},441:function(e,t,n){},444:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(24),s=n.n(c),o=(n(210),n(211),n(29)),i=n(17),l=n(6),u=n.n(l),j=n(16),p=n(13),d=n(2),b=n(7),h=(n(213),"https://lynnwoods.herokuapp.com/"),m=n(1),O=function(){var e=function(){var e=Object(j.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:window.location.href=h+"api/auth/google";case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("link",{rel:"stylesheet",type:"text/css",href:"//fonts.googleapis.com/css?family=Open+Sans"}),Object(m.jsxs)("div",{onClick:e,class:"google-btn",children:[Object(m.jsx)("div",{class:"google-icon-wrapper",children:Object(m.jsx)("img",{class:"google-icon",src:"https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"})}),Object(m.jsx)("p",{class:"btn-text",children:Object(m.jsx)("b",{children:"Sign in with google"})})]})]})},g=n(18),f=n.n(g),x=function(e){var t=Object(a.useState)({login:"",password:"",error:!1}),n=Object(b.a)(t,2),r=n[0],c=n[1],s=Object(i.f)(),o=function(e){c((function(t){return Object(d.a)(Object(d.a)({},t),{},Object(p.a)({},e.target.name,e.target.value))}))},l=function(){var e=Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post(h+"api/auth/login",{login:r.login,password:r.password},{headers:{"Content-Type":"application/json"}});case 3:t=e.sent,localStorage.setItem("token",t.data.token),s.push("/rocks"),e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",c((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:!0})})));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return Object(m.jsxs)("div",{style:{margin:"auto",width:"500px",marginTop:"200px"},children:[Object(m.jsx)("input",{placeholder:"Login",onChange:o,value:r.login,name:"login",style:{display:"inline-block"}}),Object(m.jsx)("br",{}),Object(m.jsx)("input",{placeholder:"Password",onChange:o,value:r.password,name:"password",style:{display:"inline-block"},type:"password"}),Object(m.jsx)("br",{}),Object(m.jsx)("button",{style:{margin:"auto"},onClick:l,children:"Login"}),r.error?Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("p",{style:{color:"red"},children:"Wrong Password or Login"})}):null,Object(m.jsx)(O,{}),Object(m.jsx)("button",{style:{margin:"auto"},onClick:function(){s.push("/register")},children:"Register"})]})},v=function(e){var t=Object(i.f)();return Object(a.useEffect)(Object(j.a)(u.a.mark((function n(){var a,r;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=new URLSearchParams(e.location.search),r=a.get("token"),localStorage.setItem("token",r),t.push("/rocks");case 4:case"end":return n.stop()}}),n)}))),[]),Object(m.jsx)(m.Fragment,{})},k=function(e){var t=Object(a.useState)({username:"",email:"",password:"",error:!1}),n=Object(b.a)(t,2),r=n[0],c=n[1],s=Object(i.f)(),o=function(e){c((function(t){return Object(d.a)(Object(d.a)({},t),{},Object(p.a)({},e.target.name,e.target.value))}))},l=function(){var e=Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post(h+"api/auth/register",{username:r.username,email:r.email,password:r.password},{headers:{"Content-Type":"application/json"}});case 3:t=e.sent,localStorage.setItem("token",t.data.token),s.push("/rocks"),e.next=12;break;case 8:return e.prev=8,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",c((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:!0})})));case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{children:Object(m.jsx)("input",{placeholder:"Username",name:"username",value:r.username,onChange:o})}),Object(m.jsx)("div",{children:Object(m.jsx)("input",{placeholder:"Email",name:"email",value:r.email,onChange:o})}),Object(m.jsx)("div",{children:Object(m.jsx)("input",{placeholder:"Password",type:"password",name:"password",value:r.password,onChange:o})}),Object(m.jsx)("button",{onClick:l,children:"Sign In"}),r.error?Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("p",{style:{color:"red"},children:"Account Username or Email is already taken"})}):null]})},y=(n(144),n(135)),w=function(e){var t=Object(i.f)();return Object(m.jsx)(y.a,{children:e.area.map((function(e){return Object(m.jsx)(y.a.Item,{style:{cursor:"pointer"},onClick:function(){return function(e){t.push("/rocks/".concat(e))}(e)},children:e})}))})},S=function(){var e,t=Object(a.useState)({boulders:{}}),n=Object(b.a)(t,2),r=n[0],c=n[1];return Object(a.useEffect)(Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get(h+"api/rocks",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 2:t=e.sent,c((function(e){return Object(d.a)(Object(d.a)({},e),{},{boulders:t.data.rocks})}));case 4:case"end":return e.stop()}}),e)}))),[]),Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("div",{className:"rocks-grid",children:null===(e=Object.keys(r.boulders))||void 0===e?void 0:e.map((function(e){return Object(m.jsxs)(m.Fragment,{children:[" ",Object(m.jsxs)("div",{className:"area",children:[Object(m.jsx)("h3",{className:"area-name",children:e}),Object(m.jsx)(w,{area:r.boulders[e]})]})]})}))})})},C=n(76),T=(n(145),n(103)),N=n.n(T),I=function(e){var t=Object(i.f)(),n={size:50,isHalf:!0,char:"\u2605",count:4,value:e.path.avgStars,edit:!1};return Object(m.jsxs)("div",{className:"card",style:{cursor:"pointer"},onClick:function(){t.push("/path/".concat(e.path.route))},children:[Object(m.jsx)("div",{className:"card-image",children:e.path.photos[0]?Object(m.jsx)(C.a,{className:"image-inner",fluid:!0,src:e.path.photos[0]}):Object(m.jsx)(C.a,{className:"image-inner",fluid:!0,src:"http://frmpollet.me/pictures/upload/2019/06/02/20190602122401-695dffd6.png"})}),Object(m.jsxs)("div",{className:"card-body",children:[Object(m.jsx)(N.a,Object(d.a)({data:e.path.avgStars},n)),Object(m.jsx)("h2",{children:"".concat(e.path.route," ").concat(e.path.rating)})]})]})},A=function(e){var t=Object(a.useState)({paths:[]}),n=Object(b.a)(t,2),r=n[0],c=n[1];return Object(a.useEffect)(Object(j.a)(u.a.mark((function t(){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.get(h+"api/rocks/"+e.match.params.boulder,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 2:n=t.sent,c((function(e){return Object(d.a)(Object(d.a)({},e),{},{paths:n.data.paths})}));case 4:case"end":return t.stop()}}),t)}))),[]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h1",{style:{textAlign:"center",marginTop:"1rem"},children:e.match.params.boulder}),Object(m.jsx)("div",{className:"list-item",children:r.paths.map((function(e){return Object(m.jsx)(I,{path:e})}))})]})},E=n(3),_=n(4),B=n(9),L=n(8),z=n(77),M=n(134),q=Object(M.a)(Object(M.b)({googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",loadingElement:Object(m.jsx)("div",{style:{height:"100%"}}),containerElement:Object(m.jsx)("div",{style:{height:"480px"}}),mapElement:Object(m.jsx)("div",{style:{height:"100%"}})}),z.withScriptjs,z.withGoogleMap)((function(e){return Object(m.jsx)(z.GoogleMap,{defaultZoom:18,center:{lat:e.boulder.latitude,lng:e.boulder.longitude},defaultCenter:{lat:42.361145,lng:-72.057083},children:Object(m.jsx)(z.Marker,{position:{lat:e.boulder.latitude,lng:e.boulder.longitude}})})})),F=function(e){Object(B.a)(n,e);var t=Object(L.a)(n);function n(){var e;Object(E.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={isMarkerShown:!1},e.delayedShowMarker=function(){setTimeout((function(){e.setState({isMarkerShown:!0})}),3e3)},e.handleMarkerClick=function(){e.setState({isMarkerShown:!1}),e.delayedShowMarker()},e}return Object(_.a)(n,[{key:"componentDidMount",value:function(){this.delayedShowMarker()}},{key:"render",value:function(){return console.log(this.props.boulder),Object(m.jsx)(q,{boulder:this.props.boulder})}}]),n}(r.a.PureComponent),P=F,R=function(e){var t,n=Object(a.useState)({input:"",users:[],choosen_user:null,completion_input:!1,message:null}),r=Object(b.a)(n,2),c=r[0],s=r[1];Object(a.useEffect)(Object(j.a)(u.a.mark((function t(){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.get(h+"api/path/"+e.match.params.path,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 2:n=t.sent,s((function(e){return Object(d.a)(Object(d.a)(Object(d.a)({},e),n.data.path),{},{submissions:n.data.submissions})}));case 4:case"end":return t.stop()}}),t)}))),[]);var o=Object(a.useCallback)(Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get(h+"api/users/"+c.input,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 2:t=e.sent,s((function(e){return Object(d.a)(Object(d.a)({},e),{},{users:t.data.users})}));case 4:case"end":return e.stop()}}),e)}))),[c.input]);Object(a.useEffect)((function(){var e;return s((function(e){return Object(d.a)({},e)})),e=setTimeout((function(){o()}),400),function(){return clearTimeout(e)}}),[o]);var i=function(){var e=Object(j.a)(u.a.mark((function e(t,n,a){var r,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post(h+"api/path/"+c._id.toString()+"/finish",{witnessId:null===(r=c.choosen_user)||void 0===r?void 0:r._id.toString()},{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 3:o=e.sent,s((function(e){return Object(d.a)(Object(d.a)({},e),{},{message:{data:o.data.message,color:"green"}})})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),s((function(t){return Object(d.a)(Object(d.a)({},t),{},{message:{data:e.t0.response.data.message,color:"red"}})}));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n,a){return e.apply(this,arguments)}}();return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:"container",children:[Object(m.jsx)("h6",{className:"route-location",children:c.location}),Object(m.jsx)("div",{className:"route-name-description",children:Object(m.jsx)("h2",{children:c.route+" "+c.rating})}),null===(t=c.photos)||void 0===t?void 0:t.map((function(e){return Object(m.jsx)("div",{className:"image-container",children:Object(m.jsx)(C.a,{className:"grow",src:e,fluid:!0})})})),c.avgStars?Object(m.jsx)(N.a,{size:60,isHalf:!0,char:"\u2605",count:4,edit:!1,value:c.avgStars}):null,Object(m.jsxs)("p",{className:"route-description",children:[Object(m.jsx)("strong",{children:"Description:"})," ",c.description]}),Object(m.jsxs)("h6",{children:["FA: ",c.FA]}),c.completion_input?Object(m.jsxs)("div",{children:[Object(m.jsx)("input",{placeholder:"Username of witness",value:c.input,onChange:function(e){s((function(t){return Object(d.a)(Object(d.a)({},t),{},{input:e.target.value})}))}}),c.users.map((function(e){return Object(m.jsx)("div",{onClick:function(){return s((function(t){return Object(d.a)(Object(d.a)({},t),{},{choosen_user:e,input:e.username})}))},children:Object(m.jsx)("p",{style:{cursor:"pointer"},children:e.username})})})),Object(m.jsx)("button",{onClick:i,children:"Submit"}),c.message?Object(m.jsx)("p",{style:{color:c.message.color},children:c.message.data}):null]}):null]}),Object(m.jsx)(P,{className:"path-map",boulder:c})]})},U=function(e){var t=Object(a.useState)({requests:[]}),n=Object(b.a)(t,2),r=n[0],c=n[1];Object(a.useEffect)(Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get(h+"api/requests",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 2:t=e.sent,c({requests:t.data.requests});case 4:case"end":return e.stop()}}),e)}))),[]);var s=function(){var e=Object(j.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.patch(h+"api/request/"+t._id.toString(),{},{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 2:n=e.sent,c({requests:n.data.requests}),console.log(n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=Object(j.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.delete(h+"api/request/"+t._id.toString(),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 2:n=e.sent,c({requests:n.data.requests});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{style:{textAlign:"center"},children:"Requests"}),Object(m.jsx)("div",{children:r.requests.map((function(e){return Object(m.jsxs)("div",{style:{margin:"auto",width:"400px",marginTop:"50px"},children:[Object(m.jsx)("p",{children:e.climber.username}),Object(m.jsx)("p",{children:e.boulder.route}),Object(m.jsx)("p",{children:e.boulder.location}),Object(m.jsx)("p",{children:e.boulder.rating}),Object(m.jsx)("button",{onClick:function(){return s(e)},children:"Confirm"}),Object(m.jsx)("button",{onClick:function(){return o(e)},children:"Delete"})]})}))})]})},K=function(e){var t=e.completed_climb;return Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{children:t.boulder.route}),Object(m.jsx)("p",{children:t.boulder.rating}),t.witnesses.map((function(e){return Object(m.jsxs)("div",{children:[Object(m.jsxs)("p",{children:["Username: ",e.witness.username]}),Object(m.jsx)("p",{children:e.accepted?"Verified":"Not verified"})]})}))]})},D=function(e){var t,n=Object(a.useState)({completed_climbs:[]}),r=Object(b.a)(n,2),c=r[0],s=r[1];return Object(a.useEffect)(Object(j.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get(h+"api/completed_climbs",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 2:t=e.sent,s({completed_climbs:t.data.completedBoulders});case 4:case"end":return e.stop()}}),e)}))),[]),Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{children:"Completed Climbs"}),null===(t=c.completed_climbs)||void 0===t?void 0:t.map((function(e){return Object(m.jsx)(K,{completed_climb:e})}))]})},G=n(67),H=[{elementType:"geometry",stylers:[{hue:"#ff4400"},{saturation:-68},{lightness:-4},{gamma:.72}]},{featureType:"road",elementType:"labels.icon"},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{hue:"#0077ff"},{gamma:3.1}]},{featureType:"water",stylers:[{hue:"#00ccff"},{gamma:.44},{saturation:-33}]},{featureType:"poi.park",stylers:[{hue:"#44ff00"},{saturation:-23}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{hue:"#007fff"},{gamma:.77},{saturation:65},{lightness:99}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{gamma:.11},{weight:5.6},{saturation:99},{hue:"#0091ff"},{lightness:-86}]},{featureType:"transit.line",elementType:"geometry",stylers:[{lightness:-48},{hue:"#ff5e00"},{gamma:1.2},{saturation:-23}]},{featureType:"transit",elementType:"labels.text.stroke",stylers:[{saturation:-64},{hue:"#ff9100"},{lightness:16},{gamma:.47},{weight:2.7}]}],J=(n(440),{width:"100vw",height:"100vh"}),Q=["places"],W={lat:42.493851,lng:-70.995081};function Y(){var e=Object(i.f)(),t=Object(G.d)({googleMapsApiKey:"AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",libraries:Q}),n=t.isLoaded,c=t.loadError;Object(a.useEffect)((function(){var e=setInterval((function(){navigator.geolocation.getCurrentPosition((function(e){x({lat:e.coords.latitude,lng:e.coords.longitude})}))}),2e3);return function(){return clearInterval(e)}}));var s=r.a.useState([]),o=Object(b.a)(s,2),l=o[0],p=o[1],d=r.a.useState(null),O=Object(b.a)(d,2),g=O[0],x=O[1],v=r.a.useState(null),k=Object(b.a)(v,2),y=k[0],w=k[1],S=r.a.useRef(),C=r.a.useCallback(function(){var e=Object(j.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return navigator.geolocation.getCurrentPosition((function(e){x({lat:e.coords.latitude,lng:e.coords.longitude}),console.log("Latitude is: ",e.coords.latitude),console.log("Longitude is: ",e.coords.longitude)})),e.next=3,f.a.get(h+"api/boulders",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}});case 3:n=e.sent,p(n.data.boulders),S.current=t,console.log(n.data.boulders);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),T=r.a.useCallback((function(t){e.push("api/path/".concat(t))}),[]);r.a.useCallback((function(e){var t=e.lat,n=e.lng;S.current.panTo({lat:t,lng:n}),S.current.setZoom(10)}));return c?"Error loading maps":n?Object(m.jsx)("div",{className:"map",children:Object(m.jsxs)(G.a,{mapContainerStyle:J,zoom:13.9,center:W,onLoad:C,options:{styles:H},children:[l.map((function(e,t){return Object(m.jsx)(G.c,{position:{lat:e.latitude,lng:e.longitude},onClick:function(){w(e)}},t)})),(null===g||void 0===g?void 0:g.lat)?Object(m.jsx)(G.c,{position:g,icon:{url:"https://img.icons8.com/emoji/48/000000/blue-circle-emoji.png",scaledSize:new window.google.maps.Size(30,30),origin:new window.google.maps.Point(0,0),anchor:new window.google.maps.Point(15,15)}},"position"):null,y?Object(m.jsx)(G.b,{position:{lat:y.latitude,lng:y.longitude},onCloseClick:function(){w(null)},children:Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{children:y.Boulder}),y.routes.map((function(e){return Object(m.jsx)("p",{onClick:function(){return T(e)},style:{cursor:"pointer"},children:e})}))]})}):null]})}):"Loading Maps"}var Z=function(){return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(Y,{})})},V=n(447),X=n(448),$=n.p+"static/media/climber.39da9c07.png",ee=(n(441),function(){return Object(m.jsx)("header",{children:Object(m.jsxs)(V.a,{className:"navbar",collapseOnSelect:!0,expand:"md",bg:"dark",variant:"dark",children:[Object(m.jsx)(V.a.Brand,{children:Object(m.jsx)("a",{href:"/",className:"navbar-brand",children:Object(m.jsx)("img",{alt:"company logo",className:"d-inline-block",src:$})})}),Object(m.jsx)(V.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(m.jsx)(V.a.Collapse,{id:"responsive-navbar-nav",children:Object(m.jsxs)(X.a,{children:[Object(m.jsx)(X.a.Link,{children:Object(m.jsx)(o.b,{className:"navbar-brand-text",to:"/rocks",children:"Lynn Woods Areas"})}),Object(m.jsx)(X.a.Link,{children:Object(m.jsx)(o.b,{className:"navbar-brand-text",to:"/map",children:"Bouldering Map"})}),Object(m.jsx)(X.a.Link,{children:Object(m.jsx)(o.b,{className:"navbar-brand-text",to:"/requests",children:"Requests"})}),Object(m.jsx)(X.a.Link,{children:Object(m.jsx)(o.b,{className:"navbar-brand-text",to:"/completed_climbs",children:"Completed Climbs"})})]})})]})})});var te=function(){return Object(m.jsxs)(o.a,{children:[Object(m.jsx)(ee,{}),Object(m.jsxs)(i.c,{children:[Object(m.jsx)(i.a,{path:"/",exact:!0,component:x}),Object(m.jsx)(i.a,{path:"/googleauth",exact:!0,component:v}),Object(m.jsx)(i.a,{path:"/register",exact:!0,component:k}),Object(m.jsx)(i.a,{path:"/rocks",exact:!0,component:S}),Object(m.jsx)(i.a,{path:"/rocks/:boulder",exact:!0,component:A}),Object(m.jsx)(i.a,{path:"/path/:path",exact:!0,component:R}),Object(m.jsx)(i.a,{path:"/requests",exact:!0,component:U}),Object(m.jsx)(i.a,{path:"/completed_climbs",exact:!0,component:D}),Object(m.jsx)(i.a,{path:"/map",exact:!0,component:Z})]})]})},ne=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,449)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(te,{})}),document.getElementById("root")),ne()}},[[444,1,2]]]);
//# sourceMappingURL=main.8231aabf.chunk.js.map