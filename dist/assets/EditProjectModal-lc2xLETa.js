import{j as t,h as B,g as s,as as z,r as p,e as I,M as W,B as $,l as K,w as O,i as Z,at as H,au as X,I as Y,aD as ee}from"./index-Bw790BVp.js";import{u as te}from"./useMutation-DzanZul2.js";import{M as ae}from"./Modal-BrT8bxZc.js";import{c as se,d as ne,e as oe,f as ie,g as le,h as re,i as ce}from"./FileUpload.styles-CwDfPGaU.js";import{I as w}from"./Input-BPi4Svcd.js";import{S as de}from"./Select-DGOp38p5.js";import{D as L}from"./DatePicker-BtgIvKfs.js";import{p as P}from"./project.service-RU6EL_sY.js";import{p as V,F as q}from"./FileUpload-hTfxPfiK.js";import{T as U}from"./Table--rB9Za6j.js";import{T as Q}from"./Tooltip-DVjunIWN.js";import{B as me}from"./Badge-XwSei9t-.js";const ue=({steps:e,activeStep:a})=>{const f=c=>c<a?"completed":c===a?"active":"upcoming";return t.jsx(se,{children:e.map((c,h)=>{const o=f(h),r=h===e.length-1;return t.jsxs(ne,{children:[t.jsx(oe,{$state:o,children:o==="completed"?t.jsx(B,{size:16}):c.icon||h+1}),t.jsxs(ie,{children:[t.jsx(le,{$active:o==="active"||o==="completed",children:c.label}),c.description&&t.jsx(re,{children:c.description})]}),!r&&t.jsx(ce,{$completed:h<a})]},c.label)})})},Le=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ae=s.div`
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
`,De=s.div`
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  ${({$active:e,theme:a})=>e&&`
    box-shadow: 0 0 0 2px ${a.colors.primary};
  `}
`,Ge=s.div`
  font-size: ${({theme:e})=>e.fontSize.display};
  font-weight: 700;
  color: ${({theme:e,$variant:a})=>a==="success"?"#16A34A":a==="warning"?"#D97706":e.colors.text};
  margin-top: 4px;
`,Be=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-top: 4px;
`,We=s.div`
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
`,Ve=s.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`,qe=s.div`
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
`,_=s.button`
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
`,Ue=s.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Qe=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,_e=s.button`
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
`,Je=s.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;s.span`
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`;const pe=s.div`
  margin: -${({theme:e})=>e.spacing.xl};
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,he=s.div`
  min-height: 280px;
`,ge=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,xe=s.div`
  display: flex;
  align-items: center;
`,fe=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,R=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`;s.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`;const T=s.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
`,J=s.div`
  margin-top: ${({theme:e})=>e.spacing.lg};
`,be=s.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,C=s.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,F=s.span`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
`;s.div`
  max-width: 480px;
`;const A=s.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,D=s.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,ve=()=>{const{students:e,setStudents:a}=z(),[f,c]=p.useState(null),[h,o]=p.useState(!1),r=I(),y=p.useCallback(async d=>{c(d),o(!0);try{const x=await V(d);if(x.length===0){r.error("Empty File","The uploaded file contains no data rows."),o(!1);return}const v=x.map(l=>({name:l.Name||l.name||"",email:l.Email||l.email||"",mobile:l.Mobile||l.mobile||l.Phone||l.phone||"",grade:l.Grade||l.grade||l.Class||l.class||""})).filter(l=>l.name&&l.email);if(v.length===0){r.error("Invalid Format","No valid student records found. Ensure columns: Name, Email, Mobile, Grade."),o(!1);return}a([...e,...v]),r.success("Students Loaded",`${v.length} student(s) added successfully.`)}catch{r.error("Parse Error","Failed to parse the uploaded file.")}finally{o(!1)}},[e,a,r]),m=p.useCallback(()=>{c(null)},[]),b=d=>{const x=e.filter(j=>j.email!==d.email);a(x),r.success("Student Removed","Student removed from project.")},u=[{key:"name",header:"Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"grade",header:"Grade"},{key:"actions",header:"Action",render:d=>t.jsx(Q,{content:"Remove Student",children:t.jsx(_,{type:"button","aria-label":"Remove Student",onClick:()=>b(d),children:t.jsx(W,{size:16})})})}];return t.jsxs(R,{children:[t.jsx(T,{children:"Upload a CSV/Excel file to onboard students into this project."}),t.jsx(q,{label:"Student List",hint:"CSV with columns: Name, Email, Mobile, Grade",onFileSelect:y,onFileRemove:m,selectedFile:f}),t.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px"},children:t.jsxs(C,{children:[t.jsx(F,{children:e.length})," students onboarded"]})}),e.length>0&&t.jsx(J,{style:{marginTop:"12px"},children:t.jsx(U,{columns:u,data:e,isLoading:h,keyExtractor:d=>d.email||d.name,emptyMessage:"No students added yet."})})]})},ye=()=>{const{counselors:e,setCounselors:a}=z(),[f,c]=p.useState(null),[h,o]=p.useState(!1),[r,y]=p.useState(!1),[m,b]=p.useState({name:"",email:"",mobile:""}),u=I(),d=p.useCallback(async n=>{c(n),o(!0);try{const S=await V(n);if(S.length===0){u.error("Empty File","The uploaded file contains no data rows."),o(!1);return}const M=S.map(g=>({name:g.Name||g.name||"",email:g.Email||g.email||"",mobile:g.Mobile||g.mobile||g.Phone||g.phone||""})).filter(g=>g.name&&g.email);if(M.length===0){u.error("Invalid Format","No valid counselor records found. Ensure columns: Name, Email, Mobile."),o(!1);return}const N=await P.validateCounselors(M);a([...e,...N]),u.success("Counselors Loaded",`${N.length} counselor(s) added successfully.`)}catch{u.error("Parse Error","Failed to parse the uploaded file.")}finally{o(!1)}},[e,a,u]),x=p.useCallback(()=>{c(null)},[]),j=n=>{const S=e.filter(i=>i.email!==n.email);a(S),u.success("Counselor Removed","Counselor removed from project assignment.")},v=async()=>{if(!m.name.trim()||!m.email.trim()){u.error("Validation Error","Counselor Name and Email are required.");return}const n=await P.validateCounselors([m]);a([...e,...n]),b({name:"",email:"",mobile:""}),y(!1),u.success("Counselor Added",`${m.name} assigned to project.`)},l=e.filter(n=>n.matchStatus==="matched").length,k=e.filter(n=>n.matchStatus==="new").length,E=[{key:"name",header:"Name"},{key:"email",header:"Email"},{key:"mobile",header:"Mobile"},{key:"matchStatus",header:"Status",render:n=>t.jsx(me,{variant:n.matchStatus==="matched"?"success":"warning",children:n.matchStatus==="matched"?"Matched":"New"})},{key:"actions",header:"Action",render:n=>t.jsx(Q,{content:"Remove Counselor",children:t.jsx(_,{type:"button","aria-label":"Remove Counselor",onClick:()=>j(n),children:t.jsx(W,{size:16})})})}];return t.jsxs(R,{children:[t.jsx(T,{children:"Upload a CSV/Excel file or add counselors individually to assign them to this project."}),t.jsx(q,{label:"Counselor List",hint:"CSV with columns: Name, Email, Mobile",onFileSelect:d,onFileRemove:x,selectedFile:f}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px"},children:[t.jsxs(be,{style:{margin:0},children:[t.jsxs(C,{children:[t.jsx(F,{children:l})," matched"]}),t.jsx(C,{children:"•"}),t.jsxs(C,{children:[t.jsx(F,{children:k})," new counselors"]}),t.jsx(C,{children:"•"}),t.jsxs(C,{children:[t.jsx(F,{children:e.length})," total"]})]}),t.jsx($,{type:"button",size:"sm",variant:"secondary",leftIcon:t.jsx(K,{size:16}),onClick:()=>y(n=>!n),children:r?"Cancel Manual Add":"Add Counselor Manually"})]}),r&&t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:"12px",alignItems:"end",padding:"16px",backgroundColor:"#F9FAFB",borderRadius:"4px",border:"1px solid #E5E7EB",marginTop:"12px"},children:[t.jsx(w,{label:"Name",placeholder:"e.g. Priya Sundaram",value:m.name,onChange:n=>b({...m,name:n.target.value})}),t.jsx(w,{label:"Email",placeholder:"priya.sundaram@pwc.org",value:m.email,onChange:n=>b({...m,email:n.target.value})}),t.jsx(w,{label:"Mobile",placeholder:"+91 98111 22334",value:m.mobile,onChange:n=>b({...m,mobile:n.target.value})}),t.jsx($,{type:"button",size:"sm",onClick:v,children:"Add"})]}),e.length>0&&t.jsx(J,{style:{marginTop:"12px"},children:t.jsx(U,{columns:E,data:e,isLoading:h,keyExtractor:n=>n.email||n.name,emptyMessage:"No counselors added yet."})})]})},G=[{label:"Institute & Project",description:"Edit details & status",icon:t.jsx(X,{size:16})},{label:"Students",description:"Manage students",icon:t.jsx(Y,{size:16})},{label:"Counselors",description:"Manage counselors",icon:t.jsx(ee,{size:16})}],je=[{value:"active",label:"Active"},{value:"draft",label:"Draft"},{value:"completed",label:"Completed"}],Se=[{name:"Aarav Sharma",email:"aarav.sharma@gmail.com",mobile:"+91 98765 43210",grade:"Grade 11"},{name:"Ananya Patel",email:"ananya.patel@gmail.com",mobile:"+91 98765 43211",grade:"Grade 11"},{name:"Rohan Gupta",email:"rohan.gupta@gmail.com",mobile:"+91 98765 43212",grade:"Grade 12"},{name:"Diya Nair",email:"diya.nair@gmail.com",mobile:"+91 98765 43213",grade:"Grade 11"},{name:"Vihaan Iyer",email:"vihaan.iyer@gmail.com",mobile:"+91 98765 43214",grade:"Grade 12"}],Ce=[{name:"Priya Sundaram",email:"priya.sundaram@pwc.org",mobile:"+91 98111 22334",matchStatus:"matched"},{name:"Rahul Verma",email:"rahul.verma@pwc.org",mobile:"+91 98222 33445",matchStatus:"matched"},{name:"Sarah Jenkins",email:"sarah.jenkins@pwc.org",mobile:"+91 98333 44556",matchStatus:"matched"}],Ke=({isOpen:e,project:a,onClose:f})=>{const c=O(),h=I(),{instituteDetails:o,setInstituteDetails:r,students:y,setStudents:m,counselors:b,setCounselors:u}=z(),[d,x]=p.useState(0),[j,v]=p.useState("active");p.useEffect(()=>{e&&a&&(x(0),v(a.status||"active"),r({name:a.name||"",email:`contact@${(a.instituteName||"institute").toLowerCase().replace(/[^a-z0-9]/g,"")}.edu`,phone:"+91 98765 43210",validFrom:a.validFrom||"",validTo:a.validTo||""}),m(Se),u(Ce))},[e,a,r,m,u]);const l=te({mutationFn:i=>{if(!a)throw new Error("No project selected");return P.update(a.id,i)},onSuccess:i=>{c.invalidateQueries({queryKey:["projects"]}),h.success("Project Updated",`Successfully updated project "${i.name}" with ${y.length} student(s) and ${b.length} counselor(s).`),f()},onError:()=>{h.error("Update Failed","Could not update project details. Please try again.")}}),k=()=>{if(!o.name.trim()){h.error("Validation Error","Project Name is required.");return}l.mutate({name:o.name,instituteName:o.name,validFrom:o.validFrom,validTo:o.validTo,status:j,studentCount:y.length,counselorCount:b.length})},E=()=>{switch(d){case 0:return t.jsxs(R,{children:[t.jsx(T,{children:"Update primary institute details, project timeline, and current project status."}),t.jsxs(A,{children:[t.jsxs(D,{children:[t.jsx(w,{label:"Project / Institute Name",placeholder:"Enter project name",value:o.name,onChange:i=>r({name:i.target.value}),required:!0}),t.jsx(w,{label:"Contact Email",type:"email",placeholder:"admin@institute.edu",value:o.email,onChange:i=>r({email:i.target.value})}),t.jsx(w,{label:"Contact Phone",type:"tel",placeholder:"+91 98765 43210",value:o.phone,onChange:i=>r({phone:i.target.value})})]}),t.jsxs(D,{children:[t.jsxs(A,{children:[t.jsx(L,{label:"Valid From",selected:o.validFrom?new Date(o.validFrom):null,onChange:i=>r({validFrom:i?i.toISOString():""}),placeholderText:"Select start date"}),t.jsx(L,{label:"Valid To",selected:o.validTo?new Date(o.validTo):null,onChange:i=>r({validTo:i?i.toISOString():""}),placeholderText:"Select end date"})]}),t.jsx("div",{style:{marginTop:"12px"},children:t.jsx(de,{label:"Project Status",options:je,value:j,onChange:i=>v(i.target.value)})})]})]})]});case 1:return t.jsx(ve,{});case 2:return t.jsx(ye,{});default:return null}},n=d===G.length-1,S=t.jsxs(ge,{children:[t.jsx(xe,{children:d>0&&t.jsx($,{variant:"secondary",leftIcon:t.jsx(Z,{size:16}),onClick:()=>x(i=>i-1),children:"Back"})}),t.jsxs(fe,{children:[t.jsx($,{variant:"ghost",onClick:f,children:"Cancel"}),n?t.jsx($,{leftIcon:t.jsx(B,{size:16}),onClick:k,isLoading:l.isPending,children:"Save Changes"}):t.jsx($,{rightIcon:t.jsx(H,{size:16}),onClick:()=>x(i=>i+1),children:"Next"})]})]});return t.jsxs(ae,{isOpen:e,onClose:f,title:`Edit Project — ${(a==null?void 0:a.name)||"Project Details"}`,subtitle:"Modify institute info, project status, onboarded students, and assigned counselors",size:"xl",footer:S,children:[t.jsx(pe,{children:t.jsx(ue,{steps:G,activeStep:d})}),t.jsx(he,{children:E()})]})};export{qe as A,Ke as E,A as F,De as I,Be as M,Le as P,R as S,pe as W,T as a,D as b,ge as c,xe as d,fe as e,ue as f,he as g,ve as h,Ae as i,Ge as j,We as k,Ve as l,Ue as m,Qe as n,_e as o,Je as p,_ as q};
