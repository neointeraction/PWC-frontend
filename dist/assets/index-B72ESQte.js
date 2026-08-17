import{g as i,P as W,e as O,aW as R,j as o,B as w,r as A,aS as ie,aG as le,q as ae,y as ce,aX as de,a as ue,c as me,aY as pe,X as xe,Y as he,U as ge,a1 as fe,F as je}from"./index-DxfnM77Y.js";import{u as ye}from"./useQuery-S0QpHJqA.js";import{u as q}from"./useMutation-DKVYltin.js";import{P as be}from"./PageHeader-BSLXrLt3.js";import{C as T}from"./Card-BOrmQQOE.js";import{I as f}from"./Input-6IZQNX0f.js";import{S as X}from"./Select-B_H_cTqF.js";import{T as Z}from"./Table-CU6TFARv.js";import{B as P}from"./Badge-DIO8ZxMj.js";import"./Table.styles-DJmqs8Mu.js";import"./FileUpload.styles-CfdKEVAN.js";import"./Breadcrumb-CjfZBw3P.js";import{M as V}from"./Modal-C42QGbOr.js";import"./ConfirmDialog-CGkHF8o4.js";import"./Checkbox-CruiFBF4.js";import{A as ve}from"./AlertModal-BzpICTZu.js";import{T as N}from"./Tooltip-Dg_AY9d2.js";import"./SuccessModal.styles-DrpbjAXM.js";import{m as Ce}from"./counselors.mock-CbyQmpLX.js";import{u as J,a as ee,C as oe,o as se,e as te,s as v}from"./types-DJ0oG2tQ.js";import"./Card.styles-BHAEiLrq.js";import"./Badge.styles-CbkHTPcq.js";import"./SuccessModal-IoH6VInA.js";let C=[...Ce];const E={async getAll(e={}){await new Promise(a=>setTimeout(a,200));let n=[...C];if(e.search){const a=e.search.toLowerCase();n=n.filter(p=>p.name.toLowerCase().includes(a)||p.email.toLowerCase().includes(a)||p.counselorId.toLowerCase().includes(a)||p.mobile.includes(a))}e.status&&e.status!=="all"&&(n=n.filter(a=>a.status===e.status));const s=e.page||1,c=e.limit||10,l=n.length,u=Math.ceil(l/c)||1,h=(s-1)*c;return{data:n.slice(h,h+c),total:l,page:s,limit:c,totalPages:u}},async getById(e){await new Promise(s=>setTimeout(s,150));const n=C.find(s=>s.id===e);if(!n)throw new Error("Counselor not found");return n},async create(e){await new Promise(s=>setTimeout(s,300));const n={id:`cns-${Date.now()}`,counselorId:e.counselorId||`C0${C.length+1}`,name:e.name,email:e.email,mobile:e.mobile,pwd:e.pwd||"",status:e.status||"active",createdAt:new Date().toISOString().split("T")[0]};return C.unshift(n),n},async bulkCreate(e){await new Promise(s=>setTimeout(s,400));const n=e.map((s,c)=>({id:`cns-${Date.now()}-${c}`,counselorId:s.counselorId||`C${String(C.length+c+1).padStart(3,"0")}`,name:s.name,email:s.email,mobile:s.mobile,pwd:s.pwd||"",status:s.status||"active",createdAt:new Date().toISOString().split("T")[0]}));return C.unshift(...n),n},async update(e,n){await new Promise(l=>setTimeout(l,250));const s=C.findIndex(l=>l.id===e);if(s===-1)throw new Error("Counselor not found");const c={...C[s],...n};return C[s]=c,c},async delete(e){return await new Promise(n=>setTimeout(n,200)),C=C.filter(n=>n.id!==e),!0}},we=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,$e=i.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,U=i.div`
  font-size: ${({theme:e})=>e.fontSize.display};
  font-weight: 700;
  color: ${({theme:e,$color:n})=>n||e.colors.text};
  margin-top: 4px;
`,Se=i.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.primary};
  text-align: left;
  cursor: pointer;
  transition: color ${({theme:e})=>e.transition.fast};

  &:hover {
    color: ${({theme:e})=>e.colors.primaryHover};
    text-decoration: underline;
  }
`,ke=i.div`
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
`,De=i.div`
  flex: 1;
  max-width: 380px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`,Ie=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Be=i.div`
  width: 180px;
`,Ae=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`,Le=i.div`
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
`,G=i.button`
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
`;i.div`
  display: flex;
  flex-direction: column;
`;i.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`;i.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`;const ne=i.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,ze=i.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,F=i.div`
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
`,Me=i.p`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  margin-bottom: 4px;
`,Fe=i.p`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,Pe=i.h4`
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Te=i.div`
  margin-top: ${({theme:e})=>e.spacing.xs};
  max-height: 220px;
  overflow-y: auto;
`,_=i.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`,Ee=se({counselorId:v().min(1,"Counselor ID is required"),name:v().min(2,"Full name must be at least 2 characters"),email:v().email("Please enter a valid email address"),mobile:v().min(10,"Mobile number must be at least 10 digits"),meetingLink:v().optional(),pwd:v().optional(),status:te(["active","inactive"])}),Re=()=>{var $,j,y,S,k,x;const e=W(),n=O(),{isAddModalOpen:s,closeAddModal:c}=R(),{register:l,handleSubmit:u,control:h,reset:B,formState:{errors:a}}=J({resolver:ee(Ee),defaultValues:{counselorId:"",name:"",email:"",mobile:"",meetingLink:"",pwd:"",status:"active"}}),p=q({mutationFn:E.create,onSuccess:d=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Added",`Successfully registered counselor ${d.name} (${d.counselorId}).`),B(),c()},onError:()=>{n.error("Error","Failed to register new counselor.")}}),L=d=>{p.mutate(d)};return o.jsx(V,{isOpen:s,onClose:c,title:"Add New Counselor",subtitle:"Register a new counselor account into the platform",size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:c,children:"Cancel"}),o.jsx(w,{type:"submit",form:"add-counselor-form",variant:"primary",isLoading:p.isPending,children:"Save Counselor"})]}),children:o.jsxs(ne,{id:"add-counselor-form",onSubmit:u(L),children:[o.jsx(f,{label:"Counselor ID",placeholder:"e.g. C014",error:($=a.counselorId)==null?void 0:$.message,...l("counselorId")}),o.jsx(f,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(j=a.name)==null?void 0:j.message,...l("name")}),o.jsx(f,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(y=a.email)==null?void 0:y.message,...l("email")}),o.jsx(f,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(S=a.mobile)==null?void 0:S.message,...l("mobile")}),o.jsx(f,{label:"GMeet / Zoom Link",placeholder:"e.g. https://meet.google.com/abc-defg-hij",error:(k=a.meetingLink)==null?void 0:k.message,...l("meetingLink")}),o.jsx(f,{label:"Password / PWD (Optional)",type:"password",placeholder:"Leave blank for auto-generated password",error:(x=a.pwd)==null?void 0:x.message,...l("pwd")}),o.jsx(oe,{name:"status",control:h,render:({field:d})=>{var D;return o.jsx(X,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:d.value,onChange:d.onChange,error:(D=a.status)==null?void 0:D.message})}})]})})},Ve=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ne=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
`,Ue=i.div`
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
`,We=i.div`
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
`,Oe=i.div`
  font-size: 32px;
  color: ${({theme:e})=>e.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`,qe=i.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  color: ${({theme:e})=>e.colors.text};
`,He=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({theme:e})=>e.spacing.sm};
`,Qe=()=>{const e=W(),n=O(),s=A.useRef(null),{isBulkUploadModalOpen:c,closeBulkUploadModal:l}=R(),[u,h]=A.useState(null),[B,a]=A.useState(!1),[p,L]=A.useState([]),$=q({mutationFn:E.bulkCreate,onSuccess:t=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Bulk Upload Complete",`Successfully imported ${t.length} counselor records.`),j(),l()},onError:()=>{n.error("Error","Failed to bulk upload counselor records.")}}),j=()=>{h(null),L([]),s.current&&(s.current.value="")},y=()=>{const t=`Counsellor ID,PWD,Counsellor Name,Mobile No.,Email ID
C014,,Anil Sharma,9876543210,anil.sharma@example.com
C015,,Sunita Roy,9812345678,sunita.roy@example.com
`,g=new Blob([t],{type:"text/csv;charset=utf-8;"}),I=URL.createObjectURL(g),m=document.createElement("a");m.href=I,m.setAttribute("download","counselors_template.csv"),document.body.appendChild(m),m.click(),document.body.removeChild(m)},S=t=>{const g=t.split(`
`).map(m=>m.trim()).filter(m=>m.length>0);if(g.length<=1){n.error("Invalid File","The CSV file appears to be empty or missing headers.");return}const I=[];for(let m=1;m<g.length;m++){const b=g[m].split(",").map(re=>re.trim()),H=b[0]||`C0${m+13}`,r=b[2]||b[1]||"",z=b[3]||b[2]||"",Q=b[4]||b[3]||"",Y=!!(r&&Q&&Q.includes("@"));I.push({counselorId:H,name:r||"Unknown Counselor",mobile:z||"N/A",email:Q||"invalid@example.com",status:"active",isValid:Y,validationError:Y?void 0:"Missing required name or email format"})}L(I)},k=t=>{if(!t.name.endsWith(".csv")&&!t.name.endsWith(".txt")){n.error("Unsupported File","Please upload a CSV or TXT file.");return}h(t);const g=new FileReader;g.onload=I=>{var b;const m=(b=I.target)==null?void 0:b.result;S(m)},g.readAsText(t)},x=t=>{t.preventDefault(),a(!1),t.dataTransfer.files&&t.dataTransfer.files[0]&&k(t.dataTransfer.files[0])},d=()=>{const t=p.filter(g=>g.isValid).map(({isValid:g,validationError:I,...m})=>m);if(t.length===0){n.error("No Valid Rows","Please ensure your CSV contains valid counselor records.");return}$.mutate(t)},D=[{key:"counselorId",header:"ID",width:"90px",render:t=>o.jsx("strong",{children:t.counselorId})},{key:"name",header:"Counselor Name",render:t=>t.name},{key:"mobile",header:"Mobile No.",render:t=>t.mobile},{key:"email",header:"Email ID",render:t=>t.email},{key:"isValid",header:"Validation",width:"110px",render:t=>o.jsxs(P,{variant:t.isValid?"success":"danger",children:[t.isValid?o.jsx(_,{children:o.jsx(ce,{size:14})}):o.jsx(_,{children:o.jsx(de,{size:14})}),t.isValid?"Valid":"Invalid"]})}],M=p.filter(t=>t.isValid).length;return o.jsx(V,{isOpen:c,onClose:()=>{j(),l()},title:"Bulk Upload Counselors",subtitle:"Upload a CSV file containing counselor records to import in bulk",size:"lg",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:()=>{j(),l()},children:"Cancel"}),o.jsxs(w,{type:"button",variant:"primary",disabled:p.length===0||M===0,isLoading:$.isPending,onClick:d,children:["Import ",M," Counselor",M!==1?"s":""]})]}),children:o.jsxs(Ve,{children:[o.jsxs(Ne,{children:[o.jsxs(Ue,{children:[o.jsx("h4",{children:"CSV Template Format"}),o.jsx("p",{children:"Headers required: Counsellor ID, PWD, Counsellor Name, Mobile No., Email ID"})]}),o.jsx(w,{variant:"secondary",size:"sm",leftIcon:o.jsx(ie,{size:16}),onClick:y,children:"Download Sample CSV"})]}),o.jsx("input",{type:"file",ref:s,accept:".csv,.txt",style:{display:"none"},onChange:t=>{t.target.files&&t.target.files[0]&&k(t.target.files[0])}}),o.jsxs(We,{$isDragging:B,$hasFile:!!u,onDragOver:t=>{t.preventDefault(),a(!0)},onDragLeave:()=>a(!1),onDrop:x,onClick:()=>{var t;return(t=s.current)==null?void 0:t.click()},children:[o.jsx(Oe,{children:o.jsx(le,{size:32})}),u?o.jsxs(qe,{children:[o.jsx(ae,{size:18}),u.name," (",(u.size/1024).toFixed(1)," KB)"]}):o.jsxs("div",{children:[o.jsx(Me,{children:"Click to browse or drag & drop CSV file here"}),o.jsx(Fe,{children:"Supports CSV format up to 5MB"})]})]}),p.length>0&&o.jsxs("div",{children:[o.jsxs(He,{children:[o.jsxs(Pe,{children:["Parsed Rows Preview (",p.length," total)"]}),o.jsxs(P,{variant:"info",children:[M," Ready for import"]})]}),o.jsx(Te,{children:o.jsx(Z,{columns:D,data:p,keyExtractor:t=>t.counselorId||t.email})})]})]})})},Ge=se({counselorId:v().min(1,"Counselor ID is required"),name:v().min(2,"Full name must be at least 2 characters"),email:v().email("Please enter a valid email address"),mobile:v().min(10,"Mobile number must be at least 10 digits"),meetingLink:v().optional(),pwd:v().optional(),status:te(["active","inactive"])}),Ke=()=>{var $,j,y,S,k,x;const e=W(),n=O(),{selectedCounselorForEdit:s,closeEditModal:c}=R(),{register:l,handleSubmit:u,control:h,reset:B,formState:{errors:a}}=J({resolver:ee(Ge)});A.useEffect(()=>{s&&B({counselorId:s.counselorId,name:s.name,email:s.email,mobile:s.mobile,meetingLink:s.meetingLink||"",pwd:s.pwd||"",status:s.status})},[s,B]);const p=q({mutationFn:d=>E.update(s.id,d),onSuccess:d=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Updated",`Successfully updated profile for ${d.name}.`),c()},onError:()=>{n.error("Error","Failed to update counselor profile.")}}),L=d=>{s&&p.mutate(d)};return o.jsx(V,{isOpen:!!s,onClose:c,title:"Edit Counselor Profile",subtitle:`Update profile and contact details for ${(s==null?void 0:s.name)||""}`,size:"md",footer:o.jsxs(o.Fragment,{children:[o.jsx(w,{type:"button",variant:"secondary",onClick:c,children:"Cancel"}),o.jsx(w,{type:"submit",form:"edit-counselor-form",variant:"primary",isLoading:p.isPending,children:"Save Changes"})]}),children:o.jsxs(ne,{id:"edit-counselor-form",onSubmit:u(L),children:[o.jsx(f,{label:"Counselor ID",placeholder:"e.g. C001",error:($=a.counselorId)==null?void 0:$.message,...l("counselorId")}),o.jsx(f,{label:"Counselor Name",placeholder:"e.g. Anil Iyer",error:(j=a.name)==null?void 0:j.message,...l("name")}),o.jsx(f,{label:"Email Address",type:"email",placeholder:"e.g. anil.iyer@example.com",error:(y=a.email)==null?void 0:y.message,...l("email")}),o.jsx(f,{label:"Mobile Number",placeholder:"e.g. 9819093786",error:(S=a.mobile)==null?void 0:S.message,...l("mobile")}),o.jsx(f,{label:"GMeet / Zoom Link",placeholder:"e.g. https://meet.google.com/abc-defg-hij",error:(k=a.meetingLink)==null?void 0:k.message,...l("meetingLink")}),o.jsx(f,{label:"Password / PWD",type:"password",placeholder:"Enter new password to update",error:(x=a.pwd)==null?void 0:x.message,...l("pwd")}),o.jsx(oe,{name:"status",control:h,render:({field:d})=>{var D;return o.jsx(X,{label:"Status",options:[{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:d.value,onChange:d.onChange,error:(D=a.status)==null?void 0:D.message})}})]})})},Xe=()=>{const{selectedCounselorForView:e,closeViewModal:n}=R();return e?o.jsx(V,{isOpen:!!e,onClose:n,title:"Counselor Details",subtitle:`Viewing account record for ${e.name}`,size:"md",footer:o.jsx(w,{variant:"secondary",onClick:n,children:"Close"}),children:o.jsxs(ze,{children:[o.jsxs(F,{children:[o.jsx("label",{children:"Counselor ID"}),o.jsx("p",{children:e.counselorId})]}),o.jsxs(F,{children:[o.jsx("label",{children:"Counselor Name"}),o.jsx("p",{children:e.name})]}),o.jsxs(F,{children:[o.jsx("label",{children:"Email Address"}),o.jsx("p",{children:e.email})]}),o.jsxs(F,{children:[o.jsx("label",{children:"Mobile Number"}),o.jsx("p",{children:e.mobile})]}),o.jsxs(F,{children:[o.jsx("label",{children:"GMeet / Zoom Link"}),o.jsx("p",{children:e.meetingLink?o.jsx("a",{href:e.meetingLink,target:"_blank",rel:"noopener noreferrer",style:{color:"#5D2384",textDecoration:"underline"},children:e.meetingLink}):"N/A"})]}),o.jsxs(F,{children:[o.jsx("label",{children:"Account Status"}),o.jsx("div",{children:o.jsx(P,{variant:e.status==="active"?"success":"default",dot:!0,children:e.status.toUpperCase()})})]}),o.jsxs(F,{children:[o.jsx("label",{children:"Registered Date"}),o.jsx("p",{children:e.createdAt||"N/A"})]})]})}):null},Ze=i.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Ye=i.div`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primaryMuted};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing.md};
  flex-wrap: wrap;
`,_e=i.div`
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
`,K=i.div`
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
`,Je=i.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({theme:e})=>e.spacing.md};
`,eo=({isOpen:e,onClose:n,counselor:s})=>{if(!s)return null;const c=s.projectsList&&s.projectsList.length>0?s.projectsList:[{schoolName:s.projectDeployedName||"St. Xavier's College, Mumbai",totalAllotted:s.totalAllotted||0,session1Balance:s.session1Balance||0,session2Balance:s.session2Balance||0}],l=[{key:"schoolName",header:"Schools",render:u=>o.jsx("strong",{children:u.schoolName})},{key:"totalAllotted",header:"Total Allotted",render:u=>o.jsx("span",{children:u.totalAllotted})},{key:"session1Balance",header:"Session 1 Balance",render:u=>o.jsx("span",{children:u.session1Balance})},{key:"session2Balance",header:"Session 2 Balance",render:u=>o.jsx("span",{children:u.session2Balance})}];return o.jsx(V,{isOpen:e,onClose:n,title:"Deployment & Workload Breakdown",size:"lg",children:o.jsxs(Ze,{children:[o.jsxs(Ye,{children:[o.jsxs(_e,{children:[o.jsx("span",{children:"Counsellor Details"}),o.jsxs("span",{children:[s.name," (",s.counselorId,")"]})]}),o.jsxs("div",{style:{display:"flex",gap:"24px"},children:[o.jsxs(K,{children:[o.jsx("span",{children:"Total Allotted"}),o.jsx("span",{children:s.totalAllotted??62})]}),o.jsxs(K,{children:[o.jsx("span",{children:"S1 Balance"}),o.jsx("span",{children:s.session1Balance??18})]}),o.jsxs(K,{children:[o.jsx("span",{children:"S2 Balance"}),o.jsx("span",{children:s.session2Balance??26})]})]})]}),o.jsx(Z,{columns:l,data:c,keyExtractor:u=>u.schoolName}),o.jsx(Je,{children:o.jsx(w,{variant:"secondary",onClick:n,children:"Close Breakdown"})})]})})},So=()=>{const e=W(),n=O(),{user:s}=ue(),c=!!(s!=null&&s.isViewOnly),{searchQuery:l,setSearchQuery:u,statusFilter:h,setStatusFilter:B,openAddModal:a,openBulkUploadModal:p,openEditModal:L,openViewModal:$}=R(),[j,y]=A.useState(1),[S,k]=A.useState(10),[x,d]=A.useState(null),[D,M]=A.useState(null),{data:t,isLoading:g}=ye({queryKey:["counselors",l,h,j,S],queryFn:()=>E.getAll({search:l,status:h,page:j,limit:S})}),I=q({mutationFn:E.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["counselors"]}),n.success("Counselor Deleted","Successfully removed counselor record."),d(null)},onError:()=>{n.error("Error","Failed to delete counselor record."),d(null)}}),m=()=>{x&&I.mutate(x.id)},b=r=>{const z=r.deploymentStatus||(r.status==="active"?"deployed":"inactive");switch(z){case"deployed":return o.jsx(P,{variant:"success",size:"sm",dot:!0,children:"Deployed"});case"bench":return o.jsx(P,{variant:"info",size:"sm",dot:!0,children:"Bench"});case"inactive":return o.jsx(P,{variant:"danger",size:"sm",dot:!0,children:"Inactive"});default:return o.jsx(P,{variant:"default",size:"sm",children:z})}},H=[{key:"counselorId",header:"ID",width:"80px",render:r=>o.jsx("strong",{children:r.counselorId})},{key:"name",header:"Counsellor",render:r=>o.jsx("strong",{children:r.name})},{key:"projectDeployed",header:"Project Deployed",render:r=>{const z=r.projectDeployedName||(r.deploymentStatus==="bench"?"— Unassigned —":"—");return r.deploymentStatus==="inactive"||z==="—"?o.jsx("span",{style:{color:"#94A3B8"},children:z}):o.jsx(N,{content:"Click to view deployment & workload breakdown",children:o.jsx(Se,{type:"button",onClick:()=>M(r),children:z})})}},{key:"totalAllotted",header:"Total Allotted",render:r=>o.jsx("span",{children:r.totalAllotted?`${r.totalAllotted} allotted`:"0 allotted"})},{key:"session1Balance",header:"Session 1 Balance",render:r=>o.jsx("span",{children:r.session1Balance?`${r.session1Balance} left`:"—"})},{key:"session2Balance",header:"Session 2 Balance",render:r=>o.jsx("span",{children:r.session2Balance?`${r.session2Balance} left`:"—"})},{key:"status",header:"Status",width:"100px",render:r=>b(r)},{key:"actions",header:"Actions",width:"120px",render:r=>o.jsxs(Le,{children:[o.jsx(N,{content:"View Details",children:o.jsx(G,{"aria-label":"View Details",onClick:()=>$(r),children:o.jsx(ge,{size:16})})}),!c&&o.jsxs(o.Fragment,{children:[o.jsx(N,{content:"Edit Counselor",children:o.jsx(G,{"aria-label":"Edit Counselor",onClick:()=>L(r),children:o.jsx(fe,{size:16})})}),o.jsx(N,{content:"Delete Counselor",children:o.jsx(G,{"aria-label":"Delete Counselor",onClick:()=>d(r),children:o.jsx(je,{size:16})})})]})]})}];return o.jsxs(we,{children:[o.jsx(be,{title:"Counsellor Directory",subtitle:"Deployment & Workload overview for institution career counselors",breadcrumbs:[{label:"Dashboard",href:me.DASHBOARD},{label:"Counselors List"}],actions:c?void 0:o.jsxs(Ae,{children:[o.jsx(w,{variant:"secondary",leftIcon:o.jsx(pe,{size:16}),onClick:p,children:"Bulk Upload"}),o.jsx(w,{variant:"primary",leftIcon:o.jsx(xe,{size:16}),onClick:a,children:"Add Counselor"})]})}),o.jsxs($e,{children:[o.jsx(T,{title:"Total Empanelled",children:o.jsx(U,{children:"58"})}),o.jsx(T,{title:"Deployed",children:o.jsx(U,{$color:"#16A34A",children:"44"})}),o.jsx(T,{title:"On Bench",children:o.jsx(U,{$color:"#0284C7",children:"9"})}),o.jsx(T,{title:"Inactive",children:o.jsx(U,{$color:"#DC2626",children:"5"})})]}),o.jsxs(T,{title:"Deployment & Workload",children:[o.jsxs(ke,{children:[o.jsx(De,{children:o.jsx(f,{placeholder:"Search by ID, name, email, or mobile...",leftIcon:o.jsx(he,{size:16}),value:l,onChange:r=>{u(r.target.value),y(1)}})}),o.jsx(Ie,{children:o.jsx(Be,{children:o.jsx(X,{options:[{value:"all",label:"All Statuses"},{value:"active",label:"Active"},{value:"inactive",label:"Inactive"}],value:h,onChange:r=>{B(r.target.value),y(1)}})})})]}),o.jsx(Z,{columns:H,data:(t==null?void 0:t.data)??[],isLoading:g,keyExtractor:r=>r.id,pagination:t?{page:t.page,totalPages:t.totalPages,total:t.total,limit:t.limit,onPageChange:r=>y(r),onLimitChange:r=>{k(r),y(1)}}:void 0})]}),o.jsx(Re,{}),o.jsx(Qe,{}),o.jsx(Ke,{}),o.jsx(Xe,{}),o.jsx(eo,{isOpen:!!D,onClose:()=>M(null),counselor:D}),o.jsx(ve,{isOpen:!!x,onClose:()=>d(null),onConfirm:m,title:"Delete Counselor Record",description:`Are you sure you want to delete ${x==null?void 0:x.name} (${x==null?void 0:x.counselorId})? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:I.isPending})]})};export{So as CounselorsListPage};
