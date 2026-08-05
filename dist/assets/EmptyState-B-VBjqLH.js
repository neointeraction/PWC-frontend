import{r as l,j as t,J as d,V as x,g as e}from"./index-W65cpLBV.js";const p=e.div`
  position: relative;
  display: flex;
  align-items: center;
`,f=e.input`
  width: ${({$width:o})=>o||"260px"};
  height: 36px;
  padding: 0 36px 0 36px;
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.text};
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1.5px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  outline: none;
  transition:
    border-color ${({theme:o})=>o.transition.fast},
    box-shadow ${({theme:o})=>o.transition.fast};

  &::placeholder {
    color: ${({theme:o})=>o.colors.textMuted};
  }

  &:focus {
    border-color: ${({theme:o})=>o.colors.borderFocus};
    box-shadow: 0 0 0 3px ${({theme:o})=>o.colors.primary}22;
  }
`,u=e.span`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${({theme:o})=>o.colors.textMuted};
  pointer-events: none;
`,$=e.button`
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  color: ${({theme:o})=>o.colors.textMuted};
  padding: 2px;
  border-radius: ${({theme:o})=>o.borderRadius.sm};
  transition: color ${({theme:o})=>o.transition.fast};

  &:hover {
    color: ${({theme:o})=>o.colors.text};
  }
`,y=({value:o,onChange:s,placeholder:r="Search…",width:n,autoFocus:c})=>{const a=l.useRef(null);return l.useEffect(()=>{var i;c&&((i=a.current)==null||i.focus())},[c]),t.jsxs(p,{children:[t.jsx(u,{children:t.jsx(d,{size:18})}),t.jsx(f,{ref:a,$width:n,value:o,onChange:i=>s(i.target.value),placeholder:r,"aria-label":r}),o&&t.jsx($,{onClick:()=>s(""),"aria-label":"Clear search",children:t.jsx(x,{size:16})})]})},h=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({theme:o})=>o.spacing.xxxxl} ${({theme:o})=>o.spacing.xl};
  text-align: center;
  gap: ${({theme:o})=>o.spacing.md};
`,g=e.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({theme:o})=>o.colors.surfaceHover};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:o})=>o.colors.textMuted};
  margin-bottom: ${({theme:o})=>o.spacing.sm};
`,m=e.p`
  font-size: ${({theme:o})=>o.fontSize.md};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`,b=e.p`
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.textSecondary};
  max-width: 360px;
`,S=({icon:o,title:s,description:r,action:n})=>t.jsxs(h,{children:[o&&t.jsx(g,{children:o}),t.jsx(m,{children:s}),r&&t.jsx(b,{children:r}),n]});export{S as E,y as S};
