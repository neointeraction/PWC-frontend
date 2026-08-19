import{j as e,B as k,g as i,r as u,az as ce,u as pe,e as xe,c as P,E as ue,L as me,aE as K,aF as he,y as ge,aw as fe,h as ye,aG as be}from"./index-MAFUjG_U.js";import{u as Q}from"./useQuery-CljOJEwV.js";import{P as je}from"./PageHeader-D7aOULUx.js";import{C as Se}from"./Card-_60JNZUT.js";import{I as Z}from"./Input-kxkCRs14.js";import{T as Ce}from"./Table-LOmb570M.js";import{B as ve}from"./Badge-Bnm96zIe.js";import{S as O}from"./Select-D9CY3fX3.js";import"./Table.styles-D3L88ciL.js";import{E as ke}from"./FileUpload.styles-CCVUfS9-.js";import"./Breadcrumb-kbAjTRnF.js";import{M as V}from"./Modal-BNANDCMU.js";import"./ConfirmDialog-CPd-14ea.js";import"./Checkbox-Alt7KLrZ.js";import"./SuccessModal.styles-CMTZ9RZo.js";import{T as N}from"./Tooltip-DfKLnnTN.js";import{D as $e}from"./DatePicker-Drx8aRqO.js";import{p as J}from"./project.service-CnUVwu11.js";import{L as Ne}from"./LogCallModal-B0W12T8G.js";import"./Card.styles-BiOCYGMp.js";import"./Badge.styles-uAjA-8ND.js";import"./counselors.mock-CbyQmpLX.js";const Be=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 22px;
  column-gap: 32px;
  padding: 8px 0;

  @media (max-width: ${({theme:s})=>s.breakpoints.sm}) {
    grid-template-columns: 1fr;
    row-gap: 18px;
  }
`,y=i.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=i.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({theme:s})=>s.colors.textMuted||"#94A3B8"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=i.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:s})=>s.colors.text};
  line-height: 1.4;
`,U=i.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 4px 10px;
  background-color: ${({theme:s})=>s.colors.primaryLight||"#F3E8FF"};
  color: ${({theme:s})=>s.colors.primary||"#5D2384"};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,Me=i.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 4px 10px;
  background-color: #DCFCE7;
  color: #16A34A;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #16A34A;
  }
`,we=({isOpen:s,onClose:r,student:d,instituteName:a="Greenwood High International School"})=>d?e.jsx(V,{isOpen:s,onClose:r,title:"Student Details",subtitle:`Detailed metadata for ${d.name}`,size:"md",footer:e.jsx(k,{variant:"secondary",onClick:r,children:"Close"}),children:e.jsxs(Be,{children:[e.jsxs(y,{children:[e.jsx(b,{children:"Full Name"}),e.jsx(j,{children:d.name})]}),e.jsxs(y,{children:[e.jsx(b,{children:"Grade / Class"}),e.jsx(j,{children:e.jsx(U,{children:d.grade||"Grade 11"})})]}),e.jsxs(y,{children:[e.jsx(b,{children:"Session Stage"}),e.jsx(j,{children:e.jsx(U,{children:d.sessionType||"Session 1 (S1)"})})]}),e.jsxs(y,{children:[e.jsx(b,{children:"Email Address"}),e.jsx(j,{children:d.email||"—"})]}),e.jsxs(y,{children:[e.jsx(b,{children:"Phone Number"}),e.jsx(j,{children:d.mobile||"—"})]}),e.jsxs(y,{children:[e.jsx(b,{children:"Institute"}),e.jsx(j,{children:a})]}),e.jsxs(y,{children:[e.jsx(b,{children:"Status"}),e.jsx(j,{children:e.jsx(Me,{children:"ACTIVE"})})]}),e.jsxs(y,{children:[e.jsx(b,{children:"Session Slot"}),e.jsxs(j,{children:[d.sessionDate||"18-02-2026"," • ",d.timeSlot||"09:30 - 10:30"]})]})]})}):null,Fe=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:s})=>s.spacing.md};
`,L=i.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: ${({theme:s})=>s.fontSize.xs};
    font-weight: ${({theme:s})=>s.fontWeight.semibold};
    color: ${({theme:s})=>s.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`,Ae=i.div`
  background-color: ${({theme:s})=>s.colors.primaryLight};
  border: 1px solid ${({theme:s})=>s.colors.primaryMuted};
  border-radius: 4px;
  padding: ${({theme:s})=>s.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({theme:s})=>s.colors.primary};
  }

  span:last-child {
    font-size: 14px;
    font-weight: 600;
    color: ${({theme:s})=>s.colors.text};
  }
`,Re=i.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:s})=>s.spacing.sm};
  margin-top: ${({theme:s})=>s.spacing.md};
`,ze=[{value:"Ananya Roy",label:"Ananya Roy (Grade 11 • +91 9810012345)"},{value:"Rohan Menon",label:"Rohan Menon (Grade 12 • +91 9810024690)"},{value:"Priya Rao",label:"Priya Rao (Grade 10 • +91 9810037035)"},{value:"Siddharth Pillai",label:"Siddharth Pillai (Grade 11 • +91 9810049380)"},{value:"Diya Nair",label:"Diya Nair (Grade 11 • +91 9810055441)"},{value:"Aarav Sharma",label:"Aarav Sharma (Grade 12 • +91 9810066772)"},{value:"Vihaan Iyer",label:"Vihaan Iyer (Grade 12 • +91 9810077883)"},{value:"Kavya Patel",label:"Kavya Patel (Grade 10 • +91 9810088994)"}],Te=({isOpen:s,onClose:r,session:d,slot:a,onSave:A})=>{const[h,S]=u.useState(""),[x,C]=u.useState("S1"),[$,m]=u.useState("");u.useEffect(()=>{a&&a.isBooked?(S(a.studentName||"Ananya Roy"),C(a.sessionType||"S1"),m(a.mobile||"+91 9810012345")):(S("Ananya Roy"),C("S1"),m("+91 9810012345"))},[a]);const l=c=>{const g=c.target.value;S(g),m(g==="Ananya Roy"?"+91 9810012345":g==="Rohan Menon"?"+91 9810024690":g==="Priya Rao"?"+91 9810037035":g==="Siddharth Pillai"?"+91 9810049380":"+91 9810055441")},v=()=>{a&&(A(a.id,{studentName:h,sessionType:x,mobile:$,isBooked:!0}),r())};return!d||!a?null:e.jsx(V,{isOpen:s,onClose:r,title:"Assign Student to Counselor Schedule",size:"md",children:e.jsxs(Fe,{children:[e.jsxs(Ae,{children:[e.jsx("span",{children:"Counselor & Available Session Slot"}),e.jsxs("span",{children:[d.counselorName," • ",a.date," @ ",a.time]})]}),e.jsxs(L,{children:[e.jsx("label",{children:"Select Student"}),e.jsx(O,{options:ze,value:h,onChange:l})]}),e.jsxs(L,{children:[e.jsx("label",{children:"Session Type"}),e.jsx(O,{options:[{value:"S1",label:"Session 1 (S1) - Initial Counseling"},{value:"S2",label:"Session 2 (S2) - Roadmap Review"}],value:x,onChange:c=>C(c.target.value)})]}),e.jsxs(L,{children:[e.jsx("label",{children:"Student Contact Phone"}),e.jsx(Z,{value:$,onChange:c=>m(c.target.value),placeholder:"+91 Mobile number"})]}),e.jsxs(Re,{children:[e.jsx(k,{variant:"secondary",onClick:r,children:"Cancel"}),e.jsx(k,{variant:"primary",onClick:v,children:"Save Schedule"})]})]})})},Ee=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:s})=>s.spacing.lg};
`,Pe=i.div`
  display: grid;
  grid-template-columns: repeat(3, 240px);
  gap: 16px;
  width: 100%;

  @media (max-width: 840px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,D=i.button`
  background-color: ${({theme:s,$isActive:r})=>r?s.colors.primaryLight:s.colors.surface};
  border: 1px solid
    ${({theme:s,$isActive:r})=>r?s.colors.primary:s.colors.border};
  border-radius: 4px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:s})=>s.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
  }
`,_=i.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:s})=>s.colors.textSecondary};
`,G=i.span`
  font-size: 24px;
  font-weight: 800;
  color: ${({$color:s,theme:r})=>s||r.colors.text};
`,Le=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:s})=>s.spacing.md};

  @media (max-width: ${({theme:s})=>s.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,De=i.div`
  max-width: 380px;
  width: 100%;
`,_e=i.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Ge=i.div`
  background-color: ${({theme:s})=>s.colors.surface};
  border: 1px solid ${({theme:s})=>s.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`,Ie=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${({theme:s})=>s.colors.border};
  padding-bottom: 14px;
  flex-wrap: wrap;
`,Oe=i.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`,Ve=i.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #F3E8FF;
  color: ${({theme:s})=>s.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
`,He=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,qe=i.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,We=i.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:s})=>s.colors.text};
  margin: 0;
`,Ke=i.span`
  font-size: 12px;
  color: ${({theme:s})=>s.colors.textSecondary};
`,Qe=i.span`
  font-size: 15px;
  font-weight: 800;
  color: ${({theme:s})=>s.colors.text};
  letter-spacing: 0.5px;
  margin-left: 8px;
`,X=i.button`
  background: none;
  border: none;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:s})=>s.colors.textSecondary};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({theme:s})=>s.colors.primary};
    background-color: ${({theme:s})=>s.colors.primaryLight};
  }
`,Je=i.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`,Ue=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,M=i.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: ${({theme:s})=>s.colors.background};
  border: 1px solid ${({theme:s})=>s.colors.border};
  border-radius: 4px;
  font-size: 12px;
`,w=i.span`
  color: ${({theme:s})=>s.colors.textSecondary};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,F=i.span`
  font-weight: 700;
  color: ${({theme:s})=>s.colors.text};
  font-size: 13px;
`,Xe=i.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 4px;
  font-size: 12px;
  color: #DC2626;
  font-weight: 700;

  svg {
    color: #DC2626;
    flex-shrink: 0;
  }
`,Ye=i.div`
  display: flex;
  flex-direction: column;
`,Ze=i.div`
  border: 1px solid ${({theme:s})=>s.colors.border};
  border-radius: 4px;
  background-color: ${({theme:s})=>s.colors.surface};
  overflow: hidden;
`,es=i.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:s})=>s.colors.primary};
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({theme:s})=>s.colors.primaryHover};
  }
`,ss=i.span`
  color: ${({theme:s})=>s.colors.textMuted};
  font-size: 13px;
  font-style: italic;
`,Y=i.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`,I=i.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  background-color: ${({$type:s,$isMissed:r})=>r?"#FEE2E2":s==="S1"?"#EDE9FE":s==="S2"?"#E0F2FE":"#F1F5F9"};
  color: ${({$type:s,$isMissed:r})=>r?"#DC2626":s==="S1"?"#6B21A8":s==="S2"?"#0369A1":"#64748B"};
`,os=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,is=i.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  background-color: ${({theme:s})=>s.colors.primary};
  color: #ffffff;
  border: 1px solid ${({theme:s})=>s.colors.primary};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({theme:s})=>s.colors.primaryHover};
    border-color: ${({theme:s})=>s.colors.primaryHover};
  }
`;i.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;const ts=i.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${({theme:s})=>s.colors.border};
  background-color: ${({theme:s})=>s.colors.surface};
  color: ${({theme:s})=>s.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:s})=>s.colors.primary};
    color: ${({theme:s})=>s.colors.primary};
    background-color: ${({theme:s})=>s.colors.primaryLight};
  }
`,Bs=()=>{const{projectId:s}=ce(),r=pe(),d=xe(),[a,A]=u.useState(""),[h,S]=u.useState(null),[x,C]=u.useState(null),[$,m]=u.useState(null),[l,v]=u.useState(null),[c,g]=u.useState(null),[R,ee]=u.useState(new Date("2026-02-28")),[z,se]=u.useState("11:00 - 12:00"),[H,q]=u.useState({"cs-101":[{id:"anil-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S1",mobile:"+91 9810012345",isBooked:!0,isMissed:!1,notes:"Session completed successfully. Recommended focus on science stream."},{id:"anil-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S2",mobile:"+91 9810012345",isBooked:!0,isMissed:!0,notes:"Student missed session due to illness. Parent requested reschedule."},{id:"anil-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"anil-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-102":[{id:"mahesh-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Aarav Sharma",sessionType:"S1",mobile:"+91 9810054321",isBooked:!0,isMissed:!1,notes:"Session completed."},{id:"mahesh-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Rohan Menon",sessionType:"S2",mobile:"+91 9810067890",isBooked:!0,isMissed:!0,notes:"Follow-up required with student."},{id:"mahesh-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"mahesh-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-103":[{id:"hema-slot-1",date:"19 Feb 2026",time:"14:00 - 15:00",studentName:"Devika Nair",sessionType:"S2",mobile:"+91 9810037035",isBooked:!0,isMissed:!1},{id:"hema-slot-2",date:"23 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"hema-slot-3",date:"26 Feb 2026",time:"16:00 - 17:00",isBooked:!1}],"cs-104":[{id:"girish-slot-1",date:"19 Feb 2026",time:"16:00 - 17:00",studentName:"Siddharth Pillai",sessionType:"S1",mobile:"+91 9810049380",isBooked:!0,isMissed:!1},{id:"girish-slot-2",date:"24 Feb 2026",time:"09:30 - 10:30",isBooked:!1},{id:"girish-slot-3",date:"27 Feb 2026",time:"14:00 - 15:00",isBooked:!1}]}),T={"cs-101":"CN003","cs-102":"CN004","cs-103":"CN005","cs-104":"CN006"},{data:f}=Q({queryKey:["project",s],queryFn:()=>J.getById(s||"proj-001")}),{data:oe=[],isLoading:ie}=Q({queryKey:["projectSessions",s],queryFn:()=>J.getProjectSessions(s||"proj-001")}),te=t=>{const o=`https://meet.google.com/pwc-${t.counselorId.toLowerCase()}`;navigator.clipboard.writeText(o),d.success("Link Copied",`Google Meet link for ${t.counselorName} copied to clipboard.`)},ne=(t,o)=>{C({session:t,slot:o})},re=(t,o)=>{if(!x)return;const p=x.session.id;q(n=>{const de=(n[p]||[]).map(E=>E.id===t?{...E,...o,isMissed:!1}:E);return{...n,[p]:de}}),d.success("Schedule Saved",`Assigned ${o.studentName} to ${x.session.counselorName}'s session on ${x.slot.date}.`),C(null)},le=()=>{if(!l)return;const t=R?R.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"28 Feb 2026";q(o=>{const p={...o};return Object.keys(p).forEach(n=>{p[n]=p[n].map(B=>B.id===l.slot.id?{...B,date:t,time:z,isMissed:!1}:B)}),p}),d.success("Session Rescheduled",`Rescheduled session for ${l.slot.studentName} to ${t} at ${z}.`),v(null)},W=oe.filter(t=>{const o=H[t.id]||[];if(h==="follow_up_today")return o.some(n=>n.isBooked);if(h==="missed_session_1")return o.some(n=>n.isBooked&&n.sessionType==="S1"&&n.isMissed);if(h==="missed_session_2")return o.some(n=>n.isBooked&&n.sessionType==="S2"&&n.isMissed);if(!a)return!0;const p=a.toLowerCase();return t.counselorName.toLowerCase().includes(p)||T[t.id]&&T[t.id].toLowerCase().includes(p)||o.some(n=>n.studentName&&n.studentName.toLowerCase().includes(p))}),ae=t=>[{key:"date",header:"Date",render:o=>e.jsx("span",{style:{color:o.isBooked?void 0:"#94A3B8",fontWeight:500},children:o.date})},{key:"time",header:"Time",render:o=>e.jsx("strong",{style:{color:o.isBooked?void 0:"#94A3B8"},children:o.time})},{key:"studentName",header:"Student",render:o=>o.isBooked?e.jsx(es,{type:"button",onClick:()=>{var p;return m({name:o.studentName||"",email:`${(p=o.studentName)==null?void 0:p.toLowerCase().replace(/\s+/g,".")}@student.edu`,mobile:o.mobile||"+91 9810012345",grade:"11th"})},children:o.studentName}):e.jsx(ss,{children:"NB (not booked)"})},{key:"sessionType",header:"Session",render:o=>o.isBooked?o.isMissed?e.jsxs(Y,{children:[e.jsx(I,{$type:o.sessionType==="S2"?"S2":"S1",$isMissed:!0,children:o.sessionType||"S2"}),e.jsx(N,{content:"Missed Session — Reschedule Required",children:e.jsx(fe,{size:14,style:{color:"#EF4444"}})})]}):e.jsxs(Y,{children:[e.jsx(I,{$type:o.sessionType==="S2"?"S2":"S1",children:o.sessionType||"S1"}),e.jsx(ye,{size:16,style:{color:"#16A34A"}})]}):e.jsx(I,{$type:"NB",children:"NB"})},{key:"mobile",header:"Phone",render:o=>o.isBooked?o.mobile||"+91 9810012345":e.jsx("span",{style:{color:"#CBD5E1"},children:"—"})},{key:"action",header:"Action",render:o=>e.jsxs(os,{children:[o.isBooked&&e.jsx(N,{content:"Log a Call / View History",children:e.jsx(X,{type:"button",onClick:()=>{g({targetName:o.studentName||"Student",stageName:o.sessionType||"Session 1"})},children:e.jsx(K,{size:18})})}),o.isBooked&&o.isMissed?e.jsx(is,{type:"button",onClick:()=>{v({counselorName:t.counselorName,slot:o})},children:"Reschedule"}):o.isBooked?null:e.jsx(N,{content:"Assign Student to Slot",children:e.jsx(ts,{type:"button",onClick:()=>ne(t,o),children:e.jsx(be,{size:15})})})]})}];return e.jsxs(Ee,{children:[e.jsx(je,{title:`Project Sessions - ${(f==null?void 0:f.name)||"Career Guidance 2026 Batch A"}`,subtitle:`School: ${(f==null?void 0:f.instituteName)||"St. Xavier's College, Mumbai"} • View counselor time slots and assigned student details.`,breadcrumbs:[{label:"Dashboard",href:P.DASHBOARD},{label:"Projects",href:P.PROJECTS},{label:"Project Sessions"}],onBack:()=>r(P.PROJECTS)}),e.jsxs(Pe,{children:[e.jsxs(D,{type:"button",$isActive:h==="follow_up_today",onClick:()=>S(t=>t==="follow_up_today"?null:"follow_up_today"),children:[e.jsx(_,{children:"Follow-up today"}),e.jsx(G,{$color:"#5D2384",children:"17"})]}),e.jsxs(D,{type:"button",$isActive:h==="missed_session_1",onClick:()=>S(t=>t==="missed_session_1"?null:"missed_session_1"),children:[e.jsx(_,{children:"Missed Session - 1"}),e.jsx(G,{$color:"#EA580C",children:"3"})]}),e.jsxs(D,{type:"button",$isActive:h==="missed_session_2",onClick:()=>S(t=>t==="missed_session_2"?null:"missed_session_2"),children:[e.jsx(_,{children:"Missed Session - 2"}),e.jsx(G,{$color:"#EA580C",children:"9"})]})]}),e.jsxs(Se,{padding:"lg",children:[e.jsx(Le,{style:{marginBottom:"20px"},children:e.jsx(De,{children:e.jsx(Z,{placeholder:"Search counselor or student name...",leftIcon:e.jsx(ue,{size:16}),value:a,onChange:t=>A(t.target.value)})})}),ie?e.jsx(me,{}):W.length===0?e.jsx(ke,{title:"No counselor sessions found",description:"Try adjusting your search criteria or filter."}):e.jsx(_e,{children:W.map(t=>{const o=T[t.id]||"CN001",p=H[t.id]||[];return e.jsxs(Ge,{children:[e.jsxs(Ie,{children:[e.jsxs(Oe,{children:[e.jsx(Ve,{children:t.counselorName.split(" ").map(n=>n[0]).join("")}),e.jsxs(He,{children:[e.jsxs(qe,{children:[e.jsx(We,{children:t.counselorName}),e.jsx(ve,{variant:"success",children:"Matched Counselor"}),e.jsx(Qe,{children:o}),e.jsx(N,{content:`Log a call for ${t.counselorName}`,children:e.jsx(X,{type:"button",onClick:()=>{g({targetName:t.counselorName,targetCode:o,stageName:"Session 1"})},children:e.jsx(K,{size:18})})})]}),e.jsxs(Ke,{children:[t.counselorEmail," • ",t.counselorPhone]})]})]}),e.jsxs(Je,{children:[e.jsxs(Ue,{children:[e.jsxs(M,{children:[e.jsx(w,{children:"Allotted"}),e.jsx(F,{children:"80 hrs"})]}),e.jsxs(M,{children:[e.jsx(w,{children:"Booked"}),e.jsx(F,{children:"80 hrs"})]}),e.jsxs(M,{children:[e.jsx(w,{children:"Session 1"}),e.jsx(F,{children:"32"})]}),e.jsxs(M,{children:[e.jsx(w,{children:"Session 2"}),e.jsx(F,{children:"32"})]}),e.jsxs(Xe,{children:[e.jsx(he,{size:15}),e.jsx("span",{children:"4 Missed"})]})]}),e.jsx(N,{content:"Copy Google Meet link for this counselor",children:e.jsx(k,{size:"sm",variant:"secondary",leftIcon:e.jsx(ge,{size:16}),onClick:()=>te(t),children:"Copy Meet Link"})})]})]}),e.jsx(Ye,{children:e.jsx(Ze,{children:e.jsx(Ce,{columns:ae(t),data:p,keyExtractor:n=>n.id,emptyMessage:"No available or booked session slots."})})})]},t.id)})})]}),e.jsx(Te,{isOpen:!!x,onClose:()=>C(null),session:(x==null?void 0:x.session)||null,slot:(x==null?void 0:x.slot)||null,onSave:re}),e.jsx(we,{isOpen:!!$,onClose:()=>m(null),student:$,instituteName:f==null?void 0:f.instituteName}),e.jsx(V,{isOpen:!!l,onClose:()=>v(null),title:`Reschedule Session — ${l==null?void 0:l.slot.studentName}`,size:"md",children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"12px",color:"#64748B",fontWeight:600},children:"SESSION DETAILS"}),e.jsxs("p",{style:{margin:"4px 0 0 0",fontWeight:700,fontSize:"14px"},children:[l==null?void 0:l.slot.studentName," • ",(l==null?void 0:l.slot.sessionType)||"Session"," • Counselor: ",l==null?void 0:l.counselorName]})]}),e.jsx($e,{label:"New Session Date",selected:R,onChange:t=>ee(t),placeholderText:"Select new date"}),e.jsx(O,{label:"Available Time Slot",value:z,onChange:t=>se(t.target.value),options:[{value:"09:30 - 10:30",label:"09:30 AM - 10:30 AM"},{value:"11:00 - 12:00",label:"11:00 AM - 12:00 PM"},{value:"14:00 - 15:00",label:"02:00 PM - 03:00 PM"},{value:"16:00 - 17:00",label:"04:00 PM - 05:00 PM"}]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"10px",marginTop:"8px"},children:[e.jsx(k,{variant:"secondary",size:"sm",onClick:()=>v(null),children:"Cancel"}),e.jsx(k,{variant:"primary",size:"sm",onClick:le,children:"Confirm Reschedule"})]})]})}),e.jsx(Ne,{isOpen:!!c,onClose:()=>g(null),targetName:(c==null?void 0:c.targetName)||"",targetCode:c==null?void 0:c.targetCode,stageName:c==null?void 0:c.stageName})]})};export{Bs as ProjectSessionsPage};
