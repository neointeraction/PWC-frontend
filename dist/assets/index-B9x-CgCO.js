import{g as r,w as q,e as H,aL as N,j as o,B as w,r as A,ay as le,aE as ae,aj as ce,aM as de,aN as ue,a as me,c as pe,E as xe,aO as he,F as ge,aP as fe,A as je,K as ye,M as be}from"./index-a7zXg0JL.js";import{u as ve}from"./useQuery-o51MCdGR.js";import{u as Q}from"./useMutation-DwnP0O57.js";import{P as Ce}from"./PageHeader-DdaifotM.js";import{C as R}from"./Card-DKKLy9Mw.js";import{I as f}from"./Input-CcYvfC84.js";import{S as X}from"./Select-BAabmZ1Y.js";import{T as _}from"./Table-BsJCxA-K.js";import{B as F}from"./Badge-D3OjBY32.js";import"./Table.styles-Cb89hldY.js";import"./FileUpload.styles-BKXqSS7S.js";import"./Breadcrumb-CswGd06t.js";import{M as U}from"./Modal-HiRbBry-.js";import"./ConfirmDialog-C7PpcmZe.js";import"./Checkbox-CyX2E4EW.js";import{A as we}from"./AlertModal-nNCtekSL.js";import{T as W}from"./Tooltip-D_2DC_R7.js";import"./SuccessModal.styles-CmlOLHfD.js";import{m as $e}from"./counselors.mock-CbyQmpLX.js";import{u as ee,a as oe,C as te,o as se,e as ne,s as v}from"./types-EVWly3UQ.js";import"./Card.styles-MXf9i3yh.js";import"./Badge.styles-rNLOM2_m.js";import"./SuccessModal-DJckJoM1.js";let C=[...$e];const V={async getAll(e={}){await new Promise(l=>setTimeout(l,200));let s=[...C];if(e.search){const l=e.search.toLowerCase();s=s.filter(p=>p.name.toLowerCase().includes(l)||p.email.toLowerCase().includes(l)||p.counselorId.toLowerCase().includes(l)||p.mobile.includes(l))}e.status&&e.status!=="all"&&(s=s.filter(l=>l.status===e.status));const t=e.page||1,c=e.limit||10,i=s.length,u=Math.ceil(i/c)||1,h=(t-1)*c;return{data:s.slice(h,h+c),total:i,page:t,limit:c,totalPages:u}},async getById(e){await new Promise(t=>setTimeout(t,150));const s=C.find(t=>t.id===e);if(!s)throw new Error("Counselor not found");return s},async create(e){await new Promise(t=>setTimeout(t,300));const s={id:`cns-${Date.now()}`,counselorId:e.counselorId||`C0${C.length+1}`,name:e.name,email:e.email,mobile:e.mobile,pwd:e.pwd||"",status:e.status||"active",createdAt:new Date().toISOString().split("T")[0]};return C.unshift(s),s},async bulkCreate(e){await new Promise(t=>setTimeout(t,400));const s=e.map((t,c)=>({id:`cns-${Date.now()}-${c}`,counselorId:t.counselorId||`C${String(C.length+c+1).padStart(3,"0")}`,name:t.name,email:t.email,mobile:t.mobile,pwd:t.pwd||"",status:t.status||"active",createdAt:new Date().toISOString().split("T")[0]}));return C.unshift(...s),s},async update(e,s){await new Promise(i=>setTimeout(i,250));const t=C.findIndex(i=>i.id===e);if(t===-1)throw new Error("Counselor not found");const c={...C[t],...s};return C[t]=c,c},async delete(e){return await new Promise(s=>setTimeout(s,200)),C=C.filter(s=>s.id!==e),!0}},Se=r.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,ke=r.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,O=r.div`
  font-size: ${({theme:e})=>e.fontSize.display};
  font-weight: 700;
  color: ${({theme:e,$color:s})=>s||e.colors.text};
  margin-top: 4px;
`,J=r.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: max-content;
  min-width: 80px;
  padding: 0 12px;
  height: 32px;
  background-color: ${({theme:e,$isInactive:s})=>s?e.colors.surfaceHover:e.colors.surface};
  border: 1px solid ${({theme:e,$isInactive:s})=>s?"transparent":e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  font-family: inherit;
  font-size: 13px;
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e,$isInactive:s})=>s?e.colors.textMuted:e.colors.textSecondary};
  cursor: ${({$isInactive:e})=>e?"not-allowed":"pointer"};
  transition: all ${({theme:e})=>e.transition.fast};

  svg {
    width: 16px;
    height: 16px;
  }

  ${({theme:e,$isInactive:s})=>!s&&`
    &:hover {
      border-color: ${e.colors.primary};
      color: ${e.colors.primary};
    }
  `}
`,Ie=r.div`
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
`,De=r.div`
  flex: 1;
  max-width: 380px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`,Le=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Ae=r.div`
  width: 180px;
`;r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`;const Be=r.div`
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
`,G=r.button`
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
`;r.div`
  display: flex;
  flex-direction: column;
`;r.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`;r.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;const re=r.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,Me=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,z=r.div`
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
`,ze=r.p`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  margin-bottom: 4px;
`,Fe=r.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Pe=r.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Ee=r.div`
  margin-top: ${({theme:e})=>e.spacing.xs};
  max-height: 220px;
  overflow-y: auto;
`,Y=r.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`,Te=se({counselorId:v().min(1,"Counselor ID is required"),name:v().min(2,"Full name must be at least 2 characters"),email:v().email("Please enter a valid email address"),mobile:v().min(10,"Mobile number must be at least 10 digits"),meetingLink:v().optional(),pwd:v().optional(),status:ne(["active","inactive"])}),Re=()=>{var $,j,y,S,k,x;const e=q(),s=H(),{isAddModalOpen:t,closeAddModal:c}=N(),{register:i,handleSubmit:u,control:h,reset:L,formState:{errors:l}}=ee({resolver:oe(Te),defaultValues:{counselorId:"",name:"",email:"",mobile:"",meetingLink:"",pwd:"",status:"active"}}),p=Q({mutationFn:V.create,onSuccess:d=>{e.invalidateQueries({queryKey:["counselors"]}),s.success("Counselor Added",`Successfully registered counselor ${d.name} (${d.counselorId}).`),L(),c()},onError:()=>{s.error("Error","Failed to register new counselor.")}}),B=d=>{p.mutate(d)};return o.jsx(U,{isOpen:t,onClose:c,title:"Add New Counselor",subtitle:"Register a new counselor account into the platform",size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:c,children:"Cancel"}),o.jsx(w,{type:"submit",form:"add-counselor-form",variant:"primary",isLoading:p.isPending,children:"Save Counselor"})]}),children:o.jsxs(re,{id:"add-counselor-form",onSubmit:u(B),children:[o.jsx(f,{label:"Counselor ID",placeholder:"e.g. C014",error:($=l.counselorId)==null?void 0:$.message,...i("counselorId")}),o.jsx(f,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(j=l.name)==null?void 0:j.message,...i("name")}),o.jsx(f,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(y=l.email)==null?void 0:y.message,...i("email")}),o.jsx(f,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(S=l.mobile)==null?void 0:S.message,...i("mobile")}),o.jsx(f,{label:"GMeet / Zoom Link",placeholder:"e.g. https://meet.google.com/abc-defg-hij",error:(k=l.meetingLink)==null?void 0:k.message,...i("meetingLink")}),o.jsx(f,{label:"Password / PWD (Optional)",type:"password",placeholder:"Leave blank for auto-generated password",error:(x=l.pwd)==null?void 0:x.message,...i("pwd")}),o.jsx(te,{name:"status",control:h,render:({field:d})=>{var I;return o.jsx(X,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:d.value,onChange:d.onChange,error:(I=l.status)==null?void 0:I.message})}})]})})},Ve=r.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ne=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,Ue=r.div`
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
`,We=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spacing.sm};
  padding: ${({theme:e})=>e.spacing.xl};
  border: 2px dashed
    ${({theme:e,$isDragging:s,$hasFile:t})=>s?e.colors.primary:t?e.colors.success:e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  background-color: ${({theme:e,$isDragging:s})=>s?e.colors.primaryLight:e.colors.surface};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};
  text-align: center;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,Oe=r.div`
  font-size: 32px;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`,qe=r.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,He=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({theme:e})=>e.spacing.sm};
`,Qe=()=>{const e=q(),s=H(),t=A.useRef(null),{isBulkUploadModalOpen:c,closeBulkUploadModal:i}=N(),[u,h]=A.useState(null),[L,l]=A.useState(!1),[p,B]=A.useState([]),$=Q({mutationFn:V.bulkCreate,onSuccess:n=>{e.invalidateQueries({queryKey:["counselors"]}),s.success("Bulk Upload Complete",`Successfully imported ${n.length} counselor records.`),j(),i()},onError:()=>{s.error("Error","Failed to bulk upload counselor records.")}}),j=()=>{h(null),B([]),t.current&&(t.current.value="")},y=()=>{const n=`Counsellor ID,PWD,Counsellor Name,Mobile No.,Email ID
C014,,Anil Sharma,9876543210,anil.sharma@example.com
C015,,Sunita Roy,9812345678,sunita.roy@example.com
`,g=new Blob([n],{type:"text/csv;charset=utf-8;"}),D=URL.createObjectURL(g),m=document.createElement("a");m.href=D,m.setAttribute("download","counselors_template.csv"),document.body.appendChild(m),m.click(),document.body.removeChild(m)},S=n=>{const g=n.split(`
`).map(m=>m.trim()).filter(m=>m.length>0);if(g.length<=1){s.error("Invalid File","The CSV file appears to be empty or missing headers.");return}const D=[];for(let m=1;m<g.length;m++){const b=g[m].split(",").map(ie=>ie.trim()),K=b[0]||`C0${m+13}`,a=b[2]||b[1]||"",P=b[3]||b[2]||"",E=b[4]||b[3]||"",T=!!(a&&E&&E.includes("@"));D.push({counselorId:K,name:a||"Unknown Counselor",mobile:P||"N/A",email:E||"invalid@example.com",status:"active",isValid:T,validationError:T?void 0:"Missing required name or email format"})}B(D)},k=n=>{if(!n.name.endsWith(".csv")&&!n.name.endsWith(".txt")){s.error("Unsupported File","Please upload a CSV or TXT file.");return}h(n);const g=new FileReader;g.onload=D=>{var b;const m=(b=D.target)==null?void 0:b.result;S(m)},g.readAsText(n)},x=n=>{n.preventDefault(),l(!1),n.dataTransfer.files&&n.dataTransfer.files[0]&&k(n.dataTransfer.files[0])},d=()=>{const n=p.filter(g=>g.isValid).map(({isValid:g,validationError:D,...m})=>m);if(n.length===0){s.error("No Valid Rows","Please ensure your CSV contains valid counselor records.");return}$.mutate(n)},I=[{key:"counselorId",header:"ID",width:"90px",render:n=>o.jsx("strong",{children:n.counselorId})},{key:"name",header:"Counselor Name",render:n=>n.name},{key:"mobile",header:"Mobile No.",render:n=>n.mobile},{key:"email",header:"Email ID",render:n=>n.email},{key:"isValid",header:"Validation",width:"110px",render:n=>o.jsxs(F,{variant:n.isValid?"success":"danger",children:[n.isValid?o.jsx(Y,{children:o.jsx(de,{size:14})}):o.jsx(Y,{children:o.jsx(ue,{size:14})}),n.isValid?"Valid":"Invalid"]})}],M=p.filter(n=>n.isValid).length;return o.jsx(U,{isOpen:c,onClose:()=>{j(),i()},title:"Bulk Upload Counselors",subtitle:"Upload a CSV file containing counselor records to import in bulk",size:"lg",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:()=>{j(),i()},children:"Cancel"}),o.jsxs(w,{type:"button",variant:"primary",disabled:p.length===0||M===0,isLoading:$.isPending,onClick:d,children:["Import ",M," Counselor",M!==1?"s":""]})]}),children:o.jsxs(Ve,{children:[o.jsxs(Ne,{children:[o.jsxs(Ue,{children:[o.jsx("h4",{children:"CSV Template Format"}),o.jsx("p",{children:"Headers required: Counsellor ID, PWD, Counsellor Name, Mobile No., Email ID"})]}),o.jsx(w,{variant:"secondary",size:"sm",leftIcon:o.jsx(le,{size:16}),onClick:y,children:"Download Sample CSV"})]}),o.jsx("input",{type:"file",ref:t,accept:".csv,.txt",style:{display:"none"},onChange:n=>{n.target.files&&n.target.files[0]&&k(n.target.files[0])}}),o.jsxs(We,{$isDragging:L,$hasFile:!!u,onDragOver:n=>{n.preventDefault(),l(!0)},onDragLeave:()=>l(!1),onDrop:x,onClick:()=>{var n;return(n=t.current)==null?void 0:n.click()},children:[o.jsx(Oe,{children:o.jsx(ae,{size:32})}),u?o.jsxs(qe,{children:[o.jsx(ce,{size:18}),u.name," (",(u.size/1024).toFixed(1)," KB)"]}):o.jsxs("div",{children:[o.jsx(ze,{children:"Click to browse or drag & drop CSV file here"}),o.jsx(Fe,{children:"Supports CSV format up to 5MB"})]})]}),p.length>0&&o.jsxs("div",{children:[o.jsxs(He,{children:[o.jsxs(Pe,{children:["Parsed Rows Preview (",p.length," total)"]}),o.jsxs(F,{variant:"info",children:[M," Ready for import"]})]}),o.jsx(Ee,{children:o.jsx(_,{columns:I,data:p,keyExtractor:n=>n.counselorId||n.email})})]})]})})},Ke=se({counselorId:v().min(1,"Counselor ID is required"),name:v().min(2,"Full name must be at least 2 characters"),email:v().email("Please enter a valid email address"),mobile:v().min(10,"Mobile number must be at least 10 digits"),meetingLink:v().optional(),pwd:v().optional(),status:ne(["active","inactive"])}),Ge=()=>{var $,j,y,S,k,x;const e=q(),s=H(),{selectedCounselorForEdit:t,closeEditModal:c}=N(),{register:i,handleSubmit:u,control:h,reset:L,formState:{errors:l}}=ee({resolver:oe(Ke)});A.useEffect(()=>{t&&L({counselorId:t.counselorId,name:t.name,email:t.email,mobile:t.mobile,meetingLink:t.meetingLink||"",pwd:t.pwd||"",status:t.status})},[t,L]);const p=Q({mutationFn:d=>V.update(t.id,d),onSuccess:d=>{e.invalidateQueries({queryKey:["counselors"]}),s.success("Counselor Updated",`Successfully updated profile for ${d.name}.`),c()},onError:()=>{s.error("Error","Failed to update counselor profile.")}}),B=d=>{t&&p.mutate(d)};return o.jsx(U,{isOpen:!!t,onClose:c,title:"Edit Counselor Profile",subtitle:`Update profile and contact details for ${(t==null?void 0:t.name)||""}`,size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:c,children:"Cancel"}),o.jsx(w,{type:"submit",form:"edit-counselor-form",variant:"primary",isLoading:p.isPending,children:"Save Changes"})]}),children:o.jsxs(re,{id:"edit-counselor-form",onSubmit:u(B),children:[o.jsx(f,{label:"Counselor ID",placeholder:"e.g. C001",error:($=l.counselorId)==null?void 0:$.message,...i("counselorId")}),o.jsx(f,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(j=l.name)==null?void 0:j.message,...i("name")}),o.jsx(f,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(y=l.email)==null?void 0:y.message,...i("email")}),o.jsx(f,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(S=l.mobile)==null?void 0:S.message,...i("mobile")}),o.jsx(f,{label:"GMeet / Zoom Link",placeholder:"e.g. https://meet.google.com/abc-defg-hij",error:(k=l.meetingLink)==null?void 0:k.message,...i("meetingLink")}),o.jsx(f,{label:"Password / PWD",type:"password",placeholder:"Enter new password to update",error:(x=l.pwd)==null?void 0:x.message,...i("pwd")}),o.jsx(te,{name:"status",control:h,render:({field:d})=>{var I;return o.jsx(X,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:d.value,onChange:d.onChange,error:(I=l.status)==null?void 0:I.message})}})]})})},Ze=()=>{const{selectedCounselorForView:e,closeViewModal:s}=N();return e?o.jsx(U,{isOpen:!!e,onClose:s,title:"Counselor Details",subtitle:`Viewing account record for ${e.name}`,size:"md",footer:o.jsx(w,{variant:"secondary",onClick:s,children:"Close"}),children:o.jsxs(Me,{children:[o.jsxs(z,{children:[o.jsx("label",{children:"Counselor ID"}),o.jsx("p",{children:e.counselorId})]}),o.jsxs(z,{children:[o.jsx("label",{children:"Counselor Name"}),o.jsx("p",{children:e.name})]}),o.jsxs(z,{children:[o.jsx("label",{children:"Email Address"}),o.jsx("p",{children:e.email})]}),o.jsxs(z,{children:[o.jsx("label",{children:"Mobile Number"}),o.jsx("p",{children:e.mobile})]}),o.jsxs(z,{children:[o.jsx("label",{children:"GMeet / Zoom Link"}),o.jsx("p",{children:e.meetingLink?o.jsx("a",{href:e.meetingLink,target:"_blank",rel:"noopener noreferrer",style:{color:"#5D2384",textDecoration:"underline"},children:e.meetingLink}):"N/A"})]}),o.jsxs(z,{children:[o.jsx("label",{children:"Account Status"}),o.jsx("div",{children:o.jsx(F,{variant:e.status==="active"?"success":"default",dot:!0,children:e.status.toUpperCase()})})]}),o.jsxs(z,{children:[o.jsx("label",{children:"Registered Date"}),o.jsx("p",{children:e.createdAt||"N/A"})]})]})}):null},Xe=r.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,_e=r.div`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primaryMuted};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,Je=r.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({theme:e})=>e.colors.primary};
  }

  span:last-child {
    font-size: 15px;
    font-weight: 700;
    color: ${({theme:e})=>e.colors.text};
  }
`,Z=r.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span:first-child {
    font-size: 11px;
    font-weight: 600;
    color: ${({theme:e})=>e.colors.textSecondary};
    text-transform: uppercase;
  }

  span:last-child {
    font-size: 16px;
    font-weight: 700;
    color: ${({theme:e})=>e.colors.text};
  }
`,Ye=r.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({theme:e})=>e.spacing.md};
`,eo=({isOpen:e,onClose:s,counselor:t})=>{if(!t)return null;const c=t.projectsList&&t.projectsList.length>0?t.projectsList:[{schoolName:t.projectDeployedName||"St. Xavier's College, Mumbai",totalAllotted:t.totalAllotted||0,session1Balance:t.session1Balance||0,session2Balance:t.session2Balance||0}],i=[{key:"schoolName",header:"Schools",render:u=>o.jsx("strong",{children:u.schoolName})},{key:"totalAllotted",header:"Total Allotted",render:u=>o.jsx("span",{children:u.totalAllotted})},{key:"session1Balance",header:"Session 1 Balance",render:u=>o.jsx("span",{children:u.session1Balance})},{key:"session2Balance",header:"Session 2 Balance",render:u=>o.jsx("span",{children:u.session2Balance})}];return o.jsx(U,{isOpen:e,onClose:s,title:"Deployment & Workload Breakdown",size:"xl",children:o.jsxs(Xe,{children:[o.jsxs(_e,{children:[o.jsxs(Je,{children:[o.jsx("span",{children:"Counsellor Details"}),o.jsxs("span",{children:[t.name," (",t.counselorId,")"]})]}),o.jsxs("div",{style:{display:"flex",gap:"24px"},children:[o.jsxs(Z,{children:[o.jsx("span",{children:"Total Allotted"}),o.jsx("span",{children:t.totalAllotted??62})]}),o.jsxs(Z,{children:[o.jsx("span",{children:"S1 Balance"}),o.jsx("span",{children:t.session1Balance??18})]}),o.jsxs(Z,{children:[o.jsx("span",{children:"S2 Balance"}),o.jsx("span",{children:t.session2Balance??26})]})]})]}),o.jsx(_,{columns:i,data:c,keyExtractor:u=>u.schoolName}),o.jsx(Ye,{children:o.jsx(w,{variant:"secondary",onClick:s,children:"Close Breakdown"})})]})})},So=()=>{const e=q(),s=H(),{user:t}=me(),c=!!(t!=null&&t.isViewOnly),{searchQuery:i,setSearchQuery:u,statusFilter:h,setStatusFilter:L,openAddModal:l,openBulkUploadModal:p,openEditModal:B,openViewModal:$}=N(),[j,y]=A.useState(1),[S,k]=A.useState(10),[x,d]=A.useState(null),[I,M]=A.useState(null),{data:n,isLoading:g}=ve({queryKey:["counselors",i,h,j,S],queryFn:()=>V.getAll({search:i,status:h,page:j,limit:S})}),D=Q({mutationFn:V.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["counselors"]}),s.success("Counselor Deleted","Successfully removed counselor record."),d(null)},onError:()=>{s.error("Error","Failed to delete counselor record."),d(null)}}),m=()=>{x&&D.mutate(x.id)},b=a=>{const P=a.deploymentStatus||(a.status==="active"?"deployed":"inactive");switch(P){case"deployed":return o.jsx(F,{variant:"success",dot:!0,children:"Deployed"});case"bench":return o.jsx(F,{variant:"info",dot:!0,children:"Bench"});case"inactive":return o.jsx(F,{variant:"danger",dot:!0,children:"Inactive"});default:return o.jsx(F,{variant:"default",children:P})}},K=[{key:"counselorId",header:"ID",width:"80px",render:a=>o.jsx("strong",{children:a.counselorId})},{key:"name",header:"Counsellor",render:a=>o.jsx("strong",{children:a.name})},{key:"projectDeployed",header:"Project Deployed",render:a=>{var T;if(a.deploymentStatus==="inactive"||a.status==="inactive")return o.jsx(J,{as:"div",$isInactive:!0,children:"inactive"});const E=((T=a.projectsList)==null?void 0:T.length)||0;return o.jsx(W,{content:"Click to view deployment & workload breakdown",children:o.jsxs(J,{type:"button",onClick:()=>M(a),children:[o.jsx(fe,{})," ",E," Projects"]})})}},{key:"status",header:"Status",width:"100px",render:a=>b(a)},{key:"actions",header:"Actions",width:"120px",render:a=>o.jsxs(Be,{children:[o.jsx(W,{content:"View Details",children:o.jsx(G,{"aria-label":"View Details",onClick:()=>$(a),children:o.jsx(je,{size:16})})}),!c&&o.jsxs(o.Fragment,{children:[o.jsx(W,{content:"Edit Counselor",children:o.jsx(G,{"aria-label":"Edit Counselor",onClick:()=>B(a),children:o.jsx(ye,{size:16})})}),o.jsx(W,{content:"Delete Counselor",children:o.jsx(G,{"aria-label":"Delete Counselor",onClick:()=>d(a),children:o.jsx(be,{size:16})})})]})]})}];return o.jsxs(Se,{children:[o.jsx(Ce,{title:"Counsellor Directory",subtitle:"Deployment & Workload overview for institution career counselors",breadcrumbs:[{label:"Dashboard",href:pe.DASHBOARD},{label:"Counselors List"}]}),o.jsxs(ke,{children:[o.jsx(R,{title:"Total Empanelled",children:o.jsx(O,{children:"58"})}),o.jsx(R,{title:"Deployed",children:o.jsx(O,{$color:"#16A34A",children:"44"})}),o.jsx(R,{title:"On Bench",children:o.jsx(O,{$color:"#0284C7",children:"9"})}),o.jsx(R,{title:"Inactive",children:o.jsx(O,{$color:"#DC2626",children:"5"})})]}),o.jsxs(R,{title:"Deployment & Workload",children:[o.jsxs(Ie,{children:[o.jsx(De,{children:o.jsx(f,{placeholder:"Search by ID, name, email, or mobile...",leftIcon:o.jsx(xe,{size:16}),value:i,onChange:a=>{u(a.target.value),y(1)}})}),o.jsxs(Le,{children:[o.jsx(Ae,{children:o.jsx(X,{options:[{value:"all",label:"All Statuses"},{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:h,onChange:a=>{L(a.target.value),y(1)}})}),!c&&o.jsxs(o.Fragment,{children:[o.jsx(w,{variant:"secondary",leftIcon:o.jsx(he,{size:16}),onClick:p,children:"Bulk Upload"}),o.jsx(w,{variant:"primary",leftIcon:o.jsx(ge,{size:16}),onClick:l,children:"Add Counselor"})]})]})]}),o.jsx(_,{columns:K,data:(n==null?void 0:n.data)??[],isLoading:g,keyExtractor:a=>a.id,pagination:n?{page:n.page,totalPages:n.totalPages,total:n.total,limit:n.limit,onPageChange:a=>y(a),onLimitChange:a=>{k(a),y(1)}}:void 0})]}),o.jsx(Re,{}),o.jsx(Qe,{}),o.jsx(Ge,{}),o.jsx(Ze,{}),o.jsx(eo,{isOpen:!!I,onClose:()=>M(null),counselor:I}),o.jsx(we,{isOpen:!!x,onClose:()=>d(null),onConfirm:m,title:"Delete Counselor Record",description:`Are you sure you want to delete ${x==null?void 0:x.name} (${x==null?void 0:x.counselorId})? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:D.isPending})]})};export{So as CounselorsListPage};
