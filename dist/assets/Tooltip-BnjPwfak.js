import{r,j as i,l as g,g as w}from"./index-W65cpLBV.js";const v=w.div`
  display: inline-flex;
`,E=w.div`
  position: fixed;
  z-index: 999999;
  padding: 5px 9px;
  font-size: ${({theme:t})=>t.fontSize.xs};
  font-weight: ${({theme:t})=>t.fontWeight.medium};
  color: ${({theme:t})=>t.colors.textInverse};
  background-color: ${({theme:t})=>t.colors.text};
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  transition: opacity 120ms ease;
`,R=({content:t,children:p,position:u="top",delay:b=150})=>{const[a,f]=r.useState(!1),[h,$]=r.useState({}),l=r.useRef(null),s=r.useRef(null),n=r.useCallback(()=>{if(!l.current)return;const e=l.current.getBoundingClientRect(),c=e.left+e.width/2,m=e.top+e.height/2;let o={};switch(u){case"bottom":o={top:`${e.bottom+6}px`,left:`${c}px`,transform:"translateX(-50%)"};break;case"left":o={top:`${m}px`,left:`${e.left-6}px`,transform:"translate(-100%, -50%)"};break;case"right":o={top:`${m}px`,left:`${e.right+6}px`,transform:"translateY(-50%)"};break;case"top":default:e.top<40?o={top:`${e.bottom+6}px`,left:`${c}px`,transform:"translateX(-50%)"}:o={top:`${e.top-6}px`,left:`${c}px`,transform:"translate(-50%, -100%)"};break}$(o)},[u]),d=()=>{s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{n(),f(!0)},b)},x=()=>{s.current&&clearTimeout(s.current),f(!1)};return r.useEffect(()=>{if(!a)return;n();const e=()=>{n()};return window.addEventListener("scroll",e,!0),window.addEventListener("resize",e),()=>{window.removeEventListener("scroll",e,!0),window.removeEventListener("resize",e)}},[a,n]),t?i.jsxs(v,{ref:l,onMouseEnter:d,onMouseLeave:x,onFocus:d,onBlur:x,children:[p,a&&g.createPortal(i.jsx(E,{style:h,children:t}),document.body)]}):i.jsx(i.Fragment,{children:p})};export{R as T};
