import{g as r}from"./index-BZPOwNvj.js";const i=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:o})=>o.spacing.md};
  padding: ${({theme:o})=>o.spacing.md};
  flex-wrap: wrap;
`,s=r.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
`,a=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
`,n=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
`,c=r.div`
  width: 80px;
`,l=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
`,d=r.button`
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o,$active:t})=>t?o.fontWeight.semibold:o.fontWeight.normal};
  color: ${({theme:o,$active:t})=>t?o.colors.textInverse:o.colors.textSecondary};
  background-color: ${({theme:o,$active:t})=>t?o.colors.primary:"transparent"};
  border: 1.5px solid
    ${({theme:o,$active:t})=>t?o.colors.primary:o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  cursor: pointer;
  transition: all ${({theme:o})=>o.transition.fast};

  &:hover:not(:disabled) {
    background-color: ${({theme:o,$active:t})=>t?o.colors.primaryHover:o.colors.surfaceHover};
    border-color: ${({theme:o,$active:t})=>t?o.colors.primaryHover:o.colors.textMuted};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,p=r.div`
  width: 100%;
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.lg};
  background-color: ${({theme:o})=>o.colors.surface};
  overflow: hidden;
`,g=r.div`
  width: 100%;
  overflow-x: auto;
`,b=r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({theme:o})=>o.fontSize.base};
`,x=r.thead`
  background-color: ${({theme:o})=>o.colors.background};
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};

  th {
    padding: 10px 14px;
    text-align: left;
    font-size: ${({theme:o})=>o.fontSize.xs};
    font-weight: ${({theme:o})=>o.fontWeight.semibold};
    color: ${({theme:o})=>o.colors.textSecondary};
    white-space: nowrap;
    user-select: none;
  }

  th.sortable {
    cursor: pointer;
    &:hover {
      color: ${({theme:o})=>o.colors.text};
    }
  }
`,$=r.tbody`
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
    padding: 12px 14px;
    color: ${({theme:o})=>o.colors.text};
    vertical-align: middle;
    white-space: nowrap;
  }
`,f=r.div`
  padding: ${({theme:o})=>o.spacing.xxxl} ${({theme:o})=>o.spacing.xl};
  text-align: center;
  color: ${({theme:o})=>o.colors.textSecondary};
  font-size: ${({theme:o})=>o.fontSize.base};
`,u=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  tr:hover & {
    opacity: 1;
    visibility: visible;
  }
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
`;const y=r.div`
  border-top: 1px solid ${({theme:o})=>o.colors.border};
`;export{u as A,i as P,a as R,c as S,p as T,s as a,n as b,l as c,d,g as e,b as f,x as g,$ as h,f as i,y as j};
