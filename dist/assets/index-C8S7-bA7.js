import{g as i,a as d,r as p,j as s,B as x,q as m,z as h,t as g,G as u,v as f,U as y}from"./index-8F0JLEEw.js";import{P as j}from"./PageHeader-KpQVPwcf.js";import{C as n}from"./Card-NeciUoS1.js";import{T as S}from"./Table-De9tPJgC.js";import{B as v}from"./Badge-BUMvygFF.js";import{T as r}from"./Tooltip-K2tZS8Xo.js";import{P as b}from"./PreCounsellingAnswersModal-CntI2q7i.js";import"./Breadcrumb-BKyN92ya.js";import"./Card.styles-BzuSn5_T.js";import"./Checkbox-CuNKoPRx.js";import"./Select-DOe36KaS.js";import"./Table.styles-ChZe2G4O.js";import"./Badge.styles-DMnJVozC.js";import"./useQuery-C0nIzzYp.js";import"./Modal-CytuL-Vc.js";const C=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,$=i.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({theme:e})=>e.spacing.md};
  }
`,z=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,w=i.div`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({theme:e})=>e.fontSize.xxl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
`,A=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,k=i.h2`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,T=i.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,R=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`,I=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,M=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,B=i.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,E=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  tr:hover & {
    opacity: 1;
    visibility: visible;
  }
`,l=i.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,P=[{id:"sess-1",title:"Engineering & STEM Stream Selection",counselorName:"Sarah Jenkins",dateTime:"2026-08-12 10:00 AM",type:"1-on-1 Online Session",status:"scheduled"},{id:"sess-2",title:"Pre-Counselling Initial Assessment Review",counselorName:"Sarah Jenkins",dateTime:"2026-08-01 02:30 PM",type:"Assessment Review",status:"completed"}],Y=()=>{const e=d(t=>t.user),[a,o]=p.useState(!1),c=[{key:"title",header:"Session Title",render:t=>s.jsx("strong",{children:t.title})},{key:"counselorName",header:"Counselor"},{key:"dateTime",header:"Date & Time"},{key:"type",header:"Type"},{key:"status",header:"Status",render:t=>s.jsx(v,{variant:t.status==="scheduled"?"primary":"success",size:"sm",children:t.status==="scheduled"?"Scheduled":"Completed"})},{key:"actions",header:"Actions",render:t=>s.jsxs(E,{children:[t.status==="scheduled"&&s.jsx(r,{content:"Join Video Call",children:s.jsx(l,{"aria-label":"Join Call",children:s.jsx(f,{size:16})})}),s.jsx(r,{content:"View Session Details",children:s.jsx(l,{"aria-label":"View Details",children:s.jsx(y,{size:16})})})]})}];return s.jsxs(C,{children:[s.jsx(j,{title:"Counseling Overview",subtitle:"Manage your 1-on-1 counseling appointments, view session history, and review assessment inputs."}),s.jsxs($,{children:[s.jsxs(z,{children:[s.jsx(w,{children:"SJ"}),s.jsxs(A,{children:[s.jsx(k,{children:"Sarah Jenkins, M.Sc Psych"}),s.jsx(T,{children:"Assigned Senior Career Counselor • St. Xavier's High School"})]})]}),s.jsx(x,{variant:"secondary",size:"md",leftIcon:s.jsx(m,{size:18}),onClick:()=>o(!0),children:"View Assessment Answers"})]}),s.jsxs(R,{children:[s.jsx(n,{children:s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[s.jsx(h,{size:24,style:{color:"#5D2384"}}),s.jsxs("div",{children:[s.jsx("p",{style:{margin:0,fontSize:"12px",color:"#64748B"},children:"Assigned Counselor"}),s.jsx("h4",{style:{margin:0,fontSize:"16px",fontWeight:600},children:"Sarah Jenkins"})]})]})}),s.jsx(n,{children:s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[s.jsx(g,{size:24,style:{color:"#0284C7"}}),s.jsxs("div",{children:[s.jsx("p",{style:{margin:0,fontSize:"12px",color:"#64748B"},children:"Next Upcoming Session"}),s.jsx("h4",{style:{margin:0,fontSize:"16px",fontWeight:600},children:"Aug 12, 2026 @ 10:00 AM"})]})]})}),s.jsx(n,{children:s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[s.jsx(u,{size:24,style:{color:"#16A34A"}}),s.jsxs("div",{children:[s.jsx("p",{style:{margin:0,fontSize:"12px",color:"#64748B"},children:"Assessment Form"}),s.jsx("h4",{style:{margin:0,fontSize:"16px",fontWeight:600},children:"Submitted & Reviewed"})]})]})})]}),s.jsxs(I,{children:[s.jsx(M,{children:s.jsx(B,{children:"Your Counseling Sessions"})}),s.jsx(S,{data:P,columns:c,keyExtractor:t=>t.id})]}),s.jsx(b,{isOpen:a,onClose:()=>o(!1),studentId:(e==null?void 0:e.id)||"user-student-alex",studentName:(e==null?void 0:e.name)||"Alex Johnson"})]})};export{Y as StudentCounselingPage};
