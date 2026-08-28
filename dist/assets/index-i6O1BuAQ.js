import{g as a,az as Y,u as _,w as J,e as H,r as c,j as o,c as j,E as K,aw as A,aC as V,B as X,F as Z,aD as ee}from"./index-BVWJ6WpZ.js";import{u as P}from"./useQuery-Dmtd0Dz1.js";import{u as te}from"./useMutation-BQUtJgjz.js";import{P as oe}from"./PageHeader-CjIjxeGI.js";import{C as ne}from"./Card-DUBe1Bjk.js";import{I as ae}from"./Input-DVW4Hyzv.js";import{S as se}from"./Select-BodBe-a6.js";import{T as re}from"./Table-BWgMaM_p.js";import"./Badge.styles-BS3Wf50w.js";import"./Table.styles-D5u9EaYs.js";import"./FileUpload.styles-C0j1LOld.js";import"./Breadcrumb-9LG9en0e.js";import"./Modal-Db5Ns9rg.js";import"./ConfirmDialog-BMFEuEs4.js";import"./Checkbox-C7t_Tpgp.js";import"./SuccessModal.styles-C-q5LclL.js";import{T as L}from"./Tooltip-C1eXP5zv.js";import{p as E}from"./project.service-RU6EL_sY.js";import{f as le}from"./index-BW8bBlXO.js";import{S as ie,E as de}from"./StudentFollowUpModal-CcxBPpv7.js";import"./Card.styles-D7KkWwZR.js";import"./counselors.mock-CbyQmpLX.js";const ce=a.div`
  display: flex;
  flex-direction: column;
`,ue=a.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,pe=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ge=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,me=a.button`
  width: 38px;
  height: 38px;
  border: 1px solid ${({theme:e,$active:s})=>s?"#EF4444":e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e,$active:s})=>s?"#FEF2F2":e.colors.surface};
  color: ${({theme:e,$active:s,$variant:g})=>s||g==="flag"?"#DC2626":g==="excel"?"#16A34A":e.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({$variant:e,theme:s})=>e==="flag"?"#DC2626":e==="excel"?"#16A34A":s.colors.primary};
    background-color: ${({$variant:e,theme:s})=>e==="flag"?"#FEF2F2":e==="excel"?"#F0FDF4":s.colors.primaryLight};
    color: ${({$variant:e,theme:s})=>e==="flag"?"#DC2626":e==="excel"?"#16A34A":s.colors.primary};
  }
`,xe=a.div`
  max-width: 320px;
  width: 100%;
`;a.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;a.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;a.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`;const fe=a.button`
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
`,Se=a.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: 500;
  color: ${({theme:e})=>e.colors.text};
`;a.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`;a.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`;a.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;const he=a.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,Ce=a.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  letter-spacing: 0.3px;
  flex-shrink: 0;
`,be=a.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({theme:e})=>e.colors.textSecondary};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,ye=a.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,ve=a.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #EF4444;
  cursor: pointer;
`,$e=a.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 14px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({theme:e,$active:s})=>s?"#EF4444":e.colors.border};
  background-color: ${({theme:e,$active:s})=>s?"#FEF2F2":e.colors.surface};
  color: ${({theme:e,$active:s})=>s?"#DC2626":e.colors.textSecondary};

  &:hover {
    border-color: #EF4444;
    color: #DC2626;
    background-color: #FEF2F2;
  }
`,T=[{value:"all",label:"All Stages"},{value:"Login Activated",label:"Login Activated"},{value:"Profile Completed",label:"Profile Completed"},{value:"Pre-Counselling — Student",label:"Pre-Counselling — Student"},{value:"Pre-Counselling — Parent",label:"Pre-Counselling — Parent"},{value:"Assessment Completed",label:"Assessment Completed"},{value:"Session Booked",label:"Session Booked"},{value:"Session 1 Completed",label:"Session 1 Completed"},{value:"Session 2 Completed",label:"Session 2 Completed"},{value:"Feedback — Student",label:"Feedback — Student"},{value:"Feedback — Parent",label:"Feedback — Parent"},{value:"Report Downloaded",label:"Report Downloaded"}],Ye=()=>{const{projectId:e}=Y(),s=_(),g=J(),S=H(),[h,R]=c.useState(""),[C,z]=c.useState("all"),[b,O]=c.useState(!1),[y,m]=c.useState(1),[w,v]=c.useState(null),[D,I]=c.useState(null),[N,$]=c.useState(!1),x=10,{data:i}=P({queryKey:["project",e],queryFn:()=>E.getById(e||"proj-001")}),{data:u=[],isLoading:B}=P({queryKey:["projectStudents",e],queryFn:()=>E.getProjectStudents(e||"proj-001")}),F=te({mutationFn:t=>E.updateProjectStudent(e||"proj-001",t),onSuccess:()=>{g.invalidateQueries({queryKey:["projectStudents",e]}),S.success("Student Saved","Student information updated successfully."),v(null),$(!1)},onError:()=>{S.error("Save Failed","Could not update student details.")}}),M=()=>{const t={id:`std-new-${Date.now()}`,studentId:`ST${100+u.length+1}`,name:"",email:"",mobile:"+91 ",grade:"Grade 11",counselorId:"COU-01",counselorName:"Dr. Rajeshwari Menon",stage:"Login Activated",stageCompletedDate:new Date().toISOString().slice(0,10),daysInStage:0,isFlagged:!1};v(t),$(!0)},U=()=>{const t={};T.filter(n=>n.value!=="all").forEach(n=>{t[n.value]=0}),u.forEach(n=>{const d=n.stage||"Login Activated";t[d]=(t[d]||0)+1});const r=u.filter(n=>n.isFlagged).length;let l=`PROJECT STUDENTS STAGE REPORT
`;l+=`Project Name,${(i==null?void 0:i.name)||"Career Guidance 2026 Batch A"}
`,l+=`Institution,${(i==null?void 0:i.instituteName)||"St. Xavier's College, Mumbai"}
`,l+=`Total Enrolled Students,${u.length}
`,l+=`Total Overdue Flagged (>2 Days Inactive),${r}

`,l+=`STAGE-WISE DISTRIBUTION SUMMARY
`,l+=`Stage Name,Student Count
`,Object.entries(t).forEach(([n,d])=>{l+=`"${n}",${d}
`}),l+=`
`,l+=`STUDENT-LEVEL DETAIL LIST
`,l+=`Student ID,Student Name,Grade / Class,Counselor ID,Counselor Name,Current Stage,Stage Date,Days In Stage,Follow-up Flag (>2 Days)
`,f.forEach(n=>{var d,k;l+=`"${n.studentId||n.id}","${n.name}","${n.grade}","${n.counselorId||"COU-01"}","${n.counselorName||((d=n.session1)==null?void 0:d.counselorName)||"Dr. Rajeshwari Menon"}","${n.stage||"Login Activated"}","${n.stageCompletedDate||((k=n.session1)==null?void 0:k.date)||"—"}","${n.daysInStage??"—"}","${n.isFlagged?"FLAGGED (>2 Days Inactive)":"On Track"}"
`});const q=new Blob([l],{type:"text/csv;charset=utf-8;"}),Q=URL.createObjectURL(q),p=document.createElement("a");p.setAttribute("href",Q),p.setAttribute("download",`${((i==null?void 0:i.name)||"Project").replace(/\s+/g,"_")}_Stage_Report.csv`),document.body.appendChild(p),p.click(),document.body.removeChild(p),S.success("Excel Export Started","Downloaded project stage distribution and students report (.csv).")},G=u.filter(t=>t.isFlagged).length,f=u.filter(t=>{if(b&&!t.isFlagged||C!=="all"&&t.stage!==C)return!1;if(h){const r=h.toLowerCase();return t.name.toLowerCase().includes(r)||t.studentId&&t.studentId.toLowerCase().includes(r)||t.grade&&t.grade.toLowerCase().includes(r)||t.stage&&t.stage.toLowerCase().includes(r)||t.counselorId&&t.counselorId.toLowerCase().includes(r)||t.counselorName&&t.counselorName.toLowerCase().includes(r)||t.email.toLowerCase().includes(r)||t.mobile.toLowerCase().includes(r)}return!0}),W=[{key:"studentId",header:"Student ID",width:"120px",render:t=>t.studentId||`ST${100+(parseInt(t.id.replace(/\D/g,""),10)||1)}`},{key:"name",header:"Student Name",width:"200px",render:t=>o.jsx(fe,{type:"button",onClick:()=>I(t),"aria-label":`View details for ${t.name}`,children:t.name})},{key:"grade",header:"Grade / Class",width:"130px",render:t=>o.jsx(be,{children:t.grade})},{key:"counselor",header:"Counselor",width:"230px",render:t=>{var r;return o.jsxs(he,{children:[o.jsx(Ce,{children:t.counselorId||"COU-01"}),o.jsx("span",{children:t.counselorName||((r=t.session1)==null?void 0:r.counselorName)||"Dr. Rajeshwari Menon"})]})}},{key:"stage",header:"Current Stage",width:"240px",render:t=>o.jsx(Se,{children:o.jsx("span",{children:t.stage||"Login Activated"})})},{key:"stageCompletedDate",header:"Stage Date",width:"180px",render:t=>{var l;const r=t.stageCompletedDate||((l=t.session1)==null?void 0:l.date);return o.jsxs(ye,{children:[o.jsx(ee,{size:14,style:{color:"#6B7280",flexShrink:0}}),o.jsx("span",{children:r?le(r):"—"}),t.isFlagged&&o.jsx(L,{content:`Stage inactive for ${t.daysInStage||3} days (> 2 days threshold) — follow up required`,children:o.jsx(ve,{children:o.jsx(A,{size:16})})})]})}}];return o.jsxs(ce,{children:[o.jsx(oe,{title:`Project Students - ${(i==null?void 0:i.name)||"Career Guidance"}`,subtitle:"Manage enrolled students, edit personal info, and reassign session counselors.",breadcrumbs:[{label:"Dashboard",href:j.DASHBOARD},{label:"Projects",href:j.PROJECTS},{label:"Project Students"}],onBack:()=>s(j.PROJECTS)}),o.jsxs(ne,{padding:"lg",children:[o.jsxs(ue,{style:{marginBottom:"24px"},children:[o.jsxs(pe,{children:[o.jsx(xe,{children:o.jsx(ae,{placeholder:"Search student, ID, stage or counselor...",leftIcon:o.jsx(K,{size:16}),value:h,onChange:t=>{R(t.target.value),m(1)}})}),o.jsx("div",{style:{width:"260px"},children:o.jsx(se,{value:C,onChange:t=>{z(t.target.value),m(1)},options:T})})]}),o.jsxs(ge,{children:[o.jsxs($e,{type:"button",$active:b,onClick:()=>{O(t=>!t),m(1)},"aria-label":"Filter by Overdue Flag",children:[o.jsx(A,{size:16}),o.jsx("span",{children:b?"Showing Flagged":`Flagged (${G})`})]}),o.jsx(L,{content:"Export Students Stage Report to Excel",children:o.jsx(me,{type:"button",$variant:"excel",onClick:U,"aria-label":"Export Students to Excel",children:o.jsx(V,{size:18})})}),o.jsx(X,{leftIcon:o.jsx(Z,{size:16}),onClick:M,children:"Add Student"})]})]}),o.jsx(re,{columns:W,data:f.slice((y-1)*x,y*x),isLoading:B,keyExtractor:t=>t.id,emptyMessage:"No project students found matching filters.",pagination:{page:y,limit:x,total:f.length,totalPages:Math.ceil(f.length/x)||1,onPageChange:m}})]}),o.jsx(ie,{isOpen:!!D,onClose:()=>I(null),student:D,onSave:t=>F.mutate(t)}),o.jsx(de,{isOpen:!!w||N,onClose:()=>{v(null),$(!1)},student:w,onSave:t=>F.mutate(t),isSaving:F.isPending})]})};export{T as PROJECT_STAGES_OPTIONS,Ye as ProjectStudentsPage};
