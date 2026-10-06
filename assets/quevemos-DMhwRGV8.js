(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,p=f.trustedTypes,re=p?p.emptyScript:``,ie=f.reactiveElementPolyfillSupport,m=(e,t)=>e,h={toAttribute(e,t){switch(t){case Boolean:e=e?re:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},g=(e,t)=>!l(e,t),ae={attribute:!0,type:String,converter:h,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ae){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ae}static _$Ei(){if(this.hasOwnProperty(m(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?h:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?h:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??g)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:`open`},_[m(`elementProperties`)]=new Map,_[m(`finalized`)]=new Map,ie?.({ReactiveElement:_}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var v=globalThis,y=e=>e,b=v.trustedTypes,oe=b?b.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,se=`$lit$`,x=`lit$${Math.random().toFixed(9).slice(2)}$`,S=`?`+x,ce=`<${S}>`,C=document,w=()=>C.createComment(``),T=e=>e===null||typeof e!=`object`&&typeof e!=`function`,E=Array.isArray,le=e=>E(e)||typeof e?.[Symbol.iterator]==`function`,D=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,A=/>/g,j=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),M=/'/g,N=/"/g,P=/^(?:script|style|textarea|title)$/i,F=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),I=Symbol.for(`lit-noChange`),L=Symbol.for(`lit-nothing`),ue=new WeakMap,R=C.createTreeWalker(C,129);function z(e,t){if(!E(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return oe===void 0?t:oe.createHTML(t)}var de=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=O;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===O?c[1]===`!--`?o=k:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=j):(P.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=j):o=A:o===j?c[0]===`>`?(o=i??O,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?j:c[3]===`"`?N:M):o===N||o===M?o=j:o===k||o===A?o=O:(o=j,i=void 0);let d=o===j&&e[t+1].startsWith(`/>`)?` `:``;a+=o===O?n+ce:l>=0?(r.push(s),n.slice(0,l)+se+n.slice(l)+x+d):n+x+(l===-2?t:d)}return[z(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},B=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=de(t,n);if(this.el=e.createElement(l,r),R.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=R.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(se)){let t=u[o++],n=i.getAttribute(e).split(x),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?pe:r[1]===`?`?me:r[1]===`@`?he:U}),i.removeAttribute(e)}else e.startsWith(x)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(P.test(i.tagName)){let e=i.textContent.split(x),t=e.length-1;if(t>0){i.textContent=b?b.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],w()),R.nextNode(),c.push({type:2,index:++a});i.append(e[t],w())}}}else if(i.nodeType===8){if(i.data===S)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(x,e+1))!==-1;)c.push({type:7,index:a}),e+=x.length-1}}a++}}static createElement(e,t){let n=C.createElement(`template`);return n.innerHTML=e,n}};function V(e,t,n=e,r){if(t===I)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=T(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=V(e,i._$AS(e,t.values),i,r)),t}var fe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??C).importNode(t,!0);R.currentNode=r;let i=R.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new H(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ge(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=R.nextNode(),a++)}return R.currentNode=C,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},H=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=V(this,e,t),T(e)?e===L||e==null||e===``?(this._$AH!==L&&this._$AR(),this._$AH=L):e!==this._$AH&&e!==I&&this._(e):e._$litType$===void 0?e.nodeType===void 0?le(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==L&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=B.createElement(z(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new fe(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ue.get(e.strings);return t===void 0&&ue.set(e.strings,t=new B(e)),t}k(t){E(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(w()),this.O(w()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=y(e).nextSibling;y(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=L,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=L}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=V(this,e,t,0),a=!T(e)||e!==this._$AH&&e!==I,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=V(this,r[n+o],t,o),s===I&&(s=this._$AH[o]),a||=!T(s)||s!==this._$AH[o],s===L?e=L:e!==L&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},pe=class extends U{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===L?void 0:e}},me=class extends U{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==L)}},he=class extends U{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=V(this,e,t,0)??L)===I)return;let n=this._$AH,r=e===L&&n!==L||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==L&&(n===L||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ge=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}},_e=v.litHtmlPolyfillSupport;_e?.(B,H),(v.litHtmlVersions??=[]).push(`3.3.3`);var ve=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new H(t.insertBefore(w(),e),e,void 0,n??{})}return i._$AI(e),i},W=globalThis,G=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ve(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};G._$litElement$=!0,G.finalized=!0,W.litElementHydrateSupport?.({LitElement:G});var ye=W.litElementPolyfillSupport;ye?.({LitElement:G}),(W.litElementVersions??=[]).push(`4.2.2`);var be=class extends G{static styles=o`
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
    `;render(){return F`
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
        `}};customElements.define(`app-header`,be);var xe=class extends G{static styles=o`
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
        
    `;render(){return F`
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
        `}};customElements.define(`app-footer`,xe);var K=Object.freeze({MOVIE:`movie`,SERIES:`series`}),q=class e{constructor({title:t,type:n,id:r=e.generateId(),originalTitle:i=void 0,year:a=void 0,runtimeMinutes:o=void 0,genres:s=[],omdbId:c=void 0,poster:l=void 0,ratings:u=void 0}){this.id=r,this.title=e.validateTitle(e.normalizeTitle(t)),this.originalTitle=i,this.type=e.validateType(n),this.year=a,this.runtimeMinutes=o,this.genres=s,this.omdbId=c,this.poster=l,this.ratings=u}get matchKey(){return e.createMatchKey(this.title,this.type,this.year)}static generateId(){return crypto.randomUUID()}static createMatchKey(e,t,n=void 0){let r=`${e.trim().toLowerCase().replace(/\s+/g,` `)}|${t}`;return n?`${r}|${n}`:r}static normalizeTitle(e){if(typeof e!=`string`)throw Error(`Media title is required`);return e.trim().replace(/\s+/g,` `)}static validateTitle(e){if(!e)throw Error(`Media title cannot be empty`);if(e.length>250)throw Error(`Media title cannot exceed 250 characters`);return e}static validateType(e){if(!Object.values(K).includes(e))throw Error(`Invalid media type`);return e}},J=Object.freeze({PENDING:`pending`,WATCHING:`watching`,PAUSED:`paused`,WATCHED:`watched`,DISCARDED:`discarded`}),Y=class{constructor({season:e=void 0,episode:t=void 0,minute:n=void 0}){this.season=e,this.episode=t,this.minute=n}},X=class e{constructor({mediaId:t,platforms:n=[],reason:r=void 0,spanishAudio:i=!1,spanishSubtitles:a=!1,status:o=J.PENDING,userRating:s=void 0,progress:c=void 0,addedAt:l=new Date().toISOString(),watchedAt:u=void 0}){this.mediaId=e.validateMediaId(t),this.platforms=n,this.reason=r,this.spanishAudio=i,this.spanishSubtitles=a,this.status=e.validateStatus(o),this.userRating=s,this.progress=c,this.addedAt=l,this.watchedAt=u}static validateMediaId(e){if(!e||typeof e!=`string`)throw Error(`mediaId is required`);return e}static validateStatus(e){if(!Object.values(J).includes(e))throw Error(`Invalid status type`);return e}start(){this.status=J.WATCHING}pause(){this.status=J.PAUSED}resume(){this.status=J.WATCHING}markAsWatched(){this.status=J.WATCHED}setProgress(e){if(!(e instanceof Y))throw Error(`Invalid progress`);this.progress=e}},Z=class e{constructor({version:t=1,id:n=e.generateId(),name:r=`Mi primera lista`,watchItems:i=void 0,media:a=void 0}={}){this.version=t,this.id=n,this.name=r,this.watchItems=e.validatesItems(i),this.media=e.validatesMedia(a)}static generateId(){return crypto.randomUUID()}static validatesItems(e){if(e||=[],!Array.isArray(e))throw Error(`watchItems is not an array`);return e.forEach(e=>{if(!(e instanceof X))throw Error(`watchItems must contain only WatchItem`)}),e}static validatesMedia(e){if(e||=[],!Array.isArray(e))throw Error(`media is not an array`);return e.forEach(e=>{if(!(e instanceof q))throw Error(`media must contain only Media`)}),e}addMedia(e){if(this.media.some(t=>t.id===e.id)||this.media.some(t=>t.matchKey===e.matchKey))throw Error(`Media already exists`);this.media.push(e)}removeMedia(e){if(this.watchItems.some(t=>t.mediaId===e))return!1;let t=this.media.findIndex(t=>t.id===e);return t!==-1&&(this.media.splice(t,1),!0)}addWatchItem(e){if(!this.media.some(t=>t.id===e.mediaId))throw Error(`Media not found`);this.watchItems.push(e)}},Q=class{constructor(e){this.watchList=e}addItem({title:e,type:t,year:n,originalTitle:r,genres:i,platforms:a}){let o=null,s=!1;try{o=new q({title:e,type:t,year:n,originalTitle:r,genres:i});let c=new X({mediaId:o.id,platforms:a});return this.watchList.addMedia(o),s=!0,this.watchList.addWatchItem(c),{success:!0}}catch(e){return s&&this.watchList.removeMedia(o.id),{success:!1,error:e.message}}}updateItem({mediaId:e,media:t,watchItem:n}){let r=this.watchList.media.find(t=>t.id===e),i=this.watchList.watchItems.find(t=>t.mediaId===e);if(!r||!i)return{success:!1,error:`Item not found`};try{let a=new q({id:e,title:t.title,type:t.type,year:t.year,originalTitle:t.originalTitle,genres:t.genres,runtimeMinutes:r.runtimeMinutes,omdbId:r.omdbId,poster:r.poster,ratings:r.ratings});if(this.watchList.media.some(t=>t.id!==e&&t.matchKey===a.matchKey))throw Error(`Media already exists`);return r.title=a.title,r.type=a.type,r.year=a.year,r.originalTitle=a.originalTitle,r.genres=a.genres,i.platforms=n.platforms,i.reason=n.reason,i.spanishAudio=n.spanishAudio,i.spanishSubtitles=n.spanishSubtitles,i.userRating=n.userRating,i.progress=n.progress,{success:!0}}catch(e){return{success:!1,error:e.message}}}changeStatus(e,t){let n=this.watchList.watchItems.find(t=>t.mediaId===e);if(!n)return{success:!1,error:`WatchItem not found`};try{switch(t){case J.WATCHING:if(n.status===J.PENDING)n.start();else if(n.status===J.PAUSED)n.resume();else throw Error(`Invalid status transition`);break;case J.PAUSED:if(n.status!==J.WATCHING)throw Error(`Invalid status transition`);n.pause();break;case J.WATCHED:if(n.status!==J.WATCHING)throw Error(`Invalid status transition`);n.markAsWatched();break;default:throw Error(`Invalid status transition`)}let e=new X({mediaId:n.mediaId,platforms:n.platforms,reason:n.reason,spanishAudio:n.spanishAudio,spanishSubtitles:n.spanishSubtitles,status:n.status,userRating:n.userRating,progress:n.progress,addedAt:n.addedAt,watchedAt:n.watchedAt}),r=this.watchList.watchItems.indexOf(n);return this.watchList.watchItems[r]=e,{success:!0}}catch(e){return{success:!1,error:e.message}}}renameWatchList(e){return!e||!e.trim()?{success:!1,error:`El nombre no puede estar vacío`}:(this.watchList.name=e.trim(),{success:!0})}getItems(){return this.watchList.watchItems.map(e=>({media:this.watchList.media.find(t=>t.id===e.mediaId),watchItem:e}))}},Se=class{constructor(e,t=`quevemos-watchlist`){this.storage=e,this.key=t}save(e){let t=JSON.stringify(e);this.storage.setItem(this.key,t)}load(){let e=this.storage.getItem(this.key);if(!e)return new Z;let t=JSON.parse(e),n=t.media.map(e=>new q(e)),r=t.watchItems.map(e=>new X(e));return new Z({version:t.version,id:t.id,name:t.name,media:n,watchItems:r})}},Ce=class{export(e){return JSON.stringify(e,null,2)}import(e){let t=this.parse(e);this.validate(t);let n=t.media.map(e=>new q(e)),r=t.watchItems.map(e=>new X(e));return new Z({version:t.version,id:t.id,name:t.name,media:n,watchItems:r})}parse(e){try{return JSON.parse(e)}catch{throw Error(`Invalid JSON`)}}validate(e){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Invalid WatchList file`);if(e.version!==1)throw Error(`Unsupported WatchList version`);if(!Array.isArray(e.media))throw Error(`WatchList media is not an array`);if(!Array.isArray(e.watchItems))throw Error(`WatchList watchItems is not an array`)}},$={version:1,mediaTypes:[{id:`movie`,name:`Película`},{id:`series`,name:`Serie`}],genres:[{id:`action`,name:`Acción`},{id:`adventure`,name:`Aventuras`},{id:`animation`,name:`Animación`},{id:`comedy`,name:`Comedia`},{id:`crime`,name:`Crimen`},{id:`documentary`,name:`Documental`},{id:`drama`,name:`Drama`},{id:`family`,name:`Familiar`},{id:`fantasy`,name:`Fantasía`},{id:`history`,name:`Historia`},{id:`horror`,name:`Terror`},{id:`music`,name:`Musical`},{id:`mystery`,name:`Misterio`},{id:`romance`,name:`Romance`},{id:`science-fiction`,name:`Ciencia ficción`},{id:`sport`,name:`Deporte`},{id:`thriller`,name:`Thriller`},{id:`war`,name:`Bélica`},{id:`western`,name:`Western`}],watchStatuses:[{id:`pending`,name:`Pendiente`},{id:`watching`,name:`Viendo`},{id:`paused`,name:`En pausa`},{id:`watched`,name:`Vista`},{id:`discarded`,name:`Descartada`}],platforms:[{id:`netflix-es`,name:`Netflix`,country:`ES`,active:!0,logo:`netflix`},{id:`max-es`,name:`HBO Max`,country:`ES`,active:!0,logo:`max`},{id:`prime-video-es`,name:`Prime`,country:`ES`,active:!0,logo:`prime-video`},{id:`disney-plus-es`,name:`Disney+`,country:`ES`,active:!0,logo:`disney-plus`},{id:`movistar-plus-es`,name:`Movistar Plus+`,country:`ES`,active:!0,logo:`movistar-plus`},{id:`apple-tv-plus-es`,name:`Apple TV+`,country:`ES`,active:!0,logo:`apple-tv-plus`},{id:`filmin-es`,name:`Filmin`,country:`ES`,active:!0,logo:`filmin`},{id:`skyshowtime-es`,name:`SkyShowtime`,country:`ES`,active:!0,logo:`skyshowtime`},{id:`atresplayer-es`,name:`Atresplayer`,country:`ES`,active:!0,logo:`atresplayer`},{id:`rtve-play-es`,name:`RTVE Play`,country:`ES`,active:!0,logo:`rtve-play`},{id:`youtube-es`,name:`YouTube`,country:`ES`,active:!0,logo:`youtube`}]},we=class e extends G{static styles=o`
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
            margin: 0;

            color: #ffffff;

            font-size: 1.15rem;
        }

        .information-actions {
            display: flex;
            gap: 0.4rem;

            flex-shrink: 0;
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
    `;static properties={media:{type:Object},watchItem:{type:Object},overlayOpened:{type:Boolean}};static getCatalogName(e,t){return e.find(e=>e.id===t)?.name??t}constructor(){super(),this.overlayOpened=!1}editItem(){this.dispatchEvent(new CustomEvent(`edit-item`,{detail:{media:this.media,watchItem:this.watchItem},bubbles:!0,composed:!0}))}changeStatus(e){this.dispatchEvent(new CustomEvent(`change-status`,{detail:{mediaId:this.media.id,status:e},bubbles:!0,composed:!0}))}render(){if(!this.media||!this.watchItem)return F``;let t=e.getCatalogName($.watchStatuses,this.watchItem.status),n=`status-${this.watchItem.status}`;return F`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >
           
            <article class="media-card">

                <div class="poster">
                    ${this.media.poster?F`
                            <img
                                src=${this.media.poster}
                                alt="Cartel de ${this.media.title}"
                            >
                        `:F`
                            <div class="poster-placeholder">
                                <i class="fa fa-film"></i>
                            </div>
                        `}
                </div>

                <div class="media-content">
                    
                    <div class="information">
                        ${this.renderInformation()}
                    </div>

                    <div class="media-actions">
                    ${t?F`
                            <div class="status ${n}">
                                ${t}
                            </div>
                        `:``}
                        <div class="status-actions">
                            ${this.renderStatusActions()}
                            <!-- ToDo -->
                            <button
                                class="action-button"
                                title="Recomendar"
                                disabled
                            >
                                <i class="fa fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
            </article>
        `}renderInformation(){let t=e.getCatalogName($.mediaTypes,this.media.type),n=this.media.genres.map(t=>e.getCatalogName($.genres,t)),r=this.watchItem.platforms.map(t=>e.getCatalogName($.platforms,t));return F`
                    <div class="information-header">
                        <h3>
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
                            
                        ${this.watchItem.reason?F`
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

                        ${this.watchItem.userRating===void 0?``:F`
                                <div class="overlay-section">
                                    <strong>Mi valoración</strong>
                                    <span>${this.watchItem.userRating} / 10</span>
                                </div>
                            `}

                        ${this.media.ratings?F`
                                <div class="overlay-section">
                                    <strong>Valoraciones</strong>
                                    <span>
                                        ${this.media.ratings.imdb?`IMDb: ${this.media.ratings.imdb}`:``}
                                        ${this.media.ratings.metascore?` · Metascore: ${this.media.ratings.metascore}`:``}
                                    </span>
                                </div>
                            `:``}

                        ${this.watchItem.addedAt?F`
                                <div class="overlay-section">
                                    <strong>Añadida</strong>
                                    <span>${this.formatDate(this.watchItem.addedAt)}</span>
                                </div>
                            `:``}

                        ${this.watchItem.watchedAt?F`
                                <div class="overlay-section">
                                    <strong>Vista</strong>
                                    <span>${this.formatDate(this.watchItem.watchedAt)}</span>
                                </div>
                            `:``}

                        ${this.watchItem.progress?F`
                                <div class="overlay-section">
                                    <strong>Progreso</strong>
                                    <span>${this.renderProgress()}</span>
                                </div>
                            `:``}
                        
                    </div>

                    <div class="metadata">



                        <span class="media-type">${t}</span>
                        ${this.media.year?F`<span>${this.media.year}</span>`:``}
                        ${this.media.runtimeMinutes?F`
                                <span>
                                    ${this.media.runtimeMinutes} min
                                </span>
                            `:``}
                    </div>
                    

                    ${n.length?F`
                            <div class="genres">
                                ${n.map(e=>F`
                                        <span class="genre">${e}</span>
                                    `)}
                            </div>
                        `:``}

                    ${r.length?F`
                            <div class="platforms">
                                <i class="fa fa-tv"></i> ${r.join(` · `)}
                            </div>
                        `:``}
                </div>
        `}showInformation(){this.overlayOpened=!this.overlayOpened,this.classList.toggle(`overlay-open`,this.overlayOpened)}formatDate(e){return new Date(e).toLocaleDateString(`es-ES`)}renderProgress(){let e=this.watchItem.progress;return e?e.minute===void 0?e.season!==void 0&&e.episode!==void 0?`Temporada ${e.season}, episodio ${e.episode}`:``:`${e.minute} min`:``}renderStatusActions(){switch(this.watchItem.status){case J.PENDING:return F`
                    <button
                        type="button"
                        class="action-button"
                        title="Empezar"
                        @click=${()=>this.changeStatus(J.WATCHING)}
                    >
                        <i class="fa fa-play"></i>
                    </button>
                `;case J.WATCHING:return F`
                    <button
                        type="button"
                        class="action-button"
                        title="Pausar"
                        @click=${()=>this.changeStatus(J.PAUSED)}
                    >
                        <i class="fa fa-pause"></i>
                    </button>

                    <button
                        type="button"
                        class="action-button"
                        title="Marcar como vista"
                        @click=${()=>this.changeStatus(J.WATCHED)}
                    >
                        <i class="fa fa-check"></i>
                    </button>
                `;case J.PAUSED:return F`
                    <button
                        type="button"
                        class="action-button"
                        title="Continuar"
                        @click=${()=>this.changeStatus(J.WATCHING)}
                    >
                        <i class="fa fa-play"></i>
                    </button>
                `;default:return``}}};customElements.define(`watch-item-view`,we);var Te=class extends G{static styles=o`
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

    `;static properties={showDetails:{state:!0}};constructor(){super(),this.showDetails=!1}addItem(e){e.preventDefault();let t=e.target,n=[...t.querySelectorAll(`input[name="genres"]:checked`)].map(e=>e.value),r=[...t.querySelectorAll(`input[name="platforms"]:checked`)].map(e=>e.value);this.dispatchEvent(new CustomEvent(`add-item`,{detail:{title:t.title.value.trim(),type:t.type.value,year:t.year?.value?Number(t.year.value):void 0,originalTitle:t.originalTitle?.value.trim()||void 0,genres:n,platforms:r},bubbles:!0,composed:!0}))}resetForm(){this.renderRoot.querySelector(`form`).reset(),this.showDetails=!1}toggleDetails(){this.showDetails=!this.showDetails}render(){return F`
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
                        ${$.mediaTypes.map(e=>F`
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

                ${this.showDetails?F`
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
                                    ${$.platforms.filter(e=>e.active).map(e=>F`
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
                                    ${$.genres.map(e=>F`
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
        `}};customElements.define(`add-item-form`,Te);var Ee=class extends G{static styles=o`
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
    `;static properties={media:{attribute:!1},watchItem:{attribute:!1}};constructor(){super(),this.media=void 0,this.watchItem=void 0}save(e){e.preventDefault();let t=e.target,n=[...t.querySelectorAll(`input[name="genres"]:checked`)].map(e=>e.value),r=[...t.querySelectorAll(`input[name="platforms"]:checked`)].map(e=>e.value),i=this.createProgress(t);this.dispatchEvent(new CustomEvent(`save-item`,{detail:{mediaId:this.media.id,media:{title:t.title.value.trim(),type:t.type.value,year:t.year.value?Number(t.year.value):void 0,originalTitle:t.originalTitle.value.trim()||void 0,genres:n},watchItem:{platforms:r,reason:t.reason.value.trim()||void 0,spanishAudio:t.spanishAudio.checked,spanishSubtitles:t.spanishSubtitles.checked,userRating:t.userRating.value?Number(t.userRating.value):void 0,progress:i}},bubbles:!0,composed:!0}))}createProgress(e){if(this.media.type===K.MOVIE){let t=e.minute.value;return t?new Y({minute:Number(t)}):void 0}let t=e.season.value,n=e.episode.value,r=e.minute.value;if(t||n)return new Y({season:t?Number(t):void 0,episode:n?Number(n):void 0,minute:r?Number(r):void 0})}getProgressValue(e){return this.watchItem?.progress?.[e]??``}isGenreSelected(e){return this.media?.genres?.includes(e)}isPlatformSelected(e){return this.watchItem?.platforms?.includes(e)}renderProgress(){return this.media?.type===K.MOVIE?F`
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
            `:F`
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
        `}render(){return!this.media||!this.watchItem?``:F`
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
                        ${$.mediaTypes.map(e=>F`
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
                        placeholder="(aaaa)"
                        value=${this.media.year??``}
                    >
                </div>

                <div class="field">
                    <label>
                        Plataformas
                    </label>

                    <div class="checkbox-list">
                        ${$.platforms.filter(e=>e.active).map(e=>F`
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
                        Puntuación personal
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
                    <label for="originalTitle">
                        Título original
                    </label>

                    <input
                        id="originalTitle"
                        name="originalTitle"
                        type="text"
                        value=${this.media.originalTitle??``}
                    >
                </div>

                <div class="field">
                    <label>
                        Géneros
                    </label>

                    <div class="checkbox-list">
                        ${$.genres.map(e=>F`
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
                </div>

                <div class="actions">
                    <button type="submit">
                        Guardar
                    </button>

                    <button
                        type="button"
                        @click=${()=>this.dispatchEvent(new CustomEvent(`cancel-edit`,{bubbles:!0,composed:!0}))}
                    >
                        Cancelar
                    </button>
                </div>

            </form>
        `}};customElements.define(`edit-item-form`,Ee);var De=class extends G{static styles=o`
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
    `;static properties={items:{state:!0},editingItem:{state:!0},listName:{state:!0}};constructor(){super(),this.items=[];let e=new Se(localStorage),t=e.load(),n=new Ce;this.service=new Q(t),this.listName=this.service.watchList.name,this.items=this.service.getItems(),this.storage=e,this.fileStorage=n,this.editingItem=void 0}render(){let e=this.items;return F`
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
            

            ${this.editingItem?``:F`
                    <add-item-form
                        @add-item=${this.addItem}
                    ></add-item-form>
                `}

            <br/>

            ${e.length===0?F`
                    <p class="empty">
                        La lista está vacía.
                    </p>
                    
                `:F` 
                    <div class="media-list">
                        <div class="list-header">
                            <div class="hero-badge"> Mostrando todos los elementos </div>
                            <div class="list-actions">
                                <button
                                    class="action-button"
                                    title="Ordenar"
                                    disabled
                                >
                                    <i class="fa fa-sort-alpha-desc"></i>
                                </button>
                                <button
                                    class="action-button"
                                    title="Filtrar"
                                    disabled
                                >
                                    <i class="fa fa-filter"></i>
                                </button>
                            </div>
                        </div>
                        ${e.map(e=>F`
                                <div class="item-container">

                                    ${this.editingItem?.media.id===e.media.id?F`
                                            <div class="edit-transition">
                                                <edit-item-form
                                                    .media=${e.media}
                                                    .watchItem=${e.watchItem}
                                                    @save-item=${this.saveItem}
                                                    @cancel-edit=${this.cancelEdit}
                                                ></edit-item-form>
                                            </div>
                                        `:F`
                                            <div class="edit-transition">
                                                <watch-item-view
                                                    .media=${e.media}
                                                    .watchItem=${e.watchItem}
                                                    @edit-item=${this.editItem}
                                                    @change-status=${this.changeStatus}
                                                ></watch-item-view>
                                            </div>
                                        `}

                                </div>
                            `)}

                    </div>
                `}
        `}addItem(e){let{title:t,type:n}=e.detail;if(!t)return;let r=this.service.addItem(e.detail);if(!r.success){console.error(r.error);return}this.storage.save(this.service.watchList),this.items=this.service.getItems(),e.target.resetForm()}editItem(e){this.editingItem=e.detail}cancelEdit(){this.editingItem=void 0}saveItem(e){let t=this.service.updateItem(e.detail);if(!t.success){console.error(t.error);return}this.storage.save(this.service.watchList),this.items=this.service.getItems(),this.editingItem=void 0}changeStatus(e){let t=this.service.changeStatus(e.detail.mediaId,e.detail.status);if(!t.success){console.error(t.error);return}this.storage.save(this.service.watchList),this.items=[...this.service.getItems()]}editListName(){let e=prompt(`Ingrese el nuevo nombre para la lista:`,this.service.watchList.name);if(!e)return;let t=this.service.renameWatchList(e);if(!t.success){console.error(t.error);return}this.storage.save(this.service.watchList),this.listName=this.service.watchList.name}exportWatchList(){let e=this.fileStorage.export(this.service.watchList),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`quevemos-watchlist.json`,r.click(),URL.revokeObjectURL(n)}importWatchList(){if(!confirm(`La lista actual será sustituida por la lista importada. ¿Deseas continuar?`))return;let e=document.createElement(`input`);e.type=`file`,e.accept=`application/json,.json`,e.addEventListener(`change`,async()=>{let t=e.files[0];if(t)try{let e=await t.text(),n=this.fileStorage.import(e);this.service=new Q(n),this.storage.save(n),this.listName=this.service.watchList.name,this.items=this.service.getItems(),this.editingItem=void 0}catch(e){console.error(e),alert(`No se pudo importar la lista:\n${e.message}`)}}),e.click()}resetWatchList(){if(!confirm(`Se perderán todos los datos de la lista. ¿Deseas continuar?`))return;let e=new Z({name:`Mi nueva lista`});this.service=new Q(e),this.storage.save(e),this.listName=this.service.watchList.name,this.items=this.service.getItems()}};customElements.define(`watch-list-view`,De);var Oe=class extends G{static styles=o`
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
    `;render(){return F`
            <app-header></app-header>

            <main>
                <section class="content">

                    <watch-list-view></watch-list-view>

                </section>
            </main>

            <app-footer></app-footer>
        `}};customElements.define(`quevemos-app`,Oe);