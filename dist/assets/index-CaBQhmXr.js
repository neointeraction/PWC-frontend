import{g as o,u as k,a as A,j as r,l as L,R,b as z,B as n,c as l,d as g}from"./index-B6MU9CPz.js";import{u as C,a as T,o as O,s as x}from"./types-C428mvW1.js";import{u as P}from"./useMutation-DF7mLgws.js";import{I as h}from"./Input-CwfTR_Bp.js";const M={id:"user-super-admin",name:"Aarav Sharma (Super Admin)",email:"admin@pwc.com",role:"super_admin"},_={id:"user-admin-sunita",name:"Sunita Sharma",email:"sunita.sharma@pwc-global.com",role:"admin"},I={id:"user-counselor-mahesh",name:"Mahesh Pillai",email:"counselor@pwc.com",role:"counselor"},N={id:"user-student-aarav",name:"Aarav Sharma",email:"student@pwc.com",role:"student"},U={id:"user-view-only-vikram",name:"Vikram Mehta (View-Only)",email:"viewer@pwc.com",role:"admin",isViewOnly:!0},t="mock-jwt-token-12345",F={login:async e=>{if(await new Promise(a=>setTimeout(a,400)),e.email==="admin@pwc.com")return{user:M,token:t};if(e.email==="sunita.sharma@pwc-global.com")return{user:_,token:t};if(e.email==="viewer@pwc.com"||e.email==="pooja.verma@pwc.com")return{user:U,token:t};if(e.email==="counselor@pwc.com")return{user:I,token:t};if(e.email==="student@pwc.com")return{user:N,token:t};if(e.password.length>0)return{user:{id:"user-admin",name:e.email.split("@")[0].replace("."," ")||"kREATE Admin",email:e.email,role:"admin"},token:t};throw new Error("Invalid email or password")},logout:async()=>{await new Promise(e=>setTimeout(e,300))},refreshToken:async e=>{if(await new Promise(a=>setTimeout(a,400)),e===t)return t;throw new Error("Invalid token")}},D=o.div`
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
`,V=o.div`
  width: 100%;
  max-width: 440px;
  background-color: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.borderRadius.xl};
  box-shadow: ${({theme:e})=>e.colors.shadowLg};
  padding: ${({theme:e})=>e.spacing.xxl};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-top: 4px solid ${({theme:e})=>e.colors.primary};
`,W=o.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`;o.div`
  width: 44px;
  height: 44px;
  border-radius: ${({theme:e})=>e.borderRadius.lg};
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
`;const H=o.div`
  display: flex;
  flex-direction: column;
`,K=o.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,B=o.p`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,G=o.div`
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`,q=o.h2`
  font-size: ${({theme:e})=>e.fontSize.xl};
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0 0 4px 0;
`,Q=o.p`
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,Y=o.form`
  display: flex;
  flex-direction: column;
`,J=o.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
`,X=o.button`
  background: none;
  border: none;
  color: ${({theme:e})=>e.colors.primary};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  font-size: ${({theme:e})=>e.fontSize.xs};
  cursor: pointer;
  margin-top: ${({theme:e})=>e.spacing.md};
  text-align: center;
  width: 100%;

  &:hover {
    color: ${({theme:e})=>e.colors.primaryHover};
    text-decoration: underline;
  }
`,w=o.div`
  margin-top: ${({theme:e})=>e.spacing.xl};
  padding: ${({theme:e})=>e.spacing.md};
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.primaryMuted};
`,f=o.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({theme:e})=>e.colors.primary};
  margin: 0 0 8px 0;
  text-align: center;
`,b=o.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Z=o.div`
  background-color: ${({theme:e})=>e.colors.dangerLight};
  border: 1px solid ${({theme:e})=>e.colors.danger};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  padding: ${({theme:e})=>e.spacing.md};
  margin-bottom: ${({theme:e})=>e.spacing.md};
  font-size: ${({theme:e})=>e.fontSize.sm};
  color: ${({theme:e})=>e.colors.danger};
`,ee=O({email:x().email("Enter a valid email"),password:x().min(1,"Password is required")}),ne=()=>{var u,p;const e=k(),a=A(s=>s.login),{register:m,handleSubmit:$,setValue:i,formState:{errors:d}}=C({resolver:T(ee)}),c=P({mutationFn:s=>F.login(s),onSuccess:s=>{a(s.user,s.token),s.user.role==="counselor"||s.user.role==="student"?e(l.RESET_PASSWORD):e(l.DASHBOARD)}}),j=()=>{i("email","sunita.sharma@pwc-global.com"),i("password","PWC@User2026!")},y=()=>{i("email","admin@pwc.com"),i("password","admin123")},v=()=>{i("email","viewer@pwc.com"),i("password","viewer123")},S=()=>{i("email","counselor@pwc.com"),i("password","counselor123")},E=()=>{i("email","student@pwc.com"),i("password","student123")};return r.jsx(D,{children:r.jsxs(V,{children:[r.jsxs(W,{children:[r.jsx("img",{src:L,alt:"kREATE Logo",style:{width:40,height:40,objectFit:"contain"}}),r.jsxs(H,{children:[r.jsx(K,{children:"kREATE Portal"}),r.jsx(B,{children:"Career Counselling Platform"})]})]}),r.jsxs(G,{children:[r.jsx(q,{children:"Sign In"}),r.jsx(Q,{children:"Enter your user credentials to access your portal"})]}),r.jsxs(Y,{onSubmit:$(s=>c.mutate(s)),noValidate:!0,children:[c.isError&&r.jsx(Z,{role:"alert",children:c.error instanceof Error?c.error.message:"An error occurred. Please try again."}),r.jsxs(J,{children:[r.jsx(h,{label:"Username / Email",type:"email",placeholder:"Enter your username or email",leftIcon:r.jsx(R,{size:18}),autoComplete:"email",error:(u=d.email)==null?void 0:u.message,...m("email")}),r.jsx(h,{label:"Password",type:"password",placeholder:"Enter your password",leftIcon:r.jsx(z,{size:18}),autoComplete:"current-password",error:(p=d.password)==null?void 0:p.message,...m("password")})]}),r.jsx(n,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",isLoading:c.isPending,children:"LOG IN"}),r.jsx(X,{type:"button",children:"Forgot Password?"})]}),r.jsxs(w,{children:[r.jsx(f,{children:"Quick Demo Login Shortcuts"}),r.jsxs(b,{children:[r.jsx(n,{size:"sm",variant:"secondary",onClick:y,children:"Super Admin (admin@pwc.com)"}),r.jsx(n,{size:"sm",variant:"secondary",onClick:j,children:"kREATE User / Admin (sunita.sharma@pwc-global.com)"}),r.jsx(n,{size:"sm",variant:"secondary",onClick:v,children:"kREATE View-Only Account (viewer@pwc.com)"}),r.jsx(n,{size:"sm",variant:"secondary",onClick:S,children:"Counselor (counselor@pwc.com)"}),r.jsx(n,{size:"sm",variant:"secondary",onClick:E,children:"Student (student@pwc.com)"})]})]}),r.jsxs(w,{children:[r.jsx(f,{children:"Mail Shortcuts"}),r.jsxs(b,{children:[r.jsx(n,{size:"sm",variant:"primary",leftIcon:r.jsx(g,{size:16}),onClick:()=>e(l.PARENT_PRE_COUNSELLING_FORM),children:"Mail 1"}),r.jsx(n,{size:"sm",variant:"primary",leftIcon:r.jsx(g,{size:16}),onClick:()=>e(l.PARENT_FEEDBACK_FORM),children:"Mail 2"})]})]})]})})};export{ne as LoginPage};
