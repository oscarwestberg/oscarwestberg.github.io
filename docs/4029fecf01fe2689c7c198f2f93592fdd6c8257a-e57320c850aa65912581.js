(self.webpackChunkoscarwestberg=self.webpackChunkoscarwestberg||[]).push([[369],{2993:function(e){var t="undefined"!=typeof Element,r="function"==typeof Map,n="function"==typeof Set,a="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,o){if(e===o)return!0;if(e&&o&&"object"==typeof e&&"object"==typeof o){if(e.constructor!==o.constructor)return!1;var s,c,l,u;if(Array.isArray(e)){if((s=e.length)!=o.length)return!1;for(c=s;0!=c--;)if(!i(e[c],o[c]))return!1;return!0}if(r&&e instanceof Map&&o instanceof Map){if(e.size!==o.size)return!1;for(u=e.entries();!(c=u.next()).done;)if(!o.has(c.value[0]))return!1;for(u=e.entries();!(c=u.next()).done;)if(!i(c.value[1],o.get(c.value[0])))return!1;return!0}if(n&&e instanceof Set&&o instanceof Set){if(e.size!==o.size)return!1;for(u=e.entries();!(c=u.next()).done;)if(!o.has(c.value[0]))return!1;return!0}if(a&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(o)){if((s=e.length)!=o.length)return!1;for(c=s;0!=c--;)if(e[c]!==o[c])return!1;return!0}if(e.constructor===RegExp)return e.source===o.source&&e.flags===o.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===o.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===o.toString();if((s=(l=Object.keys(e)).length)!==Object.keys(o).length)return!1;for(c=s;0!=c--;)if(!Object.prototype.hasOwnProperty.call(o,l[c]))return!1;if(t&&e instanceof Element)return!1;for(c=s;0!=c--;)if(("_owner"!==l[c]&&"__v"!==l[c]&&"__o"!==l[c]||!e.$$typeof)&&!i(e[l[c]],o[l[c]]))return!1;return!0}return e!=e&&o!=o}e.exports=function(e,t){try{return i(e,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}},4839:function(e,t,r){"use strict";var n,a=r(7294),i=(n=a)&&"object"==typeof n&&"default"in n?n.default:n;function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var c,l=[];function u(){c=e(l.map((function(e){return e.props}))),d.canUseDOM?t(c):r&&(c=r(c))}var d=function(e){var t,r;function a(){return e.apply(this,arguments)||this}r=e,(t=a).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,a.peek=function(){return c},a.rewind=function(){if(a.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=c;return c=void 0,l=[],e};var o=a.prototype;return o.UNSAFE_componentWillMount=function(){l.push(this),u()},o.componentDidUpdate=function(){u()},o.componentWillUnmount=function(){var e=l.indexOf(this);l.splice(e,1),u()},o.render=function(){return i.createElement(n,this.props)},a}(a.PureComponent);return o(d,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),o(d,"canUseDOM",s),d}}},3723:function(e,t,r){"use strict";r.d(t,{G:function(){return P},L:function(){return g},M:function(){return E},P:function(){return T},S:function(){return z},_:function(){return s},a:function(){return o},b:function(){return u},c:function(){return l},g:function(){return d},h:function(){return c}});var n=r(7294),a=(r(2369),r(5697)),i=r.n(a);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}function s(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)t.indexOf(r=i[n])>=0||(a[r]=e[r]);return a}var c=function(){return"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype};var l=function(e){var t;return function(e){var t,r;return Boolean(null==e||null==(t=e.images)||null==(r=t.fallback)?void 0:r.src)}(e)?e:function(e){return Boolean(null==e?void 0:e.gatsbyImageData)}(e)?e.gatsbyImageData:function(e){return Boolean(null==e?void 0:e.gatsbyImage)}(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function u(e,t,r,n,a){return void 0===a&&(a={}),o({},r,{loading:n,shouldLoad:e,"data-main-image":"",style:o({},a,{opacity:t?1:0})})}function d(e,t,r,n,a,i,s,c){var l={};i&&(l.backgroundColor=i,"fixed"===r?(l.width=n,l.height=a,l.backgroundColor=i,l.position="relative"):("constrained"===r||"fullWidth"===r)&&(l.position="absolute",l.top=0,l.left=0,l.bottom=0,l.right=0)),s&&(l.objectFit=s),c&&(l.objectPosition=c);var u=o({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:o({opacity:t?0:1,transition:"opacity 500ms linear"},l)});return u}var f,p=["children"],m=function(e){var t=e.layout,r=e.width,a=e.height;return"fullWidth"===t?n.createElement("div",{"aria-hidden":!0,style:{paddingTop:a/r*100+"%"}}):"constrained"===t?n.createElement("div",{style:{maxWidth:r,display:"block"}},n.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+a+"' width='"+r+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},g=function(e){var t=e.children,r=s(e,p);return n.createElement(n.Fragment,null,n.createElement(m,o({},r)),t,null)},b=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],y=function(e){var t=e.src,r=e.srcSet,a=e.loading,i=e.alt,c=void 0===i?"":i,l=e.shouldLoad,u=s(e,b);return n.createElement("img",o({},u,{decoding:"async",loading:a,src:l?t:void 0,"data-src":l?void 0:t,srcSet:l?r:void 0,"data-srcset":l?void 0:r,alt:c}))},w=function(e){var t=e.fallback,r=e.sources,a=void 0===r?[]:r,i=e.shouldLoad,c=void 0===i||i,l=s(e,h),u=l.sizes||(null==t?void 0:t.sizes),d=n.createElement(y,o({},l,t,{sizes:u,shouldLoad:c}));return a.length?n.createElement("picture",null,a.map((function(e){var t=e.media,r=e.srcSet,a=e.type;return n.createElement("source",{key:t+"-"+a+"-"+r,type:a,media:t,srcSet:c?r:void 0,"data-srcset":c?void 0:r,sizes:u})})),d):d};y.propTypes={src:a.string.isRequired,alt:a.string.isRequired,sizes:a.string,srcSet:a.string,shouldLoad:a.bool},w.displayName="Picture",w.propTypes={alt:a.string.isRequired,shouldLoad:a.bool,fallback:a.exact({src:a.string.isRequired,srcSet:a.string,sizes:a.string}),sources:a.arrayOf(a.oneOfType([a.exact({media:a.string.isRequired,type:a.string,sizes:a.string,srcSet:a.string.isRequired}),a.exact({media:a.string,type:a.string.isRequired,sizes:a.string,srcSet:a.string.isRequired})]))};var v=["fallback"],T=function(e){var t=e.fallback,r=s(e,v);return t?n.createElement(w,o({},r,{fallback:{src:t},"aria-hidden":!0,alt:""})):n.createElement("div",o({},r))};T.displayName="Placeholder",T.propTypes={fallback:a.string,sources:null==(f=w.propTypes)?void 0:f.sources,alt:function(e,t,r){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+r+"`. Validation failed."):null}};var E=function(e){return n.createElement(n.Fragment,null,n.createElement(w,o({},e)),n.createElement("noscript",null,n.createElement(w,o({},e,{shouldLoad:!0}))))};E.displayName="MainImage",E.propTypes=w.propTypes;var C,S,k=function(e,t,r){for(var n=arguments.length,a=new Array(n>3?n-3:0),o=3;o<n;o++)a[o-3]=arguments[o];return e.alt||""===e.alt?i().string.apply(i(),[e,t,r].concat(a)):new Error('The "alt" prop is required in '+r+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},O={image:i().object.isRequired,alt:k},A=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],x=["style","className"],L=new Set,N=function(e){var t=e.as,a=void 0===t?"div":t,i=e.image,l=e.style,u=e.backgroundColor,d=e.className,f=e.class,p=e.onStartLoad,m=e.onLoad,g=e.onError,b=s(e,A),h=i.width,y=i.height,w=i.layout,v=function(e,t,r){var n={},a="gatsby-image-wrapper";return"fixed"===r?(n.width=e,n.height=t):"constrained"===r&&(a="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:a,"data-gatsby-image-wrapper":"",style:n}}(h,y,w),T=v.style,E=v.className,k=s(v,x),O=(0,n.useRef)(),N=(0,n.useMemo)((function(){return JSON.stringify(i.images)}),[i.images]);f&&(d=f);var P=function(e,t,r){var n="";return"fullWidth"===e&&(n='<div aria-hidden="true" style="padding-top: '+r/t*100+'%;"></div>'),"constrained"===e&&(n='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+r+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),n}(w,h,y);return(0,n.useEffect)((function(){C||(C=Promise.all([r.e(774),r.e(217)]).then(r.bind(r,9217)).then((function(e){var t=e.renderImageToString,r=e.swapPlaceholderImage;return S=t,{renderImageToString:t,swapPlaceholderImage:r}})));var e,t,n=O.current.querySelector("[data-gatsby-image-ssr]");return n&&c()?(n.complete?(null==p||p({wasCached:!0}),null==m||m({wasCached:!0}),setTimeout((function(){n.removeAttribute("data-gatsby-image-ssr")}),0)):(null==p||p({wasCached:!0}),n.addEventListener("load",(function e(){n.removeEventListener("load",e),null==m||m({wasCached:!0}),setTimeout((function(){n.removeAttribute("data-gatsby-image-ssr")}),0)}))),void L.add(N)):S&&L.has(N)?void 0:(C.then((function(r){var n=r.renderImageToString,a=r.swapPlaceholderImage;O.current&&(O.current.innerHTML=n(o({isLoading:!0,isLoaded:L.has(N),image:i},b)),L.has(N)||(e=requestAnimationFrame((function(){O.current&&(t=a(O.current,N,L,l,p,m,g))}))))})),function(){e&&cancelAnimationFrame(e),t&&t()})}),[i]),(0,n.useLayoutEffect)((function(){L.has(N)&&S&&(O.current.innerHTML=S(o({isLoading:L.has(N),isLoaded:L.has(N),image:i},b)),null==p||p({wasCached:!0}),null==m||m({wasCached:!0}))}),[i]),(0,n.createElement)(a,o({},k,{style:o({},T,l,{backgroundColor:u}),className:E+(d?" "+d:""),ref:O,dangerouslySetInnerHTML:{__html:P},suppressHydrationWarning:!0}))},P=(0,n.memo)((function(e){return e.image?(0,n.createElement)(N,e):null}));P.propTypes=O,P.displayName="GatsbyImage";var I,j=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],_=function(e,t){for(var r=arguments.length,n=new Array(r>2?r-2:0),a=2;a<r;a++)n[a-2]=arguments[a];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(n)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},R=new Set(["fixed","fullWidth","constrained"]),M={src:i().string.isRequired,alt:k,width:_,height:_,sizes:i().string,layout:function(e){if(void 0!==e.layout&&!R.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},z=(I=P,function(e){var t=e.src,r=e.__imageData,a=e.__error,i=s(e,j);return a&&console.warn(a),r?n.createElement(I,o({image:r},i)):(console.warn("Image not loaded",t),null)});z.displayName="StaticImage",z.propTypes=M},2369:function(e){"use strict";var t=function(e,t){if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);var r;return e=Array.isArray(e)?e.map((function(e){return e.trim()})).filter((function(e){return e.length})).join("-"):e.trim(),0===e.length?"":1===e.length?t.pascalCase?e.toUpperCase():e.toLowerCase():(e!==e.toLowerCase()&&(e=function(e){for(var t=!1,r=!1,n=!1,a=0;a<e.length;a++){var i=e[a];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,a)+"-"+e.slice(a),t=!1,n=r,r=!0,a++):r&&n&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,a-1)+"-"+e.slice(a-1),n=r,r=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,n=r,r=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e}(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(function(e,t){return t.toUpperCase()})).replace(/\d+(\w|$)/g,(function(e){return e.toUpperCase()})),r=e,t.pascalCase?r.charAt(0).toUpperCase()+r.slice(1):r)};e.exports=t,e.exports.default=t},1858:function(e,t,r){"use strict";r.d(t,{Z:function(){return Ce}});var n,a,i,o,s=r(7294),c=r(1082),l="layout-module--nav-link-item--a5f0a",u="layout-module--nav-link-item-social--14e4d",d="layout-module--nav-link-text--69cda",f="layout-module--nav-link-text-current--358af",p=r(3723),m=r(5697),g=r.n(m),b=r(4839),h=r.n(b),y=r(2993),w=r.n(y),v=r(6494),T=r.n(v),E="bodyAttributes",C="htmlAttributes",S="titleAttributes",k={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},O=(Object.keys(k).map((function(e){return k[e]})),"charset"),A="cssText",x="href",L="http-equiv",N="innerHTML",P="itemprop",I="name",j="property",_="rel",R="src",M="target",z={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},q="defaultTitle",D="defer",H="encodeSpecialCharacters",B="onChangeClientState",U="titleTemplate",W=Object.keys(z).reduce((function(e,t){return e[z[t]]=t,e}),{}),F=[k.NOSCRIPT,k.SCRIPT,k.STYLE],Y="data-react-helmet",J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},K=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},V=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),G=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},$=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},Z=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},Q=function(e){return!1===(!(arguments.length>1&&void 0!==arguments[1])||arguments[1])?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},X=function(e){var t=ae(e,k.TITLE),r=ae(e,U);if(r&&t)return r.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var n=ae(e,q);return t||n||void 0},ee=function(e){return ae(e,B)||function(){}},te=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return G({},e,t)}),{})},re=function(e,t){return t.filter((function(e){return void 0!==e[k.BASE]})).map((function(e){return e[k.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),a=0;a<n.length;a++){var i=n[a].toLowerCase();if(-1!==e.indexOf(i)&&r[i])return t.concat(r)}return t}),[])},ne=function(e,t,r){var n={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&le("Helmet: "+e+' should be of type "Array". Instead found type "'+J(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var a={};r.filter((function(e){for(var r=void 0,i=Object.keys(e),o=0;o<i.length;o++){var s=i[o],c=s.toLowerCase();-1===t.indexOf(c)||r===_&&"canonical"===e[r].toLowerCase()||c===_&&"stylesheet"===e[c].toLowerCase()||(r=c),-1===t.indexOf(s)||s!==N&&s!==A&&s!==P||(r=s)}if(!r||!e[r])return!1;var l=e[r].toLowerCase();return n[r]||(n[r]={}),a[r]||(a[r]={}),!n[r][l]&&(a[r][l]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(a),o=0;o<i.length;o++){var s=i[o],c=T()({},n[s],a[s]);n[s]=c}return e}),[]).reverse()},ae=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},ie=(n=Date.now(),function(e){var t=Date.now();t-n>16?(n=t,e(t)):setTimeout((function(){ie(e)}),0)}),oe=function(e){return clearTimeout(e)},se="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||ie:r.g.requestAnimationFrame||ie,ce="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||oe:r.g.cancelAnimationFrame||oe,le=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ue=null,de=function(e,t){var r=e.baseTag,n=e.bodyAttributes,a=e.htmlAttributes,i=e.linkTags,o=e.metaTags,s=e.noscriptTags,c=e.onChangeClientState,l=e.scriptTags,u=e.styleTags,d=e.title,f=e.titleAttributes;me(k.BODY,n),me(k.HTML,a),pe(d,f);var p={baseTag:ge(k.BASE,r),linkTags:ge(k.LINK,i),metaTags:ge(k.META,o),noscriptTags:ge(k.NOSCRIPT,s),scriptTags:ge(k.SCRIPT,l),styleTags:ge(k.STYLE,u)},m={},g={};Object.keys(p).forEach((function(e){var t=p[e],r=t.newTags,n=t.oldTags;r.length&&(m[e]=r),n.length&&(g[e]=p[e].oldTags)})),t&&t(),c(e,m,g)},fe=function(e){return Array.isArray(e)?e.join(""):e},pe=function(e,t){void 0!==e&&document.title!==e&&(document.title=fe(e)),me(k.TITLE,t)},me=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(Y),a=n?n.split(","):[],i=[].concat(a),o=Object.keys(t),s=0;s<o.length;s++){var c=o[s],l=t[c]||"";r.getAttribute(c)!==l&&r.setAttribute(c,l),-1===a.indexOf(c)&&a.push(c);var u=i.indexOf(c);-1!==u&&i.splice(u,1)}for(var d=i.length-1;d>=0;d--)r.removeAttribute(i[d]);a.length===i.length?r.removeAttribute(Y):r.getAttribute(Y)!==o.join(",")&&r.setAttribute(Y,o.join(","))}},ge=function(e,t){var r=document.head||document.querySelector(k.HEAD),n=r.querySelectorAll(e+"["+Y+"]"),a=Array.prototype.slice.call(n),i=[],o=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===N)r.innerHTML=t.innerHTML;else if(n===A)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var s=void 0===t[n]?"":t[n];r.setAttribute(n,s)}r.setAttribute(Y,"true"),a.some((function(e,t){return o=t,r.isEqualNode(e)}))?a.splice(o,1):i.push(r)})),a.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return r.appendChild(e)})),{oldTags:a,newTags:i}},be=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},he=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[z[r]||r]=e[r],t}),t)},ye=function(e,t,r){switch(e){case k.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})[Y]=!0,a=he(r,n),[s.createElement(k.TITLE,a,e)];var e,r,n,a},toString:function(){return function(e,t,r,n){var a=be(r),i=fe(t);return a?"<"+e+" "+Y+'="true" '+a+">"+Q(i,n)+"</"+e+">":"<"+e+" "+Y+'="true">'+Q(i,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case E:case C:return{toComponent:function(){return he(t)},toString:function(){return be(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,a=((n={key:r})[Y]=!0,n);return Object.keys(t).forEach((function(e){var r=z[e]||e;if(r===N||r===A){var n=t.innerHTML||t.cssText;a.dangerouslySetInnerHTML={__html:n}}else a[r]=t[e]})),s.createElement(e,a)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var a=Object.keys(n).filter((function(e){return!(e===N||e===A)})).reduce((function(e,t){var a=void 0===n[t]?t:t+'="'+Q(n[t],r)+'"';return e?e+" "+a:a}),""),i=n.innerHTML||n.cssText||"",o=-1===F.indexOf(e);return t+"<"+e+" "+Y+'="true" '+a+(o?"/>":">"+i+"</"+e+">")}),"")}(e,t,r)}}}},we=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,a=e.htmlAttributes,i=e.linkTags,o=e.metaTags,s=e.noscriptTags,c=e.scriptTags,l=e.styleTags,u=e.title,d=void 0===u?"":u,f=e.titleAttributes;return{base:ye(k.BASE,t,n),bodyAttributes:ye(E,r,n),htmlAttributes:ye(C,a,n),link:ye(k.LINK,i,n),meta:ye(k.META,o,n),noscript:ye(k.NOSCRIPT,s,n),script:ye(k.SCRIPT,c,n),style:ye(k.STYLE,l,n),title:ye(k.TITLE,{title:d,titleAttributes:f},n)}},ve=h()((function(e){return{baseTag:re([x,M],e),bodyAttributes:te(E,e),defer:ae(e,D),encode:ae(e,H),htmlAttributes:te(C,e),linkTags:ne(k.LINK,[_,x],e),metaTags:ne(k.META,[I,O,L,j,P],e),noscriptTags:ne(k.NOSCRIPT,[N],e),onChangeClientState:ee(e),scriptTags:ne(k.SCRIPT,[R,N],e),styleTags:ne(k.STYLE,[A],e),title:X(e),titleAttributes:te(S,e)}}),(function(e){ue&&ce(ue),e.defer?ue=se((function(){de(e,(function(){ue=null}))})):(de(e),ue=null)}),we)((function(){return null})),Te=(a=ve,o=i=function(e){function t(){return K(this,t),Z(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!w()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case k.SCRIPT:case k.NOSCRIPT:return{innerHTML:t};case k.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,n=e.arrayTypeChildren,a=e.newChildProps,i=e.nestedChildren;return G({},n,((t={})[r.type]=[].concat(n[r.type]||[],[G({},a,this.mapNestedChildrenToProps(r,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,n=e.child,a=e.newProps,i=e.newChildProps,o=e.nestedChildren;switch(n.type){case k.TITLE:return G({},a,((t={})[n.type]=o,t.titleAttributes=G({},i),t));case k.BODY:return G({},a,{bodyAttributes:G({},i)});case k.HTML:return G({},a,{htmlAttributes:G({},i)})}return G({},a,((r={})[n.type]=G({},i),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=G({},t);return Object.keys(e).forEach((function(t){var n;r=G({},r,((n={})[t]=e[t],n))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return s.Children.forEach(e,(function(e){if(e&&e.props){var a=e.props,i=a.children,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[W[r]||r]=e[r],t}),t)}($(a,["children"]));switch(r.warnOnInvalidChildren(e,i),e.type){case k.LINK:case k.META:case k.NOSCRIPT:case k.SCRIPT:case k.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:o,nestedChildren:i});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:o,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=$(e,["children"]),n=G({},r);return t&&(n=this.mapChildrenToProps(t,n)),s.createElement(a,n)},V(t,null,[{key:"canUseDOM",set:function(e){a.canUseDOM=e}}]),t}(s.Component),i.propTypes={base:g().object,bodyAttributes:g().object,children:g().oneOfType([g().arrayOf(g().node),g().node]),defaultTitle:g().string,defer:g().bool,encodeSpecialCharacters:g().bool,htmlAttributes:g().object,link:g().arrayOf(g().object),meta:g().arrayOf(g().object),noscript:g().arrayOf(g().object),onChangeClientState:g().func,script:g().arrayOf(g().object),style:g().arrayOf(g().object),title:g().string,titleAttributes:g().object,titleTemplate:g().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=a.peek,i.rewind=function(){var e=a.rewind();return e||(e=we({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},o);Te.renderStatic=Te.rewind;var Ee=Te;var Ce=function(e){var t=e.children;return s.createElement("div",{className:"layout-module--container--78b04"},s.createElement(Ee,null,s.createElement("title",null,"Oscar Westberg")),s.createElement("div",{className:"layout-module--navigator--d82d5"},s.createElement("header",{className:"layout-module--site-title--e4dea"},s.createElement(c.Link,{to:"/",className:d},"OSCAR WESTBERG"),s.createElement("div",{className:"layout-module--headerImage--187f7"},s.createElement(p.S,{alt:"Logo",src:"../images/logo.png",loading:"eager",__imageData:r(2217)}))),s.createElement("button",{className:"layout-module--dropdown-btn--569f3",onClick:function(){return"block"===(e=document.getElementById("nav")).style.display?e.style.display="none":e.style.display="block",void console.log("navclick");var e}},s.createElement(p.S,{alt:"dropdown",src:"../images/three-bars.svg",__imageData:r(7870)})),s.createElement("nav",{id:"nav"},s.createElement("ul",{className:"layout-module--nav-links--1113b"},s.createElement("li",{className:l},s.createElement(c.Link,{getProps:function(e){return e.isCurrent?{className:f}:{className:d}},to:"/"},"Home")),s.createElement("li",{className:l},s.createElement(c.Link,{getProps:function(e){return e.isPartiallyCurrent?{className:f}:{className:d}},to:"/comics/"},"Comics")),s.createElement("li",{className:l},s.createElement(c.Link,{to:"/ink",getProps:function(e){return e.isPartiallyCurrent?{className:f}:{className:d}}},"Ink")),s.createElement("li",{className:l},s.createElement(c.Link,{to:"/illustration",getProps:function(e){return e.isPartiallyCurrent?{className:f}:{className:d}}},"Illustration")),s.createElement("li",{className:l},s.createElement(c.Link,{to:"/about",getProps:function(e){return e.isPartiallyCurrent?{className:f}:{className:d}}},"About")),s.createElement("li",{className:l},s.createElement(c.Link,{to:"https://www.inprnt.com/gallery/oscarwestberg/",className:d},"Prints"))),s.createElement("ul",{className:"layout-module--social--4a791"},s.createElement("li",{className:u},s.createElement("a",{href:"https://twitter.com/oscarwestberg",className:d},s.createElement(p.S,{alt:"Twitter",src:"../images/twitter.svg",__imageData:r(4198)}))),s.createElement("li",{className:u},s.createElement("a",{href:"https://gudgurkan.tumblr.com",className:d},s.createElement(p.S,{alt:"Tumblr",src:"../images/tumblr.svg",__imageData:r(2330)}))),s.createElement("li",{className:u},s.createElement("a",{href:"https://instagram.com/oscar_westberg/",className:d},s.createElement(p.S,{alt:"Instagram",src:"../images/instagram.svg",__imageData:r(1727)}))),s.createElement("li",{className:"layout-module--nav-link-item-social-wide--5fb89"},s.createElement("a",{href:"https://ko-fi.com/oscarwestberg",className:d},s.createElement(p.S,{alt:"Ko-fi",src:"../images/ko-fi.png",__imageData:r(1188)})))))),s.createElement("div",{className:"layout-module--mainWrapper--38259"},s.createElement("main",null,t)))}},1727:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/662a4f1472618eb2eb3b507d7459741f/e4605/instagram.svg","srcSet":"/static/662a4f1472618eb2eb3b507d7459741f/99c53/instagram.svg 6w,\\n/static/662a4f1472618eb2eb3b507d7459741f/3dc2d/instagram.svg 12w,\\n/static/662a4f1472618eb2eb3b507d7459741f/e4605/instagram.svg 24w","sizes":"(min-width: 24px) 24px, 100vw"},"sources":[{"srcSet":"/static/662a4f1472618eb2eb3b507d7459741f/eee53/instagram.webp 6w,\\n/static/662a4f1472618eb2eb3b507d7459741f/30aa9/instagram.webp 12w,\\n/static/662a4f1472618eb2eb3b507d7459741f/4e704/instagram.webp 24w","type":"image/webp","sizes":"(min-width: 24px) 24px, 100vw"}]},"width":24,"height":24}')},7870:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/daac75e0e5eb340fe01a47dbd51bd9c3/9ee82/three-bars.svg","srcSet":"/static/daac75e0e5eb340fe01a47dbd51bd9c3/bc6c5/three-bars.svg 4w,\\n/static/daac75e0e5eb340fe01a47dbd51bd9c3/e3c0b/three-bars.svg 8w,\\n/static/daac75e0e5eb340fe01a47dbd51bd9c3/9ee82/three-bars.svg 16w","sizes":"(min-width: 16px) 16px, 100vw"},"sources":[{"srcSet":"/static/daac75e0e5eb340fe01a47dbd51bd9c3/c3fea/three-bars.webp 4w,\\n/static/daac75e0e5eb340fe01a47dbd51bd9c3/5d252/three-bars.webp 8w,\\n/static/daac75e0e5eb340fe01a47dbd51bd9c3/e789a/three-bars.webp 16w","type":"image/webp","sizes":"(min-width: 16px) 16px, 100vw"}]},"width":16,"height":16}')},2330:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/d22ce3962d4328c5431802e0ce4fa75c/e4605/tumblr.svg","srcSet":"/static/d22ce3962d4328c5431802e0ce4fa75c/99c53/tumblr.svg 6w,\\n/static/d22ce3962d4328c5431802e0ce4fa75c/3dc2d/tumblr.svg 12w,\\n/static/d22ce3962d4328c5431802e0ce4fa75c/e4605/tumblr.svg 24w","sizes":"(min-width: 24px) 24px, 100vw"},"sources":[{"srcSet":"/static/d22ce3962d4328c5431802e0ce4fa75c/eee53/tumblr.webp 6w,\\n/static/d22ce3962d4328c5431802e0ce4fa75c/30aa9/tumblr.webp 12w,\\n/static/d22ce3962d4328c5431802e0ce4fa75c/4e704/tumblr.webp 24w","type":"image/webp","sizes":"(min-width: 24px) 24px, 100vw"}]},"width":24,"height":24}')},1188:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/68eebfb643b7801d482e3af9f9a994b6/5709a/ko-fi.png","srcSet":"/static/68eebfb643b7801d482e3af9f9a994b6/76b03/ko-fi.png 49w,\\n/static/68eebfb643b7801d482e3af9f9a994b6/1acc3/ko-fi.png 98w,\\n/static/68eebfb643b7801d482e3af9f9a994b6/5709a/ko-fi.png 195w","sizes":"(min-width: 195px) 195px, 100vw"},"sources":[{"srcSet":"/static/68eebfb643b7801d482e3af9f9a994b6/d5c7f/ko-fi.webp 49w,\\n/static/68eebfb643b7801d482e3af9f9a994b6/d5f1a/ko-fi.webp 98w,\\n/static/68eebfb643b7801d482e3af9f9a994b6/119a1/ko-fi.webp 195w","type":"image/webp","sizes":"(min-width: 195px) 195px, 100vw"}]},"width":195,"height":128}')},4198:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/20d9f51503e823914d0af4dbec64eb4d/e4605/twitter.svg","srcSet":"/static/20d9f51503e823914d0af4dbec64eb4d/99c53/twitter.svg 6w,\\n/static/20d9f51503e823914d0af4dbec64eb4d/3dc2d/twitter.svg 12w,\\n/static/20d9f51503e823914d0af4dbec64eb4d/e4605/twitter.svg 24w","sizes":"(min-width: 24px) 24px, 100vw"},"sources":[{"srcSet":"/static/20d9f51503e823914d0af4dbec64eb4d/eee53/twitter.webp 6w,\\n/static/20d9f51503e823914d0af4dbec64eb4d/30aa9/twitter.webp 12w,\\n/static/20d9f51503e823914d0af4dbec64eb4d/4e704/twitter.webp 24w","type":"image/webp","sizes":"(min-width: 24px) 24px, 100vw"}]},"width":24,"height":24}')},2217:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/e5cd43b72312a2557a83107620ea1933/5aead/logo.png","srcSet":"/static/e5cd43b72312a2557a83107620ea1933/e9fba/logo.png 50w,\\n/static/e5cd43b72312a2557a83107620ea1933/15e42/logo.png 100w,\\n/static/e5cd43b72312a2557a83107620ea1933/5aead/logo.png 200w","sizes":"(min-width: 200px) 200px, 100vw"},"sources":[{"srcSet":"/static/e5cd43b72312a2557a83107620ea1933/dbc4a/logo.webp 50w,\\n/static/e5cd43b72312a2557a83107620ea1933/d8057/logo.webp 100w,\\n/static/e5cd43b72312a2557a83107620ea1933/2e34e/logo.webp 200w","type":"image/webp","sizes":"(min-width: 200px) 200px, 100vw"}]},"width":200,"height":200}')}}]);
//# sourceMappingURL=4029fecf01fe2689c7c198f2f93592fdd6c8257a-e57320c850aa65912581.js.map