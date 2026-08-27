import{j as o,P as n,bN as s,g as t}from"./index-CQIsxyVc.js";const l=t.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`,c=t.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({theme:r})=>r.fontSize.sm};
  color: ${({theme:r})=>r.colors.textSecondary};

  a {
    color: ${({theme:r})=>r.colors.textSecondary};
    text-decoration: none;
    transition: color ${({theme:r})=>r.transition.fast};

    &:hover {
      color: ${({theme:r})=>r.colors.primary};
      text-decoration: none;
    }
  }

  &:last-child {
    color: ${({theme:r})=>r.colors.text};
    font-weight: ${({theme:r})=>r.fontWeight.medium};
  }
`,x=({items:r})=>o.jsx(l,{"aria-label":"Breadcrumb",children:r.map((e,a)=>o.jsxs(c,{children:[a>0&&o.jsx(n,{size:16}),e.href&&a<r.length-1?o.jsx(s,{to:e.href,children:e.label}):o.jsx("span",{children:e.label})]},a))});export{x as B};
