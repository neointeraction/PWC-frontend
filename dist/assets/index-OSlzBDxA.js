import{g as o,e as v,r as u,j as t,c as k,E as R,B as C,aK as T,ax as w,aL as P}from"./index-BVWJ6WpZ.js";import{u as N}from"./useQuery-Dmtd0Dz1.js";import{P as D}from"./PageHeader-CjIjxeGI.js";import{C as z}from"./Card-DUBe1Bjk.js";import{I as L}from"./Input-DVW4Hyzv.js";import{S as A}from"./Select-BodBe-a6.js";import{T as I}from"./Table-BWgMaM_p.js";import{B as r}from"./Badge-DW76FgrL.js";import"./Table.styles-D5u9EaYs.js";import"./FileUpload.styles-C0j1LOld.js";import"./Breadcrumb-9LG9en0e.js";import"./Modal-Db5Ns9rg.js";import"./ConfirmDialog-BMFEuEs4.js";import"./Checkbox-C7t_Tpgp.js";import"./SuccessModal.styles-C-q5LclL.js";import{T as E}from"./Tooltip-C1eXP5zv.js";import{p as M}from"./project.service-RU6EL_sY.js";import"./Card.styles-D7KkWwZR.js";import"./Badge.styles-BS3Wf50w.js";import"./counselors.mock-CbyQmpLX.js";const G=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,B=o.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,H=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  flex: 1;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,F=o.div`
  min-width: 320px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    width: 100%;
  }
`,W=o.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,n=o.div`
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: 4px;
`,a=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,i=o.span`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.text};
`,K=o.div`
  display: flex;
  flex-direction: column;
`,U=o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,q=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,O=o.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.text};
`,Q=o.div`
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
`,V=o.button`
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
`,g={"proj-001":[{id:"rep-1",studentName:"Rohan Sharma",studentRoll:"STD-101",email:"rohan.s@student.edu",grade:"12th",counselorName:"Anil Iyer",session1Status:"completed",session2Status:"completed",recommendedTrack:"Technology & AI Engineering",reportStatus:"generated"},{id:"rep-2",studentName:"Priya Verma",studentRoll:"STD-102",email:"priya.v@student.edu",grade:"12th",counselorName:"Anil Iyer",session1Status:"completed",session2Status:"scheduled",recommendedTrack:"Healthcare & Medicine",reportStatus:"pending"},{id:"rep-3",studentName:"Ananya Roy",studentRoll:"STD-103",email:"ananya.r@student.edu",grade:"11th",counselorName:"Mahesh Pillai",session1Status:"completed",session2Status:"completed",recommendedTrack:"Financial Markets & Economics",reportStatus:"generated"},{id:"rep-4",studentName:"Siddharth Menon",studentRoll:"STD-104",email:"sid.m@student.edu",grade:"12th",counselorName:"Hema Kurup",session1Status:"scheduled",session2Status:"pending",recommendedTrack:"Digital Design & Animation",reportStatus:"pending"},{id:"rep-5",studentName:"Kavya Gupta",studentRoll:"STD-105",email:"kavya.g@student.edu",grade:"10th",counselorName:"Girish Bhat",session1Status:"completed",session2Status:"completed",recommendedTrack:"Law & International Relations",reportStatus:"generated"}]},xe=()=>{const e=v(),[m,x]=u.useState("proj-001"),[d,S]=u.useState(""),[f,j]=u.useState(1),h=10,{data:l}=N({queryKey:["projectsSelect"],queryFn:()=>M.getAll({page:1,limit:100})}),y=(l==null?void 0:l.data.map(s=>({value:s.id,label:`${s.name} (${s.instituteName})`})))||[{value:"proj-001",label:"Greenwood High School - Career Guidance"},{value:"proj-002",label:"St. Xavier College - Higher Edu Pathway"},{value:"proj-003",label:"DPS International - Stream Selection"}],c=(g[m]||g["proj-001"]).filter(s=>{if(!d)return!0;const p=d.toLowerCase();return s.studentName.toLowerCase().includes(p)||s.counselorName.toLowerCase().includes(p)||s.recommendedTrack.toLowerCase().includes(p)}),b=()=>{e.success("Report Export Started","Downloading comprehensive project report CSV...")},$=[{key:"studentName",header:"Student Info",render:s=>t.jsxs(K,{children:[t.jsx(U,{children:s.studentName}),t.jsxs(q,{children:["Roll: ",s.studentRoll," • ",s.email]})]})},{key:"grade",header:"Grade",render:s=>t.jsx(r,{variant:"default",children:s.grade})},{key:"counselorName",header:"Counselor",render:s=>t.jsxs(O,{children:[t.jsx(w,{size:14}),s.counselorName]})},{key:"session1Status",header:"Session 1",render:s=>t.jsx(r,{variant:s.session1Status==="completed"?"default":s.session1Status==="scheduled"?"info":"warning",dot:!0,children:s.session1Status.charAt(0).toUpperCase()+s.session1Status.slice(1)})},{key:"session2Status",header:"Session 2",render:s=>t.jsx(r,{variant:s.session2Status==="completed"?"default":s.session2Status==="scheduled"?"info":"warning",dot:!0,children:s.session2Status.charAt(0).toUpperCase()+s.session2Status.slice(1)})},{key:"recommendedTrack",header:"Recommended Pathway",render:s=>t.jsx("span",{style:{fontSize:"13px",fontWeight:500,color:"#1f2937"},children:s.recommendedTrack})},{key:"reportStatus",header:"Report Status",render:s=>t.jsx(r,{variant:s.reportStatus==="generated"?"success":"warning",children:s.reportStatus==="generated"?"Generated":"Pending Review"})},{key:"actions",header:"Actions",render:s=>t.jsx(Q,{children:t.jsx(E,{content:"Download PDF Report",children:t.jsx(V,{onClick:()=>e.info("Download Started",`Downloading PDF report for ${s.studentName}`),children:t.jsx(P,{size:16})})})})}];return t.jsxs(G,{children:[t.jsx(D,{title:"Project Reports & Analytics",subtitle:"Select a project to analyze student career counseling progress and download report summaries.",breadcrumbs:[{label:"Dashboard",href:k.DASHBOARD},{label:"Report"}]}),t.jsxs(B,{children:[t.jsxs(H,{children:[t.jsx(F,{children:t.jsx(A,{label:"Select Project",value:m,onChange:s=>x(s.target.value),options:y})}),t.jsx("div",{style:{width:"280px",marginTop:"22px"},children:t.jsx(L,{placeholder:"Search student or counselor...",leftIcon:t.jsx(R,{size:16}),value:d,onChange:s=>S(s.target.value)})})]}),t.jsx("div",{style:{marginTop:"22px"},children:t.jsx(C,{leftIcon:t.jsx(T,{size:18}),onClick:b,children:"Export Project Report"})})]}),t.jsxs(W,{children:[t.jsxs(n,{children:[t.jsx(a,{children:"Total Students Enrolled"}),t.jsx(i,{children:"120"})]}),t.jsxs(n,{children:[t.jsx(a,{children:"Completed Sessions"}),t.jsx(i,{children:"184"})]}),t.jsxs(n,{children:[t.jsx(a,{children:"Reports Generated"}),t.jsx(i,{children:"98"})]}),t.jsxs(n,{children:[t.jsx(a,{children:"Pending Review"}),t.jsx(i,{children:"22"})]})]}),t.jsx(z,{padding:"lg",children:t.jsx(I,{columns:$,data:c,keyExtractor:s=>s.id,emptyMessage:"No reports found for the selected project.",pagination:{page:f,limit:h,total:c.length,totalPages:Math.ceil(c.length/h)||1,onPageChange:j}})})]})};export{xe as ReportsPage};
