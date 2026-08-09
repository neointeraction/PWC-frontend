import{j as r,S as a,bG as l,g as e,aB as c}from"./index-DquQY_gK.js";import{T as x}from"./Tooltip-n1WJqe4o.js";const p=e.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`,d=e.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};

  a {
    color: ${({theme:o})=>o.colors.textSecondary};
    text-decoration: none;
    transition: color ${({theme:o})=>o.transition.fast};

    &:hover {
      color: ${({theme:o})=>o.colors.primary};
      text-decoration: none;
    }
  }

  &:last-child {
    color: ${({theme:o})=>o.colors.text};
    font-weight: ${({theme:o})=>o.fontWeight.medium};
  }
`,g=({items:o})=>r.jsx(p,{"aria-label":"Breadcrumb",children:o.map((t,i)=>r.jsxs(d,{children:[i>0&&r.jsx(a,{size:16}),t.href&&i<o.length-1?r.jsx(l,{to:t.href,children:t.label}):r.jsx("span",{children:t.label})]},i))}),f=e.div`
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,h=e.div`
  margin-bottom: ${({theme:o})=>o.spacing.xs};
`,m=e.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:o})=>o.spacing.md};
  flex-wrap: wrap;
`,$=e.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:o})=>o.spacing.md};
`,j=e.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,b=e.button`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  color: ${({theme:o})=>o.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({theme:o})=>o.transition.fast};
  flex-shrink: 0;
  margin-top: 2px;

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
  }
`,u=e.h1`
  font-size: ${({theme:o})=>o.fontSize.xxl};
  font-weight: ${({theme:o})=>o.fontWeight.bold};
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,y=e.p`
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,w=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.sm};
  flex-wrap: wrap;
`,z=({title:o,subtitle:t,breadcrumbs:i,actions:n,onBack:s})=>r.jsxs(f,{children:[i&&i.length>0&&r.jsx(h,{children:r.jsx(g,{items:i})}),r.jsxs(m,{children:[r.jsxs($,{children:[s&&r.jsx(x,{content:"Go back",children:r.jsx(b,{onClick:s,"aria-label":"Go back",children:r.jsx(c,{size:20})})}),r.jsxs(j,{children:[r.jsx(u,{children:o}),t&&r.jsx(y,{children:t})]})]}),n&&r.jsx(w,{children:n})]})]});export{z as P};
