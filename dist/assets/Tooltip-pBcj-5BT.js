import{r as n,j as o,J as w,V as y,g as r,l as v}from"./index-Dv07JqWY.js";const j=r.div`
  position: relative;
  display: flex;
  align-items: center;
`,E=r.input`
  width: ${({$width:e})=>e||"260px"};
  height: 36px;
  padding: 0 36px 0 36px;
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.text};
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  outline: none;
  transition:
    border-color ${({theme:e})=>e.transition.fast},
    box-shadow ${({theme:e})=>e.transition.fast};

  &::placeholder {
    color: ${({theme:e})=>e.colors.textMuted};
  }

  &:focus {
    border-color: ${({theme:e})=>e.colors.borderFocus};
    box-shadow: 0 0 0 3px ${({theme:e})=>e.colors.primary}22;
  }
`,S=r.span`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${({theme:e})=>e.colors.textMuted};
  pointer-events: none;
`,z=r.button`
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  color: ${({theme:e})=>e.colors.textMuted};
  padding: 2px;
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  transition: color ${({theme:e})=>e.transition.fast};

  &:hover {
    color: ${({theme:e})=>e.colors.text};
  }
`,I=({value:e,onChange:i,placeholder:s="Search…",width:p,autoFocus:a})=>{const d=n.useRef(null);return n.useEffect(()=>{var c;a&&((c=d.current)==null||c.focus())},[a]),o.jsxs(j,{children:[o.jsx(S,{children:o.jsx(w,{size:18})}),o.jsx(E,{ref:d,$width:p,value:e,onChange:c=>i(c.target.value),placeholder:s,"aria-label":s}),e&&o.jsx(z,{onClick:()=>i(""),"aria-label":"Clear search",children:o.jsx(y,{size:16})})]})},R=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({theme:e})=>e.spacing.xxxxl} ${({theme:e})=>e.spacing.xl};
  text-align: center;
  gap: ${({theme:e})=>e.spacing.md};
`,T=r.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.textMuted};
  margin-bottom: ${({theme:e})=>e.spacing.sm};
`,k=r.p`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,C=r.p`
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.textSecondary};
  max-width: 360px;
`,P=({icon:e,title:i,description:s,action:p})=>o.jsxs(R,{children:[e&&o.jsx(T,{children:e}),o.jsx(k,{children:i}),s&&o.jsx(C,{children:s}),p]}),L=r.div`
  display: inline-flex;
`,M=r.div`
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
`,V=({content:e,children:i,position:s="top",delay:p=150})=>{const[a,d]=n.useState(!1),[c,g]=n.useState({}),f=n.useRef(null),x=n.useRef(null),u=n.useCallback(()=>{if(!f.current)return;const t=f.current.getBoundingClientRect(),m=t.left+t.width/2,b=t.top+t.height/2;let l={};switch(s){case"bottom":l={top:`${t.bottom+6}px`,left:`${m}px`,transform:"translateX(-50%)"};break;case"left":l={top:`${b}px`,left:`${t.left-6}px`,transform:"translate(-100%, -50%)"};break;case"right":l={top:`${b}px`,left:`${t.right+6}px`,transform:"translateY(-50%)"};break;case"top":default:t.top<40?l={top:`${t.bottom+6}px`,left:`${m}px`,transform:"translateX(-50%)"}:l={top:`${t.top-6}px`,left:`${m}px`,transform:"translate(-50%, -100%)"};break}g(l)},[s]),$=()=>{x.current&&clearTimeout(x.current),x.current=setTimeout(()=>{u(),d(!0)},p)},h=()=>{x.current&&clearTimeout(x.current),d(!1)};return n.useEffect(()=>{if(!a)return;u();const t=()=>{u()};return window.addEventListener("scroll",t,!0),window.addEventListener("resize",t),()=>{window.removeEventListener("scroll",t,!0),window.removeEventListener("resize",t)}},[a,u]),e?o.jsxs(L,{ref:f,onMouseEnter:$,onMouseLeave:h,onFocus:$,onBlur:h,children:[i,a&&v.createPortal(o.jsx(M,{style:c,children:e}),document.body)]}):o.jsx(o.Fragment,{children:i})};export{P as E,I as S,V as T};
