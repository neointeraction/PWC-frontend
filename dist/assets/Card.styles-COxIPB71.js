import{g as s}from"./index-DdWrmQ5m.js";const n=s.div`
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
`,e=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({theme:o})=>o.spacing.lg};
  gap: ${({theme:o})=>o.spacing.md};
`,a=s.h2`
  font-size: ${({theme:o})=>o.fontSize.lg};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`,i=s.p`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin-top: 2px;
`,c=s.div``,d=s.div`
  margin-top: ${({theme:o})=>o.spacing.lg};
  padding-top: ${({theme:o})=>o.spacing.lg};
  border-top: 1px solid ${({theme:o})=>o.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:o})=>o.spacing.sm};
`;export{n as C,e as a,a as b,i as c,c as d,d as e};
