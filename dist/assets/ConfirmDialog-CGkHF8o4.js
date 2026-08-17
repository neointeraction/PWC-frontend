import{j as n,B as s,g as a}from"./index-DxfnM77Y.js";import{M as m}from"./Modal-C42QGbOr.js";const f=a.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,h=a.p`
  font-size: ${({theme:e})=>e.fontSize.base};
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: ${({theme:e})=>e.lineHeight.relaxed};
`,j=({isOpen:e,onClose:i,onConfirm:t,title:l,description:r,confirmLabel:c="Confirm",cancelLabel:d="Cancel",isLoading:o=!1,isDangerous:x=!1})=>n.jsx(m,{isOpen:e,onClose:i,title:l,size:"sm",footer:n.jsxs(n.Fragment,{children:[n.jsx(s,{variant:"secondary",onClick:i,disabled:o,children:d}),n.jsx(s,{variant:x?"danger":"primary",onClick:t,isLoading:o,children:c})]}),children:n.jsx(f,{children:r&&n.jsx(h,{children:r})})});export{j as C};
