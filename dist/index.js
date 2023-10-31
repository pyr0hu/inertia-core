var oe=Object.create;var I=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var le=Object.getPrototypeOf,ce=Object.prototype.hasOwnProperty;var de=(t,e)=>{for(var i in e)I(t,i,{get:e[i],enumerable:!0})},K=(t,e,i,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of ae(e))!ce.call(t,o)&&o!==i&&I(t,o,{get:()=>e[o],enumerable:!(n=se(e,o))||n.enumerable});return t};var O=(t,e,i)=>(i=t!=null?oe(le(t)):{},K(e||!t||!t.__esModule?I(i,"default",{value:t,enumerable:!0}):i,t)),pe=t=>K(I({},"__esModule",{value:!0}),t);var Ee={};de(Ee,{createHeadManager:()=>M,hrefToUrl:()=>m,mergeDataIntoQueryString:()=>N,router:()=>be,setupProgress:()=>j,shouldIntercept:()=>H,urlWithoutHash:()=>v});module.exports=pe(Ee);var G=O(require("axios"),1);function R(t,e){let i;return function(...n){clearTimeout(i),i=setTimeout(()=>t.apply(this,n),e)}}function f(t,e){return document.dispatchEvent(new CustomEvent(`inertia:${t}`,e))}var X=t=>f("before",{cancelable:!0,detail:{visit:t}}),J=t=>f("error",{detail:{errors:t}}),z=t=>f("exception",{cancelable:!0,detail:{exception:t}}),D=t=>f("finish",{detail:{visit:t}}),B=t=>f("invalid",{cancelable:!0,detail:{response:t}}),S=t=>f("navigate",{detail:{page:t}}),_=t=>f("progress",{detail:{progress:t}}),Q=t=>f("start",{detail:{visit:t}}),Y=t=>f("success",{detail:{page:t}});function C(t){return t instanceof File||t instanceof Blob||t instanceof FileList&&t.length>0||t instanceof FormData&&Array.from(t.values()).some(e=>C(e))||typeof t=="object"&&t!==null&&Object.values(t).some(e=>C(e))}function U(t,e=new FormData,i=null){t=t||{};for(let n in t)Object.prototype.hasOwnProperty.call(t,n)&&ee(e,Z(i,n),t[n]);return e}function Z(t,e){return t?t+"["+e+"]":e}function ee(t,e,i){if(Array.isArray(i))return Array.from(i.keys()).forEach(n=>ee(t,Z(e,n.toString()),i[n]));if(i instanceof Date)return t.append(e,i.toISOString());if(i instanceof File)return t.append(e,i,i.name);if(i instanceof Blob)return t.append(e,i);if(typeof i=="boolean")return t.append(e,i?"1":"0");if(typeof i=="string")return t.append(e,i);if(typeof i=="number")return t.append(e,`${i}`);if(i==null)return t.append(e,"");U(i,t,e)}var te={modal:null,listener:null,show(t){typeof t=="object"&&(t=`All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(t)}`);let e=document.createElement("html");e.innerHTML=t,e.querySelectorAll("a").forEach(n=>n.setAttribute("target","_top")),this.modal=document.createElement("div"),this.modal.style.position="fixed",this.modal.style.width="100vw",this.modal.style.height="100vh",this.modal.style.padding="50px",this.modal.style.boxSizing="border-box",this.modal.style.backgroundColor="rgba(0, 0, 0, .6)",this.modal.style.zIndex=2e5,this.modal.addEventListener("click",()=>this.hide());let i=document.createElement("iframe");if(i.style.backgroundColor="white",i.style.borderRadius="5px",i.style.width="100%",i.style.height="100%",this.modal.appendChild(i),document.body.prepend(this.modal),document.body.style.overflow="hidden",!i.contentWindow)throw new Error("iframe not yet ready.");i.contentWindow.document.open(),i.contentWindow.document.write(e.outerHTML),i.contentWindow.document.close(),this.listener=this.hideOnEscape.bind(this),document.addEventListener("keydown",this.listener)},hide(){this.modal.outerHTML="",this.modal=null,document.body.style.overflow="visible",document.removeEventListener("keydown",this.listener)},hideOnEscape(t){t.keyCode===27&&this.hide()}};var ie=O(require("deepmerge"),1),F=O(require("qs"),1);function m(t){return new URL(t.toString(),window.location.toString())}function N(t,e,i,n="brackets"){let o=/^https?:\/\//.test(e.toString()),c=o||e.toString().startsWith("/"),h=!c&&!e.toString().startsWith("#")&&!e.toString().startsWith("?"),b=e.toString().includes("?")||t==="get"&&Object.keys(i).length,E=e.toString().includes("#"),a=new URL(e.toString(),"http://localhost");return t==="get"&&Object.keys(i).length&&(a.search=F.stringify((0,ie.default)(F.parse(a.search,{ignoreQueryPrefix:!0}),i),{encodeValuesOnly:!0,arrayFormat:n}),i={}),[[o?`${a.protocol}//${a.host}`:"",c?a.pathname:"",h?a.pathname.substring(1):"",b?a.search:"",E?a.hash:""].join(""),i]}function v(t){return t=new URL(t.href),t.hash="",t}var ne=typeof window>"u",A=class{constructor(){this.visitId=null}init({initialPage:e,resolveComponent:i,swapComponent:n}){this.page=e,this.resolveComponent=i,this.swapComponent=n,this.setNavigationType(),this.clearRememberedStateOnReload(),this.isBackForwardVisit()?this.handleBackForwardVisit(this.page):this.isLocationVisit()?this.handleLocationVisit(this.page):this.handleInitialPageVisit(this.page),this.setupEventListeners()}setNavigationType(){this.navigationType=window.performance&&window.performance.getEntriesByType("navigation").length>0?window.performance.getEntriesByType("navigation")[0].type:"navigate"}clearRememberedStateOnReload(){this.navigationType==="reload"&&window.history.state?.rememberedState&&delete window.history.state.rememberedState}handleInitialPageVisit(e){this.page.url+=window.location.hash,this.setPage(e,{preserveState:!0}).then(()=>S(e))}setupEventListeners(){window.addEventListener("popstate",this.handlePopstateEvent.bind(this)),document.addEventListener("scroll",R(this.handleScrollEvent.bind(this),100),!0)}scrollRegions(){return document.querySelectorAll("[scroll-region]")}handleScrollEvent(e){typeof e.target.hasAttribute=="function"&&e.target.hasAttribute("scroll-region")&&this.saveScrollPositions()}saveScrollPositions(){this.replaceState({...this.page,scrollRegions:Array.from(this.scrollRegions()).map(e=>({top:e.scrollTop,left:e.scrollLeft}))})}resetScrollPositions(){window.scrollTo(0,0),this.scrollRegions().forEach(e=>{typeof e.scrollTo=="function"?e.scrollTo(0,0):(e.scrollTop=0,e.scrollLeft=0)}),this.saveScrollPositions(),window.location.hash&&setTimeout(()=>document.getElementById(window.location.hash.slice(1))?.scrollIntoView())}restoreScrollPositions(){this.page.scrollRegions&&this.scrollRegions().forEach((e,i)=>{let n=this.page.scrollRegions[i];if(n)typeof e.scrollTo=="function"?e.scrollTo(n.left,n.top):(e.scrollTop=n.top,e.scrollLeft=n.left);else return})}isBackForwardVisit(){return window.history.state&&this.navigationType==="back_forward"}handleBackForwardVisit(e){window.history.state.version=e.version,this.setPage(window.history.state,{preserveScroll:!0,preserveState:!0}).then(()=>{this.restoreScrollPositions(),S(e)})}locationVisit(e,i){try{let n={preserveScroll:i};window.sessionStorage.setItem("inertiaLocationVisit",JSON.stringify(n)),window.location.href=e.href,v(window.location).href===v(e).href&&window.location.reload()}catch{return!1}}isLocationVisit(){try{return window.sessionStorage.getItem("inertiaLocationVisit")!==null}catch{return!1}}handleLocationVisit(e){let i=JSON.parse(window.sessionStorage.getItem("inertiaLocationVisit")||"");window.sessionStorage.removeItem("inertiaLocationVisit"),e.url+=window.location.hash,e.rememberedState=window.history.state?.rememberedState??{},e.scrollRegions=window.history.state?.scrollRegions??[],this.setPage(e,{preserveScroll:i.preserveScroll,preserveState:!0}).then(()=>{i.preserveScroll&&this.restoreScrollPositions(),S(e)})}isLocationVisitResponse(e){return!!(e&&e.status===409&&e.headers["x-inertia-location"])}isInertiaResponse(e){return!!e?.headers["x-inertia"]}createVisitId(){return this.visitId={},this.visitId}cancelVisit(e,{cancelled:i=!1,interrupted:n=!1}){e&&!e.completed&&!e.cancelled&&!e.interrupted&&(e.cancelToken.abort(),e.onCancel(),e.completed=!1,e.cancelled=i,e.interrupted=n,D(e),e.onFinish(e))}finishVisit(e){!e.cancelled&&!e.interrupted&&(e.completed=!0,e.cancelled=!1,e.interrupted=!1,D(e),e.onFinish(e))}resolvePreserveOption(e,i){return typeof e=="function"?e(i):e==="errors"?Object.keys(i.props.errors||{}).length>0:e}cancel(){this.activeVisit&&this.cancelVisit(this.activeVisit,{cancelled:!0})}visit(e,{method:i="get",data:n={},replace:o=!1,preserveScroll:c=!1,preserveState:h=!1,only:b=[],headers:E={},errorBag:a="",forceFormData:l=!1,onCancelToken:g=()=>{},onBefore:L=()=>{},onStart:d=()=>{},onProgress:p=()=>{},onFinish:T=()=>{},onCancel:y=()=>{},onSuccess:$=()=>{},onError:q=()=>{},queryStringArrayFormat:k="brackets"}={}){let x=typeof e=="string"?m(e):e;if((C(n)||l)&&!(n instanceof FormData)&&(n=U(n)),!(n instanceof FormData)){let[r,s]=N(i,x,n,k);x=m(r),n=s}let P={url:x,method:i,data:n,replace:o,preserveScroll:c,preserveState:h,only:b,headers:E,errorBag:a,forceFormData:l,queryStringArrayFormat:k,cancelled:!1,completed:!1,interrupted:!1};if(L(P)===!1||!X(P))return;this.activeVisit&&this.cancelVisit(this.activeVisit,{interrupted:!0}),this.saveScrollPositions();let W=this.createVisitId();this.activeVisit={...P,onCancelToken:g,onBefore:L,onStart:d,onProgress:p,onFinish:T,onCancel:y,onSuccess:$,onError:q,queryStringArrayFormat:k,cancelToken:new AbortController},g({cancel:()=>{this.activeVisit&&this.cancelVisit(this.activeVisit,{cancelled:!0})}}),Q(P),d(P),(0,G.default)({method:i,url:v(x).href,data:i==="get"?{}:n,params:i==="get"?n:{},signal:this.activeVisit.cancelToken.signal,headers:{...E,Accept:"text/html, application/xhtml+xml","X-Requested-With":"XMLHttpRequest","X-Inertia":!0,...b.length?{"X-Inertia-Partial-Component":this.page.component,"X-Inertia-Partial-Data":b.join(",")}:{},...a&&a.length?{"X-Inertia-Error-Bag":a}:{},...this.page.version?{"X-Inertia-Version":this.page.version}:{}},onUploadProgress:r=>{n instanceof FormData&&(r.percentage=r.progress?Math.round(r.progress*100):0,_(r),p(r))}}).then(r=>{if(!this.isInertiaResponse(r))return Promise.reject({response:r});let s=r.data;s.component===this.page.component&&(s.props={...this.page.props,...s.props}),c=this.resolvePreserveOption(c,s),h=this.resolvePreserveOption(h,s),h&&window.history.state?.rememberedState&&s.component===this.page.component&&(s.rememberedState=window.history.state.rememberedState);let w=x,V=m(s.url);return w.hash&&!V.hash&&v(w).href===V.href&&(V.hash=w.hash,s.url=V.href),this.setPage(s,{visitId:W,replace:o,preserveScroll:c,preserveState:h})}).then(()=>{let r=this.page.props.errors||{};if(Object.keys(r).length>0){let s=a?r[a]?r[a]:{}:r;return J(s),q(s)}return Y(this.page),$(this.page)}).catch(r=>{if(this.isInertiaResponse(r.response))return this.setPage(r.response.data,{visitId:W});if(this.isLocationVisitResponse(r.response)){let s=m(r.response.headers["x-inertia-location"]),w=x;w.hash&&!s.hash&&v(w).href===s.href&&(s.hash=w.hash),this.locationVisit(s,c===!0)}else if(r.response)B(r.response)&&te.show(r.response.data);else return Promise.reject(r)}).then(()=>{this.activeVisit&&this.finishVisit(this.activeVisit)}).catch(r=>{if(!G.default.isCancel(r)){let s=z(r);if(this.activeVisit&&this.finishVisit(this.activeVisit),s)return Promise.reject(r)}})}setPage(e,{visitId:i=this.createVisitId(),replace:n=!1,preserveScroll:o=!1,preserveState:c=!1}={}){return Promise.resolve(this.resolveComponent(e.component)).then(h=>{i===this.visitId&&(e.scrollRegions=e.scrollRegions||[],e.rememberedState=e.rememberedState||{},n=n||m(e.url).href===window.location.href,n?this.replaceState(e):this.pushState(e),this.swapComponent({component:h,page:e,preserveState:c}).then(()=>{o||this.resetScrollPositions(),n||S(e)}))})}pushState(e){this.page=e,window.history.pushState(e,"",e.url)}replaceState(e){this.page=e,window.history.replaceState(e,"",e.url)}handlePopstateEvent(e){if(e.state!==null){let i=e.state,n=this.createVisitId();Promise.resolve(this.resolveComponent(i.component)).then(o=>{n===this.visitId&&(this.page=i,this.swapComponent({component:o,page:i,preserveState:!1}).then(()=>{this.restoreScrollPositions(),S(i)}))})}else{let i=m(this.page.url);i.hash=window.location.hash,this.replaceState({...this.page,url:i.href}),this.resetScrollPositions()}}get(e,i={},n={}){return this.visit(e,{...n,method:"get",data:i})}reload(e={}){return this.visit(window.location.href,{...e,preserveScroll:!0,preserveState:!0})}replace(e,i={}){return console.warn(`Inertia.replace() has been deprecated and will be removed in a future release. Please use Inertia.${i.method??"get"}() instead.`),this.visit(e,{preserveState:!0,...i,replace:!0})}post(e,i={},n={}){return this.visit(e,{preserveState:!0,...n,method:"post",data:i})}put(e,i={},n={}){return this.visit(e,{preserveState:!0,...n,method:"put",data:i})}patch(e,i={},n={}){return this.visit(e,{preserveState:!0,...n,method:"patch",data:i})}delete(e,i={}){return this.visit(e,{preserveState:!0,...i,method:"delete"})}remember(e,i="default"){ne||this.replaceState({...this.page,rememberedState:{...this.page?.rememberedState,[i]:e}})}restore(e="default"){if(!ne)return window.history.state?.rememberedState?.[e]}on(e,i){let n=o=>{let c=i(o);o.cancelable&&!o.defaultPrevented&&c===!1&&o.preventDefault()};return document.addEventListener(`inertia:${e}`,n),()=>document.removeEventListener(`inertia:${e}`,n)}};var he={buildDOMElement(t){let e=document.createElement("template");e.innerHTML=t;let i=e.content.firstChild;if(!t.startsWith("<script "))return i;let n=document.createElement("script");return n.innerHTML=i.innerHTML,i.getAttributeNames().forEach(o=>{n.setAttribute(o,i.getAttribute(o)||"")}),n},isInertiaManagedElement(t){return t.nodeType===Node.ELEMENT_NODE&&t.getAttribute("inertia")!==null},findMatchingElementIndex(t,e){let i=t.getAttribute("inertia");return i!==null?e.findIndex(n=>n.getAttribute("inertia")===i):-1},update:R(function(t){let e=t.map(n=>this.buildDOMElement(n));Array.from(document.head.childNodes).filter(n=>this.isInertiaManagedElement(n)).forEach(n=>{let o=this.findMatchingElementIndex(n,e);if(o===-1){n?.parentNode?.removeChild(n);return}let c=e.splice(o,1)[0];c&&!n.isEqualNode(c)&&n?.parentNode?.replaceChild(c,n)}),e.forEach(n=>document.head.appendChild(n))},1)};function M(t,e,i){let n={},o=0;function c(){let l=o+=1;return n[l]=[],l.toString()}function h(l){l===null||Object.keys(n).indexOf(l)===-1||(delete n[l],a())}function b(l,g=[]){l!==null&&Object.keys(n).indexOf(l)>-1&&(n[l]=g),a()}function E(){let l=e(""),g={...l?{title:`<title inertia="">${l}</title>`}:{}},L=Object.values(n).reduce((d,p)=>d.concat(p),[]).reduce((d,p)=>{if(p.indexOf("<")===-1)return d;if(p.indexOf("<title ")===0){let y=p.match(/(<title [^>]+>)(.*?)(<\/title>)/);return d.title=y?`${y[1]}${e(y[2])}${y[3]}`:p,d}let T=p.match(/ inertia="[^"]+"/);return T?d[T[0]]=p:d[Object.keys(d).length]=p,d},g);return Object.values(L)}function a(){t?i(E()):he.update(E())}return a(),{forceUpdate:a,createProvider:function(){let l=c();return{update:g=>b(l,g),disconnect:()=>h(l)}}}}var u=O(require("nprogress"),1),re=null;function ue(t){document.addEventListener("inertia:start",fe.bind(null,t)),document.addEventListener("inertia:progress",me),document.addEventListener("inertia:finish",ge)}function fe(t){re=setTimeout(()=>u.default.start(),t)}function me(t){u.default.isStarted()&&t.detail.progress?.percentage&&u.default.set(Math.max(u.default.status,t.detail.progress.percentage/100*.9))}function ge(t){if(clearTimeout(re),u.default.isStarted())t.detail.visit.completed?u.default.done():t.detail.visit.interrupted?u.default.set(0):t.detail.visit.cancelled&&(u.default.done(),u.default.remove());else return}function ve(t){let e=document.createElement("style");e.type="text/css",e.textContent=`
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${t};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${t}, 0 0 5px ${t};
      opacity: 1.0;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }

    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${t};
      border-left-color: ${t};
      border-radius: 50%;

      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,document.head.appendChild(e)}function j({delay:t=250,color:e="#29d",includeCSS:i=!0,showSpinner:n=!1}={}){ue(t),u.default.configure({showSpinner:n}),i&&ve(e)}function H(t){let e=t.currentTarget.tagName.toLowerCase()==="a";return!(t.target&&(t?.target).isContentEditable||t.defaultPrevented||e&&t.which>1||e&&t.altKey||e&&t.ctrlKey||e&&t.metaKey||e&&t.shiftKey)}var be=new A;
//# sourceMappingURL=index.js.map
