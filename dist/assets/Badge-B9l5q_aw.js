var Je=e=>{throw TypeError(e)};var we=(e,n,t)=>n.has(e)||Je("Cannot "+t);var m=(e,n,t)=>(we(e,n,"read from private field"),t?t.call(e):n.get(e)),D=(e,n,t)=>n.has(e)?Je("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,t),E=(e,n,t,o)=>(we(e,n,"write to private field"),o?o.call(e,t):n.set(e,t),t),z=(e,n,t)=>(we(e,n,"access private method"),t);import{ad as Pt,ak as Ye,al as T,ae as Ie,am as ge,ai as Ve,an as Ee,ao as et,ap as It,aq as he,ar as Vt,as as Et,at as tt,ah as ut,r as M,aj as dt,w as zt,j as p,au as gt,av as bt,g as R,aa as U,aw as Dt,W as ct,Z as Lt,ax as Ht,l as jt,ay as Ot,L as At}from"./index-0f8U9to7.js";var A,F,fe,O,ne,ie,K,Z,pe,se,le,oe,re,J,ae,I,de,ze,be,De,Le,He,je,Oe,ft,at,Gt=(at=class extends Pt{constructor(n,t){super();D(this,I);D(this,A);D(this,F);D(this,fe);D(this,O);D(this,ne);D(this,ie);D(this,K);D(this,Z);D(this,pe);D(this,se);D(this,le);D(this,oe);D(this,re);D(this,J);D(this,ae,new Set);this.options=t,E(this,A,n),E(this,Z,null),E(this,K,Ye()),this.bindMethods(),this.setOptions(t)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(m(this,F).addObserver(this),nt(m(this,F),this.options)?z(this,I,de).call(this):this.updateResult(),z(this,I,Le).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Ae(m(this,F),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Ae(m(this,F),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,z(this,I,He).call(this),z(this,I,je).call(this),m(this,F).removeObserver(this)}setOptions(n){const t=this.options,o=m(this,F);if(this.options=m(this,A).defaultQueryOptions(n),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof T(this.options.enabled,m(this,F))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");z(this,I,Oe).call(this),m(this,F).setOptions(this.options),t._defaulted&&!Ie(this.options,t)&&m(this,A).getQueryCache().notify({type:"observerOptionsUpdated",query:m(this,F),observer:this});const r=this.hasListeners();r&&ot(m(this,F),o,this.options,t)&&z(this,I,de).call(this),this.updateResult(),r&&(m(this,F)!==o||T(this.options.enabled,m(this,F))!==T(t.enabled,m(this,F))||ge(this.options.staleTime,m(this,F))!==ge(t.staleTime,m(this,F)))&&z(this,I,ze).call(this);const i=z(this,I,be).call(this);r&&(m(this,F)!==o||T(this.options.enabled,m(this,F))!==T(t.enabled,m(this,F))||i!==m(this,J))&&z(this,I,De).call(this,i)}getOptimisticResult(n){const t=m(this,A).getQueryCache().build(m(this,A),n),o=this.createResult(t,n);return Tt(this,o)&&(E(this,O,o),E(this,ie,this.options),E(this,ne,m(this,F).state)),o}getCurrentResult(){return m(this,O)}trackResult(n,t){return new Proxy(n,{get:(o,r)=>(this.trackProp(r),t==null||t(r),r==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&m(this,K).status==="pending"&&m(this,K).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(o,r))})}trackProp(n){m(this,ae).add(n)}getCurrentQuery(){return m(this,F)}refetch({...n}={}){return this.fetch({...n})}fetchOptimistic(n){const t=m(this,A).defaultQueryOptions(n),o=m(this,A).getQueryCache().build(m(this,A),t);return o.fetch().then(()=>this.createResult(o,t))}fetch(n){return z(this,I,de).call(this,{...n,cancelRefetch:n.cancelRefetch??!0}).then(()=>(this.updateResult(),m(this,O)))}createResult(n,t){var X;const o=m(this,F),r=this.options,i=m(this,O),s=m(this,ne),l=m(this,ie),d=n!==o?n.state:m(this,fe),{state:g}=n;let c={...g},f=!1,u;if(t._optimisticResults){const H=this.hasListeners(),q=!H&&nt(n,t),te=H&&ot(n,o,t,r);(q||te)&&(c={...c,...Et(g.data,n.options)}),t._optimisticResults==="isRestoring"&&(c.fetchStatus="idle")}let{error:h,errorUpdatedAt:S,status:w}=c;u=c.data;let C=!1;if(t.placeholderData!==void 0&&u===void 0&&w==="pending"){let H;i!=null&&i.isPlaceholderData&&t.placeholderData===(l==null?void 0:l.placeholderData)?(H=i.data,C=!0):H=typeof t.placeholderData=="function"?t.placeholderData((X=m(this,le))==null?void 0:X.state.data,m(this,le)):t.placeholderData,H!==void 0&&(w="success",u=tt(i==null?void 0:i.data,H,t),f=!0)}if(t.select&&u!==void 0&&!C)if(i&&u===(s==null?void 0:s.data)&&t.select===m(this,pe))u=m(this,se);else try{E(this,pe,t.select),u=t.select(u),u=tt(i==null?void 0:i.data,u,t),E(this,se,u),E(this,Z,null)}catch(H){E(this,Z,H)}m(this,Z)&&(h=m(this,Z),u=m(this,se),S=Date.now(),w="error");const v=c.fetchStatus==="fetching",x=w==="pending",P=w==="error",V=x&&v,b=u!==void 0,L={status:w,fetchStatus:c.fetchStatus,isPending:x,isSuccess:w==="success",isError:P,isInitialLoading:V,isLoading:V,data:u,dataUpdatedAt:c.dataUpdatedAt,error:h,errorUpdatedAt:S,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:n.isFetched(),isFetchedAfterMount:c.dataUpdateCount>d.dataUpdateCount||c.errorUpdateCount>d.errorUpdateCount,isFetching:v,isRefetching:v&&!x,isLoadingError:P&&!b,isPaused:c.fetchStatus==="paused",isPlaceholderData:f,isRefetchError:P&&b,isStale:We(n,t),refetch:this.refetch,promise:m(this,K),isEnabled:T(t.enabled,n)!==!1};if(this.options.experimental_prefetchInRender){const H=L.data!==void 0,q=L.status==="error"&&!H,te=G=>{q?G.reject(L.error):H&&G.resolve(L.data)},y=()=>{const G=E(this,K,L.promise=Ye());te(G)},N=m(this,K);switch(N.status){case"pending":n.queryHash===o.queryHash&&te(N);break;case"fulfilled":(q||L.data!==N.value)&&y();break;case"rejected":(!q||L.error!==N.reason)&&y();break}}return L}updateResult(){const n=m(this,O),t=this.createResult(m(this,F),this.options);if(E(this,ne,m(this,F).state),E(this,ie,this.options),m(this,ne).data!==void 0&&E(this,le,m(this,F)),Ie(t,n))return;E(this,O,t);const o=()=>{if(!n)return!0;const{notifyOnChangeProps:r}=this.options,i=typeof r=="function"?r():r;if(i==="all"||!i&&!m(this,ae).size)return!0;const s=new Set(i??m(this,ae));return this.options.throwOnError&&s.add("error"),Object.keys(m(this,O)).some(l=>{const a=l;return m(this,O)[a]!==n[a]&&s.has(a)})};z(this,I,ft).call(this,{listeners:o()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&z(this,I,Le).call(this)}},A=new WeakMap,F=new WeakMap,fe=new WeakMap,O=new WeakMap,ne=new WeakMap,ie=new WeakMap,K=new WeakMap,Z=new WeakMap,pe=new WeakMap,se=new WeakMap,le=new WeakMap,oe=new WeakMap,re=new WeakMap,J=new WeakMap,ae=new WeakMap,I=new WeakSet,de=function(n){z(this,I,Oe).call(this);let t=m(this,F).fetch(this.options,n);return n!=null&&n.throwOnError||(t=t.catch(Ve)),t},ze=function(){z(this,I,He).call(this);const n=ge(this.options.staleTime,m(this,F));if(Ee.isServer()||m(this,O).isStale||!et(n))return;const o=It(m(this,O).dataUpdatedAt,n)+1;E(this,oe,he.setTimeout(()=>{m(this,O).isStale||this.updateResult()},o))},be=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(m(this,F)):this.options.refetchInterval)??!1},De=function(n){z(this,I,je).call(this),E(this,J,n),!(Ee.isServer()||T(this.options.enabled,m(this,F))===!1||!et(m(this,J))||m(this,J)===0)&&E(this,re,he.setInterval(()=>{(this.options.refetchIntervalInBackground||Vt.isFocused())&&z(this,I,de).call(this)},m(this,J)))},Le=function(){z(this,I,ze).call(this),z(this,I,De).call(this,z(this,I,be).call(this))},He=function(){m(this,oe)!==void 0&&(he.clearTimeout(m(this,oe)),E(this,oe,void 0))},je=function(){m(this,re)!==void 0&&(he.clearInterval(m(this,re)),E(this,re,void 0))},Oe=function(){const n=m(this,A).getQueryCache().build(m(this,A),this.options);if(n===m(this,F))return;const t=m(this,F);E(this,F,n),E(this,fe,n.state),this.hasListeners()&&(t==null||t.removeObserver(this),n.addObserver(this))},ft=function(n){ut.batch(()=>{n.listeners&&this.listeners.forEach(t=>{t(m(this,O))}),m(this,A).getQueryCache().notify({query:m(this,F),type:"observerResultsUpdated"})})},at);function kt(e,n){return T(n.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&T(n.retryOnMount,e)===!1)}function nt(e,n){return kt(e,n)||e.state.data!==void 0&&Ae(e,n,n.refetchOnMount)}function Ae(e,n,t){if(T(n.enabled,e)!==!1&&ge(n.staleTime,e)!=="static"){const o=typeof t=="function"?t(e):t;return o==="always"||o!==!1&&We(e,n)}return!1}function ot(e,n,t,o){return(e!==n||T(o.enabled,e)===!1)&&(!t.suspense||e.state.status!=="error")&&We(e,t)}function We(e,n){return T(n.enabled,e)!==!1&&e.isStaleByTime(ge(n.staleTime,e))}function Tt(e,n){return!Ie(e.getCurrentResult(),n)}var pt=M.createContext(!1),Bt=()=>M.useContext(pt);pt.Provider;function Nt(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var Ut=M.createContext(Nt()),Wt=()=>M.useContext(Ut),qt=(e,n,t)=>{const o=t!=null&&t.state.error&&typeof e.throwOnError=="function"?dt(e.throwOnError,[t.state.error,t]):e.throwOnError;(e.suspense||e.experimental_prefetchInRender||o)&&(n.isReset()||(e.retryOnMount=!1))},Qt=e=>{M.useEffect(()=>{e.clearReset()},[e])},Kt=({result:e,errorResetBoundary:n,throwOnError:t,query:o,suspense:r})=>e.isError&&!n.isReset()&&!e.isFetching&&o&&(r&&e.data===void 0||dt(t,[e.error,o])),Xt=e=>{if(e.suspense){const t=r=>r==="static"?r:Math.max(r??1e3,1e3),o=e.staleTime;e.staleTime=typeof o=="function"?(...r)=>t(o(...r)):t(o),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},Zt=(e,n)=>e.isLoading&&e.isFetching&&!n,Jt=(e,n)=>(e==null?void 0:e.suspense)&&n.isPending,rt=(e,n,t)=>n.fetchOptimistic(e).catch(()=>{t.clearReset()});function Yt(e,n,t){var u,h,S,w;const o=Bt(),r=Wt(),i=zt(),s=i.defaultQueryOptions(e);(h=(u=i.getDefaultOptions().queries)==null?void 0:u._experimental_beforeQuery)==null||h.call(u,s);const l=i.getQueryCache().get(s.queryHash),a=e.subscribed!==!1;s._optimisticResults=o?"isRestoring":a?"optimistic":void 0,Xt(s),qt(s,r,l),Qt(r);const d=!i.getQueryCache().get(s.queryHash),[g]=M.useState(()=>new n(i,s)),c=g.getOptimisticResult(s),f=!o&&a;if(M.useSyncExternalStore(M.useCallback(C=>{const v=f?g.subscribe(ut.batchCalls(C)):Ve;return g.updateResult(),v},[g,f]),()=>g.getCurrentResult(),()=>g.getCurrentResult()),M.useEffect(()=>{g.setOptions(s)},[s,g]),Jt(s,c))throw rt(s,g,r);if(Kt({result:c,errorResetBoundary:r,throwOnError:s.throwOnError,query:l,suspense:s.suspense}))throw c.error;if((w=(S=i.getDefaultOptions().queries)==null?void 0:S._experimental_afterQuery)==null||w.call(S,s,c),s.experimental_prefetchInRender&&!Ee.isServer()&&Zt(c,o)){const C=d?rt(s,g,r):l==null?void 0:l.promise;C==null||C.catch(Ve).finally(()=>{g.updateResult()})}return s.notifyOnChangeProps?c:g.trackResult(c)}function To(e,n){return Yt(e,Gt)}const en=R.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`,tn=R.span`
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
`,nn=({items:e})=>p.jsx(en,{"aria-label":"Breadcrumb",children:e.map((n,t)=>p.jsxs(tn,{children:[t>0&&p.jsx(gt,{size:16}),n.href&&t<e.length-1?p.jsx(bt,{to:n.href,children:n.label}):p.jsx("span",{children:n.label})]},t))}),on=R.div`
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`,rn=R.div`
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,sn=R.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,ln=R.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,an=R.h1`
  font-size: ${({theme:e})=>e.fontSize.xxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
`,un=R.p`
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.textSecondary};
`,dn=R.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,Bo=({title:e,subtitle:n,breadcrumbs:t,actions:o})=>p.jsxs(on,{children:[t&&t.length>0&&p.jsx(rn,{children:p.jsx(nn,{items:t})}),p.jsxs(sn,{children:[p.jsxs(ln,{children:[p.jsx(an,{children:e}),n&&p.jsx(un,{children:n})]}),o&&p.jsx(dn,{children:o})]})]}),gn=R.div`
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
`,cn=R.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  gap: ${({theme:e})=>e.spacing.md};
`,fn=R.h2`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,pn=R.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 2px;
`,hn=R.div``,mn=R.div`
  margin-top: ${({theme:e})=>e.spacing.lg};
  padding-top: ${({theme:e})=>e.spacing.lg};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
`,No=({title:e,subtitle:n,headerAction:t,footer:o,padding:r,hoverable:i,children:s,className:l})=>p.jsxs(gn,{$padding:r,$hoverable:i,className:l,children:[(e||n||t)&&p.jsxs(cn,{children:[p.jsxs("div",{children:[e&&p.jsx(fn,{children:e}),n&&p.jsx(pn,{children:n})]}),t]}),p.jsx(hn,{children:s}),o&&p.jsx(mn,{children:o})]});/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function Y(e,n){return typeof e=="function"?e(n):e}function k(e,n){return t=>{n.setState(o=>({...o,[e]:Y(t,o[e])}))}}function ve(e){return e instanceof Function}function Sn(e){return Array.isArray(e)&&e.every(n=>typeof n=="number")}function Cn(e,n){const t=[],o=r=>{r.forEach(i=>{t.push(i);const s=n(i);s!=null&&s.length&&o(s)})};return o(e),t}function $(e,n,t){let o=[],r;return i=>{let s;t.key&&t.debug&&(s=Date.now());const l=e(i);if(!(l.length!==o.length||l.some((g,c)=>o[c]!==g)))return r;o=l;let d;if(t.key&&t.debug&&(d=Date.now()),r=n(...l),t==null||t.onChange==null||t.onChange(r),t.key&&t.debug&&t!=null&&t.debug()){const g=Math.round((Date.now()-s)*100)/100,c=Math.round((Date.now()-d)*100)/100,f=c/16,u=(h,S)=>{for(h=String(h);h.length<S;)h=" "+h;return h};console.info(`%c⏱ ${u(c,5)} /${u(g,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*f,120))}deg 100% 31%);`,t==null?void 0:t.key)}return r}}function _(e,n,t,o){return{debug:()=>{var r;return(r=e==null?void 0:e.debugAll)!=null?r:e[n]},key:!1,onChange:o}}function vn(e,n,t,o){const r=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${n.id}_${t.id}`,row:n,column:t,getValue:()=>n.getValue(o),renderValue:r,getContext:$(()=>[e,t,n,i],(s,l,a,d)=>({table:s,column:l,row:a,cell:d,getValue:d.getValue,renderValue:d.renderValue}),_(e.options,"debugCells"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,t,n,e)},{}),i}function wn(e,n,t,o){var r,i;const l={...e._getDefaultColumnDef(),...n},a=l.accessorKey;let d=(r=(i=l.id)!=null?i:a?typeof String.prototype.replaceAll=="function"?a.replaceAll(".","_"):a.replace(/\./g,"_"):void 0)!=null?r:typeof l.header=="string"?l.header:void 0,g;if(l.accessorFn?g=l.accessorFn:a&&(a.includes(".")?g=f=>{let u=f;for(const S of a.split(".")){var h;u=(h=u)==null?void 0:h[S]}return u}:g=f=>f[l.accessorKey]),!d)throw new Error;let c={id:`${String(d)}`,accessorFn:g,parent:o,depth:t,columnDef:l,columns:[],getFlatColumns:$(()=>[!0],()=>{var f;return[c,...(f=c.columns)==null?void 0:f.flatMap(u=>u.getFlatColumns())]},_(e.options,"debugColumns")),getLeafColumns:$(()=>[e._getOrderColumnsFn()],f=>{var u;if((u=c.columns)!=null&&u.length){let h=c.columns.flatMap(S=>S.getLeafColumns());return f(h)}return[c]},_(e.options,"debugColumns"))};for(const f of e._features)f.createColumn==null||f.createColumn(c,e);return c}const j="debugHeaders";function it(e,n,t){var o;let i={id:(o=t.id)!=null?o:n.id,column:n,index:t.index,isPlaceholder:!!t.isPlaceholder,placeholderId:t.placeholderId,depth:t.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],l=a=>{a.subHeaders&&a.subHeaders.length&&a.subHeaders.map(l),s.push(a)};return l(i),s},getContext:()=>({table:e,header:i,column:n})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const xn={createTable:e=>{e.getHeaderGroups=$(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o,r)=>{var i,s;const l=(i=o==null?void 0:o.map(c=>t.find(f=>f.id===c)).filter(Boolean))!=null?i:[],a=(s=r==null?void 0:r.map(c=>t.find(f=>f.id===c)).filter(Boolean))!=null?s:[],d=t.filter(c=>!(o!=null&&o.includes(c.id))&&!(r!=null&&r.includes(c.id)));return me(n,[...l,...d,...a],e)},_(e.options,j)),e.getCenterHeaderGroups=$(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o,r)=>(t=t.filter(i=>!(o!=null&&o.includes(i.id))&&!(r!=null&&r.includes(i.id))),me(n,t,e,"center")),_(e.options,j)),e.getLeftHeaderGroups=$(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(n,t,o)=>{var r;const i=(r=o==null?void 0:o.map(s=>t.find(l=>l.id===s)).filter(Boolean))!=null?r:[];return me(n,i,e,"left")},_(e.options,j)),e.getRightHeaderGroups=$(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(n,t,o)=>{var r;const i=(r=o==null?void 0:o.map(s=>t.find(l=>l.id===s)).filter(Boolean))!=null?r:[];return me(n,i,e,"right")},_(e.options,j)),e.getFooterGroups=$(()=>[e.getHeaderGroups()],n=>[...n].reverse(),_(e.options,j)),e.getLeftFooterGroups=$(()=>[e.getLeftHeaderGroups()],n=>[...n].reverse(),_(e.options,j)),e.getCenterFooterGroups=$(()=>[e.getCenterHeaderGroups()],n=>[...n].reverse(),_(e.options,j)),e.getRightFooterGroups=$(()=>[e.getRightHeaderGroups()],n=>[...n].reverse(),_(e.options,j)),e.getFlatHeaders=$(()=>[e.getHeaderGroups()],n=>n.map(t=>t.headers).flat(),_(e.options,j)),e.getLeftFlatHeaders=$(()=>[e.getLeftHeaderGroups()],n=>n.map(t=>t.headers).flat(),_(e.options,j)),e.getCenterFlatHeaders=$(()=>[e.getCenterHeaderGroups()],n=>n.map(t=>t.headers).flat(),_(e.options,j)),e.getRightFlatHeaders=$(()=>[e.getRightHeaderGroups()],n=>n.map(t=>t.headers).flat(),_(e.options,j)),e.getCenterLeafHeaders=$(()=>[e.getCenterFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),_(e.options,j)),e.getLeftLeafHeaders=$(()=>[e.getLeftFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),_(e.options,j)),e.getRightLeafHeaders=$(()=>[e.getRightFlatHeaders()],n=>n.filter(t=>{var o;return!((o=t.subHeaders)!=null&&o.length)}),_(e.options,j)),e.getLeafHeaders=$(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(n,t,o)=>{var r,i,s,l,a,d;return[...(r=(i=n[0])==null?void 0:i.headers)!=null?r:[],...(s=(l=t[0])==null?void 0:l.headers)!=null?s:[],...(a=(d=o[0])==null?void 0:d.headers)!=null?a:[]].map(g=>g.getLeafHeaders()).flat()},_(e.options,j))}};function me(e,n,t,o){var r,i;let s=0;const l=function(f,u){u===void 0&&(u=1),s=Math.max(s,u),f.filter(h=>h.getIsVisible()).forEach(h=>{var S;(S=h.columns)!=null&&S.length&&l(h.columns,u+1)},0)};l(e);let a=[];const d=(f,u)=>{const h={depth:u,id:[o,`${u}`].filter(Boolean).join("_"),headers:[]},S=[];f.forEach(w=>{const C=[...S].reverse()[0],v=w.column.depth===h.depth;let x,P=!1;if(v&&w.column.parent?x=w.column.parent:(x=w.column,P=!0),C&&(C==null?void 0:C.column)===x)C.subHeaders.push(w);else{const V=it(t,x,{id:[o,u,x.id,w==null?void 0:w.id].filter(Boolean).join("_"),isPlaceholder:P,placeholderId:P?`${S.filter(b=>b.column===x).length}`:void 0,depth:u,index:S.length});V.subHeaders.push(w),S.push(V)}h.headers.push(w),w.headerGroup=h}),a.push(h),u>0&&d(S,u-1)},g=n.map((f,u)=>it(t,f,{depth:s,index:u}));d(g,s-1),a.reverse();const c=f=>f.filter(h=>h.column.getIsVisible()).map(h=>{let S=0,w=0,C=[0];h.subHeaders&&h.subHeaders.length?(C=[],c(h.subHeaders).forEach(x=>{let{colSpan:P,rowSpan:V}=x;S+=P,C.push(V)})):S=1;const v=Math.min(...C);return w=w+v,h.colSpan=S,h.rowSpan=w,{colSpan:S,rowSpan:w}});return c((r=(i=a[0])==null?void 0:i.headers)!=null?r:[]),a}const Rn=(e,n,t,o,r,i,s)=>{let l={id:n,index:o,original:t,depth:r,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:a=>{if(l._valuesCache.hasOwnProperty(a))return l._valuesCache[a];const d=e.getColumn(a);if(d!=null&&d.accessorFn)return l._valuesCache[a]=d.accessorFn(l.original,o),l._valuesCache[a]},getUniqueValues:a=>{if(l._uniqueValuesCache.hasOwnProperty(a))return l._uniqueValuesCache[a];const d=e.getColumn(a);if(d!=null&&d.accessorFn)return d.columnDef.getUniqueValues?(l._uniqueValuesCache[a]=d.columnDef.getUniqueValues(l.original,o),l._uniqueValuesCache[a]):(l._uniqueValuesCache[a]=[l.getValue(a)],l._uniqueValuesCache[a])},renderValue:a=>{var d;return(d=l.getValue(a))!=null?d:e.options.renderFallbackValue},subRows:[],getLeafRows:()=>Cn(l.subRows,a=>a.subRows),getParentRow:()=>l.parentId?e.getRow(l.parentId,!0):void 0,getParentRows:()=>{let a=[],d=l;for(;;){const g=d.getParentRow();if(!g)break;a.push(g),d=g}return a.reverse()},getAllCells:$(()=>[e.getAllLeafColumns()],a=>a.map(d=>vn(e,l,d,d.id)),_(e.options,"debugRows")),_getAllCellsByColumnId:$(()=>[l.getAllCells()],a=>a.reduce((d,g)=>(d[g.column.id]=g,d),{}),_(e.options,"debugRows"))};for(let a=0;a<e._features.length;a++){const d=e._features[a];d==null||d.createRow==null||d.createRow(l,e)}return l},$n={createColumn:(e,n)=>{e._getFacetedRowModel=n.options.getFacetedRowModel&&n.options.getFacetedRowModel(n,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():n.getPreFilteredRowModel(),e._getFacetedUniqueValues=n.options.getFacetedUniqueValues&&n.options.getFacetedUniqueValues(n,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=n.options.getFacetedMinMaxValues&&n.options.getFacetedMinMaxValues(n,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},ht=(e,n,t)=>{var o,r;const i=t==null||(o=t.toString())==null?void 0:o.toLowerCase();return!!(!((r=e.getValue(n))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(i))};ht.autoRemove=e=>W(e);const mt=(e,n,t)=>{var o;return!!(!((o=e.getValue(n))==null||(o=o.toString())==null)&&o.includes(t))};mt.autoRemove=e=>W(e);const St=(e,n,t)=>{var o;return((o=e.getValue(n))==null||(o=o.toString())==null?void 0:o.toLowerCase())===(t==null?void 0:t.toLowerCase())};St.autoRemove=e=>W(e);const Ct=(e,n,t)=>{var o;return(o=e.getValue(n))==null?void 0:o.includes(t)};Ct.autoRemove=e=>W(e);const vt=(e,n,t)=>!t.some(o=>{var r;return!((r=e.getValue(n))!=null&&r.includes(o))});vt.autoRemove=e=>W(e)||!(e!=null&&e.length);const wt=(e,n,t)=>t.some(o=>{var r;return(r=e.getValue(n))==null?void 0:r.includes(o)});wt.autoRemove=e=>W(e)||!(e!=null&&e.length);const xt=(e,n,t)=>e.getValue(n)===t;xt.autoRemove=e=>W(e);const Rt=(e,n,t)=>e.getValue(n)==t;Rt.autoRemove=e=>W(e);const qe=(e,n,t)=>{let[o,r]=t;const i=e.getValue(n);return i>=o&&i<=r};qe.resolveFilterValue=e=>{let[n,t]=e,o=typeof n!="number"?parseFloat(n):n,r=typeof t!="number"?parseFloat(t):t,i=n===null||Number.isNaN(o)?-1/0:o,s=t===null||Number.isNaN(r)?1/0:r;if(i>s){const l=i;i=s,s=l}return[i,s]};qe.autoRemove=e=>W(e)||W(e[0])&&W(e[1]);const Q={includesString:ht,includesStringSensitive:mt,equalsString:St,arrIncludes:Ct,arrIncludesAll:vt,arrIncludesSome:wt,equals:xt,weakEquals:Rt,inNumberRange:qe};function W(e){return e==null||e===""}const _n={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:k("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,n)=>{e.getAutoFilterFn=()=>{const t=n.getCoreRowModel().flatRows[0],o=t==null?void 0:t.getValue(e.id);return typeof o=="string"?Q.includesString:typeof o=="number"?Q.inNumberRange:typeof o=="boolean"||o!==null&&typeof o=="object"?Q.equals:Array.isArray(o)?Q.arrIncludes:Q.weakEquals},e.getFilterFn=()=>{var t,o;return ve(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(t=(o=n.options.filterFns)==null?void 0:o[e.columnDef.filterFn])!=null?t:Q[e.columnDef.filterFn]},e.getCanFilter=()=>{var t,o,r;return((t=e.columnDef.enableColumnFilter)!=null?t:!0)&&((o=n.options.enableColumnFilters)!=null?o:!0)&&((r=n.options.enableFilters)!=null?r:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var t;return(t=n.getState().columnFilters)==null||(t=t.find(o=>o.id===e.id))==null?void 0:t.value},e.getFilterIndex=()=>{var t,o;return(t=(o=n.getState().columnFilters)==null?void 0:o.findIndex(r=>r.id===e.id))!=null?t:-1},e.setFilterValue=t=>{n.setColumnFilters(o=>{const r=e.getFilterFn(),i=o==null?void 0:o.find(g=>g.id===e.id),s=Y(t,i?i.value:void 0);if(st(r,s,e)){var l;return(l=o==null?void 0:o.filter(g=>g.id!==e.id))!=null?l:[]}const a={id:e.id,value:s};if(i){var d;return(d=o==null?void 0:o.map(g=>g.id===e.id?a:g))!=null?d:[]}return o!=null&&o.length?[...o,a]:[a]})}},createRow:(e,n)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=n=>{const t=e.getAllLeafColumns(),o=r=>{var i;return(i=Y(n,r))==null?void 0:i.filter(s=>{const l=t.find(a=>a.id===s.id);if(l){const a=l.getFilterFn();if(st(a,s.value,l))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(o)},e.resetColumnFilters=n=>{var t,o;e.setColumnFilters(n?[]:(t=(o=e.initialState)==null?void 0:o.columnFilters)!=null?t:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function st(e,n,t){return(e&&e.autoRemove?e.autoRemove(n,t):!1)||typeof n>"u"||typeof n=="string"&&!n}const yn=(e,n,t)=>t.reduce((o,r)=>{const i=r.getValue(e);return o+(typeof i=="number"?i:0)},0),Fn=(e,n,t)=>{let o;return t.forEach(r=>{const i=r.getValue(e);i!=null&&(o>i||o===void 0&&i>=i)&&(o=i)}),o},Mn=(e,n,t)=>{let o;return t.forEach(r=>{const i=r.getValue(e);i!=null&&(o<i||o===void 0&&i>=i)&&(o=i)}),o},Pn=(e,n,t)=>{let o,r;return t.forEach(i=>{const s=i.getValue(e);s!=null&&(o===void 0?s>=s&&(o=r=s):(o>s&&(o=s),r<s&&(r=s)))}),[o,r]},In=(e,n)=>{let t=0,o=0;if(n.forEach(r=>{let i=r.getValue(e);i!=null&&(i=+i)>=i&&(++t,o+=i)}),t)return o/t},Vn=(e,n)=>{if(!n.length)return;const t=n.map(i=>i.getValue(e));if(!Sn(t))return;if(t.length===1)return t[0];const o=Math.floor(t.length/2),r=t.sort((i,s)=>i-s);return t.length%2!==0?r[o]:(r[o-1]+r[o])/2},En=(e,n)=>Array.from(new Set(n.map(t=>t.getValue(e))).values()),zn=(e,n)=>new Set(n.map(t=>t.getValue(e))).size,bn=(e,n)=>n.length,xe={sum:yn,min:Fn,max:Mn,extent:Pn,mean:In,median:Vn,unique:En,uniqueCount:zn,count:bn},Dn={getDefaultColumnDef:()=>({aggregatedCell:e=>{var n,t;return(n=(t=e.getValue())==null||t.toString==null?void 0:t.toString())!=null?n:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:k("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,n)=>{e.toggleGrouping=()=>{n.setGrouping(t=>t!=null&&t.includes(e.id)?t.filter(o=>o!==e.id):[...t??[],e.id])},e.getCanGroup=()=>{var t,o;return((t=e.columnDef.enableGrouping)!=null?t:!0)&&((o=n.options.enableGrouping)!=null?o:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var t;return(t=n.getState().grouping)==null?void 0:t.includes(e.id)},e.getGroupedIndex=()=>{var t;return(t=n.getState().grouping)==null?void 0:t.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const t=e.getCanGroup();return()=>{t&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const t=n.getCoreRowModel().flatRows[0],o=t==null?void 0:t.getValue(e.id);if(typeof o=="number")return xe.sum;if(Object.prototype.toString.call(o)==="[object Date]")return xe.extent},e.getAggregationFn=()=>{var t,o;if(!e)throw new Error;return ve(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(t=(o=n.options.aggregationFns)==null?void 0:o[e.columnDef.aggregationFn])!=null?t:xe[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=n=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(n),e.resetGrouping=n=>{var t,o;e.setGrouping(n?[]:(t=(o=e.initialState)==null?void 0:o.grouping)!=null?t:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,n)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=t=>{if(e._groupingValuesCache.hasOwnProperty(t))return e._groupingValuesCache[t];const o=n.getColumn(t);return o!=null&&o.columnDef.getGroupingValue?(e._groupingValuesCache[t]=o.columnDef.getGroupingValue(e.original),e._groupingValuesCache[t]):e.getValue(t)},e._groupingValuesCache={}},createCell:(e,n,t,o)=>{e.getIsGrouped=()=>n.getIsGrouped()&&n.id===t.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&n.getIsGrouped(),e.getIsAggregated=()=>{var r;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((r=t.subRows)!=null&&r.length)}}};function Ln(e,n,t){if(!(n!=null&&n.length)||!t)return e;const o=e.filter(i=>!n.includes(i.id));return t==="remove"?o:[...n.map(i=>e.find(s=>s.id===i)).filter(Boolean),...o]}const Hn={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:k("columnOrder",e)}),createColumn:(e,n)=>{e.getIndex=$(t=>[ce(n,t)],t=>t.findIndex(o=>o.id===e.id),_(n.options,"debugColumns")),e.getIsFirstColumn=t=>{var o;return((o=ce(n,t)[0])==null?void 0:o.id)===e.id},e.getIsLastColumn=t=>{var o;const r=ce(n,t);return((o=r[r.length-1])==null?void 0:o.id)===e.id}},createTable:e=>{e.setColumnOrder=n=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(n),e.resetColumnOrder=n=>{var t;e.setColumnOrder(n?[]:(t=e.initialState.columnOrder)!=null?t:[])},e._getOrderColumnsFn=$(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(n,t,o)=>r=>{let i=[];if(!(n!=null&&n.length))i=r;else{const s=[...n],l=[...r];for(;l.length&&s.length;){const a=s.shift(),d=l.findIndex(g=>g.id===a);d>-1&&i.push(l.splice(d,1)[0])}i=[...i,...l]}return Ln(i,t,o)},_(e.options,"debugTable"))}},Re=()=>({left:[],right:[]}),jn={getInitialState:e=>({columnPinning:Re(),...e}),getDefaultOptions:e=>({onColumnPinningChange:k("columnPinning",e)}),createColumn:(e,n)=>{e.pin=t=>{const o=e.getLeafColumns().map(r=>r.id).filter(Boolean);n.setColumnPinning(r=>{var i,s;if(t==="right"){var l,a;return{left:((l=r==null?void 0:r.left)!=null?l:[]).filter(c=>!(o!=null&&o.includes(c))),right:[...((a=r==null?void 0:r.right)!=null?a:[]).filter(c=>!(o!=null&&o.includes(c))),...o]}}if(t==="left"){var d,g;return{left:[...((d=r==null?void 0:r.left)!=null?d:[]).filter(c=>!(o!=null&&o.includes(c))),...o],right:((g=r==null?void 0:r.right)!=null?g:[]).filter(c=>!(o!=null&&o.includes(c)))}}return{left:((i=r==null?void 0:r.left)!=null?i:[]).filter(c=>!(o!=null&&o.includes(c))),right:((s=r==null?void 0:r.right)!=null?s:[]).filter(c=>!(o!=null&&o.includes(c)))}})},e.getCanPin=()=>e.getLeafColumns().some(o=>{var r,i,s;return((r=o.columnDef.enablePinning)!=null?r:!0)&&((i=(s=n.options.enableColumnPinning)!=null?s:n.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const t=e.getLeafColumns().map(l=>l.id),{left:o,right:r}=n.getState().columnPinning,i=t.some(l=>o==null?void 0:o.includes(l)),s=t.some(l=>r==null?void 0:r.includes(l));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var t,o;const r=e.getIsPinned();return r?(t=(o=n.getState().columnPinning)==null||(o=o[r])==null?void 0:o.indexOf(e.id))!=null?t:-1:0}},createRow:(e,n)=>{e.getCenterVisibleCells=$(()=>[e._getAllVisibleCells(),n.getState().columnPinning.left,n.getState().columnPinning.right],(t,o,r)=>{const i=[...o??[],...r??[]];return t.filter(s=>!i.includes(s.column.id))},_(n.options,"debugRows")),e.getLeftVisibleCells=$(()=>[e._getAllVisibleCells(),n.getState().columnPinning.left],(t,o)=>(o??[]).map(i=>t.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),_(n.options,"debugRows")),e.getRightVisibleCells=$(()=>[e._getAllVisibleCells(),n.getState().columnPinning.right],(t,o)=>(o??[]).map(i=>t.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),_(n.options,"debugRows"))},createTable:e=>{e.setColumnPinning=n=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(n),e.resetColumnPinning=n=>{var t,o;return e.setColumnPinning(n?Re():(t=(o=e.initialState)==null?void 0:o.columnPinning)!=null?t:Re())},e.getIsSomeColumnsPinned=n=>{var t;const o=e.getState().columnPinning;if(!n){var r,i;return!!((r=o.left)!=null&&r.length||(i=o.right)!=null&&i.length)}return!!((t=o[n])!=null&&t.length)},e.getLeftLeafColumns=$(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(n,t)=>(t??[]).map(o=>n.find(r=>r.id===o)).filter(Boolean),_(e.options,"debugColumns")),e.getRightLeafColumns=$(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(n,t)=>(t??[]).map(o=>n.find(r=>r.id===o)).filter(Boolean),_(e.options,"debugColumns")),e.getCenterLeafColumns=$(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(n,t,o)=>{const r=[...t??[],...o??[]];return n.filter(i=>!r.includes(i.id))},_(e.options,"debugColumns"))}};function On(e){return e||(typeof document<"u"?document:null)}const Se={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},$e=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),An={getDefaultColumnDef:()=>Se,getInitialState:e=>({columnSizing:{},columnSizingInfo:$e(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:k("columnSizing",e),onColumnSizingInfoChange:k("columnSizingInfo",e)}),createColumn:(e,n)=>{e.getSize=()=>{var t,o,r;const i=n.getState().columnSizing[e.id];return Math.min(Math.max((t=e.columnDef.minSize)!=null?t:Se.minSize,(o=i??e.columnDef.size)!=null?o:Se.size),(r=e.columnDef.maxSize)!=null?r:Se.maxSize)},e.getStart=$(t=>[t,ce(n,t),n.getState().columnSizing],(t,o)=>o.slice(0,e.getIndex(t)).reduce((r,i)=>r+i.getSize(),0),_(n.options,"debugColumns")),e.getAfter=$(t=>[t,ce(n,t),n.getState().columnSizing],(t,o)=>o.slice(e.getIndex(t)+1).reduce((r,i)=>r+i.getSize(),0),_(n.options,"debugColumns")),e.resetSize=()=>{n.setColumnSizing(t=>{let{[e.id]:o,...r}=t;return r})},e.getCanResize=()=>{var t,o;return((t=e.columnDef.enableResizing)!=null?t:!0)&&((o=n.options.enableColumnResizing)!=null?o:!0)},e.getIsResizing=()=>n.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,n)=>{e.getSize=()=>{let t=0;const o=r=>{if(r.subHeaders.length)r.subHeaders.forEach(o);else{var i;t+=(i=r.column.getSize())!=null?i:0}};return o(e),t},e.getStart=()=>{if(e.index>0){const t=e.headerGroup.headers[e.index-1];return t.getStart()+t.getSize()}return 0},e.getResizeHandler=t=>{const o=n.getColumn(e.column.id),r=o==null?void 0:o.getCanResize();return i=>{if(!o||!r||(i.persist==null||i.persist(),_e(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),l=e?e.getLeafHeaders().map(C=>[C.column.id,C.column.getSize()]):[[o.id,o.getSize()]],a=_e(i)?Math.round(i.touches[0].clientX):i.clientX,d={},g=(C,v)=>{typeof v=="number"&&(n.setColumnSizingInfo(x=>{var P,V;const b=n.options.columnResizeDirection==="rtl"?-1:1,B=(v-((P=x==null?void 0:x.startOffset)!=null?P:0))*b,L=Math.max(B/((V=x==null?void 0:x.startSize)!=null?V:0),-.999999);return x.columnSizingStart.forEach(X=>{let[H,q]=X;d[H]=Math.round(Math.max(q+q*L,0)*100)/100}),{...x,deltaOffset:B,deltaPercentage:L}}),(n.options.columnResizeMode==="onChange"||C==="end")&&n.setColumnSizing(x=>({...x,...d})))},c=C=>g("move",C),f=C=>{g("end",C),n.setColumnSizingInfo(v=>({...v,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},u=On(t),h={moveHandler:C=>c(C.clientX),upHandler:C=>{u==null||u.removeEventListener("mousemove",h.moveHandler),u==null||u.removeEventListener("mouseup",h.upHandler),f(C.clientX)}},S={moveHandler:C=>(C.cancelable&&(C.preventDefault(),C.stopPropagation()),c(C.touches[0].clientX),!1),upHandler:C=>{var v;u==null||u.removeEventListener("touchmove",S.moveHandler),u==null||u.removeEventListener("touchend",S.upHandler),C.cancelable&&(C.preventDefault(),C.stopPropagation()),f((v=C.touches[0])==null?void 0:v.clientX)}},w=Gn()?{passive:!1}:!1;_e(i)?(u==null||u.addEventListener("touchmove",S.moveHandler,w),u==null||u.addEventListener("touchend",S.upHandler,w)):(u==null||u.addEventListener("mousemove",h.moveHandler,w),u==null||u.addEventListener("mouseup",h.upHandler,w)),n.setColumnSizingInfo(C=>({...C,startOffset:a,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:l,isResizingColumn:o.id}))}}},createTable:e=>{e.setColumnSizing=n=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(n),e.setColumnSizingInfo=n=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(n),e.resetColumnSizing=n=>{var t;e.setColumnSizing(n?{}:(t=e.initialState.columnSizing)!=null?t:{})},e.resetHeaderSizeInfo=n=>{var t;e.setColumnSizingInfo(n?$e():(t=e.initialState.columnSizingInfo)!=null?t:$e())},e.getTotalSize=()=>{var n,t;return(n=(t=e.getHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getLeftTotalSize=()=>{var n,t;return(n=(t=e.getLeftHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getCenterTotalSize=()=>{var n,t;return(n=(t=e.getCenterHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0},e.getRightTotalSize=()=>{var n,t;return(n=(t=e.getRightHeaderGroups()[0])==null?void 0:t.headers.reduce((o,r)=>o+r.getSize(),0))!=null?n:0}}};let Ce=null;function Gn(){if(typeof Ce=="boolean")return Ce;let e=!1;try{const n={get passive(){return e=!0,!1}},t=()=>{};window.addEventListener("test",t,n),window.removeEventListener("test",t)}catch{e=!1}return Ce=e,Ce}function _e(e){return e.type==="touchstart"}const kn={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:k("columnVisibility",e)}),createColumn:(e,n)=>{e.toggleVisibility=t=>{e.getCanHide()&&n.setColumnVisibility(o=>({...o,[e.id]:t??!e.getIsVisible()}))},e.getIsVisible=()=>{var t,o;const r=e.columns;return(t=r.length?r.some(i=>i.getIsVisible()):(o=n.getState().columnVisibility)==null?void 0:o[e.id])!=null?t:!0},e.getCanHide=()=>{var t,o;return((t=e.columnDef.enableHiding)!=null?t:!0)&&((o=n.options.enableHiding)!=null?o:!0)},e.getToggleVisibilityHandler=()=>t=>{e.toggleVisibility==null||e.toggleVisibility(t.target.checked)}},createRow:(e,n)=>{e._getAllVisibleCells=$(()=>[e.getAllCells(),n.getState().columnVisibility],t=>t.filter(o=>o.column.getIsVisible()),_(n.options,"debugRows")),e.getVisibleCells=$(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(t,o,r)=>[...t,...o,...r],_(n.options,"debugRows"))},createTable:e=>{const n=(t,o)=>$(()=>[o(),o().filter(r=>r.getIsVisible()).map(r=>r.id).join("_")],r=>r.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),_(e.options,"debugColumns"));e.getVisibleFlatColumns=n("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=n("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=n("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=n("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=n("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=t=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(t),e.resetColumnVisibility=t=>{var o;e.setColumnVisibility(t?{}:(o=e.initialState.columnVisibility)!=null?o:{})},e.toggleAllColumnsVisible=t=>{var o;t=(o=t)!=null?o:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((r,i)=>({...r,[i.id]:t||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(t=>!(t.getIsVisible!=null&&t.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(t=>t.getIsVisible==null?void 0:t.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>t=>{var o;e.toggleAllColumnsVisible((o=t.target)==null?void 0:o.checked)}}};function ce(e,n){return n?n==="center"?e.getCenterVisibleLeafColumns():n==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const Tn={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},Bn={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:k("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:n=>{var t;const o=(t=e.getCoreRowModel().flatRows[0])==null||(t=t._getAllCellsByColumnId()[n.id])==null?void 0:t.getValue();return typeof o=="string"||typeof o=="number"}}),createColumn:(e,n)=>{e.getCanGlobalFilter=()=>{var t,o,r,i;return((t=e.columnDef.enableGlobalFilter)!=null?t:!0)&&((o=n.options.enableGlobalFilter)!=null?o:!0)&&((r=n.options.enableFilters)!=null?r:!0)&&((i=n.options.getColumnCanGlobalFilter==null?void 0:n.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>Q.includesString,e.getGlobalFilterFn=()=>{var n,t;const{globalFilterFn:o}=e.options;return ve(o)?o:o==="auto"?e.getGlobalAutoFilterFn():(n=(t=e.options.filterFns)==null?void 0:t[o])!=null?n:Q[o]},e.setGlobalFilter=n=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(n)},e.resetGlobalFilter=n=>{e.setGlobalFilter(n?void 0:e.initialState.globalFilter)}}},Nn={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:k("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let n=!1,t=!1;e._autoResetExpanded=()=>{var o,r;if(!n){e._queue(()=>{n=!0});return}if((o=(r=e.options.autoResetAll)!=null?r:e.options.autoResetExpanded)!=null?o:!e.options.manualExpanding){if(t)return;t=!0,e._queue(()=>{e.resetExpanded(),t=!1})}},e.setExpanded=o=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(o),e.toggleAllRowsExpanded=o=>{o??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=o=>{var r,i;e.setExpanded(o?{}:(r=(i=e.initialState)==null?void 0:i.expanded)!=null?r:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(o=>o.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>o=>{o.persist==null||o.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const o=e.getState().expanded;return o===!0||Object.values(o).some(Boolean)},e.getIsAllRowsExpanded=()=>{const o=e.getState().expanded;return typeof o=="boolean"?o===!0:!(!Object.keys(o).length||e.getRowModel().flatRows.some(r=>!r.getIsExpanded()))},e.getExpandedDepth=()=>{let o=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");o=Math.max(o,s.length)}),o},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,n)=>{e.toggleExpanded=t=>{n.setExpanded(o=>{var r;const i=o===!0?!0:!!(o!=null&&o[e.id]);let s={};if(o===!0?Object.keys(n.getRowModel().rowsById).forEach(l=>{s[l]=!0}):s=o,t=(r=t)!=null?r:!i,!i&&t)return{...s,[e.id]:!0};if(i&&!t){const{[e.id]:l,...a}=s;return a}return o})},e.getIsExpanded=()=>{var t;const o=n.getState().expanded;return!!((t=n.options.getIsRowExpanded==null?void 0:n.options.getIsRowExpanded(e))!=null?t:o===!0||o!=null&&o[e.id])},e.getCanExpand=()=>{var t,o,r;return(t=n.options.getRowCanExpand==null?void 0:n.options.getRowCanExpand(e))!=null?t:((o=n.options.enableExpanding)!=null?o:!0)&&!!((r=e.subRows)!=null&&r.length)},e.getIsAllParentsExpanded=()=>{let t=!0,o=e;for(;t&&o.parentId;)o=n.getRow(o.parentId,!0),t=o.getIsExpanded();return t},e.getToggleExpandedHandler=()=>{const t=e.getCanExpand();return()=>{t&&e.toggleExpanded()}}}},Ge=0,ke=10,ye=()=>({pageIndex:Ge,pageSize:ke}),Un={getInitialState:e=>({...e,pagination:{...ye(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:k("pagination",e)}),createTable:e=>{let n=!1,t=!1;e._autoResetPageIndex=()=>{var o,r;if(!n){e._queue(()=>{n=!0});return}if((o=(r=e.options.autoResetAll)!=null?r:e.options.autoResetPageIndex)!=null?o:!e.options.manualPagination){if(t)return;t=!0,e._queue(()=>{e.resetPageIndex(),t=!1})}},e.setPagination=o=>{const r=i=>Y(o,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(r)},e.resetPagination=o=>{var r;e.setPagination(o?ye():(r=e.initialState.pagination)!=null?r:ye())},e.setPageIndex=o=>{e.setPagination(r=>{let i=Y(o,r.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...r,pageIndex:i}})},e.resetPageIndex=o=>{var r,i;e.setPageIndex(o?Ge:(r=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?r:Ge)},e.resetPageSize=o=>{var r,i;e.setPageSize(o?ke:(r=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?r:ke)},e.setPageSize=o=>{e.setPagination(r=>{const i=Math.max(1,Y(o,r.pageSize)),s=r.pageSize*r.pageIndex,l=Math.floor(s/i);return{...r,pageIndex:l,pageSize:i}})},e.setPageCount=o=>e.setPagination(r=>{var i;let s=Y(o,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...r,pageCount:s}}),e.getPageOptions=$(()=>[e.getPageCount()],o=>{let r=[];return o&&o>0&&(r=[...new Array(o)].fill(null).map((i,s)=>s)),r},_(e.options,"debugTable")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:o}=e.getState().pagination,r=e.getPageCount();return r===-1?!0:r===0?!1:o<r-1},e.previousPage=()=>e.setPageIndex(o=>o-1),e.nextPage=()=>e.setPageIndex(o=>o+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var o;return(o=e.options.pageCount)!=null?o:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var o;return(o=e.options.rowCount)!=null?o:e.getPrePaginationRowModel().rows.length}}},Fe=()=>({top:[],bottom:[]}),Wn={getInitialState:e=>({rowPinning:Fe(),...e}),getDefaultOptions:e=>({onRowPinningChange:k("rowPinning",e)}),createRow:(e,n)=>{e.pin=(t,o,r)=>{const i=o?e.getLeafRows().map(a=>{let{id:d}=a;return d}):[],s=r?e.getParentRows().map(a=>{let{id:d}=a;return d}):[],l=new Set([...s,e.id,...i]);n.setRowPinning(a=>{var d,g;if(t==="bottom"){var c,f;return{top:((c=a==null?void 0:a.top)!=null?c:[]).filter(S=>!(l!=null&&l.has(S))),bottom:[...((f=a==null?void 0:a.bottom)!=null?f:[]).filter(S=>!(l!=null&&l.has(S))),...Array.from(l)]}}if(t==="top"){var u,h;return{top:[...((u=a==null?void 0:a.top)!=null?u:[]).filter(S=>!(l!=null&&l.has(S))),...Array.from(l)],bottom:((h=a==null?void 0:a.bottom)!=null?h:[]).filter(S=>!(l!=null&&l.has(S)))}}return{top:((d=a==null?void 0:a.top)!=null?d:[]).filter(S=>!(l!=null&&l.has(S))),bottom:((g=a==null?void 0:a.bottom)!=null?g:[]).filter(S=>!(l!=null&&l.has(S)))}})},e.getCanPin=()=>{var t;const{enableRowPinning:o,enablePinning:r}=n.options;return typeof o=="function"?o(e):(t=o??r)!=null?t:!0},e.getIsPinned=()=>{const t=[e.id],{top:o,bottom:r}=n.getState().rowPinning,i=t.some(l=>o==null?void 0:o.includes(l)),s=t.some(l=>r==null?void 0:r.includes(l));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var t,o;const r=e.getIsPinned();if(!r)return-1;const i=(t=r==="top"?n.getTopRows():n.getBottomRows())==null?void 0:t.map(s=>{let{id:l}=s;return l});return(o=i==null?void 0:i.indexOf(e.id))!=null?o:-1}},createTable:e=>{e.setRowPinning=n=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(n),e.resetRowPinning=n=>{var t,o;return e.setRowPinning(n?Fe():(t=(o=e.initialState)==null?void 0:o.rowPinning)!=null?t:Fe())},e.getIsSomeRowsPinned=n=>{var t;const o=e.getState().rowPinning;if(!n){var r,i;return!!((r=o.top)!=null&&r.length||(i=o.bottom)!=null&&i.length)}return!!((t=o[n])!=null&&t.length)},e._getPinnedRows=(n,t,o)=>{var r;return((r=e.options.keepPinnedRows)==null||r?(t??[]).map(s=>{const l=e.getRow(s,!0);return l.getIsAllParentsExpanded()?l:null}):(t??[]).map(s=>n.find(l=>l.id===s))).filter(Boolean).map(s=>({...s,position:o}))},e.getTopRows=$(()=>[e.getRowModel().rows,e.getState().rowPinning.top],(n,t)=>e._getPinnedRows(n,t,"top"),_(e.options,"debugRows")),e.getBottomRows=$(()=>[e.getRowModel().rows,e.getState().rowPinning.bottom],(n,t)=>e._getPinnedRows(n,t,"bottom"),_(e.options,"debugRows")),e.getCenterRows=$(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(n,t,o)=>{const r=new Set([...t??[],...o??[]]);return n.filter(i=>!r.has(i.id))},_(e.options,"debugRows"))}},qn={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:k("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=n=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(n),e.resetRowSelection=n=>{var t;return e.setRowSelection(n?{}:(t=e.initialState.rowSelection)!=null?t:{})},e.toggleAllRowsSelected=n=>{e.setRowSelection(t=>{n=typeof n<"u"?n:!e.getIsAllRowsSelected();const o={...t},r=e.getPreGroupedRowModel().flatRows;return n?r.forEach(i=>{i.getCanSelect()&&(o[i.id]=!0)}):r.forEach(i=>{delete o[i.id]}),o})},e.toggleAllPageRowsSelected=n=>e.setRowSelection(t=>{const o=typeof n<"u"?n:!e.getIsAllPageRowsSelected(),r={...t};return e.getRowModel().rows.forEach(i=>{Te(r,i.id,o,!0,e)}),r}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=$(()=>[e.getState().rowSelection,e.getCoreRowModel()],(n,t)=>Object.keys(n).length?Me(e,t):{rows:[],flatRows:[],rowsById:{}},_(e.options,"debugTable")),e.getFilteredSelectedRowModel=$(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(n,t)=>Object.keys(n).length?Me(e,t):{rows:[],flatRows:[],rowsById:{}},_(e.options,"debugTable")),e.getGroupedSelectedRowModel=$(()=>[e.getState().rowSelection,e.getSortedRowModel()],(n,t)=>Object.keys(n).length?Me(e,t):{rows:[],flatRows:[],rowsById:{}},_(e.options,"debugTable")),e.getIsAllRowsSelected=()=>{const n=e.getFilteredRowModel().flatRows,{rowSelection:t}=e.getState();let o=!!(n.length&&Object.keys(t).length);return o&&n.some(r=>r.getCanSelect()&&!t[r.id])&&(o=!1),o},e.getIsAllPageRowsSelected=()=>{const n=e.getPaginationRowModel().flatRows.filter(r=>r.getCanSelect()),{rowSelection:t}=e.getState();let o=!!n.length;return o&&n.some(r=>!t[r.id])&&(o=!1),o},e.getIsSomeRowsSelected=()=>{var n;const t=Object.keys((n=e.getState().rowSelection)!=null?n:{}).length;return t>0&&t<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const n=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:n.filter(t=>t.getCanSelect()).some(t=>t.getIsSelected()||t.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>n=>{e.toggleAllRowsSelected(n.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>n=>{e.toggleAllPageRowsSelected(n.target.checked)}},createRow:(e,n)=>{e.toggleSelected=(t,o)=>{const r=e.getIsSelected();n.setRowSelection(i=>{var s;if(t=typeof t<"u"?t:!r,e.getCanSelect()&&r===t)return i;const l={...i};return Te(l,e.id,t,(s=o==null?void 0:o.selectChildren)!=null?s:!0,n),l})},e.getIsSelected=()=>{const{rowSelection:t}=n.getState();return Qe(e,t)},e.getIsSomeSelected=()=>{const{rowSelection:t}=n.getState();return Be(e,t)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:t}=n.getState();return Be(e,t)==="all"},e.getCanSelect=()=>{var t;return typeof n.options.enableRowSelection=="function"?n.options.enableRowSelection(e):(t=n.options.enableRowSelection)!=null?t:!0},e.getCanSelectSubRows=()=>{var t;return typeof n.options.enableSubRowSelection=="function"?n.options.enableSubRowSelection(e):(t=n.options.enableSubRowSelection)!=null?t:!0},e.getCanMultiSelect=()=>{var t;return typeof n.options.enableMultiRowSelection=="function"?n.options.enableMultiRowSelection(e):(t=n.options.enableMultiRowSelection)!=null?t:!0},e.getToggleSelectedHandler=()=>{const t=e.getCanSelect();return o=>{var r;t&&e.toggleSelected((r=o.target)==null?void 0:r.checked)}}}},Te=(e,n,t,o,r)=>{var i;const s=r.getRow(n,!0);t?(s.getCanMultiSelect()||Object.keys(e).forEach(l=>delete e[l]),s.getCanSelect()&&(e[n]=!0)):delete e[n],o&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(l=>Te(e,l.id,t,o,r))};function Me(e,n){const t=e.getState().rowSelection,o=[],r={},i=function(s,l){return s.map(a=>{var d;const g=Qe(a,t);if(g&&(o.push(a),r[a.id]=a),(d=a.subRows)!=null&&d.length&&(a={...a,subRows:i(a.subRows)}),g)return a}).filter(Boolean)};return{rows:i(n.rows),flatRows:o,rowsById:r}}function Qe(e,n){var t;return(t=n[e.id])!=null?t:!1}function Be(e,n,t){var o;if(!((o=e.subRows)!=null&&o.length))return!1;let r=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!r)&&(s.getCanSelect()&&(Qe(s,n)?i=!0:r=!1),s.subRows&&s.subRows.length)){const l=Be(s,n);l==="all"?i=!0:(l==="some"&&(i=!0),r=!1)}}),r?"all":i?"some":!1}const Ne=/([0-9]+)/gm,Qn=(e,n,t)=>$t(ee(e.getValue(t)).toLowerCase(),ee(n.getValue(t)).toLowerCase()),Kn=(e,n,t)=>$t(ee(e.getValue(t)),ee(n.getValue(t))),Xn=(e,n,t)=>Ke(ee(e.getValue(t)).toLowerCase(),ee(n.getValue(t)).toLowerCase()),Zn=(e,n,t)=>Ke(ee(e.getValue(t)),ee(n.getValue(t))),Jn=(e,n,t)=>{const o=e.getValue(t),r=n.getValue(t);return o>r?1:o<r?-1:0},Yn=(e,n,t)=>Ke(e.getValue(t),n.getValue(t));function Ke(e,n){return e===n?0:e>n?1:-1}function ee(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function $t(e,n){const t=e.split(Ne).filter(Boolean),o=n.split(Ne).filter(Boolean);for(;t.length&&o.length;){const r=t.shift(),i=o.shift(),s=parseInt(r,10),l=parseInt(i,10),a=[s,l].sort();if(isNaN(a[0])){if(r>i)return 1;if(i>r)return-1;continue}if(isNaN(a[1]))return isNaN(s)?-1:1;if(s>l)return 1;if(l>s)return-1}return t.length-o.length}const ue={alphanumeric:Qn,alphanumericCaseSensitive:Kn,text:Xn,textCaseSensitive:Zn,datetime:Jn,basic:Yn},eo={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:k("sorting",e),isMultiSortEvent:n=>n.shiftKey}),createColumn:(e,n)=>{e.getAutoSortingFn=()=>{const t=n.getFilteredRowModel().flatRows.slice(10);let o=!1;for(const r of t){const i=r==null?void 0:r.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return ue.datetime;if(typeof i=="string"&&(o=!0,i.split(Ne).length>1))return ue.alphanumeric}return o?ue.text:ue.basic},e.getAutoSortDir=()=>{const t=n.getFilteredRowModel().flatRows[0];return typeof(t==null?void 0:t.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var t,o;if(!e)throw new Error;return ve(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(t=(o=n.options.sortingFns)==null?void 0:o[e.columnDef.sortingFn])!=null?t:ue[e.columnDef.sortingFn]},e.toggleSorting=(t,o)=>{const r=e.getNextSortingOrder(),i=typeof t<"u"&&t!==null;n.setSorting(s=>{const l=s==null?void 0:s.find(u=>u.id===e.id),a=s==null?void 0:s.findIndex(u=>u.id===e.id);let d=[],g,c=i?t:r==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&o?l?g="toggle":g="add":s!=null&&s.length&&a!==s.length-1?g="replace":l?g="toggle":g="replace",g==="toggle"&&(i||r||(g="remove")),g==="add"){var f;d=[...s,{id:e.id,desc:c}],d.splice(0,d.length-((f=n.options.maxMultiSortColCount)!=null?f:Number.MAX_SAFE_INTEGER))}else g==="toggle"?d=s.map(u=>u.id===e.id?{...u,desc:c}:u):g==="remove"?d=s.filter(u=>u.id!==e.id):d=[{id:e.id,desc:c}];return d})},e.getFirstSortDir=()=>{var t,o;return((t=(o=e.columnDef.sortDescFirst)!=null?o:n.options.sortDescFirst)!=null?t:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=t=>{var o,r;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((o=n.options.enableSortingRemoval)==null||o)&&(!(t&&(r=n.options.enableMultiRemove)!=null)||r)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var t,o;return((t=e.columnDef.enableSorting)!=null?t:!0)&&((o=n.options.enableSorting)!=null?o:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var t,o;return(t=(o=e.columnDef.enableMultiSort)!=null?o:n.options.enableMultiSort)!=null?t:!!e.accessorFn},e.getIsSorted=()=>{var t;const o=(t=n.getState().sorting)==null?void 0:t.find(r=>r.id===e.id);return o?o.desc?"desc":"asc":!1},e.getSortIndex=()=>{var t,o;return(t=(o=n.getState().sorting)==null?void 0:o.findIndex(r=>r.id===e.id))!=null?t:-1},e.clearSorting=()=>{n.setSorting(t=>t!=null&&t.length?t.filter(o=>o.id!==e.id):[])},e.getToggleSortingHandler=()=>{const t=e.getCanSort();return o=>{t&&(o.persist==null||o.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?n.options.isMultiSortEvent==null?void 0:n.options.isMultiSortEvent(o):!1))}}},createTable:e=>{e.setSorting=n=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(n),e.resetSorting=n=>{var t,o;e.setSorting(n?[]:(t=(o=e.initialState)==null?void 0:o.sorting)!=null?t:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},to=[xn,kn,Hn,jn,$n,_n,Tn,Bn,eo,Dn,Nn,Un,Wn,qn,An];function no(e){var n,t;const o=[...to,...(n=e._features)!=null?n:[]];let r={_features:o};const i=r._features.reduce((f,u)=>Object.assign(f,u.getDefaultOptions==null?void 0:u.getDefaultOptions(r)),{}),s=f=>r.options.mergeOptions?r.options.mergeOptions(i,f):{...i,...f};let a={...{},...(t=e.initialState)!=null?t:{}};r._features.forEach(f=>{var u;a=(u=f.getInitialState==null?void 0:f.getInitialState(a))!=null?u:a});const d=[];let g=!1;const c={_features:o,options:{...i,...e},initialState:a,_queue:f=>{d.push(f),g||(g=!0,Promise.resolve().then(()=>{for(;d.length;)d.shift()();g=!1}).catch(u=>setTimeout(()=>{throw u})))},reset:()=>{r.setState(r.initialState)},setOptions:f=>{const u=Y(f,r.options);r.options=s(u)},getState:()=>r.options.state,setState:f=>{r.options.onStateChange==null||r.options.onStateChange(f)},_getRowId:(f,u,h)=>{var S;return(S=r.options.getRowId==null?void 0:r.options.getRowId(f,u,h))!=null?S:`${h?[h.id,u].join("."):u}`},getCoreRowModel:()=>(r._getCoreRowModel||(r._getCoreRowModel=r.options.getCoreRowModel(r)),r._getCoreRowModel()),getRowModel:()=>r.getPaginationRowModel(),getRow:(f,u)=>{let h=(u?r.getPrePaginationRowModel():r.getRowModel()).rowsById[f];if(!h&&(h=r.getCoreRowModel().rowsById[f],!h))throw new Error;return h},_getDefaultColumnDef:$(()=>[r.options.defaultColumn],f=>{var u;return f=(u=f)!=null?u:{},{header:h=>{const S=h.header.column.columnDef;return S.accessorKey?S.accessorKey:S.accessorFn?S.id:null},cell:h=>{var S,w;return(S=(w=h.renderValue())==null||w.toString==null?void 0:w.toString())!=null?S:null},...r._features.reduce((h,S)=>Object.assign(h,S.getDefaultColumnDef==null?void 0:S.getDefaultColumnDef()),{}),...f}},_(e,"debugColumns")),_getColumnDefs:()=>r.options.columns,getAllColumns:$(()=>[r._getColumnDefs()],f=>{const u=function(h,S,w){return w===void 0&&(w=0),h.map(C=>{const v=wn(r,C,w,S),x=C;return v.columns=x.columns?u(x.columns,v,w+1):[],v})};return u(f)},_(e,"debugColumns")),getAllFlatColumns:$(()=>[r.getAllColumns()],f=>f.flatMap(u=>u.getFlatColumns()),_(e,"debugColumns")),_getAllFlatColumnsById:$(()=>[r.getAllFlatColumns()],f=>f.reduce((u,h)=>(u[h.id]=h,u),{}),_(e,"debugColumns")),getAllLeafColumns:$(()=>[r.getAllColumns(),r._getOrderColumnsFn()],(f,u)=>{let h=f.flatMap(S=>S.getLeafColumns());return u(h)},_(e,"debugColumns")),getColumn:f=>r._getAllFlatColumnsById()[f]};Object.assign(r,c);for(let f=0;f<r._features.length;f++){const u=r._features[f];u==null||u.createTable==null||u.createTable(r)}return r}function oo(){return e=>$(()=>[e.options.data],n=>{const t={rows:[],flatRows:[],rowsById:{}},o=function(r,i,s){i===void 0&&(i=0);const l=[];for(let d=0;d<r.length;d++){const g=Rn(e,e._getRowId(r[d],d,s),r[d],d,i,void 0,s==null?void 0:s.id);if(t.flatRows.push(g),t.rowsById[g.id]=g,l.push(g),e.options.getSubRows){var a;g.originalSubRows=e.options.getSubRows(r[d],d),(a=g.originalSubRows)!=null&&a.length&&(g.subRows=o(g.originalSubRows,i+1,g))}}return l};return t.rows=o(n),t},_(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function lt(e,n){return e?ro(e)?M.createElement(e,n):e:null}function ro(e){return io(e)||typeof e=="function"||so(e)}function io(e){return typeof e=="function"&&(()=>{const n=Object.getPrototypeOf(e);return n.prototype&&n.prototype.isReactComponent})()}function so(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function lo(e){const n={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[t]=M.useState(()=>({current:no(n)})),[o,r]=M.useState(()=>t.current.initialState);return t.current.setOptions(i=>({...i,...e,state:{...o,...e.state},onStateChange:s=>{r(s),e.onStateChange==null||e.onStateChange(s)}})),t.current}const ao=R.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`,uo=R.label`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$disabled:e})=>e?.6:1};
  user-select: none;
`,_t=R.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`,go=R.div`
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
`,co=R.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,fo=R.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,Ue=M.forwardRef(({label:e,error:n,checked:t,defaultChecked:o=!1,indeterminate:r=!1,disabled:i=!1,id:s,className:l,style:a,onChange:d,...g},c)=>{const f=M.useRef(null);M.useImperativeHandle(c,()=>f.current);const[u,h]=M.useState(t!==void 0?t:o);M.useEffect(()=>{t!==void 0&&h(t)},[t]),M.useEffect(()=>{f.current&&(f.current.indeterminate=!!r)},[r]);const S=v=>{i||(t===void 0&&h(v.target.checked),d&&d(v))},w=s||`checkbox-${Math.random().toString(36).slice(2,9)}`,C=t!==void 0?t:u;return p.jsxs(ao,{children:[p.jsxs(uo,{$disabled:i,htmlFor:w,className:l,style:a,children:[p.jsx(_t,{ref:f,type:"checkbox",id:w,checked:C,disabled:i,onChange:S,...g}),p.jsx(go,{$checked:C,$indeterminate:r,$hasError:!!n,$disabled:i,children:r?p.jsx(Dt,{size:14}):C&&p.jsx(ct,{size:14})}),e&&p.jsx(co,{children:e})]}),n&&p.jsx(fo,{role:"alert",children:n})]})});Ue.displayName="Checkbox";const po=R.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({$fullWidth:e})=>e?"100%":"auto"};
  position: relative;
`,ho=R.label`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,mo=R.div`
  position: relative;
  width: 100%;
`,So=R.button`
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
`,Co=R.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({theme:e,$isPlaceholder:n})=>n?e.colors.textMuted:e.colors.text};
`,vo=R.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.textMuted};
  transition: transform ${({theme:e})=>e.transition.fast};
  transform: ${({$isOpen:e})=>e?"rotate(180deg)":"rotate(0deg)"};
`,wo=R.ul`
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
`,xo=R.li`
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
`,Ro=R.span`
  opacity: 0.65;
  font-size: 11px;
  margin-left: 6px;
`,$o=R.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,yt=Lt.forwardRef(({label:e,options:n,value:t,defaultValue:o,onChange:r,placeholder:i="Select an option",error:s,fullWidth:l=!0,disabled:a=!1,name:d,id:g,style:c,className:f},u)=>{const[h,S]=M.useState(!1),[w,C]=M.useState(t!==void 0?t:o||""),[v,x]=M.useState({}),P=M.useRef(null),V=M.useRef(null),b=M.useRef(null);M.useEffect(()=>{t!==void 0&&C(t)},[t]);const B=M.useCallback(()=>{if(!V.current)return;const y=V.current.getBoundingClientRect(),G=window.innerHeight-y.bottom<220&&y.top>220;x({position:"fixed",left:`${y.left}px`,width:`${y.width}px`,zIndex:99999,...G?{bottom:`${window.innerHeight-y.top+4}px`,top:"auto",boxShadow:"0 -10px 25px -5px rgba(0, 0, 0, 0.2), 0 -8px 10px -6px rgba(0, 0, 0, 0.1)"}:{top:`${y.bottom+4}px`,bottom:"auto",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"}})},[]);M.useEffect(()=>{if(!h)return;B();const y=()=>{B()};return window.addEventListener("scroll",y,!0),window.addEventListener("resize",y),()=>{window.removeEventListener("scroll",y,!0),window.removeEventListener("resize",y)}},[h,B]),M.useEffect(()=>{if(!h)return;const y=N=>{var Xe,Ze;const G=N.target,Ft=(Xe=P.current)==null?void 0:Xe.contains(G),Mt=(Ze=b.current)==null?void 0:Ze.contains(G);!Ft&&!Mt&&S(!1)};return document.addEventListener("mousedown",y),()=>{document.removeEventListener("mousedown",y)}},[h]);const L=()=>{a||(h||B(),S(y=>!y))},X=n.find(y=>y.value===w),H=y=>{a||y.disabled||(C(y.value),S(!1),r&&r({target:{value:y.value,name:d}}))},q=y=>{a||(y.key==="Enter"||y.key===" "?(y.preventDefault(),L()):y.key==="Escape"&&S(!1))},te=g||`select-${Math.random().toString(36).slice(2,9)}`;return p.jsxs(po,{$fullWidth:l,style:c,className:f,ref:u,children:[e&&p.jsx(ho,{htmlFor:te,children:e}),p.jsxs(mo,{ref:P,children:[p.jsxs(So,{ref:V,id:te,type:"button",$isOpen:h,$hasError:!!s,$isDisabled:a,disabled:a,onClick:L,onKeyDown:q,"aria-haspopup":"listbox","aria-expanded":h,children:[p.jsx(Co,{$isPlaceholder:!X,children:X?X.label:i}),p.jsx(vo,{$isOpen:h,children:p.jsx(Ht,{size:18})})]}),h&&jt.createPortal(p.jsx(wo,{ref:b,role:"listbox",style:v,children:n.map(y=>{const N=y.value===w,G=!!y.disabled;return p.jsxs(xo,{role:"option","aria-selected":N,"aria-disabled":G,$isSelected:N,$isDisabled:G,onClick:()=>H(y),children:[p.jsxs("span",{children:[y.label,G&&p.jsx(Ro,{children:"(Coming Soon)"})]}),N&&p.jsx(ct,{size:16})]},y.value)})}),document.body)]}),s&&p.jsx($o,{role:"alert",children:s})]})});yt.displayName="Select";const _o=R.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,yo=R.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Fo=R.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,Mo=R.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Po=R.div`
  width: 80px;
`,Io=R.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,Pe=R.button`
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
`,Vo=({page:e,totalPages:n,total:t,limit:o,onPageChange:r,onLimitChange:i})=>{const s=Math.min((e-1)*o+1,t),l=Math.min(e*o,t),a=Array.from({length:n},(c,f)=>f+1).filter(c=>c===1||c===n||Math.abs(c-e)<=1),d=[];a.forEach((c,f)=>{f>0&&c-a[f-1]>1&&d.push("..."),d.push(c)});const g=[{value:"10",label:"10"},{value:"20",label:"20"},{value:"50",label:"50"},{value:"100",label:"100"}];return p.jsxs(_o,{children:[p.jsxs(yo,{children:["Showing ",s,"–",l," of ",t," results"]}),p.jsxs(Fo,{children:[i&&p.jsxs(Mo,{children:[p.jsx("span",{children:"Rows per page:"}),p.jsx(Po,{children:p.jsx(yt,{options:g,value:String(o),onChange:c=>i(Number(c.target.value)),fullWidth:!1})})]}),p.jsxs(Io,{children:[p.jsx(Pe,{"aria-label":"Previous Page",disabled:e<=1,onClick:()=>r(e-1),children:p.jsx(Ot,{size:16})}),d.map((c,f)=>c==="..."?p.jsx("span",{style:{padding:"0 4px",color:"#94a3b8"},children:"..."},`ellipsis-${f}`):p.jsx(Pe,{$active:c===e,onClick:()=>r(c),children:c},c)),p.jsx(Pe,{"aria-label":"Next Page",disabled:e>=n,onClick:()=>r(e+1),children:p.jsx(gt,{size:16})})]})]})]})},Eo=R.div`
  width: 100%;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  background-color: ${({theme:e})=>e.colors.surface};
  overflow: hidden;
`,zo=R.div`
  width: 100%;
  overflow-x: auto;
`,bo=R.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({theme:e})=>e.fontSize.base};
`,Do=R.thead`
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
`,Lo=R.tbody`
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
`,Ho=R.div`
  padding: ${({theme:e})=>e.spacing.xxxl} ${({theme:e})=>e.spacing.xl};
  text-align: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: ${({theme:e})=>e.fontSize.base};
`,Uo=R.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,Wo=R.button`
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
`,jo=R.div`
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`;function qo({columns:e,data:n,isLoading:t,emptyMessage:o="No data found.",keyExtractor:r,selectable:i=!1,selectedRowIds:s=[],onSelectionChange:l,pagination:a}){const d=M.useMemo(()=>{const v=e.find(x=>x.key==="actions"||x.header.toLowerCase()==="actions");return v?[v,...e.filter(x=>x!==v)]:e},[e]),g=M.useMemo(()=>n.map(r),[n,r]),c=M.useMemo(()=>g.length>0&&g.every(v=>s.includes(v)),[g,s]),f=M.useMemo(()=>g.some(v=>s.includes(v)),[g,s]),u=()=>{l&&l(c?[]:g)},h=v=>{l&&(s.includes(v)?l(s.filter(x=>x!==v)):l([...s,v]))},S=M.useMemo(()=>d.map(v=>({id:v.key,header:()=>v.header,accessorFn:x=>x[v.key],cell:x=>{if(v.render)return v.render(x.row.original,x.row.index);const P=x.row.original[v.key];return P!=null?String(P):"—"},size:v.width?parseInt(v.width,10):void 0})),[d]),w=lo({data:n,columns:S,getCoreRowModel:oo()}),C=(i?1:0)+e.length+1;return p.jsxs(Eo,{children:[p.jsx(zo,{children:p.jsxs(bo,{children:[p.jsx(Do,{children:w.getHeaderGroups().map(v=>p.jsxs("tr",{children:[i&&p.jsx("th",{style:{width:"48px",minWidth:"48px",textAlign:"center"},children:p.jsx(Ue,{checked:c,indeterminate:f&&!c,onChange:u})}),v.headers.map(x=>{const P=d.find(b=>b.key===x.id),V=(P==null?void 0:P.key)==="actions"||x.id==="actions";return p.jsx("th",{className:P!=null&&P.sortable?"sortable":"",style:{width:(P==null?void 0:P.width)||(V?"100px":void 0),minWidth:V?"100px":void 0},children:x.isPlaceholder?null:lt(x.column.columnDef.header,x.getContext())},x.id)}),p.jsx("th",{style:{width:"100%",minWidth:0,padding:0}})]},v.id))}),p.jsx(Lo,{children:t?p.jsx("tr",{children:p.jsx("td",{colSpan:C,children:p.jsx(At,{})})}):w.getRowModel().rows.length===0?p.jsx("tr",{children:p.jsx("td",{colSpan:C,children:p.jsx(Ho,{children:o})})}):w.getRowModel().rows.map(v=>{const x=r(v.original),P=s.includes(x);return p.jsxs("tr",{children:[i&&p.jsx("td",{style:{width:"48px",minWidth:"48px",textAlign:"center"},children:p.jsx(Ue,{checked:P,onChange:()=>h(x)})}),v.getVisibleCells().map(V=>{const b=d.find(L=>L.key===V.column.id),B=(b==null?void 0:b.key)==="actions"||V.column.id==="actions";return p.jsx("td",{style:{width:(b==null?void 0:b.width)||(B?"100px":void 0),minWidth:B?"100px":void 0},children:lt(V.column.columnDef.cell,V.getContext())},V.id)}),p.jsx("td",{style:{width:"100%",minWidth:0,padding:0}})]},x)})})]})}),a&&a.totalPages>0&&p.jsx(jo,{children:p.jsx(Vo,{page:a.page,totalPages:a.totalPages,total:a.total,limit:a.limit,onPageChange:a.onPageChange,onLimitChange:a.onLimitChange})})]})}const Oo={default:U`
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
  `},Ao=R.span`
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

  ${({$variant:e})=>Oo[e]}
`,Qo=({variant:e="default",size:n="md",children:t,dot:o})=>p.jsxs(Ao,{$variant:e,$size:n,children:[o&&p.jsx("svg",{width:"6",height:"6",viewBox:"0 0 6 6",fill:"currentColor",children:p.jsx("circle",{cx:"3",cy:"3",r:"3"})}),t]});export{Uo as A,Qo as B,No as C,Wo as I,Bo as P,yt as S,qo as T,Ue as a,To as u};
