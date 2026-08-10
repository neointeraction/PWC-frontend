import{g as e,u as S,a as y,j as r,l as j,R as v,b as k,B as c,c as p}from"./index-D-K1gLqS.js";import{u as E,a as A,o as L,s as g}from"./types-BhCtGHqx.js";import{u as T}from"./useMutation-DttQCKYh.js";import{I as x}from"./Input-DaM42ekN.js";const z={id:"user-super-admin",name:"Aarav Sharma (Super Admin)",email:"admin@pwc.com",role:"super_admin"},R={id:"user-admin-sunita",name:"Sunita Sharma",email:"sunita.sharma@pwc-global.com",role:"admin"},C={id:"user-counselor-mahesh",name:"Mahesh Pillai",email:"counselor@pwc.com",role:"counselor"},P={id:"user-student-aarav",name:"Aarav Sharma",email:"student@pwc.com",role:"student"},n="mock-jwt-token-12345",I={login:async o=>{if(await new Promise(t=>setTimeout(t,400)),o.email==="admin@pwc.com")return{user:z,token:n};if(o.email==="sunita.sharma@pwc-global.com")return{user:R,token:n};if(o.email==="counselor@pwc.com")return{user:C,token:n};if(o.email==="student@pwc.com")return{user:P,token:n};if(o.password.length>0)return{user:{id:"user-admin",name:o.email.split("@")[0].replace("."," ")||"kREATE Admin",email:o.email,role:"admin"},token:n};throw new Error("Invalid email or password")},logout:async()=>{await new Promise(o=>setTimeout(o,300))},refreshToken:async o=>{if(await new Promise(t=>setTimeout(t,400)),o===n)return n;throw new Error("Invalid token")}},O=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({theme:o})=>o.colors.primaryLight} 0%,
    ${({theme:o})=>o.colors.background} 100%
  );
  padding: ${({theme:o})=>o.spacing.lg};
`,M=e.div`
  width: 100%;
  max-width: 440px;
  background-color: ${({theme:o})=>o.colors.surface};
  border-radius: ${({theme:o})=>o.borderRadius.xl};
  box-shadow: ${({theme:o})=>o.colors.shadowLg};
  padding: ${({theme:o})=>o.spacing.xxl};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-top: 4px solid ${({theme:o})=>o.colors.primary};
`,_=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`;e.div`
  width: 44px;
  height: 44px;
  border-radius: ${({theme:o})=>o.borderRadius.lg};
  background: linear-gradient(
    135deg,
    ${({theme:o})=>o.colors.primary} 0%,
    ${({theme:o})=>o.colors.primaryHover} 100%
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 22px;
  box-shadow: 0 4px 12px ${({theme:o})=>`${o.colors.primary}33`};
`;const U=e.div`
  display: flex;
  flex-direction: column;
`,D=e.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,H=e.p`
  font-size: 12px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,N=e.div`
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,W=e.h2`
  font-size: ${({theme:o})=>o.fontSize.xl};
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0 0 4px 0;
`,F=e.p`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,K=e.form`
  display: flex;
  flex-direction: column;
`,B=e.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,V=e.button`
  background: none;
  border: none;
  color: ${({theme:o})=>o.colors.primary};
  font-weight: ${({theme:o})=>o.fontWeight.medium};
  font-size: ${({theme:o})=>o.fontSize.xs};
  cursor: pointer;
  margin-top: ${({theme:o})=>o.spacing.md};
  text-align: center;
  width: 100%;

  &:hover {
    color: ${({theme:o})=>o.colors.primaryHover};
    text-decoration: underline;
  }
`,G=e.div`
  margin-top: ${({theme:o})=>o.spacing.xl};
  padding: ${({theme:o})=>o.spacing.md};
  background-color: ${({theme:o})=>o.colors.primaryLight};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  border: 1px solid ${({theme:o})=>o.colors.primaryMuted};
`,q=e.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0 0 8px 0;
  text-align: center;
`,Q=e.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,J=e.div`
  background-color: ${({theme:o})=>o.colors.dangerLight};
  border: 1px solid ${({theme:o})=>o.colors.danger};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  padding: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.md};
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,X=L({email:g().email("Enter a valid email"),password:g().min(1,"Password is required")}),eo=()=>{var m,u;const o=S(),t=y(s=>s.login),{register:l,handleSubmit:h,setValue:i,formState:{errors:d}}=E({resolver:A(X)}),a=T({mutationFn:s=>I.login(s),onSuccess:s=>{t(s.user,s.token),s.user.role==="counselor"||s.user.role==="student"?o(p.RESET_PASSWORD):o(p.DASHBOARD)}}),w=()=>{i("email","sunita.sharma@pwc-global.com"),i("password","PWC@User2026!")},f=()=>{i("email","admin@pwc.com"),i("password","admin123")},b=()=>{i("email","counselor@pwc.com"),i("password","counselor123")},$=()=>{i("email","student@pwc.com"),i("password","student123")};return r.jsx(O,{children:r.jsxs(M,{children:[r.jsxs(_,{children:[r.jsx("img",{src:j,alt:"kREATE Logo",style:{width:40,height:40,objectFit:"contain"}}),r.jsxs(U,{children:[r.jsx(D,{children:"kREATE Portal"}),r.jsx(H,{children:"Career Counselling Platform"})]})]}),r.jsxs(N,{children:[r.jsx(W,{children:"Sign In"}),r.jsx(F,{children:"Enter your user credentials to access your portal"})]}),r.jsxs(K,{onSubmit:h(s=>a.mutate(s)),noValidate:!0,children:[a.isError&&r.jsx(J,{role:"alert",children:a.error instanceof Error?a.error.message:"An error occurred. Please try again."}),r.jsxs(B,{children:[r.jsx(x,{label:"Username / Email",type:"email",placeholder:"Enter your username or email",leftIcon:r.jsx(v,{size:18}),autoComplete:"email",error:(m=d.email)==null?void 0:m.message,...l("email")}),r.jsx(x,{label:"Password",type:"password",placeholder:"Enter your password",leftIcon:r.jsx(k,{size:18}),autoComplete:"current-password",error:(u=d.password)==null?void 0:u.message,...l("password")})]}),r.jsx(c,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",isLoading:a.isPending,children:"LOG IN"}),r.jsx(V,{type:"button",children:"Forgot Password?"})]}),r.jsxs(G,{children:[r.jsx(q,{children:"Quick Demo Login Shortcuts"}),r.jsxs(Q,{children:[r.jsx(c,{size:"sm",variant:"secondary",onClick:f,children:"Super Admin (admin@pwc.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:w,children:"kREATE User / Admin (sunita.sharma@pwc-global.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:b,children:"Counselor (counselor@pwc.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:$,children:"Student (student@pwc.com)"})]})]})]})})};export{eo as LoginPage};
