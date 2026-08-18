import{j as s,aQ as H,$ as O,_ as V,d as q,aT as K,t as Q,H as U,g as i,r as m,B as A,aS as J,u as X,e as Y,c as R,Y as _,L as Z,S as ee,a1 as se,X as oe}from"./index-8F0JLEEw.js";import{u as T}from"./useQuery-C0nIzzYp.js";import{P as ie}from"./PageHeader-KpQVPwcf.js";import{C as te}from"./Card-NeciUoS1.js";import{I as F}from"./Input-B-q5qiE9.js";import{T as ne}from"./Table-De9tPJgC.js";import{B}from"./Badge-BUMvygFF.js";import{S as P}from"./Select-DOe36KaS.js";import"./Table.styles-ChZe2G4O.js";import{E as re}from"./FileUpload.styles-KF3-WQbH.js";import"./Breadcrumb-BKyN92ya.js";import{M as G}from"./Modal-CytuL-Vc.js";import"./ConfirmDialog-xc0s7d87.js";import"./Checkbox-CuNKoPRx.js";import"./SuccessModal.styles-DHiS2Can.js";import{T as D}from"./Tooltip-K2tZS8Xo.js";import{p as M}from"./project.service-UrgtLgln.js";import"./Card.styles-BzuSn5_T.js";import"./Badge.styles-DMnJVozC.js";import"./projects.mock-DLTGC6HA.js";import"./counselors.mock-CbyQmpLX.js";const ae=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,le=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,g=i.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,f=i.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,y=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,S=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=i.div`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,de=({isOpen:e,onClose:t,student:n,instituteName:o="Greenwood High International School"})=>n?s.jsx(G,{isOpen:e,onClose:t,title:"Student Details",size:"md",children:s.jsx(ae,{children:s.jsxs(le,{children:[s.jsxs(g,{style:{gridColumn:"1 / -1"},children:[s.jsx(f,{children:s.jsx(H,{size:20})}),s.jsxs(y,{children:[s.jsx(S,{children:"Student Name"}),s.jsx(b,{style:{fontSize:"16px"},children:n.name})]})]}),s.jsxs(g,{children:[s.jsx(f,{children:s.jsx(O,{size:20})}),s.jsxs(y,{children:[s.jsx(S,{children:"Grade"}),s.jsx(b,{children:s.jsx(B,{variant:"default",children:n.grade||"11th Grade"})})]})]}),s.jsxs(g,{children:[s.jsx(f,{children:s.jsx(V,{size:20})}),s.jsxs(y,{children:[s.jsx(S,{children:"Institute"}),s.jsx(b,{children:o})]})]}),s.jsxs(g,{children:[s.jsx(f,{children:s.jsx(q,{size:20})}),s.jsxs(y,{children:[s.jsx(S,{children:"Email"}),s.jsx(b,{children:n.email})]})]}),s.jsxs(g,{children:[s.jsx(f,{children:s.jsx(K,{size:20})}),s.jsxs(y,{children:[s.jsx(S,{children:"Phone"}),s.jsx(b,{children:n.mobile})]})]}),s.jsxs(g,{children:[s.jsx(f,{children:s.jsx(Q,{size:20})}),s.jsxs(y,{children:[s.jsx(S,{children:"Session Date"}),s.jsx(b,{children:n.sessionDate||"18-02-2026"})]})]}),s.jsxs(g,{children:[s.jsx(f,{children:s.jsx(U,{size:20})}),s.jsxs(y,{children:[s.jsx(S,{children:"Session & Slot"}),s.jsxs(b,{children:[n.sessionType||"S1"," (",n.timeSlot||"09:30 - 10:30",")"]})]})]})]})})}):null,ce=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,w=i.div`
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
`,pe=i.div`
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
`,me=i.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`,ue=[{value:"Ananya Roy",label:"Ananya Roy (Grade 11 • +91 9810012345)"},{value:"Rohan Menon",label:"Rohan Menon (Grade 12 • +91 9810024690)"},{value:"Priya Rao",label:"Priya Rao (Grade 10 • +91 9810037035)"},{value:"Siddharth Pillai",label:"Siddharth Pillai (Grade 11 • +91 9810049380)"},{value:"Diya Nair",label:"Diya Nair (Grade 11 • +91 9810055441)"},{value:"Aarav Sharma",label:"Aarav Sharma (Grade 12 • +91 9810066772)"},{value:"Vihaan Iyer",label:"Vihaan Iyer (Grade 12 • +91 9810077883)"},{value:"Kavya Patel",label:"Kavya Patel (Grade 10 • +91 9810088994)"}],xe=({isOpen:e,onClose:t,session:n,slot:o,onSave:p})=>{const[r,u]=m.useState(""),[$,j]=m.useState("S1"),[v,d]=m.useState("");m.useEffect(()=>{o&&o.isBooked?(u(o.studentName||"Ananya Roy"),j(o.sessionType||"S1"),d(o.mobile||"+91 9810012345")):(u("Ananya Roy"),j("S1"),d("+91 9810012345"))},[o]);const l=x=>{const h=x.target.value;u(h),d(h==="Ananya Roy"?"+91 9810012345":h==="Rohan Menon"?"+91 9810024690":h==="Priya Rao"?"+91 9810037035":h==="Siddharth Pillai"?"+91 9810049380":"+91 9810055441")},z=()=>{o&&(p(o.id,{studentName:r,sessionType:$,mobile:v,isBooked:!0}),t())};return!n||!o?null:s.jsx(G,{isOpen:e,onClose:t,title:"Assign Student to Counselor Schedule",size:"md",children:s.jsxs(ce,{children:[s.jsxs(pe,{children:[s.jsx("span",{children:"Counselor & Available Session Slot"}),s.jsxs("span",{children:[n.counselorName," • ",o.date," @ ",o.time]})]}),s.jsxs(w,{children:[s.jsx("label",{children:"Select Student"}),s.jsx(P,{options:ue,value:r,onChange:l})]}),s.jsxs(w,{children:[s.jsx("label",{children:"Session Type"}),s.jsx(P,{options:[{value:"S1",label:"Session 1 (S1) - Initial Counseling"},{value:"S2",label:"Session 2 (S2) - Roadmap Review"}],value:$,onChange:x=>j(x.target.value)})]}),s.jsxs(w,{children:[s.jsx("label",{children:"Student Contact Phone"}),s.jsx(F,{value:v,onChange:x=>d(x.target.value),placeholder:"+91 Mobile number"})]}),s.jsxs(me,{children:[s.jsx(A,{variant:"secondary",onClick:t,children:"Cancel"}),s.jsx(A,{variant:"primary",onClick:z,children:"Save Schedule"})]})]})})},he=i.div`
  display: flex;
  flex-direction: column;
`,ge=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,fe=i.div`
  max-width: 360px;
  width: 100%;
`,ye=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Se=i.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`,be=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  padding-bottom: ${({theme:e})=>e.spacing.md};
`,je=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,$e=i.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({theme:e})=>e.fontSize.md};
`,ve=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,ke=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ce=i.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Be=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;i.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`;i.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`;i.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e,$isSelected:t})=>t?e.fontWeight.bold:e.fontWeight.medium};
  border: 1px solid
    ${({theme:e,$isSelected:t})=>t?e.colors.primary:e.colors.border};
  background-color: ${({theme:e,$isSelected:t})=>t?e.colors.primaryLight:e.colors.surfaceHover};
  color: ${({theme:e,$isSelected:t})=>t?e.colors.primary:e.colors.text};
  transition: all 0.2s ease;
`;i.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;const ze=i.div`
  display: flex;
  flex-direction: column;
`;i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;const Ne=i.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
`,Re=i.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;

  tr:hover & {
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,we=i.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.primary};
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({theme:e})=>e.colors.primaryHover};
  }
`,Ae=i.span`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-style: italic;
`,Le=(e,t,n)=>[{key:"date",header:"Date",render:o=>s.jsx("span",{style:{color:o.isBooked?void 0:"#94A3B8"},children:o.date})},{key:"time",header:"Time",render:o=>s.jsx("strong",{style:{color:o.isBooked?void 0:"#94A3B8"},children:o.time})},{key:"studentName",header:"Student",render:o=>o.isBooked?s.jsx(we,{type:"button",onClick:()=>{var p;return n({name:o.studentName||"",email:`${(p=o.studentName)==null?void 0:p.toLowerCase().replace(/\s+/g,".")}@student.edu`,mobile:o.mobile||"+91 9810012345",grade:"11th"})},children:o.studentName}):s.jsx(Ae,{children:"NB (not booked)"})},{key:"sessionType",header:"Session",render:o=>o.isBooked?s.jsx(B,{variant:o.sessionType==="S2"?"info":"primary",children:o.sessionType||"S1"}):s.jsx(B,{variant:"default",size:"sm",children:"NB"})},{key:"mobile",header:"Phone",render:o=>o.isBooked?o.mobile||"N/A":s.jsx("span",{style:{color:"#CBD5E1"},children:"—"})},{key:"actions",header:"Action",render:o=>s.jsx(D,{content:o.isBooked?"Edit Student Schedule":"Assign Student to Session",children:s.jsx(Re,{"aria-label":o.isBooked?"Edit Schedule":"Assign Student",onClick:()=>t(e,o),children:o.isBooked?s.jsx(se,{size:16}):s.jsx(oe,{size:16})})})}],Te=({session:e,slots:t,onAssignSlot:n,onViewStudent:o,onCopyMeetLink:p})=>s.jsxs(Se,{children:[s.jsxs(be,{children:[s.jsxs(je,{children:[s.jsx($e,{children:e.counselorName.split(" ").map(r=>r[0]).join("")}),s.jsxs(ve,{children:[s.jsxs(ke,{children:[s.jsx(Ce,{children:e.counselorName}),s.jsx(B,{variant:"success",children:"Matched Counselor"})]}),s.jsxs(Be,{children:[e.counselorEmail," • ",e.counselorPhone]})]})]}),s.jsx(D,{content:"Copy Google Meet link for this counselor",children:s.jsx(A,{size:"sm",variant:"secondary",leftIcon:s.jsx(ee,{size:16}),onClick:()=>p(e),children:"Copy Meet Link"})})]}),s.jsx(ze,{children:s.jsx(Ne,{children:s.jsx(ne,{columns:Le(e,n,o),data:t,keyExtractor:r=>r.id,emptyMessage:"No available or booked session slots."})})})]},e.id),os=()=>{const{projectId:e}=J(),t=X(),n=Y(),[o,p]=m.useState(""),[r,u]=m.useState(null),[$,j]=m.useState(null),[v,d]=m.useState({"cs-101":[{id:"anil-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S1",mobile:"+91 9810012345",isBooked:!0},{id:"anil-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S2",mobile:"+91 9810012345",isBooked:!0},{id:"anil-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"anil-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-102":[{id:"mahesh-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S1",mobile:"+91 9810012345",isBooked:!0},{id:"mahesh-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S2",mobile:"+91 9810012345",isBooked:!0},{id:"mahesh-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"mahesh-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-103":[{id:"hema-slot-1",date:"19 Feb 2026",time:"14:00 - 15:00",studentName:"Priya Rao",sessionType:"S2",mobile:"+91 9810037035",isBooked:!0},{id:"hema-slot-2",date:"23 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"hema-slot-3",date:"26 Feb 2026",time:"16:00 - 17:00",isBooked:!1}],"cs-104":[{id:"girish-slot-1",date:"19 Feb 2026",time:"16:00 - 17:00",studentName:"Siddharth Pillai",sessionType:"S1",mobile:"+91 9810049380",isBooked:!0},{id:"girish-slot-2",date:"24 Feb 2026",time:"09:30 - 10:30",isBooked:!1},{id:"girish-slot-3",date:"27 Feb 2026",time:"14:00 - 15:00",isBooked:!1}]}),{data:l}=T({queryKey:["project",e],queryFn:()=>M.getById(e||"proj-001")}),{data:z=[],isLoading:x}=T({queryKey:["projectSessions",e],queryFn:()=>M.getProjectSessions(e||"proj-001")}),h=a=>{const c=`https://meet.google.com/pwc-${a.counselorId.toLowerCase()}`;navigator.clipboard.writeText(c),n.success("Link Copied",`Google Meet link for ${a.counselorName} copied to clipboard.`)},E=(a,c)=>{u({session:a,slot:c})},I=(a,c)=>{if(!r)return;const C=r.session.id;d(k=>{const W=(k[C]||[]).map(N=>N.id===a?{...N,...c}:N);return{...k,[C]:W}}),n.success("Schedule Saved",`Assigned ${c.studentName} to ${r.session.counselorName}'s session on ${r.slot.date}.`),u(null)},L=z.filter(a=>{if(!o)return!0;const c=o.toLowerCase(),C=v[a.id]||[];return a.counselorName.toLowerCase().includes(c)||C.some(k=>k.studentName&&k.studentName.toLowerCase().includes(c))});return s.jsxs(he,{children:[s.jsx(ie,{title:`Project Sessions - ${(l==null?void 0:l.name)||"Career Guidance 2026 Batch A"}`,subtitle:`School: ${(l==null?void 0:l.instituteName)||"St. Xavier's College, Mumbai"} • View counselor time slots and assigned student details.`,breadcrumbs:[{label:"Dashboard",href:R.DASHBOARD},{label:"Projects",href:R.PROJECTS},{label:"Project Sessions"}],onBack:()=>t(R.PROJECTS)}),s.jsxs(te,{padding:"lg",children:[s.jsx(ge,{style:{marginBottom:"20px"},children:s.jsx(fe,{children:s.jsx(F,{placeholder:"Search counselor or student name...",leftIcon:s.jsx(_,{size:16}),value:o,onChange:a=>p(a.target.value)})})}),x?s.jsx(Z,{}):L.length===0?s.jsx(re,{title:"No counselor sessions found",description:"Try adjusting your search criteria or filter."}):s.jsx(ye,{children:L.map(a=>s.jsx(Te,{session:a,slots:v[a.id]||[],onAssignSlot:E,onViewStudent:j,onCopyMeetLink:h},a.id))})]}),s.jsx(xe,{isOpen:!!r,onClose:()=>u(null),session:(r==null?void 0:r.session)||null,slot:(r==null?void 0:r.slot)||null,onSave:I}),s.jsx(de,{isOpen:!!$,onClose:()=>j(null),student:$,instituteName:l==null?void 0:l.instituteName})]})};export{os as ProjectSessionsPage};
