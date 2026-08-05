import{p as B,q as W,r as $,j as s,c as O,t as X,h as _,v as K,B as g,w as G,g as n,x as Y,y as Z,z as ee,e as se,A as te,C as ie,a as ne}from"./index-W65cpLBV.js";import{P as H,C as h,a as f,u as w,B as z,T as ae,M as re}from"./Modal-CsA_OmLA.js";import{I as m,u as M}from"./Input-1KXema1a.js";import{m as oe,b as le,c as ce,d as de,a as me}from"./settings.mock-DV8_nL57.js";const ue=n.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xs};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
  overflow-x: auto;
`,U=n.button`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e,$active:t})=>t?e.fontWeight.semibold:e.fontWeight.medium};
  color: ${({theme:e,$active:t})=>t?e.colors.primary:e.colors.textSecondary};
  border-bottom: 2px solid
    ${({theme:e,$active:t})=>t?e.colors.primary:"transparent"};
  transition: all ${({theme:e})=>e.transition.fast};
  white-space: nowrap;

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
  }
`,pe=n.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  max-width: 640px;
`,I=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,E=n.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,he=n.div`
  margin-top: ${({theme:e})=>e.spacing.lg};
`,R=n.div`
  h4 {
    font-size: ${({theme:e})=>e.fontSize.base};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }
  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,xe=()=>{const e=B(),{theme:t,toggleTheme:y}=W(),[x,r]=$.useState("platform"),[u,C]=$.useState({platformName:"kREATE Career Platform Global Engine",supportEmail:"support@pwc.com",primaryDomain:"pwc-career-platform.com"});return s.jsxs("div",{children:[s.jsx(H,{title:"Super Admin Platform Settings",subtitle:"Manage platform global configurations, master security policies, and system preferences",breadcrumbs:[{label:"Dashboard",href:O.DASHBOARD},{label:"Settings"}]}),s.jsxs(ue,{children:[s.jsxs(U,{$active:x==="platform",onClick:()=>r("platform"),children:[s.jsx(X,{size:18})," Platform Config"]}),s.jsxs(U,{$active:x==="security",onClick:()=>r("security"),children:[s.jsx(_,{size:18})," Global Security & API"]}),s.jsxs(U,{$active:x==="appearance",onClick:()=>r("appearance"),children:[s.jsx(K,{size:18})," Appearance"]})]}),x==="platform"&&s.jsx(h,{title:"Global Platform Settings",subtitle:"System-wide defaults for the kREATE Career Platform",children:s.jsxs(pe,{onSubmit:l=>{l.preventDefault(),e.success("Settings Saved","Updated global platform parameters.")},children:[s.jsx(m,{label:"Global Platform Name",value:u.platformName,onChange:l=>C(c=>({...c,platformName:l.target.value}))}),s.jsx(m,{label:"System Support Email",type:"email",value:u.supportEmail,onChange:l=>C(c=>({...c,supportEmail:l.target.value}))}),s.jsx(m,{label:"Primary Domain",value:u.primaryDomain,onChange:l=>C(c=>({...c,primaryDomain:l.target.value}))}),s.jsx("div",{children:s.jsx(g,{type:"submit",leftIcon:s.jsx(G,{size:18}),children:"Save Platform Settings"})})]})}),x==="security"&&s.jsx(h,{title:"Global Security & API Policies",subtitle:"System-wide security controls and API token management",children:s.jsxs(E,{children:[s.jsxs(I,{children:[s.jsxs(R,{children:[s.jsx("h4",{children:"Mandatory 2FA for All Admins"}),s.jsx("p",{children:"Enforce two-factor authentication across all institution and super admin accounts"})]}),s.jsx(f,{defaultChecked:!0,onChange:()=>e.success("Policy Saved","Updated global 2FA policy.")})]}),s.jsxs(I,{children:[s.jsxs(R,{children:[s.jsx("h4",{children:"Audit Logging & Traceability"}),s.jsx("p",{children:"Log all administrative mutations and institution provisioning calls"})]}),s.jsx(f,{defaultChecked:!0,onChange:()=>e.success("Policy Saved","Updated audit logging policy.")})]}),s.jsx(he,{children:s.jsx(m,{label:"Super Admin Master API Key",type:"password",value:"sk_live_pwc_super_admin_998877665544",readOnly:!0})})]})}),x==="appearance"&&s.jsx(h,{title:"Appearance & Theme Preferences",subtitle:"Customize interface mode and visual styling",children:s.jsx(E,{children:s.jsxs(I,{children:[s.jsxs(R,{children:[s.jsx("h4",{children:"Interface Theme Mode"}),s.jsxs("p",{children:["Current theme mode: ",s.jsx("strong",{children:t.toUpperCase()})]})]}),s.jsxs(g,{variant:"secondary",onClick:y,children:["Toggle ",t==="light"?"Dark Mode":"Light Mode"]})]})})})]})};let F={...oe},ge={...me},N=[...de],fe={...ce},je={...le};const v={updateInstitutionProfile:async e=>(await new Promise(t=>setTimeout(t,500)),F={...F,...e},{...F}),getSubscriptionInfo:async()=>(await new Promise(e=>setTimeout(e,300)),{...ge}),getAdminUsers:async()=>(await new Promise(e=>setTimeout(e,400)),[...N]),addAdminUser:async e=>{await new Promise(y=>setTimeout(y,500));const t={id:`adm-${Date.now()}`,...e,lastActive:"Never"};return N.unshift(t),t},getNotificationPreferences:async()=>(await new Promise(e=>setTimeout(e,300)),{...fe}),getSecuritySettings:async()=>(await new Promise(e=>setTimeout(e,300)),{...je})},be=n.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xs};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
  overflow-x: auto;
`,S=n.button`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e,$active:t})=>t?e.fontWeight.semibold:e.fontWeight.medium};
  color: ${({theme:e,$active:t})=>t?e.colors.primary:e.colors.textSecondary};
  border-bottom: 2px solid
    ${({theme:e,$active:t})=>t?e.colors.primary:"transparent"};
  transition: all ${({theme:e})=>e.transition.fast};
  white-space: nowrap;

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
  }
`,q=n.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  max-width: 640px;
`,j=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,ye=n.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,ve=n.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,P=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  max-width: 600px;
`,Se=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border-radius: ${({theme:e})=>e.borderRadius.md};
`,$e=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.primary};
  text-transform: uppercase;
`,Ce=n.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
  margin-top: 4px;
`,Ae=n.div`
  padding: ${({theme:e})=>e.spacing.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
`,we=n.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,Pe=n.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,ke=n.div`
  height: 8px;
  width: 100%;
  background-color: ${({theme:e})=>e.colors.border};
  border-radius: 9999px;
  overflow: hidden;
`,Te=n.div`
  height: 100%;
  width: ${({$percent:e})=>e}%;
  background-color: ${({theme:e})=>e.colors.primary};
`,ze=n.div`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Ue=n.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({theme:e})=>e.spacing.md};
`,Ie=n.div`
  margin-top: ${({theme:e})=>e.spacing.lg};
`,Re=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: ${({theme:e})=>e.spacing.md};
`,b=n.div`
  h4 {
    font-size: ${({theme:e})=>e.fontSize.base};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }
  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,Fe=()=>{const e=Y(),t=B(),{theme:y,toggleTheme:x}=W(),[r,u]=$.useState("institution"),[C,l]=$.useState(!1),[c,A]=$.useState({name:"Phoenix Water Club Career Institute",email:"sarah.connor@pwc-global.com",phone:"+1 (555) 234-5678",address:"750 Academic Parkway, San Francisco, CA 94107",website:"https://careers.phoenixwaterclub.edu"}),[k,T]=$.useState({name:"",email:"",role:"counselor"}),{data:a}=w({queryKey:["subscription-info"],queryFn:v.getSubscriptionInfo}),{data:Q,isLoading:V}=w({queryKey:["admin-users"],queryFn:v.getAdminUsers}),{data:d}=w({queryKey:["notification-prefs"],queryFn:v.getNotificationPreferences}),{data:p}=w({queryKey:["security-settings"],queryFn:v.getSecuritySettings}),D=M({mutationFn:v.updateInstitutionProfile,onSuccess:()=>{e.invalidateQueries({queryKey:["institution-profile"]}),t.success("Profile Saved","Updated institution profile information.")}}),L=M({mutationFn:v.addAdminUser,onSuccess:i=>{e.invalidateQueries({queryKey:["admin-users"]}),t.success("Admin Added",`Sent invitation to ${i.email}`),l(!1),T({name:"",email:"",role:"counselor"})}}),J=[{key:"name",header:"Name",render:i=>s.jsxs("div",{children:[s.jsx(ye,{children:i.name}),s.jsx(ve,{children:i.email})]})},{key:"role",header:"Role",render:i=>s.jsx(z,{variant:i.role==="super_admin"?"primary":"info",children:i.role.replace("_"," ").toUpperCase()})},{key:"status",header:"Status",render:i=>s.jsx(z,{variant:i.status==="active"?"success":"default",dot:!0,children:i.status.toUpperCase()})},{key:"lastActive",header:"Last Active",render:i=>i.lastActive||"N/A"}];return s.jsxs("div",{children:[s.jsx(H,{title:"Settings",subtitle:"Manage your institution preferences and profile settings.",breadcrumbs:[{label:"Dashboard",href:O.DASHBOARD},{label:"Settings"}]}),s.jsxs(be,{children:[s.jsxs(S,{$active:r==="institution",onClick:()=>u("institution"),children:[s.jsx(Z,{size:18})," Institution"]}),s.jsxs(S,{$active:r==="subscription",onClick:()=>u("subscription"),children:[s.jsx(ee,{size:18})," Subscription"]}),s.jsxs(S,{$active:r==="admins",onClick:()=>u("admins"),children:[s.jsx(se,{size:18})," Admin Users"]}),s.jsxs(S,{$active:r==="notifications",onClick:()=>u("notifications"),children:[s.jsx(te,{size:18})," Notifications"]}),s.jsxs(S,{$active:r==="security",onClick:()=>u("security"),children:[s.jsx(_,{size:18})," Security"]}),s.jsxs(S,{$active:r==="appearance",onClick:()=>u("appearance"),children:[s.jsx(K,{size:18})," Appearance"]})]}),r==="institution"&&s.jsx(h,{title:"Institution Details",subtitle:"Update public contact info and institution metadata",children:s.jsxs(q,{onSubmit:i=>{i.preventDefault(),D.mutate(c)},children:[s.jsx(m,{label:"Institution Name",value:c.name,onChange:i=>A(o=>({...o,name:i.target.value}))}),s.jsx(m,{label:"Primary Email",type:"email",value:c.email,onChange:i=>A(o=>({...o,email:i.target.value}))}),s.jsx(m,{label:"Phone Number",value:c.phone,onChange:i=>A(o=>({...o,phone:i.target.value}))}),s.jsx(m,{label:"Physical Address",value:c.address,onChange:i=>A(o=>({...o,address:i.target.value}))}),s.jsx(m,{label:"Website URL",value:c.website,onChange:i=>A(o=>({...o,website:i.target.value}))}),s.jsx("div",{children:s.jsx(g,{type:"submit",leftIcon:s.jsx(G,{size:18}),isLoading:D.isPending,children:"Save Changes"})})]})}),r==="subscription"&&s.jsx(h,{title:"Subscription Plan & Seats",subtitle:"Current billing plan and student seat allocation",children:s.jsxs(P,{children:[s.jsxs(Se,{children:[s.jsxs("div",{children:[s.jsx($e,{children:"Current Plan"}),s.jsxs(Ce,{children:[a==null?void 0:a.plan.toUpperCase()," PLAN"]})]}),s.jsx(z,{variant:"success",children:"Active"})]}),s.jsxs(Ae,{children:[s.jsxs(we,{children:[s.jsx(Pe,{children:"Student Seats Allocated"}),s.jsxs("span",{children:[a==null?void 0:a.seatsUsed," / ",a==null?void 0:a.seatsAllocated," Used"]})]}),s.jsx(ke,{children:s.jsx(Te,{$percent:((a==null?void 0:a.seatsUsed)||50)/((a==null?void 0:a.seatsAllocated)||100)*100})})]}),s.jsxs(ze,{children:[s.jsxs("p",{children:["Renews On: ",s.jsx("strong",{children:a==null?void 0:a.renewsOn})]}),s.jsxs("p",{children:["Billing Email: ",s.jsx("strong",{children:a==null?void 0:a.billingEmail})]})]}),s.jsx("div",{children:s.jsx(g,{variant:"primary",onClick:()=>t.info("Subscription Upgrade","Contact sales to upgrade seat limit."),children:"Upgrade Subscription"})})]})}),r==="admins"&&s.jsxs(h,{title:"Institution Administrator Users",subtitle:"Manage staff access levels and permissions",children:[s.jsx(Ue,{children:s.jsx(g,{leftIcon:s.jsx(ie,{size:18}),onClick:()=>l(!0),children:"Add Admin User"})}),s.jsx(ae,{columns:J,data:Q??[],isLoading:V,keyExtractor:i=>i.id})]}),r==="notifications"&&s.jsx(h,{title:"Notification Preferences",subtitle:"Configure automated email and system notification alerts",children:s.jsxs(P,{children:[s.jsxs(j,{children:[s.jsxs(b,{children:[s.jsx("h4",{children:"Email Alerts"}),s.jsx("p",{children:"Receive email notifications for important system events"})]}),s.jsx(f,{defaultChecked:(d==null?void 0:d.emailAlerts)??!0,onChange:()=>t.success("Preference Saved","Updated email alert preference.")})]}),s.jsxs(j,{children:[s.jsxs(b,{children:[s.jsx("h4",{children:"SMS Notifications"}),s.jsx("p",{children:"Send text message reminders for counseling appointments"})]}),s.jsx(f,{defaultChecked:(d==null?void 0:d.smsNotifications)??!0,onChange:()=>t.success("Preference Saved","Updated SMS notification preference.")})]}),s.jsxs(j,{children:[s.jsxs(b,{children:[s.jsx("h4",{children:"Weekly Analytics Digest"}),s.jsx("p",{children:"Receive weekly summary reports of student assessment completion"})]}),s.jsx(f,{defaultChecked:(d==null?void 0:d.weeklyDigests)??!0,onChange:()=>t.success("Preference Saved","Updated weekly digest preference.")})]}),s.jsxs(j,{children:[s.jsxs(b,{children:[s.jsx("h4",{children:"Pending Approvals Reminders"}),s.jsx("p",{children:"Alert when career submissions require institution review"})]}),s.jsx(f,{defaultChecked:(d==null?void 0:d.pendingApprovals)??!0,onChange:()=>t.success("Preference Saved","Updated pending approvals preference.")})]})]})}),r==="security"&&s.jsx(h,{title:"Security & Authentication",subtitle:"Configure 2FA policies and session security controls",children:s.jsxs(P,{children:[s.jsxs(j,{children:[s.jsxs(b,{children:[s.jsx("h4",{children:"Enforce Two-Factor Authentication (2FA)"}),s.jsx("p",{children:"Require 2FA for all administrative staff logins"})]}),s.jsx(f,{defaultChecked:(p==null?void 0:p.enforce2FA)??!0,onChange:()=>t.success("Security Saved","Updated 2FA enforcement policy.")})]}),s.jsxs(j,{children:[s.jsxs(b,{children:[s.jsx("h4",{children:"IP Whitelist Restrictions"}),s.jsx("p",{children:"Restrict admin access strictly to institution IP addresses"})]}),s.jsx(f,{defaultChecked:(p==null?void 0:p.ipWhitelistEnabled)??!1,onChange:()=>t.success("Security Saved","Updated IP whitelist settings.")})]}),s.jsx(Ie,{children:s.jsx(m,{label:"Session Timeout (Minutes)",type:"number",defaultValue:p==null?void 0:p.sessionTimeoutMinutes,onChange:()=>t.success("Security Saved","Updated session timeout.")})})]})}),r==="appearance"&&s.jsx(h,{title:"Appearance & Theme Preferences",subtitle:"Customize interface mode and visual styling",children:s.jsx(P,{children:s.jsxs(j,{children:[s.jsxs(b,{children:[s.jsx("h4",{children:"Interface Theme Mode"}),s.jsxs("p",{children:["Current theme mode: ",s.jsx("strong",{children:y.toUpperCase()})]})]}),s.jsxs(g,{variant:"secondary",onClick:x,children:["Toggle ",y==="light"?"Dark Mode":"Light Mode"]})]})})}),s.jsx(re,{isOpen:C,onClose:()=>l(!1),title:"Add Institution Administrator",subtitle:"Grant administrative or counseling permissions to a staff member",size:"md",children:s.jsxs(q,{onSubmit:i=>{i.preventDefault(),L.mutate({...k,status:"active"})},children:[s.jsx(m,{label:"Full Name",value:k.name,onChange:i=>T(o=>({...o,name:i.target.value})),required:!0}),s.jsx(m,{label:"Email Address",type:"email",value:k.email,onChange:i=>T(o=>({...o,email:i.target.value})),required:!0}),s.jsxs(Re,{children:[s.jsx(g,{type:"button",variant:"secondary",onClick:()=>l(!1),children:"Cancel"}),s.jsx(g,{type:"submit",variant:"primary",isLoading:L.isPending,children:"Create Admin"})]})]})})]})},Ne=()=>ne(t=>t.role)==="super_admin"?s.jsx(xe,{}):s.jsx(Fe,{});export{Ne as SettingsPage};
