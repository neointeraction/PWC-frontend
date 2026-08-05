import{r as d,j as t,am as R,F as L,B as $,E as G,g as o,ap as Q,az as D,u as U,w as J,p as K,c as w,J as V,aA as X}from"./index-BUalwBCD.js";import{M as Y,B as M,u as A}from"./Modal-D3wpFGKR.js";import{u as Z}from"./useMutation-ByNtmxWc.js";import{P as _,C as ee}from"./Card-CmSGAiMf.js";import{I as j}from"./Input-D2KrMr1i.js";import{T as B}from"./Table-C9rPBDG_.js";import{p as k}from"./project.service-CJNTO4g3.js";import"./counselors.mock-BLoO_2sZ.js";const te=o.div`
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
    ${({theme:e,$isSelected:n})=>n?e.colors.primary:e.colors.border};
  background-color: ${({theme:e,$isSelected:n})=>n?e.colors.primaryLight:e.colors.surface};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,ne=o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e,$isSelected:n})=>n?e.fontWeight.bold:e.fontWeight.medium};
  color: ${({theme:e,$isSelected:n})=>n?e.colors.primary:e.colors.text};
`,re=o.div`
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
`,ue=({isOpen:e,onClose:n,session:i,onSave:f,isSaving:m})=>{const[h,g]=d.useState(""),[a,r]=d.useState([]),[u,b]=d.useState(""),[y,S]=d.useState(1),l=10,[p,x]=d.useState(""),[v,P]=d.useState(""),[N,T]=d.useState(""),[I]=d.useState("12th");d.useEffect(()=>{if(i){const s=i.timeSlots.find(c=>c.isSelected)||i.timeSlots[0];g((s==null?void 0:s.id)||""),r([...i.assignedStudents]),b(""),S(1)}},[i]);const W=()=>{!p.trim()||!v.trim()||(r(s=>[{name:p.trim(),email:v.trim(),mobile:N.trim()||"+91 98000 00000",grade:I},...s]),x(""),P(""),T(""))},q=s=>{r(c=>c.filter(O=>O.email!==s))},C=d.useMemo(()=>{if(!u)return a;const s=u.toLowerCase();return a.filter(c=>c.name.toLowerCase().includes(s)||c.email.toLowerCase().includes(s)||c.mobile.toLowerCase().includes(s))},[a,u]),F=()=>{i&&f(i.id,h,a)},H=[{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:s=>t.jsx(M,{variant:"default",children:s.grade})},{key:"email",header:"Action",render:s=>t.jsx(ce,{onClick:()=>q(s.email),title:"Remove Student",children:t.jsx(Q,{size:16})})}];return i?t.jsx(Y,{isOpen:e,onClose:n,title:`Modify Session - ${i.counselorName}`,subtitle:`Select preferred time slot and manage ${a.length} assigned students for ${i.counselorName}`,size:"xl",footer:t.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[t.jsx($,{variant:"secondary",onClick:n,disabled:m,children:"Cancel"}),t.jsxs($,{onClick:F,isLoading:m,children:["Save Changes (",a.length," Students)"]})]}),children:t.jsxs(te,{children:[t.jsxs("div",{children:[t.jsx(z,{children:"Available Time Slots (Select One)"}),t.jsx(se,{children:i.timeSlots.map(s=>{const c=s.id===h;return t.jsxs(oe,{$isSelected:c,onClick:()=>g(s.id),children:[t.jsx(ne,{$isSelected:c,children:s.time}),c&&t.jsx(re,{children:t.jsx(R,{size:14})})]},s.id)})})]}),t.jsxs("div",{children:[t.jsxs(ie,{children:[t.jsxs(z,{style:{margin:0},children:["Assigned Students (",a.length,")"]}),t.jsx("div",{style:{width:"260px"},children:t.jsx(j,{placeholder:"Search assigned students...",leftIcon:t.jsx(L,{size:15}),value:u,onChange:s=>{b(s.target.value),S(1)}})})]}),t.jsxs(ae,{children:[t.jsx(z,{style:{fontSize:"12px",marginBottom:"8px"},children:"Quick Add Student to Session"}),t.jsxs(de,{children:[t.jsx(j,{placeholder:"Student Name",value:p,onChange:s=>x(s.target.value)}),t.jsx(j,{placeholder:"Email Address",type:"email",value:v,onChange:s=>P(s.target.value)}),t.jsx(j,{placeholder:"Mobile Number",value:N,onChange:s=>T(s.target.value)}),t.jsx($,{size:"sm",variant:"secondary",leftIcon:t.jsx(G,{size:16}),onClick:W,children:"Add Student"})]})]}),t.jsx(le,{children:t.jsx(B,{columns:H,data:C,keyExtractor:s=>s.email,emptyMessage:"No students found.",pagination:{page:y,limit:l,total:C.length,totalPages:Math.ceil(C.length/l)||1,onPageChange:S}})})]})]})}):null},pe=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
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
`,je=o.div`
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
`,be=o.div`
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
`,E=o.h4`
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
  font-weight: ${({theme:e,$isSelected:n})=>n?e.fontWeight.bold:e.fontWeight.medium};
  border: 1px solid
    ${({theme:e,$isSelected:n})=>n?e.colors.primary:e.colors.border};
  background-color: ${({theme:e,$isSelected:n})=>n?e.colors.primaryLight:e.colors.surfaceHover};
  color: ${({theme:e,$isSelected:n})=>n?e.colors.primary:e.colors.text};
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
`,Le=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Me=o.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
`,Pe=[{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:e=>t.jsx(M,{variant:"default",children:e.grade})}],Ne=({session:e,onModify:n})=>{const[i,f]=d.useState(""),[m,h]=d.useState(1),g=5,a=d.useMemo(()=>{if(!i)return e.assignedStudents;const r=i.toLowerCase();return e.assignedStudents.filter(u=>u.name.toLowerCase().includes(r)||u.email.toLowerCase().includes(r)||u.mobile.toLowerCase().includes(r))},[e.assignedStudents,i]);return t.jsxs(he,{children:[t.jsxs(fe,{children:[t.jsxs(Se,{children:[t.jsx(je,{children:e.counselorName.split(" ").map(r=>r[0]).join("")}),t.jsxs(be,{children:[t.jsxs(ye,{children:[t.jsx($e,{children:e.counselorName}),t.jsx(M,{variant:"success",children:"Matched Counselor"})]}),t.jsxs(ve,{children:[e.counselorEmail," • ",e.counselorPhone]})]})]}),t.jsx($,{size:"sm",variant:"secondary",leftIcon:t.jsx(V,{size:16}),onClick:()=>n(e),children:"Modify Session"})]}),t.jsxs("div",{children:[t.jsx(E,{children:"Available Time Slots (Selected Ticked)"}),t.jsx(Ce,{children:e.timeSlots.map(r=>t.jsxs(we,{$isSelected:r.isSelected,children:[t.jsx(X,{size:14}),t.jsx("span",{children:r.time}),r.isSelected&&t.jsx(ke,{children:t.jsx(R,{size:12})})]},r.id))})]}),t.jsxs(ze,{children:[t.jsxs(Le,{children:[t.jsxs(E,{style:{margin:0},children:["Assigned Students (",e.assignedStudents.length,")"]}),t.jsx("div",{style:{width:"240px"},children:t.jsx(j,{placeholder:"Search students...",leftIcon:t.jsx(L,{size:14}),value:i,onChange:r=>{f(r.target.value),h(1)}})})]}),t.jsx(Me,{children:t.jsx(B,{columns:Pe,data:a,keyExtractor:r=>r.email,emptyMessage:"No students found.",pagination:{page:m,limit:g,total:a.length,totalPages:Math.ceil(a.length/g)||1,onPageChange:h}})})]})]},e.id)},Fe=()=>{const{projectId:e}=D(),n=U(),i=J(),f=K(),[m,h]=d.useState(""),[g,a]=d.useState(null),{data:r}=A({queryKey:["project",e],queryFn:()=>k.getById(e||"proj-001")}),{data:u=[],isLoading:b}=A({queryKey:["projectSessions",e],queryFn:()=>k.getProjectSessions(e||"proj-001")}),y=Z({mutationFn:({sessionId:l,selectedSlotId:p,assignedStudents:x})=>k.updateCounselorSession(e||"proj-001",l,p,x),onSuccess:()=>{i.invalidateQueries({queryKey:["projectSessions",e]}),f.success("Session Updated","Counselor time slot and assigned students updated successfully."),a(null)},onError:()=>{f.error("Update Failed","Could not update session. Please try again.")}}),S=u.filter(l=>{if(!m)return!0;const p=m.toLowerCase();return l.counselorName.toLowerCase().includes(p)||l.assignedStudents.some(x=>x.name.toLowerCase().includes(p))});return t.jsxs(pe,{children:[t.jsx(_,{title:`Project Sessions - ${(r==null?void 0:r.name)||"Career Guidance"}`,subtitle:"View counselor time slots and search through high-capacity assigned student lists.",breadcrumbs:[{label:"Dashboard",href:w.DASHBOARD},{label:"Projects",href:w.PROJECTS},{label:"Project Sessions"}],onBack:()=>n(w.PROJECTS)}),t.jsxs(ee,{padding:"lg",children:[t.jsx(me,{style:{marginBottom:"20px"},children:t.jsx(ge,{children:t.jsx(j,{placeholder:"Search counselor or student name...",leftIcon:t.jsx(L,{size:16}),value:m,onChange:l=>h(l.target.value)})})}),b?t.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"Loading sessions..."}):S.length===0?t.jsx("p",{style:{fontSize:"14px",color:"#6b7280"},children:"No counselor sessions found."}):t.jsx(xe,{children:S.map(l=>t.jsx(Ne,{session:l,onModify:a},l.id))})]}),t.jsx(ue,{isOpen:!!g,onClose:()=>a(null),session:g,onSave:(l,p,x)=>{y.mutate({sessionId:l,selectedSlotId:p,assignedStudents:x})},isSaving:y.isPending})]})};export{Fe as ProjectSessionsPage};
