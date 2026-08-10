import{g as t,u as H,d as M,j as e,aB as T,c as p,R as s,bc as c,bb as d,b2 as L,ao as O,J as P,B as R,f as U}from"./index-D-K1gLqS.js";import{u as _,a as G,o as Y,s as a}from"./types-BhCtGHqx.js";import{I as l}from"./Input-DaM42ekN.js";import{T as q}from"./Tooltip-CgwHlqZR.js";const V=t.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`,J=t.div`
  background-color: ${({theme:o})=>o.colors.surface};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`,K=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 28px 28px 24px 28px;
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};
  background: linear-gradient(180deg, ${({theme:o})=>o.colors.surface} 0%, #fafaff 100%);
`,Q=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`,X=t.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({theme:o})=>o.colors.border};
  background-color: ${({theme:o})=>o.colors.surface};
  color: ${({theme:o})=>o.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:o})=>o.colors.primary};
    color: ${({theme:o})=>o.colors.primary};
    background-color: ${({theme:o})=>o.colors.primaryLight};
  }
`,Z=t.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({theme:o})=>o.colors.primaryLight};
  color: ${({theme:o})=>o.colors.primary};
  padding: 4px 14px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,ee=t.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`,oe=t.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
`;t.p`
  font-size: 13px;
  color: ${({theme:o})=>o.colors.textSecondary};
  margin: 0;
  max-width: 720px;
  line-height: 1.5;
`;const te=t.div`
  background-color: ${({theme:o})=>o.colors.background};
  border: 1px solid ${({theme:o})=>o.colors.border};
  border-radius: 4px;
  padding: 18px 24px;
  margin: 24px 28px 8px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: ${({theme:o})=>o.colors.text};

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    margin: 16px 16px 4px 16px;
    padding: 14px 16px;
  }
`,re=t.p`
  font-weight: 700;
  font-size: 15px;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`,m=t.p`
  margin: 0;
  color: ${({theme:o})=>o.colors.text};
`,ie=t.p`
  margin: 0;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
`,ae=t.p`
  margin: 4px 0 0 0;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.text};
`,x=t.div`
  display: flex;
  flex-direction: column;
  padding: 24px 28px;
  border-bottom: 1px solid ${({theme:o})=>o.colors.border};

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    padding: 20px 16px;
  }
`,h=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme:o})=>o.colors.primary};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
`,u=t.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme:o})=>o.colors.primary};
`,f=t.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,n=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`,le=t.div`
  margin: 32px 28px 24px 28px;
  padding: 20px 24px;
  background-color: ${({theme:o})=>o.colors.primaryLight};
  border: 1px dashed ${({theme:o})=>o.colors.primary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    margin: 24px 16px 16px 16px;
    padding: 16px;
  }
`,ne=t.p`
  font-style: italic;
  font-size: 14.5px;
  font-weight: 600;
  color: ${({theme:o})=>o.colors.primary};
  margin: 0;
  line-height: 1.5;
`,se=t.div`
  background-color: ${({theme:o})=>o.colors.background};
  border-top: 1px solid ${({theme:o})=>o.colors.border};
  padding: 20px 28px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    flex-direction: column-reverse;
    align-items: stretch;
    padding: 16px;
  }
`,ce=Y({studentFullName:a().optional(),studentMobile:a().optional(),studentWhatsapp:a().optional(),studentEmail:a().optional(),alternateMobile:a().optional(),alternateEmail:a().optional(),fatherFullName:a().optional(),fatherOccupation:a().optional(),fatherEmployer:a().optional(),fatherWhatsapp:a().optional(),fatherEmail:a().optional(),motherFullName:a().optional(),motherOccupation:a().optional(),motherEmployer:a().optional()}),ue=()=>{var g,b,j,y,w,E,$,I,N,S,z,F,k,v;const o=H(),A=M(),{register:r,handleSubmit:C,formState:{errors:i,isSubmitting:B}}=_({resolver:G(ce),defaultValues:{studentFullName:"",studentMobile:"",studentWhatsapp:"",studentEmail:"",alternateMobile:"",alternateEmail:"",fatherFullName:"",fatherOccupation:"",fatherEmployer:"",fatherWhatsapp:"",fatherEmail:"",motherFullName:"",motherOccupation:"",motherEmployer:""}}),D=async pe=>{await new Promise(W=>setTimeout(W,600)),localStorage.setItem("pwc_student_profile_completed","true"),A.success("Profile Saved Successfully!","Your profile details have been saved. You can now proceed to the Pre-Counselling Form."),o(p.STUDENT_PORTAL)};return e.jsx(V,{children:e.jsx("form",{onSubmit:C(D),noValidate:!0,children:e.jsxs(J,{children:[e.jsxs(K,{children:[e.jsxs(Q,{children:[e.jsx(q,{content:"Back to Student Portal",position:"right",children:e.jsx(X,{type:"button",onClick:()=>o(p.STUDENT_PORTAL),"aria-label":"Back to Student Portal",children:e.jsx(T,{size:18})})}),e.jsx(Z,{children:"Student Onboarding · Class 9 & 10"})]}),e.jsx(ee,{children:"CHAMPION'S PROFILE"}),e.jsx(oe,{children:"Career Counselling Programme — Class 9 & 10"})]}),e.jsxs(te,{children:[e.jsx(re,{children:"Hello Champion,"}),e.jsx(m,{children:"Before you get started, a quick note on why this page matters."}),e.jsx(m,{children:"Everything from here on reminders, links, forms and updates, will be sent to you only through WhatsApp and Email, based on the details you enter below."}),e.jsx(ie,{children:"We won't be calling you at any point in the programme."}),e.jsx(m,{children:"So please take a moment to enter accurate details. It's the only way we'll be able to reach you at the right time, with the right information."}),e.jsx(ae,{children:"Let's get started!"})]}),e.jsxs(x,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(s,{size:18})}),e.jsx("span",{children:"FEW DETAILS ABOUT YOU"})]}),e.jsxs(f,{children:[e.jsxs(n,{children:[e.jsx(l,{label:"Full Name",placeholder:"Name in full, this is how the name will appear in the final report",leftIcon:e.jsx(s,{size:18}),error:(g=i.studentFullName)==null?void 0:g.message,...r("studentFullName")}),e.jsx(l,{label:"Mobile Number",placeholder:"Contact number for calling in case we require",leftIcon:e.jsx(c,{size:18}),error:(b=i.studentMobile)==null?void 0:b.message,...r("studentMobile")})]}),e.jsxs(n,{children:[e.jsx(l,{label:"WhatsApp Number (if different)",placeholder:"All communication and reminders will be sent here only",leftIcon:e.jsx(c,{size:18}),error:(j=i.studentWhatsapp)==null?void 0:j.message,...r("studentWhatsapp")}),e.jsx(l,{label:"Email ID",type:"email",placeholder:"All communication and reminders will be sent here only",leftIcon:e.jsx(d,{size:18}),error:(y=i.studentEmail)==null?void 0:y.message,...r("studentEmail")})]}),e.jsxs(n,{children:[e.jsx(l,{label:"Alternate Mobile Number (WhatsApp Number)",placeholder:"Used only if credentials need to be reset. Information will be sent here only. It should be of your parent in case your number is lost.",leftIcon:e.jsx(c,{size:18}),error:(w=i.alternateMobile)==null?void 0:w.message,...r("alternateMobile")}),e.jsx(l,{label:"Alternate Email ID",type:"email",placeholder:"Used only if credentials need to be reset. Information will be sent here only. It should be of your parent in case your number is lost.",leftIcon:e.jsx(d,{size:18}),error:(E=i.alternateEmail)==null?void 0:E.message,...r("alternateEmail")})]})]})]}),e.jsxs(x,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(L,{size:18})}),e.jsx("span",{children:"FATHER'S DETAILS"})]}),e.jsxs(f,{children:[e.jsxs(n,{children:[e.jsx(l,{label:"Full Name",placeholder:"Name in full",leftIcon:e.jsx(s,{size:18}),error:($=i.fatherFullName)==null?void 0:$.message,...r("fatherFullName")}),e.jsx(l,{label:"Occupation / Designation",placeholder:"Current occupation or job title",leftIcon:e.jsx(O,{size:18}),error:(I=i.fatherOccupation)==null?void 0:I.message,...r("fatherOccupation")})]}),e.jsxs(n,{children:[e.jsx(l,{label:"Organisation / Employer (if applicable)",placeholder:"Name of the company or organisation",leftIcon:e.jsx(P,{size:18}),error:(N=i.fatherEmployer)==null?void 0:N.message,...r("fatherEmployer")}),e.jsx(l,{label:"WhatsApp Number",placeholder:"For communication to be sent for Pre-counselling form & Feedback form",leftIcon:e.jsx(c,{size:18}),error:(S=i.fatherWhatsapp)==null?void 0:S.message,...r("fatherWhatsapp")})]}),e.jsx(n,{children:e.jsx(l,{label:"Email ID",type:"email",placeholder:"For sending Pre-counselling form & Feedback form",leftIcon:e.jsx(d,{size:18}),error:(z=i.fatherEmail)==null?void 0:z.message,...r("fatherEmail")})})]})]}),e.jsxs(x,{children:[e.jsxs(h,{children:[e.jsx(u,{children:e.jsx(L,{size:18})}),e.jsx("span",{children:"MOTHER'S DETAILS"})]}),e.jsxs(f,{children:[e.jsxs(n,{children:[e.jsx(l,{label:"Full Name",placeholder:"Name in full",leftIcon:e.jsx(s,{size:18}),error:(F=i.motherFullName)==null?void 0:F.message,...r("motherFullName")}),e.jsx(l,{label:"Occupation / Designation",placeholder:"Current occupation or job title",leftIcon:e.jsx(O,{size:18}),error:(k=i.motherOccupation)==null?void 0:k.message,...r("motherOccupation")})]}),e.jsx(n,{children:e.jsx(l,{label:"Organisation / Employer (if applicable)",placeholder:"Name of the company or organisation",leftIcon:e.jsx(P,{size:18}),error:(v=i.motherEmployer)==null?void 0:v.message,...r("motherEmployer")})})]})]}),e.jsx(le,{children:e.jsx(ne,{children:"Thank you for taking the time to fill this form carefully. Let’s move on to the next step."})}),e.jsxs(se,{children:[e.jsx(R,{type:"button",variant:"secondary",size:"md",leftIcon:e.jsx(T,{size:18}),onClick:()=>o(p.STUDENT_PORTAL),children:"Cancel & Return"}),e.jsx(R,{type:"submit",variant:"primary",size:"md",leftIcon:e.jsx(U,{size:18}),isLoading:B,children:"Save & Submit Profile"})]})]})})})};export{ue as StudentProfileFormPage};
