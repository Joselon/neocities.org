(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:ee}=Object,m=globalThis,h=m.trustedTypes,te=h?h.emptyScript:``,ne=m.reactiveElementPolyfillSupport,g=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?te:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},re=(e,t)=>!l(e,t),ie={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol(`metadata`),m.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(g(`elementProperties`)))return;let e=ee(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?_:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?_:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??re)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:`open`},v[g(`elementProperties`)]=new Map,v[g(`finalized`)]=new Map,ne?.({ReactiveElement:v}),(m.reactiveElementVersions??=[]).push(`2.1.2`);var y=globalThis,ae=e=>e,b=y.trustedTypes,oe=b?b.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,se=`$lit$`,x=`lit$${Math.random().toFixed(9).slice(2)}$`,ce=`?`+x,le=`<${ce}>`,S=document,C=()=>S.createComment(``),w=e=>e===null||typeof e!=`object`&&typeof e!=`function`,T=Array.isArray,ue=e=>T(e)||typeof e?.[Symbol.iterator]==`function`,E=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,k=/>/g,A=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),de=/'/g,fe=/"/g,pe=/^(?:script|style|textarea|title)$/i,j=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),M=Symbol.for(`lit-noChange`),N=Symbol.for(`lit-nothing`),me=new WeakMap,P=S.createTreeWalker(S,129);function he(e,t){if(!T(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return oe===void 0?t:oe.createHTML(t)}var ge=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=D;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===D?c[1]===`!--`?o=O:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=A):(pe.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=A):o=k:o===A?c[0]===`>`?(o=i??D,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?A:c[3]===`"`?fe:de):o===fe||o===de?o=A:o===O||o===k?o=D:(o=A,i=void 0);let d=o===A&&e[t+1].startsWith(`/>`)?` `:``;a+=o===D?n+le:l>=0?(r.push(s),n.slice(0,l)+se+n.slice(l)+x+d):n+x+(l===-2?t:d)}return[he(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},F=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ge(t,n);if(this.el=e.createElement(l,r),P.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=P.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(se)){let t=u[o++],n=i.getAttribute(e).split(x),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ve:r[1]===`?`?ye:r[1]===`@`?be:R}),i.removeAttribute(e)}else e.startsWith(x)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(pe.test(i.tagName)){let e=i.textContent.split(x),t=e.length-1;if(t>0){i.textContent=b?b.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],C()),P.nextNode(),c.push({type:2,index:++a});i.append(e[t],C())}}}else if(i.nodeType===8){if(i.data===ce)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(x,e+1))!==-1;)c.push({type:7,index:a}),e+=x.length-1}}a++}}static createElement(e,t){let n=S.createElement(`template`);return n.innerHTML=e,n}};function I(e,t,n=e,r){if(t===M)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=w(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=I(e,i._$AS(e,t.values),i,r)),t}var _e=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??S).importNode(t,!0);P.currentNode=r;let i=P.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new L(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new xe(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=P.nextNode(),a++)}return P.currentNode=S,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},L=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),w(e)?e===N||e==null||e===``?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==M&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ue(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==N&&w(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=F.createElement(he(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new _e(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=me.get(e.strings);return t===void 0&&me.set(e.strings,t=new F(e)),t}k(t){T(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(C()),this.O(C()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ae(e).nextSibling;ae(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=N}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=I(this,e,t,0),a=!w(e)||e!==this._$AH&&e!==M,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=I(this,r[n+o],t,o),s===M&&(s=this._$AH[o]),a||=!w(s)||s!==this._$AH[o],s===N?e=N:e!==N&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ve=class extends R{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}},ye=class extends R{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==N)}},be=class extends R{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=I(this,e,t,0)??N)===M)return;let n=this._$AH,r=e===N&&n!==N||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==N&&(n===N||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},xe=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}},Se=y.litHtmlPolyfillSupport;Se?.(F,L),(y.litHtmlVersions??=[]).push(`3.3.3`);var Ce=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new L(t.insertBefore(C(),e),e,void 0,n??{})}return i._$AI(e),i},z=globalThis,B=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ce(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};B._$litElement$=!0,B.finalized=!0,z.litElementHydrateSupport?.({LitElement:B});var we=z.litElementPolyfillSupport;we?.({LitElement:B}),(z.litElementVersions??=[]).push(`4.2.2`);var V=Object.freeze({MOVIE:`movie`,SERIES:`series`,VIDEOGAMES:`videogame`}),H=class e{constructor({title:t,type:n,id:r=e.generateId(),originalTitle:i=void 0,year:a=void 0,runtimeMinutes:o=void 0,genres:s=[],omdbId:c=void 0,poster:l=void 0,ratings:u=void 0,director:d=void 0,country:f=void 0,actors:p=void 0,plot:ee=void 0,awards:m=void 0,trailer:h=void 0}){this.id=r,this.title=e.validateTitle(e.normalizeTitle(t)),this.originalTitle=i,this.type=e.validateType(n),this.year=a,this.runtimeMinutes=o,this.genres=s,this.omdbId=c,this.poster=l,this.ratings=u,this.director=d,this.country=f,this.actors=p,this.plot=ee,this.awards=m,this.trailer=h}get matchKey(){return e.createMatchKey(this.title,this.type,this.year)}static generateId(){return crypto.randomUUID()}static createMatchKey(e,t,n=void 0){let r=`${e.trim().toLowerCase().replace(/\s+/g,` `)}|${t}`;return n?`${r}|${n}`:r}static normalizeTitle(e){if(typeof e!=`string`)throw Error(`Media title is required`);return e.trim().replace(/\s+/g,` `)}static validateTitle(e){if(!e)throw Error(`Media title cannot be empty`);if(e.length>250)throw Error(`Media title cannot exceed 250 characters`);return e}static validateType(e){if(!Object.values(V).includes(e))throw Error(e+`Invalid media type`);return e}},U=Object.freeze({PENDING:`pending`,WATCHING:`watching`,PAUSED:`paused`,WATCHED:`watched`,DISCARDED:`discarded`}),W=class{constructor({season:e=void 0,episode:t=void 0,minute:n=void 0}){this.season=e,this.episode=t,this.minute=n}},G=class e{constructor({mediaId:t,platforms:n=[],reason:r=void 0,spanishAudio:i=!1,spanishSubtitles:a=!1,status:o=U.PENDING,userRating:s=void 0,progress:c=void 0,addedAt:l=new Date().toISOString(),watchedAt:u=void 0}){this.mediaId=e.validateMediaId(t),this.platforms=n,this.reason=r,this.spanishAudio=i,this.spanishSubtitles=a,this.status=e.validateStatus(o),this.userRating=s,this.progress=c,this.addedAt=l,this.watchedAt=u}static validateMediaId(e){if(!e||typeof e!=`string`)throw Error(`mediaId is required`);return e}static validateStatus(e){if(!Object.values(U).includes(e))throw Error(`Invalid status type`);return e}start(){this.status=U.WATCHING}pause(){this.status=U.PAUSED}resume(){this.status=U.WATCHING}markAsWatched(){this.status=U.WATCHED}markAsUnwatched(){this.status=U.PENDING}setProgress(e){if(!(e instanceof W))throw Error(`Invalid progress`);this.progress=e}},K=class e{constructor({version:t=1,id:n=e.generateId(),name:r=`Mi primera lista`,watchItems:i=void 0,media:a=void 0}={}){this.version=e.validateVersion(t),this.id=n,this.name=r,this.watchItems=e.validatesItems(i),this.media=e.validatesMedia(a)}static generateId(){return crypto.randomUUID()}static validatesItems(e){if(e||=[],!Array.isArray(e))throw Error(`watchItems is not an array`);return e.forEach(e=>{if(!(e instanceof G))throw Error(`watchItems must contain only WatchItem`)}),e}static validatesMedia(e){if(e||=[],!Array.isArray(e))throw Error(`media is not an array`);return e.forEach(e=>{if(!(e instanceof H))throw Error(`media must contain only Media`)}),e}static validateVersion(e){if(!Number.isInteger(e)||e<1||e>1)throw Error(`Unsupported watch list version`);return e}addMedia(e){if(this.media.some(t=>t.id===e.id)||this.media.some(t=>t.matchKey===e.matchKey))throw Error(`Media already exists`);this.media.push(e)}removeMedia(e){if(this.watchItems.some(t=>t.mediaId===e))return!1;let t=this.media.findIndex(t=>t.id===e);return t!==-1&&(this.media.splice(t,1),!0)}addWatchItem(e){if(!this.media.some(t=>t.id===e.mediaId))throw Error(`Media not found`);this.watchItems.push(e)}removeWatchItem(e){let t=this.watchItems.findIndex(t=>t.mediaId===e);return t!==-1&&(this.watchItems.splice(t,1),!0)}},Te=class{constructor(e,t=`quevemos-watchlist`){this.storage=e,this.key=t}save(e){let t=JSON.stringify(e);this.storage.setItem(this.key,t)}load(){let e=this.storage.getItem(this.key);if(!e)return new K;let t=JSON.parse(e),n=t.media.map(e=>new H(e)),r=t.watchItems.map(e=>new G(e));return new K({version:t.version,id:t.id,name:t.name,media:n,watchItems:r})}},q=Object.freeze({PENDING:`pending`,ACCEPTED:`accepted`,DISCARDED:`discarded`}),J=class e{constructor({id:t=e.generateId(),mediaId:n,platforms:r=[],spanishAudio:i=!1,spanishSubtitles:a=!1,reason:o=void 0,recommenderRating:s=void 0,status:c=q.PENDING}){this.id=t,this.mediaId=e.validateMediaId(n),this.platforms=r,this.spanishAudio=i,this.spanishSubtitles=a,this.reason=o,this.status=e.validateStatus(c),this.recommenderRating=s}static generateId(){return crypto.randomUUID()}static validateMediaId(e){if(!e||typeof e!=`string`)throw Error(`mediaId is required`);return e}static validateStatus(e){if(!Object.values(q).includes(e))throw Error(`Invalid recommendation status`);return e}},Y=class e{constructor({id:t=e.generateId(),name:n=void 0,recommendations:r=void 0,media:i=void 0,version:a=1,createdAt:o=new Date().toISOString()}={}){this.id=t,this.name=e.validateName(n),this.recommendations=e.validatesRecommendations(r),this.media=e.validatesMedia(i),this.version=e.validateVersion(a),this.createdAt=o}static generateId(){return crypto.randomUUID()}static validateName(e){if(!e||typeof e!=`string`)throw Error(`name is required`);return e}static validatesMedia(e){if(e||=[],!Array.isArray(e))throw Error(`media is not an array`);return e}static validatesRecommendations(e){if(e||=[],!Array.isArray(e))throw Error(`recommendations is not an array`);return e.forEach(e=>{if(!(e instanceof J))throw Error(`recommendations must contain only Recommendation`)}),e}static validateVersion(e){if(!Number.isInteger(e)||e<1||e>1)throw Error(`Unsupported recommendation list version`);return e}},Ee=class{constructor(e,t=`quevemos-inbox`){this.storage=e,this.key=t}save(e){let t=JSON.stringify(e);this.storage.setItem(this.key,t)}load(){let e=this.storage.getItem(this.key);return e?JSON.parse(e).map(e=>new Y({version:e.version,id:e.id,name:e.name,recommendations:e.recommendations.map(e=>new J(e)),media:e.media,createdAt:e.createdAt})):[]}},De=class extends B{static styles=o`
        :host {
            display: block;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        a {
            color: var(--text);
            text-decoration: none;
            transition:
                color 0.2s ease,
                transform 0.2s ease,
                box-shadow 0.2s ease;
        }

        a:hover {
            color: #ffffff;
        }

        /* Cabecera */

        header {
            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );

            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 1.1rem 1.3rem 1.3rem;
            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.25);

            text-align: center;
        }

        .hero-badge {
            display: inline-block;
            margin-bottom: 0.5rem;
            padding: 0.35rem 0.8rem;

            border-radius: 999px;

            background: rgba(255, 107, 44, 0.18);
            color: #ffd7bf;

            font-size: 0.82rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
        }

        h1 {
            color: white;

            background:
                linear-gradient(
                    135deg,
                    var(--accent),
                    var(--accent-2)
                );

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 18px;

            padding: 0.7rem 1rem;
            margin: 0.2rem auto 0.75rem;

            box-shadow:
                0 8px 20px rgba(255, 107, 44, 0.2);

            max-width: 720px;
        }

        .hero-subtitle {
            max-width: 720px;
            margin: 0 auto 1rem;
            color: var(--muted);
            font-size: 1rem;
        }

        .hero-actions {
            display: flex;
            justify-content: center;
        }

        .a-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 999px;

            padding: 0.65rem 1rem;

            background: rgba(255, 255, 255, 0.06);

            box-shadow:
                0 6px 16px rgba(0, 0, 0, 0.16);
        }

        .a-button:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-1px);
        }
        /* Móvil */

        @media (max-width: 768px) {
           
            header {
                padding: 1rem 0.8rem 1.1rem;
            }

            h1 {
                font-size: 1.6rem;
            }



        }
    `;render(){return j`
            <header>
                <div class="hero-badge">
                    LAB EXPERIMENTAL
                </div>

                <h1>¿Qué Vemos?</h1>

                <p class="hero-subtitle">
                    Tu listado de pelis y series local con gestión de recomendaciones
                </p>

                <p class="hero-subtitle">
                    <small> No olvides exportarlo para evitar perderlo al cambiar de navegador o limpiar</small>
                </p>

                <div class="hero-actions">
                    <a class="a-button" href="/">
                        ← Volver a Joselon79 Lab
                    </a>
                </div>
            </header>
        `}};customElements.define(`app-header`,De);var Oe=class extends B{static styles=o`
        :host {
            display: block;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        a {
            color: var(--text);
            text-decoration: none;
            transition:
                color 0.2s ease,
                transform 0.2s ease,
                box-shadow 0.2s ease;
        }

        a:hover {
            color: #ffffff;
        }

        /* Footer */
        
        footer {
            position: relative;

            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );

            font-size: 12px;
            text-align: center;

            width: 100%;

            padding: 1rem 0.8rem;
            margin-top: 1.2rem;

            border-radius: 18px;
            border: 1px solid var(--border);

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.2);
        }

        footer p {
            margin: 0.5rem 0;
        }

        footer a {
            color: var(--muted);
        }

        footer a:hover {
            color: #ffffff;
        }
        
    `;render(){return j`
            <footer>
                <p>
                    Contacto por Correo
                    (<a href="mailto:joselon79@gmail.com">
                        joselon79@gmail.com
                    </a>)
                </p>

                <p>
                    <a href="https://neocities.org/">
                        Perfil Neocities
                    </a>
                </p>

                <p>
                    <a href="https://neocities.org/">
                        Política de Cookies de Neocities.org
                    </a>
                </p>

                <p>
                    Copyleft © Joselon79
                </p>
            </footer>
        `}};customElements.define(`app-footer`,Oe);var X=class{constructor(e){this.watchList=e}addItem({title:e,type:t,year:n,originalTitle:r,genres:i,platforms:a}){let o=null,s=!1;try{o=new H({title:e,type:t,year:n,originalTitle:r,genres:i});let c=new G({mediaId:o.id,platforms:a});return this.watchList.addMedia(o),s=!0,this.watchList.addWatchItem(c),{success:!0}}catch(e){return s&&this.watchList.removeMedia(o.id),{success:!1,error:e.message}}}updateItem({mediaId:e,media:t,watchItem:n,omdbDetails:r}){let i=this.watchList.media.find(t=>t.id===e),a=this.watchList.watchItems.find(t=>t.mediaId===e);if(!i||!a)return{success:!1,error:`Item not found`};let o=r&&r.imdbID!==i.omdbId,s=t.poster?.trim()?t.poster.trim():o?void 0:i.poster;try{let o=new H({id:e,title:t.title,type:t.type,year:t.year,originalTitle:t.originalTitle,genres:t.genres,trailer:t.trailer?.trim()||void 0,runtimeMinutes:i.runtimeMinutes,ratings:i.ratings,director:i.director,country:i.country,actors:i.actors,plot:i.plot,awards:i.awards,omdbId:i.omdbId,poster:s});if(this.watchList.media.some(t=>t.id!==e&&t.matchKey===o.matchKey))throw Error(`Media already exists`);if(r&&r.imdbID!==i.omdbId){let e=this.updateOmdbDetails({media:o,details:r});if(!e.success)throw Error(e.error)}return i.title=o.title,i.type=o.type,i.year=o.year,i.originalTitle=o.originalTitle,i.genres=o.genres,i.runtimeMinutes=o.runtimeMinutes,i.ratings=o.ratings,i.director=o.director,i.country=o.country,i.actors=o.actors,i.plot=o.plot,i.awards=o.awards,i.omdbId=o.omdbId,i.poster=o.poster,i.trailer=o.trailer,a.platforms=n.platforms,a.reason=n.reason,a.spanishAudio=n.spanishAudio,a.spanishSubtitles=n.spanishSubtitles,a.userRating=n.userRating,a.progress=n.progress,{success:!0}}catch(e){return{success:!1,error:e.message}}}changeStatus(e,t){let n=this.watchList.watchItems.find(t=>t.mediaId===e);if(!n)return{success:!1,error:`WatchItem not found`};try{switch(t){case U.WATCHING:if(n.status===U.PENDING)n.start();else if(n.status===U.PAUSED)n.resume();else throw Error(`Invalid status transition`);break;case U.PAUSED:if(n.status!==U.WATCHING)throw Error(`Invalid status transition`);n.pause();break;case U.WATCHED:if(n.status!==U.WATCHING)throw Error(`Invalid status transition`);n.markAsWatched();break;case U.PENDING:if(n.status!==U.WATCHED)throw Error(`Invalid status transition`);n.markAsUnwatched();break;default:throw Error(`Invalid status transition`)}let e=new G({mediaId:n.mediaId,platforms:n.platforms,reason:n.reason,spanishAudio:n.spanishAudio,spanishSubtitles:n.spanishSubtitles,status:n.status,userRating:n.userRating,progress:n.progress,addedAt:n.addedAt,watchedAt:n.watchedAt}),r=this.watchList.watchItems.indexOf(n);return this.watchList.watchItems[r]=e,{success:!0}}catch(e){return{success:!1,error:e.message}}}renameWatchList(e){return!e||!e.trim()?{success:!1,error:`El nombre no puede estar vacío`}:(this.watchList.name=e.trim(),{success:!0})}deleteItem(e){return this.watchList.removeWatchItem(e)?(this.watchList.watchItems.some(t=>t.mediaId===e)||this.watchList.removeMedia(e),{success:!0}):{success:!1,error:`Item not found`}}getItems(){return this.watchList.watchItems.map(e=>({media:this.watchList.media.find(t=>t.id===e.mediaId),watchItem:e}))}updateOmdbDetails({media:e,details:t}){if(!e||!t)return{success:!1,error:`Media and OMDb details are required`};if(t.Response===`False`||typeof t.imdbID!=`string`||!t.imdbID.trim())return{success:!1,error:`Invalid OMDb details`};e.poster||=t.Poster&&t.Poster!==`N/A`?t.Poster:void 0;let n=typeof t.Runtime==`string`?t.Runtime.match(/^(\d+)\s+min$/i):null,r=Array.isArray(t.Ratings)?t.Ratings.filter(e=>e?.Source&&e?.Value):[],i=e=>typeof e==`string`&&e.trim()&&e!==`N/A`?e.trim():void 0;return e.omdbId=t.imdbID.trim(),e.runtimeMinutes=n?Number(n[1]):void 0,e.ratings=r,e.director=i(t.Director),e.country=i(t.Country),e.actors=i(t.Actors),e.plot=i(t.Plot),e.awards=i(t.Awards),{success:!0}}clearOmdbDetails({mediaId:e}){let t=this.watchList.media.find(t=>t.id===e);return t?(t.omdbId=void 0,t.runtimeMinutes=void 0,t.ratings=void 0,t.director=void 0,t.country=void 0,t.actors=void 0,t.plot=void 0,t.awards=void 0,{success:!0}):{success:!1,error:`Media not found`}}},ke=class{export(e){return JSON.stringify(e,null,2)}import(e){let t=this.parse(e);this.validate(t);let n=t.media.map(e=>new H(e)),r=t.watchItems.map(e=>new G(e));return new K({version:t.version,id:t.id,name:t.name,media:n,watchItems:r})}parse(e){try{return JSON.parse(e)}catch{throw Error(`Invalid JSON`)}}validate(e){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Invalid WatchList file`);if(!Number.isInteger(e.version)||e.version<1||e.version>1)throw Error(`Unsupported WatchList version`);if(!Array.isArray(e.media))throw Error(`WatchList media is not an array`);if(!Array.isArray(e.watchItems))throw Error(`WatchList watchItems is not an array`)}},Ae=class e{constructor({id:t=e.generateId(),name:n=void 0,recommendations:r=void 0,version:i=1,createdAt:a=new Date().toISOString()}={}){this.id=t,this.name=e.validateName(n),this.recommendations=e.validatesRecommendations(r),this.version=e.validateVersion(i),this.createdAt=a}static generateId(){return crypto.randomUUID()}static validateName(e){if(!e||typeof e!=`string`)throw Error(`name is required`);return e}static validatesRecommendations(e){if(e||=[],!Array.isArray(e))throw Error(`recommendations is not an array`);return e.forEach(e=>{if(!(e instanceof J))throw Error(`recommendations must contain only Recommendation`)}),e}static validateVersion(e){if(!Number.isInteger(e)||e<1||e>1)throw Error(`Unsupported recommendation list version`);return e}},Z=class e{constructor({id:t=e.generateId(),version:n=1,createdAt:r=new Date().toISOString(),sender:i,items:a=[]}={}){this.id=t,this.version=e.validateVersion(n),this.createdAt=r,this.sender=e.validateSender(i),this.items=e.validateItems(a)}static generateId(){return crypto.randomUUID()}static validateVersion(e){if(!Number.isInteger(e)||e<1||e>1)throw Error(`Unsupported RecommendationExchange version`);return e}static validateSender(e){if(!e||typeof e!=`string`)throw Error(`sender is required`);return e}static validateItems(e){if(!Array.isArray(e))throw Error(`items is not an array`);return e}},Q=class{createRecommendation(e,t){if(!e.watchItems.some(e=>e===t))throw Error(`WatchItem is not in WatchList`);return new J({mediaId:t.mediaId,platforms:[...t.platforms],spanishAudio:t.spanishAudio,spanishSubtitles:t.spanishSubtitles,reason:t.reason,recommenderRating:t.userRating})}createRecommendationList(e,t){let n=t.map(t=>this.createRecommendation(e,t));return new Ae({name:`Recomendaciones desde : `+e.name,recommendations:n})}createRecommendationExchange(e,t){let n=e.recommendations.map(e=>{let n=t.media.find(t=>t.id===e.mediaId);if(!n)throw Error(`Media not found in WatchList: ${e.mediaId}`);return{media:{id:n.id,title:n.title,originalTitle:n.originalTitle,type:n.type,year:n.year,runtimeMinutes:n.runtimeMinutes,genres:[...n.genres],omdbId:n.omdbId,poster:n.poster,trailer:n.trailer,ratings:n.ratings,director:n.director,country:n.country,actors:n.actors,plot:n.plot,awards:n.awards,matchKey:n.matchKey},recommendation:e}});return new Z({sender:e.name,items:n})}createIncomingRecommendationList(e){if(!(e instanceof Z))throw Error(`exchange must be a RecommendationExchange`);return new Y({id:e.id,name:e.sender,media:e.items.map(e=>e.media),recommendations:e.items.map(e=>new J(e.recommendation)),version:1,createdAt:e.createdAt})}deleteIncomingList(e,t){return e.findIndex(e=>e.id===t)===-1?null:e.filter(e=>e.id!==t)}prepareComparison(e,t){if(!t)throw Error(`No WatchList loaded`);return{incomingRecommendationList:e,watchList:t}}compareRecommendations(e,t){return e.recommendations.map(n=>{let r=e.media.find(e=>e.id===n.mediaId),i=this.findMediaCandidates(r,t),a=`new`;return i.some(e=>e.matches.includes(`omdbId`))?a=`matched`:i.length>0&&(a=`candidate`),{recommendation:n,media:r,matches:i,status:a}})}findMediaCandidates(e,t){let n=[];for(let r of t.media){let t=[];e.omdbId&&r.omdbId&&e.omdbId===r.omdbId&&t.push(`omdbId`),e.matchKey===r.matchKey&&t.push(`matchKey`);let i=e.title.trim().toLowerCase(),a=r.title.trim().toLowerCase();i!==a&&(i.includes(a)||a.includes(i))&&t.push(`partialTitle`),t.length>0&&n.push({media:r,matches:t,differences:this.compareMedia(e,r)})}return n}compareMedia(e,t){let n=[];for(let r of[`title`,`originalTitle`,`type`,`year`,`runtimeMinutes`,`genres`,`poster`])JSON.stringify(e[r])!==JSON.stringify(t[r])&&n.push(r);return!t.omdbId&&e.omdbId&&n.push(`omdbId`),n}acceptRecommendation(e,t,n){let r=t.media.find(t=>t.id===e.mediaId);if(!r)throw Error(`Media not found in recommendationList`);let{id:i,...a}=r,o=new H(a);n.addMedia(o);let s=[t.name];e.recommenderRating!==void 0&&(s[0]+=` | (Nota: ${e.recommenderRating})`),e.reason&&s.push(e.reason);let c=new G({mediaId:o.id,platforms:e.platforms,spanishAudio:e.spanishAudio,spanishSubtitles:e.spanishSubtitles,reason:s.join(` | `)});return n.addWatchItem(c),e.status=q.ACCEPTED,c}mergeRecommendation({incomingRecommendationList:e,incomingRecommendation:t,watchList:n,targetMediaId:r,mediaFields:i=[]}){if(r===void 0)throw Error(`targetMediaId is required for merge`);let a=e.media.find(e=>e.id===t.mediaId);if(!a)throw Error(`Media not found in recommendationList`);let o=n.media.find(e=>e.id===r);if(!o)throw Error(`Target media not found in watchList`);let s=n.watchItems.find(e=>e.mediaId===o.id);if(!s)throw Error(`WatchItem not found for target media`);if(!Array.isArray(i))throw Error(`mediaFields must be an array`);let c=[`title`,`originalTitle`,`type`,`year`,`runtimeMinutes`,`genres`,`omdbId`,`poster`,`ratings`,`director`,`country`,`actors`,`plot`,`awards`,`trailer`];for(let e of i)if(!c.includes(e))throw Error(`Invalid media field: ${e}`);let l={};for(let e of i){let t=a[e];t!==void 0&&(l[e]=Array.isArray(t)?[...t]:t)}let u=new H({...o,...l,id:o.id});if(n.media.some(e=>e.id!==o.id&&e.matchKey===u.matchKey))throw Error(`Media already exists`);let d=[e.name];t.recommenderRating!==void 0&&d.push(`(Nota: ${t.recommenderRating})`),t.reason&&d.push(t.reason);let f=d.join(` | `),p=s.reason?.trim();if(p&&p.includes(f))throw Error(`Recommendation already added to WatchItem`);for(let[e,t]of Object.entries(l))o[e]=t;return s.reason=p?`${p} | ${f}`:f,t.status=q.ACCEPTED,s}discardRecommendation(e){return e.status=q.DISCARDED,e}resolveRecommendation({incomingRecommendationList:e,incomingRecommendation:t,decision:n,watchList:r,targetMediaId:i,mediaFields:a=[]}){if(t.status===q.ACCEPTED)throw Error(`Recommendation already accepted`);switch(n){case`create`:return this.acceptRecommendation(t,e,r);case`merge`:return this.mergeRecommendation({incomingRecommendationList:e,incomingRecommendation:t,watchList:r,targetMediaId:i,mediaFields:a});case`discard`:return this.discardRecommendation(t);default:throw Error(`Invalid decision`)}}},je=class{async encode(e){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`recommendationExchange debe ser un objeto`);let t=JSON.stringify(e),n=new TextEncoder().encode(t),r=await this.compress(n);return this.encodeBase64Url(r)}async decode(e){if(typeof e!=`string`||e.length===0)throw TypeError(`encodedData debe ser una cadena no vacía`);let t=this.decodeBase64Url(e),n=await this.decompress(t),r=new TextDecoder(`utf-8`,{fatal:!0}).decode(n);return JSON.parse(r)}async compress(e){if(typeof CompressionStream>`u`)throw Error(`Este navegador no soporta CompressionStream`);let t=new Blob([e]).stream().pipeThrough(new CompressionStream(`deflate`));return new Uint8Array(await new Response(t).arrayBuffer())}async decompress(e){if(typeof DecompressionStream>`u`)throw Error(`Este navegador no soporta DecompressionStream`);let t=new Blob([e]).stream().pipeThrough(new DecompressionStream(`deflate`));return new Uint8Array(await new Response(t).arrayBuffer())}encodeBase64Url(e){let t=``;for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}decodeBase64Url(e){let t=e.replace(/-/g,`+`).replace(/_/g,`/`),n=t+`=`.repeat((4-t.length%4)%4),r=atob(n);return Uint8Array.from(r,e=>e.charCodeAt(0))}},$={version:1,mediaTypes:[{id:`movie`,name:`Película`},{id:`series`,name:`Serie`},{id:`videogame`,name:`Videojuego`}],genres:[{id:`action`,name:`Acción`},{id:`adventure`,name:`Aventuras`},{id:`animation`,name:`Animación`},{id:`comedy`,name:`Comedia`},{id:`crime`,name:`Crimen`},{id:`documentary`,name:`Documental`},{id:`drama`,name:`Drama`},{id:`family`,name:`Familiar`},{id:`fantasy`,name:`Fantasía`},{id:`history`,name:`Historia`},{id:`horror`,name:`Terror`},{id:`music`,name:`Musical`},{id:`mystery`,name:`Misterio`},{id:`romance`,name:`Romance`},{id:`science-fiction`,name:`Ciencia ficción`},{id:`sport`,name:`Deporte`},{id:`thriller`,name:`Thriller`},{id:`war`,name:`Bélica`},{id:`western`,name:`Western`}],watchStatuses:[{id:`pending`,name:`Pendiente`},{id:`watching`,name:`Viendo`},{id:`paused`,name:`En pausa`},{id:`watched`,name:`Vista`},{id:`discarded`,name:`Descartada`}],platforms:[{id:`netflix-es`,name:`Netflix`,country:`ES`,active:!0,logo:`netflix`},{id:`max-es`,name:`HBO Max`,country:`ES`,active:!0,logo:`max`},{id:`prime-video-es`,name:`Prime`,country:`ES`,active:!0,logo:`prime-video`},{id:`disney-plus-es`,name:`Disney+`,country:`ES`,active:!0,logo:`disney-plus`},{id:`movistar-plus-es`,name:`Movistar Plus+`,country:`ES`,active:!0,logo:`movistar-plus`},{id:`apple-tv-plus-es`,name:`Apple TV+`,country:`ES`,active:!0,logo:`apple-tv-plus`},{id:`filmin-es`,name:`Filmin`,country:`ES`,active:!0,logo:`filmin`},{id:`skyshowtime-es`,name:`SkyShowtime`,country:`ES`,active:!0,logo:`skyshowtime`},{id:`atresplayer-es`,name:`Atresplayer`,country:`ES`,active:!0,logo:`atresplayer`},{id:`rtve-play-es`,name:`RTVE Play`,country:`ES`,active:!0,logo:`rtve-play`},{id:`youtube-es`,name:`YouTube`,country:`ES`,active:!0,logo:`youtube`},{id:`steam-pc`,name:`SteamPC`,country:`ES`,active:!0,logo:`steam`},{id:`xbox-eu`,name:`XboxGamePass`,country:`ES`,active:!0,logo:`xbox`},{id:`playstation-eu`,name:`PlayStationStore`,country:`ES`,active:!0,logo:`playstation`},{id:`switch-eu`,name:`NintendoSwitch`,country:`ES`,active:!0,logo:`switch`},{id:`others`,name:`Otras Fuentes...`,country:`ES`,active:!0,logo:`unknow`}]},Me=class e extends B{static styles=o`
        :host {
            display: block;
        }

        :host(.overlay-open) {
            position: relative;
            z-index: 10;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        .media-card {
            position: relative;

            display: grid;
            grid-template-columns: 180px minmax(0, 1fr);

            overflow: visible;

            border: 2px solid rgba(250, 62, 0, 0.7);
            border-radius: 18px;

            background:
                linear-gradient(
                    135deg,
                    rgba(202, 155, 121, 0.96),
                    rgba(161, 114, 89, 0.96)
                );

            box-shadow:
                0 10px 24px rgba(0, 0, 0, 0.2);

            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease;
        }

        .media-card:hover {
            transform: translateY(-3px);

            box-shadow:
                0 14px 30px rgba(0, 0, 0, 0.25);
        }

        #overlay {
            display: none;
            position: absolute;
            z-index: 1;
            top: 3.8rem;
            right: 1.2rem;

            width: 280px;
            max-width: calc(100vw - 2rem);

            background: var(--surface-strong);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 1rem;

            color: var(--text);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        #overlay.opened {
            display: block;
        }    
            
        .overlay-section {
            padding: 0.65rem 0;
        }

        .overlay-section + .overlay-section {
            border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .overlay-section a {
            color: rgba(0, 123, 255, 0.45);
        }

        /* -------------------------
        Poster
        ------------------------- */

        .poster {
            display: flex;
            align-items: center;
            justify-content: center;

            padding: 1rem;

            background: rgba(0, 0, 0, 0.12);
        }

        .poster img {
            display: block;

            width: 100%;
            max-width: 150px;
            height: auto;

            border-radius: 10px;

            object-fit: cover;

            box-shadow:
                0 6px 16px rgba(0, 0, 0, 0.25);
        }

        .poster-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            max-width: 150px;
            aspect-ratio: 2 / 3;

            border-radius: 10px;

            background: rgba(0, 0, 0, 0.18);

            color: rgba(255, 255, 255, 0.7);

            font-size: 2.5rem;
        }

        /* -------------------------
        Información
        ------------------------- */

        .media-content {
            display: flex;
            flex-direction: column;

            min-width: 0;
        }

        .information {
            position: relative;
            padding: 1rem 1.2rem;

            flex: 1;
        }

        .information-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            gap: 1rem;
        }

        .information-header h3 {
            min-width: 0;
            margin: 0;
            color: #ffffff;
            font-size: 1.15rem;
        }

        .information-actions {
            display: flex;
            gap: 0.4rem;

            flex-shrink: 0;
        }

        .watchitem-title {
            overflow-wrap: anywhere;
        }

        /* -------------------------
        Metadatos
        ------------------------- */

        .metadata {
            display: flex;
            flex-wrap: wrap;

            gap: 0.4rem;

            margin-top: 0.5rem;
        }

        .metadata span,
        .platform {
            display: inline-flex;
            align-items: center;

            padding: 0.25rem 0.55rem;

            border-radius: 999px;

            background: rgba(255, 255, 255, 0.12);

            color: var(--text);

            font-size: 0.74rem;
        }

        .platforms {
            display: flex;
            flex-wrap: wrap;

            gap: 0.4rem;

            margin-top: 0.6rem;
        }

        .genres {
            display: flex;
            flex-wrap: wrap;
            gap: .25rem .5rem;
            margin-top: .5rem;
        }

        .genre {
            font-size: .72rem;
            color: var(--muted);
            white-space: nowrap;
        }

        .genre:not(:last-child)::after {
            content: " ·";
        }

        /* -------------------------
        Barra inferior
        ------------------------- */
        .share-button {
            position: absolute;
            top: 0.8rem;
            left: 0.8rem;
            z-index: 2;

            display: flex;
            align-items: center;
            justify-content: center;

            width: 38px;
            height: 38px;

            padding: 0;

            border: 1px solid rgba(255, 255, 255, 0.35);
            border-radius: 50%;

            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(3px);

            color: #ffffff;

            font-size: 1rem;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .share-button:hover {
            background: rgba(0, 0, 0, 0.65);
            transform: scale(1.05);
        }

        .share-button.selected {
            background: #4caf50;
            color: white;
        }

        .media-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;

            gap: 1rem;

            padding: 0.65rem 1rem;

            border-top: 1px solid rgba(255, 255, 255, 0.18);

            background: rgba(0, 0, 0, 0.16);
        }

        .status {
            display: inline-flex;
            align-items: center;

            padding: 0.35rem 0.7rem;

            border-radius: 999px;

            color: #ffffff;

            font-size: 0.8rem;
            font-weight: 600;
        }

        .status-pending {
            background: rgba(255, 193, 7, 0.35);
        }

        .status-watching {
            background: rgba(40, 167, 69, 0.45);
        }

        .status-paused {
            background: rgba(255, 152, 0, 0.45);
        }

        .status-watched {
            background: rgba(0, 123, 255, 0.45);
        }

        .status-discarded {
            background: rgba(220, 53, 69, 0.45);
        }

        .status-actions {
            display: flex;
            align-items: center;

            gap: 0.4rem;
        }

        /* -------------------------
        Botones
        ------------------------- */

        .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            width: 34px;
            height: 34px;

            padding: 0;

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 50%;

            background: rgba(255, 255, 255, 0.1);

            color: #ffffff;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .action-button:hover {
            background: rgba(255, 255, 255, 0.2);

            transform: translateY(-1px);
        }

        /* -------------------------
        Móvil
        ------------------------- */

        @media (max-width: 650px) {

            .media-card {
                grid-template-columns: 110px minmax(0, 1fr);
            }

            .poster {
                padding: 0.65rem;
            }

            .information {
                padding: 0.8rem;
            }

            .information-header h3 {
                font-size: 1rem;
            }

            .media-actions {
                padding: 0.55rem 0.7rem;
            }

            .action-button {
                width: 32px;
                height: 32px;
            }
        }
    `;static properties={media:{type:Object},watchItem:{type:Object},overlayOpened:{type:Boolean},selectedToShare:{type:Boolean}};static getCatalogName(e,t){return e.find(e=>e.id===t)?.name??t}constructor(){super(),this.overlayOpened=!1}editItem(){this.dispatchEvent(new CustomEvent(`edit-item`,{detail:{media:this.media,watchItem:this.watchItem},bubbles:!0,composed:!0}))}changeStatus(e){this.dispatchEvent(new CustomEvent(`change-status`,{detail:{mediaId:this.media.id,status:e},bubbles:!0,composed:!0}))}showInformation(){this.overlayOpened=!this.overlayOpened,this.classList.toggle(`overlay-open`,this.overlayOpened)}formatDate(e){return new Date(e).toLocaleDateString(`es-ES`)}toggleRecommendation(){this.dispatchEvent(new CustomEvent(`toggle-recommendation`,{detail:{media:this.media,watchItem:this.watchItem},bubbles:!0,composed:!0}))}renderProgress(){let e=this.watchItem.progress;return e?e.minute===void 0?e.season!==void 0&&e.episode!==void 0?`Temporada ${e.season}, episodio ${e.episode}`:``:`${e.minute} min`:``}renderStatusActions(){switch(this.watchItem.status){case U.PENDING:return j`
                    <button
                        type="button"
                        class="action-button"
                        title="Empezar"
                        @click=${()=>this.changeStatus(U.WATCHING)}
                    >
                        <i class="fa fa-play"></i>
                    </button>
                `;case U.WATCHING:return j`
                    <button
                        type="button"
                        class="action-button"
                        title="Pausar"
                        @click=${()=>this.changeStatus(U.PAUSED)}
                    >
                        <i class="fa fa-pause"></i>
                    </button>

                    <button
                        type="button"
                        class="action-button"
                        title="Marcar como vista"
                        @click=${()=>this.changeStatus(U.WATCHED)}
                    >
                        <i class="fa fa-check"></i>
                    </button>
                `;case U.PAUSED:return j`
                    <button
                        type="button"
                        class="action-button"
                        title="Continuar"
                        @click=${()=>this.changeStatus(U.WATCHING)}
                    >
                        <i class="fa fa-play"></i>
                    </button>
                `;case U.WATCHED:return j`
                    <button
                        type="button"
                        class="action-button"
                        title="VerDeNuevo"
                        @click=${()=>this.changeStatus(U.PENDING)}
                    >
                        <i class="fa fa-refresh"></i>
                    </button>
                `;default:return``}}renderInformation(){let t=e.getCatalogName($.mediaTypes,this.media.type),n=this.media.genres.map(t=>e.getCatalogName($.genres,t)),r=this.watchItem.platforms.map(t=>e.getCatalogName($.platforms,t)),i=Array.isArray(this.media.ratings)?this.media.ratings.filter(e=>e?.Source&&e?.Value):[{Source:`IMDb`,Value:this.media.ratings?.imdb},{Source:`Metascore`,Value:this.media.ratings?.metascore}].filter(e=>e.Value);return j`
                    <div class="information-header">
                        <h3 class="watchitem-title">
                            ${this.media.title}
                        </h3>
   
                        <div class="information-actions">
                            <button
                                type="button"
                                class="action-button"
                                title="Información"
                                id="trigger"
                                @click=${this.showInformation}
                            >
                                <i class="fa fa-info-circle"></i>
                            </button>
                            
                            <button
                                type="button"
                                class="action-button"
                                title="Editar"
                                @click=${this.editItem}
                            >
                                <i class="fa fa-pencil"></i>
                            </button>
                        </div>
                    </div>

                    <div id="overlay" class="${this.overlayOpened?`opened`:``}">
                            
                        ${this.watchItem.reason?j`
                                <div class="overlay-section">
                                    <strong>Motivo</strong>
                                    <p>${this.watchItem.reason}</p>
                                </div>
                            `:``}

                        <div class="overlay-section">
                            <strong>Audio</strong>
                            <span>
                                ${this.watchItem.spanishAudio?`Español`:`Original`}
                            </span>
                        </div>

                        <div class="overlay-section">
                            <strong>Subtítulos</strong>
                            <span>
                                ${this.watchItem.spanishSubtitles?`Español`:`No`}
                            </span>
                        </div>

                        ${this.watchItem.userRating===void 0?``:j`
                                <div class="overlay-section">
                                    <strong>Mi valoración</strong>
                                    <span>${this.watchItem.userRating} / 10</span>
                                </div>
                            `}
                        
                        ${i.length?j`
                                <div class="overlay-section">
                                    <strong>Valoraciones</strong>
                                    ${i.map(e=>j`
                                            <div>
                                                <span>${e.Source}: ${e.Value}</span>
                                            </div>
                                        `)}
                                </div>
                            `:``}

                        ${this.watchItem.addedAt?j`
                                <div class="overlay-section">
                                    <strong>Añadida</strong>
                                    <span>${this.formatDate(this.watchItem.addedAt)}</span>
                                </div>
                            `:``}

                        ${this.watchItem.watchedAt?j`
                                <div class="overlay-section">
                                    <strong>Vista</strong>
                                    <span>${this.formatDate(this.watchItem.watchedAt)}</span>
                                </div>
                            `:``}

                        ${this.watchItem.progress?j`
                                <div class="overlay-section">
                                    <strong>Progreso</strong>
                                    <span>${this.renderProgress()}</span>
                                </div>
                            `:``}

                        ${this.media.country?j`
                                <div class="overlay-section">
                                    <strong>País</strong>
                                    <span>${this.media.country}</span>
                                </div>
                            `:``}

                        ${this.media.plot?j`
                                <div class="overlay-section">
                                    <strong>Sinopsis</strong>
                                    <p>${this.media.plot}</p>
                                </div>
                            `:``}

                        ${this.media.trailer?j`
                                <div class="overlay-section">
                                    <strong>Tráiler</strong>
                                    <a
                                        href=${this.media.trailer}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i class="fa fa-play-circle" aria-hidden="true"></i>
                                        Ver tráiler
                                    </a>
                                </div>
                            `:``}

                        ${this.media.awards?j`
                                <div class="overlay-section">
                                    <strong>Premios</strong>
                                    <span>${this.media.awards}</span>
                                </div>
                            `:``}
                        
                    </div>

                    <div class="metadata">



                        <span class="media-type">${t}</span>

                        ${this.media.year?j`<span>${this.media.year}</span>`:``}
                        ${this.media.runtimeMinutes?j`
                                <span>
                                    ${this.media.runtimeMinutes} min
                                </span>
                            `:``}
                        ${this.media.director?j`
                                <div class="overlay-section">
                                    <strong>Dirección</strong>
                                    <span>${this.media.director}</span>
                                </div>
                            `:``}

                        ${this.media.actors?j`
                                <div class="overlay-section">
                                    <strong>Reparto</strong>
                                    <span>${this.media.actors}</span>
                                </div>
                            `:``}
                    </div>
                    

                    ${n.length?j`
                            <div class="genres">
                                ${n.map(e=>j`
                                        <span class="genre">${e}</span>
                                    `)}
                            </div>
                        `:``}

                    ${r.length?j`
                            <div class="platforms">
                                <i class="fa fa-tv"></i> ${r.join(` · `)}
                            </div>
                        `:``}
                </div>
        `}render(){if(!this.media||!this.watchItem)return j``;let t=e.getCatalogName($.watchStatuses,this.watchItem.status),n=`status-${this.watchItem.status}`;return j`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
           
            <article class="media-card">

                <div class="poster">
                    ${this.media.poster?j`
                            <img
                                src=${this.media.poster}
                                alt="Cartel de ${this.media.title}"
                            >
                        `:j`
                            <div class="poster-placeholder">
                                <i class="fa fa-film"></i>
                            </div>
                        `}
                </div>

                <button
                    class=${this.selectedToShare?`share-button selected`:`share-button`}
                    title="Seleccionara para Recomendar"
                    @click=${this.toggleRecommendation}
                >
                    <i class=${this.selectedToShare?`fa fa-share`:`fa fa-share-alt`}></i>
                </button>

                <div class="media-content">
                    
                    <div class="information">
                        ${this.renderInformation()}
                    </div>

                    <div class="media-actions">
                    ${t?j`
                            <div class="status ${n}">
                                ${t}
                            </div>
                        `:``}
                        <div class="status-actions">
                            ${this.renderStatusActions()}
                        </div>
                    </div>
                </div>
                
            </article>
        `}};customElements.define(`watch-item-view`,Me);var Ne=class extends B{static styles=o`
        :host {
            display: block;
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }
            
        a {
            color: var(--text);
            text-decoration: none;
            transition:
                color 0.2s ease,
                transform 0.2s ease,
                box-shadow 0.2s ease;
        }

        a:hover {
            color: #ffffff;
        }

        .field {
            margin-bottom: 1rem;
        }
        
        .fit-content {
            width: fit-content; 
        }

        label {
            display: block;
            margin-bottom: 0.35rem;
            color: var(--text);
        }

        input,
        select {
            width: 100%;
            padding: 0.7rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--surface-strong);
            color: var(--text);
        }

        .checkbox-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem 1rem;
        }

        .checkbox {
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }

        .checkbox input {
            width: auto;
        }
        .details-button {
            margin-bottom: 1rem;
            padding: 0.45rem 0.8rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: transparent;
            color: var(--muted);
            cursor: pointer;
        }

        .details-button:hover {
            color: var(--text);
            border-color: var(--accent);
        }

        .details {
            margin-bottom: 1rem;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.04);
        }

    `;static properties={showDetails:{state:!0}};constructor(){super(),this.showDetails=!1}addItem(e){e.preventDefault();let t=e.target,n=[...t.querySelectorAll(`input[name="genres"]:checked`)].map(e=>e.value),r=[...t.querySelectorAll(`input[name="platforms"]:checked`)].map(e=>e.value);this.dispatchEvent(new CustomEvent(`add-item`,{detail:{title:t.title.value.trim(),type:t.type.value,year:t.year?.value?Number(t.year.value):void 0,originalTitle:t.originalTitle?.value.trim()||void 0,genres:n,platforms:r},bubbles:!0,composed:!0}))}resetForm(){this.renderRoot.querySelector(`form`).reset(),this.showDetails=!1}toggleDetails(){this.showDetails=!this.showDetails}render(){return j`
            <hr class="divider"></hr>
            <div class="header">
                <div class="header-icon">
                    <i class="fa fa-plus"></i>
                </div>

                <div>
                    <h2>Añadir elemento (manual)</h2>
                </div>
            </div>
            <form @submit=${this.addItem}>
                <div class="field">
                    <label for="title">
                        Título
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Título"
                        required
                    >
                </div>

                <div class="field fit-content">
                    <label for="type">
                        Tipo
                    </label>

                    <select id="type" name="type">
                        ${$.mediaTypes.map(e=>j`
                            <option value=${e.id}>
                                ${e.name}
                            </option>
                        `)}
                    </select>
                </div>

                <button
                    type="button"
                    class="details-button"
                    @click=${this.toggleDetails}
                >
                    ${this.showDetails?`− Ocultar detalles`:`+ Más detalles`}
                </button>

                ${this.showDetails?j`
                        <div class="details">

                            <div class="field fit-content">
                                <label for="year">
                                    Año
                                </label>

                                <input
                                    id="year"
                                    name="year"
                                    type="number"
                                    min="1888"
                                    max="2100"
                                    placeholder="Año"
                                >
                            </div>
                            <div class="field">
                                <label>
                                    Plataformas
                                </label>

                                <div class="checkbox-list">
                                    ${$.platforms.filter(e=>e.active).map(e=>j`
                                            <label class="checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="platforms"
                                                    value=${e.id}
                                                >
                                                ${e.name}
                                            </label>
                                        `)}
                                </div>
                            </div>

                            <div class="field">
                                <label for="originalTitle">
                                    Título original
                                </label>

                                <input
                                    id="originalTitle"
                                    name="originalTitle"
                                    type="text"
                                    placeholder="Título original"
                                >
                            </div>

                            <div class="field">
                                <label>
                                    Géneros
                                </label>

                                <div class="checkbox-list">
                                    ${$.genres.map(e=>j`
                                        <label class="checkbox">
                                            <input
                                                type="checkbox"
                                                name="genres"
                                                value=${e.id}
                                            >
                                            ${e.name}
                                        </label>
                                    `)}
                                </div>
                            </div>
                            
                        </div>
                    `:``}

                <button type="submit">
                    Añadir
                </button>

            </form>
           <hr class="divider"></hr>
        `}};customElements.define(`add-item-form`,Ne);var Pe=class{constructor({baseUrl:e=`https://omdb-proxy.joselon79.workers.dev`,fetchFunction:t=globalThis.fetch.bind(globalThis)}={}){this.baseUrl=e.replace(/\/+$/,``),this.fetchFunction=t}async search(e){if(typeof e!=`string`||!e.trim())throw Error(`Search title is required`);let t=new URLSearchParams({title:e.trim()}),n=await this.request(`/search?${t}`);return n.Response===`False`?[]:n.Search??[]}async getDetails(e){if(typeof e!=`string`||!e.trim())throw Error(`OMDb ID is required`);let t=new URLSearchParams({id:e.trim()}),n=await this.request(`/detail?${t}`);if(n.Response===`False`)throw Error(n.Error||`OMDb details not found`);return n}async request(e){let t=await this.fetchFunction(`${this.baseUrl}${e}`);if(!t.ok)throw Error(`OMDb request failed: ${t.status}`);return t.json()}},Fe=class extends B{static styles=o`
        :host {
            display: block;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        :host {
            display: block;
        }

        form {
            padding: 1.5rem;
            border: 2px solid var(--accent-2);
            border-radius: 14px;
            background: linear-gradient(
                135deg,
                rgba(255, 107, 44, 0.22),
                rgba(255, 154, 60, 0.12)
            );
            box-shadow:
                0 0 0 1px rgba(255, 154, 60, 0.15),
                0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header-icon {
            font-size: 1.4rem;
            color: var(--accent-2);
        }

        .header h2 {
            margin: 0;
            color: var(--text);
            font-size: 1.2rem;
        }

        .header p {
            margin: 0.2rem 0 0;
            color: var(--muted);
            font-size: 0.85rem;
        }

        .field {
            margin-bottom: 1rem;
        }

        .fit-content {
            width: fit-content; 
        }

        label {
            display: block;
            margin-bottom: 0.35rem;
            color: var(--text);
            font-weight: 500;
        }

        input,
        select,
        textarea {
            width: 100%;
            padding: 0.7rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--surface-strong);
            color: var(--text);
            font: inherit;
        }

        input:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border-color: var(--accent-2);
            box-shadow: 0 0 0 2px rgba(255, 154, 60, 0.15);
        }

        textarea {
            min-height: 100px;
            resize: vertical;
        }

        .checkbox-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem 1rem;
        }

        .checkbox {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-weight: normal;
        }

        .checkbox input {
            width: auto;
        }

        .progress {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        button {
            padding: 0.7rem 1.1rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            font: inherit;
            cursor: pointer;
            transition:
                background 0.2s ease,
                border-color 0.2s ease,
                transform 0.2s ease;
        }

        button:hover {
            transform: translateY(-1px);
        }

        button[type="submit"] {
            border-color: var(--accent-2);
            background: var(--accent);
            color: var(--text);
            font-weight: 600;
        }

        button[type="submit"]:hover {
            background: var(--accent-2);
        }

        button[type="button"] {
            background: rgba(0, 0, 0, 0.2);
            color: var(--muted);
        }

        button[type="button"]:hover {
            border-color: var(--text);
            color: var(--text);
        }

        button.delete-button {
            border-color: #c0392b;
            background: rgba(192, 57, 43, 0.2);
            color: #ff8a80;
        }

        button.delete-button:hover {
            border-color: #e74c3c;
            background: rgba(192, 57, 43, 0.35);
        }

        .omdb-results,
        .omdb-preview {
            margin-top: 1rem;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.18);
        }

        .omdb-result {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1rem;
            width: 100%;
            margin-top: 0.5rem;
            text-align: left;
        }

        .omdb-result img {
            width: 56px;
            max-height: 84px;
            object-fit: cover;
            border-radius: 4px;
        }

        .omdb-result span {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .omdb-result small {
            color: var(--muted);
        }

        .omdb-preview p {
            line-height: 1.5;
        }

        @media (max-width: 600px) {
            form {
                padding: 1rem;
            }

            .progress {
                grid-template-columns: 1fr;
                gap: 0;
            }

            .actions {
                flex-direction: column-reverse;
            }

            button {
                width: 100%;
            }
        }
    `;static properties={media:{attribute:!1},watchItem:{attribute:!1},omdbResults:{state:!0},omdbPreview:{state:!0},omdbSearching:{state:!0},omdbLoadingDetails:{state:!0},omdbError:{state:!0},showAllPlatforms:{state:!0},showAllGenres:{state:!0}};constructor(){super(),this.mediaInfoService=new Pe,this.media=void 0,this.watchItem=void 0,this.omdbResults=[],this.omdbPreview=void 0,this.omdbSearching=!1,this.omdbLoadingDetails=!1,this.omdbError=void 0,this.showAllPlatforms=!1,this.showAllGenres=!1}save(e){e.preventDefault();let t=e.target,n=[...t.querySelectorAll(`input[name="genres"]:checked`)].map(e=>e.value),r=[...t.querySelectorAll(`input[name="platforms"]:checked`)].map(e=>e.value),i=this.createProgress(t);this.dispatchEvent(new CustomEvent(`save-item`,{detail:{mediaId:this.media.id,media:{title:t.title.value.trim(),type:t.type.value,year:t.year.value?Number(t.year.value):void 0,originalTitle:t.originalTitle.value.trim()||void 0,genres:n,poster:t.poster.value.trim()||void 0,trailer:t.trailer.value.trim()||void 0},omdbDetails:this.omdbPreview,watchItem:{platforms:r,reason:t.reason.value.trim()||void 0,spanishAudio:t.spanishAudio.checked,spanishSubtitles:t.spanishSubtitles.checked,userRating:t.userRating.value?Number(t.userRating.value):void 0,progress:i}},bubbles:!0,composed:!0}))}async searchOmdb(){let e=this.renderRoot.querySelector(`[name="originalTitle"]`).value.trim();if(this.omdbError=void 0,this.omdbResults=[],this.omdbPreview=void 0,!e){this.omdbError=`Introduce un título para buscar.`;return}this.omdbSearching=!0;try{this.omdbResults=await this.mediaInfoService.search(e),this.omdbResults.length===0&&(this.omdbError=`OMDb no ha encontrado resultados.`)}catch(e){this.omdbError=`Error al buscar en OMDb: ${e.message}`}finally{this.omdbSearching=!1}}async selectOmdbResult(e){this.omdbError=void 0,this.omdbPreview=void 0,this.omdbLoadingDetails=!0;try{this.omdbPreview=await this.mediaInfoService.getDetails(e.imdbID),await this.updateComplete,this.renderRoot.querySelector(`.omdb-preview`)?.scrollIntoView({behavior:`smooth`,block:`start`})}catch(e){this.omdbError=`No se pudieron obtener los detalles: ${e.message}`}finally{this.omdbLoadingDetails=!1}}deleteItem(){this.dispatchEvent(new CustomEvent(`delete-item`,{detail:{mediaId:this.media.id},bubbles:!0,composed:!0}))}createProgress(e){if(this.media.type===V.SERIES){let t=e.season.value,n=e.episode.value,r=e.minute.value;return!t&&!n?void 0:new W({season:t?Number(t):void 0,episode:n?Number(n):void 0,minute:r?Number(r):void 0})}let t=e.minute.value;if(t)return new W({minute:Number(t)})}getProgressValue(e){return this.watchItem?.progress?.[e]??``}isGenreSelected(e){return this.media?.genres?.includes(e)}isPlatformSelected(e){return this.watchItem?.platforms?.includes(e)}renderProgress(){return this.media?.type===V.SERIES?j`
                <div class="progress">

                    <div class="field fit-content">
                        <label for="season">
                            Temporada
                        </label>

                        <input
                            id="season"
                            name="season"
                            type="number"
                            min="1"
                            value=${this.getProgressValue(`season`)}
                        >
                    </div>

                    <div class="field fit-content">
                        <label for="episode">
                            Episodio
                        </label>

                        <input
                            id="episode"
                            name="episode"
                            type="number"
                            min="1"
                            value=${this.getProgressValue(`episode`)}
                        >
                    </div>

                    <div class="field fit-content">
                        <label for="minute">
                        (minutos)
                        </label>

                        <input
                            id="minute"
                            name="minute"
                            type="number"
                            min="0"
                            value=${this.getProgressValue(`minute`)}
                        >
                    </div>

                </div>
            `:j`
            <div class="field fit-content">
                <label for="minute">
                    Progreso (minutos)
                </label>

                <input
                    id="minute"
                    name="minute"
                    type="number"
                    min="0"
                    value=${this.getProgressValue(`minute`)}
                >
            </div>
        `}renderOmdbSearch(){return j`
            ${this.omdbSearching?j`<p>Buscando en OMDb...</p>`:``}

            ${this.omdbError?j`
                    <p role="status">${this.omdbError}</p>
                `:``}

            ${this.omdbResults.length?j`
                    <div class="omdb-results">
                        <h3>Resultados de OMDb</h3>

                        ${this.omdbResults.map(e=>j`
                            <button
                                type="button"
                                class="omdb-result"
                                @click=${()=>this.selectOmdbResult(e)}
                            >
                                ${e.Poster&&e.Poster!==`N/A`?j`
                                        <img
                                            src=${e.Poster}
                                            alt=""
                                        >
                                    `:``}

                                <span>
                                    <strong>${e.Title}</strong>
                                    <span>
                                        ${e.Year??``}
                                        · ${e.Type??``}
                                    </span>
                                    <!--<small>${e.imdbID}</small>-->
                                </span>
                            </button>
                        `)}
                    </div>
                `:``}
            ${this.omdbLoadingDetails?j`<p>Cargando ficha completa...</p>`:``}

            ${this.omdbPreview?this.renderOmdbPreview():``}
        `}renderOmdbPreview(){let e=this.omdbPreview,t=Array.isArray(e.Ratings)?e.Ratings.filter(e=>e?.Source&&e?.Value):[];return j`
            <section class="omdb-preview">
                <h3>Vista previa del resultado seleccionado</h3>
                <p class="omdb-preview-notice" role="status">
                    Estos son los datos de OMDb que se guardarán al pulsar
                    Guardar. Si cancelas, no se aplicarán los cambios.
                </p>
                <p>
                    <strong>${e.Title}</strong>
                    ${e.Year?` (${e.Year})`:``}
                </p>

                <p>
                    <strong>ID OMDb:</strong>
                    ${e.imdbID}
                </p>

                ${e.Runtime&&e.Runtime!==`N/A`?j`<p><strong>Duración:</strong> ${e.Runtime}</p>`:``}

                ${e.Genre&&e.Genre!==`N/A`?j`<p><strong>Géneros OMDb:</strong> ${e.Genre}</p>`:``}

                ${e.Director&&e.Director!==`N/A`?j`<p><strong>Dirección:</strong> ${e.Director}</p>`:``}

                ${e.Country&&e.Country!==`N/A`?j`<p><strong>País:</strong> ${e.Country}</p>`:``}

                ${e.Actors&&e.Actors!==`N/A`?j`<p><strong>Reparto:</strong> ${e.Actors}</p>`:``}

                ${e.Plot&&e.Plot!==`N/A`?j`<p><strong>Sinopsis:</strong> ${e.Plot}</p>`:``}

                ${e.Awards&&e.Awards!==`N/A`?j`<p><strong>Premios:</strong> ${e.Awards}</p>`:``}

                ${t.length?j`
                        <div>
                            <strong>Valoraciones externas:</strong>
                            <ul>
                                ${t.map(e=>j`
                                    <li>
                                        ${e.Source}: ${e.Value}
                                    </li>
                                `)}
                            </ul>
                        </div>
                    `:``}
            </section>
        `}render(){return!this.media||!this.watchItem?``:j`
            <div class="header">
                <div class="header-icon">
                    <i class="fa fa-pencil"></i>
                </div>

                <div>
                    <h2>Editar elemento</h2>
                    <p>Estás modificando un elemento de tu lista</p>
                </div>
            </div>
            <form @submit=${this.save}>

                <div class="field">
                    <label for="title">
                        Título
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        value=${this.media.title}
                        required
                    >
                </div>

                <div class="field fit-content">
                    <label for="type">
                        Tipo
                    </label>

                    <select
                        id="type"
                        name="type"
                    >
                        ${$.mediaTypes.map(e=>j`
                            <option
                                value=${e.id}
                                ?selected=${e.id===this.media.type}
                            >
                                ${e.name}
                            </option>
                        `)}
                    </select>
                </div>

                <div class="field fit-content">
                    <label for="year">
                       ~ Año ~
                    </label>

                    <input
                        id="year"
                        name="year"
                        type="number"
                        min="1888"
                        max="2100"
                        placeholder="aaaa"
                        value=${this.media.year??``}
                    >
                </div>

                <div class="field">
                    <label>Plataformas</label>

                    <div class="checkbox-list">
                        ${$.platforms.filter(e=>e.active).filter(e=>this.showAllPlatforms||this.isPlatformSelected(e.id)).map(e=>j`
                                <label class="checkbox">
                                    <input
                                        type="checkbox"
                                        name="platforms"
                                        value=${e.id}
                                        ?checked=${this.isPlatformSelected(e.id)}
                                    >
                                    ${e.name}
                                </label>
                            `)}
                    </div>

                    ${$.platforms.filter(e=>e.active&&!this.isPlatformSelected(e.id)).length?j`
                            <button
                                type="button"
                                @click=${()=>{this.showAllPlatforms=!this.showAllPlatforms}}
                            >
                                ${this.showAllPlatforms?`Ocultar opciones`:`Añadir plataformas`}
                            </button>
                        `:``}
                </div>

                <div class="field">
                    <label>
                        Audio y subtítulos
                    </label>

                    <div class="checkbox-list">

                        <label class="checkbox">
                            <input
                                type="checkbox"
                                name="spanishAudio"
                                ?checked=${this.watchItem.spanishAudio}
                            >
                            Audio español
                        </label>

                        <label class="checkbox">
                            <input
                                type="checkbox"
                                name="spanishSubtitles"
                                ?checked=${this.watchItem.spanishSubtitles}
                            >
                            Subtítulos español
                        </label>

                    </div>
                </div>

                <div class="field">
                    <label for="reason">
                        Motivo / observaciones
                    </label>

                    <textarea
                        id="reason"
                        name="reason"
                        placeholder="¿Por qué quieres ver esta película o serie?"
                    >${this.watchItem.reason??``}</textarea>
                </div>

                 <div class="field fit-content">
                    <label>
                        Progreso
                    </label>

                    ${this.renderProgress()}
                </div>

                <div class="field fit-content">
                    <label for="userRating">
                        Valoración personal
                    </label>

                    <input
                        id="userRating"
                        name="userRating"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value=${this.watchItem.userRating??``}
                    >
                </div>

                <div class="field">
                    <label>Géneros</label>

                    <div class="checkbox-list">
                        ${$.genres.filter(e=>this.showAllGenres||this.isGenreSelected(e.id)).map(e=>j`
                                <label class="checkbox">
                                    <input
                                        type="checkbox"
                                        name="genres"
                                        value=${e.id}
                                        ?checked=${this.isGenreSelected(e.id)}
                                    >
                                    ${e.name}
                                </label>
                            `)}
                    </div>

                    ${$.genres.some(e=>!this.isGenreSelected(e.id))?j`
                            <button
                                type="button"
                                @click=${()=>{this.showAllGenres=!this.showAllGenres}}
                            >
                                ${this.showAllGenres?`Ocultar opciones`:`Añadir géneros`}
                            </button>
                        `:``}
                </div>

                <div class="field">
                    <label for="originalTitle">
                        Título Uniforme (V.O.)
                    </label>

                    <input
                        id="originalTitle"
                        name="originalTitle"
                        type="text"
                        value=${this.media.originalTitle??``}
                    >
                    <button
                        type="button"
                        @click=${this.searchOmdb}
                    >
                        <span role="img" aria-label="Buscar">🔍</span>
                        Buscar en OMDb
                    </button>
                </div>
                <div class="field">
                    <label for="poster">
                        URL del póster
                    </label>

                    <input
                        id="poster"
                        name="poster"
                        type="url"
                        placeholder="https://..."
                        value=${this.media.poster??``}
                    >

                    <small>
                        Déjalo vacío para utilizar el póster de OMDb.
                    </small>
                </div>

                <div class="field">
                    <label for="trailer">URL del tráiler</label>

                    <input
                        id="trailer"
                        name="trailer"
                        type="url"
                        placeholder="https://..."
                        value=${this.media.trailer??``}
                    >

                    <small>
                        Enlace al tráiler en Youtube u otras fuentes.
                    </small>
                </div>

                <!--Resultados-->
                ${this.renderOmdbSearch()}

                <div class="actions">
                    <button type="submit">
                        Guardar
                    </button>
                    <button
                        type="button"
                        class="delete-button"
                        @click=${this.deleteItem}
                    >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        Eliminar
                    </button>
                    <button
                        type="button"
                        @click=${()=>this.dispatchEvent(new CustomEvent(`cancel-edit`,{bubbles:!0,composed:!0}))}
                    >
                        Cancelar
                    </button>
                </div>

            </form>
        `}};customElements.define(`edit-item-form`,Fe);var Ie=class extends B{static styles=o`
        :host {
            display: block;
        }
            
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        /* Lista */

        .list-header {
            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );

            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 1.1rem 1.3rem 1.3rem;
            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.25);

            text-align: center;
        }

        .hero-badge {
            display: inline-block;
            margin-bottom: 0.5rem;
            padding: 0.35rem 0.8rem;

            border-radius: 999px;

            background: rgba(255, 107, 44, 0.18);
            color: #ffd7bf;

            font-size: 0.82rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
        }

        .media-list {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }

        
        .empty {
            margin: 1rem 0 0;
            padding: 1rem;

            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);
            color: var(--muted);

            text-align: center;
        }

        .item-container {
            position: relative;
        }

        .edit-transition {
            animation: edit-in 0.25s ease;
        }

        @keyframes edit-in {
            from {
                opacity: 0;
                transform: translateY(8px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* -------------------------
        Botones
        ------------------------- */

        .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            width: 34px;
            height: 34px;

            padding: 0;

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 50%;

            background: rgba(255, 255, 255, 0.1);

            color: #ffffff;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .action-button:hover {
            background: rgba(255, 255, 255, 0.2);

            transform: translateY(-1px);
        }

        .add-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 1.5rem;
            padding: 1rem;
        }

        .add-item-button {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 64px;
            height: 64px;

            border: 2px solid var(--accent);
            border-radius: 50%;

            background: rgba(255, 107, 44, 0.15);
            color: var(--accent);

            font-size: 1.8rem;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .add-item-button:hover {
            background: rgba(255, 107, 44, 0.25);
            transform: scale(1.05);
        }

        
        .recommendation-bar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;

            width: 100%;
            min-height: 4.5rem;
            padding: 0.65rem 1rem;
            padding-bottom: calc(
                0.65rem + env(safe-area-inset-bottom, 0px)
            );

            display: flex;
            align-items: center;
            justify-content: center;

            z-index: 100;

            background: rgba(46, 125, 50, 0.78);
            border-top: 1px solid rgba(129, 199, 132, 0.55);
            box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.22);

            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }

        .recommend-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.65rem;

            min-height: 42px;
            padding: 0.65rem 1.25rem;

            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 999px;

            background: #2e7d32;
            color: #fff;

            font-size: 0.95rem;
            font-weight: 600;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .recommend-button:hover {
            background: #388e3c;
            transform: translateY(-1px);
        }

        .recommend-button:active {
            transform: translateY(0);
        }

        .recommend-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-width: 22px;
            height: 22px;
            padding: 0 6px;

            border-radius: 999px;

            background: #fff;
            color: #2e7d32;

            font-size: 0.75rem;
            font-weight: 700;
        }


        .recommend-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-width: 20px;
            height: 20px;

            padding: 0 6px;

            border-radius: 10px;

            background: white;
            color: #333;

            font-size: 0.75rem;
            font-weight: bold;
        }
        .list-actions {
            display: flex;
            justify-content: center;
            gap: 0.6rem;
            position: relative;
        }

        .action-button.active {
            background: rgba(255, 107, 44, 0.25);
            border-color: var(--accent);
            color: var(--accent);
        }

        .filter-container {
            position: relative;
            display: inline-flex;
        }

        .filter-menu {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            z-index: 20;

            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            min-width: 180px;
            padding: 0.4rem;

            background: #292929;
            border: 1px solid var(--border);
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }

        .filter-option {
            padding: 0.65rem 0.8rem;

            border: none;
            border-radius: 8px;

            background: transparent;
            color: var(--text);

            text-align: left;
            cursor: pointer;
        }

        .filter-option:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        .filter-option.selected {
            background: rgba(255, 107, 44, 0.18);
            color: var(--accent);
        }

        .filter-description {
            display: inline-block;
            margin-bottom: 0.7rem;
        }

        .filter-separator {
            height: 1px;
            margin: 0.35rem 0;
            background: var(--border);
        }
        
        /* Móvil */

        @media (max-width: 768px) {
            .list-header {
                padding: 1rem 0.8rem 1.1rem;
            }

            .action-button {
                width: 32px;
                height: 32px;
            }
        }
    `;static properties={watchList:{attribute:!1},dataVersion:{type:Number},items:{state:!0},editingItem:{state:!0},listName:{state:!0},addingItem:{type:Boolean},selectedItemsToShare:{state:!0},linkCopied:{state:!0},filters:{state:!0},sortMode:{state:!0},showFilterOptions:{state:!0}};constructor(){super(),this.watchList=void 0,this.service=void 0,this.items=[],this.listName=``,this.fileStorage=new ke,this.recommendService=new Q,this.editingItem=void 0,this.addingItem=!1,this.selectedItemsToShare=[],this.linkCopied=!1,this.filters={status:null,type:null},this.sortMode=`DEFAULT`,this.showFilterOptions=!1}willUpdate(e){e.has(`watchList`)&&this.watchList&&(this.service=new X(this.watchList)),this.service&&(e.has(`watchList`)||e.has(`dataVersion`))&&(this.listName=this.service.watchList.name,this.items=this.service.getItems())}notifyWatchListChanged(){this.dispatchEvent(new CustomEvent(`watch-list-changed`,{detail:{watchList:this.service.watchList},bubbles:!0,composed:!0}))}refreshItems(){this.items=[...this.service.getItems()],this.listName=this.service.watchList.name}showAddItemForm(){this.addingItem=!0}addItem(e){let{title:t,type:n}=e.detail;if(!t)return;let r=this.service.addItem(e.detail);if(!r.success){console.error(r.error);return}this.items=this.service.getItems(),this.notifyWatchListChanged(),e.target.resetForm(),this.hideAddItemForm()}hideAddItemForm(){this.addingItem=!1}editItem(e){this.editingItem=e.detail}cancelEdit(){this.editingItem=void 0}deleteItem(e){let{mediaId:t}=e.detail;if(!confirm(`¿Quieres eliminar este elemento de tu lista?`))return;let n=this.service.deleteItem(t);if(!n.success){console.error(n.error);return}this.notifyWatchListChanged(),this.items=this.service.getItems(),this.editingItem=void 0}saveItem(e){let t=this.service.updateItem(e.detail);if(!t.success){console.error(t.error);return}this.notifyWatchListChanged(),this.items=this.service.getItems(),this.editingItem=void 0}changeStatus(e){let t=this.service.changeStatus(e.detail.mediaId,e.detail.status);if(!t.success){console.error(t.error);return}this.notifyWatchListChanged(),this.items=[...this.service.getItems()]}toggleRecommendation(e){let t=e.detail;if(this.selectedItemsToShare.some(e=>e.media.id===t.media.id)){this.selectedItemsToShare=this.selectedItemsToShare.filter(e=>e.media.id!==t.media.id);return}this.selectedItemsToShare=[...this.selectedItemsToShare,t]}isSelectedToShare(e){return this.selectedItemsToShare.some(t=>t.media.id===e.media.id)}createRecommendationExchange(){if(this.selectedItemsToShare.length===0)return;let e=this.selectedItemsToShare.map(e=>e.watchItem),t=this.recommendService.createRecommendationList(this.service.watchList,e),n=this.recommendService.createRecommendationExchange(t,this.service.watchList);this.shareRecommendationExchange(n)}async shareRecommendationExchange(e){let t=await new je().encode(e),n=new URL(`https://joselon79.neocities.org/quevemos`);n.searchParams.set(`recommendation`,t);try{await navigator.clipboard.writeText(n.toString()),this.linkCopied=!0,setTimeout(()=>{this.linkCopied=!1},2e3)}catch(e){console.error(`No se pudo copiar el enlace:`,e)}}editListName(){let e=prompt(`Ingrese el nuevo nombre para la lista:`,this.service.watchList.name);if(!e)return;let t=this.service.renameWatchList(e);if(!t.success){console.error(t.error);return}this.notifyWatchListChanged(),this.listName=this.service.watchList.name}exportWatchList(){let e=this.fileStorage.export(this.service.watchList),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`quevemos-watchlist.json`,r.click(),URL.revokeObjectURL(n)}importWatchList(){if(!confirm(`La lista actual será sustituida por la lista importada. ¿Deseas continuar?`))return;let e=document.createElement(`input`);e.type=`file`,e.accept=`application/json,.json`,e.addEventListener(`change`,async()=>{let t=e.files[0];if(t)try{let e=await t.text(),n=this.fileStorage.import(e);this.service=new X(n),this.listName=this.service.watchList.name,this.items=this.service.getItems(),this.editingItem=void 0,this.notifyWatchListChanged()}catch(e){console.error(e),alert(`No se pudo importar la lista:\n${e.message}`)}}),e.click()}resetWatchList(){if(!confirm(`Se perderán todos los datos de la lista. ¿Deseas continuar?`))return;let e=new K({name:`Mi nueva lista`});this.service=new X(e),this.listName=this.service.watchList.name,this.items=this.service.getItems(),this.notifyWatchListChanged()}getStatusLabel(e){return{[U.PENDING]:`Pendientes`,[U.WATCHING]:`En curso`,[U.PAUSED]:`Pausadas`,[U.WATCHED]:`Vistas`,[U.DISCARDED]:`Descartadas`}[e]??e}getAvailableStatuses(){return Object.values(U)}getVisibleItems(){let e=this.items.filter(e=>{let t=!this.filters.status||e.watchItem.status===this.filters.status,n=!this.filters.type||e.media.type===this.filters.type;return t&&n});return this.sortMode===`AZ`?e.sort((e,t)=>e.media.title.localeCompare(t.media.title,`es`,{sensitivity:`base`})):this.sortMode===`ZA`&&e.sort((e,t)=>t.media.title.localeCompare(e.media.title,`es`,{sensitivity:`base`})),e}getFilterDescription(){let e=[];return this.filters.type&&e.push(this.getMediaTypeFilterLabel(this.filters.type)),this.filters.status&&e.push(this.getStatusLabel(this.filters.status)),e.length===0?`Mostrando todos los elementos`:`Mostrando solo ${e.join(` · `)}`}toggleFilterOptions(){this.showFilterOptions=!this.showFilterOptions}setStatusFilter(e){this.filters={...this.filters,status:e},this.showFilterOptions=!1}toggleSort(){let e={DEFAULT:`AZ`,AZ:`ZA`,ZA:`DEFAULT`};this.sortMode=e[this.sortMode]}getMediaTypeFilterLabel(e){return{[V.MOVIE]:`Películas`,[V.SERIES]:`Series`,[V.VIDEOGAMES]:`Videojuegos`}[e]??e}getAvailableMediaTypes(){return Object.values(V)}setMediaTypeFilter(e){this.filters={...this.filters,type:e},this.showFilterOptions=!1}render(){let e=this.getVisibleItems();return j`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
            <div class="list-header">
                <div class="storage-actions">
                    <button
                        type="button"
                        @click=${this.exportWatchList}
                    >
                        <i class="fa fa-download"></i>
                        Exportar lista
                    </button>

                    <button
                        type="button"
                        @click=${this.importWatchList}
                    >
                        <i class="fa fa-upload"></i>
                        Importar lista
                    </button>

                    <button
                        type="button"
                        @click=${this.resetWatchList}
                    >
                        <i class="fa fa-refresh"></i>
                        Reset
                    </button>
                </div>
                <h2>${this.listName} <button
                        type="button"
                        class="action-button"
                        title="Editar Nombre de la lista"
                        @click=${this.editListName}
                    >
                        <i class="fa fa-pencil"></i>
                    </button>
                </h2>
            </div>
            
            ${this.items.length===0?j`
                    <p class="empty">
                        La lista está vacía.
                    </p>
                    <div class= "add-item">
                    ${this.addingItem?j`
                            <add-item-form
                                @add-item=${this.addItem}
                            ></add-item-form>
                            <button
                                type="button"
                                class="add-item-button"
                                title="Ocultar Añadir elemento"
                                @click=${this.hideAddItemForm}
                            >
                                <i class="fa fa-minus"></i>
                            </button>
                        `:j`
                            <button
                                type="button"
                                class="add-item-button"
                                title="Añadir elemento"
                                @click=${this.showAddItemForm}
                            >
                                <i class="fa fa-plus"></i>
                            </button>
                        `}

                    </div> 
                `:j` 
                    <div class="media-list">
                        
                        <div class="list-header">
                            <div class="hero-badge filter-description">
                                ${this.getFilterDescription()}
                            </div>

                            <div class="list-actions">
                                <button
                                    type="button"
                                    class="action-button ${this.sortMode===`DEFAULT`?``:`active`}"
                                    title=${this.sortMode===`DEFAULT`?`Ordenar A-Z`:this.sortMode===`AZ`?`Ordenar Z-A`:`Volver al orden original`}
                                    aria-label=${this.sortMode===`DEFAULT`?`Orden original`:this.sortMode===`AZ`?`Orden alfabético A-Z`:`Orden alfabético Z-A`}
                                    @click=${this.toggleSort}
                                >
                                    <i class=${this.sortMode===`DEFAULT`?`fa fa-sort`:this.sortMode===`AZ`?`fa fa-sort-alpha-asc`:`fa fa-sort-alpha-desc`}></i>
                                </button>

                                <div class="filter-container">
                                    <button
                                        type="button"
                                        class="action-button ${this.filters.status||this.filters.type?`active`:``}"
                                        title="Filtrar por estado"
                                        aria-label="Filtrar por estado"
                                        aria-expanded=${this.showFilterOptions}
                                        @click=${this.toggleFilterOptions}
                                    >
                                        <i class="fa fa-filter"></i>
                                    </button>

                                    ${this.showFilterOptions?j`
                                            <div class="filter-menu">
                                                <button
                                                    type="button"
                                                    class="filter-option ${this.filters.status?``:`selected`}"
                                                    @click=${()=>this.setStatusFilter(null)}
                                                >
                                                    Todos los estados
                                                </button>

                                                ${this.getAvailableStatuses().map(e=>j`
                                                    <button
                                                        type="button"
                                                        class="filter-option ${this.filters.status===e?`selected`:``}"
                                                        @click=${()=>this.setStatusFilter(e)}
                                                    >
                                                        ${this.getStatusLabel(e)}
                                                    </button>
                                                `)}

                                                <div class="filter-separator"></div>

                                                <button
                                                    type="button"
                                                    class="filter-option ${this.filters.type?``:`selected`}"
                                                    @click=${()=>this.setMediaTypeFilter(null)}
                                                >
                                                    Todos los tipos
                                                </button>

                                                ${this.getAvailableMediaTypes().map(e=>j`
                                                    <button
                                                        type="button"
                                                        class="filter-option ${this.filters.type===e?`selected`:``}"
                                                        @click=${()=>this.setMediaTypeFilter(e)}
                                                    >
                                                        ${this.getMediaTypeFilterLabel(e)}
                                                    </button>
                                                `)}
                                            </div>
                                        `:``}
                                </div>
                            </div>
                        </div>

                        ${e.length===0?j`
                                <p class="empty">
                                    No hay elementos que coincidan con el filtro.
                                </p>
                            `:e.map(e=>j`
                                    <div class="item-container">
                                        ${this.editingItem?.media.id===e.media.id?j`
                                                <div class="edit-transition">
                                                    <edit-item-form
                                                        .media=${e.media}
                                                        .watchItem=${e.watchItem}
                                                        @save-item=${this.saveItem}
                                                        @cancel-edit=${this.cancelEdit}
                                                        @delete-item=${this.deleteItem}
                                                    ></edit-item-form>
                                                </div>
                                            `:j`
                                                <div class="edit-transition">
                                                    <watch-item-view
                                                        .media=${e.media}
                                                        .watchItem=${e.watchItem}
                                                        .selectedToShare=${this.isSelectedToShare(e)}
                                                        @edit-item=${this.editItem}
                                                        @change-status=${this.changeStatus}
                                                        @toggle-recommendation=${this.toggleRecommendation}
                                                    ></watch-item-view>
                                                </div>
                                            `}
                                    </div>
                                `)}
                        ${this.selectedItemsToShare.length>0?j`
                                <div class="recommendation-bar">
                                    <button
                                        class="recommend-button"
                                        title="Recomendar seleccionados"
                                        @click=${this.createRecommendationExchange}
                                    >
                                        <i class="fa fa-share-alt"></i>
                                        <span>Recomendar</span>
                                        <span class="recommend-badge">
                                            ${this.selectedItemsToShare.length}
                                        </span>
                                        ${this.linkCopied?j`
                                                <div class="toast-overlay">
                                                    <div class="toast">
                                                        <span>✓</span>
                                                        Enlace copiado
                                                    </div>
                                                </div>
                                            `:``}
                                    </button>
                                </div>
                            `:``}

                        ${this.editingItem?``:j`
                            <div class= "add-item">
                                ${this.addingItem?j`
                                        <add-item-form
                                            @add-item=${this.addItem}
                                        ></add-item-form>
                                        <button
                                            type="button"
                                            class="add-item-button"
                                            title="Ocultar Añadir elemento"
                                            @click=${this.hideAddItemForm}
                                        >
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    `:j`
                                        <button
                                            type="button"
                                            class="add-item-button"
                                            title="Añadir elemento"
                                            @click=${this.showAddItemForm}
                                        >
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    `}

                            </div>
                            `}

                    </div>
                    
                `}
        `}};customElements.define(`watch-list-view`,Ie);var Le=class{export(e){return JSON.stringify(e,null,2)}import(e){let t=this.parse(e);return this.validate(t),t.map(e=>new Y({version:e.version,id:e.id,name:e.name,recommendations:e.recommendations.map(e=>new J(e)),createdAt:e.createdAt}))}parse(e){try{return JSON.parse(e)}catch{throw Error(`Invalid JSON`)}}validate(e){if(!Array.isArray(e))throw Error(`Invalid Inbox's file`);e.forEach(e=>{if(!Number.isInteger(e.version)||e.version<1||e.version>1)throw Error(`Unsupported IncomingRecommendationList version`);if(!Array.isArray(e.recommendations))throw Error(`IncomingRecommendationList recommendations is not an array`)})}},Re=class{constructor(e=new je,t=`recommendation`){this.codec=e,this.parameterName=t}async read(e){let t=new URL(e).searchParams.get(this.parameterName);if(!t)return null;try{return new Z(await this.codec.decode(t))}catch{throw Error(`Invalid recommendation link`)}}},ze=class e extends B{static styles=o`
        :host {
            display: block;
        }

        .recommendation {
            display: grid;
            grid-template-columns: 100px 1fr;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: 10px;
            background: var(--surface);
        }

        .poster {
            width: 100px;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            border-radius: 6px;
            background: var(--surface-strong);
        }

        .poster img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .poster-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.4;
        }

        .information {
            min-width: 0;
        }

        h3 {
            margin: 0 0 0.35rem;
        }

        .original-title {
            margin: 0 0 0.5rem;
            opacity: 0.7;
            font-size: 0.9rem;
        }

        .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            font-size: 0.9rem;
        }

        .badge {
            padding: 0.25rem 0.5rem;
            border-radius: 5px;
            background: var(--surface-strong);
        }

        .status {
            margin-bottom: 0.75rem;
            font-weight: 600;
        }

        .status.matched {
            color: var(--accent);
        }

        .status.new {
            color: var(--text);
        }

        .reason {
            margin: 0 0 0.75rem;
            white-space: pre-line;
        }

        .rating {
            margin-bottom: 0.75rem;
        }

        .differences {
            margin: 0;
            padding-left: 1.2rem;
        }

        .differences-title {
            margin-bottom: 0.35rem;
            font-weight: 600;
        }

        .actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        button {
            padding: 0.6rem 0.9rem;
            border: 0;
            border-radius: 8px;
            cursor: pointer;
        }
        .candidates {
            margin-top: 1rem;
        }

        .candidate-grid {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 0.5rem;
        }

        .candidate {
            min-width: 0;
            padding: 0.6rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--surface-strong);
            color: var(--text);
            text-align: left;
            overflow-wrap: anywhere;
        }

        .candidate.selected {
            border-color: var(--accent);
            box-shadow: inset 0 0 0 1px var(--accent);
        }

        .candidate-navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-top: 0.6rem;
        }

        .merge-fields {
            display: grid;
            gap: 0.4rem;
            margin-top: 0.8rem;
        }

        .merge-fields label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .actions {
            flex-wrap: wrap;
        }

        button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        @media (max-width: 768px) {
            .candidate-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .recommendation {
                grid-template-columns: 70px 1fr;
            }

            .poster {
                width: 70px;
            }
        }
    `;static properties={comparison:{attribute:!1},selectedCandidateId:{state:!0},candidatePage:{state:!0},selectedMediaFields:{state:!0}};static getCatalogName(e,t){return e.find(e=>e.id===t)?.name??t}constructor(){super(),this.comparison=void 0,this.selectedCandidateId=null,this.candidatePage=0,this.selectedMediaFields=[]}get candidatePageCount(){return Math.ceil(this.matches.length/5)}get visibleCandidates(){return this.matches.slice(this.candidatePage*5,this.candidatePage*5+5)}get selectedCandidate(){return this.matches.find(e=>e.media.id===this.selectedCandidateId)}updated(e){e.has(`comparison`)&&(this.selectedCandidateId=null,this.candidatePage=0,this.selectedMediaFields=[])}selectCandidate(e){this.selectedCandidateId=e.media.id,this.selectedMediaFields=[]}toggleMediaField(e,t){this.selectedMediaFields=t?[...new Set([...this.selectedMediaFields,e])]:this.selectedMediaFields.filter(t=>t!==e)}previousCandidatePage(){this.candidatePage=Math.max(0,this.candidatePage-1)}nextCandidatePage(){this.candidatePage=Math.min(this.candidatePageCount-1,this.candidatePage+1)}get media(){return this.comparison?.media}get recommendation(){return this.comparison?.recommendation}get matches(){return this.comparison?.matches??[]}get differences(){return this.matches.length===0?[]:this.matches[0].differences??[]}isNew(){return this.comparison?.status===`new`}isMatched(){return this.comparison?.status===`matched`}accept(e){(e!==`merge`||this.selectedCandidate&&this.selectedMediaFields.length!==0)&&this.dispatchEvent(new CustomEvent(`accept-recommendation`,{detail:{comparison:this.comparison,decision:e,targetMediaId:e===`merge`?this.selectedCandidate.media.id:void 0,mediaFields:e===`merge`?[...this.selectedMediaFields]:[]},bubbles:!0,composed:!0}))}discard(){this.dispatchEvent(new CustomEvent(`discard-recommendation`,{detail:{comparison:this.comparison},bubbles:!0,composed:!0}))}renderStatus(){return this.isNew()?j`
                <div class="status new">
                    <i class="fa fa-plus-circle"></i>
                    No está en tu lista
                </div>
            `:this.isMatched()?j`
                <div class="status matched">
                    <i class="fa fa-check-circle"></i>
                    Ya está en tu lista
                </div>
            `:j`
            <div class="status">
                Posible coincidencia
            </div>
        `}renderDifferences(){return!this.isMatched()||this.differences.length===0?``:j`
            <div>
                <div class="differences-title">
                    Diferencias
                </div>

                <ul class="differences">
                    ${this.differences.map(e=>j`
                        <li>${e}</li>
                    `)}
                </ul>
            </div>
        `}render(){if(!this.comparison)return``;let t=this.media,n=this.recommendation;return j`
            <article class="recommendation">

                <div class="poster">
                    ${t?.poster?j`
                            <img
                                src=${t.poster}
                                alt="Cartel de ${t.title}"
                            >
                        `:j`
                            <div class="poster-placeholder">
                                <i class="fa fa-film"></i>
                            </div>
                        `}
                </div>

                <div class="information">

                    <h3>
                        ${t?.title}
                    </h3>

                    ${t?.originalTitle?j`
                            <p class="original-title">
                                ${t.originalTitle}
                            </p>
                        `:``}

                    <div class="meta">

                        ${t?.year?j`
                                <span class="badge">
                                    ${t.year}
                                </span>
                            `:``}

                        ${t?.type?j`
                                <span class="badge">
                                    ${e.getCatalogName($.mediaTypes,t.type)}
                                </span>
                            `:``}

                    </div>

                    ${this.renderStatus()}

                    ${n?.recommenderRating===void 0?``:j`
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                ${n.recommenderRating}/10
                            </div>
                        `}

                    ${n?.reason?j`
                            <p class="reason">
                                ${n.reason}
                            </p>
                        `:``}

                    ${this.renderDifferences()}

                    ${this.matches.length>0?j`
                        <section class="candidates">
                            <div class="differences-title">
                                Candidatos para fusionar
                            </div>

                            <div class="candidate-grid">
                                ${this.visibleCandidates.map(e=>j`
                                    <button
                                        type="button"
                                        class="candidate ${e.media.id===this.selectedCandidateId?`selected`:``}"
                                        aria-pressed=${e.media.id===this.selectedCandidateId}
                                        @click=${()=>this.selectCandidate(e)}
                                    >
                                        <strong>${e.media.title}</strong>
                                        <div>${e.media.year??`Año desconocido`}</div>
                                        <small>Motivo: ${e.matches.join(`, `)}</small>
                                    </button>
                                `)}
                            </div>

                            ${this.candidatePageCount>1?j`
                                <div class="candidate-navigation">
                                    <button
                                        type="button"
                                        ?disabled=${this.candidatePage===0}
                                        @click=${this.previousCandidatePage}
                                    >
                                        Anteriores
                                    </button>

                                    <span>
                                        ${this.candidatePage+1}
                                        / ${this.candidatePageCount}
                                    </span>

                                    <button
                                        type="button"
                                        ?disabled=${this.candidatePage>=this.candidatePageCount-1}
                                        @click=${this.nextCandidatePage}
                                    >
                                        Siguientes
                                    </button>
                                </div>
                            `:``}

                            ${this.selectedCandidate?j`
                                <div class="merge-fields">
                                    <strong>
                                        Campos que se actualizarán en
                                        ${this.selectedCandidate.media.title}
                                    </strong>

                                    ${this.selectedCandidate.differences.map(e=>j`
                                        <label>
                                            <input
                                                type="checkbox"
                                                .checked=${this.selectedMediaFields.includes(e)}
                                                @change=${t=>this.toggleMediaField(e,t.target.checked)}
                                            >
                                            ${e}
                                        </label>
                                    `)}
                                </div>
                            `:``}
                        </section>
                        `:``}
                    <div class="actions">
                        <button
                            type="button"
                            ?disabled=${n.status===q.ACCEPTED}
                            @click=${()=>this.accept(`create`)}
                        >
                            <i class="fa fa-plus"></i>
                            Añadir como nuevo
                        </button>

                        <button
                            type="button"
                            ?disabled=${n.status===q.ACCEPTED||!this.selectedCandidate||this.selectedMediaFields.length===0}
                            @click=${()=>this.accept(`merge`)}
                        >
                            <i class="fa fa-code-fork"></i>
                            Fusionar
                        </button>

                        <button
                            type="button"
                            ?disabled=${n.status===q.ACCEPTED}
                            @click=${this.discard}
                        >
                            <i class="fa fa-times"></i>
                            Descartar
                        </button>
                    </div>

                </div>

            </article>
        `}};customElements.define(`recommendation-item-view`,ze);var Be=class extends B{static styles=o`
        :host {
            display: block;
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        .recommendation-list {
            margin-top: 0.9rem;

            border: 1px solid var(--border);
            border-radius: 16px;

            background: rgba(255, 255, 255, 0.05);

            overflow: hidden;
        }

        /* -------------------------
           Cabecera
           ------------------------- */

        .list-header {
            display: flex;
            align-items: center;
            gap: 1rem;

            padding: 1rem 1.1rem;

            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );
        }

        .list-info {
            flex: 1;
            min-width: 0;
        }

        .list-info h3 {
            margin: 0;

            font-size: 1.05rem;
        }

        .list-count {
            margin-top: 0.2rem;

            color: var(--muted);
            font-size: 0.9rem;
        }

        /* -------------------------
           Estados
           ------------------------- */

        .status-counts {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;

            margin-top: 0.5rem;
        }

        .status {
            color: var(--muted);
            font-size: 0.82rem;
            white-space: nowrap;
        }

        .status.pending {
            color: var(--accent-2);
        }

        .status.accepted {
            color: #8fd694;
        }

        .status.discarded {
            color: #e59a9a;
        }

        /* -------------------------
           Acciones
           ------------------------- */

        .actions {
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }

        .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            width: 34px;
            height: 34px;

            padding: 0;

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 50%;

            background: rgba(255, 255, 255, 0.1);

            color: #ffffff;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .action-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }

        /* -------------------------
           Contenido
           ------------------------- */

        .list-content {
            padding: 1rem;
        }

        /* -------------------------
           Móvil
           ------------------------- */

        @media (max-width: 768px) {

            .list-header {
                align-items: flex-start;
                padding: 0.9rem;
            }

            .actions {
                flex-shrink: 0;
            }

            .status-counts {
                gap: 0.4rem;
            }

            .status {
                font-size: 0.78rem;
            }

            .list-content {
                padding: 0.8rem;
            }
        }
    `;static properties={incomingList:{attribute:!1},watchList:{attribute:!1},dataVersion:{type:Number},comparisons:{state:!0},expanded:{state:!0},showProcessed:{state:!0}};constructor(){super(),this.watchListStorage=void 0,this.watchList=void 0,this.service=new Q,this.comparisons=[],this.expanded=!1,this.showProcessed=!1}updated(e){e.has(`incomingList`)&&(this.showProcessed=!1,this.expanded=!1),(e.has(`incomingList`)||e.has(`watchList`)||e.has(`dataVersion`))&&this.incomingList&&this.watchList&&this.updateComparisons()}updateComparisons(){this.comparisons=this.service.compareRecommendations(this.incomingList,this.watchList)}getStatusCount(e){return this.incomingList.recommendations.filter(t=>t.status===e).length}getVisibleComparisons(){return this.showProcessed?this.comparisons:this.comparisons.filter(e=>e.recommendation.status===q.PENDING)}toggleExpanded(){this.expanded=!this.expanded,this.showProcessed=!0}handleAccept(e){let{comparison:t,decision:n,targetMediaId:r,mediaFields:i}=e.detail;this.resolveRecommendation(t,n,{targetMediaId:r,mediaFields:i})}handleDiscard(e){this.resolveRecommendation(e.detail.comparison,`discard`)}resolveRecommendation(e,t,n={}){try{this.service.resolveRecommendation({incomingRecommendationList:this.incomingList,incomingRecommendation:e.recommendation,decision:t,watchList:this.watchList,targetMediaId:n.targetMediaId,mediaFields:n.mediaFields??[]}),this.updateComparisons(),this.dispatchEvent(new CustomEvent(`recommendation-resolved`,{detail:{watchList:this.watchList,incomingList:this.incomingList},bubbles:!0,composed:!0}))}catch(t){console.error(`No se pudo resolver la recomendación:`,t),this.dispatchEvent(new CustomEvent(`recommendation-error`,{detail:{error:t,comparison:e},bubbles:!0,composed:!0}))}}render(){if(!this.incomingList)return j``;let e=this.getStatusCount(`pending`),t=this.getStatusCount(`accepted`),n=this.getStatusCount(`discarded`),r=this.showProcessed?this.comparisons.filter(e=>e.recommendation.status!==q.PENDING):this.comparisons.filter(e=>e.recommendation.status===q.PENDING),i=t+n>0,a=e===0&&i;return j`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
            <article class="recommendation-list">

                <header class="list-header">

                    <div class="list-info">

                        <h3>
                            ${this.incomingList.name}
                        </h3>

                        <div class="list-count">
                            ${this.incomingList.recommendations.length}
                            recomendaciones
                        </div>

                        <div class="status-counts">

                            ${e>0?j`
                                    <span class="status pending">
                                        ● ${e} pendientes
                                    </span>
                                `:``}

                            ${t>0?j`
                                    <span class="status accepted">
                                        ✓ ${t} aceptadas
                                    </span>
                                `:``}

                            ${n>0?j`
                                    <span class="status discarded">
                                        × ${n} descartadas
                                    </span>
                                `:``}

                        </div>

                    </div>

                    <div class="actions">

                    ${a?j`
                            <button
                                type="button"
                                class="action-button"
                                title="Ver recomendaciones procesadas"
                                @click=${this.toggleExpanded}
                            >
                                <i class="fa fa-chevron-down"></i>
                            </button>
                        `:``}

                    </div>

                </header>

                ${this.expanded&&this.showProcessed?j`
                        <div class="list-content">
                            ${r.map(e=>j`
                                    <recommendation-item-view
                                        .comparison=${e}
                                        @accept-recommendation=${this.handleAccept}
                                        @discard-recommendation=${this.handleDiscard}
                                    ></recommendation-item-view>
                                `)}
                        </div>
                    `:e===0?j`
                            <div class="list-content">
                                <p class="empty-message">
                                    No quedan recomendaciones pendientes.
                                </p>
                            </div>
                        `:j`
                            <div class="list-content">
                                ${r.map(e=>j`
                                        <recommendation-item-view
                                            .comparison=${e}
                                            @accept-recommendation=${this.handleAccept}
                                            @discard-recommendation=${this.handleDiscard}
                                        ></recommendation-item-view>
                                    `)}
                            </div>
                        `}

            </article>
        `}};customElements.define(`recommendation-list-view`,Be);var Ve=class extends B{static styles=o`
        .inbox {
            margin-top: 2rem;
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            margin-bottom: 1rem;
            padding: 1rem 1.2rem;

            background:
                linear-gradient(
                    135deg,
                    rgba(70, 70, 70, 0.95),
                    rgba(35, 35, 35, 0.95)
                );

            border: 1px solid var(--border);
            border-radius: 20px;

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.25);
        }

        .section-header h2 {
            margin: 0;
        }

        /* -------------------------
           Botones
           ------------------------- */

        .action-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-height: 34px;
            padding: 0.45rem 0.8rem;

            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 999px;

            background: rgba(255, 255, 255, 0.1);

            color: #ffffff;

            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease;
        }

        .delete-button {
            justify-self: end;
            align-self: end;
            color: red;
        }

        .action-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }

        .action-button i {
            margin-right: 0.4rem;
        }
            
        /* -------------------------
           Lista de recomendaciones
           ------------------------- */

        .lists {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .list-opened {
            border: 2px solid var(--accent);
            border-radius: 27%;
            background: rgba(255, 107, 44, 0.15);
            color: var(--accent);
            width: fit-content;
            justify-self: center;

        }

        .list {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            width: 100%;
            padding: 1rem;

            border: 1px solid var(--border);
            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);

            color: var(--text);

            text-align: left;
            cursor: pointer;

            transition:
                background 0.2s ease,
                transform 0.2s ease,
                border-color 0.2s ease;
        }

        .list:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }

        .list strong,
        .list span {
            display: block;
            font-size: 1rem;
        }
        
        .list small {
            align-self: end;
        }

        .list span {
            margin-top: 0.25rem;
            opacity: 0.7;

            color: var(--muted);
            font-size: 0.9rem;
        }

        /* -------------------------
           Vacía
           ------------------------- */

        .empty {
            opacity: 0.7;
            margin: 1rem 0 0;
            padding: 1rem;

            border-radius: 14px;

            background: rgba(255, 255, 255, 0.06);

            color: var(--muted);

            text-align: center;
        }

        /* -------------------------
           Móvil
           ------------------------- */

        @media (max-width: 768px) {

            .section-header {
                align-items: flex-start;
                gap: 0.8rem;
                padding: 1rem 0.8rem;
            }

            .section-header h2 {
                font-size: 1.2rem;
            }

            .action-button {
                min-height: 32px;
                padding: 0.4rem 0.7rem;
            }
        }
    `;static properties={lists:{state:!0},watchList:{attribute:!1},dataVersion:{type:Number},selectedList:{state:!0},showImportLink:{type:Boolean},importLink:{type:String}};constructor(){super(),this.fileStorage=new Le,this.linkReader=new Re,this.service=new Q,this.selectedList=void 0,this.showImportLink=!1,this.importLink=``}async connectedCallback(){super.connectedCallback(),await this.importRecommendationFromUrl()}async importRecommendationFromUrl(){let e=await this.linkReader.read(window.location.href);if(!e)return;if(this.lists.some(t=>t.id===e.id)){alert(`Ya se ha agregado al buzón de entrada`);return}let t=this.service.createIncomingRecommendationList(e);this.notifyInboxChanged([...this.lists,t]),this.clearRecommendationUrlParameter()}clearRecommendationUrlParameter(){let e=new URL(window.location.href);e.searchParams.delete(`recommendation`),window.history.replaceState(window.history.state,``,e.pathname+e.search+e.hash)}importRecommendations(){this.showImportLink=!0}cancelImportLink(){this.showImportLink=!1,this.importLink=``}openRecommendationsLink(e){e.preventDefault();let t=this.importLink.trim();if(!t)return;let n;try{n=new URL(t)}catch{return}(n.protocol===`https:`||n.protocol===`http:`)&&(window.location.href=n.href)}selectList(e){this.selectedList=e}closeList(){this.selectedList=void 0}notifyInboxChanged(e){this.dispatchEvent(new CustomEvent(`inbox-changed`,{detail:{inbox:e},bubbles:!0,composed:!0}))}formatDate(e){return new Date(e).toLocaleString(`es-ES`)}canDeleteIncomingList(e){return e.recommendations.length>0&&e.recommendations.every(e=>e.status!==q.PENDING)}deleteIncomingList(e){let t=this.service.deleteIncomingList(this.lists,e.id);t!==null&&(this.lists=t,this.notifyInboxChanged([...this.lists]))}render(){return j`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >

            <section class="inbox">

                <header class="section-header">
                    <i class="fa fa-inbox"></i>
                    <h2>Buzón de entrada</h2>

                    ${this.showImportLink?j`
                            <form class="import-link-form"
                                @submit=${this.openRecommendationsLink}
                            >
                                <input
                                    type="url"
                                    placeholder="Pega aquí el enlace de recomendaciones"
                                    .value=${this.importLink}
                                    @input=${e=>this.importLink=e.target.value}
                                    required
                                >

                                <button type="submit" class="action-button">
                                    <i class="fa fa-link"></i>
                                    Abrir enlace
                                </button>

                                <button
                                    type="button"
                                    class="action-button"
                                    @click=${this.cancelImportLink}
                                >
                                    Cancelar
                                </button>
                            </form>
                        `:j`
                            <button
                                type="button"
                                class="action-button"
                                @click=${this.importRecommendations}
                            >
                                <i class="fa fa-link"></i>
                                Importar enlace
                            </button>
                        `}
                </header>

                ${this.lists.length===0?j`
                        <p class="empty">
                            No tienes recomendaciones recibidas.
                        </p>
                    `:j`
                        ${this.selectedList?j`
                        <div class="lists list-opened">
                            <button
                                class="list"
                                @click=${()=>this.closeList()}
                            >
                                <strong>
                                 <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                                    Cerrar
                                </strong>
                            </button>
                            `:j`
                        <div class="lists" >
                            ${this.lists.map(e=>j`
                                    <button
                                        class="list"
                                        @click=${()=>this.selectList(e)}
                                    >
                                        <strong>
                                        <i class="fa fa-envelope-o" aria-hidden="true"></i></big> ${e.name}</strong>
                                        <small> ${this.formatDate(e.createdAt)} </small>
                                        <span>
                                            ${e.recommendations.length}
                                            recomendaciones
                                        </span>
                                       ${this.canDeleteIncomingList(e)?j`
                                            <button
                                                type="button"
                                                class="action-button delete-button"
                                                title="Borrar lista de recomendaciones"
                                                aria-label="Borrar lista de recomendaciones"
                                                @click=${t=>{t.stopPropagation(),this.deleteIncomingList(e)}}
                                            >
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                                Borrar
                                            </button>
                                        `:``} 
                                    </button>
                            `)}
                        </div>
                        `}
                    `}

                ${this.selectedList?j`
                        <recommendation-list-view
                            .incomingList=${this.selectedList}
                            .watchList=${this.watchList}
                            .dataVersion=${this.dataVersion}
                        ></recommendation-list-view>
                   
                    `:j`
                   
                    `}
                
                
            </section>
        `}};customElements.define(`inbox-view`,Ve);var He=class extends B{static styles=o`
        :host {
            display: block;
            min-height: 100vh;
            box-sizing: border-box;

            --bg: #111111;
            --surface: rgba(38, 38, 38, 0.92);
            --surface-strong: rgba(58, 58, 58, 0.97);
            --accent: #ff6b2c;
            --accent-2: #ff9a3c;
            --text: #f8f2ea;
            --muted: #d7c8bb;
            --border: rgba(255, 255, 255, 0.16);

            color: var(--text);
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;

            background:
                radial-gradient(
                    circle at top left,
                    rgba(255, 107, 44, 0.28),
                    transparent 22%
                ),
                linear-gradient(
                    135deg,
                    #111111 0%,
                    #1e1e1e 100%
                );

            padding: 20px 16px 40px;
        }

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        a {
            color: var(--text);
            text-decoration: none;
            transition:
                color 0.2s ease,
                transform 0.2s ease,
                box-shadow 0.2s ease;
        }

        a:hover {
            color: #ffffff;
        }

        /* Contenido */

        main {
            margin-top: 24px;
        }

        .content {
            background: var(--surface);

            border-radius: 20px;
            border: 1px solid var(--border);

            padding: 1.2rem 1.2rem 1.4rem;

            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .content h2 {
            margin: 0 0 1rem;
            text-align: center;
        }

        /* Móvil */

        @media (max-width: 768px) {
            :host {
                padding: 12px 10px 28px;
            }

            .content {
                padding: 1rem 0.8rem 1.2rem;
            }

        }
    `;static properties={watchList:{state:!0},inbox:{state:!0},dataVersion:{state:!0}};constructor(){super(),this.watchListStorage=new Te(localStorage),this.inboxStorage=new Ee(localStorage),this.watchList=this.watchListStorage.load(),this.inbox=this.inboxStorage.load(),this.dataVersion=0}saveChanges(){this.watchListStorage.save(this.watchList),this.inboxStorage.save(this.inbox)}handleInboxChanged(e){this.inbox=e.detail.inbox,this.saveChanges(),this.dataVersion++}handleRecommendationResolved(e){this.watchList=e.detail.watchList,this.saveChanges(),this.dataVersion++}handleWatchListChanged(e){this.watchList=e.detail.watchList,this.saveChanges(),this.dataVersion++}render(){return j`
            <app-header></app-header>

            <main>
                <section class="content">
                    <watch-list-view
                        .watchList=${this.watchList}
                        .dataVersion=${this.dataVersion}
                        @watch-list-changed=${this.handleWatchListChanged}
                    ></watch-list-view>
                </section>
                <hr/>
                <section class="content">
                    <inbox-view
                        .lists=${this.inbox}
                        .watchList=${this.watchList}
                        .dataVersion=${this.dataVersion}
                        @inbox-changed=${this.handleInboxChanged}
                        @recommendation-resolved=${this.handleRecommendationResolved}
                    ></inbox-view>
                </section>
            </main>

            <app-footer></app-footer>
        `}};customElements.define(`quevemos-app`,He);