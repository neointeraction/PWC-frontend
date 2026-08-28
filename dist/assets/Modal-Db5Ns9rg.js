import{g as r,bj as b,r as d,b1 as u,j as e,bO as m,b6 as f,m as g}from"./index-BVWJ6WpZ.js";const h=b`
  from { opacity: 0; }
  to { opacity: 1; }
`,y=r.div`
  position: fixed;
  inset: 0;
  background-color: ${({theme:o})=>o.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({theme:o})=>o.zIndex.overlay};
  padding: ${({theme:o})=>o.spacing.lg};
  animation: ${h} 0.15s ease;
`,$=r.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: ${({theme:o})=>o.borderRadius.xl};
  box-shadow: ${({theme:o})=>o.colors.shadowLg};
  width: 100%;
  max-width: ${({$size:o})=>o==="sm"?"400px":o==="md"?"560px":o==="xl"?"900px":o==="2xl"?"1140px":o==="3xl"?"1440px":"720px"};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: ${({theme:o})=>o.zIndex.modal};
`,k=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:o})=>o.spacing.md};
  padding: ${({theme:o})=>o.spacing.xl};
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  flex-shrink: 0;
`,v=r.h2`
  font-size: ${({theme:o})=>o.fontSize.xl};
  font-weight: ${({theme:o})=>o.fontWeight.semibold};
  color: ${({theme:o})=>o.colors.text};
`,j=r.p`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin-top: 4px;
`,w=r.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({theme:o})=>o.borderRadius.md};
  color: ${({theme:o})=>o.colors.textMuted};
  transition: all ${({theme:o})=>o.transition.fast};
  flex-shrink: 0;

  &:hover {
    background-color: ${({theme:o})=>o.colors.surfaceHover};
    color: ${({theme:o})=>o.colors.text};
  }
`,M=r.div`
  overflow-y: auto;
  flex: 1;

  /* Custom scrollbar flush against the right edge */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({theme:o})=>o.colors.border};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({theme:o})=>o.colors.textMuted};
  }
`,C=r.div`
  padding: ${({theme:o})=>o.spacing.xl};
`,E=r.div`
  padding: ${({theme:o})=>o.spacing.lg} ${({theme:o})=>o.spacing.xl};
  border-top: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:o})=>o.spacing.sm};
  flex-shrink: 0;
`,L=({isOpen:o,onClose:t,title:a,subtitle:l,size:c="md",footer:n,children:x,closeOnBackdrop:p=!0})=>{const s=d.useCallback(i=>{i.key==="Escape"&&t()},[t]);return d.useEffect(()=>(o&&(document.addEventListener("keydown",s),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",s),document.body.style.overflow=""}),[o,s]),u.createPortal(e.jsx(m,{children:o&&e.jsx(y,{onClick:p?t:void 0,role:"dialog","aria-modal":"true","aria-labelledby":"modal-title",children:e.jsx(f.div,{initial:{opacity:0,scale:.95,y:8},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:8},transition:{duration:.18,ease:"easeOut"},style:{width:"100%",display:"flex",justifyContent:"center"},onClick:i=>i.stopPropagation(),children:e.jsxs($,{$size:c,children:[(a||l)&&e.jsxs(k,{children:[e.jsxs("div",{children:[a&&e.jsx(v,{id:"modal-title",children:a}),l&&e.jsx(j,{children:l})]}),e.jsx(w,{onClick:t,"aria-label":"Close modal",children:e.jsx(g,{size:20})})]}),e.jsx(M,{children:e.jsx(C,{children:x})}),n&&e.jsx(E,{children:n})]})})})}),document.body)};export{L as M};
