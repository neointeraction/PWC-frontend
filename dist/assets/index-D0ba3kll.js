import{g as s,az as re,u as ae,w as le,e as ce,r,j as t,i as de,c as A,B as p,aA as I,aB as pe,M as ue,ay as xe,E as me,aC as M,aD as ge,F as fe,ax as he,K as je}from"./index-BZPOwNvj.js";import{u as Se}from"./useQuery-BeyZk1Ir.js";import{u as be}from"./useMutation-CrbvimFs.js";import{C as ye}from"./Card-pcm2xDaD.js";import{I as Ce}from"./Input-DriY2aBZ.js";import{S as ve}from"./Select-oH8LtK7F.js";import{T as we}from"./Table-Ddoil0CF.js";import"./Badge.styles-nVp--p1K.js";import"./Table.styles-B9mywflN.js";import"./FileUpload.styles-B_1CbBIE.js";import"./Breadcrumb-aCBtmGLf.js";import"./Modal-C-DeKsTQ.js";import"./ConfirmDialog-DSCdVDXX.js";import"./Checkbox-7AayWytc.js";import{A as N}from"./AlertModal-DWI2IN05.js";import{T as h}from"./Tooltip-BiDsfPmw.js";import"./SuccessModal.styles-BGBXxLvw.js";import{m as B,p as _}from"./project.service-C5qw3TqU.js";import{V as $e,f as q}from"./ViewStudentModal-CmC30-Zq.js";import{E as ke}from"./EditProjectModal-4ENKTwu8.js";import{E as Pe}from"./EditStudentModal-Dz5e4_ES.js";import"./Card.styles-BlbnDXnT.js";import"./SuccessModal-V-Ic_Y5Q.js";import"./counselors.mock-CbyQmpLX.js";import"./DatePicker-xeGcGWlo.js";import"./Badge-CrH0oCH-.js";const Ee=s.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Ae=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`,Ie=s.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`,Fe=s.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,Le=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,ze=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,De=s.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Te=s.span`
  background-color: rgba(245, 158, 11, 0.12);
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`,Oe=s.span`
  background-color: ${({theme:e,$isClosed:n})=>n?e.colors.surfaceHover:e.colors.successLight};
  color: ${({theme:e,$isClosed:n})=>n?e.colors.textSecondary:e.colors.success};
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,Re=s.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
  flex-wrap: wrap;
`,Me=s.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,Ne=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,Be=s.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`,j=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: ${({$clickable:e})=>e?"pointer":"default"};
  transition: all 0.2s ease;

  ${({$clickable:e,theme:n})=>e&&`
    &:hover {
      border-color: ${n.colors.primary};
      box-shadow: 0 4px 12px rgba(93, 35, 132, 0.08);
      transform: translateY(-1px);
    }
  `}
`,S=s.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
`,b=s.span`
  font-size: 28px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
`,_e=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: 24px;

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,qe=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Qe=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ue=s.div`
  max-width: 320px;
  width: 100%;
`,Q=s.button`
  width: 38px;
  height: 38px;
  border: 1px solid ${({theme:e,$active:n})=>n?"#EF4444":e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e,$active:n})=>n?"#FEF2F2":e.colors.surface};
  color: ${({theme:e,$active:n,$variant:u})=>n||u==="flag"?"#DC2626":u==="excel"?"#16A34A":e.colors.text};
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
`;s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;s.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;s.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`;const Ve=s.button`
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
`,We=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: 500;
  color: ${({theme:e})=>e.colors.text};
`,U=s.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`,Ye=s.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`,He=s.div`
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
`,Je=s.button`
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
`,Ge=[{value:"all",label:"All Stages"},{value:"Login Activated",label:"Login Activated"},{value:"Profile Completed",label:"Profile Completed"},{value:"Pre-Counselling — Student",label:"Pre-Counselling — Student"},{value:"Pre-Counselling — Parent",label:"Pre-Counselling — Parent"},{value:"Assessment Completed",label:"Assessment Completed"},{value:"Session Booked",label:"Session Booked"},{value:"Session 1 Completed",label:"Session 1 Completed"},{value:"Session 2 Completed",label:"Session 2 Completed"},{value:"Feedback — Student",label:"Feedback — Student"},{value:"Feedback — Parent",label:"Feedback — Parent"},{value:"Report Downloaded",label:"Report Downloaded"}],vt=()=>{const{projectId:e}=re(),n=ae(),u=le(),c=ce(),a=B.find(o=>o.id===e)||B[0],[V,y]=r.useState(!1),[W,C]=r.useState(!1),[v,Y]=r.useState(a.status==="completed"),[H,F]=r.useState(!1),[w,J]=r.useState(""),[$,G]=r.useState("all"),[k,K]=r.useState(!1),[P,x]=r.useState(1),[L,m]=r.useState(null),[z,D]=r.useState(null),[X,E]=r.useState(!1),g=10,{data:T=[],isLoading:Z}=Se({queryKey:["projectStudents",e],queryFn:()=>_.getProjectStudents(e||"proj-001")}),O=be({mutationFn:o=>_.updateProjectStudent(e||"proj-001",o),onSuccess:()=>{u.invalidateQueries({queryKey:["projectStudents",e]}),c.success("Student Saved","Student information and session details updated successfully."),m(null),E(!1)},onError:()=>{c.error("Save Failed","Could not update student details.")}}),ee=()=>{F(!0)},te=()=>{Y(!0),C(!1),c.success("Project Closed",`"${a.name}" has been marked as completed.`)},oe=()=>{y(!1),c.warning("Project Deleted",`${a.name} has been removed.`),n(A.PROJECTS)},se=()=>{const o={id:`std-new-${Date.now()}`,name:"",email:"",mobile:"+91 ",grade:"12th",stage:"Login Activated",session1:{sessionNumber:1,status:"scheduled",date:new Date().toISOString().slice(0,10),timeSlot:"09:30 - 10:30",counselorName:"Anil Iyer",counselorEmail:"anil.iyer1@outlook.com"},session2:{sessionNumber:2,status:"pending",date:new Date().toISOString().slice(0,10),timeSlot:"11:00 - 12:00",counselorName:"Mahesh Pillai",counselorEmail:"mahesh.pillai2@rediffmail.com"}};m(o),E(!0)},R=()=>{const o=`Student ID,Student Name,Stage,Counselor,Session 1 Date,Session 1 Slot,Session 1 Status,Session 2 Date,Session 2 Slot,Session 2 Status
`+f.map(i=>`"${i.studentId||i.id}","${i.name}","${i.stage||"Login Activated"}","${i.session1.counselorName||i.session2.counselorName}","${i.session1.date}","${i.session1.timeSlot}","${i.session1.status}","${i.session2.date}","${i.session2.timeSlot}","${i.session2.status}"`).join(`
`),l=new Blob([o],{type:"text/csv;charset=utf-8;"}),ie=URL.createObjectURL(l),d=document.createElement("a");d.setAttribute("href",ie),d.setAttribute("download",`${a.name.replace(/\s+/g,"_")}_Students_List.csv`),document.body.appendChild(d),d.click(),document.body.removeChild(d),c.success("Excel Export Started","Downloaded project students list (.csv).")},f=T.filter(o=>{if(k&&!o.isFlagged||$!=="all"&&o.stage!==$)return!1;if(w){const l=w.toLowerCase();return o.name.toLowerCase().includes(l)||o.studentId&&o.studentId.toLowerCase().includes(l)||o.stage&&o.stage.toLowerCase().includes(l)||o.email.toLowerCase().includes(l)||o.mobile.toLowerCase().includes(l)||o.session1.counselorName.toLowerCase().includes(l)||o.session2.counselorName.toLowerCase().includes(l)}return!0}),ne=[{key:"studentId",header:"Student ID",width:"120px",render:o=>o.studentId||`ST${100+(parseInt(o.id.replace(/\D/g,""),10)||1)}`},{key:"name",header:"Student",width:"200px",render:o=>t.jsx(Ve,{type:"button",onClick:()=>D(o),"aria-label":`View details for ${o.name}`,children:o.name})},{key:"stage",header:"Stage",width:"240px",render:o=>t.jsxs(We,{children:[t.jsx("span",{children:o.stage||"Login Activated"}),o.isFlagged&&t.jsx(h,{content:"Flagged for admin follow-up",children:t.jsx("span",{children:t.jsx(M,{size:15,style:{color:"#EF4444",verticalAlign:"-2px"}})})})]})},{key:"counselor",header:"Counselor",width:"180px",render:o=>t.jsxs(Ye,{style:{fontSize:"13px",color:"#1f2937"},children:[t.jsx(he,{size:14})," ",o.session1.counselorName||o.session2.counselorName]})},{key:"session1",header:"Session 1",width:"220px",render:o=>t.jsxs(U,{children:[t.jsx(I,{size:13})," ",q(o.session1.date)," (",o.session1.timeSlot,")"]})},{key:"session2",header:"Session 2",width:"220px",render:o=>t.jsxs(U,{children:[t.jsx(I,{size:13})," ",q(o.session2.date)," (",o.session2.timeSlot,")"]})},{key:"actions",header:"Actions",width:"80px",render:o=>t.jsx(He,{children:t.jsx(h,{content:"Edit Student & Sessions",children:t.jsx(Je,{onClick:()=>m(o),children:t.jsx(je,{size:16})})})})}];return t.jsxs(Ee,{children:[t.jsxs(Ae,{children:[t.jsxs(Ie,{children:[t.jsx(Fe,{type:"button",onClick:()=>n(A.PROJECTS),"aria-label":"Back to Projects",children:t.jsx(de,{size:18})}),t.jsxs(Le,{children:[t.jsxs(ze,{children:[t.jsx(De,{children:a.instituteName}),t.jsx(Te,{children:"INS001"}),t.jsx(Oe,{$isClosed:v,children:v?"Completed":"Ongoing"})]}),t.jsxs(Re,{children:[t.jsx("span",{children:a.location||"Mumbai, Maharashtra"}),t.jsx("span",{children:"•"}),t.jsx(Me,{children:"Period : 01 Aug, 2026 – 31 Oct, 2026"})]})]})]}),t.jsxs(Ne,{children:[t.jsx(p,{variant:"secondary",size:"sm",leftIcon:t.jsx(I,{size:16}),onClick:ee,children:"Extend Project"}),t.jsx(p,{variant:"secondary",size:"sm",leftIcon:t.jsx(pe,{size:16}),onClick:()=>C(!0),children:v?"Closed":"Close Project"}),t.jsx(p,{variant:"danger",size:"sm",leftIcon:t.jsx(ue,{size:16}),onClick:()=>y(!0),children:"Delete project"}),t.jsx(p,{variant:"primary",size:"sm",leftIcon:t.jsx(xe,{size:16}),onClick:R,children:"Export Report"})]})]}),t.jsxs(Be,{children:[t.jsxs(j,{$clickable:!0,onClick:()=>n(A.PROJECT_SESSIONS.replace(":projectId",e||"proj-001")),title:"Click to view Project Sessions",children:[t.jsx(S,{children:"Counsellors"}),t.jsx(b,{children:"44"})]}),t.jsxs(j,{children:[t.jsx(S,{children:"Total Students"}),t.jsx(b,{children:T.length||350})]}),t.jsxs(j,{children:[t.jsx(S,{children:"Total Days"}),t.jsx(b,{children:"95"})]}),t.jsxs(j,{children:[t.jsx(S,{children:"Remaining Days"}),t.jsx(b,{children:"15"})]})]}),t.jsxs(ye,{padding:"lg",children:[t.jsxs(_e,{children:[t.jsxs(qe,{children:[t.jsx(Ue,{children:t.jsx(Ce,{placeholder:"Search student, ID, stage or counselor...",leftIcon:t.jsx(me,{size:16}),value:w,onChange:o=>{J(o.target.value),x(1)}})}),t.jsx("div",{style:{width:"260px"},children:t.jsx(ve,{value:$,onChange:o=>{G(o.target.value),x(1)},options:Ge})})]}),t.jsxs(Qe,{children:[t.jsx(h,{content:k?"Show All Students":"Filter by Red Flag",children:t.jsx(Q,{type:"button",$active:k,$variant:"flag",onClick:()=>{K(o=>!o),x(1)},"aria-label":"Filter by Red Flag",children:t.jsx(M,{size:18})})}),t.jsx(h,{content:"Export Students to Excel",children:t.jsx(Q,{type:"button",$variant:"excel",onClick:R,"aria-label":"Export Students to Excel",children:t.jsx(ge,{size:18})})}),t.jsx(p,{leftIcon:t.jsx(fe,{size:16}),onClick:se,children:"Add Student"})]})]}),t.jsx(we,{columns:ne,data:f.slice((P-1)*g,P*g),isLoading:Z,keyExtractor:o=>o.id,emptyMessage:"No project students found matching filters.",pagination:{page:P,limit:g,total:f.length,totalPages:Math.ceil(f.length/g)||1,onPageChange:x}})]}),t.jsx($e,{isOpen:!!z,onClose:()=>D(null),student:z,instituteName:a.instituteName}),t.jsx(Pe,{isOpen:!!L||X,onClose:()=>{m(null),E(!1)},student:L,onSave:o=>O.mutate(o),isSaving:O.isPending}),t.jsx(ke,{isOpen:H,project:a,onClose:()=>F(!1)}),t.jsx(N,{isOpen:V,onClose:()=>y(!1),onConfirm:oe,title:"Delete Project",description:`Are you sure you want to delete "${a.name}"? This action cannot be undone.`,variant:"danger",confirmText:"Delete Project",cancelText:"Cancel"}),t.jsx(N,{isOpen:W,onClose:()=>C(!1),onConfirm:te,title:"Close Project",description:`Are you sure you want to close "${a.name}"? This will mark the project status as completed.`,variant:"warning",confirmText:"Close Project",cancelText:"Cancel"})]})};export{Ge as PROJECT_STAGES_OPTIONS,vt as ProjectDashboardPage};
