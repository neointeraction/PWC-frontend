import{g as c,w as L,p as R,aG as F,j as o,B as w,r as D,aH as te,an as ne,ah as re,i as le,aI as ie,c as ae,aJ as ce,E as de,F as ue,o as me,J as pe,K as xe}from"./index-BUalwBCD.js";import{M as V,S as q,B as T,u as he}from"./Modal-D3wpFGKR.js";import{u as B}from"./useMutation-ByNtmxWc.js";import{P as ge,C as fe,T as N}from"./Card-CmSGAiMf.js";import{I as j}from"./Input-D2KrMr1i.js";import{T as K}from"./Table-C9rPBDG_.js";import"./FileUpload.styles-BXzVMnTw.js";import{A as be}from"./AlertModal-Czo7mHO6.js";import{m as Ce}from"./counselors.mock-BLoO_2sZ.js";import{u as G,a as J,C as X,o as Z,e as _,s as v}from"./types-Dc3CQDVS.js";let C=[...Ce];const z={async getAll(e={}){await new Promise(l=>setTimeout(l,200));let n=[...C];if(e.search){const l=e.search.toLowerCase();n=n.filter(u=>u.name.toLowerCase().includes(l)||u.email.toLowerCase().includes(l)||u.counselorId.toLowerCase().includes(l)||u.mobile.includes(l))}e.status&&e.status!=="all"&&(n=n.filter(l=>l.status===e.status));const s=e.page||1,d=e.limit||10,a=n.length,g=Math.ceil(a/d)||1,b=(s-1)*d;return{data:n.slice(b,b+d),total:a,page:s,limit:d,totalPages:g}},async getById(e){await new Promise(s=>setTimeout(s,150));const n=C.find(s=>s.id===e);if(!n)throw new Error("Counselor not found");return n},async create(e){await new Promise(s=>setTimeout(s,300));const n={id:`cns-${Date.now()}`,counselorId:e.counselorId||`C0${C.length+1}`,name:e.name,email:e.email,mobile:e.mobile,pwd:e.pwd||"",status:e.status||"active",createdAt:new Date().toISOString().split("T")[0]};return C.unshift(n),n},async bulkCreate(e){await new Promise(s=>setTimeout(s,400));const n=e.map((s,d)=>({id:`cns-${Date.now()}-${d}`,counselorId:s.counselorId||`C${String(C.length+d+1).padStart(3,"0")}`,name:s.name,email:s.email,mobile:s.mobile,pwd:s.pwd||"",status:s.status||"active",createdAt:new Date().toISOString().split("T")[0]}));return C.unshift(...n),n},async update(e,n){await new Promise(a=>setTimeout(a,250));const s=C.findIndex(a=>a.id===e);if(s===-1)throw new Error("Counselor not found");const d={...C[s],...n};return C[s]=d,d},async delete(e){return await new Promise(n=>setTimeout(n,200)),C=C.filter(n=>n.id!==e),!0}},je=c.div`
  display: flex;
  flex-direction: column;
`,ye=c.div`
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
`,ve=c.div`
  flex: 1;
  max-width: 380px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`,we=c.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Se=c.div`
  width: 180px;
`,$e=c.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ie=c.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,W=c.button`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ke=c.div`
  display: flex;
  flex-direction: column;
`,De=c.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Ae=c.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Y=c.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,Ee=c.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,M=c.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: ${({theme:e})=>e.fontSize.xs};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    font-size: ${({theme:e})=>e.fontSize.base};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
    color: ${({theme:e})=>e.colors.text};
  }
`,Me=c.p`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  margin-bottom: 4px;
`,ze=c.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Fe=c.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Pe=c.div`
  margin-top: ${({theme:e})=>e.spacing.xs};
  max-height: 220px;
  overflow-y: auto;
`,Q=c.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`,Te=Z({counselorId:v().min(1,"Counselor ID is required"),name:v().min(2,"Full name must be at least 2 characters"),email:v().email("Please enter a valid email address"),mobile:v().min(10,"Mobile number must be at least 10 digits"),pwd:v().optional(),status:_(["active","inactive"])}),Le=()=>{var x,f,I,p,h;const e=L(),n=R(),{isAddModalOpen:s,closeAddModal:d}=F(),{register:a,handleSubmit:g,control:b,reset:S,formState:{errors:l}}=G({resolver:J(Te),defaultValues:{counselorId:"",name:"",email:"",mobile:"",pwd:"",status:"active"}}),u=B({mutationFn:z.create,onSuccess:i=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Added",`Successfully registered counselor ${i.name} (${i.counselorId}).`),S(),d()},onError:()=>{n.error("Error","Failed to register new counselor.")}}),$=i=>{u.mutate(i)};return o.jsx(V,{isOpen:s,onClose:d,title:"Add New Counselor",subtitle:"Register a new counselor account into the platform",size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:d,children:"Cancel"}),o.jsx(w,{type:"submit",form:"add-counselor-form",variant:"primary",isLoading:u.isPending,children:"Save Counselor"})]}),children:o.jsxs(Y,{id:"add-counselor-form",onSubmit:g($),children:[o.jsx(j,{label:"Counselor ID",placeholder:"e.g. C014",error:(x=l.counselorId)==null?void 0:x.message,...a("counselorId")}),o.jsx(j,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(f=l.name)==null?void 0:f.message,...a("name")}),o.jsx(j,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(I=l.email)==null?void 0:I.message,...a("email")}),o.jsx(j,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(p=l.mobile)==null?void 0:p.message,...a("mobile")}),o.jsx(j,{label:"Password / PWD (Optional)",type:"password",placeholder:"Leave blank for auto-generated password",error:(h=l.pwd)==null?void 0:h.message,...a("pwd")}),o.jsx(X,{name:"status",control:b,render:({field:i})=>{var k;return o.jsx(q,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:i.value,onChange:i.onChange,error:(k=l.status)==null?void 0:k.message})}})]})})},Re=c.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ve=c.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,Be=c.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  h4 {
    font-size: ${({theme:e})=>e.fontSize.sm};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }

  p {
    font-size: ${({theme:e})=>e.fontSize.xs};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,Ue=c.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spacing.sm};
  padding: ${({theme:e})=>e.spacing.xl};
  border: 2px dashed
    ${({theme:e,$isDragging:n,$hasFile:s})=>n?e.colors.primary:s?e.colors.success:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  background-color: ${({theme:e,$isDragging:n})=>n?e.colors.primaryLight:e.colors.surface};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  text-align: center;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,Ne=c.div`
  font-size: 32px;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`,We=c.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,qe=c.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({theme:e})=>e.spacing.sm};
`,Oe=()=>{const e=L(),n=R(),s=D.useRef(null),{isBulkUploadModalOpen:d,closeBulkUploadModal:a}=F(),[g,b]=D.useState(null),[S,l]=D.useState(!1),[u,$]=D.useState([]),x=B({mutationFn:z.bulkCreate,onSuccess:t=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Bulk Upload Complete",`Successfully imported ${t.length} counselor records.`),f(),a()},onError:()=>{n.error("Error","Failed to bulk upload counselor records.")}}),f=()=>{b(null),$([]),s.current&&(s.current.value="")},I=()=>{const t=`Counsellor ID,PWD,Counsellor Name,Mobile No.,Email ID
C014,,Anil Sharma,9876543210,anil.sharma@example.com
C015,,Sunita Roy,9812345678,sunita.roy@example.com
`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),A=URL.createObjectURL(r),m=document.createElement("a");m.href=A,m.setAttribute("download","counselors_template.csv"),document.body.appendChild(m),m.click(),document.body.removeChild(m)},p=t=>{const r=t.split(`
`).map(m=>m.trim()).filter(m=>m.length>0);if(r.length<=1){n.error("Invalid File","The CSV file appears to be empty or missing headers.");return}const A=[];for(let m=1;m<r.length;m++){const y=r[m].split(",").map(se=>se.trim()),ee=y[0]||`C0${m+13}`,O=y[2]||y[1]||"",oe=y[3]||y[2]||"",U=y[4]||y[3]||"",H=!!(O&&U&&U.includes("@"));A.push({counselorId:ee,name:O||"Unknown Counselor",mobile:oe||"N/A",email:U||"invalid@example.com",status:"active",isValid:H,validationError:H?void 0:"Missing required name or email format"})}$(A)},h=t=>{if(!t.name.endsWith(".csv")&&!t.name.endsWith(".txt")){n.error("Unsupported File","Please upload a CSV or TXT file.");return}b(t);const r=new FileReader;r.onload=A=>{var y;const m=(y=A.target)==null?void 0:y.result;p(m)},r.readAsText(t)},i=t=>{t.preventDefault(),l(!1),t.dataTransfer.files&&t.dataTransfer.files[0]&&h(t.dataTransfer.files[0])},k=()=>{const t=u.filter(r=>r.isValid).map(({isValid:r,validationError:A,...m})=>m);if(t.length===0){n.error("No Valid Rows","Please ensure your CSV contains valid counselor records.");return}x.mutate(t)},P=[{key:"counselorId",header:"ID",width:"90px",render:t=>o.jsx("strong",{children:t.counselorId})},{key:"name",header:"Counselor Name",render:t=>t.name},{key:"mobile",header:"Mobile No.",render:t=>t.mobile},{key:"email",header:"Email ID",render:t=>t.email},{key:"isValid",header:"Validation",width:"110px",render:t=>o.jsxs(T,{variant:t.isValid?"success":"danger",children:[t.isValid?o.jsx(Q,{children:o.jsx(le,{size:14})}):o.jsx(Q,{children:o.jsx(ie,{size:14})}),t.isValid?"Valid":"Invalid"]})}],E=u.filter(t=>t.isValid).length;return o.jsx(V,{isOpen:d,onClose:()=>{f(),a()},title:"Bulk Upload Counselors",subtitle:"Upload a CSV file containing counselor records to import in bulk",size:"lg",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:()=>{f(),a()},children:"Cancel"}),o.jsxs(w,{type:"button",variant:"primary",disabled:u.length===0||E===0,isLoading:x.isPending,onClick:k,children:["Import ",E," Counselor",E!==1?"s":""]})]}),children:o.jsxs(Re,{children:[o.jsxs(Ve,{children:[o.jsxs(Be,{children:[o.jsx("h4",{children:"CSV Template Format"}),o.jsx("p",{children:"Headers required: Counsellor ID, PWD, Counsellor Name, Mobile No., Email ID"})]}),o.jsx(w,{variant:"secondary",size:"sm",leftIcon:o.jsx(te,{size:16}),onClick:I,children:"Download Sample CSV"})]}),o.jsx("input",{type:"file",ref:s,accept:".csv,.txt",style:{display:"none"},onChange:t=>{t.target.files&&t.target.files[0]&&h(t.target.files[0])}}),o.jsxs(Ue,{$isDragging:S,$hasFile:!!g,onDragOver:t=>{t.preventDefault(),l(!0)},onDragLeave:()=>l(!1),onDrop:i,onClick:()=>{var t;return(t=s.current)==null?void 0:t.click()},children:[o.jsx(Ne,{children:o.jsx(ne,{size:32})}),g?o.jsxs(We,{children:[o.jsx(re,{size:18}),g.name," (",(g.size/1024).toFixed(1)," KB)"]}):o.jsxs("div",{children:[o.jsx(Me,{children:"Click to browse or drag & drop CSV file here"}),o.jsx(ze,{children:"Supports CSV format up to 5MB"})]})]}),u.length>0&&o.jsxs("div",{children:[o.jsxs(qe,{children:[o.jsxs(Fe,{children:["Parsed Rows Preview (",u.length," total)"]}),o.jsxs(T,{variant:"info",children:[E," Ready for import"]})]}),o.jsx(Pe,{children:o.jsx(K,{columns:P,data:u,keyExtractor:t=>t.counselorId||t.email})})]})]})})},He=Z({counselorId:v().min(1,"Counselor ID is required"),name:v().min(2,"Full name must be at least 2 characters"),email:v().email("Please enter a valid email address"),mobile:v().min(10,"Mobile number must be at least 10 digits"),pwd:v().optional(),status:_(["active","inactive"])}),Qe=()=>{var x,f,I,p,h;const e=L(),n=R(),{selectedCounselorForEdit:s,closeEditModal:d}=F(),{register:a,handleSubmit:g,control:b,reset:S,formState:{errors:l}}=G({resolver:J(He)});D.useEffect(()=>{s&&S({counselorId:s.counselorId,name:s.name,email:s.email,mobile:s.mobile,pwd:s.pwd||"",status:s.status})},[s,S]);const u=B({mutationFn:i=>z.update(s.id,i),onSuccess:i=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Updated",`Successfully updated profile for ${i.name}.`),d()},onError:()=>{n.error("Error","Failed to update counselor profile.")}}),$=i=>{s&&u.mutate(i)};return o.jsx(V,{isOpen:!!s,onClose:d,title:"Edit Counselor Profile",subtitle:`Update profile and contact details for ${(s==null?void 0:s.name)||""}`,size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:d,children:"Cancel"}),o.jsx(w,{type:"submit",form:"edit-counselor-form",variant:"primary",isLoading:u.isPending,children:"Save Changes"})]}),children:o.jsxs(Y,{id:"edit-counselor-form",onSubmit:g($),children:[o.jsx(j,{label:"Counselor ID",placeholder:"e.g. C001",error:(x=l.counselorId)==null?void 0:x.message,...a("counselorId")}),o.jsx(j,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(f=l.name)==null?void 0:f.message,...a("name")}),o.jsx(j,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(I=l.email)==null?void 0:I.message,...a("email")}),o.jsx(j,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(p=l.mobile)==null?void 0:p.message,...a("mobile")}),o.jsx(j,{label:"Password / PWD",type:"password",placeholder:"Enter new password to update",error:(h=l.pwd)==null?void 0:h.message,...a("pwd")}),o.jsx(X,{name:"status",control:b,render:({field:i})=>{var k;return o.jsx(q,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:i.value,onChange:i.onChange,error:(k=l.status)==null?void 0:k.message})}})]})})},Ke=()=>{const{selectedCounselorForView:e,closeViewModal:n}=F();return e?o.jsx(V,{isOpen:!!e,onClose:n,title:"Counselor Details",subtitle:`Viewing account record for ${e.name}`,size:"md",footer:o.jsx(w,{variant:"secondary",onClick:n,children:"Close"}),children:o.jsxs(Ee,{children:[o.jsxs(M,{children:[o.jsx("label",{children:"Counselor ID"}),o.jsx("p",{children:e.counselorId})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Counselor Name"}),o.jsx("p",{children:e.name})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Email Address"}),o.jsx("p",{children:e.email})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Mobile Number"}),o.jsx("p",{children:e.mobile})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Account Status"}),o.jsx("div",{children:o.jsx(T,{variant:e.status==="active"?"success":"default",dot:!0,children:e.status.toUpperCase()})})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Registered Date"}),o.jsx("p",{children:e.createdAt||"N/A"})]})]})}):null},no=()=>{const e=L(),n=R(),{searchQuery:s,setSearchQuery:d,statusFilter:a,setStatusFilter:g,openAddModal:b,openBulkUploadModal:S,openEditModal:l,openViewModal:u}=F(),[$,x]=D.useState(1),[f,I]=D.useState(10),[p,h]=D.useState(null),{data:i,isLoading:k}=he({queryKey:["counselors",s,a,$,f],queryFn:()=>z.getAll({search:s,status:a,page:$,limit:f})}),P=B({mutationFn:z.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Deleted","Successfully removed counselor record."),h(null)},onError:()=>{n.error("Error","Failed to delete counselor record."),h(null)}}),E=()=>{p&&P.mutate(p.id)},t=[{key:"counselorId",header:"Counsellor ID",width:"120px",render:r=>o.jsx("strong",{children:r.counselorId})},{key:"name",header:"Counsellor Name & Email",render:r=>o.jsxs(ke,{children:[o.jsx(De,{children:r.name}),o.jsx(Ae,{children:r.email})]})},{key:"mobile",header:"Mobile No.",width:"150px",render:r=>r.mobile||"N/A"},{key:"status",header:"Status",width:"110px",render:r=>o.jsx(T,{variant:r.status==="active"?"success":"default",dot:!0,children:r.status.charAt(0).toUpperCase()+r.status.slice(1)})},{key:"actions",header:"Actions",width:"120px",render:r=>o.jsxs(Ie,{children:[o.jsx(N,{content:"View Details",children:o.jsx(W,{"aria-label":"View Details",onClick:()=>u(r),children:o.jsx(me,{size:16})})}),o.jsx(N,{content:"Edit Counselor",children:o.jsx(W,{"aria-label":"Edit Counselor",onClick:()=>l(r),children:o.jsx(pe,{size:16})})}),o.jsx(N,{content:"Delete Counselor",children:o.jsx(W,{"aria-label":"Delete Counselor",onClick:()=>h(r),children:o.jsx(xe,{size:16})})})]})}];return o.jsxs(je,{children:[o.jsx(ge,{title:"Counselors List",subtitle:"Manage institution career counselors, single registration, and bulk CSV imports",breadcrumbs:[{label:"Dashboard",href:ae.DASHBOARD},{label:"Counselors List"}],actions:o.jsxs($e,{children:[o.jsx(w,{variant:"secondary",leftIcon:o.jsx(ce,{size:16}),onClick:S,children:"Bulk Upload"}),o.jsx(w,{variant:"primary",leftIcon:o.jsx(de,{size:16}),onClick:b,children:"Add Counselor"})]})}),o.jsxs(fe,{children:[o.jsxs(ye,{children:[o.jsx(ve,{children:o.jsx(j,{placeholder:"Search by ID, name, email, or mobile...",leftIcon:o.jsx(ue,{size:16}),value:s,onChange:r=>{d(r.target.value),x(1)}})}),o.jsx(we,{children:o.jsx(Se,{children:o.jsx(q,{options:[{value:"all",label:"All Statuses"},{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:a,onChange:r=>{g(r.target.value),x(1)}})})})]}),o.jsx(K,{columns:t,data:(i==null?void 0:i.data)??[],isLoading:k,keyExtractor:r=>r.id,pagination:i?{page:i.page,totalPages:i.totalPages,total:i.total,limit:i.limit,onPageChange:r=>x(r),onLimitChange:r=>{I(r),x(1)}}:void 0})]}),o.jsx(Le,{}),o.jsx(Oe,{}),o.jsx(Qe,{}),o.jsx(Ke,{}),o.jsx(be,{isOpen:!!p,onClose:()=>h(null),onConfirm:E,title:"Delete Counselor Record",description:`Are you sure you want to delete ${p==null?void 0:p.name} (${p==null?void 0:p.counselorId})? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:P.isPending})]})};export{no as CounselorsListPage};
