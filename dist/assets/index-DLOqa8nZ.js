import{r as u,j as s,B as L,g as i,az as Y,u as Z,w as ee,p as se,c as C,F as te,E as ne,aB as oe,aC as ie,J as ae,aA as E,ay as F,aD as le,N as re}from"./index-BUalwBCD.js";import{M as de,S as r,u as I,B as b}from"./Modal-D3wpFGKR.js";import{u as ce}from"./useMutation-ByNtmxWc.js";import{P as ue,C as pe,T as ge}from"./Card-CmSGAiMf.js";import{I as x}from"./Input-D2KrMr1i.js";import"./FileUpload.styles-BXzVMnTw.js";import{p as w}from"./project.service-CJNTO4g3.js";import"./counselors.mock-BLoO_2sZ.js";const me=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,P=i.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,z=i.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`,M=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,D=["Anil Iyer","Mahesh Pillai","Hema Kurup","Girish Bhat","Manoj Chacko"],G=["09:30 AM - 10:30 AM","11:00 AM - 12:00 PM","02:00 PM - 03:00 PM","04:00 PM - 05:00 PM"],xe=({isOpen:e,onClose:l,student:d,onSave:S,isSaving:g})=>{const[o,a]=u.useState(null);if(u.useEffect(()=>{d&&a(JSON.parse(JSON.stringify(d)))},[d]),!o)return null;const v=()=>{S(o)};return s.jsx(de,{isOpen:e,onClose:l,title:d!=null&&d.id?`Edit Student - ${o.name}`:"Add New Student",subtitle:"Modify student personal details, grade, and session counselor assignments.",size:"lg",footer:s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[s.jsx(L,{variant:"secondary",onClick:l,disabled:g,children:"Cancel"}),s.jsx(L,{onClick:v,isLoading:g,children:"Save Changes"})]}),children:s.jsxs(me,{children:[s.jsxs(P,{children:[s.jsx(z,{children:"Student Information"}),s.jsxs(M,{children:[s.jsx(x,{label:"Student Full Name",value:o.name,onChange:n=>a({...o,name:n.target.value})}),s.jsx(x,{label:"Email Address",type:"email",value:o.email,onChange:n=>a({...o,email:n.target.value})}),s.jsx(x,{label:"Mobile Number",value:o.mobile,onChange:n=>a({...o,mobile:n.target.value})}),s.jsx(r,{label:"Grade / Class",value:o.grade,onChange:n=>a({...o,grade:n.target.value}),options:[{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]})]})]}),s.jsxs(P,{children:[s.jsx(z,{children:"Session 1 Details"}),s.jsxs(M,{children:[s.jsx(r,{label:"Session 1 Status",value:o.session1.status,onChange:n=>a({...o,session1:{...o.session1,status:n.target.value}}),options:[{value:"scheduled",label:"Scheduled"},{value:"completed",label:"Completed"},{value:"pending",label:"Pending"}]}),s.jsx(r,{label:"Assigned Counselor",value:o.session1.counselorName,onChange:n=>a({...o,session1:{...o.session1,counselorName:n.target.value}}),options:D.map(n=>({value:n,label:n}))}),s.jsx(x,{label:"Session Date",type:"date",value:o.session1.date,onChange:n=>a({...o,session1:{...o.session1,date:n.target.value}})}),s.jsx(r,{label:"Time Slot",value:o.session1.timeSlot,onChange:n=>a({...o,session1:{...o.session1,timeSlot:n.target.value}}),options:G.map(n=>({value:n,label:n}))})]})]}),s.jsxs(P,{children:[s.jsx(z,{children:"Session 2 Details"}),s.jsxs(M,{children:[s.jsx(r,{label:"Session 2 Status",value:o.session2.status,onChange:n=>a({...o,session2:{...o.session2,status:n.target.value}}),options:[{value:"scheduled",label:"Scheduled"},{value:"completed",label:"Completed"},{value:"pending",label:"Pending"}]}),s.jsx(r,{label:"Assigned Counselor",value:o.session2.counselorName,onChange:n=>a({...o,session2:{...o.session2,counselorName:n.target.value}}),options:D.map(n=>({value:n,label:n}))}),s.jsx(x,{label:"Session Date",type:"date",value:o.session2.date,onChange:n=>a({...o,session2:{...o.session2,date:n.target.value}})}),s.jsx(r,{label:"Time Slot",value:o.session2.timeSlot,onChange:n=>a({...o,session2:{...o.session2,timeSlot:n.target.value}}),options:G.map(n=>({value:n,label:n}))})]})]})]})})},he=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,fe=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Se=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,je=i.div`
  max-width: 320px;
  width: 100%;
`,be=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`,ve=i.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,ye=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  padding-bottom: ${({theme:e})=>e.spacing.sm};
`,$e=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,Ce=i.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
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
`,we=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,Pe=i.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({theme:e})=>e.fontSize.sm};
`,ze=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Me=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ae=i.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,T=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Le=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,O=i.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
`,q=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.xs};
`,H=i.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,W=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`,J=i.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`,ke=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({theme:e})=>e.spacing.lg};
  padding-top: ${({theme:e})=>e.spacing.md};
  border-top: 1px solid ${({theme:e})=>e.colors.border};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({theme:e})=>e.spacing.md};
  }
`,Ne=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Re=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,A=i.button`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid
    ${({theme:e,$isActive:l})=>l?e.colors.primary:e.colors.border};
  background-color: ${({theme:e,$isActive:l})=>l?e.colors.primary:e.colors.surface};
  color: ${({theme:e,$isActive:l})=>l?"#ffffff":e.colors.text};
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e,$isActive:l})=>l?e.fontWeight.bold:e.fontWeight.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({$isActive:e,theme:l})=>e?"#ffffff":l.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,qe=()=>{const{projectId:e}=Y(),l=Z(),d=ee(),S=se(),[g,o]=u.useState(""),[a,v]=u.useState("all"),[n,Q]=u.useState("all"),[p,m]=u.useState(1),[k,j]=u.useState(null),[_,y]=u.useState(!1),h=6,{data:$}=I({queryKey:["project",e],queryFn:()=>w.getById(e||"proj-001")}),{data:K=[],isLoading:U}=I({queryKey:["projectStudents",e],queryFn:()=>w.getProjectStudents(e||"proj-001")}),N=ce({mutationFn:t=>w.updateProjectStudent(e||"proj-001",t),onSuccess:()=>{d.invalidateQueries({queryKey:["projectStudents",e]}),S.success("Student Saved","Student information and session details updated successfully."),j(null),y(!1)},onError:()=>{S.error("Save Failed","Could not update student details.")}}),V=()=>{const t={id:`std-new-${Date.now()}`,name:"",email:"",mobile:"+91 ",grade:"12th",session1:{sessionNumber:1,status:"scheduled",date:new Date().toISOString().slice(0,10),timeSlot:"09:30 AM - 10:30 AM",counselorName:"Anil Iyer",counselorEmail:"anil.iyer1@outlook.com"},session2:{sessionNumber:2,status:"pending",date:new Date().toISOString().slice(0,10),timeSlot:"11:00 AM - 12:00 PM",counselorName:"Mahesh Pillai",counselorEmail:"mahesh.pillai2@rediffmail.com"}};j(t),y(!0)},R=t=>{switch(t.status){case"completed":return s.jsx(b,{variant:"default",dot:!0,children:"Completed"});case"scheduled":return s.jsx(b,{variant:"info",dot:!0,children:"Scheduled"});case"pending":default:return s.jsx(b,{variant:"warning",dot:!0,children:"Pending"})}},f=K.filter(t=>{if(a!=="all"&&t.grade!==a||n==="s1_completed"&&t.session1.status!=="completed"||n==="s2_completed"&&t.session2.status!=="completed"||n==="pending"&&t.session1.status!=="pending"&&t.session2.status!=="pending")return!1;if(g){const c=g.toLowerCase();return t.name.toLowerCase().includes(c)||t.email.toLowerCase().includes(c)||t.session1.counselorName.toLowerCase().includes(c)||t.session2.counselorName.toLowerCase().includes(c)}return!0}),B=Math.ceil(f.length/h)||1,X=f.slice((p-1)*h,p*h);return s.jsxs(he,{children:[s.jsx(ue,{title:`Project Students - ${($==null?void 0:$.name)||"Career Guidance"}`,subtitle:"Manage enrolled students, edit personal info, and reassign session counselors.",breadcrumbs:[{label:"Dashboard",href:C.DASHBOARD},{label:"Projects",href:C.PROJECTS},{label:"Project Students"}],onBack:()=>l(C.PROJECTS)}),s.jsxs(pe,{padding:"lg",children:[s.jsxs(fe,{style:{marginBottom:"24px"},children:[s.jsxs(Se,{children:[s.jsx(je,{children:s.jsx(x,{placeholder:"Search student or counselor name...",leftIcon:s.jsx(te,{size:16}),value:g,onChange:t=>{o(t.target.value),m(1)}})}),s.jsx("div",{style:{width:"160px"},children:s.jsx(r,{value:a,onChange:t=>{v(t.target.value),m(1)},options:[{value:"all",label:"All Grades"},{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]})}),s.jsx("div",{style:{width:"200px"},children:s.jsx(r,{value:n,onChange:t=>{Q(t.target.value),m(1)},options:[{value:"all",label:"All Session Status"},{value:"s1_completed",label:"Session 1 Completed"},{value:"s2_completed",label:"Session 2 Completed"},{value:"pending",label:"Pending Sessions"}]})})]}),s.jsx(L,{leftIcon:s.jsx(ne,{size:16}),onClick:V,children:"Add Student"})]}),U?s.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"Loading student cards..."}):f.length===0?s.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"No students found matching filters."}):s.jsxs(s.Fragment,{children:[s.jsx(be,{children:X.map(t=>s.jsxs(ve,{children:[s.jsxs(ye,{children:[s.jsxs(we,{children:[s.jsx(Pe,{children:t.name.split(" ").filter(Boolean).map(c=>c[0]).join("")||"ST"}),s.jsxs(ze,{children:[s.jsxs(Me,{children:[s.jsx(Ae,{children:t.name}),s.jsx(b,{variant:"default",children:t.grade})]}),s.jsxs(T,{children:[s.jsx(oe,{size:13,style:{verticalAlign:"middle",marginRight:"4px"}}),t.email]})]})]}),s.jsxs($e,{children:[s.jsxs(T,{style:{fontWeight:500},children:[s.jsx(ie,{size:13,style:{verticalAlign:"middle",marginRight:"4px"}}),t.mobile]}),s.jsx(ge,{content:"Edit Student & Sessions",children:s.jsx(Ce,{onClick:()=>j(t),children:s.jsx(ae,{size:16})})})]})]}),s.jsxs(Le,{children:[s.jsxs(O,{children:[s.jsxs(q,{children:[s.jsx(H,{children:"Session 1"}),R(t.session1)]}),s.jsxs(W,{children:[s.jsx(E,{size:14}),t.session1.date," (",t.session1.timeSlot,")"]}),s.jsxs(J,{children:[s.jsx(F,{size:13}),"Counselor: ",t.session1.counselorName]})]}),s.jsxs(O,{children:[s.jsxs(q,{children:[s.jsx(H,{children:"Session 2"}),R(t.session2)]}),s.jsxs(W,{children:[s.jsx(E,{size:14}),t.session2.date," (",t.session2.timeSlot,")"]}),s.jsxs(J,{children:[s.jsx(F,{size:13}),"Counselor: ",t.session2.counselorName]})]})]})]},t.id))}),s.jsxs(ke,{children:[s.jsxs(Ne,{children:["Showing ",(p-1)*h+1,"–",Math.min(p*h,f.length)," of ",f.length," students"]}),s.jsxs(Re,{children:[s.jsx(A,{disabled:p===1,onClick:()=>m(t=>t-1),children:s.jsx(le,{size:16})}),Array.from({length:B},(t,c)=>c+1).map(t=>s.jsx(A,{$isActive:t===p,onClick:()=>m(t),children:t},t)),s.jsx(A,{disabled:p===B,onClick:()=>m(t=>t+1),children:s.jsx(re,{size:16})})]})]})]})]}),s.jsx(xe,{isOpen:!!k||_,onClose:()=>{j(null),y(!1)},student:k,onSave:t=>N.mutate(t),isSaving:N.isPending})]})};export{qe as ProjectStudentsPage};
