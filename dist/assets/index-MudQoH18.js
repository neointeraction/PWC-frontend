import{g as c,j as n,y as N,d as U,z as P,B as v,r as k,A as K,C as de,D as ee,E as ue,F as me,G as ge,H as pe,I as Q,J as H,K as W,M as xe,O as he,P as ye}from"./index-BlnJ6RPY.js";import{u as fe}from"./useQuery-Bpj6tJZw.js";import{u as I}from"./useMutation-C6ij4NK7.js";import{P as be,T as R}from"./PageHeader-DnomRfRw.js";import{C as je}from"./Card-_jdrMGWy.js";import{I as w}from"./Input-DT7CGDc-.js";import{M as F,B as A,T as Ce}from"./Modal-wN5hG3EV.js";import{S as D}from"./Modal.styles-B_QFbYeL.js";import{T as we,a as ve,b as Te,C as Ee,A as $e}from"./FileUpload.styles-BOuNYGcK.js";import{A as Ae}from"./AlertModal-DjYgwY0v.js";import{u as ne,a as te,o as se,e as M,s as b}from"./types-CK4gxUNR.js";const Se=[{id:"usr-101",name:"Sarah Connor",email:"sarah.connor@pwc-global.com",username:"sarah.connor@pwc-global.com",phone:"+1 (555) 019-2834",userCategory:"pwc",roleLabel:"Super Admin",organizationName:"kREATE Global Engine",status:"active",createdAt:"2025-01-15",lastActive:"Today, 10:42 AM",generatedPassword:"kREATE@User2026!"}];let h=Se.filter(e=>e.userCategory!=="institution"&&e.userCategory!=="counselor");const J=e=>{const a=e==="pwc"?"kREATE":e==="counselor"?"Cnslt":"Inst",s=Math.floor(1e3+Math.random()*9e3);return`${a}@Key${s}!`},S={getAll:async(e={})=>{await new Promise(l=>setTimeout(l,300));let a=[...h];if(e.category&&e.category!=="all"&&(a=a.filter(l=>l.userCategory===e.category)),e.status&&e.status!=="all"&&(a=a.filter(l=>l.status===e.status)),e.search){const l=e.search.toLowerCase();a=a.filter(u=>u.name.toLowerCase().includes(l)||u.email.toLowerCase().includes(l)||u.roleLabel.toLowerCase().includes(l)||u.organizationName&&u.organizationName.toLowerCase().includes(l))}const s=e.page??1,i=e.limit??10,t=a.length,d=Math.ceil(t/i),g=(s-1)*i;return{data:a.slice(g,g+i),total:t,page:s,limit:i,totalPages:d}},getById:async e=>{await new Promise(s=>setTimeout(s,200));const a=h.find(s=>s.id===e);if(!a)throw new Error("Tenant user not found");return{...a}},getByEmailOrUsername:async e=>{const a=e.toLowerCase().trim();return h.find(s=>s.email.toLowerCase()===a||s.username&&s.username.toLowerCase()===a)},create:async e=>{if(await new Promise(i=>setTimeout(i,400)),e.userCategory==="pwc"&&h.find(t=>t.userCategory==="pwc"))throw new Error("A kREATE User already exists. Only 1 kREATE User is allowed on the system.");const a=e.generatedPassword||J(e.userCategory),s={id:`usr-${Date.now()}`,...e,username:e.username||e.email,generatedPassword:a,createdAt:new Date().toISOString().slice(0,10),lastActive:"Just now"};return h=[s,...h],s},update:async(e,a)=>{await new Promise(t=>setTimeout(t,300));const s=h.findIndex(t=>t.id===e);if(s===-1)throw new Error("Tenant user not found");const i={...h[s],...a};return h[s]=i,i},regeneratePassword:async e=>{const a=h.find(i=>i.id===e);if(!a)throw new Error("Tenant user not found");const s=J(a.userCategory);return S.update(e,{generatedPassword:s})},delete:async e=>{await new Promise(a=>setTimeout(a,300)),h=h.filter(a=>a.id!==e)},updateStatus:async(e,a)=>S.update(e,{status:a})},ze=c.div`
  display: flex;
  flex-direction: column;
`,ke=c.div`
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
`,Pe=c.div`
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
`;const Re=c.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,$=c.div`
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
`,L=c.button`
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
`,Me=c.div`
  display: flex;
  flex-direction: column;
`,Ne=c.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Ue=c.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,ae=c.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,re=c.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,X=c.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Ie=c.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({theme:e})=>e.spacing.xs};
`,Fe=c.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,B=c.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`;function Be({tabs:e,activeTab:a,onChange:s,layoutId:i="activeTabIndicator"}){return n.jsx(we,{children:e.map(t=>{const d=t.id===a,g=!!(t.disabled||t.comingSoon);return n.jsxs(ve,{$active:d,$disabled:g,onClick:()=>{g||s(t.id)},type:"button",disabled:g,children:[t.icon,n.jsx("span",{children:t.label}),typeof t.count=="number"&&n.jsx(Te,{$active:d,children:t.count}),t.comingSoon&&n.jsx(Ee,{children:t.comingSoonText||"Coming Soon"}),d&&!g&&n.jsx($e,{layoutId:i,transition:{type:"spring",stiffness:400,damping:35}})]},t.id)})})}const Oe=se({name:b().min(2,"Name must be at least 2 characters"),email:b().email("Please enter a valid email address"),phone:b().optional(),userCategory:M(["pwc","institution","counselor"]),roleLabel:b().optional(),organizationName:b().optional(),status:M(["active","inactive","pending"]).optional()}),De=()=>{var C,T,x,f,r;const e=N(),a=U(),{isAddModalOpen:s,closeAddModal:i}=P(),{register:t,handleSubmit:d,watch:g,reset:j,formState:{errors:l}}=ne({resolver:te(Oe),defaultValues:{name:"",email:"",phone:"",userCategory:"pwc",roleLabel:"kREATE Default User",organizationName:"",status:"active"}}),u=g("userCategory"),y=I({mutationFn:S.create,onSuccess:p=>{e.invalidateQueries({queryKey:["tenant-records"]}),a.success("Tenant User Created",`Successfully added ${p.name} as ${p.userCategory.toUpperCase()} user.`),j(),i()},onError:p=>{a.error("Error",p.message||"Failed to create tenant user record. Please try again.")}}),m=p=>{y.mutate({...p,status:"active",roleLabel:p.userCategory==="pwc"?"Admin":p.userCategory==="institution"?"Institution User":"Counselor",organizationName:p.userCategory==="pwc"?"kREATE Global Engine":p.organizationName||"kREATE Network Partner"})};return n.jsx(F,{isOpen:s,onClose:i,title:"Add New Tenant",subtitle:"Register a kREATE, Institution, or Counselor tenant account",size:"md",footer:n.jsxs(n.Fragment,{children:[n.jsx(v,{type:"button",variant:"secondary",onClick:i,children:"Cancel"}),n.jsx(v,{type:"submit",form:"add-tenant-form",variant:"primary",isLoading:y.isPending,children:"Create Tenant Account"})]}),children:n.jsxs(ae,{id:"add-tenant-form",onSubmit:d(m),children:[n.jsx(w,{label:"Full Name",placeholder:"e.g. Alex Morgan",error:(C=l.name)==null?void 0:C.message,...t("name")}),n.jsx(w,{label:"Email Address",type:"email",placeholder:"e.g. alex.morgan@example.com",error:(T=l.email)==null?void 0:T.message,...t("email")}),n.jsx(w,{label:"Phone Number (Optional)",placeholder:"e.g. +1 (555) 123-4567",error:(x=l.phone)==null?void 0:x.message,...t("phone")}),n.jsx(D,{label:"Tenant Type",options:[{value:"pwc",label:"kREATE (Admin)"},{value:"institution",label:"Institution (Admin)",disabled:!0},{value:"counselor",label:"Counselor (Career Advisor)",disabled:!0}],error:(f=l.userCategory)==null?void 0:f.message,...t("userCategory")}),u!=="pwc"&&n.jsx(w,{label:"Organization / Institution Name",placeholder:"e.g. Phoenix Academy or Horizon High School",error:(r=l.organizationName)==null?void 0:r.message,...t("organizationName")})]})})},Ve=se({name:b().min(2,"Name must be at least 2 characters"),email:b().email("Please enter a valid email address"),phone:b().optional(),userCategory:M(["pwc","institution","counselor"]),roleLabel:b().optional(),organizationName:b().optional(),status:M(["active","inactive","pending"])}),qe=()=>{var T,x,f,r,p,z;const e=N(),a=U(),{isEditModalOpen:s,closeEditModal:i,selectedUser:t}=P(),{register:d,handleSubmit:g,watch:j,reset:l,formState:{errors:u}}=ne({resolver:te(Ve)}),y=j("userCategory");k.useEffect(()=>{t&&l({name:t.name,email:t.email,phone:t.phone||"",userCategory:t.userCategory,roleLabel:t.roleLabel,organizationName:t.organizationName||"",status:t.status})},[t,l]);const m=I({mutationFn:E=>S.update(t.id,E),onSuccess:E=>{e.invalidateQueries({queryKey:["tenant-records"]}),a.success("Tenant User Updated",`Updated account details for ${E.name}.`),i()},onError:()=>{a.error("Error","Failed to update tenant user. Please try again.")}}),C=E=>{m.mutate(E)};return n.jsx(F,{isOpen:s,onClose:i,title:"Edit Tenant Profile",subtitle:`Modify account attributes and access permissions for ${(t==null?void 0:t.name)||"tenant user"}`,size:"md",footer:n.jsxs(n.Fragment,{children:[n.jsx(v,{type:"button",variant:"secondary",onClick:i,children:"Cancel"}),n.jsx(v,{type:"submit",form:"edit-tenant-form",variant:"primary",isLoading:m.isPending,children:"Save Changes"})]}),children:n.jsxs(ae,{id:"edit-tenant-form",onSubmit:g(C),children:[n.jsx(w,{label:"Full Name",error:(T=u.name)==null?void 0:T.message,...d("name")}),n.jsx(w,{label:"Email Address",type:"email",error:(x=u.email)==null?void 0:x.message,...d("email")}),n.jsx(w,{label:"Phone Number",error:(f=u.phone)==null?void 0:f.message,...d("phone")}),n.jsx(D,{label:"User Type",options:[{value:"pwc",label:"kREATE User (Admin)"},{value:"institution",label:"Institution User (Admin)",disabled:!0},{value:"counselor",label:"Counselor User (Career Advisor / Counselor)",disabled:!0}],error:(r=u.userCategory)==null?void 0:r.message,...d("userCategory")}),y!=="pwc"&&n.jsx(w,{label:"Organization / Institution Name",error:(p=u.organizationName)==null?void 0:p.message,...d("organizationName")}),n.jsx(D,{label:"Account Status",options:[{value:"active",label:"Active"},{value:"pending",label:"Pending Invitation"},{value:"inactive",label:"Inactive"}],error:(z=u.status)==null?void 0:z.message,...d("status")})]})})},Ge=()=>{const{isViewModalOpen:e,closeViewModal:a,selectedUser:s}=P();if(!s)return null;const i=s.userCategory==="pwc"?"primary":s.userCategory==="institution"?"info":"success",t=s.userCategory==="pwc"?"kREATE User":s.userCategory==="institution"?"Institution User":"Counselor User";return n.jsx(F,{isOpen:e,onClose:a,title:"Tenant Profile Overview",subtitle:`Detailed metadata for ${s.name}`,size:"md",children:n.jsxs(re,{children:[n.jsxs(Re,{children:[n.jsxs($,{children:[n.jsx("label",{children:"Full Name"}),n.jsx("p",{children:s.name})]}),n.jsxs($,{children:[n.jsx("label",{children:"User Category"}),n.jsx("div",{children:n.jsx(A,{variant:i,children:t})})]}),n.jsxs($,{children:[n.jsx("label",{children:"Email Address"}),n.jsx("p",{children:s.email})]}),n.jsxs($,{children:[n.jsx("label",{children:"Phone Number"}),n.jsx("p",{children:s.phone||"N/A"})]}),n.jsxs($,{children:[n.jsx("label",{children:"Organization / Entity"}),n.jsx("p",{children:s.organizationName||"kREATE Global Engine"})]}),n.jsxs($,{children:[n.jsx("label",{children:"Status"}),n.jsx("div",{children:n.jsx(A,{variant:s.status==="active"?"success":s.status==="pending"?"warning":"default",dot:!0,children:s.status.toUpperCase()})})]}),n.jsxs($,{children:[n.jsx("label",{children:"Created On"}),n.jsx("p",{children:s.createdAt})]})]}),n.jsx(Ie,{children:n.jsx(v,{variant:"secondary",onClick:a,children:"Close"})})]})})},Ke=c.div`
  background-color: ${({theme:e})=>e.colors.surfaceHover};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  padding: ${({theme:e})=>e.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,Y=c.div`
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
`,_=c.div`
  flex: 1;
  font-family: monospace;
  font-size: ${({theme:e})=>e.fontSize.sm};
  padding: 8px 12px;
  background-color: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  color: ${({theme:e})=>e.colors.text};
  user-select: all;
`,O=c.button`
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
`,Qe=()=>{const e=N(),a=U(),{isCredentialsModalOpen:s,closeCredentialsModal:i,selectedUser:t}=P(),[d,g]=k.useState(!1),j=I({mutationFn:m=>S.regeneratePassword(m),onSuccess:m=>{e.invalidateQueries({queryKey:["tenant-records"]}),a.success("Credentials Regenerated",`New password generated for ${m.name}.`)},onError:()=>{a.error("Error","Failed to regenerate credentials.")}});if(!t)return null;const l=(m,C)=>{navigator.clipboard.writeText(m),a.info("Copied to Clipboard",`${C} has been copied.`)},u=t.username||t.email,y=t.generatedPassword||"kREATE@User2026!";return n.jsx(F,{isOpen:s,onClose:i,title:"Tenant Login Credentials",subtitle:`Security login details for ${t.name}`,size:"md",children:n.jsxs(re,{children:[n.jsxs(X,{children:[n.jsx("div",{children:n.jsx(Fe,{children:t.name})}),n.jsxs(A,{variant:t.userCategory==="pwc"?"primary":"info",children:[t.userCategory.toUpperCase()," USER"]})]}),n.jsxs(Ke,{children:[n.jsxs(Y,{children:[n.jsx("label",{children:"Login Email / Username"}),n.jsxs(Z,{children:[n.jsx(_,{children:u}),n.jsx(O,{title:"Copy Username",onClick:()=>l(u,"Username/Email"),children:n.jsx(K,{size:18})})]})]}),n.jsxs(Y,{children:[n.jsx("label",{children:"Generated Password"}),n.jsxs(Z,{children:[n.jsx(_,{children:d?y:"••••••••••••"}),n.jsx(O,{title:d?"Hide Password":"Show Password",onClick:()=>g(!d),children:d?n.jsx(de,{size:18}):n.jsx(ee,{size:18})}),n.jsx(O,{title:"Copy Password",onClick:()=>l(y,"Password"),children:n.jsx(K,{size:18})})]})]})]}),n.jsxs(X,{children:[n.jsx(v,{variant:"secondary",size:"sm",leftIcon:n.jsx(ue,{size:16}),isLoading:j.isPending,onClick:()=>j.mutate(t.id),children:"Regenerate Password"}),n.jsx(v,{variant:"primary",size:"sm",leftIcon:n.jsx(me,{size:16}),onClick:()=>{const m=`kREATE Platform Credentials:
Name: ${t.name}
Username: ${u}
Password: ${y}
Portal: kREATE Career Counselling Platform`;l(m,"Full Credentials Package")},children:"Copy Full Credentials Package"})]})]})})},an=()=>{const e=N(),a=U(),{activeCategory:s,setActiveCategory:i,searchQuery:t,setSearchQuery:d,openAddModal:g,openEditModal:j,openViewModal:l,openCredentialsModal:u}=P(),[y,m]=k.useState(1),[C,T]=k.useState(10),[x,f]=k.useState(null),{data:r,isLoading:p}=fe({queryKey:["tenant-records",s,t,y,C],queryFn:()=>S.getAll({category:s,search:t,page:y,limit:C})}),z=I({mutationFn:S.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["tenant-records"]}),a.success("Tenant User Deleted","Successfully removed tenant user record."),f(null)},onError:()=>{a.error("Error","Failed to delete tenant user record."),f(null)}}),E=o=>{f(o)},oe=()=>{x&&z.mutate(x.id)},ie=o=>{switch(o){case"pwc":return n.jsxs(A,{variant:"primary",children:[n.jsx(B,{children:n.jsx(Q,{size:14})}),"kREATE"]});case"institution":return n.jsxs(A,{variant:"info",children:[n.jsx(B,{children:n.jsx(H,{size:14})}),"Institution"]});case"counselor":return n.jsxs(A,{variant:"success",children:[n.jsx(B,{children:n.jsx(W,{size:14})}),"Counselor"]})}},le=[{key:"name",header:"Tenant Name & Contact",render:o=>n.jsxs(Me,{children:[n.jsx(Ne,{children:o.name}),n.jsx(Ue,{children:o.email})]})},{key:"userCategory",header:"User Type",render:o=>ie(o.userCategory)},{key:"organizationName",header:"Organization / Institution",render:o=>o.organizationName||"kREATE Global Engine"},{key:"status",header:"Status",render:o=>n.jsx(A,{variant:o.status==="active"?"success":o.status==="pending"?"warning":"default",dot:!0,children:o.status})},{key:"lastActive",header:"Last Active",render:o=>o.lastActive||"N/A"},{key:"actions",header:"Actions",render:o=>{var V,q;return n.jsxs(Le,{children:[n.jsx(R,{content:"View Credentials",children:n.jsx(L,{"aria-label":"View Credentials",onClick:()=>u(o),children:n.jsx(xe,{size:16})})}),n.jsx(R,{content:"View Profile",children:n.jsx(L,{"aria-label":"View Profile",onClick:()=>l(o),children:n.jsx(ee,{size:16})})}),n.jsx(R,{content:"Edit Tenant",children:n.jsx(L,{"aria-label":"Edit Tenant",onClick:()=>j(o),children:n.jsx(he,{size:16})})}),n.jsx(R,{content:((r==null?void 0:r.total)??((V=r==null?void 0:r.data)==null?void 0:V.length)??0)<=1?"Cannot delete the only tenant":"Delete Tenant",children:n.jsx(L,{"aria-label":"Delete Tenant",disabled:((r==null?void 0:r.total)??((q=r==null?void 0:r.data)==null?void 0:q.length)??0)<=1,onClick:()=>{var G;((r==null?void 0:r.total)??((G=r==null?void 0:r.data)==null?void 0:G.length)??0)>1&&E(o)},children:n.jsx(ye,{size:16})})})]})}}],ce=[{id:"pwc",label:"kREATE",icon:n.jsx(Q,{size:18})},{id:"institution",label:"Institution",icon:n.jsx(H,{size:18}),disabled:!0,comingSoon:!0},{id:"counselor",label:"Counselor",icon:n.jsx(W,{size:18}),disabled:!0,comingSoon:!0}];return n.jsxs(ze,{children:[n.jsx(be,{title:"Tenant Management",subtitle:"Manage kREATE, Institution, and Counselor tenants across the platform",breadcrumbs:[{label:"Dashboard",href:"/dashboard"},{label:"Tenant Management"}],actions:n.jsx(v,{leftIcon:n.jsx(ge,{size:18}),onClick:g,children:"Add New Tenant"})}),n.jsxs(je,{children:[n.jsx(Be,{tabs:ce,activeTab:s==="all"?"pwc":s,onChange:o=>{i(o),m(1)},layoutId:"tenantManagementTabs"}),n.jsx(ke,{children:n.jsx(Pe,{children:n.jsx(w,{placeholder:"Search tenants by name, email, role, or institution...",leftIcon:n.jsx(pe,{size:18}),value:t,onChange:o=>{d(o.target.value),m(1)}})})}),n.jsx(Ce,{columns:le,data:(r==null?void 0:r.data)??[],isLoading:p,keyExtractor:o=>o.id,pagination:r?{page:r.page,totalPages:r.totalPages,total:r.total,limit:r.limit,onPageChange:o=>m(o),onLimitChange:o=>{T(o),m(1)}}:void 0})]}),n.jsx(De,{}),n.jsx(qe,{}),n.jsx(Ge,{}),n.jsx(Qe,{}),n.jsx(Ae,{isOpen:!!x,onClose:()=>f(null),onConfirm:oe,title:"Delete Tenant User",description:`Are you sure you want to delete ${x==null?void 0:x.name}? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:z.isPending})]})};export{an as TenantManagementPage};
