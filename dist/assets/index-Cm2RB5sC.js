import{g as s,ay as ie,u as ce,w as de,e as pe,r as c,j as t,i as ue,c as T,B as g,az as xe,aA as ge,M as me,ax as fe,E as he,av as N,aB as Se,F as je,aC as Ce}from"./index-Bw790BVp.js";import{u as be}from"./useQuery-DHiuBO_3.js";import{u as ye}from"./useMutation-DzanZul2.js";import{C as ve}from"./Card-B7O1DSEf.js";import{I as $e}from"./Input-BPi4Svcd.js";import{S as we}from"./Select-DGOp38p5.js";import{T as Fe}from"./Table--rB9Za6j.js";import"./Badge.styles-BImuS65e.js";import"./Table.styles-CMb45pz0.js";import"./FileUpload.styles-CwDfPGaU.js";import"./Breadcrumb-D5qQxgOH.js";import"./Modal-BrT8bxZc.js";import"./ConfirmDialog-BkM9sPJY.js";import"./Checkbox-DarQh2Zg.js";import{A as B}from"./AlertModal-DCt7rpbd.js";import{T as U}from"./Tooltip-DVjunIWN.js";import"./SuccessModal.styles-BgGVH7XN.js";import{m as G,p as W}from"./project.service-RU6EL_sY.js";import{f as Ee}from"./index-BW8bBlXO.js";import{E as Ie}from"./EditProjectModal-lc2xLETa.js";import{S as De,E as ke}from"./StudentFollowUpModal-CYJheDOd.js";import"./Card.styles-BQGvdCGA.js";import"./SuccessModal-DOdI_xPc.js";import"./counselors.mock-CbyQmpLX.js";import"./DatePicker-BtgIvKfs.js";import"./FileUpload-hTfxPfiK.js";import"./Badge-XwSei9t-.js";const Pe=s.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Te=s.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`,Le=s.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`,Oe=s.button`
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
`,ze=s.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Ae=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,Re=s.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Me=s.span`
  background-color: rgba(245, 158, 11, 0.12);
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`,Ne=s.span`
  background-color: ${({theme:e,$isClosed:n})=>n?e.colors.surfaceHover:e.colors.successLight};
  color: ${({theme:e,$isClosed:n})=>n?e.colors.textSecondary:e.colors.success};
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`,Be=s.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
  flex-wrap: wrap;
`,Ue=s.span`
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,Ge=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,We=s.div`
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
`,C=s.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
`,b=s.span`
  font-size: 28px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
`,qe=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: 24px;

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,Ye=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,_e=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,He=s.div`
  max-width: 320px;
  width: 100%;
`,Je=s.button`
  width: 38px;
  height: 38px;
  border: 1px solid ${({theme:e,$active:n})=>n?"#EF4444":e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e,$active:n})=>n?"#FEF2F2":e.colors.surface};
  color: ${({theme:e,$active:n,$variant:m})=>n||m==="flag"?"#DC2626":m==="excel"?"#16A34A":e.colors.text};
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
`;const Qe=s.button`
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
`,Ve=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: 500;
  color: ${({theme:e})=>e.colors.text};
`;s.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`;s.span`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;const Ke=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,Xe=s.span`
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
`,Ze=s.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({theme:e})=>e.colors.textSecondary};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
`,et=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,tt=s.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #EF4444;
  cursor: pointer;
`,ot=s.button`
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
  border: 1px solid ${({theme:e,$active:n})=>n?"#EF4444":e.colors.border};
  background-color: ${({theme:e,$active:n})=>n?"#FEF2F2":e.colors.surface};
  color: ${({theme:e,$active:n})=>n?"#DC2626":e.colors.textSecondary};

  &:hover {
    border-color: #EF4444;
    color: #DC2626;
    background-color: #FEF2F2;
  }
`,q=[{value:"all",label:"All Stages"},{value:"Login Activated",label:"Login Activated"},{value:"Profile Completed",label:"Profile Completed"},{value:"Pre-Counselling — Student",label:"Pre-Counselling — Student"},{value:"Pre-Counselling — Parent",label:"Pre-Counselling — Parent"},{value:"Assessment Completed",label:"Assessment Completed"},{value:"Session Booked",label:"Session Booked"},{value:"Session 1 Completed",label:"Session 1 Completed"},{value:"Session 2 Completed",label:"Session 2 Completed"},{value:"Feedback — Student",label:"Feedback — Student"},{value:"Feedback — Parent",label:"Feedback — Parent"},{value:"Report Downloaded",label:"Report Downloaded"}],kt=()=>{const{projectId:e}=ie(),n=ce(),m=de(),u=pe(),i=G.find(o=>o.id===e)||G[0],[Y,y]=c.useState(!1),[_,v]=c.useState(!1),[$,H]=c.useState(i.status==="completed"),[J,L]=c.useState(!1),[w,Q]=c.useState(""),[F,V]=c.useState("all"),[E,K]=c.useState(!1),[I,f]=c.useState(1),[O,D]=c.useState(null),[z,A]=c.useState(null),[X,k]=c.useState(!1),h=10,{data:d=[],isLoading:Z}=be({queryKey:["projectStudents",e],queryFn:()=>W.getProjectStudents(e||"proj-001")}),P=ye({mutationFn:o=>W.updateProjectStudent(e||"proj-001",o),onSuccess:()=>{m.invalidateQueries({queryKey:["projectStudents",e]}),u.success("Student Saved","Student information updated successfully."),D(null),k(!1)},onError:()=>{u.error("Save Failed","Could not update student details.")}}),ee=()=>{L(!0)},te=()=>{H(!0),v(!1),u.success("Project Closed",`"${i.name}" has been marked as completed.`)},oe=()=>{y(!1),u.warning("Project Deleted",`${i.name} has been removed.`),n(T.PROJECTS)},se=()=>{const o={id:`std-new-${Date.now()}`,studentId:`ST${100+d.length+1}`,name:"",email:"",mobile:"+91 ",grade:"Grade 11",counselorId:"COU-01",counselorName:"Dr. Rajeshwari Menon",stage:"Login Activated",stageCompletedDate:new Date().toISOString().slice(0,10),daysInStage:0,isFlagged:!1};D(o),k(!0)},R=()=>{const o={};q.filter(r=>r.value!=="all").forEach(r=>{o[r.value]=0}),d.forEach(r=>{const p=r.stage||"Login Activated";o[p]=(o[p]||0)+1});const a=d.filter(r=>r.isFlagged).length;let l=`PROJECT STUDENTS STAGE REPORT
`;l+=`Project Name,${i.name}
`,l+=`Institution,${i.instituteName}
`,l+=`Total Enrolled Students,${d.length}
`,l+=`Total Overdue Flagged (>2 Days Inactive),${a}

`,l+=`STAGE-WISE DISTRIBUTION SUMMARY
`,l+=`Stage Name,Student Count
`,Object.entries(o).forEach(([r,p])=>{l+=`"${r}",${p}
`}),l+=`
`,l+=`STUDENT-LEVEL DETAIL LIST
`,l+=`Student ID,Student Name,Grade / Class,Counselor ID,Counselor Name,Current Stage,Stage Date,Days In Stage,Follow-up Flag (>2 Days)
`,S.forEach(r=>{var p,M;l+=`"${r.studentId||r.id}","${r.name}","${r.grade}","${r.counselorId||"COU-01"}","${r.counselorName||((p=r.session1)==null?void 0:p.counselorName)||"Dr. Rajeshwari Menon"}","${r.stage||"Login Activated"}","${r.stageCompletedDate||((M=r.session1)==null?void 0:M.date)||"—"}","${r.daysInStage??"—"}","${r.isFlagged?"FLAGGED (>2 Days Inactive)":"On Track"}"
`});const ae=new Blob([l],{type:"text/csv;charset=utf-8;"}),le=URL.createObjectURL(ae),x=document.createElement("a");x.setAttribute("href",le),x.setAttribute("download",`${i.name.replace(/\s+/g,"_")}_Stage_Report.csv`),document.body.appendChild(x),x.click(),document.body.removeChild(x),u.success("Excel Export Started","Downloaded project stage distribution and students report (.csv).")},ne=d.filter(o=>o.isFlagged).length,S=d.filter(o=>{if(E&&!o.isFlagged||F!=="all"&&o.stage!==F)return!1;if(w){const a=w.toLowerCase();return o.name.toLowerCase().includes(a)||o.studentId&&o.studentId.toLowerCase().includes(a)||o.grade&&o.grade.toLowerCase().includes(a)||o.stage&&o.stage.toLowerCase().includes(a)||o.counselorId&&o.counselorId.toLowerCase().includes(a)||o.counselorName&&o.counselorName.toLowerCase().includes(a)||o.email.toLowerCase().includes(a)||o.mobile.toLowerCase().includes(a)}return!0}),re=[{key:"studentId",header:"Student ID",width:"120px",render:o=>o.studentId||`ST${100+(parseInt(o.id.replace(/\D/g,""),10)||1)}`},{key:"name",header:"Student Name",width:"200px",render:o=>t.jsx(Qe,{type:"button",onClick:()=>A(o),"aria-label":`View details for ${o.name}`,children:o.name})},{key:"grade",header:"Grade / Class",width:"130px",render:o=>t.jsx(Ze,{children:o.grade})},{key:"counselor",header:"Counselor",width:"230px",render:o=>{var a;return t.jsxs(Ke,{children:[t.jsx(Xe,{children:o.counselorId||"COU-01"}),t.jsx("span",{children:o.counselorName||((a=o.session1)==null?void 0:a.counselorName)||"Dr. Rajeshwari Menon"})]})}},{key:"stage",header:"Current Stage",width:"240px",render:o=>t.jsx(Ve,{children:t.jsx("span",{children:o.stage||"Login Activated"})})},{key:"stageCompletedDate",header:"Stage Date",width:"180px",render:o=>{var l;const a=o.stageCompletedDate||((l=o.session1)==null?void 0:l.date);return t.jsxs(et,{children:[t.jsx(Ce,{size:14,style:{color:"#6B7280",flexShrink:0}}),t.jsx("span",{children:a?Ee(a):"—"}),o.isFlagged&&t.jsx(U,{content:`Stage inactive for ${o.daysInStage||3} days (> 2 days threshold) — follow up required`,children:t.jsx(tt,{children:t.jsx(N,{size:16})})})]})}}];return t.jsxs(Pe,{children:[t.jsxs(Te,{children:[t.jsxs(Le,{children:[t.jsx(Oe,{type:"button",onClick:()=>n(T.PROJECTS),"aria-label":"Back to Projects",children:t.jsx(ue,{size:18})}),t.jsxs(ze,{children:[t.jsxs(Ae,{children:[t.jsx(Re,{children:i.instituteName}),t.jsx(Me,{children:"INS001"}),t.jsx(Ne,{$isClosed:$,children:$?"Completed":"Ongoing"})]}),t.jsxs(Be,{children:[t.jsx("span",{children:i.location||"Mumbai, Maharashtra"}),t.jsx("span",{children:"•"}),t.jsx(Ue,{children:"Period : 01 Aug, 2026 – 31 Oct, 2026"})]})]})]}),t.jsxs(Ge,{children:[t.jsx(g,{variant:"secondary",size:"sm",leftIcon:t.jsx(xe,{size:16}),onClick:ee,children:"Extend Project"}),t.jsx(g,{variant:"secondary",size:"sm",leftIcon:t.jsx(ge,{size:16}),onClick:()=>v(!0),children:$?"Closed":"Close Project"}),t.jsx(g,{variant:"danger",size:"sm",leftIcon:t.jsx(me,{size:16}),onClick:()=>y(!0),children:"Delete project"}),t.jsx(g,{variant:"primary",size:"sm",leftIcon:t.jsx(fe,{size:16}),onClick:R,children:"Export Report"})]})]}),t.jsxs(We,{children:[t.jsxs(j,{$clickable:!0,onClick:()=>n(T.PROJECT_SESSIONS.replace(":projectId",e||"proj-001")),title:"Click to view Project Sessions",children:[t.jsx(C,{children:"Counsellors"}),t.jsx(b,{children:"44"})]}),t.jsxs(j,{children:[t.jsx(C,{children:"Total Students"}),t.jsx(b,{children:d.length||350})]}),t.jsxs(j,{children:[t.jsx(C,{children:"Total Days"}),t.jsx(b,{children:"95"})]}),t.jsxs(j,{children:[t.jsx(C,{children:"Remaining Days"}),t.jsx(b,{children:"15"})]})]}),t.jsxs(ve,{padding:"lg",children:[t.jsxs(qe,{children:[t.jsxs(Ye,{children:[t.jsx(He,{children:t.jsx($e,{placeholder:"Search student, ID, stage or counselor...",leftIcon:t.jsx(he,{size:16}),value:w,onChange:o=>{Q(o.target.value),f(1)}})}),t.jsx("div",{style:{width:"260px"},children:t.jsx(we,{value:F,onChange:o=>{V(o.target.value),f(1)},options:q})})]}),t.jsxs(_e,{children:[t.jsxs(ot,{type:"button",$active:E,onClick:()=>{K(o=>!o),f(1)},"aria-label":"Filter by Overdue Flag",children:[t.jsx(N,{size:16}),t.jsx("span",{children:E?"Showing Flagged":`Flagged (${ne})`})]}),t.jsx(U,{content:"Export Students Stage Report to Excel",children:t.jsx(Je,{type:"button",$variant:"excel",onClick:R,"aria-label":"Export Students to Excel",children:t.jsx(Se,{size:18})})}),t.jsx(g,{leftIcon:t.jsx(je,{size:16}),onClick:se,children:"Add Student"})]})]}),t.jsx(Fe,{columns:re,data:S.slice((I-1)*h,I*h),isLoading:Z,keyExtractor:o=>o.id,emptyMessage:"No project students found matching filters.",pagination:{page:I,limit:h,total:S.length,totalPages:Math.ceil(S.length/h)||1,onPageChange:f}})]}),t.jsx(De,{isOpen:!!z,onClose:()=>A(null),student:z,onSave:o=>P.mutate(o)}),t.jsx(ke,{isOpen:!!O||X,onClose:()=>{D(null),k(!1)},student:O,onSave:o=>P.mutate(o),isSaving:P.isPending}),t.jsx(Ie,{isOpen:J,project:i,onClose:()=>L(!1)}),t.jsx(B,{isOpen:Y,onClose:()=>y(!1),onConfirm:oe,title:"Delete Project",description:`Are you sure you want to delete "${i.name}"? This action cannot be undone.`,variant:"danger",confirmText:"Delete Project",cancelText:"Cancel"}),t.jsx(B,{isOpen:_,onClose:()=>v(!1),onConfirm:te,title:"Close Project",description:`Are you sure you want to close "${i.name}"? This will mark the project status as completed.`,variant:"warning",confirmText:"Close Project",cancelText:"Cancel"})]})};export{q as PROJECT_STAGES_OPTIONS,kt as ProjectDashboardPage};
