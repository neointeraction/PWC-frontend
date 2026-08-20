import{g as o,az as W,u as _,w as K,e as V,r,j as s,c as v,E as Y,aC as E,aD as G,B as J,F as H,ax as X,aA as k,K as Z}from"./index-a7zXg0JL.js";import{u as P}from"./useQuery-o51MCdGR.js";import{u as ee}from"./useMutation-DwnP0O57.js";import{P as te}from"./PageHeader-DdaifotM.js";import{C as se}from"./Card-DKKLy9Mw.js";import{I as oe}from"./Input-CcYvfC84.js";import{S as ne}from"./Select-BAabmZ1Y.js";import{T as ie}from"./Table-BsJCxA-K.js";import"./Badge.styles-rNLOM2_m.js";import"./Table.styles-Cb89hldY.js";import"./FileUpload.styles-BKXqSS7S.js";import"./Breadcrumb-CswGd06t.js";import"./Modal-HiRbBry-.js";import"./ConfirmDialog-C7PpcmZe.js";import"./Checkbox-CyX2E4EW.js";import"./SuccessModal.styles-CmlOLHfD.js";import{T as x}from"./Tooltip-D_2DC_R7.js";import{p as C}from"./project.service-C5qw3TqU.js";import{V as ae,f as L}from"./ViewStudentModal-DJ6Gyfsu.js";import{E as le}from"./EditStudentModal-BdaRVpc7.js";import"./Card.styles-MXf9i3yh.js";import"./counselors.mock-CbyQmpLX.js";const re=o.div`
  display: flex;
  flex-direction: column;
`,de=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ce=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ue=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,D=o.button`
  width: 38px;
  height: 38px;
  border: 1px solid ${({theme:e,$active:n})=>n?"#EF4444":e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e,$active:n})=>n?"#FEF2F2":e.colors.surface};
  color: ${({theme:e,$active:n,$variant:c})=>n||c==="flag"?"#DC2626":c==="excel"?"#16A34A":e.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({$variant:e,theme:n})=>e==="flag"?"#DC2626":e==="excel"?"#16A34A":n.colors.primary};
    background-color: ${({$variant:e,theme:n})=>e==="flag"?"#FEF2F2":e==="excel"?"#F0FDF4":n.colors.primaryLight};
    color: ${({$variant:e,theme:n})=>e==="flag"?"#DC2626":e==="excel"?"#16A34A":n.colors.primary};
  }
`,pe=o.div`
  max-width: 320px;
  width: 100%;
`;o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;o.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`;const me=o.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  text-align: left;
  cursor: pointer;
  transition: color ${({theme:e})=>e.transition.fast};

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
    text-decoration: underline;
  }
`,ge=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: 500;
  color: ${({theme:e})=>e.colors.text};
`;o.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`;const I=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`,xe=o.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`,Se=o.div`
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
`,fe=o.button`
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
`,he=[{value:"all",label:"All Stages"},{value:"Login Activated",label:"Login Activated"},{value:"Profile Completed",label:"Profile Completed"},{value:"Pre-Counselling — Student",label:"Pre-Counselling — Student"},{value:"Pre-Counselling — Parent",label:"Pre-Counselling — Parent"},{value:"Assessment Completed",label:"Assessment Completed"},{value:"Session Booked",label:"Session Booked"},{value:"Session 1 Completed",label:"Session 1 Completed"},{value:"Session 2 Completed",label:"Session 2 Completed"},{value:"Feedback — Student",label:"Feedback — Student"},{value:"Feedback — Parent",label:"Feedback — Parent"},{value:"Report Downloaded",label:"Report Downloaded"}],qe=()=>{const{projectId:e}=W(),n=_(),c=K(),S=V(),[f,z]=r.useState(""),[h,R]=r.useState("all"),[b,N]=r.useState(!1),[y,u]=r.useState(1),[$,p]=r.useState(null),[w,F]=r.useState(null),[B,j]=r.useState(!1),m=10,{data:a}=P({queryKey:["project",e],queryFn:()=>C.getById(e||"proj-001")}),{data:T=[],isLoading:O}=P({queryKey:["projectStudents",e],queryFn:()=>C.getProjectStudents(e||"proj-001")}),A=ee({mutationFn:t=>C.updateProjectStudent(e||"proj-001",t),onSuccess:()=>{c.invalidateQueries({queryKey:["projectStudents",e]}),S.success("Student Saved","Student information and session details updated successfully."),p(null),j(!1)},onError:()=>{S.error("Save Failed","Could not update student details.")}}),M=()=>{const t={id:`std-new-${Date.now()}`,name:"",email:"",mobile:"+91 ",grade:"12th",stage:"Login Activated",session1:{sessionNumber:1,status:"scheduled",date:new Date().toISOString().slice(0,10),timeSlot:"09:30 - 10:30",counselorName:"Anil Iyer",counselorEmail:"anil.iyer1@outlook.com"},session2:{sessionNumber:2,status:"pending",date:new Date().toISOString().slice(0,10),timeSlot:"11:00 - 12:00",counselorName:"Mahesh Pillai",counselorEmail:"mahesh.pillai2@rediffmail.com"}};p(t),j(!0)},q=()=>{const t=`Student ID,Student Name,Stage,Counselor,Session 1 Date,Session 1 Slot,Session 1 Status,Session 2 Date,Session 2 Slot,Session 2 Status
`+g.map(i=>`"${i.studentId||i.id}","${i.name}","${i.stage||"Login Activated"}","${i.session1.counselorName||i.session2.counselorName}","${i.session1.date}","${i.session1.timeSlot}","${i.session1.status}","${i.session2.date}","${i.session2.timeSlot}","${i.session2.status}"`).join(`
`),l=new Blob([t],{type:"text/csv;charset=utf-8;"}),U=URL.createObjectURL(l),d=document.createElement("a");d.setAttribute("href",U),d.setAttribute("download",`${((a==null?void 0:a.name)||"Project").replace(/\s+/g,"_")}_Students_List.csv`),document.body.appendChild(d),d.click(),document.body.removeChild(d),S.success("Excel Export Started","Downloaded project students list (.csv).")},g=T.filter(t=>{if(b&&!t.isFlagged||h!=="all"&&t.stage!==h)return!1;if(f){const l=f.toLowerCase();return t.name.toLowerCase().includes(l)||t.studentId&&t.studentId.toLowerCase().includes(l)||t.stage&&t.stage.toLowerCase().includes(l)||t.email.toLowerCase().includes(l)||t.mobile.toLowerCase().includes(l)||t.session1.counselorName.toLowerCase().includes(l)||t.session2.counselorName.toLowerCase().includes(l)}return!0}),Q=[{key:"studentId",header:"Student ID",width:"120px",render:t=>t.studentId||`ST${100+(parseInt(t.id.replace(/\D/g,""),10)||1)}`},{key:"name",header:"Student",width:"200px",render:t=>s.jsx(me,{type:"button",onClick:()=>F(t),"aria-label":`View details for ${t.name}`,children:t.name})},{key:"stage",header:"Stage",width:"240px",render:t=>s.jsxs(ge,{children:[s.jsx("span",{children:t.stage||"Login Activated"}),t.isFlagged&&s.jsx(x,{content:"Flagged for admin follow-up",children:s.jsx("span",{children:s.jsx(E,{size:15,style:{color:"#EF4444",verticalAlign:"-2px"}})})})]})},{key:"counselor",header:"Counselor",width:"180px",render:t=>s.jsxs(xe,{style:{fontSize:"13px",color:"#1f2937"},children:[s.jsx(X,{size:14})," ",t.session1.counselorName||t.session2.counselorName]})},{key:"session1",header:"Session 1",width:"220px",render:t=>s.jsxs(I,{children:[s.jsx(k,{size:13})," ",L(t.session1.date)," (",t.session1.timeSlot,")"]})},{key:"session2",header:"Session 2",width:"220px",render:t=>s.jsxs(I,{children:[s.jsx(k,{size:13})," ",L(t.session2.date)," (",t.session2.timeSlot,")"]})},{key:"actions",header:"Actions",width:"80px",render:t=>s.jsx(Se,{children:s.jsx(x,{content:"Edit Student & Sessions",children:s.jsx(fe,{onClick:()=>p(t),children:s.jsx(Z,{size:16})})})})}];return s.jsxs(re,{children:[s.jsx(te,{title:`Project Students - ${(a==null?void 0:a.name)||"Career Guidance"}`,subtitle:"Manage enrolled students, edit personal info, and reassign session counselors.",breadcrumbs:[{label:"Dashboard",href:v.DASHBOARD},{label:"Projects",href:v.PROJECTS},{label:"Project Students"}],onBack:()=>n(v.PROJECTS)}),s.jsxs(se,{padding:"lg",children:[s.jsxs(de,{style:{marginBottom:"24px"},children:[s.jsxs(ce,{children:[s.jsx(pe,{children:s.jsx(oe,{placeholder:"Search student, ID, stage or counselor...",leftIcon:s.jsx(Y,{size:16}),value:f,onChange:t=>{z(t.target.value),u(1)}})}),s.jsx("div",{style:{width:"260px"},children:s.jsx(ne,{value:h,onChange:t=>{R(t.target.value),u(1)},options:he})})]}),s.jsxs(ue,{children:[s.jsx(x,{content:b?"Show All Students":"Filter by Red Flag",children:s.jsx(D,{type:"button",$active:b,$variant:"flag",onClick:()=>{N(t=>!t),u(1)},"aria-label":"Filter by Red Flag",children:s.jsx(E,{size:18})})}),s.jsx(x,{content:"Export Students to Excel",children:s.jsx(D,{type:"button",$variant:"excel",onClick:q,"aria-label":"Export Students to Excel",children:s.jsx(G,{size:18})})}),s.jsx(J,{leftIcon:s.jsx(H,{size:16}),onClick:M,children:"Add Student"})]})]}),s.jsx(ie,{columns:Q,data:g.slice((y-1)*m,y*m),isLoading:O,keyExtractor:t=>t.id,emptyMessage:"No project students found matching filters.",pagination:{page:y,limit:m,total:g.length,totalPages:Math.ceil(g.length/m)||1,onPageChange:u}})]}),s.jsx(ae,{isOpen:!!w,onClose:()=>F(null),student:w,instituteName:a==null?void 0:a.instituteName}),s.jsx(le,{isOpen:!!$||B,onClose:()=>{p(null),j(!1)},student:$,onSave:t=>A.mutate(t),isSaving:A.isPending})]})};export{he as PROJECT_STAGES_OPTIONS,qe as ProjectStudentsPage};
