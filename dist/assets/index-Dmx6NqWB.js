import{g as e,u as v,a as k,j as r,l as A,R as L,b as R,B as n,c,d as g}from"./index-D8LPzpF0.js";import{u as z,a as C,o as T,s as x}from"./types-BMmo4VCQ.js";import{u as P}from"./useMutation-A5AECt77.js";import{I as h}from"./Input-BHsgREms.js";const M={id:"user-super-admin",name:"Aarav Sharma (Super Admin)",email:"admin@pwc.com",role:"super_admin"},_={id:"user-admin-sunita",name:"Sunita Sharma",email:"sunita.sharma@pwc-global.com",role:"admin"},I={id:"user-counselor-mahesh",name:"Mahesh Pillai",email:"counselor@pwc.com",role:"counselor"},O={id:"user-student-aarav",name:"Aarav Sharma",email:"student@pwc.com",role:"student"},t="mock-jwt-token-12345",N={login:async o=>{if(await new Promise(a=>setTimeout(a,400)),o.email==="admin@pwc.com")return{user:M,token:t};if(o.email==="sunita.sharma@pwc-global.com")return{user:_,token:t};if(o.email==="counselor@pwc.com")return{user:I,token:t};if(o.email==="student@pwc.com")return{user:O,token:t};if(o.password.length>0)return{user:{id:"user-admin",name:o.email.split("@")[0].replace("."," ")||"kREATE Admin",email:o.email,role:"admin"},token:t};throw new Error("Invalid email or password")},logout:async()=>{await new Promise(o=>setTimeout(o,300))},refreshToken:async o=>{if(await new Promise(a=>setTimeout(a,400)),o===t)return t;throw new Error("Invalid token")}},U=e.div`
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
`,F=e.div`
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
`;const H=e.div`
  display: flex;
  flex-direction: column;
`,W=e.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,K=e.p`
  font-size: 12px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,B=e.div`
  margin-bottom: ${({theme:o})=>o.spacing.xl};
`,G=e.h2`
  font-size: ${({theme:o})=>o.fontSize.xl};
  font-weight: 700;
  color: ${({theme:o})=>o.colors.text};
  margin: 0 0 4px 0;
`,V=e.p`
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
`,q=e.form`
  display: flex;
  flex-direction: column;
`,Q=e.div`
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
`,f=e.div`
  margin-top: ${({theme:o})=>o.spacing.xl};
  padding: ${({theme:o})=>o.spacing.md};
  background-color: ${({theme:o})=>o.colors.primaryLight};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  border: 1px solid ${({theme:o})=>o.colors.primaryMuted};
`,w=e.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0 0 8px 0;
  text-align: center;
`,b=e.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,X=e.div`
  background-color: ${({theme:o})=>o.colors.dangerLight};
  border: 1px solid ${({theme:o})=>o.colors.danger};
  border-radius: ${({theme:o})=>o.borderRadius.md};
  padding: ${({theme:o})=>o.spacing.md};
  margin-bottom: ${({theme:o})=>o.spacing.md};
  font-size: ${({theme:o})=>o.fontSize.sm};
  color: ${({theme:o})=>o.colors.danger};
`,Y=T({email:x().email("Enter a valid email"),password:x().min(1,"Password is required")}),io=()=>{var u,p;const o=v(),a=k(i=>i.login),{register:d,handleSubmit:$,setValue:s,formState:{errors:m}}=z({resolver:C(Y)}),l=P({mutationFn:i=>N.login(i),onSuccess:i=>{a(i.user,i.token),i.user.role==="counselor"||i.user.role==="student"?o(c.RESET_PASSWORD):o(c.DASHBOARD)}}),j=()=>{s("email","sunita.sharma@pwc-global.com"),s("password","PWC@User2026!")},S=()=>{s("email","admin@pwc.com"),s("password","admin123")},y=()=>{s("email","counselor@pwc.com"),s("password","counselor123")},E=()=>{s("email","student@pwc.com"),s("password","student123")};return r.jsx(U,{children:r.jsxs(F,{children:[r.jsxs(D,{children:[r.jsx("img",{src:A,alt:"kREATE Logo",style:{width:40,height:40,objectFit:"contain"}}),r.jsxs(H,{children:[r.jsx(W,{children:"kREATE Portal"}),r.jsx(K,{children:"Career Counselling Platform"})]})]}),r.jsxs(B,{children:[r.jsx(G,{children:"Sign In"}),r.jsx(V,{children:"Enter your user credentials to access your portal"})]}),r.jsxs(q,{onSubmit:$(i=>l.mutate(i)),noValidate:!0,children:[l.isError&&r.jsx(X,{role:"alert",children:l.error instanceof Error?l.error.message:"An error occurred. Please try again."}),r.jsxs(Q,{children:[r.jsx(h,{label:"Username / Email",type:"email",placeholder:"Enter your username or email",leftIcon:r.jsx(L,{size:18}),autoComplete:"email",error:(u=m.email)==null?void 0:u.message,...d("email")}),r.jsx(h,{label:"Password",type:"password",placeholder:"Enter your password",leftIcon:r.jsx(R,{size:18}),autoComplete:"current-password",error:(p=m.password)==null?void 0:p.message,...d("password")})]}),r.jsx(n,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",isLoading:l.isPending,children:"LOG IN"}),r.jsx(J,{type:"button",children:"Forgot Password?"})]}),r.jsxs(f,{children:[r.jsx(w,{children:"Quick Demo Login Shortcuts"}),r.jsxs(b,{children:[r.jsx(n,{size:"sm",variant:"secondary",onClick:S,children:"Super Admin (admin@pwc.com)"}),r.jsx(n,{size:"sm",variant:"secondary",onClick:j,children:"kREATE User / Admin (sunita.sharma@pwc-global.com)"}),r.jsx(n,{size:"sm",variant:"secondary",onClick:y,children:"Counselor (counselor@pwc.com)"}),r.jsx(n,{size:"sm",variant:"secondary",onClick:E,children:"Student (student@pwc.com)"})]})]}),r.jsxs(f,{children:[r.jsx(w,{children:"Mail Shortcuts"}),r.jsxs(b,{children:[r.jsx(n,{size:"sm",variant:"primary",leftIcon:r.jsx(g,{size:16}),onClick:()=>o(c.PARENT_PRE_COUNSELLING_FORM),children:"Mail 1"}),r.jsx(n,{size:"sm",variant:"primary",leftIcon:r.jsx(g,{size:16}),onClick:()=>o(c.PARENT_FEEDBACK_FORM),children:"Mail 2"})]})]})]})})};export{io as LoginPage};
