import{g as s,bi as u,a4 as $,j as t}from"./index-B6MU9CPz.js";const f=s.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({$fullWidth:o})=>o?"100%":"auto"};
`,g=s.label`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
`,b=s.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1.5px solid
    ${({theme:o,$hasError:r})=>r?o.colors.danger:o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  background-color: ${({theme:o})=>o.colors.surface};
  transition:
    border-color ${({theme:o})=>o.transition.fast},
    box-shadow ${({theme:o})=>o.transition.fast};

  &:focus-within {
    border-color: ${({theme:o,$hasError:r})=>r?o.colors.danger:o.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({theme:o,$hasError:r})=>r?`${o.colors.danger}22`:`${o.colors.primary}22`};
  }

  ${({$hasError:o})=>o&&u`
      background-color: ${({theme:r})=>r.colors.dangerLight};
    `}
`,h=s.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.text};
  padding: 9px 12px;
  width: 100%;

  &::placeholder {
    color: ${({theme:o})=>o.colors.textMuted};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`,a=s.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  color: ${({theme:o})=>o.colors.textMuted};
  flex-shrink: 0;
`,m=s.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,j=s.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
`,y=$.forwardRef(({label:o,error:r,hint:n,leftIcon:e,rightIcon:i,fullWidth:c=!0,id:d,...p},x)=>{const l=d||`input-${Math.random().toString(36).slice(2,9)}`;return t.jsxs(f,{$fullWidth:c,children:[o&&t.jsx(g,{htmlFor:l,children:o}),t.jsxs(b,{$hasError:!!r,children:[e&&t.jsx(a,{children:e}),t.jsx(h,{ref:x,id:l,...p}),i&&t.jsx(a,{children:i})]}),r&&t.jsx(m,{role:"alert",children:r}),!r&&n&&t.jsx(j,{children:n})]})});y.displayName="Input";export{y as I};
