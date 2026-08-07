import{g as e,u as y,a as j,j as r,l as S,R as k,b as v,B as c,c as p}from"./index-DnMR83cZ.js";import{u as E,a as L,o as A,s as g}from"./types-D034o_yh.js";import{u as R}from"./useMutation-C38kREAh.js";import{I as x}from"./Input-YhPybyDv.js";const z={id:"user-super-admin",name:"Alex Rivera (Super Admin)",email:"admin@pwc.com",role:"super_admin"},C={id:"user-admin-sarah",name:"Sarah Connor",email:"sarah.connor@pwc-global.com",role:"admin"},T={id:"user-counselor-john",name:"John Doe",email:"counselor@pwc.com",role:"counselor"},P={id:"user-student-alex",name:"Alex Johnson",email:"student@pwc.com",role:"student"},i="mock-jwt-token-12345",O={login:async o=>{if(await new Promise(t=>setTimeout(t,400)),o.email==="admin@pwc.com")return{user:z,token:i};if(o.email==="sarah.connor@pwc-global.com")return{user:C,token:i};if(o.email==="counselor@pwc.com")return{user:T,token:i};if(o.email==="student@pwc.com")return{user:P,token:i};if(o.password.length>0)return{user:{id:"user-admin",name:o.email.split("@")[0].replace("."," ")||"kREATE Admin",email:o.email,role:"admin"},token:i};throw new Error("Invalid email or password")},logout:async()=>{await new Promise(o=>setTimeout(o,300))},refreshToken:async o=>{if(await new Promise(t=>setTimeout(t,400)),o===i)return i;throw new Error("Invalid token")}},I=e.div`
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
`,_=e.div`
  width: 100%;
  max-width: 440px;
  background-color: ${({theme:o})=>o.colors.surface};
  border-radius: ${({theme:o})=>o.borderRadius.xl};
  box-shadow: ${({theme:o})=>o.colors.shadowLg};
  padding: ${({theme:o})=>o.spacing.xxl};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-top: 4px solid ${({theme:o})=>o.colors.primary};
`,D=e.div`
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
`;const M=e.div`
  display: flex;
  flex-direction: column;
`,U=e.h1`
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
`,J=e.button`
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
`,V=e.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0 0 8px 0;
  text-align: center;
`,q=e.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Q=e.div`
  background-color: ${({theme:o})=>o.colors.dangerLight};
  border: 1px solid ${({theme:o})=>o.colors.danger};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  padding: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.md};
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,X=A({email:g().email("Enter a valid email"),password:g().min(1,"Password is required")}),eo=()=>{var m,u;const o=y(),t=j(n=>n.login),{register:l,handleSubmit:h,setValue:s,formState:{errors:d}}=E({resolver:L(X)}),a=R({mutationFn:n=>O.login(n),onSuccess:n=>{t(n.user,n.token),n.user.role==="counselor"||n.user.role==="student"?o(p.RESET_PASSWORD):o(p.DASHBOARD)}}),w=()=>{s("email","sarah.connor@pwc-global.com"),s("password","PWC@User2026!")},f=()=>{s("email","admin@pwc.com"),s("password","admin123")},b=()=>{s("email","counselor@pwc.com"),s("password","counselor123")},$=()=>{s("email","student@pwc.com"),s("password","student123")};return r.jsx(I,{children:r.jsxs(_,{children:[r.jsxs(D,{children:[r.jsx("img",{src:S,alt:"kREATE Logo",style:{width:40,height:40,objectFit:"contain"}}),r.jsxs(M,{children:[r.jsx(U,{children:"kREATE Portal"}),r.jsx(H,{children:"Career Counselling Platform"})]})]}),r.jsxs(N,{children:[r.jsx(W,{children:"Sign In"}),r.jsx(F,{children:"Enter your user credentials to access your portal"})]}),r.jsxs(K,{onSubmit:h(n=>a.mutate(n)),noValidate:!0,children:[a.isError&&r.jsx(Q,{role:"alert",children:a.error instanceof Error?a.error.message:"An error occurred. Please try again."}),r.jsxs(B,{children:[r.jsx(x,{label:"Username / Email",type:"email",placeholder:"Enter your username or email",leftIcon:r.jsx(k,{size:18}),autoComplete:"email",error:(m=d.email)==null?void 0:m.message,...l("email")}),r.jsx(x,{label:"Password",type:"password",placeholder:"Enter your password",leftIcon:r.jsx(v,{size:18}),autoComplete:"current-password",error:(u=d.password)==null?void 0:u.message,...l("password")})]}),r.jsx(c,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",isLoading:a.isPending,children:"LOG IN"}),r.jsx(J,{type:"button",children:"Forgot Password?"})]}),r.jsxs(G,{children:[r.jsx(V,{children:"Quick Demo Login Shortcuts"}),r.jsxs(q,{children:[r.jsx(c,{size:"sm",variant:"secondary",onClick:f,children:"Super Admin (admin@pwc.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:w,children:"kREATE User / Admin (sarah.connor@pwc-global.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:b,children:"Counselor (counselor@pwc.com)"}),r.jsx(c,{size:"sm",variant:"secondary",onClick:$,children:"Student (student@pwc.com)"})]})]})]})})};export{eo as LoginPage};
