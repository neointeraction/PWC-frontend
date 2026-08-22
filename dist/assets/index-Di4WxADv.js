import{g as e,u as y,e as P,a as b,j as r,k as $,f as j,b as i,B as S,h as v,c as t}from"./index-BZPOwNvj.js";import{u as R,a as T,o as L,s as n}from"./types-p0I6VHO0.js";import{I as c}from"./Input-DriY2aBZ.js";const z=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({theme:s})=>s.colors.primaryLight} 0%,
    ${({theme:s})=>s.colors.background} 100%
  );
  padding: ${({theme:s})=>s.spacing.lg};
`,I=e.div`
  width: 100%;
  max-width: 480px;
  background-color: ${({theme:s})=>s.colors.surface};
  border-radius: 4px;
  box-shadow: ${({theme:s})=>s.colors.shadowLg};
  padding: ${({theme:s})=>s.spacing.xxl};
  border: 1px solid ${({theme:s})=>s.colors.border};
  border-top: 4px solid ${({theme:s})=>s.colors.primary};
`,k=e.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({theme:s})=>s.spacing.xl};
`,A=e.img`
  height: 48px;
  width: auto;
  object-fit: contain;
`,E=e.div`
  margin-bottom: ${({theme:s})=>s.spacing.lg};
`,C=e.h2`
  font-size: ${({theme:s})=>s.fontSize.xl};
  font-weight: 700;
  color: ${({theme:s})=>s.colors.text};
  margin: 0;
`,N=e.div`
  background-color: ${({theme:s})=>s.colors.primaryLight};
  border: 1px solid ${({theme:s})=>`${s.colors.primary}33`};
  border-radius: 4px;
  padding: ${({theme:s})=>s.spacing.md};
  margin-bottom: ${({theme:s})=>s.spacing.lg};
  display: flex;
  align-items: flex-start;
  gap: ${({theme:s})=>s.spacing.sm};
`,O=e.div`
  color: ${({theme:s})=>s.colors.primary};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-top: 2px;
`,W=e.span`
  font-size: ${({theme:s})=>s.fontSize.xs};
  color: ${({theme:s})=>s.colors.primary};
  line-height: 1.4;
`,D=e.form`
  display: flex;
  flex-direction: column;
`,U=e.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:s})=>s.spacing.md};
  margin-bottom: ${({theme:s})=>s.spacing.xl};
`;e.ul`
  margin: ${({theme:s})=>s.spacing.xs} 0 0 0;
  padding-left: ${({theme:s})=>s.spacing.lg};
  font-size: 12px;
  color: ${({theme:s})=>s.colors.textSecondary};

  li {
    margin-bottom: 2px;
  }
`;const q=L({currentPassword:n().min(1,"Current password is required"),newPassword:n().min(1,"New password is required"),confirmPassword:n().min(1,"Please confirm your new password")}).refine(s=>s.newPassword===s.confirmPassword,{message:"Passwords do not match",path:["confirmPassword"]}),G=()=>{var l,p,g;const s=y(),m=P(),{role:d,setMustResetPassword:u}=b(),{register:o,handleSubmit:x,formState:{errors:a,isSubmitting:w}}=R({resolver:T(q)}),f=async B=>{await new Promise(h=>setTimeout(h,600)),u(!1),m.success("Password Changed Successfully","Your account security details have been updated. Welcome to your portal."),s(d==="counselor"?t.UPCOMING_SESSIONS:d==="student"?t.STUDENT_PORTAL:t.DASHBOARD)};return r.jsx(z,{children:r.jsxs(I,{children:[r.jsx(k,{children:r.jsx(A,{src:$,alt:"kREATE Logo"})}),r.jsx(E,{children:r.jsx(C,{children:"Mandatory Password Change"})}),r.jsxs(N,{children:[r.jsx(O,{children:r.jsx(j,{size:20})}),r.jsx(W,{children:"For privacy and security regulations, you are required to set a unique personal password upon first login."})]}),r.jsxs(D,{onSubmit:x(f),noValidate:!0,children:[r.jsxs(U,{children:[r.jsx(c,{label:"Current / Temporary Password",type:"password",placeholder:"Enter current password",leftIcon:r.jsx(i,{size:18}),error:(l=a.currentPassword)==null?void 0:l.message,...o("currentPassword")}),r.jsx(c,{label:"New Password",type:"password",placeholder:"Enter new password",leftIcon:r.jsx(i,{size:18}),error:(p=a.newPassword)==null?void 0:p.message,...o("newPassword")}),r.jsx(c,{label:"Confirm New Password",type:"password",placeholder:"Re-enter new password",leftIcon:r.jsx(i,{size:18}),error:(g=a.confirmPassword)==null?void 0:g.message,...o("confirmPassword")})]}),r.jsx(S,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",leftIcon:r.jsx(v,{size:18}),isLoading:w,children:"UPDATE PASSWORD & CONTINUE"})]})]})})};export{G as ResetPasswordPage};
