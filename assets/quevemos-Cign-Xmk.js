(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,re=f.trustedTypes,ie=re?re.emptyScript:``,ae=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?ie:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},oe=(e,t)=>!l(e,t),se={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var h=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??se}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??oe)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};h.elementStyles=[],h.shadowRootOptions={mode:`open`},h[p(`elementProperties`)]=new Map,h[p(`finalized`)]=new Map,ae?.({ReactiveElement:h}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var g=globalThis,ce=e=>e,_=g.trustedTypes,le=_?_.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ue=`$lit$`,v=`lit$${Math.random().toFixed(9).slice(2)}$`,de=`?`+v,fe=`<${de}>`,y=document,b=()=>y.createComment(``),x=e=>e===null||typeof e!=`object`&&typeof e!=`function`,S=Array.isArray,pe=e=>S(e)||typeof e?.[Symbol.iterator]==`function`,C=`[ 	
\f\r]`,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,E=/>/g,D=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),O=/'/g,k=/"/g,A=/^(?:script|style|textarea|title)$/i,j=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),M=Symbol.for(`lit-noChange`),N=Symbol.for(`lit-nothing`),me=new WeakMap,P=y.createTreeWalker(y,129);function he(e,t){if(!S(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return le===void 0?t:le.createHTML(t)}var ge=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=w;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===w?c[1]===`!--`?o=T:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=D):(A.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=D):o=E:o===D?c[0]===`>`?(o=i??w,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?D:c[3]===`"`?k:O):o===k||o===O?o=D:o===T||o===E?o=w:(o=D,i=void 0);let d=o===D&&e[t+1].startsWith(`/>`)?` `:``;a+=o===w?n+fe:l>=0?(r.push(s),n.slice(0,l)+ue+n.slice(l)+v+d):n+v+(l===-2?t:d)}return[he(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},F=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ge(t,n);if(this.el=e.createElement(l,r),P.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=P.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ue)){let t=u[o++],n=i.getAttribute(e).split(v),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ve:r[1]===`?`?ye:r[1]===`@`?be:R}),i.removeAttribute(e)}else e.startsWith(v)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(A.test(i.tagName)){let e=i.textContent.split(v),t=e.length-1;if(t>0){i.textContent=_?_.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],b()),P.nextNode(),c.push({type:2,index:++a});i.append(e[t],b())}}}else if(i.nodeType===8){if(i.data===de)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(v,e+1))!==-1;)c.push({type:7,index:a}),e+=v.length-1}}a++}}static createElement(e,t){let n=y.createElement(`template`);return n.innerHTML=e,n}};function I(e,t,n=e,r){if(t===M)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=x(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=I(e,i._$AS(e,t.values),i,r)),t}var _e=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??y).importNode(t,!0);P.currentNode=r;let i=P.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new L(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new xe(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=P.nextNode(),a++)}return P.currentNode=y,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},L=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),x(e)?e===N||e==null||e===``?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==M&&this._(e):e._$litType$===void 0?e.nodeType===void 0?pe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==N&&x(this._$AH)?this._$AA.nextSibling.data=e:this.T(y.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=F.createElement(he(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new _e(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=me.get(e.strings);return t===void 0&&me.set(e.strings,t=new F(e)),t}k(t){S(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(b()),this.O(b()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ce(e).nextSibling;ce(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=N}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=I(this,e,t,0),a=!x(e)||e!==this._$AH&&e!==M,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=I(this,r[n+o],t,o),s===M&&(s=this._$AH[o]),a||=!x(s)||s!==this._$AH[o],s===N?e=N:e!==N&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ve=class extends R{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}},ye=class extends R{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==N)}},be=class extends R{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=I(this,e,t,0)??N)===M)return;let n=this._$AH,r=e===N&&n!==N||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==N&&(n===N||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},xe=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}},Se=g.litHtmlPolyfillSupport;Se?.(F,L),(g.litHtmlVersions??=[]).push(`3.3.3`);var Ce=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new L(t.insertBefore(b(),e),e,void 0,n??{})}return i._$AI(e),i},z=globalThis,B=class extends h{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ce(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};B._$litElement$=!0,B.finalized=!0,z.litElementHydrateSupport?.({LitElement:B});var we=z.litElementPolyfillSupport;we?.({LitElement:B}),(z.litElementVersions??=[]).push(`4.2.2`);var Te=class extends B{static styles=o`
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
        `}};customElements.define(`app-header`,Te);var Ee=class extends B{static styles=o`
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
        `}};customElements.define(`app-footer`,Ee);var V=Object.freeze({MOVIE:`movie`,SERIES:`series`}),H=class e{constructor({title:t,type:n,id:r=e.generateId(),originalTitle:i=void 0,year:a=void 0,runtimeMinutes:o=void 0,genres:s=[],omdbId:c=void 0,poster:l=void 0,ratings:u=void 0}){this.id=r,this.title=e.validateTitle(e.normalizeTitle(t)),this.originalTitle=i,this.type=e.validateType(n),this.year=a,this.runtimeMinutes=o,this.genres=s,this.omdbId=c,this.poster=l,this.ratings=u}get matchKey(){return e.createMatchKey(this.title,this.type,this.year)}static generateId(){return crypto.randomUUID()}static createMatchKey(e,t,n=void 0){let r=`${e.trim().toLowerCase().replace(/\s+/g,` `)}|${t}`;return n?`${r}|${n}`:r}static normalizeTitle(e){if(typeof e!=`string`)throw Error(`Media title is required`);return e.trim().replace(/\s+/g,` `)}static validateTitle(e){if(!e)throw Error(`Media title cannot be empty`);if(e.length>250)throw Error(`Media title cannot exceed 250 characters`);return e}static validateType(e){if(!Object.values(V).includes(e))throw Error(`Invalid media type`);return e}},U=Object.freeze({PENDING:`pending`,WATCHING:`watching`,PAUSED:`paused`,WATCHED:`watched`,DISCARDED:`discarded`}),W=class{constructor({season:e=void 0,episode:t=void 0,minute:n=void 0}){this.season=e,this.episode=t,this.minute=n}},G=class e{constructor({mediaId:t,platforms:n=[],reason:r=void 0,spanishAudio:i=!1,spanishSubtitles:a=!1,status:o=U.PENDING,userRating:s=void 0,progress:c=void 0,addedAt:l=new Date().toISOString(),watchedAt:u=void 0}){this.mediaId=e.validateMediaId(t),this.platforms=n,this.reason=r,this.spanishAudio=i,this.spanishSubtitles=a,this.status=e.validateStatus(o),this.userRating=s,this.progress=c,this.addedAt=l,this.watchedAt=u}static validateMediaId(e){if(!e||typeof e!=`string`)throw Error(`mediaId is required`);return e}static validateStatus(e){if(!Object.values(U).includes(e))throw Error(`Invalid status type`);return e}start(){this.status=U.WATCHING}pause(){this.status=U.PAUSED}resume(){this.status=U.WATCHING}markAsWatched(){this.status=U.WATCHED}setProgress(e){if(!(e instanceof W))throw Error(`Invalid progress`);this.progress=e}},K=class e{constructor({version:t=1,id:n=e.generateId(),name:r=`Mi primera lista`,watchItems:i=void 0,media:a=void 0}={}){this.version=e.validateVersion(t),this.id=n,this.name=r,this.watchItems=e.validatesItems(i),this.media=e.validatesMedia(a)}static generateId(){return crypto.randomUUID()}static validatesItems(e){if(e||=[],!Array.isArray(e))throw Error(`watchItems is not an array`);return e.forEach(e=>{if(!(e instanceof G))throw Error(`watchItems must contain only WatchItem`)}),e}static validatesMedia(e){if(e||=[],!Array.isArray(e))throw Error(`media is not an array`);return e.forEach(e=>{if(!(e instanceof H))throw Error(`media must contain only Media`)}),e}static validateVersion(e){if(!Number.isInteger(e)||e<1||e>1)throw Error(`Unsupported watch list version`);return e}addMedia(e){if(this.media.some(t=>t.id===e.id)||this.media.some(t=>t.matchKey===e.matchKey))throw Error(`Media already exists`);this.media.push(e)}removeMedia(e){if(this.watchItems.some(t=>t.mediaId===e))return!1;let t=this.media.findIndex(t=>t.id===e);return t!==-1&&(this.media.splice(t,1),!0)}addWatchItem(e){if(!this.media.some(t=>t.id===e.mediaId))throw Error(`Media not found`);this.watchItems.push(e)}},q=class{constructor(e){this.watchList=e}addItem({title:e,type:t,year:n,originalTitle:r,genres:i,platforms:a}){let o=null,s=!1;try{o=new H({title:e,type:t,year:n,originalTitle:r,genres:i});let c=new G({mediaId:o.id,platforms:a});return this.watchList.addMedia(o),s=!0,this.watchList.addWatchItem(c),{success:!0}}catch(e){return s&&this.watchList.removeMedia(o.id),{success:!1,error:e.message}}}updateItem({mediaId:e,media:t,watchItem:n}){let r=this.watchList.media.find(t=>t.id===e),i=this.watchList.watchItems.find(t=>t.mediaId===e);if(!r||!i)return{success:!1,error:`Item not found`};try{let a=new H({id:e,title:t.title,type:t.type,year:t.year,originalTitle:t.originalTitle,genres:t.genres,runtimeMinutes:r.runtimeMinutes,omdbId:r.omdbId,poster:r.poster,ratings:r.ratings});if(this.watchList.media.some(t=>t.id!==e&&t.matchKey===a.matchKey))throw Error(`Media already exists`);return r.title=a.title,r.type=a.type,r.year=a.year,r.originalTitle=a.originalTitle,r.genres=a.genres,i.platforms=n.platforms,i.reason=n.reason,i.spanishAudio=n.spanishAudio,i.spanishSubtitles=n.spanishSubtitles,i.userRating=n.userRating,i.progress=n.progress,{success:!0}}catch(e){return{success:!1,error:e.message}}}changeStatus(e,t){let n=this.watchList.watchItems.find(t=>t.mediaId===e);if(!n)return{success:!1,error:`WatchItem not found`};try{switch(t){case U.WATCHING:if(n.status===U.PENDING)n.start();else if(n.status===U.PAUSED)n.resume();else throw Error(`Invalid status transition`);break;case U.PAUSED:if(n.status!==U.WATCHING)throw Error(`Invalid status transition`);n.pause();break;case U.WATCHED:if(n.status!==U.WATCHING)throw Error(`Invalid status transition`);n.markAsWatched();break;default:throw Error(`Invalid status transition`)}let e=new G({mediaId:n.mediaId,platforms:n.platforms,reason:n.reason,spanishAudio:n.spanishAudio,spanishSubtitles:n.spanishSubtitles,status:n.status,userRating:n.userRating,progress:n.progress,addedAt:n.addedAt,watchedAt:n.watchedAt}),r=this.watchList.watchItems.indexOf(n);return this.watchList.watchItems[r]=e,{success:!0}}catch(e){return{success:!1,error:e.message}}}renameWatchList(e){return!e||!e.trim()?{success:!1,error:`El nombre no puede estar vacío`}:(this.watchList.name=e.trim(),{success:!0})}getItems(){return this.watchList.watchItems.map(e=>({media:this.watchList.media.find(t=>t.id===e.mediaId),watchItem:e}))}},De=class{constructor(e,t=`quevemos-watchlist`){this.storage=e,this.key=t}save(e){let t=JSON.stringify(e);this.storage.setItem(this.key,t)}load(){let e=this.storage.getItem(this.key);if(!e)return new K;let t=JSON.parse(e),n=t.media.map(e=>new H(e)),r=t.watchItems.map(e=>new G(e));return new K({version:t.version,id:t.id,name:t.name,media:n,watchItems:r})}},Oe=class{export(e){return JSON.stringify(e,null,2)}import(e){let t=this.parse(e);this.validate(t);let n=t.media.map(e=>new H(e)),r=t.watchItems.map(e=>new G(e));return new K({version:t.version,id:t.id,name:t.name,media:n,watchItems:r})}parse(e){try{return JSON.parse(e)}catch{throw Error(`Invalid JSON`)}}validate(e){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Invalid WatchList file`);if(!Number.isInteger(e.version)||e.version<1||e.version>1)throw Error(`Unsupported WatchList version`);if(!Array.isArray(e.media))throw Error(`WatchList media is not an array`);if(!Array.isArray(e.watchItems))throw Error(`WatchList watchItems is not an array`)}},J=Object.freeze({PENDING:`pending`,ACCEPTED:`accepted`,DISCARDED:`discarded`}),Y=class e{constructor({id:t=e.generateId(),mediaId:n,platforms:r=[],spanishAudio:i=!1,spanishSubtitles:a=!1,reason:o=void 0,recommenderRating:s=void 0,status:c=J.PENDING}){this.id=t,this.mediaId=e.validateMediaId(n),this.platforms=r,this.spanishAudio=i,this.spanishSubtitles=a,this.reason=o,this.status=e.validateStatus(c),this.recommenderRating=s}static generateId(){return crypto.randomUUID()}static validateMediaId(e){if(!e||typeof e!=`string`)throw Error(`mediaId is required`);return e}static validateStatus(e){if(!Object.values(J).includes(e))throw Error(`Invalid recommendation status`);return e}},ke=class e{constructor({id:t=e.generateId(),name:n=void 0,recommendations:r=void 0,version:i=1,createdAt:a=new Date().toISOString()}={}){this.id=t,this.name=e.validateName(n),this.recommendations=e.validatesRecommendations(r),this.version=e.validateVersion(i),this.createdAt=a}static generateId(){return crypto.randomUUID()}static validateName(e){if(!e||typeof e!=`string`)throw Error(`name is required`);return e}static validatesRecommendations(e){if(e||=[],!Array.isArray(e))throw Error(`recommendations is not an array`);return e.forEach(e=>{if(!(e instanceof Y))throw Error(`recommendations must contain only Recommendation`)}),e}static validateVersion(e){if(!Number.isInteger(e)||e<1||e>1)throw Error(`Unsupported recommendation list version`);return e}},X=class e{constructor({version:t=1,createdAt:n=new Date().toISOString(),sender:r,items:i=[]}={}){this.version=e.validateVersion(t),this.createdAt=n,this.sender=e.validateSender(r),this.items=e.validateItems(i)}static validateVersion(e){if(!Number.isInteger(e)||e<1||e>1)throw Error(`Unsupported RecommendationExchange version`);return e}static validateSender(e){if(!e||typeof e!=`string`)throw Error(`sender is required`);return e}static validateItems(e){if(!Array.isArray(e))throw Error(`items is not an array`);return e}},Z=class e{constructor({id:t=e.generateId(),name:n=void 0,recommendations:r=void 0,media:i=void 0,version:a=1,createdAt:o=new Date().toISOString()}={}){this.id=t,this.name=e.validateName(n),this.recommendations=e.validatesRecommendations(r),this.media=e.validatesMedia(i),this.version=e.validateVersion(a),this.createdAt=o}static generateId(){return crypto.randomUUID()}static validateName(e){if(!e||typeof e!=`string`)throw Error(`name is required`);return e}static validatesMedia(e){if(e||=[],!Array.isArray(e))throw Error(`media is not an array`);return e}static validatesRecommendations(e){if(e||=[],!Array.isArray(e))throw Error(`recommendations is not an array`);return e.forEach(e=>{if(!(e instanceof Y))throw Error(`recommendations must contain only Recommendation`)}),e}static validateVersion(e){if(!Number.isInteger(e)||e<1||e>1)throw Error(`Unsupported recommendation list version`);return e}},Q=class{createRecommendation(e,t){if(!e.watchItems.some(e=>e===t))throw Error(`WatchItem is not in WatchList`);return new Y({mediaId:t.mediaId,platforms:[...t.platforms],spanishAudio:t.spanishAudio,spanishSubtitles:t.spanishSubtitles,reason:t.reason,recommenderRating:t.userRating})}createRecommendationList(e,t){let n=t.map(t=>this.createRecommendation(e,t));return new ke({name:`Recomendaciones desde : `+e.name,recommendations:n})}createRecommendationExchange(e,t){let n=e.recommendations.map(e=>{let n=t.media.find(t=>t.id===e.mediaId);if(!n)throw Error(`Media not found in WatchList: ${e.mediaId}`);return{media:{id:n.id,title:n.title,originalTitle:n.originalTitle,type:n.type,year:n.year,runtimeMinutes:n.runtimeMinutes,genres:[...n.genres],omdbId:n.omdbId,poster:n.poster,ratings:n.ratings,matchKey:n.matchKey},recommendation:e}});return new X({sender:t.name,items:n})}createIncomingRecommendationList(e){if(!(e instanceof X))throw Error(`exchange must be a RecommendationExchange`);return new Z({name:e.sender,media:e.items.map(e=>e.media),recommendations:e.items.map(e=>new Y(e.recommendation)),version:1,createdAt:e.createdAt})}prepareComparison(e,t){if(!t)throw Error(`No WatchList loaded`);return{incomingRecommendationList:e,watchList:t}}compareRecommendations(e,t){return e.recommendations.map(n=>{let r=e.media.find(e=>e.id===n.mediaId),i=this.findMediaCandidates(r,t),a=`new`;return i.some(e=>e.matches.includes(`omdbId`))?a=`matched`:i.length>0&&(a=`candidate`),{recommendation:n,media:r,matches:i,status:a}})}findMediaCandidates(e,t){let n=[];for(let r of t.media){let t=[];e.omdbId&&r.omdbId&&e.omdbId===r.omdbId&&t.push(`omdbId`),e.matchKey===r.matchKey&&t.push(`matchKey`);let i=e.title.trim().toLowerCase(),a=r.title.trim().toLowerCase();i!==a&&(i.includes(a)||a.includes(i))&&t.push(`partialTitle`),t.length>0&&n.push({media:r,matches:t,differences:this.compareMedia(e,r)})}return n}compareMedia(e,t){let n=[];for(let r of[`title`,`originalTitle`,`type`,`year`,`runtimeMinutes`,`genres`,`poster`])JSON.stringify(e[r])!==JSON.stringify(t[r])&&n.push(r);return!t.omdbId&&e.omdbId&&n.push(`omdbId`),n}acceptRecommendation(e,t,n){let{recommendation:r}=e,i=n.media.find(e=>e.id===r.mediaId);if(!i)throw Error(`Media not found in WatchList`);let a=[t.name];r.recommenderRating!==void 0&&(a[0]+=` | (Nota: ${r.recommenderRating})`),r.reason&&a.push(r.reason);let o=new G({mediaId:i.id,platforms:r.platforms,spanishAudio:r.spanishAudio,spanishSubtitles:r.spanishSubtitles,reason:a.join(` | `)});return n.watchItems.push(o),r.status=J.ACCEPTED,o}discardRecommendation(e){return e.status=J.DISCARDED,e}},Ae=class{async encode(e){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`recommendationExchange debe ser un objeto`);let t=JSON.stringify(e),n=new TextEncoder().encode(t),r=await this.compress(n);return this.encodeBase64Url(r)}async decode(e){if(typeof e!=`string`||e.length===0)throw TypeError(`encodedData debe ser una cadena no vacía`);let t=this.decodeBase64Url(e),n=await this.decompress(t),r=new TextDecoder(`utf-8`,{fatal:!0}).decode(n);return JSON.parse(r)}async compress(e){if(typeof CompressionStream>`u`)throw Error(`Este navegador no soporta CompressionStream`);let t=new Blob([e]).stream().pipeThrough(new CompressionStream(`deflate`));return new Uint8Array(await new Response(t).arrayBuffer())}async decompress(e){if(typeof DecompressionStream>`u`)throw Error(`Este navegador no soporta DecompressionStream`);let t=new Blob([e]).stream().pipeThrough(new DecompressionStream(`deflate`));return new Uint8Array(await new Response(t).arrayBuffer())}encodeBase64Url(e){let t=``;for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}decodeBase64Url(e){let t=e.replace(/-/g,`+`).replace(/_/g,`/`),n=t+`=`.repeat((4-t.length%4)%4),r=atob(n);return Uint8Array.from(r,e=>e.charCodeAt(0))}},$={version:1,mediaTypes:[{id:`movie`,name:`Película`},{id:`series`,name:`Serie`}],genres:[{id:`action`,name:`Acción`},{id:`adventure`,name:`Aventuras`},{id:`animation`,name:`Animación`},{id:`comedy`,name:`Comedia`},{id:`crime`,name:`Crimen`},{id:`documentary`,name:`Documental`},{id:`drama`,name:`Drama`},{id:`family`,name:`Familiar`},{id:`fantasy`,name:`Fantasía`},{id:`history`,name:`Historia`},{id:`horror`,name:`Terror`},{id:`music`,name:`Musical`},{id:`mystery`,name:`Misterio`},{id:`romance`,name:`Romance`},{id:`science-fiction`,name:`Ciencia ficción`},{id:`sport`,name:`Deporte`},{id:`thriller`,name:`Thriller`},{id:`war`,name:`Bélica`},{id:`western`,name:`Western`}],watchStatuses:[{id:`pending`,name:`Pendiente`},{id:`watching`,name:`Viendo`},{id:`paused`,name:`En pausa`},{id:`watched`,name:`Vista`},{id:`discarded`,name:`Descartada`}],platforms:[{id:`netflix-es`,name:`Netflix`,country:`ES`,active:!0,logo:`netflix`},{id:`max-es`,name:`HBO Max`,country:`ES`,active:!0,logo:`max`},{id:`prime-video-es`,name:`Prime`,country:`ES`,active:!0,logo:`prime-video`},{id:`disney-plus-es`,name:`Disney+`,country:`ES`,active:!0,logo:`disney-plus`},{id:`movistar-plus-es`,name:`Movistar Plus+`,country:`ES`,active:!0,logo:`movistar-plus`},{id:`apple-tv-plus-es`,name:`Apple TV+`,country:`ES`,active:!0,logo:`apple-tv-plus`},{id:`filmin-es`,name:`Filmin`,country:`ES`,active:!0,logo:`filmin`},{id:`skyshowtime-es`,name:`SkyShowtime`,country:`ES`,active:!0,logo:`skyshowtime`},{id:`atresplayer-es`,name:`Atresplayer`,country:`ES`,active:!0,logo:`atresplayer`},{id:`rtve-play-es`,name:`RTVE Play`,country:`ES`,active:!0,logo:`rtve-play`},{id:`youtube-es`,name:`YouTube`,country:`ES`,active:!0,logo:`youtube`}]},je=class e extends B{static styles=o`
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
    `;static properties={media:{type:Object},watchItem:{type:Object},overlayOpened:{type:Boolean},selectedToShare:{type:Boolean}};static getCatalogName(e,t){return e.find(e=>e.id===t)?.name??t}constructor(){super(),this.overlayOpened=!1}editItem(){this.dispatchEvent(new CustomEvent(`edit-item`,{detail:{media:this.media,watchItem:this.watchItem},bubbles:!0,composed:!0}))}changeStatus(e){this.dispatchEvent(new CustomEvent(`change-status`,{detail:{mediaId:this.media.id,status:e},bubbles:!0,composed:!0}))}render(){if(!this.media||!this.watchItem)return j``;let t=e.getCatalogName($.watchStatuses,this.watchItem.status),n=`status-${this.watchItem.status}`;return j`
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
        `}renderInformation(){let t=e.getCatalogName($.mediaTypes,this.media.type),n=this.media.genres.map(t=>e.getCatalogName($.genres,t)),r=this.watchItem.platforms.map(t=>e.getCatalogName($.platforms,t));return j`
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

                        ${this.media.ratings?j`
                                <div class="overlay-section">
                                    <strong>Valoraciones</strong>
                                    <span>
                                        ${this.media.ratings.imdb?`IMDb: ${this.media.ratings.imdb}`:``}
                                        ${this.media.ratings.metascore?` · Metascore: ${this.media.ratings.metascore}`:``}
                                    </span>
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
                        
                    </div>

                    <div class="metadata">



                        <span class="media-type">${t}</span>
                        ${this.media.year?j`<span>${this.media.year}</span>`:``}
                        ${this.media.runtimeMinutes?j`
                                <span>
                                    ${this.media.runtimeMinutes} min
                                </span>
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
        `}showInformation(){this.overlayOpened=!this.overlayOpened,this.classList.toggle(`overlay-open`,this.overlayOpened)}formatDate(e){return new Date(e).toLocaleDateString(`es-ES`)}toggleRecommendation(){this.dispatchEvent(new CustomEvent(`toggle-recommendation`,{detail:{media:this.media,watchItem:this.watchItem},bubbles:!0,composed:!0}))}renderProgress(){let e=this.watchItem.progress;return e?e.minute===void 0?e.season!==void 0&&e.episode!==void 0?`Temporada ${e.season}, episodio ${e.episode}`:``:`${e.minute} min`:``}renderStatusActions(){switch(this.watchItem.status){case U.PENDING:return j`
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
                `;default:return``}}};customElements.define(`watch-item-view`,je);var Me=class extends B{static styles=o`
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
        `}};customElements.define(`add-item-form`,Me);var Ne=class extends B{static styles=o`
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
    `;static properties={media:{attribute:!1},watchItem:{attribute:!1}};constructor(){super(),this.media=void 0,this.watchItem=void 0}save(e){e.preventDefault();let t=e.target,n=[...t.querySelectorAll(`input[name="genres"]:checked`)].map(e=>e.value),r=[...t.querySelectorAll(`input[name="platforms"]:checked`)].map(e=>e.value),i=this.createProgress(t);this.dispatchEvent(new CustomEvent(`save-item`,{detail:{mediaId:this.media.id,media:{title:t.title.value.trim(),type:t.type.value,year:t.year.value?Number(t.year.value):void 0,originalTitle:t.originalTitle.value.trim()||void 0,genres:n},watchItem:{platforms:r,reason:t.reason.value.trim()||void 0,spanishAudio:t.spanishAudio.checked,spanishSubtitles:t.spanishSubtitles.checked,userRating:t.userRating.value?Number(t.userRating.value):void 0,progress:i}},bubbles:!0,composed:!0}))}createProgress(e){if(this.media.type===V.MOVIE){let t=e.minute.value;return t?new W({minute:Number(t)}):void 0}let t=e.season.value,n=e.episode.value,r=e.minute.value;if(t||n)return new W({season:t?Number(t):void 0,episode:n?Number(n):void 0,minute:r?Number(r):void 0})}getProgressValue(e){return this.watchItem?.progress?.[e]??``}isGenreSelected(e){return this.media?.genres?.includes(e)}isPlatformSelected(e){return this.watchItem?.platforms?.includes(e)}renderProgress(){return this.media?.type===V.MOVIE?j`
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
            `:j`
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
                        ${$.genres.map(e=>j`
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
        `}};customElements.define(`edit-item-form`,Ne);var Pe=class extends B{static styles=o`
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

        .recommend-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;

            padding: 7px 12px;

            border: none;
            border-radius: 18px;

            background: #444;
            color: white;

            cursor: pointer;
            font-size: 0.9rem;
        }

        .recommend-button:hover {
            background: #333;
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
    `;static properties={items:{state:!0},editingItem:{state:!0},listName:{state:!0},addingItem:{type:Boolean},selectedItemsToShare:{state:!0},linkCopied:{state:!0}};constructor(){super(),this.items=[];let e=new De(localStorage),t=e.load(),n=new Oe;this.service=new q(t),this.recommendService=new Q,this.listName=this.service.watchList.name,this.items=this.service.getItems(),this.storage=e,this.fileStorage=n,this.editingItem=void 0,this.addingItem=!1,this.selectedItemsToShare=[],this.linkCopied=!1}render(){let e=this.items;return j`
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
                ${this.linkCopied?j`
                        <div class="toast-overlay">
                            <div class="toast">
                                <span>✓</span>
                                Enlace copiado
                            </div>
                        </div>
                    `:``}
            </div>
            
            ${e.length===0?j`
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
                                ${this.selectedItemsToShare.length>0?j`
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
                                        </button>
                                    `:``}
                            </div>

                        </div>
                        ${e.map(e=>j`
                                <div class="item-container">

                                    ${this.editingItem?.media.id===e.media.id?j`
                                            <div class="edit-transition">
                                                <edit-item-form
                                                    .media=${e.media}
                                                    .watchItem=${e.watchItem}
                                                    @save-item=${this.saveItem}
                                                    @cancel-edit=${this.cancelEdit}
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
        `}showAddItemForm(){this.addingItem=!0}addItem(e){let{title:t,type:n}=e.detail;if(!t)return;let r=this.service.addItem(e.detail);if(!r.success){console.error(r.error);return}this.storage.save(this.service.watchList),this.items=this.service.getItems(),e.target.resetForm(),this.hideAddItemForm()}hideAddItemForm(){this.addingItem=!1}editItem(e){this.editingItem=e.detail}cancelEdit(){this.editingItem=void 0}saveItem(e){let t=this.service.updateItem(e.detail);if(!t.success){console.error(t.error);return}this.storage.save(this.service.watchList),this.items=this.service.getItems(),this.editingItem=void 0}changeStatus(e){let t=this.service.changeStatus(e.detail.mediaId,e.detail.status);if(!t.success){console.error(t.error);return}this.storage.save(this.service.watchList),this.items=[...this.service.getItems()]}toggleRecommendation(e){let t=e.detail;if(this.selectedItemsToShare.some(e=>e.media.id===t.media.id)){this.selectedItemsToShare=this.selectedItemsToShare.filter(e=>e.media.id!==t.media.id);return}this.selectedItemsToShare=[...this.selectedItemsToShare,t]}isSelectedToShare(e){return this.selectedItemsToShare.some(t=>t.media.id===e.media.id)}createRecommendationExchange(){if(this.selectedItemsToShare.length===0)return;let e=this.selectedItemsToShare.map(e=>e.watchItem),t=this.recommendService.createRecommendationList(this.service.watchList,e),n=this.recommendService.createRecommendationExchange(t,this.service.watchList);this.shareRecommendationExchange(n)}async shareRecommendationExchange(e){let t=await new Ae().encode(e),n=new URL(`http://localhost:5173/quevemos`);n.searchParams.set(`recommendation`,t);try{await navigator.clipboard.writeText(n.toString()),this.linkCopied=!0,setTimeout(()=>{this.linkCopied=!1},2e3)}catch(e){console.error(`No se pudo copiar el enlace:`,e)}}editListName(){let e=prompt(`Ingrese el nuevo nombre para la lista:`,this.service.watchList.name);if(!e)return;let t=this.service.renameWatchList(e);if(!t.success){console.error(t.error);return}this.storage.save(this.service.watchList),this.listName=this.service.watchList.name}exportWatchList(){let e=this.fileStorage.export(this.service.watchList),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`quevemos-watchlist.json`,r.click(),URL.revokeObjectURL(n)}importWatchList(){if(!confirm(`La lista actual será sustituida por la lista importada. ¿Deseas continuar?`))return;let e=document.createElement(`input`);e.type=`file`,e.accept=`application/json,.json`,e.addEventListener(`change`,async()=>{let t=e.files[0];if(t)try{let e=await t.text(),n=this.fileStorage.import(e);this.service=new q(n),this.storage.save(n),this.listName=this.service.watchList.name,this.items=this.service.getItems(),this.editingItem=void 0}catch(e){console.error(e),alert(`No se pudo importar la lista:\n${e.message}`)}}),e.click()}resetWatchList(){if(!confirm(`Se perderán todos los datos de la lista. ¿Deseas continuar?`))return;let e=new K({name:`Mi nueva lista`});this.service=new q(e),this.storage.save(e),this.listName=this.service.watchList.name,this.items=this.service.getItems()}};customElements.define(`watch-list-view`,Pe);var Fe=class{constructor(e,t=`quevemos-inbox`){this.storage=e,this.key=t}save(e){let t=JSON.stringify(e);this.storage.setItem(this.key,t)}load(){let e=this.storage.getItem(this.key);return e?JSON.parse(e).map(e=>new Z({version:e.version,id:e.id,name:e.name,recommendations:e.recommendations.map(e=>new Y(e)),media:e.media,createdAt:e.createdAt})):[]}},Ie=class{export(e){return JSON.stringify(e,null,2)}import(e){let t=this.parse(e);return this.validate(t),t.map(e=>new Z({version:e.version,id:e.id,name:e.name,recommendations:e.recommendations.map(e=>new Y(e)),createdAt:e.createdAt}))}parse(e){try{return JSON.parse(e)}catch{throw Error(`Invalid JSON`)}}validate(e){if(!Array.isArray(e))throw Error(`Invalid Inbox's file`);e.forEach(e=>{if(!Number.isInteger(e.version)||e.version<1||e.version>1)throw Error(`Unsupported IncomingRecommendationList version`);if(!Array.isArray(e.recommendations))throw Error(`IncomingRecommendationList recommendations is not an array`)})}},Le=class{constructor(e=new Ae,t=`recommendation`){this.codec=e,this.parameterName=t}async read(e){let t=new URL(e).searchParams.get(this.parameterName);if(!t)return null;try{return new X(await this.codec.decode(t))}catch{throw Error(`Invalid recommendation link`)}}},Re=class e extends B{static styles=o`
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

        @media (max-width: 600px) {
            .recommendation {
                grid-template-columns: 70px 1fr;
            }

            .poster {
                width: 70px;
            }
        }
    `;static properties={comparison:{attribute:!1}};static getCatalogName(e,t){return e.find(e=>e.id===t)?.name??t}constructor(){super(),this.comparison=void 0}get media(){return this.comparison?.media}get recommendation(){return this.comparison?.recommendation}get matches(){return this.comparison?.matches??[]}get differences(){return this.matches.length===0?[]:this.matches[0].differences??[]}isNew(){return this.comparison?.status===`new`}isMatched(){return this.comparison?.status===`matched`}renderStatus(){return this.isNew()?j`
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

                    <div class="actions">

                        <button
                            type="button"
                            @click=${this.accept}
                        >
                            <i class="fa fa-check"></i>
                            Aceptar
                        </button>

                        <button
                            type="button"
                            @click=${this.discard}
                        >
                            <i class="fa fa-times"></i>
                            Descartar
                        </button>

                    </div>

                </div>

            </article>
        `}accept(){this.dispatchEvent(new CustomEvent(`accept-recommendation`,{detail:{comparison:this.comparison},bubbles:!0,composed:!0}))}discard(){this.dispatchEvent(new CustomEvent(`discard-recommendation`,{detail:{comparison:this.comparison},bubbles:!0,composed:!0}))}};customElements.define(`recommendation-item-view`,Re);var ze=class extends B{static styles=o`
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
    `;static properties={incomingList:{attribute:!1},comparisons:{state:!0},expanded:{state:!0}};constructor(){super();let e=new De(localStorage);this.watchList=e.load(),this.service=new Q,this.comparisons=[],this.expanded=!1}updated(e){e.has(`incomingList`)&&this.incomingList&&this.updateComparisons()}updateComparisons(){this.comparisons=this.service.compareRecommendations(this.incomingList,this.watchList)}getStatusCount(e){return this.incomingList.recommendations.filter(t=>t.status===e).length}toggleExpanded(){this.expanded=!this.expanded}render(){if(!this.incomingList)return j``;let e=this.getStatusCount(`pending`),t=this.getStatusCount(`accepted`),n=this.getStatusCount(`discarded`);return j`
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

                        <button
                            type="button"
                            class="action-button"
                            title=${this.expanded?`Cerrar`:`Abrir`}
                            @click=${this.toggleExpanded}
                        >
                            <i
                                class="fa ${this.expanded?`fa-chevron-up`:`fa-chevron-down`}"
                            ></i>
                        </button>

                    </div>

                </header>

                ${this.expanded?j`
                        <div class="list-content">

                            ${this.comparisons.map(e=>j`
                                    <recommendation-item-view
                                        .comparison=${e}
                                    ></recommendation-item-view>
                                `)}

                        </div>
                    `:``}

            </article>
        `}};customElements.define(`recommendation-list-view`,ze);var Be=class extends B{static styles=o`
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
    `;static properties={lists:{state:!0},selectedList:{state:!0}};constructor(){super(),this.storage=new Fe(localStorage),this.fileStorage=new Ie,this.linkReader=new Le,this.service=new Q,this.lists=this.storage.load(),this.selectedList=void 0}async connectedCallback(){super.connectedCallback(),await this.importRecommendationFromUrl()}async importRecommendationFromUrl(){let e=await this.linkReader.read(window.location.href);if(!e)return;let t=this.service.createIncomingRecommendationList(e);this.lists=[...this.lists,t],this.storage.save(this.lists)}selectList(e){this.selectedList=e}closeList(){this.selectedList=void 0}importRecommendations(){let e=document.createElement(`input`);e.type=`file`,e.accept=`application/json,.json`,e.addEventListener(`change`,async()=>{let t=e.files[0];if(t)try{let e=await t.text(),n=this.fileStorage.import(e);this.lists=[...this.lists,...n],this.storage.save(this.lists),this.selectedList=void 0}catch(e){console.error(e),alert(`No se pudo importar al buzón de entrada:\n${e.message}`)}}),e.click()}render(){return j`
            <link
                rel="stylesheet"
                href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css"
            >

            <section class="inbox">

                <header class="section-header">
                    <i class="fa fa-inbox"></i>
                    <h2>Buzón de entrada</h2>

                    <button
                        type="button"
                        class="action-button"
                        @click=${this.importRecommendations}
                    >
                        <i class="fa fa-upload"></i>
                        Importar
                    </button>
                </header>

                ${this.lists.length===0?j`
                        <p class="empty">
                            No tienes recomendaciones recibidas.
                        </p>
                    `:j`
                        ${this.selectedList?j`
                            <button
                                class="list"
                                @click=${()=>this.closeList()}
                            >
                                <strong>
                                 <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                                 Comparando con tu Lista local...
                                </strong>
                                <span>
                                    Cerrar
                                </span>
                            </button>
                            `:j`
                            <div class="lists">
                            ${this.lists.map(e=>j`
                                    <button
                                        class="list"
                                        @click=${()=>this.selectList(e)}
                                    >
                                        <strong>
                                        <i class="fa fa-envelope-o" aria-hidden="true"></i></big> ${e.name}</strong>

                                        <span>
                                            ${e.recommendations.length}
                                            recomendaciones
                                        </span>
                                    </button>
                            `)}
                        </div>
                        `}
                    `}

                ${this.selectedList?j`
                        <recommendation-list-view
                            .incomingList=${this.selectedList}
                        ></recommendation-list-view>
                    `:``}

            </section>
        `}};customElements.define(`inbox-view`,Be);var Ve=class extends B{static styles=o`
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
    `;render(){return j`
            <app-header></app-header>

            <main>
                <section class="content">
                    <watch-list-view></watch-list-view>
                </section>
                <hr/>
                <section class="content">
                    <inbox-view></inbox-view>
                </section>
            </main>

            <app-footer></app-footer>
        `}};customElements.define(`quevemos-app`,Ve);