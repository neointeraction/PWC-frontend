import{r as d,j as t,E as p,m as g,g as e,b6 as x,bi as s}from"./index-Bw790BVp.js";const $=e.div`
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
`,b=e.button`
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
`,z=({value:o,onChange:r,placeholder:i="Search…",width:c,autoFocus:a})=>{const l=d.useRef(null);return d.useEffect(()=>{var n;a&&((n=l.current)==null||n.focus())},[a]),t.jsxs($,{children:[t.jsx(u,{children:t.jsx(p,{size:18})}),t.jsx(f,{ref:l,$width:c,value:o,onChange:n=>r(n.target.value),placeholder:i,"aria-label":i}),o&&t.jsx(b,{onClick:()=>r(""),"aria-label":"Clear search",children:t.jsx(g,{size:16})})]})};e.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.lg};
  padding: ${({theme:o})=>o.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({theme:o})=>o.spacing.sm};
  box-shadow: ${({theme:o})=>o.colors.shadow};
  transition: box-shadow ${({theme:o})=>o.transition.base};

  &:hover {
    box-shadow: ${({theme:o})=>o.colors.shadowMd};
  }
`;e.div`
  width: 44px;
  height: 44px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  background-color: ${({$bgColor:o})=>o};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({theme:o})=>o.spacing.xs};
`;e.div`
  font-size: ${({theme:o})=>o.fontSize.display};
  font-weight: ${({theme:o})=>o.fontWeight.bold};
  color: ${({theme:o})=>o.colors.text};
  line-height: 1;
`;e.div`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
`;e.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o,$positive:r})=>r?o.colors.success:o.colors.danger};
  margin-top: 2px;
`;e.span`
  font-weight: ${({theme:o})=>o.fontWeight.normal};
`;const m=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({theme:o})=>o.spacing.xxxxl} ${({theme:o})=>o.spacing.xl};
  text-align: center;
  gap: ${({theme:o})=>o.spacing.md};
`,h=e.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({theme:o})=>o.colors.surfaceHover};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:o})=>o.colors.textMuted};
  margin-bottom: ${({theme:o})=>o.spacing.sm};
`,y=e.p`
  font-size: ${({theme:o})=>o.fontSize.md};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`,w=e.p`
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.textSecondary};
  max-width: 360px;
`,S=({icon:o,title:r,description:i,action:c})=>t.jsxs(m,{children:[o&&t.jsx(h,{children:o}),t.jsx(y,{children:r}),i&&t.jsx(w,{children:i}),c]}),k=e.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
  margin-bottom: ${({theme:o})=>o.spacing.md};
  overflow-x: auto;
  overflow-y: hidden;
`,j=e.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
  padding: ${({theme:o})=>o.spacing.md} ${({theme:o})=>o.spacing.lg};
  font-size: ${({theme:o})=>o.fontSize.base};
  font-weight: ${({theme:o,$active:r})=>r?o.fontWeight.semibold:o.fontWeight.medium};
  color: ${({theme:o,$active:r,$disabled:i})=>i?o.colors.textMuted:r?o.colors.primary:o.colors.textSecondary};
  border: none;
  background: transparent;
  cursor: ${({$disabled:o})=>o?"not-allowed":"pointer"};
  opacity: ${({$disabled:o})=>o?.7:1};
  white-space: nowrap;
  box-sizing: border-box;
  transition: color ${({theme:o})=>o.transition.fast};

  &:hover {
    color: ${({theme:o,$disabled:r})=>r?o.colors.textMuted:o.colors.primary};
  }
`,W=e.span`
  background-color: ${({theme:o})=>o.colors.warningLight};
  color: ${({theme:o})=>o.colors.warning};
  font-size: 10px;
  font-weight: ${({theme:o})=>o.fontWeight.bold};
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-left: 4px;
  line-height: 1;
`,R=e(x.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({theme:o})=>o.colors.primary};
  border-radius: 4px 4px 0 0;
`,L=e.span`
  background-color: ${({theme:o,$active:r})=>r?o.colors.primaryLight:o.colors.surfaceHover};
  color: ${({theme:o,$active:r})=>r?o.colors.primary:o.colors.textMuted};
  font-size: ${({theme:o})=>o.fontSize.xs};
  font-weight: ${({theme:o})=>o.fontWeight.bold};
  padding: 2px 8px;
  border-radius: 4px;
`,M=e.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({theme:o})=>o.spacing.lg} ${({theme:o})=>o.spacing.xl};
`,C=e.div`
  display: flex;
  align-items: center;
  flex: 1;

  &:last-child {
    flex: 0;
  }
`,I=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  flex-shrink: 0;
  transition: all ${({theme:o})=>o.transition.base};

  ${({$state:o,theme:r})=>o==="completed"&&s`
      background-color: ${r.colors.success};
      color: ${r.colors.textInverse};
      border: 1px solid ${r.colors.success};
    `}

  ${({$state:o,theme:r})=>o==="active"&&s`
      background-color: ${r.colors.primary};
      color: ${r.colors.textInverse};
      border: 1px solid ${r.colors.primary};
    `}

  ${({$state:o,theme:r})=>o==="upcoming"&&s`
      background-color: ${r.colors.surface};
      color: ${r.colors.textMuted};
      border: 1px solid ${r.colors.border};
    `}
`,E=e.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({theme:o})=>o.spacing.sm};
  min-width: 0;
`,B=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({$active:o,theme:r})=>o?r.fontWeight.semibold:r.fontWeight.medium};
  color: ${({$active:o,theme:r})=>o?r.colors.text:r.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,F=e.span`
  font-size: ${({theme:o})=>o.fontSize.xs};
  color: ${({theme:o})=>o.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,T=e.div`
  flex: 1;
  height: 2px;
  margin: 0 ${({theme:o})=>o.spacing.md};
  background-color: ${({$completed:o,theme:r})=>o?r.colors.success:r.colors.border};
  transition: background-color ${({theme:o})=>o.transition.base};
`,U=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme:o})=>o.spacing.md};
  padding: ${({theme:o})=>o.spacing.xxl} ${({theme:o})=>o.spacing.xl};
  border: 2px dashed ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  background-color: ${({theme:o})=>o.colors.surface};
  cursor: pointer;
  transition: all ${({theme:o})=>o.transition.base};

  ${({$isDragOver:o,theme:r})=>o&&s`
      border-color: ${r.colors.primary};
      background-color: ${r.colors.primaryLight};
    `}

  ${({$hasFile:o,theme:r})=>o&&s`
      border-color: ${r.colors.success};
      border-style: solid;
    `}

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
  }
`,D=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({theme:o})=>o.colors.primary};
`,H=e.span`
  font-size: ${({theme:o})=>o.fontSize.base};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
  text-align: center;
`,A=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textMuted};
  text-align: center;
`,q=e.span`
  color: ${({theme:o})=>o.colors.primary};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  text-decoration: underline;
  cursor: pointer;
`,N=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
  padding: ${({theme:o})=>o.spacing.md} ${({theme:o})=>o.spacing.lg};
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  margin-top: ${({theme:o})=>o.spacing.md};
`,Z=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  background-color: ${({theme:o})=>o.colors.successLight};
  color: ${({theme:o})=>o.colors.success};
  flex-shrink: 0;
`,G=e.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`,J=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,K=e.span`
  font-size: ${({theme:o})=>o.fontSize.xs};
  color: ${({theme:o})=>o.colors.textMuted};
`,O=e.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  border: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  color: ${({theme:o})=>o.colors.textMuted};
  cursor: pointer;
  flex-shrink: 0;
  transition: all ${({theme:o})=>o.transition.fast};

  &:hover {
    border-color: ${({theme:o})=>o.colors.danger};
    color: ${({theme:o})=>o.colors.danger};
    background-color: ${({theme:o})=>o.colors.dangerLight};
  }
`,P=e.div`
  display: flex;
  flex-direction: column;
`,Q=e.label`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
  margin-bottom: ${({theme:o})=>o.spacing.sm};
`;export{R as A,q as B,W as C,U as D,S as E,P as F,O as R,z as S,k as T,D as U,j as a,L as b,M as c,C as d,I as e,E as f,B as g,F as h,T as i,Q as j,H as k,A as l,N as m,Z as n,G as o,J as p,K as q};
