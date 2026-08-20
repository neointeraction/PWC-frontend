import{r as u,j as s,B as M,g as i,az as ae,u as de,e as ce,c as T,E as pe,aD as ue,L as xe,aF as me,aG as he,aw as fe,h as ge,aH as ye}from"./index-a7zXg0JL.js";import{u as q}from"./useQuery-o51MCdGR.js";import{P as be}from"./PageHeader-DdaifotM.js";import{C as Se}from"./Card-DKKLy9Mw.js";import{I as K}from"./Input-CcYvfC84.js";import{T as je}from"./Table-BsJCxA-K.js";import{S as O}from"./Select-BAabmZ1Y.js";import"./Badge.styles-rNLOM2_m.js";import"./Table.styles-Cb89hldY.js";import{E as ve}from"./FileUpload.styles-BKXqSS7S.js";import"./Breadcrumb-CswGd06t.js";import{M as U}from"./Modal-HiRbBry-.js";import"./ConfirmDialog-C7PpcmZe.js";import"./Checkbox-CyX2E4EW.js";import"./SuccessModal.styles-CmlOLHfD.js";import{T as B}from"./Tooltip-D_2DC_R7.js";import{D as Ce}from"./DatePicker-5FKg75ZV.js";import{p as H}from"./project.service-C5qw3TqU.js";import{V as $e}from"./ViewStudentModal-DJ6Gyfsu.js";import"./Card.styles-MXf9i3yh.js";import"./counselors.mock-CbyQmpLX.js";const ke=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,E=i.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: ${({theme:e})=>e.fontSize.xs};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`,Be=i.div`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primaryMuted};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({theme:e})=>e.colors.primary};
  }

  span:last-child {
    font-size: 14px;
    font-weight: 600;
    color: ${({theme:e})=>e.colors.text};
  }
`,Me=i.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`,Ne=[{value:"Ananya Roy",label:"Ananya Roy (Grade 11 • +91 9810012345)"},{value:"Rohan Menon",label:"Rohan Menon (Grade 12 • +91 9810024690)"},{value:"Priya Rao",label:"Priya Rao (Grade 10 • +91 9810037035)"},{value:"Siddharth Pillai",label:"Siddharth Pillai (Grade 11 • +91 9810049380)"},{value:"Diya Nair",label:"Diya Nair (Grade 11 • +91 9810055441)"},{value:"Aarav Sharma",label:"Aarav Sharma (Grade 12 • +91 9810066772)"},{value:"Vihaan Iyer",label:"Vihaan Iyer (Grade 12 • +91 9810077883)"},{value:"Kavya Patel",label:"Kavya Patel (Grade 10 • +91 9810088994)"}],Fe=({isOpen:e,onClose:r,session:y,slot:d,onSave:N})=>{const[h,b]=u.useState(""),[c,S]=u.useState("S1"),[C,x]=u.useState("");u.useEffect(()=>{d&&d.isBooked?(b(d.studentName||"Ananya Roy"),S(d.sessionType||"S1"),x(d.mobile||"+91 9810012345")):(b("Ananya Roy"),S("S1"),x("+91 9810012345"))},[d]);const l=f=>{const j=f.target.value;b(j),x(j==="Ananya Roy"?"+91 9810012345":j==="Rohan Menon"?"+91 9810024690":j==="Priya Rao"?"+91 9810037035":j==="Siddharth Pillai"?"+91 9810049380":"+91 9810055441")},v=()=>{d&&(N(d.id,{studentName:h,sessionType:c,mobile:C,isBooked:!0}),r())};return!y||!d?null:s.jsx(U,{isOpen:e,onClose:r,title:"Assign Student to Counselor Schedule",size:"md",children:s.jsxs(ke,{children:[s.jsxs(Be,{children:[s.jsx("span",{children:"Counselor & Available Session Slot"}),s.jsxs("span",{children:[y.counselorName," • ",d.date," @ ",d.time]})]}),s.jsxs(E,{children:[s.jsx("label",{children:"Select Student"}),s.jsx(O,{options:Ne,value:h,onChange:l})]}),s.jsxs(E,{children:[s.jsx("label",{children:"Session Type"}),s.jsx(O,{options:[{value:"S1",label:"Session 1 (S1) - Initial Counseling"},{value:"S2",label:"Session 2 (S2) - Roadmap Review"}],value:c,onChange:f=>S(f.target.value)})]}),s.jsxs(E,{children:[s.jsx("label",{children:"Student Contact Phone"}),s.jsx(K,{value:C,onChange:f=>x(f.target.value),placeholder:"+91 Mobile number"})]}),s.jsxs(Me,{children:[s.jsx(M,{variant:"secondary",onClick:r,children:"Cancel"}),s.jsx(M,{variant:"primary",onClick:v,children:"Save Schedule"})]})]})})},we=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ae=i.div`
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
`,P=i.button`
  background-color: ${({theme:e,$isActive:r})=>r?e.colors.primaryLight:e.colors.surface};
  border: 1px solid
    ${({theme:e,$isActive:r})=>r?e.colors.primary:e.colors.border};
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
    border-color: ${({theme:e})=>e.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
  }
`,z=i.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
`,L=i.span`
  font-size: 24px;
  font-weight: 800;
  color: ${({$color:e,theme:r})=>e||r.colors.text};
`,Re=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Te=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;
`,Ee=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Pe=i.button`
  width: 38px;
  height: 38px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({$variant:e,theme:r})=>e==="excel"?"#16A34A":r.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({$variant:e,theme:r})=>e==="excel"?"#16A34A":r.colors.primary};
    background-color: ${({$variant:e,theme:r})=>e==="excel"?"#F0FDF4":r.colors.primaryLight};
    color: ${({$variant:e,theme:r})=>e==="excel"?"#16A34A":r.colors.primary};
  }
`,ze=i.button`
  width: 34px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
    color: ${({theme:e})=>e.colors.primary};
  }
`,Le=i.div`
  max-width: 380px;
  width: 100%;
`,De=i.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,_e=i.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`,Ge=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  padding-bottom: 14px;
  flex-wrap: wrap;
`,Ie=i.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`,Oe=i.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #F3E8FF;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
`,Ve=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,qe=i.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,He=i.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,We=i.span`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,Ke=i.span`
  font-size: 15px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  letter-spacing: 0.5px;
  margin-left: 8px;
`;i.button`
  background: none;
  border: none;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`;const Ue=i.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`,Qe=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,D=i.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  font-size: 12px;
`,_=i.span`
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,G=i.span`
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  font-size: 13px;
`,Je=i.div`
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
`,Xe=i.div`
  display: flex;
  flex-direction: column;
`,Ye=i.div`
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  overflow: hidden;
`,Ze=i.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({theme:e})=>e.colors.primaryHover};
  }
`,es=i.span`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 13px;
  font-style: italic;
`,W=i.div`
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
  background-color: ${({$type:e,$isMissed:r})=>r?"#FEE2E2":e==="S1"?"#EDE9FE":e==="S2"?"#E0F2FE":"#F1F5F9"};
  color: ${({$type:e,$isMissed:r})=>r?"#DC2626":e==="S1"?"#6B21A8":e==="S2"?"#0369A1":"#64748B"};
`,ss=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,os=i.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  border: 1px solid ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({theme:e})=>e.colors.primaryHover};
    border-color: ${({theme:e})=>e.colors.primaryHover};
  }
`;i.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;const ts=i.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,ks=()=>{const{projectId:e}=ae(),r=de(),y=ce(),[d,N]=u.useState(""),[h,b]=u.useState(null),[c,S]=u.useState(null),[C,x]=u.useState(null),[l,v]=u.useState(null),[f,j]=u.useState(new Date("2026-02-28")),[F,Q]=u.useState("11:00 - 12:00"),[w,V]=u.useState({"cs-101":[{id:"anil-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S1",mobile:"+91 9810012345",isBooked:!0,isMissed:!1,notes:"Session completed successfully. Recommended focus on science stream."},{id:"anil-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S2",mobile:"+91 9810012345",isBooked:!0,isMissed:!0,notes:"Student missed session due to illness. Parent requested reschedule."},{id:"anil-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"anil-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-102":[{id:"mahesh-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Aarav Sharma",sessionType:"S1",mobile:"+91 9810054321",isBooked:!0,isMissed:!1,notes:"Session completed."},{id:"mahesh-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Rohan Menon",sessionType:"S2",mobile:"+91 9810067890",isBooked:!0,isMissed:!0,notes:"Follow-up required with student."},{id:"mahesh-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"mahesh-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-103":[{id:"hema-slot-1",date:"19 Feb 2026",time:"14:00 - 15:00",studentName:"Devika Nair",sessionType:"S2",mobile:"+91 9810037035",isBooked:!0,isMissed:!1},{id:"hema-slot-2",date:"23 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"hema-slot-3",date:"26 Feb 2026",time:"16:00 - 17:00",isBooked:!1}],"cs-104":[{id:"girish-slot-1",date:"19 Feb 2026",time:"16:00 - 17:00",studentName:"Siddharth Pillai",sessionType:"S1",mobile:"+91 9810049380",isBooked:!0,isMissed:!1},{id:"girish-slot-2",date:"24 Feb 2026",time:"09:30 - 10:30",isBooked:!1},{id:"girish-slot-3",date:"27 Feb 2026",time:"14:00 - 15:00",isBooked:!1}]}),$={"cs-101":"CN003","cs-102":"CN004","cs-103":"CN005","cs-104":"CN006"},{data:p}=q({queryKey:["project",e],queryFn:()=>H.getById(e||"proj-001")}),{data:J=[],isLoading:X}=q({queryKey:["projectSessions",e],queryFn:()=>H.getProjectSessions(e||"proj-001")}),Y=t=>{const o=`https://meet.google.com/pwc-${t.counselorId.toLowerCase()}`;navigator.clipboard.writeText(o),y.success("Link Copied",`Google Meet link for ${t.counselorName} copied to clipboard.`)},Z=()=>{const t=[];t.push("Counselor Code,Counselor Name,Counselor Email,Counselor Phone,Date,Time,Student Name,Session,Student Phone,Status"),A.forEach(m=>{const R=$[m.id]||"CN001";(w[m.id]||[]).forEach(g=>{const ie=g.studentName||"Not Booked",ne=g.sessionType||(g.isBooked?"S1":"NB"),re=g.mobile||"—",le=g.isMissed?"Missed":g.isBooked?"Completed":"Available";t.push(`"${R}","${m.counselorName}","${m.counselorEmail}","${m.counselorPhone}","${g.date}","${g.time}","${ie}","${ne}","${re}","${le}"`)})});const o=new Blob([t.join(`
`)],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(o),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download",`${((p==null?void 0:p.name)||"Project_Sessions").replace(/\s+/g,"_")}_List.csv`),document.body.appendChild(n),n.click(),document.body.removeChild(n),y.success("Excel Export Started","Downloaded project sessions list (.csv).")},ee=(t,o)=>{S({session:t,slot:o})},se=(t,o)=>{if(!c)return;const a=c.session.id;V(n=>{const R=(n[a]||[]).map(k=>k.id===t?{...k,...o,isMissed:!1}:k);return{...n,[a]:R}}),y.success("Schedule Saved",`Assigned ${o.studentName} to ${c.session.counselorName}'s session on ${c.slot.date}.`),S(null)},oe=()=>{if(!l)return;const t=f?f.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"28 Feb 2026";V(o=>{const a={...o};return Object.keys(a).forEach(n=>{a[n]=a[n].map(m=>m.id===l.slot.id?{...m,date:t,time:F,isMissed:!1}:m)}),a}),y.success("Session Rescheduled",`Rescheduled session for ${l.slot.studentName} to ${t} at ${F}.`),v(null)},A=J.filter(t=>{const o=w[t.id]||[];if(h==="follow_up_today")return o.some(n=>n.isBooked);if(h==="missed_session_1")return o.some(n=>n.isBooked&&n.sessionType==="S1"&&n.isMissed);if(h==="missed_session_2")return o.some(n=>n.isBooked&&n.sessionType==="S2"&&n.isMissed);if(!d)return!0;const a=d.toLowerCase();return t.counselorName.toLowerCase().includes(a)||$[t.id]&&$[t.id].toLowerCase().includes(a)||o.some(n=>n.studentName&&n.studentName.toLowerCase().includes(a))}),te=t=>[{key:"date",header:"Date",render:o=>s.jsx("span",{style:{color:o.isBooked?void 0:"#94A3B8",fontWeight:500},children:o.date})},{key:"time",header:"Time",render:o=>s.jsx("strong",{style:{color:o.isBooked?void 0:"#94A3B8"},children:o.time})},{key:"studentName",header:"Student",render:o=>o.isBooked?s.jsx(Ze,{type:"button",onClick:()=>{var a;return x({studentId:"ST101",name:o.studentName||"",email:`${(a=o.studentName)==null?void 0:a.toLowerCase().replace(/\s+/g,".")}@student.edu`,mobile:o.mobile||"+91 9810012345",grade:"11th",sessionType:o.sessionType==="S2"?"S2":"S1"})},children:o.studentName}):s.jsx(es,{children:"NB (not booked)"})},{key:"sessionType",header:"Session",render:o=>o.isBooked?o.isMissed?s.jsxs(W,{children:[s.jsx(I,{$type:o.sessionType==="S2"?"S2":"S1",$isMissed:!0,children:o.sessionType||"S2"}),s.jsx(B,{content:"Missed Session — Reschedule Required",children:s.jsx(fe,{size:14,style:{color:"#EF4444"}})})]}):s.jsxs(W,{children:[s.jsx(I,{$type:o.sessionType==="S2"?"S2":"S1",children:o.sessionType||"S1"}),s.jsx(ge,{size:16,style:{color:"#16A34A"}})]}):s.jsx(I,{$type:"NB",children:"NB"})},{key:"mobile",header:"Phone",render:o=>o.isBooked?o.mobile||"+91 9810012345":s.jsx("span",{style:{color:"#CBD5E1"},children:"—"})},{key:"action",header:"Action",render:o=>s.jsx(ss,{children:o.isBooked&&o.isMissed?s.jsx(os,{type:"button",onClick:()=>{v({counselorName:t.counselorName,slot:o})},children:"Reschedule"}):o.isBooked?null:s.jsx(B,{content:"Assign Student to Slot",children:s.jsx(ts,{type:"button",onClick:()=>ee(t,o),children:s.jsx(ye,{size:15})})})})}];return s.jsxs(we,{children:[s.jsx(be,{title:`Project Sessions - ${(p==null?void 0:p.name)||"Career Guidance 2026 Batch A"}`,subtitle:`School: ${(p==null?void 0:p.instituteName)||"St. Xavier's College, Mumbai"} • View counselor time slots and assigned student details.`,breadcrumbs:[{label:"Dashboard",href:T.DASHBOARD},{label:"Projects",href:T.PROJECTS},{label:"Project Sessions"}],onBack:()=>r(T.PROJECTS)}),s.jsxs(Ae,{children:[s.jsxs(P,{type:"button",$isActive:h==="follow_up_today",onClick:()=>b(t=>t==="follow_up_today"?null:"follow_up_today"),children:[s.jsx(z,{children:"Follow-up today"}),s.jsx(L,{$color:"#5D2384",children:"17"})]}),s.jsxs(P,{type:"button",$isActive:h==="missed_session_1",onClick:()=>b(t=>t==="missed_session_1"?null:"missed_session_1"),children:[s.jsx(z,{children:"Missed Session - 1"}),s.jsx(L,{$color:"#EA580C",children:"3"})]}),s.jsxs(P,{type:"button",$isActive:h==="missed_session_2",onClick:()=>b(t=>t==="missed_session_2"?null:"missed_session_2"),children:[s.jsx(z,{children:"Missed Session - 2"}),s.jsx(L,{$color:"#EA580C",children:"9"})]})]}),s.jsxs(Se,{padding:"lg",children:[s.jsxs(Re,{style:{marginBottom:"20px"},children:[s.jsx(Te,{children:s.jsx(Le,{children:s.jsx(K,{placeholder:"Search counselor or student name...",leftIcon:s.jsx(pe,{size:16}),value:d,onChange:t=>N(t.target.value)})})}),s.jsx(Ee,{children:s.jsx(B,{content:"Export Sessions to Excel",children:s.jsx(Pe,{type:"button",$variant:"excel",onClick:Z,"aria-label":"Export Sessions to Excel",children:s.jsx(ue,{size:18})})})})]}),X?s.jsx(xe,{}):A.length===0?s.jsx(ve,{title:"No counselor sessions found",description:"Try adjusting your search criteria or filter."}):s.jsx(De,{children:A.map(t=>{const o=$[t.id]||"CN001",a=w[t.id]||[];return s.jsxs(_e,{children:[s.jsxs(Ge,{children:[s.jsxs(Ie,{children:[s.jsx(Oe,{children:t.counselorName.split(" ").map(n=>n[0]).join("")}),s.jsxs(Ve,{children:[s.jsxs(qe,{children:[s.jsx(He,{children:t.counselorName}),s.jsx(Ke,{children:o})]}),s.jsxs(We,{children:[t.counselorEmail," • ",t.counselorPhone]})]})]}),s.jsxs(Ue,{children:[s.jsxs(Qe,{children:[s.jsxs(D,{children:[s.jsx(_,{children:"Booked"}),s.jsx(G,{children:"60/80 hrs"})]}),s.jsxs(D,{children:[s.jsx(_,{children:"Session 1"}),s.jsx(G,{children:"32"})]}),s.jsxs(D,{children:[s.jsx(_,{children:"Session 2"}),s.jsx(G,{children:"32"})]}),s.jsxs(Je,{children:[s.jsx(me,{size:15}),s.jsx("span",{children:"4 Missed"})]})]}),s.jsx(B,{content:"Copy Google Meet link for this counselor",children:s.jsx(ze,{type:"button",onClick:()=>Y(t),"aria-label":"Copy Google Meet Link",children:s.jsx(he,{size:18})})})]})]}),s.jsx(Xe,{children:s.jsx(Ye,{children:s.jsx(je,{columns:te(t),data:a,keyExtractor:n=>n.id,emptyMessage:"No available or booked session slots."})})})]},t.id)})})]}),s.jsx(Fe,{isOpen:!!c,onClose:()=>S(null),session:(c==null?void 0:c.session)||null,slot:(c==null?void 0:c.slot)||null,onSave:se}),s.jsx($e,{isOpen:!!C,onClose:()=>x(null),student:C,instituteName:p==null?void 0:p.instituteName}),s.jsx(U,{isOpen:!!l,onClose:()=>v(null),title:`Reschedule Session — ${l==null?void 0:l.slot.studentName}`,size:"md",children:s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[s.jsxs("div",{children:[s.jsx("span",{style:{fontSize:"12px",color:"#64748B",fontWeight:600},children:"SESSION DETAILS"}),s.jsxs("p",{style:{margin:"4px 0 0 0",fontWeight:700,fontSize:"14px"},children:[l==null?void 0:l.slot.studentName," • ",(l==null?void 0:l.slot.sessionType)||"Session"," • Counselor: ",l==null?void 0:l.counselorName]})]}),s.jsx(Ce,{label:"New Session Date",selected:f,onChange:t=>j(t),placeholderText:"Select new date"}),s.jsx(O,{label:"Available Time Slot",value:F,onChange:t=>Q(t.target.value),options:[{value:"09:30 - 10:30",label:"09:30 AM - 10:30 AM"},{value:"11:00 - 12:00",label:"11:00 AM - 12:00 PM"},{value:"14:00 - 15:00",label:"02:00 PM - 03:00 PM"},{value:"16:00 - 17:00",label:"04:00 PM - 05:00 PM"}]}),s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"10px",marginTop:"8px"},children:[s.jsx(M,{variant:"secondary",size:"sm",onClick:()=>v(null),children:"Cancel"}),s.jsx(M,{variant:"primary",size:"sm",onClick:oe,children:"Confirm Reschedule"})]})]})})]})};export{ks as ProjectSessionsPage};
