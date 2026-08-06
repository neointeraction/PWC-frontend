import{g as n,j as s}from"./index-BIfikPqx.js";const l=n.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.lg};
  padding: ${({$padding:o,theme:r})=>o?o==="none"?"0":o in r.spacing?r.spacing[o]:o:r.spacing.xl};
  box-shadow: ${({theme:o})=>o.colors.shadow};
  transition:
    box-shadow ${({theme:o})=>o.transition.base},
    border-color ${({theme:o})=>o.transition.base};

  ${({$hoverable:o,theme:r})=>o&&`
    cursor: pointer;
    &:hover {
      box-shadow: ${r.colors.shadowMd};
      border-color: ${r.colors.textMuted};
    }
  `}
`,g=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({theme:o})=>o.spacing.lg};
  gap: ${({theme:o})=>o.spacing.md};
`,p=n.h2`
  font-size: ${({theme:o})=>o.fontSize.lg};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`,x=n.p`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin-top: 2px;
`,$=n.div``,b=n.div`
  margin-top: ${({theme:o})=>o.spacing.lg};
  padding-top: ${({theme:o})=>o.spacing.lg};
  border-top: 1px solid ${({theme:o})=>o.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:o})=>o.spacing.sm};
`,u=({title:o,subtitle:r,headerAction:i,footer:e,padding:t,hoverable:a,children:d,className:c})=>s.jsxs(l,{$padding:t,$hoverable:a,className:c,children:[(o||r||i)&&s.jsxs(g,{children:[s.jsxs("div",{children:[o&&s.jsx(p,{children:o}),r&&s.jsx(x,{children:r})]}),i]}),s.jsx($,{children:d}),e&&s.jsx(b,{children:e})]});export{u as C};
