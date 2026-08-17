import{g as r,u as k,a as S,j as o,l as E,R as A,b as C,B as t,c as l,d as x}from"./index-DxfnM77Y.js";import{u as R,a as L,o as M,s as g}from"./types-DJ0oG2tQ.js";import{u as O}from"./useMutation-DKVYltin.js";import{I as h}from"./Input-6IZQNX0f.js";const P={id:"user-super-admin",name:"Aarav Sharma (Super Admin)",email:"admin@pwc.com",role:"super_admin"},z={id:"user-admin-sunita",name:"Sunita Sharma",email:"sunita.sharma@pwc-global.com",role:"admin"},T={id:"user-counselor-mahesh",name:"Mahesh Pillai",email:"counselor@pwc.com",role:"counselor"},$={id:"user-student-aarav",name:"Aarav Sharma",email:"student@pwc.com",role:"student"},_={id:"user-view-only-vikram",name:"Vikram Mehta (View-Only)",email:"viewer@pwc.com",role:"admin",isViewOnly:!0},s="mock-jwt-token-12345",I={login:async e=>{if(await new Promise(a=>setTimeout(a,400)),e.email==="admin@pwc.com")return{user:P,token:s};if(e.email==="sunita.sharma@pwc-global.com")return{user:z,token:s};if(e.email==="viewer@pwc.com"||e.email==="pooja.verma@pwc.com")return{user:_,token:s};if(e.email==="counselor@pwc.com")return{user:T,token:s};if(e.email==="student@pwc.com")return{user:$,token:s};if(e.password.length>0)return{user:{id:"user-admin",name:e.email.split("@")[0].replace("."," ")||"kREATE Admin",email:e.email,role:"admin"},token:s};throw new Error("Invalid email or password")},logout:async()=>{await new Promise(e=>setTimeout(e,300))},refreshToken:async e=>{if(await new Promise(a=>setTimeout(a,400)),e===s)return s;throw new Error("Invalid token")}},D=""+new URL("design-destiny-CX89TKSa.png",import.meta.url).href,U=""+new URL("login-bg-BNno0MG2.jpg",import.meta.url).href,F=r.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${({theme:e})=>e.colors.surface};

  @media (max-width: 959px) {
    flex-direction: column;
  }
`,N=r.div`
  flex: 1;
  min-height: 100vh;
  background-image: url(${U});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px 24px 24px;
  position: relative;

  @media (max-width: 959px) {
    min-height: 320px;
    flex: none;
    padding: 40px 20px 20px 20px;
  }
`,K=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  margin-top: 60px;
`,B=r.span`
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
`,V=r.img`
  height: 100px;
  width: auto;
  object-fit: contain;

  @media (max-width: 959px) {
    height: 48px;
  }
`,H=r.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 24px 24px 24px;
  background-color: ${({theme:e})=>e.colors.surface};
  overflow-y: auto;

  @media (max-width: 959px) {
    min-height: auto;
    padding: 32px 16px 24px 16px;
  }
`,W=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
  margin: auto 0;
`,G=r.img`
  height: 56px;
  width: auto;
  object-fit: contain;
  margin-bottom: 36px;

  @media (max-width: 959px) {
    height: 46px;
    margin-bottom: 24px;
  }
`,q=r.div`
  width: 100%;
  background-color: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  border: 1px solid ${({theme:e})=>e.colors.border};
  padding: 36px 32px 28px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  @media (max-width: 480px) {
    padding: 24px 20px 20px 20px;
  }
`,Q=r.div`
  margin-bottom: 24px;
`,X=r.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.text};
  margin: 0 0 6px 0;
`,Y=r.p`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,J=r.form`
  display: flex;
  flex-direction: column;
`,Z=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`,ee=r.button`
  background: none;
  border: none;
  color: ${({theme:e})=>e.colors.primary};
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  margin-top: 16px;
  text-align: center;
  width: 100%;
  transition: opacity ${({theme:e})=>e.transition.fast};

  &:hover {
    color: ${({theme:e})=>e.colors.primaryHover};
    text-decoration: underline;
  }
`,oe=r.details`
  width: 100%;
  margin-top: 24px;
  background-color: ${({theme:e})=>e.colors.primaryLight};
  border: 1px solid ${({theme:e})=>e.colors.primaryMuted};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  padding: 12px;

  summary {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({theme:e})=>e.colors.primary};
    cursor: pointer;
    user-select: none;
    outline: none;
  }
`,re=r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
`,ie=r.div`
  background-color: ${({theme:e})=>e.colors.dangerLight};
  border: 1px solid ${({theme:e})=>e.colors.danger};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  padding: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.danger};
`,ne=r.footer`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textMuted};
  text-align: center;
  padding-top: 24px;
  margin-top: 16px;
`,te=M({email:g().min(1,"Username or Email is required"),password:g().min(1,"Password is required")}),me=()=>{var p,u;const e=k(),a=S(n=>n.login),{register:m,handleSubmit:w,setValue:i,formState:{errors:d}}=R({resolver:L(te)}),c=O({mutationFn:n=>I.login(n),onSuccess:n=>{a(n.user,n.token),n.user.role==="counselor"||n.user.role==="student"?e(l.RESET_PASSWORD):e(l.DASHBOARD)}}),f=()=>{i("email","sunita.sharma@pwc-global.com"),i("password","PWC@User2026!")},b=()=>{i("email","admin@pwc.com"),i("password","admin123")},v=()=>{i("email","viewer@pwc.com"),i("password","viewer123")},y=()=>{i("email","counselor@pwc.com"),i("password","counselor123")},j=()=>{i("email","student@pwc.com"),i("password","student123")};return o.jsxs(F,{children:[o.jsx(N,{children:o.jsxs(K,{children:[o.jsx(B,{children:"A Career Infrastructure Platform by"}),o.jsx(V,{src:D,alt:"Design Destiny"})]})}),o.jsxs(H,{children:[o.jsxs(W,{children:[o.jsx(G,{src:E,alt:"Kreate Logo"}),o.jsxs(q,{children:[o.jsxs(Q,{children:[o.jsx(X,{children:"Sign In"}),o.jsx(Y,{children:"Enter your user credentials to access your portal"})]}),o.jsxs(J,{onSubmit:w(n=>c.mutate(n)),noValidate:!0,children:[c.isError&&o.jsx(ie,{role:"alert",children:c.error instanceof Error?c.error.message:"An error occurred. Please try again."}),o.jsxs(Z,{children:[o.jsx(h,{label:"Username / Email",type:"text",placeholder:"Enter your username or email",leftIcon:o.jsx(A,{size:18}),autoComplete:"username",error:(p=d.email)==null?void 0:p.message,...m("email")}),o.jsx(h,{label:"Password",type:"password",placeholder:"Enter your password",leftIcon:o.jsx(C,{size:18}),autoComplete:"current-password",error:(u=d.password)==null?void 0:u.message,...m("password")})]}),o.jsx(t,{type:"submit",variant:"primary",fullWidth:!0,size:"lg",isLoading:c.isPending,children:"LOG IN"}),o.jsx(ee,{type:"button",children:"Forgot Password?"})]}),o.jsxs(oe,{children:[o.jsx("summary",{children:"Quick Demo Login Shortcuts & Mail Form Links"}),o.jsxs(re,{children:[o.jsx(t,{size:"sm",variant:"secondary",onClick:b,children:"Super Admin (admin@pwc.com)"}),o.jsx(t,{size:"sm",variant:"secondary",onClick:f,children:"kREATE User / Admin (sunita.sharma@pwc-global.com)"}),o.jsx(t,{size:"sm",variant:"secondary",onClick:v,children:"kREATE View-Only Account (viewer@pwc.com)"}),o.jsx(t,{size:"sm",variant:"secondary",onClick:y,children:"Counselor (counselor@pwc.com)"}),o.jsx(t,{size:"sm",variant:"secondary",onClick:j,children:"Student (student@pwc.com)"}),o.jsx(t,{size:"sm",variant:"primary",leftIcon:o.jsx(x,{size:14}),onClick:()=>e(l.PARENT_PRE_COUNSELLING_FORM),children:"Mail 1 (Pre-Counselling Form)"}),o.jsx(t,{size:"sm",variant:"primary",leftIcon:o.jsx(x,{size:14}),onClick:()=>e(l.PARENT_FEEDBACK_FORM),children:"Mail 2 (Parent Feedback Form)"})]})]})]})]}),o.jsx(ne,{children:"©Design Destiny. All Rights Reserved."})]})]})};export{me as LoginPage};
