import{j as r,aO as a,g as e}from"./index-B6MU9CPz.js";import{B as l}from"./Breadcrumb-C7lv3now.js";import{T as c}from"./Tooltip-BaOOZ4TY.js";const p=e.div`
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,x=e.div`
  margin-bottom: ${({theme:o})=>o.spacing.xs};
`,d=e.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({theme:o})=>o.spacing.md};
  flex-wrap: wrap;
`,g=e.div`
  display: flex;
  align-items: flex-start;
  gap: ${({theme:o})=>o.spacing.md};
`,f=e.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,m=e.button`
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
`,h=e.h1`
  font-size: ${({theme:o})=>o.fontSize.xxl};
  font-weight: ${({theme:o})=>o.fontWeight.bold};
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,$=e.p`
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,j=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.sm};
  flex-wrap: wrap;
`,w=({title:o,subtitle:i,breadcrumbs:t,actions:s,onBack:n})=>r.jsxs(p,{children:[t&&t.length>0&&r.jsx(x,{children:r.jsx(l,{items:t})}),r.jsxs(d,{children:[r.jsxs(g,{children:[n&&r.jsx(c,{content:"Go back",children:r.jsx(m,{onClick:n,"aria-label":"Go back",children:r.jsx(a,{size:20})})}),r.jsxs(f,{children:[r.jsx(h,{children:o}),i&&r.jsx($,{children:i})]})]}),s&&r.jsx(j,{children:s})]})]});export{w as P};
