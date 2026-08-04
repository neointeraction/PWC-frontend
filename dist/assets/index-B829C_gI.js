import{g as e,u as w,a as $,j as r,R as b,b as y,B as c,c as j}from"./index-Dv07JqWY.js";import{u as v,a as S,o as k,s as g}from"./types-DKl06qmd.js";import{u as L,I as u}from"./Input-BOiFTifh.js";const E={id:"user-super-admin",name:"Alex Rivera (Super Admin)",email:"admin@pwc.com",role:"super_admin"},A={id:"user-admin-sarah",name:"Sarah Connor",email:"sarah.connor@pwc-global.com",role:"admin"},t="mock-jwt-token-12345",z={login:async o=>{if(await new Promise(n=>setTimeout(n,400)),o.email==="admin@pwc.com")return{user:E,token:t};if(o.email==="sarah.connor@pwc-global.com")return{user:A,token:t};if(o.password.length>0)return{user:{id:"user-admin",name:o.email.split("@")[0].replace("."," ")||"kREATE Admin",email:o.email,role:"admin"},token:t};throw new Error("Invalid email or password")},logout:async()=>{await new Promise(o=>setTimeout(o,300))},refreshToken:async o=>{if(await new Promise(n=>setTimeout(n,400)),o===t)return t;throw new Error("Invalid token")}},R=e.div`
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
`,P=e.div`
  width: 100%;
  max-width: 440px;
  background-color: ${({theme:o})=>o.colors.surface};
  border-radius: ${({theme:o})=>o.borderRadius.xl};
  box-shadow: ${({theme:o})=>o.colors.shadowLg};
  padding: ${({theme:o})=>o.spacing.xxl};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-top: 4px solid ${({theme:o})=>o.colors.primary};
`,T=e.div`
  display: flex;
  align-items: center;
  gap: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,C=e.div`
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
`,I=e.div`
  display: flex;
  flex-direction: column;
`,H=e.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,M=e.p`
  font-size: 12px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,O=e.div`
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
`,D=e.form`
  display: flex;
  flex-direction: column;
`,F=e.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,_=e.button`
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
`,B=e.div`
  margin-top: ${({theme:o})=>o.spacing.xl};
  padding: ${({theme:o})=>o.spacing.md};
  background-color: ${({theme:o})=>o.colors.primaryLight};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  border: 1px solid ${({theme:o})=>o.colors.primaryMuted};
`,N=e.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0 0 8px 0;
  text-align: center;
`,K=e.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,G=e.div`
  background-color: ${({theme:o})=>o.colors.dangerLight};
  border: 1px solid ${({theme:o})=>o.colors.danger};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  padding: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.md};
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,V=k({email:g().email("Enter a valid email"),password:g().min(1,"Password is required")}),X=()=>{var m,p;const o=w(),n=$(i=>i.login),{register:l,handleSubmit:x,setValue:a,formState:{errors:d}}=v({resolver:S(V)}),s=L({mutationFn:i=>z.login(i),onSuccess:i=>{n(i.user,i.token),o(j.DASHBOARD)}}),h=()=>{a("email","sarah.connor@pwc-global.com"),a("password","PWC@User2026!")},f=()=>{a("email","admin@pwc.com"),a("password","admin123")};return r.jsx(R,{children:r.jsxs(P,{children:[r.jsxs(T,{children:[r.jsx(C,{children:"k"}),r.jsxs(I,{children:[r.jsx(H,{children:"kREATE Portal"}),r.jsx(M,{children:"Career Counselling Platform"})]})]}),r.jsxs(O,{children:[r.jsx(U,{children:"Sign In"}),r.jsx(W,{children:"Enter your user credentials to access your portal"})]}),r.jsxs(D,{onSubmit:x(i=>s.mutate(i)),noValidate:!0,children:[s.isError&&r.jsx(G,{role:"alert",children:s.error instanceof Error?s.error.message:"An error occurred. Please try again."}),r.jsxs(F,{children:[r.jsx(u,{label:"Username / Email",type:"email",placeholder:"Enter your username or email",leftIcon:r.jsx(b,{size:18}),autoComplete:"email",error:(m=d.email)==null?void 0:m.message,...l("email")}),r.jsx(u,{label:"Password",type:"password",placeholder:"Enter your password",leftIcon:r.jsx(y,{size:18}),autoComplete:"current-password",error:(p=d.password)==null?void 0:p.message,...l("password")})]}),r.jsx(c,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",isLoading:s.isPending,children:"LOG IN"}),r.jsx(_,{type:"button",children:"Forgot Password?"})]}),r.jsxs(B,{children:[r.jsx(N,{children:"Quick Demo Login Shortcuts"}),r.jsxs(K,{children:[r.jsx(c,{size:"sm",variant:"secondary",onClick:f,children:"Super Admin (admin@pwc.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:h,children:"kREATE User / Admin (sarah.connor@pwc-global.com)"})]})]})]})})};export{X as LoginPage};
