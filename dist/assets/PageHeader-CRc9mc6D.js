import{j as t,S as w,bd as j,g as r,r as l,p as v,aB as y}from"./index-DnMR83cZ.js";const z=r.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`,k=r.span`
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
`,S=({items:e})=>t.jsx(z,{"aria-label":"Breadcrumb",children:e.map((s,n)=>t.jsxs(k,{children:[n>0&&t.jsx(w,{size:16}),s.href&&n<e.length-1?t.jsx(j,{to:s.href,children:s.label}):t.jsx("span",{children:s.label})]},n))}),T=r.div`
  display: inline-flex;
`,L=r.div`
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
`,R=({content:e,children:s,position:n="top",delay:p=150})=>{const[i,u]=l.useState(!1),[$,b]=l.useState({}),x=l.useRef(null),c=l.useRef(null),d=l.useCallback(()=>{if(!x.current)return;const o=x.current.getBoundingClientRect(),f=o.left+o.width/2,h=o.top+o.height/2;let a={};switch(n){case"bottom":a={top:`${o.bottom+6}px`,left:`${f}px`,transform:"translateX(-50%)"};break;case"left":a={top:`${h}px`,left:`${o.left-6}px`,transform:"translate(-100%, -50%)"};break;case"right":a={top:`${h}px`,left:`${o.right+6}px`,transform:"translateY(-50%)"};break;case"top":default:o.top<40?a={top:`${o.bottom+6}px`,left:`${f}px`,transform:"translateX(-50%)"}:a={top:`${o.top-6}px`,left:`${f}px`,transform:"translate(-50%, -100%)"};break}b(a)},[n]),m=()=>{c.current&&clearTimeout(c.current),c.current=setTimeout(()=>{d(),u(!0)},p)},g=()=>{c.current&&clearTimeout(c.current),u(!1)};return l.useEffect(()=>{if(!i)return;d();const o=()=>{d()};return window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),()=>{window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o)}},[i,d]),e?t.jsxs(T,{ref:x,onMouseEnter:m,onMouseLeave:g,onFocus:m,onBlur:g,children:[s,i&&v.createPortal(t.jsx(L,{style:$,children:e}),document.body)]}):t.jsx(t.Fragment,{children:s})},B=r.div`
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`,E=r.div`
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,P=r.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,C=r.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,W=r.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,A=r.button`
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
`,G=r.h1`
  font-size: ${({theme:e})=>e.fontSize.xxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,H=r.p`
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,I=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,F=({title:e,subtitle:s,breadcrumbs:n,actions:p,onBack:i})=>t.jsxs(B,{children:[n&&n.length>0&&t.jsx(E,{children:t.jsx(S,{items:n})}),t.jsxs(P,{children:[t.jsxs(C,{children:[i&&t.jsx(R,{content:"Go back",children:t.jsx(A,{onClick:i,"aria-label":"Go back",children:t.jsx(y,{size:20})})}),t.jsxs(W,{children:[t.jsx(G,{children:e}),s&&t.jsx(H,{children:s})]})]}),p&&t.jsx(I,{children:p})]})]});export{F as P,R as T};
