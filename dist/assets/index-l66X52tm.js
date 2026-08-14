import{r as l,j as s,h as K,_ as I,B as L,Z as J,g as o,aJ as Z,aS as _,a1 as X,a0 as Y,d as ee,aT as se,y as oe,K as te,aU as ie,u as re,S as ne,e as ae,c as T,L as le,a3 as W}from"./index-B6MU9CPz.js";import{u as D}from"./useQuery-B4c0qsO6.js";import{u as de}from"./useMutation-DF7mLgws.js";import{P as ce}from"./PageHeader-DVYmftZX.js";import{C as pe}from"./Card-Dd4MI-gX.js";import{I as z}from"./Input-CwfTR_Bp.js";import{T as F}from"./Table-BIhR0MJn.js";import{B as M}from"./Badge-BzBm2vLL.js";import"./Select-DKoWOyrE.js";import"./Table.styles-DeHeiY8x.js";import{E as me}from"./FileUpload.styles-CZyPTynX.js";import"./Breadcrumb-C7lv3now.js";import{M as G}from"./Modal-BLiP14UD.js";import"./ConfirmDialog-D0SidjN7.js";import"./Checkbox-_Hq9YXcA.js";import"./SuccessModal.styles-Yz8Lvnau.js";import{T as ue}from"./Tooltip-BaOOZ4TY.js";import{p as E}from"./project.service-CVc7JFAy.js";import"./Card.styles-BsYtRoVd.js";import"./Badge.styles-DD68j4M8.js";import"./counselors.mock---5XGzUI.js";const xe=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,R=o.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,ge=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.sm};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,he=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  border: 1px solid
    ${({theme:e,$isSelected:i})=>i?e.colors.primary:e.colors.border};
  background-color: ${({theme:e,$isSelected:i})=>i?e.colors.primaryLight:e.colors.surface};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,fe=o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e,$isSelected:i})=>i?e.fontWeight.bold:e.fontWeight.medium};
  color: ${({theme:e,$isSelected:i})=>i?e.colors.primary:e.colors.text};
`,je=o.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`,Se=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.sm};
`,ye=o.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};
`,be=o.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.sm};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
  }
`,$e=o.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,ve=o.button`
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
`,Ce=({isOpen:e,onClose:i,session:r,onSave:n,isSaving:m})=>{const[b,C]=l.useState(""),[d,$]=l.useState([]),[g,u]=l.useState(""),[N,w]=l.useState(1),k=10,[v,a]=l.useState(""),[p,x]=l.useState(""),[P,B]=l.useState(""),[H]=l.useState("12th");l.useEffect(()=>{if(r){const t=r.timeSlots.find(c=>c.isSelected)||r.timeSlots[0];C((t==null?void 0:t.id)||""),$([...r.assignedStudents]),u(""),w(1)}},[r]);const q=()=>{!v.trim()||!p.trim()||($(t=>[{name:v.trim(),email:p.trim(),mobile:P.trim()||"+91 98000 00000",grade:H},...t]),a(""),x(""),B(""))},O=t=>{$(c=>c.filter(V=>V.email!==t))},A=l.useMemo(()=>{if(!g)return d;const t=g.toLowerCase();return d.filter(c=>c.name.toLowerCase().includes(t)||c.email.toLowerCase().includes(t)||c.mobile.toLowerCase().includes(t))},[d,g]),Q=()=>{r&&n(r.id,b,d)},U=[{key:"email",header:"Action",render:t=>s.jsx(ve,{onClick:()=>O(t.email),title:"Remove Student",children:s.jsx(Z,{size:16})})},{key:"name",header:"Student Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade",render:t=>s.jsx(M,{variant:"default",children:t.grade})}];return r?s.jsx(G,{isOpen:e,onClose:i,title:`Modify Session - ${r.counselorName}`,subtitle:`Select preferred time slot and manage ${d.length} assigned students for ${r.counselorName}`,size:"xl",footer:s.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[s.jsx(L,{variant:"secondary",onClick:i,disabled:m,children:"Cancel"}),s.jsxs(L,{onClick:Q,isLoading:m,children:["Save Changes (",d.length," Students)"]})]}),children:s.jsxs(xe,{children:[s.jsxs("div",{children:[s.jsx(R,{children:"Available Time Slots (Select One)"}),s.jsx(ge,{children:r.timeSlots.map(t=>{const c=t.id===b;return s.jsxs(he,{$isSelected:c,onClick:()=>C(t.id),children:[s.jsx(fe,{$isSelected:c,children:t.time}),c&&s.jsx(je,{children:s.jsx(K,{size:14})})]},t.id)})})]}),s.jsxs("div",{children:[s.jsxs(Se,{children:[s.jsxs(R,{style:{margin:0},children:["Assigned Students (",d.length,")"]}),s.jsx("div",{style:{width:"260px"},children:s.jsx(z,{placeholder:"Search assigned students...",leftIcon:s.jsx(I,{size:15}),value:g,onChange:t=>{u(t.target.value),w(1)}})})]}),s.jsxs(ye,{children:[s.jsx(R,{style:{fontSize:"12px",marginBottom:"8px"},children:"Quick Add Student to Session"}),s.jsxs(be,{children:[s.jsx(z,{placeholder:"Student Name",value:v,onChange:t=>a(t.target.value)}),s.jsx(z,{placeholder:"Email Address",type:"email",value:p,onChange:t=>x(t.target.value)}),s.jsx(z,{placeholder:"Mobile Number",value:P,onChange:t=>B(t.target.value)}),s.jsx(L,{size:"sm",variant:"secondary",leftIcon:s.jsx(J,{size:16}),onClick:q,children:"Add Student"})]})]}),s.jsx($e,{children:s.jsx(F,{columns:U,data:A,keyExtractor:t=>t.email,emptyMessage:"No students found.",pagination:{page:N,limit:k,total:A.length,totalPages:Math.ceil(A.length/k)||1,onPageChange:w}})})]})]})}):null},we=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ke=o.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,h=o.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.md};
`,f=o.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,j=o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,S=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=o.div`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,ze=({isOpen:e,onClose:i,student:r,instituteName:n="Greenwood High International School"})=>r?s.jsx(G,{isOpen:e,onClose:i,title:"Student Details",size:"md",children:s.jsx(we,{children:s.jsxs(ke,{children:[s.jsxs(h,{style:{gridColumn:"1 / -1"},children:[s.jsx(f,{children:s.jsx(_,{size:20})}),s.jsxs(j,{children:[s.jsx(S,{children:"Student Name"}),s.jsx(y,{style:{fontSize:"16px"},children:r.name})]})]}),s.jsxs(h,{children:[s.jsx(f,{children:s.jsx(X,{size:20})}),s.jsxs(j,{children:[s.jsx(S,{children:"Grade"}),s.jsx(y,{children:s.jsx(M,{variant:"default",children:r.grade||"11th Grade"})})]})]}),s.jsxs(h,{children:[s.jsx(f,{children:s.jsx(Y,{size:20})}),s.jsxs(j,{children:[s.jsx(S,{children:"Institute"}),s.jsx(y,{children:n})]})]}),s.jsxs(h,{children:[s.jsx(f,{children:s.jsx(ee,{size:20})}),s.jsxs(j,{children:[s.jsx(S,{children:"Email"}),s.jsx(y,{children:r.email})]})]}),s.jsxs(h,{children:[s.jsx(f,{children:s.jsx(se,{size:20})}),s.jsxs(j,{children:[s.jsx(S,{children:"Phone"}),s.jsx(y,{children:r.mobile})]})]}),s.jsxs(h,{children:[s.jsx(f,{children:s.jsx(oe,{size:20})}),s.jsxs(j,{children:[s.jsx(S,{children:"Session Date"}),s.jsx(y,{children:r.sessionDate||"18 Feb 2026"})]})]}),s.jsxs(h,{children:[s.jsx(f,{children:s.jsx(te,{size:20})}),s.jsxs(j,{children:[s.jsx(S,{children:"Session & Slot"}),s.jsxs(y,{children:[r.sessionType||"S1"," (",r.timeSlot||"09:30 AM - 10:30 AM",")"]})]})]})]})})}):null,Le=o.div`
  display: flex;
  flex-direction: column;
`,Me=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Ne=o.div`
  max-width: 360px;
  width: 100%;
`,Ae=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Te=o.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`,Ee=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  padding-bottom: ${({theme:e})=>e.spacing.md};
`,Re=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
`,Pe=o.div`
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
`,Be=o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,De=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ie=o.h3`
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,We=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;o.h4`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`;o.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-top: ${({theme:e})=>e.spacing.md};
`;o.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e,$isSelected:i})=>i?e.fontWeight.bold:e.fontWeight.medium};
  border: 1px solid
    ${({theme:e,$isSelected:i})=>i?e.colors.primary:e.colors.border};
  background-color: ${({theme:e,$isSelected:i})=>i?e.colors.primaryLight:e.colors.surfaceHover};
  color: ${({theme:e,$isSelected:i})=>i?e.colors.primary:e.colors.text};
  transition: all 0.2s ease;
`;o.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;const Fe=o.div`
  display: flex;
  flex-direction: column;
`;o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;const Ge=o.div`
  max-height: 280px;
  overflow-y: auto;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
`,He=o.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
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
`,qe=o.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.primary};
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({theme:e})=>e.colors.primaryHover};
  }
`,Oe=(e,i,r)=>[{key:"actions",header:"Action",render:()=>s.jsx(ue,{content:"Edit Session Assignment",children:s.jsx(He,{"aria-label":"Edit Session Assignment",onClick:()=>i(e),children:s.jsx(W,{size:16})})})},{key:"sessionDate",header:"Date",render:n=>n.sessionDate||"18 Feb 2026"},{key:"timeSlot",header:"Time",render:n=>{var m;return n.timeSlot||((m=e.timeSlots.find(b=>b.isSelected))==null?void 0:m.time)||"09:30 AM - 10:30 AM"}},{key:"name",header:"Student",render:n=>s.jsx(qe,{type:"button",onClick:()=>r(n),children:n.name})},{key:"sessionType",header:"Session",render:n=>s.jsx(M,{variant:n.sessionType==="S2"?"info":"primary",children:n.sessionType||"S1"})},{key:"mobile",header:"Phone",render:n=>n.mobile||"N/A"}],Qe=({session:e,onModify:i,onViewStudent:r})=>s.jsxs(Te,{children:[s.jsxs(Ee,{children:[s.jsxs(Re,{children:[s.jsx(Pe,{children:e.counselorName.split(" ").map(n=>n[0]).join("")}),s.jsxs(Be,{children:[s.jsxs(De,{children:[s.jsx(Ie,{children:e.counselorName}),s.jsx(M,{variant:"success",children:"Matched Counselor"})]}),s.jsxs(We,{children:[e.counselorEmail," • ",e.counselorPhone]})]})]}),s.jsx(L,{size:"sm",variant:"secondary",leftIcon:s.jsx(W,{size:16}),onClick:()=>i(e),children:"Modify Session"})]}),s.jsx(Fe,{children:s.jsx(Ge,{children:s.jsx(F,{columns:Oe(e,i,r),data:e.assignedStudents,keyExtractor:n=>n.email,emptyMessage:"No student assigned."})})})]},e.id),us=()=>{const{projectId:e}=ie(),i=re(),r=ne(),n=ae(),[m,b]=l.useState(""),[C,d]=l.useState(null),[$,g]=l.useState(null),{data:u}=D({queryKey:["project",e],queryFn:()=>E.getById(e||"proj-001")}),{data:N=[],isLoading:w}=D({queryKey:["projectSessions",e],queryFn:()=>E.getProjectSessions(e||"proj-001")}),k=de({mutationFn:({sessionId:a,selectedSlotId:p,assignedStudents:x})=>E.updateCounselorSession(e||"proj-001",a,p,x),onSuccess:()=>{r.invalidateQueries({queryKey:["projectSessions",e]}),n.success("Session Updated","Counselor time slot and assigned students updated successfully."),d(null)},onError:()=>{n.error("Update Failed","Could not update session. Please try again.")}}),v=N.filter(a=>{if(!m)return!0;const p=m.toLowerCase();return a.counselorName.toLowerCase().includes(p)||a.assignedStudents.some(x=>x.name.toLowerCase().includes(p))});return s.jsxs(Le,{children:[s.jsx(ce,{title:`Project Sessions - ${(u==null?void 0:u.name)||"Career Guidance"}`,subtitle:"View counselor time slots and assigned student details.",breadcrumbs:[{label:"Dashboard",href:T.DASHBOARD},{label:"Projects",href:T.PROJECTS},{label:"Project Sessions"}],onBack:()=>i(T.PROJECTS)}),s.jsxs(pe,{padding:"lg",children:[s.jsx(Me,{style:{marginBottom:"20px"},children:s.jsx(Ne,{children:s.jsx(z,{placeholder:"Search counselor or student name...",leftIcon:s.jsx(I,{size:16}),value:m,onChange:a=>b(a.target.value)})})}),w?s.jsx(le,{}):v.length===0?s.jsx(me,{title:"No counselor sessions found",description:"Try adjusting your search criteria or filter."}):s.jsx(Ae,{children:v.map(a=>s.jsx(Qe,{session:a,onModify:d,onViewStudent:g},a.id))})]}),s.jsx(Ce,{isOpen:!!C,onClose:()=>d(null),session:C,onSave:(a,p,x)=>{k.mutate({sessionId:a,selectedSlotId:p,assignedStudents:x})},isSaving:k.isPending}),s.jsx(ze,{isOpen:!!$,onClose:()=>g(null),student:$,instituteName:u==null?void 0:u.instituteName})]})};export{us as ProjectSessionsPage};
