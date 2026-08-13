import{g as c,j as t,S as U,e as N,T as P,B as v,r as k,U as G,V as ce,W as _,X as de,Y as ue,Z as me,_ as ge,$ as K,a0 as Q,a1 as W,a2 as pe,a3 as xe,I as he}from"./index-D8LPzpF0.js";import{u as ye}from"./useQuery-BD9xecFM.js";import{u as I}from"./useMutation-A5AECt77.js";import{P as fe}from"./PageHeader-BTXZNstJ.js";import{C as be}from"./Card-BmZj0eKj.js";import{I as w}from"./Input-BHsgREms.js";import{T as je}from"./Table-D_uBFaJ0.js";import{B as A}from"./Badge-BEDhCnBZ.js";import{S as D}from"./Select-CVMngjes.js";import"./Table.styles-B8YNXMzj.js";import{T as Ce,a as we,b as ve,C as Te,A as Ee}from"./FileUpload.styles-Dn8zyivb.js";import"./Breadcrumb-CKvFpy--.js";import{M as F}from"./Modal-DgZwUWAf.js";import"./ConfirmDialog-Cx-Ljo-7.js";import"./Checkbox-DR8oy3rl.js";import{A as $e}from"./AlertModal-BsdwHE3_.js";import{T as R}from"./Tooltip-DcSEu4UE.js";import"./SuccessModal.styles-Ska6LGj1.js";import{u as ee,a as te,o as ne,e as M,s as b}from"./types-BMmo4VCQ.js";import"./Card.styles-CpQTLZiB.js";import"./Badge.styles-DvrzXK6I.js";import"./SuccessModal-DRZxqmq7.js";const Ae=[{id:"usr-101",name:"Sunita Sharma",email:"sunita.sharma@pwc-global.com",username:"sunita.sharma@pwc-global.com",phone:"+1 (555) 019-2834",userCategory:"pwc",roleLabel:"Super Admin",organizationName:"kREATE Global Engine",status:"active",createdAt:"2025-01-15",lastActive:"Today, 10:42 AM",generatedPassword:"kREATE@User2026!"}];let h=Ae.filter(e=>e.userCategory!=="institution"&&e.userCategory!=="counselor");const H=e=>{const s=e==="pwc"?"kREATE":e==="counselor"?"Cnslt":"Inst",a=Math.floor(1e3+Math.random()*9e3);return`${s}@Key${a}!`},S={getAll:async(e={})=>{await new Promise(l=>setTimeout(l,300));let s=[...h];if(e.category&&e.category!=="all"&&(s=s.filter(l=>l.userCategory===e.category)),e.status&&e.status!=="all"&&(s=s.filter(l=>l.status===e.status)),e.search){const l=e.search.toLowerCase();s=s.filter(u=>u.name.toLowerCase().includes(l)||u.email.toLowerCase().includes(l)||u.roleLabel.toLowerCase().includes(l)||u.organizationName&&u.organizationName.toLowerCase().includes(l))}const a=e.page??1,o=e.limit??10,n=s.length,d=Math.ceil(n/o),g=(a-1)*o;return{data:s.slice(g,g+o),total:n,page:a,limit:o,totalPages:d}},getById:async e=>{await new Promise(a=>setTimeout(a,200));const s=h.find(a=>a.id===e);if(!s)throw new Error("Tenant user not found");return{...s}},getByEmailOrUsername:async e=>{const s=e.toLowerCase().trim();return h.find(a=>a.email.toLowerCase()===s||a.username&&a.username.toLowerCase()===s)},create:async e=>{if(await new Promise(o=>setTimeout(o,400)),e.userCategory==="pwc"&&h.find(n=>n.userCategory==="pwc"))throw new Error("A kREATE User already exists. Only 1 kREATE User is allowed on the system.");const s=e.generatedPassword||H(e.userCategory),a={id:`usr-${Date.now()}`,...e,username:e.username||e.email,generatedPassword:s,createdAt:new Date().toISOString().slice(0,10),lastActive:"Just now"};return h=[a,...h],a},update:async(e,s)=>{await new Promise(n=>setTimeout(n,300));const a=h.findIndex(n=>n.id===e);if(a===-1)throw new Error("Tenant user not found");const o={...h[a],...s};return h[a]=o,o},regeneratePassword:async e=>{const s=h.find(o=>o.id===e);if(!s)throw new Error("Tenant user not found");const a=H(s.userCategory);return S.update(e,{generatedPassword:a})},delete:async e=>{await new Promise(s=>setTimeout(s,300)),h=h.filter(s=>s.id!==e)},updateStatus:async(e,s)=>S.update(e,{status:s})},Se=c.div`
  display: flex;
  flex-direction: column;
`,ze=c.div`
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
`,ke=c.div`
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
`;const Pe=c.div`
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
`,Re=c.div`
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
`,Le=c.div`
  display: flex;
  flex-direction: column;
`,Me=c.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.text};
`,Ue=c.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,ae=c.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,se=c.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,J=c.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Ne=c.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({theme:e})=>e.spacing.xs};
`,Ie=c.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.text};
`,B=c.span`
  margin-right: 4px;
  display: inline-flex;
  align-items: center;
`;function Fe({tabs:e,activeTab:s,onChange:a,layoutId:o="activeTabIndicator"}){return t.jsx(Ce,{children:e.map(n=>{const d=n.id===s,g=!!(n.disabled||n.comingSoon);return t.jsxs(we,{$active:d,$disabled:g,onClick:()=>{g||a(n.id)},type:"button",disabled:g,children:[n.icon,t.jsx("span",{children:n.label}),typeof n.count=="number"&&t.jsx(ve,{$active:d,children:n.count}),n.comingSoon&&t.jsx(Te,{children:n.comingSoonText||"Coming Soon"}),d&&!g&&t.jsx(Ee,{layoutId:o,transition:{type:"spring",stiffness:400,damping:35}})]},n.id)})})}const Be=ne({name:b().min(2,"Name must be at least 2 characters"),email:b().email("Please enter a valid email address"),phone:b().optional(),userCategory:M(["pwc","institution","counselor"]),roleLabel:b().optional(),organizationName:b().optional(),status:M(["active","inactive","pending"]).optional()}),Oe=()=>{var C,T,x,f,i;const e=U(),s=N(),{isAddModalOpen:a,closeAddModal:o}=P(),{register:n,handleSubmit:d,watch:g,reset:j,formState:{errors:l}}=ee({resolver:te(Be),defaultValues:{name:"",email:"",phone:"",userCategory:"pwc",roleLabel:"kREATE Default User",organizationName:"",status:"active"}}),u=g("userCategory"),y=I({mutationFn:S.create,onSuccess:p=>{e.invalidateQueries({queryKey:["tenant-records"]}),s.success("Tenant User Created",`Successfully added ${p.name} as ${p.userCategory.toUpperCase()} user.`),j(),o()},onError:p=>{s.error("Error",p.message||"Failed to create tenant user record. Please try again.")}}),m=p=>{y.mutate({...p,status:"active",roleLabel:p.userCategory==="pwc"?"Admin":p.userCategory==="institution"?"Institution User":"Counselor",organizationName:p.userCategory==="pwc"?"kREATE Global Engine":p.organizationName||"kREATE Network Partner"})};return t.jsx(F,{isOpen:a,onClose:o,title:"Add New Tenant",subtitle:"Register a kREATE, Institution, or Counselor tenant account",size:"md",footer:t.jsxs(t.Fragment,{children:[t.jsx(v,{type:"button",variant:"secondary",onClick:o,children:"Cancel"}),t.jsx(v,{type:"submit",form:"add-tenant-form",variant:"primary",isLoading:y.isPending,children:"Create Tenant Account"})]}),children:t.jsxs(ae,{id:"add-tenant-form",onSubmit:d(m),children:[t.jsx(w,{label:"Full Name",placeholder:"e.g. Alex Morgan",error:(C=l.name)==null?void 0:C.message,...n("name")}),t.jsx(w,{label:"Email Address",type:"email",placeholder:"e.g. alex.morgan@example.com",error:(T=l.email)==null?void 0:T.message,...n("email")}),t.jsx(w,{label:"Phone Number (Optional)",placeholder:"e.g. +1 (555) 123-4567",error:(x=l.phone)==null?void 0:x.message,...n("phone")}),t.jsx(D,{label:"Tenant Type",options:[{value:"pwc",label:"kREATE (Admin)"},{value:"institution",label:"Institution (Admin)",disabled:!0},{value:"counselor",label:"Counselor (Career Advisor)",disabled:!0}],error:(f=l.userCategory)==null?void 0:f.message,...n("userCategory")}),u!=="pwc"&&t.jsx(w,{label:"Organization / Institution Name",placeholder:"e.g. Phoenix Academy or Horizon High School",error:(i=l.organizationName)==null?void 0:i.message,...n("organizationName")})]})})},De=ne({name:b().min(2,"Name must be at least 2 characters"),email:b().email("Please enter a valid email address"),phone:b().optional(),userCategory:M(["pwc","institution","counselor"]),roleLabel:b().optional(),organizationName:b().optional(),status:M(["active","inactive","pending"])}),Ve=()=>{var T,x,f,i,p,z;const e=U(),s=N(),{isEditModalOpen:a,closeEditModal:o,selectedUser:n}=P(),{register:d,handleSubmit:g,watch:j,reset:l,formState:{errors:u}}=ee({resolver:te(De)}),y=j("userCategory");k.useEffect(()=>{n&&l({name:n.name,email:n.email,phone:n.phone||"",userCategory:n.userCategory,roleLabel:n.roleLabel,organizationName:n.organizationName||"",status:n.status})},[n,l]);const m=I({mutationFn:E=>S.update(n.id,E),onSuccess:E=>{e.invalidateQueries({queryKey:["tenant-records"]}),s.success("Tenant User Updated",`Updated account details for ${E.name}.`),o()},onError:()=>{s.error("Error","Failed to update tenant user. Please try again.")}}),C=E=>{m.mutate(E)};return t.jsx(F,{isOpen:a,onClose:o,title:"Edit Tenant Profile",subtitle:`Modify account attributes and access permissions for ${(n==null?void 0:n.name)||"tenant user"}`,size:"md",footer:t.jsxs(t.Fragment,{children:[t.jsx(v,{type:"button",variant:"secondary",onClick:o,children:"Cancel"}),t.jsx(v,{type:"submit",form:"edit-tenant-form",variant:"primary",isLoading:m.isPending,children:"Save Changes"})]}),children:t.jsxs(ae,{id:"edit-tenant-form",onSubmit:g(C),children:[t.jsx(w,{label:"Full Name",error:(T=u.name)==null?void 0:T.message,...d("name")}),t.jsx(w,{label:"Email Address",type:"email",error:(x=u.email)==null?void 0:x.message,...d("email")}),t.jsx(w,{label:"Phone Number",error:(f=u.phone)==null?void 0:f.message,...d("phone")}),t.jsx(D,{label:"User Type",options:[{value:"pwc",label:"kREATE User (Admin)"},{value:"institution",label:"Institution User (Admin)",disabled:!0},{value:"counselor",label:"Counselor User (Career Advisor / Counselor)",disabled:!0}],error:(i=u.userCategory)==null?void 0:i.message,...d("userCategory")}),y!=="pwc"&&t.jsx(w,{label:"Organization / Institution Name",error:(p=u.organizationName)==null?void 0:p.message,...d("organizationName")}),t.jsx(D,{label:"Account Status",options:[{value:"active",label:"Active"},{value:"pending",label:"Pending Invitation"},{value:"inactive",label:"Inactive"}],error:(z=u.status)==null?void 0:z.message,...d("status")})]})})},qe=()=>{const{isViewModalOpen:e,closeViewModal:s,selectedUser:a}=P();if(!a)return null;const o=a.userCategory==="pwc"?"primary":a.userCategory==="institution"?"info":"success",n=a.userCategory==="pwc"?"kREATE User":a.userCategory==="institution"?"Institution User":"Counselor User";return t.jsx(F,{isOpen:e,onClose:s,title:"Tenant Profile Overview",subtitle:`Detailed metadata for ${a.name}`,size:"md",children:t.jsxs(se,{children:[t.jsxs(Pe,{children:[t.jsxs($,{children:[t.jsx("label",{children:"Full Name"}),t.jsx("p",{children:a.name})]}),t.jsxs($,{children:[t.jsx("label",{children:"User Category"}),t.jsx("div",{children:t.jsx(A,{variant:o,children:n})})]}),t.jsxs($,{children:[t.jsx("label",{children:"Email Address"}),t.jsx("p",{children:a.email})]}),t.jsxs($,{children:[t.jsx("label",{children:"Phone Number"}),t.jsx("p",{children:a.phone||"N/A"})]}),t.jsxs($,{children:[t.jsx("label",{children:"Organization / Entity"}),t.jsx("p",{children:a.organizationName||"kREATE Global Engine"})]}),t.jsxs($,{children:[t.jsx("label",{children:"Status"}),t.jsx("div",{children:t.jsx(A,{variant:a.status==="active"?"success":a.status==="pending"?"warning":"default",dot:!0,children:a.status.toUpperCase()})})]}),t.jsxs($,{children:[t.jsx("label",{children:"Created On"}),t.jsx("p",{children:a.createdAt})]})]}),t.jsx(Ne,{children:t.jsx(v,{variant:"secondary",onClick:s,children:"Close"})})]})})},Ge=c.div`
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
`,Y=c.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
`,Z=c.div`
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
`,Ke=()=>{const e=U(),s=N(),{isCredentialsModalOpen:a,closeCredentialsModal:o,selectedUser:n}=P(),[d,g]=k.useState(!1),j=I({mutationFn:m=>S.regeneratePassword(m),onSuccess:m=>{e.invalidateQueries({queryKey:["tenant-records"]}),s.success("Credentials Regenerated",`New password generated for ${m.name}.`)},onError:()=>{s.error("Error","Failed to regenerate credentials.")}});if(!n)return null;const l=(m,C)=>{navigator.clipboard.writeText(m),s.info("Copied to Clipboard",`${C} has been copied.`)},u=n.username||n.email,y=n.generatedPassword||"kREATE@User2026!";return t.jsx(F,{isOpen:a,onClose:o,title:"Tenant Login Credentials",subtitle:`Security login details for ${n.name}`,size:"md",children:t.jsxs(se,{children:[t.jsxs(J,{children:[t.jsx("div",{children:t.jsx(Ie,{children:n.name})}),t.jsxs(A,{variant:n.userCategory==="pwc"?"primary":"info",children:[n.userCategory.toUpperCase()," USER"]})]}),t.jsxs(Ge,{children:[t.jsxs(X,{children:[t.jsx("label",{children:"Login Email / Username"}),t.jsxs(Y,{children:[t.jsx(Z,{children:u}),t.jsx(O,{title:"Copy Username",onClick:()=>l(u,"Username/Email"),children:t.jsx(G,{size:18})})]})]}),t.jsxs(X,{children:[t.jsx("label",{children:"Generated Password"}),t.jsxs(Y,{children:[t.jsx(Z,{children:d?y:"••••••••••••"}),t.jsx(O,{title:d?"Hide Password":"Show Password",onClick:()=>g(!d),children:d?t.jsx(ce,{size:18}):t.jsx(_,{size:18})}),t.jsx(O,{title:"Copy Password",onClick:()=>l(y,"Password"),children:t.jsx(G,{size:18})})]})]})]}),t.jsxs(J,{children:[t.jsx(v,{variant:"secondary",size:"sm",leftIcon:t.jsx(de,{size:16}),isLoading:j.isPending,onClick:()=>j.mutate(n.id),children:"Regenerate Password"}),t.jsx(v,{variant:"primary",size:"sm",leftIcon:t.jsx(ue,{size:16}),onClick:()=>{const m=`kREATE Platform Credentials:
Name: ${n.name}
Username: ${u}
Password: ${y}
Portal: kREATE Career Counselling Platform`;l(m,"Full Credentials Package")},children:"Copy Full Credentials Package"})]})]})})},pt=()=>{const e=U(),s=N(),{activeCategory:a,setActiveCategory:o,searchQuery:n,setSearchQuery:d,openAddModal:g,openEditModal:j,openViewModal:l,openCredentialsModal:u}=P(),[y,m]=k.useState(1),[C,T]=k.useState(10),[x,f]=k.useState(null),{data:i,isLoading:p}=ye({queryKey:["tenant-records",a,n,y,C],queryFn:()=>S.getAll({category:a,search:n,page:y,limit:C})}),z=I({mutationFn:S.delete,onSuccess:()=>{e.invalidateQueries({queryKey:["tenant-records"]}),s.success("Tenant User Deleted","Successfully removed tenant user record."),f(null)},onError:()=>{s.error("Error","Failed to delete tenant user record."),f(null)}}),E=r=>{f(r)},re=()=>{x&&z.mutate(x.id)},oe=r=>{switch(r){case"pwc":return t.jsxs(A,{variant:"primary",children:[t.jsx(B,{children:t.jsx(K,{size:14})}),"kREATE"]});case"institution":return t.jsxs(A,{variant:"info",children:[t.jsx(B,{children:t.jsx(Q,{size:14})}),"Institution"]});case"counselor":return t.jsxs(A,{variant:"success",children:[t.jsx(B,{children:t.jsx(W,{size:14})}),"Counselor"]})}},ie=[{key:"actions",header:"Actions",render:r=>{var V,q;return t.jsxs(Re,{children:[t.jsx(R,{content:"View Credentials",children:t.jsx(L,{"aria-label":"View Credentials",onClick:()=>u(r),children:t.jsx(pe,{size:16})})}),t.jsx(R,{content:"View Profile",children:t.jsx(L,{"aria-label":"View Profile",onClick:()=>l(r),children:t.jsx(_,{size:16})})}),t.jsx(R,{content:"Edit Tenant",children:t.jsx(L,{"aria-label":"Edit Tenant",onClick:()=>j(r),children:t.jsx(xe,{size:16})})}),t.jsx(R,{content:((i==null?void 0:i.total)??((V=i==null?void 0:i.data)==null?void 0:V.length)??0)<=1?"Cannot delete the only tenant":"Delete Tenant",children:t.jsx(L,{"aria-label":"Delete Tenant",disabled:((i==null?void 0:i.total)??((q=i==null?void 0:i.data)==null?void 0:q.length)??0)<=1,onClick:()=>E(r),children:t.jsx(he,{size:16})})})]})}},{key:"name",header:"Tenant Name & Contact",render:r=>t.jsxs(Le,{children:[t.jsx(Me,{children:r.name}),t.jsx(Ue,{children:r.email})]})},{key:"userCategory",header:"User Type",render:r=>oe(r.userCategory)},{key:"organizationName",header:"Organization / Institution",render:r=>r.organizationName||"kREATE Global Engine"},{key:"status",header:"Status",render:r=>t.jsx(A,{variant:r.status==="active"?"success":r.status==="pending"?"warning":"default",dot:!0,children:r.status})},{key:"lastActive",header:"Last Active",render:r=>r.lastActive||"N/A"}],le=[{id:"pwc",label:"kREATE",icon:t.jsx(K,{size:18})},{id:"institution",label:"Institution",icon:t.jsx(Q,{size:18}),disabled:!0,comingSoon:!0},{id:"counselor",label:"Counselor",icon:t.jsx(W,{size:18}),disabled:!0,comingSoon:!0}];return t.jsxs(Se,{children:[t.jsx(fe,{title:"Tenant Management",subtitle:"Manage kREATE, Institution, and Counselor tenants across the platform",breadcrumbs:[{label:"Dashboard",href:"/dashboard"},{label:"Tenant Management"}],actions:t.jsx(v,{leftIcon:t.jsx(me,{size:18}),onClick:g,children:"Add New Tenant"})}),t.jsxs(be,{children:[t.jsx(Fe,{tabs:le,activeTab:a==="all"?"pwc":a,onChange:r=>{o(r),m(1)},layoutId:"tenantManagementTabs"}),t.jsx(ze,{children:t.jsx(ke,{children:t.jsx(w,{placeholder:"Search tenants by name, email, role, or institution...",leftIcon:t.jsx(ge,{size:18}),value:n,onChange:r=>{d(r.target.value),m(1)}})})}),t.jsx(je,{columns:ie,data:(i==null?void 0:i.data)??[],isLoading:p,keyExtractor:r=>r.id,pagination:i?{page:i.page,totalPages:i.totalPages,total:i.total,limit:i.limit,onPageChange:r=>m(r),onLimitChange:r=>{T(r),m(1)}}:void 0})]}),t.jsx(Oe,{}),t.jsx(Ve,{}),t.jsx(qe,{}),t.jsx(Ke,{}),t.jsx($e,{isOpen:!!x,onClose:()=>f(null),onConfirm:re,title:"Delete Tenant User",description:`Are you sure you want to delete ${x==null?void 0:x.name}? This action cannot be undone.`,variant:"danger",confirmText:"Delete",cancelText:"Cancel",isLoading:z.isPending})]})};export{pt as TenantManagementPage};
