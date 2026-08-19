import{r,j as s,B as $,aA as A,aE as R,g as n,az as q,u as K,w as H,e as Q,c as M,E as Y,F as _,ax as J,K as U}from"./index-MAFUjG_U.js";import{u as P}from"./useQuery-CljOJEwV.js";import{u as W}from"./useMutation-CPD0zMc8.js";import{P as V}from"./PageHeader-D7aOULUx.js";import{C as X}from"./Card-_60JNZUT.js";import{I as S}from"./Input-kxkCRs14.js";import{S as j}from"./Select-D9CY3fX3.js";import{T as Z}from"./Table-LOmb570M.js";import{B as ee}from"./Badge-Bnm96zIe.js";import"./Table.styles-D3L88ciL.js";import"./FileUpload.styles-CCVUfS9-.js";import"./Breadcrumb-kbAjTRnF.js";import{M as se}from"./Modal-BNANDCMU.js";import"./ConfirmDialog-CPd-14ea.js";import"./Checkbox-Alt7KLrZ.js";import"./SuccessModal.styles-CMTZ9RZo.js";import{T as te}from"./Tooltip-DfKLnnTN.js";import{p as N}from"./project.service-CnUVwu11.js";import"./Card.styles-BiOCYGMp.js";import"./Badge.styles-uAjA-8ND.js";import"./counselors.mock-CbyQmpLX.js";const T=e=>{if(!e)return"";const a=(e.includes("T")?e.split("T")[0]:e).split("-");return a.length===3&&a[0].length===4?`${a[2]}-${a[1]}-${a[0]}`:e},oe=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,E=n.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,B=n.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`,ne=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,ie=n.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 12px 14px;
`,ae=n.div`
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 10px;
  align-items: flex-end;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,le=n.textarea`
  width: 100%;
  min-height: 40px;
  height: 40px;
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
`,re=n.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
`,de=n.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,ce=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,pe=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ue=n.span`
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,me=n.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 4px;
`,xe=n.span`
  font-size: 10px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textMuted};
  text-transform: uppercase;
`,ge=n.div`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.text};
  line-height: 1.45;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  svg {
    color: ${({theme:e})=>e.colors.primary};
    margin-top: 2px;
    flex-shrink: 0;
  }
`,he=n.p`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textMuted};
  font-style: italic;
  margin: 0;
  padding: 8px 0;
`,fe=["Anil Iyer","Mahesh Pillai","Hema Kurup","Girish Bhat","Manoj Chacko"],ye=[{value:"Pre-counselling",label:"Pre-counselling"},{value:"Session 1",label:"Session 1"},{value:"Session 2",label:"Session 2"},{value:"Feedback",label:"Feedback"},{value:"General",label:"General"}],I=[{id:"c-1",session:"Pre-counselling",comment:"precounselling call made, parent confirmed session availability",createdAt:"16 Aug 2026, 11:30 AM",by:"Admin"}],be=({isOpen:e,onClose:f,student:a,onSave:v,isSaving:u})=>{const[i,l]=r.useState(null),[C,m]=r.useState("Pre-counselling"),[x,g]=r.useState(""),[c,h]=r.useState(I);if(r.useEffect(()=>{if(a){const t=JSON.parse(JSON.stringify(a));t.parentMobile||(t.parentMobile="+91 9820011223"),l(t),t.comments&&t.comments.length>0?h(t.comments):h(I)}},[a]),!i)return null;const p=()=>{if(!x.trim())return;const t=new Date,d=`${t.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}, ${t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,y={id:`comment-${Date.now()}`,session:C,comment:x.trim(),createdAt:d,by:"Admin"};h(k=>[y,...k]),g("")},w=()=>{const t={...i,comments:c};v(t)};return s.jsx(se,{isOpen:e,onClose:f,title:a!=null&&a.id?`Edit Student - ${i.name}`:"Add New Student",subtitle:"Modify student personal details, grade, parent contact, and session notes.",size:"lg",footer:s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[s.jsx($,{variant:"secondary",onClick:f,disabled:u,children:"Cancel"}),s.jsx($,{onClick:w,isLoading:u,children:"Save Changes"})]}),children:s.jsxs(oe,{children:[s.jsxs(E,{children:[s.jsx(B,{children:"Student Information"}),s.jsxs(ne,{children:[s.jsx(S,{label:"Student Full Name",value:i.name,onChange:t=>l({...i,name:t.target.value})}),s.jsx(S,{label:"Email Address",type:"email",value:i.email,onChange:t=>l({...i,email:t.target.value})}),s.jsx(S,{label:"Mobile Number",value:i.mobile,onChange:t=>l({...i,mobile:t.target.value})}),s.jsx(S,{label:"Parent Phone Number",placeholder:"+91 9820011223",value:i.parentMobile||"",onChange:t=>l({...i,parentMobile:t.target.value})}),s.jsx(j,{label:"Grade / Class",value:i.grade,onChange:t=>l({...i,grade:t.target.value}),options:[{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]}),s.jsx(j,{label:"Assigned Counselor",value:i.session1.counselorName||i.session2.counselorName,onChange:t=>{const d=t.target.value;l({...i,session1:{...i.session1,counselorName:d},session2:{...i.session2,counselorName:d}})},options:fe.map(t=>({value:t,label:t}))})]})]}),s.jsxs(E,{children:[s.jsx(B,{children:"Session Notes & Comments"}),s.jsx(ie,{children:s.jsxs(ae,{children:[s.jsx(j,{label:"Session",value:C,onChange:t=>m(t.target.value),options:ye}),s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[s.jsx("span",{style:{fontSize:"13px",fontWeight:600,color:"#334155"},children:"Comment / Note"}),s.jsx(le,{placeholder:"e.g. precounselling call made, parent confirmed...",value:x,onChange:t=>g(t.target.value),onKeyDown:t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),p())}})]}),s.jsx($,{variant:"secondary",size:"sm",onClick:p,disabled:!x.trim(),style:{height:"38px",alignSelf:"flex-end"},children:"Add Note"})]})}),s.jsx(re,{children:c.length===0?s.jsx(he,{children:"No comments logged yet."}):c.map(t=>s.jsxs(de,{children:[s.jsxs(ce,{children:[s.jsxs(pe,{children:[s.jsx(ue,{children:t.session}),s.jsxs(me,{children:[s.jsx(A,{size:12}),t.createdAt]})]}),t.by&&s.jsxs(xe,{children:["BY: ",t.by]})]}),s.jsxs(ge,{children:[s.jsx(R,{size:14}),s.jsx("span",{children:t.comment})]})]},t.id))})]})]})})},Se=n.div`
  display: flex;
  flex-direction: column;
`,je=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ve=n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Ce=n.div`
  max-width: 320px;
  width: 100%;
`,$e=n.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,we=n.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,ke=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;n.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;n.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`;const D=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`,ze=n.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`,Me=n.div`
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
`,Ne=n.button`
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
`,Ve=()=>{const{projectId:e}=q(),f=K(),a=H(),v=Q(),[u,i]=r.useState(""),[l,C]=r.useState("all"),[m,x]=r.useState("all"),[g,c]=r.useState(1),[h,p]=r.useState(null),[w,t]=r.useState(!1),d=10,{data:y}=P({queryKey:["project",e],queryFn:()=>N.getById(e||"proj-001")}),{data:k=[],isLoading:F}=P({queryKey:["projectStudents",e],queryFn:()=>N.getProjectStudents(e||"proj-001")}),L=W({mutationFn:o=>N.updateProjectStudent(e||"proj-001",o),onSuccess:()=>{a.invalidateQueries({queryKey:["projectStudents",e]}),v.success("Student Saved","Student information and session details updated successfully."),p(null),t(!1)},onError:()=>{v.error("Save Failed","Could not update student details.")}}),G=()=>{const o={id:`std-new-${Date.now()}`,name:"",email:"",mobile:"+91 ",grade:"12th",session1:{sessionNumber:1,status:"scheduled",date:new Date().toISOString().slice(0,10),timeSlot:"09:30 - 10:30",counselorName:"Anil Iyer",counselorEmail:"anil.iyer1@outlook.com"},session2:{sessionNumber:2,status:"pending",date:new Date().toISOString().slice(0,10),timeSlot:"11:00 - 12:00",counselorName:"Mahesh Pillai",counselorEmail:"mahesh.pillai2@rediffmail.com"}};p(o),t(!0)},z=k.filter(o=>{if(l!=="all"&&o.grade!==l||m==="s1_completed"&&o.session1.status!=="completed"||m==="s2_completed"&&o.session2.status!=="completed"||m==="pending"&&o.session1.status!=="pending"&&o.session2.status!=="pending")return!1;if(u){const b=u.toLowerCase();return o.name.toLowerCase().includes(b)||o.email.toLowerCase().includes(b)||o.mobile.toLowerCase().includes(b)||o.session1.counselorName.toLowerCase().includes(b)||o.session2.counselorName.toLowerCase().includes(b)}return!0}),O=[{key:"name",header:"Student Info",width:"220px",render:o=>s.jsxs($e,{children:[s.jsx(we,{children:o.name}),s.jsxs(ke,{children:[o.email," • ",o.mobile]})]})},{key:"grade",header:"Grade",width:"80px",render:o=>s.jsx(ee,{variant:"default",children:o.grade})},{key:"counselor",header:"Counselor",width:"180px",render:o=>s.jsxs(ze,{style:{fontSize:"13px",color:"#1f2937"},children:[s.jsx(J,{size:14})," ",o.session1.counselorName||o.session2.counselorName]})},{key:"session1",header:"Session 1",width:"220px",render:o=>s.jsxs(D,{children:[s.jsx(A,{size:13})," ",T(o.session1.date)," (",o.session1.timeSlot,")"]})},{key:"session2",header:"Session 2",width:"220px",render:o=>s.jsxs(D,{children:[s.jsx(A,{size:13})," ",T(o.session2.date)," (",o.session2.timeSlot,")"]})},{key:"actions",header:"Actions",width:"80px",render:o=>s.jsx(Me,{children:s.jsx(te,{content:"Edit Student & Sessions",children:s.jsx(Ne,{onClick:()=>p(o),children:s.jsx(U,{size:16})})})})}];return s.jsxs(Se,{children:[s.jsx(V,{title:`Project Students - ${(y==null?void 0:y.name)||"Career Guidance"}`,subtitle:"Manage enrolled students, edit personal info, and reassign session counselors.",breadcrumbs:[{label:"Dashboard",href:M.DASHBOARD},{label:"Projects",href:M.PROJECTS},{label:"Project Students"}],onBack:()=>f(M.PROJECTS)}),s.jsxs(X,{padding:"lg",children:[s.jsxs(je,{style:{marginBottom:"24px"},children:[s.jsxs(ve,{children:[s.jsx(Ce,{children:s.jsx(S,{placeholder:"Search student or counselor name...",leftIcon:s.jsx(Y,{size:16}),value:u,onChange:o=>{i(o.target.value),c(1)}})}),s.jsx("div",{style:{width:"160px"},children:s.jsx(j,{value:l,onChange:o=>{C(o.target.value),c(1)},options:[{value:"all",label:"All Grades"},{value:"10th",label:"10th Grade"},{value:"11th",label:"11th Grade"},{value:"12th",label:"12th Grade"}]})}),s.jsx("div",{style:{width:"200px"},children:s.jsx(j,{value:m,onChange:o=>{x(o.target.value),c(1)},options:[{value:"all",label:"All Session Status"},{value:"s1_completed",label:"Session 1 Completed"},{value:"s2_completed",label:"Session 2 Completed"},{value:"pending",label:"Pending Sessions"}]})})]}),s.jsx($,{leftIcon:s.jsx(_,{size:16}),onClick:G,children:"Add Student"})]}),s.jsx(Z,{columns:O,data:z.slice((g-1)*d,g*d),isLoading:F,keyExtractor:o=>o.id,emptyMessage:"No project students found matching filters.",pagination:{page:g,limit:d,total:z.length,totalPages:Math.ceil(z.length/d)||1,onPageChange:c}})]}),s.jsx(be,{isOpen:!!h||w,onClose:()=>{p(null),t(!1)},student:h,onSave:o=>L.mutate(o),isSaving:L.isPending})]})};export{Ve as ProjectStudentsPage};
