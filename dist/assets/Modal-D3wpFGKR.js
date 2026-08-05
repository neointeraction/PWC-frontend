var ve=e=>{throw TypeError(e)};var ne=(e,t,s)=>t.has(e)||ve("Cannot "+s);var o=(e,t,s)=>(ne(e,t,"read from private field"),s?s.call(e):t.get(e)),w=(e,t,s)=>t.has(e)?ve("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),b=(e,t,s,r)=>(ne(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),x=(e,t,s)=>(ne(e,t,"access private method"),s);import{aK as _e,aT as we,aU as O,aL as ae,aV as se,aP as ce,aW as le,aX as Se,aY as Fe,aZ as ie,a_ as Be,a$ as Ue,b0 as Re,aO as Me,r as p,aQ as Ie,w as We,g as i,aS as P,j as a,b1 as He,am as ze,M as Ne,b2 as Ae,l as Oe,b3 as Ve,b4 as Ke,aR as Ge,ap as Xe}from"./index-BUalwBCD.js";var M,d,oe,k,W,G,Q,_,re,X,Y,H,N,F,Z,h,te,de,ue,he,pe,fe,ge,be,Te,je,Ye=(je=class extends _e{constructor(t,s){super();w(this,h);w(this,M);w(this,d);w(this,oe);w(this,k);w(this,W);w(this,G);w(this,Q);w(this,_);w(this,re);w(this,X);w(this,Y);w(this,H);w(this,N);w(this,F);w(this,Z,new Set);this.options=s,b(this,M,t),b(this,_,null),b(this,Q,we()),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(o(this,d).addObserver(this),ke(o(this,d),this.options)?x(this,h,te).call(this):this.updateResult(),x(this,h,pe).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return xe(o(this,d),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return xe(o(this,d),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,x(this,h,fe).call(this),x(this,h,ge).call(this),o(this,d).removeObserver(this)}setOptions(t){const s=this.options,r=o(this,d);if(this.options=o(this,M).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof O(this.options.enabled,o(this,d))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");x(this,h,be).call(this),o(this,d).setOptions(this.options),s._defaulted&&!ae(this.options,s)&&o(this,M).getQueryCache().notify({type:"observerOptionsUpdated",query:o(this,d),observer:this});const n=this.hasListeners();n&&Ce(o(this,d),r,this.options,s)&&x(this,h,te).call(this),this.updateResult(),n&&(o(this,d)!==r||O(this.options.enabled,o(this,d))!==O(s.enabled,o(this,d))||se(this.options.staleTime,o(this,d))!==se(s.staleTime,o(this,d)))&&x(this,h,de).call(this);const l=x(this,h,ue).call(this);n&&(o(this,d)!==r||O(this.options.enabled,o(this,d))!==O(s.enabled,o(this,d))||l!==o(this,F))&&x(this,h,he).call(this,l)}getOptimisticResult(t){const s=o(this,M).getQueryCache().build(o(this,M),t),r=this.createResult(s,t);return Je(this,r)&&(b(this,k,r),b(this,G,this.options),b(this,W,o(this,d).state)),r}getCurrentResult(){return o(this,k)}trackResult(t,s){return new Proxy(t,{get:(r,n)=>(this.trackProp(n),s==null||s(n),n==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&o(this,Q).status==="pending"&&o(this,Q).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(r,n))})}trackProp(t){o(this,Z).add(t)}getCurrentQuery(){return o(this,d)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const s=o(this,M).defaultQueryOptions(t),r=o(this,M).getQueryCache().build(o(this,M),s);return r.fetch().then(()=>this.createResult(r,s))}fetch(t){return x(this,h,te).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),o(this,k)))}createResult(t,s){var K;const r=o(this,d),n=this.options,l=o(this,k),u=o(this,W),v=o(this,G),C=t!==r?t.state:o(this,oe),{state:$}=t;let f={...$},z=!1,g;if(s._optimisticResults){const j=this.hasListeners(),B=!j&&ke(t,s),U=j&&Ce(t,r,s,n);(B||U)&&(f={...f,...Ue($.data,t.options)}),s._optimisticResults==="isRestoring"&&(f.fetchStatus="idle")}let{error:y,errorUpdatedAt:E,status:S}=f;g=f.data;let R=!1;if(s.placeholderData!==void 0&&g===void 0&&S==="pending"){let j;l!=null&&l.isPlaceholderData&&s.placeholderData===(v==null?void 0:v.placeholderData)?(j=l.data,R=!0):j=typeof s.placeholderData=="function"?s.placeholderData((K=o(this,Y))==null?void 0:K.state.data,o(this,Y)):s.placeholderData,j!==void 0&&(S="success",g=Re(l==null?void 0:l.data,j,s),z=!0)}if(s.select&&g!==void 0&&!R)if(l&&g===(u==null?void 0:u.data)&&s.select===o(this,re))g=o(this,X);else try{b(this,re,s.select),g=s.select(g),g=Re(l==null?void 0:l.data,g,s),b(this,X,g),b(this,_,null)}catch(j){b(this,_,j)}o(this,_)&&(y=o(this,_),g=o(this,X),E=Date.now(),S="error");const D=f.fetchStatus==="fetching",J=S==="pending",A=S==="error",V=J&&D,q=g!==void 0,T={status:S,fetchStatus:f.fetchStatus,isPending:J,isSuccess:S==="success",isError:A,isInitialLoading:V,isLoading:V,data:g,dataUpdatedAt:f.dataUpdatedAt,error:y,errorUpdatedAt:E,failureCount:f.fetchFailureCount,failureReason:f.fetchFailureReason,errorUpdateCount:f.errorUpdateCount,isFetched:t.isFetched(),isFetchedAfterMount:f.dataUpdateCount>C.dataUpdateCount||f.errorUpdateCount>C.errorUpdateCount,isFetching:D,isRefetching:D&&!J,isLoadingError:A&&!q,isPaused:f.fetchStatus==="paused",isPlaceholderData:z,isRefetchError:A&&q,isStale:me(t,s),refetch:this.refetch,promise:o(this,Q),isEnabled:O(s.enabled,t)!==!1};if(this.options.experimental_prefetchInRender){const j=T.data!==void 0,B=T.status==="error"&&!j,U=I=>{B?I.reject(T.error):j&&I.resolve(T.data)},c=()=>{const I=b(this,Q,T.promise=we());U(I)},L=o(this,Q);switch(L.status){case"pending":t.queryHash===r.queryHash&&U(L);break;case"fulfilled":(B||T.data!==L.value)&&c();break;case"rejected":(!B||T.error!==L.reason)&&c();break}}return T}updateResult(){const t=o(this,k),s=this.createResult(o(this,d),this.options);if(b(this,W,o(this,d).state),b(this,G,this.options),o(this,W).data!==void 0&&b(this,Y,o(this,d)),ae(s,t))return;b(this,k,s);const r=()=>{if(!t)return!0;const{notifyOnChangeProps:n}=this.options,l=typeof n=="function"?n():n;if(l==="all"||!l&&!o(this,Z).size)return!0;const u=new Set(l??o(this,Z));return this.options.throwOnError&&u.add("error"),Object.keys(o(this,k)).some(v=>{const m=v;return o(this,k)[m]!==t[m]&&u.has(m)})};x(this,h,Te).call(this,{listeners:r()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&x(this,h,pe).call(this)}},M=new WeakMap,d=new WeakMap,oe=new WeakMap,k=new WeakMap,W=new WeakMap,G=new WeakMap,Q=new WeakMap,_=new WeakMap,re=new WeakMap,X=new WeakMap,Y=new WeakMap,H=new WeakMap,N=new WeakMap,F=new WeakMap,Z=new WeakMap,h=new WeakSet,te=function(t){x(this,h,be).call(this);let s=o(this,d).fetch(this.options,t);return t!=null&&t.throwOnError||(s=s.catch(ce)),s},de=function(){x(this,h,fe).call(this);const t=se(this.options.staleTime,o(this,d));if(le.isServer()||o(this,k).isStale||!Se(t))return;const r=Fe(o(this,k).dataUpdatedAt,t)+1;b(this,H,ie.setTimeout(()=>{o(this,k).isStale||this.updateResult()},r))},ue=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(o(this,d)):this.options.refetchInterval)??!1},he=function(t){x(this,h,ge).call(this),b(this,F,t),!(le.isServer()||O(this.options.enabled,o(this,d))===!1||!Se(o(this,F))||o(this,F)===0)&&b(this,N,ie.setInterval(()=>{(this.options.refetchIntervalInBackground||Be.isFocused())&&x(this,h,te).call(this)},o(this,F)))},pe=function(){x(this,h,de).call(this),x(this,h,he).call(this,x(this,h,ue).call(this))},fe=function(){o(this,H)!==void 0&&(ie.clearTimeout(o(this,H)),b(this,H,void 0))},ge=function(){o(this,N)!==void 0&&(ie.clearInterval(o(this,N)),b(this,N,void 0))},be=function(){const t=o(this,M).getQueryCache().build(o(this,M),this.options);if(t===o(this,d))return;const s=o(this,d);b(this,d,t),b(this,oe,t.state),this.hasListeners()&&(s==null||s.removeObserver(this),t.addObserver(this))},Te=function(t){Me.batch(()=>{t.listeners&&this.listeners.forEach(s=>{s(o(this,k))}),o(this,M).getQueryCache().notify({query:o(this,d),type:"observerResultsUpdated"})})},je);function Ze(e,t){return O(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&O(t.retryOnMount,e)===!1)}function ke(e,t){return Ze(e,t)||e.state.data!==void 0&&xe(e,t,t.refetchOnMount)}function xe(e,t,s){if(O(t.enabled,e)!==!1&&se(t.staleTime,e)!=="static"){const r=typeof s=="function"?s(e):s;return r==="always"||r!==!1&&me(e,t)}return!1}function Ce(e,t,s,r){return(e!==t||O(r.enabled,e)===!1)&&(!s.suspense||e.state.status!=="error")&&me(e,s)}function me(e,t){return O(t.enabled,e)!==!1&&e.isStaleByTime(se(t.staleTime,e))}function Je(e,t){return!ae(e.getCurrentResult(),t)}var Le=p.createContext(!1),qe=()=>p.useContext(Le);Le.Provider;function et(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var tt=p.createContext(et()),st=()=>p.useContext(tt),ot=(e,t,s)=>{const r=s!=null&&s.state.error&&typeof e.throwOnError=="function"?Ie(e.throwOnError,[s.state.error,s]):e.throwOnError;(e.suspense||e.experimental_prefetchInRender||r)&&(t.isReset()||(e.retryOnMount=!1))},rt=e=>{p.useEffect(()=>{e.clearReset()},[e])},it=({result:e,errorResetBoundary:t,throwOnError:s,query:r,suspense:n})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&(n&&e.data===void 0||Ie(s,[e.error,r])),nt=e=>{if(e.suspense){const s=n=>n==="static"?n:Math.max(n??1e3,1e3),r=e.staleTime;e.staleTime=typeof r=="function"?(...n)=>s(r(...n)):s(r),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},at=(e,t)=>e.isLoading&&e.isFetching&&!t,ct=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,Ee=(e,t,s)=>t.fetchOptimistic(e).catch(()=>{s.clearReset()});function lt(e,t,s){var g,y,E,S;const r=qe(),n=st(),l=We(),u=l.defaultQueryOptions(e);(y=(g=l.getDefaultOptions().queries)==null?void 0:g._experimental_beforeQuery)==null||y.call(g,u);const v=l.getQueryCache().get(u.queryHash),m=e.subscribed!==!1;u._optimisticResults=r?"isRestoring":m?"optimistic":void 0,nt(u),ot(u,n,v),rt(n);const C=!l.getQueryCache().get(u.queryHash),[$]=p.useState(()=>new t(l,u)),f=$.getOptimisticResult(u),z=!r&&m;if(p.useSyncExternalStore(p.useCallback(R=>{const D=z?$.subscribe(Me.batchCalls(R)):ce;return $.updateResult(),D},[$,z]),()=>$.getCurrentResult(),()=>$.getCurrentResult()),p.useEffect(()=>{$.setOptions(u)},[u,$]),ct(u,f))throw Ee(u,$,n);if(it({result:f,errorResetBoundary:n,throwOnError:u.throwOnError,query:v,suspense:u.suspense}))throw f.error;if((S=(E=l.getDefaultOptions().queries)==null?void 0:E._experimental_afterQuery)==null||S.call(E,u,f),u.experimental_prefetchInRender&&!le.isServer()&&at(f,r)){const R=C?Ee(u,$,n):v==null?void 0:v.promise;R==null||R.catch(ce).finally(()=>{$.updateResult()})}return u.notifyOnChangeProps?f:$.trackResult(f)}function Ut(e,t){return lt(e,Ye)}const dt=i.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`,ut=i.label`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$disabled:e})=>e?.6:1};
  user-select: none;
`,Pe=i.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`,ht=i.div`
  width: 18px;
  height: 18px;
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({theme:e})=>e.transition.fast};
  flex-shrink: 0;

  ${({theme:e,$checked:t,$indeterminate:s,$hasError:r})=>t||s?P`
          background-color: ${r?e.colors.danger:e.colors.primary};
          border: 1.5px solid ${r?e.colors.danger:e.colors.primary};
          color: #ffffff;
        `:P`
          background-color: ${e.colors.surface};
          border: 1.5px solid ${r?e.colors.danger:e.colors.border};
          color: transparent;

          &:hover {
            border-color: ${r?e.colors.danger:e.colors.primary};
            background-color: ${e.colors.surfaceHover};
          }
        `}

  ${Pe}:focus-visible + & {
    box-shadow: 0 0 0 3px
      ${({theme:e,$hasError:t})=>t?`${e.colors.danger}22`:`${e.colors.primary}22`};
    border-color: ${({theme:e,$hasError:t})=>t?e.colors.danger:e.colors.primary};
  }
`,pt=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,ft=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,gt=p.forwardRef(({label:e,error:t,checked:s,defaultChecked:r=!1,indeterminate:n=!1,disabled:l=!1,id:u,className:v,style:m,onChange:C,...$},f)=>{const z=p.useRef(null);p.useImperativeHandle(f,()=>z.current);const[g,y]=p.useState(s!==void 0?s:r);p.useEffect(()=>{s!==void 0&&y(s)},[s]),p.useEffect(()=>{z.current&&(z.current.indeterminate=!!n)},[n]);const E=D=>{l||(s===void 0&&y(D.target.checked),C&&C(D))},S=u||`checkbox-${Math.random().toString(36).slice(2,9)}`,R=s!==void 0?s:g;return a.jsxs(dt,{children:[a.jsxs(ut,{$disabled:l,htmlFor:S,className:v,style:m,children:[a.jsx(Pe,{ref:z,type:"checkbox",id:S,checked:R,disabled:l,onChange:E,...$}),a.jsx(ht,{$checked:R,$indeterminate:n,$hasError:!!t,$disabled:l,children:n?a.jsx(He,{size:14}):R&&a.jsx(ze,{size:14})}),e&&a.jsx(pt,{children:e})]}),t&&a.jsx(ft,{role:"alert",children:t})]})});gt.displayName="Checkbox";const bt=i.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({$fullWidth:e})=>e?"100%":"auto"};
  position: relative;
`,xt=i.label`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,mt=i.div`
  position: relative;
  width: 100%;
`,$t=i.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.text};
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1.5px solid
    ${({theme:e,$hasError:t,$isOpen:s})=>t?e.colors.danger:s?e.colors.borderFocus:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  outline: none;
  cursor: ${({$isDisabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$isDisabled:e})=>e?.6:1};
  transition: all ${({theme:e})=>e.transition.fast};
  user-select: none;

  &:focus-visible {
    border-color: ${({theme:e,$hasError:t})=>t?e.colors.danger:e.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({theme:e,$hasError:t})=>t?`${e.colors.danger}22`:`${e.colors.primary}22`};
  }

  ${({$isOpen:e,theme:t,$hasError:s})=>e&&P`
      box-shadow: 0 0 0 3px
        ${s?`${t.colors.danger}22`:`${t.colors.primary}22`};
    `}
`,yt=i.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({theme:e,$isPlaceholder:t})=>t?e.colors.textMuted:e.colors.text};
`,vt=i.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.textMuted};
  transition: transform ${({theme:e})=>e.transition.fast};
  transform: ${({$isOpen:e})=>e?"rotate(180deg)":"rotate(0deg)"};
`,wt=i.ul`
  position: fixed;
  z-index: 99999;
  max-height: 240px;
  overflow-y: auto;
  margin: 0;
  padding: 4px;
  list-style: none;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};

  /* Scrollbar Styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({theme:e})=>e.colors.border};
    border-radius: 3px;
  }
`,St=i.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e,$isSelected:t,$isDisabled:s})=>s?e.colors.textMuted:t?e.colors.primary:e.colors.text};
  font-weight: ${({theme:e,$isSelected:t})=>t?e.fontWeight.semibold:e.fontWeight.normal};
  background-color: ${({theme:e,$isSelected:t})=>t?`${e.colors.primary}12`:"transparent"};
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  cursor: ${({$isDisabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$isDisabled:e})=>e?.55:1};
  transition: background-color ${({theme:e})=>e.transition.fast};
  user-select: none;

  &:hover {
    background-color: ${({theme:e,$isSelected:t,$isDisabled:s})=>s?"transparent":t?`${e.colors.primary}20`:e.colors.surfaceHover};
  }
`,Rt=i.span`
  opacity: 0.65;
  font-size: 11px;
  margin-left: 6px;
`,kt=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,Ct=Ne.forwardRef(({label:e,options:t,value:s,defaultValue:r,onChange:n,placeholder:l="Select an option",error:u,fullWidth:v=!0,disabled:m=!1,name:C,id:$,style:f,className:z},g)=>{const[y,E]=p.useState(!1),[S,R]=p.useState(s!==void 0?s:r||""),[D,J]=p.useState({}),A=p.useRef(null),V=p.useRef(null),q=p.useRef(null);p.useEffect(()=>{s!==void 0&&R(s)},[s]);const ee=p.useCallback(()=>{if(!V.current)return;const c=V.current.getBoundingClientRect(),I=window.innerHeight-c.bottom<220&&c.top>220;J({position:"fixed",left:`${c.left}px`,width:`${c.width}px`,zIndex:99999,...I?{bottom:`${window.innerHeight-c.top+4}px`,top:"auto",boxShadow:"0 -10px 25px -5px rgba(0, 0, 0, 0.2), 0 -8px 10px -6px rgba(0, 0, 0, 0.1)"}:{top:`${c.bottom+4}px`,bottom:"auto",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"}})},[]);p.useEffect(()=>{if(!y)return;ee();const c=()=>{ee()};return window.addEventListener("scroll",c,!0),window.addEventListener("resize",c),()=>{window.removeEventListener("scroll",c,!0),window.removeEventListener("resize",c)}},[y,ee]),p.useEffect(()=>{if(!y)return;const c=L=>{var $e,ye;const I=L.target,De=($e=A.current)==null?void 0:$e.contains(I),Qe=(ye=q.current)==null?void 0:ye.contains(I);!De&&!Qe&&E(!1)};return document.addEventListener("mousedown",c),()=>{document.removeEventListener("mousedown",c)}},[y]);const T=()=>{m||(y||ee(),E(c=>!c))},K=t.find(c=>c.value===S),j=c=>{m||c.disabled||(R(c.value),E(!1),n&&n({target:{value:c.value,name:C}}))},B=c=>{m||(c.key==="Enter"||c.key===" "?(c.preventDefault(),T()):c.key==="Escape"&&E(!1))},U=$||`select-${Math.random().toString(36).slice(2,9)}`;return a.jsxs(bt,{$fullWidth:v,style:f,className:z,ref:g,children:[e&&a.jsx(xt,{htmlFor:U,children:e}),a.jsxs(mt,{ref:A,children:[a.jsxs($t,{ref:V,id:U,type:"button",$isOpen:y,$hasError:!!u,$isDisabled:m,disabled:m,onClick:T,onKeyDown:B,"aria-haspopup":"listbox","aria-expanded":y,children:[a.jsx(yt,{$isPlaceholder:!K,children:K?K.label:l}),a.jsx(vt,{$isOpen:y,children:a.jsx(Ae,{size:18})})]}),y&&Oe.createPortal(a.jsx(wt,{ref:q,role:"listbox",style:D,children:t.map(c=>{const L=c.value===S,I=!!c.disabled;return a.jsxs(St,{role:"option","aria-selected":L,"aria-disabled":I,$isSelected:L,$isDisabled:I,onClick:()=>j(c),children:[a.jsxs("span",{children:[c.label,I&&a.jsx(Rt,{children:"(Coming Soon)"})]}),L&&a.jsx(ze,{size:16})]},c.value)})}),document.body)]}),u&&a.jsx(kt,{role:"alert",children:u})]})});Ct.displayName="Select";const Wt=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,Ht=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Nt=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,At=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Vt=i.div`
  width: 80px;
`,Kt=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,Gt=i.button`
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e,$active:t})=>t?e.fontWeight.semibold:e.fontWeight.normal};
  color: ${({theme:e,$active:t})=>t?e.colors.textInverse:e.colors.textSecondary};
  background-color: ${({theme:e,$active:t})=>t?e.colors.primary:"transparent"};
  border: 1.5px solid
    ${({theme:e,$active:t})=>t?e.colors.primary:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover:not(:disabled) {
    background-color: ${({theme:e,$active:t})=>t?e.colors.primaryHover:e.colors.surfaceHover};
    border-color: ${({theme:e,$active:t})=>t?e.colors.primaryHover:e.colors.textMuted};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Xt=i.div`
  width: 100%;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  background-color: ${({theme:e})=>e.colors.surface};
  overflow: hidden;
`,Yt=i.div`
  width: 100%;
  overflow-x: auto;
`,Zt=i.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({theme:e})=>e.fontSize.base};
`,Jt=i.thead`
  background-color: ${({theme:e})=>e.colors.background};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  th {
    padding: 12px 24px;
    text-align: left;
    font-size: ${({theme:e})=>e.fontSize.sm};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.textSecondary};
    white-space: nowrap;
    user-select: none;
    min-width: 250px;
  }

  th.sortable {
    cursor: pointer;
    &:hover {
      color: ${({theme:e})=>e.colors.text};
    }
  }
`,qt=i.tbody`
  tr {
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    transition: background-color ${({theme:e})=>e.transition.fast};

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: ${({theme:e})=>e.colors.surfaceHover};
    }
  }

  td {
    padding: 14px 24px;
    color: ${({theme:e})=>e.colors.text};
    vertical-align: middle;
    white-space: nowrap;
    min-width: 250px;
  }
`,es=i.div`
  padding: ${({theme:e})=>e.spacing.xxxl} ${({theme:e})=>e.spacing.xl};
  text-align: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: ${({theme:e})=>e.fontSize.base};
`,ts=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`;i.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 6px;
  border-radius: 4px;
  color: ${({theme:e})=>e.colors.textSecondary};
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;const ss=i.div`
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`,Et={default:P`
    background-color: ${({theme:e})=>e.colors.surfaceHover};
    color: ${({theme:e})=>e.colors.textSecondary};
  `,success:P`
    background-color: ${({theme:e})=>e.colors.successLight};
    color: ${({theme:e})=>e.colors.success};
  `,warning:P`
    background-color: ${({theme:e})=>e.colors.warningLight};
    color: ${({theme:e})=>e.colors.warning};
  `,danger:P`
    background-color: ${({theme:e})=>e.colors.dangerLight};
    color: ${({theme:e})=>e.colors.danger};
  `,info:P`
    background-color: ${({theme:e})=>e.colors.infoLight};
    color: ${({theme:e})=>e.colors.info};
  `,primary:P`
    background-color: ${({theme:e})=>e.colors.primaryLight};
    color: ${({theme:e})=>e.colors.primary};
  `},jt=i.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  border-radius: ${({theme:e})=>e.borderRadius.full};
  white-space: nowrap;

  ${({$size:e})=>e==="sm"?P`
          font-size: 11px;
          padding: 2px 8px;
        `:P`
          font-size: ${({theme:t})=>t.fontSize.sm};
          padding: 3px 10px;
        `}

  ${({$variant:e})=>Et[e]}
`,os=({variant:e="default",size:t="md",children:s,dot:r})=>a.jsxs(jt,{$variant:e,$size:t,children:[r&&a.jsx("svg",{width:"6",height:"6",viewBox:"0 0 6 6",fill:"currentColor",children:a.jsx("circle",{cx:"3",cy:"3",r:"3"})}),s]}),Mt=Ve`
  from { opacity: 0; }
  to { opacity: 1; }
`,It=i.div`
  position: fixed;
  inset: 0;
  background-color: ${({theme:e})=>e.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({theme:e})=>e.zIndex.overlay};
  padding: ${({theme:e})=>e.spacing.lg};
  animation: ${Mt} 0.15s ease;
`,zt=i.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.xl};
  box-shadow: ${({theme:e})=>e.colors.shadowLg};
  width: 100%;
  max-width: ${({$size:e})=>e==="sm"?"400px":e==="md"?"560px":e==="xl"?"900px":e==="2xl"?"1140px":e==="3xl"?"1440px":"720px"};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: ${({theme:e})=>e.zIndex.modal};
`,Ot=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.xl};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  flex-shrink: 0;
`,Tt=i.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Lt=i.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 4px;
`,Pt=i.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  color: ${({theme:e})=>e.colors.textMuted};
  transition: all ${({theme:e})=>e.transition.fast};
  flex-shrink: 0;

  &:hover {
    background-color: ${({theme:e})=>e.colors.surfaceHover};
    color: ${({theme:e})=>e.colors.text};
  }
`,Dt=i.div`
  overflow-y: auto;
  flex: 1;

  /* Custom scrollbar flush against the right edge */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({theme:e})=>e.colors.border};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({theme:e})=>e.colors.textMuted};
  }
`,Qt=i.div`
  padding: ${({theme:e})=>e.spacing.xl};
`,_t=i.div`
  padding: ${({theme:e})=>e.spacing.lg} ${({theme:e})=>e.spacing.xl};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-shrink: 0;
`,rs=({isOpen:e,onClose:t,title:s,subtitle:r,size:n="md",footer:l,children:u,closeOnBackdrop:v=!0})=>{const m=p.useCallback(C=>{C.key==="Escape"&&t()},[t]);return p.useEffect(()=>(e&&(document.addEventListener("keydown",m),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",m),document.body.style.overflow=""}),[e,m]),Oe.createPortal(a.jsx(Ke,{children:e&&a.jsx(It,{onClick:v?t:void 0,role:"dialog","aria-modal":"true","aria-labelledby":"modal-title",children:a.jsx(Ge.div,{initial:{opacity:0,scale:.95,y:8},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:8},transition:{duration:.18,ease:"easeOut"},style:{width:"100%",display:"flex",justifyContent:"center"},onClick:C=>C.stopPropagation(),children:a.jsxs(zt,{$size:n,children:[(s||r)&&a.jsxs(Ot,{children:[a.jsxs("div",{children:[s&&a.jsx(Tt,{id:"modal-title",children:s}),r&&a.jsx(Lt,{children:r})]}),a.jsx(Pt,{onClick:t,"aria-label":"Close modal",children:a.jsx(Xe,{size:20})})]}),a.jsx(Dt,{children:a.jsx(Qt,{children:u})}),l&&a.jsx(_t,{children:l})]})})})}),document.body)};export{ts as A,os as B,gt as C,rs as M,Wt as P,Nt as R,Ct as S,Xt as T,Ht as a,At as b,Vt as c,Kt as d,Gt as e,Yt as f,Zt as g,Jt as h,qt as i,es as j,ss as k,Ut as u};
