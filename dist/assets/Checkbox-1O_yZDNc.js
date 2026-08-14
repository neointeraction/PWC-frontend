import{g as c,bi as g,r as i,j as e,bJ as m,h as R}from"./index-B52Ksvv0.js";const z=c.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`,S=c.label`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.sm};
  cursor: ${({$disabled:o})=>o?"not-allowed":"pointer"};
  opacity: ${({$disabled:o})=>o?.6:1};
  user-select: none;
`,$=c.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`,w=c.div`
  width: 18px;
  height: 18px;
  border-radius: ${({theme:o})=>o.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({theme:o})=>o.transition.fast};
  flex-shrink: 0;

  ${({theme:o,$checked:s,$indeterminate:r,$hasError:n})=>s||r?g`
          background-color: ${n?o.colors.danger:o.colors.primary};
          border: 1.5px solid ${n?o.colors.danger:o.colors.primary};
          color: #ffffff;
        `:g`
          background-color: ${o.colors.surface};
          border: 1.5px solid ${n?o.colors.danger:o.colors.border};
          color: transparent;

          &:hover {
            border-color: ${n?o.colors.danger:o.colors.primary};
            background-color: ${o.colors.surfaceHover};
          }
        `}

  ${$}:focus-visible + & {
    box-shadow: 0 0 0 3px
      ${({theme:o,$hasError:s})=>s?`${o.colors.danger}22`:`${o.colors.primary}22`};
    border-color: ${({theme:o,$hasError:s})=>s?o.colors.danger:o.colors.primary};
  }
`,I=c.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.text};
  line-height: 1.4;
`,E=c.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,H=i.forwardRef(({label:o,error:s,checked:r,defaultChecked:n=!1,indeterminate:t=!1,disabled:l=!1,id:b,className:h,style:y,onChange:f,...j},v)=>{const a=i.useRef(null);i.useImperativeHandle(v,()=>a.current);const[k,p]=i.useState(r!==void 0?r:n);i.useEffect(()=>{r!==void 0&&p(r)},[r]),i.useEffect(()=>{a.current&&(a.current.indeterminate=!!t)},[t]);const C=u=>{l||(r===void 0&&p(u.target.checked),f&&f(u))},x=b||`checkbox-${Math.random().toString(36).slice(2,9)}`,d=r!==void 0?r:k;return e.jsxs(z,{children:[e.jsxs(S,{$disabled:l,htmlFor:x,className:h,style:y,children:[e.jsx($,{ref:a,type:"checkbox",id:x,checked:d,disabled:l,onChange:C,...j}),e.jsx(w,{$checked:d,$indeterminate:t,$hasError:!!s,$disabled:l,children:t?e.jsx(m,{size:14}):d&&e.jsx(R,{size:14})}),o&&e.jsx(I,{children:o})]}),s&&e.jsx(E,{role:"alert",children:s})]})});H.displayName="Checkbox";export{H as C};
