import{j as s,aF as Y,B,g as o,r as h,az as he,u as me,e as ge,c as P,E as fe,aC as ye,L as be,aG as je,aH as Se,aw as Ce,h as ve,aI as $e}from"./index-CQIsxyVc.js";import{u as U}from"./useQuery-BLKPeCfm.js";import{P as ke}from"./PageHeader-BviCOs3E.js";import{C as we}from"./Card-DBSouhuv.js";import{I as ee}from"./Input-BTc8i6Fv.js";import{T as Ae}from"./Table-5vznqd6X.js";import{S as q}from"./Select-DE5um1RR.js";import"./Badge.styles-MB7Dm0Fa.js";import"./Table.styles-BoafHu4m.js";import{E as Me}from"./FileUpload.styles-Y1Fz2BvR.js";import"./Breadcrumb-CQhppWVK.js";import{M as H}from"./Modal-Co5MyHOO.js";import"./ConfirmDialog-Crq_Y4vl.js";import"./Checkbox-BLQlg_i7.js";import"./SuccessModal.styles-BtFfVjkK.js";import{T as M}from"./Tooltip-5yEO6vap.js";import{D as Be}from"./DatePicker-Ca_VHuKP.js";import{p as Q}from"./project.service-RU6EL_sY.js";import"./Card.styles-riY3W49l.js";import{f as Fe}from"./index-BW8bBlXO.js";import"./counselors.mock-CbyQmpLX.js";const Ne=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 22px;
  column-gap: 32px;
  padding: 8px 0;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
    row-gap: 18px;
  }
`,y=o.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=o.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textMuted||"#94A3B8"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=o.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,J=o.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 4px 10px;
  background-color: ${({theme:e})=>e.colors.primaryLight||"#F3E8FF"};
  color: ${({theme:e})=>e.colors.primary||"#5D2384"};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,Te=o.span`
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
`,X=o.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({theme:e})=>e.colors.text};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    color: #16A34A;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #16A34A;
    text-decoration: underline;

    svg {
      transform: scale(1.15);
    }
  }
`,Ee=({isOpen:e,onClose:l,student:n,instituteName:c="St. Xavier's College, Mumbai",counselorPhone:w="+91 98190 93786"})=>{var a;if(!n)return null;const m="stage"in n&&n.stage||"sessionType"in n&&n.sessionType||"Session 1 (S1)",S="session1"in n&&((a=n.session1)!=null&&a.date)?`${Fe(n.session1.date)} • ${n.session1.timeSlot||"09:30 - 10:30"}`:`${"sessionDate"in n&&n.sessionDate||"18-02-2026"} • ${"timeSlot"in n&&n.timeSlot||"09:30 - 10:30"}`,p="studentId"in n&&n.studentId||("id"in n&&n.id&&n.id.startsWith("ST")?n.id:"ST101"),g=n.mobile||"+91 9810012345",$=g.replace(/\D/g,""),x=w.replace(/\D/g,"");return s.jsx(H,{isOpen:e,onClose:l,title:"Student Details",subtitle:`Detailed metadata for ${n.name}`,size:"md",footer:s.jsx(B,{variant:"secondary",onClick:l,children:"Close"}),children:s.jsxs(Ne,{children:[s.jsxs(y,{children:[s.jsx(b,{children:"Student ID"}),s.jsx(j,{children:s.jsx("strong",{children:p})})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Full Name"}),s.jsx(j,{children:n.name})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Grade / Class"}),s.jsx(j,{children:s.jsx(J,{children:n.grade||"11th"})})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Session Stage"}),s.jsx(j,{children:s.jsx(J,{children:m})})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Email Address"}),s.jsx(j,{children:n.email||"—"})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Student Phone Number"}),s.jsx(j,{children:s.jsx(M,{content:"Chat with student on WhatsApp",children:s.jsxs(X,{href:`https://wa.me/${$}`,target:"_blank",rel:"noopener noreferrer",children:[s.jsx(Y,{size:16}),s.jsx("span",{children:g})]})})})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Counselor Phone Number"}),s.jsx(j,{children:s.jsx(M,{content:"Chat with counselor on WhatsApp",children:s.jsxs(X,{href:`https://wa.me/${x}`,target:"_blank",rel:"noopener noreferrer",children:[s.jsx(Y,{size:16}),s.jsx("span",{children:w})]})})})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Institute"}),s.jsx(j,{children:c})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Status"}),s.jsx(j,{children:s.jsx(Te,{children:"ACTIVE"})})]}),s.jsxs(y,{children:[s.jsx(b,{children:"Session Slot"}),s.jsx(j,{children:S})]})]})})},Re=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,z=o.div`
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
`,De=o.div`
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
`,Pe=o.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`,ze=[{value:"Ananya Roy",label:"Ananya Roy (Grade 11 • +91 9810012345)"},{value:"Rohan Menon",label:"Rohan Menon (Grade 12 • +91 9810024690)"},{value:"Priya Rao",label:"Priya Rao (Grade 10 • +91 9810037035)"},{value:"Siddharth Pillai",label:"Siddharth Pillai (Grade 11 • +91 9810049380)"},{value:"Diya Nair",label:"Diya Nair (Grade 11 • +91 9810055441)"},{value:"Aarav Sharma",label:"Aarav Sharma (Grade 12 • +91 9810066772)"},{value:"Vihaan Iyer",label:"Vihaan Iyer (Grade 12 • +91 9810077883)"},{value:"Kavya Patel",label:"Kavya Patel (Grade 10 • +91 9810088994)"}],Le=({isOpen:e,onClose:l,session:n,slot:c,onSave:w})=>{const[m,S]=h.useState(""),[p,g]=h.useState("S1"),[$,x]=h.useState("");h.useEffect(()=>{c&&c.isBooked?(S(c.studentName||"Ananya Roy"),g(c.sessionType||"S1"),x(c.mobile||"+91 9810012345")):(S("Ananya Roy"),g("S1"),x("+91 9810012345"))},[c]);const a=C=>{const k=C.target.value;S(k),x(k==="Ananya Roy"?"+91 9810012345":k==="Rohan Menon"?"+91 9810024690":k==="Priya Rao"?"+91 9810037035":k==="Siddharth Pillai"?"+91 9810049380":"+91 9810055441")},A=()=>{c&&(w(c.id,{studentName:m,sessionType:p,mobile:$,isBooked:!0}),l())};return!n||!c?null:s.jsx(H,{isOpen:e,onClose:l,title:"Assign Student to Counselor Schedule",size:"md",children:s.jsxs(Re,{children:[s.jsxs(De,{children:[s.jsx("span",{children:"Counselor & Available Session Slot"}),s.jsxs("span",{children:[n.counselorName," • ",c.date," @ ",c.time]})]}),s.jsxs(z,{children:[s.jsx("label",{children:"Select Student"}),s.jsx(q,{options:ze,value:m,onChange:a})]}),s.jsxs(z,{children:[s.jsx("label",{children:"Session Type"}),s.jsx(q,{options:[{value:"S1",label:"Session 1 (S1) - Initial Counseling"},{value:"S2",label:"Session 2 (S2) - Roadmap Review"}],value:p,onChange:C=>g(C.target.value)})]}),s.jsxs(z,{children:[s.jsx("label",{children:"Student Contact Phone"}),s.jsx(ee,{value:$,onChange:C=>x(C.target.value),placeholder:"+91 Mobile number"})]}),s.jsxs(Pe,{children:[s.jsx(B,{variant:"secondary",onClick:l,children:"Cancel"}),s.jsx(B,{variant:"primary",onClick:A,children:"Save Schedule"})]})]})})},_e=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ie=o.div`
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
`,L=o.button`
  background-color: ${({theme:e,$isActive:l})=>l?e.colors.primaryLight:e.colors.surface};
  border: 1px solid
    ${({theme:e,$isActive:l})=>l?e.colors.primary:e.colors.border};
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
`,_=o.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
`,I=o.span`
  font-size: 24px;
  font-weight: 800;
  color: ${({$color:e,theme:l})=>e||l.colors.text};
`,Ge=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,We=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;
`,Oe=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ve=o.button`
  width: 38px;
  height: 38px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({$variant:e,theme:l})=>e==="excel"?"#16A34A":l.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({$variant:e,theme:l})=>e==="excel"?"#16A34A":l.colors.primary};
    background-color: ${({$variant:e,theme:l})=>e==="excel"?"#F0FDF4":l.colors.primaryLight};
    color: ${({$variant:e,theme:l})=>e==="excel"?"#16A34A":l.colors.primary};
  }
`,qe=o.button`
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
`,He=o.div`
  max-width: 380px;
  width: 100%;
`,Ke=o.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Ye=o.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`,Ue=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  padding-bottom: 14px;
  flex-wrap: wrap;
`,Qe=o.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`,Je=o.div`
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
`,Xe=o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Ze=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,es=o.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,ss=o.span`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,os=o.span`
  font-size: 15px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  letter-spacing: 0.5px;
  margin-left: 8px;
`;o.button`
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
`;const is=o.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`,ts=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,G=o.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  font-size: 12px;
`,W=o.span`
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,O=o.span`
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  font-size: 13px;
`,ns=o.div`
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
`,rs=o.div`
  display: flex;
  flex-direction: column;
`,ls=o.div`
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  overflow: hidden;
`,as=o.button`
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
`,ds=o.span`
  color: ${({theme:e})=>e.colors.textMuted};
  font-size: 13px;
  font-style: italic;
`,Z=o.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`,V=o.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  background-color: ${({$type:e,$isMissed:l})=>l?"#FEE2E2":e==="S1"?"#EDE9FE":e==="S2"?"#E0F2FE":"#F1F5F9"};
  color: ${({$type:e,$isMissed:l})=>l?"#DC2626":e==="S1"?"#6B21A8":e==="S2"?"#0369A1":"#64748B"};
`,cs=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ps=o.button`
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
`;o.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;const xs=o.button`
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
`,Rs=()=>{const{projectId:e}=he(),l=me(),n=ge(),[c,w]=h.useState(""),[m,S]=h.useState(null),[p,g]=h.useState(null),[$,x]=h.useState(null),[a,A]=h.useState(null),[C,k]=h.useState(new Date("2026-02-28")),[T,se]=h.useState("11:00 - 12:00"),[E,K]=h.useState({"cs-101":[{id:"anil-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S1",mobile:"+91 9810012345",isBooked:!0,isMissed:!1,notes:"Session completed successfully. Recommended focus on science stream."},{id:"anil-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Ananya Roy",sessionType:"S2",mobile:"+91 9810012345",isBooked:!0,isMissed:!0,notes:"Student missed session due to illness. Parent requested reschedule."},{id:"anil-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"anil-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-102":[{id:"mahesh-slot-1",date:"18 Feb 2026",time:"09:30 - 10:30",studentName:"Aarav Sharma",sessionType:"S1",mobile:"+91 9810054321",isBooked:!0,isMissed:!1,notes:"Session completed."},{id:"mahesh-slot-2",date:"22 Feb 2026",time:"09:30 - 10:30",studentName:"Rohan Menon",sessionType:"S2",mobile:"+91 9810067890",isBooked:!0,isMissed:!0,notes:"Follow-up required with student."},{id:"mahesh-slot-3",date:"18 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"mahesh-slot-4",date:"25 Feb 2026",time:"14:00 - 15:00",isBooked:!1}],"cs-103":[{id:"hema-slot-1",date:"19 Feb 2026",time:"14:00 - 15:00",studentName:"Devika Nair",sessionType:"S2",mobile:"+91 9810037035",isBooked:!0,isMissed:!1},{id:"hema-slot-2",date:"23 Feb 2026",time:"11:00 - 12:00",isBooked:!1},{id:"hema-slot-3",date:"26 Feb 2026",time:"16:00 - 17:00",isBooked:!1}],"cs-104":[{id:"girish-slot-1",date:"19 Feb 2026",time:"16:00 - 17:00",studentName:"Siddharth Pillai",sessionType:"S1",mobile:"+91 9810049380",isBooked:!0,isMissed:!1},{id:"girish-slot-2",date:"24 Feb 2026",time:"09:30 - 10:30",isBooked:!1},{id:"girish-slot-3",date:"27 Feb 2026",time:"14:00 - 15:00",isBooked:!1}]}),F={"cs-101":"CN003","cs-102":"CN004","cs-103":"CN005","cs-104":"CN006"},{data:u}=U({queryKey:["project",e],queryFn:()=>Q.getById(e||"proj-001")}),{data:oe=[],isLoading:ie}=U({queryKey:["projectSessions",e],queryFn:()=>Q.getProjectSessions(e||"proj-001")}),te=t=>{const i=`https://meet.google.com/pwc-${t.counselorId.toLowerCase()}`;navigator.clipboard.writeText(i),n.success("Link Copied",`Google Meet link for ${t.counselorName} copied to clipboard.`)},ne=()=>{const t=[];t.push("Counselor Code,Counselor Name,Counselor Email,Counselor Phone,Date,Time,Student Name,Session,Student Phone,Status"),R.forEach(f=>{const D=F[f.id]||"CN001";(E[f.id]||[]).forEach(v=>{const ce=v.studentName||"Not Booked",pe=v.sessionType||(v.isBooked?"S1":"NB"),xe=v.mobile||"—",ue=v.isMissed?"Missed":v.isBooked?"Completed":"Available";t.push(`"${D}","${f.counselorName}","${f.counselorEmail}","${f.counselorPhone}","${v.date}","${v.time}","${ce}","${pe}","${xe}","${ue}"`)})});const i=new Blob([t.join(`
`)],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(i),r=document.createElement("a");r.setAttribute("href",d),r.setAttribute("download",`${((u==null?void 0:u.name)||"Project_Sessions").replace(/\s+/g,"_")}_List.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r),n.success("Excel Export Started","Downloaded project sessions list (.csv).")},re=(t,i)=>{g({session:t,slot:i})},le=(t,i)=>{if(!p)return;const d=p.session.id;K(r=>{const D=(r[d]||[]).map(N=>N.id===t?{...N,...i,isMissed:!1}:N);return{...r,[d]:D}}),n.success("Schedule Saved",`Assigned ${i.studentName} to ${p.session.counselorName}'s session on ${p.slot.date}.`),g(null)},ae=()=>{if(!a)return;const t=C?C.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"28 Feb 2026";K(i=>{const d={...i};return Object.keys(d).forEach(r=>{d[r]=d[r].map(f=>f.id===a.slot.id?{...f,date:t,time:T,isMissed:!1}:f)}),d}),n.success("Session Rescheduled",`Rescheduled session for ${a.slot.studentName} to ${t} at ${T}.`),A(null)},R=oe.filter(t=>{const i=E[t.id]||[];if(m==="follow_up_today")return i.some(r=>r.isBooked);if(m==="missed_session_1")return i.some(r=>r.isBooked&&r.sessionType==="S1"&&r.isMissed);if(m==="missed_session_2")return i.some(r=>r.isBooked&&r.sessionType==="S2"&&r.isMissed);if(!c)return!0;const d=c.toLowerCase();return t.counselorName.toLowerCase().includes(d)||F[t.id]&&F[t.id].toLowerCase().includes(d)||i.some(r=>r.studentName&&r.studentName.toLowerCase().includes(d))}),de=t=>[{key:"date",header:"Date",render:i=>s.jsx("span",{style:{color:i.isBooked?void 0:"#94A3B8",fontWeight:500},children:i.date})},{key:"time",header:"Time",render:i=>s.jsx("strong",{style:{color:i.isBooked?void 0:"#94A3B8"},children:i.time})},{key:"studentName",header:"Student",render:i=>i.isBooked?s.jsx(as,{type:"button",onClick:()=>{var d;return x({studentId:"ST101",name:i.studentName||"",email:`${(d=i.studentName)==null?void 0:d.toLowerCase().replace(/\s+/g,".")}@student.edu`,mobile:i.mobile||"+91 9810012345",grade:"11th",sessionType:i.sessionType==="S2"?"S2":"S1"})},children:i.studentName}):s.jsx(ds,{children:"NB (not booked)"})},{key:"sessionType",header:"Session",render:i=>i.isBooked?i.isMissed?s.jsxs(Z,{children:[s.jsx(V,{$type:i.sessionType==="S2"?"S2":"S1",$isMissed:!0,children:i.sessionType||"S2"}),s.jsx(M,{content:"Missed Session — Reschedule Required",children:s.jsx(Ce,{size:14,style:{color:"#EF4444"}})})]}):s.jsxs(Z,{children:[s.jsx(V,{$type:i.sessionType==="S2"?"S2":"S1",children:i.sessionType||"S1"}),s.jsx(ve,{size:16,style:{color:"#16A34A"}})]}):s.jsx(V,{$type:"NB",children:"NB"})},{key:"mobile",header:"Phone",render:i=>i.isBooked?i.mobile||"+91 9810012345":s.jsx("span",{style:{color:"#CBD5E1"},children:"—"})},{key:"action",header:"Action",render:i=>s.jsx(cs,{children:i.isBooked&&i.isMissed?s.jsx(ps,{type:"button",onClick:()=>{A({counselorName:t.counselorName,slot:i})},children:"Reschedule"}):i.isBooked?null:s.jsx(M,{content:"Assign Student to Slot",children:s.jsx(xs,{type:"button",onClick:()=>re(t,i),children:s.jsx($e,{size:15})})})})}];return s.jsxs(_e,{children:[s.jsx(ke,{title:`Project Sessions - ${(u==null?void 0:u.name)||"Career Guidance 2026 Batch A"}`,subtitle:`School: ${(u==null?void 0:u.instituteName)||"St. Xavier's College, Mumbai"} • View counselor time slots and assigned student details.`,breadcrumbs:[{label:"Dashboard",href:P.DASHBOARD},{label:"Projects",href:P.PROJECTS},{label:"Project Sessions"}],onBack:()=>l(P.PROJECTS)}),s.jsxs(Ie,{children:[s.jsxs(L,{type:"button",$isActive:m==="follow_up_today",onClick:()=>S(t=>t==="follow_up_today"?null:"follow_up_today"),children:[s.jsx(_,{children:"Follow-up today"}),s.jsx(I,{$color:"#5D2384",children:"17"})]}),s.jsxs(L,{type:"button",$isActive:m==="missed_session_1",onClick:()=>S(t=>t==="missed_session_1"?null:"missed_session_1"),children:[s.jsx(_,{children:"Missed Session - 1"}),s.jsx(I,{$color:"#EA580C",children:"3"})]}),s.jsxs(L,{type:"button",$isActive:m==="missed_session_2",onClick:()=>S(t=>t==="missed_session_2"?null:"missed_session_2"),children:[s.jsx(_,{children:"Missed Session - 2"}),s.jsx(I,{$color:"#EA580C",children:"9"})]})]}),s.jsxs(we,{padding:"lg",children:[s.jsxs(Ge,{style:{marginBottom:"20px"},children:[s.jsx(We,{children:s.jsx(He,{children:s.jsx(ee,{placeholder:"Search counselor or student name...",leftIcon:s.jsx(fe,{size:16}),value:c,onChange:t=>w(t.target.value)})})}),s.jsx(Oe,{children:s.jsx(M,{content:"Export Sessions to Excel",children:s.jsx(Ve,{type:"button",$variant:"excel",onClick:ne,"aria-label":"Export Sessions to Excel",children:s.jsx(ye,{size:18})})})})]}),ie?s.jsx(be,{}):R.length===0?s.jsx(Me,{title:"No counselor sessions found",description:"Try adjusting your search criteria or filter."}):s.jsx(Ke,{children:R.map(t=>{const i=F[t.id]||"CN001",d=E[t.id]||[];return s.jsxs(Ye,{children:[s.jsxs(Ue,{children:[s.jsxs(Qe,{children:[s.jsx(Je,{children:t.counselorName.split(" ").map(r=>r[0]).join("")}),s.jsxs(Xe,{children:[s.jsxs(Ze,{children:[s.jsx(es,{children:t.counselorName}),s.jsx(os,{children:i})]}),s.jsxs(ss,{children:[t.counselorEmail," • ",t.counselorPhone]})]})]}),s.jsxs(is,{children:[s.jsxs(ts,{children:[s.jsxs(G,{children:[s.jsx(W,{children:"Booked"}),s.jsx(O,{children:"60/80 hrs"})]}),s.jsxs(G,{children:[s.jsx(W,{children:"Session 1"}),s.jsx(O,{children:"32"})]}),s.jsxs(G,{children:[s.jsx(W,{children:"Session 2"}),s.jsx(O,{children:"32"})]}),s.jsxs(ns,{children:[s.jsx(je,{size:15}),s.jsx("span",{children:"4 Missed"})]})]}),s.jsx(M,{content:"Copy Google Meet link for this counselor",children:s.jsx(qe,{type:"button",onClick:()=>te(t),"aria-label":"Copy Google Meet Link",children:s.jsx(Se,{size:18})})})]})]}),s.jsx(rs,{children:s.jsx(ls,{children:s.jsx(Ae,{columns:de(t),data:d,keyExtractor:r=>r.id,emptyMessage:"No available or booked session slots."})})})]},t.id)})})]}),s.jsx(Le,{isOpen:!!p,onClose:()=>g(null),session:(p==null?void 0:p.session)||null,slot:(p==null?void 0:p.slot)||null,onSave:le}),s.jsx(Ee,{isOpen:!!$,onClose:()=>x(null),student:$,instituteName:u==null?void 0:u.instituteName}),s.jsx(H,{isOpen:!!a,onClose:()=>A(null),title:`Reschedule Session — ${a==null?void 0:a.slot.studentName}`,size:"md",children:s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[s.jsxs("div",{children:[s.jsx("span",{style:{fontSize:"12px",color:"#64748B",fontWeight:600},children:"SESSION DETAILS"}),s.jsxs("p",{style:{margin:"4px 0 0 0",fontWeight:700,fontSize:"14px"},children:[a==null?void 0:a.slot.studentName," • ",(a==null?void 0:a.slot.sessionType)||"Session"," • Counselor: ",a==null?void 0:a.counselorName]})]}),s.jsx(Be,{label:"New Session Date",selected:C,onChange:t=>k(t),placeholderText:"Select new date"}),s.jsx(q,{label:"Available Time Slot",value:T,onChange:t=>se(t.target.value),options:[{value:"09:30 - 10:30",label:"09:30 AM - 10:30 AM"},{value:"11:00 - 12:00",label:"11:00 AM - 12:00 PM"},{value:"14:00 - 15:00",label:"02:00 PM - 03:00 PM"},{value:"16:00 - 17:00",label:"04:00 PM - 05:00 PM"}]}),s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"10px",marginTop:"8px"},children:[s.jsx(B,{variant:"secondary",size:"sm",onClick:()=>A(null),children:"Cancel"}),s.jsx(B,{variant:"primary",size:"sm",onClick:ae,children:"Confirm Reschedule"})]})]})})]})};export{Rs as ProjectSessionsPage};
