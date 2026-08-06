import{g as e,u as $,a as y,j as r,l as j,R as S,b as k,B as c,c as g}from"./index-BLYAqq6p.js";import{u as v,a as E,o as L,s as u}from"./types-D_IxL0bc.js";import{u as A}from"./useMutation-CAd7Y0xf.js";import{I as x}from"./Input-Bcja1afE.js";const R={id:"user-super-admin",name:"Alex Rivera (Super Admin)",email:"admin@pwc.com",role:"super_admin"},z={id:"user-admin-sarah",name:"Sarah Connor",email:"sarah.connor@pwc-global.com",role:"admin"},C={id:"user-counselor-john",name:"John Doe",email:"counselor@pwc.com",role:"counselor"},s="mock-jwt-token-12345",T={login:async o=>{if(await new Promise(t=>setTimeout(t,400)),o.email==="admin@pwc.com")return{user:R,token:s};if(o.email==="sarah.connor@pwc-global.com")return{user:z,token:s};if(o.email==="counselor@pwc.com")return{user:C,token:s};if(o.password.length>0)return{user:{id:"user-admin",name:o.email.split("@")[0].replace("."," ")||"kREATE Admin",email:o.email,role:"admin"},token:s};throw new Error("Invalid email or password")},logout:async()=>{await new Promise(o=>setTimeout(o,300))},refreshToken:async o=>{if(await new Promise(t=>setTimeout(t,400)),o===s)return s;throw new Error("Invalid token")}},P=e.div`
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
`,O=e.div`
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
`;const _=e.div`
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
`,M=e.div`
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,U=e.h2`
  font-size: ${({theme:o})=>o.fontSize.xl};
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0 0 4px 0;
`,W=e.p`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,F=e.form`
  display: flex;
  flex-direction: column;
`,N=e.div`
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
`,q=L({email:u().email("Enter a valid email"),password:u().min(1,"Password is required")}),oo=()=>{var m,p;const o=$(),t=y(i=>i.login),{register:l,handleSubmit:h,setValue:n,formState:{errors:d}}=v({resolver:E(q)}),a=A({mutationFn:i=>T.login(i),onSuccess:i=>{t(i.user,i.token),i.user.role==="counselor"?o(g.RESET_PASSWORD):o(g.DASHBOARD)}}),f=()=>{n("email","sarah.connor@pwc-global.com"),n("password","PWC@User2026!")},w=()=>{n("email","admin@pwc.com"),n("password","admin123")},b=()=>{n("email","counselor@pwc.com"),n("password","counselor123")};return r.jsx(P,{children:r.jsxs(O,{children:[r.jsxs(I,{children:[r.jsx("img",{src:j,alt:"kREATE Logo",style:{width:40,height:40,objectFit:"contain"}}),r.jsxs(_,{children:[r.jsx(D,{children:"kREATE Portal"}),r.jsx(H,{children:"Career Counselling Platform"})]})]}),r.jsxs(M,{children:[r.jsx(U,{children:"Sign In"}),r.jsx(W,{children:"Enter your user credentials to access your portal"})]}),r.jsxs(F,{onSubmit:h(i=>a.mutate(i)),noValidate:!0,children:[a.isError&&r.jsx(V,{role:"alert",children:a.error instanceof Error?a.error.message:"An error occurred. Please try again."}),r.jsxs(N,{children:[r.jsx(x,{label:"Username / Email",type:"email",placeholder:"Enter your username or email",leftIcon:r.jsx(S,{size:18}),autoComplete:"email",error:(m=d.email)==null?void 0:m.message,...l("email")}),r.jsx(x,{label:"Password",type:"password",placeholder:"Enter your password",leftIcon:r.jsx(k,{size:18}),autoComplete:"current-password",error:(p=d.password)==null?void 0:p.message,...l("password")})]}),r.jsx(c,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",isLoading:a.isPending,children:"LOG IN"}),r.jsx(B,{type:"button",children:"Forgot Password?"})]}),r.jsxs(K,{children:[r.jsx(G,{children:"Quick Demo Login Shortcuts"}),r.jsxs(J,{children:[r.jsx(c,{size:"sm",variant:"secondary",onClick:w,children:"Super Admin (admin@pwc.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:f,children:"kREATE User / Admin (sarah.connor@pwc-global.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:b,children:"Counselor (counselor@pwc.com)"})]})]})]})})};export{oo as LoginPage};
