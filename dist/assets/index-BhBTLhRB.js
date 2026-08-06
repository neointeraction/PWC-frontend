import{r,j as s,B as N,g as o,aF as R,u as q,y as H,d as Q,c as $,H as J,G as K,aE as _,aG as E,O as U}from"./index-BlnJ6RPY.js";import{u as L}from"./useQuery-Bpj6tJZw.js";import{u as W}from"./useMutation-C6ij4NK7.js";import{P as V,T as X}from"./PageHeader-DnomRfRw.js";import{C as Y}from"./Card-_jdrMGWy.js";import{I as u}from"./Input-DT7CGDc-.js";import{S as d}from"./Modal.styles-B_QFbYeL.js";import{M as Z,T as ee,B as se}from"./Modal-wN5hG3EV.js";import"./FileUpload.styles-BOuNYGcK.js";import{p as w}from"./project.service-CqiMKOES.js";import"./counselors.mock---5XGzUI.js";const te=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,M=o.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,P=o.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`,A=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,ae=["Anil Iyer","Mahesh Pillai","Hema Kurup","Girish Bhat","Manoj Chacko"],G=["09:30 AM - 10:30 AM","11:00 AM - 12:00 PM","02:00 PM - 03:00 PM","04:00 PM - 05:00 PM"],ne=({isOpen:e,onClose:m,student:i,onSave:g,isSaving:c})=>{const[a,l]=r.useState(null);if(r.useEffect(()=>{i&&l(JSON.parse(JSON.stringify(i)))},[i]),!a)return null;const v=()=>{g(a)};return s.jsx(Z,{isOpen:e,onClose:m,title:i!=null&&i.id?`Edit Student - ${a.name}`:"Add New Student",subtitle:"Modify student personal details, grade, and session counselor assignments.",size:"lg",footer:s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[s.jsx(N,{variant:"secondary",onClick:m,disabled:c,children:"Cancel"}),s.jsx(N,{onClick:v,isLoading:c,children:"Save Changes"})]}),children:s.jsxs(te,{children:[s.jsxs(M,{children:[s.jsx(P,{children:"Student Information"}),s.jsxs(A,{children:[s.jsx(u,{label:"Student Full Name",value:a.name,onChange:n=>l({...a,name:n.target.value})}),s.jsx(u,{label:"Email Address",type:"email",value:a.email,onChange:n=>l({...a,email:n.target.value})}),s.jsx(u,{label:"Mobile Number",value:a.mobile,onChange:n=>l({...a,mobile:n.target.value})}),s.jsx(d,{label:"Grade / Class",value:a.grade,onChange:n=>l({...a,grade:n.target.value}),options:[{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]}),s.jsx(d,{label:"Assigned Counselor",value:a.session1.counselorName||a.session2.counselorName,onChange:n=>{const x=n.target.value;l({...a,session1:{...a.session1,counselorName:x},session2:{...a.session2,counselorName:x}})},options:ae.map(n=>({value:n,label:n}))})]})]}),s.jsxs(M,{children:[s.jsx(P,{children:"Session 1 Details"}),s.jsxs(A,{children:[s.jsx(d,{label:"Session 1 Status",value:a.session1.status,onChange:n=>l({...a,session1:{...a.session1,status:n.target.value}}),options:[{value:"scheduled",label:"Scheduled"},{value:"completed",label:"Completed"},{value:"pending",label:"Pending"}]}),s.jsx(u,{label:"Session Date",type:"date",value:a.session1.date,onChange:n=>l({...a,session1:{...a.session1,date:n.target.value}})}),s.jsx(d,{label:"Time Slot",value:a.session1.timeSlot,onChange:n=>l({...a,session1:{...a.session1,timeSlot:n.target.value}}),options:G.map(n=>({value:n,label:n}))})]})]}),s.jsxs(M,{children:[s.jsx(P,{children:"Session 2 Details"}),s.jsxs(A,{children:[s.jsx(d,{label:"Session 2 Status",value:a.session2.status,onChange:n=>l({...a,session2:{...a.session2,status:n.target.value}}),options:[{value:"scheduled",label:"Scheduled"},{value:"completed",label:"Completed"},{value:"pending",label:"Pending"}]}),s.jsx(u,{label:"Session Date",type:"date",value:a.session2.date,onChange:n=>l({...a,session2:{...a.session2,date:n.target.value}})}),s.jsx(d,{label:"Time Slot",value:a.session2.timeSlot,onChange:n=>l({...a,session2:{...a.session2,timeSlot:n.target.value}}),options:G.map(n=>({value:n,label:n}))})]})]})]})})},oe=o.div`
  display: flex;
  flex-direction: column;
`,le=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ie=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,re=o.div`
  max-width: 320px;
  width: 100%;
`,de=o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,ce=o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,ue=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;o.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`;const F=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`,pe=o.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`,me=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,ge=o.button`
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
`,Me=()=>{const{projectId:e}=R(),m=q(),i=H(),g=Q(),[c,a]=r.useState(""),[l,v]=r.useState("all"),[n,x]=r.useState("all"),[j,h]=r.useState(1),[k,S]=r.useState(null),[I,b]=r.useState(!1),f=10,{data:y}=L({queryKey:["project",e],queryFn:()=>w.getById(e||"proj-001")}),{data:T=[],isLoading:B}=L({queryKey:["projectStudents",e],queryFn:()=>w.getProjectStudents(e||"proj-001")}),z=W({mutationFn:t=>w.updateProjectStudent(e||"proj-001",t),onSuccess:()=>{i.invalidateQueries({queryKey:["projectStudents",e]}),g.success("Student Saved","Student information and session details updated successfully."),S(null),b(!1)},onError:()=>{g.error("Save Failed","Could not update student details.")}}),D=()=>{const t={id:`std-new-${Date.now()}`,name:"",email:"",mobile:"+91 ",grade:"12th",session1:{sessionNumber:1,status:"scheduled",date:new Date().toISOString().slice(0,10),timeSlot:"09:30 AM - 10:30 AM",counselorName:"Anil Iyer",counselorEmail:"anil.iyer1@outlook.com"},session2:{sessionNumber:2,status:"pending",date:new Date().toISOString().slice(0,10),timeSlot:"11:00 AM - 12:00 PM",counselorName:"Mahesh Pillai",counselorEmail:"mahesh.pillai2@rediffmail.com"}};S(t),b(!0)},C=T.filter(t=>{if(l!=="all"&&t.grade!==l||n==="s1_completed"&&t.session1.status!=="completed"||n==="s2_completed"&&t.session2.status!=="completed"||n==="pending"&&t.session1.status!=="pending"&&t.session2.status!=="pending")return!1;if(c){const p=c.toLowerCase();return t.name.toLowerCase().includes(p)||t.email.toLowerCase().includes(p)||t.mobile.toLowerCase().includes(p)||t.session1.counselorName.toLowerCase().includes(p)||t.session2.counselorName.toLowerCase().includes(p)}return!0}),O=[{key:"name",header:"Student Info",width:"220px",render:t=>s.jsxs(de,{children:[s.jsx(ce,{children:t.name}),s.jsxs(ue,{children:[t.email," • ",t.mobile]})]})},{key:"grade",header:"Grade",width:"80px",render:t=>s.jsx(se,{variant:"default",children:t.grade})},{key:"counselor",header:"Counselor",width:"180px",render:t=>s.jsxs(pe,{style:{fontSize:"13px",color:"#1f2937"},children:[s.jsx(_,{size:14})," ",t.session1.counselorName||t.session2.counselorName]})},{key:"session1",header:"Session 1",width:"220px",render:t=>s.jsxs(F,{children:[s.jsx(E,{size:13})," ",t.session1.date," (",t.session1.timeSlot,")"]})},{key:"session2",header:"Session 2",width:"220px",render:t=>s.jsxs(F,{children:[s.jsx(E,{size:13})," ",t.session2.date," (",t.session2.timeSlot,")"]})},{key:"id",header:"Actions",width:"80px",render:t=>s.jsx(me,{children:s.jsx(X,{content:"Edit Student & Sessions",children:s.jsx(ge,{onClick:()=>S(t),children:s.jsx(U,{size:16})})})})}];return s.jsxs(oe,{children:[s.jsx(V,{title:`Project Students - ${(y==null?void 0:y.name)||"Career Guidance"}`,subtitle:"Manage enrolled students, edit personal info, and reassign session counselors.",breadcrumbs:[{label:"Dashboard",href:$.DASHBOARD},{label:"Projects",href:$.PROJECTS},{label:"Project Students"}],onBack:()=>m($.PROJECTS)}),s.jsxs(Y,{padding:"lg",children:[s.jsxs(le,{style:{marginBottom:"24px"},children:[s.jsxs(ie,{children:[s.jsx(re,{children:s.jsx(u,{placeholder:"Search student or counselor name...",leftIcon:s.jsx(J,{size:16}),value:c,onChange:t=>{a(t.target.value),h(1)}})}),s.jsx("div",{style:{width:"160px"},children:s.jsx(d,{value:l,onChange:t=>{v(t.target.value),h(1)},options:[{value:"all",label:"All Grades"},{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]})}),s.jsx("div",{style:{width:"200px"},children:s.jsx(d,{value:n,onChange:t=>{x(t.target.value),h(1)},options:[{value:"all",label:"All Session Status"},{value:"s1_completed",label:"Session 1 Completed"},{value:"s2_completed",label:"Session 2 Completed"},{value:"pending",label:"Pending Sessions"}]})})]}),s.jsx(N,{leftIcon:s.jsx(K,{size:16}),onClick:D,children:"Add Student"})]}),s.jsx(ee,{columns:O,data:C.slice((j-1)*f,j*f),isLoading:B,keyExtractor:t=>t.id,emptyMessage:"No project students found matching filters.",pagination:{page:j,limit:f,total:C.length,totalPages:Math.ceil(C.length/f)||1,onPageChange:h}})]}),s.jsx(ne,{isOpen:!!k||I,onClose:()=>{S(null),b(!1)},student:k,onSave:t=>z.mutate(t),isSaving:z.isPending})]})};export{Me as ProjectStudentsPage};
