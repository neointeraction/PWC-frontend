import{r,j as i,b1 as $,g as b}from"./index-BVWJ6WpZ.js";const v=b.div`
  display: inline-flex;
`,E=b.div`
  position: fixed;
  z-index: 999999;
  padding: 8px 12px;
  font-size: ${({theme:t})=>t.fontSize.xs};
  font-weight: ${({theme:t})=>t.fontWeight.medium};
  color: ${({theme:t})=>t.colors.textInverse};
  background-color: ${({theme:t})=>t.colors.text};
  border-radius: 4px;
  white-space: normal;
  max-width: 360px;
  line-height: 1.4;
  word-break: break-word;
  pointer-events: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
  transition: opacity 120ms ease;
`,k=({content:t,children:p,position:u="top",delay:w=150})=>{const[a,f]=r.useState(!1),[h,g]=r.useState({}),l=r.useRef(null),s=r.useRef(null),n=r.useCallback(()=>{if(!l.current)return;const e=l.current.getBoundingClientRect(),c=e.left+e.width/2,m=e.top+e.height/2;let o={};switch(u){case"bottom":o={top:`${e.bottom+6}px`,left:`${c}px`,transform:"translateX(-50%)"};break;case"left":o={top:`${m}px`,left:`${e.left-6}px`,transform:"translate(-100%, -50%)"};break;case"right":o={top:`${m}px`,left:`${e.right+6}px`,transform:"translateY(-50%)"};break;case"top":default:e.top<40?o={top:`${e.bottom+6}px`,left:`${c}px`,transform:"translateX(-50%)"}:o={top:`${e.top-6}px`,left:`${c}px`,transform:"translate(-50%, -100%)"};break}g(o)},[u]),d=()=>{s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{n(),f(!0)},w)},x=()=>{s.current&&clearTimeout(s.current),f(!1)};return r.useEffect(()=>{if(!a)return;n();const e=()=>{n()};return window.addEventListener("scroll",e,!0),window.addEventListener("resize",e),()=>{window.removeEventListener("scroll",e,!0),window.removeEventListener("resize",e)}},[a,n]),t?i.jsxs(v,{ref:l,onMouseEnter:d,onMouseLeave:x,onFocus:d,onBlur:x,children:[p,a&&$.createPortal(i.jsx(E,{style:h,children:t}),document.body)]}):i.jsx(i.Fragment,{children:p})};export{k as T};
