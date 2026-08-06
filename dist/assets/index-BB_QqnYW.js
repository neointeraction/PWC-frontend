import{p as P,q as S,r as f,j as s,c as C,h as T,t as z,B as m,v as y,g as n,w as A,x as k,a as D}from"./index-Leifw_BN.js";import{P as I,C as g}from"./Card-L3l7UyC_.js";import{I as a}from"./Input-CQTuhQeg.js";import{u as M}from"./useMutation-Bt02FSpx.js";import{m as R}from"./settings.mock-peWmX9sh.js";const U=n.div`
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
`,F=n.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
  max-width: 640px;
`,W=n.div`
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
`,L=n.div`
  h4 {
    font-size: ${({theme:e})=>e.fontSize.base};
    font-weight: ${({theme:e})=>e.fontWeight.semibold};
    color: ${({theme:e})=>e.colors.text};
  }
  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`,B=()=>{const e=P(),{theme:t,toggleTheme:h}=S(),[l,i]=f.useState("security");return s.jsxs("div",{children:[s.jsx(I,{title:"Super Admin Platform Settings",subtitle:"Manage platform global configurations, master security policies, and system preferences",breadcrumbs:[{label:"Dashboard",href:C.DASHBOARD},{label:"Settings"}]}),s.jsxs(U,{children:[s.jsxs(v,{$active:l==="security",onClick:()=>i("security"),children:[s.jsx(T,{size:18})," Security"]}),s.jsxs(v,{$active:l==="appearance",onClick:()=>i("appearance"),children:[s.jsx(z,{size:18})," Appearance"]})]}),l==="security"&&s.jsx(g,{title:"Security Settings",subtitle:"Manage your password and security preferences",children:s.jsxs(F,{onSubmit:p=>{p.preventDefault(),e.success("Password Updated","Your password has been changed successfully.")},children:[s.jsx(a,{label:"Current Password",type:"password",placeholder:"Enter current password"}),s.jsx(a,{label:"New Password",type:"password",placeholder:"Enter new password"}),s.jsx(a,{label:"Confirm New Password",type:"password",placeholder:"Confirm new password"}),s.jsx("div",{children:s.jsx(m,{type:"submit",leftIcon:s.jsx(y,{size:18}),children:"Update Password"})})]})}),l==="appearance"&&s.jsx(g,{title:"Appearance & Theme Preferences",subtitle:"Customize interface mode and visual styling",children:s.jsx(E,{children:s.jsxs(W,{children:[s.jsxs(L,{children:[s.jsx("h4",{children:"Interface Theme Mode"}),s.jsxs("p",{children:["Current theme mode: ",s.jsx("strong",{children:t.toUpperCase()})]})]}),s.jsxs(m,{variant:"secondary",onClick:h,children:["Toggle ",t==="light"?"Dark Mode":"Light Mode"]})]})})})]})};let b={...R};const N={updateInstitutionProfile:async e=>(await new Promise(t=>setTimeout(t,500)),b={...b,...e},{...b})},q=n.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.xs};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  overflow-x: auto;
`,w=n.button`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.xs};
  padding: ${({theme:e})=>e.spacing.sm} ${({theme:e})=>e.spacing.md};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({$active:e,theme:t})=>e?t.colors.primary:"transparent"};
  color: ${({$active:e,theme:t})=>e?t.colors.primary:t.colors.textSecondary};
  font-weight: ${({$active:e,theme:t})=>e?t.fontWeight.bold:t.fontWeight.medium};
  font-size: ${({theme:e})=>e.fontSize.sm};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: ${({theme:e})=>e.colors.primary};
  }
`,$=n.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  max-width: 600px;
`,H=n.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,O=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme:e})=>e.spacing.md} 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,Q=n.div`
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
`,Y=()=>{const e=A(),t=P(),{theme:h,toggleTheme:l}=S(),[i,p]=f.useState("institution"),[c,u]=f.useState({name:"Phoenix Water Club Career Institute",email:"sarah.connor@pwc-global.com",phone:"+1 (555) 234-5678",address:"750 Academic Parkway, San Francisco, CA 94107",website:"https://careers.phoenixwaterclub.edu"}),[d,x]=f.useState({currentPassword:"",newPassword:"",confirmPassword:""}),j=M({mutationFn:N.updateInstitutionProfile,onSuccess:()=>{e.invalidateQueries({queryKey:["institution-profile"]}),t.success("Profile Saved","Updated institution profile information.")}});return s.jsxs("div",{children:[s.jsx(I,{title:"Settings",subtitle:"Manage your institution preferences, security, and appearance settings.",breadcrumbs:[{label:"Dashboard",href:C.DASHBOARD},{label:"Settings"}]}),s.jsxs(q,{children:[s.jsxs(w,{$active:i==="institution",onClick:()=>p("institution"),children:[s.jsx(k,{size:18})," Institution"]}),s.jsxs(w,{$active:i==="security",onClick:()=>p("security"),children:[s.jsx(T,{size:18})," Security"]}),s.jsxs(w,{$active:i==="appearance",onClick:()=>p("appearance"),children:[s.jsx(z,{size:18})," Appearance"]})]}),i==="institution"&&s.jsx(g,{title:"Institution Details",subtitle:"Update public contact info and institution metadata",children:s.jsxs($,{onSubmit:r=>{r.preventDefault(),j.mutate(c)},children:[s.jsx(a,{label:"Institution Name",value:c.name,onChange:r=>u(o=>({...o,name:r.target.value}))}),s.jsx(a,{label:"Primary Email",type:"email",value:c.email,onChange:r=>u(o=>({...o,email:r.target.value}))}),s.jsx(a,{label:"Phone Number",value:c.phone,onChange:r=>u(o=>({...o,phone:r.target.value}))}),s.jsx(a,{label:"Physical Address",value:c.address,onChange:r=>u(o=>({...o,address:r.target.value}))}),s.jsx(a,{label:"Website URL",value:c.website,onChange:r=>u(o=>({...o,website:r.target.value}))}),s.jsx("div",{children:s.jsx(m,{type:"submit",leftIcon:s.jsx(y,{size:18}),isLoading:j.isPending,children:"Save Changes"})})]})}),i==="security"&&s.jsx(g,{title:"Change Password",subtitle:"Update your account password to maintain account security",children:s.jsxs($,{onSubmit:r=>{if(r.preventDefault(),d.newPassword!==d.confirmPassword){t.error("Password Mismatch","New password and confirm password do not match.");return}if(d.newPassword.length<6){t.error("Weak Password","Password must be at least 6 characters long.");return}t.success("Password Updated","Your password has been changed successfully."),x({currentPassword:"",newPassword:"",confirmPassword:""})},children:[s.jsx(a,{label:"Current Password",type:"password",placeholder:"Enter current password",value:d.currentPassword,onChange:r=>x(o=>({...o,currentPassword:r.target.value})),required:!0}),s.jsx(a,{label:"New Password",type:"password",placeholder:"Enter new password (min. 6 chars)",value:d.newPassword,onChange:r=>x(o=>({...o,newPassword:r.target.value})),required:!0}),s.jsx(a,{label:"Confirm New Password",type:"password",placeholder:"Re-enter new password",value:d.confirmPassword,onChange:r=>x(o=>({...o,confirmPassword:r.target.value})),required:!0}),s.jsx("div",{children:s.jsx(m,{type:"submit",leftIcon:s.jsx(y,{size:18}),children:"Update Password"})})]})}),i==="appearance"&&s.jsx(g,{title:"Appearance & Theme Preferences",subtitle:"Customize interface mode and visual styling",children:s.jsx(H,{children:s.jsxs(O,{children:[s.jsxs(Q,{children:[s.jsx("h4",{children:"Interface Theme Mode"}),s.jsxs("p",{children:["Current theme mode: ",s.jsx("strong",{children:h.toUpperCase()})]})]}),s.jsxs(m,{variant:"secondary",onClick:l,children:["Toggle ",h==="light"?"Dark Mode":"Light Mode"]})]})})})]})},X=()=>D(t=>t.role)==="super_admin"?s.jsx(B,{}):s.jsx(Y,{});export{X as SettingsPage};
