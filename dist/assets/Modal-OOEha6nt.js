var Je=e=>{throw TypeError(e)};var we=(e,n,t)=>n.has(e)||Je("Cannot "+t);var m=(e,n,t)=>(we(e,n,"read from private field"),t?t.call(e):n.get(e)),j=(e,n,t)=>n.has(e)?Je("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,t),b=(e,n,t,o)=>(we(e,n,"write to private field"),o?o.call(e,t):n.set(e,t),t),E=(e,n,t)=>(we(e,n,"access private method"),t);import{ae as It,al as Ye,am as T,af as Ie,an as ce,aj as Ve,ao as be,ap as et,aq as Vt,ar as he,as as bt,at as Et,au as tt,ai as ut,r as F,ak as dt,x as zt,j as g,a7 as ct,av as jt,g as x,ad as U,aw as Dt,W as gt,Z as Lt,ax as Ht,l as ft,a6 as Ot,L as At,ay as kt,az as Gt,ac as Tt,V as Bt}from"./index-sUU3b6j7.js";var A,M,fe,O,ne,ie,K,Z,pe,se,le,oe,re,J,ae,I,de,Ee,ze,je,De,Le,He,Oe,pt,at,Nt=(at=class extends It{constructor(n,t){super();j(this,I);j(this,A);j(this,M);j(this,fe);j(this,O);j(this,ne);j(this,ie);j(this,K);j(this,Z);j(this,pe);j(this,se);j(this,le);j(this,oe);j(this,re);j(this,J);j(this,ae,new Set);this.options=t,b(this,A,n),b(this,Z,null),b(this,K,Ye()),this.bindMethods(),this.setOptions(t)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(m(this,M).addObserver(this),nt(m(this,M),this.options)?E(this,I,de).call(this):this.updateResult(),E(this,I,De).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Ae(m(this,M),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Ae(m(this,M),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,E(this,I,Le).call(this),E(this,I,He).call(this),m(this,M).removeObserver(this)}setOptions(n){const t=this.options,o=m(this,M);if(this.options=m(this,A).defaultQueryOptions(n),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof T(this.options.enabled,m(this,M))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");E(this,I,Oe).call(this),m(this,M).setOptions(this.options),t._defaulted&&!Ie(this.options,t)&&m(this,A).getQueryCache().notify({type:"observerOptionsUpdated",query:m(this,M),observer:this});const r=this.hasListeners();r&&ot(m(this,M),o,this.options,t)&&E(this,I,de).call(this),this.updateResult(),r&&(m(this,M)!==o||T(this.options.enabled,m(this,M))!==T(t.enabled,m(this,M))||ce(this.options.staleTime,m(this,M))!==ce(t.staleTime,m(this,M)))&&E(this,I,Ee).call(this);const i=E(this,I,ze).call(this);r&&(m(this,M)!==o||T(this.options.enabled,m(this,M))!==T(t.enabled,m(this,M))||i!==m(this,J))&&E(this,I,je).call(this,i)}getOptimisticResult(n){const t=m(this,A).getQueryCache().build(m(this,A),n),o=this.createResult(t,n);return Wt(this,o)&&(b(this,O,o),b(this,ie,this.options),b(this,ne,m(this,M).state)),o}getCurrentResult(){return m(this,O)}trackResult(n,t){return new Proxy(n,{get:(o,r)=>(this.trackProp(r),t==null||t(r),r==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&m(this,K).status==="pending"&&m(this,K).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(o,r))})}trackProp(n){m(this,ae).add(n)}getCurrentQuery(){return m(this,M)}refetch({...n}={}){return this.fetch({...n})}fetchOptimistic(n){const t=m(this,A).defaultQueryOptions(n),o=m(this,A).getQueryCache().build(m(this,A),t);return o.fetch().then(()=>this.createResult(o,t))}fetch(n){return E(this,I,de).call(this,{...n,cancelRefetch:n.cancelRefetch??!0}).then(()=>(this.updateResult(),m(this,O)))}createResult(n,t){var X;const o=m(this,M),r=this.options,i=m(this,O),s=m(this,ne),l=m(this,ie),d=n!==o?n.state:m(this,fe),{state:c}=n;let f={...c},p=!1,u;if(t._optimisticResults){const L=this.hasListeners(),q=!L&&nt(n,t),te=L&&ot(n,o,t,r);(q||te)&&(f={...f,...Et(c.data,n.options)}),t._optimisticResults==="isRestoring"&&(f.fetchStatus="idle")}let{error:h,errorUpdatedAt:S,status:C}=f;u=f.data;let v=!1;if(t.placeholderData!==void 0&&u===void 0&&C==="pending"){let L;i!=null&&i.isPlaceholderData&&t.placeholderData===(l==null?void 0:l.placeholderData)?(L=i.data,v=!0):L=typeof t.placeholderData=="function"?t.placeholderData((X=m(this,le))==null?void 0:X.state.data,m(this,le)):t.placeholderData,L!==void 0&&(C="success",u=tt(i==null?void 0:i.data,L,t),p=!0)}if(t.select&&u!==void 0&&!v)if(i&&u===(s==null?void 0:s.data)&&t.select===m(this,pe))u=m(this,se);else try{b(this,pe,t.select),u=t.select(u),u=tt(i==null?void 0:i.data,u,t),b(this,se,u),b(this,Z,null)}catch(L){b(this,Z,L)}m(this,Z)&&(h=m(this,Z),u=m(this,se),S=Date.now(),C="error");const w=f.fetchStatus==="fetching",R=C==="pending",P=C==="error",V=R&&w,z=u!==void 0,D={status:C,fetchStatus:f.fetchStatus,isPending:R,isSuccess:C==="success",isError:P,isInitialLoading:V,isLoading:V,data:u,dataUpdatedAt:f.dataUpdatedAt,error:h,errorUpdatedAt:S,failureCount:f.fetchFailureCount,failureReason:f.fetchFailureReason,errorUpdateCount:f.errorUpdateCount,isFetched:n.isFetched(),isFetchedAfterMount:f.dataUpdateCount>d.dataUpdateCount||f.errorUpdateCount>d.errorUpdateCount,isFetching:w,isRefetching:w&&!R,isLoadingError:P&&!z,isPaused:f.fetchStatus==="paused",isPlaceholderData:p,isRefetchError:P&&z,isStale:We(n,t),refetch:this.refetch,promise:m(this,K),isEnabled:T(t.enabled,n)!==!1};if(this.options.experimental_prefetchInRender){const L=D.data!==void 0,q=D.status==="error"&&!L,te=k=>{q?k.reject(D.error):L&&k.resolve(D.data)},_=()=>{const k=b(this,K,D.promise=Ye());te(k)},N=m(this,K);switch(N.status){case"pending":n.queryHash===o.queryHash&&te(N);break;case"fulfilled":(q||D.data!==N.value)&&_();break;case"rejected":(!q||D.error!==N.reason)&&_();break}}return D}updateResult(){const n=m(this,O),t=this.createResult(m(this,M),this.options);if(b(this,ne,m(this,M).state),b(this,ie,this.options),m(this,ne).data!==void 0&&b(this,le,m(this,M)),Ie(t,n))return;b(this,O,t);const o=()=>{if(!n)return!0;const{notifyOnChangeProps:r}=this.options,i=typeof r=="function"?r():r;if(i==="all"||!i&&!m(this,ae).size)return!0;const s=new Set(i??m(this,ae));return this.options.throwOnError&&s.add("error"),Object.keys(m(this,O)).some(l=>{const a=l;return m(this,O)[a]!==n[a]&&s.has(a)})};E(this,I,pt).call(this,{listeners:o()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&E(this,I,De).call(this)}},A=new WeakMap,M=new WeakMap,fe=new WeakMap,O=new WeakMap,ne=new WeakMap,ie=new WeakMap,K=new WeakMap,Z=new WeakMap,pe=new WeakMap,se=new WeakMap,le=new WeakMap,oe=new WeakMap,re=new WeakMap,J=new WeakMap,ae=new WeakMap,I=new WeakSet,de=function(n){E(this,I,Oe).call(this);let t=m(this,M).fetch(this.options,n);return n!=null&&n.throwOnError||(t=t.catch(Ve)),t},Ee=function(){E(this,I,Le).call(this);const n=ce(this.options.staleTime,m(this,M));if(be.isServer()||m(this,O).isStale||!et(n))return;const o=Vt(m(this,O).dataUpdatedAt,n)+1;b(this,oe,he.setTimeout(()=>{m(this,O).isStale||this.updateResult()},o))},ze=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(m(this,M)):this.options.refetchInterval)??!1},je=function(n){E(this,I,He).call(this),b(this,J,n),!(be.isServer()||T(this.options.enabled,m(this,M))===!1||!et(m(this,J))||m(this,J)===0)&&b(this,re,he.setInterval(()=>{(this.options.refetchIntervalInBackground||bt.isFocused())&&E(this,I,de).call(this)},m(this,J)))},De=function(){E(this,I,Ee).call(this),E(this,I,je).call(this,E(this,I,ze).call(this))},Le=function(){m(this,oe)!==void 0&&(he.clearTimeout(m(this,oe)),b(this,oe,void 0))},He=function(){m(this,re)!==void 0&&(he.clearInterval(m(this,re)),b(this,re,void 0))},Oe=function(){const n=m(this,A).getQueryCache().build(m(this,A),this.options);if(n===m(this,M))return;const t=m(this,M);b(this,M,n),b(this,fe,n.state),this.hasListeners()&&(t==null||t.removeObserver(this),n.addObserver(this))},pt=function(n){ut.batch(()=>{n.listeners&&this.listeners.forEach(t=>{t(m(this,O))}),m(this,A).getQueryCache().notify({query:m(this,M),type:"observerResultsUpdated"})})},at);function Ut(e,n){return T(n.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&T(n.retryOnMount,e)===!1)}function nt(e,n){return Ut(e,n)||e.state.data!==void 0&&Ae(e,n,n.refetchOnMount)}function Ae(e,n,t){if(T(n.enabled,e)!==!1&&ce(n.staleTime,e)!=="static"){const o=typeof t=="function"?t(e):t;return o==="always"||o!==!1&&We(e,n)}return!1}function ot(e,n,t,o){return(e!==n||T(o.enabled,e)===!1)&&(!t.suspense||e.state.status!=="error")&&We(e,t)}function We(e,n){return T(n.enabled,e)!==!1&&e.isStaleByTime(ce(n.staleTime,e))}function Wt(e,n){return!Ie(e.getCurrentResult(),n)}var ht=F.createContext(!1),qt=()=>F.useContext(ht);ht.Provider;function Qt(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var Kt=F.createContext(Qt()),Xt=()=>F.useContext(Kt),Zt=(e,n,t)=>{const o=t!=null&&t.state.error&&typeof e.throwOnError=="function"?dt(e.throwOnError,[t.state.error,t]):e.throwOnError;(e.suspense||e.experimental_prefetchInRender||o)&&(n.isReset()||(e.retryOnMount=!1))},Jt=e=>{F.useEffect(()=>{e.clearReset()},[e])},Yt=({result:e,errorResetBoundary:n,throwOnError:t,query:o,suspense:r})=>e.isError&&!n.isReset()&&!e.isFetching&&o&&(r&&e.data===void 0||dt(t,[e.error,o])),en=e=>{if(e.suspense){const t=r=>r==="static"?r:Math.max(r??1e3,1e3),o=e.staleTime;e.staleTime=typeof o=="function"?(...r)=>t(o(...r)):t(o),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},tn=(e,n)=>e.isLoading&&e.isFetching&&!n,nn=(e,n)=>(e==null?void 0:e.suspense)&&n.isPending,rt=(e,n,t)=>n.fetchOptimistic(e).catch(()=>{t.clearReset()});function on(e,n,t){var u,h,S,C;const o=qt(),r=Xt(),i=zt(),s=i.defaultQueryOptions(e);(h=(u=i.getDefaultOptions().queries)==null?void 0:u._experimental_beforeQuery)==null||h.call(u,s);const l=i.getQueryCache().get(s.queryHash),a=e.subscribed!==!1;s._optimisticResults=o?"isRestoring":a?"optimistic":void 0,en(s),Zt(s,r,l),Jt(r);const d=!i.getQueryCache().get(s.queryHash),[c]=F.useState(()=>new n(i,s)),f=c.getOptimisticResult(s),p=!o&&a;if(F.useSyncExternalStore(F.useCallback(v=>{const w=p?c.subscribe(ut.batchCalls(v)):Ve;return c.updateResult(),w},[c,p]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),F.useEffect(()=>{c.setOptions(s)},[s,c]),nn(s,f))throw rt(s,c,r);if(Yt({result:f,errorResetBoundary:r,throwOnError:s.throwOnError,query:l,suspense:s.suspense}))throw f.error;if((C=(S=i.getDefaultOptions().queries)==null?void 0:S._experimental_afterQuery)==null||C.call(S,s,f),s.experimental_prefetchInRender&&!be.isServer()&&tn(f,o)){const v=d?rt(s,c,r):l==null?void 0:l.promise;v==null||v.catch(Ve).finally(()=>{c.updateResult()})}return s.notifyOnChangeProps?f:c.trackResult(f)}function nr(e,n){return on(e,Nt)}const rn=x.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`,sn=x.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};

  a {
    color: ${({theme:e})=>e.colors.textSecondary};
    text-decoration: none;
    transition: color ${({theme:e})=>e.transition.fast};

    &:hover {
      color: ${({theme:e})=>e.colors.primary};
      text-decoration: none;
    }
  }

  &:last-child {
    color: ${({theme:e})=>e.colors.text};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }
`,ln=({items:e})=>g.jsx(rn,{"aria-label":"Breadcrumb",children:e.map((n,t)=>g.jsxs(sn,{children:[t>0&&g.jsx(ct,{size:16}),n.href&&t<e.length-1?g.jsx(jt,{to:n.href,children:n.label}):g.jsx("span",{children:n.label})]},t))}),an=x.div`
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`,un=x.div`
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,dn=x.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,cn=x.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,gn=x.h1`
  font-size: ${({theme:e})=>e.fontSize.xxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
`,fn=x.p`
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.textSecondary};
`,pn=x.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,or=({title:e,subtitle:n,breadcrumbs:t,actions:o})=>g.jsxs(an,{children:[t&&t.length>0&&g.jsx(un,{children:g.jsx(ln,{items:t})}),g.jsxs(dn,{children:[g.jsxs(cn,{children:[g.jsx(gn,{children:e}),n&&g.jsx(fn,{children:n})]}),o&&g.jsx(pn,{children:o})]})]}),hn=x.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  padding: ${({$padding:e,theme:n})=>e||n.spacing.xl};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  transition:
    box-shadow ${({theme:e})=>e.transition.base},
    border-color ${({theme:e})=>e.transition.base};

  ${({$hoverable:e,theme:n})=>e&&`
    cursor: pointer;
    &:hover {
      box-shadow: ${n.colors.shadowMd};
      border-color: ${n.colors.textMuted};
    }
  `}
`,mn=x.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  gap: ${({theme:e})=>e.spacing.md};
`,Sn=x.h2`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,xn=x.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 2px;
`,vn=x.div``,wn=x.div`
  margin-top: ${({theme:e})=>e.spacing.lg};
  padding-top: ${({theme:e})=>e.spacing.lg};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
`,rr=({title:e,subtitle:n,headerAction:t,footer:o,padding:r,hoverable:i,children:s,className:l})=>g.jsxs(hn,{$padding:r,$hoverable:i,className:l,children:[(e||n||t)&&g.jsxs(mn,{children:[g.jsxs("div",{children:[e&&g.jsx(Sn,{children:e}),n&&g.jsx(xn,{children:n})]}),t]}),g.jsx(vn,{children:s}),o&&g.jsx(wn,{children:o})]});/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function Y(e,n){return typeof e=="function"?e(n):e}function G(e,n){return t=>{n.setState(o=>({...o,[e]:Y(t,o[e])}))}}function ve(e){return e instanceof Function}function Cn(e){return Array.isArray(e)&&e.every(n=>typeof n=="number")}function Rn(e,n){const t=[],o=r=>{r.forEach(i=>{t.push(i);const s=n(i);s!=null&&s.length&&o(s)})};return o(e),t}function $(e,n,t){let o=[],r;return i=>{let s;t.key&&t.debug&&(s=Date.now());const l=e(i);if(!(l.length!==o.length||l.some((c,f)=>o[f]!==c)))return r;o=l;let d;if(t.key&&t.debug&&(d=Date.now()),r=n(...l),t==null||t.onChange==null||t.onChange(r),t.key&&t.debug&&t!=null&&t.debug()){const c=Math.round((Date.now()-s)*100)/100,f=Math.round((Date.now()-d)*100)/100,p=f/16,u=(h,S)=>{for(h=String(h);h.length<S;)h=" "+h;return h};console.info(`%c⏱ ${u(f,5)} /${u(c,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*p,120))}deg 100% 31%);`,t==null?void 0:t.key)}return r}}function y(e,n,t,o){return{debug:()=>{var r;return(r=e==null?void 0:e.debugAll)!=null?r:e[n]},key:!1,onChange:o}}function $n(e,n,t,o){const r=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${n.id}_${t.id}`,row:n,column:t,getValue:()=>n.getValue(o),renderValue:r,getContext:$(()=>[e,t,n,i],(s,l,a,d)=>({table:s,column:l,row:a,cell:d,getValue:d.getValue,renderValue:d.renderValue}),y(e.options,"debugCells"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,t,n,e)},{}),i}function yn(e,n,t,o){var r,i;const l={...e._getDefaultColumnDef(),...n},a=l.accessorKey;let d=(r=(i=l.id)!=null?i:a?typeof String.prototype.replaceAll=="function"?a.replaceAll(".","_"):a.replace(/\./g,"_"):void 0)!=null?r:typeof l.header=="string"?l.header:void 0,c;if(l.accessorFn?c=l.accessorFn:a&&(a.includes(".")?c=p=>{let u=p;for(const S of a.split(".")){var h;u=(h=u)==null?void 0:h[S]}return u}:c=p=>p[l.accessorKey]),!d)throw new Error;let f={id:`${String(d)}`,accessorFn:c,parent:o,depth:t,columnDef:l,columns:[],getFlatColumns:$(()=>[!0],()=>{var p;return[f,...(p=f.columns)==null?void 0:p.flatMap(u=>u.getFlatColumns())]},y(e.options,"debugColumns")),getLeafColumns:$(()=>[e._getOrderColumnsFn()],p=>{var u;if((u=f.columns)!=null&&u.length){let h=f.columns.flatMap(S=>S.getLeafColumns());return p(h)}return[f]},y(e.options,"debugColumns"))};for(const p of e._features)p.createColumn==null||p.createColumn(f,e);return f}const H="debugHeaders";function it(e,n,t){var o;let i={id:(o=t.id)!=null?o:n.id,column:n,index:t.index,isPlaceholder:!!t.isPlaceholder,placeholderId:t.placeholderId,depth:t.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],l=a=>{a.subHeaders&&a.subHeaders.length&&a.subHeaders.map(l),s.push(a)};return l(i),s},getContext:()=>({table:e,header:i,column:n})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const _n={createTable:e=>{e.getHeaderGroups=$(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o,r)=>{var i,s;const l=(i=o==null?void 0:o.map(f=>t.find(p=>p.id===f)).filter(Boolean))!=null?i:[],a=(s=r==null?void 0:r.map(f=>t.find(p=>p.id===f)).filter(Boolean))!=null?s:[],d=t.filter(f=>!(o!=null&&o.includes(f.id))&&!(r!=null&&r.includes(f.id)));return me(n,[...l,...d,...a],e)},y(e.options,H)),e.getCenterHeaderGroups=$(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o,r)=>(t=t.filter(i=>!(o!=null&&o.includes(i.id))&&!(r!=null&&r.includes(i.id))),me(n,t,e,"center")),y(e.options,H)),e.getLeftHeaderGroups=$(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(n,t,o)=>{var r;const i=(r=o==null?void 0:o.map(s=>t.find(l=>l.id===s)).filter(Boolean))!=null?r:[];return me(n,i,e,"left")},y(e.options,H)),e.getRightHeaderGroups=$(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(n,t,o)=>{var r;const i=(r=o==null?void 0:o.map(s=>t.find(l=>l.id===s)).filter(Boolean))!=null?r:[];return me(n,i,e,"right")},y(e.options,H)),e.getFooterGroups=$(()=>[e.getHeaderGroups()],n=>[...n].reverse(),y(e.options,H)),e.getLeftFooterGroups=$(()=>[e.getLeftHeaderGroups()],n=>[...n].reverse(),y(e.options,H)),e.getCenterFooterGroups=$(()=>[e.getCenterHeaderGroups()],n=>[...n].reverse(),y(e.options,H)),e.getRightFooterGroups=$(()=>[e.getRightHeaderGroups()],n=>[...n].reverse(),y(e.options,H)),e.getFlatHeaders=$(()=>[e.getHeaderGroups()],n=>n.map(t=>t.headers).flat(),y(e.options,H)),e.getLeftFlatHeaders=$(()=>[e.getLeftHeaderGroups()],n=>n.map(t=>t.headers).flat(),y(e.options,H)),e.getCenterFlatHeaders=$(()=>[e.getCenterHeaderGroups()],n=>n.map(t=>t.headers).flat(),y(e.options,H)),e.getRightFlatHeaders=$(()=>[e.getRightHeaderGroups()],n=>n.map(t=>t.headers).flat(),y(e.options,H)),e.getCenterLeafHeaders=$(()=>[e.getCenterFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),y(e.options,H)),e.getLeftLeafHeaders=$(()=>[e.getLeftFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),y(e.options,H)),e.getRightLeafHeaders=$(()=>[e.getRightFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),y(e.options,H)),e.getLeafHeaders=$(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(n,t,o)=>{var r,i,s,l,a,d;return[...(r=(i=n[0])==null?void 0:i.headers)!=null?r:[],...(s=(l=t[0])==null?void 0:l.headers)!=null?s:[],...(a=(d=o[0])==null?void 0:d.headers)!=null?a:[]].map(c=>c.getLeafHeaders()).flat()},y(e.options,H))}};function me(e,n,t,o){var r,i;let s=0;const l=function(p,u){u===void 0&&(u=1),s=Math.max(s,u),p.filter(h=>h.getIsVisible()).forEach(h=>{var S;(S=h.columns)!=null&&S.length&&l(h.columns,u+1)},0)};l(e);let a=[];const d=(p,u)=>{const h={depth:u,id:[o,`${u}`].filter(Boolean).join("_"),headers:[]},S=[];p.forEach(C=>{const v=[...S].reverse()[0],w=C.column.depth===h.depth;let R,P=!1;if(w&&C.column.parent?R=C.column.parent:(R=C.column,P=!0),v&&(v==null?void 0:v.column)===R)v.subHeaders.push(C);else{const V=it(t,R,{id:[o,u,R.id,C==null?void 0:C.id].filter(Boolean).join("_"),isPlaceholder:P,placeholderId:P?`${S.filter(z=>z.column===R).length}`:void 0,depth:u,index:S.length});V.subHeaders.push(C),S.push(V)}h.headers.push(C),C.headerGroup=h}),a.push(h),u>0&&d(S,u-1)},c=n.map((p,u)=>it(t,p,{depth:s,index:u}));d(c,s-1),a.reverse();const f=p=>p.filter(h=>h.column.getIsVisible()).map(h=>{let S=0,C=0,v=[0];h.subHeaders&&h.subHeaders.length?(v=[],f(h.subHeaders).forEach(R=>{let{colSpan:P,rowSpan:V}=R;S+=P,v.push(V)})):S=1;const w=Math.min(...v);return C=C+w,h.colSpan=S,h.rowSpan=C,{colSpan:S,rowSpan:C}});return f((r=(i=a[0])==null?void 0:i.headers)!=null?r:[]),a}const Mn=(e,n,t,o,r,i,s)=>{let l={id:n,index:o,original:t,depth:r,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:a=>{if(l._valuesCache.hasOwnProperty(a))return l._valuesCache[a];const d=e.getColumn(a);if(d!=null&&d.accessorFn)return l._valuesCache[a]=d.accessorFn(l.original,o),l._valuesCache[a]},getUniqueValues:a=>{if(l._uniqueValuesCache.hasOwnProperty(a))return l._uniqueValuesCache[a];const d=e.getColumn(a);if(d!=null&&d.accessorFn)return d.columnDef.getUniqueValues?(l._uniqueValuesCache[a]=d.columnDef.getUniqueValues(l.original,o),l._uniqueValuesCache[a]):(l._uniqueValuesCache[a]=[l.getValue(a)],l._uniqueValuesCache[a])},renderValue:a=>{var d;return(d=l.getValue(a))!=null?d:e.options.renderFallbackValue},subRows:[],getLeafRows:()=>Rn(l.subRows,a=>a.subRows),getParentRow:()=>l.parentId?e.getRow(l.parentId,!0):void 0,getParentRows:()=>{let a=[],d=l;for(;;){const c=d.getParentRow();if(!c)break;a.push(c),d=c}return a.reverse()},getAllCells:$(()=>[e.getAllLeafColumns()],a=>a.map(d=>$n(e,l,d,d.id)),y(e.options,"debugRows")),_getAllCellsByColumnId:$(()=>[l.getAllCells()],a=>a.reduce((d,c)=>(d[c.column.id]=c,d),{}),y(e.options,"debugRows"))};for(let a=0;a<e._features.length;a++){const d=e._features[a];d==null||d.createRow==null||d.createRow(l,e)}return l},Fn={createColumn:(e,n)=>{e._getFacetedRowModel=n.options.getFacetedRowModel&&n.options.getFacetedRowModel(n,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():n.getPreFilteredRowModel(),e._getFacetedUniqueValues=n.options.getFacetedUniqueValues&&n.options.getFacetedUniqueValues(n,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=n.options.getFacetedMinMaxValues&&n.options.getFacetedMinMaxValues(n,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},mt=(e,n,t)=>{var o,r;const i=t==null||(o=t.toString())==null?void 0:o.toLowerCase();return!!(!((r=e.getValue(n))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(i))};mt.autoRemove=e=>W(e);const St=(e,n,t)=>{var o;return!!(!((o=e.getValue(n))==null||(o=o.toString())==null)&&o.includes(t))};St.autoRemove=e=>W(e);const xt=(e,n,t)=>{var o;return((o=e.getValue(n))==null||(o=o.toString())==null?void 0:o.toLowerCase())===(t==null?void 0:t.toLowerCase())};xt.autoRemove=e=>W(e);const vt=(e,n,t)=>{var o;return(o=e.getValue(n))==null?void 0:o.includes(t)};vt.autoRemove=e=>W(e);const wt=(e,n,t)=>!t.some(o=>{var r;return!((r=e.getValue(n))!=null&&r.includes(o))});wt.autoRemove=e=>W(e)||!(e!=null&&e.length);const Ct=(e,n,t)=>t.some(o=>{var r;return(r=e.getValue(n))==null?void 0:r.includes(o)});Ct.autoRemove=e=>W(e)||!(e!=null&&e.length);const Rt=(e,n,t)=>e.getValue(n)===t;Rt.autoRemove=e=>W(e);const $t=(e,n,t)=>e.getValue(n)==t;$t.autoRemove=e=>W(e);const qe=(e,n,t)=>{let[o,r]=t;const i=e.getValue(n);return i>=o&&i<=r};qe.resolveFilterValue=e=>{let[n,t]=e,o=typeof n!="number"?parseFloat(n):n,r=typeof t!="number"?parseFloat(t):t,i=n===null||Number.isNaN(o)?-1/0:o,s=t===null||Number.isNaN(r)?1/0:r;if(i>s){const l=i;i=s,s=l}return[i,s]};qe.autoRemove=e=>W(e)||W(e[0])&&W(e[1]);const Q={includesString:mt,includesStringSensitive:St,equalsString:xt,arrIncludes:vt,arrIncludesAll:wt,arrIncludesSome:Ct,equals:Rt,weakEquals:$t,inNumberRange:qe};function W(e){return e==null||e===""}const Pn={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:G("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,n)=>{e.getAutoFilterFn=()=>{const t=n.getCoreRowModel().flatRows[0],o=t==null?void 0:t.getValue(e.id);return typeof o=="string"?Q.includesString:typeof o=="number"?Q.inNumberRange:typeof o=="boolean"||o!==null&&typeof o=="object"?Q.equals:Array.isArray(o)?Q.arrIncludes:Q.weakEquals},e.getFilterFn=()=>{var t,o;return ve(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(t=(o=n.options.filterFns)==null?void 0:o[e.columnDef.filterFn])!=null?t:Q[e.columnDef.filterFn]},e.getCanFilter=()=>{var t,o,r;return((t=e.columnDef.enableColumnFilter)!=null?t:!0)&&((o=n.options.enableColumnFilters)!=null?o:!0)&&((r=n.options.enableFilters)!=null?r:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var t;return(t=n.getState().columnFilters)==null||(t=t.find(o=>o.id===e.id))==null?void 0:t.value},e.getFilterIndex=()=>{var t,o;return(t=(o=n.getState().columnFilters)==null?void 0:o.findIndex(r=>r.id===e.id))!=null?t:-1},e.setFilterValue=t=>{n.setColumnFilters(o=>{const r=e.getFilterFn(),i=o==null?void 0:o.find(c=>c.id===e.id),s=Y(t,i?i.value:void 0);if(st(r,s,e)){var l;return(l=o==null?void 0:o.filter(c=>c.id!==e.id))!=null?l:[]}const a={id:e.id,value:s};if(i){var d;return(d=o==null?void 0:o.map(c=>c.id===e.id?a:c))!=null?d:[]}return o!=null&&o.length?[...o,a]:[a]})}},createRow:(e,n)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=n=>{const t=e.getAllLeafColumns(),o=r=>{var i;return(i=Y(n,r))==null?void 0:i.filter(s=>{const l=t.find(a=>a.id===s.id);if(l){const a=l.getFilterFn();if(st(a,s.value,l))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(o)},e.resetColumnFilters=n=>{var t,o;e.setColumnFilters(n?[]:(t=(o=e.initialState)==null?void 0:o.columnFilters)!=null?t:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function st(e,n,t){return(e&&e.autoRemove?e.autoRemove(n,t):!1)||typeof n>"u"||typeof n=="string"&&!n}const In=(e,n,t)=>t.reduce((o,r)=>{const i=r.getValue(e);return o+(typeof i=="number"?i:0)},0),Vn=(e,n,t)=>{let o;return t.forEach(r=>{const i=r.getValue(e);i!=null&&(o>i||o===void 0&&i>=i)&&(o=i)}),o},bn=(e,n,t)=>{let o;return t.forEach(r=>{const i=r.getValue(e);i!=null&&(o<i||o===void 0&&i>=i)&&(o=i)}),o},En=(e,n,t)=>{let o,r;return t.forEach(i=>{const s=i.getValue(e);s!=null&&(o===void 0?s>=s&&(o=r=s):(o>s&&(o=s),r<s&&(r=s)))}),[o,r]},zn=(e,n)=>{let t=0,o=0;if(n.forEach(r=>{let i=r.getValue(e);i!=null&&(i=+i)>=i&&(++t,o+=i)}),t)return o/t},jn=(e,n)=>{if(!n.length)return;const t=n.map(i=>i.getValue(e));if(!Cn(t))return;if(t.length===1)return t[0];const o=Math.floor(t.length/2),r=t.sort((i,s)=>i-s);return t.length%2!==0?r[o]:(r[o-1]+r[o])/2},Dn=(e,n)=>Array.from(new Set(n.map(t=>t.getValue(e))).values()),Ln=(e,n)=>new Set(n.map(t=>t.getValue(e))).size,Hn=(e,n)=>n.length,Ce={sum:In,min:Vn,max:bn,extent:En,mean:zn,median:jn,unique:Dn,uniqueCount:Ln,count:Hn},On={getDefaultColumnDef:()=>({aggregatedCell:e=>{var n,t;return(n=(t=e.getValue())==null||t.toString==null?void 0:t.toString())!=null?n:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:G("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,n)=>{e.toggleGrouping=()=>{n.setGrouping(t=>t!=null&&t.includes(e.id)?t.filter(o=>o!==e.id):[...t??[],e.id])},e.getCanGroup=()=>{var t,o;return((t=e.columnDef.enableGrouping)!=null?t:!0)&&((o=n.options.enableGrouping)!=null?o:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var t;return(t=n.getState().grouping)==null?void 0:t.includes(e.id)},e.getGroupedIndex=()=>{var t;return(t=n.getState().grouping)==null?void 0:t.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const t=e.getCanGroup();return()=>{t&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const t=n.getCoreRowModel().flatRows[0],o=t==null?void 0:t.getValue(e.id);if(typeof o=="number")return Ce.sum;if(Object.prototype.toString.call(o)==="[object Date]")return Ce.extent},e.getAggregationFn=()=>{var t,o;if(!e)throw new Error;return ve(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(t=(o=n.options.aggregationFns)==null?void 0:o[e.columnDef.aggregationFn])!=null?t:Ce[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=n=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(n),e.resetGrouping=n=>{var t,o;e.setGrouping(n?[]:(t=(o=e.initialState)==null?void 0:o.grouping)!=null?t:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,n)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=t=>{if(e._groupingValuesCache.hasOwnProperty(t))return e._groupingValuesCache[t];const o=n.getColumn(t);return o!=null&&o.columnDef.getGroupingValue?(e._groupingValuesCache[t]=o.columnDef.getGroupingValue(e.original),e._groupingValuesCache[t]):e.getValue(t)},e._groupingValuesCache={}},createCell:(e,n,t,o)=>{e.getIsGrouped=()=>n.getIsGrouped()&&n.id===t.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&n.getIsGrouped(),e.getIsAggregated=()=>{var r;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((r=t.subRows)!=null&&r.length)}}};function An(e,n,t){if(!(n!=null&&n.length)||!t)return e;const o=e.filter(i=>!n.includes(i.id));return t==="remove"?o:[...n.map(i=>e.find(s=>s.id===i)).filter(Boolean),...o]}const kn={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:G("columnOrder",e)}),createColumn:(e,n)=>{e.getIndex=$(t=>[ge(n,t)],t=>t.findIndex(o=>o.id===e.id),y(n.options,"debugColumns")),e.getIsFirstColumn=t=>{var o;return((o=ge(n,t)[0])==null?void 0:o.id)===e.id},e.getIsLastColumn=t=>{var o;const r=ge(n,t);return((o=r[r.length-1])==null?void 0:o.id)===e.id}},createTable:e=>{e.setColumnOrder=n=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(n),e.resetColumnOrder=n=>{var t;e.setColumnOrder(n?[]:(t=e.initialState.columnOrder)!=null?t:[])},e._getOrderColumnsFn=$(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(n,t,o)=>r=>{let i=[];if(!(n!=null&&n.length))i=r;else{const s=[...n],l=[...r];for(;l.length&&s.length;){const a=s.shift(),d=l.findIndex(c=>c.id===a);d>-1&&i.push(l.splice(d,1)[0])}i=[...i,...l]}return An(i,t,o)},y(e.options,"debugTable"))}},Re=()=>({left:[],right:[]}),Gn={getInitialState:e=>({columnPinning:Re(),...e}),getDefaultOptions:e=>({onColumnPinningChange:G("columnPinning",e)}),createColumn:(e,n)=>{e.pin=t=>{const o=e.getLeafColumns().map(r=>r.id).filter(Boolean);n.setColumnPinning(r=>{var i,s;if(t==="right"){var l,a;return{left:((l=r==null?void 0:r.left)!=null?l:[]).filter(f=>!(o!=null&&o.includes(f))),right:[...((a=r==null?void 0:r.right)!=null?a:[]).filter(f=>!(o!=null&&o.includes(f))),...o]}}if(t==="left"){var d,c;return{left:[...((d=r==null?void 0:r.left)!=null?d:[]).filter(f=>!(o!=null&&o.includes(f))),...o],right:((c=r==null?void 0:r.right)!=null?c:[]).filter(f=>!(o!=null&&o.includes(f)))}}return{left:((i=r==null?void 0:r.left)!=null?i:[]).filter(f=>!(o!=null&&o.includes(f))),right:((s=r==null?void 0:r.right)!=null?s:[]).filter(f=>!(o!=null&&o.includes(f)))}})},e.getCanPin=()=>e.getLeafColumns().some(o=>{var r,i,s;return((r=o.columnDef.enablePinning)!=null?r:!0)&&((i=(s=n.options.enableColumnPinning)!=null?s:n.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const t=e.getLeafColumns().map(l=>l.id),{left:o,right:r}=n.getState().columnPinning,i=t.some(l=>o==null?void 0:o.includes(l)),s=t.some(l=>r==null?void 0:r.includes(l));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var t,o;const r=e.getIsPinned();return r?(t=(o=n.getState().columnPinning)==null||(o=o[r])==null?void 0:o.indexOf(e.id))!=null?t:-1:0}},createRow:(e,n)=>{e.getCenterVisibleCells=$(()=>[e._getAllVisibleCells(),n.getState().columnPinning.left,n.getState().columnPinning.right],(t,o,r)=>{const i=[...o??[],...r??[]];return t.filter(s=>!i.includes(s.column.id))},y(n.options,"debugRows")),e.getLeftVisibleCells=$(()=>[e._getAllVisibleCells(),n.getState().columnPinning.left],(t,o)=>(o??[]).map(i=>t.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),y(n.options,"debugRows")),e.getRightVisibleCells=$(()=>[e._getAllVisibleCells(),n.getState().columnPinning.right],(t,o)=>(o??[]).map(i=>t.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),y(n.options,"debugRows"))},createTable:e=>{e.setColumnPinning=n=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(n),e.resetColumnPinning=n=>{var t,o;return e.setColumnPinning(n?Re():(t=(o=e.initialState)==null?void 0:o.columnPinning)!=null?t:Re())},e.getIsSomeColumnsPinned=n=>{var t;const o=e.getState().columnPinning;if(!n){var r,i;return!!((r=o.left)!=null&&r.length||(i=o.right)!=null&&i.length)}return!!((t=o[n])!=null&&t.length)},e.getLeftLeafColumns=$(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(n,t)=>(t??[]).map(o=>n.find(r=>r.id===o)).filter(Boolean),y(e.options,"debugColumns")),e.getRightLeafColumns=$(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(n,t)=>(t??[]).map(o=>n.find(r=>r.id===o)).filter(Boolean),y(e.options,"debugColumns")),e.getCenterLeafColumns=$(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o)=>{const r=[...t??[],...o??[]];return n.filter(i=>!r.includes(i.id))},y(e.options,"debugColumns"))}};function Tn(e){return e||(typeof document<"u"?document:null)}const Se={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},$e=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),Bn={getDefaultColumnDef:()=>Se,getInitialState:e=>({columnSizing:{},columnSizingInfo:$e(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:G("columnSizing",e),onColumnSizingInfoChange:G("columnSizingInfo",e)}),createColumn:(e,n)=>{e.getSize=()=>{var t,o,r;const i=n.getState().columnSizing[e.id];return Math.min(Math.max((t=e.columnDef.minSize)!=null?t:Se.minSize,(o=i??e.columnDef.size)!=null?o:Se.size),(r=e.columnDef.maxSize)!=null?r:Se.maxSize)},e.getStart=$(t=>[t,ge(n,t),n.getState().columnSizing],(t,o)=>o.slice(0,e.getIndex(t)).reduce((r,i)=>r+i.getSize(),0),y(n.options,"debugColumns")),e.getAfter=$(t=>[t,ge(n,t),n.getState().columnSizing],(t,o)=>o.slice(e.getIndex(t)+1).reduce((r,i)=>r+i.getSize(),0),y(n.options,"debugColumns")),e.resetSize=()=>{n.setColumnSizing(t=>{let{[e.id]:o,...r}=t;return r})},e.getCanResize=()=>{var t,o;return((t=e.columnDef.enableResizing)!=null?t:!0)&&((o=n.options.enableColumnResizing)!=null?o:!0)},e.getIsResizing=()=>n.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,n)=>{e.getSize=()=>{let t=0;const o=r=>{if(r.subHeaders.length)r.subHeaders.forEach(o);else{var i;t+=(i=r.column.getSize())!=null?i:0}};return o(e),t},e.getStart=()=>{if(e.index>0){const t=e.headerGroup.headers[e.index-1];return t.getStart()+t.getSize()}return 0},e.getResizeHandler=t=>{const o=n.getColumn(e.column.id),r=o==null?void 0:o.getCanResize();return i=>{if(!o||!r||(i.persist==null||i.persist(),ye(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),l=e?e.getLeafHeaders().map(v=>[v.column.id,v.column.getSize()]):[[o.id,o.getSize()]],a=ye(i)?Math.round(i.touches[0].clientX):i.clientX,d={},c=(v,w)=>{typeof w=="number"&&(n.setColumnSizingInfo(R=>{var P,V;const z=n.options.columnResizeDirection==="rtl"?-1:1,B=(w-((P=R==null?void 0:R.startOffset)!=null?P:0))*z,D=Math.max(B/((V=R==null?void 0:R.startSize)!=null?V:0),-.999999);return R.columnSizingStart.forEach(X=>{let[L,q]=X;d[L]=Math.round(Math.max(q+q*D,0)*100)/100}),{...R,deltaOffset:B,deltaPercentage:D}}),(n.options.columnResizeMode==="onChange"||v==="end")&&n.setColumnSizing(R=>({...R,...d})))},f=v=>c("move",v),p=v=>{c("end",v),n.setColumnSizingInfo(w=>({...w,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},u=Tn(t),h={moveHandler:v=>f(v.clientX),upHandler:v=>{u==null||u.removeEventListener("mousemove",h.moveHandler),u==null||u.removeEventListener("mouseup",h.upHandler),p(v.clientX)}},S={moveHandler:v=>(v.cancelable&&(v.preventDefault(),v.stopPropagation()),f(v.touches[0].clientX),!1),upHandler:v=>{var w;u==null||u.removeEventListener("touchmove",S.moveHandler),u==null||u.removeEventListener("touchend",S.upHandler),v.cancelable&&(v.preventDefault(),v.stopPropagation()),p((w=v.touches[0])==null?void 0:w.clientX)}},C=Nn()?{passive:!1}:!1;ye(i)?(u==null||u.addEventListener("touchmove",S.moveHandler,C),u==null||u.addEventListener("touchend",S.upHandler,C)):(u==null||u.addEventListener("mousemove",h.moveHandler,C),u==null||u.addEventListener("mouseup",h.upHandler,C)),n.setColumnSizingInfo(v=>({...v,startOffset:a,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:l,isResizingColumn:o.id}))}}},createTable:e=>{e.setColumnSizing=n=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(n),e.setColumnSizingInfo=n=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(n),e.resetColumnSizing=n=>{var t;e.setColumnSizing(n?{}:(t=e.initialState.columnSizing)!=null?t:{})},e.resetHeaderSizeInfo=n=>{var t;e.setColumnSizingInfo(n?$e():(t=e.initialState.columnSizingInfo)!=null?t:$e())},e.getTotalSize=()=>{var n,t;return(n=(t=e.getHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getLeftTotalSize=()=>{var n,t;return(n=(t=e.getLeftHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getCenterTotalSize=()=>{var n,t;return(n=(t=e.getCenterHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getRightTotalSize=()=>{var n,t;return(n=(t=e.getRightHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0}}};let xe=null;function Nn(){if(typeof xe=="boolean")return xe;let e=!1;try{const n={get passive(){return e=!0,!1}},t=()=>{};window.addEventListener("test",t,n),window.removeEventListener("test",t)}catch{e=!1}return xe=e,xe}function ye(e){return e.type==="touchstart"}const Un={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:G("columnVisibility",e)}),createColumn:(e,n)=>{e.toggleVisibility=t=>{e.getCanHide()&&n.setColumnVisibility(o=>({...o,[e.id]:t??!e.getIsVisible()}))},e.getIsVisible=()=>{var t,o;const r=e.columns;return(t=r.length?r.some(i=>i.getIsVisible()):(o=n.getState().columnVisibility)==null?void 0:o[e.id])!=null?t:!0},e.getCanHide=()=>{var t,o;return((t=e.columnDef.enableHiding)!=null?t:!0)&&((o=n.options.enableHiding)!=null?o:!0)},e.getToggleVisibilityHandler=()=>t=>{e.toggleVisibility==null||e.toggleVisibility(t.target.checked)}},createRow:(e,n)=>{e._getAllVisibleCells=$(()=>[e.getAllCells(),n.getState().columnVisibility],t=>t.filter(o=>o.column.getIsVisible()),y(n.options,"debugRows")),e.getVisibleCells=$(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(t,o,r)=>[...t,...o,...r],y(n.options,"debugRows"))},createTable:e=>{const n=(t,o)=>$(()=>[o(),o().filter(r=>r.getIsVisible()).map(r=>r.id).join("_")],r=>r.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),y(e.options,"debugColumns"));e.getVisibleFlatColumns=n("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=n("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=n("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=n("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=n("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=t=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(t),e.resetColumnVisibility=t=>{var o;e.setColumnVisibility(t?{}:(o=e.initialState.columnVisibility)!=null?o:{})},e.toggleAllColumnsVisible=t=>{var o;t=(o=t)!=null?o:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((r,i)=>({...r,[i.id]:t||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(t=>!(t.getIsVisible!=null&&t.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(t=>t.getIsVisible==null?void 0:t.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>t=>{var o;e.toggleAllColumnsVisible((o=t.target)==null?void 0:o.checked)}}};function ge(e,n){return n?n==="center"?e.getCenterVisibleLeafColumns():n==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const Wn={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},qn={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:G("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:n=>{var t;const o=(t=e.getCoreRowModel().flatRows[0])==null||(t=t._getAllCellsByColumnId()[n.id])==null?void 0:t.getValue();return typeof o=="string"||typeof o=="number"}}),createColumn:(e,n)=>{e.getCanGlobalFilter=()=>{var t,o,r,i;return((t=e.columnDef.enableGlobalFilter)!=null?t:!0)&&((o=n.options.enableGlobalFilter)!=null?o:!0)&&((r=n.options.enableFilters)!=null?r:!0)&&((i=n.options.getColumnCanGlobalFilter==null?void 0:n.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>Q.includesString,e.getGlobalFilterFn=()=>{var n,t;const{globalFilterFn:o}=e.options;return ve(o)?o:o==="auto"?e.getGlobalAutoFilterFn():(n=(t=e.options.filterFns)==null?void 0:t[o])!=null?n:Q[o]},e.setGlobalFilter=n=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(n)},e.resetGlobalFilter=n=>{e.setGlobalFilter(n?void 0:e.initialState.globalFilter)}}},Qn={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:G("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let n=!1,t=!1;e._autoResetExpanded=()=>{var o,r;if(!n){e._queue(()=>{n=!0});return}if((o=(r=e.options.autoResetAll)!=null?r:e.options.autoResetExpanded)!=null?o:!e.options.manualExpanding){if(t)return;t=!0,e._queue(()=>{e.resetExpanded(),t=!1})}},e.setExpanded=o=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(o),e.toggleAllRowsExpanded=o=>{o??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=o=>{var r,i;e.setExpanded(o?{}:(r=(i=e.initialState)==null?void 0:i.expanded)!=null?r:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(o=>o.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>o=>{o.persist==null||o.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const o=e.getState().expanded;return o===!0||Object.values(o).some(Boolean)},e.getIsAllRowsExpanded=()=>{const o=e.getState().expanded;return typeof o=="boolean"?o===!0:!(!Object.keys(o).length||e.getRowModel().flatRows.some(r=>!r.getIsExpanded()))},e.getExpandedDepth=()=>{let o=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");o=Math.max(o,s.length)}),o},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,n)=>{e.toggleExpanded=t=>{n.setExpanded(o=>{var r;const i=o===!0?!0:!!(o!=null&&o[e.id]);let s={};if(o===!0?Object.keys(n.getRowModel().rowsById).forEach(l=>{s[l]=!0}):s=o,t=(r=t)!=null?r:!i,!i&&t)return{...s,[e.id]:!0};if(i&&!t){const{[e.id]:l,...a}=s;return a}return o})},e.getIsExpanded=()=>{var t;const o=n.getState().expanded;return!!((t=n.options.getIsRowExpanded==null?void 0:n.options.getIsRowExpanded(e))!=null?t:o===!0||o!=null&&o[e.id])},e.getCanExpand=()=>{var t,o,r;return(t=n.options.getRowCanExpand==null?void 0:n.options.getRowCanExpand(e))!=null?t:((o=n.options.enableExpanding)!=null?o:!0)&&!!((r=e.subRows)!=null&&r.length)},e.getIsAllParentsExpanded=()=>{let t=!0,o=e;for(;t&&o.parentId;)o=n.getRow(o.parentId,!0),t=o.getIsExpanded();return t},e.getToggleExpandedHandler=()=>{const t=e.getCanExpand();return()=>{t&&e.toggleExpanded()}}}},ke=0,Ge=10,_e=()=>({pageIndex:ke,pageSize:Ge}),Kn={getInitialState:e=>({...e,pagination:{..._e(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:G("pagination",e)}),createTable:e=>{let n=!1,t=!1;e._autoResetPageIndex=()=>{var o,r;if(!n){e._queue(()=>{n=!0});return}if((o=(r=e.options.autoResetAll)!=null?r:e.options.autoResetPageIndex)!=null?o:!e.options.manualPagination){if(t)return;t=!0,e._queue(()=>{e.resetPageIndex(),t=!1})}},e.setPagination=o=>{const r=i=>Y(o,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(r)},e.resetPagination=o=>{var r;e.setPagination(o?_e():(r=e.initialState.pagination)!=null?r:_e())},e.setPageIndex=o=>{e.setPagination(r=>{let i=Y(o,r.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...r,pageIndex:i}})},e.resetPageIndex=o=>{var r,i;e.setPageIndex(o?ke:(r=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?r:ke)},e.resetPageSize=o=>{var r,i;e.setPageSize(o?Ge:(r=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?r:Ge)},e.setPageSize=o=>{e.setPagination(r=>{const i=Math.max(1,Y(o,r.pageSize)),s=r.pageSize*r.pageIndex,l=Math.floor(s/i);return{...r,pageIndex:l,pageSize:i}})},e.setPageCount=o=>e.setPagination(r=>{var i;let s=Y(o,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...r,pageCount:s}}),e.getPageOptions=$(()=>[e.getPageCount()],o=>{let r=[];return o&&o>0&&(r=[...new Array(o)].fill(null).map((i,s)=>s)),r},y(e.options,"debugTable")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:o}=e.getState().pagination,r=e.getPageCount();return r===-1?!0:r===0?!1:o<r-1},e.previousPage=()=>e.setPageIndex(o=>o-1),e.nextPage=()=>e.setPageIndex(o=>o+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var o;return(o=e.options.pageCount)!=null?o:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var o;return(o=e.options.rowCount)!=null?o:e.getPrePaginationRowModel().rows.length}}},Me=()=>({top:[],bottom:[]}),Xn={getInitialState:e=>({rowPinning:Me(),...e}),getDefaultOptions:e=>({onRowPinningChange:G("rowPinning",e)}),createRow:(e,n)=>{e.pin=(t,o,r)=>{const i=o?e.getLeafRows().map(a=>{let{id:d}=a;return d}):[],s=r?e.getParentRows().map(a=>{let{id:d}=a;return d}):[],l=new Set([...s,e.id,...i]);n.setRowPinning(a=>{var d,c;if(t==="bottom"){var f,p;return{top:((f=a==null?void 0:a.top)!=null?f:[]).filter(S=>!(l!=null&&l.has(S))),bottom:[...((p=a==null?void 0:a.bottom)!=null?p:[]).filter(S=>!(l!=null&&l.has(S))),...Array.from(l)]}}if(t==="top"){var u,h;return{top:[...((u=a==null?void 0:a.top)!=null?u:[]).filter(S=>!(l!=null&&l.has(S))),...Array.from(l)],bottom:((h=a==null?void 0:a.bottom)!=null?h:[]).filter(S=>!(l!=null&&l.has(S)))}}return{top:((d=a==null?void 0:a.top)!=null?d:[]).filter(S=>!(l!=null&&l.has(S))),bottom:((c=a==null?void 0:a.bottom)!=null?c:[]).filter(S=>!(l!=null&&l.has(S)))}})},e.getCanPin=()=>{var t;const{enableRowPinning:o,enablePinning:r}=n.options;return typeof o=="function"?o(e):(t=o??r)!=null?t:!0},e.getIsPinned=()=>{const t=[e.id],{top:o,bottom:r}=n.getState().rowPinning,i=t.some(l=>o==null?void 0:o.includes(l)),s=t.some(l=>r==null?void 0:r.includes(l));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var t,o;const r=e.getIsPinned();if(!r)return-1;const i=(t=r==="top"?n.getTopRows():n.getBottomRows())==null?void 0:t.map(s=>{let{id:l}=s;return l});return(o=i==null?void 0:i.indexOf(e.id))!=null?o:-1}},createTable:e=>{e.setRowPinning=n=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(n),e.resetRowPinning=n=>{var t,o;return e.setRowPinning(n?Me():(t=(o=e.initialState)==null?void 0:o.rowPinning)!=null?t:Me())},e.getIsSomeRowsPinned=n=>{var t;const o=e.getState().rowPinning;if(!n){var r,i;return!!((r=o.top)!=null&&r.length||(i=o.bottom)!=null&&i.length)}return!!((t=o[n])!=null&&t.length)},e._getPinnedRows=(n,t,o)=>{var r;return((r=e.options.keepPinnedRows)==null||r?(t??[]).map(s=>{const l=e.getRow(s,!0);return l.getIsAllParentsExpanded()?l:null}):(t??[]).map(s=>n.find(l=>l.id===s))).filter(Boolean).map(s=>({...s,position:o}))},e.getTopRows=$(()=>[e.getRowModel().rows,e.getState().rowPinning.top],(n,t)=>e._getPinnedRows(n,t,"top"),y(e.options,"debugRows")),e.getBottomRows=$(()=>[e.getRowModel().rows,e.getState().rowPinning.bottom],(n,t)=>e._getPinnedRows(n,t,"bottom"),y(e.options,"debugRows")),e.getCenterRows=$(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(n,t,o)=>{const r=new Set([...t??[],...o??[]]);return n.filter(i=>!r.has(i.id))},y(e.options,"debugRows"))}},Zn={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:G("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=n=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(n),e.resetRowSelection=n=>{var t;return e.setRowSelection(n?{}:(t=e.initialState.rowSelection)!=null?t:{})},e.toggleAllRowsSelected=n=>{e.setRowSelection(t=>{n=typeof n<"u"?n:!e.getIsAllRowsSelected();const o={...t},r=e.getPreGroupedRowModel().flatRows;return n?r.forEach(i=>{i.getCanSelect()&&(o[i.id]=!0)}):r.forEach(i=>{delete o[i.id]}),o})},e.toggleAllPageRowsSelected=n=>e.setRowSelection(t=>{const o=typeof n<"u"?n:!e.getIsAllPageRowsSelected(),r={...t};return e.getRowModel().rows.forEach(i=>{Te(r,i.id,o,!0,e)}),r}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=$(()=>[e.getState().rowSelection,e.getCoreRowModel()],(n,t)=>Object.keys(n).length?Fe(e,t):{rows:[],flatRows:[],rowsById:{}},y(e.options,"debugTable")),e.getFilteredSelectedRowModel=$(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(n,t)=>Object.keys(n).length?Fe(e,t):{rows:[],flatRows:[],rowsById:{}},y(e.options,"debugTable")),e.getGroupedSelectedRowModel=$(()=>[e.getState().rowSelection,e.getSortedRowModel()],(n,t)=>Object.keys(n).length?Fe(e,t):{rows:[],flatRows:[],rowsById:{}},y(e.options,"debugTable")),e.getIsAllRowsSelected=()=>{const n=e.getFilteredRowModel().flatRows,{rowSelection:t}=e.getState();let o=!!(n.length&&Object.keys(t).length);return o&&n.some(r=>r.getCanSelect()&&!t[r.id])&&(o=!1),o},e.getIsAllPageRowsSelected=()=>{const n=e.getPaginationRowModel().flatRows.filter(r=>r.getCanSelect()),{rowSelection:t}=e.getState();let o=!!n.length;return o&&n.some(r=>!t[r.id])&&(o=!1),o},e.getIsSomeRowsSelected=()=>{var n;const t=Object.keys((n=e.getState().rowSelection)!=null?n:{}).length;return t>0&&t<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const n=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:n.filter(t=>t.getCanSelect()).some(t=>t.getIsSelected()||t.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>n=>{e.toggleAllRowsSelected(n.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>n=>{e.toggleAllPageRowsSelected(n.target.checked)}},createRow:(e,n)=>{e.toggleSelected=(t,o)=>{const r=e.getIsSelected();n.setRowSelection(i=>{var s;if(t=typeof t<"u"?t:!r,e.getCanSelect()&&r===t)return i;const l={...i};return Te(l,e.id,t,(s=o==null?void 0:o.selectChildren)!=null?s:!0,n),l})},e.getIsSelected=()=>{const{rowSelection:t}=n.getState();return Qe(e,t)},e.getIsSomeSelected=()=>{const{rowSelection:t}=n.getState();return Be(e,t)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:t}=n.getState();return Be(e,t)==="all"},e.getCanSelect=()=>{var t;return typeof n.options.enableRowSelection=="function"?n.options.enableRowSelection(e):(t=n.options.enableRowSelection)!=null?t:!0},e.getCanSelectSubRows=()=>{var t;return typeof n.options.enableSubRowSelection=="function"?n.options.enableSubRowSelection(e):(t=n.options.enableSubRowSelection)!=null?t:!0},e.getCanMultiSelect=()=>{var t;return typeof n.options.enableMultiRowSelection=="function"?n.options.enableMultiRowSelection(e):(t=n.options.enableMultiRowSelection)!=null?t:!0},e.getToggleSelectedHandler=()=>{const t=e.getCanSelect();return o=>{var r;t&&e.toggleSelected((r=o.target)==null?void 0:r.checked)}}}},Te=(e,n,t,o,r)=>{var i;const s=r.getRow(n,!0);t?(s.getCanMultiSelect()||Object.keys(e).forEach(l=>delete e[l]),s.getCanSelect()&&(e[n]=!0)):delete e[n],o&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(l=>Te(e,l.id,t,o,r))};function Fe(e,n){const t=e.getState().rowSelection,o=[],r={},i=function(s,l){return s.map(a=>{var d;const c=Qe(a,t);if(c&&(o.push(a),r[a.id]=a),(d=a.subRows)!=null&&d.length&&(a={...a,subRows:i(a.subRows)}),c)return a}).filter(Boolean)};return{rows:i(n.rows),flatRows:o,rowsById:r}}function Qe(e,n){var t;return(t=n[e.id])!=null?t:!1}function Be(e,n,t){var o;if(!((o=e.subRows)!=null&&o.length))return!1;let r=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!r)&&(s.getCanSelect()&&(Qe(s,n)?i=!0:r=!1),s.subRows&&s.subRows.length)){const l=Be(s,n);l==="all"?i=!0:(l==="some"&&(i=!0),r=!1)}}),r?"all":i?"some":!1}const Ne=/([0-9]+)/gm,Jn=(e,n,t)=>yt(ee(e.getValue(t)).toLowerCase(),ee(n.getValue(t)).toLowerCase()),Yn=(e,n,t)=>yt(ee(e.getValue(t)),ee(n.getValue(t))),eo=(e,n,t)=>Ke(ee(e.getValue(t)).toLowerCase(),ee(n.getValue(t)).toLowerCase()),to=(e,n,t)=>Ke(ee(e.getValue(t)),ee(n.getValue(t))),no=(e,n,t)=>{const o=e.getValue(t),r=n.getValue(t);return o>r?1:o<r?-1:0},oo=(e,n,t)=>Ke(e.getValue(t),n.getValue(t));function Ke(e,n){return e===n?0:e>n?1:-1}function ee(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function yt(e,n){const t=e.split(Ne).filter(Boolean),o=n.split(Ne).filter(Boolean);for(;t.length&&o.length;){const r=t.shift(),i=o.shift(),s=parseInt(r,10),l=parseInt(i,10),a=[s,l].sort();if(isNaN(a[0])){if(r>i)return 1;if(i>r)return-1;continue}if(isNaN(a[1]))return isNaN(s)?-1:1;if(s>l)return 1;if(l>s)return-1}return t.length-o.length}const ue={alphanumeric:Jn,alphanumericCaseSensitive:Yn,text:eo,textCaseSensitive:to,datetime:no,basic:oo},ro={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:G("sorting",e),isMultiSortEvent:n=>n.shiftKey}),createColumn:(e,n)=>{e.getAutoSortingFn=()=>{const t=n.getFilteredRowModel().flatRows.slice(10);let o=!1;for(const r of t){const i=r==null?void 0:r.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return ue.datetime;if(typeof i=="string"&&(o=!0,i.split(Ne).length>1))return ue.alphanumeric}return o?ue.text:ue.basic},e.getAutoSortDir=()=>{const t=n.getFilteredRowModel().flatRows[0];return typeof(t==null?void 0:t.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var t,o;if(!e)throw new Error;return ve(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(t=(o=n.options.sortingFns)==null?void 0:o[e.columnDef.sortingFn])!=null?t:ue[e.columnDef.sortingFn]},e.toggleSorting=(t,o)=>{const r=e.getNextSortingOrder(),i=typeof t<"u"&&t!==null;n.setSorting(s=>{const l=s==null?void 0:s.find(u=>u.id===e.id),a=s==null?void 0:s.findIndex(u=>u.id===e.id);let d=[],c,f=i?t:r==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&o?l?c="toggle":c="add":s!=null&&s.length&&a!==s.length-1?c="replace":l?c="toggle":c="replace",c==="toggle"&&(i||r||(c="remove")),c==="add"){var p;d=[...s,{id:e.id,desc:f}],d.splice(0,d.length-((p=n.options.maxMultiSortColCount)!=null?p:Number.MAX_SAFE_INTEGER))}else c==="toggle"?d=s.map(u=>u.id===e.id?{...u,desc:f}:u):c==="remove"?d=s.filter(u=>u.id!==e.id):d=[{id:e.id,desc:f}];return d})},e.getFirstSortDir=()=>{var t,o;return((t=(o=e.columnDef.sortDescFirst)!=null?o:n.options.sortDescFirst)!=null?t:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=t=>{var o,r;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((o=n.options.enableSortingRemoval)==null||o)&&(!(t&&(r=n.options.enableMultiRemove)!=null)||r)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var t,o;return((t=e.columnDef.enableSorting)!=null?t:!0)&&((o=n.options.enableSorting)!=null?o:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var t,o;return(t=(o=e.columnDef.enableMultiSort)!=null?o:n.options.enableMultiSort)!=null?t:!!e.accessorFn},e.getIsSorted=()=>{var t;const o=(t=n.getState().sorting)==null?void 0:t.find(r=>r.id===e.id);return o?o.desc?"desc":"asc":!1},e.getSortIndex=()=>{var t,o;return(t=(o=n.getState().sorting)==null?void 0:o.findIndex(r=>r.id===e.id))!=null?t:-1},e.clearSorting=()=>{n.setSorting(t=>t!=null&&t.length?t.filter(o=>o.id!==e.id):[])},e.getToggleSortingHandler=()=>{const t=e.getCanSort();return o=>{t&&(o.persist==null||o.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?n.options.isMultiSortEvent==null?void 0:n.options.isMultiSortEvent(o):!1))}}},createTable:e=>{e.setSorting=n=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(n),e.resetSorting=n=>{var t,o;e.setSorting(n?[]:(t=(o=e.initialState)==null?void 0:o.sorting)!=null?t:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},io=[_n,Un,kn,Gn,Fn,Pn,Wn,qn,ro,On,Qn,Kn,Xn,Zn,Bn];function so(e){var n,t;const o=[...io,...(n=e._features)!=null?n:[]];let r={_features:o};const i=r._features.reduce((p,u)=>Object.assign(p,u.getDefaultOptions==null?void 0:u.getDefaultOptions(r)),{}),s=p=>r.options.mergeOptions?r.options.mergeOptions(i,p):{...i,...p};let a={...{},...(t=e.initialState)!=null?t:{}};r._features.forEach(p=>{var u;a=(u=p.getInitialState==null?void 0:p.getInitialState(a))!=null?u:a});const d=[];let c=!1;const f={_features:o,options:{...i,...e},initialState:a,_queue:p=>{d.push(p),c||(c=!0,Promise.resolve().then(()=>{for(;d.length;)d.shift()();c=!1}).catch(u=>setTimeout(()=>{throw u})))},reset:()=>{r.setState(r.initialState)},setOptions:p=>{const u=Y(p,r.options);r.options=s(u)},getState:()=>r.options.state,setState:p=>{r.options.onStateChange==null||r.options.onStateChange(p)},_getRowId:(p,u,h)=>{var S;return(S=r.options.getRowId==null?void 0:r.options.getRowId(p,u,h))!=null?S:`${h?[h.id,u].join("."):u}`},getCoreRowModel:()=>(r._getCoreRowModel||(r._getCoreRowModel=r.options.getCoreRowModel(r)),r._getCoreRowModel()),getRowModel:()=>r.getPaginationRowModel(),getRow:(p,u)=>{let h=(u?r.getPrePaginationRowModel():r.getRowModel()).rowsById[p];if(!h&&(h=r.getCoreRowModel().rowsById[p],!h))throw new Error;return h},_getDefaultColumnDef:$(()=>[r.options.defaultColumn],p=>{var u;return p=(u=p)!=null?u:{},{header:h=>{const S=h.header.column.columnDef;return S.accessorKey?S.accessorKey:S.accessorFn?S.id:null},cell:h=>{var S,C;return(S=(C=h.renderValue())==null||C.toString==null?void 0:C.toString())!=null?S:null},...r._features.reduce((h,S)=>Object.assign(h,S.getDefaultColumnDef==null?void 0:S.getDefaultColumnDef()),{}),...p}},y(e,"debugColumns")),_getColumnDefs:()=>r.options.columns,getAllColumns:$(()=>[r._getColumnDefs()],p=>{const u=function(h,S,C){return C===void 0&&(C=0),h.map(v=>{const w=yn(r,v,C,S),R=v;return w.columns=R.columns?u(R.columns,w,C+1):[],w})};return u(p)},y(e,"debugColumns")),getAllFlatColumns:$(()=>[r.getAllColumns()],p=>p.flatMap(u=>u.getFlatColumns()),y(e,"debugColumns")),_getAllFlatColumnsById:$(()=>[r.getAllFlatColumns()],p=>p.reduce((u,h)=>(u[h.id]=h,u),{}),y(e,"debugColumns")),getAllLeafColumns:$(()=>[r.getAllColumns(),r._getOrderColumnsFn()],(p,u)=>{let h=p.flatMap(S=>S.getLeafColumns());return u(h)},y(e,"debugColumns")),getColumn:p=>r._getAllFlatColumnsById()[p]};Object.assign(r,f);for(let p=0;p<r._features.length;p++){const u=r._features[p];u==null||u.createTable==null||u.createTable(r)}return r}function lo(){return e=>$(()=>[e.options.data],n=>{const t={rows:[],flatRows:[],rowsById:{}},o=function(r,i,s){i===void 0&&(i=0);const l=[];for(let d=0;d<r.length;d++){const c=Mn(e,e._getRowId(r[d],d,s),r[d],d,i,void 0,s==null?void 0:s.id);if(t.flatRows.push(c),t.rowsById[c.id]=c,l.push(c),e.options.getSubRows){var a;c.originalSubRows=e.options.getSubRows(r[d],d),(a=c.originalSubRows)!=null&&a.length&&(c.subRows=o(c.originalSubRows,i+1,c))}}return l};return t.rows=o(n),t},y(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function lt(e,n){return e?ao(e)?F.createElement(e,n):e:null}function ao(e){return uo(e)||typeof e=="function"||co(e)}function uo(e){return typeof e=="function"&&(()=>{const n=Object.getPrototypeOf(e);return n.prototype&&n.prototype.isReactComponent})()}function co(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function go(e){const n={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[t]=F.useState(()=>({current:so(n)})),[o,r]=F.useState(()=>t.current.initialState);return t.current.setOptions(i=>({...i,...e,state:{...o,...e.state},onStateChange:s=>{r(s),e.onStateChange==null||e.onStateChange(s)}})),t.current}const fo=x.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`,po=x.label`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$disabled:e})=>e?.6:1};
  user-select: none;
`,_t=x.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`,ho=x.div`
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

  ${_t}:focus-visible + & {
    box-shadow: 0 0 0 3px
      ${({theme:e,$hasError:n})=>n?`${e.colors.danger}22`:`${e.colors.primary}22`};
    border-color: ${({theme:e,$hasError:n})=>n?e.colors.danger:e.colors.primary};
  }
`,mo=x.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,So=x.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,Ue=F.forwardRef(({label:e,error:n,checked:t,defaultChecked:o=!1,indeterminate:r=!1,disabled:i=!1,id:s,className:l,style:a,onChange:d,...c},f)=>{const p=F.useRef(null);F.useImperativeHandle(f,()=>p.current);const[u,h]=F.useState(t!==void 0?t:o);F.useEffect(()=>{t!==void 0&&h(t)},[t]),F.useEffect(()=>{p.current&&(p.current.indeterminate=!!r)},[r]);const S=w=>{i||(t===void 0&&h(w.target.checked),d&&d(w))},C=s||`checkbox-${Math.random().toString(36).slice(2,9)}`,v=t!==void 0?t:u;return g.jsxs(fo,{children:[g.jsxs(po,{$disabled:i,htmlFor:C,className:l,style:a,children:[g.jsx(_t,{ref:p,type:"checkbox",id:C,checked:v,disabled:i,onChange:S,...c}),g.jsx(ho,{$checked:v,$indeterminate:r,$hasError:!!n,$disabled:i,children:r?g.jsx(Dt,{size:14}):v&&g.jsx(gt,{size:14})}),e&&g.jsx(mo,{children:e})]}),n&&g.jsx(So,{role:"alert",children:n})]})});Ue.displayName="Checkbox";const xo=x.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({$fullWidth:e})=>e?"100%":"auto"};
  position: relative;
`,vo=x.label`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,wo=x.div`
  position: relative;
  width: 100%;
`,Co=x.button`
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
`,Ro=x.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({theme:e,$isPlaceholder:n})=>n?e.colors.textMuted:e.colors.text};
`,$o=x.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.textMuted};
  transition: transform ${({theme:e})=>e.transition.fast};
  transform: ${({$isOpen:e})=>e?"rotate(180deg)":"rotate(0deg)"};
`,yo=x.ul`
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
`,_o=x.li`
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
`,Mo=x.span`
  opacity: 0.65;
  font-size: 11px;
  margin-left: 6px;
`,Fo=x.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,Mt=Lt.forwardRef(({label:e,options:n,value:t,defaultValue:o,onChange:r,placeholder:i="Select an option",error:s,fullWidth:l=!0,disabled:a=!1,name:d,id:c,style:f,className:p},u)=>{const[h,S]=F.useState(!1),[C,v]=F.useState(t!==void 0?t:o||""),[w,R]=F.useState({}),P=F.useRef(null),V=F.useRef(null),z=F.useRef(null);F.useEffect(()=>{t!==void 0&&v(t)},[t]);const B=F.useCallback(()=>{if(!V.current)return;const _=V.current.getBoundingClientRect(),k=window.innerHeight-_.bottom<220&&_.top>220;R({position:"fixed",left:`${_.left}px`,width:`${_.width}px`,zIndex:99999,...k?{bottom:`${window.innerHeight-_.top+4}px`,top:"auto",boxShadow:"0 -10px 25px -5px rgba(0, 0, 0, 0.2), 0 -8px 10px -6px rgba(0, 0, 0, 0.1)"}:{top:`${_.bottom+4}px`,bottom:"auto",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"}})},[]);F.useEffect(()=>{if(!h)return;B();const _=()=>{B()};return window.addEventListener("scroll",_,!0),window.addEventListener("resize",_),()=>{window.removeEventListener("scroll",_,!0),window.removeEventListener("resize",_)}},[h,B]),F.useEffect(()=>{if(!h)return;const _=N=>{var Xe,Ze;const k=N.target,Ft=(Xe=P.current)==null?void 0:Xe.contains(k),Pt=(Ze=z.current)==null?void 0:Ze.contains(k);!Ft&&!Pt&&S(!1)};return document.addEventListener("mousedown",_),()=>{document.removeEventListener("mousedown",_)}},[h]);const D=()=>{a||(h||B(),S(_=>!_))},X=n.find(_=>_.value===C),L=_=>{a||_.disabled||(v(_.value),S(!1),r&&r({target:{value:_.value,name:d}}))},q=_=>{a||(_.key==="Enter"||_.key===" "?(_.preventDefault(),D()):_.key==="Escape"&&S(!1))},te=c||`select-${Math.random().toString(36).slice(2,9)}`;return g.jsxs(xo,{$fullWidth:l,style:f,className:p,ref:u,children:[e&&g.jsx(vo,{htmlFor:te,children:e}),g.jsxs(wo,{ref:P,children:[g.jsxs(Co,{ref:V,id:te,type:"button",$isOpen:h,$hasError:!!s,$isDisabled:a,disabled:a,onClick:D,onKeyDown:q,"aria-haspopup":"listbox","aria-expanded":h,children:[g.jsx(Ro,{$isPlaceholder:!X,children:X?X.label:i}),g.jsx($o,{$isOpen:h,children:g.jsx(Ht,{size:18})})]}),h&&ft.createPortal(g.jsx(yo,{ref:z,role:"listbox",style:w,children:n.map(_=>{const N=_.value===C,k=!!_.disabled;return g.jsxs(_o,{role:"option","aria-selected":N,"aria-disabled":k,$isSelected:N,$isDisabled:k,onClick:()=>L(_),children:[g.jsxs("span",{children:[_.label,k&&g.jsx(Mo,{children:"(Coming Soon)"})]}),N&&g.jsx(gt,{size:16})]},_.value)})}),document.body)]}),s&&g.jsx(Fo,{role:"alert",children:s})]})});Mt.displayName="Select";const Po=x.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,Io=x.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Vo=x.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,bo=x.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Eo=x.div`
  width: 80px;
`,zo=x.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,Pe=x.button`
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
`,jo=({page:e,totalPages:n,total:t,limit:o,onPageChange:r,onLimitChange:i})=>{const s=Math.min((e-1)*o+1,t),l=Math.min(e*o,t),a=Array.from({length:n},(f,p)=>p+1).filter(f=>f===1||f===n||Math.abs(f-e)<=1),d=[];a.forEach((f,p)=>{p>0&&f-a[p-1]>1&&d.push("..."),d.push(f)});const c=[{value:"10",label:"10"},{value:"20",label:"20"},{value:"50",label:"50"},{value:"100",label:"100"}];return g.jsxs(Po,{children:[g.jsxs(Io,{children:["Showing ",s,"–",l," of ",t," results"]}),g.jsxs(Vo,{children:[i&&g.jsxs(bo,{children:[g.jsx("span",{children:"Rows per page:"}),g.jsx(Eo,{children:g.jsx(Mt,{options:c,value:String(o),onChange:f=>i(Number(f.target.value)),fullWidth:!1})})]}),g.jsxs(zo,{children:[g.jsx(Pe,{"aria-label":"Previous Page",disabled:e<=1,onClick:()=>r(e-1),children:g.jsx(Ot,{size:16})}),d.map((f,p)=>f==="..."?g.jsx("span",{style:{padding:"0 4px",color:"#94a3b8"},children:"..."},`ellipsis-${p}`):g.jsx(Pe,{$active:f===e,onClick:()=>r(f),children:f},f)),g.jsx(Pe,{"aria-label":"Next Page",disabled:e>=n,onClick:()=>r(e+1),children:g.jsx(ct,{size:16})})]})]})]})},Do=x.div`
  width: 100%;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  background-color: ${({theme:e})=>e.colors.surface};
  overflow: hidden;
`,Lo=x.div`
  width: 100%;
  overflow-x: auto;
`,Ho=x.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({theme:e})=>e.fontSize.base};
`,Oo=x.thead`
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
`,Ao=x.tbody`
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
`,ko=x.div`
  padding: ${({theme:e})=>e.spacing.xxxl} ${({theme:e})=>e.spacing.xl};
  text-align: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: ${({theme:e})=>e.fontSize.base};
`,ir=x.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,sr=x.button`
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
`,Go=x.div`
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`;function lr({columns:e,data:n,isLoading:t,emptyMessage:o="No data found.",keyExtractor:r,selectable:i=!1,selectedRowIds:s=[],onSelectionChange:l,pagination:a}){const d=F.useMemo(()=>{const w=e.find(R=>R.key==="actions"||R.header.toLowerCase()==="actions");return w?[w,...e.filter(R=>R!==w)]:e},[e]),c=F.useMemo(()=>n.map(r),[n,r]),f=F.useMemo(()=>c.length>0&&c.every(w=>s.includes(w)),[c,s]),p=F.useMemo(()=>c.some(w=>s.includes(w)),[c,s]),u=()=>{l&&l(f?[]:c)},h=w=>{l&&(s.includes(w)?l(s.filter(R=>R!==w)):l([...s,w]))},S=F.useMemo(()=>d.map(w=>({id:w.key,header:()=>w.header,accessorFn:R=>R[w.key],cell:R=>{if(w.render)return w.render(R.row.original,R.row.index);const P=R.row.original[w.key];return P!=null?String(P):"—"},size:w.width?parseInt(w.width,10):void 0})),[d]),C=go({data:n,columns:S,getCoreRowModel:lo()}),v=(i?1:0)+e.length+1;return g.jsxs(Do,{children:[g.jsx(Lo,{children:g.jsxs(Ho,{children:[g.jsx(Oo,{children:C.getHeaderGroups().map(w=>g.jsxs("tr",{children:[i&&g.jsx("th",{style:{width:"48px",minWidth:"48px",textAlign:"center"},children:g.jsx(Ue,{checked:f,indeterminate:p&&!f,onChange:u})}),w.headers.map(R=>{const P=d.find(z=>z.key===R.id),V=(P==null?void 0:P.key)==="actions"||R.id==="actions";return g.jsx("th",{className:P!=null&&P.sortable?"sortable":"",style:{width:(P==null?void 0:P.width)||(V?"100px":void 0),minWidth:V?"100px":void 0},children:R.isPlaceholder?null:lt(R.column.columnDef.header,R.getContext())},R.id)}),g.jsx("th",{style:{width:"100%",minWidth:0,padding:0}})]},w.id))}),g.jsx(Ao,{children:t?g.jsx("tr",{children:g.jsx("td",{colSpan:v,children:g.jsx(At,{})})}):C.getRowModel().rows.length===0?g.jsx("tr",{children:g.jsx("td",{colSpan:v,children:g.jsx(ko,{children:o})})}):C.getRowModel().rows.map(w=>{const R=r(w.original),P=s.includes(R);return g.jsxs("tr",{children:[i&&g.jsx("td",{style:{width:"48px",minWidth:"48px",textAlign:"center"},children:g.jsx(Ue,{checked:P,onChange:()=>h(R)})}),w.getVisibleCells().map(V=>{const z=d.find(D=>D.key===V.column.id),B=(z==null?void 0:z.key)==="actions"||V.column.id==="actions";return g.jsx("td",{style:{width:(z==null?void 0:z.width)||(B?"100px":void 0),minWidth:B?"100px":void 0},children:lt(V.column.columnDef.cell,V.getContext())},V.id)}),g.jsx("td",{style:{width:"100%",minWidth:0,padding:0}})]},R)})})]})}),a&&a.totalPages>0&&g.jsx(Go,{children:g.jsx(jo,{page:a.page,totalPages:a.totalPages,total:a.total,limit:a.limit,onPageChange:a.onPageChange,onLimitChange:a.onLimitChange})})]})}const To={default:U`
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
  `},Bo=x.span`
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

  ${({$variant:e})=>To[e]}
`,ar=({variant:e="default",size:n="md",children:t,dot:o})=>g.jsxs(Bo,{$variant:e,$size:n,children:[o&&g.jsx("svg",{width:"6",height:"6",viewBox:"0 0 6 6",fill:"currentColor",children:g.jsx("circle",{cx:"3",cy:"3",r:"3"})}),t]}),No=kt`
  from { opacity: 0; }
  to { opacity: 1; }
`,Uo=x.div`
  position: fixed;
  inset: 0;
  background-color: ${({theme:e})=>e.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({theme:e})=>e.zIndex.overlay};
  padding: ${({theme:e})=>e.spacing.lg};
  animation: ${No} 0.15s ease;
`,Wo=x.div`
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
`,qo=x.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.xl};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  flex-shrink: 0;
`,Qo=x.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Ko=x.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 4px;
`,Xo=x.button`
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
`,Zo=x.div`
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
`,Jo=x.div`
  padding: ${({theme:e})=>e.spacing.xl};
`,Yo=x.div`
  padding: ${({theme:e})=>e.spacing.lg} ${({theme:e})=>e.spacing.xl};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-shrink: 0;
`,ur=({isOpen:e,onClose:n,title:t,subtitle:o,size:r="md",footer:i,children:s,closeOnBackdrop:l=!0})=>{const a=F.useCallback(d=>{d.key==="Escape"&&n()},[n]);return F.useEffect(()=>(e&&(document.addEventListener("keydown",a),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",a),document.body.style.overflow=""}),[e,a]),ft.createPortal(g.jsx(Gt,{children:e&&g.jsx(Uo,{onClick:l?n:void 0,role:"dialog","aria-modal":"true","aria-labelledby":"modal-title",children:g.jsx(Tt.div,{initial:{opacity:0,scale:.95,y:8},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:8},transition:{duration:.18,ease:"easeOut"},style:{width:"100%",display:"flex",justifyContent:"center"},onClick:d=>d.stopPropagation(),children:g.jsxs(Wo,{$size:r,children:[(t||o)&&g.jsxs(qo,{children:[g.jsxs("div",{children:[t&&g.jsx(Qo,{id:"modal-title",children:t}),o&&g.jsx(Ko,{children:o})]}),g.jsx(Xo,{onClick:n,"aria-label":"Close modal",children:g.jsx(Bt,{size:20})})]}),g.jsx(Zo,{children:g.jsx(Jo,{children:s})}),i&&g.jsx(Yo,{children:i})]})})})}),document.body)};export{ir as A,ar as B,rr as C,sr as I,ur as M,or as P,Mt as S,lr as T,Ue as a,nr as u};
