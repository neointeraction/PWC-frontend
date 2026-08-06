import{g as a,y as T,d as R,aJ as P,j as o,B as k,r as L,aK as te,au as ne,al as re,n as ie,aL as le,c as ae,aM as ce,G as de,H as ue,D as me,O as pe,P as ge}from"./index-BlnJ6RPY.js";import{u as xe}from"./useQuery-Bpj6tJZw.js";import{u as V}from"./useMutation-C6ij4NK7.js";import{P as he,T as U}from"./PageHeader-DnomRfRw.js";import{C as fe}from"./Card-_jdrMGWy.js";import{I as f}from"./Input-DT7CGDc-.js";import{S as q}from"./Modal.styles-B_QFbYeL.js";import{M as B,B as F,T as G}from"./Modal-wN5hG3EV.js";import"./FileUpload.styles-BOuNYGcK.js";import{A as be}from"./AlertModal-DjYgwY0v.js";import{m as je}from"./counselors.mock---5XGzUI.js";import{u as K,a as Z,C as _,o as J,e as X,s as C}from"./types-CK4gxUNR.js";let v=[...je];const E={async getAll(e={}){await new Promise(i=>setTimeout(i,200));let n=[...v];if(e.search){const i=e.search.toLowerCase();n=n.filter(u=>u.name.toLowerCase().includes(i)||u.email.toLowerCase().includes(i)||u.counselorId.toLowerCase().includes(i)||u.mobile.includes(i))}e.status&&e.status!=="all"&&(n=n.filter(i=>i.status===e.status));const s=e.page||1,c=e.limit||10,l=n.length,b=Math.ceil(l/c)||1,y=(s-1)*c;return{data:n.slice(y,y+c),total:l,page:s,limit:c,totalPages:b}},async getById(e){await new Promise(s=>setTimeout(s,150));const n=v.find(s=>s.id===e);if(!n)throw new Error("Counselor not found");return n},async create(e){await new Promise(s=>setTimeout(s,300));const n={id:`cns-${Date.now()}`,counselorId:e.counselorId||`C0${v.length+1}`,name:e.name,email:e.email,mobile:e.mobile,pwd:e.pwd||"",status:e.status||"active",createdAt:new Date().toISOString().split("T")[0]};return v.unshift(n),n},async bulkCreate(e){await new Promise(s=>setTimeout(s,400));const n=e.map((s,c)=>({id:`cns-${Date.now()}-${c}`,counselorId:s.counselorId||`C${String(v.length+c+1).padStart(3,"0")}`,name:s.name,email:s.email,mobile:s.mobile,pwd:s.pwd||"",status:s.status||"active",createdAt:new Date().toISOString().split("T")[0]}));return v.unshift(...n),n},async update(e,n){await new Promise(l=>setTimeout(l,250));const s=v.findIndex(l=>l.id===e);if(s===-1)throw new Error("Counselor not found");const c={...v[s],...n};return v[s]=c,c},async delete(e){return await new Promise(n=>setTimeout(n,200)),v=v.filter(n=>n.id!==e),!0}},Ce=a.div`
  display: flex;
  flex-direction: column;
`,ye=a.div`
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
`,ve=a.div`
  flex: 1;
  max-width: 380px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`,we=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Se=a.div`
  width: 180px;
`,ke=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,$e=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,W=a.button`
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
`,Ie=a.div`
  display: flex;
  flex-direction: column;
`,De=a.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Le=a.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Y=a.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,Me=a.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,A=a.div`
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
`,Ae=a.p`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  margin-bottom: 4px;
`,ze=a.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Ee=a.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Pe=a.div`
  margin-top: ${({theme:e})=>e.spacing.xs};
  max-height: 220px;
  overflow-y: auto;
`,Q=a.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`,Fe=J({counselorId:C().min(1,"Counselor ID is required"),name:C().min(2,"Full name must be at least 2 characters"),email:C().email("Please enter a valid email address"),mobile:C().min(10,"Mobile number must be at least 10 digits"),meetingLink:C().optional(),pwd:C().optional(),status:X(["active","inactive"])}),Te=()=>{var x,j,D,p,h,g;const e=T(),n=R(),{isAddModalOpen:s,closeAddModal:c}=P(),{register:l,handleSubmit:b,control:y,reset:$,formState:{errors:i}}=K({resolver:Z(Fe),defaultValues:{counselorId:"",name:"",email:"",mobile:"",meetingLink:"",pwd:"",status:"active"}}),u=V({mutationFn:E.create,onSuccess:d=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Added",`Successfully registered counselor ${d.name} (${d.counselorId}).`),$(),c()},onError:()=>{n.error("Error","Failed to register new counselor.")}}),I=d=>{u.mutate(d)};return o.jsx(B,{isOpen:s,onClose:c,title:"Add New Counselor",subtitle:"Register a new counselor account into the platform",size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx(k,{type:"button",variant:"secondary",onClick:c,children:"Cancel"}),o.jsx(k,{type:"submit",form:"add-counselor-form",variant:"primary",isLoading:u.isPending,children:"Save Counselor"})]}),children:o.jsxs(Y,{id:"add-counselor-form",onSubmit:b(I),children:[o.jsx(f,{label:"Counselor ID",placeholder:"e.g. C014",error:(x=i.counselorId)==null?void 0:x.message,...l("counselorId")}),o.jsx(f,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(j=i.name)==null?void 0:j.message,...l("name")}),o.jsx(f,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(D=i.email)==null?void 0:D.message,...l("email")}),o.jsx(f,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(p=i.mobile)==null?void 0:p.message,...l("mobile")}),o.jsx(f,{label:"GMeet / Zoom Link",placeholder:"e.g. https://meet.google.com/abc-defg-hij",error:(h=i.meetingLink)==null?void 0:h.message,...l("meetingLink")}),o.jsx(f,{label:"Password / PWD (Optional)",type:"password",placeholder:"Leave blank for auto-generated password",error:(g=i.pwd)==null?void 0:g.message,...l("pwd")}),o.jsx(_,{name:"status",control:y,render:({field:d})=>{var w;return o.jsx(q,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:d.value,onChange:d.onChange,error:(w=i.status)==null?void 0:w.message})}})]})})},Re=a.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ve=a.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,Be=a.div`
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
`,Ne=a.div`
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
`,Ue=a.div`
  font-size: 32px;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`,We=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,qe=a.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({theme:e})=>e.spacing.sm};
`,Oe=()=>{const e=T(),n=R(),s=L.useRef(null),{isBulkUploadModalOpen:c,closeBulkUploadModal:l}=P(),[b,y]=L.useState(null),[$,i]=L.useState(!1),[u,I]=L.useState([]),x=V({mutationFn:E.bulkCreate,onSuccess:t=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Bulk Upload Complete",`Successfully imported ${t.length} counselor records.`),j(),l()},onError:()=>{n.error("Error","Failed to bulk upload counselor records.")}}),j=()=>{y(null),I([]),s.current&&(s.current.value="")},D=()=>{const t=`Counsellor ID,PWD,Counsellor Name,Mobile No.,Email ID
C014,,Anil Sharma,9876543210,anil.sharma@example.com
C015,,Sunita Roy,9812345678,sunita.roy@example.com
`,r=new Blob([t],{type:"text/csv;charset=utf-8;"}),M=URL.createObjectURL(r),m=document.createElement("a");m.href=M,m.setAttribute("download","counselors_template.csv"),document.body.appendChild(m),m.click(),document.body.removeChild(m)},p=t=>{const r=t.split(`
`).map(m=>m.trim()).filter(m=>m.length>0);if(r.length<=1){n.error("Invalid File","The CSV file appears to be empty or missing headers.");return}const M=[];for(let m=1;m<r.length;m++){const S=r[m].split(",").map(se=>se.trim()),ee=S[0]||`C0${m+13}`,O=S[2]||S[1]||"",oe=S[3]||S[2]||"",N=S[4]||S[3]||"",H=!!(O&&N&&N.includes("@"));M.push({counselorId:ee,name:O||"Unknown Counselor",mobile:oe||"N/A",email:N||"invalid@example.com",status:"active",isValid:H,validationError:H?void 0:"Missing required name or email format"})}I(M)},h=t=>{if(!t.name.endsWith(".csv")&&!t.name.endsWith(".txt")){n.error("Unsupported File","Please upload a CSV or TXT file.");return}y(t);const r=new FileReader;r.onload=M=>{var S;const m=(S=M.target)==null?void 0:S.result;p(m)},r.readAsText(t)},g=t=>{t.preventDefault(),i(!1),t.dataTransfer.files&&t.dataTransfer.files[0]&&h(t.dataTransfer.files[0])},d=()=>{const t=u.filter(r=>r.isValid).map(({isValid:r,validationError:M,...m})=>m);if(t.length===0){n.error("No Valid Rows","Please ensure your CSV contains valid counselor records.");return}x.mutate(t)},w=[{key:"counselorId",header:"ID",width:"90px",render:t=>o.jsx("strong",{children:t.counselorId})},{key:"name",header:"Counselor Name",render:t=>t.name},{key:"mobile",header:"Mobile No.",render:t=>t.mobile},{key:"email",header:"Email ID",render:t=>t.email},{key:"isValid",header:"Validation",width:"110px",render:t=>o.jsxs(F,{variant:t.isValid?"success":"danger",children:[t.isValid?o.jsx(Q,{children:o.jsx(ie,{size:14})}):o.jsx(Q,{children:o.jsx(le,{size:14})}),t.isValid?"Valid":"Invalid"]})}],z=u.filter(t=>t.isValid).length;return o.jsx(B,{isOpen:c,onClose:()=>{j(),l()},title:"Bulk Upload Counselors",subtitle:"Upload a CSV file containing counselor records to import in bulk",size:"lg",footer:o.jsxs(o.Fragment,{children:[o.jsx(k,{type:"button",variant:"secondary",onClick:()=>{j(),l()},children:"Cancel"}),o.jsxs(k,{type:"button",variant:"primary",disabled:u.length===0||z===0,isLoading:x.isPending,onClick:d,children:["Import ",z," Counselor",z!==1?"s":""]})]}),children:o.jsxs(Re,{children:[o.jsxs(Ve,{children:[o.jsxs(Be,{children:[o.jsx("h4",{children:"CSV Template Format"}),o.jsx("p",{children:"Headers required: Counsellor ID, PWD, Counsellor Name, Mobile No., Email ID"})]}),o.jsx(k,{variant:"secondary",size:"sm",leftIcon:o.jsx(te,{size:16}),onClick:D,children:"Download Sample CSV"})]}),o.jsx("input",{type:"file",ref:s,accept:".csv,.txt",style:{display:"none"},onChange:t=>{t.target.files&&t.target.files[0]&&h(t.target.files[0])}}),o.jsxs(Ne,{$isDragging:$,$hasFile:!!b,onDragOver:t=>{t.preventDefault(),i(!0)},onDragLeave:()=>i(!1),onDrop:g,onClick:()=>{var t;return(t=s.current)==null?void 0:t.click()},children:[o.jsx(Ue,{children:o.jsx(ne,{size:32})}),b?o.jsxs(We,{children:[o.jsx(re,{size:18}),b.name," (",(b.size/1024).toFixed(1)," KB)"]}):o.jsxs("div",{children:[o.jsx(Ae,{children:"Click to browse or drag & drop CSV file here"}),o.jsx(ze,{children:"Supports CSV format up to 5MB"})]})]}),u.length>0&&o.jsxs("div",{children:[o.jsxs(qe,{children:[o.jsxs(Ee,{children:["Parsed Rows Preview (",u.length," total)"]}),o.jsxs(F,{variant:"info",children:[z," Ready for import"]})]}),o.jsx(Pe,{children:o.jsx(G,{columns:w,data:u,keyExtractor:t=>t.counselorId||t.email})})]})]})})},He=J({counselorId:C().min(1,"Counselor ID is required"),name:C().min(2,"Full name must be at least 2 characters"),email:C().email("Please enter a valid email address"),mobile:C().min(10,"Mobile number must be at least 10 digits"),meetingLink:C().optional(),pwd:C().optional(),status:X(["active","inactive"])}),Qe=()=>{var x,j,D,p,h,g;const e=T(),n=R(),{selectedCounselorForEdit:s,closeEditModal:c}=P(),{register:l,handleSubmit:b,control:y,reset:$,formState:{errors:i}}=K({resolver:Z(He)});L.useEffect(()=>{s&&$({counselorId:s.counselorId,name:s.name,email:s.email,mobile:s.mobile,meetingLink:s.meetingLink||"",pwd:s.pwd||"",status:s.status})},[s,$]);const u=V({mutationFn:d=>E.update(s.id,d),onSuccess:d=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Updated",`Successfully updated profile for ${d.name}.`),c()},onError:()=>{n.error("Error","Failed to update counselor profile.")}}),I=d=>{s&&u.mutate(d)};return o.jsx(B,{isOpen:!!s,onClose:c,title:"Edit Counselor Profile",subtitle:`Update profile and contact details for ${(s==null?void 0:s.name)||""}`,size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx(k,{type:"button",variant:"secondary",onClick:c,children:"Cancel"}),o.jsx(k,{type:"submit",form:"edit-counselor-form",variant:"primary",isLoading:u.isPending,children:"Save Changes"})]}),children:o.jsxs(Y,{id:"edit-counselor-form",onSubmit:b(I),children:[o.jsx(f,{label:"Counselor ID",placeholder:"e.g. C001",error:(x=i.counselorId)==null?void 0:x.message,...l("counselorId")}),o.jsx(f,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(j=i.name)==null?void 0:j.message,...l("name")}),o.jsx(f,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(D=i.email)==null?void 0:D.message,...l("email")}),o.jsx(f,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(p=i.mobile)==null?void 0:p.message,...l("mobile")}),o.jsx(f,{label:"GMeet / Zoom Link",placeholder:"e.g. https://meet.google.com/abc-defg-hij",error:(h=i.meetingLink)==null?void 0:h.message,...l("meetingLink")}),o.jsx(f,{label:"Password / PWD",type:"password",placeholder:"Enter new password to update",error:(g=i.pwd)==null?void 0:g.message,...l("pwd")}),o.jsx(_,{name:"status",control:y,render:({field:d})=>{var w;return o.jsx(q,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:d.value,onChange:d.onChange,error:(w=i.status)==null?void 0:w.message})}})]})})},Ge=()=>{const{selectedCounselorForView:e,closeViewModal:n}=P();return e?o.jsx(B,{isOpen:!!e,onClose:n,title:"Counselor Details",subtitle:`Viewing account record for ${e.name}`,size:"md",footer:o.jsx(k,{variant:"secondary",onClick:n,children:"Close"}),children:o.jsxs(Me,{children:[o.jsxs(A,{children:[o.jsx("label",{children:"Counselor ID"}),o.jsx("p",{children:e.counselorId})]}),o.jsxs(A,{children:[o.jsx("label",{children:"Counselor Name"}),o.jsx("p",{children:e.name})]}),o.jsxs(A,{children:[o.jsx("label",{children:"Email Address"}),o.jsx("p",{children:e.email})]}),o.jsxs(A,{children:[o.jsx("label",{children:"Mobile Number"}),o.jsx("p",{children:e.mobile})]}),o.jsxs(A,{children:[o.jsx("label",{children:"GMeet / Zoom Link"}),o.jsx("p",{children:e.meetingLink?o.jsx("a",{href:e.meetingLink,target:"_blank",rel:"noopener noreferrer",style:{color:"#5D2384",textDecoration:"underline"},children:e.meetingLink}):"N/A"})]}),o.jsxs(A,{children:[o.jsx("label",{children:"Account Status"}),o.jsx("div",{children:o.jsx(F,{variant:e.status==="active"?"success":"default",dot:!0,children:e.status.toUpperCase()})})]}),o.jsxs(A,{children:[o.jsx("label",{children:"Registered Date"}),o.jsx("p",{children:e.createdAt||"N/A"})]})]})}):null},io=()=>{const e=T(),n=R(),{searchQuery:s,setSearchQuery:c,statusFilter:l,setStatusFilter:b,openAddModal:y,openBulkUploadModal:$,openEditModal:i,openViewModal:u}=P(),[I,x]=L.useState(1),[j,D]=L.useState(10),[p,h]=L.useState(null),{data:g,isLoading:d}=xe({queryKey:["counselors",s,l,I,j],queryFn:()=>E.getAll({search:s,status:l,page:I,limit:j})}),w=V({mutationFn:E.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Deleted","Successfully removed counselor record."),h(null)},onError:()=>{n.error("Error","Failed to delete counselor record."),h(null)}}),z=()=>{p&&w.mutate(p.id)},t=[{key:"counselorId",header:"Counsellor ID",width:"120px",render:r=>o.jsx("strong",{children:r.counselorId})},{key:"name",header:"Counsellor Name & Email",render:r=>o.jsxs(Ie,{children:[o.jsx(De,{children:r.name}),o.jsx(Le,{children:r.email})]})},{key:"mobile",header:"Mobile No.",width:"140px",render:r=>r.mobile||"N/A"},{key:"meetingLink",header:"GMeet / Zoom Link",width:"200px",render:r=>r.meetingLink?o.jsx("a",{href:r.meetingLink,target:"_blank",rel:"noopener noreferrer",style:{color:"#5D2384",textDecoration:"underline",fontSize:"13px"},children:r.meetingLink}):"—"},{key:"status",header:"Status",width:"100px",render:r=>o.jsx(F,{variant:r.status==="active"?"success":"default",dot:!0,children:r.status.charAt(0).toUpperCase()+r.status.slice(1)})},{key:"actions",header:"Actions",width:"120px",render:r=>o.jsxs($e,{children:[o.jsx(U,{content:"View Details",children:o.jsx(W,{"aria-label":"View Details",onClick:()=>u(r),children:o.jsx(me,{size:16})})}),o.jsx(U,{content:"Edit Counselor",children:o.jsx(W,{"aria-label":"Edit Counselor",onClick:()=>i(r),children:o.jsx(pe,{size:16})})}),o.jsx(U,{content:"Delete Counselor",children:o.jsx(W,{"aria-label":"Delete Counselor",onClick:()=>h(r),children:o.jsx(ge,{size:16})})})]})}];return o.jsxs(Ce,{children:[o.jsx(he,{title:"Counselors List",subtitle:"Manage institution career counselors, single registration, and bulk CSV imports",breadcrumbs:[{label:"Dashboard",href:ae.DASHBOARD},{label:"Counselors List"}],actions:o.jsxs(ke,{children:[o.jsx(k,{variant:"secondary",leftIcon:o.jsx(ce,{size:16}),onClick:$,children:"Bulk Upload"}),o.jsx(k,{variant:"primary",leftIcon:o.jsx(de,{size:16}),onClick:y,children:"Add Counselor"})]})}),o.jsxs(fe,{children:[o.jsxs(ye,{children:[o.jsx(ve,{children:o.jsx(f,{placeholder:"Search by ID, name, email, or mobile...",leftIcon:o.jsx(ue,{size:16}),value:s,onChange:r=>{c(r.target.value),x(1)}})}),o.jsx(we,{children:o.jsx(Se,{children:o.jsx(q,{options:[{value:"all",label:"All Statuses"},{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:l,onChange:r=>{b(r.target.value),x(1)}})})})]}),o.jsx(G,{columns:t,data:(g==null?void 0:g.data)??[],isLoading:d,keyExtractor:r=>r.id,pagination:g?{page:g.page,totalPages:g.totalPages,total:g.total,limit:g.limit,onPageChange:r=>x(r),onLimitChange:r=>{D(r),x(1)}}:void 0})]}),o.jsx(Te,{}),o.jsx(Oe,{}),o.jsx(Qe,{}),o.jsx(Ge,{}),o.jsx(be,{isOpen:!!p,onClose:()=>h(null),onConfirm:z,title:"Delete Counselor Record",description:`Are you sure you want to delete ${p==null?void 0:p.name} (${p==null?void 0:p.counselorId})? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:w.isPending})]})};export{io as CounselorsListPage};
