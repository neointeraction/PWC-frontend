import{r,j as s,B as N,g as i,aS as G,u as O,P as D,e as R,c as $,X as q,Y as Q,aQ as H,H as z,a1 as Y}from"./index-8F0JLEEw.js";import{u as M}from"./useQuery-C0nIzzYp.js";import{u as J}from"./useMutation-DeU1Ru1N.js";import{P as K}from"./PageHeader-KpQVPwcf.js";import{C as _}from"./Card-NeciUoS1.js";import{I as f}from"./Input-B-q5qiE9.js";import{S}from"./Select-DOe36KaS.js";import{T as U}from"./Table-De9tPJgC.js";import{B as W}from"./Badge-BUMvygFF.js";import"./Table.styles-ChZe2G4O.js";import"./FileUpload.styles-KF3-WQbH.js";import"./Breadcrumb-BKyN92ya.js";import{M as X}from"./Modal-CytuL-Vc.js";import"./ConfirmDialog-xc0s7d87.js";import"./Checkbox-CuNKoPRx.js";import"./SuccessModal.styles-DHiS2Can.js";import{T as V}from"./Tooltip-K2tZS8Xo.js";import{p as w}from"./project.service-UrgtLgln.js";import"./Card.styles-BzuSn5_T.js";import"./Badge.styles-DMnJVozC.js";import"./projects.mock-DLTGC6HA.js";import"./counselors.mock-CbyQmpLX.js";const A=e=>{if(!e)return"";const a=(e.includes("T")?e.split("T")[0]:e).split("-");return a.length===3&&a[0].length===4?`${a[2]}-${a[1]}-${a[0]}`:e},Z=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ee=i.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,se=i.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`,te=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,ne=["Anil Iyer","Mahesh Pillai","Hema Kurup","Girish Bhat","Manoj Chacko"],oe=({isOpen:e,onClose:c,student:a,onSave:p,isSaving:d})=>{const[n,l]=r.useState(null);if(r.useEffect(()=>{a&&l(JSON.parse(JSON.stringify(a)))},[a]),!n)return null;const y=()=>{p(n)};return s.jsx(X,{isOpen:e,onClose:c,title:a!=null&&a.id?`Edit Student - ${n.name}`:"Add New Student",subtitle:"Modify student personal details, grade, and assigned counselor.",size:"md",footer:s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[s.jsx(N,{variant:"secondary",onClick:c,disabled:d,children:"Cancel"}),s.jsx(N,{onClick:y,isLoading:d,children:"Save Changes"})]}),children:s.jsx(Z,{children:s.jsxs(ee,{children:[s.jsx(se,{children:"Student Information"}),s.jsxs(te,{children:[s.jsx(f,{label:"Student Full Name",value:n.name,onChange:o=>l({...n,name:o.target.value})}),s.jsx(f,{label:"Email Address",type:"email",value:n.email,onChange:o=>l({...n,email:o.target.value})}),s.jsx(f,{label:"Mobile Number",value:n.mobile,onChange:o=>l({...n,mobile:o.target.value})}),s.jsx(S,{label:"Grade / Class",value:n.grade,onChange:o=>l({...n,grade:o.target.value}),options:[{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]}),s.jsx(S,{label:"Assigned Counselor",value:n.session1.counselorName||n.session2.counselorName,onChange:o=>{const m=o.target.value;l({...n,session1:{...n.session1,counselorName:m},session2:{...n.session2,counselorName:m}})},options:ne.map(o=>({value:o,label:o}))})]})]})})})},ie=i.div`
  display: flex;
  flex-direction: column;
`,ae=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,le=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,re=i.div`
  max-width: 320px;
  width: 100%;
`,de=i.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,ce=i.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,ue=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;i.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`;const E=i.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`,pe=i.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`,me=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  tr:hover & {
    opacity: 1;
    visibility: visible;
  }
`,xe=i.button`
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
`,Fe=()=>{const{projectId:e}=G(),c=O(),a=D(),p=R(),[d,n]=r.useState(""),[l,y]=r.useState("all"),[o,m]=r.useState("all"),[j,x]=r.useState(1),[k,g]=r.useState(null),[L,v]=r.useState(!1),h=10,{data:b}=M({queryKey:["project",e],queryFn:()=>w.getById(e||"proj-001")}),{data:I=[],isLoading:T}=M({queryKey:["projectStudents",e],queryFn:()=>w.getProjectStudents(e||"proj-001")}),P=J({mutationFn:t=>w.updateProjectStudent(e||"proj-001",t),onSuccess:()=>{a.invalidateQueries({queryKey:["projectStudents",e]}),p.success("Student Saved","Student information and session details updated successfully."),g(null),v(!1)},onError:()=>{p.error("Save Failed","Could not update student details.")}}),B=()=>{const t={id:`std-new-${Date.now()}`,name:"",email:"",mobile:"+91 ",grade:"12th",session1:{sessionNumber:1,status:"scheduled",date:new Date().toISOString().slice(0,10),timeSlot:"09:30 - 10:30",counselorName:"Anil Iyer",counselorEmail:"anil.iyer1@outlook.com"},session2:{sessionNumber:2,status:"pending",date:new Date().toISOString().slice(0,10),timeSlot:"11:00 - 12:00",counselorName:"Mahesh Pillai",counselorEmail:"mahesh.pillai2@rediffmail.com"}};g(t),v(!0)},C=I.filter(t=>{if(l!=="all"&&t.grade!==l||o==="s1_completed"&&t.session1.status!=="completed"||o==="s2_completed"&&t.session2.status!=="completed"||o==="pending"&&t.session1.status!=="pending"&&t.session2.status!=="pending")return!1;if(d){const u=d.toLowerCase();return t.name.toLowerCase().includes(u)||t.email.toLowerCase().includes(u)||t.mobile.toLowerCase().includes(u)||t.session1.counselorName.toLowerCase().includes(u)||t.session2.counselorName.toLowerCase().includes(u)}return!0}),F=[{key:"name",header:"Student Info",width:"220px",render:t=>s.jsxs(de,{children:[s.jsx(ce,{children:t.name}),s.jsxs(ue,{children:[t.email," • ",t.mobile]})]})},{key:"grade",header:"Grade",width:"80px",render:t=>s.jsx(W,{variant:"default",children:t.grade})},{key:"counselor",header:"Counselor",width:"180px",render:t=>s.jsxs(pe,{style:{fontSize:"13px",color:"#1f2937"},children:[s.jsx(H,{size:14})," ",t.session1.counselorName||t.session2.counselorName]})},{key:"session1",header:"Session 1",width:"220px",render:t=>s.jsxs(E,{children:[s.jsx(z,{size:13})," ",A(t.session1.date)," (",t.session1.timeSlot,")"]})},{key:"session2",header:"Session 2",width:"220px",render:t=>s.jsxs(E,{children:[s.jsx(z,{size:13})," ",A(t.session2.date)," (",t.session2.timeSlot,")"]})},{key:"actions",header:"Actions",width:"80px",render:t=>s.jsx(me,{children:s.jsx(V,{content:"Edit Student & Sessions",children:s.jsx(xe,{onClick:()=>g(t),children:s.jsx(Y,{size:16})})})})}];return s.jsxs(ie,{children:[s.jsx(K,{title:`Project Students - ${(b==null?void 0:b.name)||"Career Guidance"}`,subtitle:"Manage enrolled students, edit personal info, and reassign session counselors.",breadcrumbs:[{label:"Dashboard",href:$.DASHBOARD},{label:"Projects",href:$.PROJECTS},{label:"Project Students"}],onBack:()=>c($.PROJECTS),actions:s.jsx(N,{leftIcon:s.jsx(q,{size:16}),onClick:B,children:"Add Student"})}),s.jsxs(_,{padding:"lg",children:[s.jsx(ae,{style:{marginBottom:"24px"},children:s.jsxs(le,{children:[s.jsx(re,{children:s.jsx(f,{placeholder:"Search student or counselor name...",leftIcon:s.jsx(Q,{size:16}),value:d,onChange:t=>{n(t.target.value),x(1)}})}),s.jsx("div",{style:{width:"160px"},children:s.jsx(S,{value:l,onChange:t=>{y(t.target.value),x(1)},options:[{value:"all",label:"All Grades"},{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]})}),s.jsx("div",{style:{width:"200px"},children:s.jsx(S,{value:o,onChange:t=>{m(t.target.value),x(1)},options:[{value:"all",label:"All Session Status"},{value:"s1_completed",label:"Session 1 Completed"},{value:"s2_completed",label:"Session 2 Completed"},{value:"pending",label:"Pending Sessions"}]})})]})}),s.jsx(U,{columns:F,data:C.slice((j-1)*h,j*h),isLoading:T,keyExtractor:t=>t.id,emptyMessage:"No project students found matching filters.",pagination:{page:j,limit:h,total:C.length,totalPages:Math.ceil(C.length/h)||1,onPageChange:x}})]}),s.jsx(oe,{isOpen:!!k||L,onClose:()=>{g(null),v(!1)},student:k,onSave:t=>P.mutate(t),isSaving:P.isPending})]})};export{Fe as ProjectStudentsPage};
