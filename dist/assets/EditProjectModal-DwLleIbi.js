import{j as t,h as G,r as u,aE as Q,aC as Z,m as _,g as o,as as P,e as I,B as w,l as H,M as V,w as J,i as Y,at as ee,au as te,I as ae,av as se}from"./index-CQIsxyVc.js";import{u as ne}from"./useMutation-BpdSDJqm.js";import{M as oe}from"./Modal-Co5MyHOO.js";import{c as ie,d as re,e as le,f as ce,g as de,h as me,i as ue,F as pe,j as he,D as ge,U as xe,k as fe,B as je,l as be,m as ve,n as ye,o as Se,p as Ce,q as $e,R as ke}from"./FileUpload.styles-Y1Fz2BvR.js";import{I as F}from"./Input-BTc8i6Fv.js";import{S as we}from"./Select-DE5um1RR.js";import{D}from"./DatePicker-Ca_VHuKP.js";import{p as z}from"./project.service-RU6EL_sY.js";import{T as W}from"./Table-5vznqd6X.js";import{T as U}from"./Tooltip-5yEO6vap.js";import{B as Fe}from"./Badge-CYwePiJT.js";const Ee=({steps:e,activeStep:a})=>{const h=r=>r<a?"completed":r===a?"active":"upcoming";return t.jsx(ie,{children:e.map((r,g)=>{const n=h(g),l=g===e.length-1;return t.jsxs(re,{children:[t.jsx(le,{$state:n,children:n==="completed"?t.jsx(G,{size:16}):r.icon||g+1}),t.jsxs(ce,{children:[t.jsx(de,{$active:n==="active"||n==="completed",children:r.label}),r.description&&t.jsx(me,{children:r.description})]}),!l&&t.jsx(ue,{$completed:g<a})]},r.label)})})},q=e=>new Promise((a,h)=>{const r=new FileReader;r.onload=g=>{var n;try{const l=(n=g.target)==null?void 0:n.result;if(!l||!l.trim()){a([]);return}const x=l.split(/\r?\n/).filter(d=>d.trim().length>0);if(x.length<2){a([]);return}const m=x[0].split(",").map(d=>d.trim()),b=[];for(let d=1;d<x.length;d++){const p=x[d].split(",").map(j=>j.trim()),f={};m.forEach((j,s)=>{f[j]=p[s]||""}),Object.values(f).some(j=>j.length>0)&&b.push(f)}a(b)}catch{h(new Error("Failed to parse the file. Please ensure it is a valid CSV format."))}},r.onerror=()=>{h(new Error("Failed to read the file."))},r.readAsText(e)}),ze=e=>{if(e===0)return"0 Bytes";const a=1024,h=["Bytes","KB","MB","GB"],r=Math.floor(Math.log(e)/Math.log(a));return`${parseFloat((e/Math.pow(a,r)).toFixed(1))} ${h[r]}`},O=({accept:e=".csv,.xlsx,.xls",onFileSelect:a,onFileRemove:h,label:r,hint:g="Supported formats: CSV, XLSX, XLS",selectedFile:n=null})=>{const[l,x]=u.useState(!1),m=u.useRef(null),b=u.useCallback(s=>{s.preventDefault(),s.stopPropagation(),x(!0)},[]),d=u.useCallback(s=>{s.preventDefault(),s.stopPropagation(),x(!1)},[]),p=u.useCallback(s=>{s.preventDefault(),s.stopPropagation(),x(!1);const S=s.dataTransfer.files[0];S&&a(S)},[a]),f=u.useCallback(s=>{var C;const S=(C=s.target.files)==null?void 0:C[0];S&&a(S),m.current&&(m.current.value="")},[a]),y=u.useCallback(()=>{var s;(s=m.current)==null||s.click()},[]),j=u.useCallback(s=>{s.stopPropagation(),h==null||h()},[h]);return t.jsxs(pe,{children:[r&&t.jsx(he,{children:r}),t.jsx("input",{ref:m,type:"file",accept:e,onChange:f,hidden:!0,"aria-label":r||"Upload file"}),t.jsxs(ge,{$isDragOver:l,$hasFile:!!n,onDragOver:b,onDragLeave:d,onDrop:p,onClick:y,role:"button",tabIndex:0,"aria-label":"Drop zone for file upload",children:[t.jsx(xe,{children:t.jsx(Q,{size:24})}),t.jsxs(fe,{children:["Drag & drop your file here, or ",t.jsx(je,{children:"browse"})]}),t.jsx(be,{children:g})]}),n&&t.jsxs(ve,{children:[t.jsx(ye,{children:t.jsx(Z,{size:18})}),t.jsxs(Se,{children:[t.jsx(Ce,{children:n.name}),t.jsx($e,{children:ze(n.size)})]}),t.jsx(ke,{onClick:j,"aria-label":"Remove file",children:t.jsx(_,{size:16})})]})]})},Je=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ye=o.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,et=o.div`
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  ${({$active:e,theme:a})=>e&&`
    box-shadow: 0 0 0 2px ${a.colors.primary};
  `}
`,tt=o.div`
  font-size: ${({theme:e})=>e.fontSize.display};
  font-weight: 700;
  color: ${({theme:e,$variant:a})=>a==="success"?"#16A34A":a==="warning"?"#D97706":e.colors.text};
  margin-top: 4px;
`,at=o.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 4px;
`,st=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`,nt=o.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`,ot=o.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.xs};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  tr:hover & {
    opacity: 1;
    visibility: visible;
  }
`,X=o.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,it=o.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,rt=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,lt=o.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  text-align: left;
  cursor: pointer;
  transition: color ${({theme:e})=>e.transition.fast};

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
    text-decoration: underline;
  }
`,ct=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;o.span`
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`;const Pe=o.div`
  margin: -${({theme:e})=>e.spacing.xl};
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,Ie=o.div`
  min-height: 280px;
`,Re=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,Le=o.div`
  display: flex;
  align-items: center;
`,Te=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,R=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`;o.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`;const L=o.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,K=o.div`
  margin-top: ${({theme:e})=>e.spacing.lg};
`,Me=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,k=o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,E=o.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
`;o.div`
  max-width: 480px;
`;const N=o.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,A=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,De=()=>{const{counselors:e,setCounselors:a}=P(),[h,r]=u.useState(null),[g,n]=u.useState(!1),[l,x]=u.useState(!1),[m,b]=u.useState({name:"",email:"",mobile:""}),d=I(),p=u.useCallback(async i=>{r(i),n(!0);try{const $=await q(i);if($.length===0){d.error("Empty File","The uploaded file contains no data rows."),n(!1);return}const T=$.map(v=>({name:v.Name||v.name||"",email:v.Email||v.email||"",mobile:v.Mobile||v.mobile||v.Phone||v.phone||""})).filter(v=>v.name&&v.email);if(T.length===0){d.error("Invalid Format","No valid counselor records found. Ensure columns: Name, Email, Mobile."),n(!1);return}const M=await z.validateCounselors(T);a([...e,...M]),d.success("Counselors Loaded",`${M.length} counselor(s) added successfully.`)}catch{d.error("Parse Error","Failed to parse the uploaded file.")}finally{n(!1)}},[e,a,d]),f=u.useCallback(()=>{r(null)},[]),y=i=>{const $=e.filter(c=>c.email!==i.email);a($),d.success("Counselor Removed","Counselor removed from project assignment.")},j=async()=>{if(!m.name.trim()||!m.email.trim()){d.error("Validation Error","Counselor Name and Email are required.");return}const i=await z.validateCounselors([m]);a([...e,...i]),b({name:"",email:"",mobile:""}),x(!1),d.success("Counselor Added",`${m.name} assigned to project.`)},s=e.filter(i=>i.matchStatus==="matched").length,S=e.filter(i=>i.matchStatus==="new").length,C=[{key:"name",header:"Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"matchStatus",header:"Status",render:i=>t.jsx(Fe,{variant:i.matchStatus==="matched"?"success":"warning",children:i.matchStatus==="matched"?"Matched":"New"})},{key:"actions",header:"Action",render:i=>t.jsx(U,{content:"Remove Counselor",children:t.jsx(X,{type:"button","aria-label":"Remove Counselor",onClick:()=>y(i),children:t.jsx(V,{size:16})})})}];return t.jsxs(R,{children:[t.jsx(L,{children:"Upload a CSV/Excel file or add counselors individually to assign them to this project."}),t.jsx(O,{label:"Counselor List",hint:"CSV with columns: Name, Email, Mobile",onFileSelect:p,onFileRemove:f,selectedFile:h}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px"},children:[t.jsxs(Me,{style:{margin:0},children:[t.jsxs(k,{children:[t.jsx(E,{children:s})," matched"]}),t.jsx(k,{children:"•"}),t.jsxs(k,{children:[t.jsx(E,{children:S})," new counselors"]}),t.jsx(k,{children:"•"}),t.jsxs(k,{children:[t.jsx(E,{children:e.length})," total"]})]}),t.jsx(w,{type:"button",size:"sm",variant:"secondary",leftIcon:t.jsx(H,{size:16}),onClick:()=>x(i=>!i),children:l?"Cancel Manual Add":"Add Counselor Manually"})]}),l&&t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:"12px",alignItems:"end",padding:"16px",backgroundColor:"#F9FAFB",borderRadius:"4px",border:"1px solid #E5E7EB",marginTop:"12px"},children:[t.jsx(F,{label:"Name",placeholder:"e.g. Priya Sundaram",value:m.name,onChange:i=>b({...m,name:i.target.value})}),t.jsx(F,{label:"Email",placeholder:"priya.sundaram@pwc.org",value:m.email,onChange:i=>b({...m,email:i.target.value})}),t.jsx(F,{label:"Mobile",placeholder:"+91 98111 22334",value:m.mobile,onChange:i=>b({...m,mobile:i.target.value})}),t.jsx(w,{type:"button",size:"sm",onClick:j,children:"Add"})]}),e.length>0&&t.jsx(K,{style:{marginTop:"12px"},children:t.jsx(W,{columns:C,data:e,isLoading:g,keyExtractor:i=>i.email||i.name,emptyMessage:"No counselors added yet."})})]})},Ne=()=>{const{students:e,setStudents:a}=P(),[h,r]=u.useState(null),[g,n]=u.useState(!1),l=I(),x=u.useCallback(async p=>{r(p),n(!0);try{const f=await q(p);if(f.length===0){l.error("Empty File","The uploaded file contains no data rows."),n(!1);return}const j=f.map(s=>({name:s.Name||s.name||"",email:s.Email||s.email||"",mobile:s.Mobile||s.mobile||s.Phone||s.phone||"",grade:s.Grade||s.grade||s.Class||s.class||""})).filter(s=>s.name&&s.email);if(j.length===0){l.error("Invalid Format","No valid student records found. Ensure columns: Name, Email, Mobile, Grade."),n(!1);return}a([...e,...j]),l.success("Students Loaded",`${j.length} student(s) added successfully.`)}catch{l.error("Parse Error","Failed to parse the uploaded file.")}finally{n(!1)}},[e,a,l]),m=u.useCallback(()=>{r(null)},[]),b=p=>{const f=e.filter(y=>y.email!==p.email);a(f),l.success("Student Removed","Student removed from project.")},d=[{key:"name",header:"Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade"},{key:"actions",header:"Action",render:p=>t.jsx(U,{content:"Remove Student",children:t.jsx(X,{type:"button","aria-label":"Remove Student",onClick:()=>b(p),children:t.jsx(V,{size:16})})})}];return t.jsxs(R,{children:[t.jsx(L,{children:"Upload a CSV/Excel file to onboard students into this project."}),t.jsx(O,{label:"Student List",hint:"CSV with columns: Name, Email, Mobile, Grade",onFileSelect:x,onFileRemove:m,selectedFile:h}),t.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px"},children:t.jsxs(k,{children:[t.jsx(E,{children:e.length})," students onboarded"]})}),e.length>0&&t.jsx(K,{style:{marginTop:"12px"},children:t.jsx(W,{columns:d,data:e,isLoading:g,keyExtractor:p=>p.email||p.name,emptyMessage:"No students added yet."})})]})},B=[{label:"Institute & Project",description:"Edit details & status",icon:t.jsx(te,{size:16})},{label:"Students",description:"Manage students",icon:t.jsx(ae,{size:16})},{label:"Counselors",description:"Manage counselors",icon:t.jsx(se,{size:16})}],Ae=[{value:"active",label:"Active"},{value:"draft",label:"Draft"},{value:"completed",label:"Completed"}],Be=[{name:"Aarav Sharma",email:"aarav.sharma@gmail.com",mobile:"+91 98765 43210",grade:"Grade 11"},{name:"Ananya Patel",email:"ananya.patel@gmail.com",mobile:"+91 98765 43211",grade:"Grade 11"},{name:"Rohan Gupta",email:"rohan.gupta@gmail.com",mobile:"+91 98765 43212",grade:"Grade 12"},{name:"Diya Nair",email:"diya.nair@gmail.com",mobile:"+91 98765 43213",grade:"Grade 11"},{name:"Vihaan Iyer",email:"vihaan.iyer@gmail.com",mobile:"+91 98765 43214",grade:"Grade 12"}],Ge=[{name:"Priya Sundaram",email:"priya.sundaram@pwc.org",mobile:"+91 98111 22334",matchStatus:"matched"},{name:"Rahul Verma",email:"rahul.verma@pwc.org",mobile:"+91 98222 33445",matchStatus:"matched"},{name:"Sarah Jenkins",email:"sarah.jenkins@pwc.org",mobile:"+91 98333 44556",matchStatus:"matched"}],dt=({isOpen:e,project:a,onClose:h})=>{const r=J(),g=I(),{instituteDetails:n,setInstituteDetails:l,students:x,setStudents:m,counselors:b,setCounselors:d}=P(),[p,f]=u.useState(0),[y,j]=u.useState("active");u.useEffect(()=>{e&&a&&(f(0),j(a.status||"active"),l({name:a.name||"",email:`contact@${(a.instituteName||"institute").toLowerCase().replace(/[^a-z0-9]/g,"")}.edu`,phone:"+91 98765 43210",validFrom:a.validFrom||"",validTo:a.validTo||""}),m(Be),d(Ge))},[e,a,l,m,d]);const s=ne({mutationFn:c=>{if(!a)throw new Error("No project selected");return z.update(a.id,c)},onSuccess:c=>{r.invalidateQueries({queryKey:["projects"]}),g.success("Project Updated",`Successfully updated project "${c.name}" with ${x.length} student(s) and ${b.length} counselor(s).`),h()},onError:()=>{g.error("Update Failed","Could not update project details. Please try again.")}}),S=()=>{if(!n.name.trim()){g.error("Validation Error","Project Name is required.");return}s.mutate({name:n.name,instituteName:n.name,validFrom:n.validFrom,validTo:n.validTo,status:y,studentCount:x.length,counselorCount:b.length})},C=()=>{switch(p){case 0:return t.jsxs(R,{children:[t.jsx(L,{children:"Update primary institute details, project timeline, and current project status."}),t.jsxs(N,{children:[t.jsxs(A,{children:[t.jsx(F,{label:"Project / Institute Name",placeholder:"Enter project name",value:n.name,onChange:c=>l({name:c.target.value}),required:!0}),t.jsx(F,{label:"Contact Email",type:"email",placeholder:"admin@institute.edu",value:n.email,onChange:c=>l({email:c.target.value})}),t.jsx(F,{label:"Contact Phone",type:"tel",placeholder:"+91 98765 43210",value:n.phone,onChange:c=>l({phone:c.target.value})})]}),t.jsxs(A,{children:[t.jsxs(N,{children:[t.jsx(D,{label:"Valid From",selected:n.validFrom?new Date(n.validFrom):null,onChange:c=>l({validFrom:c?c.toISOString():""}),placeholderText:"Select start date"}),t.jsx(D,{label:"Valid To",selected:n.validTo?new Date(n.validTo):null,onChange:c=>l({validTo:c?c.toISOString():""}),placeholderText:"Select end date"})]}),t.jsx("div",{style:{marginTop:"12px"},children:t.jsx(we,{label:"Project Status",options:Ae,value:y,onChange:c=>j(c.target.value)})})]})]})]});case 1:return t.jsx(Ne,{});case 2:return t.jsx(De,{});default:return null}},i=p===B.length-1,$=t.jsxs(Re,{children:[t.jsx(Le,{children:p>0&&t.jsx(w,{variant:"secondary",leftIcon:t.jsx(Y,{size:16}),onClick:()=>f(c=>c-1),children:"Back"})}),t.jsxs(Te,{children:[t.jsx(w,{variant:"ghost",onClick:h,children:"Cancel"}),i?t.jsx(w,{leftIcon:t.jsx(G,{size:16}),onClick:S,isLoading:s.isPending,children:"Save Changes"}):t.jsx(w,{rightIcon:t.jsx(ee,{size:16}),onClick:()=>f(c=>c+1),children:"Next"})]})]});return t.jsxs(oe,{isOpen:e,onClose:h,title:`Edit Project — ${(a==null?void 0:a.name)||"Project Details"}`,subtitle:"Modify institute info, project status, onboarded students, and assigned counselors",size:"xl",footer:$,children:[t.jsx(Pe,{children:t.jsx(Ee,{steps:B,activeStep:p})}),t.jsx(Ie,{children:C()})]})};export{ot as A,dt as E,N as F,et as I,at as M,Je as P,R as S,Pe as W,L as a,A as b,Re as c,Le as d,Te as e,Ee as f,Ie as g,De as h,Ne as i,Ye as j,tt as k,st as l,nt as m,it as n,rt as o,lt as p,ct as q,X as r};
