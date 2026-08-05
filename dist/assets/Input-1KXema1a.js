var R=t=>{throw TypeError(t)};var E=(t,s,e)=>s.has(t)||R("Cannot "+e);var r=(t,s,e)=>(E(t,s,"read from private field"),e?e.call(t):s.get(t)),g=(t,s,e)=>s.has(t)?R("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(t):s.set(t,e),y=(t,s,e,o)=>(E(t,s,"write to private field"),o?o.call(t,e):s.set(t,e),e),$=(t,s,e)=>(E(t,s,"access private method"),e);import{ae as P,af as L,ag as z,ah as U,ai as K,x as W,r as j,aj as q,ak as F,g as b,ad as T,Z as A,j as l}from"./index-W65cpLBV.js";var a,d,i,c,u,O,C,I,D=(I=class extends P{constructor(s,e){super();g(this,u);g(this,a);g(this,d);g(this,i);g(this,c);y(this,a,s),this.setOptions(e),this.bindMethods(),$(this,u,O).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(s){var o;const e=this.options;this.options=r(this,a).defaultMutationOptions(s),L(this.options,e)||r(this,a).getMutationCache().notify({type:"observerOptionsUpdated",mutation:r(this,i),observer:this}),e!=null&&e.mutationKey&&this.options.mutationKey&&z(e.mutationKey)!==z(this.options.mutationKey)?this.reset():((o=r(this,i))==null?void 0:o.state.status)==="pending"&&r(this,i).setOptions(this.options)}onUnsubscribe(){var s;this.hasListeners()||(s=r(this,i))==null||s.removeObserver(this)}onMutationUpdate(s){$(this,u,O).call(this),$(this,u,C).call(this,s)}getCurrentResult(){return r(this,d)}reset(){var s;(s=r(this,i))==null||s.removeObserver(this),y(this,i,void 0),$(this,u,O).call(this),$(this,u,C).call(this)}mutate(s,e){var o;return y(this,c,e),(o=r(this,i))==null||o.removeObserver(this),y(this,i,r(this,a).getMutationCache().build(r(this,a),this.options)),r(this,i).addObserver(this),r(this,i).execute(s)}},a=new WeakMap,d=new WeakMap,i=new WeakMap,c=new WeakMap,u=new WeakSet,O=function(){var e;const s=((e=r(this,i))==null?void 0:e.state)??U();y(this,d,{...s,isPending:s.status==="pending",isSuccess:s.status==="success",isError:s.status==="error",isIdle:s.status==="idle",mutate:this.mutate,reset:this.reset})},C=function(s){K.batch(()=>{var e,o,n,f,h,m,S,v;if(r(this,c)&&this.hasListeners()){const x=r(this,d).variables,M=r(this,d).context,w={client:r(this,a),meta:this.options.meta,mutationKey:this.options.mutationKey};if((s==null?void 0:s.type)==="success"){try{(o=(e=r(this,c)).onSuccess)==null||o.call(e,s.data,x,M,w)}catch(p){Promise.reject(p)}try{(f=(n=r(this,c)).onSettled)==null||f.call(n,s.data,null,x,M,w)}catch(p){Promise.reject(p)}}else if((s==null?void 0:s.type)==="error"){try{(m=(h=r(this,c)).onError)==null||m.call(h,s.error,x,M,w)}catch(p){Promise.reject(p)}try{(v=(S=r(this,c)).onSettled)==null||v.call(S,void 0,s.error,x,M,w)}catch(p){Promise.reject(p)}}}this.listeners.forEach(x=>{x(r(this,d))})})},I);function Y(t,s){const e=W(),[o]=j.useState(()=>new D(e,t));j.useEffect(()=>{o.setOptions(t)},[o,t]);const n=j.useSyncExternalStore(j.useCallback(h=>o.subscribe(K.batchCalls(h)),[o]),()=>o.getCurrentResult(),()=>o.getCurrentResult()),f=j.useCallback((h,m)=>{o.mutate(h,m).catch(q)},[o]);if(n.error&&F(o.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:f,mutateAsync:n.mutate}}const H=b.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({$fullWidth:t})=>t?"100%":"auto"};
`,N=b.label`
  font-size: ${({theme:t})=>t.fontSize.sm};
  font-weight: ${({theme:t})=>t.fontWeight.medium};
  color: ${({theme:t})=>t.colors.text};
`,Q=b.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1.5px solid
    ${({theme:t,$hasError:s})=>s?t.colors.danger:t.colors.border};
  border-radius: ${({theme:t})=>t.borderRadius.md};
  background-color: ${({theme:t})=>t.colors.surface};
  transition:
    border-color ${({theme:t})=>t.transition.fast},
    box-shadow ${({theme:t})=>t.transition.fast};

  &:focus-within {
    border-color: ${({theme:t,$hasError:s})=>s?t.colors.danger:t.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({theme:t,$hasError:s})=>s?`${t.colors.danger}22`:`${t.colors.primary}22`};
  }

  ${({$hasError:t})=>t&&T`
      background-color: ${({theme:s})=>s.colors.dangerLight};
    `}
`,Z=b.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({theme:t})=>t.fontSize.base};
  color: ${({theme:t})=>t.colors.text};
  padding: 9px 12px;
  width: 100%;

  &::placeholder {
    color: ${({theme:t})=>t.colors.textMuted};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`,k=b.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  color: ${({theme:t})=>t.colors.textMuted};
  flex-shrink: 0;
`,B=b.span`
  font-size: ${({theme:t})=>t.fontSize.sm};
  color: ${({theme:t})=>t.colors.danger};
`,G=b.span`
  font-size: ${({theme:t})=>t.fontSize.sm};
  color: ${({theme:t})=>t.colors.textSecondary};
`,J=A.forwardRef(({label:t,error:s,hint:e,leftIcon:o,rightIcon:n,fullWidth:f=!0,id:h,...m},S)=>{const v=h||`input-${Math.random().toString(36).slice(2,9)}`;return l.jsxs(H,{$fullWidth:f,children:[t&&l.jsx(N,{htmlFor:v,children:t}),l.jsxs(Q,{$hasError:!!s,children:[o&&l.jsx(k,{children:o}),l.jsx(Z,{ref:S,id:v,...m}),n&&l.jsx(k,{children:n})]}),s&&l.jsx(B,{role:"alert",children:s}),!s&&e&&l.jsx(G,{children:e})]})});J.displayName="Input";export{J as I,Y as u};
