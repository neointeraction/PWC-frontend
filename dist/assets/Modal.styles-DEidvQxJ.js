import{g as e,aR as l,r as i,j as n,b5 as G,f as T,Q as K,b6 as N,p as V,b7 as q}from"./index-BIfikPqx.js";const Q=e.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`,U=e.label`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.sm};
  cursor: ${({$disabled:o})=>o?"not-allowed":"pointer"};
  opacity: ${({$disabled:o})=>o?.6:1};
  user-select: none;
`,D=e.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`,J=e.div`
  width: 18px;
  height: 18px;
  border-radius: ${({theme:o})=>o.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({theme:o})=>o.transition.fast};
  flex-shrink: 0;

  ${({theme:o,$checked:r,$indeterminate:s,$hasError:c})=>r||s?l`
          background-color: ${c?o.colors.danger:o.colors.primary};
          border: 1.5px solid ${c?o.colors.danger:o.colors.primary};
          color: #ffffff;
        `:l`
          background-color: ${o.colors.surface};
          border: 1.5px solid ${c?o.colors.danger:o.colors.border};
          color: transparent;

          &:hover {
            border-color: ${c?o.colors.danger:o.colors.primary};
            background-color: ${o.colors.surfaceHover};
          }
        `}

  ${D}:focus-visible + & {
    box-shadow: 0 0 0 3px
      ${({theme:o,$hasError:r})=>r?`${o.colors.danger}22`:`${o.colors.primary}22`};
    border-color: ${({theme:o,$hasError:r})=>r?o.colors.danger:o.colors.primary};
  }
`,X=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.text};
  line-height: 1.4;
`,Y=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,Z=i.forwardRef(({label:o,error:r,checked:s,defaultChecked:c=!1,indeterminate:p=!1,disabled:u=!1,id:h,className:k,style:x,onChange:w,...S},z)=>{const f=i.useRef(null);i.useImperativeHandle(z,()=>f.current);const[j,a]=i.useState(s!==void 0?s:c);i.useEffect(()=>{s!==void 0&&a(s)},[s]),i.useEffect(()=>{f.current&&(f.current.indeterminate=!!p)},[p]);const g=y=>{u||(s===void 0&&a(y.target.checked),w&&w(y))},m=h||`checkbox-${Math.random().toString(36).slice(2,9)}`,b=s!==void 0?s:j;return n.jsxs(Q,{children:[n.jsxs(U,{$disabled:u,htmlFor:m,className:k,style:x,children:[n.jsx(D,{ref:f,type:"checkbox",id:m,checked:b,disabled:u,onChange:g,...S}),n.jsx(J,{$checked:b,$indeterminate:p,$hasError:!!r,$disabled:u,children:p?n.jsx(G,{size:14}):b&&n.jsx(T,{size:14})}),o&&n.jsx(X,{children:o})]}),r&&n.jsx(Y,{role:"alert",children:r})]})});Z.displayName="Checkbox";const _=e.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({$fullWidth:o})=>o?"100%":"auto"};
  position: relative;
`,oo=e.label`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
`,ro=e.div`
  position: relative;
  width: 100%;
`,eo=e.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.text};
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1.5px solid
    ${({theme:o,$hasError:r,$isOpen:s})=>r?o.colors.danger:s?o.colors.borderFocus:o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  outline: none;
  cursor: ${({$isDisabled:o})=>o?"not-allowed":"pointer"};
  opacity: ${({$isDisabled:o})=>o?.6:1};
  transition: all ${({theme:o})=>o.transition.fast};
  user-select: none;

  &:focus-visible {
    border-color: ${({theme:o,$hasError:r})=>r?o.colors.danger:o.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({theme:o,$hasError:r})=>r?`${o.colors.danger}22`:`${o.colors.primary}22`};
  }

  ${({$isOpen:o,theme:r,$hasError:s})=>o&&l`
      box-shadow: 0 0 0 3px
        ${s?`${r.colors.danger}22`:`${r.colors.primary}22`};
    `}
`,to=e.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({theme:o,$isPlaceholder:r})=>r?o.colors.textMuted:o.colors.text};
`,so=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:o})=>o.colors.textMuted};
  transition: transform ${({theme:o})=>o.transition.fast};
  transform: ${({$isOpen:o})=>o?"rotate(180deg)":"rotate(0deg)"};
`,no=e.ul`
  position: fixed;
  z-index: 99999;
  max-height: 240px;
  overflow-y: auto;
  margin: 0;
  padding: 4px;
  list-style: none;
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};

  /* Scrollbar Styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({theme:o})=>o.colors.border};
    border-radius: 3px;
  }
`,io=e.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o,$isSelected:r,$isDisabled:s})=>s?o.colors.textMuted:r?o.colors.primary:o.colors.text};
  font-weight: ${({theme:o,$isSelected:r})=>r?o.fontWeight.semibold:o.fontWeight.normal};
  background-color: ${({theme:o,$isSelected:r})=>r?`${o.colors.primary}12`:"transparent"};
  border-radius: ${({theme:o})=>o.borderRadius.sm};
  cursor: ${({$isDisabled:o})=>o?"not-allowed":"pointer"};
  opacity: ${({$isDisabled:o})=>o?.55:1};
  transition: background-color ${({theme:o})=>o.transition.fast};
  user-select: none;

  &:hover {
    background-color: ${({theme:o,$isSelected:r,$isDisabled:s})=>s?"transparent":r?`${o.colors.primary}20`:o.colors.surfaceHover};
  }
`,ao=e.span`
  opacity: 0.65;
  font-size: 11px;
  margin-left: 6px;
`,lo=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,co=K.forwardRef(({label:o,options:r,value:s,defaultValue:c,onChange:p,placeholder:u="Select an option",error:h,fullWidth:k=!0,disabled:x=!1,name:w,id:S,style:z,className:f},j)=>{const[a,g]=i.useState(!1),[m,b]=i.useState(s!==void 0?s:c||""),[y,O]=i.useState({}),M=i.useRef(null),C=i.useRef(null),E=i.useRef(null);i.useEffect(()=>{s!==void 0&&b(s)},[s]);const v=i.useCallback(()=>{if(!C.current)return;const t=C.current.getBoundingClientRect(),d=window.innerHeight-t.bottom<220&&t.top>220;O({position:"fixed",left:`${t.left}px`,width:`${t.width}px`,zIndex:99999,...d?{bottom:`${window.innerHeight-t.top+4}px`,top:"auto",boxShadow:"0 -10px 25px -5px rgba(0, 0, 0, 0.2), 0 -8px 10px -6px rgba(0, 0, 0, 0.1)"}:{top:`${t.bottom+4}px`,bottom:"auto",boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"}})},[]);i.useEffect(()=>{if(!a)return;v();const t=()=>{v()};return window.addEventListener("scroll",t,!0),window.addEventListener("resize",t),()=>{window.removeEventListener("scroll",t,!0),window.removeEventListener("resize",t)}},[a,v]),i.useEffect(()=>{if(!a)return;const t=$=>{var W,H;const d=$.target,F=(W=M.current)==null?void 0:W.contains(d),A=(H=E.current)==null?void 0:H.contains(d);!F&&!A&&g(!1)};return document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t)}},[a]);const L=()=>{x||(a||v(),g(t=>!t))},R=r.find(t=>t.value===m),B=t=>{x||t.disabled||(b(t.value),g(!1),p&&p({target:{value:t.value,name:w}}))},P=t=>{x||(t.key==="Enter"||t.key===" "?(t.preventDefault(),L()):t.key==="Escape"&&g(!1))},I=S||`select-${Math.random().toString(36).slice(2,9)}`;return n.jsxs(_,{$fullWidth:k,style:z,className:f,ref:j,children:[o&&n.jsx(oo,{htmlFor:I,children:o}),n.jsxs(ro,{ref:M,children:[n.jsxs(eo,{ref:C,id:I,type:"button",$isOpen:a,$hasError:!!h,$isDisabled:x,disabled:x,onClick:L,onKeyDown:P,"aria-haspopup":"listbox","aria-expanded":a,children:[n.jsx(to,{$isPlaceholder:!R,children:R?R.label:u}),n.jsx(so,{$isOpen:a,children:n.jsx(N,{size:18})})]}),a&&V.createPortal(n.jsx(no,{ref:E,role:"listbox",style:y,children:r.map(t=>{const $=t.value===m,d=!!t.disabled;return n.jsxs(io,{role:"option","aria-selected":$,"aria-disabled":d,$isSelected:$,$isDisabled:d,onClick:()=>B(t),children:[n.jsxs("span",{children:[t.label,d&&n.jsx(ao,{children:"(Coming Soon)"})]}),$&&n.jsx(T,{size:16})]},t.value)})}),document.body)]}),h&&n.jsx(lo,{role:"alert",children:h})]})});co.displayName="Select";const fo=e.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:o})=>o.spacing.md};
  padding: ${({theme:o})=>o.spacing.md};
  flex-wrap: wrap;
`,go=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
`,bo=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
`,$o=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
`,ho=e.div`
  width: 80px;
`,mo=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
`,wo=e.button`
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o,$active:r})=>r?o.fontWeight.semibold:o.fontWeight.normal};
  color: ${({theme:o,$active:r})=>r?o.colors.textInverse:o.colors.textSecondary};
  background-color: ${({theme:o,$active:r})=>r?o.colors.primary:"transparent"};
  border: 1.5px solid
    ${({theme:o,$active:r})=>r?o.colors.primary:o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  cursor: pointer;
  transition: all ${({theme:o})=>o.transition.fast};

  &:hover:not(:disabled) {
    background-color: ${({theme:o,$active:r})=>r?o.colors.primaryHover:o.colors.surfaceHover};
    border-color: ${({theme:o,$active:r})=>r?o.colors.primaryHover:o.colors.textMuted};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,yo=e.div`
  width: 100%;
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.lg};
  background-color: ${({theme:o})=>o.colors.surface};
  overflow: hidden;
`,vo=e.div`
  width: 100%;
  overflow-x: auto;
`,ko=e.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({theme:o})=>o.fontSize.base};
`,So=e.thead`
  background-color: ${({theme:o})=>o.colors.background};
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};

  th {
    padding: 12px 24px;
    text-align: left;
    font-size: ${({theme:o})=>o.fontSize.sm};
    font-weight: ${({theme:o})=>o.fontWeight.semibold};
    color: ${({theme:o})=>o.colors.textSecondary};
    white-space: nowrap;
    user-select: none;
    min-width: 250px;
  }

  th.sortable {
    cursor: pointer;
    &:hover {
      color: ${({theme:o})=>o.colors.text};
    }
  }
`,zo=e.tbody`
  tr {
    border-bottom: 1px solid ${({theme:o})=>o.colors.border};
    transition: background-color ${({theme:o})=>o.transition.fast};

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: ${({theme:o})=>o.colors.surfaceHover};
    }
  }

  td {
    padding: 14px 24px;
    color: ${({theme:o})=>o.colors.text};
    vertical-align: middle;
    white-space: nowrap;
    min-width: 250px;
  }
`,jo=e.div`
  padding: ${({theme:o})=>o.spacing.xxxl} ${({theme:o})=>o.spacing.xl};
  text-align: center;
  color: ${({theme:o})=>o.colors.textSecondary};
  font-size: ${({theme:o})=>o.fontSize.base};
`,Co=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
`;e.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 6px;
  border-radius: 4px;
  color: ${({theme:o})=>o.colors.textSecondary};
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  cursor: pointer;
  transition: all ${({theme:o})=>o.transition.fast};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;const Ro=e.div`
  border-top: 1px solid ${({theme:o})=>o.colors.border};
`,po={default:l`
    background-color: ${({theme:o})=>o.colors.surfaceHover};
    color: ${({theme:o})=>o.colors.textSecondary};
  `,success:l`
    background-color: ${({theme:o})=>o.colors.successLight};
    color: ${({theme:o})=>o.colors.success};
  `,warning:l`
    background-color: ${({theme:o})=>o.colors.warningLight};
    color: ${({theme:o})=>o.colors.warning};
  `,danger:l`
    background-color: ${({theme:o})=>o.colors.dangerLight};
    color: ${({theme:o})=>o.colors.danger};
  `,info:l`
    background-color: ${({theme:o})=>o.colors.infoLight};
    color: ${({theme:o})=>o.colors.info};
  `,primary:l`
    background-color: ${({theme:o})=>o.colors.primaryLight};
    color: ${({theme:o})=>o.colors.primary};
  `},Mo=e.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  border-radius: ${({theme:o})=>o.borderRadius.full};
  white-space: nowrap;

  ${({$size:o})=>o==="sm"?l`
          font-size: 11px;
          padding: 2px 8px;
        `:l`
          font-size: ${({theme:r})=>r.fontSize.sm};
          padding: 3px 10px;
        `}

  ${({$variant:o})=>po[o]}
`,xo=q`
  from { opacity: 0; }
  to { opacity: 1; }
`,Eo=e.div`
  position: fixed;
  inset: 0;
  background-color: ${({theme:o})=>o.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({theme:o})=>o.zIndex.overlay};
  padding: ${({theme:o})=>o.spacing.lg};
  animation: ${xo} 0.15s ease;
`,Lo=e.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.xl};
  box-shadow: ${({theme:o})=>o.colors.shadowLg};
  width: 100%;
  max-width: ${({$size:o})=>o==="sm"?"400px":o==="md"?"560px":o==="xl"?"900px":o==="2xl"?"1140px":o==="3xl"?"1440px":"720px"};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: ${({theme:o})=>o.zIndex.modal};
`,Io=e.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:o})=>o.spacing.md};
  padding: ${({theme:o})=>o.spacing.xl};
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  flex-shrink: 0;
`,Wo=e.h2`
  font-size: ${({theme:o})=>o.fontSize.xl};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`,Ho=e.p`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin-top: 4px;
`,To=e.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  color: ${({theme:o})=>o.colors.textMuted};
  transition: all ${({theme:o})=>o.transition.fast};
  flex-shrink: 0;

  &:hover {
    background-color: ${({theme:o})=>o.colors.surfaceHover};
    color: ${({theme:o})=>o.colors.text};
  }
`,Do=e.div`
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
    background-color: ${({theme:o})=>o.colors.border};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({theme:o})=>o.colors.textMuted};
  }
`,Oo=e.div`
  padding: ${({theme:o})=>o.spacing.xl};
`,Bo=e.div`
  padding: ${({theme:o})=>o.spacing.lg} ${({theme:o})=>o.spacing.xl};
  border-top: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:o})=>o.spacing.sm};
  flex-shrink: 0;
`;export{Co as A,Z as C,Lo as M,Eo as O,fo as P,bo as R,co as S,yo as T,go as a,$o as b,ho as c,mo as d,wo as e,vo as f,ko as g,So as h,zo as i,jo as j,Ro as k,Mo as l,Io as m,Wo as n,Ho as o,To as p,Do as q,Oo as r,Bo as s};
