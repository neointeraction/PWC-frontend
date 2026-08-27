import{g as i,bi as H,O as P,r as s,j as n,a$ as K,b1 as V,h as A}from"./index-Bw790BVp.js";const N=i.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({$fullWidth:e})=>e?"100%":"auto"};
  position: relative;
`,U=i.label`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,q=i.div`
  position: relative;
  width: 100%;
`,G=i.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.text};
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1.5px solid
    ${({theme:e,$hasError:t,$isOpen:r})=>t?e.colors.danger:r?e.colors.borderFocus:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  outline: none;
  cursor: ${({$isDisabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$isDisabled:e})=>e?.6:1};
  transition: all ${({theme:e})=>e.transition.fast};
  user-select: none;

  &:focus-visible {
    border-color: ${({theme:e,$hasError:t})=>t?e.colors.danger:e.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({theme:e,$hasError:t})=>t?`${e.colors.danger}22`:`${e.colors.primary}22`};
  }

  ${({$isOpen:e,theme:t,$hasError:r})=>e&&H`
      box-shadow: 0 0 0 3px
        ${r?`${t.colors.danger}22`:`${t.colors.primary}22`};
    `}
`,J=i.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({theme:e,$isPlaceholder:t})=>t?e.colors.textMuted:e.colors.text};
`,Q=i.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.textMuted};
  transition: transform ${({theme:e})=>e.transition.fast};
  transform: ${({$isOpen:e})=>e?"rotate(180deg)":"rotate(0deg)"};
`,X=i.ul`
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
`,Y=i.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e,$isSelected:t,$isDisabled:r})=>r?e.colors.textMuted:t?e.colors.primary:e.colors.text};
  font-weight: ${({theme:e,$isSelected:t})=>t?e.fontWeight.semibold:e.fontWeight.normal};
  background-color: ${({theme:e,$isSelected:t})=>t?`${e.colors.primary}12`:"transparent"};
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  cursor: ${({$isDisabled:e})=>e?"not-allowed":"pointer"};
  opacity: ${({$isDisabled:e})=>e?.55:1};
  transition: background-color ${({theme:e})=>e.transition.fast};
  user-select: none;

  &:hover {
    background-color: ${({theme:e,$isSelected:t,$isDisabled:r})=>r?"transparent":t?`${e.colors.primary}20`:e.colors.surfaceHover};
  }
`,Z=i.span`
  opacity: 0.65;
  font-size: 11px;
  margin-left: 6px;
`,_=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,ee=P.forwardRef(({label:e,options:t,value:r,defaultValue:k,onChange:$,placeholder:z="Select an option",error:f,fullWidth:E=!0,disabled:d=!1,name:R,id:C,style:D,className:O},L)=>{const[l,p]=s.useState(!1),[g,w]=s.useState(r!==void 0?r:k||""),[M,I]=s.useState({}),m=s.useRef(null),x=s.useRef(null),h=s.useRef(null);s.useEffect(()=>{r!==void 0&&w(r)},[r]);const u=s.useCallback(()=>{if(!x.current)return;const o=x.current.getBoundingClientRect(),a=window.innerHeight-o.bottom<220&&o.top>220;I({position:"fixed",left:`${o.left}px`,width:`${o.width}px`,zIndex:99999,...a?{bottom:`${window.innerHeight-o.top+4}px`,top:"auto",boxShadow:"0 -10px 25px -5px rgba(0, 0, 0, 0.2), 0 -8px 10px -6px rgba(0, 0, 0, 0.1)"}:{top:`${o.bottom+4}px`,bottom:"auto",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"}})},[]);s.useEffect(()=>{if(!l)return;u();const o=()=>{u()};return window.addEventListener("scroll",o,!0),window.addEventListener("resize",o),()=>{window.removeEventListener("scroll",o,!0),window.removeEventListener("resize",o)}},[l,u]),s.useEffect(()=>{if(!l)return;const o=c=>{var v,j;const a=c.target,T=(v=m.current)==null?void 0:v.contains(a),F=(j=h.current)==null?void 0:j.contains(a);!T&&!F&&p(!1)};return document.addEventListener("mousedown",o),()=>{document.removeEventListener("mousedown",o)}},[l]);const y=()=>{d||(l||u(),p(o=>!o))},b=t.find(o=>o.value===g),W=o=>{d||o.disabled||(w(o.value),p(!1),$&&$({target:{value:o.value,name:R}}))},B=o=>{d||(o.key==="Enter"||o.key===" "?(o.preventDefault(),y()):o.key==="Escape"&&p(!1))},S=C||`select-${Math.random().toString(36).slice(2,9)}`;return n.jsxs(N,{$fullWidth:E,style:D,className:O,ref:L,children:[e&&n.jsx(U,{htmlFor:S,children:e}),n.jsxs(q,{ref:m,children:[n.jsxs(G,{ref:x,id:S,type:"button",$isOpen:l,$hasError:!!f,$isDisabled:d,disabled:d,onClick:y,onKeyDown:B,"aria-haspopup":"listbox","aria-expanded":l,children:[n.jsx(J,{$isPlaceholder:!b,children:b?b.label:z}),n.jsx(Q,{$isOpen:l,children:n.jsx(K,{size:18})})]}),l&&V.createPortal(n.jsx(X,{ref:h,role:"listbox",style:M,children:t.map(o=>{const c=o.value===g,a=!!o.disabled;return n.jsxs(Y,{role:"option","aria-selected":c,"aria-disabled":a,$isSelected:c,$isDisabled:a,onClick:()=>W(o),children:[n.jsxs("span",{children:[o.label,a&&n.jsx(Z,{children:"(Coming Soon)"})]}),c&&n.jsx(A,{size:16})]},o.value)})}),document.body)]}),f&&n.jsx(_,{role:"alert",children:f})]})});ee.displayName="Select";export{ee as S};
