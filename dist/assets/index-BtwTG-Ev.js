import{g as r,e as Dt,r as s,j as t,B as c,l as L,m as F,n as Be,o as Ge,h as It,p as Nt,L as Rt,a as zt,N as P,c as U}from"./index-BVWJ6WpZ.js";import{u as Tt}from"./useQuery-Dmtd0Dz1.js";import{P as Lt}from"./PageHeader-CjIjxeGI.js";import{C as Ft}from"./Card-DUBe1Bjk.js";import{B as re}from"./Badge-DW76FgrL.js";import{T as Pt}from"./Table-BWgMaM_p.js";import{T as Ut}from"./Tooltip-C1eXP5zv.js";import"./upcomingSessions.mock-cDxNZ5Vc.js";import"./PreCounsellingAnswersModal-OYenwyBY.js";import{S as y}from"./Select-BodBe-a6.js";import"./ConfirmDialog-BMFEuEs4.js";import{M as Mt}from"./Modal-Db5Ns9rg.js";import"./SuccessModal.styles-C-q5LclL.js";import{I as n}from"./Input-DVW4Hyzv.js";import{C as M}from"./Checkbox-C7t_Tpgp.js";import"./Breadcrumb-9LG9en0e.js";import"./Card.styles-D7KkWwZR.js";import"./Badge.styles-BS3Wf50w.js";import"./Table.styles-D5u9EaYs.js";const qt={name:"Phoenix Water Club Career Institute"},Ot={plan:"enterprise"},Bt={getSummary:async()=>(await new Promise(e=>setTimeout(e,300)),{institutionName:qt.name,subscriptionPlan:Ot.plan.toUpperCase(),activeStudentsCount:45,sessionsTodayCount:8,pendingRatificationsCount:3,recentActivities:[{id:"act-1",title:"System Settings Updated",description:"Updated institution branding and security parameters.",time:"10 mins ago",type:"upload"},{id:"act-2",title:"Admin User Added",description:"Invited Sarah Connor as institution administrator.",time:"45 mins ago",type:"credential"},{id:"act-3",title:"Security Policy Ratified",description:"Enforced mandatory two-factor authentication.",time:"2 hours ago",type:"ratification"}],notifications:[{id:"notif-1",title:"System Update",message:"All administrative modules are synchronized.",type:"approval",time:"1 hour ago"},{id:"notif-2",title:"Subscription Status",message:"Enterprise subscription active with 100 seat allocations.",type:"reminder",time:"2 hours ago"}]})},Gt={careerRequests:[{id:"req-1",itemRequested:"Quantum Computing Researcher",type:"Job Role",source:"Meera Joseph (C001) — in session",date:"03-Aug-26",status:"Pending"},{id:"req-2",itemRequested:"Ashoka University",type:"Institution",source:"R. Krishnan (C002) — in session",date:"02-Aug-26",status:"Pending"},{id:"req-3",itemRequested:"B.Des Industrial Design (NID)",type:"Course",source:"Anjali Nair (C003) — own login",date:"29-Jul-26",status:"Approved"},{id:"req-4",itemRequested:"CUET PG",type:"Entrance Exam",source:"Divya Menon (C004) — in session",date:"27-Jul-26",status:"Approved"},{id:"req-5",itemRequested:"AI Ethics Consultant",type:"Job Role",source:"Sunita Sharma (C005) — own login",date:"21-Jul-26",status:"Rejected"}]};r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;r.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`;r.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`;r.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
  }
`;r.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;r.div`
  background-color: ${({$isFeatured:e,theme:i})=>e?"linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)":i.colors.surface};
  border: 1px solid
    ${({$isFeatured:e,theme:i})=>e?"#CBD5E1":i.colors.border};
  border-radius: 4px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  }
`;r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;r.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({$bg:e,theme:i})=>e||i.colors.primaryLight};
  color: ${({$color:e,theme:i})=>e||i.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;r.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`;r.span`
  font-size: 12px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  background-color: ${({$bg:e})=>e||"#ECFDF5"};
  color: ${({$color:e})=>e||"#059669"};
`;r.div`
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background-color: #E2E8F0;
  overflow: hidden;
`;r.div`
  height: 100%;
  width: ${({$percent:e})=>Math.min(100,Math.max(0,e))}%;
  background-color: ${({$color:e})=>e||"#10B981"};
  border-radius: 4px;
  transition: width 0.4s ease;
`;r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 4px;
`;r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;r.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({$color:e})=>e};
  flex-shrink: 0;
`;r.div`
  display: flex;
  flex-direction: column;
`;r.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;r.span`
  font-size: 15px;
  font-weight: 800;
  color: ${({$color:e,theme:i})=>e||i.colors.text};
`;r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;r.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`;r.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`;r.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
  }
`;r.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;r.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  }
`;r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;r.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({$bg:e})=>e};
  color: ${({$color:e})=>e};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;r.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`;r.span`
  font-size: 26px;
  font-weight: 800;
  color: ${({$color:e,theme:i})=>e||i.colors.text};
  line-height: 1.1;
  margin-top: 4px;
`;r.span`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
`;r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;r.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`;r.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`;r.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;r.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${({theme:e})=>e.colors.primary};
  }
`;r.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`;r.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th,
  td {
    padding: 12px 16px;
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
    text-align: left;
  }

  th {
    background-color: ${({theme:e})=>e.colors.background};
    font-weight: 600;
    color: ${({theme:e})=>e.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 11px;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: ${({theme:e})=>e.colors.background};
  }
`;r.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;

  ${({$status:e,theme:i})=>e==="Completed"?`
        background-color: ${i.colors.successLight};
        color: ${i.colors.success};
      `:e==="Scheduled"?`
        background-color: ${i.colors.infoLight};
        color: ${i.colors.info};
      `:`
      background-color: ${i.colors.warningLight};
      color: ${i.colors.warning};
    `}
`;r.span`
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 12px;
`;const Wt=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;r.div`
  background-color: #FEF9C3;
  border-left: 3px solid #CA8A04;
  border-radius: 4px;
  padding: 10px 14px;
  font-size: 12px;
  color: #713F12;
  line-height: 1.45;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  gap: 8px;

  svg {
    color: #CA8A04;
    flex-shrink: 0;
    margin-top: 1px;
  }

  strong {
    font-weight: 700;
  }
`;const We=r.div`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;

  ${({$isOverCap:e})=>e?`
    background-color: #FEE2E2;
    color: #DC2626;
    border: 1px solid #FECACA;
  `:`
    background-color: #ECFDF5;
    color: #059669;
    border: 1px solid #A7F3D0;
  `}
`,v=r.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`,j=r.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,g=r.div`
  display: grid;
  grid-template-columns: repeat(${({$columns:e})=>e||2}, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,h=r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,u=r.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,f=r.textarea`
  width: 100%;
  min-height: 75px;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.text};
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({theme:e})=>e.colors.textMuted};
  }

  &:focus {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 0 0 2px ${({theme:e})=>e.colors.primaryLight};
  }
`,Ht=r.div`
  background-color: ${({theme:e})=>e.colors.background};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-left: 3px solid ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Jt=r.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({theme:e})=>e.colors.primary};
  letter-spacing: 0.3px;
`,q=r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,O=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 4px 0;
  border: none;
  background-color: transparent;
`,B=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.4;
`,G=r.span`
  font-size: 11px;
  font-style: italic;
  color: ${({theme:e})=>e.colors.textMuted};
  margin-left: 6px;
`,W=r.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px dashed ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`,H=r.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`,He={High:"Centers on unique human creativity / emotional expression / cultural nuance / high stakes decision making & accountability / empathy & ethical judgment / physical dexterity in unpredictable environments.",Medium:"AI handles bulk technical production / routine tasks, humans needed for framing & validation / strategy.",Low:"Primary tasks involve repetitive data processing or routine service easily automated by AI."},Xt=({isOpen:e,onClose:i,onApprove:$,onReject:p,initialItemName:C="UI/UX Designer"})=>{const b=Dt(),[m,J]=s.useState("Design & Creative Arts"),[w,X]=s.useState("User Experience & Digital Media"),[k,V]=s.useState("UI/UX & Product Design"),[a,x]=s.useState(C),[se,Je]=s.useState("Designs intuitive and delightful user experiences across web and mobile platforms."),[ie,Xe]=s.useState("High"),[ae,ne]=s.useState(He.High),[le,Ve]=s.useState("₹4–15 LPA"),[de,_e]=s.useState("$70k–$120k"),[ce,Ke]=s.useState("Tech Firms, Design Agencies, Product Startups"),[pe,Qe]=s.useState("Conducts user research, creates wireframes, interactive prototypes, and high-fidelity interfaces. Collaborates closely with developers and product managers to ensure user-centric product experiences."),[ue,Ye]=s.useState(`User Research & Usability Testing
Wireframing & Prototyping (Figma)
Design Systems & Typography
Interaction & Visual Design`),Ze=o=>{Xe(o),ne(He[o]||"")},[xe,ge]=s.useState([{id:"edu-1",text:"10+2: 12th — Any stream (Fine Arts / Computer Application, min 60%)",checked:!0},{id:"edu-2",text:"Graduate: BDes / BFA / Relevant Degree",checked:!0},{id:"edu-3",text:"Post-Graduate: MDes, MFA, Design Management",checked:!0},{id:"edu-4",text:"Certification (Student Level): Adobe Photoshop Skills, Canva Design Mastery, Graphic Design Fundamentals",checked:!0},{id:"edu-5",text:"Certification (Undergraduate Level): Adobe Certified Professional, UI/UX Design Specialization, Motion Graphics & After Effects, UX Tools",checked:!0}]),[et,S]=s.useState(!1),[me,tt]=s.useState("Graduate"),[_,he]=s.useState(""),[K,fe]=s.useState(""),ot=()=>{if(!_.trim())return;const o={id:`edu-${Date.now()}`,text:`${me}: ${_.trim()}${K.trim()?` — ${K.trim()}`:""}`,checked:!0};ge(d=>[...d,o]),he(""),fe(""),S(!1),b.success("Education Entry Added","New education pathway added to domain library.")},[Q,be]=s.useState([{id:"ex-1",text:"CUET UG — Common University Entrance Test (NTA, National, Online)",checked:!0},{id:"ex-2",text:"DUET — Delhi University Entrance Test (select routes only)",checked:!0},{id:"ex-3",text:"IPU CET — Indraprastha University CET (GGSIPU, State)",checked:!0}]),[rt,E]=s.useState(!1),[A,ye]=s.useState(""),[Y,ve]=s.useState(""),[je,Ce]=s.useState(""),[st,it]=s.useState("Online / CBT"),[at,nt]=s.useState("Once a year"),[lt,$e]=s.useState(""),[dt,ct]=s.useState("Any stream"),[pt,we]=s.useState(""),[ut,ke]=s.useState(""),D=Q.filter(o=>o.checked).length,xt=()=>{if(!Y.trim()&&!A.trim())return;const o=`${A.trim()?`${A.trim()} — `:""}${Y.trim()} (${je||"National"})`;be(d=>[...d,{id:`ex-${Date.now()}`,text:o,checked:!0}]),ye(""),ve(""),Ce(""),$e(""),we(""),ke(""),E(!1),b.success("Exam Added","New entrance exam added to domain library.")},[Se,Ee]=s.useState([{id:"cr-1",text:"BFA — Bachelor of Fine Arts",checked:!0},{id:"cr-2",text:"B.Des — Bachelor of Design",checked:!0},{id:"cr-3",text:"M.Des — Master of Design",checked:!0}]),[gt,I]=s.useState(!1),[N,Ae]=s.useState(""),[Z,De]=s.useState(""),[mt,ht]=s.useState("Any stream, min 50% aggregate"),[ft,Ie]=s.useState(""),[bt,Ne]=s.useState(""),[yt,Re]=s.useState(""),[vt,ze]=s.useState(""),jt=()=>{if(!Z.trim()&&!N.trim())return;const o=`${N.trim()?`${N.trim()} — `:""}${Z.trim()}`;Ee(d=>[...d,{id:`cr-${Date.now()}`,text:o,checked:!0}]),Ae(""),De(""),Ie(""),Ne(""),Re(""),ze(""),I(!1),b.success("Course Added","New course degree added to domain library.")},[ee,Te]=s.useState([{id:"inst-1",text:"NID — National Institute of Design, Ahmedabad",checked:!0},{id:"inst-2",text:"IDC School of Design, IIT Bombay",checked:!0},{id:"inst-3",text:"MIT Institute of Design, Pune",checked:!0},{id:"inst-4",text:"Srishti Manipal Inst. of Art, Design & Tech, Bengaluru",checked:!1}]),[Ct,R]=s.useState(!1),[z,Le]=s.useState(""),[te,Fe]=s.useState(""),[oe,Pe]=s.useState(""),[$t,Ue]=s.useState(""),[wt,Me]=s.useState(""),[kt,qe]=s.useState(""),[St,Oe]=s.useState(""),T=ee.filter(o=>o.checked).length,Et=()=>{if(!te.trim()&&!z.trim())return;const o=`${z.trim()?`${z.trim()} — `:""}${te.trim()}${oe.trim()?`, ${oe.trim()}`:""}`;Te(d=>[...d,{id:`inst-${Date.now()}`,text:o,checked:!0}]),Le(""),Fe(""),Pe(""),Ue(""),Me(""),qe(""),Oe(""),R(!1),b.success("Institution Added","New institute added to domain library.")},At=()=>{$({cluster:m,industry:w,domain:k,title:a,shortDesc:se,aiResilience:ie,resilienceComment:ae,salaryIndia:le,salaryGlobal:de,topRecruiters:ce,roleOverview:pe,keySkills:ue,educationPath:xe.filter(o=>o.checked).map(o=>o.text),entranceExams:Q.filter(o=>o.checked).map(o=>o.text),courses:Se.filter(o=>o.checked).map(o=>o.text),institutions:ee.filter(o=>o.checked).map(o=>o.text)})};return t.jsx(Mt,{isOpen:e,onClose:i,title:"Add NEW Job Role",size:"xl",footer:t.jsxs("div",{style:{display:"flex",gap:"10px",justifyContent:"flex-end",width:"100%"},children:[t.jsx(c,{variant:"secondary",onClick:i,children:"Cancel"}),t.jsx(c,{variant:"danger",onClick:p,children:"Reject"}),t.jsx(c,{variant:"primary",leftIcon:t.jsx(It,{size:16}),onClick:At,children:"Save Job Role"})]}),children:t.jsxs(Wt,{children:[t.jsxs(v,{children:[t.jsx(j,{children:"Domain Hierarchy"}),t.jsxs(g,{$columns:3,children:[t.jsx(y,{label:"Career Cluster *",value:m,onChange:o=>J(o.target.value),options:[{value:"Design & Creative Arts",label:"Design & Creative Arts"},{value:"Technology & AI",label:"Technology & AI"},{value:"Business & Management",label:"Business & Management"},{value:"Healthcare & Life Sciences",label:"Healthcare & Life Sciences"}]}),t.jsx(y,{label:"Industry *",value:w,onChange:o=>X(o.target.value),options:[{value:"User Experience & Digital Media",label:"User Experience & Digital Media"},{value:"Graphic Design & Communication",label:"Graphic Design & Communication"},{value:"Industrial & Product Design",label:"Industrial & Product Design"}]}),t.jsx(y,{label:"Domain *",value:k,onChange:o=>V(o.target.value),options:[{value:"UI/UX & Product Design",label:"UI/UX & Product Design"},{value:"Visual & Interaction Design",label:"Visual & Interaction Design"},{value:"Animation & VFX",label:"Animation & VFX"}]})]})]}),t.jsxs(v,{children:[t.jsx(j,{children:"Job Role Details"}),t.jsxs(g,{$columns:1,children:[t.jsx(n,{label:"Title / Name *",placeholder:"Enter item title...",value:a,onChange:o=>x(o.target.value)}),t.jsx(n,{label:"Short Description *",placeholder:"Enter short description...",value:se,onChange:o=>Je(o.target.value)})]}),t.jsxs(h,{children:[t.jsx(y,{label:"AI Resilience *",value:ie,onChange:o=>Ze(o.target.value),options:[{value:"High",label:"High"},{value:"Medium",label:"Medium"},{value:"Low",label:"Low"}]}),t.jsxs(Ht,{children:[t.jsx(Jt,{children:"Auto-filled Comment (Editable):"}),t.jsx(f,{style:{minHeight:"55px"},value:ae,onChange:o=>ne(o.target.value)})]})]}),t.jsxs(g,{$columns:2,children:[t.jsx(n,{label:"Salary (India) *",placeholder:"e.g. ₹4–15 LPA",value:le,onChange:o=>Ve(o.target.value)}),t.jsx(n,{label:"Salary (Global) *",placeholder:"e.g. $70k–$120k",value:de,onChange:o=>_e(o.target.value)})]}),t.jsx(n,{label:"Top Recruiters *",placeholder:"e.g. Tech Firms, Startups",value:ce,onChange:o=>Ke(o.target.value)}),t.jsxs(h,{children:[t.jsx(u,{children:"Role Overview & Scope *"}),t.jsx(f,{placeholder:"Describe what this role does day-to-day and where it sits in the industry...",value:pe,onChange:o=>Qe(o.target.value)})]}),t.jsxs(h,{children:[t.jsx(u,{children:"Key Skill Requirements *"}),t.jsx(f,{placeholder:"List core skills, one per line...",value:ue,onChange:o=>Ye(o.target.value)})]})]}),t.jsxs(v,{children:[t.jsx(j,{children:"Education Path"}),t.jsx(u,{children:"Existing entries pulled from this Domain (Tick / Untick to include):"}),t.jsx(q,{children:xe.map(o=>t.jsx(O,{$checked:o.checked,children:t.jsxs(B,{children:[t.jsx(M,{checked:o.checked,onChange:()=>ge(d=>d.map(l=>l.id===o.id?{...l,checked:!l.checked}:l))}),t.jsx("span",{children:o.text}),t.jsx(G,{children:"(auto-pulled from Domain library)"})]})},o.id))}),et?t.jsxs(W,{children:[t.jsxs(H,{children:[t.jsx("span",{children:"+ ADD NEW EDUCATION ENTRY (Saves to Domain Library)"}),t.jsx("button",{type:"button",onClick:()=>S(!1),style:{border:"none",background:"transparent",cursor:"pointer"},children:t.jsx(F,{size:18})})]}),t.jsx(y,{label:"Level",value:me,onChange:o=>tt(o.target.value),options:[{value:"10+2",label:"10+2"},{value:"Graduate",label:"Graduate"},{value:"Post-Graduate",label:"Post-Graduate"},{value:"Certification – Student",label:"Certification – Student"},{value:"Certification – UG",label:"Certification – UG"}]}),t.jsx(n,{label:"Programme / Requirement Name",placeholder:"e.g. B.Des – Communication Design",value:_,onChange:o=>he(o.target.value)}),t.jsxs(h,{children:[t.jsx(u,{children:"Description / Details"}),t.jsx(f,{placeholder:"Eligibility, focus area, notes...",value:K,onChange:o=>fe(o.target.value)})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[t.jsx(c,{variant:"secondary",size:"sm",onClick:()=>S(!1),children:"Cancel"}),t.jsx(c,{variant:"primary",size:"sm",onClick:ot,children:"Add to Education Path"})]})]}):t.jsx("div",{style:{display:"flex",justifyContent:"flex-start"},children:t.jsx(c,{variant:"secondary",size:"sm",leftIcon:t.jsx(L,{size:14}),onClick:()=>S(!0),children:"Add New Education Entry"})})]}),t.jsxs(v,{children:[t.jsx(j,{children:"Entrance Exams"}),t.jsx(We,{$isOverCap:D>3,children:D>3?t.jsxs(t.Fragment,{children:[t.jsx(Be,{size:14})," Selected: ",D," (Exceeds max recommended limit of 3 for Compass Report)"]}):t.jsxs(t.Fragment,{children:[t.jsx(Ge,{size:14})," Selected for Compass: ",D," / 3 recommended picks"]})}),t.jsx(u,{children:"Existing entries pulled from this Domain (Tick / Untick to include):"}),t.jsx(q,{children:Q.map(o=>t.jsx(O,{$checked:o.checked,children:t.jsxs(B,{children:[t.jsx(M,{checked:o.checked,onChange:()=>be(d=>d.map(l=>l.id===o.id?{...l,checked:!l.checked}:l))}),t.jsx("span",{children:o.text}),t.jsx(G,{children:"(auto-pulled from Domain library)"})]})},o.id))}),rt?t.jsxs(W,{children:[t.jsxs(H,{children:[t.jsx("span",{children:"+ ADD NEW EXAM (Saves to Domain Library)"}),t.jsx("button",{type:"button",onClick:()=>E(!1),style:{border:"none",background:"transparent",cursor:"pointer"},children:t.jsx(F,{size:18})})]}),t.jsxs(g,{$columns:2,children:[t.jsx(n,{label:"Exam Abbreviation",placeholder:"e.g. NID DAT",value:A,onChange:o=>ye(o.target.value)}),t.jsx(n,{label:"Exam Name *",placeholder:"e.g. National Institute of Design Admission Test",value:Y,onChange:o=>ve(o.target.value)}),t.jsx(n,{label:"Conducted By / Level",placeholder:"e.g. NID · National",value:je,onChange:o=>Ce(o.target.value)}),t.jsx(y,{label:"Mode",value:st,onChange:o=>it(o.target.value),options:[{value:"Online / CBT",label:"Online / CBT"},{value:"Offline / Paper",label:"Offline / Paper"},{value:"Hybrid CBT + Studio Test",label:"Hybrid CBT + Studio Test"}]}),t.jsx(n,{label:"Frequency",placeholder:"e.g. Once a year",value:at,onChange:o=>nt(o.target.value)}),t.jsx(n,{label:"12th Requirement",placeholder:"e.g. Any stream (course-specific)",value:dt,onChange:o=>ct(o.target.value)})]}),t.jsx(n,{label:"Applicable For",placeholder:"Programmes this exam admits into...",value:lt,onChange:o=>$e(o.target.value)}),t.jsxs(g,{$columns:2,children:[t.jsx(n,{label:"Exam Window",placeholder:"e.g. Jan–Feb window · May–Jun exam",value:pt,onChange:o=>we(o.target.value)}),t.jsx(n,{label:"Official Website",placeholder:"https://...",value:ut,onChange:o=>ke(o.target.value)})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[t.jsx(c,{variant:"secondary",size:"sm",onClick:()=>E(!1),children:"Cancel"}),t.jsx(c,{variant:"primary",size:"sm",onClick:xt,children:"Add Exam"})]})]}):t.jsx("div",{style:{display:"flex",justifyContent:"flex-start"},children:t.jsx(c,{variant:"secondary",size:"sm",leftIcon:t.jsx(L,{size:14}),onClick:()=>E(!0),children:"Add New Exam"})})]}),t.jsxs(v,{children:[t.jsx(j,{children:"Courses"}),t.jsx(u,{children:"Existing entries pulled from this Domain (Tick / Untick to include):"}),t.jsx(q,{children:Se.map(o=>t.jsx(O,{$checked:o.checked,children:t.jsxs(B,{children:[t.jsx(M,{checked:o.checked,onChange:()=>Ee(d=>d.map(l=>l.id===o.id?{...l,checked:!l.checked}:l))}),t.jsx("span",{children:o.text}),t.jsx(G,{children:"(auto-pulled from Domain library)"})]})},o.id))}),gt?t.jsxs(W,{children:[t.jsxs(H,{children:[t.jsx("span",{children:"+ ADD NEW COURSE (Saves to Domain Library)"}),t.jsx("button",{type:"button",onClick:()=>I(!1),style:{border:"none",background:"transparent",cursor:"pointer"},children:t.jsx(F,{size:18})})]}),t.jsxs(g,{$columns:2,children:[t.jsx(n,{label:"Course Abbreviation",placeholder:"e.g. B.Voc",value:N,onChange:o=>Ae(o.target.value)}),t.jsx(n,{label:"Course Name *",placeholder:"e.g. Bachelor of Vocation",value:Z,onChange:o=>De(o.target.value)})]}),t.jsx(n,{label:"12th Stream Requirement",placeholder:"e.g. Any stream, min 50% aggregate",value:mt,onChange:o=>ht(o.target.value)}),t.jsx(n,{label:"Relevant Entrance Exams",placeholder:"e.g. NID DAT, UCEED, NIFT Entrance Exam",value:ft,onChange:o=>Ie(o.target.value)}),t.jsxs(h,{children:[t.jsx(u,{children:"Programs Offered"}),t.jsx(f,{placeholder:"List specialisations offered...",value:bt,onChange:o=>Ne(o.target.value)})]}),t.jsxs(h,{children:[t.jsx(u,{children:"Top Colleges"}),t.jsx(f,{placeholder:"List leading institutions...",value:yt,onChange:o=>Re(o.target.value)})]}),t.jsx(n,{label:"Further Study Options",placeholder:"e.g. M.Des, PhD, Design Residencies",value:vt,onChange:o=>ze(o.target.value)}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[t.jsx(c,{variant:"secondary",size:"sm",onClick:()=>I(!1),children:"Cancel"}),t.jsx(c,{variant:"primary",size:"sm",onClick:jt,children:"Add Course"})]})]}):t.jsx("div",{style:{display:"flex",justifyContent:"flex-start"},children:t.jsx(c,{variant:"secondary",size:"sm",leftIcon:t.jsx(L,{size:14}),onClick:()=>I(!0),children:"Add New Course"})})]}),t.jsxs(v,{children:[t.jsx(j,{children:"Institutions"}),t.jsx(We,{$isOverCap:T>3,children:T>3?t.jsxs(t.Fragment,{children:[t.jsx(Be,{size:14})," Selected: ",T," (Exceeds max recommended limit of 3 for Compass Report)"]}):t.jsxs(t.Fragment,{children:[t.jsx(Ge,{size:14})," Selected for Compass: ",T," / 3 recommended institutions"]})}),t.jsx(u,{children:"Existing entries pulled from this Domain (Tick / Untick to include):"}),t.jsx(q,{children:ee.map(o=>t.jsx(O,{$checked:o.checked,children:t.jsxs(B,{children:[t.jsx(M,{checked:o.checked,onChange:()=>Te(d=>d.map(l=>l.id===o.id?{...l,checked:!l.checked}:l))}),t.jsx("span",{children:o.text}),t.jsx(G,{children:"(auto-pulled from Domain library)"})]})},o.id))}),Ct?t.jsxs(W,{children:[t.jsxs(H,{children:[t.jsx("span",{children:"+ ADD NEW INSTITUTION (Saves to Domain Library)"}),t.jsx("button",{type:"button",onClick:()=>R(!1),style:{border:"none",background:"transparent",cursor:"pointer"},children:t.jsx(F,{size:18})})]}),t.jsxs(g,{$columns:2,children:[t.jsx(n,{label:"Institution Abbreviation",placeholder:"e.g. NIFT",value:z,onChange:o=>Le(o.target.value)}),t.jsx(n,{label:"Institution Name *",placeholder:"e.g. National Institute of Fashion Technology",value:te,onChange:o=>Fe(o.target.value)}),t.jsx(n,{label:"Location",placeholder:"City, State",value:oe,onChange:o=>Pe(o.target.value)}),t.jsx(n,{label:"Entrance Exam Required",placeholder:"e.g. NID DAT (Prelims + Mains)",value:$t,onChange:o=>Ue(o.target.value)})]}),t.jsxs(h,{children:[t.jsx(u,{children:"Programs Offered"}),t.jsx(f,{placeholder:"List programmes...",value:wt,onChange:o=>Me(o.target.value)})]}),t.jsxs(g,{$columns:2,children:[t.jsx(n,{label:"Ranking / Recognition",placeholder:"e.g. #1 in IIRF/Outlook-ICARE Design rankings",value:kt,onChange:o=>qe(o.target.value)}),t.jsx(n,{label:"Official Website",placeholder:"https://...",value:St,onChange:o=>Oe(o.target.value)})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[t.jsx(c,{variant:"secondary",size:"sm",onClick:()=>R(!1),children:"Cancel"}),t.jsx(c,{variant:"primary",size:"sm",onClick:Et,children:"Add Institution"})]})]}):t.jsx("div",{style:{display:"flex",justifyContent:"flex-start"},children:t.jsx(c,{variant:"secondary",size:"sm",leftIcon:t.jsx(L,{size:14}),onClick:()=>R(!0),children:"Add New Institution"})})]})]})})};r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;r.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`;r.div`
  display: grid;
  grid-template-columns: repeat(${({$columns:e})=>e||2}, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;r.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`;r.textarea`
  width: 100%;
  min-height: 75px;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.text};
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({theme:e})=>e.colors.textMuted};
  }

  &:focus {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 0 0 2px ${({theme:e})=>e.colors.primaryLight};
  }
`;r.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px dashed ${({theme:e})=>e.colors.primary};
  border-radius: 4px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`;r.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;r.div`
  font-size: 12px;
  padding: 6px 10px;
  background-color: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #065F46;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;const Vt=r.div`
  display: flex;
  flex-direction: column;
`;r.div`
  background: linear-gradient(
    135deg,
    ${({theme:e})=>e.colors.surface} 0%,
    ${({theme:e})=>e.colors.primaryLight} 100%
  );
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  padding: ${({theme:e})=>e.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({theme:e})=>e.spacing.md};
  }
`;r.div`
  h2 {
    font-size: ${({theme:e})=>e.fontSize.xxl};
    font-weight: 800;
    color: ${({theme:e})=>e.colors.text};
    margin: 0 0 6px 0;
  }

  p {
    font-size: ${({theme:e})=>e.fontSize.base};
    color: ${({theme:e})=>e.colors.textSecondary};
    margin: 0 0 12px 0;
  }
`;r.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`;r.span`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  padding: 4px 12px;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 600;
  color: ${({theme:e})=>e.colors.primary};
`;r.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;r.div`
  font-size: ${({theme:e})=>e.fontSize.display};
  font-weight: 700;
  color: ${({theme:e,$variant:i})=>i==="success"?e.colors.success:i==="warning"?e.colors.warning:i==="info"?"#0088FE":e.colors.text};
  margin-top: 4px;
`;r.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 4px;
`;r.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    color: ${({theme:e})=>e.colors.textSecondary};
    margin: 0;
  }
`;r.div`
  margin-bottom: ${({theme:e})=>e.spacing.md};
`;r.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`;r.div`
  width: 100%;
  background-color: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;r.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;r.tr`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border-bottom: 1px solid ${({theme:e})=>e.colors.primaryMuted};
`;r.th`
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  text-transform: capitalize;
`;const _t=r.td`
  padding: 16px 18px;
  font-size: 14px;
  color: ${({theme:e})=>e.colors.text};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`;r.tr`
  transition: background-color ${({theme:e})=>e.transition.fast};

  &:last-child ${_t} {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({theme:e})=>e.colors.surfaceHover};
  }
`;const Kt=r.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,Qt=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Yt=r.button`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  color: ${({theme:e})=>e.colors.text};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    background-color: ${({theme:e})=>e.colors.primaryLight};
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
  }
`;r.div`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primaryMuted};
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;r.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;r.span`
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: 500;
`;r.span`
  color: ${({theme:e})=>e.colors.text};
  font-weight: 600;
`;r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.xl};
  margin-top: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;r.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`;r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.md};
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.surfaceHover};
  }
`;r.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`;r.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.md};
  border-radius: 4px;
  background-color: ${({theme:e,$type:i})=>i==="approval"?e.colors.warningLight:i==="reminder"?e.colors.infoLight:e.colors.surfaceHover};
  border-left: 4px solid
    ${({theme:e,$type:i})=>i==="approval"?e.colors.warning:i==="reminder"?e.colors.info:e.colors.primary};
`;const Zt=()=>{const e=Nt(a=>a.addNotification),[i,$]=s.useState(Gt.careerRequests),[p,C]=s.useState(null),[b,m]=s.useState(!1),{isLoading:J}=Tt({queryKey:["dashboard-summary"],queryFn:Bt.getSummary}),w=a=>{C(a),m(!0)},X=()=>{p&&($(a=>a.map(x=>x.id===p.id?{...x,status:"Approved"}:x)),e({type:"success",title:"Request Approved",message:`"${p.itemRequested}" has been ratified and added to the career library.`}),m(!1),C(null))},k=()=>{p&&($(a=>a.map(x=>x.id===p.id?{...x,status:"Rejected"}:x)),e({type:"success",title:"Request Rejected",message:`"${p.itemRequested}" has been rejected.`}),m(!1),C(null))},V=[{key:"itemRequested",header:"Item Requested",render:a=>t.jsx(Kt,{children:a.itemRequested})},{key:"type",header:"Type",render:a=>a.type},{key:"source",header:"Counsellors",render:a=>a.source},{key:"date",header:"Date",render:a=>a.date},{key:"status",header:"Status",render:a=>t.jsxs(Qt,{style:{justifyContent:"flex-end"},children:[a.status==="Approved"&&t.jsx(re,{variant:"success",children:"Approved"}),a.status==="Rejected"&&t.jsx(re,{variant:"danger",children:"Rejected"}),a.status==="Pending"&&t.jsxs(t.Fragment,{children:[t.jsx(re,{variant:"warning",children:"Pending"}),t.jsx(Ut,{content:"Approve request and publish to global library",children:t.jsx(Yt,{onClick:()=>w(a),children:"APPROVE"})})]})]})}];return J?t.jsx(Rt,{}):t.jsxs(Vt,{children:[t.jsx(Lt,{title:"Dashboard"}),t.jsx(Ft,{title:"Pending & Recent Requests",children:t.jsx(Pt,{columns:V,data:i,keyExtractor:a=>a.id,emptyMessage:"No pending requests found."})}),t.jsx(Xt,{isOpen:b,onClose:()=>m(!1),onApprove:X,onReject:k,initialItemName:(p==null?void 0:p.itemRequested)||"UI/UX Designer",initialCategory:p==null?void 0:p.type})]})},vo=()=>{const e=zt(i=>i.role);return e==="super_admin"?t.jsx(Zt,{}):e==="admin"?t.jsx(P,{to:U.PROJECTS,replace:!0}):e==="counselor"?t.jsx(P,{to:U.UPCOMING_SESSIONS,replace:!0}):e==="student"?t.jsx(P,{to:U.STUDENT_PORTAL,replace:!0}):t.jsx(P,{to:U.PROJECTS,replace:!0})};export{vo as DashboardPage};
