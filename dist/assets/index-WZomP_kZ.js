import{g as c,j as n,P as N,e as U,Q as M,B as A,r as O,S as K,T as me,U as R,V as pe,W as ge,a as xe,X as he,Y as ye,Z as Q,_ as H,$ as Y,a0 as fe,a1 as be,F as we}from"./index-8F0JLEEw.js";import{u as je}from"./useQuery-C0nIzzYp.js";import{u as I}from"./useMutation-DeU1Ru1N.js";import{P as Ce}from"./PageHeader-KpQVPwcf.js";import{C as ve}from"./Card-NeciUoS1.js";import{I as v}from"./Input-B-q5qiE9.js";import{T as Te}from"./Table-De9tPJgC.js";import{B as C}from"./Badge-BUMvygFF.js";import{S as D}from"./Select-DOe36KaS.js";import"./Table.styles-ChZe2G4O.js";import{T as Ee,a as Ae,b as $e,C as Se,A as ze}from"./FileUpload.styles-KF3-WQbH.js";import"./Breadcrumb-BKyN92ya.js";import{M as F}from"./Modal-CytuL-Vc.js";import"./ConfirmDialog-xc0s7d87.js";import"./Checkbox-CuNKoPRx.js";import{A as ke}from"./AlertModal-Dy1x5okA.js";import{T as k}from"./Tooltip-K2tZS8Xo.js";import"./SuccessModal.styles-DHiS2Can.js";import{u as ne,a as te,o as se,e as L,s as b,b as ae}from"./types-ClZn0dKx.js";import"./Card.styles-BzuSn5_T.js";import"./Badge.styles-DMnJVozC.js";import"./SuccessModal-BKQmnmgg.js";const Pe=[{id:"usr-101",name:"Sunita Sharma",email:"sunita.sharma@pwc-global.com",username:"sunita.sharma@pwc-global.com",phone:"+1 (555) 019-2834",userCategory:"pwc",roleLabel:"Super Admin",organizationName:"kREATE Global Engine",status:"active",createdAt:"2025-01-15",lastActive:"Today, 10:42 AM",generatedPassword:"kREATE@User2026!"},{id:"usr-102",name:"Vikram Mehta (View Only)",email:"viewer@pwc.com",username:"viewer@pwc.com",phone:"+91 98765 43210",userCategory:"pwc",roleLabel:"View Only Tenant",organizationName:"kREATE Global Engine",status:"active",isViewOnly:!0,createdAt:"2025-02-01",lastActive:"Today, 11:15 AM",generatedPassword:"ViewOnly@Key2026!"},{id:"usr-103",name:"Pooja Verma (View Only)",email:"pooja.verma@pwc.com",username:"pooja.verma@pwc.com",phone:"+91 98123 45678",userCategory:"pwc",roleLabel:"View Only Tenant",organizationName:"kREATE Global Engine",status:"active",isViewOnly:!0,createdAt:"2025-02-05",lastActive:"Yesterday, 04:20 PM",generatedPassword:"ViewOnly@Pooja2026!"}];let h=Pe.filter(e=>e.userCategory!=="institution"&&e.userCategory!=="counselor");const _=e=>{const a=e==="pwc"?"kREATE":e==="view_only"?"ViewOnly":e==="counselor"?"Cnslt":"Inst",s=Math.floor(1e3+Math.random()*9e3);return`${a}@Key${s}!`},z={getAll:async(e={})=>{await new Promise(o=>setTimeout(o,300));let a=[...h];if(e.category&&e.category!=="all"&&(a=a.filter(o=>o.userCategory===e.category)),e.status&&e.status!=="all"&&(a=a.filter(o=>o.status===e.status)),e.search){const o=e.search.toLowerCase();a=a.filter(u=>u.name.toLowerCase().includes(o)||u.email.toLowerCase().includes(o)||u.roleLabel.toLowerCase().includes(o)||u.organizationName&&u.organizationName.toLowerCase().includes(o))}const s=e.page??1,r=e.limit??10,t=a.length,d=Math.ceil(t/r),p=(s-1)*r;return{data:a.slice(p,p+r),total:t,page:s,limit:r,totalPages:d}},getById:async e=>{await new Promise(s=>setTimeout(s,200));const a=h.find(s=>s.id===e);if(!a)throw new Error("Tenant user not found");return{...a}},getByEmailOrUsername:async e=>{const a=e.toLowerCase().trim();return h.find(s=>s.email.toLowerCase()===a||s.username&&s.username.toLowerCase()===a)},create:async e=>{if(await new Promise(r=>setTimeout(r,400)),e.userCategory==="pwc"&&h.find(t=>t.userCategory==="pwc"))throw new Error("A kREATE User already exists. Only 1 kREATE User is allowed on the system.");const a=e.generatedPassword||_(e.userCategory),s={id:`usr-${Date.now()}`,...e,username:e.username||e.email,generatedPassword:a,createdAt:new Date().toISOString().slice(0,10),lastActive:"Just now"};return h=[s,...h],s},update:async(e,a)=>{await new Promise(t=>setTimeout(t,300));const s=h.findIndex(t=>t.id===e);if(s===-1)throw new Error("Tenant user not found");const r={...h[s],...a};return h[s]=r,r},regeneratePassword:async e=>{const a=h.find(r=>r.id===e);if(!a)throw new Error("Tenant user not found");const s=_(a.userCategory);return z.update(e,{generatedPassword:s})},delete:async e=>{await new Promise(a=>setTimeout(a,300)),h=h.filter(a=>a.id!==e)},updateStatus:async(e,a)=>z.update(e,{status:a})},Re=c.div`
  display: flex;
  flex-direction: column;
`,Oe=c.div`
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
`,Me=c.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`;c.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`;c.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;const Ve=c.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,E=c.div`
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
`,Le=c.div`
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
`,P=c.button`
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

  &:hover:not(:disabled) {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    border-color: ${({theme:e})=>e.colors.border};
    color: ${({theme:e})=>e.colors.textSecondary};
    background-color: ${({theme:e})=>e.colors.surface};
  }
`,Ne=c.div`
  display: flex;
  flex-direction: column;
`,Ue=c.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Ie=c.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,ie=c.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,re=c.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,J=c.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Fe=c.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({theme:e})=>e.spacing.xs};
`,Be=c.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,V=c.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`;function De({tabs:e,activeTab:a,onChange:s,layoutId:r="activeTabIndicator"}){return n.jsx(Ee,{children:e.map(t=>{const d=t.id===a,p=!!(t.disabled||t.comingSoon);return n.jsxs(Ae,{$active:d,$disabled:p,onClick:()=>{p||s(t.id)},type:"button",disabled:p,children:[t.icon,n.jsx("span",{children:t.label}),typeof t.count=="number"&&n.jsx($e,{$active:d,children:t.count}),t.comingSoon&&n.jsx(Se,{children:t.comingSoonText||"Coming Soon"}),d&&!p&&n.jsx(ze,{layoutId:r,transition:{type:"spring",stiffness:400,damping:35}})]},t.id)})})}const Ge=se({name:b().min(2,"Name must be at least 2 characters"),email:b().email("Please enter a valid email address"),phone:b().optional(),userCategory:L(["pwc","institution","counselor"]),isViewOnly:ae().optional(),roleLabel:b().optional(),organizationName:b().optional(),status:L(["active","inactive","pending"]).optional()}),qe=()=>{var j,f,T,$,x;const e=N(),a=U(),{isAddModalOpen:s,closeAddModal:r}=M(),{register:t,handleSubmit:d,watch:p,reset:w,formState:{errors:o}}=ne({resolver:te(Ge),defaultValues:{name:"",email:"",phone:"",userCategory:"pwc",isViewOnly:!1,roleLabel:"kREATE Default User",organizationName:"",status:"active"}}),u=p("userCategory"),y=I({mutationFn:z.create,onSuccess:m=>{e.invalidateQueries({queryKey:["tenant-records"]}),a.success("Tenant User Created",`Successfully added ${m.name} as ${m.userCategory.toUpperCase()} user.`),w(),r()},onError:m=>{a.error("Error",m.message||"Failed to create tenant user record. Please try again.")}}),g=m=>{y.mutate({...m,status:"active",roleLabel:m.userCategory==="pwc"?m.isViewOnly?"View Only Tenant":"Admin":m.userCategory==="institution"?"Institution User":"Counselor",organizationName:m.userCategory==="pwc"?"kREATE Global Engine":m.organizationName||"kREATE Network Partner"})};return n.jsx(F,{isOpen:s,onClose:r,title:"Add New Tenant",subtitle:"Register a kREATE, Institution, or Counselor tenant account",size:"md",footer:n.jsxs(n.Fragment,{children:[n.jsx(A,{type:"button",variant:"secondary",onClick:r,children:"Cancel"}),n.jsx(A,{type:"submit",form:"add-tenant-form",variant:"primary",isLoading:y.isPending,children:"Create Tenant Account"})]}),children:n.jsxs(ie,{id:"add-tenant-form",onSubmit:d(g),children:[n.jsx(v,{label:"Full Name",placeholder:"e.g. Alex Morgan",error:(j=o.name)==null?void 0:j.message,...t("name")}),n.jsx(v,{label:"Email Address",type:"email",placeholder:"e.g. alex.morgan@example.com",error:(f=o.email)==null?void 0:f.message,...t("email")}),n.jsx(v,{label:"Phone Number (Optional)",placeholder:"e.g. +1 (555) 123-4567",error:(T=o.phone)==null?void 0:T.message,...t("phone")}),n.jsx(D,{label:"Tenant Type",options:[{value:"pwc",label:"kREATE (Admin)"},{value:"institution",label:"Institution (Admin)",disabled:!0},{value:"counselor",label:"Counselor (Career Advisor)",disabled:!0}],error:($=o.userCategory)==null?void 0:$.message,...t("userCategory")}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginTop:"4px"},children:[n.jsx("input",{type:"checkbox",id:"add-tenant-is-view-only",style:{width:"18px",height:"18px",accentColor:"#2563EB",cursor:"pointer"},...t("isViewOnly")}),n.jsx("label",{htmlFor:"add-tenant-is-view-only",style:{fontSize:"14px",fontWeight:500,color:"#334155",cursor:"pointer"},children:"View Only Mode (Grant read-only access without edit or delete permissions)"})]}),u!=="pwc"&&n.jsx(v,{label:"Organization / Institution Name",placeholder:"e.g. Phoenix Academy or Horizon High School",error:(x=o.organizationName)==null?void 0:x.message,...t("organizationName")})]})})},We=se({name:b().min(2,"Name must be at least 2 characters"),email:b().email("Please enter a valid email address"),phone:b().optional(),userCategory:L(["pwc","institution","counselor"]),isViewOnly:ae().optional(),roleLabel:b().optional(),organizationName:b().optional(),status:L(["active","inactive","pending"])}),Ke=()=>{var f,T,$,x,m,l;const e=N(),a=U(),{isEditModalOpen:s,closeEditModal:r,selectedUser:t}=M(),{register:d,handleSubmit:p,watch:w,reset:o,formState:{errors:u}}=ne({resolver:te(We)}),y=w("userCategory");O.useEffect(()=>{t&&o({name:t.name,email:t.email,phone:t.phone||"",userCategory:t.userCategory,isViewOnly:!!t.isViewOnly,roleLabel:t.roleLabel,organizationName:t.organizationName||"",status:t.status})},[t,o]);const g=I({mutationFn:S=>z.update(t.id,S),onSuccess:S=>{e.invalidateQueries({queryKey:["tenant-records"]}),a.success("Tenant User Updated",`Updated account details for ${S.name}.`),r()},onError:()=>{a.error("Error","Failed to update tenant user. Please try again.")}}),j=S=>{g.mutate(S)};return n.jsx(F,{isOpen:s,onClose:r,title:"Edit Tenant Profile",subtitle:`Modify account attributes and access permissions for ${(t==null?void 0:t.name)||"tenant user"}`,size:"md",footer:n.jsxs(n.Fragment,{children:[n.jsx(A,{type:"button",variant:"secondary",onClick:r,children:"Cancel"}),n.jsx(A,{type:"submit",form:"edit-tenant-form",variant:"primary",isLoading:g.isPending,children:"Save Changes"})]}),children:n.jsxs(ie,{id:"edit-tenant-form",onSubmit:p(j),children:[n.jsx(v,{label:"Full Name",error:(f=u.name)==null?void 0:f.message,...d("name")}),n.jsx(v,{label:"Email Address",type:"email",error:(T=u.email)==null?void 0:T.message,...d("email")}),n.jsx(v,{label:"Phone Number",error:($=u.phone)==null?void 0:$.message,...d("phone")}),n.jsx(D,{label:"User Type",options:[{value:"pwc",label:"kREATE User (Admin)"},{value:"institution",label:"Institution User (Admin)",disabled:!0},{value:"counselor",label:"Counselor User (Career Advisor / Counselor)",disabled:!0}],error:(x=u.userCategory)==null?void 0:x.message,...d("userCategory")}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginTop:"4px"},children:[n.jsx("input",{type:"checkbox",id:"edit-tenant-is-view-only",style:{width:"18px",height:"18px",accentColor:"#2563EB",cursor:"pointer"},...d("isViewOnly")}),n.jsx("label",{htmlFor:"edit-tenant-is-view-only",style:{fontSize:"14px",fontWeight:500,color:"#334155",cursor:"pointer"},children:"View Only Mode (Grant read-only access without edit or delete permissions)"})]}),y!=="pwc"&&n.jsx(v,{label:"Organization / Institution Name",error:(m=u.organizationName)==null?void 0:m.message,...d("organizationName")}),n.jsx(D,{label:"Account Status",options:[{value:"active",label:"Active"},{value:"pending",label:"Pending Invitation"},{value:"inactive",label:"Inactive"}],error:(l=u.status)==null?void 0:l.message,...d("status")})]})})},Qe=()=>{const{isViewModalOpen:e,closeViewModal:a,selectedUser:s}=M();if(!s)return null;const r=s.userCategory==="pwc"?"primary":s.userCategory==="institution"?"info":"success",t=s.userCategory==="pwc"?"kREATE User":s.userCategory==="institution"?"Institution User":"Counselor User";return n.jsx(F,{isOpen:e,onClose:a,title:"Tenant Profile Overview",subtitle:`Detailed metadata for ${s.name}`,size:"md",children:n.jsxs(re,{children:[n.jsxs(Ve,{children:[n.jsxs(E,{children:[n.jsx("label",{children:"Full Name"}),n.jsx("p",{children:s.name})]}),n.jsxs(E,{children:[n.jsx("label",{children:"User Category"}),n.jsx("div",{children:n.jsx(C,{variant:r,children:t})})]}),n.jsxs(E,{children:[n.jsx("label",{children:"Access Mode"}),n.jsx("div",{children:n.jsx(C,{variant:s.isViewOnly?"warning":"primary",children:s.isViewOnly?"View Only (Read-Only)":"Full Access (Admin)"})})]}),n.jsxs(E,{children:[n.jsx("label",{children:"Email Address"}),n.jsx("p",{children:s.email})]}),n.jsxs(E,{children:[n.jsx("label",{children:"Phone Number"}),n.jsx("p",{children:s.phone||"N/A"})]}),n.jsxs(E,{children:[n.jsx("label",{children:"Organization / Entity"}),n.jsx("p",{children:s.organizationName||"kREATE Global Engine"})]}),n.jsxs(E,{children:[n.jsx("label",{children:"Status"}),n.jsx("div",{children:n.jsx(C,{variant:s.status==="active"?"success":s.status==="pending"?"warning":"default",dot:!0,children:s.status.toUpperCase()})})]}),n.jsxs(E,{children:[n.jsx("label",{children:"Created On"}),n.jsx("p",{children:s.createdAt})]})]}),n.jsx(Fe,{children:n.jsx(A,{variant:"secondary",onClick:a,children:"Close"})})]})})},He=c.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,X=c.div`
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
`,Z=c.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,ee=c.div`
  flex: 1;
  font-family: monospace;
  font-size: ${({theme:e})=>e.fontSize.sm};
  padding: 8px 12px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  color: ${({theme:e})=>e.colors.text};
  user-select: all;
`,B=c.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.textSecondary};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transition.fast};

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    color: ${({theme:e})=>e.colors.primary};
    background-color: ${({theme:e})=>e.colors.primaryLight};
  }
`,Ye=()=>{const e=N(),a=U(),{isCredentialsModalOpen:s,closeCredentialsModal:r,selectedUser:t}=M(),[d,p]=O.useState(!1),w=I({mutationFn:g=>z.regeneratePassword(g),onSuccess:g=>{e.invalidateQueries({queryKey:["tenant-records"]}),a.success("Credentials Regenerated",`New password generated for ${g.name}.`)},onError:()=>{a.error("Error","Failed to regenerate credentials.")}});if(!t)return null;const o=(g,j)=>{navigator.clipboard.writeText(g),a.info("Copied to Clipboard",`${j} has been copied.`)},u=t.username||t.email,y=t.generatedPassword||"kREATE@User2026!";return n.jsx(F,{isOpen:s,onClose:r,title:"Tenant Login Credentials",subtitle:`Security login details for ${t.name}`,size:"md",children:n.jsxs(re,{children:[n.jsxs(J,{children:[n.jsx("div",{children:n.jsx(Be,{children:t.name})}),n.jsxs(C,{variant:t.userCategory==="pwc"?"primary":"info",children:[t.userCategory.toUpperCase()," USER"]})]}),n.jsxs(He,{children:[n.jsxs(X,{children:[n.jsx("label",{children:"Login Email / Username"}),n.jsxs(Z,{children:[n.jsx(ee,{children:u}),n.jsx(B,{title:"Copy Username",onClick:()=>o(u,"Username/Email"),children:n.jsx(K,{size:18})})]})]}),n.jsxs(X,{children:[n.jsx("label",{children:"Generated Password"}),n.jsxs(Z,{children:[n.jsx(ee,{children:d?y:"••••••••••••"}),n.jsx(B,{title:d?"Hide Password":"Show Password",onClick:()=>p(!d),children:d?n.jsx(me,{size:18}):n.jsx(R,{size:18})}),n.jsx(B,{title:"Copy Password",onClick:()=>o(y,"Password"),children:n.jsx(K,{size:18})})]})]})]}),n.jsxs(J,{children:[n.jsx(A,{variant:"secondary",size:"sm",leftIcon:n.jsx(pe,{size:16}),isLoading:w.isPending,onClick:()=>w.mutate(t.id),children:"Regenerate Password"}),n.jsx(A,{variant:"primary",size:"sm",leftIcon:n.jsx(ge,{size:16}),onClick:()=>{const g=`kREATE Platform Credentials:
Name: ${t.name}
Username: ${u}
Password: ${y}
Portal: kREATE Career Counselling Platform`;o(g,"Full Credentials Package")},children:"Copy Full Credentials Package"})]})]})})},bn=()=>{const e=N(),a=U(),{user:s}=xe(),r=!!(s!=null&&s.isViewOnly),{activeCategory:t,setActiveCategory:d,searchQuery:p,setSearchQuery:w,openAddModal:o,openEditModal:u,openViewModal:y,openCredentialsModal:g}=M(),[j,f]=O.useState(1),[T,$]=O.useState(10),[x,m]=O.useState(null),{data:l,isLoading:S}=je({queryKey:["tenant-records",t,p,j,T],queryFn:()=>z.getAll({category:t,search:p,page:j,limit:T})}),G=I({mutationFn:z.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["tenant-records"]}),a.success("Tenant User Deleted","Successfully removed tenant user record."),m(null)},onError:()=>{a.error("Error","Failed to delete tenant user record."),m(null)}}),oe=i=>{m(i)},le=()=>{x&&G.mutate(x.id)},ce=i=>{switch(i){case"pwc":return n.jsxs(C,{variant:"primary",children:[n.jsx(V,{children:n.jsx(Q,{size:14})}),"kREATE"]});case"institution":return n.jsxs(C,{variant:"info",children:[n.jsx(V,{children:n.jsx(H,{size:14})}),"Institution"]});case"counselor":return n.jsxs(C,{variant:"success",children:[n.jsx(V,{children:n.jsx(Y,{size:14})}),"Counselor"]})}},de=[{key:"name",header:"Tenant Name & Contact",render:i=>n.jsxs(Ne,{children:[n.jsx(Ue,{children:i.name}),n.jsx(Ie,{children:i.email})]})},{key:"userCategory",header:"User Type",render:i=>n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap"},children:[ce(i.userCategory),i.isViewOnly&&n.jsxs(C,{variant:"warning",children:[n.jsx(V,{children:n.jsx(R,{size:14})}),"View Only"]})]})},{key:"organizationName",header:"Organization / Institution",render:i=>i.organizationName||"kREATE Global Engine"},{key:"status",header:"Status",render:i=>n.jsx(C,{variant:i.status==="active"?"success":i.status==="pending"?"warning":"default",dot:!0,children:i.status})},{key:"lastActive",header:"Last Active",render:i=>i.lastActive||"N/A"},{key:"actions",header:"Actions",render:i=>{var q,W;return n.jsx(Le,{children:r?n.jsx(k,{content:"View Profile",children:n.jsx(P,{"aria-label":"View Profile",onClick:()=>y(i),children:n.jsx(R,{size:16})})}):n.jsxs(n.Fragment,{children:[n.jsx(k,{content:"View Credentials",children:n.jsx(P,{"aria-label":"View Credentials",onClick:()=>g(i),children:n.jsx(fe,{size:16})})}),n.jsx(k,{content:"View Profile",children:n.jsx(P,{"aria-label":"View Profile",onClick:()=>y(i),children:n.jsx(R,{size:16})})}),n.jsx(k,{content:"Edit Tenant",children:n.jsx(P,{"aria-label":"Edit Tenant",onClick:()=>u(i),children:n.jsx(be,{size:16})})}),n.jsx(k,{content:((l==null?void 0:l.total)??((q=l==null?void 0:l.data)==null?void 0:q.length)??0)<=1?"Cannot delete the only tenant":"Delete Tenant",children:n.jsx(P,{"aria-label":"Delete Tenant",disabled:((l==null?void 0:l.total)??((W=l==null?void 0:l.data)==null?void 0:W.length)??0)<=1,onClick:()=>oe(i),children:n.jsx(we,{size:16})})})]})})}}],ue=[{id:"pwc",label:"kREATE",icon:n.jsx(Q,{size:18})},{id:"institution",label:"Institution",icon:n.jsx(H,{size:18}),disabled:!0,comingSoon:!0},{id:"counselor",label:"Counselor",icon:n.jsx(Y,{size:18}),disabled:!0,comingSoon:!0}];return n.jsxs(Re,{children:[n.jsx(Ce,{title:"Tenant Management",breadcrumbs:[{label:"Dashboard",href:"/dashboard"},{label:"Tenant Management"}],actions:r?void 0:n.jsx(A,{leftIcon:n.jsx(he,{size:18}),onClick:o,children:"Add New Tenant"})}),n.jsxs(ve,{children:[r&&n.jsxs("div",{style:{padding:"12px 16px",marginBottom:"16px",borderRadius:"4px",backgroundColor:"#fffbeb",border:"1px solid #fde68a",color:"#78350f",fontSize:"14px",fontWeight:500,display:"flex",alignItems:"center",gap:"10px"},children:[n.jsx(R,{size:20,style:{color:"#d97706",flexShrink:0}}),n.jsxs("span",{children:[n.jsx("strong",{children:"View-Only Mode Active:"})," You are logged in with read-only permissions. Adding, editing, and deleting tenants is restricted."]})]}),n.jsx(De,{tabs:ue,activeTab:t==="all"?"pwc":t,onChange:i=>{d(i),f(1)},layoutId:"tenantManagementTabs"}),n.jsx(Oe,{children:n.jsx(Me,{children:n.jsx(v,{placeholder:"Search tenants by name, email, role, or institution...",leftIcon:n.jsx(ye,{size:18}),value:p,onChange:i=>{w(i.target.value),f(1)}})})}),n.jsx(Te,{columns:de,data:(l==null?void 0:l.data)??[],isLoading:S,keyExtractor:i=>i.id,pagination:l?{page:l.page,totalPages:l.totalPages,total:l.total,limit:l.limit,onPageChange:i=>f(i),onLimitChange:i=>{$(i),f(1)}}:void 0})]}),n.jsx(qe,{}),n.jsx(Ke,{}),n.jsx(Qe,{}),n.jsx(Ye,{}),n.jsx(ke,{isOpen:!!x,onClose:()=>m(null),onConfirm:le,title:"Delete Tenant User",description:`Are you sure you want to delete ${x==null?void 0:x.name}? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:G.isPending})]})};export{bn as TenantManagementPage};
