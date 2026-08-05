import{g as l,j as n,w as N,p as U,C as P,B as v,r as k,D as V,E as ie,o as Y,F as le,G as ce,H as de,I as ue,J as q,x as G,K,M as me,N as ge,O as pe}from"./index-C_O5jKJC.js";import{M as I,S as D,B as A,u as xe,P as he,C as ye,T as fe,a as R}from"./Modal-BWYaH1hh.js";import{u as F,I as w}from"./Input-ChLlF4Zq.js";import{T as be,a as je,b as Ce,C as we,A as ve,c as Te}from"./FileUpload.styles-CW_N-OPn.js";import{u as Z,a as _,o as ee,e as M,s as b}from"./types-BN-qRDQd.js";const Ee=[{id:"usr-101",name:"Sarah Connor",email:"sarah.connor@pwc-global.com",username:"sarah.connor@pwc-global.com",phone:"+1 (555) 019-2834",userCategory:"pwc",roleLabel:"Super Admin",organizationName:"kREATE Global Engine",status:"active",createdAt:"2025-01-15",lastActive:"Today, 10:42 AM",generatedPassword:"kREATE@User2026!"}];let h=Ee.filter(e=>e.userCategory!=="institution"&&e.userCategory!=="counselor");const Q=e=>{const s=e==="pwc"?"kREATE":e==="counselor"?"Cnslt":"Inst",a=Math.floor(1e3+Math.random()*9e3);return`${s}@Key${a}!`},S={getAll:async(e={})=>{await new Promise(i=>setTimeout(i,300));let s=[...h];if(e.category&&e.category!=="all"&&(s=s.filter(i=>i.userCategory===e.category)),e.status&&e.status!=="all"&&(s=s.filter(i=>i.status===e.status)),e.search){const i=e.search.toLowerCase();s=s.filter(d=>d.name.toLowerCase().includes(i)||d.email.toLowerCase().includes(i)||d.roleLabel.toLowerCase().includes(i)||d.organizationName&&d.organizationName.toLowerCase().includes(i))}const a=e.page??1,o=e.limit??10,t=s.length,c=Math.ceil(t/o),m=(a-1)*o;return{data:s.slice(m,m+o),total:t,page:a,limit:o,totalPages:c}},getById:async e=>{await new Promise(a=>setTimeout(a,200));const s=h.find(a=>a.id===e);if(!s)throw new Error("Tenant user not found");return{...s}},getByEmailOrUsername:async e=>{const s=e.toLowerCase().trim();return h.find(a=>a.email.toLowerCase()===s||a.username&&a.username.toLowerCase()===s)},create:async e=>{if(await new Promise(o=>setTimeout(o,400)),e.userCategory==="pwc"&&h.find(t=>t.userCategory==="pwc"))throw new Error("A kREATE User already exists. Only 1 kREATE User is allowed on the system.");const s=e.generatedPassword||Q(e.userCategory),a={id:`usr-${Date.now()}`,...e,username:e.username||e.email,generatedPassword:s,createdAt:new Date().toISOString().slice(0,10),lastActive:"Just now"};return h=[a,...h],a},update:async(e,s)=>{await new Promise(t=>setTimeout(t,300));const a=h.findIndex(t=>t.id===e);if(a===-1)throw new Error("Tenant user not found");const o={...h[a],...s};return h[a]=o,o},regeneratePassword:async e=>{const s=h.find(o=>o.id===e);if(!s)throw new Error("Tenant user not found");const a=Q(s.userCategory);return S.update(e,{generatedPassword:a})},delete:async e=>{await new Promise(s=>setTimeout(s,300)),h=h.filter(s=>s.id!==e)},updateStatus:async(e,s)=>S.update(e,{status:s})},$e=l.div`
  display: flex;
  flex-direction: column;
`,Ae=l.div`
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
`,Se=l.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    max-width: 100%;
  }
`;l.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
`;l.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;const ze=l.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,$=l.div`
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
`,ke=l.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,L=l.button`
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
`,Pe=l.div`
  display: flex;
  flex-direction: column;
`,Re=l.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Le=l.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,ne=l.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,te=l.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,H=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Me=l.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({theme:e})=>e.spacing.xs};
`,Ne=l.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,B=l.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`;function Ue({tabs:e,activeTab:s,onChange:a,layoutId:o="activeTabIndicator"}){return n.jsx(be,{children:e.map(t=>{const c=t.id===s,m=!!(t.disabled||t.comingSoon);return n.jsxs(je,{$active:c,$disabled:m,onClick:()=>{m||a(t.id)},type:"button",disabled:m,children:[t.icon,n.jsx("span",{children:t.label}),typeof t.count=="number"&&n.jsx(Ce,{$active:c,children:t.count}),t.comingSoon&&n.jsx(we,{children:t.comingSoonText||"Coming Soon"}),c&&!m&&n.jsx(ve,{layoutId:o,transition:{type:"spring",stiffness:400,damping:35}})]},t.id)})})}const Ie=ee({name:b().min(2,"Name must be at least 2 characters"),email:b().email("Please enter a valid email address"),phone:b().optional(),userCategory:M(["pwc","institution","counselor"]),roleLabel:b().optional(),organizationName:b().optional(),status:M(["active","inactive","pending"]).optional()}),Fe=()=>{var C,T,x,f,p;const e=N(),s=U(),{isAddModalOpen:a,closeAddModal:o}=P(),{register:t,handleSubmit:c,watch:m,reset:j,formState:{errors:i}}=Z({resolver:_(Ie),defaultValues:{name:"",email:"",phone:"",userCategory:"pwc",roleLabel:"kREATE Default User",organizationName:"",status:"active"}}),d=m("userCategory"),y=F({mutationFn:S.create,onSuccess:g=>{e.invalidateQueries({queryKey:["tenant-records"]}),s.success("Tenant User Created",`Successfully added ${g.name} as ${g.userCategory.toUpperCase()} user.`),j(),o()},onError:g=>{s.error("Error",g.message||"Failed to create tenant user record. Please try again.")}}),u=g=>{y.mutate({...g,status:"active",roleLabel:g.userCategory==="pwc"?"Admin":g.userCategory==="institution"?"Institution User":"Counselor",organizationName:g.userCategory==="pwc"?"kREATE Global Engine":g.organizationName||"kREATE Network Partner"})};return n.jsx(I,{isOpen:a,onClose:o,title:"Add New Tenant",subtitle:"Register a kREATE, Institution, or Counselor tenant account",size:"md",footer:n.jsxs(n.Fragment,{children:[n.jsx(v,{type:"button",variant:"secondary",onClick:o,children:"Cancel"}),n.jsx(v,{type:"submit",form:"add-tenant-form",variant:"primary",isLoading:y.isPending,children:"Create Tenant Account"})]}),children:n.jsxs(ne,{id:"add-tenant-form",onSubmit:c(u),children:[n.jsx(w,{label:"Full Name",placeholder:"e.g. Alex Morgan",error:(C=i.name)==null?void 0:C.message,...t("name")}),n.jsx(w,{label:"Email Address",type:"email",placeholder:"e.g. alex.morgan@example.com",error:(T=i.email)==null?void 0:T.message,...t("email")}),n.jsx(w,{label:"Phone Number (Optional)",placeholder:"e.g. +1 (555) 123-4567",error:(x=i.phone)==null?void 0:x.message,...t("phone")}),n.jsx(D,{label:"Tenant Type",options:[{value:"pwc",label:"kREATE (Admin)"},{value:"institution",label:"Institution (Admin)",disabled:!0},{value:"counselor",label:"Counselor (Career Advisor)",disabled:!0}],error:(f=i.userCategory)==null?void 0:f.message,...t("userCategory")}),d!=="pwc"&&n.jsx(w,{label:"Organization / Institution Name",placeholder:"e.g. Phoenix Academy or Horizon High School",error:(p=i.organizationName)==null?void 0:p.message,...t("organizationName")})]})})},Be=ee({name:b().min(2,"Name must be at least 2 characters"),email:b().email("Please enter a valid email address"),phone:b().optional(),userCategory:M(["pwc","institution","counselor"]),roleLabel:b().optional(),organizationName:b().optional(),status:M(["active","inactive","pending"])}),Oe=()=>{var T,x,f,p,g,z;const e=N(),s=U(),{isEditModalOpen:a,closeEditModal:o,selectedUser:t}=P(),{register:c,handleSubmit:m,watch:j,reset:i,formState:{errors:d}}=Z({resolver:_(Be)}),y=j("userCategory");k.useEffect(()=>{t&&i({name:t.name,email:t.email,phone:t.phone||"",userCategory:t.userCategory,roleLabel:t.roleLabel,organizationName:t.organizationName||"",status:t.status})},[t,i]);const u=F({mutationFn:E=>S.update(t.id,E),onSuccess:E=>{e.invalidateQueries({queryKey:["tenant-records"]}),s.success("Tenant User Updated",`Updated account details for ${E.name}.`),o()},onError:()=>{s.error("Error","Failed to update tenant user. Please try again.")}}),C=E=>{u.mutate(E)};return n.jsx(I,{isOpen:a,onClose:o,title:"Edit Tenant Profile",subtitle:`Modify account attributes and access permissions for ${(t==null?void 0:t.name)||"tenant user"}`,size:"md",footer:n.jsxs(n.Fragment,{children:[n.jsx(v,{type:"button",variant:"secondary",onClick:o,children:"Cancel"}),n.jsx(v,{type:"submit",form:"edit-tenant-form",variant:"primary",isLoading:u.isPending,children:"Save Changes"})]}),children:n.jsxs(ne,{id:"edit-tenant-form",onSubmit:m(C),children:[n.jsx(w,{label:"Full Name",error:(T=d.name)==null?void 0:T.message,...c("name")}),n.jsx(w,{label:"Email Address",type:"email",error:(x=d.email)==null?void 0:x.message,...c("email")}),n.jsx(w,{label:"Phone Number",error:(f=d.phone)==null?void 0:f.message,...c("phone")}),n.jsx(D,{label:"User Type",options:[{value:"pwc",label:"kREATE User (Admin)"},{value:"institution",label:"Institution User (Admin)",disabled:!0},{value:"counselor",label:"Counselor User (Career Advisor / Counselor)",disabled:!0}],error:(p=d.userCategory)==null?void 0:p.message,...c("userCategory")}),y!=="pwc"&&n.jsx(w,{label:"Organization / Institution Name",error:(g=d.organizationName)==null?void 0:g.message,...c("organizationName")}),n.jsx(D,{label:"Account Status",options:[{value:"active",label:"Active"},{value:"pending",label:"Pending Invitation"},{value:"inactive",label:"Inactive"}],error:(z=d.status)==null?void 0:z.message,...c("status")})]})})},De=()=>{const{isViewModalOpen:e,closeViewModal:s,selectedUser:a}=P();if(!a)return null;const o=a.userCategory==="pwc"?"primary":a.userCategory==="institution"?"info":"success",t=a.userCategory==="pwc"?"kREATE User":a.userCategory==="institution"?"Institution User":"Counselor User";return n.jsx(I,{isOpen:e,onClose:s,title:"Tenant Profile Overview",subtitle:`Detailed metadata for ${a.name}`,size:"md",children:n.jsxs(te,{children:[n.jsxs(ze,{children:[n.jsxs($,{children:[n.jsx("label",{children:"Full Name"}),n.jsx("p",{children:a.name})]}),n.jsxs($,{children:[n.jsx("label",{children:"User Category"}),n.jsx("div",{children:n.jsx(A,{variant:o,children:t})})]}),n.jsxs($,{children:[n.jsx("label",{children:"Email Address"}),n.jsx("p",{children:a.email})]}),n.jsxs($,{children:[n.jsx("label",{children:"Phone Number"}),n.jsx("p",{children:a.phone||"N/A"})]}),n.jsxs($,{children:[n.jsx("label",{children:"Organization / Entity"}),n.jsx("p",{children:a.organizationName||"kREATE Global Engine"})]}),n.jsxs($,{children:[n.jsx("label",{children:"Status"}),n.jsx("div",{children:n.jsx(A,{variant:a.status==="active"?"success":a.status==="pending"?"warning":"default",dot:!0,children:a.status.toUpperCase()})})]}),n.jsxs($,{children:[n.jsx("label",{children:"Created On"}),n.jsx("p",{children:a.createdAt})]})]}),n.jsx(Me,{children:n.jsx(v,{variant:"secondary",onClick:s,children:"Close"})})]})})},Ve=l.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,W=l.div`
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
`,J=l.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,X=l.div`
  flex: 1;
  font-family: monospace;
  font-size: ${({theme:e})=>e.fontSize.sm};
  padding: 8px 12px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  color: ${({theme:e})=>e.colors.text};
  user-select: all;
`,O=l.button`
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
`,qe=()=>{const e=N(),s=U(),{isCredentialsModalOpen:a,closeCredentialsModal:o,selectedUser:t}=P(),[c,m]=k.useState(!1),j=F({mutationFn:u=>S.regeneratePassword(u),onSuccess:u=>{e.invalidateQueries({queryKey:["tenant-records"]}),s.success("Credentials Regenerated",`New password generated for ${u.name}.`)},onError:()=>{s.error("Error","Failed to regenerate credentials.")}});if(!t)return null;const i=(u,C)=>{navigator.clipboard.writeText(u),s.info("Copied to Clipboard",`${C} has been copied.`)},d=t.username||t.email,y=t.generatedPassword||"kREATE@User2026!";return n.jsx(I,{isOpen:a,onClose:o,title:"Tenant Login Credentials",subtitle:`Security login details for ${t.name}`,size:"md",children:n.jsxs(te,{children:[n.jsxs(H,{children:[n.jsx("div",{children:n.jsx(Ne,{children:t.name})}),n.jsxs(A,{variant:t.userCategory==="pwc"?"primary":"info",children:[t.userCategory.toUpperCase()," USER"]})]}),n.jsxs(Ve,{children:[n.jsxs(W,{children:[n.jsx("label",{children:"Login Email / Username"}),n.jsxs(J,{children:[n.jsx(X,{children:d}),n.jsx(O,{title:"Copy Username",onClick:()=>i(d,"Username/Email"),children:n.jsx(V,{size:18})})]})]}),n.jsxs(W,{children:[n.jsx("label",{children:"Generated Password"}),n.jsxs(J,{children:[n.jsx(X,{children:c?y:"••••••••••••"}),n.jsx(O,{title:c?"Hide Password":"Show Password",onClick:()=>m(!c),children:c?n.jsx(ie,{size:18}):n.jsx(Y,{size:18})}),n.jsx(O,{title:"Copy Password",onClick:()=>i(y,"Password"),children:n.jsx(V,{size:18})})]})]})]}),n.jsxs(H,{children:[n.jsx(v,{variant:"secondary",size:"sm",leftIcon:n.jsx(le,{size:16}),isLoading:j.isPending,onClick:()=>j.mutate(t.id),children:"Regenerate Password"}),n.jsx(v,{variant:"primary",size:"sm",leftIcon:n.jsx(ce,{size:16}),onClick:()=>{const u=`kREATE Platform Credentials:
Name: ${t.name}
Username: ${d}
Password: ${y}
Portal: kREATE Career Counselling Platform`;i(u,"Full Credentials Package")},children:"Copy Full Credentials Package"})]})]})})},Je=()=>{const e=N(),s=U(),{activeCategory:a,setActiveCategory:o,searchQuery:t,setSearchQuery:c,openAddModal:m,openEditModal:j,openViewModal:i,openCredentialsModal:d}=P(),[y,u]=k.useState(1),[C,T]=k.useState(10),[x,f]=k.useState(null),{data:p,isLoading:g}=xe({queryKey:["tenant-records",a,t,y,C],queryFn:()=>S.getAll({category:a,search:t,page:y,limit:C})}),z=F({mutationFn:S.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["tenant-records"]}),s.success("Tenant User Deleted","Successfully removed tenant user record."),f(null)},onError:()=>{s.error("Error","Failed to delete tenant user record."),f(null)}}),E=r=>{f(r)},ae=()=>{x&&z.mutate(x.id)},se=r=>{switch(r){case"pwc":return n.jsxs(A,{variant:"primary",children:[n.jsx(B,{children:n.jsx(q,{size:14})}),"kREATE"]});case"institution":return n.jsxs(A,{variant:"info",children:[n.jsx(B,{children:n.jsx(G,{size:14})}),"Institution"]});case"counselor":return n.jsxs(A,{variant:"success",children:[n.jsx(B,{children:n.jsx(K,{size:14})}),"Counselor"]})}},re=[{key:"name",header:"Tenant Name & Contact",render:r=>n.jsxs(Pe,{children:[n.jsx(Re,{children:r.name}),n.jsx(Le,{children:r.email})]})},{key:"userCategory",header:"User Type",render:r=>se(r.userCategory)},{key:"organizationName",header:"Organization / Institution",render:r=>r.organizationName||"kREATE Global Engine"},{key:"status",header:"Status",render:r=>n.jsx(A,{variant:r.status==="active"?"success":r.status==="pending"?"warning":"default",dot:!0,children:r.status})},{key:"lastActive",header:"Last Active",render:r=>r.lastActive||"N/A"},{key:"actions",header:"Actions",render:r=>n.jsxs(ke,{children:[n.jsx(R,{content:"View Credentials",children:n.jsx(L,{"aria-label":"View Credentials",onClick:()=>d(r),children:n.jsx(me,{size:16})})}),n.jsx(R,{content:"View Profile",children:n.jsx(L,{"aria-label":"View Profile",onClick:()=>i(r),children:n.jsx(Y,{size:16})})}),n.jsx(R,{content:"Edit Tenant",children:n.jsx(L,{"aria-label":"Edit Tenant",onClick:()=>j(r),children:n.jsx(ge,{size:16})})}),n.jsx(R,{content:"Delete Tenant",children:n.jsx(L,{"aria-label":"Delete Tenant",onClick:()=>E(r),children:n.jsx(pe,{size:16})})})]})}],oe=[{id:"pwc",label:"kREATE",icon:n.jsx(q,{size:18})},{id:"institution",label:"Institution",icon:n.jsx(G,{size:18}),disabled:!0,comingSoon:!0},{id:"counselor",label:"Counselor",icon:n.jsx(K,{size:18}),disabled:!0,comingSoon:!0}];return n.jsxs($e,{children:[n.jsx(he,{title:"Tenant Management",subtitle:"Manage kREATE, Institution, and Counselor tenants across the platform",breadcrumbs:[{label:"Dashboard",href:"/dashboard"},{label:"Tenant Management"}],actions:n.jsx(v,{leftIcon:n.jsx(de,{size:18}),onClick:m,children:"Add New Tenant"})}),n.jsxs(ye,{children:[n.jsx(Ue,{tabs:oe,activeTab:a==="all"?"pwc":a,onChange:r=>{o(r),u(1)},layoutId:"tenantManagementTabs"}),n.jsx(Ae,{children:n.jsx(Se,{children:n.jsx(w,{placeholder:"Search tenants by name, email, role, or institution...",leftIcon:n.jsx(ue,{size:18}),value:t,onChange:r=>{c(r.target.value),u(1)}})})}),n.jsx(fe,{columns:re,data:(p==null?void 0:p.data)??[],isLoading:g,keyExtractor:r=>r.id,pagination:p?{page:p.page,totalPages:p.totalPages,total:p.total,limit:p.limit,onPageChange:r=>u(r),onLimitChange:r=>{T(r),u(1)}}:void 0})]}),n.jsx(Fe,{}),n.jsx(Oe,{}),n.jsx(De,{}),n.jsx(qe,{}),n.jsx(Te,{isOpen:!!x,onClose:()=>f(null),onConfirm:ae,title:"Delete Tenant User",description:`Are you sure you want to delete ${x==null?void 0:x.name}? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:z.isPending})]})};export{Je as TenantManagementPage};
