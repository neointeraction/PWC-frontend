import{r as a,j as s,f as R,H as A,B as $,G as F,g as o,aw as D,aF as Q,u as U,y as K,d as J,c as w,O as V,aG as X}from"./index-BlnJ6RPY.js";import{u as E}from"./useQuery-Bpj6tJZw.js";import{u as Y}from"./useMutation-C6ij4NK7.js";import{P as Z}from"./PageHeader-DnomRfRw.js";import{C as _}from"./Card-_jdrMGWy.js";import{I as f}from"./Input-DT7CGDc-.js";import{M as ee,T as B,B as N}from"./Modal-wN5hG3EV.js";import{p as k}from"./project.service-CqiMKOES.js";import"./Modal.styles-B_QFbYeL.js";import"./counselors.mock---5XGzUI.js";const se=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,z=o.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,te=o.div`
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
`,ne=o.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`,ie=o.div`
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
`,ue=({isOpen:e,onClose:r,session:n,onSave:S,isSaving:m})=>{const[b,h]=a.useState(""),[d,p]=a.useState([]),[g,j]=a.useState(""),[y,x]=a.useState(1),i=10,[c,u]=a.useState(""),[v,L]=a.useState(""),[T,M]=a.useState(""),[I]=a.useState("12th");a.useEffect(()=>{if(n){const t=n.timeSlots.find(l=>l.isSelected)||n.timeSlots[0];h((t==null?void 0:t.id)||""),p([...n.assignedStudents]),j(""),x(1)}},[n]);const W=()=>{!c.trim()||!v.trim()||(p(t=>[{name:c.trim(),email:v.trim(),mobile:T.trim()||"+91 98000 00000",grade:I},...t]),u(""),L(""),M(""))},G=t=>{p(l=>l.filter(O=>O.email!==t))},C=a.useMemo(()=>{if(!g)return d;const t=g.toLowerCase();return d.filter(l=>l.name.toLowerCase().includes(t)||l.email.toLowerCase().includes(t)||l.mobile.toLowerCase().includes(t))},[d,g]),q=()=>{n&&S(n.id,b,d)},H=[{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:t=>s.jsx(N,{variant:"default",children:t.grade})},{key:"email",header:"Action",render:t=>s.jsx(ce,{onClick:()=>G(t.email),title:"Remove Student",children:s.jsx(D,{size:16})})}];return n?s.jsx(ee,{isOpen:e,onClose:r,title:`Modify Session - ${n.counselorName}`,subtitle:`Select preferred time slot and manage ${d.length} assigned students for ${n.counselorName}`,size:"xl",footer:s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[s.jsx($,{variant:"secondary",onClick:r,disabled:m,children:"Cancel"}),s.jsxs($,{onClick:q,isLoading:m,children:["Save Changes (",d.length," Students)"]})]}),children:s.jsxs(se,{children:[s.jsxs("div",{children:[s.jsx(z,{children:"Available Time Slots (Select One)"}),s.jsx(te,{children:n.timeSlots.map(t=>{const l=t.id===b;return s.jsxs(oe,{$isSelected:l,onClick:()=>h(t.id),children:[s.jsx(re,{$isSelected:l,children:t.time}),l&&s.jsx(ne,{children:s.jsx(R,{size:14})})]},t.id)})})]}),s.jsxs("div",{children:[s.jsxs(ie,{children:[s.jsxs(z,{style:{margin:0},children:["Assigned Students (",d.length,")"]}),s.jsx("div",{style:{width:"260px"},children:s.jsx(f,{placeholder:"Search assigned students...",leftIcon:s.jsx(A,{size:15}),value:g,onChange:t=>{j(t.target.value),x(1)}})})]}),s.jsxs(ae,{children:[s.jsx(z,{style:{fontSize:"12px",marginBottom:"8px"},children:"Quick Add Student to Session"}),s.jsxs(de,{children:[s.jsx(f,{placeholder:"Student Name",value:c,onChange:t=>u(t.target.value)}),s.jsx(f,{placeholder:"Email Address",type:"email",value:v,onChange:t=>L(t.target.value)}),s.jsx(f,{placeholder:"Mobile Number",value:T,onChange:t=>M(t.target.value)}),s.jsx($,{size:"sm",variant:"secondary",leftIcon:s.jsx(F,{size:16}),onClick:W,children:"Add Student"})]})]}),s.jsx(le,{children:s.jsx(B,{columns:H,data:C,keyExtractor:t=>t.email,emptyMessage:"No students found.",pagination:{page:y,limit:i,total:C.length,totalPages:Math.ceil(C.length/i)||1,onPageChange:x}})})]})]})}):null},pe=o.div`
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
`,he=o.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`,fe=o.div`
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
`,Te=[{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:e=>s.jsx(N,{variant:"default",children:e.grade})}],Me=({session:e,onModify:r})=>s.jsxs(he,{children:[s.jsxs(fe,{children:[s.jsxs(Se,{children:[s.jsx(be,{children:e.counselorName.split(" ").map(n=>n[0]).join("")}),s.jsxs(je,{children:[s.jsxs(ye,{children:[s.jsx($e,{children:e.counselorName}),s.jsx(N,{variant:"success",children:"Matched Counselor"})]}),s.jsxs(ve,{children:[e.counselorEmail," • ",e.counselorPhone]})]})]}),s.jsx($,{size:"sm",variant:"secondary",leftIcon:s.jsx(V,{size:16}),onClick:()=>r(e),children:"Modify Session"})]}),s.jsxs("div",{children:[s.jsx(P,{children:"Available Time Slots (Selected Ticked)"}),s.jsx(Ce,{children:e.timeSlots.map(n=>s.jsxs(we,{$isSelected:n.isSelected,children:[s.jsx(X,{size:14}),s.jsx("span",{children:n.time}),n.isSelected&&s.jsx(ke,{children:s.jsx(R,{size:12})})]},n.id))})]}),s.jsxs(ze,{children:[s.jsx(Ne,{children:s.jsxs(P,{style:{margin:0},children:["ASSIGNED STUDENT (",e.assignedStudents.length,")"]})}),s.jsx(Le,{children:s.jsx(B,{columns:Te,data:e.assignedStudents,keyExtractor:n=>n.email,emptyMessage:"No student assigned."})})]})]},e.id),Oe=()=>{const{projectId:e}=Q(),r=U(),n=K(),S=J(),[m,b]=a.useState(""),[h,d]=a.useState(null),{data:p}=E({queryKey:["project",e],queryFn:()=>k.getById(e||"proj-001")}),{data:g=[],isLoading:j}=E({queryKey:["projectSessions",e],queryFn:()=>k.getProjectSessions(e||"proj-001")}),y=Y({mutationFn:({sessionId:i,selectedSlotId:c,assignedStudents:u})=>k.updateCounselorSession(e||"proj-001",i,c,u),onSuccess:()=>{n.invalidateQueries({queryKey:["projectSessions",e]}),S.success("Session Updated","Counselor time slot and assigned students updated successfully."),d(null)},onError:()=>{S.error("Update Failed","Could not update session. Please try again.")}}),x=g.filter(i=>{if(!m)return!0;const c=m.toLowerCase();return i.counselorName.toLowerCase().includes(c)||i.assignedStudents.some(u=>u.name.toLowerCase().includes(c))});return s.jsxs(pe,{children:[s.jsx(Z,{title:`Project Sessions - ${(p==null?void 0:p.name)||"Career Guidance"}`,subtitle:"View counselor time slots and assigned student details.",breadcrumbs:[{label:"Dashboard",href:w.DASHBOARD},{label:"Projects",href:w.PROJECTS},{label:"Project Sessions"}],onBack:()=>r(w.PROJECTS)}),s.jsxs(_,{padding:"lg",children:[s.jsx(me,{style:{marginBottom:"20px"},children:s.jsx(ge,{children:s.jsx(f,{placeholder:"Search counselor or student name...",leftIcon:s.jsx(A,{size:16}),value:m,onChange:i=>b(i.target.value)})})}),j?s.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"Loading sessions..."}):x.length===0?s.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"No counselor sessions found."}):s.jsx(xe,{children:x.map(i=>s.jsx(Me,{session:i,onModify:d},i.id))})]}),s.jsx(ue,{isOpen:!!h,onClose:()=>d(null),session:h,onSave:(i,c,u)=>{y.mutate({sessionId:i,selectedSlotId:c,assignedStudents:u})},isSaving:y.isPending})]})};export{Oe as ProjectSessionsPage};
