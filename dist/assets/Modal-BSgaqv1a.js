var mt=t=>{throw TypeError(t)};var tt=(t,e,s)=>e.has(t)||mt("Cannot "+s);var i=(t,e,s)=>(tt(t,e,"read from private field"),s?s.call(t):e.get(t)),p=(t,e,s)=>e.has(t)?mt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),h=(t,e,s,r)=>(tt(t,e,"write to private field"),r?r.call(t,s):e.set(t,s),s),u=(t,e,s)=>(tt(t,e,"access private method"),s);import{aN as kt,bg as xt,bh as R,aO as et,bi as W,aS as st,bj as it,bk as yt,bl as Tt,bm as Y,bn as $t,bo as jt,bp as vt,aR as Ct,r as E,aT as Mt,y as Qt,g as I,bq as _t,p as Pt,j as y,br as Dt,aU as Ft,aw as Ut}from"./index-DnMR83cZ.js";var m,a,V,g,Q,D,M,T,K,F,U,_,P,$,L,o,H,rt,at,nt,ot,ct,lt,ht,It,wt,Lt=(wt=class extends kt{constructor(e,s){super();p(this,o);p(this,m);p(this,a);p(this,V);p(this,g);p(this,Q);p(this,D);p(this,M);p(this,T);p(this,K);p(this,F);p(this,U);p(this,_);p(this,P);p(this,$);p(this,L,new Set);this.options=s,h(this,m,e),h(this,T,null),h(this,M,xt()),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(i(this,a).addObserver(this),Rt(i(this,a),this.options)?u(this,o,H).call(this):this.updateResult(),u(this,o,ot).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return dt(i(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return dt(i(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,u(this,o,ct).call(this),u(this,o,lt).call(this),i(this,a).removeObserver(this)}setOptions(e){const s=this.options,r=i(this,a);if(this.options=i(this,m).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof R(this.options.enabled,i(this,a))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");u(this,o,ht).call(this),i(this,a).setOptions(this.options),s._defaulted&&!et(this.options,s)&&i(this,m).getQueryCache().notify({type:"observerOptionsUpdated",query:i(this,a),observer:this});const n=this.hasListeners();n&&St(i(this,a),r,this.options,s)&&u(this,o,H).call(this),this.updateResult(),n&&(i(this,a)!==r||R(this.options.enabled,i(this,a))!==R(s.enabled,i(this,a))||W(this.options.staleTime,i(this,a))!==W(s.staleTime,i(this,a)))&&u(this,o,rt).call(this);const c=u(this,o,at).call(this);n&&(i(this,a)!==r||R(this.options.enabled,i(this,a))!==R(s.enabled,i(this,a))||c!==i(this,$))&&u(this,o,nt).call(this,c)}getOptimisticResult(e){const s=i(this,m).getQueryCache().build(i(this,m),e),r=this.createResult(s,e);return Nt(this,r)&&(h(this,g,r),h(this,D,this.options),h(this,Q,i(this,a).state)),r}getCurrentResult(){return i(this,g)}trackResult(e,s){return new Proxy(e,{get:(r,n)=>(this.trackProp(n),s==null||s(n),n==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&i(this,M).status==="pending"&&i(this,M).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(r,n))})}trackProp(e){i(this,L).add(e)}getCurrentQuery(){return i(this,a)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const s=i(this,m).defaultQueryOptions(e),r=i(this,m).getQueryCache().build(i(this,m),s);return r.fetch().then(()=>this.createResult(r,s))}fetch(e){return u(this,o,H).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),i(this,g)))}createResult(e,s){var bt;const r=i(this,a),n=this.options,c=i(this,g),l=i(this,Q),x=i(this,D),C=e!==r?e.state:i(this,V),{state:b}=e;let d={...b},B=!1,f;if(s._optimisticResults){const v=this.hasListeners(),A=!v&&Rt(e,s),G=v&&St(e,r,s,n);(A||G)&&(d={...d,...jt(b.data,e.options)}),s._optimisticResults==="isRestoring"&&(d.fetchStatus="idle")}let{error:N,errorUpdatedAt:j,status:w}=d;f=d.data;let O=!1;if(s.placeholderData!==void 0&&f===void 0&&w==="pending"){let v;c!=null&&c.isPlaceholderData&&s.placeholderData===(x==null?void 0:x.placeholderData)?(v=c.data,O=!0):v=typeof s.placeholderData=="function"?s.placeholderData((bt=i(this,U))==null?void 0:bt.state.data,i(this,U)):s.placeholderData,v!==void 0&&(w="success",f=vt(c==null?void 0:c.data,v,s),B=!0)}if(s.select&&f!==void 0&&!O)if(c&&f===(l==null?void 0:l.data)&&s.select===i(this,K))f=i(this,F);else try{h(this,K,s.select),f=s.select(f),f=vt(c==null?void 0:c.data,f,s),h(this,F,f),h(this,T,null)}catch(v){h(this,T,v)}i(this,T)&&(N=i(this,T),f=i(this,F),j=Date.now(),w="error");const z=d.fetchStatus==="fetching",Z=w==="pending",q=w==="error",ft=Z&&z,pt=f!==void 0,k={status:w,fetchStatus:d.fetchStatus,isPending:Z,isSuccess:w==="success",isError:q,isInitialLoading:ft,isLoading:ft,data:f,dataUpdatedAt:d.dataUpdatedAt,error:N,errorUpdatedAt:j,failureCount:d.fetchFailureCount,failureReason:d.fetchFailureReason,errorUpdateCount:d.errorUpdateCount,isFetched:e.isFetched(),isFetchedAfterMount:d.dataUpdateCount>C.dataUpdateCount||d.errorUpdateCount>C.errorUpdateCount,isFetching:z,isRefetching:z&&!Z,isLoadingError:q&&!pt,isPaused:d.fetchStatus==="paused",isPlaceholderData:B,isRefetchError:q&&pt,isStale:ut(e,s),refetch:this.refetch,promise:i(this,M),isEnabled:R(s.enabled,e)!==!1};if(this.options.experimental_prefetchInRender){const v=k.data!==void 0,A=k.status==="error"&&!v,G=X=>{A?X.reject(k.error):v&&X.resolve(k.data)},gt=()=>{const X=h(this,M,k.promise=xt());G(X)},J=i(this,M);switch(J.status){case"pending":e.queryHash===r.queryHash&&G(J);break;case"fulfilled":(A||k.data!==J.value)&&gt();break;case"rejected":(!A||k.error!==J.reason)&&gt();break}}return k}updateResult(){const e=i(this,g),s=this.createResult(i(this,a),this.options);if(h(this,Q,i(this,a).state),h(this,D,this.options),i(this,Q).data!==void 0&&h(this,U,i(this,a)),et(s,e))return;h(this,g,s);const r=()=>{if(!e)return!0;const{notifyOnChangeProps:n}=this.options,c=typeof n=="function"?n():n;if(c==="all"||!c&&!i(this,L).size)return!0;const l=new Set(c??i(this,L));return this.options.throwOnError&&l.add("error"),Object.keys(i(this,g)).some(x=>{const S=x;return i(this,g)[S]!==e[S]&&l.has(S)})};u(this,o,It).call(this,{listeners:r()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&u(this,o,ot).call(this)}},m=new WeakMap,a=new WeakMap,V=new WeakMap,g=new WeakMap,Q=new WeakMap,D=new WeakMap,M=new WeakMap,T=new WeakMap,K=new WeakMap,F=new WeakMap,U=new WeakMap,_=new WeakMap,P=new WeakMap,$=new WeakMap,L=new WeakMap,o=new WeakSet,H=function(e){u(this,o,ht).call(this);let s=i(this,a).fetch(this.options,e);return e!=null&&e.throwOnError||(s=s.catch(st)),s},rt=function(){u(this,o,ct).call(this);const e=W(this.options.staleTime,i(this,a));if(it.isServer()||i(this,g).isStale||!yt(e))return;const r=Tt(i(this,g).dataUpdatedAt,e)+1;h(this,_,Y.setTimeout(()=>{i(this,g).isStale||this.updateResult()},r))},at=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(i(this,a)):this.options.refetchInterval)??!1},nt=function(e){u(this,o,lt).call(this),h(this,$,e),!(it.isServer()||R(this.options.enabled,i(this,a))===!1||!yt(i(this,$))||i(this,$)===0)&&h(this,P,Y.setInterval(()=>{(this.options.refetchIntervalInBackground||$t.isFocused())&&u(this,o,H).call(this)},i(this,$)))},ot=function(){u(this,o,rt).call(this),u(this,o,nt).call(this,u(this,o,at).call(this))},ct=function(){i(this,_)!==void 0&&(Y.clearTimeout(i(this,_)),h(this,_,void 0))},lt=function(){i(this,P)!==void 0&&(Y.clearInterval(i(this,P)),h(this,P,void 0))},ht=function(){const e=i(this,m).getQueryCache().build(i(this,m),this.options);if(e===i(this,a))return;const s=i(this,a);h(this,a,e),h(this,V,e.state),this.hasListeners()&&(s==null||s.removeObserver(this),e.addObserver(this))},It=function(e){Ct.batch(()=>{e.listeners&&this.listeners.forEach(s=>{s(i(this,g))}),i(this,m).getQueryCache().notify({query:i(this,a),type:"observerResultsUpdated"})})},wt);function Bt(t,e){return R(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&R(e.retryOnMount,t)===!1)}function Rt(t,e){return Bt(t,e)||t.state.data!==void 0&&dt(t,e,e.refetchOnMount)}function dt(t,e,s){if(R(e.enabled,t)!==!1&&W(e.staleTime,t)!=="static"){const r=typeof s=="function"?s(t):s;return r==="always"||r!==!1&&ut(t,e)}return!1}function St(t,e,s,r){return(t!==e||R(r.enabled,t)===!1)&&(!s.suspense||t.state.status!=="error")&&ut(t,s)}function ut(t,e){return R(e.enabled,t)!==!1&&t.isStaleByTime(W(e.staleTime,t))}function Nt(t,e){return!et(t.getCurrentResult(),e)}var Ot=E.createContext(!1),zt=()=>E.useContext(Ot);Ot.Provider;function At(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var Ht=E.createContext(At()),Wt=()=>E.useContext(Ht),Vt=(t,e,s)=>{const r=s!=null&&s.state.error&&typeof t.throwOnError=="function"?Mt(t.throwOnError,[s.state.error,s]):t.throwOnError;(t.suspense||t.experimental_prefetchInRender||r)&&(e.isReset()||(t.retryOnMount=!1))},Kt=t=>{E.useEffect(()=>{t.clearReset()},[t])},Gt=({result:t,errorResetBoundary:e,throwOnError:s,query:r,suspense:n})=>t.isError&&!e.isReset()&&!t.isFetching&&r&&(n&&t.data===void 0||Mt(s,[t.error,r])),Jt=t=>{if(t.suspense){const s=n=>n==="static"?n:Math.max(n??1e3,1e3),r=t.staleTime;t.staleTime=typeof r=="function"?(...n)=>s(r(...n)):s(r),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},Xt=(t,e)=>t.isLoading&&t.isFetching&&!e,Yt=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,Et=(t,e,s)=>e.fetchOptimistic(t).catch(()=>{s.clearReset()});function Zt(t,e,s){var f,N,j,w;const r=zt(),n=Wt(),c=Qt(),l=c.defaultQueryOptions(t);(N=(f=c.getDefaultOptions().queries)==null?void 0:f._experimental_beforeQuery)==null||N.call(f,l);const x=c.getQueryCache().get(l.queryHash),S=t.subscribed!==!1;l._optimisticResults=r?"isRestoring":S?"optimistic":void 0,Jt(l),Vt(l,n,x),Kt(n);const C=!c.getQueryCache().get(l.queryHash),[b]=E.useState(()=>new e(c,l)),d=b.getOptimisticResult(l),B=!r&&S;if(E.useSyncExternalStore(E.useCallback(O=>{const z=B?b.subscribe(Ct.batchCalls(O)):st;return b.updateResult(),z},[b,B]),()=>b.getCurrentResult(),()=>b.getCurrentResult()),E.useEffect(()=>{b.setOptions(l)},[l,b]),Yt(l,d))throw Et(l,b,n);if(Gt({result:d,errorResetBoundary:n,throwOnError:l.throwOnError,query:x,suspense:l.suspense}))throw d.error;if((w=(j=c.getDefaultOptions().queries)==null?void 0:j._experimental_afterQuery)==null||w.call(j,l,d),l.experimental_prefetchInRender&&!it.isServer()&&Xt(d,r)){const O=C?Et(l,b,n):x==null?void 0:x.promise;O==null||O.catch(st).finally(()=>{b.updateResult()})}return l.notifyOnChangeProps?d:b.trackResult(d)}function ue(t,e){return Zt(t,Lt)}const qt=_t`
  from { opacity: 0; }
  to { opacity: 1; }
`,te=I.div`
  position: fixed;
  inset: 0;
  background-color: ${({theme:t})=>t.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({theme:t})=>t.zIndex.overlay};
  padding: ${({theme:t})=>t.spacing.lg};
  animation: ${qt} 0.15s ease;
`,ee=I.div`
  background-color: ${({theme:t})=>t.colors.surface};
  border: 1px solid ${({theme:t})=>t.colors.border};
  border-radius: ${({theme:t})=>t.borderRadius.xl};
  box-shadow: ${({theme:t})=>t.colors.shadowLg};
  width: 100%;
  max-width: ${({$size:t})=>t==="sm"?"400px":t==="md"?"560px":t==="xl"?"900px":t==="2xl"?"1140px":t==="3xl"?"1440px":"720px"};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: ${({theme:t})=>t.zIndex.modal};
`,se=I.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:t})=>t.spacing.md};
  padding: ${({theme:t})=>t.spacing.xl};
  border-bottom: 1px solid ${({theme:t})=>t.colors.border};
  background-color: ${({theme:t})=>t.colors.surface};
  flex-shrink: 0;
`,ie=I.h2`
  font-size: ${({theme:t})=>t.fontSize.xl};
  font-weight: ${({theme:t})=>t.fontWeight.semibold};
  color: ${({theme:t})=>t.colors.text};
`,re=I.p`
  font-size: ${({theme:t})=>t.fontSize.sm};
  color: ${({theme:t})=>t.colors.textSecondary};
  margin-top: 4px;
`,ae=I.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({theme:t})=>t.borderRadius.md};
  color: ${({theme:t})=>t.colors.textMuted};
  transition: all ${({theme:t})=>t.transition.fast};
  flex-shrink: 0;

  &:hover {
    background-color: ${({theme:t})=>t.colors.surfaceHover};
    color: ${({theme:t})=>t.colors.text};
  }
`,ne=I.div`
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
    background-color: ${({theme:t})=>t.colors.border};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({theme:t})=>t.colors.textMuted};
  }
`,oe=I.div`
  padding: ${({theme:t})=>t.spacing.xl};
`,ce=I.div`
  padding: ${({theme:t})=>t.spacing.lg} ${({theme:t})=>t.spacing.xl};
  border-top: 1px solid ${({theme:t})=>t.colors.border};
  background-color: ${({theme:t})=>t.colors.surface};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:t})=>t.spacing.sm};
  flex-shrink: 0;
`,fe=({isOpen:t,onClose:e,title:s,subtitle:r,size:n="md",footer:c,children:l,closeOnBackdrop:x=!0})=>{const S=E.useCallback(C=>{C.key==="Escape"&&e()},[e]);return E.useEffect(()=>(t&&(document.addEventListener("keydown",S),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",S),document.body.style.overflow=""}),[t,S]),Pt.createPortal(y.jsx(Dt,{children:t&&y.jsx(te,{onClick:x?e:void 0,role:"dialog","aria-modal":"true","aria-labelledby":"modal-title",children:y.jsx(Ft.div,{initial:{opacity:0,scale:.95,y:8},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:8},transition:{duration:.18,ease:"easeOut"},style:{width:"100%",display:"flex",justifyContent:"center"},onClick:C=>C.stopPropagation(),children:y.jsxs(ee,{$size:n,children:[(s||r)&&y.jsxs(se,{children:[y.jsxs("div",{children:[s&&y.jsx(ie,{id:"modal-title",children:s}),r&&y.jsx(re,{children:r})]}),y.jsx(ae,{onClick:e,"aria-label":"Close modal",children:y.jsx(Ut,{size:20})})]}),y.jsx(ne,{children:y.jsx(oe,{children:l})}),c&&y.jsx(ce,{children:c})]})})})}),document.body)};export{fe as M,ue as u};
