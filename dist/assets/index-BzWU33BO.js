import{g as s,aS as k,u as $,e as D,r as R,j as t,c as a,B as p,H as E,F as A,aR as M}from"./index-8F0JLEEw.js";import{P as z}from"./PageHeader-KpQVPwcf.js";import{C as x}from"./Card-NeciUoS1.js";import{T as N}from"./Table-De9tPJgC.js";import{B as m}from"./Badge-BUMvygFF.js";import"./Input-B-q5qiE9.js";import"./Select-DOe36KaS.js";import"./Table.styles-ChZe2G4O.js";import"./FileUpload.styles-KF3-WQbH.js";import"./Breadcrumb-BKyN92ya.js";import"./Modal-CytuL-Vc.js";import"./ConfirmDialog-xc0s7d87.js";import"./Checkbox-CuNKoPRx.js";import{A as L}from"./AlertModal-Dy1x5okA.js";import"./Tooltip-K2tZS8Xo.js";import"./SuccessModal.styles-DHiS2Can.js";import{m as u}from"./projects.mock-DLTGC6HA.js";import"./Card.styles-BzuSn5_T.js";import"./Badge.styles-DMnJVozC.js";import"./SuccessModal-BKQmnmgg.js";const B=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xl};
`,I=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`;s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  margin-left: ${({theme:e})=>e.spacing.md};
`;s.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
`;s.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 13px;
    font-weight: 700;
    color: ${({theme:e})=>e.colors.text};
  }

  span:last-child {
    font-size: 11px;
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`;const O=s.div`
  background: linear-gradient(
    135deg,
    ${({theme:e})=>e.colors.surface} 0%,
    ${({theme:e})=>e.colors.primaryLight} 100%
  );
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,U=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`,F=s.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,J=s.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
`,H=s.span`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,h=s.div`
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  overflow: hidden;
`,f=s.div`
  width: ${({$percent:e})=>Math.min(Math.max(e,0),100)}%;
  height: 100%;
  background-color: ${({theme:e,$color:r})=>r||e.colors.primary};
  border-radius: 4px;
  transition: width 0.4s ease;
`,_=s.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: ${({theme:e})=>e.spacing.xl};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`,G=s.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,K=s.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,W=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,V=s.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,q=s.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.textSecondary};
`,Q=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,X=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  background-color: ${({theme:e})=>e.colors.surface};
`,Y=s.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Z=s.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({theme:e})=>e.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`,ee=s.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 14px;
    font-weight: 700;
    color: ${({theme:e})=>e.colors.text};
  }

  span:last-child {
    font-size: 12px;
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,te=s.div`
  display: flex;
  align-items: center;
  gap: 32px;
`,g=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    text-transform: uppercase;
    color: ${({theme:e})=>e.colors.textSecondary};
    font-weight: 600;
  }

  span:last-child {
    font-size: 14px;
    font-weight: 700;
    color: ${({theme:e})=>e.colors.text};
  }
`,Pe=()=>{const{projectId:e}=k(),r=$(),l=D(),[b,c]=R.useState(!1),n=u.find(o=>o.id===e)||u[0],j=()=>{l.success("Project Extended",`Contract for ${n.name} extended by 90 days.`)},y=()=>{const o=`Project Detailed Summary Report
Project Name,${n.name}
Institute,${n.instituteName}
Location,${n.location||"Mumbai, Maharashtra"}
Contract Period,01 Feb 2026 – 31 Jan 2027

Counselors,Total Students,Profile Completed,Pre-counselling PARENT,Pre-counselling STUDENT,Assessment,Session 1,Session 2,Feedback PARENT,Feedback STUDENT
44,340,340,340,340,340,340,340,340,340

Stage-Wise Progress Metrics:
Login Activated,340/350
Profile Completed,322/350
Pre-Counselling Submitted STUDENT,305/350
Assessment Completed,298/350
Session 1 Completed,260/350
Session 2 Completed,231/350
Report Downloaded,214/350
`,d=new Blob([o],{type:"text/csv;charset=utf-8;"}),T=URL.createObjectURL(d),i=document.createElement("a");i.setAttribute("href",T),i.setAttribute("download",`${n.name.replace(/\s+/g,"_")}_Dashboard_Report.csv`),document.body.appendChild(i),i.click(),document.body.removeChild(i),l.success("Report Exported","Downloaded executive project report CSV.")},C=()=>{c(!1),l.warning("Project Deleted",`${n.name} has been removed.`),r(a.PROJECTS)},P=[{name:"Meera Joseph",initials:"MI",studentCount:62,session1:26,session2:46},{name:"R. Krishnan",initials:"RK",studentCount:58,session1:26,session2:46},{name:"Anjali Nair",initials:"AN",studentCount:60,session1:26,session2:46},{name:"Divya Menon",initials:"DM",studentCount:54,session1:26,session2:46}],S=[{label:"Login Activated",count:340,total:350},{label:"Profile Completed",count:322,total:350},{label:"Pre-Counselling Submitted STUDENT",count:305,total:350},{label:"Assessment Completed",count:298,total:350},{label:"Session 1 Completed",count:260,total:350},{label:"Session 2 Completed",count:231,total:350},{label:"Report Downloaded",count:214,total:350}],w=[{key:"counselors",header:"Counselors",width:"120px"},{key:"totalStudents",header:"Total Students",width:"140px"},{key:"profile",header:"Profile",width:"110px"},{key:"preCounsellingParent",header:"Pre-counselling PARENT",width:"190px"},{key:"preCounsellingStudent",header:"Pre-counselling STUDENT",width:"190px"},{key:"assessment",header:"Assessment",width:"130px"},{key:"session1",header:"Session 1",width:"110px"},{key:"session2",header:"Session 2",width:"110px"},{key:"feedbackParent",header:"Feedback PARENT",width:"170px"},{key:"feedbackStudent",header:"Feedback STUDENT",width:"170px"},{key:"status",header:"Status",width:"100px",render:()=>t.jsx(m,{variant:"success",size:"sm",dot:!0,children:"Live"})}],v=[{id:"summary-1",counselors:44,totalStudents:340,profile:340,preCounsellingParent:340,preCounsellingStudent:340,assessment:340,session1:340,session2:340,feedbackParent:340,feedbackStudent:340,status:"Live"}];return t.jsxs(B,{children:[t.jsx(z,{title:n.instituteName,subtitle:n.location||"Mumbai, Maharashtra",breadcrumbs:[{label:"Dashboard",href:a.DASHBOARD},{label:"Projects",href:a.PROJECTS},{label:n.name}],onBack:()=>r(a.PROJECTS),actions:t.jsxs(I,{children:[t.jsx(p,{variant:"secondary",size:"sm",leftIcon:t.jsx(E,{size:16}),onClick:j,children:"Extend Project"}),t.jsx(p,{variant:"danger",size:"sm",leftIcon:t.jsx(A,{size:16}),onClick:()=>c(!0),children:"Delete project"}),t.jsx(p,{variant:"primary",size:"sm",leftIcon:t.jsx(M,{size:16}),onClick:y,children:"Export Report"})]})}),t.jsxs(O,{children:[t.jsxs(U,{children:[t.jsxs(F,{children:[t.jsx(m,{variant:"success",dot:!0,children:"Live"}),t.jsx(J,{children:"Contract: 01 Feb 2026 – 31 Jan 2027"})]}),t.jsx(H,{children:"196 of 365 days elapsed"})]}),t.jsx(h,{children:t.jsx(f,{$percent:53.7})})]}),t.jsx(N,{columns:w,data:v,keyExtractor:o=>o.id}),t.jsxs(_,{children:[t.jsx(x,{title:"Stage-Wise Progress",subtitle:"Breakdown of student journey completion steps",children:t.jsx(G,{children:S.map(o=>{const d=Math.round(o.count/o.total*100);return t.jsxs(K,{children:[t.jsxs(W,{children:[t.jsx(V,{children:o.label}),t.jsxs(q,{children:[o.count,"/",o.total]})]}),t.jsx(h,{children:t.jsx(f,{$percent:d})})]},o.label)})})}),t.jsx(x,{title:"Team on This Project",subtitle:"Assigned counselors & session completion counts",children:t.jsx(Q,{children:P.map(o=>t.jsxs(X,{children:[t.jsxs(Y,{children:[t.jsx(Z,{children:o.initials}),t.jsxs(ee,{children:[t.jsx("span",{children:o.name}),t.jsxs("span",{children:[o.studentCount," students"]})]})]}),t.jsxs(te,{children:[t.jsxs(g,{children:[t.jsx("span",{children:"Session 1"}),t.jsx("span",{children:o.session1})]}),t.jsxs(g,{children:[t.jsx("span",{children:"Session 2"}),t.jsx("span",{children:o.session2})]})]})]},o.name))})})]}),t.jsx(L,{isOpen:b,onClose:()=>c(!1),onConfirm:C,title:"Delete Project",description:`Are you sure you want to delete "${n.name}"? This action cannot be undone.`,variant:"danger",confirmText:"Delete Project",cancelText:"Cancel"})]})};export{Pe as ProjectDashboardPage};
