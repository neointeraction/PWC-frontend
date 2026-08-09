import{r as a,j as t,f as R,H as A,B as $,G as F,g as s,aw as D,aF as Q,u as U,y as K,d as J,c as w,O as V,aG as X}from"./index-DquQY_gK.js";import{u as E}from"./useQuery-CF-SbdjC.js";import{u as Y}from"./useMutation-BXZ6a0Mm.js";import{P as Z}from"./PageHeader-CH8ZQzui.js";import{C as _}from"./Card-Df9AylEv.js";import{I as h}from"./Input-wL-_-s6l.js";import{T as B}from"./Table-DM19dC8H.js";import{B as N}from"./Badge-IsTjrd75.js";import{p as k}from"./project.service-CqiMKOES.js";import{M as ee}from"./Modal-BB0US1Ku.js";import"./Tooltip-n1WJqe4o.js";import"./Table.styles-kifmC2_N.js";import"./Select-BWCmQJaH.js";import"./Badge.styles-CPrEOBEn.js";import"./counselors.mock---5XGzUI.js";const te=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,z=s.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,oe=s.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.sm};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,se=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  border: 1px solid
    ${({theme:e,$isSelected:r})=>r?e.colors.primary:e.colors.border};
  background-color: ${({theme:e,$isSelected:r})=>r?e.colors.primaryLight:e.colors.surface};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,re=s.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e,$isSelected:r})=>r?e.fontWeight.bold:e.fontWeight.medium};
  color: ${({theme:e,$isSelected:r})=>r?e.colors.primary:e.colors.text};
`,ie=s.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`,ne=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.sm};
`,ae=s.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};
`,de=s.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.sm};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
  }
`,le=s.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,ce=s.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.danger};
    background-color: ${({theme:e})=>e.colors.dangerLight};
  }
`,ue=({isOpen:e,onClose:r,session:i,onSave:S,isSaving:p})=>{const[b,f]=a.useState(""),[d,m]=a.useState([]),[g,j]=a.useState(""),[y,x]=a.useState(1),n=10,[c,u]=a.useState(""),[v,L]=a.useState(""),[T,M]=a.useState(""),[I]=a.useState("12th");a.useEffect(()=>{if(i){const o=i.timeSlots.find(l=>l.isSelected)||i.timeSlots[0];f((o==null?void 0:o.id)||""),m([...i.assignedStudents]),j(""),x(1)}},[i]);const W=()=>{!c.trim()||!v.trim()||(m(o=>[{name:c.trim(),email:v.trim(),mobile:T.trim()||"+91 98000 00000",grade:I},...o]),u(""),L(""),M(""))},G=o=>{m(l=>l.filter(O=>O.email!==o))},C=a.useMemo(()=>{if(!g)return d;const o=g.toLowerCase();return d.filter(l=>l.name.toLowerCase().includes(o)||l.email.toLowerCase().includes(o)||l.mobile.toLowerCase().includes(o))},[d,g]),q=()=>{i&&S(i.id,b,d)},H=[{key:"email",header:"Action",render:o=>t.jsx(ce,{onClick:()=>G(o.email),title:"Remove Student",children:t.jsx(D,{size:16})})},{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:o=>t.jsx(N,{variant:"default",children:o.grade})}];return i?t.jsx(ee,{isOpen:e,onClose:r,title:`Modify Session - ${i.counselorName}`,subtitle:`Select preferred time slot and manage ${d.length} assigned students for ${i.counselorName}`,size:"xl",footer:t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[t.jsx($,{variant:"secondary",onClick:r,disabled:p,children:"Cancel"}),t.jsxs($,{onClick:q,isLoading:p,children:["Save Changes (",d.length," Students)"]})]}),children:t.jsxs(te,{children:[t.jsxs("div",{children:[t.jsx(z,{children:"Available Time Slots (Select One)"}),t.jsx(oe,{children:i.timeSlots.map(o=>{const l=o.id===b;return t.jsxs(se,{$isSelected:l,onClick:()=>f(o.id),children:[t.jsx(re,{$isSelected:l,children:o.time}),l&&t.jsx(ie,{children:t.jsx(R,{size:14})})]},o.id)})})]}),t.jsxs("div",{children:[t.jsxs(ne,{children:[t.jsxs(z,{style:{margin:0},children:["Assigned Students (",d.length,")"]}),t.jsx("div",{style:{width:"260px"},children:t.jsx(h,{placeholder:"Search assigned students...",leftIcon:t.jsx(A,{size:15}),value:g,onChange:o=>{j(o.target.value),x(1)}})})]}),t.jsxs(ae,{children:[t.jsx(z,{style:{fontSize:"12px",marginBottom:"8px"},children:"Quick Add Student to Session"}),t.jsxs(de,{children:[t.jsx(h,{placeholder:"Student Name",value:c,onChange:o=>u(o.target.value)}),t.jsx(h,{placeholder:"Email Address",type:"email",value:v,onChange:o=>L(o.target.value)}),t.jsx(h,{placeholder:"Mobile Number",value:T,onChange:o=>M(o.target.value)}),t.jsx($,{size:"sm",variant:"secondary",leftIcon:t.jsx(F,{size:16}),onClick:W,children:"Add Student"})]})]}),t.jsx(le,{children:t.jsx(B,{columns:H,data:C,keyExtractor:o=>o.email,emptyMessage:"No students found.",pagination:{page:y,limit:n,total:C.length,totalPages:Math.ceil(C.length/n)||1,onPageChange:x}})})]})]})}):null},me=s.div`
  display: flex;
  flex-direction: column;
`,pe=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ge=s.div`
  max-width: 360px;
  width: 100%;
`,xe=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,fe=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`,he=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  padding-bottom: ${({theme:e})=>e.spacing.md};
`,Se=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,be=s.div`
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
`,je=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,ye=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,$e=s.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,ve=s.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,P=s.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,Ce=s.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`,we=s.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e,$isSelected:r})=>r?e.fontWeight.bold:e.fontWeight.medium};
  border: 1px solid
    ${({theme:e,$isSelected:r})=>r?e.colors.primary:e.colors.border};
  background-color: ${({theme:e,$isSelected:r})=>r?e.colors.primaryLight:e.colors.surfaceHover};
  color: ${({theme:e,$isSelected:r})=>r?e.colors.primary:e.colors.text};
  transition: all 0.2s ease;
`,ke=s.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`,ze=s.div`
  background-color: #fafafa;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  padding: ${({theme:e})=>e.spacing.md};
`,Ne=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Le=s.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
`,Te=[{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:e=>t.jsx(N,{variant:"default",children:e.grade})}],Me=({session:e,onModify:r})=>t.jsxs(fe,{children:[t.jsxs(he,{children:[t.jsxs(Se,{children:[t.jsx(be,{children:e.counselorName.split(" ").map(i=>i[0]).join("")}),t.jsxs(je,{children:[t.jsxs(ye,{children:[t.jsx($e,{children:e.counselorName}),t.jsx(N,{variant:"success",children:"Matched Counselor"})]}),t.jsxs(ve,{children:[e.counselorEmail," • ",e.counselorPhone]})]})]}),t.jsx($,{size:"sm",variant:"secondary",leftIcon:t.jsx(V,{size:16}),onClick:()=>r(e),children:"Modify Session"})]}),t.jsxs("div",{children:[t.jsx(P,{children:"Available Time Slots (Selected Ticked)"}),t.jsx(Ce,{children:e.timeSlots.map(i=>t.jsxs(we,{$isSelected:i.isSelected,children:[t.jsx(X,{size:14}),t.jsx("span",{children:i.time}),i.isSelected&&t.jsx(ke,{children:t.jsx(R,{size:12})})]},i.id))})]}),t.jsxs(ze,{children:[t.jsx(Ne,{children:t.jsxs(P,{style:{margin:0},children:["ASSIGNED STUDENT (",e.assignedStudents.length,")"]})}),t.jsx(Le,{children:t.jsx(B,{columns:Te,data:e.assignedStudents,keyExtractor:i=>i.email,emptyMessage:"No student assigned."})})]})]},e.id),Ke=()=>{const{projectId:e}=Q(),r=U(),i=K(),S=J(),[p,b]=a.useState(""),[f,d]=a.useState(null),{data:m}=E({queryKey:["project",e],queryFn:()=>k.getById(e||"proj-001")}),{data:g=[],isLoading:j}=E({queryKey:["projectSessions",e],queryFn:()=>k.getProjectSessions(e||"proj-001")}),y=Y({mutationFn:({sessionId:n,selectedSlotId:c,assignedStudents:u})=>k.updateCounselorSession(e||"proj-001",n,c,u),onSuccess:()=>{i.invalidateQueries({queryKey:["projectSessions",e]}),S.success("Session Updated","Counselor time slot and assigned students updated successfully."),d(null)},onError:()=>{S.error("Update Failed","Could not update session. Please try again.")}}),x=g.filter(n=>{if(!p)return!0;const c=p.toLowerCase();return n.counselorName.toLowerCase().includes(c)||n.assignedStudents.some(u=>u.name.toLowerCase().includes(c))});return t.jsxs(me,{children:[t.jsx(Z,{title:`Project Sessions - ${(m==null?void 0:m.name)||"Career Guidance"}`,subtitle:"View counselor time slots and assigned student details.",breadcrumbs:[{label:"Dashboard",href:w.DASHBOARD},{label:"Projects",href:w.PROJECTS},{label:"Project Sessions"}],onBack:()=>r(w.PROJECTS)}),t.jsxs(_,{padding:"lg",children:[t.jsx(pe,{style:{marginBottom:"20px"},children:t.jsx(ge,{children:t.jsx(h,{placeholder:"Search counselor or student name...",leftIcon:t.jsx(A,{size:16}),value:p,onChange:n=>b(n.target.value)})})}),j?t.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"Loading sessions..."}):x.length===0?t.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"No counselor sessions found."}):t.jsx(xe,{children:x.map(n=>t.jsx(Me,{session:n,onModify:d},n.id))})]}),t.jsx(ue,{isOpen:!!f,onClose:()=>d(null),session:f,onSave:(n,c,u)=>{y.mutate({sessionId:n,selectedSlotId:c,assignedStudents:u})},isSaving:y.isPending})]})};export{Ke as ProjectSessionsPage};
