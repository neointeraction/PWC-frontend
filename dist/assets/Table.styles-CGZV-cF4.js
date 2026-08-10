import{g as r,aV as b,r as i,j as t,bs as k,f as z}from"./index-D-K1gLqS.js";const j=r.div`
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
`,C=r.label`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.sm};
  cursor: ${({$disabled:o})=>o?"not-allowed":"pointer"};
  opacity: ${({$disabled:o})=>o?.6:1};
  user-select: none;
`,$=r.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`,R=r.div`
  width: 18px;
  height: 18px;
  border-radius: ${({theme:o})=>o.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({theme:o})=>o.transition.fast};
  flex-shrink: 0;

  ${({theme:o,$checked:e,$indeterminate:s,$hasError:n})=>e||s?b`
          background-color: ${n?o.colors.danger:o.colors.primary};
          border: 1.5px solid ${n?o.colors.danger:o.colors.primary};
          color: #ffffff;
        `:b`
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
      ${({theme:o,$hasError:e})=>e?`${o.colors.danger}22`:`${o.colors.primary}22`};
    border-color: ${({theme:o,$hasError:e})=>e?o.colors.danger:o.colors.primary};
  }
`,H=r.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.text};
  line-height: 1.4;
`,T=r.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,W=i.forwardRef(({label:o,error:e,checked:s,defaultChecked:n=!1,indeterminate:a=!1,disabled:c=!1,id:u,className:y,style:h,onChange:p,...m},v)=>{const l=i.useRef(null);i.useImperativeHandle(v,()=>l.current);const[w,x]=i.useState(s!==void 0?s:n);i.useEffect(()=>{s!==void 0&&x(s)},[s]),i.useEffect(()=>{l.current&&(l.current.indeterminate=!!a)},[a]);const S=f=>{c||(s===void 0&&x(f.target.checked),p&&p(f))},g=u||`checkbox-${Math.random().toString(36).slice(2,9)}`,d=s!==void 0?s:w;return t.jsxs(j,{children:[t.jsxs(C,{$disabled:c,htmlFor:g,className:y,style:h,children:[t.jsx($,{ref:l,type:"checkbox",id:g,checked:d,disabled:c,onChange:S,...m}),t.jsx(R,{$checked:d,$indeterminate:a,$hasError:!!e,$disabled:c,children:a?t.jsx(k,{size:14}):d&&t.jsx(z,{size:14})}),o&&t.jsx(H,{children:o})]}),e&&t.jsx(T,{role:"alert",children:e})]})});W.displayName="Checkbox";const I=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:o})=>o.spacing.md};
  padding: ${({theme:o})=>o.spacing.md};
  flex-wrap: wrap;
`,E=r.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
`,L=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
`,B=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
`,M=r.div`
  width: 80px;
`,A=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
`,G=r.button`
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o,$active:e})=>e?o.fontWeight.semibold:o.fontWeight.normal};
  color: ${({theme:o,$active:e})=>e?o.colors.textInverse:o.colors.textSecondary};
  background-color: ${({theme:o,$active:e})=>e?o.colors.primary:"transparent"};
  border: 1.5px solid
    ${({theme:o,$active:e})=>e?o.colors.primary:o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  cursor: pointer;
  transition: all ${({theme:o})=>o.transition.fast};

  &:hover:not(:disabled) {
    background-color: ${({theme:o,$active:e})=>e?o.colors.primaryHover:o.colors.surfaceHover};
    border-color: ${({theme:o,$active:e})=>e?o.colors.primaryHover:o.colors.textMuted};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,F=r.div`
  width: 100%;
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.lg};
  background-color: ${({theme:o})=>o.colors.surface};
  overflow: hidden;
`,N=r.div`
  width: 100%;
  overflow-x: auto;
`,O=r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({theme:o})=>o.fontSize.base};
`,V=r.thead`
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
`,q=r.tbody`
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
`,D=r.div`
  padding: ${({theme:o})=>o.spacing.xxxl} ${({theme:o})=>o.spacing.xl};
  text-align: center;
  color: ${({theme:o})=>o.colors.textSecondary};
  font-size: ${({theme:o})=>o.fontSize.base};
`,J=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
`;r.button`
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
`;const K=r.div`
  border-top: 1px solid ${({theme:o})=>o.colors.border};
`;export{J as A,W as C,I as P,L as R,M as S,F as T,E as a,B as b,A as c,G as d,N as e,O as f,V as g,q as h,D as i,K as j};
