var Ze=e=>{throw TypeError(e)};var Ce=(e,n,t)=>n.has(e)||Ze("Cannot "+t);var h=(e,n,t)=>(Ce(e,n,"read from private field"),t?t.call(e):n.get(e)),D=(e,n,t)=>n.has(e)?Ze("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,t),E=(e,n,t,o)=>(Ce(e,n,"write to private field"),o?o.call(e,t):n.set(e,t),t),b=(e,n,t)=>(Ce(e,n,"access private method"),t);import{aH as Pt,aQ as Je,aR as T,aI as Ie,aS as ce,aM as Ve,aT as Ee,aU as et,aV as It,aW as he,aX as Vt,aY as Et,aZ as tt,aL as ut,r as F,aN as dt,w as bt,g as y,aP as U,j as m,a_ as zt,am as ct,M as Dt,a$ as Lt,l as gt,b0 as Ht,N as Ot,L as At,b1 as jt,b2 as kt,aO as Gt,ap as Tt}from"./index-Leifw_BN.js";var j,M,fe,A,ne,ie,K,Y,pe,se,le,oe,re,Z,ae,I,de,be,ze,De,Le,He,Oe,Ae,ft,at,Bt=(at=class extends Pt{constructor(n,t){super();D(this,I);D(this,j);D(this,M);D(this,fe);D(this,A);D(this,ne);D(this,ie);D(this,K);D(this,Y);D(this,pe);D(this,se);D(this,le);D(this,oe);D(this,re);D(this,Z);D(this,ae,new Set);this.options=t,E(this,j,n),E(this,Y,null),E(this,K,Je()),this.bindMethods(),this.setOptions(t)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(h(this,M).addObserver(this),nt(h(this,M),this.options)?b(this,I,de).call(this):this.updateResult(),b(this,I,Le).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return je(h(this,M),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return je(h(this,M),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,b(this,I,He).call(this),b(this,I,Oe).call(this),h(this,M).removeObserver(this)}setOptions(n){const t=this.options,o=h(this,M);if(this.options=h(this,j).defaultQueryOptions(n),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof T(this.options.enabled,h(this,M))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");b(this,I,Ae).call(this),h(this,M).setOptions(this.options),t._defaulted&&!Ie(this.options,t)&&h(this,j).getQueryCache().notify({type:"observerOptionsUpdated",query:h(this,M),observer:this});const r=this.hasListeners();r&&ot(h(this,M),o,this.options,t)&&b(this,I,de).call(this),this.updateResult(),r&&(h(this,M)!==o||T(this.options.enabled,h(this,M))!==T(t.enabled,h(this,M))||ce(this.options.staleTime,h(this,M))!==ce(t.staleTime,h(this,M)))&&b(this,I,be).call(this);const i=b(this,I,ze).call(this);r&&(h(this,M)!==o||T(this.options.enabled,h(this,M))!==T(t.enabled,h(this,M))||i!==h(this,Z))&&b(this,I,De).call(this,i)}getOptimisticResult(n){const t=h(this,j).getQueryCache().build(h(this,j),n),o=this.createResult(t,n);return Ut(this,o)&&(E(this,A,o),E(this,ie,this.options),E(this,ne,h(this,M).state)),o}getCurrentResult(){return h(this,A)}trackResult(n,t){return new Proxy(n,{get:(o,r)=>(this.trackProp(r),t==null||t(r),r==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&h(this,K).status==="pending"&&h(this,K).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(o,r))})}trackProp(n){h(this,ae).add(n)}getCurrentQuery(){return h(this,M)}refetch({...n}={}){return this.fetch({...n})}fetchOptimistic(n){const t=h(this,j).defaultQueryOptions(n),o=h(this,j).getQueryCache().build(h(this,j),t);return o.fetch().then(()=>this.createResult(o,t))}fetch(n){return b(this,I,de).call(this,{...n,cancelRefetch:n.cancelRefetch??!0}).then(()=>(this.updateResult(),h(this,A)))}createResult(n,t){var X;const o=h(this,M),r=this.options,i=h(this,A),s=h(this,ne),l=h(this,ie),d=n!==o?n.state:h(this,fe),{state:c}=n;let g={...c},f=!1,u;if(t._optimisticResults){const H=this.hasListeners(),W=!H&&nt(n,t),te=H&&ot(n,o,t,r);(W||te)&&(g={...g,...Et(c.data,n.options)}),t._optimisticResults==="isRestoring"&&(g.fetchStatus="idle")}let{error:p,errorUpdatedAt:S,status:C}=g;u=g.data;let v=!1;if(t.placeholderData!==void 0&&u===void 0&&C==="pending"){let H;i!=null&&i.isPlaceholderData&&t.placeholderData===(l==null?void 0:l.placeholderData)?(H=i.data,v=!0):H=typeof t.placeholderData=="function"?t.placeholderData((X=h(this,le))==null?void 0:X.state.data,h(this,le)):t.placeholderData,H!==void 0&&(C="success",u=tt(i==null?void 0:i.data,H,t),f=!0)}if(t.select&&u!==void 0&&!v)if(i&&u===(s==null?void 0:s.data)&&t.select===h(this,pe))u=h(this,se);else try{E(this,pe,t.select),u=t.select(u),u=tt(i==null?void 0:i.data,u,t),E(this,se,u),E(this,Y,null)}catch(H){E(this,Y,H)}h(this,Y)&&(p=h(this,Y),u=h(this,se),S=Date.now(),C="error");const w=g.fetchStatus==="fetching",x=C==="pending",P=C==="error",V=x&&w,z=u!==void 0,L={status:C,fetchStatus:g.fetchStatus,isPending:x,isSuccess:C==="success",isError:P,isInitialLoading:V,isLoading:V,data:u,dataUpdatedAt:g.dataUpdatedAt,error:p,errorUpdatedAt:S,failureCount:g.fetchFailureCount,failureReason:g.fetchFailureReason,errorUpdateCount:g.errorUpdateCount,isFetched:n.isFetched(),isFetchedAfterMount:g.dataUpdateCount>d.dataUpdateCount||g.errorUpdateCount>d.errorUpdateCount,isFetching:w,isRefetching:w&&!x,isLoadingError:P&&!z,isPaused:g.fetchStatus==="paused",isPlaceholderData:f,isRefetchError:P&&z,isStale:Qe(n,t),refetch:this.refetch,promise:h(this,K),isEnabled:T(t.enabled,n)!==!1};if(this.options.experimental_prefetchInRender){const H=L.data!==void 0,W=L.status==="error"&&!H,te=k=>{W?k.reject(L.error):H&&k.resolve(L.data)},_=()=>{const k=E(this,K,L.promise=Je());te(k)},N=h(this,K);switch(N.status){case"pending":n.queryHash===o.queryHash&&te(N);break;case"fulfilled":(W||L.data!==N.value)&&_();break;case"rejected":(!W||L.error!==N.reason)&&_();break}}return L}updateResult(){const n=h(this,A),t=this.createResult(h(this,M),this.options);if(E(this,ne,h(this,M).state),E(this,ie,this.options),h(this,ne).data!==void 0&&E(this,le,h(this,M)),Ie(t,n))return;E(this,A,t);const o=()=>{if(!n)return!0;const{notifyOnChangeProps:r}=this.options,i=typeof r=="function"?r():r;if(i==="all"||!i&&!h(this,ae).size)return!0;const s=new Set(i??h(this,ae));return this.options.throwOnError&&s.add("error"),Object.keys(h(this,A)).some(l=>{const a=l;return h(this,A)[a]!==n[a]&&s.has(a)})};b(this,I,ft).call(this,{listeners:o()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&b(this,I,Le).call(this)}},j=new WeakMap,M=new WeakMap,fe=new WeakMap,A=new WeakMap,ne=new WeakMap,ie=new WeakMap,K=new WeakMap,Y=new WeakMap,pe=new WeakMap,se=new WeakMap,le=new WeakMap,oe=new WeakMap,re=new WeakMap,Z=new WeakMap,ae=new WeakMap,I=new WeakSet,de=function(n){b(this,I,Ae).call(this);let t=h(this,M).fetch(this.options,n);return n!=null&&n.throwOnError||(t=t.catch(Ve)),t},be=function(){b(this,I,He).call(this);const n=ce(this.options.staleTime,h(this,M));if(Ee.isServer()||h(this,A).isStale||!et(n))return;const o=It(h(this,A).dataUpdatedAt,n)+1;E(this,oe,he.setTimeout(()=>{h(this,A).isStale||this.updateResult()},o))},ze=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(h(this,M)):this.options.refetchInterval)??!1},De=function(n){b(this,I,Oe).call(this),E(this,Z,n),!(Ee.isServer()||T(this.options.enabled,h(this,M))===!1||!et(h(this,Z))||h(this,Z)===0)&&E(this,re,he.setInterval(()=>{(this.options.refetchIntervalInBackground||Vt.isFocused())&&b(this,I,de).call(this)},h(this,Z)))},Le=function(){b(this,I,be).call(this),b(this,I,De).call(this,b(this,I,ze).call(this))},He=function(){h(this,oe)!==void 0&&(he.clearTimeout(h(this,oe)),E(this,oe,void 0))},Oe=function(){h(this,re)!==void 0&&(he.clearInterval(h(this,re)),E(this,re,void 0))},Ae=function(){const n=h(this,j).getQueryCache().build(h(this,j),this.options);if(n===h(this,M))return;const t=h(this,M);E(this,M,n),E(this,fe,n.state),this.hasListeners()&&(t==null||t.removeObserver(this),n.addObserver(this))},ft=function(n){ut.batch(()=>{n.listeners&&this.listeners.forEach(t=>{t(h(this,A))}),h(this,j).getQueryCache().notify({query:h(this,M),type:"observerResultsUpdated"})})},at);function Nt(e,n){return T(n.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&T(n.retryOnMount,e)===!1)}function nt(e,n){return Nt(e,n)||e.state.data!==void 0&&je(e,n,n.refetchOnMount)}function je(e,n,t){if(T(n.enabled,e)!==!1&&ce(n.staleTime,e)!=="static"){const o=typeof t=="function"?t(e):t;return o==="always"||o!==!1&&Qe(e,n)}return!1}function ot(e,n,t,o){return(e!==n||T(o.enabled,e)===!1)&&(!t.suspense||e.state.status!=="error")&&Qe(e,t)}function Qe(e,n){return T(n.enabled,e)!==!1&&e.isStaleByTime(ce(n.staleTime,e))}function Ut(e,n){return!Ie(e.getCurrentResult(),n)}var pt=F.createContext(!1),Qt=()=>F.useContext(pt);pt.Provider;function Wt(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var qt=F.createContext(Wt()),Kt=()=>F.useContext(qt),Xt=(e,n,t)=>{const o=t!=null&&t.state.error&&typeof e.throwOnError=="function"?dt(e.throwOnError,[t.state.error,t]):e.throwOnError;(e.suspense||e.experimental_prefetchInRender||o)&&(n.isReset()||(e.retryOnMount=!1))},Yt=e=>{F.useEffect(()=>{e.clearReset()},[e])},Zt=({result:e,errorResetBoundary:n,throwOnError:t,query:o,suspense:r})=>e.isError&&!n.isReset()&&!e.isFetching&&o&&(r&&e.data===void 0||dt(t,[e.error,o])),Jt=e=>{if(e.suspense){const t=r=>r==="static"?r:Math.max(r??1e3,1e3),o=e.staleTime;e.staleTime=typeof o=="function"?(...r)=>t(o(...r)):t(o),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},en=(e,n)=>e.isLoading&&e.isFetching&&!n,tn=(e,n)=>(e==null?void 0:e.suspense)&&n.isPending,rt=(e,n,t)=>n.fetchOptimistic(e).catch(()=>{t.clearReset()});function nn(e,n,t){var u,p,S,C;const o=Qt(),r=Kt(),i=bt(),s=i.defaultQueryOptions(e);(p=(u=i.getDefaultOptions().queries)==null?void 0:u._experimental_beforeQuery)==null||p.call(u,s);const l=i.getQueryCache().get(s.queryHash),a=e.subscribed!==!1;s._optimisticResults=o?"isRestoring":a?"optimistic":void 0,Jt(s),Xt(s,r,l),Yt(r);const d=!i.getQueryCache().get(s.queryHash),[c]=F.useState(()=>new n(i,s)),g=c.getOptimisticResult(s),f=!o&&a;if(F.useSyncExternalStore(F.useCallback(v=>{const w=f?c.subscribe(ut.batchCalls(v)):Ve;return c.updateResult(),w},[c,f]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),F.useEffect(()=>{c.setOptions(s)},[s,c]),tn(s,g))throw rt(s,c,r);if(Zt({result:g,errorResetBoundary:r,throwOnError:s.throwOnError,query:l,suspense:s.suspense}))throw g.error;if((C=(S=i.getDefaultOptions().queries)==null?void 0:S._experimental_afterQuery)==null||C.call(S,s,g),s.experimental_prefetchInRender&&!Ee.isServer()&&en(g,o)){const v=d?rt(s,c,r):l==null?void 0:l.promise;v==null||v.catch(Ve).finally(()=>{c.updateResult()})}return s.notifyOnChangeProps?g:c.trackResult(g)}function jo(e,n){return nn(e,Bt)}/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function J(e,n){return typeof e=="function"?e(n):e}function G(e,n){return t=>{n.setState(o=>({...o,[e]:J(t,o[e])}))}}function we(e){return e instanceof Function}function on(e){return Array.isArray(e)&&e.every(n=>typeof n=="number")}function rn(e,n){const t=[],o=r=>{r.forEach(i=>{t.push(i);const s=n(i);s!=null&&s.length&&o(s)})};return o(e),t}function R(e,n,t){let o=[],r;return i=>{let s;t.key&&t.debug&&(s=Date.now());const l=e(i);if(!(l.length!==o.length||l.some((c,g)=>o[g]!==c)))return r;o=l;let d;if(t.key&&t.debug&&(d=Date.now()),r=n(...l),t==null||t.onChange==null||t.onChange(r),t.key&&t.debug&&t!=null&&t.debug()){const c=Math.round((Date.now()-s)*100)/100,g=Math.round((Date.now()-d)*100)/100,f=g/16,u=(p,S)=>{for(p=String(p);p.length<S;)p=" "+p;return p};console.info(`%c⏱ ${u(g,5)} /${u(c,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*f,120))}deg 100% 31%);`,t==null?void 0:t.key)}return r}}function $(e,n,t,o){return{debug:()=>{var r;return(r=e==null?void 0:e.debugAll)!=null?r:e[n]},key:!1,onChange:o}}function sn(e,n,t,o){const r=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${n.id}_${t.id}`,row:n,column:t,getValue:()=>n.getValue(o),renderValue:r,getContext:R(()=>[e,t,n,i],(s,l,a,d)=>({table:s,column:l,row:a,cell:d,getValue:d.getValue,renderValue:d.renderValue}),$(e.options,"debugCells"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,t,n,e)},{}),i}function ln(e,n,t,o){var r,i;const l={...e._getDefaultColumnDef(),...n},a=l.accessorKey;let d=(r=(i=l.id)!=null?i:a?typeof String.prototype.replaceAll=="function"?a.replaceAll(".","_"):a.replace(/\./g,"_"):void 0)!=null?r:typeof l.header=="string"?l.header:void 0,c;if(l.accessorFn?c=l.accessorFn:a&&(a.includes(".")?c=f=>{let u=f;for(const S of a.split(".")){var p;u=(p=u)==null?void 0:p[S]}return u}:c=f=>f[l.accessorKey]),!d)throw new Error;let g={id:`${String(d)}`,accessorFn:c,parent:o,depth:t,columnDef:l,columns:[],getFlatColumns:R(()=>[!0],()=>{var f;return[g,...(f=g.columns)==null?void 0:f.flatMap(u=>u.getFlatColumns())]},$(e.options,"debugColumns")),getLeafColumns:R(()=>[e._getOrderColumnsFn()],f=>{var u;if((u=g.columns)!=null&&u.length){let p=g.columns.flatMap(S=>S.getLeafColumns());return f(p)}return[g]},$(e.options,"debugColumns"))};for(const f of e._features)f.createColumn==null||f.createColumn(g,e);return g}const O="debugHeaders";function it(e,n,t){var o;let i={id:(o=t.id)!=null?o:n.id,column:n,index:t.index,isPlaceholder:!!t.isPlaceholder,placeholderId:t.placeholderId,depth:t.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],l=a=>{a.subHeaders&&a.subHeaders.length&&a.subHeaders.map(l),s.push(a)};return l(i),s},getContext:()=>({table:e,header:i,column:n})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const an={createTable:e=>{e.getHeaderGroups=R(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o,r)=>{var i,s;const l=(i=o==null?void 0:o.map(g=>t.find(f=>f.id===g)).filter(Boolean))!=null?i:[],a=(s=r==null?void 0:r.map(g=>t.find(f=>f.id===g)).filter(Boolean))!=null?s:[],d=t.filter(g=>!(o!=null&&o.includes(g.id))&&!(r!=null&&r.includes(g.id)));return me(n,[...l,...d,...a],e)},$(e.options,O)),e.getCenterHeaderGroups=R(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o,r)=>(t=t.filter(i=>!(o!=null&&o.includes(i.id))&&!(r!=null&&r.includes(i.id))),me(n,t,e,"center")),$(e.options,O)),e.getLeftHeaderGroups=R(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(n,t,o)=>{var r;const i=(r=o==null?void 0:o.map(s=>t.find(l=>l.id===s)).filter(Boolean))!=null?r:[];return me(n,i,e,"left")},$(e.options,O)),e.getRightHeaderGroups=R(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(n,t,o)=>{var r;const i=(r=o==null?void 0:o.map(s=>t.find(l=>l.id===s)).filter(Boolean))!=null?r:[];return me(n,i,e,"right")},$(e.options,O)),e.getFooterGroups=R(()=>[e.getHeaderGroups()],n=>[...n].reverse(),$(e.options,O)),e.getLeftFooterGroups=R(()=>[e.getLeftHeaderGroups()],n=>[...n].reverse(),$(e.options,O)),e.getCenterFooterGroups=R(()=>[e.getCenterHeaderGroups()],n=>[...n].reverse(),$(e.options,O)),e.getRightFooterGroups=R(()=>[e.getRightHeaderGroups()],n=>[...n].reverse(),$(e.options,O)),e.getFlatHeaders=R(()=>[e.getHeaderGroups()],n=>n.map(t=>t.headers).flat(),$(e.options,O)),e.getLeftFlatHeaders=R(()=>[e.getLeftHeaderGroups()],n=>n.map(t=>t.headers).flat(),$(e.options,O)),e.getCenterFlatHeaders=R(()=>[e.getCenterHeaderGroups()],n=>n.map(t=>t.headers).flat(),$(e.options,O)),e.getRightFlatHeaders=R(()=>[e.getRightHeaderGroups()],n=>n.map(t=>t.headers).flat(),$(e.options,O)),e.getCenterLeafHeaders=R(()=>[e.getCenterFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),$(e.options,O)),e.getLeftLeafHeaders=R(()=>[e.getLeftFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),$(e.options,O)),e.getRightLeafHeaders=R(()=>[e.getRightFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),$(e.options,O)),e.getLeafHeaders=R(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(n,t,o)=>{var r,i,s,l,a,d;return[...(r=(i=n[0])==null?void 0:i.headers)!=null?r:[],...(s=(l=t[0])==null?void 0:l.headers)!=null?s:[],...(a=(d=o[0])==null?void 0:d.headers)!=null?a:[]].map(c=>c.getLeafHeaders()).flat()},$(e.options,O))}};function me(e,n,t,o){var r,i;let s=0;const l=function(f,u){u===void 0&&(u=1),s=Math.max(s,u),f.filter(p=>p.getIsVisible()).forEach(p=>{var S;(S=p.columns)!=null&&S.length&&l(p.columns,u+1)},0)};l(e);let a=[];const d=(f,u)=>{const p={depth:u,id:[o,`${u}`].filter(Boolean).join("_"),headers:[]},S=[];f.forEach(C=>{const v=[...S].reverse()[0],w=C.column.depth===p.depth;let x,P=!1;if(w&&C.column.parent?x=C.column.parent:(x=C.column,P=!0),v&&(v==null?void 0:v.column)===x)v.subHeaders.push(C);else{const V=it(t,x,{id:[o,u,x.id,C==null?void 0:C.id].filter(Boolean).join("_"),isPlaceholder:P,placeholderId:P?`${S.filter(z=>z.column===x).length}`:void 0,depth:u,index:S.length});V.subHeaders.push(C),S.push(V)}p.headers.push(C),C.headerGroup=p}),a.push(p),u>0&&d(S,u-1)},c=n.map((f,u)=>it(t,f,{depth:s,index:u}));d(c,s-1),a.reverse();const g=f=>f.filter(p=>p.column.getIsVisible()).map(p=>{let S=0,C=0,v=[0];p.subHeaders&&p.subHeaders.length?(v=[],g(p.subHeaders).forEach(x=>{let{colSpan:P,rowSpan:V}=x;S+=P,v.push(V)})):S=1;const w=Math.min(...v);return C=C+w,p.colSpan=S,p.rowSpan=C,{colSpan:S,rowSpan:C}});return g((r=(i=a[0])==null?void 0:i.headers)!=null?r:[]),a}const un=(e,n,t,o,r,i,s)=>{let l={id:n,index:o,original:t,depth:r,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:a=>{if(l._valuesCache.hasOwnProperty(a))return l._valuesCache[a];const d=e.getColumn(a);if(d!=null&&d.accessorFn)return l._valuesCache[a]=d.accessorFn(l.original,o),l._valuesCache[a]},getUniqueValues:a=>{if(l._uniqueValuesCache.hasOwnProperty(a))return l._uniqueValuesCache[a];const d=e.getColumn(a);if(d!=null&&d.accessorFn)return d.columnDef.getUniqueValues?(l._uniqueValuesCache[a]=d.columnDef.getUniqueValues(l.original,o),l._uniqueValuesCache[a]):(l._uniqueValuesCache[a]=[l.getValue(a)],l._uniqueValuesCache[a])},renderValue:a=>{var d;return(d=l.getValue(a))!=null?d:e.options.renderFallbackValue},subRows:[],getLeafRows:()=>rn(l.subRows,a=>a.subRows),getParentRow:()=>l.parentId?e.getRow(l.parentId,!0):void 0,getParentRows:()=>{let a=[],d=l;for(;;){const c=d.getParentRow();if(!c)break;a.push(c),d=c}return a.reverse()},getAllCells:R(()=>[e.getAllLeafColumns()],a=>a.map(d=>sn(e,l,d,d.id)),$(e.options,"debugRows")),_getAllCellsByColumnId:R(()=>[l.getAllCells()],a=>a.reduce((d,c)=>(d[c.column.id]=c,d),{}),$(e.options,"debugRows"))};for(let a=0;a<e._features.length;a++){const d=e._features[a];d==null||d.createRow==null||d.createRow(l,e)}return l},dn={createColumn:(e,n)=>{e._getFacetedRowModel=n.options.getFacetedRowModel&&n.options.getFacetedRowModel(n,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():n.getPreFilteredRowModel(),e._getFacetedUniqueValues=n.options.getFacetedUniqueValues&&n.options.getFacetedUniqueValues(n,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=n.options.getFacetedMinMaxValues&&n.options.getFacetedMinMaxValues(n,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},ht=(e,n,t)=>{var o,r;const i=t==null||(o=t.toString())==null?void 0:o.toLowerCase();return!!(!((r=e.getValue(n))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(i))};ht.autoRemove=e=>Q(e);const mt=(e,n,t)=>{var o;return!!(!((o=e.getValue(n))==null||(o=o.toString())==null)&&o.includes(t))};mt.autoRemove=e=>Q(e);const St=(e,n,t)=>{var o;return((o=e.getValue(n))==null||(o=o.toString())==null?void 0:o.toLowerCase())===(t==null?void 0:t.toLowerCase())};St.autoRemove=e=>Q(e);const vt=(e,n,t)=>{var o;return(o=e.getValue(n))==null?void 0:o.includes(t)};vt.autoRemove=e=>Q(e);const wt=(e,n,t)=>!t.some(o=>{var r;return!((r=e.getValue(n))!=null&&r.includes(o))});wt.autoRemove=e=>Q(e)||!(e!=null&&e.length);const Ct=(e,n,t)=>t.some(o=>{var r;return(r=e.getValue(n))==null?void 0:r.includes(o)});Ct.autoRemove=e=>Q(e)||!(e!=null&&e.length);const xt=(e,n,t)=>e.getValue(n)===t;xt.autoRemove=e=>Q(e);const Rt=(e,n,t)=>e.getValue(n)==t;Rt.autoRemove=e=>Q(e);const We=(e,n,t)=>{let[o,r]=t;const i=e.getValue(n);return i>=o&&i<=r};We.resolveFilterValue=e=>{let[n,t]=e,o=typeof n!="number"?parseFloat(n):n,r=typeof t!="number"?parseFloat(t):t,i=n===null||Number.isNaN(o)?-1/0:o,s=t===null||Number.isNaN(r)?1/0:r;if(i>s){const l=i;i=s,s=l}return[i,s]};We.autoRemove=e=>Q(e)||Q(e[0])&&Q(e[1]);const q={includesString:ht,includesStringSensitive:mt,equalsString:St,arrIncludes:vt,arrIncludesAll:wt,arrIncludesSome:Ct,equals:xt,weakEquals:Rt,inNumberRange:We};function Q(e){return e==null||e===""}const cn={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:G("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,n)=>{e.getAutoFilterFn=()=>{const t=n.getCoreRowModel().flatRows[0],o=t==null?void 0:t.getValue(e.id);return typeof o=="string"?q.includesString:typeof o=="number"?q.inNumberRange:typeof o=="boolean"||o!==null&&typeof o=="object"?q.equals:Array.isArray(o)?q.arrIncludes:q.weakEquals},e.getFilterFn=()=>{var t,o;return we(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(t=(o=n.options.filterFns)==null?void 0:o[e.columnDef.filterFn])!=null?t:q[e.columnDef.filterFn]},e.getCanFilter=()=>{var t,o,r;return((t=e.columnDef.enableColumnFilter)!=null?t:!0)&&((o=n.options.enableColumnFilters)!=null?o:!0)&&((r=n.options.enableFilters)!=null?r:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var t;return(t=n.getState().columnFilters)==null||(t=t.find(o=>o.id===e.id))==null?void 0:t.value},e.getFilterIndex=()=>{var t,o;return(t=(o=n.getState().columnFilters)==null?void 0:o.findIndex(r=>r.id===e.id))!=null?t:-1},e.setFilterValue=t=>{n.setColumnFilters(o=>{const r=e.getFilterFn(),i=o==null?void 0:o.find(c=>c.id===e.id),s=J(t,i?i.value:void 0);if(st(r,s,e)){var l;return(l=o==null?void 0:o.filter(c=>c.id!==e.id))!=null?l:[]}const a={id:e.id,value:s};if(i){var d;return(d=o==null?void 0:o.map(c=>c.id===e.id?a:c))!=null?d:[]}return o!=null&&o.length?[...o,a]:[a]})}},createRow:(e,n)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=n=>{const t=e.getAllLeafColumns(),o=r=>{var i;return(i=J(n,r))==null?void 0:i.filter(s=>{const l=t.find(a=>a.id===s.id);if(l){const a=l.getFilterFn();if(st(a,s.value,l))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(o)},e.resetColumnFilters=n=>{var t,o;e.setColumnFilters(n?[]:(t=(o=e.initialState)==null?void 0:o.columnFilters)!=null?t:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function st(e,n,t){return(e&&e.autoRemove?e.autoRemove(n,t):!1)||typeof n>"u"||typeof n=="string"&&!n}const gn=(e,n,t)=>t.reduce((o,r)=>{const i=r.getValue(e);return o+(typeof i=="number"?i:0)},0),fn=(e,n,t)=>{let o;return t.forEach(r=>{const i=r.getValue(e);i!=null&&(o>i||o===void 0&&i>=i)&&(o=i)}),o},pn=(e,n,t)=>{let o;return t.forEach(r=>{const i=r.getValue(e);i!=null&&(o<i||o===void 0&&i>=i)&&(o=i)}),o},hn=(e,n,t)=>{let o,r;return t.forEach(i=>{const s=i.getValue(e);s!=null&&(o===void 0?s>=s&&(o=r=s):(o>s&&(o=s),r<s&&(r=s)))}),[o,r]},mn=(e,n)=>{let t=0,o=0;if(n.forEach(r=>{let i=r.getValue(e);i!=null&&(i=+i)>=i&&(++t,o+=i)}),t)return o/t},Sn=(e,n)=>{if(!n.length)return;const t=n.map(i=>i.getValue(e));if(!on(t))return;if(t.length===1)return t[0];const o=Math.floor(t.length/2),r=t.sort((i,s)=>i-s);return t.length%2!==0?r[o]:(r[o-1]+r[o])/2},vn=(e,n)=>Array.from(new Set(n.map(t=>t.getValue(e))).values()),wn=(e,n)=>new Set(n.map(t=>t.getValue(e))).size,Cn=(e,n)=>n.length,xe={sum:gn,min:fn,max:pn,extent:hn,mean:mn,median:Sn,unique:vn,uniqueCount:wn,count:Cn},xn={getDefaultColumnDef:()=>({aggregatedCell:e=>{var n,t;return(n=(t=e.getValue())==null||t.toString==null?void 0:t.toString())!=null?n:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:G("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,n)=>{e.toggleGrouping=()=>{n.setGrouping(t=>t!=null&&t.includes(e.id)?t.filter(o=>o!==e.id):[...t??[],e.id])},e.getCanGroup=()=>{var t,o;return((t=e.columnDef.enableGrouping)!=null?t:!0)&&((o=n.options.enableGrouping)!=null?o:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var t;return(t=n.getState().grouping)==null?void 0:t.includes(e.id)},e.getGroupedIndex=()=>{var t;return(t=n.getState().grouping)==null?void 0:t.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const t=e.getCanGroup();return()=>{t&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const t=n.getCoreRowModel().flatRows[0],o=t==null?void 0:t.getValue(e.id);if(typeof o=="number")return xe.sum;if(Object.prototype.toString.call(o)==="[object Date]")return xe.extent},e.getAggregationFn=()=>{var t,o;if(!e)throw new Error;return we(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(t=(o=n.options.aggregationFns)==null?void 0:o[e.columnDef.aggregationFn])!=null?t:xe[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=n=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(n),e.resetGrouping=n=>{var t,o;e.setGrouping(n?[]:(t=(o=e.initialState)==null?void 0:o.grouping)!=null?t:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,n)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=t=>{if(e._groupingValuesCache.hasOwnProperty(t))return e._groupingValuesCache[t];const o=n.getColumn(t);return o!=null&&o.columnDef.getGroupingValue?(e._groupingValuesCache[t]=o.columnDef.getGroupingValue(e.original),e._groupingValuesCache[t]):e.getValue(t)},e._groupingValuesCache={}},createCell:(e,n,t,o)=>{e.getIsGrouped=()=>n.getIsGrouped()&&n.id===t.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&n.getIsGrouped(),e.getIsAggregated=()=>{var r;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((r=t.subRows)!=null&&r.length)}}};function Rn(e,n,t){if(!(n!=null&&n.length)||!t)return e;const o=e.filter(i=>!n.includes(i.id));return t==="remove"?o:[...n.map(i=>e.find(s=>s.id===i)).filter(Boolean),...o]}const $n={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:G("columnOrder",e)}),createColumn:(e,n)=>{e.getIndex=R(t=>[ge(n,t)],t=>t.findIndex(o=>o.id===e.id),$(n.options,"debugColumns")),e.getIsFirstColumn=t=>{var o;return((o=ge(n,t)[0])==null?void 0:o.id)===e.id},e.getIsLastColumn=t=>{var o;const r=ge(n,t);return((o=r[r.length-1])==null?void 0:o.id)===e.id}},createTable:e=>{e.setColumnOrder=n=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(n),e.resetColumnOrder=n=>{var t;e.setColumnOrder(n?[]:(t=e.initialState.columnOrder)!=null?t:[])},e._getOrderColumnsFn=R(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(n,t,o)=>r=>{let i=[];if(!(n!=null&&n.length))i=r;else{const s=[...n],l=[...r];for(;l.length&&s.length;){const a=s.shift(),d=l.findIndex(c=>c.id===a);d>-1&&i.push(l.splice(d,1)[0])}i=[...i,...l]}return Rn(i,t,o)},$(e.options,"debugTable"))}},Re=()=>({left:[],right:[]}),yn={getInitialState:e=>({columnPinning:Re(),...e}),getDefaultOptions:e=>({onColumnPinningChange:G("columnPinning",e)}),createColumn:(e,n)=>{e.pin=t=>{const o=e.getLeafColumns().map(r=>r.id).filter(Boolean);n.setColumnPinning(r=>{var i,s;if(t==="right"){var l,a;return{left:((l=r==null?void 0:r.left)!=null?l:[]).filter(g=>!(o!=null&&o.includes(g))),right:[...((a=r==null?void 0:r.right)!=null?a:[]).filter(g=>!(o!=null&&o.includes(g))),...o]}}if(t==="left"){var d,c;return{left:[...((d=r==null?void 0:r.left)!=null?d:[]).filter(g=>!(o!=null&&o.includes(g))),...o],right:((c=r==null?void 0:r.right)!=null?c:[]).filter(g=>!(o!=null&&o.includes(g)))}}return{left:((i=r==null?void 0:r.left)!=null?i:[]).filter(g=>!(o!=null&&o.includes(g))),right:((s=r==null?void 0:r.right)!=null?s:[]).filter(g=>!(o!=null&&o.includes(g)))}})},e.getCanPin=()=>e.getLeafColumns().some(o=>{var r,i,s;return((r=o.columnDef.enablePinning)!=null?r:!0)&&((i=(s=n.options.enableColumnPinning)!=null?s:n.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const t=e.getLeafColumns().map(l=>l.id),{left:o,right:r}=n.getState().columnPinning,i=t.some(l=>o==null?void 0:o.includes(l)),s=t.some(l=>r==null?void 0:r.includes(l));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var t,o;const r=e.getIsPinned();return r?(t=(o=n.getState().columnPinning)==null||(o=o[r])==null?void 0:o.indexOf(e.id))!=null?t:-1:0}},createRow:(e,n)=>{e.getCenterVisibleCells=R(()=>[e._getAllVisibleCells(),n.getState().columnPinning.left,n.getState().columnPinning.right],(t,o,r)=>{const i=[...o??[],...r??[]];return t.filter(s=>!i.includes(s.column.id))},$(n.options,"debugRows")),e.getLeftVisibleCells=R(()=>[e._getAllVisibleCells(),n.getState().columnPinning.left],(t,o)=>(o??[]).map(i=>t.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),$(n.options,"debugRows")),e.getRightVisibleCells=R(()=>[e._getAllVisibleCells(),n.getState().columnPinning.right],(t,o)=>(o??[]).map(i=>t.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),$(n.options,"debugRows"))},createTable:e=>{e.setColumnPinning=n=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(n),e.resetColumnPinning=n=>{var t,o;return e.setColumnPinning(n?Re():(t=(o=e.initialState)==null?void 0:o.columnPinning)!=null?t:Re())},e.getIsSomeColumnsPinned=n=>{var t;const o=e.getState().columnPinning;if(!n){var r,i;return!!((r=o.left)!=null&&r.length||(i=o.right)!=null&&i.length)}return!!((t=o[n])!=null&&t.length)},e.getLeftLeafColumns=R(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(n,t)=>(t??[]).map(o=>n.find(r=>r.id===o)).filter(Boolean),$(e.options,"debugColumns")),e.getRightLeafColumns=R(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(n,t)=>(t??[]).map(o=>n.find(r=>r.id===o)).filter(Boolean),$(e.options,"debugColumns")),e.getCenterLeafColumns=R(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o)=>{const r=[...t??[],...o??[]];return n.filter(i=>!r.includes(i.id))},$(e.options,"debugColumns"))}};function _n(e){return e||(typeof document<"u"?document:null)}const Se={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},$e=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),Mn={getDefaultColumnDef:()=>Se,getInitialState:e=>({columnSizing:{},columnSizingInfo:$e(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:G("columnSizing",e),onColumnSizingInfoChange:G("columnSizingInfo",e)}),createColumn:(e,n)=>{e.getSize=()=>{var t,o,r;const i=n.getState().columnSizing[e.id];return Math.min(Math.max((t=e.columnDef.minSize)!=null?t:Se.minSize,(o=i??e.columnDef.size)!=null?o:Se.size),(r=e.columnDef.maxSize)!=null?r:Se.maxSize)},e.getStart=R(t=>[t,ge(n,t),n.getState().columnSizing],(t,o)=>o.slice(0,e.getIndex(t)).reduce((r,i)=>r+i.getSize(),0),$(n.options,"debugColumns")),e.getAfter=R(t=>[t,ge(n,t),n.getState().columnSizing],(t,o)=>o.slice(e.getIndex(t)+1).reduce((r,i)=>r+i.getSize(),0),$(n.options,"debugColumns")),e.resetSize=()=>{n.setColumnSizing(t=>{let{[e.id]:o,...r}=t;return r})},e.getCanResize=()=>{var t,o;return((t=e.columnDef.enableResizing)!=null?t:!0)&&((o=n.options.enableColumnResizing)!=null?o:!0)},e.getIsResizing=()=>n.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,n)=>{e.getSize=()=>{let t=0;const o=r=>{if(r.subHeaders.length)r.subHeaders.forEach(o);else{var i;t+=(i=r.column.getSize())!=null?i:0}};return o(e),t},e.getStart=()=>{if(e.index>0){const t=e.headerGroup.headers[e.index-1];return t.getStart()+t.getSize()}return 0},e.getResizeHandler=t=>{const o=n.getColumn(e.column.id),r=o==null?void 0:o.getCanResize();return i=>{if(!o||!r||(i.persist==null||i.persist(),ye(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),l=e?e.getLeafHeaders().map(v=>[v.column.id,v.column.getSize()]):[[o.id,o.getSize()]],a=ye(i)?Math.round(i.touches[0].clientX):i.clientX,d={},c=(v,w)=>{typeof w=="number"&&(n.setColumnSizingInfo(x=>{var P,V;const z=n.options.columnResizeDirection==="rtl"?-1:1,B=(w-((P=x==null?void 0:x.startOffset)!=null?P:0))*z,L=Math.max(B/((V=x==null?void 0:x.startSize)!=null?V:0),-.999999);return x.columnSizingStart.forEach(X=>{let[H,W]=X;d[H]=Math.round(Math.max(W+W*L,0)*100)/100}),{...x,deltaOffset:B,deltaPercentage:L}}),(n.options.columnResizeMode==="onChange"||v==="end")&&n.setColumnSizing(x=>({...x,...d})))},g=v=>c("move",v),f=v=>{c("end",v),n.setColumnSizingInfo(w=>({...w,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},u=_n(t),p={moveHandler:v=>g(v.clientX),upHandler:v=>{u==null||u.removeEventListener("mousemove",p.moveHandler),u==null||u.removeEventListener("mouseup",p.upHandler),f(v.clientX)}},S={moveHandler:v=>(v.cancelable&&(v.preventDefault(),v.stopPropagation()),g(v.touches[0].clientX),!1),upHandler:v=>{var w;u==null||u.removeEventListener("touchmove",S.moveHandler),u==null||u.removeEventListener("touchend",S.upHandler),v.cancelable&&(v.preventDefault(),v.stopPropagation()),f((w=v.touches[0])==null?void 0:w.clientX)}},C=Fn()?{passive:!1}:!1;ye(i)?(u==null||u.addEventListener("touchmove",S.moveHandler,C),u==null||u.addEventListener("touchend",S.upHandler,C)):(u==null||u.addEventListener("mousemove",p.moveHandler,C),u==null||u.addEventListener("mouseup",p.upHandler,C)),n.setColumnSizingInfo(v=>({...v,startOffset:a,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:l,isResizingColumn:o.id}))}}},createTable:e=>{e.setColumnSizing=n=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(n),e.setColumnSizingInfo=n=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(n),e.resetColumnSizing=n=>{var t;e.setColumnSizing(n?{}:(t=e.initialState.columnSizing)!=null?t:{})},e.resetHeaderSizeInfo=n=>{var t;e.setColumnSizingInfo(n?$e():(t=e.initialState.columnSizingInfo)!=null?t:$e())},e.getTotalSize=()=>{var n,t;return(n=(t=e.getHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getLeftTotalSize=()=>{var n,t;return(n=(t=e.getLeftHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getCenterTotalSize=()=>{var n,t;return(n=(t=e.getCenterHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getRightTotalSize=()=>{var n,t;return(n=(t=e.getRightHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0}}};let ve=null;function Fn(){if(typeof ve=="boolean")return ve;let e=!1;try{const n={get passive(){return e=!0,!1}},t=()=>{};window.addEventListener("test",t,n),window.removeEventListener("test",t)}catch{e=!1}return ve=e,ve}function ye(e){return e.type==="touchstart"}const Pn={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:G("columnVisibility",e)}),createColumn:(e,n)=>{e.toggleVisibility=t=>{e.getCanHide()&&n.setColumnVisibility(o=>({...o,[e.id]:t??!e.getIsVisible()}))},e.getIsVisible=()=>{var t,o;const r=e.columns;return(t=r.length?r.some(i=>i.getIsVisible()):(o=n.getState().columnVisibility)==null?void 0:o[e.id])!=null?t:!0},e.getCanHide=()=>{var t,o;return((t=e.columnDef.enableHiding)!=null?t:!0)&&((o=n.options.enableHiding)!=null?o:!0)},e.getToggleVisibilityHandler=()=>t=>{e.toggleVisibility==null||e.toggleVisibility(t.target.checked)}},createRow:(e,n)=>{e._getAllVisibleCells=R(()=>[e.getAllCells(),n.getState().columnVisibility],t=>t.filter(o=>o.column.getIsVisible()),$(n.options,"debugRows")),e.getVisibleCells=R(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(t,o,r)=>[...t,...o,...r],$(n.options,"debugRows"))},createTable:e=>{const n=(t,o)=>R(()=>[o(),o().filter(r=>r.getIsVisible()).map(r=>r.id).join("_")],r=>r.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),$(e.options,"debugColumns"));e.getVisibleFlatColumns=n("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=n("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=n("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=n("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=n("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=t=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(t),e.resetColumnVisibility=t=>{var o;e.setColumnVisibility(t?{}:(o=e.initialState.columnVisibility)!=null?o:{})},e.toggleAllColumnsVisible=t=>{var o;t=(o=t)!=null?o:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((r,i)=>({...r,[i.id]:t||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(t=>!(t.getIsVisible!=null&&t.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(t=>t.getIsVisible==null?void 0:t.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>t=>{var o;e.toggleAllColumnsVisible((o=t.target)==null?void 0:o.checked)}}};function ge(e,n){return n?n==="center"?e.getCenterVisibleLeafColumns():n==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const In={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},Vn={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:G("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:n=>{var t;const o=(t=e.getCoreRowModel().flatRows[0])==null||(t=t._getAllCellsByColumnId()[n.id])==null?void 0:t.getValue();return typeof o=="string"||typeof o=="number"}}),createColumn:(e,n)=>{e.getCanGlobalFilter=()=>{var t,o,r,i;return((t=e.columnDef.enableGlobalFilter)!=null?t:!0)&&((o=n.options.enableGlobalFilter)!=null?o:!0)&&((r=n.options.enableFilters)!=null?r:!0)&&((i=n.options.getColumnCanGlobalFilter==null?void 0:n.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>q.includesString,e.getGlobalFilterFn=()=>{var n,t;const{globalFilterFn:o}=e.options;return we(o)?o:o==="auto"?e.getGlobalAutoFilterFn():(n=(t=e.options.filterFns)==null?void 0:t[o])!=null?n:q[o]},e.setGlobalFilter=n=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(n)},e.resetGlobalFilter=n=>{e.setGlobalFilter(n?void 0:e.initialState.globalFilter)}}},En={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:G("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let n=!1,t=!1;e._autoResetExpanded=()=>{var o,r;if(!n){e._queue(()=>{n=!0});return}if((o=(r=e.options.autoResetAll)!=null?r:e.options.autoResetExpanded)!=null?o:!e.options.manualExpanding){if(t)return;t=!0,e._queue(()=>{e.resetExpanded(),t=!1})}},e.setExpanded=o=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(o),e.toggleAllRowsExpanded=o=>{o??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=o=>{var r,i;e.setExpanded(o?{}:(r=(i=e.initialState)==null?void 0:i.expanded)!=null?r:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(o=>o.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>o=>{o.persist==null||o.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const o=e.getState().expanded;return o===!0||Object.values(o).some(Boolean)},e.getIsAllRowsExpanded=()=>{const o=e.getState().expanded;return typeof o=="boolean"?o===!0:!(!Object.keys(o).length||e.getRowModel().flatRows.some(r=>!r.getIsExpanded()))},e.getExpandedDepth=()=>{let o=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");o=Math.max(o,s.length)}),o},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,n)=>{e.toggleExpanded=t=>{n.setExpanded(o=>{var r;const i=o===!0?!0:!!(o!=null&&o[e.id]);let s={};if(o===!0?Object.keys(n.getRowModel().rowsById).forEach(l=>{s[l]=!0}):s=o,t=(r=t)!=null?r:!i,!i&&t)return{...s,[e.id]:!0};if(i&&!t){const{[e.id]:l,...a}=s;return a}return o})},e.getIsExpanded=()=>{var t;const o=n.getState().expanded;return!!((t=n.options.getIsRowExpanded==null?void 0:n.options.getIsRowExpanded(e))!=null?t:o===!0||o!=null&&o[e.id])},e.getCanExpand=()=>{var t,o,r;return(t=n.options.getRowCanExpand==null?void 0:n.options.getRowCanExpand(e))!=null?t:((o=n.options.enableExpanding)!=null?o:!0)&&!!((r=e.subRows)!=null&&r.length)},e.getIsAllParentsExpanded=()=>{let t=!0,o=e;for(;t&&o.parentId;)o=n.getRow(o.parentId,!0),t=o.getIsExpanded();return t},e.getToggleExpandedHandler=()=>{const t=e.getCanExpand();return()=>{t&&e.toggleExpanded()}}}},ke=0,Ge=10,_e=()=>({pageIndex:ke,pageSize:Ge}),bn={getInitialState:e=>({...e,pagination:{..._e(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:G("pagination",e)}),createTable:e=>{let n=!1,t=!1;e._autoResetPageIndex=()=>{var o,r;if(!n){e._queue(()=>{n=!0});return}if((o=(r=e.options.autoResetAll)!=null?r:e.options.autoResetPageIndex)!=null?o:!e.options.manualPagination){if(t)return;t=!0,e._queue(()=>{e.resetPageIndex(),t=!1})}},e.setPagination=o=>{const r=i=>J(o,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(r)},e.resetPagination=o=>{var r;e.setPagination(o?_e():(r=e.initialState.pagination)!=null?r:_e())},e.setPageIndex=o=>{e.setPagination(r=>{let i=J(o,r.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...r,pageIndex:i}})},e.resetPageIndex=o=>{var r,i;e.setPageIndex(o?ke:(r=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?r:ke)},e.resetPageSize=o=>{var r,i;e.setPageSize(o?Ge:(r=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?r:Ge)},e.setPageSize=o=>{e.setPagination(r=>{const i=Math.max(1,J(o,r.pageSize)),s=r.pageSize*r.pageIndex,l=Math.floor(s/i);return{...r,pageIndex:l,pageSize:i}})},e.setPageCount=o=>e.setPagination(r=>{var i;let s=J(o,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...r,pageCount:s}}),e.getPageOptions=R(()=>[e.getPageCount()],o=>{let r=[];return o&&o>0&&(r=[...new Array(o)].fill(null).map((i,s)=>s)),r},$(e.options,"debugTable")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:o}=e.getState().pagination,r=e.getPageCount();return r===-1?!0:r===0?!1:o<r-1},e.previousPage=()=>e.setPageIndex(o=>o-1),e.nextPage=()=>e.setPageIndex(o=>o+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var o;return(o=e.options.pageCount)!=null?o:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var o;return(o=e.options.rowCount)!=null?o:e.getPrePaginationRowModel().rows.length}}},Me=()=>({top:[],bottom:[]}),zn={getInitialState:e=>({rowPinning:Me(),...e}),getDefaultOptions:e=>({onRowPinningChange:G("rowPinning",e)}),createRow:(e,n)=>{e.pin=(t,o,r)=>{const i=o?e.getLeafRows().map(a=>{let{id:d}=a;return d}):[],s=r?e.getParentRows().map(a=>{let{id:d}=a;return d}):[],l=new Set([...s,e.id,...i]);n.setRowPinning(a=>{var d,c;if(t==="bottom"){var g,f;return{top:((g=a==null?void 0:a.top)!=null?g:[]).filter(S=>!(l!=null&&l.has(S))),bottom:[...((f=a==null?void 0:a.bottom)!=null?f:[]).filter(S=>!(l!=null&&l.has(S))),...Array.from(l)]}}if(t==="top"){var u,p;return{top:[...((u=a==null?void 0:a.top)!=null?u:[]).filter(S=>!(l!=null&&l.has(S))),...Array.from(l)],bottom:((p=a==null?void 0:a.bottom)!=null?p:[]).filter(S=>!(l!=null&&l.has(S)))}}return{top:((d=a==null?void 0:a.top)!=null?d:[]).filter(S=>!(l!=null&&l.has(S))),bottom:((c=a==null?void 0:a.bottom)!=null?c:[]).filter(S=>!(l!=null&&l.has(S)))}})},e.getCanPin=()=>{var t;const{enableRowPinning:o,enablePinning:r}=n.options;return typeof o=="function"?o(e):(t=o??r)!=null?t:!0},e.getIsPinned=()=>{const t=[e.id],{top:o,bottom:r}=n.getState().rowPinning,i=t.some(l=>o==null?void 0:o.includes(l)),s=t.some(l=>r==null?void 0:r.includes(l));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var t,o;const r=e.getIsPinned();if(!r)return-1;const i=(t=r==="top"?n.getTopRows():n.getBottomRows())==null?void 0:t.map(s=>{let{id:l}=s;return l});return(o=i==null?void 0:i.indexOf(e.id))!=null?o:-1}},createTable:e=>{e.setRowPinning=n=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(n),e.resetRowPinning=n=>{var t,o;return e.setRowPinning(n?Me():(t=(o=e.initialState)==null?void 0:o.rowPinning)!=null?t:Me())},e.getIsSomeRowsPinned=n=>{var t;const o=e.getState().rowPinning;if(!n){var r,i;return!!((r=o.top)!=null&&r.length||(i=o.bottom)!=null&&i.length)}return!!((t=o[n])!=null&&t.length)},e._getPinnedRows=(n,t,o)=>{var r;return((r=e.options.keepPinnedRows)==null||r?(t??[]).map(s=>{const l=e.getRow(s,!0);return l.getIsAllParentsExpanded()?l:null}):(t??[]).map(s=>n.find(l=>l.id===s))).filter(Boolean).map(s=>({...s,position:o}))},e.getTopRows=R(()=>[e.getRowModel().rows,e.getState().rowPinning.top],(n,t)=>e._getPinnedRows(n,t,"top"),$(e.options,"debugRows")),e.getBottomRows=R(()=>[e.getRowModel().rows,e.getState().rowPinning.bottom],(n,t)=>e._getPinnedRows(n,t,"bottom"),$(e.options,"debugRows")),e.getCenterRows=R(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(n,t,o)=>{const r=new Set([...t??[],...o??[]]);return n.filter(i=>!r.has(i.id))},$(e.options,"debugRows"))}},Dn={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:G("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=n=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(n),e.resetRowSelection=n=>{var t;return e.setRowSelection(n?{}:(t=e.initialState.rowSelection)!=null?t:{})},e.toggleAllRowsSelected=n=>{e.setRowSelection(t=>{n=typeof n<"u"?n:!e.getIsAllRowsSelected();const o={...t},r=e.getPreGroupedRowModel().flatRows;return n?r.forEach(i=>{i.getCanSelect()&&(o[i.id]=!0)}):r.forEach(i=>{delete o[i.id]}),o})},e.toggleAllPageRowsSelected=n=>e.setRowSelection(t=>{const o=typeof n<"u"?n:!e.getIsAllPageRowsSelected(),r={...t};return e.getRowModel().rows.forEach(i=>{Te(r,i.id,o,!0,e)}),r}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=R(()=>[e.getState().rowSelection,e.getCoreRowModel()],(n,t)=>Object.keys(n).length?Fe(e,t):{rows:[],flatRows:[],rowsById:{}},$(e.options,"debugTable")),e.getFilteredSelectedRowModel=R(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(n,t)=>Object.keys(n).length?Fe(e,t):{rows:[],flatRows:[],rowsById:{}},$(e.options,"debugTable")),e.getGroupedSelectedRowModel=R(()=>[e.getState().rowSelection,e.getSortedRowModel()],(n,t)=>Object.keys(n).length?Fe(e,t):{rows:[],flatRows:[],rowsById:{}},$(e.options,"debugTable")),e.getIsAllRowsSelected=()=>{const n=e.getFilteredRowModel().flatRows,{rowSelection:t}=e.getState();let o=!!(n.length&&Object.keys(t).length);return o&&n.some(r=>r.getCanSelect()&&!t[r.id])&&(o=!1),o},e.getIsAllPageRowsSelected=()=>{const n=e.getPaginationRowModel().flatRows.filter(r=>r.getCanSelect()),{rowSelection:t}=e.getState();let o=!!n.length;return o&&n.some(r=>!t[r.id])&&(o=!1),o},e.getIsSomeRowsSelected=()=>{var n;const t=Object.keys((n=e.getState().rowSelection)!=null?n:{}).length;return t>0&&t<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const n=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:n.filter(t=>t.getCanSelect()).some(t=>t.getIsSelected()||t.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>n=>{e.toggleAllRowsSelected(n.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>n=>{e.toggleAllPageRowsSelected(n.target.checked)}},createRow:(e,n)=>{e.toggleSelected=(t,o)=>{const r=e.getIsSelected();n.setRowSelection(i=>{var s;if(t=typeof t<"u"?t:!r,e.getCanSelect()&&r===t)return i;const l={...i};return Te(l,e.id,t,(s=o==null?void 0:o.selectChildren)!=null?s:!0,n),l})},e.getIsSelected=()=>{const{rowSelection:t}=n.getState();return qe(e,t)},e.getIsSomeSelected=()=>{const{rowSelection:t}=n.getState();return Be(e,t)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:t}=n.getState();return Be(e,t)==="all"},e.getCanSelect=()=>{var t;return typeof n.options.enableRowSelection=="function"?n.options.enableRowSelection(e):(t=n.options.enableRowSelection)!=null?t:!0},e.getCanSelectSubRows=()=>{var t;return typeof n.options.enableSubRowSelection=="function"?n.options.enableSubRowSelection(e):(t=n.options.enableSubRowSelection)!=null?t:!0},e.getCanMultiSelect=()=>{var t;return typeof n.options.enableMultiRowSelection=="function"?n.options.enableMultiRowSelection(e):(t=n.options.enableMultiRowSelection)!=null?t:!0},e.getToggleSelectedHandler=()=>{const t=e.getCanSelect();return o=>{var r;t&&e.toggleSelected((r=o.target)==null?void 0:r.checked)}}}},Te=(e,n,t,o,r)=>{var i;const s=r.getRow(n,!0);t?(s.getCanMultiSelect()||Object.keys(e).forEach(l=>delete e[l]),s.getCanSelect()&&(e[n]=!0)):delete e[n],o&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(l=>Te(e,l.id,t,o,r))};function Fe(e,n){const t=e.getState().rowSelection,o=[],r={},i=function(s,l){return s.map(a=>{var d;const c=qe(a,t);if(c&&(o.push(a),r[a.id]=a),(d=a.subRows)!=null&&d.length&&(a={...a,subRows:i(a.subRows)}),c)return a}).filter(Boolean)};return{rows:i(n.rows),flatRows:o,rowsById:r}}function qe(e,n){var t;return(t=n[e.id])!=null?t:!1}function Be(e,n,t){var o;if(!((o=e.subRows)!=null&&o.length))return!1;let r=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!r)&&(s.getCanSelect()&&(qe(s,n)?i=!0:r=!1),s.subRows&&s.subRows.length)){const l=Be(s,n);l==="all"?i=!0:(l==="some"&&(i=!0),r=!1)}}),r?"all":i?"some":!1}const Ne=/([0-9]+)/gm,Ln=(e,n,t)=>$t(ee(e.getValue(t)).toLowerCase(),ee(n.getValue(t)).toLowerCase()),Hn=(e,n,t)=>$t(ee(e.getValue(t)),ee(n.getValue(t))),On=(e,n,t)=>Ke(ee(e.getValue(t)).toLowerCase(),ee(n.getValue(t)).toLowerCase()),An=(e,n,t)=>Ke(ee(e.getValue(t)),ee(n.getValue(t))),jn=(e,n,t)=>{const o=e.getValue(t),r=n.getValue(t);return o>r?1:o<r?-1:0},kn=(e,n,t)=>Ke(e.getValue(t),n.getValue(t));function Ke(e,n){return e===n?0:e>n?1:-1}function ee(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function $t(e,n){const t=e.split(Ne).filter(Boolean),o=n.split(Ne).filter(Boolean);for(;t.length&&o.length;){const r=t.shift(),i=o.shift(),s=parseInt(r,10),l=parseInt(i,10),a=[s,l].sort();if(isNaN(a[0])){if(r>i)return 1;if(i>r)return-1;continue}if(isNaN(a[1]))return isNaN(s)?-1:1;if(s>l)return 1;if(l>s)return-1}return t.length-o.length}const ue={alphanumeric:Ln,alphanumericCaseSensitive:Hn,text:On,textCaseSensitive:An,datetime:jn,basic:kn},Gn={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:G("sorting",e),isMultiSortEvent:n=>n.shiftKey}),createColumn:(e,n)=>{e.getAutoSortingFn=()=>{const t=n.getFilteredRowModel().flatRows.slice(10);let o=!1;for(const r of t){const i=r==null?void 0:r.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return ue.datetime;if(typeof i=="string"&&(o=!0,i.split(Ne).length>1))return ue.alphanumeric}return o?ue.text:ue.basic},e.getAutoSortDir=()=>{const t=n.getFilteredRowModel().flatRows[0];return typeof(t==null?void 0:t.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var t,o;if(!e)throw new Error;return we(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(t=(o=n.options.sortingFns)==null?void 0:o[e.columnDef.sortingFn])!=null?t:ue[e.columnDef.sortingFn]},e.toggleSorting=(t,o)=>{const r=e.getNextSortingOrder(),i=typeof t<"u"&&t!==null;n.setSorting(s=>{const l=s==null?void 0:s.find(u=>u.id===e.id),a=s==null?void 0:s.findIndex(u=>u.id===e.id);let d=[],c,g=i?t:r==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&o?l?c="toggle":c="add":s!=null&&s.length&&a!==s.length-1?c="replace":l?c="toggle":c="replace",c==="toggle"&&(i||r||(c="remove")),c==="add"){var f;d=[...s,{id:e.id,desc:g}],d.splice(0,d.length-((f=n.options.maxMultiSortColCount)!=null?f:Number.MAX_SAFE_INTEGER))}else c==="toggle"?d=s.map(u=>u.id===e.id?{...u,desc:g}:u):c==="remove"?d=s.filter(u=>u.id!==e.id):d=[{id:e.id,desc:g}];return d})},e.getFirstSortDir=()=>{var t,o;return((t=(o=e.columnDef.sortDescFirst)!=null?o:n.options.sortDescFirst)!=null?t:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=t=>{var o,r;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((o=n.options.enableSortingRemoval)==null||o)&&(!(t&&(r=n.options.enableMultiRemove)!=null)||r)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var t,o;return((t=e.columnDef.enableSorting)!=null?t:!0)&&((o=n.options.enableSorting)!=null?o:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var t,o;return(t=(o=e.columnDef.enableMultiSort)!=null?o:n.options.enableMultiSort)!=null?t:!!e.accessorFn},e.getIsSorted=()=>{var t;const o=(t=n.getState().sorting)==null?void 0:t.find(r=>r.id===e.id);return o?o.desc?"desc":"asc":!1},e.getSortIndex=()=>{var t,o;return(t=(o=n.getState().sorting)==null?void 0:o.findIndex(r=>r.id===e.id))!=null?t:-1},e.clearSorting=()=>{n.setSorting(t=>t!=null&&t.length?t.filter(o=>o.id!==e.id):[])},e.getToggleSortingHandler=()=>{const t=e.getCanSort();return o=>{t&&(o.persist==null||o.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?n.options.isMultiSortEvent==null?void 0:n.options.isMultiSortEvent(o):!1))}}},createTable:e=>{e.setSorting=n=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(n),e.resetSorting=n=>{var t,o;e.setSorting(n?[]:(t=(o=e.initialState)==null?void 0:o.sorting)!=null?t:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},Tn=[an,Pn,$n,yn,dn,cn,In,Vn,Gn,xn,En,bn,zn,Dn,Mn];function Bn(e){var n,t;const o=[...Tn,...(n=e._features)!=null?n:[]];let r={_features:o};const i=r._features.reduce((f,u)=>Object.assign(f,u.getDefaultOptions==null?void 0:u.getDefaultOptions(r)),{}),s=f=>r.options.mergeOptions?r.options.mergeOptions(i,f):{...i,...f};let a={...{},...(t=e.initialState)!=null?t:{}};r._features.forEach(f=>{var u;a=(u=f.getInitialState==null?void 0:f.getInitialState(a))!=null?u:a});const d=[];let c=!1;const g={_features:o,options:{...i,...e},initialState:a,_queue:f=>{d.push(f),c||(c=!0,Promise.resolve().then(()=>{for(;d.length;)d.shift()();c=!1}).catch(u=>setTimeout(()=>{throw u})))},reset:()=>{r.setState(r.initialState)},setOptions:f=>{const u=J(f,r.options);r.options=s(u)},getState:()=>r.options.state,setState:f=>{r.options.onStateChange==null||r.options.onStateChange(f)},_getRowId:(f,u,p)=>{var S;return(S=r.options.getRowId==null?void 0:r.options.getRowId(f,u,p))!=null?S:`${p?[p.id,u].join("."):u}`},getCoreRowModel:()=>(r._getCoreRowModel||(r._getCoreRowModel=r.options.getCoreRowModel(r)),r._getCoreRowModel()),getRowModel:()=>r.getPaginationRowModel(),getRow:(f,u)=>{let p=(u?r.getPrePaginationRowModel():r.getRowModel()).rowsById[f];if(!p&&(p=r.getCoreRowModel().rowsById[f],!p))throw new Error;return p},_getDefaultColumnDef:R(()=>[r.options.defaultColumn],f=>{var u;return f=(u=f)!=null?u:{},{header:p=>{const S=p.header.column.columnDef;return S.accessorKey?S.accessorKey:S.accessorFn?S.id:null},cell:p=>{var S,C;return(S=(C=p.renderValue())==null||C.toString==null?void 0:C.toString())!=null?S:null},...r._features.reduce((p,S)=>Object.assign(p,S.getDefaultColumnDef==null?void 0:S.getDefaultColumnDef()),{}),...f}},$(e,"debugColumns")),_getColumnDefs:()=>r.options.columns,getAllColumns:R(()=>[r._getColumnDefs()],f=>{const u=function(p,S,C){return C===void 0&&(C=0),p.map(v=>{const w=ln(r,v,C,S),x=v;return w.columns=x.columns?u(x.columns,w,C+1):[],w})};return u(f)},$(e,"debugColumns")),getAllFlatColumns:R(()=>[r.getAllColumns()],f=>f.flatMap(u=>u.getFlatColumns()),$(e,"debugColumns")),_getAllFlatColumnsById:R(()=>[r.getAllFlatColumns()],f=>f.reduce((u,p)=>(u[p.id]=p,u),{}),$(e,"debugColumns")),getAllLeafColumns:R(()=>[r.getAllColumns(),r._getOrderColumnsFn()],(f,u)=>{let p=f.flatMap(S=>S.getLeafColumns());return u(p)},$(e,"debugColumns")),getColumn:f=>r._getAllFlatColumnsById()[f]};Object.assign(r,g);for(let f=0;f<r._features.length;f++){const u=r._features[f];u==null||u.createTable==null||u.createTable(r)}return r}function Nn(){return e=>R(()=>[e.options.data],n=>{const t={rows:[],flatRows:[],rowsById:{}},o=function(r,i,s){i===void 0&&(i=0);const l=[];for(let d=0;d<r.length;d++){const c=un(e,e._getRowId(r[d],d,s),r[d],d,i,void 0,s==null?void 0:s.id);if(t.flatRows.push(c),t.rowsById[c.id]=c,l.push(c),e.options.getSubRows){var a;c.originalSubRows=e.options.getSubRows(r[d],d),(a=c.originalSubRows)!=null&&a.length&&(c.subRows=o(c.originalSubRows,i+1,c))}}return l};return t.rows=o(n),t},$(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function lt(e,n){return e?Un(e)?F.createElement(e,n):e:null}function Un(e){return Qn(e)||typeof e=="function"||Wn(e)}function Qn(e){return typeof e=="function"&&(()=>{const n=Object.getPrototypeOf(e);return n.prototype&&n.prototype.isReactComponent})()}function Wn(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function qn(e){const n={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[t]=F.useState(()=>({current:Bn(n)})),[o,r]=F.useState(()=>t.current.initialState);return t.current.setOptions(i=>({...i,...e,state:{...o,...e.state},onStateChange:s=>{r(s),e.onStateChange==null||e.onStateChange(s)}})),t.current}const Kn=y.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`,Xn=y.label`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$disabled:e})=>e?.6:1};
  user-select: none;
`,yt=y.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`,Yn=y.div`
  width: 18px;
  height: 18px;
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({theme:e})=>e.transition.fast};
  flex-shrink: 0;

  ${({theme:e,$checked:n,$indeterminate:t,$hasError:o})=>n||t?U`
          background-color: ${o?e.colors.danger:e.colors.primary};
          border: 1.5px solid ${o?e.colors.danger:e.colors.primary};
          color: #ffffff;
        `:U`
          background-color: ${e.colors.surface};
          border: 1.5px solid ${o?e.colors.danger:e.colors.border};
          color: transparent;

          &:hover {
            border-color: ${o?e.colors.danger:e.colors.primary};
            background-color: ${e.colors.surfaceHover};
          }
        `}

  ${yt}:focus-visible + & {
    box-shadow: 0 0 0 3px
      ${({theme:e,$hasError:n})=>n?`${e.colors.danger}22`:`${e.colors.primary}22`};
    border-color: ${({theme:e,$hasError:n})=>n?e.colors.danger:e.colors.primary};
  }
`,Zn=y.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,Jn=y.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,Ue=F.forwardRef(({label:e,error:n,checked:t,defaultChecked:o=!1,indeterminate:r=!1,disabled:i=!1,id:s,className:l,style:a,onChange:d,...c},g)=>{const f=F.useRef(null);F.useImperativeHandle(g,()=>f.current);const[u,p]=F.useState(t!==void 0?t:o);F.useEffect(()=>{t!==void 0&&p(t)},[t]),F.useEffect(()=>{f.current&&(f.current.indeterminate=!!r)},[r]);const S=w=>{i||(t===void 0&&p(w.target.checked),d&&d(w))},C=s||`checkbox-${Math.random().toString(36).slice(2,9)}`,v=t!==void 0?t:u;return m.jsxs(Kn,{children:[m.jsxs(Xn,{$disabled:i,htmlFor:C,className:l,style:a,children:[m.jsx(yt,{ref:f,type:"checkbox",id:C,checked:v,disabled:i,onChange:S,...c}),m.jsx(Yn,{$checked:v,$indeterminate:r,$hasError:!!n,$disabled:i,children:r?m.jsx(zt,{size:14}):v&&m.jsx(ct,{size:14})}),e&&m.jsx(Zn,{children:e})]}),n&&m.jsx(Jn,{role:"alert",children:n})]})});Ue.displayName="Checkbox";const eo=y.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({$fullWidth:e})=>e?"100%":"auto"};
  position: relative;
`,to=y.label`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,no=y.div`
  position: relative;
  width: 100%;
`,oo=y.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.text};
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1.5px solid
    ${({theme:e,$hasError:n,$isOpen:t})=>n?e.colors.danger:t?e.colors.borderFocus:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  outline: none;
  cursor: ${({$isDisabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$isDisabled:e})=>e?.6:1};
  transition: all ${({theme:e})=>e.transition.fast};
  user-select: none;

  &:focus-visible {
    border-color: ${({theme:e,$hasError:n})=>n?e.colors.danger:e.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({theme:e,$hasError:n})=>n?`${e.colors.danger}22`:`${e.colors.primary}22`};
  }

  ${({$isOpen:e,theme:n,$hasError:t})=>e&&U`
      box-shadow: 0 0 0 3px
        ${t?`${n.colors.danger}22`:`${n.colors.primary}22`};
    `}
`,ro=y.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({theme:e,$isPlaceholder:n})=>n?e.colors.textMuted:e.colors.text};
`,io=y.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.textMuted};
  transition: transform ${({theme:e})=>e.transition.fast};
  transform: ${({$isOpen:e})=>e?"rotate(180deg)":"rotate(0deg)"};
`,so=y.ul`
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
`,lo=y.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e,$isSelected:n,$isDisabled:t})=>t?e.colors.textMuted:n?e.colors.primary:e.colors.text};
  font-weight: ${({theme:e,$isSelected:n})=>n?e.fontWeight.semibold:e.fontWeight.normal};
  background-color: ${({theme:e,$isSelected:n})=>n?`${e.colors.primary}12`:"transparent"};
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  cursor: ${({$isDisabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$isDisabled:e})=>e?.55:1};
  transition: background-color ${({theme:e})=>e.transition.fast};
  user-select: none;

  &:hover {
    background-color: ${({theme:e,$isSelected:n,$isDisabled:t})=>t?"transparent":n?`${e.colors.primary}20`:e.colors.surfaceHover};
  }
`,ao=y.span`
  opacity: 0.65;
  font-size: 11px;
  margin-left: 6px;
`,uo=y.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,_t=Dt.forwardRef(({label:e,options:n,value:t,defaultValue:o,onChange:r,placeholder:i="Select an option",error:s,fullWidth:l=!0,disabled:a=!1,name:d,id:c,style:g,className:f},u)=>{const[p,S]=F.useState(!1),[C,v]=F.useState(t!==void 0?t:o||""),[w,x]=F.useState({}),P=F.useRef(null),V=F.useRef(null),z=F.useRef(null);F.useEffect(()=>{t!==void 0&&v(t)},[t]);const B=F.useCallback(()=>{if(!V.current)return;const _=V.current.getBoundingClientRect(),k=window.innerHeight-_.bottom<220&&_.top>220;x({position:"fixed",left:`${_.left}px`,width:`${_.width}px`,zIndex:99999,...k?{bottom:`${window.innerHeight-_.top+4}px`,top:"auto",boxShadow:"0 -10px 25px -5px rgba(0, 0, 0, 0.2), 0 -8px 10px -6px rgba(0, 0, 0, 0.1)"}:{top:`${_.bottom+4}px`,bottom:"auto",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"}})},[]);F.useEffect(()=>{if(!p)return;B();const _=()=>{B()};return window.addEventListener("scroll",_,!0),window.addEventListener("resize",_),()=>{window.removeEventListener("scroll",_,!0),window.removeEventListener("resize",_)}},[p,B]),F.useEffect(()=>{if(!p)return;const _=N=>{var Xe,Ye;const k=N.target,Mt=(Xe=P.current)==null?void 0:Xe.contains(k),Ft=(Ye=z.current)==null?void 0:Ye.contains(k);!Mt&&!Ft&&S(!1)};return document.addEventListener("mousedown",_),()=>{document.removeEventListener("mousedown",_)}},[p]);const L=()=>{a||(p||B(),S(_=>!_))},X=n.find(_=>_.value===C),H=_=>{a||_.disabled||(v(_.value),S(!1),r&&r({target:{value:_.value,name:d}}))},W=_=>{a||(_.key==="Enter"||_.key===" "?(_.preventDefault(),L()):_.key==="Escape"&&S(!1))},te=c||`select-${Math.random().toString(36).slice(2,9)}`;return m.jsxs(eo,{$fullWidth:l,style:g,className:f,ref:u,children:[e&&m.jsx(to,{htmlFor:te,children:e}),m.jsxs(no,{ref:P,children:[m.jsxs(oo,{ref:V,id:te,type:"button",$isOpen:p,$hasError:!!s,$isDisabled:a,disabled:a,onClick:L,onKeyDown:W,"aria-haspopup":"listbox","aria-expanded":p,children:[m.jsx(ro,{$isPlaceholder:!X,children:X?X.label:i}),m.jsx(io,{$isOpen:p,children:m.jsx(Lt,{size:18})})]}),p&&gt.createPortal(m.jsx(so,{ref:z,role:"listbox",style:w,children:n.map(_=>{const N=_.value===C,k=!!_.disabled;return m.jsxs(lo,{role:"option","aria-selected":N,"aria-disabled":k,$isSelected:N,$isDisabled:k,onClick:()=>H(_),children:[m.jsxs("span",{children:[_.label,k&&m.jsx(ao,{children:"(Coming Soon)"})]}),N&&m.jsx(ct,{size:16})]},_.value)})}),document.body)]}),s&&m.jsx(uo,{role:"alert",children:s})]})});_t.displayName="Select";const co=y.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,go=y.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,fo=y.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,po=y.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,ho=y.div`
  width: 80px;
`,mo=y.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,Pe=y.button`
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e,$active:n})=>n?e.fontWeight.semibold:e.fontWeight.normal};
  color: ${({theme:e,$active:n})=>n?e.colors.textInverse:e.colors.textSecondary};
  background-color: ${({theme:e,$active:n})=>n?e.colors.primary:"transparent"};
  border: 1.5px solid
    ${({theme:e,$active:n})=>n?e.colors.primary:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover:not(:disabled) {
    background-color: ${({theme:e,$active:n})=>n?e.colors.primaryHover:e.colors.surfaceHover};
    border-color: ${({theme:e,$active:n})=>n?e.colors.primaryHover:e.colors.textMuted};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,So=({page:e,totalPages:n,total:t,limit:o,onPageChange:r,onLimitChange:i})=>{const s=Math.min((e-1)*o+1,t),l=Math.min(e*o,t),a=Array.from({length:n},(g,f)=>f+1).filter(g=>g===1||g===n||Math.abs(g-e)<=1),d=[];a.forEach((g,f)=>{f>0&&g-a[f-1]>1&&d.push("..."),d.push(g)});const c=[{value:"10",label:"10"},{value:"20",label:"20"},{value:"50",label:"50"},{value:"100",label:"100"}];return m.jsxs(co,{children:[m.jsxs(go,{children:["Showing ",s,"–",l," of ",t," results"]}),m.jsxs(fo,{children:[i&&m.jsxs(po,{children:[m.jsx("span",{children:"Rows per page:"}),m.jsx(ho,{children:m.jsx(_t,{options:c,value:String(o),onChange:g=>i(Number(g.target.value)),fullWidth:!1})})]}),m.jsxs(mo,{children:[m.jsx(Pe,{"aria-label":"Previous Page",disabled:e<=1,onClick:()=>r(e-1),children:m.jsx(Ht,{size:16})}),d.map((g,f)=>g==="..."?m.jsx("span",{style:{padding:"0 4px",color:"#94a3b8"},children:"..."},`ellipsis-${f}`):m.jsx(Pe,{$active:g===e,onClick:()=>r(g),children:g},g)),m.jsx(Pe,{"aria-label":"Next Page",disabled:e>=n,onClick:()=>r(e+1),children:m.jsx(Ot,{size:16})})]})]})]})},vo=y.div`
  width: 100%;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  background-color: ${({theme:e})=>e.colors.surface};
  overflow: hidden;
`,wo=y.div`
  width: 100%;
  overflow-x: auto;
`,Co=y.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({theme:e})=>e.fontSize.base};
`,xo=y.thead`
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
`,Ro=y.tbody`
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
`,$o=y.div`
  padding: ${({theme:e})=>e.spacing.xxxl} ${({theme:e})=>e.spacing.xl};
  text-align: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: ${({theme:e})=>e.fontSize.base};
`,ko=y.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`;y.button`
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
`;const yo=y.div`
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`;function Go({columns:e,data:n,isLoading:t,emptyMessage:o="No data found.",keyExtractor:r,selectable:i=!1,selectedRowIds:s=[],onSelectionChange:l,pagination:a}){const d=F.useMemo(()=>{const w=e.find(x=>x.key==="actions"||x.header.toLowerCase()==="actions");return w?[w,...e.filter(x=>x!==w)]:e},[e]),c=F.useMemo(()=>n.map(r),[n,r]),g=F.useMemo(()=>c.length>0&&c.every(w=>s.includes(w)),[c,s]),f=F.useMemo(()=>c.some(w=>s.includes(w)),[c,s]),u=()=>{l&&l(g?[]:c)},p=w=>{l&&(s.includes(w)?l(s.filter(x=>x!==w)):l([...s,w]))},S=F.useMemo(()=>d.map(w=>({id:w.key,header:()=>w.header,accessorFn:x=>x[w.key],cell:x=>{if(w.render)return w.render(x.row.original,x.row.index);const P=x.row.original[w.key];return P!=null?String(P):"—"},size:w.width?parseInt(w.width,10):void 0})),[d]),C=qn({data:n,columns:S,getCoreRowModel:Nn()}),v=(i?1:0)+e.length+1;return m.jsxs(vo,{children:[m.jsx(wo,{children:m.jsxs(Co,{children:[m.jsx(xo,{children:C.getHeaderGroups().map(w=>m.jsxs("tr",{children:[i&&m.jsx("th",{style:{width:"48px",minWidth:"48px",textAlign:"center"},children:m.jsx(Ue,{checked:g,indeterminate:f&&!g,onChange:u})}),w.headers.map(x=>{const P=d.find(z=>z.key===x.id),V=(P==null?void 0:P.key)==="actions"||x.id==="actions";return m.jsx("th",{className:P!=null&&P.sortable?"sortable":"",style:{width:(P==null?void 0:P.width)||(V?"100px":void 0),minWidth:V?"100px":void 0},children:x.isPlaceholder?null:lt(x.column.columnDef.header,x.getContext())},x.id)}),m.jsx("th",{style:{width:"100%",minWidth:0,padding:0}})]},w.id))}),m.jsx(Ro,{children:t?m.jsx("tr",{children:m.jsx("td",{colSpan:v,children:m.jsx(At,{})})}):C.getRowModel().rows.length===0?m.jsx("tr",{children:m.jsx("td",{colSpan:v,children:m.jsx($o,{children:o})})}):C.getRowModel().rows.map(w=>{const x=r(w.original),P=s.includes(x);return m.jsxs("tr",{children:[i&&m.jsx("td",{style:{width:"48px",minWidth:"48px",textAlign:"center"},children:m.jsx(Ue,{checked:P,onChange:()=>p(x)})}),w.getVisibleCells().map(V=>{const z=d.find(L=>L.key===V.column.id),B=(z==null?void 0:z.key)==="actions"||V.column.id==="actions";return m.jsx("td",{style:{width:(z==null?void 0:z.width)||(B?"100px":void 0),minWidth:B?"100px":void 0},children:lt(V.column.columnDef.cell,V.getContext())},V.id)}),m.jsx("td",{style:{width:"100%",minWidth:0,padding:0}})]},x)})})]})}),a&&a.totalPages>0&&m.jsx(yo,{children:m.jsx(So,{page:a.page,totalPages:a.totalPages,total:a.total,limit:a.limit,onPageChange:a.onPageChange,onLimitChange:a.onLimitChange})})]})}const _o={default:U`
    background-color: ${({theme:e})=>e.colors.surfaceHover};
    color: ${({theme:e})=>e.colors.textSecondary};
  `,success:U`
    background-color: ${({theme:e})=>e.colors.successLight};
    color: ${({theme:e})=>e.colors.success};
  `,warning:U`
    background-color: ${({theme:e})=>e.colors.warningLight};
    color: ${({theme:e})=>e.colors.warning};
  `,danger:U`
    background-color: ${({theme:e})=>e.colors.dangerLight};
    color: ${({theme:e})=>e.colors.danger};
  `,info:U`
    background-color: ${({theme:e})=>e.colors.infoLight};
    color: ${({theme:e})=>e.colors.info};
  `,primary:U`
    background-color: ${({theme:e})=>e.colors.primaryLight};
    color: ${({theme:e})=>e.colors.primary};
  `},Mo=y.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  border-radius: ${({theme:e})=>e.borderRadius.full};
  white-space: nowrap;

  ${({$size:e})=>e==="sm"?U`
          font-size: 11px;
          padding: 2px 8px;
        `:U`
          font-size: ${({theme:n})=>n.fontSize.sm};
          padding: 3px 10px;
        `}

  ${({$variant:e})=>_o[e]}
`,To=({variant:e="default",size:n="md",children:t,dot:o})=>m.jsxs(Mo,{$variant:e,$size:n,children:[o&&m.jsx("svg",{width:"6",height:"6",viewBox:"0 0 6 6",fill:"currentColor",children:m.jsx("circle",{cx:"3",cy:"3",r:"3"})}),t]}),Fo=jt`
  from { opacity: 0; }
  to { opacity: 1; }
`,Po=y.div`
  position: fixed;
  inset: 0;
  background-color: ${({theme:e})=>e.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({theme:e})=>e.zIndex.overlay};
  padding: ${({theme:e})=>e.spacing.lg};
  animation: ${Fo} 0.15s ease;
`,Io=y.div`
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
`,Vo=y.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.xl};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  flex-shrink: 0;
`,Eo=y.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,bo=y.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 4px;
`,zo=y.button`
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
`,Do=y.div`
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
`,Lo=y.div`
  padding: ${({theme:e})=>e.spacing.xl};
`,Ho=y.div`
  padding: ${({theme:e})=>e.spacing.lg} ${({theme:e})=>e.spacing.xl};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-shrink: 0;
`,Bo=({isOpen:e,onClose:n,title:t,subtitle:o,size:r="md",footer:i,children:s,closeOnBackdrop:l=!0})=>{const a=F.useCallback(d=>{d.key==="Escape"&&n()},[n]);return F.useEffect(()=>(e&&(document.addEventListener("keydown",a),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",a),document.body.style.overflow=""}),[e,a]),gt.createPortal(m.jsx(kt,{children:e&&m.jsx(Po,{onClick:l?n:void 0,role:"dialog","aria-modal":"true","aria-labelledby":"modal-title",children:m.jsx(Gt.div,{initial:{opacity:0,scale:.95,y:8},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:8},transition:{duration:.18,ease:"easeOut"},style:{width:"100%",display:"flex",justifyContent:"center"},onClick:d=>d.stopPropagation(),children:m.jsxs(Io,{$size:r,children:[(t||o)&&m.jsxs(Vo,{children:[m.jsxs("div",{children:[t&&m.jsx(Eo,{id:"modal-title",children:t}),o&&m.jsx(bo,{children:o})]}),m.jsx(zo,{onClick:n,"aria-label":"Close modal",children:m.jsx(Tt,{size:20})})]}),m.jsx(Do,{children:m.jsx(Lo,{children:s})}),i&&m.jsx(Ho,{children:i})]})})})}),document.body)};export{ko as A,To as B,Bo as M,_t as S,Go as T,jo as u};
