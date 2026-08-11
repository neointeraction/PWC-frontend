import{g as o,u as y,e as P,a as $,j as s,l as b,f as j,b as a,B as S,h as T,c as n}from"./index-DdWrmQ5m.js";import{u as v,a as z,o as R,s as d}from"./types-DcN95KYk.js";import{I as l}from"./Input-DX62Yo-K.js";const L=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({theme:e})=>e.colors.primaryLight} 0%,
    ${({theme:e})=>e.colors.background} 100%
  );
  padding: ${({theme:e})=>e.spacing.lg};
`,C=o.div`
  width: 100%;
  max-width: 480px;
  background-color: ${({theme:e})=>e.colors.surface};
  border-radius: 4px;
  box-shadow: ${({theme:e})=>e.colors.shadowLg};
  padding: ${({theme:e})=>e.spacing.xxl};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-top: 4px solid ${({theme:e})=>e.colors.primary};
`,E=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`;o.div`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background: linear-gradient(
    135deg,
    ${({theme:e})=>e.colors.primary} 0%,
    ${({theme:e})=>e.colors.primaryHover} 100%
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 22px;
  box-shadow: 0 4px 12px ${({theme:e})=>`${e.colors.primary}33`};
`;const k=o.div`
  display: flex;
  flex-direction: column;
`,A=o.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,I=o.p`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,N=o.div`
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`,O=o.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0 0 6px 0;
`,W=o.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`,q=o.div`
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>`${e.colors.primary}33`};
  border-radius: 4px;
  padding: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.lg};
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing.sm};
`,D=o.span`
  font-size: ${({theme:e})=>e.fontSize.xs};
  color: ${({theme:e})=>e.colors.primary};
  line-height: 1.4;
`,F=o.form`
  display: flex;
  flex-direction: column;
`,U=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`;o.ul`
  margin: ${({theme:e})=>e.spacing.xs} 0 0 0;
  padding-left: ${({theme:e})=>e.spacing.lg};
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};

  li {
    margin-bottom: 2px;
  }
`;const B=R({currentPassword:d().min(1,"Current password is required"),newPassword:d().min(1,"New password is required"),confirmPassword:d().min(1,"Please confirm your new password")}).refine(e=>e.newPassword===e.confirmPassword,{message:"Passwords do not match",path:["confirmPassword"]}),K=()=>{var c,p,g;const e=y(),u=P(),{role:r,setMustResetPassword:m}=$(),{register:t,handleSubmit:x,formState:{errors:i,isSubmitting:w}}=v({resolver:z(B)}),f=async H=>{await new Promise(h=>setTimeout(h,600)),m(!1),u.success("Password Changed Successfully","Your account security details have been updated. Welcome to your portal."),e(r==="counselor"?n.UPCOMING_SESSIONS:r==="student"?n.STUDENT_PORTAL:n.DASHBOARD)};return s.jsx(L,{children:s.jsxs(C,{children:[s.jsxs(E,{children:[s.jsx("img",{src:b,alt:"kREATE Logo",style:{width:40,height:40,objectFit:"contain"}}),s.jsxs(k,{children:[s.jsx(A,{children:"kREATE Portal"}),s.jsx(I,{children:"Career Counselling Platform"})]})]}),s.jsxs(N,{children:[s.jsx(O,{children:"Mandatory Password Change"}),s.jsx(W,{children:r==="student"?"Student first-time login detected. Please update your temporary account password to proceed.":"Counselor first-time login detected. Please update your temporary account password to proceed."})]}),s.jsxs(q,{children:[s.jsx(j,{size:20,style:{color:"#5D2384",flexShrink:0,marginTop:"2px"}}),s.jsx(D,{children:r==="student"?"For privacy and security regulations, students are required to set a unique personal password upon first login.":"For privacy and security regulations, counselors are required to set a unique personal password upon first login."})]}),s.jsxs(F,{onSubmit:x(f),noValidate:!0,children:[s.jsxs(U,{children:[s.jsx(l,{label:"Current / Temporary Password",type:"password",placeholder:"Enter current password",leftIcon:s.jsx(a,{size:18}),error:(c=i.currentPassword)==null?void 0:c.message,...t("currentPassword")}),s.jsx(l,{label:"New Password",type:"password",placeholder:"Enter new password",leftIcon:s.jsx(a,{size:18}),error:(p=i.newPassword)==null?void 0:p.message,...t("newPassword")}),s.jsx(l,{label:"Confirm New Password",type:"password",placeholder:"Re-enter new password",leftIcon:s.jsx(a,{size:18}),error:(g=i.confirmPassword)==null?void 0:g.message,...t("confirmPassword")})]}),s.jsx(S,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",leftIcon:s.jsx(T,{size:18}),isLoading:w,children:"UPDATE PASSWORD & CONTINUE"})]})]})})};export{K as ResetPasswordPage};
