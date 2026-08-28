import{j as e,i as c,g as r}from"./index-BVWJ6WpZ.js";import{B as l}from"./Breadcrumb-9LG9en0e.js";import{T as a}from"./Tooltip-C1eXP5zv.js";const p=r.div`
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,d=r.div`
  margin-bottom: ${({theme:o})=>o.spacing.xs};
`,x=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:o})=>o.spacing.md};
  flex-wrap: wrap;
`,g=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
`,f=r.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`,m=r.button`
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

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
  }
`,h=r.h1`
  font-size: ${({theme:o})=>o.fontSize.xxl};
  font-weight: ${({theme:o})=>o.fontWeight.bold};
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  line-height: 1.2;
`,j=r.p`
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,$=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.sm};
  flex-wrap: wrap;
`,w=({title:o,subtitle:i,breadcrumbs:t,actions:n,onBack:s})=>e.jsxs(p,{children:[t&&t.length>0&&e.jsx(d,{children:e.jsx(l,{items:t})}),e.jsxs(x,{children:[e.jsxs(g,{children:[s&&e.jsx(a,{content:"Go back",children:e.jsx(m,{onClick:s,"aria-label":"Go back",children:e.jsx(c,{size:20})})}),e.jsxs(f,{children:[e.jsx(h,{children:o}),i&&e.jsx(j,{children:i})]})]}),n&&e.jsx($,{children:n})]})]});export{w as P};
