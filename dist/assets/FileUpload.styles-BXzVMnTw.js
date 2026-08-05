import{r as p,j as t,F as f,ap as $,g as e,B as g,aR as u,aS as c}from"./index-BUalwBCD.js";import{M as b}from"./Modal-D3wpFGKR.js";const m=e.div`
  position: relative;
  display: flex;
  align-items: center;
`,h=e.input`
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
`,y=e.span`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${({theme:o})=>o.colors.textMuted};
  pointer-events: none;
`,w=e.button`
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
`,M=({value:o,onChange:r,placeholder:i="Search…",width:n,autoFocus:a})=>{const l=p.useRef(null);return p.useEffect(()=>{var s;a&&((s=l.current)==null||s.focus())},[a]),t.jsxs(m,{children:[t.jsx(y,{children:t.jsx(f,{size:18})}),t.jsx(h,{ref:l,$width:n,value:o,onChange:s=>r(s.target.value),placeholder:i,"aria-label":i}),o&&t.jsx(w,{onClick:()=>r(""),"aria-label":"Clear search",children:t.jsx($,{size:16})})]})};e.div`
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
`;const v=e.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:o})=>o.spacing.md};
`,z=e.p`
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.textSecondary};
  line-height: ${({theme:o})=>o.lineHeight.relaxed};
`,L=({isOpen:o,onClose:r,onConfirm:i,title:n,description:a,confirmLabel:l="Confirm",cancelLabel:s="Cancel",isLoading:d=!1,isDangerous:x=!1})=>t.jsx(b,{isOpen:o,onClose:r,title:n,size:"sm",footer:t.jsxs(t.Fragment,{children:[t.jsx(g,{variant:"secondary",onClick:r,disabled:d,children:s}),t.jsx(g,{variant:x?"danger":"primary",onClick:i,isLoading:d,children:l})]}),children:t.jsx(v,{children:a&&t.jsx(z,{children:a})})}),S=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({theme:o})=>o.spacing.xxxxl} ${({theme:o})=>o.spacing.xl};
  text-align: center;
  gap: ${({theme:o})=>o.spacing.md};
`,k=e.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({theme:o})=>o.colors.surfaceHover};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:o})=>o.colors.textMuted};
  margin-bottom: ${({theme:o})=>o.spacing.sm};
`,j=e.p`
  font-size: ${({theme:o})=>o.fontSize.md};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`,C=e.p`
  font-size: ${({theme:o})=>o.fontSize.base};
  color: ${({theme:o})=>o.colors.textSecondary};
  max-width: 360px;
`,I=({icon:o,title:r,description:i,action:n})=>t.jsxs(S,{children:[o&&t.jsx(k,{children:o}),t.jsx(j,{children:r}),i&&t.jsx(C,{children:i}),n]}),B=e.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.xs};
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
  margin-bottom: ${({theme:o})=>o.spacing.md};
  overflow-x: auto;
  overflow-y: hidden;
`,F=e.button`
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
`,E=e.span`
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
`,D=e(u.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({theme:o})=>o.colors.primary};
  border-radius: 4px 4px 0 0;
`,T=e.span`
  background-color: ${({theme:o,$active:r})=>r?o.colors.primaryLight:o.colors.surfaceHover};
  color: ${({theme:o,$active:r})=>r?o.colors.primary:o.colors.textMuted};
  font-size: ${({theme:o})=>o.fontSize.xs};
  font-weight: ${({theme:o})=>o.fontWeight.bold};
  padding: 2px 8px;
  border-radius: 4px;
`,U=e.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({theme:o})=>o.spacing.lg} ${({theme:o})=>o.spacing.xl};
`,H=e.div`
  display: flex;
  align-items: center;
  flex: 1;

  &:last-child {
    flex: 0;
  }
`,A=e.div`
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

  ${({$state:o,theme:r})=>o==="completed"&&c`
      background-color: ${r.colors.success};
      color: ${r.colors.textInverse};
      border: 1px solid ${r.colors.success};
    `}

  ${({$state:o,theme:r})=>o==="active"&&c`
      background-color: ${r.colors.primary};
      color: ${r.colors.textInverse};
      border: 1px solid ${r.colors.primary};
    `}

  ${({$state:o,theme:r})=>o==="upcoming"&&c`
      background-color: ${r.colors.surface};
      color: ${r.colors.textMuted};
      border: 1px solid ${r.colors.border};
    `}
`,q=e.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({theme:o})=>o.spacing.sm};
  min-width: 0;
`,N=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({$active:o,theme:r})=>o?r.fontWeight.semibold:r.fontWeight.medium};
  color: ${({$active:o,theme:r})=>o?r.colors.text:r.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Z=e.span`
  font-size: ${({theme:o})=>o.fontSize.xs};
  color: ${({theme:o})=>o.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,G=e.div`
  flex: 1;
  height: 2px;
  margin: 0 ${({theme:o})=>o.spacing.md};
  background-color: ${({$completed:o,theme:r})=>o?r.colors.success:r.colors.border};
  transition: background-color ${({theme:o})=>o.transition.base};
`,J=e.div`
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

  ${({$isDragOver:o,theme:r})=>o&&c`
      border-color: ${r.colors.primary};
      background-color: ${r.colors.primaryLight};
    `}

  ${({$hasFile:o,theme:r})=>o&&c`
      border-color: ${r.colors.success};
      border-style: solid;
    `}

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
  }
`,K=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({theme:o})=>o.colors.primary};
`,O=e.span`
  font-size: ${({theme:o})=>o.fontSize.base};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
  text-align: center;
`,P=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textMuted};
  text-align: center;
`,Q=e.span`
  color: ${({theme:o})=>o.colors.primary};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  text-decoration: underline;
  cursor: pointer;
`,V=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
  padding: ${({theme:o})=>o.spacing.md} ${({theme:o})=>o.spacing.lg};
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  margin-top: ${({theme:o})=>o.spacing.md};
`,X=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  background-color: ${({theme:o})=>o.colors.successLight};
  color: ${({theme:o})=>o.colors.success};
  flex-shrink: 0;
`,Y=e.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`,_=e.span`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,oo=e.span`
  font-size: ${({theme:o})=>o.fontSize.xs};
  color: ${({theme:o})=>o.colors.textMuted};
`,ro=e.button`
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
`,eo=e.div`
  display: flex;
  flex-direction: column;
`,to=e.label`
  font-size: ${({theme:o})=>o.fontSize.sm};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  color: ${({theme:o})=>o.colors.text};
  margin-bottom: ${({theme:o})=>o.spacing.sm};
`;export{D as A,Q as B,E as C,J as D,I as E,eo as F,ro as R,M as S,B as T,K as U,F as a,T as b,U as c,H as d,A as e,q as f,N as g,Z as h,G as i,to as j,O as k,P as l,V as m,X as n,Y as o,_ as p,oo as q,L as r};
