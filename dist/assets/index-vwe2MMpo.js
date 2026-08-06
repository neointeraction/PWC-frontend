import{g as o,u as f,d as y,a as $,j as e,l as b,e as P,b as i,B as j,f as S,c as v}from"./index-BLYAqq6p.js";import{u as z,a as T,o as R,s as a}from"./types-D_IxL0bc.js";import{I as n}from"./Input-Bcja1afE.js";const L=o.div`
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
`,C=o.div`
  width: 100%;
  max-width: 480px;
  background-color: ${({theme:s})=>s.colors.surface};
  border-radius: 4px;
  box-shadow: ${({theme:s})=>s.colors.shadowLg};
  padding: ${({theme:s})=>s.spacing.xxl};
  border: 1px solid ${({theme:s})=>s.colors.border};
  border-top: 4px solid ${({theme:s})=>s.colors.primary};
`,E=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:s})=>s.spacing.md};
  margin-bottom: ${({theme:s})=>s.spacing.xl};
`;o.div`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background: linear-gradient(
    135deg,
    ${({theme:s})=>s.colors.primary} 0%,
    ${({theme:s})=>s.colors.primaryHover} 100%
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 22px;
  box-shadow: 0 4px 12px ${({theme:s})=>`${s.colors.primary}33`};
`;const k=o.div`
  display: flex;
  flex-direction: column;
`,I=o.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${({theme:s})=>s.colors.text};
  margin: 0;
`,N=o.p`
  font-size: 12px;
  color: ${({theme:s})=>s.colors.textSecondary};
  margin: 0;
`,A=o.div`
  margin-bottom: ${({theme:s})=>s.spacing.xl};
`,W=o.h2`
  font-size: ${({theme:s})=>s.fontSize.xl};
  font-weight: 700;
  color: ${({theme:s})=>s.colors.text};
  margin: 0 0 6px 0;
`,F=o.p`
  font-size: ${({theme:s})=>s.fontSize.sm};
  color: ${({theme:s})=>s.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`,O=o.div`
  background-color: ${({theme:s})=>s.colors.primaryLight};
  border: 1px solid ${({theme:s})=>`${s.colors.primary}33`};
  border-radius: 4px;
  padding: ${({theme:s})=>s.spacing.md};
  margin-bottom: ${({theme:s})=>s.spacing.lg};
  display: flex;
  align-items: flex-start;
  gap: ${({theme:s})=>s.spacing.sm};
`,q=o.span`
  font-size: ${({theme:s})=>s.fontSize.xs};
  color: ${({theme:s})=>s.colors.primary};
  line-height: 1.4;
`,M=o.form`
  display: flex;
  flex-direction: column;
`,U=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:s})=>s.spacing.md};
  margin-bottom: ${({theme:s})=>s.spacing.xl};
`;o.ul`
  margin: ${({theme:s})=>s.spacing.xs} 0 0 0;
  padding-left: ${({theme:s})=>s.spacing.lg};
  font-size: 12px;
  color: ${({theme:s})=>s.colors.textSecondary};

  li {
    margin-bottom: 2px;
  }
`;const B=R({currentPassword:a().min(1,"Current password is required"),newPassword:a().min(1,"New password is required"),confirmPassword:a().min(1,"Please confirm your new password")}).refine(s=>s.newPassword===s.confirmPassword,{message:"Passwords do not match",path:["confirmPassword"]}),_=()=>{var c,l,d;const s=f(),g=y(),m=$(p=>p.setMustResetPassword),{register:r,handleSubmit:x,formState:{errors:t,isSubmitting:u}}=z({resolver:T(B)}),w=async p=>{await new Promise(h=>setTimeout(h,600)),m(!1),g.success("Password Changed Successfully","Your account security details have been updated. Welcome to your portal."),s(v.UPCOMING_SESSIONS)};return e.jsx(L,{children:e.jsxs(C,{children:[e.jsxs(E,{children:[e.jsx("img",{src:b,alt:"kREATE Logo",style:{width:40,height:40,objectFit:"contain"}}),e.jsxs(k,{children:[e.jsx(I,{children:"kREATE Portal"}),e.jsx(N,{children:"Career Counselling Platform"})]})]}),e.jsxs(A,{children:[e.jsx(W,{children:"Mandatory Password Change"}),e.jsx(F,{children:"Counselor first-time login detected. Please update your temporary account password to proceed."})]}),e.jsxs(O,{children:[e.jsx(P,{size:20,style:{color:"#5D2384",flexShrink:0,marginTop:"2px"}}),e.jsx(q,{children:"For privacy and security regulations, counselors are required to set a unique personal password upon first login."})]}),e.jsxs(M,{onSubmit:x(w),noValidate:!0,children:[e.jsxs(U,{children:[e.jsx(n,{label:"Current / Temporary Password",type:"password",placeholder:"Enter current password",leftIcon:e.jsx(i,{size:18}),error:(c=t.currentPassword)==null?void 0:c.message,...r("currentPassword")}),e.jsx(n,{label:"New Password",type:"password",placeholder:"Enter new password",leftIcon:e.jsx(i,{size:18}),error:(l=t.newPassword)==null?void 0:l.message,...r("newPassword")}),e.jsx(n,{label:"Confirm New Password",type:"password",placeholder:"Re-enter new password",leftIcon:e.jsx(i,{size:18}),error:(d=t.confirmPassword)==null?void 0:d.message,...r("confirmPassword")})]}),e.jsx(j,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",leftIcon:e.jsx(S,{size:18}),isLoading:u,children:"UPDATE PASSWORD & CONTINUE"})]})]})})};export{_ as ResetPasswordPage};
