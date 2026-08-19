import{bg as r,g as s}from"./index-MAFUjG_U.js";const a={default:r`
    background-color: ${({theme:o})=>o.colors.surfaceHover};
    color: ${({theme:o})=>o.colors.textSecondary};
  `,success:r`
    background-color: ${({theme:o})=>o.colors.successLight};
    color: ${({theme:o})=>o.colors.success};
  `,warning:r`
    background-color: ${({theme:o})=>o.colors.warningLight};
    color: ${({theme:o})=>o.colors.warning};
  `,danger:r`
    background-color: ${({theme:o})=>o.colors.dangerLight};
    color: ${({theme:o})=>o.colors.danger};
  `,info:r`
    background-color: ${({theme:o})=>o.colors.infoLight};
    color: ${({theme:o})=>o.colors.info};
  `,primary:r`
    background-color: ${({theme:o})=>o.colors.primaryLight};
    color: ${({theme:o})=>o.colors.primary};
  `},i=s.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  border-radius: ${({theme:o})=>o.borderRadius.full};
  white-space: nowrap;

  ${({$size:o})=>o==="sm"?r`
          font-size: 11px;
          padding: 2px 8px;
        `:r`
          font-size: ${({theme:c})=>c.fontSize.sm};
          padding: 3px 10px;
        `}

  ${({$variant:o})=>a[o]}
`;export{i as S};
