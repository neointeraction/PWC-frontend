import{r as a,j as t,f as R,H as A,B as $,G as F,g as o,aw as D,aF as Q,u as U,y as K,d as J,c as w,O as V,aG as X}from"./index-DnMR83cZ.js";import{M as Y,u as E}from"./Modal-BSgaqv1a.js";import{u as Z}from"./useMutation-C38kREAh.js";import{P as _}from"./PageHeader-CRc9mc6D.js";import{C as ee}from"./Card-DnSjf-TA.js";import{I as h}from"./Input-YhPybyDv.js";import{T as B}from"./Table-AMmlCRXx.js";import{B as N}from"./Badge-0GO_cFVK.js";import{p as k}from"./project.service-CqiMKOES.js";import"./Table.styles-dp_nvHXF.js";import"./Select-B9o6meGL.js";import"./Badge.styles-B1OxzMmq.js";import"./counselors.mock---5XGzUI.js";const te=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,z=o.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,se=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.sm};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,oe=o.div`
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
`,re=o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e,$isSelected:r})=>r?e.fontWeight.bold:e.fontWeight.medium};
  color: ${({theme:e,$isSelected:r})=>r?e.colors.primary:e.colors.text};
`,ie=o.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`,ne=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.sm};
`,ae=o.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};
`,de=o.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.sm};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
  }
`,le=o.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,ce=o.button`
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
`,ue=({isOpen:e,onClose:r,session:i,onSave:S,isSaving:m})=>{const[b,f]=a.useState(""),[d,p]=a.useState([]),[g,j]=a.useState(""),[y,x]=a.useState(1),n=10,[c,u]=a.useState(""),[v,L]=a.useState(""),[T,M]=a.useState(""),[I]=a.useState("12th");a.useEffect(()=>{if(i){const s=i.timeSlots.find(l=>l.isSelected)||i.timeSlots[0];f((s==null?void 0:s.id)||""),p([...i.assignedStudents]),j(""),x(1)}},[i]);const W=()=>{!c.trim()||!v.trim()||(p(s=>[{name:c.trim(),email:v.trim(),mobile:T.trim()||"+91 98000 00000",grade:I},...s]),u(""),L(""),M(""))},G=s=>{p(l=>l.filter(O=>O.email!==s))},C=a.useMemo(()=>{if(!g)return d;const s=g.toLowerCase();return d.filter(l=>l.name.toLowerCase().includes(s)||l.email.toLowerCase().includes(s)||l.mobile.toLowerCase().includes(s))},[d,g]),q=()=>{i&&S(i.id,b,d)},H=[{key:"email",header:"Action",render:s=>t.jsx(ce,{onClick:()=>G(s.email),title:"Remove Student",children:t.jsx(D,{size:16})})},{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:s=>t.jsx(N,{variant:"default",children:s.grade})}];return i?t.jsx(Y,{isOpen:e,onClose:r,title:`Modify Session - ${i.counselorName}`,subtitle:`Select preferred time slot and manage ${d.length} assigned students for ${i.counselorName}`,size:"xl",footer:t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[t.jsx($,{variant:"secondary",onClick:r,disabled:m,children:"Cancel"}),t.jsxs($,{onClick:q,isLoading:m,children:["Save Changes (",d.length," Students)"]})]}),children:t.jsxs(te,{children:[t.jsxs("div",{children:[t.jsx(z,{children:"Available Time Slots (Select One)"}),t.jsx(se,{children:i.timeSlots.map(s=>{const l=s.id===b;return t.jsxs(oe,{$isSelected:l,onClick:()=>f(s.id),children:[t.jsx(re,{$isSelected:l,children:s.time}),l&&t.jsx(ie,{children:t.jsx(R,{size:14})})]},s.id)})})]}),t.jsxs("div",{children:[t.jsxs(ne,{children:[t.jsxs(z,{style:{margin:0},children:["Assigned Students (",d.length,")"]}),t.jsx("div",{style:{width:"260px"},children:t.jsx(h,{placeholder:"Search assigned students...",leftIcon:t.jsx(A,{size:15}),value:g,onChange:s=>{j(s.target.value),x(1)}})})]}),t.jsxs(ae,{children:[t.jsx(z,{style:{fontSize:"12px",marginBottom:"8px"},children:"Quick Add Student to Session"}),t.jsxs(de,{children:[t.jsx(h,{placeholder:"Student Name",value:c,onChange:s=>u(s.target.value)}),t.jsx(h,{placeholder:"Email Address",type:"email",value:v,onChange:s=>L(s.target.value)}),t.jsx(h,{placeholder:"Mobile Number",value:T,onChange:s=>M(s.target.value)}),t.jsx($,{size:"sm",variant:"secondary",leftIcon:t.jsx(F,{size:16}),onClick:W,children:"Add Student"})]})]}),t.jsx(le,{children:t.jsx(B,{columns:H,data:C,keyExtractor:s=>s.email,emptyMessage:"No students found.",pagination:{page:y,limit:n,total:C.length,totalPages:Math.ceil(C.length/n)||1,onPageChange:x}})})]})]})}):null},pe=o.div`
  display: flex;
  flex-direction: column;
`,me=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ge=o.div`
  max-width: 360px;
  width: 100%;
`,xe=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,fe=o.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`,he=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  padding-bottom: ${({theme:e})=>e.spacing.md};
`,Se=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,be=o.div`
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
`,je=o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,ye=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,$e=o.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,ve=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,P=o.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,Ce=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`,we=o.div`
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
`,ke=o.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`,ze=o.div`
  background-color: #fafafa;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  padding: ${({theme:e})=>e.spacing.md};
`,Ne=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Le=o.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
`,Te=[{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:e=>t.jsx(N,{variant:"default",children:e.grade})}],Me=({session:e,onModify:r})=>t.jsxs(fe,{children:[t.jsxs(he,{children:[t.jsxs(Se,{children:[t.jsx(be,{children:e.counselorName.split(" ").map(i=>i[0]).join("")}),t.jsxs(je,{children:[t.jsxs(ye,{children:[t.jsx($e,{children:e.counselorName}),t.jsx(N,{variant:"success",children:"Matched Counselor"})]}),t.jsxs(ve,{children:[e.counselorEmail," • ",e.counselorPhone]})]})]}),t.jsx($,{size:"sm",variant:"secondary",leftIcon:t.jsx(V,{size:16}),onClick:()=>r(e),children:"Modify Session"})]}),t.jsxs("div",{children:[t.jsx(P,{children:"Available Time Slots (Selected Ticked)"}),t.jsx(Ce,{children:e.timeSlots.map(i=>t.jsxs(we,{$isSelected:i.isSelected,children:[t.jsx(X,{size:14}),t.jsx("span",{children:i.time}),i.isSelected&&t.jsx(ke,{children:t.jsx(R,{size:12})})]},i.id))})]}),t.jsxs(ze,{children:[t.jsx(Ne,{children:t.jsxs(P,{style:{margin:0},children:["ASSIGNED STUDENT (",e.assignedStudents.length,")"]})}),t.jsx(Le,{children:t.jsx(B,{columns:Te,data:e.assignedStudents,keyExtractor:i=>i.email,emptyMessage:"No student assigned."})})]})]},e.id),Qe=()=>{const{projectId:e}=Q(),r=U(),i=K(),S=J(),[m,b]=a.useState(""),[f,d]=a.useState(null),{data:p}=E({queryKey:["project",e],queryFn:()=>k.getById(e||"proj-001")}),{data:g=[],isLoading:j}=E({queryKey:["projectSessions",e],queryFn:()=>k.getProjectSessions(e||"proj-001")}),y=Z({mutationFn:({sessionId:n,selectedSlotId:c,assignedStudents:u})=>k.updateCounselorSession(e||"proj-001",n,c,u),onSuccess:()=>{i.invalidateQueries({queryKey:["projectSessions",e]}),S.success("Session Updated","Counselor time slot and assigned students updated successfully."),d(null)},onError:()=>{S.error("Update Failed","Could not update session. Please try again.")}}),x=g.filter(n=>{if(!m)return!0;const c=m.toLowerCase();return n.counselorName.toLowerCase().includes(c)||n.assignedStudents.some(u=>u.name.toLowerCase().includes(c))});return t.jsxs(pe,{children:[t.jsx(_,{title:`Project Sessions - ${(p==null?void 0:p.name)||"Career Guidance"}`,subtitle:"View counselor time slots and assigned student details.",breadcrumbs:[{label:"Dashboard",href:w.DASHBOARD},{label:"Projects",href:w.PROJECTS},{label:"Project Sessions"}],onBack:()=>r(w.PROJECTS)}),t.jsxs(ee,{padding:"lg",children:[t.jsx(me,{style:{marginBottom:"20px"},children:t.jsx(ge,{children:t.jsx(h,{placeholder:"Search counselor or student name...",leftIcon:t.jsx(A,{size:16}),value:m,onChange:n=>b(n.target.value)})})}),j?t.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"Loading sessions..."}):x.length===0?t.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"No counselor sessions found."}):t.jsx(xe,{children:x.map(n=>t.jsx(Me,{session:n,onModify:d},n.id))})]}),t.jsx(ue,{isOpen:!!f,onClose:()=>d(null),session:f,onSave:(n,c,u)=>{y.mutate({sessionId:n,selectedSlotId:c,assignedStudents:u})},isSaving:y.isPending})]})};export{Qe as ProjectSessionsPage};
