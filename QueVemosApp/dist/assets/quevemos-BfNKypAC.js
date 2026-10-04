(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,p=f.trustedTypes,re=p?p.emptyScript:``,ie=f.reactiveElementPolyfillSupport,m=(e,t)=>e,h={toAttribute(e,t){switch(t){case Boolean:e=e?re:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},g=(e,t)=>!l(e,t),_={attribute:!0,type:String,converter:h,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(m(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?h:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?h:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??g)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:`open`},v[m(`elementProperties`)]=new Map,v[m(`finalized`)]=new Map,ie?.({ReactiveElement:v}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var y=globalThis,ae=e=>e,b=y.trustedTypes,x=b?b.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,S=`$lit$`,C=`lit$${Math.random().toFixed(9).slice(2)}$`,w=`?`+C,oe=`<${w}>`,T=document,E=()=>T.createComment(``),D=e=>e===null||typeof e!=`object`&&typeof e!=`function`,O=Array.isArray,se=e=>O(e)||typeof e?.[Symbol.iterator]==`function`,k=`[ 	
\f\r]`,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,M=/>/g,N=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ce=/'/g,P=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),L=Symbol.for(`lit-noChange`),R=Symbol.for(`lit-nothing`),z=new WeakMap,B=T.createTreeWalker(T,129);function V(e,t){if(!O(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return x===void 0?t:x.createHTML(t)}var le=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=A;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===A?c[1]===`!--`?o=j:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=N):(F.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=N):o=M:o===N?c[0]===`>`?(o=i??A,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?N:c[3]===`"`?P:ce):o===P||o===ce?o=N:o===j||o===M?o=A:(o=N,i=void 0);let d=o===N&&e[t+1].startsWith(`/>`)?` `:``;a+=o===A?n+oe:l>=0?(r.push(s),n.slice(0,l)+S+n.slice(l)+C+d):n+C+(l===-2?t:d)}return[V(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},H=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=le(t,n);if(this.el=e.createElement(l,r),B.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=B.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(S)){let t=u[o++],n=i.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?de:r[1]===`?`?fe:r[1]===`@`?pe:G}),i.removeAttribute(e)}else e.startsWith(C)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(F.test(i.tagName)){let e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=b?b.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],E()),B.nextNode(),c.push({type:2,index:++a});i.append(e[t],E())}}}else if(i.nodeType===8){if(i.data===w)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(C,e+1))!==-1;)c.push({type:7,index:a}),e+=C.length-1}}a++}}static createElement(e,t){let n=T.createElement(`template`);return n.innerHTML=e,n}};function U(e,t,n=e,r){if(t===L)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=D(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=U(e,i._$AS(e,t.values),i,r)),t}var ue=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??T).importNode(t,!0);B.currentNode=r;let i=B.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new W(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new me(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=B.nextNode(),a++)}return B.currentNode=T,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},W=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),D(e)?e===R||e==null||e===``?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==L&&this._(e):e._$litType$===void 0?e.nodeType===void 0?se(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==R&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=H.createElement(V(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ue(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=z.get(e.strings);return t===void 0&&z.set(e.strings,t=new H(e)),t}k(t){O(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(E()),this.O(E()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ae(e).nextSibling;ae(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=R}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=U(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==L,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=U(this,r[n+o],t,o),s===L&&(s=this._$AH[o]),a||=!D(s)||s!==this._$AH[o],s===R?e=R:e!==R&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},de=class extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===R?void 0:e}},fe=class extends G{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==R)}},pe=class extends G{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??R)===L)return;let n=this._$AH,r=e===R&&n!==R||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==R&&(n===R||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},me=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}},he=y.litHtmlPolyfillSupport;he?.(H,W),(y.litHtmlVersions??=[]).push(`3.3.3`);var ge=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new W(t.insertBefore(E(),e),e,void 0,n??{})}return i._$AI(e),i},K=globalThis,q=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ge(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};q._$litElement$=!0,q.finalized=!0,K.litElementHydrateSupport?.({LitElement:q});var _e=K.litElementPolyfillSupport;_e?.({LitElement:q}),(K.litElementVersions??=[]).push(`4.2.2`);var ve=Object.freeze({MOVIE:`movie`,SERIES:`series`}),J=class e{constructor({title:t,type:n,id:r=e.generateId(),originalTitle:i=void 0,year:a=void 0,runtimeMinutes:o=void 0,genres:s=[],omdbId:c=void 0,poster:l=void 0,ratings:u=void 0}){this.id=r,this.title=e.validateTitle(e.normalizeTitle(t)),this.originalTitle=i,this.type=e.validateType(n),this.year=a,this.runtimeMinutes=o,this.genres=s,this.omdbId=c,this.poster=l,this.ratings=u}get matchKey(){return e.createMatchKey(this.title,this.type,this.year)}static generateId(){return crypto.randomUUID()}static createMatchKey(e,t,n=void 0){let r=`${e.trim().toLowerCase().replace(/\s+/g,` `)}|${t}`;return n?`${r}|${n}`:r}static normalizeTitle(e){if(typeof e!=`string`)throw Error(`Media title is required`);return e.trim().replace(/\s+/g,` `)}static validateTitle(e){if(!e)throw Error(`Media title cannot be empty`);if(e.length>250)throw Error(`Media title cannot exceed 250 characters`);return e}static validateType(e){if(!Object.values(ve).includes(e))throw Error(`Invalid media type`);return e}},Y=Object.freeze({PENDING:`pending`,WATCHING:`watching`,PAUSED:`paused`,WATCHED:`watched`,DISCARDED:`discarded`}),ye=class{constructor({season:e=void 0,episode:t=void 0,minute:n=void 0}){this.season=e,this.episode=t,this.minute=n}},X=class e{constructor({mediaId:t,platforms:n=[],reason:r=void 0,spanishAudio:i=!1,spanishSubtitles:a=!1,status:o=Y.PENDING,userRating:s=void 0,progress:c=void 0,addedAt:l=new Date().toISOString(),watchedAt:u=void 0}){this.mediaId=e.validateMediaId(t),this.platforms=n,this.reason=r,this.spanishAudio=i,this.spanishSubtitles=a,this.status=e.validateStatus(o),this.userRating=s,this.progress=c,this.addedAt=l,this.watchedAt=u}static validateMediaId(e){if(!e||typeof e!=`string`)throw Error(`mediaId is required`);return e}static validateStatus(e){if(!Object.values(Y).includes(e))throw Error(`Invalid status type`);return e}start(){this.status=Y.WATCHING}setProgress(e){if(!(e instanceof ye))throw Error(`Invalid progress`);this.progress=e}},Z=class e{constructor({version:t=void 0,id:n=void 0,name:r=void 0,watchItems:i=void 0,media:a=void 0}={}){this.version=t,this.id=n,this.name=r,this.watchItems=e.validatesItems(i),this.media=e.validatesMedia(a)}static validatesItems(e){if(e||=[],!Array.isArray(e))throw Error(`watchItems is not an array`);return e.forEach(e=>{if(!(e instanceof X))throw Error(`watchItems must contain only WatchItem`)}),e}static validatesMedia(e){if(e||=[],!Array.isArray(e))throw Error(`media is not an array`);return e.forEach(e=>{if(!(e instanceof J))throw Error(`media must contain only Media`)}),e}addMedia(e){if(this.media.some(t=>t.id===e.id)||this.media.some(t=>t.matchKey===e.matchKey))throw Error(`Media already exists`);this.media.push(e)}removeMedia(e){if(this.watchItems.some(t=>t.mediaId===e))return!1;let t=this.media.findIndex(t=>t.id===e);return t!==-1&&(this.media.splice(t,1),!0)}addWatchItem(e){if(!this.media.some(t=>t.id===e.mediaId))throw Error(`Media not found`);this.watchItems.push(e)}},Q=class{constructor(e){this.watchList=e}addItem({title:e,type:t,year:n,originalTitle:r,genres:i,platforms:a}){let o=null,s=!1;try{o=new J({title:e,type:t,year:n,originalTitle:r,genres:i});let c=new X({mediaId:o.id,platforms:a});return this.watchList.addMedia(o),s=!0,this.watchList.addWatchItem(c),{success:!0}}catch(e){return s&&this.watchList.removeMedia(o.id),{success:!1,error:e.message}}}getItems(){return this.watchList.watchItems.map(e=>({media:this.watchList.media.find(t=>t.id===e.mediaId),watchItem:e}))}},be=class{constructor(e,t=`quevemos-watchlist`){this.storage=e,this.key=t}save(e){let t=JSON.stringify(e);this.storage.setItem(this.key,t)}load(){let e=this.storage.getItem(this.key);if(!e)return new Z;let t=JSON.parse(e),n=t.media.map(e=>new J(e)),r=t.watchItems.map(e=>new X(e));return new Z({version:t.version,id:t.id,name:t.name,media:n,watchItems:r})}},xe=class extends q{static styles=o`
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
    `;render(){return I`
            <header>
                <div class="hero-badge">
                    LAB EXPERIMENTAL
                </div>

                <h1>¿Qué Vemos?</h1>

                <p class="hero-subtitle">
                    Listado de recomendaciones de pelis y series personales
                </p>

                <div class="hero-actions">
                    <a class="a-button" href="/">
                        ← Volver a Joselon79 Lab
                    </a>
                </div>
            </header>
        `}};customElements.define(`app-header`,xe);var Se=class extends q{static styles=o`
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
        
    `;render(){return I`
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
        `}};customElements.define(`app-footer`,Se);var $={version:1,mediaTypes:[{id:`movie`,name:`Película`},{id:`series`,name:`Serie`}],genres:[{id:`action`,name:`Acción`},{id:`adventure`,name:`Aventuras`},{id:`animation`,name:`Animación`},{id:`comedy`,name:`Comedia`},{id:`crime`,name:`Crimen`},{id:`documentary`,name:`Documental`},{id:`drama`,name:`Drama`},{id:`family`,name:`Familiar`},{id:`fantasy`,name:`Fantasía`},{id:`history`,name:`Historia`},{id:`horror`,name:`Terror`},{id:`music`,name:`Musical`},{id:`mystery`,name:`Misterio`},{id:`romance`,name:`Romance`},{id:`science-fiction`,name:`Ciencia ficción`},{id:`sport`,name:`Deporte`},{id:`thriller`,name:`Thriller`},{id:`war`,name:`Bélica`},{id:`western`,name:`Western`}],watchStatuses:[{id:`pending`,name:`Pendiente`},{id:`watching`,name:`Viendo`},{id:`paused`,name:`En pausa`},{id:`watched`,name:`Vista`},{id:`discarded`,name:`Descartada`}],platforms:[{id:`netflix-es`,name:`Netflix España`,country:`ES`,active:!0,logo:`netflix`},{id:`max-es`,name:`Max España`,country:`ES`,active:!0,logo:`max`},{id:`prime-video-es`,name:`Prime Video España`,country:`ES`,active:!0,logo:`prime-video`},{id:`disney-plus-es`,name:`Disney+ España`,country:`ES`,active:!0,logo:`disney-plus`},{id:`movistar-plus-es`,name:`Movistar Plus+ España`,country:`ES`,active:!0,logo:`movistar-plus`},{id:`apple-tv-plus-es`,name:`Apple TV+ España`,country:`ES`,active:!0,logo:`apple-tv-plus`},{id:`filmin-es`,name:`Filmin España`,country:`ES`,active:!0,logo:`filmin`},{id:`skyshowtime-es`,name:`SkyShowtime España`,country:`ES`,active:!0,logo:`skyshowtime`},{id:`atresplayer-es`,name:`Atresplayer España`,country:`ES`,active:!0,logo:`atresplayer`},{id:`rtve-play-es`,name:`RTVE Play España`,country:`ES`,active:!0,logo:`rtve-play`}]},Ce=class e extends q{static styles=o`
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

        .media-card {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
    
                padding: 1rem;
    
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

        .media-info {
            min-width: 0;
        }

        .media-card h3 {
            margin: 0;
            color: #ffffff;
            font-size: 1.15rem;
        }

        .media-type {
            display: inline-block;

            margin-top: 0.35rem;
            padding: 0.25rem 0.6rem;

            border-radius: 999px;

            background: rgba(255, 255, 255, 0.12);
            color: var(--text);

            font-size: 0.78rem;
        }

        .status {
            display: inline-block;
            margin-top: 0.6rem;
            padding: 0.25rem 0.7rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.12);
        }

        .status-pending {
            opacity: 0.8;
        }

        .status-watching {
            background: rgba(255, 154, 60, 0.25);
            border: 1px solid var(--accent-2);
        }

        .status-paused {
            background: rgba(255, 255, 255, 0.18);
        }

        .status-watched {
            background: rgba(100, 200, 120, 0.25);
            border: 1px solid rgba(100, 200, 120, 0.7);
        }

        .status-discarded {
            background: rgba(220, 80, 80, 0.25);
            border: 1px solid rgba(220, 80, 80, 0.7);
        }

        /* Móvil */

        @media (max-width: 768px) {

            .media-card {
                align-items: flex-start;
                flex-direction: column;
            }
        }

    `;static properties={media:{type:Object},watchItem:{type:Object}};static getCatalogName(e,t){return e.find(e=>e.id===t)?.name??t}render(){if(!this.media||!this.watchItem)return I``;let t=e.getCatalogName($.mediaTypes,this.media.type),n=this.media.genres.map(t=>e.getCatalogName($.genres,t)),r=this.watchItem.platforms.map(t=>e.getCatalogName($.platforms,t)),i=e.getCatalogName($.watchStatuses,this.watchItem.status),a=`status-${this.watchItem.status}`;return I`
            <article class="media-card">
                <div class="media-info">
                    <h3>
                        ${this.media.title}
                    </h3>
                    <div class="media-meta">
                        <span class="media-type">${t}</span>
                        ${this.media.year?I`<span>${this.media.year}</span>`:``}
                        ${this.media.runtimeMinutes?I`
                                <span>
                                    ${this.media.runtimeMinutes} min
                                </span>
                            `:``}
                    </div>

                    ${n.length?I`
                            <div class="genres">
                                ${n.map(e=>I`
                                        <span>${e}</span>
                                    `)}
                            </div>
                        `:``}

                    ${r.length?I`
                            <div class="platforms">
                                <i class="fa fa-tv"></i> En: ${r.join(` · `)}
                            </div>
                        `:``}

                    ${i?I`
                            <div class="status ${a}">
                                ${i}
                            </div>
                        `:``}
                </div>
            </article>
        `}};customElements.define(`watch-item-view`,Ce);var we=class extends q{static styles=o`
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

    `;static properties={showDetails:{state:!0}};constructor(){super(),this.showDetails=!1}addItem(e){e.preventDefault();let t=e.target,n=[...t.querySelectorAll(`input[name="genres"]:checked`)].map(e=>e.value),r=[...t.querySelectorAll(`input[name="platforms"]:checked`)].map(e=>e.value);this.dispatchEvent(new CustomEvent(`add-item`,{detail:{title:t.title.value.trim(),type:t.type.value,year:t.year?.value?Number(t.year.value):void 0,originalTitle:t.originalTitle?.value.trim()||void 0,genres:n,platforms:r},bubbles:!0,composed:!0}))}resetForm(){this.renderRoot.querySelector(`form`).reset(),this.showDetails=!1}toggleDetails(){this.showDetails=!this.showDetails}render(){return I`
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

                <div class="field">
                    <label for="type">
                        Tipo
                    </label>

                    <select id="type" name="type">
                        ${$.mediaTypes.map(e=>I`
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

                ${this.showDetails?I`
                        <div class="details">

                            <div class="field">
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
                                    ${$.genres.map(e=>I`
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

                            <div class="field">
                                <label>
                                    Plataformas
                                </label>

                                <div class="checkbox-list">
                                    ${$.platforms.filter(e=>e.active).map(e=>I`
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

                        </div>
                    `:``}

                <button type="submit">
                    Añadir
                </button>

            </form>
        `}};customElements.define(`add-item-form`,we);var Te=class extends q{static styles=o`
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

        /* Lista */

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

        /* Móvil */

        @media (max-width: 768px) {
            :host {
                padding: 12px 10px 28px;
            }

            .content {
                padding: 1rem 0.8rem 1.2rem;
            }


        }
    `;static properties={items:{state:!0}};constructor(){super(),this.items=[];let e=new be(localStorage),t=e.load();this.service=new Q(t),this.storage=e,this.items=this.service.getItems()}render(){let e=this.items;return I`
            <app-header></app-header>
            <main>
                <section class="content">
                    <div class="storage-actions">
                        <button @click=${this.resetWatchList}>
                            Reset
                        </button>
                    </div>
                    <h2>${this.service.watchList.name}</h2>

                    <add-item-form @add-item=${this.addItem}></add-item-form>
                    <br/>
                    ${e.length===0?I`
                            <p class="empty">
                                La lista está vacía.
                            </p>
                        `:I`
                            <div class="media-list">
                                ${e.map(e=>I`
                                    <watch-item-view
                                        .media=${e.media}
                                        .watchItem=${e.watchItem}
                                    ></watch-item-view>
                                `)}
                            </div>
                        `}
                </section>
            </main>
            <app-footer></app-footer>
        `}addItem(e){let{title:t,type:n}=e.detail;if(!t)return;let r=this.service.addItem(e.detail);if(!r.success){console.error(r.error);return}this.storage.save(this.service.watchList),this.items=this.service.getItems(),e.target.resetForm()}resetWatchList(){if(!confirm(`Se perderán todos los datos de la lista. ¿Deseas continuar?`))return;let e=new Z({name:`Mi nueva lista`});this.service=new Q(e),this.storage.save(e),this.items=this.service.getItems()}};customElements.define(`quevemos-app`,Te);