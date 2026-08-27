import{e as f,q as w,r as g,j as s,c as b,s as y,t as j,B as p,v as $,g as o,a as v}from"./index-CQIsxyVc.js";import{P}from"./PageHeader-BviCOs3E.js";import{C as m}from"./Card-DBSouhuv.js";import{I as i}from"./Input-BTc8i6Fv.js";import"./Breadcrumb-CQhppWVK.js";import"./Tooltip-5yEO6vap.js";import"./Card.styles-riY3W49l.js";const S=o.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xs};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
  overflow-x: auto;
`,x=o.button`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e,$active:r})=>r?e.fontWeight.semibold:e.fontWeight.medium};
  color: ${({theme:e,$active:r})=>r?e.colors.primary:e.colors.textSecondary};
  border-bottom: 2px solid
    ${({theme:e,$active:r})=>r?e.colors.primary:"transparent"};
  transition: all ${({theme:e})=>e.transition.fast};
  white-space: nowrap;

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
  }
`,C=o.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  max-width: 640px;
`,T=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,z=o.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,A=o.div`
  h4 {
    font-size: ${({theme:e})=>e.fontSize.base};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }
  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,k=()=>{const e=f(),{theme:r,toggleTheme:u}=w(),[t,c]=g.useState("security");return s.jsxs("div",{children:[s.jsx(P,{title:"Super Admin Platform Settings",subtitle:"Manage platform global configurations, master security policies, and system preferences",breadcrumbs:[{label:"Dashboard",href:b.DASHBOARD},{label:"Settings"}]}),s.jsxs(S,{children:[s.jsxs(x,{$active:t==="security",onClick:()=>c("security"),children:[s.jsx(y,{size:18})," Security"]}),s.jsxs(x,{$active:t==="appearance",onClick:()=>c("appearance"),children:[s.jsx(j,{size:18})," Appearance"]})]}),t==="security"&&s.jsx(m,{title:"Security Settings",subtitle:"Manage your password and security preferences",children:s.jsxs(C,{onSubmit:a=>{a.preventDefault(),e.success("Password Updated","Your password has been changed successfully.")},children:[s.jsx(i,{label:"Current Password",type:"password",placeholder:"Enter current password"}),s.jsx(i,{label:"New Password",type:"password",placeholder:"Enter new password"}),s.jsx(i,{label:"Confirm New Password",type:"password",placeholder:"Confirm new password"}),s.jsx("div",{children:s.jsx(p,{type:"submit",leftIcon:s.jsx($,{size:18}),children:"Update Password"})})]})}),t==="appearance"&&s.jsx(m,{title:"Appearance & Theme Preferences",subtitle:"Customize interface mode and visual styling",children:s.jsx(z,{children:s.jsxs(T,{children:[s.jsxs(A,{children:[s.jsx("h4",{children:"Interface Theme Mode"}),s.jsxs("p",{children:["Current theme mode: ",s.jsx("strong",{children:r.toUpperCase()})]})]}),s.jsxs(p,{variant:"secondary",onClick:u,children:["Toggle ",r==="light"?"Dark Mode":"Light Mode"]})]})})})]})},D=o.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xs};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  overflow-x: auto;
`,h=o.button`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({$active:e,theme:r})=>e?r.colors.primary:"transparent"};
  color: ${({$active:e,theme:r})=>e?r.colors.primary:r.colors.textSecondary};
  font-weight: ${({$active:e,theme:r})=>e?r.fontWeight.bold:r.fontWeight.medium};
  font-size: ${({theme:e})=>e.fontSize.sm};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
  }
`,M=o.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  max-width: 600px;
`,R=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,I=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,U=o.div`
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
`,W=()=>{const e=f(),{theme:r,toggleTheme:u}=w(),[t,c]=g.useState("security"),[a,d]=g.useState({currentPassword:"",newPassword:"",confirmPassword:""});return s.jsxs("div",{children:[s.jsx(P,{title:"Settings",subtitle:"Manage your security policies and appearance preferences.",breadcrumbs:[{label:"Dashboard",href:b.DASHBOARD},{label:"Settings"}]}),s.jsxs(D,{children:[s.jsxs(h,{$active:t==="security",onClick:()=>c("security"),children:[s.jsx(y,{size:18})," Security"]}),s.jsxs(h,{$active:t==="appearance",onClick:()=>c("appearance"),children:[s.jsx(j,{size:18})," Appearance"]})]}),t==="security"&&s.jsx(m,{title:"Change Password",subtitle:"Update your account password to maintain account security",children:s.jsxs(M,{onSubmit:n=>{if(n.preventDefault(),a.newPassword!==a.confirmPassword){e.error("Password Mismatch","New password and confirm password do not match.");return}if(a.newPassword.length<6){e.error("Weak Password","Password must be at least 6 characters long.");return}e.success("Password Updated","Your password has been changed successfully."),d({currentPassword:"",newPassword:"",confirmPassword:""})},children:[s.jsx(i,{label:"Current Password",type:"password",placeholder:"Enter current password",value:a.currentPassword,onChange:n=>d(l=>({...l,currentPassword:n.target.value})),required:!0}),s.jsx(i,{label:"New Password",type:"password",placeholder:"Enter new password (min. 6 chars)",value:a.newPassword,onChange:n=>d(l=>({...l,newPassword:n.target.value})),required:!0}),s.jsx(i,{label:"Confirm New Password",type:"password",placeholder:"Re-enter new password",value:a.confirmPassword,onChange:n=>d(l=>({...l,confirmPassword:n.target.value})),required:!0}),s.jsx("div",{children:s.jsx(p,{type:"submit",leftIcon:s.jsx($,{size:18}),children:"Update Password"})})]})}),t==="appearance"&&s.jsx(m,{title:"Appearance & Theme Preferences",subtitle:"Customize interface mode and visual styling",children:s.jsx(R,{children:s.jsxs(I,{children:[s.jsxs(U,{children:[s.jsx("h4",{children:"Interface Theme Mode"}),s.jsxs("p",{children:["Current theme mode: ",s.jsx("strong",{children:r.toUpperCase()})]})]}),s.jsxs(p,{variant:"secondary",onClick:u,children:["Toggle ",r==="light"?"Dark Mode":"Light Mode"]})]})})})]})},O=()=>v(r=>r.role)==="super_admin"?s.jsx(k,{}):s.jsx(W,{});export{O as SettingsPage};
