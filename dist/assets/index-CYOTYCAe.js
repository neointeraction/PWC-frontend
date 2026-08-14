import{g as a,S as T,e as R,aW as F,j as o,B as $,r as A,aR as te,aH as ne,w as re,o as ie,aX as le,a as ae,c as ce,aY as de,Z as ue,_ as me,W as pe,a3 as ge,I as xe}from"./index-B6MU9CPz.js";import{u as he}from"./useQuery-B4c0qsO6.js";import{u as V}from"./useMutation-DF7mLgws.js";import{P as fe}from"./PageHeader-DVYmftZX.js";import{C as be}from"./Card-Dd4MI-gX.js";import{I as h}from"./Input-CwfTR_Bp.js";import{S as O}from"./Select-DKoWOyrE.js";import{T as G}from"./Table-BIhR0MJn.js";import{B as P}from"./Badge-BzBm2vLL.js";import"./Table.styles-DeHeiY8x.js";import"./FileUpload.styles-CZyPTynX.js";import"./Breadcrumb-C7lv3now.js";import{M as B}from"./Modal-BLiP14UD.js";import"./ConfirmDialog-D0SidjN7.js";import"./Checkbox-_Hq9YXcA.js";import{A as je}from"./AlertModal-CvibI5Le.js";import{T as N}from"./Tooltip-BaOOZ4TY.js";import"./SuccessModal.styles-Yz8Lvnau.js";import{m as Ce}from"./counselors.mock---5XGzUI.js";import{u as K,a as Z,C as _,o as X,e as Y,s as C}from"./types-C428mvW1.js";import"./Card.styles-BsYtRoVd.js";import"./Badge.styles-DD68j4M8.js";import"./SuccessModal-BMtPNeVw.js";let y=[...Ce];const E={async getAll(e={}){await new Promise(i=>setTimeout(i,200));let r=[...y];if(e.search){const i=e.search.toLowerCase();r=r.filter(u=>u.name.toLowerCase().includes(i)||u.email.toLowerCase().includes(i)||u.counselorId.toLowerCase().includes(i)||u.mobile.includes(i))}e.status&&e.status!=="all"&&(r=r.filter(i=>i.status===e.status));const s=e.page||1,c=e.limit||10,l=r.length,f=Math.ceil(l/c)||1,g=(s-1)*c;return{data:r.slice(g,g+c),total:l,page:s,limit:c,totalPages:f}},async getById(e){await new Promise(s=>setTimeout(s,150));const r=y.find(s=>s.id===e);if(!r)throw new Error("Counselor not found");return r},async create(e){await new Promise(s=>setTimeout(s,300));const r={id:`cns-${Date.now()}`,counselorId:e.counselorId||`C0${y.length+1}`,name:e.name,email:e.email,mobile:e.mobile,pwd:e.pwd||"",status:e.status||"active",createdAt:new Date().toISOString().split("T")[0]};return y.unshift(r),r},async bulkCreate(e){await new Promise(s=>setTimeout(s,400));const r=e.map((s,c)=>({id:`cns-${Date.now()}-${c}`,counselorId:s.counselorId||`C${String(y.length+c+1).padStart(3,"0")}`,name:s.name,email:s.email,mobile:s.mobile,pwd:s.pwd||"",status:s.status||"active",createdAt:new Date().toISOString().split("T")[0]}));return y.unshift(...r),r},async update(e,r){await new Promise(l=>setTimeout(l,250));const s=y.findIndex(l=>l.id===e);if(s===-1)throw new Error("Counselor not found");const c={...y[s],...r};return y[s]=c,c},async delete(e){return await new Promise(r=>setTimeout(r,200)),y=y.filter(r=>r.id!==e),!0}},ye=a.div`
  display: flex;
  flex-direction: column;
`,ve=a.div`
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
`,we=a.div`
  flex: 1;
  max-width: 380px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`,Se=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,ke=a.div`
  width: 180px;
`,$e=a.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ie=a.div`
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
`,De=a.div`
  display: flex;
  flex-direction: column;
`,Le=a.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Ae=a.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,J=a.form`
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
`,M=a.div`
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
`,ze=a.p`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  margin-bottom: 4px;
`,Ee=a.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Fe=a.h4`
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
`,Te=X({counselorId:C().min(1,"Counselor ID is required"),name:C().min(2,"Full name must be at least 2 characters"),email:C().email("Please enter a valid email address"),mobile:C().min(10,"Mobile number must be at least 10 digits"),meetingLink:C().optional(),pwd:C().optional(),status:Y(["active","inactive"])}),Re=()=>{var v,b,j,w,S,m;const e=T(),r=R(),{isAddModalOpen:s,closeAddModal:c}=F(),{register:l,handleSubmit:f,control:g,reset:I,formState:{errors:i}}=K({resolver:Z(Te),defaultValues:{counselorId:"",name:"",email:"",mobile:"",meetingLink:"",pwd:"",status:"active"}}),u=V({mutationFn:E.create,onSuccess:d=>{e.invalidateQueries({queryKey:["counselors"]}),r.success("Counselor Added",`Successfully registered counselor ${d.name} (${d.counselorId}).`),I(),c()},onError:()=>{r.error("Error","Failed to register new counselor.")}}),L=d=>{u.mutate(d)};return o.jsx(B,{isOpen:s,onClose:c,title:"Add New Counselor",subtitle:"Register a new counselor account into the platform",size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx($,{type:"button",variant:"secondary",onClick:c,children:"Cancel"}),o.jsx($,{type:"submit",form:"add-counselor-form",variant:"primary",isLoading:u.isPending,children:"Save Counselor"})]}),children:o.jsxs(J,{id:"add-counselor-form",onSubmit:f(L),children:[o.jsx(h,{label:"Counselor ID",placeholder:"e.g. C014",error:(v=i.counselorId)==null?void 0:v.message,...l("counselorId")}),o.jsx(h,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(b=i.name)==null?void 0:b.message,...l("name")}),o.jsx(h,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(j=i.email)==null?void 0:j.message,...l("email")}),o.jsx(h,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(w=i.mobile)==null?void 0:w.message,...l("mobile")}),o.jsx(h,{label:"GMeet / Zoom Link",placeholder:"e.g. https://meet.google.com/abc-defg-hij",error:(S=i.meetingLink)==null?void 0:S.message,...l("meetingLink")}),o.jsx(h,{label:"Password / PWD (Optional)",type:"password",placeholder:"Leave blank for auto-generated password",error:(m=i.pwd)==null?void 0:m.message,...l("pwd")}),o.jsx(_,{name:"status",control:g,render:({field:d})=>{var p;return o.jsx(O,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:d.value,onChange:d.onChange,error:(p=i.status)==null?void 0:p.message})}})]})})},Ve=a.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Be=a.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,Ue=a.div`
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
    ${({theme:e,$isDragging:r,$hasFile:s})=>r?e.colors.primary:s?e.colors.success:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  background-color: ${({theme:e,$isDragging:r})=>r?e.colors.primaryLight:e.colors.surface};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  text-align: center;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,We=a.div`
  font-size: 32px;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`,Oe=a.div`
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
`,He=()=>{const e=T(),r=R(),s=A.useRef(null),{isBulkUploadModalOpen:c,closeBulkUploadModal:l}=F(),[f,g]=A.useState(null),[I,i]=A.useState(!1),[u,L]=A.useState([]),v=V({mutationFn:E.bulkCreate,onSuccess:t=>{e.invalidateQueries({queryKey:["counselors"]}),r.success("Bulk Upload Complete",`Successfully imported ${t.length} counselor records.`),b(),l()},onError:()=>{r.error("Error","Failed to bulk upload counselor records.")}}),b=()=>{g(null),L([]),s.current&&(s.current.value="")},j=()=>{const t=`Counsellor ID,PWD,Counsellor Name,Mobile No.,Email ID
C014,,Anil Sharma,9876543210,anil.sharma@example.com
C015,,Sunita Roy,9812345678,sunita.roy@example.com
`,x=new Blob([t],{type:"text/csv;charset=utf-8;"}),D=URL.createObjectURL(x),n=document.createElement("a");n.href=D,n.setAttribute("download","counselors_template.csv"),document.body.appendChild(n),n.click(),document.body.removeChild(n)},w=t=>{const x=t.split(`
`).map(n=>n.trim()).filter(n=>n.length>0);if(x.length<=1){r.error("Invalid File","The CSV file appears to be empty or missing headers.");return}const D=[];for(let n=1;n<x.length;n++){const k=x[n].split(",").map(se=>se.trim()),ee=k[0]||`C0${n+13}`,q=k[2]||k[1]||"",oe=k[3]||k[2]||"",U=k[4]||k[3]||"",H=!!(q&&U&&U.includes("@"));D.push({counselorId:ee,name:q||"Unknown Counselor",mobile:oe||"N/A",email:U||"invalid@example.com",status:"active",isValid:H,validationError:H?void 0:"Missing required name or email format"})}L(D)},S=t=>{if(!t.name.endsWith(".csv")&&!t.name.endsWith(".txt")){r.error("Unsupported File","Please upload a CSV or TXT file.");return}g(t);const x=new FileReader;x.onload=D=>{var k;const n=(k=D.target)==null?void 0:k.result;w(n)},x.readAsText(t)},m=t=>{t.preventDefault(),i(!1),t.dataTransfer.files&&t.dataTransfer.files[0]&&S(t.dataTransfer.files[0])},d=()=>{const t=u.filter(x=>x.isValid).map(({isValid:x,validationError:D,...n})=>n);if(t.length===0){r.error("No Valid Rows","Please ensure your CSV contains valid counselor records.");return}v.mutate(t)},p=[{key:"counselorId",header:"ID",width:"90px",render:t=>o.jsx("strong",{children:t.counselorId})},{key:"name",header:"Counselor Name",render:t=>t.name},{key:"mobile",header:"Mobile No.",render:t=>t.mobile},{key:"email",header:"Email ID",render:t=>t.email},{key:"isValid",header:"Validation",width:"110px",render:t=>o.jsxs(P,{variant:t.isValid?"success":"danger",children:[t.isValid?o.jsx(Q,{children:o.jsx(ie,{size:14})}):o.jsx(Q,{children:o.jsx(le,{size:14})}),t.isValid?"Valid":"Invalid"]})}],z=u.filter(t=>t.isValid).length;return o.jsx(B,{isOpen:c,onClose:()=>{b(),l()},title:"Bulk Upload Counselors",subtitle:"Upload a CSV file containing counselor records to import in bulk",size:"lg",footer:o.jsxs(o.Fragment,{children:[o.jsx($,{type:"button",variant:"secondary",onClick:()=>{b(),l()},children:"Cancel"}),o.jsxs($,{type:"button",variant:"primary",disabled:u.length===0||z===0,isLoading:v.isPending,onClick:d,children:["Import ",z," Counselor",z!==1?"s":""]})]}),children:o.jsxs(Ve,{children:[o.jsxs(Be,{children:[o.jsxs(Ue,{children:[o.jsx("h4",{children:"CSV Template Format"}),o.jsx("p",{children:"Headers required: Counsellor ID, PWD, Counsellor Name, Mobile No., Email ID"})]}),o.jsx($,{variant:"secondary",size:"sm",leftIcon:o.jsx(te,{size:16}),onClick:j,children:"Download Sample CSV"})]}),o.jsx("input",{type:"file",ref:s,accept:".csv,.txt",style:{display:"none"},onChange:t=>{t.target.files&&t.target.files[0]&&S(t.target.files[0])}}),o.jsxs(Ne,{$isDragging:I,$hasFile:!!f,onDragOver:t=>{t.preventDefault(),i(!0)},onDragLeave:()=>i(!1),onDrop:m,onClick:()=>{var t;return(t=s.current)==null?void 0:t.click()},children:[o.jsx(We,{children:o.jsx(ne,{size:32})}),f?o.jsxs(Oe,{children:[o.jsx(re,{size:18}),f.name," (",(f.size/1024).toFixed(1)," KB)"]}):o.jsxs("div",{children:[o.jsx(ze,{children:"Click to browse or drag & drop CSV file here"}),o.jsx(Ee,{children:"Supports CSV format up to 5MB"})]})]}),u.length>0&&o.jsxs("div",{children:[o.jsxs(qe,{children:[o.jsxs(Fe,{children:["Parsed Rows Preview (",u.length," total)"]}),o.jsxs(P,{variant:"info",children:[z," Ready for import"]})]}),o.jsx(Pe,{children:o.jsx(G,{columns:p,data:u,keyExtractor:t=>t.counselorId||t.email})})]})]})})},Qe=X({counselorId:C().min(1,"Counselor ID is required"),name:C().min(2,"Full name must be at least 2 characters"),email:C().email("Please enter a valid email address"),mobile:C().min(10,"Mobile number must be at least 10 digits"),meetingLink:C().optional(),pwd:C().optional(),status:Y(["active","inactive"])}),Ge=()=>{var v,b,j,w,S,m;const e=T(),r=R(),{selectedCounselorForEdit:s,closeEditModal:c}=F(),{register:l,handleSubmit:f,control:g,reset:I,formState:{errors:i}}=K({resolver:Z(Qe)});A.useEffect(()=>{s&&I({counselorId:s.counselorId,name:s.name,email:s.email,mobile:s.mobile,meetingLink:s.meetingLink||"",pwd:s.pwd||"",status:s.status})},[s,I]);const u=V({mutationFn:d=>E.update(s.id,d),onSuccess:d=>{e.invalidateQueries({queryKey:["counselors"]}),r.success("Counselor Updated",`Successfully updated profile for ${d.name}.`),c()},onError:()=>{r.error("Error","Failed to update counselor profile.")}}),L=d=>{s&&u.mutate(d)};return o.jsx(B,{isOpen:!!s,onClose:c,title:"Edit Counselor Profile",subtitle:`Update profile and contact details for ${(s==null?void 0:s.name)||""}`,size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx($,{type:"button",variant:"secondary",onClick:c,children:"Cancel"}),o.jsx($,{type:"submit",form:"edit-counselor-form",variant:"primary",isLoading:u.isPending,children:"Save Changes"})]}),children:o.jsxs(J,{id:"edit-counselor-form",onSubmit:f(L),children:[o.jsx(h,{label:"Counselor ID",placeholder:"e.g. C001",error:(v=i.counselorId)==null?void 0:v.message,...l("counselorId")}),o.jsx(h,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(b=i.name)==null?void 0:b.message,...l("name")}),o.jsx(h,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(j=i.email)==null?void 0:j.message,...l("email")}),o.jsx(h,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(w=i.mobile)==null?void 0:w.message,...l("mobile")}),o.jsx(h,{label:"GMeet / Zoom Link",placeholder:"e.g. https://meet.google.com/abc-defg-hij",error:(S=i.meetingLink)==null?void 0:S.message,...l("meetingLink")}),o.jsx(h,{label:"Password / PWD",type:"password",placeholder:"Enter new password to update",error:(m=i.pwd)==null?void 0:m.message,...l("pwd")}),o.jsx(_,{name:"status",control:g,render:({field:d})=>{var p;return o.jsx(O,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:d.value,onChange:d.onChange,error:(p=i.status)==null?void 0:p.message})}})]})})},Ke=()=>{const{selectedCounselorForView:e,closeViewModal:r}=F();return e?o.jsx(B,{isOpen:!!e,onClose:r,title:"Counselor Details",subtitle:`Viewing account record for ${e.name}`,size:"md",footer:o.jsx($,{variant:"secondary",onClick:r,children:"Close"}),children:o.jsxs(Me,{children:[o.jsxs(M,{children:[o.jsx("label",{children:"Counselor ID"}),o.jsx("p",{children:e.counselorId})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Counselor Name"}),o.jsx("p",{children:e.name})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Email Address"}),o.jsx("p",{children:e.email})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Mobile Number"}),o.jsx("p",{children:e.mobile})]}),o.jsxs(M,{children:[o.jsx("label",{children:"GMeet / Zoom Link"}),o.jsx("p",{children:e.meetingLink?o.jsx("a",{href:e.meetingLink,target:"_blank",rel:"noopener noreferrer",style:{color:"#5D2384",textDecoration:"underline"},children:e.meetingLink}):"N/A"})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Account Status"}),o.jsx("div",{children:o.jsx(P,{variant:e.status==="active"?"success":"default",dot:!0,children:e.status.toUpperCase()})})]}),o.jsxs(M,{children:[o.jsx("label",{children:"Registered Date"}),o.jsx("p",{children:e.createdAt||"N/A"})]})]})}):null},jo=()=>{const e=T(),r=R(),{user:s}=ae(),c=!!(s!=null&&s.isViewOnly),{searchQuery:l,setSearchQuery:f,statusFilter:g,setStatusFilter:I,openAddModal:i,openBulkUploadModal:u,openEditModal:L,openViewModal:v}=F(),[b,j]=A.useState(1),[w,S]=A.useState(10),[m,d]=A.useState(null),{data:p,isLoading:z}=he({queryKey:["counselors",l,g,b,w],queryFn:()=>E.getAll({search:l,status:g,page:b,limit:w})}),t=V({mutationFn:E.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["counselors"]}),r.success("Counselor Deleted","Successfully removed counselor record."),d(null)},onError:()=>{r.error("Error","Failed to delete counselor record."),d(null)}}),x=()=>{m&&t.mutate(m.id)},D=[{key:"actions",header:"Actions",width:"120px",render:n=>o.jsxs(Ie,{children:[o.jsx(N,{content:"View Details",children:o.jsx(W,{"aria-label":"View Details",onClick:()=>v(n),children:o.jsx(pe,{size:16})})}),!c&&o.jsxs(o.Fragment,{children:[o.jsx(N,{content:"Edit Counselor",children:o.jsx(W,{"aria-label":"Edit Counselor",onClick:()=>L(n),children:o.jsx(ge,{size:16})})}),o.jsx(N,{content:"Delete Counselor",children:o.jsx(W,{"aria-label":"Delete Counselor",onClick:()=>d(n),children:o.jsx(xe,{size:16})})})]})]})},{key:"counselorId",header:"Counsellor ID",width:"120px",render:n=>o.jsx("strong",{children:n.counselorId})},{key:"name",header:"Counsellor Name & Email",render:n=>o.jsxs(De,{children:[o.jsx(Le,{children:n.name}),o.jsx(Ae,{children:n.email})]})},{key:"mobile",header:"Mobile No.",width:"140px",render:n=>n.mobile||"N/A"},{key:"meetingLink",header:"GMeet / Zoom Link",width:"200px",render:n=>n.meetingLink?o.jsx("a",{href:n.meetingLink,target:"_blank",rel:"noopener noreferrer",style:{color:"#5D2384",textDecoration:"underline",fontSize:"13px"},children:n.meetingLink}):"—"},{key:"status",header:"Status",width:"100px",render:n=>o.jsx(P,{variant:n.status==="active"?"success":"default",dot:!0,children:n.status.charAt(0).toUpperCase()+n.status.slice(1)})}];return o.jsxs(ye,{children:[o.jsx(fe,{title:"Counselors List",subtitle:"Manage institution career counselors, single registration, and bulk CSV imports",breadcrumbs:[{label:"Dashboard",href:ce.DASHBOARD},{label:"Counselors List"}],actions:c?void 0:o.jsxs($e,{children:[o.jsx($,{variant:"secondary",leftIcon:o.jsx(de,{size:16}),onClick:u,children:"Bulk Upload"}),o.jsx($,{variant:"primary",leftIcon:o.jsx(ue,{size:16}),onClick:i,children:"Add Counselor"})]})}),o.jsxs(be,{children:[o.jsxs(ve,{children:[o.jsx(we,{children:o.jsx(h,{placeholder:"Search by ID, name, email, or mobile...",leftIcon:o.jsx(me,{size:16}),value:l,onChange:n=>{f(n.target.value),j(1)}})}),o.jsx(Se,{children:o.jsx(ke,{children:o.jsx(O,{options:[{value:"all",label:"All Statuses"},{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:g,onChange:n=>{I(n.target.value),j(1)}})})})]}),o.jsx(G,{columns:D,data:(p==null?void 0:p.data)??[],isLoading:z,keyExtractor:n=>n.id,pagination:p?{page:p.page,totalPages:p.totalPages,total:p.total,limit:p.limit,onPageChange:n=>j(n),onLimitChange:n=>{S(n),j(1)}}:void 0})]}),o.jsx(Re,{}),o.jsx(He,{}),o.jsx(Ge,{}),o.jsx(Ke,{}),o.jsx(je,{isOpen:!!m,onClose:()=>d(null),onConfirm:x,title:"Delete Counselor Record",description:`Are you sure you want to delete ${m==null?void 0:m.name} (${m==null?void 0:m.counselorId})? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:t.isPending})]})};export{jo as CounselorsListPage};
