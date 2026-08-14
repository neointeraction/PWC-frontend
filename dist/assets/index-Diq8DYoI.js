import{r,j as s,B as N,g as o,aU as R,u as q,S as K,e as Q,c as $,_,Z as H,a3 as J,aS as U,K as L}from"./index-B6MU9CPz.js";import{u as E}from"./useQuery-B4c0qsO6.js";import{u as W}from"./useMutation-DF7mLgws.js";import{P as Z}from"./PageHeader-DVYmftZX.js";import{C as V}from"./Card-Dd4MI-gX.js";import{I as u}from"./Input-CwfTR_Bp.js";import{S as d}from"./Select-DKoWOyrE.js";import{T as X}from"./Table-BIhR0MJn.js";import{B as Y}from"./Badge-BzBm2vLL.js";import"./Table.styles-DeHeiY8x.js";import"./FileUpload.styles-CZyPTynX.js";import"./Breadcrumb-C7lv3now.js";import{M as ee}from"./Modal-BLiP14UD.js";import"./ConfirmDialog-D0SidjN7.js";import"./Checkbox-_Hq9YXcA.js";import"./SuccessModal.styles-Yz8Lvnau.js";import{T as se}from"./Tooltip-BaOOZ4TY.js";import{p as w}from"./project.service-CVc7JFAy.js";import"./Card.styles-BsYtRoVd.js";import"./Badge.styles-DD68j4M8.js";import"./counselors.mock---5XGzUI.js";const te=o.div`
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
`,ae=["Anil Iyer","Mahesh Pillai","Hema Kurup","Girish Bhat","Manoj Chacko"],I=["09:30 AM - 10:30 AM","11:00 AM - 12:00 PM","02:00 PM - 03:00 PM","04:00 PM - 05:00 PM"],ne=({isOpen:e,onClose:p,student:l,onSave:g,isSaving:c})=>{const[a,i]=r.useState(null);if(r.useEffect(()=>{l&&i(JSON.parse(JSON.stringify(l)))},[l]),!a)return null;const v=()=>{g(a)};return s.jsx(ee,{isOpen:e,onClose:p,title:l!=null&&l.id?`Edit Student - ${a.name}`:"Add New Student",subtitle:"Modify student personal details, grade, and session counselor assignments.",size:"lg",footer:s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[s.jsx(N,{variant:"secondary",onClick:p,disabled:c,children:"Cancel"}),s.jsx(N,{onClick:v,isLoading:c,children:"Save Changes"})]}),children:s.jsxs(te,{children:[s.jsxs(M,{children:[s.jsx(P,{children:"Student Information"}),s.jsxs(A,{children:[s.jsx(u,{label:"Student Full Name",value:a.name,onChange:n=>i({...a,name:n.target.value})}),s.jsx(u,{label:"Email Address",type:"email",value:a.email,onChange:n=>i({...a,email:n.target.value})}),s.jsx(u,{label:"Mobile Number",value:a.mobile,onChange:n=>i({...a,mobile:n.target.value})}),s.jsx(d,{label:"Grade / Class",value:a.grade,onChange:n=>i({...a,grade:n.target.value}),options:[{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]}),s.jsx(d,{label:"Assigned Counselor",value:a.session1.counselorName||a.session2.counselorName,onChange:n=>{const x=n.target.value;i({...a,session1:{...a.session1,counselorName:x},session2:{...a.session2,counselorName:x}})},options:ae.map(n=>({value:n,label:n}))})]})]}),s.jsxs(M,{children:[s.jsx(P,{children:"Session 1 Details"}),s.jsxs(A,{children:[s.jsx(d,{label:"Session 1 Status",value:a.session1.status,onChange:n=>i({...a,session1:{...a.session1,status:n.target.value}}),options:[{value:"scheduled",label:"Scheduled"},{value:"completed",label:"Completed"},{value:"pending",label:"Pending"}]}),s.jsx(u,{label:"Session Date",type:"date",value:a.session1.date,onChange:n=>i({...a,session1:{...a.session1,date:n.target.value}})}),s.jsx(d,{label:"Time Slot",value:a.session1.timeSlot,onChange:n=>i({...a,session1:{...a.session1,timeSlot:n.target.value}}),options:I.map(n=>({value:n,label:n}))})]})]}),s.jsxs(M,{children:[s.jsx(P,{children:"Session 2 Details"}),s.jsxs(A,{children:[s.jsx(d,{label:"Session 2 Status",value:a.session2.status,onChange:n=>i({...a,session2:{...a.session2,status:n.target.value}}),options:[{value:"scheduled",label:"Scheduled"},{value:"completed",label:"Completed"},{value:"pending",label:"Pending"}]}),s.jsx(u,{label:"Session Date",type:"date",value:a.session2.date,onChange:n=>i({...a,session2:{...a.session2,date:n.target.value}})}),s.jsx(d,{label:"Time Slot",value:a.session2.timeSlot,onChange:n=>i({...a,session2:{...a.session2,timeSlot:n.target.value}}),options:I.map(n=>({value:n,label:n}))})]})]})]})})},oe=o.div`
  display: flex;
  flex-direction: column;
`,ie=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,le=o.div`
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
`;const T=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`,me=o.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`,pe=o.div`
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
`,Be=()=>{const{projectId:e}=R(),p=q(),l=K(),g=Q(),[c,a]=r.useState(""),[i,v]=r.useState("all"),[n,x]=r.useState("all"),[j,h]=r.useState(1),[k,S]=r.useState(null),[B,b]=r.useState(!1),f=10,{data:y}=E({queryKey:["project",e],queryFn:()=>w.getById(e||"proj-001")}),{data:F=[],isLoading:G}=E({queryKey:["projectStudents",e],queryFn:()=>w.getProjectStudents(e||"proj-001")}),z=W({mutationFn:t=>w.updateProjectStudent(e||"proj-001",t),onSuccess:()=>{l.invalidateQueries({queryKey:["projectStudents",e]}),g.success("Student Saved","Student information and session details updated successfully."),S(null),b(!1)},onError:()=>{g.error("Save Failed","Could not update student details.")}}),D=()=>{const t={id:`std-new-${Date.now()}`,name:"",email:"",mobile:"+91 ",grade:"12th",session1:{sessionNumber:1,status:"scheduled",date:new Date().toISOString().slice(0,10),timeSlot:"09:30 AM - 10:30 AM",counselorName:"Anil Iyer",counselorEmail:"anil.iyer1@outlook.com"},session2:{sessionNumber:2,status:"pending",date:new Date().toISOString().slice(0,10),timeSlot:"11:00 AM - 12:00 PM",counselorName:"Mahesh Pillai",counselorEmail:"mahesh.pillai2@rediffmail.com"}};S(t),b(!0)},C=F.filter(t=>{if(i!=="all"&&t.grade!==i||n==="s1_completed"&&t.session1.status!=="completed"||n==="s2_completed"&&t.session2.status!=="completed"||n==="pending"&&t.session1.status!=="pending"&&t.session2.status!=="pending")return!1;if(c){const m=c.toLowerCase();return t.name.toLowerCase().includes(m)||t.email.toLowerCase().includes(m)||t.mobile.toLowerCase().includes(m)||t.session1.counselorName.toLowerCase().includes(m)||t.session2.counselorName.toLowerCase().includes(m)}return!0}),O=[{key:"id",header:"Actions",width:"80px",render:t=>s.jsx(pe,{children:s.jsx(se,{content:"Edit Student & Sessions",children:s.jsx(ge,{onClick:()=>S(t),children:s.jsx(J,{size:16})})})})},{key:"name",header:"Student Info",width:"220px",render:t=>s.jsxs(de,{children:[s.jsx(ce,{children:t.name}),s.jsxs(ue,{children:[t.email," • ",t.mobile]})]})},{key:"grade",header:"Grade",width:"80px",render:t=>s.jsx(Y,{variant:"default",children:t.grade})},{key:"counselor",header:"Counselor",width:"180px",render:t=>s.jsxs(me,{style:{fontSize:"13px",color:"#1f2937"},children:[s.jsx(U,{size:14})," ",t.session1.counselorName||t.session2.counselorName]})},{key:"session1",header:"Session 1",width:"220px",render:t=>s.jsxs(T,{children:[s.jsx(L,{size:13})," ",t.session1.date," (",t.session1.timeSlot,")"]})},{key:"session2",header:"Session 2",width:"220px",render:t=>s.jsxs(T,{children:[s.jsx(L,{size:13})," ",t.session2.date," (",t.session2.timeSlot,")"]})}];return s.jsxs(oe,{children:[s.jsx(Z,{title:`Project Students - ${(y==null?void 0:y.name)||"Career Guidance"}`,subtitle:"Manage enrolled students, edit personal info, and reassign session counselors.",breadcrumbs:[{label:"Dashboard",href:$.DASHBOARD},{label:"Projects",href:$.PROJECTS},{label:"Project Students"}],onBack:()=>p($.PROJECTS)}),s.jsxs(V,{padding:"lg",children:[s.jsxs(ie,{style:{marginBottom:"24px"},children:[s.jsxs(le,{children:[s.jsx(re,{children:s.jsx(u,{placeholder:"Search student or counselor name...",leftIcon:s.jsx(_,{size:16}),value:c,onChange:t=>{a(t.target.value),h(1)}})}),s.jsx("div",{style:{width:"160px"},children:s.jsx(d,{value:i,onChange:t=>{v(t.target.value),h(1)},options:[{value:"all",label:"All Grades"},{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]})}),s.jsx("div",{style:{width:"200px"},children:s.jsx(d,{value:n,onChange:t=>{x(t.target.value),h(1)},options:[{value:"all",label:"All Session Status"},{value:"s1_completed",label:"Session 1 Completed"},{value:"s2_completed",label:"Session 2 Completed"},{value:"pending",label:"Pending Sessions"}]})})]}),s.jsx(N,{leftIcon:s.jsx(H,{size:16}),onClick:D,children:"Add Student"})]}),s.jsx(X,{columns:O,data:C.slice((j-1)*f,j*f),isLoading:G,keyExtractor:t=>t.id,emptyMessage:"No project students found matching filters.",pagination:{page:j,limit:f,total:C.length,totalPages:Math.ceil(C.length/f)||1,onPageChange:h}})]}),s.jsx(ne,{isOpen:!!k||B,onClose:()=>{S(null),b(!1)},student:k,onSave:t=>z.mutate(t),isSaving:z.isPending})]})};export{Be as ProjectStudentsPage};
