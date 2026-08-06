var gt=t=>{throw TypeError(t)};var q=(t,e,s)=>e.has(t)||gt("Cannot "+s);var r=(t,e,s)=>(q(t,e,"read from private field"),s?s.call(t):e.get(t)),p=(t,e,s)=>e.has(t)?gt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),l=(t,e,s,i)=>(q(t,e,"write to private field"),i?i.call(t,s):e.set(t,s),s),d=(t,e,s)=>(q(t,e,"access private method"),s);import{aN as Mt,aX as mt,aY as x,aO as tt,aZ as A,aS as et,a_ as st,a$ as vt,b0 as Tt,b1 as Z,b2 as $t,b3 as Qt,b4 as xt,aR as Ct,r as E,aT as wt,y as _t,g as C,b5 as kt}from"./index-BLYAqq6p.js";var m,a,W,g,Q,F,S,I,V,U,D,_,k,M,P,n,H,rt,it,at,nt,ot,ht,ct,Ot,Et,Ft=(Et=class extends Mt{constructor(e,s){super();p(this,n);p(this,m);p(this,a);p(this,W);p(this,g);p(this,Q);p(this,F);p(this,S);p(this,I);p(this,V);p(this,U);p(this,D);p(this,_);p(this,k);p(this,M);p(this,P,new Set);this.options=s,l(this,m,e),l(this,I,null),l(this,S,mt()),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,a).addObserver(this),yt(r(this,a),this.options)?d(this,n,H).call(this):this.updateResult(),d(this,n,nt).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return lt(r(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return lt(r(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,d(this,n,ot).call(this),d(this,n,ht).call(this),r(this,a).removeObserver(this)}setOptions(e){const s=this.options,i=r(this,a);if(this.options=r(this,m).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof x(this.options.enabled,r(this,a))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");d(this,n,ct).call(this),r(this,a).setOptions(this.options),s._defaulted&&!tt(this.options,s)&&r(this,m).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,a),observer:this});const o=this.hasListeners();o&&Rt(r(this,a),i,this.options,s)&&d(this,n,H).call(this),this.updateResult(),o&&(r(this,a)!==i||x(this.options.enabled,r(this,a))!==x(s.enabled,r(this,a))||A(this.options.staleTime,r(this,a))!==A(s.staleTime,r(this,a)))&&d(this,n,rt).call(this);const h=d(this,n,it).call(this);o&&(r(this,a)!==i||x(this.options.enabled,r(this,a))!==x(s.enabled,r(this,a))||h!==r(this,M))&&d(this,n,at).call(this,h)}getOptimisticResult(e){const s=r(this,m).getQueryCache().build(r(this,m),e),i=this.createResult(s,e);return Dt(this,i)&&(l(this,g,i),l(this,F,this.options),l(this,Q,r(this,a).state)),i}getCurrentResult(){return r(this,g)}trackResult(e,s){return new Proxy(e,{get:(i,o)=>(this.trackProp(o),s==null||s(o),o==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&r(this,S).status==="pending"&&r(this,S).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(i,o))})}trackProp(e){r(this,P).add(e)}getCurrentQuery(){return r(this,a)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const s=r(this,m).defaultQueryOptions(e),i=r(this,m).getQueryCache().build(r(this,m),s);return i.fetch().then(()=>this.createResult(i,s))}fetch(e){return d(this,n,H).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,g)))}createResult(e,s){var pt;const i=r(this,a),o=this.options,h=r(this,g),c=r(this,Q),y=r(this,F),L=e!==i?e.state:r(this,W),{state:b}=e;let u={...b},B=!1,f;if(s._optimisticResults){const v=this.hasListeners(),z=!v&&yt(e,s),K=v&&Rt(e,i,s,o);(z||K)&&(u={...u,...Qt(b.data,e.options)}),s._optimisticResults==="isRestoring"&&(u.fetchStatus="idle")}let{error:N,errorUpdatedAt:$,status:R}=u;f=u.data;let w=!1;if(s.placeholderData!==void 0&&f===void 0&&R==="pending"){let v;h!=null&&h.isPlaceholderData&&s.placeholderData===(y==null?void 0:y.placeholderData)?(v=h.data,w=!0):v=typeof s.placeholderData=="function"?s.placeholderData((pt=r(this,D))==null?void 0:pt.state.data,r(this,D)):s.placeholderData,v!==void 0&&(R="success",f=xt(h==null?void 0:h.data,v,s),B=!0)}if(s.select&&f!==void 0&&!w)if(h&&f===(c==null?void 0:c.data)&&s.select===r(this,V))f=r(this,U);else try{l(this,V,s.select),f=s.select(f),f=xt(h==null?void 0:h.data,f,s),l(this,U,f),l(this,I,null)}catch(v){l(this,I,v)}r(this,I)&&(N=r(this,I),f=r(this,U),$=Date.now(),R="error");const j=u.fetchStatus==="fetching",G=R==="pending",J=R==="error",dt=G&&j,ft=f!==void 0,O={status:R,fetchStatus:u.fetchStatus,isPending:G,isSuccess:R==="success",isError:J,isInitialLoading:dt,isLoading:dt,data:f,dataUpdatedAt:u.dataUpdatedAt,error:N,errorUpdatedAt:$,failureCount:u.fetchFailureCount,failureReason:u.fetchFailureReason,errorUpdateCount:u.errorUpdateCount,isFetched:e.isFetched(),isFetchedAfterMount:u.dataUpdateCount>L.dataUpdateCount||u.errorUpdateCount>L.errorUpdateCount,isFetching:j,isRefetching:j&&!G,isLoadingError:J&&!ft,isPaused:u.fetchStatus==="paused",isPlaceholderData:B,isRefetchError:J&&ft,isStale:ut(e,s),refetch:this.refetch,promise:r(this,S),isEnabled:x(s.enabled,e)!==!1};if(this.options.experimental_prefetchInRender){const v=O.data!==void 0,z=O.status==="error"&&!v,K=Y=>{z?Y.reject(O.error):v&&Y.resolve(O.data)},bt=()=>{const Y=l(this,S,O.promise=mt());K(Y)},X=r(this,S);switch(X.status){case"pending":e.queryHash===i.queryHash&&K(X);break;case"fulfilled":(z||O.data!==X.value)&&bt();break;case"rejected":(!z||O.error!==X.reason)&&bt();break}}return O}updateResult(){const e=r(this,g),s=this.createResult(r(this,a),this.options);if(l(this,Q,r(this,a).state),l(this,F,this.options),r(this,Q).data!==void 0&&l(this,D,r(this,a)),tt(s,e))return;l(this,g,s);const i=()=>{if(!e)return!0;const{notifyOnChangeProps:o}=this.options,h=typeof o=="function"?o():o;if(h==="all"||!h&&!r(this,P).size)return!0;const c=new Set(h??r(this,P));return this.options.throwOnError&&c.add("error"),Object.keys(r(this,g)).some(y=>{const T=y;return r(this,g)[T]!==e[T]&&c.has(T)})};d(this,n,Ot).call(this,{listeners:i()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&d(this,n,nt).call(this)}},m=new WeakMap,a=new WeakMap,W=new WeakMap,g=new WeakMap,Q=new WeakMap,F=new WeakMap,S=new WeakMap,I=new WeakMap,V=new WeakMap,U=new WeakMap,D=new WeakMap,_=new WeakMap,k=new WeakMap,M=new WeakMap,P=new WeakMap,n=new WeakSet,H=function(e){d(this,n,ct).call(this);let s=r(this,a).fetch(this.options,e);return e!=null&&e.throwOnError||(s=s.catch(et)),s},rt=function(){d(this,n,ot).call(this);const e=A(this.options.staleTime,r(this,a));if(st.isServer()||r(this,g).isStale||!vt(e))return;const i=Tt(r(this,g).dataUpdatedAt,e)+1;l(this,_,Z.setTimeout(()=>{r(this,g).isStale||this.updateResult()},i))},it=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(r(this,a)):this.options.refetchInterval)??!1},at=function(e){d(this,n,ht).call(this),l(this,M,e),!(st.isServer()||x(this.options.enabled,r(this,a))===!1||!vt(r(this,M))||r(this,M)===0)&&l(this,k,Z.setInterval(()=>{(this.options.refetchIntervalInBackground||$t.isFocused())&&d(this,n,H).call(this)},r(this,M)))},nt=function(){d(this,n,rt).call(this),d(this,n,at).call(this,d(this,n,it).call(this))},ot=function(){r(this,_)!==void 0&&(Z.clearTimeout(r(this,_)),l(this,_,void 0))},ht=function(){r(this,k)!==void 0&&(Z.clearInterval(r(this,k)),l(this,k,void 0))},ct=function(){const e=r(this,m).getQueryCache().build(r(this,m),this.options);if(e===r(this,a))return;const s=r(this,a);l(this,a,e),l(this,W,e.state),this.hasListeners()&&(s==null||s.removeObserver(this),e.addObserver(this))},Ot=function(e){Ct.batch(()=>{e.listeners&&this.listeners.forEach(s=>{s(r(this,g))}),r(this,m).getQueryCache().notify({query:r(this,a),type:"observerResultsUpdated"})})},Et);function Ut(t,e){return x(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&x(e.retryOnMount,t)===!1)}function yt(t,e){return Ut(t,e)||t.state.data!==void 0&&lt(t,e,e.refetchOnMount)}function lt(t,e,s){if(x(e.enabled,t)!==!1&&A(e.staleTime,t)!=="static"){const i=typeof s=="function"?s(t):s;return i==="always"||i!==!1&&ut(t,e)}return!1}function Rt(t,e,s,i){return(t!==e||x(i.enabled,t)===!1)&&(!s.suspense||t.state.status!=="error")&&ut(t,s)}function ut(t,e){return x(e.enabled,t)!==!1&&t.isStaleByTime(A(e.staleTime,t))}function Dt(t,e){return!tt(t.getCurrentResult(),e)}var It=E.createContext(!1),Pt=()=>E.useContext(It);It.Provider;function Lt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var Bt=E.createContext(Lt()),Nt=()=>E.useContext(Bt),jt=(t,e,s)=>{const i=s!=null&&s.state.error&&typeof t.throwOnError=="function"?wt(t.throwOnError,[s.state.error,s]):t.throwOnError;(t.suspense||t.experimental_prefetchInRender||i)&&(e.isReset()||(t.retryOnMount=!1))},zt=t=>{E.useEffect(()=>{t.clearReset()},[t])},Ht=({result:t,errorResetBoundary:e,throwOnError:s,query:i,suspense:o})=>t.isError&&!e.isReset()&&!t.isFetching&&i&&(o&&t.data===void 0||wt(s,[t.error,i])),At=t=>{if(t.suspense){const s=o=>o==="static"?o:Math.max(o??1e3,1e3),i=t.staleTime;t.staleTime=typeof i=="function"?(...o)=>s(i(...o)):s(i),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},Wt=(t,e)=>t.isLoading&&t.isFetching&&!e,Vt=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,St=(t,e,s)=>e.fetchOptimistic(t).catch(()=>{s.clearReset()});function Kt(t,e,s){var f,N,$,R;const i=Pt(),o=Nt(),h=_t(),c=h.defaultQueryOptions(t);(N=(f=h.getDefaultOptions().queries)==null?void 0:f._experimental_beforeQuery)==null||N.call(f,c);const y=h.getQueryCache().get(c.queryHash),T=t.subscribed!==!1;c._optimisticResults=i?"isRestoring":T?"optimistic":void 0,At(c),jt(c,o,y),zt(o);const L=!h.getQueryCache().get(c.queryHash),[b]=E.useState(()=>new e(h,c)),u=b.getOptimisticResult(c),B=!i&&T;if(E.useSyncExternalStore(E.useCallback(w=>{const j=B?b.subscribe(Ct.batchCalls(w)):et;return b.updateResult(),j},[b,B]),()=>b.getCurrentResult(),()=>b.getCurrentResult()),E.useEffect(()=>{b.setOptions(c)},[c,b]),Vt(c,u))throw St(c,b,o);if(Ht({result:u,errorResetBoundary:o,throwOnError:c.throwOnError,query:y,suspense:c.suspense}))throw u.error;if((R=($=h.getDefaultOptions().queries)==null?void 0:$._experimental_afterQuery)==null||R.call($,c,u),c.experimental_prefetchInRender&&!st.isServer()&&Wt(u,i)){const w=L?St(c,b,o):y==null?void 0:y.promise;w==null||w.catch(et).finally(()=>{b.updateResult()})}return c.notifyOnChangeProps?u:b.trackResult(u)}function Jt(t,e){return Kt(t,Ft)}const Xt=kt`
  from { opacity: 0; }
  to { opacity: 1; }
`,qt=C.div`
  position: fixed;
  inset: 0;
  background-color: ${({theme:t})=>t.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({theme:t})=>t.zIndex.overlay};
  padding: ${({theme:t})=>t.spacing.lg};
  animation: ${Xt} 0.15s ease;
`,te=C.div`
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
`,ee=C.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:t})=>t.spacing.md};
  padding: ${({theme:t})=>t.spacing.xl};
  border-bottom: 1px solid ${({theme:t})=>t.colors.border};
  background-color: ${({theme:t})=>t.colors.surface};
  flex-shrink: 0;
`,se=C.h2`
  font-size: ${({theme:t})=>t.fontSize.xl};
  font-weight: ${({theme:t})=>t.fontWeight.semibold};
  color: ${({theme:t})=>t.colors.text};
`,re=C.p`
  font-size: ${({theme:t})=>t.fontSize.sm};
  color: ${({theme:t})=>t.colors.textSecondary};
  margin-top: 4px;
`,ie=C.button`
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
`,ae=C.div`
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
`,ne=C.div`
  padding: ${({theme:t})=>t.spacing.xl};
`,oe=C.div`
  padding: ${({theme:t})=>t.spacing.lg} ${({theme:t})=>t.spacing.xl};
  border-top: 1px solid ${({theme:t})=>t.colors.border};
  background-color: ${({theme:t})=>t.colors.surface};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:t})=>t.spacing.sm};
  flex-shrink: 0;
`;export{ie as C,te as M,qt as O,ee as a,se as b,re as c,ae as d,ne as e,oe as f,Jt as u};
