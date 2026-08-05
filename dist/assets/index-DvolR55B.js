import{g as e,u as $,a as b,j as r,R as y,b as j,B as c,c as k}from"./index-BUalwBCD.js";import{u as v,a as S,o as L,s as g}from"./types-Dc3CQDVS.js";import{u as E}from"./useMutation-ByNtmxWc.js";import{I as u}from"./Input-D2KrMr1i.js";const z={id:"user-super-admin",name:"Alex Rivera (Super Admin)",email:"admin@pwc.com",role:"super_admin"},A={id:"user-admin-sarah",name:"Sarah Connor",email:"sarah.connor@pwc-global.com",role:"admin"},C={id:"user-counselor-john",name:"John Doe",email:"counselor@pwc.com",role:"counselor"},s="mock-jwt-token-12345",R={login:async o=>{if(await new Promise(t=>setTimeout(t,400)),o.email==="admin@pwc.com")return{user:z,token:s};if(o.email==="sarah.connor@pwc-global.com")return{user:A,token:s};if(o.email==="counselor@pwc.com")return{user:C,token:s};if(o.password.length>0)return{user:{id:"user-admin",name:o.email.split("@")[0].replace("."," ")||"kREATE Admin",email:o.email,role:"admin"},token:s};throw new Error("Invalid email or password")},logout:async()=>{await new Promise(o=>setTimeout(o,300))},refreshToken:async o=>{if(await new Promise(t=>setTimeout(t,400)),o===s)return s;throw new Error("Invalid token")}},P=e.div`
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
`,T=e.div`
  width: 100%;
  max-width: 440px;
  background-color: ${({theme:o})=>o.colors.surface};
  border-radius: ${({theme:o})=>o.borderRadius.xl};
  box-shadow: ${({theme:o})=>o.colors.shadowLg};
  padding: ${({theme:o})=>o.spacing.xxl};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-top: 4px solid ${({theme:o})=>o.colors.primary};
`,I=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,O=e.div`
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
`,H=e.div`
  display: flex;
  flex-direction: column;
`,M=e.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,U=e.p`
  font-size: 12px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,_=e.div`
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,D=e.h2`
  font-size: ${({theme:o})=>o.fontSize.xl};
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0 0 4px 0;
`,N=e.p`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,W=e.form`
  display: flex;
  flex-direction: column;
`,F=e.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,B=e.button`
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
`,K=e.div`
  margin-top: ${({theme:o})=>o.spacing.xl};
  padding: ${({theme:o})=>o.spacing.md};
  background-color: ${({theme:o})=>o.colors.primaryLight};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  border: 1px solid ${({theme:o})=>o.colors.primaryMuted};
`,G=e.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0 0 8px 0;
  text-align: center;
`,J=e.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,V=e.div`
  background-color: ${({theme:o})=>o.colors.dangerLight};
  border: 1px solid ${({theme:o})=>o.colors.danger};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  padding: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.md};
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,q=L({email:g().email("Enter a valid email"),password:g().min(1,"Password is required")}),oo=()=>{var m,p;const o=$(),t=b(n=>n.login),{register:l,handleSubmit:x,setValue:i,formState:{errors:d}}=v({resolver:S(q)}),a=E({mutationFn:n=>R.login(n),onSuccess:n=>{t(n.user,n.token),o(k.DASHBOARD)}}),h=()=>{i("email","sarah.connor@pwc-global.com"),i("password","PWC@User2026!")},f=()=>{i("email","admin@pwc.com"),i("password","admin123")},w=()=>{i("email","counselor@pwc.com"),i("password","counselor123")};return r.jsx(P,{children:r.jsxs(T,{children:[r.jsxs(I,{children:[r.jsx(O,{children:"k"}),r.jsxs(H,{children:[r.jsx(M,{children:"kREATE Portal"}),r.jsx(U,{children:"Career Counselling Platform"})]})]}),r.jsxs(_,{children:[r.jsx(D,{children:"Sign In"}),r.jsx(N,{children:"Enter your user credentials to access your portal"})]}),r.jsxs(W,{onSubmit:x(n=>a.mutate(n)),noValidate:!0,children:[a.isError&&r.jsx(V,{role:"alert",children:a.error instanceof Error?a.error.message:"An error occurred. Please try again."}),r.jsxs(F,{children:[r.jsx(u,{label:"Username / Email",type:"email",placeholder:"Enter your username or email",leftIcon:r.jsx(y,{size:18}),autoComplete:"email",error:(m=d.email)==null?void 0:m.message,...l("email")}),r.jsx(u,{label:"Password",type:"password",placeholder:"Enter your password",leftIcon:r.jsx(j,{size:18}),autoComplete:"current-password",error:(p=d.password)==null?void 0:p.message,...l("password")})]}),r.jsx(c,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",isLoading:a.isPending,children:"LOG IN"}),r.jsx(B,{type:"button",children:"Forgot Password?"})]}),r.jsxs(K,{children:[r.jsx(G,{children:"Quick Demo Login Shortcuts"}),r.jsxs(J,{children:[r.jsx(c,{size:"sm",variant:"secondary",onClick:f,children:"Super Admin (admin@pwc.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:h,children:"kREATE User / Admin (sarah.connor@pwc-global.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:w,children:"Counselor (counselor@pwc.com)"})]})]})]})})};export{oo as LoginPage};
