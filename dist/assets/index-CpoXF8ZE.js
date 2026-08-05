import{p as L,q as N,r as S,j as s,c as q,h as B,t as W,B as p,v as E,g as n,w as G,x as V,y as Y,e as J,z as X,A as Z,a as ee}from"./index-C_O5jKJC.js";import{P as O,C as m,u as C,B as T,T as se,b,M as te}from"./Modal-BWYaH1hh.js";import{I as c,u as R}from"./Input-ChLlF4Zq.js";import{m as ie,b as ne,c as ae,d as re,a as oe}from"./settings.mock-DV8_nL57.js";const le=n.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xs};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
  overflow-x: auto;
`,F=n.button`
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
`,ce=n.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  max-width: 640px;
`,de=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,ue=n.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,pe=n.div`
  h4 {
    font-size: ${({theme:e})=>e.fontSize.base};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }
  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,me=()=>{const e=L(),{theme:t,toggleTheme:g}=N(),[f,r]=S.useState("security");return s.jsxs("div",{children:[s.jsx(O,{title:"Super Admin Platform Settings",subtitle:"Manage platform global configurations, master security policies, and system preferences",breadcrumbs:[{label:"Dashboard",href:q.DASHBOARD},{label:"Settings"}]}),s.jsxs(le,{children:[s.jsxs(F,{$active:f==="security",onClick:()=>r("security"),children:[s.jsx(B,{size:18})," Security"]}),s.jsxs(F,{$active:f==="appearance",onClick:()=>r("appearance"),children:[s.jsx(W,{size:18})," Appearance"]})]}),f==="security"&&s.jsx(m,{title:"Security Settings",subtitle:"Manage your password and security preferences",children:s.jsxs(ce,{onSubmit:u=>{u.preventDefault(),e.success("Password Updated","Your password has been changed successfully.")},children:[s.jsx(c,{label:"Current Password",type:"password",placeholder:"Enter current password"}),s.jsx(c,{label:"New Password",type:"password",placeholder:"Enter new password"}),s.jsx(c,{label:"Confirm New Password",type:"password",placeholder:"Confirm new password"}),s.jsx("div",{children:s.jsx(p,{type:"submit",leftIcon:s.jsx(E,{size:18}),children:"Update Password"})})]})}),f==="appearance"&&s.jsx(m,{title:"Appearance & Theme Preferences",subtitle:"Customize interface mode and visual styling",children:s.jsx(ue,{children:s.jsxs(de,{children:[s.jsxs(pe,{children:[s.jsx("h4",{children:"Interface Theme Mode"}),s.jsxs("p",{children:["Current theme mode: ",s.jsx("strong",{children:t.toUpperCase()})]})]}),s.jsxs(p,{variant:"secondary",onClick:g,children:["Toggle ",t==="light"?"Dark Mode":"Light Mode"]})]})})})]})};let z={...ie},he={...oe},M=[...re],xe={...ae},ge={...ne};const y={updateInstitutionProfile:async e=>(await new Promise(t=>setTimeout(t,500)),z={...z,...e},{...z}),getSubscriptionInfo:async()=>(await new Promise(e=>setTimeout(e,300)),{...he}),getAdminUsers:async()=>(await new Promise(e=>setTimeout(e,400)),[...M]),addAdminUser:async e=>{await new Promise(g=>setTimeout(g,500));const t={id:`adm-${Date.now()}`,...e,lastActive:"Never"};return M.unshift(t),t},getNotificationPreferences:async()=>(await new Promise(e=>setTimeout(e,300)),{...xe}),getSecuritySettings:async()=>(await new Promise(e=>setTimeout(e,300)),{...ge})},fe=n.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xs};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
  overflow-x: auto;
`,v=n.button`
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
`,D=n.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  max-width: 640px;
`,h=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,je=n.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,be=n.div`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.textSecondary};
`,A=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  max-width: 600px;
`,ye=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border-radius: ${({theme:e})=>e.borderRadius.md};
`,ve=n.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  color: ${({theme:e})=>e.colors.primary};
  text-transform: uppercase;
`,$e=n.h3`
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
  margin-top: 4px;
`,Se=n.div`
  padding: ${({theme:e})=>e.spacing.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
`,we=n.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({theme:e})=>e.spacing.xs};
`,Ce=n.span`
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Ae=n.div`
  height: 8px;
  width: 100%;
  background-color: ${({theme:e})=>e.colors.border};
  border-radius: 9999px;
  overflow: hidden;
`,Pe=n.div`
  height: 100%;
  width: ${({$percent:e})=>e}%;
  background-color: ${({theme:e})=>e.colors.primary};
`,ke=n.div`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Te=n.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({theme:e})=>e.spacing.md};
`,ze=n.div`
  margin-top: ${({theme:e})=>e.spacing.lg};
`,Ue=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({theme:e})=>e.spacing.xs};
  margin-top: ${({theme:e})=>e.spacing.md};
`,x=n.div`
  h4 {
    font-size: ${({theme:e})=>e.fontSize.base};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }
  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,Ie=()=>{const e=G(),t=L(),{theme:g,toggleTheme:f}=N(),[r,u]=S.useState("institution"),[K,w]=S.useState(!1),[j,$]=S.useState({name:"Phoenix Water Club Career Institute",email:"sarah.connor@pwc-global.com",phone:"+1 (555) 234-5678",address:"750 Academic Parkway, San Francisco, CA 94107",website:"https://careers.phoenixwaterclub.edu"}),[P,k]=S.useState({name:"",email:"",role:"counselor"}),{data:a}=C({queryKey:["subscription-info"],queryFn:y.getSubscriptionInfo}),{data:H,isLoading:Q}=C({queryKey:["admin-users"],queryFn:y.getAdminUsers}),{data:l}=C({queryKey:["notification-prefs"],queryFn:y.getNotificationPreferences}),{data:d}=C({queryKey:["security-settings"],queryFn:y.getSecuritySettings}),U=R({mutationFn:y.updateInstitutionProfile,onSuccess:()=>{e.invalidateQueries({queryKey:["institution-profile"]}),t.success("Profile Saved","Updated institution profile information.")}}),I=R({mutationFn:y.addAdminUser,onSuccess:i=>{e.invalidateQueries({queryKey:["admin-users"]}),t.success("Admin Added",`Sent invitation to ${i.email}`),w(!1),k({name:"",email:"",role:"counselor"})}}),_=[{key:"name",header:"Name",render:i=>s.jsxs("div",{children:[s.jsx(je,{children:i.name}),s.jsx(be,{children:i.email})]})},{key:"role",header:"Role",render:i=>s.jsx(T,{variant:i.role==="super_admin"?"primary":"info",children:i.role.replace("_"," ").toUpperCase()})},{key:"status",header:"Status",render:i=>s.jsx(T,{variant:i.status==="active"?"success":"default",dot:!0,children:i.status.toUpperCase()})},{key:"lastActive",header:"Last Active",render:i=>i.lastActive||"N/A"}];return s.jsxs("div",{children:[s.jsx(O,{title:"Settings",subtitle:"Manage your institution preferences and profile settings.",breadcrumbs:[{label:"Dashboard",href:q.DASHBOARD},{label:"Settings"}]}),s.jsxs(fe,{children:[s.jsxs(v,{$active:r==="institution",onClick:()=>u("institution"),children:[s.jsx(V,{size:18})," Institution"]}),s.jsxs(v,{$active:r==="subscription",onClick:()=>u("subscription"),children:[s.jsx(Y,{size:18})," Subscription"]}),s.jsxs(v,{$active:r==="admins",onClick:()=>u("admins"),children:[s.jsx(J,{size:18})," Admin Users"]}),s.jsxs(v,{$active:r==="notifications",onClick:()=>u("notifications"),children:[s.jsx(X,{size:18})," Notifications"]}),s.jsxs(v,{$active:r==="security",onClick:()=>u("security"),children:[s.jsx(B,{size:18})," Security"]}),s.jsxs(v,{$active:r==="appearance",onClick:()=>u("appearance"),children:[s.jsx(W,{size:18})," Appearance"]})]}),r==="institution"&&s.jsx(m,{title:"Institution Details",subtitle:"Update public contact info and institution metadata",children:s.jsxs(D,{onSubmit:i=>{i.preventDefault(),U.mutate(j)},children:[s.jsx(c,{label:"Institution Name",value:j.name,onChange:i=>$(o=>({...o,name:i.target.value}))}),s.jsx(c,{label:"Primary Email",type:"email",value:j.email,onChange:i=>$(o=>({...o,email:i.target.value}))}),s.jsx(c,{label:"Phone Number",value:j.phone,onChange:i=>$(o=>({...o,phone:i.target.value}))}),s.jsx(c,{label:"Physical Address",value:j.address,onChange:i=>$(o=>({...o,address:i.target.value}))}),s.jsx(c,{label:"Website URL",value:j.website,onChange:i=>$(o=>({...o,website:i.target.value}))}),s.jsx("div",{children:s.jsx(p,{type:"submit",leftIcon:s.jsx(E,{size:18}),isLoading:U.isPending,children:"Save Changes"})})]})}),r==="subscription"&&s.jsx(m,{title:"Subscription Plan & Seats",subtitle:"Current billing plan and student seat allocation",children:s.jsxs(A,{children:[s.jsxs(ye,{children:[s.jsxs("div",{children:[s.jsx(ve,{children:"Current Plan"}),s.jsxs($e,{children:[a==null?void 0:a.plan.toUpperCase()," PLAN"]})]}),s.jsx(T,{variant:"success",children:"Active"})]}),s.jsxs(Se,{children:[s.jsxs(we,{children:[s.jsx(Ce,{children:"Student Seats Allocated"}),s.jsxs("span",{children:[a==null?void 0:a.seatsUsed," / ",a==null?void 0:a.seatsAllocated," Used"]})]}),s.jsx(Ae,{children:s.jsx(Pe,{$percent:((a==null?void 0:a.seatsUsed)||50)/((a==null?void 0:a.seatsAllocated)||100)*100})})]}),s.jsxs(ke,{children:[s.jsxs("p",{children:["Renews On: ",s.jsx("strong",{children:a==null?void 0:a.renewsOn})]}),s.jsxs("p",{children:["Billing Email: ",s.jsx("strong",{children:a==null?void 0:a.billingEmail})]})]}),s.jsx("div",{children:s.jsx(p,{variant:"primary",onClick:()=>t.info("Subscription Upgrade","Contact sales to upgrade seat limit."),children:"Upgrade Subscription"})})]})}),r==="admins"&&s.jsxs(m,{title:"Institution Administrator Users",subtitle:"Manage staff access levels and permissions",children:[s.jsx(Te,{children:s.jsx(p,{leftIcon:s.jsx(Z,{size:18}),onClick:()=>w(!0),children:"Add Admin User"})}),s.jsx(se,{columns:_,data:H??[],isLoading:Q,keyExtractor:i=>i.id})]}),r==="notifications"&&s.jsx(m,{title:"Notification Preferences",subtitle:"Configure automated email and system notification alerts",children:s.jsxs(A,{children:[s.jsxs(h,{children:[s.jsxs(x,{children:[s.jsx("h4",{children:"Email Alerts"}),s.jsx("p",{children:"Receive email notifications for important system events"})]}),s.jsx(b,{defaultChecked:(l==null?void 0:l.emailAlerts)??!0,onChange:()=>t.success("Preference Saved","Updated email alert preference.")})]}),s.jsxs(h,{children:[s.jsxs(x,{children:[s.jsx("h4",{children:"SMS Notifications"}),s.jsx("p",{children:"Send text message reminders for counseling appointments"})]}),s.jsx(b,{defaultChecked:(l==null?void 0:l.smsNotifications)??!0,onChange:()=>t.success("Preference Saved","Updated SMS notification preference.")})]}),s.jsxs(h,{children:[s.jsxs(x,{children:[s.jsx("h4",{children:"Weekly Analytics Digest"}),s.jsx("p",{children:"Receive weekly summary reports of student assessment completion"})]}),s.jsx(b,{defaultChecked:(l==null?void 0:l.weeklyDigests)??!0,onChange:()=>t.success("Preference Saved","Updated weekly digest preference.")})]}),s.jsxs(h,{children:[s.jsxs(x,{children:[s.jsx("h4",{children:"Pending Approvals Reminders"}),s.jsx("p",{children:"Alert when career submissions require institution review"})]}),s.jsx(b,{defaultChecked:(l==null?void 0:l.pendingApprovals)??!0,onChange:()=>t.success("Preference Saved","Updated pending approvals preference.")})]})]})}),r==="security"&&s.jsx(m,{title:"Security & Authentication",subtitle:"Configure 2FA policies and session security controls",children:s.jsxs(A,{children:[s.jsxs(h,{children:[s.jsxs(x,{children:[s.jsx("h4",{children:"Enforce Two-Factor Authentication (2FA)"}),s.jsx("p",{children:"Require 2FA for all administrative staff logins"})]}),s.jsx(b,{defaultChecked:(d==null?void 0:d.enforce2FA)??!0,onChange:()=>t.success("Security Saved","Updated 2FA enforcement policy.")})]}),s.jsxs(h,{children:[s.jsxs(x,{children:[s.jsx("h4",{children:"IP Whitelist Restrictions"}),s.jsx("p",{children:"Restrict admin access strictly to institution IP addresses"})]}),s.jsx(b,{defaultChecked:(d==null?void 0:d.ipWhitelistEnabled)??!1,onChange:()=>t.success("Security Saved","Updated IP whitelist settings.")})]}),s.jsx(ze,{children:s.jsx(c,{label:"Session Timeout (Minutes)",type:"number",defaultValue:d==null?void 0:d.sessionTimeoutMinutes,onChange:()=>t.success("Security Saved","Updated session timeout.")})})]})}),r==="appearance"&&s.jsx(m,{title:"Appearance & Theme Preferences",subtitle:"Customize interface mode and visual styling",children:s.jsx(A,{children:s.jsxs(h,{children:[s.jsxs(x,{children:[s.jsx("h4",{children:"Interface Theme Mode"}),s.jsxs("p",{children:["Current theme mode: ",s.jsx("strong",{children:g.toUpperCase()})]})]}),s.jsxs(p,{variant:"secondary",onClick:f,children:["Toggle ",g==="light"?"Dark Mode":"Light Mode"]})]})})}),s.jsx(te,{isOpen:K,onClose:()=>w(!1),title:"Add Institution Administrator",subtitle:"Grant administrative or counseling permissions to a staff member",size:"md",children:s.jsxs(D,{onSubmit:i=>{i.preventDefault(),I.mutate({...P,status:"active"})},children:[s.jsx(c,{label:"Full Name",value:P.name,onChange:i=>k(o=>({...o,name:i.target.value})),required:!0}),s.jsx(c,{label:"Email Address",type:"email",value:P.email,onChange:i=>k(o=>({...o,email:i.target.value})),required:!0}),s.jsxs(Ue,{children:[s.jsx(p,{type:"button",variant:"secondary",onClick:()=>w(!1),children:"Cancel"}),s.jsx(p,{type:"submit",variant:"primary",isLoading:I.isPending,children:"Create Admin"})]})]})})]})},Le=()=>ee(t=>t.role)==="super_admin"?s.jsx(me,{}):s.jsx(Ie,{});export{Le as SettingsPage};
