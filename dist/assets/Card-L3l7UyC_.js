import{j as o,N as w,b3 as j,g as t,r as c,l as v,av as y}from"./index-Leifw_BN.js";const z=t.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`,S=t.span`
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
`,k=({items:e})=>o.jsx(z,{"aria-label":"Breadcrumb",children:e.map((r,n)=>o.jsxs(S,{children:[n>0&&o.jsx(w,{size:16}),r.href&&n<e.length-1?o.jsx(j,{to:r.href,children:r.label}):o.jsx("span",{children:r.label})]},n))}),C=t.div`
  display: inline-flex;
`,T=t.div`
  position: fixed;
  z-index: 999999;
  padding: 5px 9px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.textInverse};
  background-color: ${({theme:e})=>e.colors.text};
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  transition: opacity 120ms ease;
`,R=({content:e,children:r,position:n="top",delay:a=150})=>{const[i,p]=c.useState(!1),[f,g]=c.useState({}),u=c.useRef(null),d=c.useRef(null),x=c.useCallback(()=>{if(!u.current)return;const s=u.current.getBoundingClientRect(),h=s.left+s.width/2,b=s.top+s.height/2;let l={};switch(n){case"bottom":l={top:`${s.bottom+6}px`,left:`${h}px`,transform:"translateX(-50%)"};break;case"left":l={top:`${b}px`,left:`${s.left-6}px`,transform:"translate(-100%, -50%)"};break;case"right":l={top:`${b}px`,left:`${s.right+6}px`,transform:"translateY(-50%)"};break;case"top":default:s.top<40?l={top:`${s.bottom+6}px`,left:`${h}px`,transform:"translateX(-50%)"}:l={top:`${s.top-6}px`,left:`${h}px`,transform:"translate(-50%, -100%)"};break}g(l)},[n]),$=()=>{d.current&&clearTimeout(d.current),d.current=setTimeout(()=>{x(),p(!0)},a)},m=()=>{d.current&&clearTimeout(d.current),p(!1)};return c.useEffect(()=>{if(!i)return;x();const s=()=>{x()};return window.addEventListener("scroll",s,!0),window.addEventListener("resize",s),()=>{window.removeEventListener("scroll",s,!0),window.removeEventListener("resize",s)}},[i,x]),e?o.jsxs(C,{ref:u,onMouseEnter:$,onMouseLeave:m,onFocus:$,onBlur:m,children:[r,i&&v.createPortal(o.jsx(T,{style:f,children:e}),document.body)]}):o.jsx(o.Fragment,{children:r})},L=t.div`
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`,B=t.div`
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,E=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,P=t.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,W=t.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,H=t.button`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  flex-shrink: 0;
  margin-top: 2px;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,M=t.h1`
  font-size: ${({theme:e})=>e.fontSize.xxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,F=t.p`
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,G=t.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,O=({title:e,subtitle:r,breadcrumbs:n,actions:a,onBack:i})=>o.jsxs(L,{children:[n&&n.length>0&&o.jsx(B,{children:o.jsx(k,{items:n})}),o.jsxs(E,{children:[o.jsxs(P,{children:[i&&o.jsx(R,{content:"Go back",children:o.jsx(H,{onClick:i,"aria-label":"Go back",children:o.jsx(y,{size:20})})}),o.jsxs(W,{children:[o.jsx(M,{children:e}),r&&o.jsx(F,{children:r})]})]}),a&&o.jsx(G,{children:a})]})]}),I=t.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  padding: ${({$padding:e,theme:r})=>e?e==="none"?"0":e in r.spacing?r.spacing[e]:e:r.spacing.xl};
  box-shadow: ${({theme:e})=>e.colors.shadow};
  transition:
    box-shadow ${({theme:e})=>e.transition.base},
    border-color ${({theme:e})=>e.transition.base};

  ${({$hoverable:e,theme:r})=>e&&`
    cursor: pointer;
    &:hover {
      box-shadow: ${r.colors.shadowMd};
      border-color: ${r.colors.textMuted};
    }
  `}
`,X=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  gap: ${({theme:e})=>e.spacing.md};
`,A=t.h2`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,N=t.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 2px;
`,V=t.div``,Y=t.div`
  margin-top: ${({theme:e})=>e.spacing.lg};
  padding-top: ${({theme:e})=>e.spacing.lg};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
`,q=({title:e,subtitle:r,headerAction:n,footer:a,padding:i,hoverable:p,children:f,className:g})=>o.jsxs(I,{$padding:i,$hoverable:p,className:g,children:[(e||r||n)&&o.jsxs(X,{children:[o.jsxs("div",{children:[e&&o.jsx(A,{children:e}),r&&o.jsx(N,{children:r})]}),n]}),o.jsx(V,{children:f}),a&&o.jsx(Y,{children:a})]});export{q as C,O as P,R as T};
