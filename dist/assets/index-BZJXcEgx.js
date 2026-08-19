import{g as s,az as K,u as W,e as q,r as d,j as o,c as T,i as Y,B as F,aA as Z,M as Q,ay as X,aw as M,aB as ee}from"./index-MAFUjG_U.js";import{P as oe}from"./PageHeader-D7aOULUx.js";import{C as te}from"./Card-_60JNZUT.js";import{T as se}from"./Table-LOmb570M.js";import"./Input-kxkCRs14.js";import"./Select-D9CY3fX3.js";import"./Badge.styles-uAjA-8ND.js";import"./Table.styles-D3L88ciL.js";import"./FileUpload.styles-CCVUfS9-.js";import"./Breadcrumb-kbAjTRnF.js";import"./Modal-BNANDCMU.js";import"./ConfirmDialog-CPd-14ea.js";import"./Checkbox-Alt7KLrZ.js";import{A as ne}from"./AlertModal-DYKa_098.js";import{T as re}from"./Tooltip-DfKLnnTN.js";import"./SuccessModal.styles-CMTZ9RZo.js";import{m as z}from"./project.service-CnUVwu11.js";import{E as ie}from"./EditProjectModal-DKcnXW4V.js";import{L as ae}from"./LogCallModal-B0W12T8G.js";import"./Card.styles-BiOCYGMp.js";import"./SuccessModal-BDGY-BcE.js";import"./counselors.mock-CbyQmpLX.js";import"./useMutation-CPD0zMc8.js";import"./DatePicker-Drx8aRqO.js";import"./Badge-Bnm96zIe.js";const le=s.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,de=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`,ce=s.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`,pe=s.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,ge=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,xe=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,ue=s.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,he=s.span`
  background-color: rgba(245, 158, 11, 0.12);
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`,me=s.span`
  background-color: ${({theme:e})=>e.colors.successLight};
  color: ${({theme:e})=>e.colors.success};
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,fe=s.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
  flex-wrap: wrap;
`,ye=s.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,be=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,je=s.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`,$=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=s.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
`,w=s.span`
  font-size: 28px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
`,Se=s.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 8px 0 0 0;
`,ke=s.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`,$e=s.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`,C=s.button`
  background-color: ${({theme:e,$isActive:r})=>r?e.colors.primaryLight:e.colors.surface};
  border: 1px solid
    ${({theme:e,$isActive:r})=>r?e.colors.primary:e.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,A=s.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
`,_=s.span`
  font-size: 24px;
  font-weight: 800;
  color: ${({$color:e,theme:r})=>e||r.colors.text};
`,ve=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,we=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({theme:e})=>e.colors.background};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`,Ce=s.div`
  display: flex;
  flex-direction: column;
`,Ae=s.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: none;
  background-color: ${({$isSelected:e,theme:r})=>e?r.colors.primaryLight:"transparent"};
  color: ${({theme:e})=>e.colors.text};
  font-size: 13px;
  font-weight: ${({$isSelected:e})=>e?700:500};
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({theme:e,$isSelected:r})=>r?e.colors.primaryLight:e.colors.surfaceHover};
  }
`,_e=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Pe=s.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:e,$isFlagged:r})=>r?e.colors.danger:e.colors.text};
`,Le=s.div`
  padding: 14px 16px;
  background-color: ${({theme:e})=>e.colors.background};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  font-size: 12px;
  line-height: 1.5;
  color: ${({theme:e})=>e.colors.textSecondary};
`,Ie=s.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  tr:hover & {
    opacity: 1;
    visibility: visible;
  }
`,De=s.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,Te=s.span`
  font-weight: 700;
  color: ${({$days:e,theme:r})=>e>=5?r.colors.danger:r.colors.text};
`,P=["Aarav","Aditya","Ananya","Devika","Diya","Ishaan","Kabir","Meera","Pooja","Priya","Rahul","Rhea","Rohan","Sana","Siddharth","Tanvi","Varun","Vihaan","Yash","Zoya","Karan","Aryan","Neha","Shreya","Nikhil","Gaurav","Manish","Kavya","Deepak","Sanjay","Arjun","Pranav"],L=["Sharma","Patel","Nair","Menon","Verma","Gupta","Iyer","Deshmukh","Kulkarni","Rao","Farooqui","Sheikh","Joshi","Bhat","Hegde","Kapoor","Singhania","Khan","Reddy","Chopra","Malhotra","Bose","Mukherjee","Das"],N=[{key:"login_activated",label:"Login Activated",pending:10,isFlagged:!0},{key:"profile_completed",label:"Profile Completed",pending:22,isFlagged:!1},{key:"pre_counselling_student",label:"Pre-Counselling — Student",pending:23,isFlagged:!1},{key:"pre_counselling_parent",label:"Pre-Counselling — Parent",pending:28,isFlagged:!1},{key:"assessment_completed",label:"Assessment Completed",pending:29,isFlagged:!0},{key:"session_booked",label:"Session Booked",pending:45,isFlagged:!1},{key:"session_1_completed",label:"Session 1 Completed",pending:55,isFlagged:!0},{key:"session_2_completed",label:"Session 2 Completed",pending:66,isFlagged:!1},{key:"feedback_student",label:"Feedback — Student",pending:68,isFlagged:!1},{key:"feedback_parent",label:"Feedback — Parent",pending:71,isFlagged:!1},{key:"report_downloaded",label:"Report Downloaded",pending:12,isFlagged:!1}],I=["Not called","1 day ago","2 days ago","3 days ago","4 days ago"],Fe=(e,r,c)=>{const p=[];for(let n=0;n<c;n++){const f=P[(n*3+e.length)%P.length],h=L[(n*2+e.length)%L.length],g=100+(n*7+e.charCodeAt(0))%899,y=(n+e.length)%7+1,i=I[(n+e.length)%I.length];p.push({id:`${e}-${n+1}`,studentId:`ST${g}`,studentName:`${f} ${h}`,stageKey:e,stuckAtStage:r,daysAgeing:y,lastCall:i})}return p},Ne=(e,r)=>{const c=[],p=["Pre-Counselling (Parent)","Assessment","Session 1 Missed","Session 2 Missed","Session Booking","Report Download","Profile Completed"];for(let n=0;n<r;n++){const f=P[(n*5+e.length)%P.length],h=L[(n*3+e.length)%L.length],g=200+(n*11+e.charCodeAt(0))%799,y=e==="missed_session_1"?"Session 1 Missed":e==="missed_session_2"?"Session 2 Missed":p[n%p.length],i=e==="overdue"?3+n%6:(n+2)%5+1,x=I[n%I.length];c.push({id:`${e}-${n+1}`,studentId:`ST${g}`,studentName:`${f} ${h}`,stageKey:e,stuckAtStage:y,daysAgeing:i,lastCall:x})}return c},ao=()=>{const{projectId:e}=K(),r=W(),c=q(),[p,n]=d.useState(!1),[f,h]=d.useState(!1),[g,y]=d.useState("login_activated"),[i,x]=d.useState(null),[a,R]=d.useState(null),[D,u]=d.useState(1),[b,E]=d.useState(10),l=z.find(t=>t.id===e)||z[0],O=()=>{h(!0)},B=()=>{const t=`Project Stage-Wise Progress Report
Project Name,${l.name}
Institute,${l.instituteName}
Location,${l.location||"Mumbai, Maharashtra"}
Period,01 Aug 2026 – 31 Oct 2026

Student ID,Student Name,Stuck at Stage,Days Ageing,Last Call
`+j.map(k=>`${k.studentId},${k.studentName},${k.stuckAtStage},${k.daysAgeing},${k.lastCall}`).join(`
`),m=new Blob([t],{type:"text/csv;charset=utf-8;"}),J=URL.createObjectURL(m),S=document.createElement("a");S.setAttribute("href",J),S.setAttribute("download",`${l.name.replace(/\s+/g,"_")}_Progress_Report.csv`),document.body.appendChild(S),S.click(),document.body.removeChild(S),c.success("Report Exported","Downloaded stage-wise project report CSV.")},H=()=>{n(!1),c.warning("Project Deleted",`${l.name} has been removed.`),r(T.PROJECTS)},j=d.useMemo(()=>{if(i)return Ne(i,{follow_up_today:57,overdue:18,missed_session_1:3,missed_session_2:9}[i]||10);const t=N.find(m=>m.key===g)||N[0];return Fe(t.key,t.label,t.pending)},[g,i]),U=d.useMemo(()=>{const t=(D-1)*b;return j.slice(t,t+b)},[j,D,b]),G=Math.ceil(j.length/b),V=[{key:"studentId",header:"Student ID",accessor:"studentId",width:"120px"},{key:"studentName",header:"Student",accessor:"studentName",render:t=>o.jsx("strong",{children:t.studentName})},{key:"stuckAtStage",header:"Stuck at stage",accessor:"stuckAtStage"},{key:"daysAgeing",header:"Days Ageing",accessor:"daysAgeing",render:t=>o.jsx(Te,{$days:t.daysAgeing,children:t.daysAgeing})},{key:"lastCall",header:"Last call",accessor:"lastCall"},{key:"action",header:"Action",width:"80px",render:t=>o.jsx(Ie,{children:o.jsx(re,{content:"Log Call",children:o.jsx(De,{type:"button","aria-label":"Log Call",onClick:()=>{R(t)},children:o.jsx(ee,{size:16})})})})}];return o.jsxs(le,{children:[o.jsx(oe,{title:"",breadcrumbs:[{label:"Projects",href:T.PROJECTS},{label:l.name}]}),o.jsxs(de,{children:[o.jsxs(ce,{children:[o.jsx(pe,{type:"button",onClick:()=>r(T.PROJECTS),"aria-label":"Back to Projects",children:o.jsx(Y,{size:18})}),o.jsxs(ge,{children:[o.jsxs(xe,{children:[o.jsx(ue,{children:l.instituteName}),o.jsx(he,{children:"INS001"}),o.jsx(me,{children:"Ongoing"})]}),o.jsxs(fe,{children:[o.jsx("span",{children:l.location||"Mumbai, Maharashtra"}),o.jsx("span",{children:"•"}),o.jsx(ye,{children:"Period : 01 Aug, 2026 – 31 Oct, 2026"})]})]})]}),o.jsxs(be,{children:[o.jsx(F,{variant:"secondary",size:"sm",leftIcon:o.jsx(Z,{size:16}),onClick:O,children:"Extend Project"}),o.jsx(F,{variant:"danger",size:"sm",leftIcon:o.jsx(Q,{size:16}),onClick:()=>n(!0),children:"Delete project"}),o.jsx(F,{variant:"primary",size:"sm",leftIcon:o.jsx(X,{size:16}),onClick:B,children:"Export Report"})]})]}),o.jsxs(je,{children:[o.jsxs($,{children:[o.jsx(v,{children:"Counsellors"}),o.jsx(w,{children:"44"})]}),o.jsxs($,{children:[o.jsx(v,{children:"Total Students"}),o.jsx(w,{children:"350"})]}),o.jsxs($,{children:[o.jsx(v,{children:"Total Days"}),o.jsx(w,{children:"95"})]}),o.jsxs($,{children:[o.jsx(v,{children:"Remaining Days"}),o.jsx(w,{children:"15"})]})]}),o.jsx(Se,{children:"Stage Wise Progress"}),o.jsxs($e,{children:[o.jsxs(C,{type:"button",$isActive:i==="follow_up_today",onClick:()=>{x(t=>t==="follow_up_today"?null:"follow_up_today"),u(1)},children:[o.jsx(A,{children:"Follow-up today"}),o.jsx(_,{$color:"#5D2384",children:"57"})]}),o.jsxs(C,{type:"button",$isActive:i==="overdue",onClick:()=>{x(t=>t==="overdue"?null:"overdue"),u(1)},children:[o.jsx(A,{children:"Overdue (> 2 days)"}),o.jsx(_,{$color:"#DC2626",children:"18"})]}),o.jsxs(C,{type:"button",$isActive:i==="missed_session_1",onClick:()=>{x(t=>t==="missed_session_1"?null:"missed_session_1"),u(1)},children:[o.jsx(A,{children:"Missed Session - 1"}),o.jsx(_,{$color:"#EA580C",children:"3"})]}),o.jsxs(C,{type:"button",$isActive:i==="missed_session_2",onClick:()=>{x(t=>t==="missed_session_2"?null:"missed_session_2"),u(1)},children:[o.jsx(A,{children:"Missed Session - 2"}),o.jsx(_,{$color:"#EA580C",children:"9"})]})]}),o.jsxs(ke,{children:[o.jsxs(ve,{children:[o.jsxs(we,{children:[o.jsx("span",{children:"Stages"}),o.jsx("span",{children:"Pending"})]}),o.jsx(Ce,{children:N.map(t=>{const m=g===t.key&&!i;return o.jsxs(Ae,{type:"button",$isSelected:m,onClick:()=>{y(t.key),x(null),u(1)},children:[o.jsxs(_e,{children:[o.jsx("span",{children:t.label}),t.isFlagged&&o.jsx(M,{size:15,style:{color:"#EF4444"}})]}),o.jsx(Pe,{$isFlagged:t.isFlagged,children:t.pending})]},t.key)})}),o.jsxs(Le,{children:[o.jsx(M,{size:13,style:{color:"#EF4444",marginRight:"6px",verticalAlign:"-2px"}}),o.jsx("strong",{children:"Ageing"})," = calendar days since the student completed the previous stage. Beyond 2 days idle, the stage is flagged for admin follow-up."]})]}),o.jsx(te,{children:o.jsx(se,{columns:V,data:U,keyExtractor:t=>t.id,emptyMessage:"No pending follow-ups found for the selected stage filter.",pagination:{page:D,totalPages:G,total:j.length,limit:b,onPageChange:t=>u(t),onLimitChange:t=>{E(t),u(1)}}})})]}),o.jsx(ae,{isOpen:!!a,onClose:()=>R(null),targetName:(a==null?void 0:a.studentName)||"",targetCode:a==null?void 0:a.studentId,stageName:a==null?void 0:a.stuckAtStage}),o.jsx(ie,{isOpen:f,project:l,onClose:()=>h(!1)}),o.jsx(ne,{isOpen:p,onClose:()=>n(!1),onConfirm:H,title:"Delete Project",description:`Are you sure you want to delete "${l.name}"? This action cannot be undone.`,variant:"danger",confirmText:"Delete Project",cancelText:"Cancel"})]})};export{ao as ProjectDashboardPage,N as STAGES_LIST};
